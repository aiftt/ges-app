<!--
  全局错误页面
  创建日期: 2024-09-22
  作者: aiftt
  邮箱: ftt.loves@gmail.com
-->
<script setup lang="ts">
import type { ResultStatus } from '~/types/ui'

// 使用useError获取错误信息
const errorObj = useError()

// 清除错误
function clearError() {
  // 使用Nuxt 3的正确API
  navigateTo(window.location.pathname)
}

// 提取错误状态和消息
const statusCode = computed(() => errorObj.value?.statusCode || 500)
const message = computed(() => errorObj.value?.message || '服务器内部错误')

// 映射状态码到结果组件状态
const resultStatus = computed<ResultStatus>(() => {
  if (statusCode.value === 404)
    return 'warning'
  if (statusCode.value === 403)
    return 'warning'
  if (statusCode.value === 401)
    return 'info'
  return 'error'
})

// 如果是401错误，1秒后自动跳转登录页
onMounted(() => {
  if (statusCode.value === 401) {
    setTimeout(() => {
      navigateTo('/login')
    }, 1000)
  }
})
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <ui-result
        :status="resultStatus"
        :title="statusCode === 401 ? '未授权访问' : (statusCode === 404 ? '页面不存在' : '发生错误')"
        :sub-title="message"
      >
        <!-- 不同状态码显示不同操作按钮 -->
        <template #extra>
          <!-- 401未授权情况 -->
          <template v-if="statusCode === 401">
            <div class="mb-4 text-gray-500">
              正在为您跳转到登录页...
            </div>
            <ui-button type="primary" @click="navigateTo('/login')">
              立即前往登录
            </ui-button>
          </template>

          <!-- 404页面不存在情况 -->
          <template v-else-if="statusCode === 404">
            <ui-button type="primary" @click="navigateTo('/')">
              返回首页
            </ui-button>
            <ui-button @click="$router.back()">
              返回上一页
            </ui-button>
          </template>

          <!-- 403权限不足情况 -->
          <template v-else-if="statusCode === 403">
            <ui-button type="primary" @click="navigateTo('/')">
              返回首页
            </ui-button>
            <ui-button @click="$router.back()">
              返回上一页
            </ui-button>
          </template>

          <!-- 其他错误情况 -->
          <template v-else>
            <ui-button type="primary" @click="clearError">
              重试
            </ui-button>
            <ui-button @click="$router.back()">
              返回上一页
            </ui-button>
          </template>
        </template>
      </ui-result>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--ui-color-bg, #f0f2f5);
}

.error-container {
  width: 100%;
  max-width: 32rem;
  background-color: var(--ui-color-bg-elevated, white);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:root.dark .error-page {
  background-color: var(--ui-color-bg-dark, #1f1f1f);
}

:root.dark .error-container {
  background-color: var(--ui-color-bg-elevated-dark, #262626);
}
</style>
