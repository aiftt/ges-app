import { createError, defineEventHandler, getCookie, readBody } from 'h3'
/**
 * 用户登录API
 * 创建日期: 2024-06-19
 * 更新日期: 2024-09-03 - 添加验证码验证功能
 * 更新日期: 2024-10-03 - 优化响应时间，异步更新最后登录时间
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import jwt from 'jsonwebtoken'
import { useLogger } from '~/composables/useLogger'
import { updateUserLastLoginTime, verifyUserPassword } from '~/server/models/user'
import { JWT_EXPIRES_IN, JWT_SECRET } from '~/utils/db-config'

const logger = useLogger('auth-login-api')

interface LoginRequest {
  username: string
  password: string
  captcha: string
}

export default defineEventHandler(async (event) => {
  try {
    // 解析请求体
    const body = await readBody<LoginRequest>(event)

    // 验证参数
    if (!body.username || !body.password) {
      return createError({
        statusCode: 400,
        message: '请提供用户名和密码',
      })
    }

    // 验证码验证
    if (!body.captcha) {
      return createError({
        statusCode: 400,
        message: '请提供验证码',
      })
    }

    const storedCaptcha = getCookie(event, 'captchaCode')
    if (!storedCaptcha || storedCaptcha.toLowerCase() !== body.captcha.toLowerCase()) {
      return createError({
        statusCode: 400,
        message: '验证码错误',
      })
    }

    // 验证用户名密码
    const { valid, user } = await verifyUserPassword(body.username, body.password)

    if (!valid || !user) {
      return createError({
        statusCode: 401,
        message: '用户名或密码错误',
      })
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return createError({
        statusCode: 403,
        message: '用户已被禁用',
      })
    }

    // 生成JWT令牌
    const payload = {
      userId: user._id,
      username: user.username,
      roles: user.roles,
    }

    const token = jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    )

    // 异步更新用户最后登录时间，不阻塞响应
    if (user._id) {
      // 使用Promise.resolve().then()将更新操作放入微任务队列，避免阻塞响应
      const userId = user._id
      Promise.resolve().then(() => {
        updateUserLastLoginTime(userId)
          .catch(err => logger.error('更新用户最后登录时间失败', err))
      })
    }

    // 返回响应
    return {
      success: true,
      data: {
        token,
        user,
      },
    }
  }
  catch (error) {
    logger.error('登录失败', error)

    return createError({
      statusCode: 500,
      message: '登录失败',
    })
  }
})
