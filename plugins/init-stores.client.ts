/**
 * 初始化Pinia存储插件（仅客户端）
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'
import { useAppStore } from '~/stores/app'
import { useAuthStore } from '~/stores/auth'
import { cleanExpiredStorage } from '~/utils/storage'

export default defineNuxtPlugin(async () => {
  const logger = useLogger('init-stores')
  const router = useRouter()
  const authStore = useAuthStore()
  const appStore = useAppStore()

  // 清理过期的存储项
  cleanExpiredStorage()

  // 检查登录状态
  const isLoggedIn = authStore.isLoggedIn

  // 如果已登录，自动加载应用数据
  if (isLoggedIn) {
    logger.info('用户已登录，自动加载应用数据')

    try {
      await Promise.all([
        appStore.loadMenus(),
        appStore.loadDictionaries(),
      ])

      logger.info('应用数据加载完成')
    }
    catch (error) {
      logger.error('加载应用数据失败', error)
    }
  }

  // 监听路由变化，自动刷新登录过期时间
  router.afterEach(() => {
    if (authStore.isLoggedIn) {
      authStore.refreshLoginExpires()
    }
  })
})
