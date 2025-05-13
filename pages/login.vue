<script setup lang="ts">
/**
 * 登录页面
 * 创建日期: 2024-09-03
 * 更新日期: 2024-09-03 - 增加Pinia持久化存储
 * 更新日期: 2024-10-03 - 优化登录性能和用户体验
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useRouter } from 'vue-router'
import { useAppStore } from '~/composables/useAppStore'
import { useAuthStore } from '~/composables/useAuthStore'
import { useLogger } from '~/composables/useLogger'
import { cleanExpiredStorage } from '~/utils/storage'

// 定义页面元数据
definePageMeta({
  layout: 'blank',
  middleware: ['guest'],
})

const logger = useLogger('login-page')
const router = useRouter()

// 使用Store
const authStore = useAuthStore()
const appStore = useAppStore()

// 在页面加载时清理过期的存储
onMounted(() => {
  cleanExpiredStorage()
})

// 表单状态
const formState = reactive({
  username: '',
  password: '',
  captcha: '',
  isLoading: false,
})

// 登录性能指标
const performanceMetrics = reactive({
  startTime: 0,
  endTime: 0,
  duration: 0,
  loginState: '' as '' | 'validating' | 'authenticating' | 'processing' | 'success' | 'error',
  errorDetails: '',
})

// 登录模式（登录/注册）
const loginMode = ref<'login' | 'register'>('login')

// 验证码组件引用
const captchaRef = ref()

// 表单错误信息
const formError = ref('')

// 根据登录阶段获取提示文本
const loginStateText = computed(() => {
  switch (performanceMetrics.loginState) {
    case 'validating':
      return '正在验证表单...'
    case 'authenticating':
      return '正在验证账号...'
    case 'processing':
      return '正在处理登录...'
    case 'success':
      return '登录成功，正在跳转...'
    case 'error':
      return `登录失败: ${performanceMetrics.errorDetails}`
    default:
      return ''
  }
})

// 自定义验证规则
// const rules = {
//   username: [{ required: true, message: '用户名不能为空' }],
//   password: [{ required: true, message: '密码不能为空' }],
//   captcha: [{ required: true, message: '验证码不能为空' }],
//   email: [
//     { required: true, message: '邮箱不能为空' },
//     { type: 'email', message: '请输入有效的邮箱地址' },
//   ],
// }

// 注册表单额外字段
const registerForm = reactive({
  email: '',
  confirmPassword: '',
})

// 刷新验证码
function refreshCaptcha() {
  if (captchaRef.value) {
    captchaRef.value.refresh()
  }
  formState.captcha = ''
}

// 切换登录/注册模式
function toggleMode() {
  loginMode.value = loginMode.value === 'login' ? 'register' : 'login'
  formError.value = ''
  refreshCaptcha()
}

// 登录请求
async function handleLogin() {
  if (formState.isLoading)
    return
  if (!formState.username || !formState.password || !formState.captcha) {
    formError.value = '请填写完整的登录信息'
    return
  }

  formState.isLoading = true
  formError.value = ''

  // 重置并开始记录性能指标
  performanceMetrics.startTime = performance.now()
  performanceMetrics.endTime = 0
  performanceMetrics.duration = 0
  performanceMetrics.errorDetails = ''
  performanceMetrics.loginState = 'validating'

  try {
    // 表单验证阶段（非常快）
    await new Promise(resolve => setTimeout(resolve, 100))

    // 进入账号验证阶段
    performanceMetrics.loginState = 'authenticating'

    // 直接使用authStore的login方法
    const success = await authStore.login(
      formState.username,
      formState.password,
      formState.captcha,
      false, // 不记住登录
    )

    if (success) {
      // 进入登录后处理阶段
      performanceMetrics.loginState = 'processing'

      // 加载菜单和字典数据
      await Promise.all([
        appStore.loadMenus(),
        appStore.loadDictionaries(),
      ])

      // 记录登录成功
      performanceMetrics.loginState = 'success'
      performanceMetrics.endTime = performance.now()
      performanceMetrics.duration = Math.round(performanceMetrics.endTime - performanceMetrics.startTime)

      // 记录性能指标
      logger.info(`登录完成，总耗时: ${performanceMetrics.duration}ms`)

      // 短暂延迟以显示成功状态
      await new Promise(resolve => setTimeout(resolve, 500))

      // 跳转到首页
      router.push('/')
    }
    else {
      performanceMetrics.loginState = 'error'
      performanceMetrics.errorDetails = '用户名或密码错误'
      formError.value = '登录失败，请检查用户名和密码'
      refreshCaptcha()
    }
  }
  catch (error: any) {
    performanceMetrics.loginState = 'error'
    performanceMetrics.errorDetails = error.data?.message || '服务器错误'
    logger.error('登录失败', error)
    formError.value = error.data?.message || '登录失败，请重试'
    refreshCaptcha()
  }
  finally {
    if (performanceMetrics.loginState !== 'success') {
      performanceMetrics.endTime = performance.now()
      performanceMetrics.duration = Math.round(performanceMetrics.endTime - performanceMetrics.startTime)
      logger.info(`登录失败，总耗时: ${performanceMetrics.duration}ms`)
    }
    formState.isLoading = false
  }
}

// 注册请求
async function handleRegister() {
  if (formState.isLoading)
    return
  if (!formState.username || !formState.password || !formState.captcha || !registerForm.email) {
    formError.value = '请填写完整的注册信息'
    return
  }

  if (formState.password !== registerForm.confirmPassword) {
    formError.value = '两次输入的密码不一致'
    return
  }

  formState.isLoading = true
  formError.value = ''

  try {
    const { data } = await $fetch<any>('/api/auth/register', {
      method: 'POST',
      body: {
        username: formState.username,
        password: formState.password,
        email: registerForm.email,
        captcha: formState.captcha,
      },
    })

    if (data.success) {
      // 注册成功，切换到登录页
      loginMode.value = 'login'
      formError.value = ''
      refreshCaptcha()
    }
  }
  catch (error: any) {
    logger.error('注册失败', error)
    formError.value = error.data?.message || '注册失败，请重试'
    refreshCaptcha()
  }
  finally {
    formState.isLoading = false
  }
}

// 表单提交处理
function handleSubmit() {
  if (loginMode.value === 'login') {
    handleLogin()
  }
  else {
    handleRegister()
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--ui-color-bg,#f1f5f9)]">
    <div class="w-[420px] rounded-lg bg-[var(--ui-color-bg-light,#fff)] p-8 shadow-lg">
      <div class="mb-6 text-center">
        <h1 class="text-2xl text-[var(--ui-color-text,#111827)] font-semibold">
          {{ loginMode === 'login' ? '用户登录' : '用户注册' }}
        </h1>
      </div>

      <div v-if="formError" class="mb-4 rounded bg-[var(--ui-color-danger-light,#fee2e2)] p-3 text-sm text-[var(--ui-color-danger,#dc2626)]">
        {{ formError }}
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <!-- 用户名 -->
        <div class="mb-4">
          <label for="username" class="mb-1.5 block text-sm text-[var(--ui-color-text-light,#4b5563)]">用户名</label>
          <div class="relative">
            <ui-icon class="absolute left-3 top-1/2 text-[var(--ui-color-text-lighter,#9ca3af)] -translate-y-1/2" icon="carbon:user" />
            <input
              id="username"
              v-model="formState.username"
              type="text"
              class="h-10 w-full border border-[var(--ui-color-border,#e5e7eb)] rounded bg-[var(--ui-color-bg-light,#fff)] px-3 pl-9 text-[var(--ui-color-text,#111827)] focus:border-[var(--ui-color-primary,#4f46e5)] focus:shadow focus:shadow-[var(--ui-color-primary-light,rgba(79,70,229,0.1))] focus:outline-none"
              placeholder="请输入用户名"
            >
          </div>
        </div>

        <!-- 密码 -->
        <div class="mb-4">
          <label for="password" class="mb-1.5 block text-sm text-[var(--ui-color-text-light,#4b5563)]">密码</label>
          <div class="relative">
            <ui-icon class="absolute left-3 top-1/2 text-[var(--ui-color-text-lighter,#9ca3af)] -translate-y-1/2" icon="carbon:password" />
            <input
              id="password"
              v-model="formState.password"
              type="password"
              class="h-10 w-full border border-[var(--ui-color-border,#e5e7eb)] rounded bg-[var(--ui-color-bg-light,#fff)] px-3 pl-9 text-[var(--ui-color-text,#111827)] focus:border-[var(--ui-color-primary,#4f46e5)] focus:shadow focus:shadow-[var(--ui-color-primary-light,rgba(79,70,229,0.1))] focus:outline-none"
              placeholder="请输入密码"
            >
          </div>
        </div>

        <!-- 注册模式下的额外字段 -->
        <template v-if="loginMode === 'register'">
          <!-- 确认密码 -->
          <div class="mb-4">
            <label for="confirmPassword" class="mb-1.5 block text-sm text-[var(--ui-color-text-light,#4b5563)]">确认密码</label>
            <div class="relative">
              <ui-icon class="absolute left-3 top-1/2 text-[var(--ui-color-text-lighter,#9ca3af)] -translate-y-1/2" icon="carbon:password" />
              <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                type="password"
                class="h-10 w-full border border-[var(--ui-color-border,#e5e7eb)] rounded bg-[var(--ui-color-bg-light,#fff)] px-3 pl-9 text-[var(--ui-color-text,#111827)] focus:border-[var(--ui-color-primary,#4f46e5)] focus:shadow focus:shadow-[var(--ui-color-primary-light,rgba(79,70,229,0.1))] focus:outline-none"
                placeholder="请再次输入密码"
              >
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="mb-4">
            <label for="email" class="mb-1.5 block text-sm text-[var(--ui-color-text-light,#4b5563)]">邮箱</label>
            <div class="relative">
              <ui-icon class="absolute left-3 top-1/2 text-[var(--ui-color-text-lighter,#9ca3af)] -translate-y-1/2" icon="carbon:email" />
              <input
                id="email"
                v-model="registerForm.email"
                type="email"
                class="h-10 w-full border border-[var(--ui-color-border,#e5e7eb)] rounded bg-[var(--ui-color-bg-light,#fff)] px-3 pl-9 text-[var(--ui-color-text,#111827)] focus:border-[var(--ui-color-primary,#4f46e5)] focus:shadow focus:shadow-[var(--ui-color-primary-light,rgba(79,70,229,0.1))] focus:outline-none"
                placeholder="请输入邮箱"
              >
            </div>
          </div>
        </template>

        <!-- 验证码 -->
        <div class="mb-4">
          <label for="captcha" class="mb-1.5 block text-sm text-[var(--ui-color-text-light,#4b5563)]">验证码</label>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <ui-icon class="absolute left-3 top-1/2 text-[var(--ui-color-text-lighter,#9ca3af)] -translate-y-1/2" icon="carbon:image" />
              <input
                id="captcha"
                v-model="formState.captcha"
                type="text"
                class="h-10 w-full border border-[var(--ui-color-border,#e5e7eb)] rounded bg-[var(--ui-color-bg-light,#fff)] px-3 pl-9 text-[var(--ui-color-text,#111827)] focus:border-[var(--ui-color-primary,#4f46e5)] focus:shadow focus:shadow-[var(--ui-color-primary-light,rgba(79,70,229,0.1))] focus:outline-none"
                placeholder="请输入验证码"
              >
            </div>
            <ui-captcha
              ref="captchaRef"
              class="flex-shrink-0"
              @refresh="formState.captcha = ''"
            />
          </div>
        </div>

        <!-- 登录按钮 -->
        <div class="mb-4">
          <button
            type="submit"
            class="h-10 w-full flex cursor-pointer items-center justify-center rounded bg-[var(--ui-color-primary,#4f46e5)] text-base text-white font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:bg-[var(--ui-color-text-lighter,#9ca3af)] hover:bg-[var(--ui-color-primary-dark,#4338ca)]"
            :disabled="formState.isLoading"
          >
            <ui-icon
              v-if="formState.isLoading"
              icon="carbon:renew"
              class="mr-1 animate-spin"
            />
            <template v-if="!formState.isLoading">
              {{ loginMode === 'login' ? '登 录' : '注 册' }}
            </template>
            <template v-else>
              {{ loginStateText }}
            </template>
          </button>
        </div>

        <!-- 登录性能指标 -->
        <div v-if="performanceMetrics.duration > 0" class="mt-2 text-center text-xs text-[var(--ui-color-text-lighter,#9ca3af)]">
          <div>登录耗时: {{ performanceMetrics.duration }}ms</div>
        </div>

        <!-- 切换登录/注册 -->
        <div class="mt-4 text-center">
          <button
            type="button"
            class="cursor-pointer border-none bg-transparent text-sm text-[var(--ui-color-primary,#4f46e5)] hover:underline"
            @click="toggleMode"
          >
            {{ loginMode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 仅保留需要使用CSS变量的特殊样式，其余均通过unocss实现
</style>
