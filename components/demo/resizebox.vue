<script setup lang="ts" name="DemoResizeBox">
/**
 * ResizeBox 伸缩框组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
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
</script>

<template>
  <div class="demo-resizebox">
    <h2 class="mb-6 text-xl font-bold">
      ResizeBox 伸缩框
    </h2>

    <!-- 基础用法 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        通过拖动边缘或角落调整大小。当前尺寸: {{ boxWidth }}px × {{ boxHeight }}px
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
    </div>

    <!-- 不同方向 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        不同方向
      </h3>
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
    </div>

    <!-- 保持比例 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        保持比例
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        调整大小时保持原始宽高比
      </p>

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
    </div>

    <!-- 步长调整 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        调整步长
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        设置步长为20像素
      </p>

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
    </div>

    <!-- 辅助线 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        显示辅助线
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        调整时显示中心辅助线
      </p>

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
    </div>

    <!-- 禁用状态 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        禁用状态
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        禁用调整功能
      </p>

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
    </div>
  </div>
</template>

<style scoped>
.demo-resizebox .section {
  margin-bottom: 2rem;
}
</style>
