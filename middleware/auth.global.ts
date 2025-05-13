/**
 * 全局认证中间件
 * 创建日期: 2024-09-22
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useAuthStore } from '~/composables/useAuthStore'
import { useLogger } from '~/composables/useLogger'
import { PUBLIC_PATHS } from '~/utils/app-config'

// 不需要认证的路由
const publicRoutes = PUBLIC_PATHS

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // 在服务端初始化时跳过检查
  if (import.meta.server && to.path === '/')
    return

  // 日志记录器
  const logger = useLogger('auth-middleware')
  logger.debug('路由守卫检查', { path: to.path })

  // 如果是公开路由，直接放行
  if (publicRoutes.some(route => to.path.startsWith(route)))
    return

  // 认证状态存储
  const authStore = useAuthStore()

  try {
    // 客户端检查token是否有效
    if (import.meta.client && authStore.isLoggedIn) {
      // 验证token有效性
      const isValid = await authStore.validateToken()

      // token无效，清理认证状态并重定向到登录页
      if (!isValid) {
        logger.warn('Token无效，重定向到登录页')
        authStore.logout()
        return navigateTo('/login', { replace: true })
      }

      // 刷新登录过期时间
      authStore.refreshLoginExpires()
    }

    // 未登录状态下访问需要认证的页面，重定向到登录页
    if (!authStore.isLoggedIn) {
      logger.warn('未登录，重定向到登录页')
      // 保存重定向URL并导航到登录页
      const redirectPath = to.fullPath
      return navigateTo({
        path: '/login',
        replace: true,
        query: { redirect: redirectPath },
      })
    }
  }
  catch (error) {
    logger.error('路由认证检查失败', error)
    authStore.logout()
    return navigateTo('/login', { replace: true })
  }
})
