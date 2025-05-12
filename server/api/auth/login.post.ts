import { createError, defineEventHandler, readBody } from 'h3'
/**
 * 用户登录API
 * 创建日期: 2024-06-19
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
}

export default defineEventHandler(async (event) => {
  try {
    // 解析请求体
    const body = await readBody<LoginRequest>(event)

    // 验证参数
    if (!body.username || !body.password) {
      return createError({
        statusCode: 400,
        statusMessage: '请提供用户名和密码',
      })
    }

    // 验证用户名密码
    const { valid, user } = await verifyUserPassword(body.username, body.password)

    if (!valid || !user) {
      return createError({
        statusCode: 401,
        statusMessage: '用户名或密码错误',
      })
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return createError({
        statusCode: 403,
        statusMessage: '用户已被禁用',
      })
    }

    // 更新用户最后登录时间
    if (user._id) {
      await updateUserLastLoginTime(user._id)
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
      statusMessage: '登录失败',
    })
  }
})
