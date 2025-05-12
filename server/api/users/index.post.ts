import { createError, defineEventHandler, readBody } from 'h3'
/**
 * 创建用户API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { createUser, UserStatus } from '~/server/models/user'

const logger = useLogger('users-api')

export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody(event)

    // 验证必要字段
    if (!body.username || !body.password || !body.email) {
      return createError({
        statusCode: 400,
        statusMessage: '用户名、密码和邮箱不能为空',
      })
    }

    // 默认值处理
    const userData = {
      ...body,
      status: body.status || UserStatus.ACTIVE,
      roles: body.roles || ['user'],
    }

    // 创建用户
    const user = await createUser(userData)

    // 返回响应
    return {
      success: true,
      data: user,
    }
  }
  catch (error) {
    logger.error('创建用户失败', error)

    // 用户名已存在的错误处理
    if (error instanceof Error && error.message === '用户名已存在') {
      return createError({
        statusCode: 400,
        statusMessage: '用户名已存在',
      })
    }

    return createError({
      statusCode: 500,
      statusMessage: '创建用户失败',
    })
  }
})
