<script setup lang="ts" name="UiInputTimePicker">
import { onClickOutside } from '@vueuse/core'
/**
 * 时间选择器组件
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */
import { computed, nextTick, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: string | string[]
  /**
   * 占位文本
   */
  placeholder?: string | string[]
  /**
   * 是否为范围选择
   */
  isRange?: boolean
  /**
   * 范围分隔符
   */
  rangeSeparator?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 时间格式
   */
  format?: string
  /**
   * 是否使用12小时制
   */
  use12Hours?: boolean
  /**
   * 小时步长
   */
  hourStep?: number
  /**
   * 分钟步长
   */
  minuteStep?: number
  /**
   * 秒步长
   */
  secondStep?: number
  /**
   * 是否显示秒选择器
   */
  showSeconds?: boolean
  /**
   * 弹出方向
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 允许的最早时间
   */
  minTime?: string
  /**
   * 允许的最晚时间
   */
  maxTime?: string
  /**
   * 自定义头部内容
   */
  headerText?: string
  /**
   * 自定义底部内容渲染
   */
  customFooter?: boolean
  /**
   * 面板宽度
   */
  popoverWidth?: number | string
}>(), {
  modelValue: undefined,
  placeholder: '请选择时间',
  isRange: false,
  rangeSeparator: '至',
  disabled: false,
  clearable: false,
  size: 'default',
  format: 'HH:mm:ss',
  use12Hours: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showSeconds: true,
  placement: 'bottom',
  readonly: false,
  minTime: '',
  maxTime: '',
  headerText: '',
  customFooter: false,
  popoverWidth: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
  (e: 'change', value: string | string[]): void
  (e: 'blur' | 'focus' | 'clear'): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'confirm', value: string | string[]): void
}>()

// 内部状态
const containerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// 面板宽度计算
const panelWidth = computed(() => {
  if (props.popoverWidth) {
    return typeof props.popoverWidth === 'number' ? `${props.popoverWidth}px` : props.popoverWidth
  }
  return containerRef.value ? `${containerRef.value.offsetWidth}px` : '220px'
})

// 当前选中的时间值
const selectedTime = ref<string | string[]>(props.isRange ? ['', ''] : '')

// 时间组件状态
const hours = ref<number[]>(props.isRange ? [0, 0] : [0])
const minutes = ref<number[]>(props.isRange ? [0, 0] : [0])
const seconds = ref<number[]>(props.isRange ? [0, 0] : [0])
const ampm = ref<('am' | 'pm')[]>(props.isRange ? ['am', 'am'] : ['am'])
const currentEditingIndex = ref(0) // 当前编辑的时间段索引(0:起始时间,1:结束时间)

// 计算时间选择器的类名
const timePickerClass = computed(() => [
  'ui-time-picker',
  `ui-time-picker--${props.size}`,
  {
    'ui-time-picker--disabled': props.disabled,
    'ui-time-picker--active': visible.value,
    'ui-time-picker--clearable': props.clearable,
    'ui-time-picker--range': props.isRange,
  },
])

// 计算时间面板的类名
const panelClass = computed(() => [
  'ui-time-picker-panel',
  {
    'ui-time-picker-panel--visible': visible.value,
    'ui-time-picker-panel--top': props.placement === 'top',
    'ui-time-picker-panel--bottom': props.placement === 'bottom',
    'ui-time-picker-panel--12h': props.use12Hours,
    'ui-time-picker-panel--seconds': props.showSeconds,
  },
])

// 生成小时选项
const hourOptions = computed(() => {
  const options: number[] = []
  const limit = props.use12Hours ? 12 : 24
  const startHour = props.use12Hours ? 1 : 0

  for (let i = startHour; i < limit; i += props.hourStep) {
    options.push(i)
  }

  return options
})

// 生成分钟选项
const minuteOptions = computed(() => {
  const options: number[] = []
  for (let i = 0; i < 60; i += props.minuteStep) {
    options.push(i)
  }
  return options
})

// 生成秒选项
const secondOptions = computed(() => {
  const options: number[] = []
  for (let i = 0; i < 60; i += props.secondStep) {
    options.push(i)
  }
  return options
})

// 显示值格式化
const displayValue = computed(() => {
  if (!selectedTime.value) {
    return ''
  }

  if (props.isRange) {
    const rangeValue = selectedTime.value as string[]
    if (!rangeValue[0] && !rangeValue[1]) {
      return ''
    }
    return `${rangeValue[0] || ''} ${props.rangeSeparator} ${rangeValue[1] || ''}`
  }

  return selectedTime.value as string
})

// 获取占位符文本
const getPlaceholder = computed(() => {
  if (props.isRange) {
    const placeholders = Array.isArray(props.placeholder)
      ? props.placeholder
      : [props.placeholder, props.placeholder]
    return `${placeholders[0]} ${props.rangeSeparator} ${placeholders[1]}`
  }
  return props.placeholder
})

// 更新时间值
function updateTimeValue() {
  const formatTime = (h: number, m: number, s: number, ap: 'am' | 'pm'): string => {
    // 12小时制转换为24小时制
    let hour = h
    if (props.use12Hours) {
      if (ap === 'pm' && h < 12) {
        hour = h + 12
      }
      else if (ap === 'am' && h === 12) {
        hour = 0
      }
    }

    // 格式化
    const paddedHour = hour.toString().padStart(2, '0')
    const paddedMinute = m.toString().padStart(2, '0')

    if (props.showSeconds) {
      const paddedSecond = s.toString().padStart(2, '0')
      return `${paddedHour}:${paddedMinute}:${paddedSecond}`
    }

    return `${paddedHour}:${paddedMinute}`
  }

  if (props.isRange) {
    const start = formatTime(hours.value[0], minutes.value[0], seconds.value[0], ampm.value[0])
    const end = formatTime(hours.value[1], minutes.value[1], seconds.value[1], ampm.value[1])
    selectedTime.value = [start, end]
    emit('update:modelValue', [start, end])
    emit('change', [start, end])
  }
  else {
    const time = formatTime(hours.value[0], minutes.value[0], seconds.value[0], ampm.value[0])
    selectedTime.value = time
    emit('update:modelValue', time)
    emit('change', time)
  }
}

// 解析时间字符串为组件内部状态
function parseTimeString(timeStr: string, index = 0) {
  if (!timeStr)
    return

  const timePattern = props.showSeconds
    ? /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/
    : /^(\d{1,2}):(\d{1,2})$/

  const match = timeStr.match(timePattern)
  if (!match)
    return

  let hour = Number.parseInt(match[1], 10)
  const minute = Number.parseInt(match[2], 10)
  const second = props.showSeconds ? Number.parseInt(match[3], 10) : 0

  // 处理12小时制
  let meridiem: 'am' | 'pm' = 'am'
  if (props.use12Hours) {
    if (hour >= 12) {
      meridiem = 'pm'
      if (hour > 12) {
        hour -= 12
      }
    }
    else if (hour === 0) {
      hour = 12
    }
  }

  // 更新状态
  hours.value[index] = hour
  minutes.value[index] = minute
  seconds.value[index] = second
  ampm.value[index] = meridiem
}

// 打开面板
function openPanel() {
  if (props.disabled || props.readonly)
    return

  visible.value = true
  emit('visibleChange', true)
  emit('focus')

  // 初始化显示的时间
  if (props.isRange) {
    const rangeValue = (Array.isArray(props.modelValue) ? props.modelValue : ['', '']) as string[]
    selectedTime.value = [...rangeValue]
    parseTimeString(rangeValue[0], 0)
    parseTimeString(rangeValue[1], 1)
    currentEditingIndex.value = 0 // 默认编辑起始时间
  }
  else {
    const timeValue = props.modelValue as string || ''
    selectedTime.value = timeValue
    parseTimeString(timeValue, 0)
  }

  // 滚动到当前选中的选项
  nextTick(() => {
    scrollToSelected()
  })
}

// 关闭面板
function closePanel() {
  visible.value = false
  emit('visibleChange', false)
  emit('blur')
}

// 切换面板显示
function togglePanel() {
  if (visible.value) {
    closePanel()
  }
  else {
    openPanel()
  }
}

// 清空选择
function clearSelection(e: Event) {
  e.stopPropagation()
  if (props.isRange) {
    selectedTime.value = ['', '']
    emit('update:modelValue', ['', ''])
  }
  else {
    selectedTime.value = ''
    emit('update:modelValue', '')
  }
  emit('clear')
}

// 切换当前编辑的时间段(仅用于范围选择)
function switchTimeRange(index: number) {
  if (props.isRange) {
    currentEditingIndex.value = index
  }
}

// 设置小时
function setHour(hour: number) {
  if (hours.value[currentEditingIndex.value] !== hour) {
    hours.value[currentEditingIndex.value] = hour
    updateTimeValue()

    // 不要在这里关闭面板
    // 只有点击确认按钮时才关闭面板
  }
}

// 设置分钟
function setMinute(minute: number) {
  if (minutes.value[currentEditingIndex.value] !== minute) {
    minutes.value[currentEditingIndex.value] = minute
    updateTimeValue()

    // 不要在这里关闭面板
    // 只有点击确认按钮时才关闭面板
  }
}

// 设置秒
function setSecond(second: number) {
  if (seconds.value[currentEditingIndex.value] !== second) {
    seconds.value[currentEditingIndex.value] = second
    updateTimeValue()

    // 不要在这里关闭面板
    // 只有点击确认按钮时才关闭面板
  }
}

// 滚动到选中选项
function scrollToSelected() {
  // TODO: 实现滚动逻辑
}

// 点击外部关闭面板
onClickOutside(containerRef, () => {
  if (visible.value) {
    confirmSelection()
  }
})

// 监听props.modelValue变化
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      selectedTime.value = val
      if (props.isRange && Array.isArray(val)) {
        parseTimeString(val[0], 0)
        parseTimeString(val[1], 1)
      }
      else if (!props.isRange && typeof val === 'string') {
        parseTimeString(val, 0)
      }
    }
    else {
      selectedTime.value = props.isRange ? ['', ''] : ''
    }
  },
  { immediate: true },
)

// 确认选择
function confirmSelection() {
  closePanel()
  emit('confirm', selectedTime.value)
}

// 处理输入框点击事件
function _handleInputClick() {
  if (props.disabled || props.readonly)
    return

  openPanel()
}

// 暴露方法
defineExpose({
  focus: openPanel,
  blur: closePanel,
})
</script>

<template>
  <div
    ref="containerRef"
    :class="timePickerClass"
    @click="togglePanel"
  >
    <!-- 输入区域 -->
    <div class="ui-time-picker-input">
      <!-- 显示框 -->
      <div class="ui-time-picker-value">
        <span v-if="displayValue">{{ displayValue }}</span>
        <span v-else class="ui-time-picker-placeholder">{{ getPlaceholder }}</span>
      </div>

      <!-- 清除按钮 -->
      <span
        v-if="clearable && displayValue && !disabled"
        class="ui-time-picker-clear"
        @click.stop="clearSelection($event)"
      >
        <ui-icon icon="carbon:close" size="small" />
      </span>

      <!-- 时钟图标 -->
      <span class="ui-time-picker-icon">
        <ui-icon icon="carbon:time" size="small" />
      </span>
    </div>

    <!-- 时间选择面板 -->
    <div
      v-show="visible"
      ref="panelRef"
      :class="panelClass"
      :style="{ width: panelWidth }"
    >
      <!-- 面板头部 -->
      <div v-if="headerText" class="ui-time-picker-panel-header">
        {{ headerText }}
      </div>

      <!-- 范围选择标签 -->
      <div v-if="isRange" class="ui-time-picker-range-tabs">
        <div
          class="ui-time-picker-range-tab" :class="[
            { 'ui-time-picker-range-tab--active': currentEditingIndex === 0 },
          ]"
          @click="switchTimeRange(0)"
        >
          开始时间
        </div>
        <div
          class="ui-time-picker-range-tab" :class="[
            { 'ui-time-picker-range-tab--active': currentEditingIndex === 1 },
          ]"
          @click="switchTimeRange(1)"
        >
          结束时间
        </div>
      </div>

      <!-- 时间选择区域 -->
      <div class="ui-time-picker-panel-content">
        <!-- 小时列 -->
        <div class="ui-time-picker-spinner">
          <ul class="ui-time-picker-spinner-list">
            <li
              v-for="hour in hourOptions"
              :key="hour"
              class="ui-time-picker-spinner-item" :class="[
                { 'ui-time-picker-spinner-item--active': hours[currentEditingIndex] === hour },
              ]"
              @click="setHour(hour)"
            >
              {{ hour.toString().padStart(2, '0') }}
            </li>
          </ul>
        </div>

        <!-- 分隔符 -->
        <div class="ui-time-picker-spinner-separator">
          :
        </div>

        <!-- 分钟列 -->
        <div class="ui-time-picker-spinner">
          <ul class="ui-time-picker-spinner-list">
            <li
              v-for="minute in minuteOptions"
              :key="minute"
              class="ui-time-picker-spinner-item" :class="[
                { 'ui-time-picker-spinner-item--active': minutes[currentEditingIndex] === minute },
              ]"
              @click="setMinute(minute)"
            >
              {{ minute.toString().padStart(2, '0') }}
            </li>
          </ul>
        </div>

        <!-- 秒选择区域 -->
        <template v-if="showSeconds">
          <!-- 分隔符 -->
          <div class="ui-time-picker-spinner-separator">
            :
          </div>

          <!-- 秒列 -->
          <div class="ui-time-picker-spinner">
            <ul class="ui-time-picker-spinner-list">
              <li
                v-for="second in secondOptions"
                :key="second"
                class="ui-time-picker-spinner-item" :class="[
                  { 'ui-time-picker-spinner-item--active': seconds[currentEditingIndex] === second },
                ]"
                @click="setSecond(second)"
              >
                {{ second.toString().padStart(2, '0') }}
              </li>
            </ul>
          </div>
        </template>

        <!-- 12小时制切换 -->
        <template v-if="use12Hours">
          <div class="ui-time-picker-spinner-separator" />
          <div class="ui-time-picker-spinner ui-time-picker-spinner--ampm">
            <ul class="ui-time-picker-spinner-list">
              <li
                class="ui-time-picker-spinner-item" :class="[
                  { 'ui-time-picker-spinner-item--active': ampm[currentEditingIndex] === 'am' },
                ]"
                @click="ampm[currentEditingIndex] = 'am'; updateTimeValue()"
              >
                AM
              </li>
              <li
                class="ui-time-picker-spinner-item" :class="[
                  { 'ui-time-picker-spinner-item--active': ampm[currentEditingIndex] === 'pm' },
                ]"
                @click="ampm[currentEditingIndex] = 'pm'; updateTimeValue()"
              >
                PM
              </li>
            </ul>
          </div>
        </template>
      </div>

      <!-- 面板底部 -->
      <div v-if="!customFooter" class="ui-time-picker-panel-footer">
        <button class="ui-time-picker-panel-btn ui-time-picker-panel-btn--confirm" @click="confirmSelection">
          确定
        </button>
      </div>

      <!-- 自定义底部内容 -->
      <div v-else class="ui-time-picker-panel-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-time-picker {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: var(--ui-font-size);
  color: var(--ui-color-text, #374151);
}

.ui-time-picker-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ui-input-height, 36px);
  padding: 0 12px;
  background-color: var(--ui-color-bg, #ffffff);
  border: 1px solid var(--ui-color-border, #d1d5db);
  border-radius: var(--ui-border-radius, 4px);
  transition: all 0.3s;
  cursor: pointer;
}

.ui-time-picker--disabled .ui-time-picker-input {
  background-color: var(--ui-color-disabled-bg, #f3f4f6);
  color: var(--ui-color-disabled-text, #9ca3af);
  cursor: not-allowed;
}

.ui-time-picker--active .ui-time-picker-input {
  border-color: var(--ui-color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.ui-time-picker-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-time-picker-placeholder {
  color: var(--ui-color-placeholder, #9ca3af);
}

.ui-time-picker-clear {
  margin-left: 8px;
  color: var(--ui-color-text-secondary, #6b7280);
  cursor: pointer;
}

.ui-time-picker-clear:hover {
  color: var(--ui-color-text, #374151);
}

.ui-time-picker-icon {
  margin-left: 8px;
  color: var(--ui-color-text-secondary, #6b7280);
}

/* 面板样式 */
.ui-time-picker-panel {
  position: absolute;
  z-index: 1000;
  width: 100%;
  background-color: var(--ui-color-bg, #ffffff);
  border: 1px solid var(--ui-color-border, #d1d5db);
  border-radius: var(--ui-border-radius, 4px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.ui-time-picker-panel--top {
  bottom: calc(100% + 4px);
}

.ui-time-picker-panel--bottom {
  top: calc(100% + 4px);
}

.ui-time-picker-panel-header {
  padding: 8px 12px;
  border-bottom: 1px solid var(--ui-color-border-light, #e5e7eb);
  color: var(--ui-color-text, #374151);
  font-weight: 500;
}

.ui-time-picker-range-tabs {
  display: flex;
  border-bottom: 1px solid var(--ui-color-border-light, #e5e7eb);
}

.ui-time-picker-range-tab {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--ui-color-text-secondary, #6b7280);
  font-size: 14px;
}

.ui-time-picker-range-tab--active {
  color: var(--ui-color-primary, #3b82f6);
  border-bottom: 2px solid var(--ui-color-primary, #3b82f6);
}

.ui-time-picker-panel-content {
  display: flex;
  padding: 8px 0;
  height: 216px;
}

.ui-time-picker-spinner {
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.ui-time-picker-spinner--ampm {
  flex: 0.8;
}

.ui-time-picker-spinner-separator {
  width: 22px;
  font-size: 14px;
  color: var(--ui-color-text, #374151);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-time-picker-spinner-list {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
}

.ui-time-picker-spinner-list::-webkit-scrollbar {
  width: 0;
}

.ui-time-picker-spinner-item {
  height: 32px;
  line-height: 32px;
  padding: 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--ui-color-text, #374151);
}

.ui-time-picker-spinner-item:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-time-picker-spinner-item--active {
  color: var(--ui-color-primary, #3b82f6);
  font-weight: 500;
}

.ui-time-picker-panel-footer {
  padding: 8px 12px;
  text-align: right;
  border-top: 1px solid var(--ui-color-border-light, #e5e7eb);
}

.ui-time-picker-panel-btn {
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: var(--ui-border-radius, 4px);
  transition: all 0.3s;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}

.ui-time-picker-panel-btn--confirm {
  color: var(--ui-color-primary, #3b82f6);
}

.ui-time-picker-panel-btn--confirm:hover {
  background-color: var(--ui-color-primary-bg, #eff6ff);
}

/* 尺寸变体 */
.ui-time-picker--small .ui-time-picker-input {
  height: var(--ui-input-height-small, 28px);
  font-size: var(--ui-font-size-small, 12px);
}

.ui-time-picker--large .ui-time-picker-input {
  height: var(--ui-input-height-large, 44px);
  font-size: var(--ui-font-size-large, 16px);
}
</style>
