/**
 * 创建用户接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { ICreateUserRequest } from '~/server/types'
import { defineEventHandler, readBody } from 'h3'
import { nanoid } from 'nanoid'
import { getUserCollection } from '~/server/models/user.model'
import serverLogger from '~/utils/server-logger'

// 创建日志记录器
const logger = serverLogger.child({ tag: 'users-api' })

export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody<ICreateUserRequest>(event)

    // 参数校验
    if (!body.username || !body.password || !body.email) {
      return {
        code: 400,
        success: false,
        message: '用户名、密码和邮箱不能为空',
        data: null,
      }
    }

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 检查用户名是否已存在
    const existingUser = await userCollection.findOne({
      $or: [
        { username: body.username },
        { email: body.email },
      ],
    })

    if (existingUser) {
      const field = existingUser.username === body.username ? '用户名' : '邮箱'
      return {
        code: 400,
        success: false,
        message: `${field}已存在`,
        data: null,
      }
    }

    // 准备用户数据
    const now = new Date()
    const newUser = {
      _id: nanoid(),
      username: body.username,
      password: body.password, // 注意：实际项目中应该使用加密密码
      email: body.email,
      avatar: body.avatar || '',
      realName: body.realName || '',
      phone: body.phone || '',
      status: body.status || 'active',
      roles: body.roles || ['user'],
      createTime: now,
      updateTime: now,
    }

    // 创建用户
    await userCollection.insertOne(newUser)

    // 返回结果（隐藏密码）
    const { password, ...userInfo } = newUser

    logger.info('创建用户成功', { username: body.username })

    return {
      code: 200,
      success: true,
      message: '创建用户成功',
      data: userInfo,
    }
  }
  catch (error) {
    logger.error('创建用户失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
