<script setup lang="ts" name="UiVirtualSelect">
/**
 * 虚拟化选择器组件
 * 创建日期: 2024-09-01
 * 作者: aiftt
 * 更新日期: 2024-09-01 - 首次实现
 * 更新日期: 2024-09-02 - 优化为真实虚拟滚动实现，解决大数据量DOM元素过多问题
 */

import type { ISelectOption } from '../select/index.vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// 定义虚拟滚动配置接口
export interface IVirtualScrollConfig {
  /**
   * 项目高度(px)
   */
  itemHeight: number
  /**
   * 缓冲区域项目数量
   */
  buffer?: number
  /**
   * 是否启用虚拟滚动
   */
  enabled?: boolean
  /**
   * 虚拟滚动激活的最小项目数量
   */
  threshold?: number
}

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
  filterMethod?: (value: string, option: ISelectOption) => boolean
  /**
   * 是否允许创建新选项 (仅在filterable为true时有效)
   */
  allowCreate?: boolean
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
   * 虚拟滚动配置
   */
  virtualScroll?: IVirtualScrollConfig
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
  collapseTags: false,
  maxCollapseTagCount: 1,
  tagType: 'default',
  onlyLeafNodes: false,
  virtualScroll: () => ({
    itemHeight: 36,
    buffer: 5,
    enabled: true,
    threshold: 100,
  }),
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>): void
  (e: 'visibleChange', visible: boolean): void
}>()

// ==== 组件内部状态 ====
// 下拉框是否可见
const dropdownVisible = ref(false)
// 输入框引用
const inputRef = ref<HTMLElement>()
// 下拉框引用
const dropdownRef = ref<HTMLElement>()
// 下拉框容器引用
const scrollContainerRef = ref<HTMLElement>()
// 筛选关键字
const filterKeyword = ref('')
// 触发下拉框关闭的定时器
let closeTimer: number | null = null

// ==== 虚拟滚动状态 ====
// 滚动位置
const scrollTop = ref(0)
// 容器高度
const containerHeight = ref(0)

// ==== 辅助函数 ====
// 内部值处理
const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value !== undefined) {
      emit('update:modelValue', value)
      emit('change', value)
    }
  },
})

// 选项过滤处理
const filteredOptions = computed(() => {
  if (!props.filterable || !filterKeyword.value) {
    return props.options
  }

  // 使用自定义或默认过滤方法
  const filterFn = props.filterMethod || ((query, option) => {
    const label = String(option.label || '').toLowerCase()
    return label.includes(query.toLowerCase())
  })

  return props.options.filter(option => filterFn(filterKeyword.value, option))
})

// 扁平化处理嵌套选项（处理optionGroup）
const flattenOptions = computed(() => {
  const flatten = (options: ISelectOption[], depth = 0, parent: ISelectOption | null = null) => {
    let result: Array<{
      option: ISelectOption
      index: number
      level: number
      parent: ISelectOption | null
    }> = []

    options.forEach((option, index) => {
      result.push({
        option,
        index,
        level: depth,
        parent,
      })

      if (option.children && option.children.length) {
        result = result.concat(flatten(option.children, depth + 1, option))
      }
    })

    return result
  }

  return flatten(filteredOptions.value)
})

// 计算是否应启用虚拟滚动
const shouldEnableVirtualScroll = computed(() => {
  const { enabled, threshold = 100 } = props.virtualScroll
  // 确保布尔值比较正确
  return Boolean(enabled) && flattenOptions.value.length >= threshold
})

// 计算容器总高度
const totalHeight = computed(() => {
  if (!shouldEnableVirtualScroll.value) {
    return 'auto'
  }
  // 确保高度计算正确，这是虚拟滚动的关键
  return `${flattenOptions.value.length * props.virtualScroll.itemHeight}px`
})

// 计算可见区域的起始和结束索引
const visibleRange = computed(() => {
  // 如果不启用虚拟滚动，或者容器不存在，则默认渲染少量项
  if (!shouldEnableVirtualScroll.value) {
    return { start: 0, end: Math.min(20, flattenOptions.value.length) }
  }

  const { itemHeight, buffer = 5 } = props.virtualScroll

  // 计算可见区域内的项目索引范围
  const start = Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
  const visibleCount = Math.ceil(containerHeight.value / itemHeight) + 2 * buffer
  const end = Math.min(flattenOptions.value.length, start + visibleCount)

  return { start, end }
})

// 需要渲染的选项
const visibleOptions = computed(() => {
  const { start, end } = visibleRange.value
  return flattenOptions.value.slice(start, end)
})

// 计算每个选项的位置样式
function getItemStyle(index: number) {
  const { start } = visibleRange.value
  const { itemHeight } = props.virtualScroll
  const top = (start + index) * itemHeight

  return {
    position: 'absolute' as const,
    top: `${top}px`,
    height: `${itemHeight}px`,
    width: '100%',
  }
}

// 获取选中项的标签
function getSelectedLabel(value: string | number) {
  const option = props.options.find(opt => opt.value === value)
  return option ? option.label : value
}

// 多选模式下选中标签的显示处理
const displayTags = computed(() => {
  if (!props.multiple || !Array.isArray(innerValue.value)) {
    return []
  }

  return (innerValue.value as Array<string | number>).map((value) => {
    const option = props.options.find(opt => opt.value === value)
    return {
      value,
      label: option ? option.label : value,
    }
  })
})

// 单选模式下显示标签
const displayLabel = computed(() => {
  if (props.multiple || innerValue.value === undefined || innerValue.value === null) {
    return ''
  }

  return getSelectedLabel(innerValue.value as string | number)
})

// ==== 事件处理 ====
// 处理滚动事件
function handleScroll(event: Event) {
  if (!shouldEnableVirtualScroll.value)
    return

  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 测量容器高度
function measureContainer() {
  if (scrollContainerRef.value) {
    containerHeight.value = scrollContainerRef.value.clientHeight
  }
}

// 处理选择项
function handleSelect(option: ISelectOption) {
  if (option.disabled)
    return

  if (props.multiple) {
    selectMultiple(option)
  }
  else {
    selectSingle(option)
  }
}

// 单选处理
function selectSingle(option: ISelectOption) {
  innerValue.value = option.value
  closeDropdown()
}

// 多选处理
function selectMultiple(option: ISelectOption) {
  if (!Array.isArray(innerValue.value)) {
    innerValue.value = []
  }

  const valueArray = [...(innerValue.value as Array<string | number>)]
  const index = valueArray.indexOf(option.value)

  if (index === -1) {
    // 添加选项
    valueArray.push(option.value)
  }
  else {
    // 移除选项
    valueArray.splice(index, 1)
  }

  innerValue.value = valueArray
  // 多选模式下选择后不关闭下拉框
}

// 处理点击输入框区域
function handleInputClick() {
  if (props.disabled)
    return

  // 自动让输入框获得焦点，这会触发@focus事件
  const input = inputRef.value?.querySelector('input')
  if (input) {
    input.focus()
  }
  else {
    // 如果没有找到输入框，则直接切换下拉框状态
    if (dropdownVisible.value) {
      closeDropdown()
    }
    else {
      openDropdown()
    }
  }
}

// 处理输入框获得焦点
function handleFocus() {
  if (props.disabled)
    return

  // 在获得焦点时打开下拉框
  openDropdown()
}

// 处理输入事件 (用于筛选)
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  filterKeyword.value = target.value
}

// 处理清除按钮点击
function handleClear(event: Event) {
  event.stopPropagation()
  innerValue.value = props.multiple ? [] : undefined
}

// 处理移除标签
function handleRemoveTag(value: string | number) {
  if (!Array.isArray(innerValue.value))
    return

  const index = innerValue.value.indexOf(value)
  if (index > -1) {
    const newValue = [...innerValue.value]
    newValue.splice(index, 1)
    innerValue.value = newValue
  }
}

// 打开下拉框
function openDropdown() {
  if (dropdownVisible.value)
    return

  dropdownVisible.value = true
  emit('visibleChange', true)

  nextTick(() => {
    // 确保在DOM更新后再测量容器
    measureContainer()

    // 初始化滚动位置
    if (scrollContainerRef.value) {
      scrollTop.value = scrollContainerRef.value.scrollTop || 0
    }

    // 尝试滚动到选中项
    scrollToSelected()

    // 对于大数据量，确保虚拟滚动正确启用
    if (flattenOptions.value.length > (props.virtualScroll.threshold || 100)) {
      // 确保virtualScroll.enabled被设置为true
      if (!props.virtualScroll.enabled) {
        console.warn('VirtualSelect: Large dataset detected, consider enabling virtual scrolling for better performance')
      }
    }
  })

  // 添加点击外部关闭事件
  document.addEventListener('click', handleOutsideClick)
}

// 关闭下拉框
function closeDropdown() {
  if (!dropdownVisible.value)
    return

  dropdownVisible.value = false
  emit('visibleChange', false)
  filterKeyword.value = ''

  // 移除点击外部关闭事件
  document.removeEventListener('click', handleOutsideClick)
}

// 处理点击外部元素
function handleOutsideClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const input = inputRef.value
  const dropdown = dropdownRef.value

  if (
    input
    && dropdown
    && !input.contains(target)
    && !dropdown.contains(target)
  ) {
    closeDropdown()
  }
}

// 滚动到选中项
function scrollToSelected() {
  if (!scrollContainerRef.value || !innerValue.value)
    return

  let selectedIndex = -1

  if (props.multiple && Array.isArray(innerValue.value) && innerValue.value.length) {
    // 找到第一个选中项
    selectedIndex = flattenOptions.value.findIndex(item =>
      (innerValue.value as Array<string | number>).includes(item.option.value),
    )
  }
  else if (!props.multiple && innerValue.value !== undefined) {
    // 单选模式
    selectedIndex = flattenOptions.value.findIndex(item =>
      item.option.value === innerValue.value,
    )
  }

  if (selectedIndex > -1) {
    const { itemHeight } = props.virtualScroll
    scrollContainerRef.value.scrollTop = selectedIndex * itemHeight
  }
}

// 检查选项是否被选中
function isOptionSelected(value: string | number): boolean {
  if (props.multiple && Array.isArray(innerValue.value)) {
    return (innerValue.value as Array<string | number>).includes(value)
  }
  return innerValue.value === value
}

// 生命周期钩子
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', measureContainer)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', measureContainer)
    document.removeEventListener('click', handleOutsideClick)

    if (closeTimer !== null) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  }
})

// 组件外部重置方法
defineExpose({
  focus: () => {
    const input = inputRef.value?.querySelector('input')
    if (input)
      input.focus()
  },
  blur: () => {
    const input = inputRef.value?.querySelector('input')
    if (input)
      input.blur()
    closeDropdown()
  },
})
</script>

<template>
  <div
    class="ui-virtual-select"
    :class="[
      `ui-virtual-select--${size}`,
      {
        'is-disabled': disabled,
        'is-error': error,
        'is-clearable': clearable,
        'is-multiple': multiple,
        'is-filterable': filterable,
        'is-focus': dropdownVisible,
      },
    ]"
    :style="{ width }"
  >
    <!-- 选择器输入框 -->
    <div
      ref="inputRef"
      class="ui-virtual-select__wrapper"
      @click="handleInputClick"
    >
      <!-- 多选标签显示 -->
      <div v-if="multiple" class="ui-virtual-select__tags">
        <template v-if="collapseTags && displayTags.length">
          <!-- 折叠标签模式 -->
          <div
            v-for="(tag) in displayTags.slice(0, maxCollapseTagCount)"
            :key="tag.value"
            class="ui-virtual-select__tag" :class="[
              `ui-virtual-select__tag--${tagType}`,
            ]"
          >
            <span class="ui-virtual-select__tag-text">{{ tag.label }}</span>
            <span
              class="ui-virtual-select__tag-close"
              @click.stop="handleRemoveTag(tag.value)"
            >
              <ui-icon icon="carbon:close" />
            </span>
          </div>

          <!-- 额外标签数量显示 -->
          <div
            v-if="displayTags.length > maxCollapseTagCount"
            class="ui-virtual-select__tag ui-virtual-select__tag--count"
          >
            <span>+{{ displayTags.length - maxCollapseTagCount }}</span>
          </div>
        </template>

        <template v-else>
          <!-- 常规标签显示 -->
          <div
            v-for="tag in displayTags"
            :key="tag.value"
            class="ui-virtual-select__tag" :class="[
              `ui-virtual-select__tag--${tagType}`,
            ]"
          >
            <span class="ui-virtual-select__tag-text">{{ tag.label }}</span>
            <span
              class="ui-virtual-select__tag-close"
              @click.stop="handleRemoveTag(tag.value)"
            >
              <ui-icon icon="carbon:close" />
            </span>
          </div>
        </template>
      </div>

      <!-- 输入框 -->
      <input
        class="ui-virtual-select__input"
        :class="{ 'ui-virtual-select__input--hidden': !filterable || (!dropdownVisible && displayLabel) }"
        :placeholder="multiple && innerValue && Array.isArray(innerValue) && innerValue.length ? '' : placeholder"
        :disabled="disabled"
        :value="filterKeyword"
        @input="handleInput"
        @focus="handleFocus"
        @keydown.esc="closeDropdown"
        @keydown.enter="openDropdown"
      >

      <!-- 单选显示值 -->
      <div
        v-if="!multiple && displayLabel && !filterKeyword"
        class="ui-virtual-select__label"
      >
        {{ displayLabel }}
      </div>

      <!-- 清除按钮 -->
      <span
        v-if="clearable && !disabled && ((multiple && Array.isArray(innerValue) && innerValue.length) || (!multiple && innerValue !== undefined))"
        class="ui-virtual-select__clear"
        @click.stop="handleClear"
      >
        <ui-icon icon="carbon:close" />
      </span>

      <!-- 箭头图标 -->
      <span class="ui-virtual-select__arrow" :class="{ 'is-open': dropdownVisible }">
        <ui-icon icon="carbon:chevron-down" />
      </span>
    </div>

    <!-- 下拉菜单 -->
    <div
      v-show="dropdownVisible"
      ref="dropdownRef"
      class="ui-virtual-select__dropdown"
    >
      <!-- 下拉列表容器 -->
      <div
        ref="scrollContainerRef"
        class="ui-virtual-select__dropdown-wrapper"
        :style="{ maxHeight }"
        @scroll="handleScroll"
      >
        <!-- 虚拟滚动列表 -->
        <div
          class="ui-virtual-select__options"
          :style="{ height: totalHeight }"
        >
          <!-- 只在启用虚拟滚动时使用虚拟滚动逻辑 -->
          <template v-if="shouldEnableVirtualScroll">
            <!-- 选项列表 - 仅渲染可见区域 -->
            <div
              v-for="(item, index) in visibleOptions"
              :key="`${item.option.value}-${index}`"
              :style="getItemStyle(index)"
              class="ui-virtual-select__option"
              :class="[
                `ui-virtual-select__option--level-${item.level}`,
                {
                  'is-disabled': item.option.disabled,
                  'is-selected': isOptionSelected(item.option.value),
                  'is-group': item.option.children && item.option.children.length,
                },
              ]"
              @click="handleSelect(item.option)"
            >
              <!-- 自定义选项插槽 -->
              <slot
                v-if="$slots.default"
                :item="item.option"
                :level="item.level"
              />

              <!-- 默认选项渲染 -->
              <template v-else>
                <!-- 选项内容 -->
                <span class="ui-virtual-select__option-label">
                  {{ item.option.label }}
                </span>

                <!-- 选中标记 -->
                <span
                  v-if="isOptionSelected(item.option.value)"
                  class="ui-virtual-select__option-check"
                >
                  <ui-icon icon="carbon:checkmark" />
                </span>
              </template>
            </div>
          </template>

          <!-- 未启用虚拟滚动时，只渲染有限数量选项 -->
          <template v-else>
            <div
              v-for="(item, index) in visibleOptions"
              :key="`${item.option.value}-${index}`"
              class="ui-virtual-select__option"
              :class="[
                `ui-virtual-select__option--level-${item.level}`,
                {
                  'is-disabled': item.option.disabled,
                  'is-selected': isOptionSelected(item.option.value),
                  'is-group': item.option.children && item.option.children.length,
                },
              ]"
              @click="handleSelect(item.option)"
            >
              <!-- 复用相同的选项内容 -->
              <slot
                v-if="$slots.default"
                :item="item.option"
                :level="item.level"
              />
              <template v-else>
                <span class="ui-virtual-select__option-label">
                  {{ item.option.label }}
                </span>
                <span
                  v-if="isOptionSelected(item.option.value)"
                  class="ui-virtual-select__option-check"
                >
                  <ui-icon icon="carbon:checkmark" />
                </span>
              </template>
            </div>

            <!-- 显示加载更多提示（如果有更多选项） -->
            <div
              v-if="flattenOptions.length > visibleOptions.length"
              class="ui-virtual-select__more-options"
            >
              更多选项可通过搜索查找...
            </div>
          </template>
        </div>

        <!-- 空状态 -->
        <div
          v-if="flattenOptions.length === 0"
          class="ui-virtual-select__empty"
        >
          <slot name="empty">
            <span>无匹配数据</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-virtual-select {
  position: relative;
  width: 100%;
  display: inline-block;
  font-size: 14px;

  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    background-color: var(--ui-color-white, #ffffff);
    border: 1px solid var(--ui-border-color, #dcdfe6);
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0 30px 0 12px;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--ui-border-color-hover, #c0c4cc);
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 100%;
    padding: 6px 0;
  }

  &__tag {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    background-color: var(--ui-color-primary-light, #ecf5ff);
    color: var(--ui-color-primary, #409eff);
    border-radius: 4px;
    white-space: nowrap;

    &--count {
      background-color: var(--ui-color-info-light, #f4f4f5);
      color: var(--ui-color-info, #909399);
    }

    &--primary {
      background-color: var(--ui-color-primary-light, #ecf5ff);
      color: var(--ui-color-primary, #409eff);
    }

    &--success {
      background-color: var(--ui-color-success-light, #f0f9eb);
      color: var(--ui-color-success, #67c23a);
    }

    &--warning {
      background-color: var(--ui-color-warning-light, #fdf6ec);
      color: var(--ui-color-warning, #e6a23c);
    }

    &--danger {
      background-color: var(--ui-color-danger-light, #fef0f0);
      color: var(--ui-color-danger, #f56c6c);
    }

    &-text {
      margin-right: 4px;
    }

    &-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        color: var(--ui-color-text-primary, #303133);
      }
    }
  }

  &__input {
    flex: 1;
    height: 40px;
    line-height: 40px;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    color: var(--ui-color-text-primary, #303133);

    &--hidden {
      width: 0;
      height: 0;
      position: absolute;
      opacity: 0;
    }

    &::placeholder {
      color: var(--ui-color-text-placeholder, #c0c4cc);
    }
  }

  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--ui-color-text-primary, #303133);
  }

  &__clear {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ui-color-text-placeholder, #c0c4cc);
    font-size: 14px;
    cursor: pointer;
    display: none;

    &:hover {
      color: var(--ui-color-text-secondary, #909399);
    }
  }

  &__arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ui-color-text-placeholder, #c0c4cc);
    font-size: 14px;
    transition: transform 0.2s;

    &.is-open {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 4px;
    background-color: var(--ui-color-white, #ffffff);
    border: 1px solid var(--ui-border-color-light, #e4e7ed);
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1000;
    box-sizing: border-box;

    &-wrapper {
      overflow-y: auto;
    }
  }

  &__options {
    position: relative;
    width: 100%;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: var(--ui-color-primary-light-9, #f5f7fa);
    }

    &.is-selected {
      color: var(--ui-color-primary, #409eff);
      font-weight: bold;
    }

    &.is-disabled {
      color: var(--ui-color-text-placeholder, #c0c4cc);
      cursor: not-allowed;
      background-color: var(--ui-color-white, #ffffff);
    }

    &.is-group {
      font-weight: bold;
      color: var(--ui-color-text-secondary, #909399);
      cursor: default;

      &:hover {
        background-color: transparent;
      }
    }

    &--level-0 {
      padding-left: 12px;
    }

    &--level-1 {
      padding-left: 24px;
    }

    &--level-2 {
      padding-left: 36px;
    }

    &--level-3 {
      padding-left: 48px;
    }

    &-label {
      flex: 1;
    }

    &-check {
      color: var(--ui-color-primary, #409eff);
    }
  }

  &__empty {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ui-color-text-secondary, #909399);
  }

  &__more-options {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ui-color-text-secondary, #909399);
  }

  // 尺寸变体
  &--small {
    font-size: 12px;

    .ui-virtual-select__wrapper {
      min-height: 32px;
      line-height: 32px;
    }

    .ui-virtual-select__input {
      height: 32px;
      line-height: 32px;
    }

    .ui-virtual-select__tag {
      height: 20px;
      font-size: 12px;
    }
  }

  &--large {
    font-size: 16px;

    .ui-virtual-select__wrapper {
      min-height: 48px;
      line-height: 48px;
    }

    .ui-virtual-select__input {
      height: 48px;
      line-height: 48px;
    }

    .ui-virtual-select__tag {
      height: 28px;
      font-size: 14px;
    }
  }

  // 状态
  &.is-disabled {
    .ui-virtual-select__wrapper {
      background-color: var(--ui-disabled-bg, #f5f7fa);
      border-color: var(--ui-disabled-border, #e4e7ed);
      color: var(--ui-disabled-text, #c0c4cc);
      cursor: not-allowed;
    }
  }

  &.is-error {
    .ui-virtual-select__wrapper {
      border-color: var(--ui-color-danger, #f56c6c);
    }
  }

  &.is-focus {
    .ui-virtual-select__wrapper {
      border-color: var(--ui-color-primary, #409eff);
    }
  }

  &.is-clearable:hover {
    .ui-virtual-select__clear {
      display: inline-block;
    }
  }
}
</style>
