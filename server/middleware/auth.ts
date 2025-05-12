import * as process from 'node:process'
/**
 * 认证中间件
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import jwt from 'jsonwebtoken'
import { useLogger } from '~/composables/useLogger'
import { getUserById } from '~/server/models/user'

const logger = useLogger('auth-middleware')

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// 不需要认证的路径前缀
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
]

export default defineEventHandler(async (event) => {
  // 获取请求路径
  const path = getRequestURL(event).pathname

  // 检查是否是公开路径
  const isPublicPath = publicPaths.some(prefix => path.startsWith(prefix))
  if (isPublicPath) {
    return
  }

  try {
    // 获取认证头
    const authHeader = getRequestHeader(event, 'authorization')

    // 检查是否有认证头
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createError({
        statusCode: 401,
        statusMessage: '未提供认证令牌',
      })
    }

    // 验证令牌
    const token = authHeader.substring(7)

    try {
      // 解析令牌
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

      // 检查用户是否存在
      const user = await getUserById(decoded.userId)
      if (!user) {
        return createError({
          statusCode: 401,
          statusMessage: '无效的用户',
        })
      }

      // 检查用户状态
      if (user.status !== 'active') {
        return createError({
          statusCode: 403,
          statusMessage: '用户已被禁用',
        })
      }

      // 设置用户信息到事件上下文
      event.context.user = user
    }
    // 捕获JWT验证错误但我们不需要使用错误对象，只需要返回401错误
    catch {
      return createError({
        statusCode: 401,
        statusMessage: '无效的认证令牌',
      })
    }
  }
  catch (error) {
    logger.error('认证中间件异常', error)
    return createError({
      statusCode: 500,
      statusMessage: '服务器内部错误',
    })
  }
})
