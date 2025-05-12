/**
 * 批量删除用户接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { defineEventHandler, readBody } from 'h3'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'users-api' })

export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody<{ ids: string[] }>(event)

    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return {
        code: 400,
        success: false,
        message: '用户ID列表不能为空',
        data: null,
      }
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
    const result = await userCollection.deleteMany({
      _id: { $in: body.ids },
    })

    logger.info('批量删除用户成功', { count: result.deletedCount, ids: body.ids })

    return {
      code: 200,
      success: true,
      message: `成功删除 ${result.deletedCount} 个用户`,
      data: { count: result.deletedCount },
    }
  }
  catch (error) {
    logger.error('批量删除用户失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
