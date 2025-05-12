<script setup lang="ts" name="UiCaptcha">
/**
 * 验证码组件
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

// 验证码SVG内容
const captchaSvg = ref('')
// 加载状态
const loading = ref(false)

// API响应类型定义
interface CaptchaResponse {
  success: boolean
  data: {
    svg: string
  }
  message?: string
}

// 获取验证码函数
async function fetchCaptcha() {
  if (loading.value)
    return

  loading.value = true
  try {
    const response = await $fetch<CaptchaResponse>('/api/auth/captcha')

    if (response.success) {
      captchaSvg.value = response.data.svg
      emit('refresh')
    }
  }
  catch (error) {
    console.error('获取验证码失败', error)
  }
  finally {
    loading.value = false
  }
}

// 在组件挂载时获取验证码
onMounted(() => {
  fetchCaptcha()
})

// 对外暴露刷新验证码方法
defineExpose({
  refresh: fetchCaptcha,
})
</script>

<template>
  <div class="ui-captcha" @click="fetchCaptcha">
    <div v-if="loading" class="ui-captcha-loading">
      <ui-icon icon="carbon:renew" class="animate-spin" />
    </div>
    <div v-else-if="captchaSvg" class="ui-captcha-svg" v-html="captchaSvg" />
    <div v-else class="ui-captcha-empty">
      <ui-icon icon="carbon:image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border: 1px solid var(--ui-color-border, #e5e7eb);
  border-radius: 4px;
  background-color: var(--ui-color-bg-light, #f9fafb);
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    border-color: var(--ui-color-primary, #4f46e5);
  }

  &-loading,
  &-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--ui-color-text-light, #9ca3af);
  }

  &-svg {
    width: 100%;
    height: 100%;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
