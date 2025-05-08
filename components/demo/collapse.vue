<script setup lang="ts" name="DemoCollapse">
/**
 * Collapse 折叠面板组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 */

import { ref } from 'vue'

// 单值模式（手风琴）
const activeKey = ref('1')

// 多值模式
const activeKeys = ref(['1'])

// 自定义模式
const customActiveKeys = ref(['custom1'])
</script>

<template>
  <div class="demo-collapse">
    <h2 class="mb-6 text-xl font-bold">
      Collapse 折叠面板
    </h2>

    <!-- 基础折叠面板 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        基础折叠面板
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        同时展开多个面板，点击面板头部切换折叠状态。
      </p>

      <ui-collapse v-model="activeKeys">
        <ui-collapse-item name="1" title="面板标题 1">
          <p>这是第一个面板的内容</p>
          <p>可以包含任何内容，包括文本、图片、表格等</p>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="3" title="面板标题 3">
          <p>这是第三个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </div>

    <!-- 手风琴模式 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        手风琴模式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        每次只能展开一个面板，其他面板会自动折叠。
      </p>

      <ui-collapse v-model="activeKey" accordion>
        <ui-collapse-item name="1" title="面板标题 1">
          <p>这是第一个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="3" title="面板标题 3">
          <p>这是第三个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </div>

    <!-- 嵌套面板 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        嵌套面板
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        折叠面板可以相互嵌套，实现多层级结构。
      </p>

      <ui-collapse v-model="activeKeys">
        <ui-collapse-item name="1" title="嵌套面板">
          <ui-collapse>
            <ui-collapse-item name="nested1" title="嵌套面板 1">
              <p>这是嵌套面板的内容</p>
            </ui-collapse-item>
            <ui-collapse-item name="nested2" title="嵌套面板 2">
              <p>这是嵌套面板的内容</p>
            </ui-collapse-item>
          </ui-collapse>
        </ui-collapse-item>
        <ui-collapse-item name="2" title="面板标题 2">
          <p>这是第二个面板的内容</p>
        </ui-collapse-item>
      </ui-collapse>
    </div>

    <!-- 自定义样式 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        自定义折叠面板的图标位置和样式。
      </p>

      <ui-collapse
        v-model="customActiveKeys"
        icon-position="right"
        expand-icon="heroicons:chevron-down-20-solid"
      >
        <ui-collapse-item
          name="custom1"
          title="自定义图标"
          icon="heroicons:bell-20-solid"
        >
          <p>这是使用自定义图标的面板内容</p>
        </ui-collapse-item>
        <ui-collapse-item
          name="custom2"
          disabled
          title="禁用状态"
        >
          <p>此面板已禁用，无法点击</p>
        </ui-collapse-item>
        <ui-collapse-item
          name="custom3"
          title="带额外内容"
          extra="额外信息"
        >
          <p>这是带有额外内容的面板</p>
        </ui-collapse-item>
      </ui-collapse>
    </div>

    <!-- 简洁模式 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        简洁模式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        不带边框的简洁样式。
      </p>

      <ui-collapse simple>
        <ui-collapse-item name="simple1" title="简洁模式标题 1">
          <p>这是简洁模式的内容</p>
        </ui-collapse-item>
        <ui-collapse-item name="simple2" title="简洁模式标题 2">
          <p>这是简洁模式的内容</p>
        </ui-collapse-item>
      </ui-collapse>
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
