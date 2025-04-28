/**
 * 用户详情API接口
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 用途: 获取单个用户详细信息
 */
import { defineEventHandler, getRouterParam, createError } from 'h3'
import { UserService } from '../../services/user-service'
import type { IUser } from '../../types/models'
/**
 * 响应接口
 */
interface IApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export default defineEventHandler(async (event) => {
  try {
    // 获取路由参数
    const id = getRouterParam(event, 'id')

    // 验证参数
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '用户ID必填',
      })
    }

    // 实例化用户服务
    const userService = new UserService()

    // 获取用户详情
    const user = await userService.findUserById(id)

    // 用户不存在
    if (!user) {
      return {
        code: 404,
        data: null,
        message: '用户不存在',
      }
    }

    // 返回成功响应
    const response: IApiResponse<IUser> = {
      code: 200,
      data: {
        ...user,
        password: undefined, // 移除密码字段
      },
      message: '获取用户详情成功',
    }

    return response
  } catch (error) {
    // 记录错误信息
    console.error('获取用户详情失败:', error)

    // 判断错误类型
    if (error.statusCode === 400) {
      return {
        code: 400,
        data: null,
        message: error.message,
      }
    }

    // 返回错误响应
    return {
      code: 500,
      data: null,
      message: '服务器内部错误',
    }
  }
})
