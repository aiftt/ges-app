<script setup lang="ts" name="DemoContainer">
/**
 * Container 组件示例
 * 创建日期: 2025-02-27
 * 作者: aiftt
 */

const basicCode = ref(`<ui-container padding="16px">
  <div>基础容器组件</div>
</ui-container>`)

const directionCode = ref(`<ui-container direction="horizontal" padding="16px">
  <div class="bg-gray-100 dark:bg-gray-800 p-4 m-2">
    水平项目 1
  </div>
  <div class="bg-gray-100 dark:bg-gray-800 p-4 m-2">
    水平项目 2
  </div>
</ui-container>

<ui-container direction="vertical" padding="16px" class="mt-4">
  <div class="bg-gray-100 dark:bg-gray-800 p-4 m-2">
    垂直项目 1
  </div>
  <div class="bg-gray-100 dark:bg-gray-800 p-4 m-2">
    垂直项目 2
  </div>
</ui-container>`)

const styleCode = ref(`<ui-container
  padding="20px"
  background="#f0f9ff"
  border="1px solid #38bdf8"
  radius="8px"
  shadow="md"
>
  <div>样式定制容器</div>
</ui-container>`)

const overflowCode = ref(`<ui-container
  height="100px"
  padding="16px"
  overflow="auto"
  border="1px solid #ddd"
  radius="4px"
>
  <div>
    <p>这是一个内容溢出的例子。</p>
    <p>当内容超出容器高度时会出现滚动条。</p>
    <p>你可以尝试滚动查看全部内容。</p>
    <p>这是更多的内容...</p>
    <p>再多一些内容...</p>
    <p>最后一行内容。</p>
  </div>
</ui-container>`)

const nestedCode = ref(`<ui-container
  padding="16px"
  background="#f8fafc"
  border="1px solid #e2e8f0"
  radius="8px"
  shadow="sm"
>
  <h3 class="mb-4 text-lg font-medium">嵌套容器</h3>

  <ui-container
    direction="horizontal"
    padding="12px"
    background="#fff"
    border="1px dashed #cbd5e1"
    radius="4px"
  >
    <ui-container
      width="40%"
      padding="8px"
      background="#eff6ff"
      radius="4px"
    >
      <div>左侧区域</div>
    </ui-container>

    <ui-container
      width="60%"
      padding="8px"
      background="#f0fdf4"
      radius="4px"
    >
      <div>右侧区域</div>
    </ui-container>
  </ui-container>
</ui-container>`)
</script>

<template>
  <div class="demo-container">
    <h2 class="mb-6 text-2xl font-bold">
      Container 容器组件
    </h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        基础用法
      </h3>
      <div class="demo-block">
        <ui-container padding="16px">
          <div>基础容器组件</div>
        </ui-container>
      </div>
      <div class="demo-code">
        <pre><code>{{ basicCode }}</code></pre>
      </div>
    </div>

    <!-- 布局方向 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        布局方向
      </h3>
      <div class="demo-block">
        <ui-container direction="horizontal" padding="16px">
          <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
            水平项目 1
          </div>
          <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
            水平项目 2
          </div>
        </ui-container>

        <ui-container direction="vertical" padding="16px" class="mt-4">
          <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
            垂直项目 1
          </div>
          <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
            垂直项目 2
          </div>
        </ui-container>
      </div>
      <div class="demo-code">
        <pre><code>{{ directionCode }}</code></pre>
      </div>
    </div>

    <!-- 样式定制 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        样式定制
      </h3>
      <div class="demo-block">
        <ui-container
          padding="20px"
          background="#f0f9ff"
          border="1px solid #38bdf8"
          radius="8px"
          shadow="md"
        >
          <div>样式定制容器</div>
        </ui-container>
      </div>
      <div class="demo-code">
        <pre><code>{{ styleCode }}</code></pre>
      </div>
    </div>

    <!-- 溢出处理 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        溢出处理
      </h3>
      <div class="demo-block">
        <ui-container
          height="100px"
          padding="16px"
          overflow="auto"
          border="1px solid #ddd"
          radius="4px"
        >
          <div>
            <p>这是一个内容溢出的例子。</p>
            <p>当内容超出容器高度时会出现滚动条。</p>
            <p>你可以尝试滚动查看全部内容。</p>
            <p>这是更多的内容...</p>
            <p>再多一些内容...</p>
            <p>最后一行内容。</p>
          </div>
        </ui-container>
      </div>
      <div class="demo-code">
        <pre><code>{{ overflowCode }}</code></pre>
      </div>
    </div>

    <!-- 嵌套容器 -->
    <div class="demo-section">
      <h3 class="mb-4 text-xl font-medium">
        嵌套容器
      </h3>
      <div class="demo-block">
        <ui-container
          padding="16px"
          background="#f8fafc"
          border="1px solid #e2e8f0"
          radius="8px"
          shadow="sm"
        >
          <h3 class="mb-4 text-lg font-medium">
            嵌套容器
          </h3>

          <ui-container
            direction="horizontal"
            padding="12px"
            background="#fff"
            border="1px dashed #cbd5e1"
            radius="4px"
          >
            <ui-container
              width="40%"
              padding="8px"
              background="#eff6ff"
              radius="4px"
            >
              <div>左侧区域</div>
            </ui-container>

            <ui-container
              width="60%"
              padding="8px"
              background="#f0fdf4"
              radius="4px"
            >
              <div>右侧区域</div>
            </ui-container>
          </ui-container>
        </ui-container>
      </div>
      <div class="demo-code">
        <pre><code>{{ nestedCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
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
