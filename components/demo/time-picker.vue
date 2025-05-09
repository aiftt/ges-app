<script setup lang="ts" name="DemoTimePicker">
/**
 * 时间选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
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
</script>

<template>
  <div class="demo-time-picker">
    <h2>TimePicker 时间选择器</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="basicTime"
          placeholder="选择时间"
          clearable
          @change="handleChange"
          @visible-change="handleVisibleChange"
          @clear="handleClear"
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ basicTime || '未选择' }}
        </div>
      </div>
    </div>

    <!-- 不显示秒 -->
    <div class="demo-section">
      <h3>不显示秒</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="noSecondsTime"
          placeholder="选择时间(时:分)"
          :show-seconds="false"
          format="HH:mm"
          clearable
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ noSecondsTime || '未选择' }}
        </div>
      </div>
    </div>

    <!-- 12小时制 -->
    <div class="demo-section">
      <h3>12小时制</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="hour12Time"
          placeholder="选择时间(12小时制)"
          :use12-hours="true"
          clearable
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ hour12Time || '未选择' }}
        </div>
      </div>
    </div>

    <!-- 步长设置 -->
    <div class="demo-section">
      <h3>步长设置</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="stepTime"
          placeholder="选择时间(步长设置)"
          :hour-step="2"
          :minute-step="15"
          :second-step="10"
          clearable
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ stepTime || '未选择' }}
          <p class="text-xs">
            小时步长: 2, 分钟步长: 15, 秒步长: 10
          </p>
        </div>
      </div>
    </div>

    <!-- 时间范围选择 -->
    <div class="demo-section">
      <h3>时间范围选择</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="rangeTime"

          :placeholder="['开始时间', '结束时间']"
          clearable is-range
        />
        <div class="mt-2 text-sm text-gray-500">
          当前值: {{ rangeTime[0] || '未选择' }} 至 {{ rangeTime[1] || '未选择' }}
        </div>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-block">
        <div v-for="size in sizes" :key="size" class="mb-4">
          <p class="mb-2 text-sm">
            {{ size }}
          </p>
          <ui-input-time-picker
            v-model="sizeTime"
            :size="size"
            :placeholder="`${size}尺寸`"
          />
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="disabledTime"
          disabled
          placeholder="禁用状态"
        />
      </div>
    </div>

    <!-- 限制时间选择范围 -->
    <div class="demo-section">
      <h3>限制时间选择范围</h3>
      <div class="demo-block">
        <ui-input-time-picker
          v-model="limitedTime"
          placeholder="限制时间范围"
          min-time="09:00:00"
          max-time="18:30:00"
          clearable
        />
        <div class="mt-2 text-sm text-gray-500">
          限制时间范围: 09:00:00 - 18:30:00
        </div>
      </div>
    </div>
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
