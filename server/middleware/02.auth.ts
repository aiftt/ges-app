/**
 * 认证中间件
 * 创建日期: 2024-06-19
 * 更新日期: 2024-09-12 - 使用JWT工具函数，支持Cookie认证
 * 更新日期: 2024-09-25 - 修复公共路径检查逻辑，优化错误处理
 * 更新日期: 2024-12-23 - 修复 JWT 工具导入问题
 * 更新日期: 2024-12-23 - 增加认证失败自动重定向到登录页
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { getUserById } from '~/server/models/user'
import { verifyToken } from '~/server/utils/jwt'
import { PUBLIC_PATHS } from '~/utils/app-config'

const logger = useLogger('auth-middleware')

// 不需要认证的API路径前缀已移至 utils/app-config.ts 中的 PUBLIC_PATHS

export default defineEventHandler(async (event) => {
  // 获取请求路径
  const path = getRequestURL(event).pathname
  const url = getRequestURL(event)
  const isApiRequest = path.startsWith('/api/')

  // 检查是否是公开路径 - 使用更严格的匹配逻辑
  const isPublicPath = PUBLIC_PATHS.some((prefix) => {
    // 完全匹配或者以路径前缀开头（确保是完整路径段）
    return path === prefix
      || path.startsWith(`${prefix}/`)
    // 特殊处理API路径，允许查询参数
      || (prefix.includes('/api/') && path.startsWith(prefix))
  })

  if (isPublicPath) {
    logger.debug('访问公开路径，跳过认证检查', path)
    return
  }

  logger.debug('认证检查，路径:', path)

  try {
    // 1. 从请求头获取认证令牌
    let token: string | undefined = getRequestHeader(event, 'authorization')?.replace('Bearer ', '')

    // 2. 如果请求头中没有令牌，则尝试从Cookie获取
    if (!token) {
      const cookieToken = getCookie(event, 'auth_token')
      if (cookieToken) {
        token = cookieToken
        logger.debug('从Cookie获取到认证令牌')
      }
    }

    // 检查是否有令牌
    if (!token) {
      logger.warn('未提供认证令牌，路径:', path)

      // API 请求返回401错误
      if (isApiRequest) {
        return createError({
          statusCode: 401,
          message: '请先登录后再访问',
        })
      }

      // 页面请求重定向到登录页
      // 保存当前URL作为登录后的重定向目标
      const redirectURL = `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
      return sendRedirect(event, redirectURL, 302)
    }

    // 验证令牌
    const payload = verifyToken(token)

    // 检查令牌是否有效
    if (!payload) {
      logger.warn('无效的认证令牌')

      // API 请求返回401错误
      if (isApiRequest) {
        return createError({
          statusCode: 401,
          message: '登录已过期，请重新登录',
        })
      }

      // 页面请求重定向到登录页
      // 保存当前URL作为登录后的重定向目标
      const redirectURL = `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
      return sendRedirect(event, redirectURL, 302)
    }

    // 检查用户是否存在
    const user = await getUserById(payload.userId)
    if (!user) {
      logger.warn('无效的用户', payload.userId)

      // API 请求返回401错误
      if (isApiRequest) {
        return createError({
          statusCode: 401,
          message: '用户信息无效，请重新登录',
        })
      }

      // 页面请求重定向到登录页
      const redirectURL = `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
      return sendRedirect(event, redirectURL, 302)
    }

    // 检查用户状态
    if (user.status !== 'active') {
      logger.warn('用户已被禁用', user.username)
      return createError({
        statusCode: 403,
        message: '账号已被禁用，请联系管理员',
      })
    }

    // 设置用户信息到事件上下文
    event.context.user = user
  }
  catch (error) {
    logger.error('认证中间件异常', error)

    // API 请求返回401错误
    if (isApiRequest) {
      return createError({
        statusCode: 401,
        message: '认证失败，请重新登录',
      })
    }

    // 页面请求重定向到登录页
    const redirectURL = `/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
    return sendRedirect(event, redirectURL, 302)
  }
})
