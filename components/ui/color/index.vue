<script setup lang="ts" name="UiColor">
/**
 * 颜色显示组件
 * 创建日期: 2025-07-03
 * 作者: aiftt
 *
 * 用于展示颜色样本，支持不同格式的颜色值
 * 更新日期: 2025-05-05 - 改用 CSS 变量 + v-bind 方式实现动态样式
 */

import { computed } from 'vue'
import logger from '~/utils/logger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 颜色值，支持HEX、RGB、RGBA、HSL格式
   */
  value: string
  /**
   * 是否显示颜色值文本
   */
  showValue?: boolean
  /**
   * 是否可复制颜色值
   */
  copyable?: boolean
  /**
   * 组件形状
   */
  shape?: 'circle' | 'square' | 'rounded'
  /**
   * 组件大小，可以是预设值或具体像素
   */
  size?: 'small' | 'default' | 'large' | string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  showValue: false,
  copyable: false,
  shape: 'square',
  size: 'default',
  class: '',
})

// 事件
const emit = defineEmits<{
  (e: 'copy', value: string): void
}>()

// 计算样式
const colorStyle = computed(() => {
  return {
    backgroundColor: props.value,
  }
})

// 计算样式大小
const sizeVar = computed(() => {
  if (['small', 'default', 'large'].includes(props.size)) {
    return null
  }
  return props.size
})

// 根据颜色值计算文本颜色（深色背景用浅色文字，浅色背景用深色文字）
const textColorVar = computed(() => {
  // 简单判断：如果颜色是HEX格式，可以根据亮度判断
  if (props.value.startsWith('#')) {
    const hex = props.value.replace('#', '')
    const r = Number.parseInt(hex.substring(0, 2), 16) || 0
    const g = Number.parseInt(hex.substring(2, 4), 16) || 0
    const b = Number.parseInt(hex.substring(4, 6), 16) || 0

    // 计算亮度 (luminance)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  // 对于其他格式，默认使用深色文字
  return '#000000'
})

// 复制颜色值
async function copyColor() {
  if (!props.copyable)
    return

  try {
    await navigator.clipboard.writeText(props.value)
    emit('copy', props.value)
  }
  catch (error) {
    // 使用logger打印错误
    if (import.meta.client) {
      logger.client.error('复制颜色值失败:', error)
    }
  }
}

// 计算组件类名
const colorClass = computed(() => {
  const classes = [
    'ui-color',
    `ui-color--shape-${props.shape}`,
  ]

  if (['small', 'default', 'large'].includes(props.size)) {
    classes.push(`ui-color--size-${props.size}`)
  }
  else {
    classes.push('ui-color--size-custom')
  }

  if (props.copyable) {
    classes.push('ui-color--copyable')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <div
    :class="colorClass"
    :style="colorStyle"
    @click="copyColor"
  >
    <div v-if="showValue" class="ui-color__text">
      {{ value }}
    </div>
    <div v-if="copyable" class="ui-color__copy-indicator">
      <ui-icon icon="carbon:copy" class="ui-color__copy-icon" size="12" />
    </div>
  </div>
</template>

<style scoped>
.ui-color {
  --ui-color-size-custom: v-bind(sizeVar);

  position: relative;
  display: inline-block;
  vertical-align: middle;
}

/* 预设尺寸 */
.ui-color--size-small {
  width: 16px;
  height: 16px;
}

.ui-color--size-default {
  width: 24px;
  height: 24px;
}

.ui-color--size-large {
  width: 36px;
  height: 36px;
}

.ui-color--size-custom {
  width: var(--ui-color-size-custom);
  height: var(--ui-color-size-custom);
}

/* 形状 */
.ui-color--shape-square {
  border-radius: 0;
}

.ui-color--shape-rounded {
  border-radius: 4px;
}

.ui-color--shape-circle {
  border-radius: 50%;
}

/* 文本 */
.ui-color__text {
  --ui-color-text-color: v-bind(textColorVar);
  color: var(--ui-color-text-color);

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 4px;
}

/* 可复制状态 */
.ui-color--copyable {
  cursor: pointer;
  transition: transform 0.2s;
}

.ui-color--copyable:hover {
  transform: scale(1.1);
}

.ui-color__copy-indicator {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 14px;
  height: 14px;
  background-color: var(--ui-color-component-indicator-bg, #ffffff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ui-color-component-indicator-color, #333333);
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: var(--ui-color-component-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
}

.ui-color--copyable:hover .ui-color__copy-indicator {
  opacity: 1;
}
</style>
