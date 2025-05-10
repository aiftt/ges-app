<script setup lang="ts" name="UiSegmented">
/**
 * 分段控制器组件
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-01
 */

interface ISegmentOption {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
}

const props = withDefaults(defineProps<{
  /**
   * 当前选中值
   */
  modelValue?: string | number
  /**
   * 选项配置
   */
  options?: Array<string | number | ISegmentOption>
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 尺寸大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否使用圆角样式
   */
  rounded?: boolean
  /**
   * 是否使用块级元素，占满父容器宽度
   */
  block?: boolean
  /**
   * 是否允许取消选中，返回空值
   */
  allowEmpty?: boolean
  /**
   * 加载状态
   */
  loading?: boolean
}>(), {
  options: () => [],
  disabled: false,
  size: 'default',
  rounded: false,
  block: false,
  allowEmpty: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
  (e: 'change', value: string | number | undefined): void
}>()

// 格式化选项
const normalizedOptions = computed(() => {
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: String(option),
        value: option,
        disabled: false,
      } as ISegmentOption
    }
    return option as ISegmentOption
  })
})

// 选择
function handleSelect(option: ISegmentOption) {
  if (props.disabled || option.disabled || props.loading) {
    return
  }

  let newValue: string | number | undefined = option.value

  // 如果允许取消选中，且当前值与选中值相同，则取消选中
  if (props.allowEmpty && props.modelValue === option.value) {
    newValue = undefined
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 计算容器类名
const segmentedClass = computed(() => {
  const classes = ['ui-segmented']

  classes.push(`ui-segmented--${props.size}`)

  if (props.rounded) {
    classes.push('ui-segmented--rounded')
  }

  if (props.block) {
    classes.push('ui-segmented--block')
  }

  if (props.disabled) {
    classes.push('ui-segmented--disabled')
  }

  if (props.loading) {
    classes.push('ui-segmented--loading')
  }

  return classes.join(' ')
})

// 计算选项类名
function getOptionClass(option: ISegmentOption) {
  const classes = ['ui-segmented-item']

  if (option.value === props.modelValue) {
    classes.push('ui-segmented-item--active')
  }

  if (option.disabled || props.disabled) {
    classes.push('ui-segmented-item--disabled')
  }

  return classes.join(' ')
}

// 处理键盘导航
function handleKeyDown(event: KeyboardEvent, _index: number) {
  if (props.disabled || props.loading)
    return

  // 获取可选的选项（非禁用的）
  const availableOptions = normalizedOptions.value.filter(opt => !opt.disabled)
  const currentIndex = availableOptions.findIndex(opt => opt.value === props.modelValue)

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      if (currentIndex < availableOptions.length - 1) {
        const nextOption = availableOptions[currentIndex + 1]
        handleSelect(nextOption)
      }
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      if (currentIndex > 0) {
        const prevOption = availableOptions[currentIndex - 1]
        handleSelect(prevOption)
      }
      break
    case 'Home':
      event.preventDefault()
      if (availableOptions.length > 0) {
        handleSelect(availableOptions[0])
      }
      break
    case 'End':
      event.preventDefault()
      if (availableOptions.length > 0) {
        handleSelect(availableOptions[availableOptions.length - 1])
      }
      break
  }
}
</script>

<template>
  <div
    :class="segmentedClass"
    role="tablist"
    aria-orientation="horizontal"
  >
    <div v-if="loading" class="ui-segmented-loading">
      <ui-icon icon="carbon:circle-dash" class="ui-segmented-loading-icon animate-spin" />
    </div>
    <div
      v-for="(option, index) in normalizedOptions"
      :key="option.value"
      :class="getOptionClass(option)"
      role="tab"
      :aria-selected="option.value === modelValue"
      :aria-disabled="option.disabled || disabled"
      :tabindex="option.disabled || disabled ? -1 : 0"
      @click="handleSelect(option)"
      @keydown="handleKeyDown($event, index)"
    >
      <div class="ui-segmented-item-content">
        <ui-icon v-if="option.icon" :icon="option.icon" class="ui-segmented-item-icon" />
        <span class="ui-segmented-item-label">{{ option.label }}</span>
      </div>
      <div v-if="option.value === modelValue" class="ui-segmented-thumb" />
    </div>
  </div>
</template>

<style scoped>
.ui-segmented {
  --ui-segmented-bg-color: #f3f4f6;
  --ui-segmented-text-color: #6b7280;
  --ui-segmented-active-text-color: #111827;
  --ui-segmented-thumb-color: #ffffff;
  --ui-segmented-item-gap: 2px;
  --ui-segmented-border-color: #e5e7eb;
  --ui-segmented-disabled-opacity: 0.5;
  --ui-segmented-transition: all 0.2s ease-in-out;
  --ui-segmented-radius: 4px;
  --ui-segmented-height: 32px;
  --ui-segmented-font-size: 14px;
  --ui-segmented-item-padding: 0 12px;

  position: relative;
  display: inline-flex;
  background-color: var(--ui-segmented-bg-color);
  border-radius: var(--ui-segmented-radius);
  padding: var(--ui-segmented-item-gap);
  user-select: none;
  border: 1px solid var(--ui-segmented-border-color);
}

.ui-segmented--small {
  --ui-segmented-height: 24px;
  --ui-segmented-font-size: 12px;
  --ui-segmented-item-padding: 0 8px;
}

.ui-segmented--large {
  --ui-segmented-height: 40px;
  --ui-segmented-font-size: 16px;
  --ui-segmented-item-padding: 0 16px;
}

.ui-segmented--rounded {
  --ui-segmented-radius: 9999px;
}

.ui-segmented--block {
  display: flex;
  width: 100%;
}

.ui-segmented--disabled {
  opacity: var(--ui-segmented-disabled-opacity);
  cursor: not-allowed;
}

.ui-segmented-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: var(--ui-segmented-height);
  min-width: 0;
  font-size: var(--ui-segmented-font-size);
  color: var(--ui-segmented-text-color);
  padding: var(--ui-segmented-item-padding);
  margin: 0;
  border-radius: calc(var(--ui-segmented-radius) - var(--ui-segmented-item-gap));
  transition: var(--ui-segmented-transition);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
}

.ui-segmented-item--active {
  color: var(--ui-segmented-active-text-color);
}

.ui-segmented-item--disabled {
  cursor: not-allowed;
  opacity: var(--ui-segmented-disabled-opacity);
}

.ui-segmented-item-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.ui-segmented-item-icon {
  margin-right: 6px;
}

.ui-segmented-thumb {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--ui-segmented-thumb-color);
  border-radius: calc(var(--ui-segmented-radius) - var(--ui-segmented-item-gap));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: var(--ui-segmented-transition);
}

.ui-segmented-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 3;
  border-radius: var(--ui-segmented-radius);
}

.ui-segmented-loading-icon {
  font-size: calc(var(--ui-segmented-height) * 0.5);
  color: var(--ui-segmented-text-color);
}

/* 暗黑模式适配 */
:root.dark .ui-segmented {
  --ui-segmented-bg-color: #374151;
  --ui-segmented-text-color: #9ca3af;
  --ui-segmented-active-text-color: #f9fafb;
  --ui-segmented-thumb-color: #1f2937;
  --ui-segmented-border-color: #4b5563;
}
</style>
