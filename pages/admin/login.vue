<!--
 * 管理后台登录页面
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
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
  rememberMe: false,
})

// 登录错误信息
const errorMessage = ref('')

// 登录状态
const isLoading = ref(false)

// 路由实例
const router = useRouter()

// 处理登录
async function handleLogin() {
  try {
    // 清除错误信息
    errorMessage.value = ''

    // 表单验证
    if (!loginForm.username) {
      errorMessage.value = '请输入用户名'
      return
    }

    if (!loginForm.password) {
      errorMessage.value = '请输入密码'
      return
    }

    // 设置加载状态
    isLoading.value = true

    // 调用登录接口
    const response = await $fetch<{
      success: boolean
      data?: { token: string, user: any }
      message?: string
    }>('/api/auth/login', {
      method: 'POST',
      body: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })

    // 登录成功
    if (response.success) {
      // 保存令牌
      const token = response.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }

      // 记住我功能
      if (loginForm.rememberMe) {
        localStorage.setItem('remembered_username', loginForm.username)
      }
      else {
        localStorage.removeItem('remembered_username')
      }

      // 跳转到首页
      router.push('/admin')
    }
    else {
      errorMessage.value = response.message || '登录失败'
    }
  }
  catch (error) {
    logger.error('登录失败', error)
    errorMessage.value = '登录失败，请稍后重试'
  }
  finally {
    isLoading.value = false
  }
}

// 在组件挂载时检查是否有记住的用户名
onMounted(() => {
  const rememberedUsername = localStorage.getItem('remembered_username')
  if (rememberedUsername) {
    loginForm.username = rememberedUsername
    loginForm.rememberMe = true
  }
})

// 页面元数据
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">
          <ui-icon icon="carbon:logo-nodejs" size="36px" />
          <h1 class="title">
            管理系统
          </h1>
        </div>
        <p class="subtitle">
          企业级后台管理系统
        </p>
      </div>

      <div class="login-form">
        <template v-if="errorMessage">
          <div class="error-message">
            <ui-icon icon="carbon:warning" />
            <span>{{ errorMessage }}</span>
          </div>
        </template>

        <div class="form-item">
          <label>用户名</label>
          <div class="input-wrapper">
            <ui-icon icon="carbon:user" />
            <input
              v-model="loginForm.username"
              type="text"
              placeholder="请输入用户名"
              @keyup.enter="handleLogin"
            >
          </div>
        </div>

        <div class="form-item">
          <label>密码</label>
          <div class="input-wrapper">
            <ui-icon icon="carbon:password" />
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="handleLogin"
            >
          </div>
        </div>

        <div class="form-item form-options">
          <div class="remember-me">
            <input
              id="remember-me"
              v-model="loginForm.rememberMe"
              type="checkbox"
            >
            <label for="remember-me">记住我</label>
          </div>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>

        <ui-button
          type="primary"
          size="large"
          block
          :loading="isLoading"
          @click="handleLogin"
        >
          登录
        </ui-button>
      </div>

      <div class="login-footer">
        <p>Copyright © 2024 All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  background-image: url('/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .title {
    margin: 0 0 0 12px;
    font-size: 28px;
    color: #1890ff;
  }

  .subtitle {
    margin: 0;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}

.login-form {
  .error-message {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 4px;
    color: #ff4d4f;
    margin-bottom: 24px;

    .ui-icon {
      margin-right: 8px;
    }
  }

  .form-item {
    margin-bottom: 24px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 0 12px;
      transition: all 0.3s;

      &:hover {
        border-color: #40a9ff;
      }

      &:focus-within {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      .ui-icon {
        color: rgba(0, 0, 0, 0.45);
        margin-right: 8px;
      }

      input {
        flex: 1;
        height: 40px;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;

        &::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .remember-me {
      display: flex;
      align-items: center;

      input[type='checkbox'] {
        margin-right: 8px;
      }
    }

    .forgot-password {
      color: #1890ff;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        color: #40a9ff;
      }
    }
  }
}

.login-footer {
  margin-top: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
