/**
 * 认证中间件
 * 创建日期: 2024-06-19
 * 更新日期: 2024-09-03 - 使用Pinia持久化存储
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { useAuthStore } from '~/stores/auth'
import { cleanExpiredStorage } from '~/utils/storage'

const logger = useLogger('auth-middleware')

// 无需认证的路径
const PUBLIC_PATHS = ['/login', '/register']

export default defineNuxtRouteMiddleware((to, _from) => {
  // 清理过期的存储
  if (import.meta.client) {
    cleanExpiredStorage()
  }

  // 检查是否是公开路径
  if (PUBLIC_PATHS.includes(to.path)) {
    return
  }

  // 在客户端检查认证状态
  if (import.meta.client) {
    const authStore = useAuthStore()

    // 如果当前用户未登录
    if (!authStore.isLoggedIn) {
      logger.warn('未登录用户访问受保护路径，重定向到登录页')
      return navigateTo('/login')
    }

    // 刷新登录有效期
    authStore.refreshLoginExpires()
  }
})
