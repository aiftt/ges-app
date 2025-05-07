<script setup lang="ts" name="DemoPopover">
/**
 * Popover 组件演示
 * 创建日期: 2025-05-07
 * 作者: aiftt
 */
import { ref } from 'vue'

const content = ref('这是一段提示内容，可以展示任意内容')
</script>

<template>
  <div class="demo-section">
    <h2 class="demo-title">
      Popover 气泡卡片
    </h2>
    <p class="mb-4">
      鼠标悬停、点击或聚焦时弹出的气泡式卡片浮层，可以承载更复杂的内容和交互。
    </p>

    <div class="demo-card">
      <h3 class="mb-2 text-lg font-medium">
        基本使用
      </h3>
      <div class="mb-6 flex space-x-4">
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

      <h3 class="mb-2 text-lg font-medium">
        不同位置
      </h3>
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
    </div>
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
