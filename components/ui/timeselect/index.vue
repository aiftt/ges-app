<script setup lang="ts" name="UiTimeSelect">
/**
 * 时间选择器组件
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 */

// Props定义
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string
  /**
   * 禁用状态
   */
  disabled?: boolean
  /**
   * 只读状态
   */
  readonly?: boolean
  /**
   * 可清空
   */
  clearable?: boolean
  /**
   * 输入框尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否使用箭头进行小时和分钟的选择
   */
  arrowControl?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 开始时间，使用 HH:mm 格式
   */
  start?: string
  /**
   * 结束时间，使用 HH:mm 格式
   */
  end?: string
  /**
   * 时间间隔，以分钟为单位
   */
  step?: number
  /**
   * 小时格式，12或24
   */
  format?: 12 | 24
  /**
   * 自定义前缀图标
   */
  prefixIcon?: string
  /**
   * 自定义后缀图标
   */
  suffixIcon?: string
  /**
   * 弹出框的宽度
   */
  popperWidth?: number | string
  /**
   * 弹出框类名
   */
  popperClass?: string
  /**
   * 弹出位置
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
  /**
   * 自定义验证规则
   */
  validateEvent?: boolean
  /**
   * 最大值
   */
  max?: string
  /**
   * 最小值
   */
  min?: string
  /**
   * 自定义类名
   */
  className?: string
}>(), {
  disabled: false,
  readonly: false,
  clearable: true,
  size: 'medium',
  placeholder: '请选择时间',
  start: '00:00',
  end: '23:59',
  step: 30,
  format: 24,
  prefixIcon: 'carbon:time',
  suffixIcon: 'carbon:chevron-down',
  placement: 'bottom-start',
  validateEvent: true,
})

// 事件定义
const emit = defineEmits<{
  /**
   * 更新值
   */
  (e: 'update:modelValue', value: string): void
  /**
   * 值变化
   */
  (e: 'change', value: string): void
  /**
   * 聚焦
   */
  (e: 'focus', event: FocusEvent): void
  /**
   * 失焦
   */
  (e: 'blur', event: FocusEvent): void
  /**
   * 点击清除按钮
   */
  (e: 'clear'): void
  /**
   * 可见性变化
   */
  (e: 'visibleChange', visible: boolean): void
}>()

// 内部状态
const popoverVisible = ref(false)
const inputRef = ref<HTMLElement | null>(null)
const selectedTime = ref(props.modelValue || '')
const timeOptions = ref<string[]>([])
const isHovered = ref(false)
const isFocused = ref(false)

// 处理输入框聚焦
function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emit('focus', event)
}

// 处理输入框失焦
function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emit('blur', event)
}

// 处理输入框鼠标进入
function handleMouseEnter() {
  isHovered.value = true
}

// 处理输入框鼠标离开
function handleMouseLeave() {
  isHovered.value = false
}

// 生成时间选项
function generateTimeOptions() {
  const options: string[] = []

  // 解析起始时间和结束时间
  const [startHour, startMinute] = props.start.split(':').map(v => Number.parseInt(v, 10))
  const [endHour, endMinute] = props.end.split(':').map(v => Number.parseInt(v, 10))

  // 计算开始和结束时间的总分钟数
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute

  // 根据步长生成时间选项
  for (let minutes = startTotalMinutes; minutes <= endTotalMinutes; minutes += props.step) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60

    let formattedHour = hour
    let period = ''

    // 处理12小时制
    if (props.format === 12) {
      period = hour >= 12 ? ' PM' : ' AM'
      formattedHour = hour % 12 || 12
    }

    // 格式化时间
    const timeStr = `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${period}`
    options.push(timeStr)
  }

  timeOptions.value = options
}

// 处理选择时间
function selectTime(time: string) {
  selectedTime.value = time
  emit('update:modelValue', time)
  emit('change', time)
  closePopover()
}

// 清除选中时间
function clearSelection() {
  selectedTime.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

// 切换弹出框显示状态
function togglePopover() {
  if (props.disabled || props.readonly)
    return
  popoverVisible.value = !popoverVisible.value
  emit('visibleChange', popoverVisible.value)
}

// 关闭弹出框
function closePopover() {
  popoverVisible.value = false
  emit('visibleChange', false)
}

// 监听model-value变化
watch(() => props.modelValue, (val) => {
  selectedTime.value = val || ''
})

// 计算是否显示清除按钮
const showClearButton = computed(() =>
  props.clearable
  && !props.disabled
  && !props.readonly
  && selectedTime.value
  && (isHovered.value || isFocused.value),
)

// 计算输入框样式
const inputClass = computed(() => [
  'ui-time-select-input',
  `ui-time-select-input-${props.size}`,
  {
    'ui-time-select-input-disabled': props.disabled,
    'ui-time-select-input-readonly': props.readonly,
    'is-focused': isFocused.value,
  },
  props.className,
])

// 计算弹出框宽度样式
const popperStyle = computed(() => ({
  width: props.popperWidth ? `${props.popperWidth}px` : '',
}))

// 初始化组件
onMounted(() => {
  generateTimeOptions()
})
</script>

<template>
  <div class="ui-time-select">
    <ui-trigger
      v-model:visible="popoverVisible"
      :disabled="disabled || readonly"
      trigger="click"
      :placement="placement"
      :offset="[0, 10]"
    >
      <!-- 输入框触发器 -->
      <div
        ref="inputRef"
        :class="inputClass"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="togglePopover"
      >
        <!-- 前缀图标 -->
        <ui-icon v-if="prefixIcon" :icon="prefixIcon" class="ui-time-select-prefix-icon" />

        <!-- 显示选中的时间或占位符 -->
        <span class="ui-time-select-value" :class="{ 'ui-time-select-placeholder': !selectedTime }">
          {{ selectedTime || placeholder }}
        </span>

        <!-- 清除按钮 -->
        <ui-icon
          v-if="showClearButton"
          icon="carbon:close"
          class="ui-time-select-clear-icon"
          @click.stop="clearSelection"
        />

        <!-- 后缀图标 -->
        <ui-icon v-else-if="suffixIcon" :icon="suffixIcon" class="ui-time-select-suffix-icon" />
      </div>

      <!-- 弹出框 -->
      <template #content>
        <div
          class="ui-time-select-dropdown"
          :class="popperClass"
          :style="popperStyle"
        >
          <ui-scrollbar class="ui-time-select-dropdown-scrollbar">
            <div class="ui-time-select-dropdown-list">
              <div
                v-for="(time, index) in timeOptions"
                :key="index"
                class="ui-time-select-dropdown-item"
                :class="{ 'ui-time-select-dropdown-item-active': time === selectedTime }"
                @click="selectTime(time)"
              >
                {{ time }}
              </div>

              <!-- 无选项时的空状态 -->
              <div v-if="timeOptions.length === 0" class="ui-time-select-dropdown-empty">
                无可选时间
              </div>
            </div>
          </ui-scrollbar>
        </div>
      </template>
    </ui-trigger>
  </div>
</template>

<style lang="scss" scoped>
.ui-time-select {
  position: relative;
  display: inline-flex;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;

  &-input {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--ui-color-border, #d1d5db);
    background-color: var(--ui-color-bg-light, #f9fafb);
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
    overflow: hidden;
    padding: 0 12px;

    &:hover {
      border-color: var(--ui-color-primary-light, #60a5fa);
    }

    &.is-focused {
      border-color: var(--ui-color-primary, #3b82f6);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    &-medium {
      height: 36px;
    }

    &-small {
      height: 28px;
      font-size: 12px;
    }

    &-large {
      height: 44px;
      font-size: 16px;
    }

    &-disabled {
      background-color: var(--ui-color-bg-disabled, #f3f4f6);
      border-color: var(--ui-color-border, #d1d5db);
      color: var(--ui-color-text-disabled, #9ca3af);
      cursor: not-allowed;

      &:hover {
        border-color: var(--ui-color-border, #d1d5db);
      }
    }

    &-readonly {
      cursor: default;
    }
  }

  &-prefix-icon {
    margin-right: 8px;
    color: var(--ui-color-text-secondary, #6b7280);
  }

  &-suffix-icon {
    margin-left: auto;
    color: var(--ui-color-text-secondary, #6b7280);
  }

  &-clear-icon {
    margin-left: auto;
    color: var(--ui-color-text-secondary, #6b7280);
    cursor: pointer;

    &:hover {
      color: var(--ui-color-text, #374151);
    }
  }

  &-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-placeholder {
    color: var(--ui-color-text-placeholder, #9ca3af);
  }

  &-dropdown {
    width: 180px;
    max-height: 300px;
    background-color: var(--ui-color-bg-light, #ffffff);
    border: 1px solid var(--ui-color-border-light, #e5e7eb);
    border-radius: 4px;
    box-shadow:
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);

    &-scrollbar {
      max-height: 300px;
    }

    &-list {
      padding: 4px 0;
    }

    &-item {
      padding: 5px 12px;
      line-height: 1.5;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--ui-color-bg-hover, #f3f4f6);
      }

      &-active {
        color: var(--ui-color-primary, #3b82f6);
        font-weight: 500;
        background-color: var(--ui-color-primary-bg, rgba(59, 130, 246, 0.1));
      }
    }

    &-empty {
      padding: 12px;
      text-align: center;
      color: var(--ui-color-text-secondary, #6b7280);
    }
  }
}
</style>
