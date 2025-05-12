/**
 * 获取单个用户API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { createError, defineEventHandler, getRouterParam } from 'h3'
import { useLogger } from '~/composables/useLogger'
import { getUserById } from '~/server/models/user'

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

    // 获取用户信息
    const user = await getUserById(userId)

    if (!user) {
      return createError({
        statusCode: 404,
        statusMessage: '用户不存在',
      })
    }

    // 返回响应
    return {
      success: true,
      data: user,
    }
  }
  catch (error) {
    logger.error('获取用户信息失败', error)

    return createError({
      statusCode: 500,
      statusMessage: '获取用户信息失败',
    })
  }
})
