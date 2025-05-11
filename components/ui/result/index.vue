<script setup lang="ts" name="UiResult">
/**
 * 结果反馈组件
 * 创建日期: 2024-08-18
 * 作者: aiftt
 * 更新日期: 2024-08-18 - 初始实现
 * 更新日期: 2024-09-13 - 使用集中管理的类型定义
 */
import type { ResultStatus } from '~/types/ui'

// Props定义
const props = withDefaults(defineProps<{
  /**
   * 结果状态，可选值：success、error、info、warning
   */
  status?: ResultStatus
  /**
   * 标题
   */
  title?: string
  /**
   * 副标题/描述文字
   */
  subTitle?: string
  /**
   * 自定义图标名称，传入的是 nuxt-icon 组件支持的图标名
   */
  icon?: string
  /**
   * 图标大小
   */
  iconSize?: number | string
  /**
   * 图标颜色，如不设置则根据 status 自动选择颜色
   */
  iconColor?: string
}>(), {
  status: 'info',
  title: '',
  subTitle: '',
  iconSize: '4rem',
})

// 默认图标
const defaultIcons = {
  success: 'carbon:checkmark-filled',
  error: 'carbon:error-filled',
  info: 'carbon:information-filled',
  warning: 'carbon:warning-filled',
}

// 默认图标颜色
const defaultColors = {
  success: 'var(--ui-color-success, #10b981)',
  error: 'var(--ui-color-danger, #ef4444)',
  info: 'var(--ui-color-primary, #3b82f6)',
  warning: 'var(--ui-color-warning, #f59e0b)',
}

// 计算当前使用的图标
const currentIcon = computed(() => props.icon || defaultIcons[props.status])

// 计算当前使用的颜色
const currentColor = computed(() => props.iconColor || defaultColors[props.status])
</script>

<template>
  <div class="ui-result" role="alert" :aria-live="status === 'error' ? 'assertive' : 'polite'">
    <!-- 图标区域 -->
    <div class="ui-result-icon">
      <ui-icon
        :icon="currentIcon"
        :size="iconSize"
        :style="{ color: currentColor }"
        aria-hidden="true"
      />
    </div>

    <!-- 标题区域 -->
    <div v-if="title" class="ui-result-title">
      {{ title }}
    </div>

    <!-- 副标题区域 -->
    <div v-if="subTitle" class="ui-result-subtitle">
      {{ subTitle }}
    </div>

    <!-- 额外内容区域 -->
    <div v-if="$slots.default" class="ui-result-content">
      <slot />
    </div>

    <!-- 操作区域 -->
    <div v-if="$slots.extra" class="ui-result-extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px;
  text-align: center;

  &-icon {
    margin-bottom: 24px;
  }

  &-title {
    margin-bottom: 8px;
    color: var(--ui-color-text-primary, #000);
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.4;
  }

  &-subtitle {
    margin-bottom: 24px;
    color: var(--ui-color-text-secondary, #6b7280);
    font-size: 1rem;
    line-height: 1.5;
  }

  &-content {
    margin-bottom: 32px;
  }

  &-extra {
    display: flex;
    gap: 8px;
    justify-content: center;

    .ui-button + .ui-button {
      margin-left: 8px;
    }
  }
}
</style>
