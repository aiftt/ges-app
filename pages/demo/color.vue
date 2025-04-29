<script setup lang="ts" name="DemoColor">
/**
 * 颜色组件示例页面
 * 创建日期: 2025-05-05
 * 作者: aiftt
 */
import { ref } from 'vue'
import logger from '~/utils/logger'

// 预设颜色
const presetColors = [
  { name: 'Primary', value: '#1890ff' },
  { name: 'Success', value: '#52c41a' },
  { name: 'Warning', value: '#faad14' },
  { name: 'Danger', value: '#f5222d' },
  { name: 'Info', value: '#5470c6' },
]

// 灰度颜色
const grayscaleColors = [
  { name: 'White', value: '#ffffff' },
  { name: 'Light Gray', value: '#f5f5f5' },
  { name: 'Gray', value: '#d9d9d9' },
  { name: 'Dark Gray', value: '#8c8c8c' },
  { name: 'Black', value: '#000000' },
]

// 自定义颜色
const customColor = ref('#1890ff')

// 选择的形状
const selectedShape = ref<'square' | 'rounded' | 'circle'>('square')
const shapes: ('square' | 'rounded' | 'circle')[] = ['square', 'rounded', 'circle']

// 选择的尺寸
const selectedSize = ref<'small' | 'default' | 'large' | string>('default')
const sizes = ['small', 'default', 'large', '48px']

// 复制处理
function handleCopy(color: string) {
  logger.client.info(`颜色 ${color} 已复制到剪贴板`)
}

// 生成随机颜色
function generateRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  customColor.value = color
}
</script>

<template>
  <div class="demo-color p-6">
    <h1 class="mb-6 text-2xl font-bold">
      颜色组件 Color
    </h1>

    <p class="mb-4">
      颜色组件用于显示颜色样本，支持不同的形状、尺寸，并可以显示颜色值和复制功能。
    </p>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>

      <div class="mb-4 flex flex-wrap gap-4">
        <div v-for="color in presetColors" :key="color.value" class="flex flex-col items-center">
          <ui-color :value="color.value" />
          <span class="mt-2 text-xs">{{ color.name }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#1890ff" />
          <ui-color value="#52c41a" />
          <ui-color value="#faad14" />
          <ui-color value="#f5222d" />
          <ui-color value="#5470c6" />
        </template>
      </ui-code>
    </section>

    <!-- 不同形状 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同形状
      </h2>

      <div class="mb-4 flex flex-wrap gap-4">
        <div v-for="shape in shapes" :key="shape" class="flex flex-col items-center">
          <ui-color value="#1890ff" :shape="shape" />
          <span class="mt-2 text-xs">{{ shape }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#1890ff" shape="square" />
          <ui-color value="#1890ff" shape="rounded" />
          <ui-color value="#1890ff" shape="circle" />
        </template>
      </ui-code>
    </section>

    <!-- 不同尺寸 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同尺寸
      </h2>

      <div class="mb-4 flex flex-wrap items-end gap-4">
        <div v-for="size in sizes" :key="size" class="flex flex-col items-center">
          <ui-color value="#1890ff" :size="size" />
          <span class="mt-2 text-xs">{{ size }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#1890ff" size="small" />
          <ui-color value="#1890ff" size="default" />
          <ui-color value="#1890ff" size="large" />
          <ui-color value="#1890ff" size="48px" />
        </template>
      </ui-code>
    </section>

    <!-- 显示颜色值 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        显示颜色值
      </h2>

      <div class="mb-4 flex flex-wrap gap-4">
        <div v-for="color in presetColors.slice(0, 3)" :key="color.value" class="flex flex-col items-center">
          <ui-color :value="color.value" size="large" show-value />
          <span class="mt-2 text-xs">{{ color.name }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#1890ff" size="large" show-value />
          <ui-color value="#52c41a" size="large" show-value />
          <ui-color value="#faad14" size="large" show-value />
        </template>
      </ui-code>
    </section>

    <!-- 可复制颜色 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        复制颜色
      </h2>

      <div class="mb-4 flex flex-wrap gap-4">
        <div v-for="color in presetColors.slice(0, 3)" :key="color.value" class="flex flex-col items-center">
          <ui-color :value="color.value" size="large" copyable @copy="handleCopy" />
          <span class="mt-2 text-xs">{{ color.name }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#1890ff" size="large" copyable @copy="handleCopy" />
          <ui-color value="#52c41a" size="large" copyable @copy="handleCopy" />
          <ui-color value="#faad14" size="large" copyable @copy="handleCopy" />
        </template>
      </ui-code>
    </section>

    <!-- 灰度颜色 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        灰度颜色
      </h2>

      <div class="mb-4 flex flex-wrap gap-4">
        <div v-for="color in grayscaleColors" :key="color.value" class="flex flex-col items-center">
          <ui-color :value="color.value" />
          <span class="mt-2 text-xs">{{ color.name }}</span>
        </div>
      </div>

      <ui-code language="html">
        <template #code>
          <ui-color value="#ffffff" />
          <ui-color value="#f5f5f5" />
          <ui-color value="#d9d9d9" />
          <ui-color value="#8c8c8c" />
          <ui-color value="#000000" />
        </template>
      </ui-code>
    </section>

    <!-- 交互示例 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        交互示例
      </h2>

      <div class="mb-4 flex flex-col space-y-4">
        <div class="flex flex-wrap gap-4">
          <div>
            <span class="mb-2 block text-sm">自定义颜色:</span>
            <input
              v-model="customColor"
              type="color"
              class="border border-gray-300 rounded px-2 py-1"
            >
          </div>

          <div>
            <span class="mb-2 block text-sm">形状:</span>
            <select
              v-model="selectedShape"
              class="border border-gray-300 rounded px-2 py-1"
            >
              <option v-for="shape in shapes" :key="shape" :value="shape">
                {{ shape }}
              </option>
            </select>
          </div>

          <div>
            <span class="mb-2 block text-sm">尺寸:</span>
            <select
              v-model="selectedSize"
              class="border border-gray-300 rounded px-2 py-1"
            >
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>

          <div class="flex items-end">
            <ui-button type="primary" @click="generateRandomColor">
              生成随机颜色
            </ui-button>
          </div>
        </div>

        <div class="flex items-center gap-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <div class="flex flex-col items-center">
            <ui-color
              :value="customColor"
              :shape="selectedShape"
              :size="selectedSize"
              show-value
              copyable
              @copy="handleCopy"
            />
            <span class="mt-2 text-sm">带文本和复制</span>
          </div>

          <div class="flex flex-col items-center">
            <ui-color
              :value="customColor"
              :shape="selectedShape"
              :size="selectedSize"
              show-value
            />
            <span class="mt-2 text-sm">带文本</span>
          </div>

          <div class="flex flex-col items-center">
            <ui-color
              :value="customColor"
              :shape="selectedShape"
              :size="selectedSize"
              copyable
              @copy="handleCopy"
            />
            <span class="mt-2 text-sm">可复制</span>
          </div>

          <div class="flex flex-col items-center">
            <ui-color
              :value="customColor"
              :shape="selectedShape"
              :size="selectedSize"
            />
            <span class="mt-2 text-sm">基础</span>
          </div>
        </div>
      </div>
    </section>

    <!-- API 文档 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        API
      </h2>

      <h3 class="mb-2 text-lg font-bold">
        Props
      </h3>
      <table class="mb-6 w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-gray-200 dark:border-gray-700">
            <th class="px-4 py-2 text-left">
              参数
            </th>
            <th class="px-4 py-2 text-left">
              说明
            </th>
            <th class="px-4 py-2 text-left">
              类型
            </th>
            <th class="px-4 py-2 text-left">
              默认值
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              value
            </td>
            <td class="px-4 py-2">
              颜色值，支持HEX、RGB、RGBA、HSL格式
            </td>
            <td class="px-4 py-2">
              string
            </td>
            <td class="px-4 py-2">
              -
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              showValue
            </td>
            <td class="px-4 py-2">
              是否显示颜色值文本
            </td>
            <td class="px-4 py-2">
              boolean
            </td>
            <td class="px-4 py-2">
              false
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              copyable
            </td>
            <td class="px-4 py-2">
              是否可复制颜色值
            </td>
            <td class="px-4 py-2">
              boolean
            </td>
            <td class="px-4 py-2">
              false
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              shape
            </td>
            <td class="px-4 py-2">
              组件形状
            </td>
            <td class="px-4 py-2">
              'circle' | 'square' | 'rounded'
            </td>
            <td class="px-4 py-2">
              'square'
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              size
            </td>
            <td class="px-4 py-2">
              组件大小，可以是预设值或具体像素
            </td>
            <td class="px-4 py-2">
              'small' | 'default' | 'large' | string
            </td>
            <td class="px-4 py-2">
              'default'
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              class
            </td>
            <td class="px-4 py-2">
              自定义类名
            </td>
            <td class="px-4 py-2">
              string
            </td>
            <td class="px-4 py-2">
              ''
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 text-lg font-bold">
        Events
      </h3>
      <table class="mb-6 w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-gray-200 dark:border-gray-700">
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
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">
              copy
            </td>
            <td class="px-4 py-2">
              复制颜色值成功时触发
            </td>
            <td class="px-4 py-2">
              (value: string) => void
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.demo-color {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
