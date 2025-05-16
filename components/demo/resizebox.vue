<script setup lang="ts" name="DemoResizeBox">
/**
 * ResizeBox 伸缩框组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-06-16 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 尺寸变量
const boxWidth = ref(300)
const boxHeight = ref(200)

// 更新尺寸显示
function handleResize(size: { width: number, height: number }) {
  boxWidth.value = size.width
  boxHeight.value = size.height
}

// 示例代码
const basicCode = `<ui-resizebox
  :width="300"
  :height="200"
  :min-width="150"
  :min-height="100"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
  @resize="handleResize"
>
  <div class="h-full flex items-center justify-center">
    基础伸缩框
  </div>
</ui-resizebox>

<script setup>
const boxWidth = ref(300)
const boxHeight = ref(200)

function handleResize(size) {
  boxWidth.value = size.width
  boxHeight.value = size.height
}
<\/script>`

const directionsCode = `<!-- 仅水平方向调整 -->
<ui-resizebox
  :width="300"
  :height="150"
  :directions="['right', 'left']"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    水平方向调整
  </div>
</ui-resizebox>

<!-- 仅垂直方向调整 -->
<ui-resizebox
  :width="300"
  :height="150"
  :directions="['top', 'bottom']"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    垂直方向调整
  </div>
</ui-resizebox>`

const keepRatioCode = `<ui-resizebox
  :width="300"
  :height="200"
  :keep-ratio="true"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    保持3:2比例
  </div>
</ui-resizebox>`

const stepCode = `<ui-resizebox
  :width="300"
  :height="200"
  :step="20"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    20px步长调整
  </div>
</ui-resizebox>`

const guidesCode = `<ui-resizebox
  :width="300"
  :height="200"
  :show-guides="true"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    显示辅助线
  </div>
</ui-resizebox>`

const disabledCode = `<ui-resizebox
  :width="300"
  :height="200"
  :disabled="true"
  class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
>
  <div class="h-full flex items-center justify-center">
    禁用状态
  </div>
</ui-resizebox>`
</script>

<template>
  <div class="demo-resizebox">
    <h2 class="mb-6 text-xl font-bold">
      ResizeBox 伸缩框
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      ResizeBox 伸缩框组件用于创建可调整大小的容器，支持多个方向调整、保持比例、步长控制和显示辅助线。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="通过拖动边缘或角落调整大小。可以设置最小宽高限制大小。"
      :code="basicCode"
    >
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        当前尺寸: {{ boxWidth }}px × {{ boxHeight }}px
      </p>
      <ui-resizebox
        :width="300"
        :height="200"
        :min-width="150"
        :min-height="100"
        class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
        @resize="handleResize"
      >
        <div class="h-full flex items-center justify-center">
          基础伸缩框
        </div>
      </ui-resizebox>
    </ui-demo>

    <!-- 不同方向 -->
    <ui-demo
      title="不同方向"
      description="通过directions属性设置可以调整的方向，可选值包括top、right、bottom、left、top-left、top-right、bottom-right、bottom-left。"
      :code="directionsCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            仅水平方向调整
          </p>
          <ui-resizebox
            :width="300"
            :height="150"
            :directions="['right', 'left']"
            class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
          >
            <div class="h-full flex items-center justify-center">
              水平方向调整
            </div>
          </ui-resizebox>
        </div>

        <div>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
            仅垂直方向调整
          </p>
          <ui-resizebox
            :width="300"
            :height="150"
            :directions="['top', 'bottom']"
            class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
          >
            <div class="h-full flex items-center justify-center">
              垂直方向调整
            </div>
          </ui-resizebox>
        </div>
      </div>
    </ui-demo>

    <!-- 保持比例 -->
    <ui-demo
      title="保持比例"
      description="设置keep-ratio属性为true可以在调整大小时保持原始宽高比。"
      :code="keepRatioCode"
    >
      <ui-resizebox
        :width="300"
        :height="200"
        :keep-ratio="true"
        class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
      >
        <div class="h-full flex items-center justify-center">
          保持3:2比例
        </div>
      </ui-resizebox>
    </ui-demo>

    <!-- 步长调整 -->
    <ui-demo
      title="调整步长"
      description="设置step属性可以控制调整大小的步长，单位为像素。"
      :code="stepCode"
    >
      <ui-resizebox
        :width="300"
        :height="200"
        :step="20"
        class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
      >
        <div class="h-full flex items-center justify-center">
          20px步长调整
        </div>
      </ui-resizebox>
    </ui-demo>

    <!-- 辅助线 -->
    <ui-demo
      title="显示辅助线"
      description="设置show-guides属性为true可以在调整大小时显示辅助线，便于对齐。"
      :code="guidesCode"
    >
      <ui-resizebox
        :width="300"
        :height="200"
        :show-guides="true"
        class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
      >
        <div class="h-full flex items-center justify-center">
          显示辅助线
        </div>
      </ui-resizebox>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="设置disabled属性为true可以禁用调整大小的功能。"
      :code="disabledCode"
    >
      <ui-resizebox
        :width="300"
        :height="200"
        :disabled="true"
        class="border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
      >
        <div class="h-full flex items-center justify-center">
          禁用状态
        </div>
      </ui-resizebox>
    </ui-demo>

    <!-- API参考 -->
    <h3 class="mb-4 mt-8 text-lg font-medium">
      API 参考
    </h3>

    <h4 class="mb-2 mt-4 font-medium">
      ResizeBox 属性
    </h4>
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b">
          <th class="py-2">
            属性名
          </th>
          <th class="py-2">
            说明
          </th>
          <th class="py-2">
            类型
          </th>
          <th class="py-2">
            默认值
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="py-2">
            width
          </td>
          <td class="py-2">
            初始宽度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            height
          </td>
          <td class="py-2">
            初始高度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            minWidth
          </td>
          <td class="py-2">
            最小宽度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            20
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            minHeight
          </td>
          <td class="py-2">
            最小高度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            20
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            maxWidth
          </td>
          <td class="py-2">
            最大宽度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            maxHeight
          </td>
          <td class="py-2">
            最大高度
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            -
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            directions
          </td>
          <td class="py-2">
            可调整的方向
          </td>
          <td class="py-2">
            string[]
          </td>
          <td class="py-2">
            ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-right', 'bottom-left']
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            keepRatio
          </td>
          <td class="py-2">
            是否保持宽高比
          </td>
          <td class="py-2">
            boolean
          </td>
          <td class="py-2">
            false
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            disabled
          </td>
          <td class="py-2">
            是否禁用
          </td>
          <td class="py-2">
            boolean
          </td>
          <td class="py-2">
            false
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            step
          </td>
          <td class="py-2">
            调整步长
          </td>
          <td class="py-2">
            number
          </td>
          <td class="py-2">
            1
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            showGuides
          </td>
          <td class="py-2">
            是否显示辅助线
          </td>
          <td class="py-2">
            boolean
          </td>
          <td class="py-2">
            false
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-4 font-medium">
      ResizeBox 事件
    </h4>
    <table class="w-full border-collapse text-left">
      <thead>
        <tr class="border-b">
          <th class="py-2">
            事件名
          </th>
          <th class="py-2">
            说明
          </th>
          <th class="py-2">
            参数
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="py-2">
            resize
          </td>
          <td class="py-2">
            大小改变时触发
          </td>
          <td class="py-2">
            { width: number, height: number }
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            resize-start
          </td>
          <td class="py-2">
            开始调整大小时触发
          </td>
          <td class="py-2">
            { width: number, height: number }
          </td>
        </tr>
        <tr class="border-b">
          <td class="py-2">
            resize-end
          </td>
          <td class="py-2">
            结束调整大小时触发
          </td>
          <td class="py-2">
            { width: number, height: number }
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.demo-resizebox .section {
  margin-bottom: 2rem;
}
</style>
