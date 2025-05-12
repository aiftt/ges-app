/**
 * 用户认证状态存储
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLogger } from '~/composables/useLogger'
import { usePersistStorage } from '~/utils/storage'

// 日志记录器
const logger = useLogger('auth-store')

// 登录过期时间 - 4小时
const LOGIN_EXPIRES = 4 * 60 * 60 * 1000

// 用户信息类型
export interface UserInfo {
  _id?: string
  username: string
  email: string
  realName?: string
  avatar?: string
  roles: string[]
  lastLoginTime?: string
}

// 认证状态存储
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // 使用持久化存储token
  const tokenStorage = usePersistStorage<string>('token', '', LOGIN_EXPIRES)
  const token = tokenStorage.value

  // 使用持久化存储用户信息
  const userStorage = usePersistStorage<UserInfo | null>('user', null, LOGIN_EXPIRES)
  const user = userStorage.value

  // 登录状态
  const isLoggedIn = computed(() => !!token.value && !tokenStorage.isExpired.value)

  // 是否为管理员
  const isAdmin = computed(() => {
    if (!user.value || !user.value.roles)
      return false
    return user.value.roles.includes('admin')
  })

  /**
   * 设置登录信息
   */
  function setLoginInfo(loginData: { token: string, user: UserInfo }) {
    token.value = loginData.token
    user.value = loginData.user
    tokenStorage.updateExpires()
    userStorage.updateExpires()
    logger.info('用户登录成功', user.value?.username)
  }

  /**
   * 登出
   */
  function logout() {
    token.value = ''
    user.value = null
    tokenStorage.clear()
    userStorage.clear()
    router.push('/login')
    logger.info('用户登出')
  }

  /**
   * 检查登录状态
   * 如果登录过期，则返回登录页
   */
  function checkAuth() {
    if (!isLoggedIn.value) {
      logout()
      return false
    }
    return true
  }

  /**
   * 刷新登录有效期
   * 用于用户活跃状态下延长登录时间
   */
  function refreshLoginExpires() {
    if (isLoggedIn.value) {
      tokenStorage.updateExpires()
      userStorage.updateExpires()
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    isAdmin,
    setLoginInfo,
    logout,
    checkAuth,
    refreshLoginExpires,
  }
})
