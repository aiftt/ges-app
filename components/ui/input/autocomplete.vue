<script setup lang="ts" name="UiInputAutocomplete">
/**
 * 自动完成输入框组件
 * 创建日期: 2024-07-08
 * 作者: aiftt
 * 更新日期: 2024-07-10 - 修复选择选项后下拉框闪现问题
 * 更新日期: 2024-07-15 - 修复TypeScript类型错误
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 定义选项类型
type OptionValue = string | number
interface Option {
  value: OptionValue
  label: string
  disabled?: boolean
  [key: string]: any
}

interface OptionGroup {
  label: string
  options: Option[]
}

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string
  /**
   * 占位文本
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
   * 选项数据
   */
  options?: Option[]
  /**
   * 是否使用远程搜索
   */
  remote?: boolean
  /**
   * 远程加载方法
   */
  remoteMethod?: (query: string) => Promise<Option[]>
  /**
   * 是否正在加载数据
   */
  loading?: boolean
  /**
   * 加载中提示文本
   */
  loadingText?: string
  /**
   * 无数据提示文本
   */
  noDataText?: string
  /**
   * 自定义过滤方法
   */
  filterMethod?: (query: string, option: Option) => boolean
  /**
   * 是否区分大小写
   */
  caseSensitive?: boolean
  /**
   * 触发显示选项面板的方式
   */
  trigger?: 'focus' | 'input' | 'both'
  /**
   * 弹出面板最大高度
   */
  maxHeight?: string
  /**
   * 是否允许创建新选项
   */
  allowCreate?: boolean
  /**
   * 创建选项的文本
   */
  createText?: string
  /**
   * 自定义展示格式
   */
  valueFormat?: (option: Option) => string
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 前缀图标
   */
  prefixIcon?: string
  /**
   * 后缀图标
   */
  suffixIcon?: string
  /**
   * 输入框前缀文本
   */
  prefix?: string
  /**
   * 输入框后缀文本
   */
  suffix?: string
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 输入框边框颜色
   */
  borderColor?: string
  /**
   * 输入框背景颜色
   */
  bgColor?: string
  /**
   * 输入框文本颜色
   */
  textColor?: string
  /**
   * 自动聚焦
   */
  autofocus?: boolean
  /**
   * 自定义渲染选项的插槽名
   */
  optionSlot?: string
  /**
   * 防抖延迟时间（ms）
   */
  debounce?: number
  /**
   * 是否启用虚拟滚动（大量选项时提高性能）
   */
  virtualScroll?: boolean
  /**
   * 是否默认显示所有选项
   */
  showAllOnEmpty?: boolean
  /**
   * 选项值对应的键名
   */
  valueKey?: string
  /**
   * 选项标签对应的键名
   */
  labelKey?: string
  /**
   * 选项禁用状态对应的键名
   */
  disabledKey?: string
  /**
   * 选项分组
   */
  groups?: { label: string, options: Option[] }[]
  /**
   * 是否按照输入内容高亮匹配文本
   */
  highlightMatch?: boolean
  /**
   * 选项分组对应的键名
   */
  groupKey?: string
}>(), {
  options: () => [],
  disabled: false,
  readonly: false,
  size: 'default',
  error: false,
  loading: false,
  loadingText: '加载中...',
  noDataText: '无数据',
  caseSensitive: false,
  trigger: 'both',
  maxHeight: '250px',
  allowCreate: false,
  createText: '创建 "{query}"',
  clearable: true,
  valueKey: 'value',
  labelKey: 'label',
  disabledKey: 'disabled',
  debounce: 300,
  virtualScroll: false,
  showAllOnEmpty: true,
  highlightMatch: true,
  groupKey: 'group',
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
  (e: 'select', option: Option): void
  (e: 'create', value: string): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'clear'): void
  (e: 'noMatch', query: string): void
}>()

// 类型保护函数
function isOption(item: Option | OptionGroup): item is Option {
  return (item as Option).value !== undefined
}

function _isOptionGroup(item: Option | OptionGroup): item is OptionGroup {
  return Array.isArray((item as OptionGroup).options)
}

// 安全获取选项属性值
function getOptionValue(option: Option | OptionGroup, key: string): string | number | undefined {
  if (isOption(option)) {
    return option[key]
  }
  return undefined
}

// 内部状态
const inputRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const inputValue = ref(props.modelValue || '')
const isDropdownVisible = ref(false)
const activeOptionIndex = ref(-1)
const remoteOptions = ref<Option[]>([])
const isLoading = ref(props.loading)
const lastDebounceTimer = ref<number | null>(null)
const lastQuery = ref('')
const hoveringOption = ref<Option | null>(null)
const searchValue = ref('')
const ignoreBlurEvent = ref(false)

// 过滤后的选项 - 使用ref而不是computed避免只读属性错误
const filteredOptions = ref<Option[]>([])

// 跟踪选项元素的引用
const optionRefs = ref<Map<number, HTMLElement>>(new Map())

// 设置选项元素引用
function setOptionRef(index: number, el: HTMLElement | null) {
  if (el) {
    optionRefs.value.set(index, el)
  }
  else {
    optionRefs.value.delete(index)
  }
}

// 获取选项元素引用
function getOptionRef(index: number): HTMLElement | undefined {
  return optionRefs.value.get(index)
}

// 计算最终展示的选项（处理分组）
const finalOptions = computed(() => {
  // 如果选项为空，直接返回空数组
  if (!props.options || props.options.length === 0)
    return []

  // 判断是否有分组
  const firstOption = props.options[0]
  const hasGroup = firstOption && props.groupKey && firstOption[props.groupKey] !== undefined

  // 如果没有分组，直接返回过滤后的选项
  if (!hasGroup)
    return filteredOptions.value

  // 处理分组选项
  const groups: OptionGroup[] = []
  const groupMap = new Map<string, OptionGroup>()

  // 遍历过滤后的选项，按组分类
  filteredOptions.value.forEach((option) => {
    const groupName = option[props.groupKey]

    if (!groupMap.has(groupName)) {
      const newGroup: OptionGroup = {
        label: groupName,
        options: [],
      }
      groupMap.set(groupName, newGroup)
      groups.push(newGroup)
    }

    groupMap.get(groupName)!.options.push(option)
  })

  return groups
})

// 是否显示创建选项
const showCreateOption = computed(() => {
  if (!props.allowCreate || !inputValue.value)
    return false

  // 检查输入值是否已存在于选项中
  const exists = finalOptions.value.some((option) => {
    if (isOption(option)) {
      return option[props.valueKey].toString() === inputValue.value
        || option[props.labelKey].toString() === inputValue.value
    }
    return false
  })

  return !exists
})

// 创建选项文本
const createOptionText = computed(() => {
  return props.createText.replace('{query}', inputValue.value)
})

// 计算输入框样式
const autocompleteClass = computed(() => {
  return [
    'ui-input-autocomplete',
    `ui-input-autocomplete--${props.size}`,
    {
      'ui-input-autocomplete--focused': isFocused.value,
      'ui-input-autocomplete--disabled': props.disabled,
      'ui-input-autocomplete--readonly': props.readonly,
      'ui-input-autocomplete--error': props.error,
      'ui-input-autocomplete--with-prefix': props.prefix || props.prefixIcon,
      'ui-input-autocomplete--with-suffix': props.suffix || props.suffixIcon || props.clearable,
      [props.customClass as string]: !!props.customClass,
    },
  ]
})

// 计算下拉框样式
const dropdownClass = computed(() => {
  return [
    'ui-input-autocomplete-dropdown',
    `ui-input-autocomplete-dropdown--${props.size}`,
  ]
})

// 计算样式变量
const borderColorVar = computed(() => props.borderColor || null)
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)

// 显示下拉框
function showDropdown() {
  if (props.disabled || props.readonly)
    return

  isDropdownVisible.value = true
  emit('visibleChange', true)

  // 过滤选项
  if (!props.remote) {
    filterOptions()
  }

  // 重置活动选项索引
  activeOptionIndex.value = -1

  // 定位下拉框
  nextTick(() => {
    updateDropdownPosition()
  })
}

// 隐藏下拉框
function hideDropdown() {
  isDropdownVisible.value = false
  emit('visibleChange', false)
}

// 定位下拉框
function updateDropdownPosition() {
  if (!inputRef.value || !dropdownRef.value)
    return

  const inputRect = inputRef.value.getBoundingClientRect()
  const dropdownEl = dropdownRef.value

  // 设置下拉框的位置和宽度
  dropdownEl.style.width = `${inputRect.width}px`
  dropdownEl.style.left = `${inputRect.left}px`

  // 计算下拉框的位置（向下或向上）
  const bottomSpace = window.innerHeight - inputRect.bottom
  const dropdownHeight = dropdownEl.offsetHeight

  if (bottomSpace < dropdownHeight && inputRect.top > dropdownHeight) {
    // 向上展示
    dropdownEl.style.top = `${inputRect.top - dropdownHeight}px`
    dropdownEl.classList.add('ui-input-autocomplete-dropdown--up')
  }
  else {
    // 向下展示
    dropdownEl.style.top = `${inputRect.bottom}px`
    dropdownEl.classList.remove('ui-input-autocomplete-dropdown--up')
  }
}

// 过滤选项
function filterOptions() {
  const query = inputValue.value

  if (!props.options.length) {
    filteredOptions.value = []
    return
  }

  if (!query && props.showAllOnEmpty) {
    filteredOptions.value = props.options
    return
  }

  // 使用自定义过滤方法或默认过滤方法
  if (props.filterMethod) {
    filteredOptions.value = props.options.filter(option =>
      props.filterMethod!(query, option),
    )
  }
  else {
    // 默认过滤方法：标签或值包含查询字符串
    const normalizedQuery = props.caseSensitive ? query : query.toLowerCase()

    filteredOptions.value = props.options.filter((option) => {
      const label = String(option[props.labelKey])
      const value = String(option[props.valueKey])

      const normalizedLabel = props.caseSensitive ? label : label.toLowerCase()
      const normalizedValue = props.caseSensitive ? value : value.toLowerCase()

      return normalizedLabel.includes(normalizedQuery)
        || normalizedValue.includes(normalizedQuery)
    })
  }

  // 没有匹配项时触发事件
  if (filteredOptions.value.length === 0 && query) {
    emit('noMatch', query)
  }
}

// 远程搜索
async function remoteSearch() {
  if (!props.remote || !props.remoteMethod)
    return

  const query = inputValue.value

  // 避免重复请求
  if (query === lastQuery.value)
    return
  lastQuery.value = query

  // 显示加载状态
  isLoading.value = true

  try {
    // 调用远程方法获取数据
    const options = await props.remoteMethod(query)
    remoteOptions.value = options

    // 没有匹配项时触发事件
    if (options.length === 0 && query) {
      emit('noMatch', query)
    }
  }
  catch (error) {
    console.error('远程搜索失败:', error)
    remoteOptions.value = []
  }
  finally {
    isLoading.value = false
  }
}

// 带防抖的远程搜索
function debouncedRemoteSearch() {
  // 清除之前的定时器
  if (lastDebounceTimer.value !== null) {
    clearTimeout(lastDebounceTimer.value)
  }

  // 设置新的定时器
  lastDebounceTimer.value = window.setTimeout(() => {
    remoteSearch()
    lastDebounceTimer.value = null
  }, props.debounce)
}

// 处理输入
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value

  inputValue.value = value
  emit('update:modelValue', value)
  emit('input', value)

  // 根据触发方式显示下拉框
  if ((props.trigger === 'input' || props.trigger === 'both') && !isDropdownVisible.value) {
    showDropdown()
  }

  // 本地过滤或远程搜索
  if (props.remote) {
    debouncedRemoteSearch()
  }
  else {
    filterOptions()
  }

  // 重置活动选项索引
  activeOptionIndex.value = -1
}

// 处理焦点
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)

  // 根据触发方式显示下拉框
  if (props.trigger === 'focus' || props.trigger === 'both') {
    showDropdown()
  }
}

// 处理失焦
function handleBlur(event: FocusEvent) {
  // 如果当前正在处理选项点击，忽略此次失焦事件
  if (ignoreBlurEvent.value) {
    return
  }

  // 检查是否点击了下拉菜单，避免误关闭
  const relatedTarget = event.relatedTarget as HTMLElement
  if (dropdownRef.value?.contains(relatedTarget)) {
    inputRef.value?.focus()
    return
  }

  isFocused.value = false
  emit('blur', event)

  // 延迟关闭下拉框，避免无法点击选项
  setTimeout(() => {
    // 确保ignoreBlurEvent为false时才关闭，避免选择选项后下拉框闪现
    if (!ignoreBlurEvent.value) {
      hideDropdown()
    }
  }, 200)
}

// 处理点击选项
function handleOptionClick(option: Option | OptionGroup) {
  if (!isOption(option) || option[props.disabledKey])
    return

  // 设置标记防止处理blur事件时重新显示下拉框
  ignoreBlurEvent.value = true

  // 更新输入值
  const value = props.valueFormat ? props.valueFormat(option) : option[props.labelKey]
  inputValue.value = value.toString()
  emit('update:modelValue', inputValue.value)
  emit('change', inputValue.value)
  emit('select', option)

  // 清空搜索值
  searchValue.value = ''

  // 立即关闭下拉框
  isDropdownVisible.value = false
  emit('visibleChange', false)

  // 延迟重置忽略标记，确保blur事件已完全处理
  setTimeout(() => {
    ignoreBlurEvent.value = false
  }, 300)
}

// 选择选项
function selectOption(option: Option | OptionGroup) {
  if (!isOption(option))
    return

  // 设置标记防止处理blur事件时重新显示下拉框
  ignoreBlurEvent.value = true

  const value = props.valueFormat
    ? props.valueFormat(option)
    : option[props.labelKey]

  inputValue.value = value.toString()
  emit('update:modelValue', inputValue.value)
  emit('change', inputValue.value)
  emit('select', option)

  // 清空搜索值
  searchValue.value = ''

  // 立即关闭下拉框
  isDropdownVisible.value = false
  emit('visibleChange', false)

  // 延迟重置忽略标记，确保blur事件已完全处理
  setTimeout(() => {
    ignoreBlurEvent.value = false
  }, 300)
}

// 创建新选项
function createNewOption() {
  if (!props.allowCreate || !inputValue.value)
    return

  // 明确指定类型包含必要的属性
  const newOption = {
    value: inputValue.value,
    label: inputValue.value,
    [props.valueKey]: inputValue.value,
    [props.labelKey]: inputValue.value,
  } as Option

  emit('create', inputValue.value)
  selectOption(newOption)
}

// 清空输入
function clearInput() {
  if (props.disabled || props.readonly)
    return

  inputValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')

  // 聚焦输入框
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理键盘导航
function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly)
    return

  const options = finalOptions.value
  const optionsCount = options.length + (showCreateOption.value ? 1 : 0)

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isDropdownVisible.value) {
        showDropdown()
      }
      else {
        // 向下移动活动选项
        activeOptionIndex.value = (activeOptionIndex.value + 1) % optionsCount
        scrollToActiveOption()
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (!isDropdownVisible.value) {
        showDropdown()
      }
      else {
        // 向上移动活动选项
        activeOptionIndex.value = (activeOptionIndex.value - 1 + optionsCount) % optionsCount
        scrollToActiveOption()
      }
      break

    case 'Enter':
      event.preventDefault()
      if (isDropdownVisible.value) {
        if (activeOptionIndex.value >= 0) {
          if (activeOptionIndex.value === options.length && showCreateOption.value) {
            // 创建新选项
            createNewOption()
          }
          else if (activeOptionIndex.value < options.length) {
            // 选择已有选项
            const selectedOption = options[activeOptionIndex.value]
            if (isOption(selectedOption)) {
              selectOption(selectedOption)
            }
          }
        }
      }
      else {
        showDropdown()
      }
      break

    case 'Escape':
      event.preventDefault()
      hideDropdown()
      break

    case 'Tab':
      hideDropdown()
      break
  }
}

// 滚动到活动选项
function scrollToActiveOption() {
  nextTick(() => {
    const activeElement = getOptionRef(activeOptionIndex.value)
    if (activeElement && dropdownRef.value) {
      const containerRect = dropdownRef.value.getBoundingClientRect()
      const optionRect = activeElement.getBoundingClientRect()

      // 计算相对位置
      const optionTop = optionRect.top - containerRect.top
      const optionBottom = optionRect.bottom - containerRect.top

      // 判断是否需要滚动
      if (optionTop < 0) {
        dropdownRef.value.scrollTop += optionTop
      }
      else if (optionBottom > containerRect.height) {
        dropdownRef.value.scrollTop += (optionBottom - containerRect.height)
      }
    }
  })
}

// 高亮匹配文本
function highlightText(text: string) {
  if (!props.highlightMatch || !inputValue.value) {
    return text
  }

  try {
    const query = props.caseSensitive ? inputValue.value : inputValue.value.toLowerCase()
    const source = props.caseSensitive ? text : text.toLowerCase()
    const index = source.indexOf(query)

    if (index === -1)
      return text

    const start = text.substring(0, index)
    const match = text.substring(index, index + query.length)
    const end = text.substring(index + query.length)

    return `${start}<span class="ui-input-autocomplete-highlight">${match}</span>${end}`
  }
  // 忽略错误并返回原始文本
  catch {
    return text
  }
}

// 处理窗口滚动和resize事件
function handleWindowEvents() {
  if (isDropdownVisible.value) {
    updateDropdownPosition()
  }
}

// 计算选项类
function getOptionClass(option: Option | OptionGroup, index: number, groupIndex: number = -1) {
  if (!isOption(option)) {
    return ['ui-input-autocomplete-option']
  }

  // 正确计算选项是否处于激活状态
  const isOptionActive = groupIndex === -1
    ? index === activeOptionIndex.value // 非分组选项
    : getGroupOptionIndex(groupIndex, index) === activeOptionIndex.value // 分组选项

  return [
    'ui-input-autocomplete-option',
    {
      'ui-input-autocomplete-option--disabled': option[props.disabledKey],
      'ui-input-autocomplete-option--active': isOptionActive,
      // 使用更精确的方式跟踪悬停选项，组合groupIndex和index
      'ui-input-autocomplete-option--hover': hoveringOption.value === option
        && (hoveringOption.value._groupIndex === groupIndex
          && hoveringOption.value._optionIndex === index),
    },
  ]
}

// 计算分组中选项的全局索引
function getGroupOptionIndex(groupIndex: number, optionIndex: number): number {
  let index = optionIndex

  // 累加前面所有分组的选项数量
  for (let i = 0; i < groupIndex; i++) {
    index += props.groups![i].options.length
  }

  return index
}

// 处理鼠标悬停在选项上
function handleOptionHover(option: Option | OptionGroup, index: number, groupIndex: number = -1) {
  if (!isOption(option)) {
    return
  }

  // 为选项添加位置信息，便于精确识别
  const optionWithMeta = {
    ...option,
    _groupIndex: groupIndex,
    _optionIndex: index,
  }

  hoveringOption.value = optionWithMeta

  // 更新活动索引
  if (groupIndex === -1) {
    activeOptionIndex.value = index
  }
  else {
    activeOptionIndex.value = getGroupOptionIndex(groupIndex, index)
  }
}

// 处理鼠标离开时hoveringOption赋值为null的安全检查
function handleOptionMouseLeave() {
  hoveringOption.value = null
}

// 监听model-value变化
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue || ''
}, { immediate: true })

// 监听options变化
watch(() => props.options, () => {
  if (!props.remote && isDropdownVisible.value) {
    filterOptions()
  }
  // 初始化可见选项
  if (props.showAllOnEmpty && !inputValue.value) {
    filteredOptions.value = props.options
  }
}, { immediate: true, deep: true })

// 监听远程loading状态
watch(() => props.loading, (newValue) => {
  isLoading.value = newValue
})

// 自动聚焦
onMounted(() => {
  if (props.autofocus) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }

  // 添加窗口事件监听
  window.addEventListener('scroll', handleWindowEvents, true)
  window.addEventListener('resize', handleWindowEvents)

  // 初始化可见选项
  if (props.showAllOnEmpty && props.options) {
    filteredOptions.value = props.options
  }
})

// 清理事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleWindowEvents, true)
  window.removeEventListener('resize', handleWindowEvents)

  if (lastDebounceTimer.value !== null) {
    clearTimeout(lastDebounceTimer.value)
  }
})

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  showDropdown,
  hideDropdown,
})
</script>

<template>
  <div :class="autocompleteClass">
    <!-- 输入框 -->
    <div class="ui-input-autocomplete-input-wrapper">
      <!-- 前缀 -->
      <span v-if="prefix || prefixIcon" class="ui-input-autocomplete-prefix">
        <ui-icon v-if="prefixIcon" :icon="prefixIcon" class="ui-input-autocomplete-prefix-icon" />
        <span v-if="prefix" class="ui-input-autocomplete-prefix-text">{{ prefix }}</span>
      </span>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        autocomplete="off"
        class="ui-input-autocomplete-input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      >

      <!-- 后缀 -->
      <span v-if="suffix || suffixIcon || (clearable && inputValue)" class="ui-input-autocomplete-suffix">
        <button
          v-if="clearable && inputValue"
          type="button"
          class="ui-input-autocomplete-clear"
          @click.stop="clearInput"
        >
          <ui-icon icon="carbon:close-filled" />
        </button>
        <ui-icon v-if="suffixIcon" :icon="suffixIcon" class="ui-input-autocomplete-suffix-icon" />
        <span v-if="suffix" class="ui-input-autocomplete-suffix-text">{{ suffix }}</span>
      </span>
    </div>

    <!-- 下拉框 -->
    <transition name="ui-input-autocomplete-fade">
      <div
        v-if="isDropdownVisible"
        ref="dropdownRef"
        :class="dropdownClass"
        :style="{ maxHeight }"
      >
        <!-- 加载中状态 -->
        <div v-if="isLoading" class="ui-input-autocomplete-loading">
          <ui-icon icon="carbon:circle-dash" class="ui-input-autocomplete-loading-icon animate-spin" />
          <span>{{ loadingText }}</span>
        </div>

        <!-- 无数据 -->
        <div
          v-else-if="finalOptions.length === 0 && !showCreateOption"
          class="ui-input-autocomplete-empty"
        >
          {{ noDataText }}
        </div>

        <!-- 选项列表 -->
        <div v-else class="ui-input-autocomplete-options">
          <!-- 选项分组 -->
          <template v-if="groups && groups.length">
            <template v-for="(group, groupIndex) in groups" :key="group.label">
              <div class="ui-input-autocomplete-group">
                <div class="ui-input-autocomplete-group-label">
                  {{ group.label }}
                </div>

                <!-- 分组内选项 -->
                <div
                  v-for="(option, optionIndex) in group.options.filter(opt =>
                    !inputValue || (filterMethod ? filterMethod(inputValue, opt)
                      : String(opt[labelKey]).toLowerCase().includes(inputValue.toLowerCase())),
                  )"
                  :key="`group-${groupIndex}-option-${getOptionValue(option, valueKey)}-${optionIndex}`"
                  :ref="el => setOptionRef(getGroupOptionIndex(groupIndex, optionIndex), el as HTMLElement | null)"
                  :class="getOptionClass(option, optionIndex, groupIndex)"
                  @click="handleOptionClick(option)"
                  @mouseenter="handleOptionHover(option, optionIndex, groupIndex)"
                  @mouseleave="handleOptionMouseLeave"
                >
                  <!-- 使用自定义插槽 -->
                  <slot v-if="optionSlot" :name="optionSlot" :option="option" :index="optionIndex" />

                  <!-- 默认渲染 -->
                  <span v-else v-html="highlightText(String(isOption(option) ? option[labelKey] : ''))" />
                </div>
              </div>
            </template>
          </template>

          <!-- 普通选项列表 -->
          <template v-else>
            <div
              v-for="(option, index) in finalOptions"
              :key="`option-${getOptionValue(option, valueKey)}-${index}`"
              :ref="el => setOptionRef(index, el as HTMLElement | null)"
              :class="getOptionClass(option, index)"
              @click="handleOptionClick(option)"
              @mouseenter="handleOptionHover(option, index)"
              @mouseleave="handleOptionMouseLeave"
            >
              <!-- 使用自定义插槽 -->
              <slot v-if="optionSlot" :name="optionSlot" :option="option" :index="index" />

              <!-- 默认渲染 -->
              <span v-else v-html="highlightText(String(isOption(option) ? option[labelKey] : ''))" />
            </div>
          </template>

          <!-- 创建选项 -->
          <div
            v-if="showCreateOption"
            class="ui-input-autocomplete-option ui-input-autocomplete-option--create"
            :class="{
              'ui-input-autocomplete-option--active': activeOptionIndex === finalOptions.length,
            }"
            @click="createNewOption"
            @mouseenter="activeOptionIndex = finalOptions.length"
          >
            {{ createOptionText }}
          </div>
        </div>
      </div>
    </transition>

    <!-- 错误提示 -->
    <div v-if="error && errorMessage" class="ui-input-autocomplete-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.ui-input-autocomplete {
  position: relative;
  width: 100%;
  --ui-input-autocomplete-border-color: v-bind(borderColorVar);
  --ui-input-autocomplete-bg-color: v-bind(bgColorVar);
  --ui-input-autocomplete-text-color: v-bind(textColorVar);
}

.ui-input-autocomplete-input-wrapper {
  display: flex;
  width: 100%;
  border: 1px solid var(--ui-input-autocomplete-border-color, var(--ui-border-color));
  border-radius: var(--ui-border-radius);
  background-color: var(--ui-input-autocomplete-bg-color, var(--ui-color-bg));
  transition: all 0.2s;
  overflow: hidden;
}

.ui-input-autocomplete--focused .ui-input-autocomplete-input-wrapper {
  border-color: var(--ui-color-primary);
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.1);
}

.ui-input-autocomplete--error .ui-input-autocomplete-input-wrapper {
  border-color: var(--ui-color-danger);
}

.ui-input-autocomplete--error.ui-input-autocomplete--focused .ui-input-autocomplete-input-wrapper {
  box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.ui-input-autocomplete--disabled .ui-input-autocomplete-input-wrapper {
  background-color: var(--ui-disabled-bg);
  border-color: var(--ui-color-disabled-border);
  cursor: not-allowed;
}

.ui-input-autocomplete-input {
  flex: 1;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  font-size: var(--ui-font-size);
  border: none;
  outline: none;
  background: transparent;
  color: var(--ui-input-autocomplete-text-color, var(--ui-color-text));
}

.ui-input-autocomplete--small .ui-input-autocomplete-input {
  height: 28px;
  padding: 0 8px;
  font-size: 12px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-input {
  height: 42px;
  padding: 0 16px;
  font-size: 16px;
}

.ui-input-autocomplete--with-prefix .ui-input-autocomplete-input {
  padding-left: 0;
}

.ui-input-autocomplete--with-suffix .ui-input-autocomplete-input {
  padding-right: 0;
}

.ui-input-autocomplete--disabled .ui-input-autocomplete-input {
  cursor: not-allowed;
  color: var(--ui-color-disabled-text);
}

.ui-input-autocomplete-prefix,
.ui-input-autocomplete-suffix {
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: var(--ui-color-text-light);
}

.ui-input-autocomplete--small .ui-input-autocomplete-prefix,
.ui-input-autocomplete--small .ui-input-autocomplete-suffix {
  padding: 0 6px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-prefix,
.ui-input-autocomplete--large .ui-input-autocomplete-suffix {
  padding: 0 12px;
}

.ui-input-autocomplete-prefix-icon,
.ui-input-autocomplete-suffix-icon {
  font-size: 16px;
}

.ui-input-autocomplete--small .ui-input-autocomplete-prefix-icon,
.ui-input-autocomplete--small .ui-input-autocomplete-suffix-icon {
  font-size: 14px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-prefix-icon,
.ui-input-autocomplete--large .ui-input-autocomplete-suffix-icon {
  font-size: 18px;
}

.ui-input-autocomplete-prefix-text,
.ui-input-autocomplete-suffix-text {
  margin: 0 4px;
}

.ui-input-autocomplete-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin: 0 4px;
  border: none;
  background: transparent;
  color: var(--ui-color-text-light);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.ui-input-autocomplete-clear:hover {
  opacity: 1;
  color: var(--ui-color-danger);
}

.ui-input-autocomplete-dropdown {
  position: fixed;
  z-index: 1000;
  min-width: 120px;
  max-height: 250px;
  overflow-y: auto;
  background-color: var(--ui-color-bg);
  border: 1px solid var(--ui-border-color);
  border-radius: var(--ui-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 4px;
}

.ui-input-autocomplete-dropdown--up {
  margin-top: 0;
  margin-bottom: 4px;
}

.ui-input-autocomplete-fade-enter-active,
.ui-input-autocomplete-fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.ui-input-autocomplete-fade-enter-from,
.ui-input-autocomplete-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.ui-input-autocomplete-dropdown--up.ui-input-autocomplete-fade-enter-from,
.ui-input-autocomplete-dropdown--up.ui-input-autocomplete-fade-leave-to {
  transform: translateY(8px);
}

.ui-input-autocomplete-loading,
.ui-input-autocomplete-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: var(--ui-color-text-light);
  font-size: 14px;
}

.ui-input-autocomplete-loading-icon {
  margin-right: 8px;
}

.ui-input-autocomplete--small .ui-input-autocomplete-loading,
.ui-input-autocomplete--small .ui-input-autocomplete-empty {
  padding: 8px;
  font-size: 12px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-loading,
.ui-input-autocomplete--large .ui-input-autocomplete-empty {
  padding: 16px;
  font-size: 16px;
}

.ui-input-autocomplete-options {
  padding: 4px 0;
}

.ui-input-autocomplete-option {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-input-autocomplete--small .ui-input-autocomplete-option {
  padding: 6px 8px;
  font-size: 12px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-option {
  padding: 10px 16px;
  font-size: 16px;
}

.ui-input-autocomplete-option:hover {
  background-color: var(--ui-color-bg-hover);
}

.ui-input-autocomplete-option--active {
  background-color: var(--ui-color-bg-hover);
  color: var(--ui-color-primary);
}

.ui-input-autocomplete-option--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  color: var(--ui-color-disabled-text);
}

.ui-input-autocomplete-option--disabled:hover {
  background-color: transparent;
}

.ui-input-autocomplete-option--create {
  color: var(--ui-color-primary);
  font-style: italic;
}

.ui-input-autocomplete-group {
  margin-bottom: 4px;
}

.ui-input-autocomplete-group-label {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--ui-color-text-light);
  font-weight: 500;
}

.ui-input-autocomplete--small .ui-input-autocomplete-group-label {
  padding: 4px 8px;
  font-size: 11px;
}

.ui-input-autocomplete--large .ui-input-autocomplete-group-label {
  padding: 8px 16px;
  font-size: 14px;
}

.ui-input-autocomplete-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 4px;
  font-size: 12px;
  color: var(--ui-color-danger);
  line-height: 1.2;
}

/* 高亮匹配文本样式 */
:deep(.ui-input-autocomplete-highlight) {
  color: var(--ui-color-primary);
  font-weight: 500;
}

/* 动画类 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
