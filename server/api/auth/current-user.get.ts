/**
 * 获取当前用户信息API
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import jwt from 'jsonwebtoken'
import { useLogger } from '~/composables/useLogger'
import { getUserById } from '~/server/models/user'
import { JWT_SECRET } from '~/utils/db-config'

const logger = useLogger('auth-current-user-api')

export default defineEventHandler(async (event) => {
  try {
    // 获取请求头
    const authHeader = getRequestHeader(event, 'authorization')

    // 检查是否有认证头
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createError({
        statusCode: 401,
        statusMessage: '未提供认证令牌',
      })
    }

    // 获取令牌
    const token = authHeader.substring(7)

    // 验证令牌
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

      // 查询用户信息
      const user = await getUserById(decoded.userId)

      if (!user) {
        return createError({
          statusCode: 404,
          statusMessage: '用户不存在',
        })
      }

      // 返回用户信息
      return {
        success: true,
        data: user,
      }
    }
    // 捕获JWT验证错误但不需要使用错误对象，只需要返回401错误
    catch {
      return createError({
        statusCode: 401,
        statusMessage: '无效的认证令牌',
      })
    }
  }
  catch (error) {
    logger.error('获取当前用户信息失败', error)

    return createError({
      statusCode: 500,
      statusMessage: '获取当前用户信息失败',
    })
  }
})
