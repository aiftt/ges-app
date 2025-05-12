import { createError, defineEventHandler, getCookie, readBody } from 'h3'
/**
 * 用户注册API
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { createUser, getUserByUsername, UserStatus } from '~/server/models/user'

const logger = useLogger('auth-register-api')

interface RegisterRequest {
  username: string
  password: string
  email: string
  captcha: string
}

export default defineEventHandler(async (event) => {
  try {
    // 解析请求体
    const body = await readBody<RegisterRequest>(event)

    // 验证参数
    if (!body.username || !body.password || !body.email) {
      return createError({
        statusCode: 400,
        message: '请提供用户名、密码和邮箱',
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

    // 检查用户名是否已存在
    const existingUser = await getUserByUsername(body.username)
    if (existingUser) {
      return createError({
        statusCode: 400,
        message: '用户名已存在',
      })
    }

    // 创建用户
    const user = await createUser({
      username: body.username,
      password: body.password,
      email: body.email,
      status: UserStatus.ACTIVE, // 默认状态为激活
      roles: ['user'], // 默认角色为普通用户
    })

    // 返回响应
    return {
      success: true,
      data: {
        user,
      },
    }
  }
  catch (error) {
    logger.error('注册失败', error)

    return createError({
      statusCode: 500,
      message: '注册失败',
    })
  }
})
