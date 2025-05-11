<script setup lang="ts" name="UiInputVerification">
/**
 * 验证码输入组件
 * 创建日期: 2024-07-08
 * 作者: aiftt
 * 更新日期: 2024-07-08 - 初始实现
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */
import type { ComponentSize, VerificationType } from '~/types/ui'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string
  /**
   * 验证码长度
   */
  length?: number
  /**
   * 输入类型
   */
  type?: VerificationType
  /**
   * 是否自动聚焦
   */
  autofocus?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 错误提示消息
   */
  errorMessage?: string
  /**
   * 是否显示分隔符
   */
  showSeparator?: boolean
  /**
   * 字符掩码，用于隐藏输入的字符
   */
  mask?: boolean
  /**
   * 自动提交（当输入完成时自动触发submit事件）
   */
  autoSubmit?: boolean
  /**
   * 自动大写
   */
  uppercase?: boolean
  /**
   * 输入框大小
   */
  size?: ComponentSize
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 自定义样式变量
   */
  borderColor?: string
  bgColor?: string
  textColor?: string
  focusColor?: string
  /**
   * 字符间距
   */
  gap?: string
}>(), {
  length: 6,
  type: 'text',
  autofocus: true,
  disabled: false,
  readonly: false,
  error: false,
  showSeparator: false,
  mask: false,
  autoSubmit: false,
  uppercase: false,
  size: 'default',
  gap: '8px',
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', index: number): void
  (e: 'blur'): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'complete', value: string): void
  (e: 'submit', value: string): void
}>()

// 内部状态
const inputRefs = ref<HTMLInputElement[]>([])
const activeIndex = ref(0)
const codes = ref<string[]>(Array.from({ length: props.length }).fill('') as string[])

// 实体值计算
const verificationCode = computed(() => codes.value.join(''))

// 观察modelValue变化
watch(() => props.modelValue, (newValue) => {
  if (newValue === undefined || newValue === null) {
    resetCodes()
    return
  }

  const strValue = String(newValue)
  const newCodes = Array.from({ length: props.length }).fill('') as string[]

  for (let i = 0; i < Math.min(strValue.length, props.length); i++) {
    newCodes[i] = strValue[i]
  }

  codes.value = newCodes
}, { immediate: true })

// 观察codes变化，更新modelValue
watch(verificationCode, (newValue) => {
  emit('update:modelValue', newValue)
  emit('change', newValue)

  // 判断是否完成输入
  if (newValue.length === props.length && !newValue.includes('')) {
    emit('complete', newValue)

    // 自动提交
    if (props.autoSubmit) {
      emit('submit', newValue)
    }
  }
})

// 自动聚焦到第一个输入框
onMounted(() => {
  if (props.autofocus && !props.disabled && !props.readonly) {
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  }
})

// 重置验证码
function resetCodes() {
  codes.value = Array.from({ length: props.length }).fill('') as string[]
  activeIndex.value = 0
}

// 处理输入
function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 处理输入类型限制
  if (props.type === 'number') {
    value = value.replace(/\D/g, '')
  }
  else if (props.type === 'alphanumeric') {
    value = value.replace(/[^a-z0-9]/gi, '')
  }

  // 转换为大写
  if (props.uppercase) {
    value = value.toUpperCase()
  }

  // 取最后一个字符（处理粘贴和快速输入）
  if (value.length > 1) {
    value = value.slice(-1)
  }

  // 更新当前字符
  codes.value[index] = value

  // 自动跳转到下一个输入框
  if (value && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
      activeIndex.value = index + 1
    })
  }

  emit('input', verificationCode.value)
}

// 处理键盘事件
function handleKeydown(index: number, event: KeyboardEvent) {
  if (props.disabled || props.readonly)
    return

  // 处理删除键
  if (event.key === 'Backspace' || event.key === 'Delete') {
    if (codes.value[index]) {
      codes.value[index] = ''
    }
    else if (index > 0 && event.key === 'Backspace') {
      // 当前输入框为空，删除前一个输入框的内容并聚焦
      codes.value[index - 1] = ''
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
        activeIndex.value = index - 1
      })
    }
  }

  // 处理左右箭头键
  if (event.key === 'ArrowLeft' && index > 0) {
    nextTick(() => {
      inputRefs.value[index - 1]?.focus()
      activeIndex.value = index - 1
    })
  }

  if (event.key === 'ArrowRight' && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
      activeIndex.value = index + 1
    })
  }
}

// 处理粘贴事件
function handlePaste(index: number, event: ClipboardEvent) {
  if (props.disabled || props.readonly)
    return

  // 阻止默认粘贴行为
  event.preventDefault()

  // 获取粘贴的文本
  const pastedText = event.clipboardData?.getData('text') || ''
  if (!pastedText)
    return

  // 处理输入类型限制
  let processedText = pastedText
  if (props.type === 'number') {
    processedText = pastedText.replace(/\D/g, '')
  }
  else if (props.type === 'alphanumeric') {
    processedText = pastedText.replace(/[^a-z0-9]/gi, '')
  }

  // 转换为大写
  if (props.uppercase) {
    processedText = processedText.toUpperCase()
  }

  // 填充验证码
  const newCodes = [...codes.value]
  for (let i = 0; i < Math.min(processedText.length, props.length - index); i++) {
    newCodes[index + i] = processedText[i]
  }

  codes.value = newCodes

  // 填充后聚焦到最后一个有内容的输入框的下一个，或者最后一个
  const nextFocusIndex = Math.min(index + processedText.length, props.length - 1)
  nextTick(() => {
    inputRefs.value[nextFocusIndex]?.focus()
    activeIndex.value = nextFocusIndex
  })
}

// 处理焦点
function handleFocus(index: number) {
  activeIndex.value = index
  emit('focus', index)
}

// 处理失焦
function handleBlur() {
  emit('blur')
}

// 计算输入框样式
const verificationClass = computed(() => {
  return [
    'ui-input-verification',
    `ui-input-verification--${props.size}`,
    {
      'ui-input-verification--disabled': props.disabled,
      'ui-input-verification--readonly': props.readonly,
      'ui-input-verification--error': props.error,
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算输入字段样式
const inputClass = computed(() => {
  return [
    'ui-input-verification-field',
    `ui-input-verification-field--${props.size}`,
  ]
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const focusColorVar = computed(() => props.focusColor || null)
const gapVar = computed(() => props.gap || null)

// 暴露方法给父组件
defineExpose({
  focus: (index = 0) => {
    if (index >= 0 && index < props.length) {
      inputRefs.value[index]?.focus()
    }
  },
  reset: resetCodes,
  getCode: () => verificationCode.value,
})
</script>

<template>
  <div :class="verificationClass">
    <div class="ui-input-verification-fields">
      <template v-for="(_, index) in Array(length)" :key="index">
        <!-- 分隔符 -->
        <span
          v-if="showSeparator && index > 0 && index < length"
          class="ui-input-verification-separator"
        >-</span>

        <!-- 输入框 -->
        <div
          class="ui-input-verification-field-wrapper"
          :class="{ 'ui-input-verification-field-wrapper--active': activeIndex === index }"
        >
          <input
            :ref="el => { if (el) inputRefs[index] = el as HTMLInputElement }"
            v-model="codes[index]"
            type="text"
            :class="inputClass"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="1"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @paste="handlePaste(index, $event)"
            @focus="handleFocus(index)"
            @blur="handleBlur"
          >
          <span
            v-if="mask && codes[index]"
            class="ui-input-verification-mask"
          >•</span>
        </div>
      </template>
    </div>

    <!-- 错误提示 -->
    <div v-if="error && errorMessage" class="ui-input-verification-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-input-verification {
  --ui-verification-border-color: v-bind(borderColorVar);
  --ui-verification-bg-color: v-bind(bgColorVar);
  --ui-verification-text-color: v-bind(textColorVar);
  --ui-verification-focus-color: v-bind(focusColorVar);
  --ui-verification-gap: v-bind(gapVar);
}

.ui-input-verification-fields {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ui-verification-gap, 8px);
}

.ui-input-verification-field-wrapper {
  position: relative;
  width: 40px;
  height: 46px;
}

.ui-input-verification--small .ui-input-verification-field-wrapper {
  width: 32px;
  height: 36px;
}

.ui-input-verification--large .ui-input-verification-field-wrapper {
  width: 48px;
  height: 56px;
}

.ui-input-verification-field {
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid var(--ui-verification-border-color, var(--ui-border-color));
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-verification-bg-color, var(--ui-color-bg));
  color: var(--ui-verification-text-color, var(--ui-color-text));
  font-size: 18px;
  font-weight: 500;
  padding: 0;
  transition: all 0.2s;
  outline: none;
  appearance: textfield;
  -moz-appearance: textfield;
}

.ui-input-verification-field::-webkit-outer-spin-button,
.ui-input-verification-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ui-input-verification--small .ui-input-verification-field {
  font-size: 14px;
}

.ui-input-verification--large .ui-input-verification-field {
  font-size: 22px;
}

.ui-input-verification-field-wrapper--active .ui-input-verification-field {
  border-color: var(--ui-verification-focus-color, var(--ui-color-primary));
  box-shadow: 0 0 0 1px var(--ui-verification-focus-color, rgba(16, 185, 129, 0.1));
}

.ui-input-verification--disabled .ui-input-verification-field {
  background-color: var(--ui-disabled-bg);
  border-color: var(--ui-color-disabled-border);
  color: var(--ui-color-disabled-text);
  cursor: not-allowed;
}

.ui-input-verification--readonly .ui-input-verification-field {
  pointer-events: none;
}

.ui-input-verification--error .ui-input-verification-field {
  border-color: var(--ui-color-danger);
}

.ui-input-verification--error .ui-input-verification-field-wrapper--active .ui-input-verification-field {
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.ui-input-verification-separator {
  color: var(--ui-color-text-light);
  margin: 0 4px;
  font-weight: 500;
}

.ui-input-verification-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: var(--ui-verification-bg-color, var(--ui-color-bg));
  pointer-events: none;
}

.ui-input-verification--small .ui-input-verification-mask {
  font-size: 16px;
}

.ui-input-verification--large .ui-input-verification-mask {
  font-size: 24px;
}

.ui-input-verification-error-message {
  margin-top: 8px;
  color: var(--ui-color-danger);
  font-size: 12px;
  text-align: left;
}
</style>
