<script setup lang="ts" name="DemoTimePicker">
/**
 * 时间选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoTimePicker')

// 基础示例的选中值
const basicTime = ref('')

// 不显示秒的示例
const noSecondsTime = ref('')

// 12小时制示例
const hour12Time = ref('')

// 步长示例
const stepTime = ref('')

// 范围选择示例
const rangeTime = ref<string[]>(['', ''])

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const
const sizeTime = ref('')

// 禁用状态
const disabledTime = ref('12:30:00')

// 最小最大限制
const limitedTime = ref('')

// 处理时间变化
function handleChange(time: string | string[]) {
  logger.info('时间变化:', time)
}

// 处理面板显示状态变化
function handleVisibleChange(visible: boolean) {
  logger.info('面板显示状态变化:', visible)
}

// 处理清除事件
function handleClear() {
  logger.info('清除时间')
}

// 示例代码字符串
const basicCode = `<template>
  <ui-input-time-picker
    v-model="time"
    placeholder="选择时间"
    clearable
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')

function handleChange(time) {
  console.log('时间变化:', time)
}

function handleVisibleChange(visible) {
  console.log('面板显示状态变化:', visible)
}

function handleClear() {
  console.log('清除时间')
}
<\/script>`

const noSecondsCode = `<template>
  <ui-input-time-picker
    v-model="time"
    placeholder="选择时间(时:分)"
    :show-seconds="false"
    format="HH:mm"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')
<\/script>`

const hour12Code = `<template>
  <ui-input-time-picker
    v-model="time"
    placeholder="选择时间(12小时制)"
    :use12-hours="true"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')
<\/script>`

const stepCode = `<template>
  <ui-input-time-picker
    v-model="time"
    placeholder="选择时间(步长设置)"
    :hour-step="2"
    :minute-step="15"
    :second-step="10"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')
<\/script>`

const rangeCode = `<template>
  <ui-input-time-picker
    v-model="rangeTime"
    :placeholder="['开始时间', '结束时间']"
    clearable
    is-range
  />
</template>

<script setup>
import { ref } from 'vue'

const rangeTime = ref(['', ''])
<\/script>`

const sizeCode = `<template>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm">small</p>
      <ui-input-time-picker
        v-model="time"
        size="small"
        placeholder="小尺寸"
      />
    </div>

    <div>
      <p class="mb-2 text-sm">default</p>
      <ui-input-time-picker
        v-model="time"
        size="default"
        placeholder="默认尺寸"
      />
    </div>

    <div>
      <p class="mb-2 text-sm">large</p>
      <ui-input-time-picker
        v-model="time"
        size="large"
        placeholder="大尺寸"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')
<\/script>`

const disabledCode = `<template>
  <ui-input-time-picker
    v-model="time"
    disabled
    placeholder="禁用状态"
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('12:30:00')
<\/script>`

const limitCode = `<template>
  <ui-input-time-picker
    v-model="time"
    placeholder="限制时间范围"
    min-time="09:00:00"
    max-time="18:30:00"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const time = ref('')
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      TimePicker 时间选择器
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      时间选择器用于选择或输入时间，支持时分秒、时间范围选择、不同格式和限制条件设置。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的时间选择器用法，包括时、分、秒的选择。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="basicTime"
          placeholder="选择时间"
          clearable
          @change="handleChange"
          @visible-change="handleVisibleChange"
          @clear="handleClear"
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ basicTime || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 不显示秒 -->
    <ui-demo
      title="不显示秒"
      description="可以选择只显示时分，不显示秒。"
      :code="noSecondsCode"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="noSecondsTime"
          placeholder="选择时间(时:分)"
          :show-seconds="false"
          format="HH:mm"
          clearable
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ noSecondsTime || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 12小时制 -->
    <ui-demo
      title="12小时制"
      description="支持12小时制时间格式，显示上午/下午指示。"
      :code="hour12Code"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="hour12Time"
          placeholder="选择时间(12小时制)"
          :use12-hours="true"
          clearable
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ hour12Time || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 步长设置 -->
    <ui-demo
      title="步长设置"
      description="可以设置时、分、秒的步长，控制可选值的间隔。"
      :code="stepCode"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="stepTime"
          placeholder="选择时间(步长设置)"
          :hour-step="2"
          :minute-step="15"
          :second-step="10"
          clearable
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ stepTime || '未选择' }}
          <p class="text-xs">
            小时步长: 2, 分钟步长: 15, 秒步长: 10
          </p>
        </div>
      </div>
    </ui-demo>

    <!-- 时间范围选择 -->
    <ui-demo
      title="时间范围选择"
      description="支持选择时间范围，适用于设置起始和结束时间。"
      :code="rangeCode"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="rangeTime"
          :placeholder="['开始时间', '结束时间']"
          clearable
          is-range
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前值: {{ rangeTime[0] || '未选择' }} 至 {{ rangeTime[1] || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种不同尺寸：small、default、large。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div v-for="size in sizes" :key="size">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            {{ size }}
          </p>
          <ui-input-time-picker
            v-model="sizeTime"
            :size="size"
            :placeholder="`${size}尺寸`"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="时间选择器的禁用状态。"
      :code="disabledCode"
    >
      <ui-input-time-picker
        v-model="disabledTime"
        disabled
        placeholder="禁用状态"
      />
    </ui-demo>

    <!-- 限制时间选择范围 -->
    <ui-demo
      title="限制时间选择范围"
      description="可以设置最小和最大时间，限制可选择的时间范围。"
      :code="limitCode"
    >
      <div class="space-y-4">
        <ui-input-time-picker
          v-model="limitedTime"
          placeholder="限制时间范围"
          min-time="09:00:00"
          max-time="18:30:00"
          clearable
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          限制时间范围: 09:00:00 - 18:30:00
        </div>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="TimePicker组件的属性、事件和方法。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                名称
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / string[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placeholder
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                占位文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / string[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '选择时间'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clearable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否支持清空选项
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                尺寸
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' / 'default' / 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                format
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                时间格式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'HH:mm:ss'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                showSeconds
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示秒
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                use12Hours
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否使用12小时制
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                hourStep
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                小时步长
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                minuteStep
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                分钟步长
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                secondStep
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                秒步长
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                minTime
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最小时间
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                maxTime
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最大时间
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                isRange
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为时间范围选择
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当选中时间变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string | string[])
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                visible-change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当时间面板显示/隐藏时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (visible: boolean)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clear
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当点击清空按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ()
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-time-picker {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section h3 {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
}

.demo-block {
  padding: 24px;
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 8px;
  background-color: white;
}
</style>
