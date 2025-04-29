<script setup lang="ts" name="UiDatePicker">
/**
 * 日期选择器组件
 * 创建日期: 2023-09-25
 * 作者: aiftt
 * 更新日期: 2023-09-25 - 初始版本
 * 更新日期: 2024-01-08 - 重构到date/picker.vue结构
 */

import { addMonths, format, getMonth, getYear, isValid, parseISO, setMonth, setYear, subMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 当前选中的日期值（ISO格式字符串）
   */
  modelValue?: string
  /**
   * 日期格式，默认为yyyy-MM-dd
   */
  format?: string
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
   * 清除按钮是否可见
   */
  clearable?: boolean
  /**
   * 日期选择器尺寸
   */
  size?: 'small' | 'default' | 'large'
}>(), {
  format: 'yyyy-MM-dd',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: true,
  size: 'default',
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

// 状态
const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const popoverRef = ref<HTMLDivElement | null>(null)
const currentDate = ref(new Date())
const currentView = ref<'date' | 'month' | 'year'>('date')
const inputValue = ref('')

// 计算属性
const currentMonthDays = computed(() => {
  const year = getYear(currentDate.value)
  const month = getMonth(currentDate.value)

  // 获取月份的第一天是星期几
  const firstDay = new Date(year, month, 1).getDay()

  // 获取月份的总天数
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // 获取上个月的部分天数
  const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1
  const prevMonthDays = daysFromPrevMonth > 0
    ? Array.from({ length: daysFromPrevMonth }, (_, i) => {
        const day = new Date(year, month, 0).getDate() - daysFromPrevMonth + i + 1
        return {
          day,
          month: month - 1,
          year,
          isCurrentMonth: false,
          isToday: false,
        }
      })
    : []

  // 获取当前月的天数
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const date = new Date(year, month, day)
    const today = new Date()
    const isToday
      = date.getDate() === today.getDate()
        && date.getMonth() === today.getMonth()
        && date.getFullYear() === today.getFullYear()

    return {
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday,
    }
  })

  // 计算需要显示的下个月的天数
  const totalDaysToShow = 42 // 7行 x 6列
  const daysFromNextMonth = totalDaysToShow - prevMonthDays.length - currentMonthDays.length
  const nextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => {
    return {
      day: i + 1,
      month: month + 1,
      year,
      isCurrentMonth: false,
      isToday: false,
    }
  })

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
})

const formattedCurrentMonth = computed(() => {
  return format(currentDate.value, 'yyyy年MM月', { locale: zhCN })
})

const selectedDate = computed({
  get() {
    return props.modelValue ? parseISO(props.modelValue) : null
  },
  set(value: Date | null) {
    if (value) {
      const formatted = format(value, 'yyyy-MM-dd')
      emit('update:modelValue', formatted)
      emit('change', formatted)
      inputValue.value = format(value, props.format)
      isOpen.value = false
    }
  },
})

const monthOptions = computed(() => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: `${i + 1}月`,
  }))
})

const yearOptions = computed(() => {
  const currentYear = getYear(new Date())
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push({
      value: i,
      label: `${i}年`,
    })
  }
  return years
})

// 方法
function handleInputClick() {
  if (!props.disabled && !props.readonly) {
    isOpen.value = !isOpen.value
  }
}

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as Node
  if (
    isOpen.value
    && inputRef.value
    && popoverRef.value
    && !inputRef.value.contains(target)
    && !popoverRef.value.contains(target)
  ) {
    isOpen.value = false
  }
}

function prevMonth() {
  currentDate.value = subMonths(currentDate.value, 1)
}

function nextMonth() {
  currentDate.value = addMonths(currentDate.value, 1)
}

function selectDay(day: { day: number, month: number, year: number }) {
  const date = new Date(day.year, day.month, day.day)
  selectedDate.value = date
}

function selectMonth(month: number) {
  currentDate.value = setMonth(currentDate.value, month)
  currentView.value = 'date'
}

function selectYear(year: number) {
  currentDate.value = setYear(currentDate.value, year)
  currentView.value = 'month'
}

function showMonthView() {
  currentView.value = 'month'
}

function showYearView() {
  currentView.value = 'year'
}

function handleInput(e: Event) {
  const input = e.target as HTMLInputElement
  inputValue.value = input.value

  // 尝试解析输入的日期
  try {
    const parsed = parseISO(input.value)
    if (isValid(parsed)) {
      selectedDate.value = parsed
    }
  }
  catch {
    // 无效日期，忽略
  }
}

function clearDate() {
  selectedDate.value = null
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
}

// 监听props
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    try {
      const date = parseISO(newValue)
      if (isValid(date)) {
        inputValue.value = format(date, props.format)
        currentDate.value = date
      }
      else {
        inputValue.value = ''
      }
    }
    catch {
      inputValue.value = ''
    }
  }
  else {
    inputValue.value = ''
  }
}, { immediate: true })

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="ui-date-picker" :class="`ui-date-picker--${size}`">
    <div ref="inputRef" class="ui-date-picker__input-wrapper">
      <input
        type="text"
        class="ui-date-picker__input"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :value="inputValue"
        @click="handleInputClick"
        @input="handleInput"
      >
      <div class="ui-date-picker__suffix">
        <ui-icon
          v-if="clearable && inputValue && !disabled && !readonly"
          icon="carbon:close"
          class="ui-date-picker__clear-icon"
          @click.stop="clearDate"
        />
        <ui-icon icon="carbon:calendar" class="ui-date-picker__calendar-icon" />
      </div>
    </div>

    <div v-if="isOpen" ref="popoverRef" class="ui-date-picker__popover">
      <div class="ui-date-picker__header">
        <div v-if="currentView === 'date'">
          <button class="ui-date-picker__nav-btn" @click.stop="prevMonth">
            <ui-icon icon="carbon:chevron-left" />
          </button>
          <span class="ui-date-picker__current-month" @click.stop="showMonthView">
            {{ formattedCurrentMonth }}
          </span>
          <button class="ui-date-picker__nav-btn" @click.stop="nextMonth">
            <ui-icon icon="carbon:chevron-right" />
          </button>
        </div>
        <div v-else-if="currentView === 'month'">
          <span
            class="ui-date-picker__current-year"
            @click.stop="showYearView"
          >
            {{ getYear(currentDate) }}年
          </span>
        </div>
        <div v-else>
          <span class="ui-date-picker__year-range">
            {{ yearOptions[0].value }}-{{ yearOptions[yearOptions.length - 1].value }}
          </span>
        </div>
      </div>

      <div class="ui-date-picker__body">
        <!-- 日期视图 -->
        <div v-if="currentView === 'date'" class="ui-date-picker__date-view">
          <div class="ui-date-picker__weekdays">
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
            <span>日</span>
          </div>
          <div class="ui-date-picker__days-grid">
            <div
              v-for="(day, index) in currentMonthDays"
              :key="index"
              class="ui-date-picker__day"
              :class="{
                'ui-date-picker__day--other-month': !day.isCurrentMonth,
                'ui-date-picker__day--today': day.isToday,
                'ui-date-picker__day--selected': selectedDate
                  && day.day === selectedDate.getDate()
                  && day.month === selectedDate.getMonth()
                  && day.year === selectedDate.getFullYear(),
              }"
              @click.stop="selectDay(day)"
            >
              {{ day.day }}
            </div>
          </div>
        </div>

        <!-- 月份视图 -->
        <div v-else-if="currentView === 'month'" class="ui-date-picker__month-view">
          <div
            v-for="month in monthOptions"
            :key="month.value"
            class="ui-date-picker__month"
            :class="{
              'ui-date-picker__month--selected': getMonth(currentDate) === month.value,
            }"
            @click.stop="selectMonth(month.value)"
          >
            {{ month.label }}
          </div>
        </div>

        <!-- 年份视图 -->
        <div v-else class="ui-date-picker__year-view">
          <div
            v-for="year in yearOptions"
            :key="year.value"
            class="ui-date-picker__year"
            :class="{
              'ui-date-picker__year--selected': getYear(currentDate) === year.value,
            }"
            @click.stop="selectYear(year.value)"
          >
            {{ year.label }}
          </div>
        </div>
      </div>

      <div class="ui-date-picker__footer">
        <button
          class="ui-date-picker__today-btn"
          @click.stop="selectDay({ day: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear() })"
        >
          今天
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-date-picker {
  position: relative;
  width: 100%;
  font-size: var(--ui-font-size, 14px);
}

.ui-date-picker__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ui-date-picker__input {
  width: 100%;
  padding: var(--ui-date-picker-input-padding-y, 8px) var(--ui-date-picker-input-padding-x, 36px 8px 12px);
  border: 1px solid var(--ui-border-color, #d1d5db);
  border-radius: var(--ui-date-picker-radius, var(--ui-border-radius, 4px));
  outline: none;
  transition: all 0.3s;
}

.ui-date-picker__input:focus {
  border-color: var(--ui-color-primary, #10b981);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.ui-date-picker__input:disabled {
  background-color: var(--ui-disabled-bg, #f3f4f6);
  cursor: not-allowed;
}

.ui-date-picker__suffix {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
}

.ui-date-picker__clear-icon {
  cursor: pointer;
  margin-right: 4px;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-date-picker__calendar-icon {
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-date-picker__popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: var(--ui-date-picker-z-index, 1000);
  width: var(--ui-date-picker-width, 280px);
  background-color: var(--ui-color-bg, #ffffff);
  border-radius: var(--ui-date-picker-radius, var(--ui-border-radius, 4px));
  box-shadow: var(--ui-date-picker-shadow, 0 2px 12px rgba(0, 0, 0, 0.15));
  border: 1px solid var(--ui-border-color, #d1d5db);
}

.ui-date-picker__header {
  padding: var(--ui-date-picker-header-padding, 12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
}

.ui-date-picker__nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--ui-color-text, #374151);
  border-radius: var(--ui-border-radius, 4px);
}

.ui-date-picker__nav-btn:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-date-picker__current-month,
.ui-date-picker__current-year,
.ui-date-picker__year-range {
  font-weight: 500;
  cursor: pointer;
}

.ui-date-picker__body {
  padding: var(--ui-date-picker-body-padding, 8px);
}

.ui-date-picker__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 500;
  color: var(--ui-color-text-secondary, #6b7280);
  margin-bottom: 8px;
}

.ui-date-picker__days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.ui-date-picker__day {
  height: var(--ui-date-picker-day-size, 30px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--ui-border-radius, 4px);
}

.ui-date-picker__day:hover:not(.ui-date-picker__day--other-month) {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-date-picker__day--other-month {
  color: var(--ui-color-text-light, #9ca3af);
  cursor: default;
}

.ui-date-picker__day--today {
  font-weight: 500;
  color: var(--ui-color-primary, #10b981);
}

.ui-date-picker__day--selected {
  background-color: var(--ui-color-primary, #10b981);
  color: white;
}

.ui-date-picker__month-view,
.ui-date-picker__year-view {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 4px;
}

.ui-date-picker__month,
.ui-date-picker__year {
  height: var(--ui-date-picker-item-height, 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--ui-border-radius, 4px);
}

.ui-date-picker__month:hover,
.ui-date-picker__year:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

.ui-date-picker__month--selected,
.ui-date-picker__year--selected {
  background-color: var(--ui-color-primary, #10b981);
  color: white;
}

.ui-date-picker__footer {
  padding: var(--ui-date-picker-footer-padding, 8px);
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
  display: flex;
  justify-content: flex-end;
}

.ui-date-picker__today-btn {
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ui-color-primary, #10b981);
  border-radius: var(--ui-border-radius, 4px);
}

.ui-date-picker__today-btn:hover {
  background-color: var(--ui-color-bg-hover, #f3f4f6);
}

/* 尺寸变体 */
.ui-date-picker--small .ui-date-picker__input {
  padding: var(--ui-date-picker-input-padding-small, 6px 32px 6px 8px);
  font-size: var(--ui-font-size-sm, 12px);
}

.ui-date-picker--large .ui-date-picker__input {
  padding: var(--ui-date-picker-input-padding-large, 10px 40px 10px 16px);
  font-size: var(--ui-font-size, 16px);
}
</style>
