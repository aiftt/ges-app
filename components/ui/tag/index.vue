<script setup lang="ts" name="UiTag">
/**
 * Tag 标签组件
 * 创建日期: 2024-05-30
 * 作者: aiftt
 * 更新日期: 2024-05-30 - 初始版本
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */

import type { ComponentSize, TagType } from '~/types/ui'
import { computed, ref } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 标签类型
   */
  type?: TagType
  /**
   * 标签尺寸
   */
  size?: ComponentSize
  /**
   * 是否可关闭
   */
  closable?: boolean
  /**
   * 是否可点击
   */
  clickable?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否有边框
   */
  bordered?: boolean
  /**
   * 是否圆角
   */
  round?: boolean
  /**
   * 自定义颜色
   */
  color?: string
  /**
   * 自定义背景色
   */
  bgColor?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 标签内容
   */
  content?: string
  /**
   * 前缀图标
   */
  icon?: string
  /**
   * 关闭按钮图标
   */
  closeIcon?: string
  /**
   * 最大宽度，超出显示省略号
   */
  maxWidth?: string
}>(), {
  type: 'default',
  size: 'default',
  closable: false,
  clickable: false,
  disabled: false,
  bordered: true,
  round: false,
  closeIcon: 'carbon:close',
})

// 定义事件
const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
  (e: 'click', event: MouseEvent): void
}>()

// 控制标签显示/隐藏
const visible = ref(true)

// 颜色相关的CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const colorVar = computed(() => props.color || null)
const borderColorVar = computed(() => props.borderColor || null)
const maxWidthVar = computed(() => props.maxWidth || null)

// 计算标签的类名
const tagClasses = computed(() => {
  const classes = ['ui-tag']

  // 类型
  classes.push(`ui-tag--${props.type}`)

  // 尺寸
  classes.push(`ui-tag--${props.size}`)

  // 状态
  if (props.disabled)
    classes.push('ui-tag--disabled')
  if (props.bordered)
    classes.push('ui-tag--bordered')
  if (props.clickable && !props.disabled)
    classes.push('ui-tag--clickable')
  if (props.round)
    classes.push('ui-tag--round')
  if (props.color || props.bgColor || props.borderColor)
    classes.push('ui-tag--custom')

  // 自定义类名
  if (props.class)
    classes.push(props.class)

  return classes
})

// 处理关闭按钮点击
function handleClose(event: MouseEvent) {
  if (props.disabled)
    return

  event.stopPropagation()
  visible.value = false
  emit('close', event)
}

// 处理标签点击
function handleClick(event: MouseEvent) {
  if (props.disabled || !props.clickable)
    return

  emit('click', event)
}
</script>

<template>
  <div
    v-if="visible"
    :class="tagClasses"
    @click="handleClick"
  >
    <!-- 前缀图标 -->
    <ui-icon v-if="icon" :icon="icon" class="ui-tag-icon mr-1 text-sm" />

    <!-- 内容 -->
    <span class="ui-tag-content">
      <slot>{{ content }}</slot>
    </span>

    <!-- 关闭按钮 -->
    <ui-icon
      v-if="closable && !disabled"
      :icon="closeIcon"
      class="ui-tag-close-icon ml-1 cursor-pointer text-sm opacity-70 transition-opacity duration-200"
      @click="handleClose"
    />
  </div>
</template>

<style scoped>
.ui-tag {
  /* 动态变量绑定 */
  --ui-tag-bg-color: v-bind(bgColorVar);
  --ui-tag-text-color: v-bind(colorVar);
  --ui-tag-border-color: v-bind(borderColorVar);
  --ui-tag-max-width: v-bind(maxWidthVar);

  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  max-width: var(--ui-tag-max-width, none);
  border-radius: var(--ui-tag-border-radius, 4px);
  font-size: var(--ui-tag-font-size, 12px);
  line-height: 1;
  white-space: nowrap;
  background-color: var(--ui-tag-bg, var(--ui-tag-bg-color, var(--ui-color-bg-light)));
  color: var(--ui-tag-color, var(--ui-tag-text-color, var(--ui-color-text)));
  transition: all 0.2s;
  cursor: default;
}

.ui-tag--bordered {
  border: 1px solid var(--ui-tag-border-color, var(--ui-tag-border-color, var(--ui-color-border)));
}

.ui-tag--round {
  border-radius: 9999px;
}

.ui-tag--small {
  height: 20px;
  padding: 0 6px;
  font-size: 10px;
}

.ui-tag--default {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
}

.ui-tag--large {
  height: 32px;
  padding: 0 10px;
  font-size: 14px;
}

.ui-tag--primary {
  background-color: var(--ui-tag-primary-bg);
  color: var(--ui-tag-primary-color);
}

.ui-tag--primary.ui-tag--bordered {
  border-color: var(--ui-tag-primary-border-color);
}

.ui-tag--success {
  background-color: var(--ui-tag-success-bg);
  color: var(--ui-tag-success-color);
}

.ui-tag--success.ui-tag--bordered {
  border-color: var(--ui-tag-success-border-color);
}

.ui-tag--warning {
  background-color: var(--ui-tag-warning-bg);
  color: var(--ui-tag-warning-color);
}

.ui-tag--warning.ui-tag--bordered {
  border-color: var(--ui-tag-warning-border-color);
}

.ui-tag--danger {
  background-color: var(--ui-tag-danger-bg);
  color: var(--ui-tag-danger-color);
}

.ui-tag--danger.ui-tag--bordered {
  border-color: var(--ui-tag-danger-border-color);
}

.ui-tag--clickable {
  cursor: pointer;
}

.ui-tag--clickable:hover {
  opacity: 0.85;
}

.ui-tag--clickable:active {
  opacity: 0.7;
}

.ui-tag--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-tag--custom {
  background-color: var(--ui-tag-bg-color) !important;
  color: var(--ui-tag-text-color) !important;
}

.ui-tag--custom.ui-tag--bordered {
  border-color: var(--ui-tag-border-color) !important;
}

.ui-tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tag-close-icon:hover {
  opacity: 1;
}
</style>
