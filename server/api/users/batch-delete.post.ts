/**
 * 批量删除用户API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { createError, defineEventHandler, readBody } from 'h3'
import { useLogger } from '~/composables/useLogger'
import { deleteUsers } from '~/server/models/user'
import { getUserCollection } from '~/server/models/user.model'

const logger = useLogger('users-api')

interface BatchDeleteRequest {
  ids: string[]
}

export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody<BatchDeleteRequest>(event)

    // 验证必要字段
    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return createError({
        statusCode: 400,
        message: '请提供要删除的用户ID列表',
      })
    }

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 检查是否包含管理员账号
    const adminUser = await userCollection.findOne({
      _id: { $in: body.ids },
      username: 'admin',
    })

    if (adminUser) {
      return {
        code: 403,
        success: false,
        message: '不能删除管理员账号',
        data: null,
      }
    }

    // 批量删除用户
    const deletedCount = await deleteUsers(body.ids)

    logger.info('批量删除用户成功', { count: deletedCount, ids: body.ids })

    // 返回响应
    return {
      code: 200,
      success: true,
      message: `成功删除 ${deletedCount} 个用户`,
      data: { deletedCount },
    }
  }
  catch (error) {
    logger.error('批量删除用户失败', error)

    return createError({
      statusCode: 500,
      message: '批量删除用户失败',
    })
  }
})
