/**
 * 用户登录接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { ILoginRequest, ILoginResponse } from '~/server/types'
import { defineEventHandler, readBody } from 'h3'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'auth-api' })

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ILoginRequest>(event)

    // 参数校验
    if (!body.username || !body.password) {
      return {
        code: 400,
        success: false,
        message: '用户名和密码不能为空',
        data: null,
      }
    }

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 查询用户
    const user = await userCollection.findOne({
      username: body.username,
      password: body.password, // 注意：实际项目中应该使用加密密码比对
    })

    if (!user) {
      logger.warn('用户登录失败: 用户名或密码错误', { username: body.username })
      return {
        code: 401,
        success: false,
        message: '用户名或密码错误',
        data: null,
      }
    }

    // 检查用户状态
    if (user.status !== 'active') {
      logger.warn('用户登录失败: 账号已被禁用', { username: body.username })
      return {
        code: 403,
        success: false,
        message: '您的账号已被禁用，请联系管理员',
        data: null,
      }
    }

    // 更新最后登录时间
    await userCollection.updateOne(
      { _id: user._id },
      { $set: { lastLoginTime: new Date() } },
    )

    // 生成登录响应（省略密码）
    const { password, ...userInfo } = user

    logger.info('用户登录成功', { username: body.username })

    // 返回登录成功响应
    const response: ILoginResponse = {
      token: 'mock-token', // TODO: 实现JWT令牌生成
      user: userInfo as any,
    }

    return {
      code: 200,
      success: true,
      message: '登录成功',
      data: response,
    }
  }
  catch (error) {
    logger.error('登录接口异常', error)
    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
