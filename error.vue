<script setup lang="ts" name="ErrorPage">
/**
 * 全局错误页面
 * 创建日期: 2024-09-25
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 * 更新日期: 2024-12-05 - 优化错误处理，确保不显示详细错误堆栈
 */
import { useLogger } from '~/composables/useLogger'

const props = defineProps<{ error: any }>()
const logger = useLogger('error-page')

// 清理错误对象，移除敏感信息
const cleanError = computed(() => {
  if (!props.error)
    return { statusCode: 500, message: '未知错误' }

  // 只保留必要的错误信息，移除堆栈信息
  return {
    statusCode: props.error.statusCode || 500,
    message: props.error.message || '发生了未知错误',
    // 确保不包含堆栈信息
    stack: undefined,
  }
})

// 错误信息
const errorMessage = computed(() => {
  // 如果是认证错误，显示友好的提示
  if (cleanError.value.statusCode === 401) {
    return '请先登录后再访问'
  }

  // 如果是权限错误
  if (cleanError.value.statusCode === 403) {
    return '您没有权限访问此页面'
  }

  // 如果是404错误
  if (cleanError.value.statusCode === 404) {
    return '页面不存在'
  }

  // 其他错误
  return cleanError.value.message || '发生了未知错误'
})

// 错误代码
const statusCode = computed(() => cleanError.value.statusCode)

// 是否为认证错误
const isAuthError = computed(() => statusCode.value === 401)

// 处理返回首页
function goToHome() {
  navigateTo('/')
}

// 处理登录
function goToLogin() {
  navigateTo('/login')
}

// 记录错误日志
onMounted(() => {
  if (import.meta.client) {
    logger.error('页面错误', {
      statusCode: statusCode.value,
      message: cleanError.value.message,
      url: window.location.href,
    })
  }
})
</script>

<template>
  <div class="error-page min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
    <div class="error-container max-w-md w-full rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
      <div class="error-icon mb-6">
        <ui-icon
          :icon="isAuthError ? 'carbon:locked' : 'carbon:warning-alt'"
          class="text-6xl text-red-500"
        />
      </div>

      <h1 class="mb-2 text-3xl text-gray-800 font-bold dark:text-gray-200">
        {{ statusCode }}
      </h1>

      <p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
        {{ errorMessage }}
      </p>

      <div class="flex justify-center space-x-4">
        <ui-button v-if="isAuthError" type="primary" @click="goToLogin">
          去登录
        </ui-button>

        <ui-button @click="goToHome">
          返回首页
        </ui-button>
      </div>
    </div>
  </div>
</template>
