<script setup lang="ts" name="UiDateTimePicker">
/**
 * 日期时间选择器组件
 * 创建日期: 2024-08-30
 * 作者: aiftt
 *
 * 提供日期和时间的选择功能，可以同时选择日期和时间
 */

import { addMonths, format, getMonth, getYear, isValid, parseISO, setMonth, setYear, subMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 当前选中的日期时间值（ISO格式字符串）
   */
  modelValue?: string
  /**
   * 日期时间格式，默认为yyyy-MM-dd HH:mm:ss
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
   * 是否可筛选
   */
  filterable?: boolean
  /**
   * 选择器尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示秒选择器
   */
  showSeconds?: boolean
  /**
   * 是否使用12小时制
   */
  use12Hours?: boolean
  /**
   * 日期快捷选项
   */
  shortcuts?: Array<{
    text: string
    value: () => Date
  }>
  /**
   * 最小可选日期
   */
  minDate?: string
  /**
   * 最大可选日期
   */
  maxDate?: string
  /**
   * 弹出框的放置位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 是否显示"此刻"按钮
   */
  showNow?: boolean
  /**
   * 是否显示"确认"按钮
   */
  showConfirm?: boolean
}>(), {
  format: 'yyyy-MM-dd HH:mm:ss',
  placeholder: '请选择日期时间',
  disabled: false,
  readonly: false,
  clearable: true,
  filterable: false,
  size: 'default',
  showSeconds: true,
  use12Hours: false,
  shortcuts: () => [],
  placement: 'bottom',
  bordered: true,
  showNow: true,
  showConfirm: true,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'clear'): void
  (e: 'ok'): void
}>()

// 状态
const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const popoverRef = ref<HTMLDivElement | null>(null)
const currentDate = ref(new Date())
const currentView = ref<'date' | 'month' | 'year' | 'time'>('date')
const inputValue = ref('')
const currentHour = ref(0)
const currentMinute = ref(0)
const currentSecond = ref(0)
const currentPeriod = ref<'AM' | 'PM'>('AM')
const tempDateTime = ref<Date | null>(null)

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

const selectedDateTime = computed({
  get() {
    return props.modelValue ? parseISO(props.modelValue) : null
  },
  set(value: Date | null) {
    if (value) {
      const formatted = format(value, 'yyyy-MM-dd\'T\'HH:mm:ss')
      emit('update:modelValue', formatted)
      emit('change', formatted)
      inputValue.value = format(value, props.format)
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

const hours = computed(() => {
  if (props.use12Hours) {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i === 0 ? 12 : i,
      label: i === 0 ? '12' : String(i).padStart(2, '0'),
    }))
  }
  else {
    return Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: String(i).padStart(2, '0'),
    }))
  }
})

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: String(i).padStart(2, '0'),
  }))
})

const seconds = computed(() => {
  return Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: String(i).padStart(2, '0'),
  }))
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-sm h-8'
    case 'large':
      return 'text-lg h-12'
    default:
      return 'text-base h-10'
  }
})

// 方法
function handleInputClick() {
  if (!props.disabled && !props.readonly) {
    isOpen.value = !isOpen.value
    if (isOpen.value)
      emit('focus')
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
    emit('blur')
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

  if (selectedDateTime.value) {
    // 保留原时间
    date.setHours(selectedDateTime.value.getHours())
    date.setMinutes(selectedDateTime.value.getMinutes())
    date.setSeconds(selectedDateTime.value.getSeconds())
  }

  tempDateTime.value = date

  // 如果设置了showConfirm，则等待确认后再更新
  if (!props.showConfirm) {
    selectedDateTime.value = date
  }

  // 选完日期后切换到时间选择视图
  currentView.value = 'time'
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

function showTimeView() {
  currentView.value = 'time'
}

function showDateView() {
  currentView.value = 'date'
}

function setHour(hour: number) {
  currentHour.value = hour
  updateTempTime()
}

function setMinute(minute: number) {
  currentMinute.value = minute
  updateTempTime()
}

function setSecond(second: number) {
  currentSecond.value = second
  updateTempTime()
}

function setPeriod(period: 'AM' | 'PM') {
  currentPeriod.value = period
  updateTempTime()
}

function updateTempTime() {
  if (!tempDateTime.value) {
    tempDateTime.value = new Date()
  }

  let hour = currentHour.value

  // 处理12小时制
  if (props.use12Hours) {
    if (currentPeriod.value === 'PM' && hour < 12)
      hour += 12
    else if (currentPeriod.value === 'AM' && hour === 12)
      hour = 0
  }

  tempDateTime.value.setHours(hour)
  tempDateTime.value.setMinutes(currentMinute.value)
  tempDateTime.value.setSeconds(currentSecond.value)

  // 如果没有设置确认按钮，则直接更新
  if (!props.showConfirm) {
    selectedDateTime.value = new Date(tempDateTime.value)
  }
}

function handleInput(e: Event) {
  const input = e.target as HTMLInputElement
  inputValue.value = input.value

  // 尝试解析输入的日期时间
  try {
    const parsed = parseISO(input.value)
    if (isValid(parsed)) {
      selectedDateTime.value = parsed
    }
  }
  catch {
    // 无效日期时间，忽略
  }
}

function selectNow() {
  const now = new Date()
  selectedDateTime.value = now
  isOpen.value = false
}

function clearDateTime() {
  selectedDateTime.value = null
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

function confirmSelection() {
  if (tempDateTime.value) {
    selectedDateTime.value = tempDateTime.value
    isOpen.value = false
    emit('ok')
  }
}

function selectShortcut(shortcut: { text: string, value: () => Date }) {
  const date = shortcut.value()
  selectedDateTime.value = date
  isOpen.value = false
}

// 监听props
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    try {
      const date = parseISO(newValue)
      if (isValid(date)) {
        inputValue.value = format(date, props.format)
        currentDate.value = date

        // 设置小时、分钟、秒和时间段
        const hours = date.getHours()
        currentHour.value = props.use12Hours ? (hours % 12 || 12) : hours
        currentMinute.value = date.getMinutes()
        currentSecond.value = date.getSeconds()
        currentPeriod.value = hours >= 12 ? 'PM' : 'AM'
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
  if (import.meta.client) {
    document.addEventListener('click', handleDocumentClick)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>

<template>
  <div class="ui-date-time-picker relative w-full">
    <!-- 输入框 -->
    <div
      class="w-full flex cursor-pointer items-center border rounded px-3 transition-colors duration-150" :class="[
        sizeClass,
        disabled ? 'bg-gray-100 cursor-not-allowed opacity-70 dark:bg-gray-800' : 'bg-white dark:bg-gray-900',
        bordered ? 'border-gray-300 dark:border-gray-700 focus-within:border-primary-500 dark:focus-within:border-primary-400' : 'border-transparent',
      ]"
      @click="handleInputClick"
    >
      <input
        ref="inputRef"
        type="text"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || !filterable"
        class="w-full cursor-pointer bg-transparent outline-none"
        @input="handleInput"
      >
      <ui-icon
        v-if="clearable && inputValue && !disabled && !readonly"
        icon="carbon:close-filled"
        class="ml-1 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        @click.stop="clearDateTime"
      />
      <ui-icon
        icon="carbon:calendar"
        class="ml-1 text-gray-400 dark:text-gray-500"
      />
    </div>

    <!-- 日期时间选择面板 -->
    <div
      v-if="isOpen"
      ref="popoverRef"
      class="absolute z-50 mt-1 border border-gray-200 rounded bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800" :class="[
        placement === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
      ]"
      style="min-width: 320px;"
    >
      <!-- 快捷选项 -->
      <div v-if="shortcuts.length > 0" class="border-b border-gray-200 p-2 dark:border-gray-700">
        <div class="flex flex-wrap gap-1">
          <button
            v-for="(shortcut, index) in shortcuts"
            :key="index"
            class="rounded px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="selectShortcut(shortcut)"
          >
            {{ shortcut.text }}
          </button>
        </div>
      </div>

      <!-- 日期选择视图 -->
      <div v-if="currentView === 'date'" class="p-3">
        <div class="mb-2 flex items-center justify-between">
          <div class="flex">
            <button
              class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="prevMonth"
            >
              <ui-icon icon="carbon:chevron-left" />
            </button>
            <button
              class="ml-1 rounded px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="showMonthView"
            >
              {{ formattedCurrentMonth }}
            </button>
            <button
              class="ml-1 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="nextMonth"
            >
              <ui-icon icon="carbon:chevron-right" />
            </button>
          </div>
          <button
            class="rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="showTimeView"
          >
            选择时间
          </button>
        </div>

        <!-- 星期表头 -->
        <div class="grid grid-cols-7 mb-1">
          <div
            v-for="day in ['一', '二', '三', '四', '五', '六', '日']"
            :key="day"
            class="py-1 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {{ day }}
          </div>
        </div>

        <!-- 日期格子 -->
        <div class="grid grid-cols-7">
          <div
            v-for="(day, index) in currentMonthDays"
            :key="index"
            class="mx-auto h-8 w-8 flex cursor-pointer items-center justify-center rounded-full py-1 text-center text-sm" :class="[
              day.isCurrentMonth ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500',
              day.isToday ? 'bg-blue-100 dark:bg-blue-900/30' : '',
              selectedDateTime && day.day === selectedDateTime.getDate()
                && day.month === selectedDateTime.getMonth()
                && day.year === selectedDateTime.getFullYear() && day.isCurrentMonth
                ? 'bg-primary-500 text-white dark:bg-primary-600'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
            @click="selectDay(day)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>

      <!-- 月份选择视图 -->
      <div v-else-if="currentView === 'month'" class="p-3">
        <div class="mb-4 flex items-center justify-between">
          <button
            class="rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="showYearView"
          >
            {{ currentDate.getFullYear() }}年
          </button>
          <button
            class="rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="showDateView"
          >
            返回
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="month in monthOptions"
            :key="month.value"
            class="cursor-pointer rounded py-2 text-center" :class="[
              currentDate.getMonth() === month.value ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
            @click="selectMonth(month.value)"
          >
            {{ month.label }}
          </div>
        </div>
      </div>

      <!-- 年份选择视图 -->
      <div v-else-if="currentView === 'year'" class="p-3">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">选择年份</span>
          <button
            class="rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="showMonthView"
          >
            返回
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="year in yearOptions"
            :key="year.value"
            class="cursor-pointer rounded py-2 text-center" :class="[
              currentDate.getFullYear() === year.value ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
            @click="selectYear(year.value)"
          >
            {{ year.label }}
          </div>
        </div>
      </div>

      <!-- 时间选择视图 -->
      <div v-else-if="currentView === 'time'" class="p-3">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">选择时间</span>
          <button
            class="rounded px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="showDateView"
          >
            选择日期
          </button>
        </div>

        <div class="flex items-center justify-center gap-2">
          <!-- 小时选择 -->
          <div class="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 h-48 w-16 overflow-y-auto">
            <div
              v-for="hour in hours"
              :key="`hour-${hour.value}`"
              class="cursor-pointer py-2 text-center" :class="[
                currentHour === hour.value ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              ]"
              @click="setHour(hour.value)"
            >
              {{ hour.label }}
            </div>
          </div>

          <div class="text-lg">
            :
          </div>

          <!-- 分钟选择 -->
          <div class="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 h-48 w-16 overflow-y-auto">
            <div
              v-for="minute in minutes"
              :key="`minute-${minute.value}`"
              class="cursor-pointer py-2 text-center" :class="[
                currentMinute === minute.value ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              ]"
              @click="setMinute(minute.value)"
            >
              {{ minute.label }}
            </div>
          </div>

          <!-- 秒选择 (如果showSeconds为true) -->
          <template v-if="showSeconds">
            <div class="text-lg">
              :
            </div>
            <div class="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 h-48 w-16 overflow-y-auto">
              <div
                v-for="second in seconds"
                :key="`second-${second.value}`"
                class="cursor-pointer py-2 text-center" :class="[
                  currentSecond === second.value ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="setSecond(second.value)"
              >
                {{ second.label }}
              </div>
            </div>
          </template>

          <!-- 12小时制的AM/PM选择 -->
          <template v-if="use12Hours">
            <div class="h-48 w-16 flex flex-col justify-center">
              <div
                class="mb-2 cursor-pointer rounded py-2 text-center" :class="[
                  currentPeriod === 'AM' ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="setPeriod('AM')"
              >
                AM
              </div>
              <div
                class="cursor-pointer rounded py-2 text-center" :class="[
                  currentPeriod === 'PM' ? 'bg-primary-500 text-white dark:bg-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="setPeriod('PM')"
              >
                PM
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div v-if="showNow || showConfirm" class="flex justify-end border-t border-gray-200 p-2 dark:border-gray-700">
        <button
          v-if="showNow"
          class="mr-2 rounded px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="selectNow"
        >
          此刻
        </button>
        <button
          v-if="showConfirm"
          class="rounded bg-primary-500 px-3 py-1 text-sm text-white dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700"
          @click="confirmSelection"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}
</style>
