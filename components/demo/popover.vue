<script setup lang="ts" name="DemoPopover">
/**
 * Popover 组件演示
 * 创建日期: 2025-05-07
 * 作者: aiftt
 * 更新日期: 2024-12-14 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

const content = ref('这是一段提示内容，可以展示任意内容')

// 不同触发方式代码示例
const triggerCode = `<ui-popover trigger="hover" title="标题">
  <template #content>
    <div class="p-2">这是一段提示内容，可以展示任意内容</div>
  </template>
  <ui-button>悬停触发</ui-button>
</ui-popover>

<ui-popover trigger="click" title="标题">
  <template #content>
    <div class="p-2">这是一段提示内容，可以展示任意内容</div>
  </template>
  <ui-button>点击触发</ui-button>
</ui-popover>`

// 不同位置代码示例
const placementCode = `<ui-popover placement="top" trigger="hover">
  <template #content>
    <div class="p-2">顶部显示</div>
  </template>
  <ui-button>上方</ui-button>
</ui-popover>

<ui-popover placement="bottom" trigger="hover">
  <template #content>
    <div class="p-2">底部显示</div>
  </template>
  <ui-button>下方</ui-button>
</ui-popover>

<ui-popover placement="left" trigger="hover">
  <template #content>
    <div class="p-2">左侧显示</div>
  </template>
  <ui-button>左侧</ui-button>
</ui-popover>

<ui-popover placement="right" trigger="hover">
  <template #content>
    <div class="p-2">右侧显示</div>
  </template>
  <ui-button>右侧</ui-button>
</ui-popover>`

// 自定义内容代码示例
const customContentCode = `<ui-popover title="自定义内容" trigger="click" width="300px">
  <template #content>
    <div class="p-4">
      <h4 class="mb-2 font-bold">自定义标题</h4>
      <p class="mb-2 text-gray-600">这里可以放置更复杂的内容，包括表单、图片等。</p>
      <ui-button type="primary" size="small">操作按钮</ui-button>
    </div>
  </template>
  <ui-button>点击查看</ui-button>
</ui-popover>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Popover 气泡卡片
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      鼠标悬停、点击或聚焦时弹出的气泡式卡片浮层，可以承载更复杂的内容和交互。
    </p>

    <!-- 基本使用 -->
    <ui-demo
      title="不同触发方式"
      description="Popover 支持悬停（hover）和点击（click）两种触发方式。"
      :code="triggerCode"
    >
      <div class="flex space-x-4">
        <ui-popover trigger="hover" title="标题">
          <template #content>
            <div class="p-2">
              {{ content }}
            </div>
          </template>
          <ui-button>悬停触发</ui-button>
        </ui-popover>

        <ui-popover trigger="click" title="标题">
          <template #content>
            <div class="p-2">
              {{ content }}
            </div>
          </template>
          <ui-button>点击触发</ui-button>
        </ui-popover>
      </div>
    </ui-demo>

    <!-- 不同位置 -->
    <ui-demo
      title="不同位置"
      description="Popover 可以显示在元素的上、下、左、右四个方向。"
      :code="placementCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-popover placement="top" trigger="hover">
          <template #content>
            <div class="p-2">
              顶部显示
            </div>
          </template>
          <ui-button>上方</ui-button>
        </ui-popover>

        <ui-popover placement="bottom" trigger="hover">
          <template #content>
            <div class="p-2">
              底部显示
            </div>
          </template>
          <ui-button>下方</ui-button>
        </ui-popover>

        <ui-popover placement="left" trigger="hover">
          <template #content>
            <div class="p-2">
              左侧显示
            </div>
          </template>
          <ui-button>左侧</ui-button>
        </ui-popover>

        <ui-popover placement="right" trigger="hover">
          <template #content>
            <div class="p-2">
              右侧显示
            </div>
          </template>
          <ui-button>右侧</ui-button>
        </ui-popover>
      </div>
    </ui-demo>

    <!-- 自定义内容 -->
    <ui-demo
      title="自定义内容"
      description="Popover 内容可以自定义，支持任意的 HTML 内容和 Vue 组件。"
      :code="customContentCode"
    >
      <ui-popover title="自定义内容" trigger="click" width="300px">
        <template #content>
          <div class="p-4">
            <h4 class="mb-2 font-bold">
              自定义标题
            </h4>
            <p class="mb-2 text-gray-600">
              这里可以放置更复杂的内容，包括表单、图片等。
            </p>
            <ui-button type="primary" size="small">
              操作按钮
            </ui-button>
          </div>
        </template>
        <ui-button>点击查看</ui-button>
      </ui-popover>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 2rem;
}

.demo-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-card {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: var(--ui-card-bg, white);
}
</style>
