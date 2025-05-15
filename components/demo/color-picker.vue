<script setup lang="ts" name="DemoColorPicker">
/**
 * ColorPicker颜色选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基本颜色
const basicColor = ref('#409EFF')

// 带透明度颜色
const alphaColor = ref('rgba(64, 158, 255, 0.5)')

// 不同格式颜色
const hexColor = ref('#67C23A')
const rgbColor = ref('rgb(103, 194, 58)')
const hslColor = ref('hsl(96, 54%, 49%)')

// 只读和禁用状态
const readonlyColor = ref('#E6A23C')
const disabledColor = ref('#F56C6C')

// 自定义预设颜色
const customPresetColor = ref('#409EFF')
const customPresets = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#000000',
  '#ffffff',
]

// 代码示例
const basicCode = `<ui-input-color-picker v-model="basicColor" />

<script setup>
const basicColor = ref('#409EFF')
<\/script>`

const alphaCode = `<ui-input-color-picker v-model="alphaColor" show-alpha format="rgb" />

<script setup>
const alphaColor = ref('rgba(64, 158, 255, 0.5)')
<\/script>`

const formatCode = `<ui-input-color-picker v-model="hexColor" format="hex" />
<ui-input-color-picker v-model="rgbColor" format="rgb" />
<ui-input-color-picker v-model="hslColor" format="hsl" />

<script setup>
const hexColor = ref('#67C23A')
const rgbColor = ref('rgb(103, 194, 58)')
const hslColor = ref('hsl(96, 54%, 49%)')
<\/script>`

const stateCode = `<ui-input-color-picker v-model="readonlyColor" readonly />
<ui-input-color-picker v-model="disabledColor" disabled />

<script setup>
const readonlyColor = ref('#E6A23C')
const disabledColor = ref('#F56C6C')
<\/script>`

const presetCode = `<ui-input-color-picker v-model="customPresetColor" :preset-colors="customPresets" />

<script setup>
const customPresetColor = ref('#409EFF')
const customPresets = [
  '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1',
  '#1e90ff', '#c71585', '#000000', '#ffffff'
]
<\/script>`

const sizeCode = `<ui-input-color-picker v-model="basicColor" size="small" />
<ui-input-color-picker v-model="basicColor" />
<ui-input-color-picker v-model="basicColor" size="large" />

<script setup>
const basicColor = ref('#409EFF')
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      ColorPicker 颜色选择器
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于颜色选择，支持多种颜色格式，包括RGB、HEX、HSL等。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础颜色选择器，默认使用HEX格式。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-input-color-picker v-model="basicColor" />
        <div class="rounded bg-gray-100 p-2 dark:bg-gray-800">
          当前值: <span class="font-mono">{{ basicColor }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 透明度 -->
    <ui-demo
      title="带透明度"
      description="通过 show-alpha 属性支持选择透明度，需要配合RGB或HSL格式使用。"
      :code="alphaCode"
    >
      <div class="space-y-4">
        <ui-input-color-picker v-model="alphaColor" show-alpha format="rgb" />
        <div class="rounded bg-gray-100 p-2 dark:bg-gray-800">
          当前值: <span class="font-mono">{{ alphaColor }}</span>
        </div>
      </div>
    </ui-demo>

    <!-- 不同颜色格式 -->
    <ui-demo
      title="不同颜色格式"
      description="支持HEX、RGB、HSL三种格式，可以通过format属性指定。"
      :code="formatCode"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">HEX:</span>
            <ui-input-color-picker v-model="hexColor" format="hex" />
            <span class="text-sm font-mono">{{ hexColor }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">RGB:</span>
            <ui-input-color-picker v-model="rgbColor" format="rgb" />
            <span class="text-sm font-mono">{{ rgbColor }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">HSL:</span>
            <ui-input-color-picker v-model="hslColor" format="hsl" />
            <span class="text-sm font-mono">{{ hslColor }}</span>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 只读和禁用状态 -->
    <ui-demo
      title="只读和禁用状态"
      description="支持只读和禁用状态，分别通过readonly和disabled属性设置。"
      :code="stateCode"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-4">
          <span class="font-medium">只读:</span>
          <ui-input-color-picker v-model="readonlyColor" readonly />
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <span class="font-medium">禁用:</span>
          <ui-input-color-picker v-model="disabledColor" disabled />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义预设颜色 -->
    <ui-demo
      title="自定义预设颜色"
      description="通过preset-colors属性自定义预设颜色，方便快速选择常用颜色。"
      :code="presetCode"
    >
      <div class="space-y-4">
        <ui-input-color-picker v-model="customPresetColor" :preset-colors="customPresets" />
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(color, index) in customPresets"
            :key="index"
            class="h-6 w-6 border border-gray-300 rounded-full"
            :style="{ backgroundColor: color }"
            :title="color"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="颜色选择器提供小、默认、大三种尺寸。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <div>
          <div class="mb-2 text-sm">
            小
          </div>
          <ui-input-color-picker v-model="basicColor" size="small" />
        </div>
        <div>
          <div class="mb-2 text-sm">
            默认
          </div>
          <ui-input-color-picker v-model="basicColor" />
        </div>
        <div>
          <div class="mb-2 text-sm">
            大
          </div>
          <ui-input-color-picker v-model="basicColor" size="large" />
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                modelValue / v-model
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                绑定值
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                format
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                颜色格式
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'hex' / 'rgb' / 'hsl'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'hex'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                show-alpha
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否支持透明度
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                preset-colors
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                预设颜色数组
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                尺寸
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                disabled
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否禁用
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                readonly
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否只读
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                change
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                当前值变化时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (value: string)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 32px;
}

.demo-component {
  margin-top: 16px;
  padding: 24px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}

.demo-code {
  margin-top: 16px;
  padding: 16px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
}

.demo-value {
  margin-top: 12px;
  font-size: 14px;
  color: #606266;
}

.format-row,
.state-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.format-row:last-child,
.state-row:last-child {
  margin-bottom: 0;
}

.format-label,
.state-label,
.size-label {
  display: inline-block;
  width: 60px;
  font-size: 14px;
  color: #606266;
}

.format-value {
  margin-left: 16px;
  font-size: 14px;
  color: #606266;
}

.demo-sizes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
}

.demo-table th,
.demo-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.demo-table th {
  background-color: #f7f8fa;
  color: #606266;
  font-weight: 500;
}

.demo-table td {
  color: #606266;
}
</style>
