import type { IUser } from '~/server/types/models'
/**
 * 用户列表API接口
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 获取用户列表
 */
import { defineEventHandler, getQuery } from 'h3'
import { UserService } from '~/server/services/user-service'

/**
 * 响应接口
 */
interface IApiResponse<T> {
  code: number
  data: T
  message: string
}

export default defineEventHandler(async (event) => {
  try {
    // 获取查询参数
    const query = getQuery(event)
    const page = Number.parseInt(query.page as string || '1', 10)
    const limit = Number.parseInt(query.limit as string || '20', 10)

    // 实例化用户服务
    const userService = new UserService()

    // 获取用户列表
    const { users, total } = await userService.getAllUsers(page, limit)

    // 返回成功响应
    const response: IApiResponse<{
      users: IUser[]
      pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
      }
    }> = {
      code: 200,
      data: {
        users: users.map(user => ({
          ...user,
          password: undefined, // 移除密码字段
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      message: '获取用户列表成功',
    }

    return response
  }
  catch (error) {
    // 记录错误信息
    console.error('获取用户列表失败:', error)

    // 返回错误响应
    return {
      code: 500,
      data: null,
      message: '服务器内部错误',
    }
  }
})
