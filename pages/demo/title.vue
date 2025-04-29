<script setup lang="ts" name="DemoTitle">
/**
 * 标题组件演示页面
 * 创建日期: 2023-12-05
 * 作者: aiftt
 *
 * 展示标题组件的基本用法以及v-bind + CSS变量实现的自定义样式
 */

// 控制自定义标题属性
const customColor = ref('#8b5cf6')

// 示例代码
const levelTitleCode = `
<ui-typography-title level="1">H1 标题</ui-typography-title>
<ui-typography-title level="2">H2 标题</ui-typography-title>
<ui-typography-title level="3">H3 标题</ui-typography-title>
<ui-typography-title level="4">H4 标题</ui-typography-title>
<ui-typography-title level="5">H5 标题</ui-typography-title>
<ui-typography-title level="6">H6 标题</ui-typography-title>
`

const typeTitleCode = `
<ui-typography-title>默认标题</ui-typography-title>
<ui-typography-title type="primary">主要标题</ui-typography-title>
<ui-typography-title type="success">成功标题</ui-typography-title>
<ui-typography-title type="warning">警告标题</ui-typography-title>
<ui-typography-title type="danger">危险标题</ui-typography-title>
`

const weightTitleCode = `
<ui-typography-title weight="light">细体标题</ui-typography-title>
<ui-typography-title weight="normal">常规标题</ui-typography-title>
<ui-typography-title weight="medium">中等标题</ui-typography-title>
<ui-typography-title weight="semibold">半粗标题</ui-typography-title>
<ui-typography-title weight="bold">粗体标题</ui-typography-title>
`

const alignTitleCode = `
<ui-typography-title align="left">左对齐标题</ui-typography-title>
<ui-typography-title align="center">居中对齐标题</ui-typography-title>
<ui-typography-title align="right">右对齐标题</ui-typography-title>
`

const interactiveTitleCode = `
<ui-typography-title hoverable>可悬停标题</ui-typography-title>
<ui-typography-title copyable>可复制标题</ui-typography-title>
<ui-typography-title ellipsis>这是一个会自动省略的超长标题文本，当文本内容超出容器宽度时会显示省略号</ui-typography-title>
`

const customColorTitleCode = `
<ui-typography-title :color="customColor">自定义颜色标题</ui-typography-title>
`
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">
      标题组件演示
    </h1>
    <p class="demo-description">
      展示标题组件的基本用法以及v-bind + CSS变量实现的自定义样式
    </p>

    <section class="demo-section">
      <h2 class="section-title">
        标题级别
      </h2>
      <div class="title-group">
        <ui-typography-title level="1">
          H1 标题
        </ui-typography-title>
        <ui-typography-title level="2">
          H2 标题
        </ui-typography-title>
        <ui-typography-title level="3">
          H3 标题
        </ui-typography-title>
        <ui-typography-title level="4">
          H4 标题
        </ui-typography-title>
        <ui-typography-title level="5">
          H5 标题
        </ui-typography-title>
        <ui-typography-title level="6">
          H6 标题
        </ui-typography-title>
      </div>
      <div class="code-block">
        <pre><code>{{ levelTitleCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        标题类型
      </h2>
      <div class="title-group">
        <ui-typography-title level="3">
          默认标题
        </ui-typography-title>
        <ui-typography-title level="3" type="primary">
          主要标题
        </ui-typography-title>
        <ui-typography-title level="3" type="success">
          成功标题
        </ui-typography-title>
        <ui-typography-title level="3" type="warning">
          警告标题
        </ui-typography-title>
        <ui-typography-title level="3" type="danger">
          危险标题
        </ui-typography-title>
      </div>
      <div class="code-block">
        <pre><code>{{ typeTitleCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        标题粗细
      </h2>
      <div class="title-group">
        <ui-typography-title level="3" weight="light">
          细体标题
        </ui-typography-title>
        <ui-typography-title level="3" weight="normal">
          常规标题
        </ui-typography-title>
        <ui-typography-title level="3" weight="medium">
          中等标题
        </ui-typography-title>
        <ui-typography-title level="3" weight="semibold">
          半粗标题
        </ui-typography-title>
        <ui-typography-title level="3" weight="bold">
          粗体标题
        </ui-typography-title>
      </div>
      <div class="code-block">
        <pre><code>{{ weightTitleCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        标题对齐
      </h2>
      <div class="title-group">
        <ui-typography-title level="3" align="left">
          左对齐标题
        </ui-typography-title>
        <ui-typography-title level="3" align="center">
          居中对齐标题
        </ui-typography-title>
        <ui-typography-title level="3" align="right">
          右对齐标题
        </ui-typography-title>
      </div>
      <div class="code-block">
        <pre><code>{{ alignTitleCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        交互标题
      </h2>
      <div class="title-group">
        <ui-typography-title level="3" hoverable>
          可悬停标题
        </ui-typography-title>
        <ui-typography-title level="3" copyable>
          可复制标题
        </ui-typography-title>
        <ui-typography-title level="3" ellipsis class="max-width-500">
          这是一个会自动省略的超长标题文本，当文本内容超出容器宽度时会显示省略号
        </ui-typography-title>
      </div>
      <div class="code-block">
        <pre><code>{{ interactiveTitleCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        自定义颜色 (v-bind + CSS变量)
      </h2>
      <div class="title-group">
        <ui-typography-title level="3" :color="customColor">
          自定义颜色标题
        </ui-typography-title>
      </div>

      <div class="controls-panel">
        <div class="control-group">
          <label>标题颜色:</label>
          <input v-model="customColor" type="color">
        </div>
      </div>

      <div class="code-block">
        <pre><code>{{ customColorTitleCode }}</code></pre>
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

.title-group {
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

.max-width-500 {
  max-width: 500px;
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
