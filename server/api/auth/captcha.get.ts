/**
 * 验证码生成API
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import * as process from 'node:process'
import { defineEventHandler, setCookie } from 'h3'
import svgCaptcha from 'svg-captcha'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('auth-captcha-api')

export default defineEventHandler(async (event) => {
  try {
    // 生成验证码
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      noise: 2, // 干扰线条数
      color: true, // 验证码颜色
      background: '#f0f2f5', // 背景色
      width: 120,
      height: 40,
    })

    // 将验证码保存到会话中
    const captchaCode = captcha.text.toLowerCase()

    // 使用cookie保存验证码，设置5分钟过期
    setCookie(event, 'captchaCode', captchaCode, {
      httpOnly: true,
      path: '/',
      maxAge: 300, // 5分钟过期
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

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
