<script setup lang="ts" name="DemoSplit">
/**
 * 面板分割组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
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
</script>

<template>
  <div class="demo-split">
    <h2>Split 面板分割</h2>

    <!-- 基础水平分割 -->
    <div class="demo-section">
      <h3>水平分割</h3>
      <div class="demo-box">
        <ui-split
          v-model:position="horizontalPosition"
          class="demo-split-container"
          @resize-end="handleResizeEnd"
        >
          <template #first>
            <div class="demo-split-panel">
              左侧面板
            </div>
          </template>
          <template #second>
            <div class="demo-split-panel">
              右侧面板
            </div>
          </template>
        </ui-split>
        <div class="demo-value">
          分割位置: {{ Math.round(horizontalPosition * 100) }}%
        </div>
      </div>
    </div>

    <!-- 垂直分割 -->
    <div class="demo-section">
      <h3>垂直分割</h3>
      <div class="demo-box">
        <ui-split
          v-model:position="verticalPosition"
          direction="vertical"
          class="demo-split-container"
        >
          <template #first>
            <div class="demo-split-panel">
              上方面板
            </div>
          </template>
          <template #second>
            <div class="demo-split-panel">
              下方面板
            </div>
          </template>
        </ui-split>
        <div class="demo-value">
          分割位置: {{ Math.round(verticalPosition * 100) }}%
        </div>
      </div>
    </div>

    <!-- 最小尺寸限制 -->
    <div class="demo-section">
      <h3>最小尺寸限制</h3>
      <div class="demo-box">
        <ui-split
          default-position="50%"
          min-first="30%"
          min-second="30%"
          class="demo-split-container"
        >
          <template #first>
            <div class="demo-split-panel">
              左侧面板 (最小 30%)
            </div>
          </template>
          <template #second>
            <div class="demo-split-panel">
              右侧面板 (最小 30%)
            </div>
          </template>
        </ui-split>
        <div class="demo-tip">
          左右两侧面板的最小尺寸均为 30%，无法拖动至更小尺寸
        </div>
      </div>
    </div>

    <!-- 自定义分隔条样式 -->
    <div class="demo-section">
      <h3>自定义分隔条样式</h3>
      <div class="demo-box">
        <ui-split
          v-model:position="customPosition"
          class="demo-split-container"
          :splitter-size="10"
          splitter-color="#e0f2fe"
          splitter-hover-color="#3b82f6"
          show-handle
        >
          <template #first>
            <div class="demo-split-panel">
              左侧面板
            </div>
          </template>
          <template #second>
            <div class="demo-split-panel">
              右侧面板
            </div>
          </template>
          <template #handle>
            <ui-icon icon="carbon:arrows-horizontal" color="#3b82f6" />
          </template>
        </ui-split>
        <div class="demo-tip">
          自定义分隔条颜色和图标
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-box">
        <ui-split
          default-position="40%"
          disabled
          class="demo-split-container"
        >
          <template #first>
            <div class="demo-split-panel">
              左侧面板
            </div>
          </template>
          <template #second>
            <div class="demo-split-panel">
              右侧面板
            </div>
          </template>
        </ui-split>
        <div class="demo-tip">
          禁用状态下无法拖动分隔条
        </div>
      </div>
    </div>

    <!-- 嵌套使用 -->
    <div class="demo-section">
      <h3>嵌套使用</h3>
      <div class="demo-box">
        <ui-split
          v-model:position="outerPosition"
          class="demo-split-container-nested"
        >
          <template #first>
            <div class="demo-split-panel">
              左侧面板
            </div>
          </template>
          <template #second>
            <ui-split
              v-model:position="innerPosition"
              direction="vertical"
              class="demo-split-container"
            >
              <template #first>
                <div class="demo-split-panel">
                  右上面板
                </div>
              </template>
              <template #second>
                <div class="demo-split-panel">
                  右下面板
                </div>
              </template>
            </ui-split>
          </template>
        </ui-split>
        <div class="demo-tip">
          可以嵌套使用分割面板，实现复杂的布局
        </div>
      </div>
    </div>
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
