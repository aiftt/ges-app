/**
 * 认证工具函数
 * 创建日期: 2024-09-22
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import type { H3Event } from 'h3'
import serverLogger from '~/utils/server-logger'

const logger = serverLogger.child({ tag: 'auth' })
/**
 * 从请求头中获取认证token
 * @param event H3事件对象
 * @returns token字符串或null
 */
export function useAuthFromHeader(event: H3Event): string | null {
  try {
    // 首先从cookie中获取
    const cookieToken = getCookie(event, 'auth_token')
    if (cookieToken)
      return cookieToken

    // 如果cookie中没有，从Authorization头中获取
    const authHeader = getRequestHeader(event, 'Authorization')
    if (!authHeader)
      return null

    // 验证Bearer格式
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      return token || null
    }

    return null
  }
  catch (error) {
    logger.error('从请求头获取token失败', error)
    return null
  }
}

/**
 * 验证用户是否有指定角色
 * @param userRoles 用户角色列表
 * @param requiredRoles 需要的角色列表
 * @returns 是否拥有所需角色
 */
export function hasRole(userRoles: string[], requiredRoles: string[]): boolean {
  if (!userRoles || !userRoles.length || !requiredRoles || !requiredRoles.length)
    return false

  return requiredRoles.some(role => userRoles.includes(role))
}
