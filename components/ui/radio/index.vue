<script setup lang="ts" name="UiRadio">
/**
 * 单选按钮组件
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { computed, inject } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 是否选中
   */
  modelValue?: boolean
  /**
   * 单选按钮值（用于RadioGroup）
   */
  value?: string | number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 单选按钮尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 名称
   */
  name?: string
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

// 注入RadioGroup上下文
const radioGroup = inject<{
  name: string
  size: { value: 'small' | 'default' | 'large' }
  disabled: { value: boolean }
  modelValue: { value: string | number }
  handleChange: (value: string | number) => void
} | null>('radioGroup', null)

// 计算选中状态
const isChecked = computed(() => {
  if (radioGroup && props.value !== undefined) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue
})

// 计算禁用状态
const isDisabled = computed(() => {
  return radioGroup ? radioGroup.disabled.value || props.disabled : props.disabled
})

// 计算尺寸
const radioSize = computed(() => {
  return radioGroup ? radioGroup.size.value : props.size
})

// 单选按钮样式类
const radioClass = computed(() => {
  const classes = ['ui-radio']

  // 尺寸
  classes.push(`ui-radio--${radioSize.value}`)

  // 禁用状态
  if (isDisabled.value) {
    classes.push('ui-radio--disabled')
  }

  // 选中状态
  if (isChecked.value) {
    classes.push('ui-radio--checked')
  }

  return classes.join(' ')
})

// 处理单选按钮点击
function handleChange(event: Event) {
  if (isDisabled.value)
    return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (radioGroup && props.value !== undefined) {
    // 如果在组内，通知组处理
    radioGroup.handleChange(props.value)
  }
  else {
    // 单独使用时，直接更新值
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}
</script>

<template>
  <label :class="radioClass">
    <input
      type="radio"
      class="ui-radio-input"
      :checked="isChecked"
      :disabled="isDisabled"
      :name="radioGroup?.name || name"
      @change="handleChange"
    >
    <span class="ui-radio-inner" />
    <span v-if="$slots.default" class="ui-radio-label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.ui-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--ui-font-size, 1rem);
  color: var(--ui-color-text, #374151);
  user-select: none;
}

.ui-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.ui-radio-inner {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--ui-color-border, #e5e7eb);
  border-radius: 50%;
  background-color: var(--ui-color-bg, #ffffff);
  transition: all 0.2s;
}

.ui-radio-inner::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  content: '';
  transition: all 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.ui-radio--checked .ui-radio-inner {
  background-color: var(--ui-color-primary, #10b981);
  border-color: var(--ui-color-primary, #10b981);
}

.ui-radio--checked .ui-radio-inner::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.ui-radio--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-radio--disabled .ui-radio-inner {
  background-color: var(--ui-color-bg-secondary, #f9fafb);
  border-color: var(--ui-color-border, #e5e7eb);
}

.ui-radio--disabled.ui-radio--checked .ui-radio-inner {
  background-color: var(--ui-color-text-disabled, #9ca3af);
  border-color: var(--ui-color-text-disabled, #9ca3af);
}

.ui-radio-label {
  padding-left: 8px;
  line-height: 1;
}

/* 尺寸变体 */
.ui-radio--small .ui-radio-inner {
  width: 14px;
  height: 14px;
}

.ui-radio--small .ui-radio-inner::after {
  width: 6px;
  height: 6px;
}

.ui-radio--small {
  font-size: var(--ui-font-size-sm, 0.875rem);
}

.ui-radio--large .ui-radio-inner {
  width: 18px;
  height: 18px;
}

.ui-radio--large .ui-radio-inner::after {
  width: 10px;
  height: 10px;
}

.ui-radio--large {
  font-size: var(--ui-font-size-lg, 1.125rem);
}

/* 深色模式适配 */
:root.dark .ui-radio {
  color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-radio-inner {
  border-color: var(--ui-color-border-dark, #4b5563);
  background-color: var(--ui-color-bg-dark, #1f2937);
}

:root.dark .ui-radio--disabled .ui-radio-inner {
  background-color: var(--ui-color-bg-secondary-dark, #111827);
}

:root.dark .ui-radio--disabled.ui-radio--checked .ui-radio-inner {
  background-color: var(--ui-color-text-disabled-dark, #6b7280);
  border-color: var(--ui-color-text-disabled-dark, #6b7280);
}
</style>
