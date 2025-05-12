<script setup lang="ts">
/**
 * 登录页面
 * 创建日期: 2024-09-03
 * 更新日期: 2024-09-03 - 增加Pinia持久化存储
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { useRouter } from 'vue-router'
import { useLogger } from '~/composables/useLogger'
import { useAppStore } from '~/stores/app'
import { useAuthStore } from '~/stores/auth'
import { cleanExpiredStorage } from '~/utils/storage'

// 定义页面元数据
definePageMeta({
  layout: 'blank' as any,
  middleware: ['guest'] as any,
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

// 登录模式（登录/注册）
const loginMode = ref<'login' | 'register'>('login')

// 验证码组件引用
const captchaRef = ref()

// 表单错误信息
const formError = ref('')

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

  try {
    const response = await $fetch<{
      success: boolean
      data: { token: string, user: any }
    }>('/api/auth/login', {
      method: 'POST',
      body: {
        username: formState.username,
        password: formState.password,
        captcha: formState.captcha,
      },
    })

    if (response.success) {
      // 使用 store 存储登录信息
      authStore.setLoginInfo(response.data)

      // 加载菜单和字典数据
      await Promise.all([
        appStore.loadMenus(),
        appStore.loadDictionaries(),
      ])

      // 跳转到首页
      router.push('/')
    }
  }
  catch (error: any) {
    logger.error('登录失败', error)
    formError.value = error.data?.message || '登录失败，请重试'
    refreshCaptcha()
  }
  finally {
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
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">
          {{ loginMode === 'login' ? '用户登录' : '用户注册' }}
        </h1>
      </div>

      <div v-if="formError" class="login-error">
        {{ formError }}
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <!-- 用户名 -->
        <div class="form-item">
          <label for="username" class="form-label">用户名</label>
          <div class="form-control">
            <ui-icon class="input-icon" icon="carbon:user" />
            <input
              id="username"
              v-model="formState.username"
              type="text"
              class="form-input"
              placeholder="请输入用户名"
            >
          </div>
        </div>

        <!-- 密码 -->
        <div class="form-item">
          <label for="password" class="form-label">密码</label>
          <div class="form-control">
            <ui-icon class="input-icon" icon="carbon:password" />
            <input
              id="password"
              v-model="formState.password"
              type="password"
              class="form-input"
              placeholder="请输入密码"
            >
          </div>
        </div>

        <!-- 注册模式下的额外字段 -->
        <template v-if="loginMode === 'register'">
          <!-- 确认密码 -->
          <div class="form-item">
            <label for="confirmPassword" class="form-label">确认密码</label>
            <div class="form-control">
              <ui-icon class="input-icon" icon="carbon:password" />
              <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                type="password"
                class="form-input"
                placeholder="请再次输入密码"
              >
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="form-item">
            <label for="email" class="form-label">邮箱</label>
            <div class="form-control">
              <ui-icon class="input-icon" icon="carbon:email" />
              <input
                id="email"
                v-model="registerForm.email"
                type="email"
                class="form-input"
                placeholder="请输入邮箱"
              >
            </div>
          </div>
        </template>

        <!-- 验证码 -->
        <div class="form-item">
          <label for="captcha" class="form-label">验证码</label>
          <div class="captcha-container">
            <div class="form-control captcha-input">
              <ui-icon class="input-icon" icon="carbon:image" />
              <input
                id="captcha"
                v-model="formState.captcha"
                type="text"
                class="form-input"
                placeholder="请输入验证码"
              >
            </div>
            <ui-captcha
              ref="captchaRef"
              class="captcha-widget"
              @refresh="formState.captcha = ''"
            />
          </div>
        </div>

        <!-- 登录按钮 -->
        <div class="form-item">
          <button
            type="submit"
            class="login-button"
            :disabled="formState.isLoading"
          >
            <ui-icon
              v-if="formState.isLoading"
              icon="carbon:renew"
              class="mr-1 animate-spin"
            />
            {{ loginMode === 'login' ? '登 录' : '注 册' }}
          </button>
        </div>

        <!-- 切换登录/注册 -->
        <div class="login-footer">
          <button
            type="button"
            class="toggle-mode"
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
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--ui-color-bg, #f1f5f9);
}

.login-container {
  width: 420px;
  padding: 32px;
  border-radius: 8px;
  background-color: var(--ui-color-bg-light, #fff);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-header {
  margin-bottom: 24px;
  text-align: center;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--ui-color-text, #111827);
}

.login-error {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 4px;
  background-color: var(--ui-color-danger-light, #fee2e2);
  color: var(--ui-color-danger, #dc2626);
  font-size: 14px;
}

.login-form {
  .form-item {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: var(--ui-color-text-light, #4b5563);
  }

  .form-control {
    position: relative;
  }

  .input-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: var(--ui-color-text-lighter, #9ca3af);
  }

  .form-input {
    width: 100%;
    height: 40px;
    padding: 0 12px 0 36px;
    border: 1px solid var(--ui-color-border, #e5e7eb);
    border-radius: 4px;
    background-color: var(--ui-color-bg-light, #fff);
    color: var(--ui-color-text, #111827);

    &:focus {
      outline: none;
      border-color: var(--ui-color-primary, #4f46e5);
      box-shadow: 0 0 0 2px var(--ui-color-primary-light, rgba(79, 70, 229, 0.1));
    }

    &::placeholder {
      color: var(--ui-color-text-lighter, #9ca3af);
    }
  }

  .captcha-container {
    display: flex;
    gap: 8px;
  }

  .captcha-input {
    flex: 1;
  }

  .captcha-widget {
    flex-shrink: 0;
  }
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: var(--ui-color-primary, #4f46e5);
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--ui-color-primary-dark, #4338ca);
  }

  &:disabled {
    background-color: var(--ui-color-text-lighter, #9ca3af);
    cursor: not-allowed;
  }
}

.login-footer {
  margin-top: 16px;
  text-align: center;

  .toggle-mode {
    border: none;
    background: none;
    color: var(--ui-color-primary, #4f46e5);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
