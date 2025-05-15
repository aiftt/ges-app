<script setup lang="ts" name="DemoDateTimePicker">
/**
 * 日期时间选择器演示
 * 创建日期: 2024-08-30
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { addDays, addHours, subDays } from 'date-fns'

// 基本使用
const dateTimeValue = ref('')

// 不同格式
const dateTimeFormat = ref('')

// 带快捷选项
const dateTimeWithShortcuts = ref('')

// 时间选择配置
const dateTime12Hour = ref('')
const dateTimeNoSeconds = ref('')

// 是否显示边框
const dateTimeBordered = ref(true)

// 确认和清除
const dateTimeWithConfirm = ref('')

// 快捷选项
const shortcuts = [
  {
    text: '今天',
    value: () => new Date(),
  },
  {
    text: '昨天',
    value: () => subDays(new Date(), 1),
  },
  {
    text: '一周前',
    value: () => subDays(new Date(), 7),
  },
  {
    text: '明天',
    value: () => addDays(new Date(), 1),
  },
  {
    text: '一小时后',
    value: () => addHours(new Date(), 1),
  },
]

// 代码示例
const basicCode = `<ui-date-time-picker v-model="dateTimeValue" />

<script setup>
const dateTimeValue = ref('')
<\/script>`

const sizeCode = `<ui-date-time-picker placeholder="小尺寸" size="small" />
<ui-date-time-picker placeholder="默认尺寸" size="default" />
<ui-date-time-picker placeholder="大尺寸" size="large" />

<script setup>
// 三种尺寸的日期时间选择器
<\/script>`

const formatCode = `<ui-date-time-picker
  v-model="dateTimeFormat"
  format="yyyy年MM月dd日 HH时mm分ss秒"
  placeholder="自定义格式"
/>

<script setup>
const dateTimeFormat = ref('')
<\/script>`

const shortcutsCode = `<ui-date-time-picker
  v-model="dateTimeWithShortcuts"
  :shortcuts="shortcuts"
  placeholder="带快捷选项"
/>

<script setup>
import { addDays, addHours, subDays } from 'date-fns'

const dateTimeWithShortcuts = ref('')

// 快捷选项
const shortcuts = [
  {
    text: '今天',
    value: () => new Date(),
  },
  {
    text: '昨天',
    value: () => subDays(new Date(), 1),
  },
  {
    text: '一周前',
    value: () => subDays(new Date(), 7),
  },
  {
    text: '明天',
    value: () => addDays(new Date(), 1),
  },
  {
    text: '一小时后',
    value: () => addHours(new Date(), 1),
  },
]
<\/script>`

const timeConfigCode = `<!-- 12小时制 -->
<ui-date-time-picker
  v-model="dateTime12Hour"
  use12-hours
  placeholder="12小时制"
/>

<!-- 不显示秒选择器 -->
<ui-date-time-picker
  v-model="dateTimeNoSeconds"
  :show-seconds="false"
  format="yyyy-MM-dd HH:mm"
  placeholder="不显示秒选择器"
/>

<script setup>
const dateTime12Hour = ref('')
const dateTimeNoSeconds = ref('')
<\/script>`

const borderedCode = `<div class="mb-4 flex items-center gap-4">
  <span>显示边框：</span>
  <ui-switch v-model="dateTimeBordered" />
</div>
<ui-date-time-picker
  placeholder="边框配置"
  :bordered="dateTimeBordered"
/>

<script setup>
const dateTimeBordered = ref(true)
<\/script>`

const confirmCode = `<ui-date-time-picker
  v-model="dateTimeWithConfirm"
  clearable
  show-confirm
  placeholder="需要确认选择"
/>

<script setup>
const dateTimeWithConfirm = ref('')
<\/script>`

const disabledCode = `<ui-date-time-picker
  placeholder="禁用状态"
  disabled
/>

<script setup>
// 禁用状态的日期时间选择器
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      日期时间选择器
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      日期时间选择器用于选择日期和时间，支持多种格式、时间选择配置和快捷选项。
    </p>

    <!-- 基本使用 -->
    <ui-demo
      title="基本使用"
      description="基础的日期时间选择器，默认使用yyyy-MM-dd HH:mm:ss格式。"
      :code="basicCode"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs w-full">
          <ui-date-time-picker v-model="dateTimeValue" />
        </div>
        <div v-if="dateTimeValue" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
          选中的日期时间: <span class="font-mono">{{ dateTimeValue }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="日期时间选择器提供小、默认、大三种尺寸。"
      :code="sizeCode"
    >
      <div class="flex flex-col space-y-4">
        <ui-date-time-picker placeholder="小尺寸" size="small" class="max-w-xs" />
        <ui-date-time-picker placeholder="默认尺寸" size="default" class="max-w-xs" />
        <ui-date-time-picker placeholder="大尺寸" size="large" class="max-w-xs" />
      </div>
    </ui-demo>

    <!-- 不同格式 -->
    <ui-demo
      title="自定义格式"
      description="通过format属性自定义日期时间的显示格式，支持多种格式化方式。"
      :code="formatCode"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs w-full">
          <ui-date-time-picker
            v-model="dateTimeFormat"
            format="yyyy年MM月dd日 HH时mm分ss秒"
            placeholder="自定义格式"
          />
        </div>
        <div v-if="dateTimeFormat" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
          选中的日期时间: <span class="font-mono">{{ dateTimeFormat }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 快捷选项 -->
    <ui-demo
      title="快捷选项"
      description="通过shortcuts属性配置快捷选项，方便快速选择常用日期时间。"
      :code="shortcutsCode"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs w-full">
          <ui-date-time-picker
            v-model="dateTimeWithShortcuts"
            :shortcuts="shortcuts"
            placeholder="带快捷选项"
          />
        </div>
        <div v-if="dateTimeWithShortcuts" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
          选中的日期时间: <span class="font-mono">{{ dateTimeWithShortcuts }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 时间选择配置 -->
    <ui-demo
      title="时间选择配置"
      description="支持12小时制和隐藏秒选择器等时间格式配置。"
      :code="timeConfigCode"
    >
      <div class="space-y-6">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="max-w-xs w-full">
            <ui-date-time-picker
              v-model="dateTime12Hour"
              use12-hours
              placeholder="12小时制"
            />
          </div>
          <div v-if="dateTime12Hour" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
            选中的日期时间: <span class="font-mono">{{ dateTime12Hour }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="max-w-xs w-full">
            <ui-date-time-picker
              v-model="dateTimeNoSeconds"
              :show-seconds="false"
              format="yyyy-MM-dd HH:mm"
              placeholder="不显示秒选择器"
            />
          </div>
          <div v-if="dateTimeNoSeconds" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
            选中的日期时间: <span class="font-mono">{{ dateTimeNoSeconds }}</span>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 边框配置 -->
    <ui-demo
      title="边框配置"
      description="通过bordered属性控制是否显示输入框边框。"
      :code="borderedCode"
    >
      <div class="space-y-4">
        <div class="mb-4 flex items-center gap-4">
          <span>显示边框：</span>
          <ui-switch v-model="dateTimeBordered" />
        </div>
        <div class="max-w-xs">
          <ui-date-time-picker
            placeholder="边框配置"
            :bordered="dateTimeBordered"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 确认和清除 -->
    <ui-demo
      title="确认和清除"
      description="通过show-confirm开启确认模式，需要点击确认按钮才会更新值；通过clearable开启清除按钮。"
      :code="confirmCode"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs w-full">
          <ui-date-time-picker
            v-model="dateTimeWithConfirm"
            clearable
            show-confirm
            placeholder="需要确认选择"
          />
        </div>
        <div v-if="dateTimeWithConfirm" class="rounded bg-gray-100 p-4 dark:bg-gray-800">
          选中的日期时间: <span class="font-mono">{{ dateTimeWithConfirm }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="通过disabled属性设置禁用状态。"
      :code="disabledCode"
    >
      <div class="max-w-xs">
        <ui-date-time-picker
          placeholder="禁用状态"
          disabled
        />
      </div>
    </ui-demo>
  </div>
</template>
