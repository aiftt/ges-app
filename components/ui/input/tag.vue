<script setup lang="ts" name="UiInputTag">
/**
 * 标签输入框组件
 * 创建日期: 2024-07-08
 * 作者: aiftt
 * 更新日期: 2024-07-10 - 修复删除标签时的递归更新问题，增加标签颜色配置
 */
import { computed, nextTick, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值，标签数组
   */
  modelValue?: string[]
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
   * 最大允许的标签数量
   */
  maxTags?: number
  /**
   * 标签之间的分隔符，用于将输入的内容分割成多个标签
   */
  delimiter?: string | string[]
  /**
   * 是否允许重复的标签
   */
  allowDuplicate?: boolean
  /**
   * 标签最小长度
   */
  minLength?: number
  /**
   * 标签最大长度
   */
  maxLength?: number
  /**
   * 标签验证正则表达式
   */
  validateRegex?: RegExp
  /**
   * 标签验证函数
   */
  validateFn?: (tag: string) => boolean
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 自定义标签样式
   */
  tagColor?: string
  /**
   * 自定义输入框边框颜色
   */
  borderColor?: string
  /**
   * 自定义输入框背景颜色
   */
  bgColor?: string
  /**
   * 自定义输入框文本颜色
   */
  textColor?: string
  /**
   * 是否允许创建新标签
   */
  allowCreate?: boolean
  /**
   * 是否自动获取焦点
   */
  autofocus?: boolean
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 是否在按下回车时添加标签
   */
  addOnEnter?: boolean
  /**
   * 是否在失去焦点时添加标签
   */
  addOnBlur?: boolean
  /**
   * 是否在粘贴时添加多个标签
   */
  addOnPaste?: boolean
  /**
   * 是否在输入框为空时移除最后一个标签
   */
  removeLastOnBackspace?: boolean
  /**
   * 是否可拖拽排序
   */
  draggable?: boolean
  /**
   * 标签类型
   */
  tagType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 标签背景颜色
   */
  tagBgColor?: string
  /**
   * 标签文本颜色
   */
  tagTextColor?: string
  /**
   * 标签边框颜色
   */
  tagBorderColor?: string
  /**
   * 标签是否显示边框
   */
  tagOutlined?: boolean
}>(), {
  modelValue: () => [],
  placeholder: '请输入标签',
  disabled: false,
  readonly: false,
  size: 'default',
  error: false,
  allowDuplicate: false,
  minLength: 0,
  addOnEnter: true,
  addOnBlur: true,
  addOnPaste: true,
  removeLastOnBackspace: true,
  delimiter: () => [',', ';', ' '],
  allowCreate: true,
  draggable: false,
  clearable: true,
  tagType: 'default',
  tagOutlined: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string[]): void
  (e: 'add', value: string): void
  (e: 'remove', value: string, index: number): void
  (e: 'clear'): void
  (e: 'exceed', value: string): void
  (e: 'invalid', value: string, reason: string): void
}>()

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const inputValue = ref('')
const tags = ref<string[]>([...props.modelValue])
const isComposing = ref(false) // 中文输入法状态

// 计算输入框样式
const inputTagClass = computed(() => {
  return [
    'ui-input-tag',
    `ui-input-tag--${props.size}`,
    {
      'ui-input-tag--focused': isFocused.value,
      'ui-input-tag--disabled': props.disabled,
      'ui-input-tag--readonly': props.readonly,
      'ui-input-tag--error': props.error,
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const _tagColorVar = computed(() => props.tagColor || null)

// 观察modelValue变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // 使用深拷贝避免引用问题
    tags.value = JSON.parse(JSON.stringify(newValue))
  }
  else {
    tags.value = []
  }
}, { deep: true })

// 观察tags变化，更新modelValue
watch(tags, (newValue) => {
  // 避免重复触发更新，只在值实际变化时才触发
  if (JSON.stringify(newValue) !== JSON.stringify(props.modelValue)) {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}, { deep: true })

// 处理添加标签
function addTag(tag: string) {
  if (!tag || tag.trim() === '')
    return

  // 格式化标签
  tag = tag.trim()

  // 标签长度验证
  if (props.minLength > 0 && tag.length < props.minLength) {
    emit('invalid', tag, `标签长度不能小于${props.minLength}个字符`)
    return
  }

  if (props.maxLength && tag.length > props.maxLength) {
    emit('invalid', tag, `标签长度不能超过${props.maxLength}个字符`)
    return
  }

  // 正则表达式验证
  if (props.validateRegex && !props.validateRegex.test(tag)) {
    emit('invalid', tag, '标签格式不符合要求')
    return
  }

  // 自定义验证函数
  if (props.validateFn && !props.validateFn(tag)) {
    emit('invalid', tag, '标签验证失败')
    return
  }

  // 重复标签验证
  if (!props.allowDuplicate && tags.value.includes(tag)) {
    emit('invalid', tag, '标签已存在')
    return
  }

  // 最大数量验证
  if (props.maxTags && tags.value.length >= props.maxTags) {
    emit('exceed', tag)
    return
  }

  // 添加标签
  tags.value.push(tag)
  inputValue.value = ''
  emit('add', tag)

  // 焦点处理
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理移除标签
function removeTag(index: number) {
  if (props.disabled || props.readonly)
    return

  const removedTag = tags.value[index]

  // 直接从本地数据中删除
  const newTags = [...tags.value]
  newTags.splice(index, 1)
  tags.value = newTags

  // 触发事件
  emit('remove', removedTag, index)

  // 聚焦输入框
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理输入
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value

  // 检查分隔符
  if (!isComposing.value && props.delimiter) {
    const delimiters = Array.isArray(props.delimiter) ? props.delimiter : [props.delimiter]
    for (const delimiter of delimiters) {
      if (inputValue.value.includes(delimiter)) {
        const tags = inputValue.value
          .split(delimiter)
          .map(tag => tag.trim())
          .filter(tag => tag)

        if (tags.length > 0) {
          tags.forEach(tag => addTag(tag))
          inputValue.value = ''
          return
        }
      }
    }
  }
}

// 处理按键事件
function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly)
    return

  // 回车添加标签
  if (event.key === 'Enter' && props.addOnEnter && !isComposing.value) {
    event.preventDefault()
    if (inputValue.value) {
      addTag(inputValue.value)
    }
  }

  // 退格键删除最后一个标签
  if (event.key === 'Backspace' && props.removeLastOnBackspace && inputValue.value === '' && tags.value.length > 0) {
    removeTag(tags.value.length - 1)
  }
}

// 处理粘贴事件
function handlePaste(event: ClipboardEvent) {
  if (props.disabled || props.readonly || !props.addOnPaste)
    return

  const pastedText = event.clipboardData?.getData('text') || ''
  if (!pastedText)
    return

  // 如果有分隔符，按分隔符分割处理
  if (props.delimiter) {
    const delimiters = Array.isArray(props.delimiter) ? props.delimiter : [props.delimiter]

    // 创建一个正则表达式匹配所有分隔符
    const delimiterRegex = new RegExp(`[${delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('')}]`)

    // 分割文本并添加标签
    const parts = pastedText.split(delimiterRegex).filter(Boolean)
    if (parts.length > 1) {
      event.preventDefault()
      parts.forEach(part => addTag(part))
    }
  }
}

// 处理失焦事件
function handleBlur(event: FocusEvent) {
  isFocused.value = false

  // 添加标签（如果启用了addOnBlur）
  if (props.addOnBlur && inputValue.value) {
    addTag(inputValue.value)
  }

  emit('blur', event)
}

// 处理聚焦事件
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 点击容器时聚焦输入框
function focusInput() {
  if (props.disabled || props.readonly)
    return
  inputRef.value?.focus()
}

// 清空所有标签
function clearAll() {
  if (props.disabled || props.readonly)
    return
  tags.value = []
  inputValue.value = ''
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理中文输入
function handleCompositionStart() {
  isComposing.value = true
}

function handleCompositionEnd() {
  isComposing.value = false
  // 如果配置了回车添加，在输入法完成后检查是否需要添加标签
  if (props.delimiter) {
    const delimiters = Array.isArray(props.delimiter) ? props.delimiter : [props.delimiter]
    for (const delimiter of delimiters) {
      if (inputValue.value.includes(delimiter)) {
        const parts = inputValue.value
          .split(delimiter)
          .map(tag => tag.trim())
          .filter(tag => tag)

        if (parts.length > 0) {
          parts.forEach(tag => addTag(tag))
          inputValue.value = ''
          return
        }
      }
    }
  }
}

// 演示不同颜色的tags实现方法，可以在外部调用时实现
function getTagColor(tag: string, index: number): string | undefined {
  // 根据index或tag属性返回不同颜色
  const colors = ['primary', 'success', 'warning', 'danger', 'info']
  return colors[index % colors.length]
}

// 获取tag背景色
function getTagBgColor(tag: string, index: number): string | undefined {
  // 根据index或tag属性返回不同背景色
  const colors = ['#e1f3d8', '#fdf6ec', '#f0f9ff', '#fef0f0', '#f0f0f0']
  return colors[index % colors.length]
}

// 获取tag文本颜色
function getTagTextColor(tag: string, index: number): string | undefined {
  // 根据index或tag属性返回不同文本颜色
  const colors = ['#67c23a', '#e6a23c', '#409eff', '#f56c6c', '#909399']
  return colors[index % colors.length]
}

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  add: addTag,
  remove: removeTag,
  clear: clearAll,
})
</script>

<template>
  <div
    ref="containerRef"
    :class="inputTagClass"
    @click="focusInput"
  >
    <div class="ui-input-tag-wrapper">
      <!-- 标签列表 -->
      <div class="ui-input-tag-tags">
        <ui-tag
          v-for="(tag, index) in tags"
          :key="index"
          :closable="!disabled && !readonly"
          :size="size"
          :color="props.tagTextColor || getTagTextColor(tag, index)"
          :bg-color="props.tagBgColor || getTagBgColor(tag, index)"
          :text-color="props.tagColor || getTagColor(tag, index)"
          :border-color="props.tagBorderColor || undefined"
          :outlined="props.tagOutlined"
          @close="removeTag(index)"
        >
          {{ tag }}
        </ui-tag>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        :placeholder="tags.length === 0 ? placeholder : ''"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        type="text"
        class="ui-input-tag-input"
        @input="handleInput"
        @keydown="handleKeydown"
        @blur="handleBlur"
        @focus="handleFocus"
        @paste="handlePaste"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      >
    </div>

    <!-- 清空按钮 -->
    <button
      v-if="clearable && tags.length > 0 && !disabled && !readonly"
      type="button"
      class="ui-input-tag-clear"
      @click.stop="clearAll"
    >
      <ui-icon icon="carbon:close-filled" />
    </button>

    <!-- 错误提示 -->
    <div v-if="error && errorMessage" class="ui-input-tag-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-input-tag {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-size: var(--ui-font-size);
  line-height: 1.5;
  border: 1px solid var(--ui-input-tag-border-color, var(--ui-border-color));
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-input-tag-bg-color, var(--ui-color-bg));
  color: var(--ui-input-tag-text-color, var(--ui-color-text));
  transition: all 0.2s;
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2px 8px;
  min-height: 36px;
  --ui-input-tag-border-color: v-bind(borderColorVar);
  --ui-input-tag-bg-color: v-bind(bgColorVar);
  --ui-input-tag-text-color: v-bind(textColorVar);
}

.ui-input-tag--small {
  min-height: 28px;
  padding: 1px 6px;
  font-size: 12px;
}

.ui-input-tag--large {
  min-height: 42px;
  padding: 3px 10px;
  font-size: 16px;
}

.ui-input-tag--focused {
  border-color: var(--ui-color-primary);
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.1);
}

.ui-input-tag--disabled {
  background-color: var(--ui-disabled-bg);
  border-color: var(--ui-color-disabled-border);
  color: var(--ui-color-disabled-text);
  cursor: not-allowed;
}

.ui-input-tag--readonly {
  pointer-events: none;
}

.ui-input-tag--error {
  border-color: var(--ui-color-danger);
}

.ui-input-tag--error:focus-within {
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.ui-input-tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.ui-input-tag-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ui-input-tag-input {
  flex: 1;
  min-width: 50px;
  border: none;
  outline: none;
  background: transparent;
  padding: 4px;
  font-size: inherit;
  color: inherit;
}

.ui-input-tag-input::placeholder {
  color: var(--ui-color-placeholder);
}

.ui-input-tag-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--ui-color-text-lighter);
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  margin-left: 4px;
}

.ui-input-tag-clear:hover {
  color: var(--ui-color-text-light);
}

.ui-input-tag-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 4px 0;
  color: var(--ui-color-danger);
  font-size: 0.85em;
}

/* 拖拽排序相关样式 */
.ui-input-tag.is-dragover {
  border-color: var(--ui-color-primary);
  background-color: var(--ui-color-primary-lightest);
}

.ui-input-tag-tag.is-dragging {
  opacity: 0.5;
}
</style>
