<script setup lang="ts" name="UiCheckbox">
/**
 * 复选框组件
 * 创建日期: 2024-04-30
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 增加与CheckboxGroup的集成，添加value属性
 */
import { computed, inject } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 是否选中
   */
  modelValue?: boolean
  /**
   * 复选框值（用于CheckboxGroup）
   */
  value?: string | number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 复选框尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 名称
   */
  name?: string
  /**
   * 是否为中间状态
   */
  indeterminate?: boolean
}>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
  indeterminate: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 注入CheckboxGroup上下文
const checkboxGroup = inject<{
  name: string
  size: { value: 'small' | 'default' | 'large' }
  disabled: { value: boolean }
  modelValue: { value: (string | number)[] }
  handleChange: (value: string | number, checked: boolean) => void
  isChecked: (value: string | number) => boolean
} | null>('checkboxGroup', null)

// 计算选中状态
const isChecked = computed(() => {
  if (checkboxGroup && props.value !== undefined) {
    return checkboxGroup.isChecked(props.value)
  }
  return props.modelValue
})

// 计算禁用状态
const isDisabled = computed(() => {
  return checkboxGroup ? checkboxGroup.disabled.value || props.disabled : props.disabled
})

// 计算尺寸
const checkboxSize = computed(() => {
  return checkboxGroup ? checkboxGroup.size.value : props.size
})

// 复选框样式类
const checkboxClass = computed(() => {
  const classes = ['ui-checkbox']

  // 尺寸
  classes.push(`ui-checkbox--${checkboxSize.value}`)

  // 禁用状态
  if (isDisabled.value) {
    classes.push('ui-checkbox--disabled')
  }

  // 选中状态
  if (isChecked.value) {
    classes.push('ui-checkbox--checked')
  }

  // 中间状态
  if (props.indeterminate) {
    classes.push('ui-checkbox--indeterminate')
  }

  return classes.join(' ')
})

// 处理复选框点击
function handleChange(event: Event) {
  if (isDisabled.value)
    return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (checkboxGroup && props.value !== undefined) {
    // 如果在组内，通知组处理
    checkboxGroup.handleChange(props.value, checked)
  }
  else {
    // 单独使用时，直接更新值
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}
</script>

<template>
  <label :class="checkboxClass">
    <input
      type="checkbox"
      class="ui-checkbox-input"
      :checked="isChecked"
      :disabled="isDisabled"
      :name="name"
      :indeterminate="indeterminate"
      @change="handleChange"
    >
    <span class="ui-checkbox-inner" />
    <span v-if="$slots.default" class="ui-checkbox-label">
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

/* 中间状态 */
.ui-checkbox--indeterminate .ui-checkbox-inner::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  width: 8px;
  height: 0;
  border-width: 0 0 2px 0;
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

.ui-checkbox--checked.ui-checkbox--disabled .ui-checkbox-inner::after {
  border-color: var(--ui-color-disabled-text, #ccc);
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

/* 深色模式适配 */
:root.dark .ui-checkbox {
  color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-checkbox-inner {
  border-color: var(--ui-color-border-dark, #4b5563);
  background-color: var(--ui-color-bg-dark, #1f2937);
}

:root.dark .ui-checkbox--disabled .ui-checkbox-inner {
  background-color: var(--ui-color-bg-secondary-dark, #111827);
}

:root.dark .ui-checkbox--disabled.ui-checkbox--checked .ui-checkbox-inner {
  background-color: var(--ui-color-text-disabled-dark, #6b7280);
  border-color: var(--ui-color-text-disabled-dark, #6b7280);
}

/* CSS变量已移至主题文件中 */
</style>
