<script setup lang="ts" name="UiSelect">
/**
 * Select 选择器组件
 * 创建日期: 2024-05-26
 * 作者: aiftt
 * 更新日期: 2024-05-27 - 扩展功能，增加Element Plus的全部功能
 * 更新日期: 2024-07-05 - 优化代码，增强键盘导航
 * 更新日期: 2024-08-22 - 修复水合问题，将querySelector替换为ref
 */

import { debounce } from 'lodash'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

// 定义选项类型
export interface ISelectOption {
  value: string | number
  label: string
  disabled?: boolean
  class?: string
  style?: Record<string, string>
  // 为分组功能添加
  children?: ISelectOption[]
  // 为自定义标签添加
  tagType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  tagClass?: string
}

// 定义过滤方法类型
export type FilterMethod = (value: string, option: ISelectOption) => boolean
// 定义远程搜索方法类型
export type RemoteMethod = (query: string) => void

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string | number | Array<string | number>
  /**
   * 选项列表
   */
  options?: ISelectOption[]
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 是否多选
   */
  multiple?: boolean
  /**
   * 选择器尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示错误状态
   */
  error?: boolean
  /**
   * 下拉最大高度
   */
  maxHeight?: string
  /**
   * 宽度
   */
  width?: string
  /**
   * 是否可筛选选项
   */
  filterable?: boolean
  /**
   * 筛选方法
   */
  filterMethod?: FilterMethod
  /**
   * 是否允许创建新选项 (仅在filterable为true时有效)
   */
  allowCreate?: boolean
  /**
   * 是否使用远程搜索
   */
  remote?: boolean
  /**
   * 远程搜索方法
   */
  remoteMethod?: RemoteMethod
  /**
   * 是否正在加载选项
   */
  loading?: boolean
  /**
   * 加载中文字
   */
  loadingText?: string
  /**
   * 无数据时显示的文字
   */
  noDataText?: string
  /**
   * 无匹配数据时显示的文字
   */
  noMatchText?: string
  /**
   * 多选时是否将选中值按文字的形式展示
   */
  collapseTags?: boolean
  /**
   * 多选时最多显示的标签数
   */
  maxCollapseTagCount?: number
  /**
   * 多选时标签的类型
   */
  tagType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 是否只能选中叶子节点（分组选项）
   */
  onlyLeafNodes?: boolean
  /**
   * 是否自动聚焦
   */
  autofocus?: boolean
  /**
   * 自动完成属性
   */
  autocomplete?: string
  /**
   * 输入框名称
   */
  name?: string
  /**
   * ID属性
   */
  id?: string
  /**
   * 多选时用户自定义值分隔符
   */
  multipleValueSeparator?: string
  /**
   * 下拉框的弹出位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 空值对应的值
   */
  emptyValue?: string | number | Array<string | number>
  /**
   * 最大选择数量（多选模式）
   */
  maxSelections?: number
  /**
   * 下拉菜单的类名
   */
  dropdownClass?: string
  /**
   * 用于远程搜索时的防抖延迟时间
   */
  debounceDelay?: number
}>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  multiple: false,
  size: 'default',
  error: false,
  maxHeight: '250px',
  filterable: false,
  allowCreate: false,
  remote: false,
  loading: false,
  loadingText: '加载中...',
  noDataText: '暂无数据',
  noMatchText: '无匹配数据',
  collapseTags: false,
  maxCollapseTagCount: 1,
  tagType: 'default',
  onlyLeafNodes: false,
  autofocus: false,
  autocomplete: 'off',
  placement: 'bottom',
  maxSelections: Infinity,
  debounceDelay: 300,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'removeTag', value: string | number): void
  (e: 'clear'): void
  (e: 'filter', query: string): void
  (e: 'search', query: string): void
}>()

// 下拉菜单是否可见
const visible = ref(false)
// 选择器容器引用
const selectRef = ref<HTMLElement>()
// 输入框引用
const inputRef = ref<HTMLInputElement>()
// 下拉菜单引用
const dropdownRef = ref<HTMLElement>()
// 搜索查询文本
const query = ref('')
// 创建的新选项
const createdOptions = ref<ISelectOption[]>([])
// 搜索聚焦
const isFocused = ref(false)
// 标签标签溢出
const tagOverflow = ref(false)
// 当前高亮选项的索引
const highlightedIndex = ref(-1)
// 下拉菜单位置
const dropdownPosition = ref({
  top: '0px',
  left: '0px',
  width: '0px',
  transformOrigin: 'center top',
})
// 是否使用teleport
const useTeleport = ref(true)
// 下拉菜单附加到的元素
const teleportTo = ref('body')

// 远程搜索防抖处理
const debouncedRemoteSearch = debounce((q: string) => {
  if (props.remoteMethod) {
    props.remoteMethod(q)
    emit('search', q)
  }
}, props.debounceDelay)

// 筛选后的选项
const filteredOptions = computed(() => {
  let result = [...props.options, ...createdOptions.value]

  // 如果有筛选文本且启用了筛选
  if (query.value && props.filterable) {
    if (props.filterMethod) {
      // 使用自定义筛选方法
      result = result.filter(option => props.filterMethod!(query.value, option))
    }
    else {
      // 默认筛选方法：包含查询文本
      result = result.filter(option =>
        option.label.toLowerCase().includes(query.value.toLowerCase()),
      )
    }
  }

  return result
})

// 获取所有可用的选项(用于键盘导航)
const navigableOptions = computed(() => {
  const result: ISelectOption[] = []

  // 扁平化处理选项列表，包括嵌套的子选项
  filteredOptions.value.forEach((option) => {
    if ('children' in option && Array.isArray(option.children)) {
      option.children.forEach((child) => {
        if (!child.disabled) {
          result.push(child)
        }
      })
    }
    else if (!option.disabled) {
      result.push(option)
    }
  })

  return result
})

// 选中的选项标签
const selectedLabel = computed(() => {
  if (props.multiple) {
    const selectedOptions = getAllOptions().filter(option =>
      Array.isArray(props.modelValue) && props.modelValue.includes(option.value),
    )
    return selectedOptions.map(option => option.label).join(', ')
  }
  else {
    const option = getAllOptions().find(option => option.value === props.modelValue)
    return option ? option.label : ''
  }
})

// 获取所有选项（包括创建的选项）
function getAllOptions() {
  return [...props.options, ...createdOptions.value]
}

// 是否有选中值
const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

// 选择器样式计算
const selectClass = computed(() => {
  const classes = ['ui-select']

  // 尺寸
  classes.push(`ui-select--${props.size}`)

  // 状态
  if (props.disabled)
    classes.push('ui-select--disabled')
  if (props.error)
    classes.push('ui-select--error')
  if (visible.value)
    classes.push('ui-select--active')
  if (props.filterable)
    classes.push('ui-select--filterable')
  if (props.multiple)
    classes.push('ui-select--multiple')
  if (props.loading)
    classes.push('ui-select--loading')

  return classes.join(' ')
})

// 下拉菜单样式计算
const dropdownClass = computed(() => {
  const classes = ['ui-select-dropdown']

  if (props.dropdownClass)
    classes.push(props.dropdownClass)

  return classes.join(' ')
})

// 选择器宽度样式
const selectWidthVar = computed(() => props.width || null)

// 下拉菜单最大高度样式
const dropdownMaxHeightVar = computed(() => props.maxHeight)

// 箭头图标类名
const arrowIconClass = computed(() => {
  return visible.value ? 'ui-select-arrow-icon ui-select-arrow-icon--active' : 'ui-select-arrow-icon'
})

// 多选标签处理
const visibleTags = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue))
    return []

  const selectedOptions = getAllOptions().filter(option =>
    Array.isArray(props.modelValue) && props.modelValue.includes(option.value),
  )

  if (props.collapseTags && selectedOptions.length > props.maxCollapseTagCount) {
    return selectedOptions.slice(0, props.maxCollapseTagCount)
  }

  return selectedOptions
})

// 剩余标签数量
const remainingTagsCount = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue))
    return 0

  const selectedOptions = getAllOptions().filter(option =>
    Array.isArray(props.modelValue) && props.modelValue.includes(option.value),
  )

  if (props.collapseTags && selectedOptions.length > props.maxCollapseTagCount) {
    return selectedOptions.length - props.maxCollapseTagCount
  }

  return 0
})

// 下拉选项分组处理
const groupedOptions = computed(() => {
  const groups: Record<string, ISelectOption[]> = {}
  const ungrouped: ISelectOption[] = []

  filteredOptions.value.forEach((option) => {
    if ('children' in option && Array.isArray(option.children)) {
      groups[option.label] = option.children
    }
    else {
      ungrouped.push(option)
    }
  })

  return { groups, ungrouped }
})

// 在父组件找到当前高亮的元素
// 使用一个Map来保存选项元素引用
const optionRefs = ref<Map<number, HTMLElement>>(new Map())

// 方便设置和获取选项元素引用的方法
function setOptionRef(index: number, el: HTMLElement | null) {
  if (el) {
    optionRefs.value.set(index, el)
  }
  else {
    optionRefs.value.delete(index)
  }
}

function getOptionRef(index: number): HTMLElement | undefined {
  return optionRefs.value.get(index)
}

// 处理选项点击
function handleOptionClick(option: ISelectOption) {
  if (option.disabled)
    return

  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = values.indexOf(option.value)

    // 检查是否已达到最大选择数量
    if (index === -1 && values.length >= props.maxSelections) {
      return
    }

    if (index > -1) {
      values.splice(index, 1)
    }
    else {
      values.push(option.value)
    }

    emit('update:modelValue', values)
    emit('change', values)

    // 多选模式下不关闭下拉框，而是保持焦点在输入框
    if (props.filterable && inputRef.value) {
      inputRef.value.focus()
      query.value = ''
    }
  }
  else {
    // 单选模式，更新值并关闭下拉框
    emit('update:modelValue', option.value)
    emit('change', option.value)
    // 清空查询文本，这样下次打开时显示的是选中的标签
    query.value = ''
    hideDropdown()
  }
}

// 处理标签移除
function handleTagRemove(value: string | number, event: MouseEvent) {
  event.stopPropagation()

  if (props.disabled)
    return

  if (props.multiple && Array.isArray(props.modelValue)) {
    const values = [...props.modelValue]
    const index = values.indexOf(value)

    if (index > -1) {
      values.splice(index, 1)
      emit('update:modelValue', values)
      emit('change', values)
      emit('removeTag', value)
    }
  }
}

// 处理清除按钮点击
function handleClear(event: Event) {
  event.stopPropagation()
  const emptyValue = props.emptyValue ?? (props.multiple ? [] : '')
  emit('update:modelValue', emptyValue)
  emit('change', emptyValue)
  emit('clear')
}

// 处理输入框输入事件
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  query.value = target.value

  // 触发筛选事件
  emit('filter', query.value)

  // 如果开启了远程搜索
  if (props.remote && props.remoteMethod) {
    debouncedRemoteSearch(query.value)
  }

  // 单选模式下，当输入框内容变化时，但不是由选择选项引起的
  if (!props.multiple && props.filterable && query.value !== selectedLabel.value) {
    // 若允许创建新选项，可在这里处理
    // 清空当前选中值，因为用户正在输入新内容
    if (props.modelValue) {
      emit('update:modelValue', props.emptyValue ?? '')
    }
  }
}

// 处理输入框获得焦点
function handleInputFocus() {
  if (props.disabled)
    return

  // 设置焦点状态
  isFocused.value = true

  // 如果下拉菜单未显示，则显示下拉菜单
  if (!visible.value) {
    showDropdown()
  }

  // 在单选模式下，如果有选中值，选中输入框的全部内容方便用户直接输入
  if (props.filterable && !props.multiple && props.modelValue && inputRef.value) {
    nextTick(() => {
      inputRef.value?.select()
    })
  }

  // 触发focus事件
  emit('focus')
}

// 创建新选项
function createNewOption() {
  if (!props.allowCreate || !query.value || !props.filterable)
    return

  // 检查选项是否已存在
  const optionExists = getAllOptions().some(option =>
    option.label === query.value || option.value === query.value,
  )

  if (!optionExists) {
    const newOption: ISelectOption = {
      value: query.value,
      label: query.value,
    }

    createdOptions.value.push(newOption)

    // 如果是多选模式，直接选中新创建的选项
    if (props.multiple && Array.isArray(props.modelValue)) {
      const values = [...props.modelValue, newOption.value]
      emit('update:modelValue', values)
      emit('change', values)
    }

    // 清空搜索框
    query.value = ''
  }
}

// 处理键盘事件
function handleKeydown(event: KeyboardEvent) {
  // 避免处理未打开的下拉框
  if (!visible.value && event.key !== 'Enter' && event.key !== 'Space') {
    return
  }

  switch (event.key) {
    case 'Enter':
      // 如果下拉框未打开，则打开
      if (!visible.value) {
        event.preventDefault()
        showDropdown()
        return
      }

      // 选中当前高亮的选项
      if (highlightedIndex.value > -1) {
        event.preventDefault()
        const option = navigableOptions.value[highlightedIndex.value]
        if (option && !option.disabled) {
          handleOptionClick(option)
        }
      }
      break

    case ' ':
    case 'Space':
      // 空格键打开下拉框
      if (!visible.value && !props.filterable) {
        event.preventDefault()
        showDropdown()
      }
      break

    case 'Escape':
      // ESC键关闭下拉框
      event.preventDefault()
      hideDropdown()
      break

    case 'ArrowDown':
      // 向下移动高亮
      event.preventDefault()
      navigateOptions('down')
      break

    case 'ArrowUp':
      // 向上移动高亮
      event.preventDefault()
      navigateOptions('up')
      break

    case 'Tab':
      // Tab键关闭下拉框
      hideDropdown()
      break
  }
}

// 处理方向键导航和选择
function navigateOptions(direction: 'up' | 'down') {
  const options = navigableOptions.value
  if (options.length === 0)
    return

  if (highlightedIndex.value === -1) {
    highlightedIndex.value = 0
    return
  }

  const optionsLength = options.length
  let nextIndex = direction === 'down'
    ? (highlightedIndex.value + 1) % optionsLength
    : (highlightedIndex.value - 1 + optionsLength) % optionsLength

  // 跳过禁用的选项
  const startIndex = nextIndex
  while (
    options[nextIndex].disabled
    && nextIndex !== startIndex
  ) {
    nextIndex = direction === 'down'
      ? (nextIndex + 1) % optionsLength
      : (nextIndex - 1 + optionsLength) % optionsLength
  }

  highlightedIndex.value = nextIndex

  // 确保高亮的选项可见
  nextTick(() => {
    const highlightedOption = getOptionRef(highlightedIndex.value)
    if (highlightedOption && dropdownRef.value) {
      const container = dropdownRef.value
      const itemTop = highlightedOption.offsetTop
      const itemBottom = itemTop + highlightedOption.clientHeight

      if (itemBottom > container.scrollTop + container.clientHeight) {
        container.scrollTop = itemBottom - container.clientHeight
      }
      else if (itemTop < container.scrollTop) {
        container.scrollTop = itemTop
      }
    }
  })
}

// 显示下拉菜单
function showDropdown() {
  if (props.disabled || visible.value)
    return

  visible.value = true
  emit('visibleChange', true)

  if (import.meta.client) {
    // 计算下拉菜单位置
    nextTick(() => {
      updateDropdownPosition()
      document.addEventListener('click', handleOutsideClick)
      window.addEventListener('resize', handleWindowResize)
      window.addEventListener('scroll', handleWindowScroll, true)

      // 修复：打开下拉框后聚焦输入框，确保键盘导航正常工作
      if (props.filterable && inputRef.value) {
        inputRef.value.focus()
      }

      // 重置高亮索引
      if (navigableOptions.value.length > 0) {
        const selectedIndex = navigableOptions.value.findIndex(option =>
          isSelected(option),
        )

        highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
      }
    })
  }
}

// 隐藏下拉菜单
function hideDropdown() {
  visible.value = false
  query.value = ''
  isFocused.value = false
  emit('blur')
  emit('visibleChange', false)

  if (import.meta.client) {
    document.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('resize', handleWindowResize)
    window.removeEventListener('scroll', handleWindowScroll, true)
  }
}

// 计算下拉菜单位置
function updateDropdownPosition() {
  if (!import.meta.client || !selectRef.value)
    return

  const selectRect = selectRef.value.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  const viewportHeight = window.innerHeight
  const spaceBelow = viewportHeight - selectRect.bottom
  const spaceAbove = selectRect.top

  // 默认显示在下方
  let top = `${selectRect.bottom + scrollTop}px`
  let transformOrigin = 'center top'

  // 如果下方空间不足且上方空间足够，则显示在上方
  if ((spaceBelow < 200 && spaceAbove > 200) || props.placement === 'top') {
    top = `${selectRect.top + scrollTop - 4}px`
    transformOrigin = 'center bottom'
  }

  // 更新下拉菜单位置
  dropdownPosition.value = {
    top,
    left: `${selectRect.left + scrollLeft}px`,
    width: `${selectRect.width}px`,
    transformOrigin,
  }
}

// 处理窗口大小变化
function handleWindowResize() {
  if (!import.meta.client)
    return

  if (visible.value) {
    updateDropdownPosition()
  }
}

// 处理滚动事件
function handleWindowScroll() {
  if (!import.meta.client)
    return

  if (visible.value) {
    updateDropdownPosition()
  }
}

// 处理点击外部关闭下拉菜单
function handleOutsideClick(event: MouseEvent) {
  if (!import.meta.client || !selectRef.value)
    return

  if (!selectRef.value.contains(event.target as Node)) {
    hideDropdown()
  }
}

// 判断选项是否选中
function isSelected(option: ISelectOption) {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value)
  }
  return props.modelValue === option.value
}

// 监听焦点变化
function handleFocusChange(focus: boolean) {
  isFocused.value = focus

  // 当失去焦点时，如果单选模式下有选中值，则清空搜索文本
  if (!focus && !props.multiple && props.filterable) {
    // 延迟清空query，避免影响选项点击
    setTimeout(() => {
      if (!visible.value) {
        query.value = ''
      }
    }, 100)
  }
}

// 处理选择器点击
function handleSelectClick() {
  if (props.disabled)
    return

  // 如果下拉菜单已展开，则收起
  if (visible.value) {
    hideDropdown()
  }
  else {
    // 否则展开下拉菜单
    showDropdown()
  }
}

// 在组件挂载时，如果设置了自动聚焦，则自动聚焦输入框
onMounted(() => {
  if (import.meta.client && props.autofocus && inputRef.value) {
    inputRef.value.focus()
  }
})

// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('resize', handleWindowResize)
    window.removeEventListener('scroll', handleWindowScroll, true)
  }
})

// 监听modelValue变化
watch(() => props.modelValue, () => {
  nextTick(() => {
    // 如果需要，可以在这里处理modelValue变化后的逻辑
  })
})

// 为子组件提供上下文
provide('select', {
  props,
  visible,
  filteredOptions,
  isSelected,
  handleOptionClick,
})
</script>

<template>
  <div
    ref="selectRef"
    :class="selectClass"
    @click="handleSelectClick"
    @keydown="handleKeydown"
  >
    <!-- 选择器内容 -->
    <div class="ui-select-input">
      <!-- 单选模式 -->
      <template v-if="!multiple">
        <!-- 不可筛选时使用span显示值 -->
        <template v-if="!filterable">
          <span v-if="hasValue" class="ui-select-value">{{ selectedLabel }}</span>
          <span v-else class="ui-select-placeholder">{{ placeholder }}</span>
        </template>

        <!-- 可筛选时使用input -->
        <input
          v-else
          :id="id"
          ref="inputRef"
          :value="query || selectedLabel"
          type="text"
          class="ui-select-search-input"
          :placeholder="hasValue ? '' : placeholder"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :name="name"
          @input="handleInput"
          @focus="handleInputFocus"
          @blur="handleFocusChange(false)"
          @click.stop
        >
      </template>

      <!-- 多选模式 -->
      <template v-else>
        <div class="ui-select-tags" :class="{ 'ui-select-tags--overflow': tagOverflow }">
          <!-- 显示的标签 -->
          <ui-tag
            v-for="option in visibleTags"
            :key="option.value"
            :type="option.tagType || tagType"
            :class="option.tagClass"
            :closable="!disabled"
            :size="size === 'large' ? 'default' : 'small'"
            class="ui-select-tag"
            @close="handleTagRemove(option.value, $event)"
          >
            {{ option.label }}
          </ui-tag>

          <!-- 折叠的标签计数 -->
          <ui-tag
            v-if="remainingTagsCount > 0"
            type="default"
            size="small"
            class="ui-select-tag--count"
          >
            +{{ remainingTagsCount }}
          </ui-tag>

          <!-- 多选模式下的输入框 -->
          <input
            v-if="filterable"
            :id="id"
            ref="inputRef"
            v-model="query"
            type="text"
            class="ui-select-search-input ui-select-search-input--multiple"
            :placeholder="visibleTags.length > 0 ? '' : placeholder"
            :disabled="disabled"
            :autocomplete="autocomplete"
            :name="name"
            @input="handleInput"
            @focus="handleInputFocus"
            @blur="handleFocusChange(false)"
            @click.stop
          >

          <!-- 多选模式下无标签时的占位符 -->
          <span v-if="!filterable && visibleTags.length === 0" class="ui-select-placeholder">
            {{ placeholder }}
          </span>
        </div>
      </template>

      <!-- 清除按钮 -->
      <ui-icon
        v-if="clearable && hasValue && !disabled"
        icon="carbon:close"
        class="ui-select-clear-icon"
        @click="handleClear"
      />

      <!-- 加载中图标 -->
      <ui-icon
        v-if="loading"
        icon="carbon:renew"
        class="ui-select-loading-icon"
      />

      <!-- 箭头图标 -->
      <ui-icon
        v-else
        icon="carbon:chevron-down"
        :class="arrowIconClass"
      />
    </div>

    <client-only>
      <!-- 下拉菜单，使用teleport传送到body -->
      <teleport :to="teleportTo" :disabled="!useTeleport">
        <transition name="ui-select-dropdown-fade">
          <div
            v-show="visible"
            ref="dropdownRef"
            :class="dropdownClass"
            :style="useTeleport ? {
              ...dropdownPosition,
              position: 'absolute',
              zIndex: 1050,
            } : {
              maxHeight,
              transformOrigin: placement === 'top' ? 'center bottom' : 'center top',
            }"
          >
            <!-- 下拉菜单小箭头 -->
            <div v-if="useTeleport" class="ui-select-dropdown-arrow" />

            <!-- 头部插槽 -->
            <div v-if="$slots.header" class="ui-select-dropdown-header">
              <slot name="header" />
            </div>

            <!-- 加载状态 -->
            <div v-if="loading" class="ui-select-loading">
              <ui-icon icon="carbon:renew" class="ui-select-loading-spinner" />
              <span>{{ loadingText }}</span>
            </div>

            <!-- 没有选项时的空状态 -->
            <div v-else-if="filteredOptions.length === 0" class="ui-select-empty">
              <slot name="empty">
                {{ query ? noMatchText : noDataText }}
              </slot>
            </div>

            <!-- 创建新选项提示 -->
            <div
              v-else-if="allowCreate && filterable && query && !filteredOptions.some(option => option.label === query)"
              class="ui-select-create-option"
              @click.stop="createNewOption"
            >
              <slot name="create-option" :query="query">
                <span>{{ '创建' }}<strong>{{ query }}</strong></span>
              </slot>
            </div>

            <!-- 选项列表 -->
            <ul v-else v-auto-animate class="ui-select-options">
              <!-- 未分组选项 -->
              <template v-if="Object.keys(groupedOptions.groups).length === 0">
                <li
                  v-for="(option, index) in filteredOptions"
                  :key="option.value"
                  :ref="el => setOptionRef(index, el as HTMLElement | null)"
                  class="ui-select-option" :class="[
                    {
                      'ui-select-option--selected': isSelected(option),
                      'ui-select-option--disabled': option.disabled,
                      'ui-select-option--highlighted': highlightedIndex === index,
                    },
                  ]"
                  :style="option.style"
                  @click="() => !option.disabled && handleOptionClick(option)"
                  @mouseover="() => !option.disabled && (highlightedIndex = index)"
                >
                  <!-- 自定义选项模板 -->
                  <slot name="option" :option="option" :selected="isSelected(option)">
                    <!-- 多选模式下的勾选图标 -->
                    <ui-icon
                      v-if="multiple && isSelected(option)"
                      icon="carbon:checkmark"
                      class="ui-select-option-icon"
                    />

                    <!-- 选项文本 -->
                    <span class="ui-select-option-label">{{ option.label }}</span>
                  </slot>
                </li>
              </template>

              <!-- 分组选项 -->
              <template v-else>
                <!-- 未分组的选项放在最前面 -->
                <template v-if="groupedOptions.ungrouped.length > 0">
                  <li
                    v-for="(option, index) in groupedOptions.ungrouped"
                    :key="option.value"
                    :ref="el => setOptionRef(index, el as HTMLElement | null)"
                    class="ui-select-option" :class="[
                      {
                        'ui-select-option--selected': isSelected(option),
                        'ui-select-option--disabled': option.disabled,
                        'ui-select-option--highlighted': highlightedIndex === index,
                      },
                    ]"
                    :style="option.style"
                    @click="() => !option.disabled && handleOptionClick(option)"
                    @mouseover="() => !option.disabled && (highlightedIndex = index)"
                  >
                    <slot name="option" :option="option" :selected="isSelected(option)">
                      <ui-icon
                        v-if="multiple && isSelected(option)"
                        icon="carbon:checkmark"
                        class="ui-select-option-icon"
                      />
                      <span class="ui-select-option-label">{{ option.label }}</span>
                    </slot>
                  </li>
                </template>

                <!-- 分组选项 -->
                <li v-for="(groupOptions, groupLabel) in groupedOptions.groups" :key="groupLabel" class="ui-select-group">
                  <div class="ui-select-group-label">
                    {{ groupLabel }}
                  </div>
                  <ul class="ui-select-group-options">
                    <li
                      v-for="(option, index) in groupOptions"
                      :key="option.value"
                      :ref="el => setOptionRef(index, el as HTMLElement | null)"
                      class="ui-select-option" :class="[
                        {
                          'ui-select-option--selected': isSelected(option),
                          'ui-select-option--disabled': option.disabled,
                          'ui-select-option--highlighted': highlightedIndex === index,
                        },
                      ]"
                      :style="option.style"
                      @click="() => !option.disabled && handleOptionClick(option)"
                      @mouseover="() => !option.disabled && (highlightedIndex = index)"
                    >
                      <slot name="option" :option="option" :selected="isSelected(option)">
                        <ui-icon
                          v-if="multiple && isSelected(option)"
                          icon="carbon:checkmark"
                          class="ui-select-option-icon"
                        />
                        <span class="ui-select-option-label">{{ option.label }}</span>
                      </slot>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>

            <!-- 底部插槽 -->
            <div v-if="$slots.footer" class="ui-select-dropdown-footer">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </teleport>
    </client-only>
  </div>
</template>

<style scoped>
.ui-select {
  /* 动态变量绑定 */
  --ui-select-width: v-bind(selectWidthVar);
  --ui-select-dropdown-max-height: v-bind(dropdownMaxHeightVar);

  position: relative;
  display: inline-flex;
  width: var(--ui-select-width, 100%);
  box-sizing: border-box;
  cursor: pointer;
  font-size: var(--ui-font-size, 14px);
  user-select: none;
}

.ui-select-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 32px 0 12px;
  box-sizing: border-box;
  border: 1px solid var(--ui-select-border-color, var(--ui-border-color));
  border-radius: var(--ui-border-radius, 4px);
  background-color: var(--ui-select-bg, var(--ui-color-bg));
  transition: all 0.2s;
  outline: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ui-select--default .ui-select-input {
  height: 36px;
}

.ui-select--small .ui-select-input {
  height: 28px;
  padding: 0 28px 0 8px;
  font-size: 12px;
}

.ui-select--large .ui-select-input {
  height: 42px;
  padding: 0 36px 0 16px;
  font-size: 16px;
}

.ui-select-placeholder {
  color: var(--ui-select-placeholder-color, var(--ui-color-text-light));
}

.ui-select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--ui-color-text);
}

/* 搜索输入框样式 */
.ui-select-search-input {
  flex: 1;
  width: 100%;
  min-width: 20px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  color: var(--ui-color-text);
  font-size: inherit;
  line-height: inherit;
}

.ui-select-search-input::placeholder {
  color: var(--ui-select-placeholder-color, var(--ui-color-text-light));
}

.ui-select-search-input--multiple {
  width: 0;
  flex: 1;
}

/* 多选标签样式 */
.ui-select-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 1;
  overflow: hidden;
  padding: 3px 0;
}

.ui-select--small .ui-select-tags {
  gap: 4px;
  padding: 2px 0;
}

.ui-select-tags--overflow {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ui-select-tags--overflow::-webkit-scrollbar {
  display: none;
}

/* 标签样式 */
.ui-select-tag {
  max-width: 100%;
  transition: all 0.2s ease;
}

.ui-select-tag--count {
  background-color: var(--ui-color-secondary-light);
  color: var(--ui-color-text-light);
  font-weight: 500;
}

.ui-select-clear-icon {
  position: absolute;
  right: 24px;
  font-size: 14px;
  color: var(--ui-color-text-lighter);
  cursor: pointer;
  transition: color 0.2s;
  z-index: 2;
}

.ui-select-clear-icon:hover {
  color: var(--ui-color-text-light);
}

.ui-select--small .ui-select-clear-icon {
  right: 20px;
  font-size: 12px;
}

.ui-select--large .ui-select-clear-icon {
  right: 28px;
  font-size: 16px;
}

.ui-select-loading-icon {
  position: absolute;
  right: 24px;
  font-size: 14px;
  color: var(--ui-color-text-light);
  animation: ui-select-rotate 1s linear infinite;
}

@keyframes ui-select-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ui-select-arrow-icon {
  position: absolute;
  right: 8px;
  font-size: 14px;
  color: var(--ui-color-text-light);
  transition: transform 0.2s;
}

.ui-select-arrow-icon--active {
  transform: rotate(180deg);
}

.ui-select--small .ui-select-arrow-icon {
  font-size: 12px;
}

.ui-select--large .ui-select-arrow-icon {
  font-size: 16px;
}

.ui-select:hover .ui-select-input {
  border-color: var(--ui-select-hover-border, var(--ui-color-primary));
}

.ui-select--active .ui-select-input {
  border-color: var(--ui-select-hover-border, var(--ui-color-primary));
  box-shadow: 0 0 0 2px var(--ui-select-focus-shadow, var(--ui-color-primary-light, rgba(24, 144, 255, 0.2)));
}

.ui-select--disabled {
  cursor: not-allowed;
}

.ui-select--disabled .ui-select-input {
  background-color: var(--ui-select-disabled-bg, var(--ui-disabled-bg));
  border-color: var(--ui-select-disabled-border, var(--ui-color-disabled-border));
  color: var(--ui-select-disabled-text, var(--ui-color-disabled-text));
}

.ui-select--error .ui-select-input {
  border-color: var(--ui-color-danger);
}

.ui-select--error.ui-select--active .ui-select-input {
  box-shadow: 0 0 0 2px var(--ui-color-danger-light, rgba(245, 34, 45, 0.2));
}

/* 下拉菜单过渡效果 */
.ui-select-dropdown-fade-enter-active,
.ui-select-dropdown-fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.ui-select-dropdown-fade-enter-from,
.ui-select-dropdown-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}

.ui-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 4px;
  background-color: var(--ui-select-dropdown-bg, var(--ui-color-bg));
  border: 1px solid var(--ui-select-border-color, var(--ui-color-border));
  border-radius: var(--ui-border-radius, 4px);
  box-shadow: var(--ui-shadow);
  z-index: 1000;
  box-sizing: border-box;
  max-height: var(--ui-select-dropdown-max-height, 250px);
  overflow-y: auto;
}

/* 下拉菜单小箭头 */
.ui-select-dropdown-arrow {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background-color: var(--ui-select-dropdown-bg, var(--ui-color-bg));
  border-top: 1px solid var(--ui-select-border-color, var(--ui-color-border));
  border-left: 1px solid var(--ui-select-border-color, var(--ui-color-border));
  box-sizing: border-box;
  z-index: -1;
}

.ui-select-dropdown-header,
.ui-select-dropdown-footer {
  padding: 8px 12px;
}

.ui-select-dropdown-header {
  border-bottom: none;
}

.ui-select-dropdown-footer {
  border-top: 1px solid var(--ui-select-border-color, var(--ui-color-border));
}

.ui-select-options {
  margin: 0;
  padding: 4px 0;
  list-style: none;
}

.ui-select-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 2px;
  margin: 0 4px;
  position: relative;
}

.ui-select--small .ui-select-option {
  padding: 6px 8px;
  font-size: 12px;
}

.ui-select--large .ui-select-option {
  padding: 10px 16px;
  font-size: 16px;
}

.ui-select-option:hover {
  background-color: var(--ui-select-option-hover-bg, var(--ui-color-bg-hover));
}

.ui-select-option--selected {
  color: var(--ui-select-option-selected-color, var(--ui-color-primary));
  background-color: var(--ui-select-option-selected-bg, var(--ui-color-primary-light, rgba(24, 144, 255, 0.1)));
  font-weight: 500;
}

.ui-select-option--highlighted {
  background-color: var(--ui-select-option-hover-bg, var(--ui-color-bg-hover));
}

.ui-select-option--disabled {
  color: var(--ui-select-disabled-text, var(--ui-color-disabled-text));
  cursor: not-allowed;
  background-color: var(--ui-select-bg, var(--ui-color-bg));
}

.ui-select-option--disabled:hover {
  background-color: var(--ui-select-bg, var(--ui-color-bg));
}

.ui-select-option-icon {
  margin-right: 8px;
  font-size: 14px;
  color: var(--ui-color-primary);
}

.ui-select-option-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 分组样式 */
.ui-select-group {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ui-select-group-label {
  padding: 8px 12px;
  font-size: 12px;
  color: var(--ui-color-text-light);
  font-weight: 600;
}

.ui-select-group-options {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 空状态 */
.ui-select-empty,
.ui-select-loading,
.ui-select-create-option {
  padding: 8px 12px;
  text-align: center;
  color: var(--ui-color-text-lighter);
}

.ui-select-create-option {
  cursor: pointer;
  color: var(--ui-color-primary);
}

.ui-select-create-option:hover {
  background-color: var(--ui-select-option-hover-bg, var(--ui-color-bg-hover));
}

.ui-select-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ui-select-loading-spinner {
  animation: ui-select-rotate 1s linear infinite;
}
</style>
