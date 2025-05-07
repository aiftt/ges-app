<script setup lang="ts" name="UiInput">
/**
 * 输入框组件
 * 创建日期: 2023-06-10
 * 作者: aiftt
 * 更新日期: 2023-06-10 - 初始实现
 */
import { computed, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 输入框类型
   */
  type?: string
  /**
   * 输入框名称
   */
  name?: string
  /**
   * 输入框占位符
   */
  placeholder?: string
  /**
   * 输入框值
   */
  modelValue?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * 输入框大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 前缀图标
   */
  prefixIcon?: string
  /**
   * 后缀图标
   */
  suffixIcon?: string
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 错误提示消息
   */
  errorMessage?: string
  /**
   * 最大长度
   */
  maxlength?: number
  /**
   * 自动获取焦点
   */
  autofocus?: boolean
  /**
   * 自定义样式
   */
  customClass?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  textColor?: string
}>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'default',
  error: false,
  autofocus: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'clear'): void
}>()

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const inputValue = ref(props.modelValue)
const showPasswordText = ref(false)

// 监听modelValue变化
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// 监听内部值变化
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// 输入事件处理
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('input', target.value)
}

// 改变事件处理
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

// 聚焦事件处理
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 失焦事件处理
function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}

// 清除输入内容
function clearInput() {
  inputValue.value = ''
  emit('clear')
  // 获取焦点
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

// 切换密码可见性
function togglePasswordVisibility() {
  showPasswordText.value = !showPasswordText.value
}

// 获取焦点方法
function focus() {
  inputRef.value?.focus()
}

// 失去焦点方法
function blur() {
  inputRef.value?.blur()
}

// 计算实际输入类型
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPasswordText.value ? 'text' : 'password'
  }
  return props.type
})

// 计算输入框样式
const inputClass = computed(() => {
  return [
    'ui-input',
    `ui-input--${props.size}`,
    {
      'ui-input--focused': isFocused.value,
      'ui-input--disabled': props.disabled,
      'ui-input--readonly': props.readonly,
      'ui-input--error': props.error,
      'ui-input--with-prefix': !!props.prefixIcon,
      'ui-input--with-suffix': !!props.suffixIcon || (props.clearable && inputValue.value),
      'ui-input--clearable': props.clearable && inputValue.value,
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)

// 暴露方法给父组件
defineExpose({
  focus,
  blur,
  inputRef,
})
</script>

<template>
  <div class="ui-input-wrapper" :class="inputClass">
    <!-- 前缀图标 -->
    <div v-if="prefixIcon" class="ui-input-prefix">
      <ui-icon :icon="prefixIcon" />
    </div>

    <!-- 输入框 -->
    <input
      ref="inputRef"
      :type="inputType"
      :value="inputValue"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      class="ui-input-inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >

    <!-- 后缀内容 -->
    <div v-if="suffixIcon || (clearable && inputValue) || type === 'password'" class="ui-input-suffix">
      <!-- 清除按钮 -->
      <ui-icon
        v-if="clearable && inputValue && !disabled && !readonly"
        icon="carbon:close"
        class="ui-input-clear"
        @click.stop="clearInput"
      />

      <!-- 密码切换按钮 -->
      <ui-icon
        v-if="type === 'password'"
        :icon="showPasswordText ? 'carbon:view' : 'carbon:view-off'"
        class="ui-input-password-toggle"
        @click.stop="togglePasswordVisibility"
      />

      <!-- 后缀图标 -->
      <ui-icon
        v-if="suffixIcon"
        :icon="suffixIcon"
      />
    </div>

    <!-- 错误信息 -->
    <div v-if="error && errorMessage" class="ui-input-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-input-wrapper {
  --ui-input-border-color: v-bind(borderColorVar);
  --ui-input-bg-color: v-bind(bgColorVar);
  --ui-input-text-color: v-bind(textColorVar);

  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--ui-input-border-color, var(--ui-border-color, #e5e7eb));
  border-radius: var(--ui-border-radius, 0.375rem);
  background-color: var(--ui-input-bg-color, var(--ui-bg-color, #ffffff));
  transition: all 0.2s;
}

.ui-input-inner {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--ui-input-text-color, var(--ui-text-color, #374151));
  outline: none;
  font-size: 1rem;
  line-height: 1.5;
}

.ui-input--small .ui-input-inner {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.ui-input--large .ui-input-inner {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

.ui-input--with-prefix .ui-input-inner {
  padding-left: 2.5rem;
}

.ui-input--with-suffix .ui-input-inner {
  padding-right: 2.5rem;
}

.ui-input-prefix,
.ui-input-suffix {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--ui-text-secondary, #6b7280);
  pointer-events: none;
}

.ui-input-prefix {
  left: 0.75rem;
}

.ui-input-suffix {
  right: 0.75rem;
  display: flex;
  gap: 0.5rem;
}

.ui-input-clear,
.ui-input-password-toggle {
  cursor: pointer;
  pointer-events: auto;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.ui-input-clear:hover,
.ui-input-password-toggle:hover {
  opacity: 1;
}

/* 禁用状态 */
.ui-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--ui-disabled-bg, #f3f4f6);
}

.ui-input--disabled .ui-input-inner {
  cursor: not-allowed;
}

/* 只读状态 */
.ui-input--readonly {
  background-color: var(--ui-readonly-bg, #f9fafb);
}

.ui-input--readonly .ui-input-inner {
  cursor: default;
}

/* 焦点状态 */
.ui-input--focused {
  border-color: var(--ui-color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* 错误状态 */
.ui-input--error {
  border-color: var(--ui-color-danger, #ef4444);
}

.ui-input--error.ui-input--focused {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.ui-input-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-color-danger, #ef4444);
}

/* 深色模式适配 */
:root.dark .ui-input-wrapper {
  border-color: var(--ui-input-border-color, var(--ui-border-color-dark, #4b5563));
  background-color: var(--ui-input-bg-color, var(--ui-bg-color-dark, #1f2937));
}

:root.dark .ui-input-inner {
  color: var(--ui-input-text-color, var(--ui-text-color-dark, #e5e7eb));
}

:root.dark .ui-input-prefix,
:root.dark .ui-input-suffix {
  color: var(--ui-text-secondary-dark, #9ca3af);
}

:root.dark .ui-input--disabled {
  background-color: var(--ui-disabled-bg-dark, #374151);
}

:root.dark .ui-input--readonly {
  background-color: var(--ui-readonly-bg-dark, #111827);
}

:root.dark .ui-input--focused {
  border-color: var(--ui-color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
