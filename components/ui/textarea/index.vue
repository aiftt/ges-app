<script setup lang="ts" name="UiTextarea">
/**
 * 文本域组件
 * 创建日期: 2023-06-11
 * 作者: aiftt
 * 更新日期: 2023-06-11 - 初始实现
 */
import { computed, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 文本域名称
   */
  name?: string
  /**
   * 文本域占位符
   */
  placeholder?: string
  /**
   * 文本域值
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
   * 最小行数
   */
  minRows?: number
  /**
   * 最大行数
   */
  maxRows?: number
  /**
   * 自动调整高度
   */
  autosize?: boolean
  /**
   * 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * 是否显示字数统计
   */
  showCount?: boolean
  /**
   * 最大长度
   */
  maxlength?: number
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 错误提示消息
   */
  errorMessage?: string
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
  placeholder: '',
  modelValue: '',
  disabled: false,
  readonly: false,
  minRows: 2,
  maxRows: 6,
  autosize: true,
  clearable: false,
  showCount: false,
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
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)
const textareaValue = ref(props.modelValue)
const textareaHeight = ref<string | null>(null)

// 计算当前输入字符数
const currentLength = computed(() => textareaValue.value?.length || 0)

// 监听modelValue变化
watch(() => props.modelValue, (newValue) => {
  textareaValue.value = newValue
  if (props.autosize) {
    nextTick(() => {
      adjustHeight()
    })
  }
})

// 监听内部值变化
watch(textareaValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// 输入事件处理
function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  textareaValue.value = target.value
  emit('input', target.value)

  if (props.autosize) {
    adjustHeight()
  }
}

// 改变事件处理
function handleChange(event: Event) {
  const target = event.target as HTMLTextAreaElement
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
function clearContent() {
  textareaValue.value = ''
  emit('clear')
  // 获取焦点
  if (textareaRef.value) {
    textareaRef.value.focus()
  }

  if (props.autosize) {
    textareaHeight.value = null
  }
}

// 获取焦点方法
function focus() {
  textareaRef.value?.focus()
}

// 失去焦点方法
function blur() {
  textareaRef.value?.blur()
}

// 调整文本域高度
function adjustHeight() {
  const textarea = textareaRef.value
  if (!textarea)
    return

  // 重置高度，以便重新计算
  textarea.style.height = 'auto'

  // 计算新高度
  const lineHeight = Number.parseInt(window.getComputedStyle(textarea).lineHeight) || 22
  const minHeight = props.minRows * lineHeight
  const maxHeight = props.maxRows ? props.maxRows * lineHeight : Infinity

  // 设置为内容高度（scrollHeight包含padding，但我们只想要内容高度）
  const paddingTop = Number.parseInt(window.getComputedStyle(textarea).paddingTop) || 0
  const paddingBottom = Number.parseInt(window.getComputedStyle(textarea).paddingBottom) || 0

  // 内容高度 = scrollHeight - padding - border
  const contentHeight = textarea.scrollHeight - paddingTop - paddingBottom

  // 最终高度：在minHeight和maxHeight之间的内容高度
  const height = Math.max(minHeight, Math.min(contentHeight, maxHeight))

  // 设置高度
  textareaHeight.value = `${height}px`
}

// 计算文本域样式
const textareaClass = computed(() => {
  return [
    'ui-textarea',
    {
      'ui-textarea--focused': isFocused.value,
      'ui-textarea--disabled': props.disabled,
      'ui-textarea--readonly': props.readonly,
      'ui-textarea--error': props.error,
      'ui-textarea--clearable': props.clearable && textareaValue.value,
      'ui-textarea--with-count': props.showCount,
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算文本域样式
const textareaStyle = computed(() => {
  if (textareaHeight.value) {
    return { height: textareaHeight.value }
  }
  return {}
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)

// 页面加载完成后自动调整高度
onMounted(() => {
  if (props.autosize && textareaValue.value) {
    nextTick(() => {
      adjustHeight()
    })
  }
})

// 暴露方法给父组件
defineExpose({
  focus,
  blur,
  textareaRef,
})
</script>

<template>
  <div class="ui-textarea-wrapper" :class="textareaClass">
    <!-- 文本域 -->
    <textarea
      ref="textareaRef"
      :value="textareaValue"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      class="ui-textarea-inner"
      :style="textareaStyle"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- 清除按钮 -->
    <div v-if="clearable && textareaValue && !disabled && !readonly" class="ui-textarea-clear" @click.stop="clearContent">
      <ui-icon icon="carbon:close" />
    </div>

    <!-- 字数统计 -->
    <div v-if="showCount" class="ui-textarea-count">
      <span>{{ currentLength }}</span>
      <span v-if="maxlength">/{{ maxlength }}</span>
    </div>

    <!-- 错误信息 -->
    <div v-if="error && errorMessage" class="ui-textarea-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-textarea-wrapper {
  --ui-textarea-border-color: v-bind(borderColorVar);
  --ui-textarea-bg-color: v-bind(bgColorVar);
  --ui-textarea-text-color: v-bind(textColorVar);

  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 1.5;
}

.ui-textarea-inner {
  display: block;
  width: 100%;
  min-height: 80px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--ui-textarea-border-color, var(--ui-border-color, #e5e7eb));
  border-radius: var(--ui-border-radius, 0.375rem);
  background-color: var(--ui-textarea-bg-color, var(--ui-bg-color, #ffffff));
  color: var(--ui-textarea-text-color, var(--ui-text-color, #374151));
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.2s;
  outline: none;
}

.ui-textarea--with-count .ui-textarea-inner {
  padding-bottom: 1.5rem;
}

.ui-textarea-count {
  position: absolute;
  right: 0.75rem;
  bottom: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-text-secondary, #6b7280);
}

.ui-textarea-clear {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--ui-text-secondary, #6b7280);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
}

.ui-textarea-clear:hover {
  opacity: 1;
}

.ui-textarea-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-color-danger, #ef4444);
}

/* 禁用状态 */
.ui-textarea--disabled .ui-textarea-inner {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--ui-disabled-bg, #f3f4f6);
}

/* 只读状态 */
.ui-textarea--readonly .ui-textarea-inner {
  background-color: var(--ui-readonly-bg, #f9fafb);
  cursor: default;
}

/* 焦点状态 */
.ui-textarea--focused .ui-textarea-inner {
  border-color: var(--ui-color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* 错误状态 */
.ui-textarea--error .ui-textarea-inner {
  border-color: var(--ui-color-danger, #ef4444);
}

.ui-textarea--error.ui-textarea--focused .ui-textarea-inner {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

/* 深色模式适配 */
:root.dark .ui-textarea-inner {
  border-color: var(--ui-textarea-border-color, var(--ui-border-color-dark, #4b5563));
  background-color: var(--ui-textarea-bg-color, var(--ui-bg-color-dark, #1f2937));
  color: var(--ui-textarea-text-color, var(--ui-text-color-dark, #e5e7eb));
}

:root.dark .ui-textarea-count {
  color: var(--ui-text-secondary-dark, #9ca3af);
}

:root.dark .ui-textarea-clear {
  color: var(--ui-text-secondary-dark, #9ca3af);
}

:root.dark .ui-textarea--disabled .ui-textarea-inner {
  background-color: var(--ui-disabled-bg-dark, #374151);
}

:root.dark .ui-textarea--readonly .ui-textarea-inner {
  background-color: var(--ui-readonly-bg-dark, #111827);
}

:root.dark .ui-textarea--focused .ui-textarea-inner {
  border-color: var(--ui-color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
