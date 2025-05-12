/**
 * 更新用户接口
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import type { IUpdateUserRequest } from '~/server/types'
import { defineEventHandler, readBody } from 'h3'
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

    // 获取请求体
    const body = await readBody<IUpdateUserRequest>(event)

    // 获取用户集合
    const userCollection = await getUserCollection()

    // 检查用户是否存在
    const existingUser = await userCollection.findOne({ _id: userId })

    if (!existingUser) {
      return {
        code: 404,
        success: false,
        message: '用户不存在',
        data: null,
      }
    }

    // 检查邮箱是否被其他用户占用
    if (body.email && body.email !== existingUser.email) {
      const emailExists = await userCollection.findOne({
        _id: { $ne: userId },
        email: body.email,
      })

      if (emailExists) {
        return {
          code: 400,
          success: false,
          message: '邮箱已被其他用户使用',
          data: null,
        }
      }
    }

    // 准备更新数据
    const updateData: any = {
      updateTime: new Date(),
    }

    // 设置需要更新的字段
    if (body.email !== undefined)
      updateData.email = body.email
    if (body.avatar !== undefined)
      updateData.avatar = body.avatar
    if (body.realName !== undefined)
      updateData.realName = body.realName
    if (body.phone !== undefined)
      updateData.phone = body.phone
    if (body.status !== undefined)
      updateData.status = body.status
    if (body.roles !== undefined)
      updateData.roles = body.roles

    // 更新用户
    const result = await userCollection.updateOne(
      { _id: userId },
      { $set: updateData },
    )

    if (result.matchedCount === 0) {
      return {
        code: 404,
        success: false,
        message: '用户不存在',
        data: null,
      }
    }

    // 获取更新后的用户信息
    const updatedUser = await userCollection.findOne({ _id: userId })

    // 返回结果（隐藏密码）
    const { password, ...userInfo } = updatedUser || {}

    logger.info('更新用户成功', { userId })

    return {
      code: 200,
      success: true,
      message: '更新用户成功',
      data: userInfo,
    }
  }
  catch (error) {
    logger.error('更新用户失败', error)

    return {
      code: 500,
      success: false,
      message: '服务器内部错误',
      data: null,
    }
  }
})
