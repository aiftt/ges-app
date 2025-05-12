import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
/**
 * 更新用户API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { getUserById, updateUser } from '~/server/models/user'

const logger = useLogger('users-api')

export default defineEventHandler(async (event) => {
  try {
    // 获取用户ID
    const userId = getRouterParam(event, 'id')
    if (!userId) {
      return createError({
        statusCode: 400,
        statusMessage: '用户ID不能为空',
      })
    }

    // 检查用户是否存在
    const existingUser = await getUserById(userId)
    if (!existingUser) {
      return createError({
        statusCode: 404,
        statusMessage: '用户不存在',
      })
    }

    // 获取请求体
    const body = await readBody(event)

    // 更新用户
    const user = await updateUser(userId, body)

    // 返回响应
    return {
      success: true,
      data: user,
    }
  }
  catch (error) {
    logger.error('更新用户失败', error)

    return createError({
      statusCode: 500,
      statusMessage: '更新用户失败',
    })
  }
})
