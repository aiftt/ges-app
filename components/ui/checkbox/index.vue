<script setup lang="ts" name="UiCheckbox">
/**
 * 复选框组件
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-04-30 - 初始版本
 */
import { computed } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 是否选中
   */
  modelValue?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 复选框尺寸
   */
  size?: 'small' | 'default' | 'large'
}>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 复选框样式类
const checkboxClass = computed(() => {
  const classes = ['ui-checkbox']

  // 尺寸
  classes.push(`ui-checkbox--${props.size}`)

  // 禁用状态
  if (props.disabled) {
    classes.push('ui-checkbox--disabled')
  }

  // 选中状态
  if (props.modelValue) {
    classes.push('ui-checkbox--checked')
  }

  return classes.join(' ')
})

// 处理复选框点击
function handleChange(event: Event) {
  if (props.disabled)
    return

  const target = event.target as HTMLInputElement
  const newValue = target.checked

  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <label :class="checkboxClass">
    <input
      type="checkbox"
      class="ui-checkbox-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    >
    <span class="ui-checkbox-inner" />
    <span class="ui-checkbox-label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--ui-font-size, 1rem);
  color: var(--ui-color-text, #374151);
  user-select: none;
}

.ui-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.ui-checkbox-inner {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--ui-color-border, #e5e7eb);
  border-radius: 2px;
  background-color: var(--ui-color-bg, #ffffff);
  transition: all 0.2s;
}

.ui-checkbox-inner::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 8px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  content: '';
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}

.ui-checkbox--checked .ui-checkbox-inner {
  background-color: var(--ui-color-primary, #10b981);
  border-color: var(--ui-color-primary, #10b981);
}

.ui-checkbox--checked .ui-checkbox-inner::after {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(45deg) scale(1);
}

.ui-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-checkbox--disabled .ui-checkbox-inner {
  background-color: var(--ui-color-bg-secondary, #f9fafb);
  border-color: var(--ui-color-border, #e5e7eb);
}

.ui-checkbox--disabled.ui-checkbox--checked .ui-checkbox-inner {
  background-color: var(--ui-color-text-disabled, #9ca3af);
  border-color: var(--ui-color-text-disabled, #9ca3af);
}

.ui-checkbox-label {
  padding-left: 8px;
  line-height: 1;
}

/* 尺寸变体 */
.ui-checkbox--small .ui-checkbox-inner {
  width: 14px;
  height: 14px;
}

.ui-checkbox--small .ui-checkbox-inner::after {
  width: 3px;
  height: 7px;
}

.ui-checkbox--small {
  font-size: var(--ui-font-size-sm, 0.875rem);
}

.ui-checkbox--large .ui-checkbox-inner {
  width: 18px;
  height: 18px;
}

.ui-checkbox--large .ui-checkbox-inner::after {
  width: 5px;
  height: 9px;
}

.ui-checkbox--large {
  font-size: var(--ui-font-size-lg, 1.125rem);
}

/* 深色主题适配 */
:root.dark .ui-checkbox-inner {
  background-color: var(--ui-color-bg, #1f2937);
  border-color: var(--ui-color-border, #374151);
}

:root.dark .ui-checkbox--disabled .ui-checkbox-inner {
  background-color: var(--ui-color-bg-secondary, #111827);
}
</style>
