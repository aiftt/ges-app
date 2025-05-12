/**
 * 验证码生成API
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 * 更新日期: 2024-11-28 - 性能优化
 */
import * as process from 'node:process'
import { defineEventHandler, setCookie } from 'h3'
import svgCaptcha from 'svg-captcha'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('auth-captcha-api')

// 预加载字体和配置，避免每次请求都重新加载
const captchaOptions = {
  size: 4, // 验证码长度
  noise: 2, // 干扰线条数
  color: true, // 验证码颜色
  background: '#f0f2f5', // 背景色
  width: 120,
  height: 40,
}

// 验证码缓存池，预生成一些验证码以提高响应速度
const CACHE_SIZE = 50 // 缓存池大小
const captchaCache: Array<{ text: string, data: string }> = []

// 初始化缓存池
function initCaptchaCache() {
  // 仅在服务端执行
  if (import.meta.server) {
    logger.info('初始化验证码缓存池...')
    // 异步填充缓存池
    setTimeout(() => {
      try {
        for (let i = 0; i < CACHE_SIZE; i++) {
          const captcha = svgCaptcha.create(captchaOptions)
          captchaCache.push({
            text: captcha.text.toLowerCase(),
            data: captcha.data,
          })
        }
        logger.info(`验证码缓存池初始化完成，共${captchaCache.length}个验证码`)
      }
      catch (error) {
        logger.error('初始化验证码缓存池失败', error)
      }
    }, 0)
  }
}

// 初始化缓存池
initCaptchaCache()

// 从缓存池获取验证码，并异步补充缓存
function getCaptchaFromCache(): { text: string, data: string } {
  // 如果缓存池为空，直接生成一个新的验证码
  if (captchaCache.length === 0) {
    const captcha = svgCaptcha.create(captchaOptions)
    return {
      text: captcha.text.toLowerCase(),
      data: captcha.data,
    }
  }

  // 从缓存池取出一个验证码
  const captcha = captchaCache.pop()!

  // 异步补充缓存池
  setTimeout(() => {
    try {
      const newCaptcha = svgCaptcha.create(captchaOptions)
      captchaCache.push({
        text: newCaptcha.text.toLowerCase(),
        data: newCaptcha.data,
      })
    }
    catch (error) {
      logger.error('补充验证码缓存失败', error)
    }
  }, 0)

  return captcha
}

export default defineEventHandler(async (event) => {
  try {
    // 记录开始时间，用于性能监控
    const startTime = Date.now()

    // 从缓存池获取验证码
    const captcha = getCaptchaFromCache()
    const captchaCode = captcha.text

    // 使用cookie保存验证码，设置5分钟过期
    setCookie(event, 'captchaCode', captchaCode, {
      httpOnly: true,
      path: '/',
      maxAge: 300, // 5分钟过期
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    // 计算耗时
    const endTime = Date.now()
    const duration = endTime - startTime

    // 记录性能日志
    if (duration > 100) {
      logger.warn(`验证码生成耗时较长: ${duration}ms`)
    }
    else {
      logger.info(`验证码生成耗时: ${duration}ms`)
    }

    // 返回验证码
    return {
      success: true,
      data: {
        svg: captcha.data,
      },
    }
  }
  catch (error) {
    logger.error('生成验证码失败', error)

    return {
      success: false,
      message: '生成验证码失败',
    }
  }
})
