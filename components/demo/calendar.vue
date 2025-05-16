<script setup lang="ts" name="DemoCalendar">
/**
 * 日历组件示例页面
 * 创建日期: 2024-07-31
 * 作者: aiftt
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

import { addDays, format, subDays } from 'date-fns'
import { computed, ref } from 'vue'

// 当前日期
const currentDate = ref(new Date())
const dateString = computed(() => format(currentDate.value, 'yyyy-MM-dd'))

// 日期范围示例
const minDate = subDays(new Date(), 30) // 30天前
const maxDate = addDays(new Date(), 60) // 60天后

// 带事件的日历选中日期
const eventCalendarDate = ref(new Date())

// 事件示例数据
const events = [
  {
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'primary',
    content: '今日事件',
  },
  {
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    type: 'success',
    content: '产品发布会',
  },
  {
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    type: 'warning',
    content: '团队会议',
  },
  {
    date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    type: 'danger',
    content: '项目截止日',
  },
  {
    date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    type: 'info',
    content: '培训日',
  },
  {
    date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    type: 'primary',
    content: '另一个事件',
  },
  {
    date: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
    type: 'success',
    content: '产品发布',
  },
]

// 自定义单元格样式的回调函数
function _customCellClass(date: Date) {
  const day = date.getDay()
  const classes: Record<string, boolean> = {}

  // 周末加深背景
  if (day === 0 || day === 6) {
    classes['weekend-cell'] = true
  }

  return classes
}

// 禁用函数示例
function disabledDate(date: Date) {
  // 禁用所有周六和周日
  return date.getDay() === 0 || date.getDay() === 6
}

// 年份和月份控制
const customYear = ref(new Date().getFullYear())
const customMonth = ref(new Date().getMonth())

// 日期变更处理
function _handleDateChange(date: Date) {
  console.warn('日期变更:', format(date, 'yyyy-MM-dd'))
}

// 面板变化处理
function handlePanelChange(year: number, month: number) {
  console.warn('面板变化:', year, month + 1)
}

// 示例代码
const basicCalendarCode = `<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'

// 当前日期
const currentDate = ref(new Date())
const dateString = computed(() => format(currentDate.value, 'yyyy-MM-dd'))
<\/script>

<template>
  <ui-calendar v-model="currentDate" />
  <div class="mt-4 p-2 bg-gray-100 rounded dark:bg-gray-700">
    <p class="text-sm">当前选中日期: {{ dateString }}</p>
  </div>
</template>`

const dateRangeCode = `<script setup>
import { ref } from 'vue'
import { subDays, addDays, format } from 'date-fns'

// 当前日期
const currentDate = ref(new Date())

// 日期范围示例
const minDate = subDays(new Date(), 30) // 30天前
const maxDate = addDays(new Date(), 60) // 60天后
<\/script>

<template>
  <ui-calendar
    v-model="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>`

const disabledDateCode = `<script setup>
import { ref } from 'vue'

// 当前日期
const currentDate = ref(new Date())

// 禁用函数示例
function disabledDate(date: Date) {
  // 禁用所有周六和周日
  return date.getDay() === 0 || date.getDay() === 6
}
<\/script>

<template>
  <ui-calendar
    v-model="currentDate"
    :disabled-date="disabledDate"
  />
</template>`

const eventsCalendarCode = `<script setup>
import { ref } from 'vue'
import { addDays, format } from 'date-fns'

// 当前日期
const eventCalendarDate = ref(new Date())

// 事件示例数据
const events = [
  {
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'primary',
    content: '今日事件'
  },
  {
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    type: 'success',
    content: '产品发布会'
  },
  // ... 更多事件
]
<\/script>

<template>
  <ui-calendar
    v-model="eventCalendarDate"
    :events="events"
  />
</template>`

const customYearMonthCode = `<script setup>
import { ref } from 'vue'

// 年份和月份控制
const customYear = ref(new Date().getFullYear())
const customMonth = ref(new Date().getMonth())

// 面板变化处理
function handlePanelChange(year: number, month: number) {
  console.log('面板变化:', year, month + 1)
}
<\/script>

<template>
  <ui-calendar
    :year="customYear"
    :month="customMonth"
    @panel-change="handlePanelChange"
  />
</template>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h1 class="mb-6 text-2xl font-bold">
      Calendar 日历
    </h1>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      日历组件用于展示和选择日期，支持日期范围限制、自定义禁用日期、事件标记等功能。
    </p>

    <div class="space-y-12">
      <!-- 基础用法 -->
      <ui-demo
        title="基础用法"
        description="基础的日历组件，用于展示当前月份和选择日期。"
        :code="basicCalendarCode"
      >
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-calendar v-model="currentDate" />
          <div class="mt-4 rounded bg-gray-100 p-2 dark:bg-gray-700">
            <p class="text-sm">
              当前选中日期: {{ dateString }}
            </p>
          </div>
        </div>
      </ui-demo>

      <!-- 日期范围限制 -->
      <ui-demo
        title="日期范围限制"
        description="设置min-date和max-date属性可以限制可选日期的范围。"
        :code="dateRangeCode"
      >
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-calendar
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
          />
          <div class="mt-4 rounded bg-gray-100 p-2 dark:bg-gray-700">
            <p class="text-sm">
              可选范围: {{ format(minDate, 'yyyy-MM-dd') }} 至 {{ format(maxDate, 'yyyy-MM-dd') }}
            </p>
          </div>
        </div>
      </ui-demo>

      <!-- 自定义禁用日期 -->
      <ui-demo
        title="自定义禁用日期"
        description="通过disabled-date函数可以自定义禁用特定的日期，例如禁用周末。"
        :code="disabledDateCode"
      >
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-calendar
            v-model="currentDate"
            :disabled-date="disabledDate"
          />
          <div class="mt-4 rounded bg-gray-100 p-2 dark:bg-gray-700">
            <p class="text-sm">
              已禁用所有周末
            </p>
          </div>
        </div>
      </ui-demo>

      <!-- 带事件标记 -->
      <ui-demo
        title="带事件标记"
        description="日历可以通过events属性标记特定日期上的事件，支持不同类型的事件显示不同的颜色。"
        :code="eventsCalendarCode"
      >
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-calendar
            v-model="eventCalendarDate"
            :events="events"
          />
          <div class="mt-4 rounded bg-gray-100 p-2 dark:bg-gray-700">
            <p class="text-sm font-medium">
              事件类型说明:
            </p>
            <div class="mt-2 flex flex-wrap gap-4">
              <div class="flex items-center">
                <span class="mr-2 inline-block h-3 w-3 rounded-full bg-primary-500" />
                <span>主要事件</span>
              </div>
              <div class="flex items-center">
                <span class="bg-success-500 mr-2 inline-block h-3 w-3 rounded-full" />
                <span>成功事件</span>
              </div>
              <div class="flex items-center">
                <span class="bg-warning-500 mr-2 inline-block h-3 w-3 rounded-full" />
                <span>警告事件</span>
              </div>
              <div class="flex items-center">
                <span class="bg-danger-500 mr-2 inline-block h-3 w-3 rounded-full" />
                <span>危险事件</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 inline-block h-3 w-3 rounded-full bg-gray-500" />
                <span>信息事件</span>
              </div>
            </div>
          </div>
        </div>
      </ui-demo>

      <!-- 自定义年月 -->
      <ui-demo
        title="自定义初始年月"
        description="通过year和month属性可以控制日历初始展示的年份和月份。"
        :code="customYearMonthCode"
      >
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-calendar
            :year="customYear"
            :month="customMonth"
            @panel-change="handlePanelChange"
          />
        </div>
      </ui-demo>

      <!-- API文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          Props
        </h3>
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                属性
              </th>
              <th class="px-4 py-2 text-left">
                类型
              </th>
              <th class="px-4 py-2 text-left">
                默认值
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                modelValue / v-model
              </td>
              <td class="px-4 py-2">
                Date | string | null
              </td>
              <td class="px-4 py-2">
                null
              </td>
              <td class="px-4 py-2">
                当前选中的日期
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                disabledDate
              </td>
              <td class="px-4 py-2">
                (date: Date) => boolean
              </td>
              <td class="px-4 py-2">
                () => false
              </td>
              <td class="px-4 py-2">
                禁用日期的函数
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                showToday
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                true
              </td>
              <td class="px-4 py-2">
                是否显示今天按钮
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                minDate
              </td>
              <td class="px-4 py-2">
                Date | string
              </td>
              <td class="px-4 py-2">
                -
              </td>
              <td class="px-4 py-2">
                最小可选日期
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                maxDate
              </td>
              <td class="px-4 py-2">
                Date | string
              </td>
              <td class="px-4 py-2">
                -
              </td>
              <td class="px-4 py-2">
                最大可选日期
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                year
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                当前年份
              </td>
              <td class="px-4 py-2">
                初始聚焦的年份
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                month
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                当前月份
              </td>
              <td class="px-4 py-2">
                初始聚焦的月份，从0开始
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                mode
              </td>
              <td class="px-4 py-2">
                'month' | 'week'
              </td>
              <td class="px-4 py-2">
                'month'
              </td>
              <td class="px-4 py-2">
                日历类型
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                weekdays
              </td>
              <td class="px-4 py-2">
                string[]
              </td>
              <td class="px-4 py-2">
                ['日', '一', '二', '三', '四', '五', '六']
              </td>
              <td class="px-4 py-2">
                星期显示文本
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                months
              </td>
              <td class="px-4 py-2">
                string[]
              </td>
              <td class="px-4 py-2">
                ['一月', ..., '十二月']
              </td>
              <td class="px-4 py-2">
                月份显示文本
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                readonly
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
              <td class="px-4 py-2">
                是否只读
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                disabled
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
              <td class="px-4 py-2">
                是否禁用
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                cellClass
              </td>
              <td class="px-4 py-2">
                (date: Date) => string | string[] | object
              </td>
              <td class="px-4 py-2">
                -
              </td>
              <td class="px-4 py-2">
                自定义单元格类名
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                events
              </td>
              <td class="px-4 py-2">
                {日期事件数组}
              </td>
              <td class="px-4 py-2">
                []
              </td>
              <td class="px-4 py-2">
                事件列表
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          Events
        </h3>
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">
                事件名
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="px-4 py-2">
                update:modelValue
              </td>
              <td class="px-4 py-2">
                更新值
              </td>
              <td class="px-4 py-2">
                (value: Date | null)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                change
              </td>
              <td class="px-4 py-2">
                日期变化
              </td>
              <td class="px-4 py-2">
                (value: Date)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                panel-change
              </td>
              <td class="px-4 py-2">
                面板视图变化
              </td>
              <td class="px-4 py-2">
                (year: number, month: number)
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-4 py-2">
                select
              </td>
              <td class="px-4 py-2">
                日期单元格点击
              </td>
              <td class="px-4 py-2">
                (date: Date)
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 自定义周末单元格样式示例 */
:deep(.weekend-cell) {
  background-color: rgba(0, 0, 0, 0.03);
}

:root.dark :deep(.weekend-cell) {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
