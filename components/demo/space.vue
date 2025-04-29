<script setup lang="ts" name="DemoSpace">
/**
 * Space 组件示例
 * 创建日期: 2025-02-27
 * 作者: aiftt
 */

const basicCode = ref(`<ui-space>
  <ui-button>按钮 1</ui-button>
  <ui-button type="primary">按钮 2</ui-button>
  <ui-button type="success">按钮 3</ui-button>
</ui-space>`)

const directionCode = ref(`<!-- 水平间距 -->
<ui-space direction="horizontal">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
</ui-space>

<!-- 垂直间距 -->
<ui-space direction="vertical">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
</ui-space>`)

const sizeCode = ref(`<ui-space size="small">
  <ui-button>小间距</ui-button>
  <ui-button>小间距</ui-button>
</ui-space>

<ui-space>
  <ui-button>默认间距</ui-button>
  <ui-button>默认间距</ui-button>
</ui-space>

<ui-space size="large">
  <ui-button>大间距</ui-button>
  <ui-button>大间距</ui-button>
</ui-space>

<ui-space size="24">
  <ui-button>自定义间距 24px</ui-button>
  <ui-button>自定义间距 24px</ui-button>
</ui-space>`)

const alignCode = ref(`<ui-space align="start" class="h-24 bg-gray-100 dark:bg-gray-800 p-2">
  <div class="h-8">矮内容</div>
  <div class="h-16">高内容</div>
</ui-space>

<ui-space align="center" class="h-24 bg-gray-100 dark:bg-gray-800 p-2 mt-4">
  <div class="h-8">矮内容</div>
  <div class="h-16">高内容</div>
</ui-space>

<ui-space align="end" class="h-24 bg-gray-100 dark:bg-gray-800 p-2 mt-4">
  <div class="h-8">矮内容</div>
  <div class="h-16">高内容</div>
</ui-space>`)

const wrapCode = ref(`<ui-space wrap class="w-64 bg-gray-100 dark:bg-gray-800 p-2">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
  <ui-button>按钮 4</ui-button>
  <ui-button>按钮 5</ui-button>
  <ui-button>按钮 6</ui-button>
</ui-space>`)

const splitCode = ref(`<ui-space split>
  <span>文本 1</span>
  <span>文本 2</span>
  <span>文本 3</span>
</ui-space>`)

const fillCode = ref(`<ui-space fill>
  <ui-button>填充按钮 1</ui-button>
  <ui-button>填充按钮 2</ui-button>
  <ui-button>填充按钮 3</ui-button>
</ui-space>`)
</script>

<template>
  <div class="demo-space">
    <h2 class="mb-6 text-2xl font-bold">
      Space 间距组件
    </h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        基础用法
      </h3>
      <div class="demo-block">
        <ui-space>
          <ui-button>按钮 1</ui-button>
          <ui-button type="primary">
            按钮 2
          </ui-button>
          <ui-button type="success">
            按钮 3
          </ui-button>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ basicCode }}</code></pre>
      </div>
    </div>

    <!-- 间距方向 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        间距方向
      </h3>
      <div class="demo-block">
        <p class="mb-2">
          水平间距：
        </p>
        <ui-space direction="horizontal">
          <ui-button>按钮 1</ui-button>
          <ui-button>按钮 2</ui-button>
          <ui-button>按钮 3</ui-button>
        </ui-space>

        <p class="mb-2 mt-4">
          垂直间距：
        </p>
        <ui-space direction="vertical">
          <ui-button>按钮 1</ui-button>
          <ui-button>按钮 2</ui-button>
          <ui-button>按钮 3</ui-button>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ directionCode }}</code></pre>
      </div>
    </div>

    <!-- 间距大小 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        间距大小
      </h3>
      <div class="demo-block">
        <div class="mb-4">
          <p class="mb-2">
            小间距：
          </p>
          <ui-space size="small">
            <ui-button>小间距</ui-button>
            <ui-button>小间距</ui-button>
          </ui-space>
        </div>

        <div class="mb-4">
          <p class="mb-2">
            默认间距：
          </p>
          <ui-space>
            <ui-button>默认间距</ui-button>
            <ui-button>默认间距</ui-button>
          </ui-space>
        </div>

        <div class="mb-4">
          <p class="mb-2">
            大间距：
          </p>
          <ui-space size="large">
            <ui-button>大间距</ui-button>
            <ui-button>大间距</ui-button>
          </ui-space>
        </div>

        <div>
          <p class="mb-2">
            自定义间距 24px：
          </p>
          <ui-space :size="24">
            <ui-button>自定义间距 24px</ui-button>
            <ui-button>自定义间距 24px</ui-button>
          </ui-space>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ sizeCode }}</code></pre>
      </div>
    </div>

    <!-- 对齐方式 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        对齐方式
      </h3>
      <div class="demo-block">
        <p class="mb-2">
          顶部对齐：
        </p>
        <ui-space align="start" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
          <div class="h-8 bg-white p-2 dark:bg-gray-700">
            矮内容
          </div>
          <div class="h-16 bg-white p-2 dark:bg-gray-700">
            高内容
          </div>
        </ui-space>

        <p class="mb-2 mt-4">
          居中对齐：
        </p>
        <ui-space align="center" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
          <div class="h-8 bg-white p-2 dark:bg-gray-700">
            矮内容
          </div>
          <div class="h-16 bg-white p-2 dark:bg-gray-700">
            高内容
          </div>
        </ui-space>

        <p class="mb-2 mt-4">
          底部对齐：
        </p>
        <ui-space align="end" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
          <div class="h-8 bg-white p-2 dark:bg-gray-700">
            矮内容
          </div>
          <div class="h-16 bg-white p-2 dark:bg-gray-700">
            高内容
          </div>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ alignCode }}</code></pre>
      </div>
    </div>

    <!-- 自动换行 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        自动换行
      </h3>
      <div class="demo-block">
        <ui-space wrap class="w-64 bg-gray-100 p-2 dark:bg-gray-800">
          <ui-button>按钮 1</ui-button>
          <ui-button>按钮 2</ui-button>
          <ui-button>按钮 3</ui-button>
          <ui-button>按钮 4</ui-button>
          <ui-button>按钮 5</ui-button>
          <ui-button>按钮 6</ui-button>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ wrapCode }}</code></pre>
      </div>
    </div>

    <!-- 分隔符 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        分隔符
      </h3>
      <div class="demo-block">
        <ui-space split>
          <span>文本 1</span>
          <span>文本 2</span>
          <span>文本 3</span>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ splitCode }}</code></pre>
      </div>
    </div>

    <!-- 填充父容器 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        填充父容器
      </h3>
      <div class="demo-block">
        <ui-space fill>
          <ui-button>填充按钮 1</ui-button>
          <ui-button>填充按钮 2</ui-button>
          <ui-button>填充按钮 3</ui-button>
        </ui-space>
      </div>
      <div class="demo-code">
        <pre><code>{{ fillCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-space {
  padding: 20px;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-block {
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
}

.demo-code {
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: monospace;
  font-size: 14px;
}

:root.dark .demo-block {
  background-color: #1e293b;
  border-color: #334155;
}

:root.dark .demo-code {
  background-color: #0f172a;
  border-color: #334155;
}
</style>
