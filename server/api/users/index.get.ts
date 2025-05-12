/**
 * 获取用户列表接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { IUserQueryParams } from '~/server/types'
import { defineEventHandler, getQuery } from 'h3'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'users-api' })

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event) as any as IUserQueryParams

    // 设置默认值
    const page = Number.parseInt(query.page as any as string, 10) || 1
    const pageSize = Number.parseInt(query.pageSize as any as string, 10) || 10

    // 构建查询条件
    const filter: any = {}

    if (query.username) {
      filter.username = { $regex: query.username, $options: 'i' }
    }

    if (query.email) {
      filter.email = { $regex: query.email, $options: 'i' }
    }

    if (query.status) {
      filter.status = query.status
    }

    if (query.realName) {
      filter.realName = { $regex: query.realName, $options: 'i' }
    }

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 统计总数
    const total = await userCollection.countDocuments(filter)

    // 查询用户列表
    const users = await userCollection
      .find(filter)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray()

    // 处理用户数据（隐藏密码）
    const userList = users.map((user) => {
      const { password, ...rest } = user
      return rest
    })

    logger.info(`获取用户列表成功，共 ${total} 条记录`)

    // 返回结果
    return {
      code: 200,
      success: true,
      message: '获取用户列表成功',
      data: {
        items: userList,
        total,
        page,
        pageSize,
      },
    }
  }
  catch (error) {
    logger.error('获取用户列表失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
