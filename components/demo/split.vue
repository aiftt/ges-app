<script setup lang="ts" name="DemoSplit">
/**
 * 面板分割组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoSplit')

// 水平分割的位置
const horizontalPosition = ref(30)

// 垂直分割的位置
const verticalPosition = ref(40)

// 自定义颜色的位置
const customPosition = ref(50)

// 嵌套分割的位置
const outerPosition = ref(40)
const innerPosition = ref(60)

// 处理调整结束事件
function handleResizeEnd(position: number) {
  logger.info('调整结束, 位置:', position)
}

// 示例代码
const horizontalSplitCode = `<ui-split
  v-model:position="horizontalPosition"
  class="h-60"
  @resize-end="handleResizeEnd"
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      左侧面板
    </div>
  </template>
  <template #second>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      右侧面板
    </div>
  </template>
</ui-split>`

const verticalSplitCode = `<ui-split
  v-model:position="verticalPosition"
  direction="vertical"
  class="h-60"
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      上方面板
    </div>
  </template>
  <template #second>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      下方面板
    </div>
  </template>
</ui-split>`

const minSizeCode = `<ui-split
  default-position="50%"
  min-first="30%"
  min-second="30%"
  class="h-60"
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      左侧面板 (最小 30%)
    </div>
  </template>
  <template #second>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      右侧面板 (最小 30%)
    </div>
  </template>
</ui-split>`

const customSplitterCode = `<ui-split
  v-model:position="customPosition"
  class="h-60"
  :splitter-size="10"
  splitter-color="#e0f2fe"
  splitter-hover-color="#3b82f6"
  show-handle
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      左侧面板
    </div>
  </template>
  <template #second>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      右侧面板
    </div>
  </template>
  <template #handle>
    <ui-icon icon="carbon:arrows-horizontal" color="#3b82f6" />
  </template>
</ui-split>`

const disabledSplitCode = `<ui-split
  default-position="40%"
  disabled
  class="h-60"
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      左侧面板
    </div>
  </template>
  <template #second>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      右侧面板
    </div>
  </template>
</ui-split>`

const nestedSplitCode = `<ui-split
  v-model:position="outerPosition"
  class="h-60"
>
  <template #first>
    <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      左侧面板
    </div>
  </template>
  <template #second>
    <ui-split
      v-model:position="innerPosition"
      direction="vertical"
      class="h-full"
    >
      <template #first>
        <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          右上面板
        </div>
      </template>
      <template #second>
        <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          右下面板
        </div>
      </template>
    </ui-split>
  </template>
</ui-split>`
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <h2 class="mb-6 text-2xl font-bold">
      Split 面板分割
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      Split组件用于创建可调整尺寸的分割面板，支持水平和垂直分割，可自定义分隔条样式，适用于创建灵活的布局。
    </p>

    <!-- 基础水平分割 -->
    <ui-demo
      title="水平分割"
      description="默认水平分割方向，拖动分隔条调整两侧面板的大小比例。"
      :code="horizontalSplitCode"
    >
      <ui-split
        v-model:position="horizontalPosition"
        class="h-60"
        @resize-end="handleResizeEnd"
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            左侧面板
          </div>
        </template>
        <template #second>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            右侧面板
          </div>
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        分割位置: {{ Math.round(horizontalPosition * 100) }}%
      </div>
    </ui-demo>

    <!-- 垂直分割 -->
    <ui-demo
      title="垂直分割"
      description="设置direction='vertical'实现上下分割布局。"
      :code="verticalSplitCode"
    >
      <ui-split
        v-model:position="verticalPosition"
        direction="vertical"
        class="h-60"
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            上方面板
          </div>
        </template>
        <template #second>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            下方面板
          </div>
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        分割位置: {{ Math.round(verticalPosition * 100) }}%
      </div>
    </ui-demo>

    <!-- 最小尺寸限制 -->
    <ui-demo
      title="最小尺寸限制"
      description="使用min-first和min-second设置面板的最小尺寸，防止拖动至过小状态。"
      :code="minSizeCode"
    >
      <ui-split
        default-position="50%"
        min-first="30%"
        min-second="30%"
        class="h-60"
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            左侧面板 (最小 30%)
          </div>
        </template>
        <template #second>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            右侧面板 (最小 30%)
          </div>
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        左右两侧面板的最小尺寸均为 30%，无法拖动至更小尺寸
      </div>
    </ui-demo>

    <!-- 自定义分隔条样式 -->
    <ui-demo
      title="自定义分隔条样式"
      description="通过splitter-size、splitter-color等属性自定义分隔条样式，使用show-handle和handle插槽添加拖动把手。"
      :code="customSplitterCode"
    >
      <ui-split
        v-model:position="customPosition"
        class="h-60"
        :splitter-size="10"
        splitter-color="#e0f2fe"
        splitter-hover-color="#3b82f6"
        show-handle
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            左侧面板
          </div>
        </template>
        <template #second>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            右侧面板
          </div>
        </template>
        <template #handle>
          <ui-icon icon="carbon:arrows-horizontal" color="#3b82f6" />
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        自定义分隔条颜色和图标
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="设置disabled属性禁用分隔条拖动功能。"
      :code="disabledSplitCode"
    >
      <ui-split
        default-position="40%"
        disabled
        class="h-60"
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            左侧面板
          </div>
        </template>
        <template #second>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            右侧面板
          </div>
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        禁用状态下无法拖动分隔条
      </div>
    </ui-demo>

    <!-- 嵌套使用 -->
    <ui-demo
      title="嵌套使用"
      description="支持嵌套使用Split组件创建复杂的布局结构。"
      :code="nestedSplitCode"
    >
      <ui-split
        v-model:position="outerPosition"
        class="h-60"
      >
        <template #first>
          <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            左侧面板
          </div>
        </template>
        <template #second>
          <ui-split
            v-model:position="innerPosition"
            direction="vertical"
            class="h-full"
          >
            <template #first>
              <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                右上面板
              </div>
            </template>
            <template #second>
              <div class="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                右下面板
              </div>
            </template>
          </ui-split>
        </template>
      </ui-split>
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm dark:bg-gray-700">
        可以嵌套使用分割面板，实现复杂的布局
      </div>
    </ui-demo>

    <!-- API参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Split 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
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
            direction
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            horizontal
          </td>
          <td class="px-4 py-2">
            分割方向，可选值为 horizontal 或 vertical
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            position
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            0.5
          </td>
          <td class="px-4 py-2">
            分割位置，范围为 0-1 的小数，表示第一个面板所占比例
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            defaultPosition
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            50%
          </td>
          <td class="px-4 py-2">
            初始分割位置，可以是百分比字符串或0-1的小数
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
            是否禁用分隔条拖动
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            min-first
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            第一个面板的最小尺寸
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            min-second
          </td>
          <td class="px-4 py-2">
            string | number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            第二个面板的最小尺寸
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            splitter-size
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            4
          </td>
          <td class="px-4 py-2">
            分隔条大小，单位为像素
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            splitter-color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            分隔条颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            splitter-hover-color
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            分隔条悬停颜色
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            show-handle
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示拖动把手
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Split 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            update:position
          </td>
          <td class="px-4 py-2">
            (position: number)
          </td>
          <td class="px-4 py-2">
            分割位置变化时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            resize-start
          </td>
          <td class="px-4 py-2">
            (position: number)
          </td>
          <td class="px-4 py-2">
            开始调整大小时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            resize
          </td>
          <td class="px-4 py-2">
            (position: number)
          </td>
          <td class="px-4 py-2">
            调整大小过程中触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            resize-end
          </td>
          <td class="px-4 py-2">
            (position: number)
          </td>
          <td class="px-4 py-2">
            调整大小结束时触发
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Split 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            first
          </td>
          <td class="px-4 py-2">
            第一个面板的内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            second
          </td>
          <td class="px-4 py-2">
            第二个面板的内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            handle
          </td>
          <td class="px-4 py-2">
            分隔条拖动把手的内容，需配合 show-handle 属性使用
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.demo-split {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--ui-color-text);
}

.demo-box {
  padding: 1.5rem;
  border: 1px solid var(--ui-border-color);
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg-light);
}

.demo-value {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: var(--ui-color-bg);
  border-radius: 0.25rem;
  font-family: monospace;
  color: var(--ui-color-text-light);
}

.demo-tip {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--ui-color-text-light);
}

.demo-split-container {
  width: 100%;
  height: 200px;
  border: 1px solid var(--ui-border-color);
  border-radius: 0.25rem;
  overflow: hidden;
}

.demo-split-container-nested {
  width: 100%;
  height: 300px;
  border: 1px solid var(--ui-border-color);
  border-radius: 0.25rem;
  overflow: hidden;
}

.demo-split-panel {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--ui-color-bg);
}
</style>
