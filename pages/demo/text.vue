<script setup lang="ts" name="DemoText">
/**
 * 文本组件演示页面
 * 创建日期: 2023-12-05
 * 作者: aiftt
 *
 * 展示文本组件的基本用法以及v-bind + CSS变量实现的自定义样式
 */

// 控制自定义文本属性
const customColor = ref('#8b5cf6')

// 示例代码
const typeTextCode = `
<ui-typography-text>默认文本</ui-typography-text>
<ui-typography-text type="primary">主要文本</ui-typography-text>
<ui-typography-text type="success">成功文本</ui-typography-text>
<ui-typography-text type="warning">警告文本</ui-typography-text>
<ui-typography-text type="danger">危险文本</ui-typography-text>
<ui-typography-text type="secondary">次要文本</ui-typography-text>
`

const sizeTextCode = `
<ui-typography-text size="small">小型文本</ui-typography-text>
<ui-typography-text>默认文本</ui-typography-text>
<ui-typography-text size="large">大型文本</ui-typography-text>
`

const styleTextCode = `
<ui-typography-text bold>加粗文本</ui-typography-text>
<ui-typography-text italic>斜体文本</ui-typography-text>
<ui-typography-text underline>下划线文本</ui-typography-text>
<ui-typography-text del>删除线文本</ui-typography-text>
<ui-typography-text mark>标记文本</ui-typography-text>
<ui-typography-text code>代码文本</ui-typography-text>
`

const ellipsisTextCode = `
<ui-typography-text ellipsis class="max-width-200">这是一段很长的文本，超出部分会自动省略显示...</ui-typography-text>
<ui-typography-text ellipsis :lines="2" class="max-width-200">这是一段很长的文本，设置了显示2行，超出部分会自动省略。这是为了测试多行省略的效果而添加的额外内容。</ui-typography-text>
`

const copyableTextCode = `
<ui-typography-text copyable>点击右侧图标可复制此文本</ui-typography-text>
`

const customColorTextCode = `
<ui-typography-text :color="customColor">自定义颜色文本</ui-typography-text>
`
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">
      文本组件演示
    </h1>
    <p class="demo-description">
      展示文本组件的基本用法以及v-bind + CSS变量实现的自定义样式
    </p>

    <section class="demo-section">
      <h2 class="section-title">
        文本类型
      </h2>
      <div class="text-group">
        <div><ui-typography-text>默认文本</ui-typography-text></div>
        <div>
          <ui-typography-text type="primary">
            主要文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text type="success">
            成功文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text type="warning">
            警告文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text type="danger">
            危险文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text type="secondary">
            次要文本
          </ui-typography-text>
        </div>
      </div>
      <div class="code-block">
        <pre><code>{{ typeTextCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        文本大小
      </h2>
      <div class="text-group">
        <div>
          <ui-typography-text size="small">
            小型文本
          </ui-typography-text>
        </div>
        <div><ui-typography-text>默认文本</ui-typography-text></div>
        <div>
          <ui-typography-text size="large">
            大型文本
          </ui-typography-text>
        </div>
      </div>
      <div class="code-block">
        <pre><code>{{ sizeTextCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        文本样式
      </h2>
      <div class="text-group">
        <div>
          <ui-typography-text bold>
            加粗文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text italic>
            斜体文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text underline>
            下划线文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text del>
            删除线文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text mark>
            标记文本
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text code>
            代码文本
          </ui-typography-text>
        </div>
      </div>
      <div class="code-block">
        <pre><code>{{ styleTextCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        文本省略
      </h2>
      <div class="text-group">
        <div>
          <ui-typography-text ellipsis class="max-width-200">
            这是一段很长的文本，超出部分会自动省略显示...
          </ui-typography-text>
        </div>
        <div>
          <ui-typography-text ellipsis :lines="2" class="max-width-200">
            这是一段很长的文本，设置了显示2行，超出部分会自动省略。这是为了测试多行省略的效果而添加的额外内容。
          </ui-typography-text>
        </div>
      </div>
      <div class="code-block">
        <pre><code>{{ ellipsisTextCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        可复制文本
      </h2>
      <div class="text-group">
        <div>
          <ui-typography-text copyable>
            点击右侧图标可复制此文本
          </ui-typography-text>
        </div>
      </div>
      <div class="code-block">
        <pre><code>{{ copyableTextCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        自定义颜色 (v-bind + CSS变量)
      </h2>
      <div class="text-group">
        <div>
          <ui-typography-text :color="customColor">
            自定义颜色文本
          </ui-typography-text>
        </div>
      </div>

      <div class="controls-panel">
        <div class="control-group">
          <label>文本颜色:</label>
          <input v-model="customColor" type="color">
        </div>
      </div>

      <div class="code-block">
        <pre><code>{{ customColorTextCode }}</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.demo-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
}

.demo-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #4b5563;
}

.demo-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.text-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.controls-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group label {
  font-size: 0.875rem;
  color: #4b5563;
}

.control-group input {
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.max-width-200 {
  max-width: 200px;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .demo-title {
    color: #f9fafb;
  }

  .demo-description {
    color: #d1d5db;
  }

  .section-title {
    color: #f3f4f6;
  }

  .demo-section {
    border-color: #374151;
  }

  .controls-panel {
    background-color: #1f2937;
  }

  .control-group label {
    color: #d1d5db;
  }

  .control-group input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}
</style>
