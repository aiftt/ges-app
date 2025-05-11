<script setup lang="ts" name="UiMention">
/**
 * 提及(Mention)组件
 * 创建日期: 2024-09-01
 * 作者: Claude
 * 更新日期: 2024-09-08 - 修复样式和功能问题
 * 更新日期: 2024-09-09 - 提取CSS变量到主题文件中
 * 更新日期: 2024-09-12 - 使用集中管理的类型定义
 */

import type { IMentionOption } from '~/types/select'
import { useElementBounding, useVModel } from '@vueuse/core'
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

// 定义组件的属性
const props = withDefaults(defineProps<{
  /**
   * 文本框中的值
   */
  modelValue?: string
  /**
   * 提及字符前缀，默认为@
   */
  prefix?: string
  /**
   * 提及选项列表
   */
  options?: IMentionOption[]
  /**
   * 占位符文本
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否可滚动
   */
  scrollable?: boolean
  /**
   * 筛选方法，自定义筛选逻辑
   */
  filterMethod?: (query: string, option: IMentionOption) => boolean
  /**
   * 最大输入长度
   */
  maxLength?: number
  /**
   * 弹出层位置
   */
  placement?: 'bottom' | 'top'
  /**
   * 在键入时自动转换为提及样式
   */
  autoTransform?: boolean
  /**
   * 提及项目最大高度
   */
  maxHeight?: number | string
  /**
   * 是否支持多行输入
   */
  multiline?: boolean
  /**
   * 弹出层z-index
   */
  zIndex?: number
  /**
   * 字体大小
   */
  fontSize?: string
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 文本颜色
   */
  textColor?: string
  /**
   * 悬停背景颜色
   */
  hoverBgColor?: string
}>(), {
  modelValue: '',
  prefix: '@',
  options: () => [],
  placeholder: '',
  disabled: false,
  scrollable: true,
  filterMethod: undefined,
  maxLength: undefined,
  placement: 'bottom',
  autoTransform: true,
  maxHeight: '200px',
  multiline: false,
  zIndex: 1000,
  fontSize: '14px',
  borderColor: '',
  bgColor: '',
  textColor: '',
  hoverBgColor: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', option: IMentionOption): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'change', value: string): void
}>()

// 双向绑定的文本值
const inputValue = useVModel(props, 'modelValue', emit)
const inputRef = ref<HTMLTextAreaElement | HTMLInputElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)
const isComposing = ref(false)
const isFocused = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// 提及选项状态
const mentionState = reactive({
  isOpen: false,
  search: '',
  selectedIndex: 0,
  startPosition: -1,
  endPosition: -1,
})

// 获取输入框的位置信息，用于定位弹出层
const { update: updateBounding } = useElementBounding(inputRef)

// 计算筛选后的选项
const filteredOptions = computed(() => {
  if (!mentionState.search)
    return props.options

  return props.options.filter((option) => {
    if (props.filterMethod) {
      return props.filterMethod(mentionState.search, option)
    }

    // 默认筛选方法：搜索标签和值，不区分大小写
    const searchLower = mentionState.search.toLowerCase()
    return option.label.toLowerCase().includes(searchLower)
      || option.value.toLowerCase().includes(searchLower)
  })
})

// CSS变量计算，使用自定义属性覆盖主题变量
const cssVars = computed(() => {
  return {
    '--ui-mention-border-color': props.borderColor || undefined,
    '--ui-mention-bg-color': props.bgColor || undefined,
    '--ui-mention-text-color': props.textColor || undefined,
    '--ui-mention-font-size': props.fontSize,
    '--ui-mention-option-hover-bg': props.hoverBgColor || undefined,
    '--ui-mention-popup-z-index': props.zIndex,
  }
})

// 计算弹出层的样式
const popupStyle = computed(() => {
  if (!inputRef.value) {
    return {}
  }

  // 获取输入框相对于视口的位置
  const rect = inputRef.value.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft

  if (props.placement === 'bottom') {
    return {
      position: 'absolute' as const,
      top: `${rect.bottom + scrollTop}px`,
      left: `${rect.left + scrollLeft}px`,
      width: `${rect.width}px`,
      maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
      zIndex: String(props.zIndex),
    }
  }
  else {
    return {
      position: 'absolute' as const,
      bottom: `${window.innerHeight - rect.top + scrollTop}px`,
      left: `${rect.left + scrollLeft}px`,
      width: `${rect.width}px`,
      maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
      zIndex: String(props.zIndex),
    }
  }
})

// 计算组件的样式类
const mentionClass = computed(() => {
  const classes = ['ui-mention']

  if (props.disabled) {
    classes.push('ui-mention--disabled')
  }

  if (isFocused.value) {
    classes.push('ui-mention--focused')
  }

  return classes
})

// 获取当前光标位置的文本
function getTextAtCursor(): { text: string, startPos: number, endPos: number } {
  if (!inputRef.value)
    return { text: '', startPos: -1, endPos: -1 }

  const el = inputRef.value
  const startPos = el.selectionStart || 0
  const endPos = el.selectionEnd || 0

  // 获取当前行开始的位置
  let lineStart = startPos
  while (lineStart > 0 && inputValue.value[lineStart - 1] !== '\n') {
    lineStart--
  }

  // 获取当前行到光标的文本
  const currentLineText = inputValue.value.substring(lineStart, startPos)

  // 查找最后一个触发字符的位置
  const lastTriggerPos = currentLineText.lastIndexOf(props.prefix)

  if (lastTriggerPos === -1)
    return { text: '', startPos: -1, endPos: -1 }

  // 提及文本 (不包括@符号)
  const mentionText = currentLineText.substring(lastTriggerPos + 1)
  const globalStartPos = lineStart + lastTriggerPos + 1

  return {
    text: mentionText,
    startPos: globalStartPos,
    endPos,
  }
}

// 处理输入事件
function handleInput() {
  if (isComposing.value)
    return

  emit('change', inputValue.value)

  if (!inputRef.value || props.disabled) {
    mentionState.isOpen = false
    return
  }

  const { text, startPos, endPos } = getTextAtCursor()

  // 检查当前输入是否应该触发提及
  if (text !== '' && startPos >= 0) {
    mentionState.search = text
    mentionState.startPosition = startPos
    mentionState.endPosition = endPos
    mentionState.isOpen = true
    mentionState.selectedIndex = 0

    // 更新位置信息
    nextTick(() => {
      updateBounding()
    })
  }
  else {
    mentionState.isOpen = false
  }
}

// 选择提及项目
function selectOption(option: IMentionOption, index: number) {
  if (!inputRef.value)
    return

  mentionState.selectedIndex = index

  // 修改为直接使用状态中的值，避免结构赋值类型错误
  const startPos = mentionState.startPosition
  const endPos = mentionState.endPosition

  if (startPos < 0 || endPos < 0)
    return

  // 替换文本中的提及内容
  const beforeText = inputValue.value.substring(0, startPos - 1) // 减去@符号
  const afterText = inputValue.value.substring(endPos)

  if (props.autoTransform) {
    // 使用标记格式替换提及内容
    inputValue.value = `${beforeText}${props.prefix}${option.label} ${afterText}`
  }
  else {
    // 直接替换为选定的值
    inputValue.value = `${beforeText}${props.prefix}${option.value} ${afterText}`
  }

  // 重置提及状态
  mentionState.isOpen = false
  mentionState.search = ''

  // 设置光标位置
  nextTick(() => {
    if (inputRef.value) {
      const newCursorPos = beforeText.length + props.prefix.length + option.label.length + 1
      inputRef.value.focus()
      inputRef.value.setSelectionRange(newCursorPos, newCursorPos)
    }
  })

  emit('select', option)
}

// 处理输入框焦点
function handleFocus() {
  isFocused.value = true
  emit('focus')
}

function handleBlur() {
  isFocused.value = false
  // 延迟关闭弹出层，以允许点击弹出层中的选项
  setTimeout(() => {
    mentionState.isOpen = false
  }, 150)
  emit('blur')
}

// 处理组合输入开始
function handleCompositionStart() {
  isComposing.value = true
}

// 处理组合输入结束
function handleCompositionEnd() {
  isComposing.value = false
  // 手动触发输入处理
  handleInput()
}

// 处理键盘导航
function handleKeyDown(e: KeyboardEvent) {
  if (!mentionState.isOpen || filteredOptions.value.length === 0) {
    return
  }

  // 上下键导航
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    mentionState.selectedIndex = (mentionState.selectedIndex + 1) % filteredOptions.value.length
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    mentionState.selectedIndex = (mentionState.selectedIndex - 1 + filteredOptions.value.length) % filteredOptions.value.length
  }
  // 回车键选择
  else if (e.key === 'Enter' && mentionState.isOpen) {
    e.preventDefault()
    const selectedOption = filteredOptions.value[mentionState.selectedIndex]
    if (selectedOption) {
      selectOption(selectedOption, mentionState.selectedIndex)
    }
  }
  // ESC键关闭
  else if (e.key === 'Escape') {
    e.preventDefault()
    mentionState.isOpen = false
  }
}

// 确保选中项可见
function ensureSelectedVisible() {
  if (!popupRef.value || !mentionState.isOpen)
    return

  const selectedEl = popupRef.value.querySelector('.ui-mention-option--selected') as HTMLElement
  if (selectedEl) {
    selectedEl.scrollIntoView({ block: 'nearest' })
  }
}

// 点击外部关闭弹出层
function closeOnClickOutside(e: MouseEvent) {
  if (
    popupRef.value
    && !popupRef.value.contains(e.target as Node)
    && inputRef.value
    && !inputRef.value.contains(e.target as Node)
  ) {
    mentionState.isOpen = false
  }
}

// 监听窗口滚动和大小变化
function updatePosition() {
  if (mentionState.isOpen) {
    updateBounding()
  }
}

// 监听选中项变化，确保可见
watch(() => mentionState.selectedIndex, () => {
  nextTick(() => {
    ensureSelectedVisible()
  })
})

// 监听弹出层状态，更新位置
watch(() => mentionState.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      updateBounding()
    })
  }
})

// 设置事件监听器
onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', closeOnClickOutside)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  }
})

// 清理事件监听器
onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', closeOnClickOutside)
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="mentionClass"
    :style="cssVars"
  >
    <textarea
      v-if="multiline"
      ref="inputRef"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      class="ui-mention-textarea"
      @input="inputValue = ($event.target as HTMLTextAreaElement).value; handleInput()"
      @focus="handleFocus"
      @blur="handleBlur"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @keydown="handleKeyDown"
    />
    <input
      v-else
      ref="inputRef"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      class="ui-mention-input"
      @input="inputValue = ($event.target as HTMLInputElement).value; handleInput()"
      @focus="handleFocus"
      @blur="handleBlur"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @keydown="handleKeyDown"
    >

    <teleport to="body">
      <div
        v-if="mentionState.isOpen && filteredOptions.length > 0"
        ref="popupRef"
        class="ui-mention-popup"
        :class="{ 'ui-mention-popup--scrollable': scrollable }"
        :style="popupStyle"
      >
        <div
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          class="ui-mention-option"
          :class="{ 'ui-mention-option--selected': index === mentionState.selectedIndex }"
          @click="selectOption(option, index)"
        >
          <img
            v-if="option.avatar"
            :src="option.avatar"
            alt=""
            class="ui-mention-option-avatar"
          >
          <span class="ui-mention-option-label">{{ option.label }}</span>
          <span class="ui-mention-option-value">({{ option.value }})</span>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.ui-mention {
  // CSS变量已迁移到主题文件: assets/scss/themes/light.scss 和 dark.scss 中
  position: relative;
  display: block;
  width: 100%;
  font-family: inherit;
}

.ui-mention-input,
.ui-mention-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--ui-mention-border-color);
  border-radius: 4px;
  background-color: var(--ui-mention-bg-color);
  color: var(--ui-mention-text-color);
  font-size: var(--ui-mention-font-size);
  line-height: 1.5;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: var(--ui-mention-placeholder-color);
  }
}

.ui-mention-textarea {
  min-height: 100px;
  resize: vertical;
}

.ui-mention--focused {
  .ui-mention-input,
  .ui-mention-textarea {
    border-color: var(--ui-mention-focus-border-color);
    box-shadow: 0 0 0 3px var(--ui-mention-focus-shadow-color);
    outline: none;
  }
}

.ui-mention--disabled {
  opacity: 0.6;
  cursor: not-allowed;

  .ui-mention-input,
  .ui-mention-textarea {
    background-color: var(--ui-disabled-bg);
    pointer-events: none;
  }
}

.ui-mention-popup {
  position: absolute;
  z-index: var(--ui-mention-popup-z-index);
  background-color: var(--ui-mention-popup-bg-color);
  border-radius: 4px;
  box-shadow: var(--ui-mention-popup-shadow);
  min-width: 200px;
  overflow: hidden;
  border: 1px solid var(--ui-mention-border-color);
  margin-top: 2px;
}

.ui-mention-popup--scrollable {
  overflow-y: auto;
  max-height: 200px;
}

.ui-mention-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: var(--ui-mention-font-size);
  color: var(--ui-mention-text-color);

  &:hover {
    background-color: var(--ui-mention-option-hover-bg);
  }
}

.ui-mention-option--selected {
  background-color: var(--ui-mention-option-selected-bg);

  .ui-mention-option-label {
    color: var(--ui-mention-option-selected-text);
    font-weight: 500;
  }
}

.ui-mention-option-avatar {
  width: var(--ui-mention-avatar-size);
  height: var(--ui-mention-avatar-size);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.ui-mention-option-label {
  flex-grow: 1;
  font-weight: normal;
}

.ui-mention-option-value {
  font-size: 12px;
  color: var(--ui-color-text-secondary);
}
</style>
