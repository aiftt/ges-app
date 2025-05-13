/**
 * 用户认证状态存储
 * 创建日期: 2024-09-03
 * 更新日期: 2024-09-20 - 使用统一的存储键和配置
 * 2024-09-22 - 添加token验证方法
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { useLogger } from '~/composables/useLogger'
import { usePersistStorage } from '~/utils/storage'
import { getCookieOptions, StorageExpires, StorageKeys } from '~/utils/storage-keys'

// 日志记录器
const logger = useLogger('auth-store')

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
  const { handleAuthError } = useErrorHandler()

  // 使用Cookie存储token，更安全
  const tokenCookie = useCookie('auth_token', getCookieOptions(StorageExpires.SHORT / 1000))

  // 刷新令牌，用于获取新的访问令牌
  const refreshTokenStorage = usePersistStorage<string>(
    StorageKeys.AUTH_REFRESH_TOKEN,
    '',
    StorageExpires.LONG,
  )
  // 创建本地ref而不是使用storage的只读引用
  const refreshToken = ref(refreshTokenStorage.value.value || '')

  // 使用持久化存储用户信息
  const userStorage = usePersistStorage<UserInfo | null>(
    StorageKeys.AUTH_USER,
    null,
    StorageExpires.SHORT,
  )
  // 创建本地ref而不是使用storage的只读引用
  const user = ref<UserInfo | null>(userStorage.value.value)

  // 加载状态
  const isLoading = ref(false)

  // 登录状态 - 只要有token就认为是登录状态
  const isLoggedIn = computed(() => !!tokenCookie.value)

  // 是否为管理员
  const isAdmin = computed(() => {
    if (!user.value || !user.value.roles)
      return false
    return user.value.roles.includes('admin')
  })

  /**
   * 设置登录信息
   * @param loginData 登录数据对象
   * @param loginData.token 访问令牌
   * @param loginData.refreshToken 刷新令牌（可选）
   * @param loginData.user 用户信息
   * @param expiresIn 过期时间（毫秒）
   */
  function setLoginInfo(loginData: { token: string, refreshToken?: string, user: UserInfo }, expiresIn = StorageExpires.SHORT) {
    // 设置访问令牌到Cookie
    tokenCookie.value = loginData.token

    // 更新Cookie过期时间
    const cookieOptions = getCookieOptions(expiresIn / 1000)
    useCookie('auth_token', cookieOptions).value = loginData.token

    // 保存刷新令牌
    if (loginData.refreshToken) {
      refreshToken.value = loginData.refreshToken
      refreshTokenStorage.value.value = loginData.refreshToken
      refreshTokenStorage.updateExpires()
    }

    // 保存用户信息
    user.value = loginData.user
    userStorage.value.value = loginData.user
    userStorage.updateExpires()

    logger.info('用户登录成功', user.value?.username)
  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * @param captcha 验证码
   * @param remember 是否记住登录状态
   * @returns 登录是否成功
   */
  async function login(username: string, password: string, captcha: string, remember = false): Promise<boolean> {
    try {
      isLoading.value = true

      // 调用登录接口
      const response = await $fetch<{
        success: boolean
        data?: { token: string, refreshToken: string, user: UserInfo }
        message?: string
      }>('/api/auth/login', {
        method: 'POST',
        body: {
          username,
          password,
          captcha,
          remember,
        },
      })

      // 登录成功
      if (response.success && response.data) {
        // 根据是否记住决定过期时间
        const expiresIn = remember ? StorageExpires.MEDIUM : StorageExpires.SHORT
        setLoginInfo(response.data, expiresIn)
        return true
      }

      return false
    }
    catch (error) {
      logger.error('登录失败', error)
      handleAuthError(error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 刷新用户令牌
   * @returns 是否刷新成功
   */
  async function refreshUserToken(): Promise<boolean> {
    if (!refreshToken.value) {
      logger.warn('没有刷新令牌，无法刷新访问令牌')
      return false
    }

    try {
      isLoading.value = true
      logger.info('开始刷新访问令牌')

      const response = await $fetch<{
        success: boolean
        data?: { token: string }
      }>('/api/auth/refresh-token', {
        method: 'POST',
        body: {
          refreshToken: refreshToken.value,
        },
      })

      if (response.success && response.data) {
        // 更新访问令牌
        tokenCookie.value = response.data.token
        logger.info('访问令牌刷新成功')
        return true
      }

      logger.warn('刷新访问令牌失败', response)
      return false
    }
    catch (error) {
      logger.error('刷新访问令牌异常', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 刷新用户信息
   * @returns 是否刷新成功
   */
  async function refreshUserInfo(): Promise<boolean> {
    if (!isLoggedIn.value) {
      logger.warn('用户未登录，无法刷新用户信息')
      return false
    }

    try {
      isLoading.value = true
      logger.info('开始刷新用户信息')

      const response = await $fetch<{
        success: boolean
        data?: UserInfo
      }>('/api/auth/current-user')

      if (response.success && response.data) {
        user.value = response.data
        userStorage.value.value = response.data
        userStorage.updateExpires()
        logger.info('用户信息刷新成功')
        return true
      }

      logger.warn('刷新用户信息失败', response)
      return false
    }
    catch (error) {
      logger.error('刷新用户信息异常', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 登出
   */
  function logout() {
    // 清除令牌和用户信息
    tokenCookie.value = null
    refreshToken.value = ''
    user.value = null
    refreshTokenStorage.clear()
    userStorage.clear()

    // 跳转到登录页
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
   * 刷新登录过期时间
   */
  function refreshLoginExpires() {
    // 如果登录了，更新过期时间
    if (isLoggedIn.value) {
      userStorage.updateExpires()
      refreshTokenStorage.updateExpires()
      logger.debug('更新登录过期时间')
    }
  }

  // 过期信息
  const userExpires = computed(() => userStorage.isExpired.value)
  const refreshTokenExpires = computed(() => refreshTokenStorage.isExpired.value)

  /**
   * 验证token有效性
   * @returns 返回token是否有效
   */
  async function validateToken(): Promise<boolean> {
    if (!isLoggedIn.value) {
      logger.warn('用户未登录，token无效')
      return false
    }

    try {
      isLoading.value = true
      logger.info('开始验证token有效性')

      const response = await $fetch<{
        success: boolean
        message?: string
      }>('/api/auth/validate-token', {
        method: 'POST',
      })

      if (response.success) {
        logger.info('Token验证成功')
        return true
      }

      logger.warn('Token验证失败', response)
      return false
    }
    catch (error) {
      logger.error('Token验证异常', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    user,
    refreshToken,
    isLoading,
    isLoggedIn,
    isAdmin,
    userExpires,
    refreshTokenExpires,
    setLoginInfo,
    login,
    logout,
    checkAuth,
    refreshUserToken,
    refreshUserInfo,
    refreshLoginExpires,
    validateToken,
  }
})
