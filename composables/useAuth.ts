/**
 * 认证组合式函数
 * 创建日期: 2024-03-19
 * 作者: aiftt
 */
import type { ComputedRef, Ref } from 'vue'
import type { IUser } from '~/server/types'

/**
 * 认证状态接口
 */
export interface IAuthState {
  token: string | null
  user: Omit<IUser, 'password'> | null
  loading: boolean
}

/**
 * 认证组合式函数返回值
 */
export interface IUseAuth {
  token: Ref<string | null>
  currentUser: ComputedRef<Omit<IUser, 'password'> | null>
  isLogin: ComputedRef<boolean>
  loading: Ref<boolean>
  login: (username: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

/**
 * 认证组合式函数
 */
export function useAuth(): IUseAuth {
  // 获取工具
  const router = useRouter()
  const { $logger } = useNuxtApp()
  const logger = $logger.child({ tag: 'auth' })

  // 认证状态
  const tokenCookie = useCookie<string | null>('token')
  const authState = useState<IAuthState>('auth', () => ({
    token: tokenCookie.value || null,
    user: null,
    loading: false,
  }))

  // 计算属性
  const currentUser = computed(() => authState.value.user)
  const isLogin = computed(() => !!authState.value.token)

  /**
   * 登录
   */
  async function login(username: string, password: string, remember = false) {
    try {
      authState.value.loading = true

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, remember }),
      })

      const result = await response.json()

      if (result.success) {
        // 保存认证状态
        authState.value.token = result.data.token
        authState.value.user = result.data.user

        // 保存 token 到 cookie
        if (remember) {
          tokenCookie.value = result.data.token
        }

        // 跳转到管理后台首页
        router.push('/admin/dashboard')
        logger.info('用户登录成功')
      }
      else {
        throw new Error(result.message)
      }
    }
    catch (error) {
      logger.error('登录失败:', error)
      throw error
    }
    finally {
      authState.value.loading = false
    }
  }

  /**
   * 退出登录
   */
  async function logout() {
    try {
      authState.value.loading = true

      // 调用退出接口
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      const result = await response.json()

      if (result.success) {
        // 清除认证状态
        authState.value.token = null
        authState.value.user = null
        tokenCookie.value = null

        // 跳转到登录页
        router.push('/admin/login')
        logger.info('用户退出成功')
      }
      else {
        throw new Error(result.message)
      }
    }
    catch (error) {
      logger.error('退出失败:', error)
      throw error
    }
    finally {
      authState.value.loading = false
    }
  }

  /**
   * 检查认证状态
   */
  async function checkAuth() {
    try {
      authState.value.loading = true

      // 如果没有 token，直接返回
      if (!authState.value.token) {
        return
      }

      // 获取当前用户信息
      const response = await fetch('/api/auth/current-user')
      const result = await response.json()

      if (result.success) {
        authState.value.user = result.data
      }
      else {
        // 认证失效，清除状态
        authState.value.token = null
        authState.value.user = null
        tokenCookie.value = null
      }
    }
    catch (error) {
      logger.error('检查认证状态失败:', error)
      // 发生错误时清除状态
      authState.value.token = null
      authState.value.user = null
      tokenCookie.value = null
    }
    finally {
      authState.value.loading = false
    }
  }

  return {
    token: toRef(authState.value, 'token'),
    currentUser,
    isLogin,
    loading: toRef(authState.value, 'loading'),
    login,
    logout,
    checkAuth,
  }
}
