/**
 * 访客中间件
 * 创建日期: 2024-09-03
 * 更新日期: 2024-09-03 - 使用Pinia持久化存储
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { useAuthStore } from '~/stores/auth'

const logger = useLogger('guest-middleware')

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (import.meta.client) {
    // 使用认证store检查是否已登录
    const authStore = useAuthStore()

    if (authStore.isLoggedIn) {
      // 如果已登录，重定向到首页
      logger.info('用户已登录，重定向到首页')
      return navigateTo('/')
    }
  }
})
