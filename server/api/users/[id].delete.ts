/**
 * 删除用户接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { defineEventHandler } from 'h3'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'users-api' })

export default defineEventHandler(async (event) => {
  try {
    // 获取用户ID
    const userId = event.context.params?.id

    if (!userId) {
      return {
        code: 400,
        success: false,
        message: '用户ID不能为空',
        data: null,
      }
    }

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 检查是否是管理员账号
    const user = await userCollection.findOne({ _id: userId })

    if (user?.username === 'admin') {
      return {
        code: 403,
        success: false,
        message: '不能删除管理员账号',
        data: null,
      }
    }

    // 删除用户
    const result = await userCollection.deleteOne({ _id: userId })

    if (result.deletedCount === 0) {
      return {
        code: 404,
        success: false,
        message: '用户不存在',
        data: null,
      }
    }

    logger.info('删除用户成功', { userId })

    return {
      code: 200,
      success: true,
      message: '删除用户成功',
      data: null,
    }
  }
  catch (error) {
    logger.error('删除用户失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
