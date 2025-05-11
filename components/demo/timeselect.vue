<script setup lang="ts">
/**
 * 时间选择器演示
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 */
import { ref } from 'vue'

// 基础用法
const selectedTime = ref('')

// 不同尺寸
const smallTime = ref('')
const mediumTime = ref('')
const largeTime = ref('')

// 时间范围
const workTime = ref('')

// 步长设置
const stepTime = ref('')

// 12小时制
const time12h = ref('')

// 禁用和只读状态
const disabledTime = ref('10:30')
const readonlyTime = ref('14:00')

// 自定义前后缀图标
const customIconTime = ref('')
const prefixIcon = ref('carbon:time')
const suffixIcon = ref('carbon:chevron-down')

// 弹出位置控制
const placementTime = ref('')
const placement = ref('bottom-start')

// 值改变事件处理
function handleChange(value: string) {
  console.warn('时间改变:', value)
}

// 清除事件处理
function handleClear() {
  // console.log('时间已清除')
}
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      时间选择器组件演示
    </h1>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>
      <div class="w-72">
        <ui-time-select
          v-model="selectedTime"
          placeholder="请选择时间"
          @change="handleChange"
          @clear="handleClear"
        />
      </div>
      <div v-if="selectedTime" class="mt-2">
        已选择时间: {{ selectedTime }}
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同尺寸
      </h2>
      <div class="w-72 space-y-4">
        <ui-time-select
          v-model="smallTime"
          size="small"
          placeholder="小尺寸"
        />
        <ui-time-select
          v-model="mediumTime"
          size="medium"
          placeholder="中等尺寸(默认)"
        />
        <ui-time-select
          v-model="largeTime"
          size="large"
          placeholder="大尺寸"
        />
      </div>
    </section>

    <!-- 时间范围 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        时间范围
      </h2>
      <div class="w-72">
        <ui-time-select
          v-model="workTime"
          start="09:00"
          end="18:00"
          step="30"
          placeholder="工作时间 (9:00 - 18:00)"
        />
      </div>
      <p class="mt-2 text-gray-500">
        可以设置开始时间和结束时间来限制可选范围
      </p>
    </section>

    <!-- 步长设置 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        时间间隔
      </h2>
      <div class="w-72">
        <ui-time-select
          v-model="stepTime"
          step="60"
          placeholder="每小时间隔"
        />
      </div>
      <p class="mt-2 text-gray-500">
        设置 step 为 60 表示每小时一个选项
      </p>
    </section>

    <!-- 12小时制 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        12小时制
      </h2>
      <div class="w-72">
        <ui-time-select
          v-model="time12h"
          :format="12"
          placeholder="选择时间 (12小时制)"
        />
      </div>
      <p class="mt-2 text-gray-500">
        设置 format 为 12 以使用 12 小时制（带 AM/PM）
      </p>
    </section>

    <!-- 禁用和只读 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        禁用和只读
      </h2>
      <div class="w-72 space-y-4">
        <ui-time-select
          v-model="disabledTime"
          disabled
          placeholder="禁用状态"
        />
        <ui-time-select
          v-model="readonlyTime"
          readonly
          placeholder="只读状态"
        />
      </div>
    </section>

    <!-- 自定义图标 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义图标
      </h2>
      <div class="mb-4 flex items-center gap-4">
        <span>前缀图标:</span>
        <ui-button size="small" @click="prefixIcon = 'carbon:time'">
          时钟
        </ui-button>
        <ui-button size="small" @click="prefixIcon = 'carbon:calendar'">
          日历
        </ui-button>
        <ui-button size="small" @click="prefixIcon = 'carbon:alarm'">
          闹钟
        </ui-button>
      </div>
      <div class="mb-4 flex items-center gap-4">
        <span>后缀图标:</span>
        <ui-button size="small" @click="suffixIcon = 'carbon:chevron-down'">
          向下箭头
        </ui-button>
        <ui-button size="small" @click="suffixIcon = 'carbon:caret-down'">
          下三角
        </ui-button>
        <ui-button size="small" @click="suffixIcon = 'carbon:overflow-menu-horizontal'">
          菜单
        </ui-button>
      </div>
      <div class="w-72">
        <ui-time-select
          v-model="customIconTime"
          :prefix-icon="prefixIcon"
          :suffix-icon="suffixIcon"
          placeholder="自定义图标"
        />
      </div>
    </section>

    <!-- 弹出位置 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        弹出位置
      </h2>
      <div class="mb-4 flex flex-wrap gap-2">
        <ui-button
          v-for="pos in ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']"
          :key="pos"
          size="small"
          :type="placement === pos ? 'primary' : 'default'"
          @click="placement = pos"
        >
          {{ pos }}
        </ui-button>
      </div>
      <div class="w-72">
        <ui-time-select
          v-model="placementTime"
          :placement="placement"
          :popper-class="`placement-${placement}`"
          placeholder="选择弹出位置"
        />
      </div>
      <p class="mt-2 text-gray-500">
        当前弹出位置: {{ placement }}
      </p>
    </section>

    <!-- 自定义宽度 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义宽度
      </h2>
      <div class="w-72">
        <ui-time-select
          v-model="selectedTime"
          :popper-width="240"
          placeholder="宽度为240px的下拉框"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// 自定义弹出样式
:deep(.placement-top),
:deep(.placement-top-start),
:deep(.placement-top-end) {
  border-bottom: 2px solid var(--ui-color-primary, #3b82f6);
}

:deep(.placement-bottom),
:deep(.placement-bottom-start),
:deep(.placement-bottom-end) {
  border-top: 2px solid var(--ui-color-primary, #3b82f6);
}
</style>
