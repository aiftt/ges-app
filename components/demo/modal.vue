<script setup lang="ts" name="DemoModal">
/**
 * Modal 模态对话框组件示例
 * 创建日期: 2024-06-23
 * 作者: aiftt
 * 更新日期: 2024-06-23 - 初始版本
 */

import { ref } from 'vue'

// 基础模态框
const basicVisible = ref(false)

// 不同动画效果
const fadeVisible = ref(false)
const zoomVisible = ref(false)
const slideUpVisible = ref(false)
const slideDownVisible = ref(false)

// 自定义样式
const customVisible = ref(false)

// 全屏模态框
const fullscreenVisible = ref(false)

// 不同位置
const centeredVisible = ref(false)

// 异步关闭
const asyncVisible = ref(false)
const loading = ref(false)

// 异步确认处理
function handleAsyncOk() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    asyncVisible.value = false
  }, 2000)
}
</script>

<template>
  <div class="demo-modal">
    <h2 class="mb-6 text-xl font-bold">
      Modal 模态对话框
    </h2>

    <!-- 基础模态框 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        最简单的模态框，点击按钮打开，点击遮罩层或右上角叉号关闭。
      </p>

      <ui-button type="primary" @click="basicVisible = true">
        打开模态框
      </ui-button>

      <ui-modal v-model="basicVisible" title="基础模态框">
        <p>这是一个基础模态框的内容</p>
        <p>点击遮罩层或右上角叉号可以关闭</p>
      </ui-modal>
    </div>

    <!-- 不同动画效果 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        不同动画效果
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        提供多种动画效果，满足不同的交互需求。
      </p>

      <div class="flex flex-wrap gap-4">
        <ui-button @click="fadeVisible = true">
          淡入淡出
        </ui-button>
        <ui-button @click="zoomVisible = true">
          缩放效果
        </ui-button>
        <ui-button @click="slideUpVisible = true">
          从下往上
        </ui-button>
        <ui-button @click="slideDownVisible = true">
          从上往下
        </ui-button>
      </div>

      <ui-modal v-model="fadeVisible" title="淡入淡出" animation="fade">
        <p>使用淡入淡出动画效果</p>
      </ui-modal>

      <ui-modal v-model="zoomVisible" title="缩放效果" animation="zoom">
        <p>使用缩放动画效果</p>
      </ui-modal>

      <ui-modal v-model="slideUpVisible" title="从下往上" animation="slide-up">
        <p>使用从下往上滑入动画效果</p>
      </ui-modal>

      <ui-modal v-model="slideDownVisible" title="从上往下" animation="slide-down">
        <p>使用从上往下滑入动画效果</p>
      </ui-modal>
    </div>

    <!-- 自定义样式 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        可以自定义宽度、位置、颜色等样式。
      </p>

      <ui-button type="success" @click="customVisible = true">
        自定义样式
      </ui-button>

      <ui-modal
        v-model="customVisible"
        title="自定义样式"
        width="400"
        top="150"
        bg-color="var(--ui-color-success-light)"
        align="center"
        ok-type="primary"
      >
        <p class="text-center">
          这是一个自定义样式的模态框
        </p>
        <p class="text-center">
          宽度为400px，距顶部150px
        </p>
      </ui-modal>
    </div>

    <!-- 全屏模态框 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        全屏模态框
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        适用于需要大量内容展示的场景。
      </p>

      <ui-button type="primary" @click="fullscreenVisible = true">
        全屏模态框
      </ui-button>

      <ui-modal
        v-model="fullscreenVisible"
        title="全屏模态框"
        fullscreen
      >
        <div class="h-[calc(100vh-200px)] flex items-center justify-center">
          <p class="text-xl">
            全屏模态框内容
          </p>
        </div>
      </ui-modal>
    </div>

    <!-- 不同位置 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        垂直居中
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        设置模态框垂直居中显示。
      </p>

      <ui-button type="primary" @click="centeredVisible = true">
        垂直居中
      </ui-button>

      <ui-modal
        v-model="centeredVisible"
        title="垂直居中的模态框"
        centered
      >
        <p>这个模态框垂直居中显示</p>
      </ui-modal>
    </div>

    <!-- 异步关闭 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        异步关闭
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        点击确定后模态框不会立即关闭，等待异步操作完成。
      </p>

      <ui-button type="primary" @click="asyncVisible = true">
        异步关闭
      </ui-button>

      <ui-modal
        v-model="asyncVisible"
        title="异步关闭"
        :ok-loading="loading"
        @ok="handleAsyncOk"
      >
        <p>点击确定按钮后会等待2秒才关闭</p>
      </ui-modal>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section:last-child {
  margin-bottom: 0;
}
</style>
