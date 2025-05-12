import { useAuth } from '~/composables/useAuth'
/**
 * 全局认证中间件
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('auth-middleware')

// 不需要认证的路由路径
const publicRoutes = [
  '/admin/login',
]

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.includes(to.path)
  if (isPublicRoute) {
    return
  }

  // 检查是否是管理后台路由
  if (!to.path.startsWith('/admin')) {
    return
  }

  // 获取认证工具
  const { isLoggedIn, loadUserInfo } = useAuth()

  // 未登录状态，尝试自动登录
  if (!isLoggedIn()) {
    try {
      // 尝试加载用户信息
      const success = await loadUserInfo()

      // 加载失败，跳转到登录页
      if (!success) {
        logger.info('未登录或会话已过期，重定向到登录页')
        return navigateTo('/admin/login')
      }
    }
    catch (error) {
      logger.error('自动登录失败', error)
      return navigateTo('/admin/login')
    }
  }
})
