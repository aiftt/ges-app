<script setup lang="ts" name="DemoDateTimePicker">
/**
 * 日期时间选择器演示
 * 创建日期: 2024-08-30
 * 作者: aiftt
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
</script>

<template>
  <div class="ui-demo p-6 space-y-8">
    <h2 class="mb-4 text-2xl font-bold">
      日期时间选择器
    </h2>
    <div class="mb-6 text-lg text-gray-700 dark:text-gray-300">
      日期时间选择器用于选择日期和时间，支持多种格式、时间选择配置和快捷选项。
    </div>

    <!-- 基本使用 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        基本使用
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs">
          <ui-date-time-picker v-model="dateTimeValue" />
        </div>
        <div v-if="dateTimeValue" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的日期时间: {{ dateTimeValue }}
        </div>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        不同尺寸
      </h3>
      <div class="space-y-2">
        <ui-date-time-picker placeholder="小尺寸" size="small" class="mb-4 max-w-xs" />
        <ui-date-time-picker placeholder="默认尺寸" size="default" class="mb-4 max-w-xs" />
        <ui-date-time-picker placeholder="大尺寸" size="large" class="mb-4 max-w-xs" />
      </div>
    </section>

    <!-- 不同格式 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        自定义格式
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs">
          <ui-date-time-picker
            v-model="dateTimeFormat"
            format="yyyy年MM月dd日 HH时mm分ss秒"
            placeholder="自定义格式"
          />
        </div>
        <div v-if="dateTimeFormat" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的日期时间: {{ dateTimeFormat }}
        </div>
      </div>
    </section>

    <!-- 快捷选项 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        快捷选项
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs">
          <ui-date-time-picker
            v-model="dateTimeWithShortcuts"
            :shortcuts="shortcuts"
            placeholder="带快捷选项"
          />
        </div>
        <div v-if="dateTimeWithShortcuts" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的日期时间: {{ dateTimeWithShortcuts }}
        </div>
      </div>
    </section>

    <!-- 时间选择配置 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        时间选择配置
      </h3>
      <div class="space-y-4">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="max-w-xs">
            <ui-date-time-picker
              v-model="dateTime12Hour"
              use12-hours
              placeholder="12小时制"
            />
          </div>
          <div v-if="dateTime12Hour" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
            选中的日期时间: {{ dateTime12Hour }}
          </div>
        </div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="max-w-xs">
            <ui-date-time-picker
              v-model="dateTimeNoSeconds"
              :show-seconds="false"
              format="yyyy-MM-dd HH:mm"
              placeholder="不显示秒选择器"
            />
          </div>
          <div v-if="dateTimeNoSeconds" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
            选中的日期时间: {{ dateTimeNoSeconds }}
          </div>
        </div>
      </div>
    </section>

    <!-- 边框配置 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        边框配置
      </h3>
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
    </section>

    <!-- 确认和清除 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        确认和清除
      </h3>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="max-w-xs">
          <ui-date-time-picker
            v-model="dateTimeWithConfirm"

            clearable show-confirm
            placeholder="需要确认选择"
          />
        </div>
        <div v-if="dateTimeWithConfirm" class="rounded bg-gray-50 p-4 dark:bg-gray-800">
          选中的日期时间: {{ dateTimeWithConfirm }}
        </div>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        禁用状态
      </h3>
      <div class="max-w-xs">
        <ui-date-time-picker
          disabled
          placeholder="禁用状态"
        />
      </div>
    </section>

    <!-- 弹出位置 -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold">
        弹出位置
      </h3>
      <div class="space-y-4">
        <div class="max-w-xs">
          <ui-date-time-picker
            placeholder="向下弹出(默认)"
            placement="bottom"
          />
        </div>
        <div class="max-w-xs">
          <ui-date-time-picker
            placeholder="向上弹出"
            placement="top"
          />
        </div>
      </div>
    </section>
  </div>
</template>
