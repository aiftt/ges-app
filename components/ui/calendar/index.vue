<script setup lang="ts" name="UiCalendar">
/**
 * 日历组件
 * 创建日期: 2024-07-31
 * 作者: aiftt
 */

import { addMonths, format, getDay, getDaysInMonth, isAfter, isBefore, isSameDay, isToday, parseISO, subMonths } from 'date-fns'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

// 定义Props
interface CalendarProps {
  /**
   * 当前选中的日期值
   */
  modelValue?: Date | string | null
  /**
   * 禁用的日期
   */
  disabledDate?: (date: Date) => boolean
  /**
   * 是否显示今天按钮
   */
  showToday?: boolean
  /**
   * 最小可选日期
   */
  minDate?: Date | string
  /**
   * 最大可选日期
   */
  maxDate?: Date | string
  /**
   * 初始聚焦的年份
   */
  year?: number
  /**
   * 初始聚焦的月份，从0开始
   */
  month?: number
  /**
   * 日历类型: month-月视图，week-周视图
   */
  mode?: 'month' | 'week'
  /**
   * 星期信息
   */
  weekdays?: string[]
  /**
   * 月份信息
   */
  months?: string[]
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 自定义每个单元格的类名
   */
  cellClass?: (date: Date) => string | string[] | Record<string, boolean>
  /**
   * 事件列表，格式为 { date: string, type?: string, content?: string }[]
   */
  events?: Array<{ date: string, type?: string, content?: string }>
}

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: null,
  disabledDate: () => false,
  showToday: true,
  mode: 'month',
  weekdays: () => ['日', '一', '二', '三', '四', '五', '六'],
  months: () => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  readonly: false,
  disabled: false,
  events: () => [],
})

// 定义事件
const emit = defineEmits<{
  /**
   * 更新值
   */
  (e: 'update:modelValue', value: Date | null): void
  /**
   * 日期改变
   */
  (e: 'change', value: Date): void
  /**
   * 面板视图变化
   */
  (e: 'panelChange', year: number, month: number): void
  /**
   * 日期单元格点击
   */
  (e: 'select', date: Date): void
}>()

// 当前视图年月
const currentYear = ref(props.year || new Date().getFullYear())
const currentMonth = ref(props.month !== undefined ? props.month : new Date().getMonth())

// 当前选中日期
const selectedDate = ref<Date | null>(
  props.modelValue
    ? typeof props.modelValue === 'string'
      ? parseISO(props.modelValue)
      : props.modelValue
    : null,
)

// 监听值变化
watch(() => props.modelValue, (newVal) => {
  selectedDate.value = newVal
    ? typeof newVal === 'string'
      ? parseISO(newVal)
      : newVal
    : null
}, { immediate: true })

// 监听年月变化
watch(() => [props.year, props.month], ([year, month]) => {
  if (year !== undefined)
    currentYear.value = year
  if (month !== undefined)
    currentMonth.value = month
}, { immediate: true })

// 计算日历显示的所有天
const days = computed(() => {
  const result = []

  // 当前月份的第一天
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)

  // 上个月需要显示的天数
  const prevDays = getDay(firstDayOfMonth)

  // 填充上个月的日期
  for (let i = prevDays - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value, -i)
    result.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
      isDisabled: isDateDisabled(date),
    })
  }

  // 填充当前月的日期
  const daysInMonth = getDaysInMonth(firstDayOfMonth)
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    result.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
      isDisabled: isDateDisabled(date),
    })
  }

  // 填充下个月的日期
  const nextDays = 42 - prevDays - daysInMonth
  for (let i = 1; i <= nextDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i)
    result.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
      isDisabled: isDateDisabled(date),
    })
  }

  return result
})

// 判断日期是否禁用
function isDateDisabled(date: Date): boolean {
  // 检查自定义禁用函数
  if (props.disabledDate(date))
    return true

  // 检查最小日期
  if (props.minDate) {
    const minDate = typeof props.minDate === 'string' ? parseISO(props.minDate) : props.minDate
    if (isBefore(date, minDate))
      return true
  }

  // 检查最大日期
  if (props.maxDate) {
    const maxDate = typeof props.maxDate === 'string' ? parseISO(props.maxDate) : props.maxDate
    if (isAfter(date, maxDate))
      return true
  }

  return false
}

// 处理日期点击
function handleDateClick(info: { date: Date, isDisabled: boolean }) {
  if (props.disabled || props.readonly || info.isDisabled)
    return

  selectedDate.value = info.date
  emit('update:modelValue', info.date)
  emit('change', info.date)
  emit('select', info.date)
}

// 跳转到今天
function goToToday() {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth()

  // 如果不是只读或禁用状态，也选中今天日期
  if (!props.readonly && !props.disabled && !isDateDisabled(today)) {
    selectedDate.value = today
    emit('update:modelValue', today)
    emit('change', today)
  }

  emit('panelChange', currentYear.value, currentMonth.value)
}

// 上个月
function handlePrevMonth() {
  const date = subMonths(new Date(currentYear.value, currentMonth.value, 1), 1)
  currentYear.value = date.getFullYear()
  currentMonth.value = date.getMonth()
  emit('panelChange', currentYear.value, currentMonth.value)
}

// 下个月
function handleNextMonth() {
  const date = addMonths(new Date(currentYear.value, currentMonth.value, 1), 1)
  currentYear.value = date.getFullYear()
  currentMonth.value = date.getMonth()
  emit('panelChange', currentYear.value, currentMonth.value)
}

// 查找日期的事件
function findDayEvents(date: Date) {
  if (!props.events || !props.events.length)
    return []

  const dateStr = format(date, 'yyyy-MM-dd')
  return props.events.filter(event => event.date === dateStr)
}

// 计算事件类型的颜色
const eventTypeColors = computed(() => {
  const colors: Record<string, string> = {}
  if (props.events) {
    props.events.forEach((event) => {
      if (event.type && !colors[event.type]) {
        // 使用CSS变量而不是硬编码的颜色值
        switch (event.type) {
          case 'primary':
            colors[event.type] = 'var(--ui-color-primary, #10b981)'
            break
          case 'success':
            colors[event.type] = 'var(--ui-color-success, #10b981)'
            break
          case 'warning':
            colors[event.type] = 'var(--ui-color-warning, #f59e0b)'
            break
          case 'danger':
            colors[event.type] = 'var(--ui-color-danger, #ef4444)'
            break
          case 'info':
            colors[event.type] = 'var(--ui-color-info, #3b82f6)'
            break
          default:
            colors[event.type] = 'var(--ui-color-primary, #10b981)'
        }
      }
    })
  }
  return colors
})

// 获取事件类型列表
const eventTypes = computed(() => {
  const types = new Set<string>()
  if (props.events) {
    props.events.forEach((event) => {
      if (event.type)
        types.add(event.type)
    })
  }
  return Array.from(types)
})

// 当前显示的日期范围
const displayDateRange = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

  // 如果有最小日期限制
  let minDateDisplay = props.minDate
    ? (typeof props.minDate === 'string' ? parseISO(props.minDate) : props.minDate)
    : undefined

  // 如果有最大日期限制
  let maxDateDisplay = props.maxDate
    ? (typeof props.maxDate === 'string' ? parseISO(props.maxDate) : props.maxDate)
    : undefined

  // 如果选择了日期，更新显示范围
  if (selectedDate.value) {
    // 如果选择的日期在当前月份之前，更新最小日期显示
    if (selectedDate.value < firstDay) {
      minDateDisplay = selectedDate.value
    }
    // 如果选择的日期在当前月份之后，更新最大日期显示
    else if (selectedDate.value > lastDay) {
      maxDateDisplay = selectedDate.value
    }
  }

  return {
    start: minDateDisplay || firstDay,
    end: maxDateDisplay || lastDay,
  }
})

// 显示事件内容的tooltip
const showTooltip = ref(false)
const tooltipContent = ref('')
const tooltipPosition = reactive({ top: 0, left: 0 })

// 显示事件tooltip
function showEventTooltip(event: { content?: string }, e: MouseEvent) {
  if (!event.content)
    return

  tooltipContent.value = event.content
  tooltipPosition.top = e.clientY + 10
  tooltipPosition.left = e.clientX + 10
  showTooltip.value = true
}

// 隐藏事件tooltip
function hideEventTooltip() {
  showTooltip.value = false
}

// 在组件卸载时确保tooltip隐藏
onBeforeUnmount(() => {
  showTooltip.value = false
})
</script>

<template>
  <div class="ui-calendar">
    <!-- 日历头部 -->
    <div class="ui-calendar-header">
      <div class="ui-calendar-header-left">
        <button
          class="ui-calendar-btn ui-calendar-prev-btn"
          @click="handlePrevMonth"
        >
          <ui-icon icon="carbon:chevron-left" />
        </button>
        <span class="ui-calendar-current-month">
          {{ months[currentMonth] }} {{ currentYear }}
        </span>
        <button
          class="ui-calendar-btn ui-calendar-next-btn"
          @click="handleNextMonth"
        >
          <ui-icon icon="carbon:chevron-right" />
        </button>
      </div>
      <div class="ui-calendar-header-right">
        <button
          v-if="showToday"
          class="ui-calendar-btn ui-calendar-today-btn"
          @click="goToToday"
        >
          今天
        </button>
      </div>
    </div>

    <!-- 日期范围显示 -->
    <div class="ui-calendar-date-range">
      {{ format(displayDateRange.start, 'yyyy年MM月dd日') }} 至 {{ format(displayDateRange.end, 'yyyy年MM月dd日') }}
    </div>

    <!-- 星期头部 -->
    <div class="ui-calendar-weekdays">
      <div
        v-for="(day, index) in weekdays"
        :key="index"
        class="ui-calendar-weekday"
        :class="{ 'ui-calendar-weekend': index === 0 || index === 6 }"
      >
        {{ day }}
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="ui-calendar-body">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="ui-calendar-day"
        :class="{
          'ui-calendar-day-other-month': !day.isCurrentMonth,
          'ui-calendar-day-today': day.isToday,
          'ui-calendar-day-selected': day.isSelected,
          'ui-calendar-day-disabled': day.isDisabled,
        }"
        @click="handleDateClick(day)"
      >
        <div class="ui-calendar-day-number">
          {{ day.date.getDate() }}
        </div>
        <!-- 事件标记 -->
        <div class="ui-calendar-day-events">
          <div
            v-for="(event, eventIndex) in findDayEvents(day.date)"
            :key="eventIndex"
            class="ui-calendar-day-event"
            :style="{ backgroundColor: event.type ? eventTypeColors[event.type] : eventTypeColors.primary }"
            @mouseenter="showEventTooltip(event, $event)"
            @mouseleave="hideEventTooltip"
          />
        </div>
      </div>
    </div>

    <!-- 事件类型说明 -->
    <div v-if="eventTypes.length > 0" class="ui-calendar-event-types">
      <div
        v-for="type in eventTypes"
        :key="type"
        class="ui-calendar-event-type"
      >
        <span
          class="ui-calendar-event-type-dot"
          :style="{ backgroundColor: eventTypeColors[type] }"
        />
        <span class="ui-calendar-event-type-text">{{ type }}</span>
      </div>
    </div>

    <!-- 事件tooltip -->
    <div
      v-if="showTooltip"
      class="ui-calendar-tooltip"
      :style="{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }"
    >
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style scoped>
.ui-calendar {
  width: 100%;
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: var(--ui-border-radius, 0.375rem);
  background-color: var(--ui-color-bg, #fff);
  font-size: 14px;
}

.ui-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-calendar-header-left {
  display: flex;
  align-items: center;
}

.ui-calendar-current-month {
  margin: 0 16px;
  font-weight: 500;
}

.ui-calendar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--ui-border-radius, 0.375rem);
  background-color: transparent;
  cursor: pointer;
  color: var(--ui-color-text, #374151);
}

.ui-calendar-btn:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-calendar-today-btn {
  padding: 0 12px;
  width: auto;
  font-size: 14px;
}

.ui-calendar-date-range {
  padding: 8px 16px;
  font-size: 12px;
  color: var(--ui-color-text-secondary, #6b7280);
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 0;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
  background-color: var(--ui-color-bg-light, #f9fafb);
}

.ui-calendar-weekday {
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-calendar-weekend {
  color: var(--ui-color-danger, #ef4444);
}

.ui-calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px;
}

.ui-calendar-day {
  position: relative;
  height: 40px;
  padding: 4px;
  border-radius: var(--ui-border-radius, 0.375rem);
  cursor: pointer;
  transition: background-color 0.2s;
}

.ui-calendar-day:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-calendar-day-number {
  text-align: center;
  font-size: 14px;
}

.ui-calendar-day-other-month {
  color: var(--ui-color-text-tertiary, #9ca3af);
}

.ui-calendar-day-today {
  font-weight: bold;
  color: var(--ui-color-primary, #10b981);
}

.ui-calendar-day-selected {
  background-color: var(--ui-color-primary-light, rgba(16, 185, 129, 0.1));
  color: var(--ui-color-primary, #10b981);
  font-weight: bold;
}

.ui-calendar-day-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-calendar-day-events {
  display: flex;
  justify-content: center;
  margin-top: 2px;
  gap: 2px;
}

.ui-calendar-day-event {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.ui-calendar-event-types {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px 16px;
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-calendar-event-type {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.ui-calendar-event-type-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}

.ui-calendar-tooltip {
  position: fixed;
  z-index: 1000;
  background-color: var(--ui-color-bg-dark, #1f2937);
  color: white;
  padding: 6px 10px;
  border-radius: var(--ui-border-radius, 0.375rem);
  font-size: 12px;
  max-width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

/* 暗黑模式适配 */
.dark .ui-calendar {
  border-color: var(--ui-border-color-dark, #4b5563);
  background-color: var(--ui-color-bg-dark, #1f2937);
  color: var(--ui-color-text-dark, #e5e7eb);
}

.dark .ui-calendar-header,
.dark .ui-calendar-date-range,
.dark .ui-calendar-weekdays,
.dark .ui-calendar-event-types {
  border-color: var(--ui-border-color-dark, #4b5563);
}

.dark .ui-calendar-weekdays {
  background-color: var(--ui-color-bg-dark-secondary, #111827);
}

.dark .ui-calendar-btn {
  color: var(--ui-color-text-dark, #e5e7eb);
}

.dark .ui-calendar-btn:hover {
  background-color: var(--ui-color-bg-hover-dark, #374151);
}

.dark .ui-calendar-weekday {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

.dark .ui-calendar-day:hover {
  background-color: var(--ui-color-bg-hover-dark, #374151);
}

.dark .ui-calendar-day-other-month {
  color: var(--ui-color-text-tertiary-dark, #6b7280);
}

.dark .ui-calendar-day-selected {
  background-color: var(--ui-color-primary-dark, rgba(16, 185, 129, 0.2));
}

.dark .ui-calendar-tooltip {
  background-color: var(--ui-color-bg-light, #f9fafb);
  color: var(--ui-color-text, #374151);
}
</style>
