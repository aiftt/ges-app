/**
 * 认证相关的组合式函数
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useLogger } from '~/composables/useLogger'

// 创建日志记录器
const logger = useLogger('use-auth')

/**
 * Token存储键名
 */
const TOKEN_KEY = 'token'

/**
 * 用户信息存储键名
 */
const USER_KEY = 'user_info'

/**
 * 认证相关的组合式函数
 */
export function useAuth() {
  // 路由实例
  const router = useRouter()

  // 当前用户信息
  const currentUser = useState<any | null>('currentUser', () => null)

  // 加载状态
  const isLoading = ref(false)

  /**
   * 设置认证Token
   */
  function setToken(token: string) {
    if (import.meta.client) {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  /**
   * 获取认证Token
   */
  function getToken(): string | null {
    if (import.meta.client) {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  /**
   * 清除认证Token
   */
  function clearToken() {
    if (import.meta.client) {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  /**
   * 保存用户信息到本地存储
   */
  function saveUserInfo(user: any) {
    if (import.meta.client && user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  }

  /**
   * 从本地存储获取用户信息
   */
  function getUserInfo(): any | null {
    if (import.meta.client) {
      const userStr = localStorage.getItem(USER_KEY)
      if (userStr) {
        try {
          return JSON.parse(userStr)
        }
        catch (error) {
          logger.error('解析用户信息失败', error)
        }
      }
    }
    return null
  }

  /**
   * 清除用户信息
   */
  function clearUserInfo() {
    if (import.meta.client) {
      localStorage.removeItem(USER_KEY)
    }
    currentUser.value = null
  }

  /**
   * 用户登录
   */
  async function login(username: string, password: string): Promise<boolean> {
    try {
      isLoading.value = true

      // 调用登录接口
      const response = await $fetch<{
        success: boolean
        data?: { token: string, user: any }
        message?: string
      }>('/api/auth/login', {
        method: 'POST',
        body: {
          username,
          password,
        },
      })

      // 登录成功
      if (response.success && response.data) {
        // 保存令牌
        const token = response.data.token
        if (token) {
          setToken(token)
        }

        // 保存用户信息
        const user = response.data.user
        if (user) {
          currentUser.value = user
          saveUserInfo(user)
        }

        return true
      }

      return false
    }
    catch (error) {
      logger.error('登录失败', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * 用户登出
   */
  function logout() {
    // 清除令牌和用户信息
    clearToken()
    clearUserInfo()

    // 跳转到登录页
    router.push('/login')
  }

  /**
   * 检查是否已登录
   */
  function isLoggedIn(): boolean {
    return !!getToken() && !!currentUser.value
  }

  /**
   * 加载当前用户信息
   */
  async function loadUserInfo(): Promise<boolean> {
    // 检查是否有令牌
    const token = getToken()
    if (!token) {
      return false
    }

    try {
      isLoading.value = true

      // 先尝试从本地存储加载
      const localUser = getUserInfo()
      if (localUser) {
        currentUser.value = localUser
      }

      // 从服务器获取最新用户信息
      const response = await $fetch<{
        success: boolean
        data?: any
      }>('/api/auth/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.success && response.data) {
        currentUser.value = response.data
        saveUserInfo(response.data)
        return true
      }

      // 获取失败，清除令牌和用户信息
      clearToken()
      clearUserInfo()
      return false
    }
    catch (error) {
      logger.error('获取用户信息失败', error)
      // 发生错误时清除令牌和用户信息
      clearToken()
      clearUserInfo()
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  // 返回认证相关的方法和状态
  return {
    currentUser: readonly(currentUser),
    isLoading: readonly(isLoading),
    login,
    logout,
    isLoggedIn,
    loadUserInfo,
    getToken,
  }
}
