<script setup lang="ts" name="DemoParagraph">
/**
 * 段落组件演示页面
 * 创建日期: 2023-12-05
 * 作者: aiftt
 *
 * 展示段落组件的基本用法以及v-bind + CSS变量实现的自定义样式
 */

// 控制自定义段落属性
const customColor = ref('#8b5cf6')

// 示例代码
const typeParagraphCode = `
<ui-typography-paragraph>默认段落文本</ui-typography-paragraph>
<ui-typography-paragraph type="primary">主要段落文本</ui-typography-paragraph>
<ui-typography-paragraph type="success">成功段落文本</ui-typography-paragraph>
<ui-typography-paragraph type="warning">警告段落文本</ui-typography-paragraph>
<ui-typography-paragraph type="danger">危险段落文本</ui-typography-paragraph>
<ui-typography-paragraph type="secondary">次要段落文本</ui-typography-paragraph>
`

const sizeParagraphCode = `
<ui-typography-paragraph size="small">小型段落文本</ui-typography-paragraph>
<ui-typography-paragraph>默认段落文本</ui-typography-paragraph>
<ui-typography-paragraph size="large">大型段落文本</ui-typography-paragraph>
`

const spacingParagraphCode = `
<ui-typography-paragraph spacing="small">间距小的段落</ui-typography-paragraph>
<ui-typography-paragraph>默认间距的段落</ui-typography-paragraph>
<ui-typography-paragraph spacing="large">间距大的段落</ui-typography-paragraph>
`

const alignParagraphCode = `
<ui-typography-paragraph align="left">左对齐段落文本</ui-typography-paragraph>
<ui-typography-paragraph align="center">居中对齐段落文本</ui-typography-paragraph>
<ui-typography-paragraph align="right">右对齐段落文本</ui-typography-paragraph>
<ui-typography-paragraph align="justify">两端对齐段落文本。这是一段较长的文本，用来演示两端对齐的效果。当文本很长时，两端对齐会使得文本的左右边缘都与容器对齐，增强了阅读体验和视觉美感。</ui-typography-paragraph>
`

const styleParagraphCode = `
<ui-typography-paragraph bold>加粗段落文本</ui-typography-paragraph>
<ui-typography-paragraph italic>斜体段落文本</ui-typography-paragraph>
`

const ellipsisParagraphCode = `
<ui-typography-paragraph ellipsis class="max-width-500">这是一段很长的文本，超出部分会自动省略显示。当文本内容超过容器宽度时，将不再显示超出部分，而是以省略号替代。</ui-typography-paragraph>
<ui-typography-paragraph ellipsis :lines="2" class="max-width-500">这是一段很长的文本，设置了显示2行，超出部分会自动省略。这是为了测试多行省略的效果而添加的额外内容。当文本内容超过两行时，将不再显示超出部分，而是以省略号替代。</ui-typography-paragraph>
`

const copyableParagraphCode = `
<ui-typography-paragraph copyable>点击右侧图标可复制此段落文本</ui-typography-paragraph>
`

const customColorParagraphCode = `
<ui-typography-paragraph :color="customColor">自定义颜色段落文本</ui-typography-paragraph>
`
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">
      段落组件演示
    </h1>
    <p class="demo-description">
      展示段落组件的基本用法以及v-bind + CSS变量实现的自定义样式
    </p>

    <section class="demo-section">
      <h2 class="section-title">
        段落类型
      </h2>
      <div class="content-group">
        <ui-typography-paragraph>默认段落文本</ui-typography-paragraph>
        <ui-typography-paragraph type="primary">
          主要段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph type="success">
          成功段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph type="warning">
          警告段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph type="danger">
          危险段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph type="secondary">
          次要段落文本
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ typeParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        段落大小
      </h2>
      <div class="content-group">
        <ui-typography-paragraph size="small">
          小型段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph>默认段落文本</ui-typography-paragraph>
        <ui-typography-paragraph size="large">
          大型段落文本
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ sizeParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        段落间距
      </h2>
      <div class="content-group">
        <ui-typography-paragraph spacing="small">
          间距小的段落
        </ui-typography-paragraph>
        <ui-typography-paragraph>默认间距的段落</ui-typography-paragraph>
        <ui-typography-paragraph spacing="large">
          间距大的段落
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ spacingParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        段落对齐
      </h2>
      <div class="content-group">
        <ui-typography-paragraph align="left">
          左对齐段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph align="center">
          居中对齐段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph align="right">
          右对齐段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph align="justify">
          两端对齐段落文本。这是一段较长的文本，用来演示两端对齐的效果。当文本很长时，两端对齐会使得文本的左右边缘都与容器对齐，增强了阅读体验和视觉美感。
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ alignParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        段落样式
      </h2>
      <div class="content-group">
        <ui-typography-paragraph bold>
          加粗段落文本
        </ui-typography-paragraph>
        <ui-typography-paragraph italic>
          斜体段落文本
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ styleParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        段落省略
      </h2>
      <div class="content-group">
        <ui-typography-paragraph ellipsis class="max-width-500">
          这是一段很长的文本，超出部分会自动省略显示。当文本内容超过容器宽度时，将不再显示超出部分，而是以省略号替代。
        </ui-typography-paragraph>
        <ui-typography-paragraph ellipsis :lines="2" class="max-width-500">
          这是一段很长的文本，设置了显示2行，超出部分会自动省略。这是为了测试多行省略的效果而添加的额外内容。当文本内容超过两行时，将不再显示超出部分，而是以省略号替代。
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ ellipsisParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        可复制段落
      </h2>
      <div class="content-group">
        <ui-typography-paragraph copyable>
          点击右侧图标可复制此段落文本
        </ui-typography-paragraph>
      </div>
      <div class="code-block">
        <pre><code>{{ copyableParagraphCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        自定义颜色 (v-bind + CSS变量)
      </h2>
      <div class="content-group">
        <ui-typography-paragraph :color="customColor">
          自定义颜色段落文本
        </ui-typography-paragraph>
      </div>

      <div class="controls-panel">
        <div class="control-group">
          <label>段落颜色:</label>
          <input v-model="customColor" type="color">
        </div>
      </div>

      <div class="code-block">
        <pre><code>{{ customColorParagraphCode }}</code></pre>
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

.content-group {
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
