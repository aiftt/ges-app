/**
 * 认证中间件
 * 创建日期: 2024-06-19
 * 更新日期: 2024-09-22 - 添加重定向逻辑，优化用户体验
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import jwt from 'jsonwebtoken'
import { useLogger } from '~/composables/useLogger'
import { getUserById } from '~/server/models/user'
import { PUBLIC_PATHS } from '~/utils/app-config'
import { JWT_SECRET } from '~/utils/db-config'

const logger = useLogger('auth-middleware')

// 不需要认证的路径前缀，添加服务端特有的API路径
// 这里直接使用 PUBLIC_PATHS 统一管理，不要直接这里写死
const publicPaths = PUBLIC_PATHS

// API路径前缀，用于判断是否为API请求
const API_PATH_PREFIX = '/api/'

/**
 * 检查是否是API请求
 * @param path 请求路径
 * @returns 是否为API请求
 */
function isApiRequest(path: string): boolean {
  return path.startsWith(API_PATH_PREFIX)
}

export default defineEventHandler(async (event) => {
  // 获取请求路径
  const path = getRequestURL(event).pathname

  // 检查是否是公开路径
  const isPublicPath = publicPaths.some(prefix => path.startsWith(prefix))
  if (isPublicPath) {
    return
  }

  // 判断是否为API请求
  const isApi = isApiRequest(path)

  try {
    // 获取认证头
    const authHeader = getRequestHeader(event, 'authorization')

    // 尝试从cookie获取token
    const cookieToken = getCookie(event, 'auth_token')

    // 如果没有认证头且没有cookie令牌
    if ((!authHeader || !authHeader.startsWith('Bearer ')) && !cookieToken) {
      if (isApi) {
        // API请求返回401错误
        return createError({
          statusCode: 401,
          message: '未提供认证令牌',
        })
      }
      else {
        // 非API请求重定向到登录页
        return sendRedirect(event, '/login')
      }
    }

    // 获取令牌，优先使用认证头
    let token: string | null = null
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
    else if (cookieToken) {
      token = cookieToken
    }

    // 确保token存在
    if (!token) {
      if (isApi) {
        return createError({
          statusCode: 401,
          message: '未提供有效的认证令牌',
        })
      }
      else {
        return sendRedirect(event, '/login')
      }
    }

    try {
      // 解析令牌
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

      // 检查用户是否存在
      const user = await getUserById(decoded.userId)
      if (!user) {
        if (isApi) {
          return createError({
            statusCode: 401,
            message: '无效的用户',
          })
        }
        else {
          return sendRedirect(event, '/login')
        }
      }

      // 检查用户状态
      if (user.status !== 'active') {
        if (isApi) {
          return createError({
            statusCode: 403,
            message: '用户已被禁用',
          })
        }
        else {
          return sendRedirect(event, '/login')
        }
      }

      // 设置用户信息到事件上下文
      event.context.user = user
    }
    // 捕获JWT验证错误
    catch (jwtError) {
      if (isApi) {
        return createError({
          statusCode: 401,
          message: '无效的认证令牌',
        })
      }
      else {
        logger.warn('Token验证失败，重定向到登录页', jwtError)
        return sendRedirect(event, '/login')
      }
    }
  }
  catch (error) {
    logger.error('认证中间件异常', error)
    if (isApi) {
      return createError({
        statusCode: 500,
        message: '服务器内部错误',
      })
    }
    else {
      return sendRedirect(event, '/login')
    }
  }
})
