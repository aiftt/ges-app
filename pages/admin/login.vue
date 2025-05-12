<script setup lang="ts" name="AdminLogin">
/**
 * 管理系统登录页面
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { useLogger } from '~/composables/useLogger'

// 创建日志记录器
const logger = useLogger('admin-login')

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false,
  loading: false,
})

// 错误信息
const errorMessage = ref('')

// 路由实例
const router = useRouter()

// 处理登录提交
async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    errorMessage.value = '请填写完整的登录信息'
    return
  }

  try {
    loginForm.loading = true
    errorMessage.value = ''

    // TODO: 对接真实登录接口
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginForm.username,
        password: loginForm.password,
        remember: loginForm.remember,
      }),
    })

    const result = await response.json()

    if (result.success) {
      logger.info('用户登录成功')
      // 登录成功，跳转到管理后台首页
      router.push('/admin/dashboard')
    }
    else {
      // 登录失败
      errorMessage.value = result.message || '用户名或密码错误'
      logger.warn('用户登录失败', { username: loginForm.username })
    }
  }
  catch (error) {
    errorMessage.value = '登录过程中发生错误，请稍后重试'
    logger.error('登录请求异常', error)
  }
  finally {
    loginForm.loading = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">
          GES管理系统
        </h1>
        <p class="login-subtitle">
          欢迎使用管理后台
        </p>
      </div>

      <div v-if="errorMessage" class="login-error">
        <ui-alert type="error" closable>
          {{ errorMessage }}
        </ui-alert>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-item">
          <label for="username">用户名</label>
          <ui-input
            id="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="carbon:user"
            :disabled="loginForm.loading"
          />
        </div>

        <div class="form-item">
          <label for="password">密码</label>
          <ui-input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="carbon:password"
            :disabled="loginForm.loading"
          />
        </div>

        <div class="form-item remember-row">
          <ui-checkbox v-model="loginForm.remember" :disabled="loginForm.loading">
            记住我
          </ui-checkbox>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <div class="form-item">
          <ui-button
            type="primary"
            size="large"
            :loading="loginForm.loading"
            block
            @click="handleLogin"
          >
            登录
          </ui-button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 480px) {
    width: 90%;
    padding: 30px 20px;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: var(--ui-color-primary, #3b82f6);
}

.login-subtitle {
  margin: 8px 0 0;
  font-size: 16px;
  color: #6b7280;
}

.login-form {
  .form-item {
    margin-bottom: 24px;

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }
  }
}

.login-error {
  margin-bottom: 24px;
}

.remember-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  font-size: 14px;
  color: var(--ui-color-primary, #3b82f6);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
