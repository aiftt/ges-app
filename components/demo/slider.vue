<script setup lang="ts" name="DemoSlider">
/**
 * 滑块组件演示
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoSlider')

// 基础滑块
const basicValue = ref(30)

// 禁用状态
const disabledValue = ref(40)

// 自定义步长
const stepValue = ref(0)

// 显示输入框
const inputValue = ref(50)

// 范围选择
const rangeValue = ref([20, 80])

// 带刻度点
const stopsValue = ref(60)

// 带标记点
const marksValue = ref(40)
const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: {
    label: '100°C',
    style: {
      color: '#f00',
    },
  },
}

// 垂直模式
const verticalValue = ref(30)
const verticalRangeValue = ref([20, 50])

// 垂直模式 - 反转版
const verticalReversedValue = ref(70)
const verticalReversedRangeValue = ref([40, 80])

// 自定义颜色
const customColorValue = ref(70)

// 处理值改变事件
function handleChange(value: number | number[]) {
  logger.info('值改变:', value)
}

// 处理拖动结束事件
function handleDragEnd(value: number | number[]) {
  logger.info('拖动结束:', value)
}

// 示例代码字符串
const basicCode = `<template>
  <ui-slider v-model="value" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(30)

function handleChange(value) {
  console.log('值改变:', value)
}
<\/script>`

const disabledCode = `<template>
  <ui-slider v-model="value" disabled />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(40)
<\/script>`

const stepCode = `<template>
  <ui-slider v-model="value" :step="10" :show-stops="true" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(0)
<\/script>`

const inputCode = `<template>
  <ui-slider v-model="value" :show-input="true" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(50)
<\/script>`

const rangeCode = `<template>
  <ui-slider v-model="value" range />
</template>

<script setup>
import { ref } from 'vue'

const value = ref([20, 80])
<\/script>`

const stopsCode = `<template>
  <ui-slider v-model="value" :step="10" :show-stops="true" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(60)
<\/script>`

const marksCode = `<template>
  <ui-slider v-model="value" :marks="marks" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(40)
const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: {
    label: '100°C',
    style: {
      color: '#f00',
    },
  },
}
<\/script>`

const verticalCode = `<template>
  <div class="flex items-start gap-12 h-[300px]">
    <div class="flex flex-col items-center">
      <ui-slider v-model="value" vertical />
      <div class="mt-4 text-sm w-24">值: {{ value }}</div>
    </div>
    <div class="flex flex-col items-center">
      <ui-slider v-model="rangeValue" vertical range :height="250" />
      <div class="mt-4 text-sm w-24">值: {{ rangeValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(30)
const rangeValue = ref([20, 50])
<\/script>`

const verticalReversedCode = `<template>
  <div class="flex items-start gap-12 h-[300px]">
    <div class="flex flex-col items-center">
      <ui-slider v-model="value" vertical reverse :height="250" />
      <div class="mt-4 text-sm w-24">值: {{ value }}</div>
    </div>
    <div class="flex flex-col items-center">
      <ui-slider v-model="rangeValue" vertical range reverse :height="250" />
      <div class="mt-4 text-sm w-24">值: {{ rangeValue }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(70)
const rangeValue = ref([40, 80])
<\/script>`

const colorCode = `<template>
  <ui-slider
    v-model="value"
    color="#8B5CF6"
    inactive-color="#F3E8FF"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(70)
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Slider 滑块
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      滑块组件用于在一个固定区间内进行值的选择，支持单值选择和范围选择，适用于需要精确调节数值的场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的滑块组件，使用v-model绑定一个数值。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-slider v-model="basicValue" @change="handleChange" @drag-end="handleDragEnd" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ basicValue }}
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="通过disabled属性设置滑块为禁用状态。"
      :code="disabledCode"
    >
      <ui-slider v-model="disabledValue" disabled />
    </ui-demo>

    <!-- 自定义步长 -->
    <ui-demo
      title="自定义步长"
      description="通过step属性设置滑块的步长，配合show-stops显示间断点。"
      :code="stepCode"
    >
      <div class="space-y-4">
        <ui-slider v-model="stepValue" :step="10" :show-stops="true" />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ stepValue }} (步长: 10)
        </div>
      </div>
    </ui-demo>

    <!-- 显示输入框 -->
    <ui-demo
      title="显示输入框"
      description="通过show-input属性显示输入框，可直接输入或调整数值。"
      :code="inputCode"
    >
      <ui-slider v-model="inputValue" :show-input="true" />
    </ui-demo>

    <!-- 范围选择 -->
    <ui-demo
      title="范围选择"
      description="设置range属性开启范围选择，此时v-model绑定值为数组。"
      :code="rangeCode"
    >
      <div class="space-y-4">
        <ui-slider v-model="rangeValue" range />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          值: {{ rangeValue }}
        </div>
      </div>
    </ui-demo>

    <!-- 带刻度点 -->
    <ui-demo
      title="显示刻度点"
      description="设置show-stops属性显示间断点，配合step使用效果更佳。"
      :code="stopsCode"
    >
      <ui-slider v-model="stopsValue" :step="10" :show-stops="true" />
    </ui-demo>

    <!-- 带标记点 -->
    <ui-demo
      title="带标记点"
      description="通过marks属性设置标记点，可以为特定值添加自定义标签。"
      :code="marksCode"
    >
      <ui-slider v-model="marksValue" :marks="marks" />
    </ui-demo>

    <!-- 垂直模式 -->
    <ui-demo
      title="垂直模式"
      description="设置vertical属性启用垂直模式，还可以通过height属性设置高度。"
      :code="verticalCode"
    >
      <div class="h-[300px] flex items-start gap-12">
        <div class="flex flex-col items-center">
          <ui-slider v-model="verticalValue" vertical />
          <div class="mt-4 w-24 text-sm text-gray-600 dark:text-gray-400">
            值: {{ verticalValue }}
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-slider v-model="verticalRangeValue" vertical range :height="250" />
          <div class="mt-4 w-24 text-sm text-gray-600 dark:text-gray-400">
            值: {{ verticalRangeValue }}
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 垂直模式（反转） -->
    <ui-demo
      title="垂直模式（反转）"
      description="使用reverse属性控制垂直模式的值方向，设为true时值0在顶部，最大值在底部。"
      :code="verticalReversedCode"
    >
      <div class="h-[300px] flex items-start gap-12">
        <div class="flex flex-col items-center">
          <ui-slider v-model="verticalReversedValue" vertical reverse :height="250" />
          <div class="mt-4 w-24 text-sm text-gray-600 dark:text-gray-400">
            值: {{ verticalReversedValue }}
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-slider v-model="verticalReversedRangeValue" vertical range reverse :height="250" />
          <div class="mt-4 w-24 text-sm text-gray-600 dark:text-gray-400">
            值: {{ verticalReversedRangeValue }}
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="通过color和inactive-color属性自定义滑块的颜色。"
      :code="colorCode"
    >
      <ui-slider
        v-model="customColorValue"
        color="#8B5CF6"
        inactive-color="#F3E8FF"
      />
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Slider组件的属性、事件和方法。"
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
                modelValue / v-model
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number / number[]
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                0
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                min
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最小值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                0
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                max
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                最大值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                100
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                step
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                步长
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
                showStops
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示间断点
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
                showTooltip
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示提示气泡
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
                showInput
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示输入框
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
                vertical
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否垂直模式
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
                height
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                滑块高度，垂直模式时使用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number / string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                200
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                range
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为范围选择
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
                marks
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                标记点
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                Record&lt;number, string | { label: string; style?: object }&gt;
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                {}
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                滑块颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                inactiveColor
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                未选中部分的颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                markColor
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                标记点颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                reverse
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否反转值的方向（垂直模式下有效，true时值0在顶部）
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
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                值改变时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: number | number[])
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                值改变且结束拖动时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: number | number[])
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                input
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                值改变时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: number | number[])
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                drag-end
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                拖动结束时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: number | number[])
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-slider {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.demo-subtitle {
  font-size: 18px;
  font-weight: bold;
  margin: 24px 0 16px 0;
}

.demo-row {
  margin-bottom: 16px;
}

.demo-value {
  margin-top: 8px;
  font-size: 14px;
  color: #6b7280;
}

.demo-button {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #2563eb;
}

.demo-vertical-container {
  display: flex;
  align-items: flex-start;
  gap: 48px;
  height: 300px;
}

.demo-vertical-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demo-vertical-item .demo-value {
  margin-top: 16px;
}

.demo-table {
  overflow-x: auto;
}

.demo-table table {
  width: 100%;
  border-collapse: collapse;
}

.demo-table th,
.demo-table td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.demo-table th {
  background-color: #f9fafb;
  font-weight: bold;
}

:root.dark .demo-controls {
  background-color: #1f2937;
}

:root.dark .demo-table th {
  background-color: #111827;
}

:root.dark .demo-table th,
:root.dark .demo-table td {
  border-color: #374151;
}

:root.dark .demo-value {
  color: #9ca3af;
}

:root.dark .demo-title {
  border-color: #374151;
}

.demo-description {
  margin-bottom: 16px;
  font-size: 14px;
  color: #6b7280;
}

:root.dark .demo-description {
  color: #9ca3af;
}
</style>
