<script setup lang="ts" name="UiInputNumber">
/**
 * 数字输入框组件
 * 创建日期: 2024-07-05
 * 作者: aiftt
 * 更新日期: 2024-07-05 - 初始实现
 */
import { computed, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: number | string
  /**
   * 输入框占位符
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 输入框大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 错误提示消息
   */
  errorMessage?: string
  /**
   * 是否显示控制按钮
   */
  controls?: boolean
  /**
   * 步长
   */
  step?: number
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 数值精度
   */
  precision?: number
  /**
   * 自定义样式
   */
  customClass?: string
  /**
   * 是否严格步进（仅在点击控制按钮时生效）
   */
  strictStep?: boolean
  /**
   * 控制按钮的位置
   */
  controlsPosition?: 'right' | 'both'
  /**
   * 是否允许输入小数
   */
  allowDecimal?: boolean
  /**
   * 是否允许输入负数
   */
  allowNegative?: boolean
  /**
   * 自动获取焦点
   */
  autofocus?: boolean
  /**
   * 是否自动修正超出范围的值
   */
  autoCorrect?: boolean
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
  disabled: false,
  readonly: false,
  size: 'default',
  error: false,
  controls: true,
  step: 1,
  precision: 0,
  strictStep: false,
  controlsPosition: 'right',
  allowDecimal: true,
  allowNegative: true,
  autofocus: false,
  autoCorrect: true,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: number | string): void
  (e: 'input', value: number | string): void
}>()

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const inputValue = ref<string>('')
const userTyping = ref(false)

// 计算当前实际值
const currentValue = computed(() => {
  if (inputValue.value === '' || inputValue.value === '-') {
    return props.modelValue !== undefined ? props.modelValue : ''
  }

  let value = Number.parseFloat(inputValue.value)

  // 处理精度
  if (Number.isFinite(props.precision) && props.precision >= 0) {
    value = Number.parseFloat(value.toFixed(props.precision))
  }

  // 处理最大最小值
  if (props.autoCorrect) {
    if (props.max !== undefined && value > props.max) {
      value = props.max
    }
    if (props.min !== undefined && value < props.min) {
      value = props.min
    }
  }

  return Number.isNaN(value) ? '' : value
})

// 计算当前格式化后的值
const displayValue = computed(() => {
  if (userTyping.value) {
    return inputValue.value
  }

  // 格式化显示值
  const value = currentValue.value
  if (value === undefined || value === null || value === '') {
    return ''
  }

  // 应用精度
  if (Number.isFinite(value)) {
    // 先确保value是数字类型
    const numValue = typeof value === 'string' ? Number.parseFloat(value) : value
    return Number.parseFloat(numValue.toFixed(props.precision)).toString()
  }

  return value.toString()
})

// 初始化
watch(() => props.modelValue, (newValue) => {
  if (!userTyping.value) {
    if (newValue === undefined || newValue === null) {
      inputValue.value = ''
    }
    else {
      let valueStr = newValue.toString()
      // 如果有精度要求，应用精度格式化
      if (Number.isFinite(props.precision) && props.precision >= 0 && !Number.isNaN(Number.parseFloat(valueStr))) {
        const value = Number.parseFloat(valueStr)
        valueStr = Number.parseFloat(value.toFixed(props.precision)).toString()
      }
      inputValue.value = valueStr
    }
  }
}, { immediate: true })

// 输入事件处理
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value

  // 用户正在输入时设置标志
  userTyping.value = true

  // 验证输入的有效性
  if (value === '' || value === '-') {
    inputValue.value = value
    return
  }

  // 数字验证
  const numberRegex = props.allowDecimal
    ? (props.allowNegative ? /^-?\d*(?:\.\d*)?$/ : /^\d*(?:\.\d*)?$/)
    : (props.allowNegative ? /^-?\d*$/ : /^\d*$/)

  if (!numberRegex.test(value)) {
    // 恢复到有效的值
    target.value = inputValue.value
    return
  }

  // 更新内部值
  inputValue.value = value

  // 更新实际值
  updateActualValue(false)

  // 触发输入事件
  emit('input', currentValue.value)
}

// 更新实际值
function updateActualValue(isChange = true) {
  const value = currentValue.value
  emit('update:modelValue', value)

  if (isChange) {
    emit('change', value)
  }
}

// 处理失焦事件
function handleBlur(event: FocusEvent) {
  isFocused.value = false
  userTyping.value = false

  // 值校验和格式化
  if (inputValue.value !== '' && inputValue.value !== '-') {
    let value = Number.parseFloat(inputValue.value)

    // 应用范围限制
    if (props.max !== undefined && value > props.max) {
      value = props.max
    }
    if (props.min !== undefined && value < props.min) {
      value = props.min
    }

    // 应用精度
    if (Number.isFinite(props.precision) && props.precision >= 0) {
      value = Number.parseFloat(value.toFixed(props.precision))
    }

    inputValue.value = value.toString()
  }
  else if (inputValue.value === '-') {
    // 仅输入负号时，清空或设为最小值
    if (props.min !== undefined && props.min < 0) {
      inputValue.value = props.min.toString()
    }
    else {
      inputValue.value = ''
    }
  }

  // 更新实际值
  updateActualValue(true)

  emit('blur', event)
}

// 处理聚焦事件
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 增加值
function increase() {
  if (props.disabled || props.readonly)
    return

  let value = currentValue.value === '' ? 0 : Number.parseFloat(currentValue.value.toString())

  // 应用步长
  value += props.step

  // 处理最大值
  if (props.max !== undefined && value > props.max) {
    value = props.max
  }

  // 应用精度
  if (Number.isFinite(props.precision) && props.precision >= 0) {
    value = Number.parseFloat(value.toFixed(props.precision))
  }

  inputValue.value = value.toString()
  userTyping.value = false
  updateActualValue(true)

  // 获取焦点
  inputRef.value?.focus()
}

// 减少值
function decrease() {
  if (props.disabled || props.readonly)
    return

  let value = currentValue.value === '' ? 0 : Number.parseFloat(currentValue.value.toString())

  // 应用步长
  value -= props.step

  // 处理最小值
  if (props.min !== undefined && value < props.min) {
    value = props.min
  }

  // 应用精度
  if (Number.isFinite(props.precision) && props.precision >= 0) {
    value = Number.parseFloat(value.toFixed(props.precision))
  }

  inputValue.value = value.toString()
  userTyping.value = false
  updateActualValue(true)

  // 获取焦点
  inputRef.value?.focus()
}

// 键盘事件处理
function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly)
    return

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      increase()
      break
    case 'ArrowDown':
      event.preventDefault()
      decrease()
      break
  }
}

// 计算输入框样式
const inputNumberClass = computed(() => {
  return [
    'ui-input-number',
    `ui-input-number--${props.size}`,
    {
      'ui-input-number--focused': isFocused.value,
      'ui-input-number--disabled': props.disabled,
      'ui-input-number--readonly': props.readonly,
      'ui-input-number--error': props.error,
      'ui-input-number--controls-right': props.controlsPosition === 'right',
      'ui-input-number--controls-both': props.controlsPosition === 'both',
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算是否可增加（到达最大值时禁用增加按钮）
const increaseDisabled = computed(() => {
  if (props.disabled || props.readonly)
    return true
  if (props.max === undefined)
    return false
  const value = currentValue.value === '' ? 0 : Number.parseFloat(currentValue.value.toString())
  return value >= props.max
})

// 计算是否可减少（到达最小值时禁用减少按钮）
const decreaseDisabled = computed(() => {
  if (props.disabled || props.readonly)
    return true
  if (props.min === undefined)
    return false
  const value = currentValue.value === '' ? 0 : Number.parseFloat(currentValue.value.toString())
  return value <= props.min
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  increase,
  decrease,
})
</script>

<template>
  <div :class="inputNumberClass">
    <!-- 左侧控制按钮 (仅在controlsPosition为both时显示) -->
    <div v-if="controls && controlsPosition === 'both'" class="ui-input-number-controls ui-input-number-controls-left">
      <button
        type="button"
        class="ui-input-number-decrease"
        :class="{ 'is-disabled': decreaseDisabled }"
        @click="decrease"
      >
        <ui-icon icon="carbon:subtract" />
      </button>
    </div>

    <!-- 输入框 -->
    <input
      ref="inputRef"
      type="text"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      class="ui-input-number-input"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeydown"
    >

    <!-- 右侧控制按钮 (right模式) -->
    <div v-if="controls && controlsPosition === 'right'" class="ui-input-number-controls ui-input-number-controls-right">
      <button
        type="button"
        class="ui-input-number-increase"
        :class="{ 'is-disabled': increaseDisabled }"
        @click="increase"
      >
        <ui-icon icon="carbon:chevron-up" />
      </button>
      <button
        type="button"
        class="ui-input-number-decrease"
        :class="{ 'is-disabled': decreaseDisabled }"
        @click="decrease"
      >
        <ui-icon icon="carbon:chevron-down" />
      </button>
    </div>

    <!-- 右侧控制按钮 (both模式) -->
    <div v-if="controls && controlsPosition === 'both'" class="ui-input-number-controls ui-input-number-controls-right">
      <button
        type="button"
        class="ui-input-number-increase"
        :class="{ 'is-disabled': increaseDisabled }"
        @click="increase"
      >
        <ui-icon icon="carbon:add" />
      </button>
    </div>

    <!-- 错误提示 -->
    <div v-if="error && errorMessage" class="ui-input-number-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-input-number {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  font-size: var(--ui-font-size);
  line-height: 1.5;
  --ui-input-number-border-color: v-bind(borderColorVar);
  --ui-input-number-bg-color: v-bind(bgColorVar);
  --ui-input-number-text-color: v-bind(textColorVar);
}

.ui-input-number-input {
  flex: 1;
  padding: 0 12px;
  height: 36px;
  font-size: var(--ui-font-size);
  border-radius: var(--ui-border-radius);
  border: 1px solid var(--ui-input-number-border-color, var(--ui-border-color));
  background-color: var(--ui-input-number-bg-color, var(--ui-color-bg));
  color: var(--ui-input-number-text-color, var(--ui-color-text));
  transition: all 0.2s;
  outline: none;
  text-align: left;
}

.ui-input-number--small .ui-input-number-input {
  height: 28px;
  padding: 0 8px;
  font-size: 12px;
}

.ui-input-number--large .ui-input-number-input {
  height: 42px;
  padding: 0 16px;
  font-size: 16px;
}

.ui-input-number--controls-right .ui-input-number-input {
  padding-right: 36px;
}

.ui-input-number--controls-both .ui-input-number-input {
  padding-left: 36px;
  padding-right: 36px;
}

.ui-input-number-input:focus {
  border-color: var(--ui-color-primary);
  /* 优化聚焦时的边框样式，减小阴影和亮度 */
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.1);
}

.ui-input-number--disabled .ui-input-number-input {
  background-color: var(--ui-disabled-bg);
  border-color: var(--ui-color-disabled-border);
  color: var(--ui-color-disabled-text);
  cursor: not-allowed;
}

.ui-input-number--readonly .ui-input-number-input {
  pointer-events: none;
}

.ui-input-number--error .ui-input-number-input {
  border-color: var(--ui-color-danger);
}

.ui-input-number--error .ui-input-number-input:focus {
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.ui-input-number-controls {
  display: flex;
  flex-direction: column;
  position: absolute;
  /* 确保控制按钮总是在输入框内部 */
  top: 1px;
  bottom: 1px;
  right: 1px;
  width: 22px;
  border-left: 1px solid var(--ui-border-color);
  border-radius: 0 var(--ui-border-radius) var(--ui-border-radius) 0;
  background-color: var(--ui-color-bg-light);
  z-index: 1;
  overflow: hidden;
}

.ui-input-number-controls-left {
  left: 1px;
  right: auto;
  border-left: none;
  border-right: 1px solid var(--ui-border-color);
  border-radius: var(--ui-border-radius) 0 0 var(--ui-border-radius);
}

.ui-input-number--small .ui-input-number-controls {
  width: 18px;
}

.ui-input-number--large .ui-input-number-controls {
  width: 26px;
}

.ui-input-number-increase,
.ui-input-number-decrease {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  color: var(--ui-color-text-light);
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  font-size: 12px;
  height: 50%; /* 确保按钮高度占据一半空间 */
  min-height: 14px; /* 确保最小高度足够显示图标 */
}

.ui-input-number--large .ui-input-number-increase,
.ui-input-number--large .ui-input-number-decrease {
  font-size: 14px;
}

.ui-input-number-increase:hover,
.ui-input-number-decrease:hover {
  color: var(--ui-color-primary);
  background-color: var(--ui-color-bg-hover);
}

.ui-input-number-increase:active,
.ui-input-number-decrease:active {
  color: var(--ui-color-primary-dark);
}

.ui-input-number-increase.is-disabled,
.ui-input-number-decrease.is-disabled {
  cursor: not-allowed;
  color: var(--ui-color-disabled-text);
  background-color: transparent;
}

.ui-input-number-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 4px;
  font-size: 12px;
  color: var(--ui-color-danger);
  line-height: 1.2;
}

/* 控制按钮在两侧时的特殊样式 */
.ui-input-number--controls-both .ui-input-number-controls {
  /* 修改为垂直布局，保持整个高度 */
  flex-direction: column;
  height: 100%;
}

.ui-input-number--controls-both .ui-input-number-controls-left,
.ui-input-number--controls-both .ui-input-number-controls-right {
  width: 22px;
}

.ui-input-number--small.ui-input-number--controls-both .ui-input-number-controls {
  width: 18px;
}

.ui-input-number--large.ui-input-number--controls-both .ui-input-number-controls {
  width: 26px;
}

/* 在both模式下，每个按钮占据控制区域的全部高度 */
.ui-input-number--controls-both .ui-input-number-controls-left .ui-input-number-decrease,
.ui-input-number--controls-both .ui-input-number-controls-right .ui-input-number-increase {
  height: 100%;
}

/* 调整图标大小，确保在按钮内完整显示 */
.ui-input-number-increase .ui-icon,
.ui-input-number-decrease .ui-icon {
  font-size: 12px;
  height: 12px;
  width: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-input-number--small .ui-input-number-increase .ui-icon,
.ui-input-number--small .ui-input-number-decrease .ui-icon {
  font-size: 10px;
  height: 10px;
  width: 10px;
}

.ui-input-number--large .ui-input-number-increase .ui-icon,
.ui-input-number--large .ui-input-number-decrease .ui-icon {
  font-size: 14px;
  height: 14px;
  width: 14px;
}
</style>
