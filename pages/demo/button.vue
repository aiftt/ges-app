<script setup lang="ts" name="DemoButton">
/**
 * 按钮组件演示页面
 * 创建日期: 2023-12-05
 * 作者: aiftt
 *
 * 展示按钮组件的基本用法以及v-bind + CSS变量实现的自定义样式
 */

// 控制自定义按钮属性
const customBgColor = ref('#8b5cf6')
const customTextColor = ref('#ffffff')
const customRadius = ref('0.5rem')
const customBorderColor = ref('#7c3aed')
const customHoverBgColor = ref('#7c3aed')

// 示例代码
const basicButtonCode = `
<ui-button>默认按钮</ui-button>
<ui-button type="primary">主要按钮</ui-button>
<ui-button type="success">成功按钮</ui-button>
<ui-button type="warning">警告按钮</ui-button>
<ui-button type="danger">危险按钮</ui-button>
<ui-button type="info">信息按钮</ui-button>
`

const sizeButtonCode = `
<ui-button size="small">小型按钮</ui-button>
<ui-button>默认按钮</ui-button>
<ui-button size="large">大型按钮</ui-button>
`

const iconButtonCode = `
<ui-button icon="carbon:add">带图标按钮</ui-button>
<ui-button icon="carbon:search"></ui-button>
<ui-button icon="carbon:notification" circle></ui-button>
`

const stateButtonCode = `
<ui-button disabled>禁用按钮</ui-button>
<ui-button loading>加载按钮</ui-button>
`

const customButtonCode = `
<ui-button
  bg-color="#8b5cf6"
  text-color="#ffffff"
  radius="0.5rem"
  border-color="#7c3aed"
  hover-bg-color="#7c3aed"
>
  自定义按钮
</ui-button>
`
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">
      按钮组件演示
    </h1>
    <p class="demo-description">
      展示按钮组件的基本用法以及v-bind + CSS变量实现的自定义样式
    </p>

    <section class="demo-section">
      <h2 class="section-title">
        按钮类型
      </h2>
      <div class="button-group">
        <ui-button>默认按钮</ui-button>
        <ui-button type="primary">
          主要按钮
        </ui-button>
        <ui-button type="success">
          成功按钮
        </ui-button>
        <ui-button type="warning">
          警告按钮
        </ui-button>
        <ui-button type="danger">
          危险按钮
        </ui-button>
        <ui-button type="info">
          信息按钮
        </ui-button>
      </div>
      <div class="code-block">
        <pre><code>{{ basicButtonCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        按钮尺寸
      </h2>
      <div class="button-group">
        <ui-button size="small">
          小型按钮
        </ui-button>
        <ui-button>默认按钮</ui-button>
        <ui-button size="large">
          大型按钮
        </ui-button>
      </div>
      <div class="code-block">
        <pre><code>{{ sizeButtonCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        图标按钮
      </h2>
      <div class="button-group">
        <ui-button icon="carbon:add">
          带图标按钮
        </ui-button>
        <ui-button icon="carbon:search" />
        <ui-button icon="carbon:notification" circle />
      </div>
      <div class="code-block">
        <pre><code>{{ iconButtonCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        按钮状态
      </h2>
      <div class="button-group">
        <ui-button disabled>
          禁用按钮
        </ui-button>
        <ui-button loading>
          加载按钮
        </ui-button>
      </div>
      <div class="code-block">
        <pre><code>{{ stateButtonCode }}</code></pre>
      </div>
    </section>

    <section class="demo-section">
      <h2 class="section-title">
        自定义样式 (v-bind + CSS变量)
      </h2>
      <div class="button-group">
        <ui-button
          :bg-color="customBgColor"
          :text-color="customTextColor"
          :radius="customRadius"
          :border-color="customBorderColor"
          :hover-bg-color="customHoverBgColor"
        >
          自定义按钮
        </ui-button>
      </div>

      <div class="controls-panel">
        <div class="control-group">
          <label>背景颜色:</label>
          <input v-model="customBgColor" type="color">
        </div>
        <div class="control-group">
          <label>文字颜色:</label>
          <input v-model="customTextColor" type="color">
        </div>
        <div class="control-group">
          <label>圆角大小:</label>
          <input v-model="customRadius" type="text">
        </div>
        <div class="control-group">
          <label>边框颜色:</label>
          <input v-model="customBorderColor" type="color">
        </div>
        <div class="control-group">
          <label>悬停背景色:</label>
          <input v-model="customHoverBgColor" type="color">
        </div>
      </div>

      <div class="code-block">
        <pre><code>{{ customButtonCode }}</code></pre>
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

.button-group {
  display: flex;
  flex-wrap: wrap;
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
