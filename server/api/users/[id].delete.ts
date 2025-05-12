/**
 * 删除用户API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { deleteUser, getUserById } from '~/server/models/user'

const logger = useLogger('users-api')

export default defineEventHandler(async (event) => {
  try {
    // 获取用户ID
    const userId = getRouterParam(event, 'id')
    if (!userId) {
      return createError({
        statusCode: 400,
        message: '用户ID不能为空',
      })
    }

    // 检查用户是否存在
    const existingUser = await getUserById(userId)
    if (!existingUser) {
      return createError({
        statusCode: 404,
        message: '用户不存在',
      })
    }

    // 删除用户
    const result = await deleteUser(userId)

    // 返回响应
    return {
      success: result,
      data: null,
    }
  }
  catch (error) {
    logger.error('删除用户失败', error)

    return createError({
      statusCode: 500,
      message: '删除用户失败',
    })
  }
})
