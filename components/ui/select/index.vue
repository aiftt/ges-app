<script setup lang="ts" name="UiSelect">
/**
 * Select 选择器组件
 * 创建日期: 2024-05-26
 * 作者: aiftt
 */

import { computed, nextTick, onUnmounted, ref, watch } from 'vue'

// 定义选项类型
export interface ISelectOption {
  value: string | number
  label: string
  disabled?: boolean
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
}>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
  multiple: false,
  size: 'default',
  error: false,
  maxHeight: '250px',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void
  (e: 'change', value: string | number | Array<string | number>): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

// 下拉菜单是否可见
const visible = ref(false)
// 选择器容器引用
const selectRef = ref<HTMLElement>()
// 搜索输入框引用
const inputRef = ref<HTMLElement>()
// 下拉菜单引用
const dropdownRef = ref<HTMLElement>()

// 选中的选项标签
const selectedLabel = computed(() => {
  if (props.multiple) {
    const selectedOptions = props.options.filter(option =>
      Array.isArray(props.modelValue) && props.modelValue.includes(option.value),
    )
    return selectedOptions.map(option => option.label).join(', ')
  }
  else {
    const option = props.options.find(option => option.value === props.modelValue)
    return option ? option.label : ''
  }
})

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

// 处理选项点击
function handleOptionClick(option: ISelectOption) {
  if (option.disabled)
    return

  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = values.indexOf(option.value)

    if (index > -1) {
      values.splice(index, 1)
    }
    else {
      values.push(option.value)
    }

    emit('update:modelValue', values)
    emit('change', values)
  }
  else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    hideDropdown()
  }
}

// 处理清除按钮点击
function handleClear(event: Event) {
  event.stopPropagation()
  emit('update:modelValue', props.multiple ? [] : '')
  emit('change', props.multiple ? [] : '')
}

// 显示下拉菜单
function showDropdown() {
  if (props.disabled)
    return
  visible.value = true
  emit('focus')

  // 在下一个事件循环中设置焦点
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }

    // 监听点击外部关闭下拉菜单
    document.addEventListener('click', handleOutsideClick)
  })
}

// 隐藏下拉菜单
function hideDropdown() {
  visible.value = false
  emit('blur')
  document.removeEventListener('click', handleOutsideClick)
}

// 处理点击外部关闭下拉菜单
function handleOutsideClick(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
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

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

// 监听modelValue变化
watch(() => props.modelValue, () => {
  nextTick(() => {
    // 如果需要，可以在这里处理modelValue变化后的逻辑
  })
})
</script>

<template>
  <div
    ref="selectRef"
    :class="selectClass"
    @click="showDropdown"
  >
    <!-- 选择器内容 -->
    <div class="ui-select-input">
      <span v-if="hasValue" class="ui-select-value">{{ selectedLabel }}</span>
      <span v-else class="ui-select-placeholder">{{ placeholder }}</span>

      <!-- 清除按钮 -->
      <ui-icon
        v-if="clearable && hasValue && !disabled"
        icon="carbon:close"
        class="ui-select-clear-icon"
        @click="handleClear"
      />

      <!-- 箭头图标 -->
      <ui-icon
        icon="carbon:chevron-down"
        :class="arrowIconClass"
      />
    </div>

    <!-- 下拉菜单 -->
    <div
      v-show="visible"
      ref="dropdownRef"
      class="ui-select-dropdown"
    >
      <!-- 没有选项时的空状态 -->
      <div v-if="options.length === 0" class="ui-select-empty">
        暂无数据
      </div>

      <!-- 选项列表 -->
      <ul v-else class="ui-select-options">
        <li
          v-for="option in options"
          :key="option.value"
          class="ui-select-option"
          :class="{
            'ui-select-option--selected': isSelected(option),
            'ui-select-option--disabled': option.disabled,
          }"
          @click="handleOptionClick(option)"
        >
          <!-- 多选模式下的勾选图标 -->
          <ui-icon
            v-if="multiple && isSelected(option)"
            icon="carbon:checkmark"
            class="ui-select-option-icon"
          />

          <!-- 选项文本 -->
          <span class="ui-select-option-label">{{ option.label }}</span>
        </li>
      </ul>
    </div>
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
}

.ui-select-options {
  max-height: var(--ui-select-dropdown-max-height, 250px);
  overflow-y: auto;
  margin: 0;
  padding: 4px 0;
  list-style: none;
}

.ui-select-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
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
  margin-right: 6px;
  font-size: 14px;
}

.ui-select-option-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-select-empty {
  padding: 8px 12px;
  text-align: center;
  color: var(--ui-color-text-lighter);
}
</style>
