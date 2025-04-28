<script setup lang="ts" name="DemoButton">
/**
 * 按钮组件示例
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { ref } from 'vue'

// 示例代码
const buttonBasicCode = `<ui-button>默认按钮</ui-button>
<ui-button type="primary">主要按钮</ui-button>
<ui-button type="success">成功按钮</ui-button>
<ui-button type="warning">警告按钮</ui-button>
<ui-button type="danger">危险按钮</ui-button>`

const buttonSizeCode = `<ui-button size="small">小型按钮</ui-button>
<ui-button>默认大小</ui-button>
<ui-button size="large">大型按钮</ui-button>`

const buttonDisabledCode = `<ui-button disabled>禁用状态</ui-button>
<ui-button type="primary" disabled>禁用状态</ui-button>`

const buttonIconCode = `<ui-button icon="carbon:add">添加</ui-button>
<ui-button icon="carbon:search" type="primary">搜索</ui-button>
<ui-button icon="carbon:arrow-right" type="success" />
<ui-button icon="carbon:close" type="danger" circle />`

const buttonLoadingCode = `<ui-button loading>加载中</ui-button>
<ui-button type="primary" loading>加载中</ui-button>`

// 是否显示代码
const showCode = ref({
  basic: false,
  size: false,
  disabled: false,
  icon: false,
  loading: false,
})

// 切换代码显示
function toggleCode(section) {
  showCode.value[section] = !showCode.value[section]
}
</script>

<template>
  <div class="demo-component">
    <div class="demo-section">
      <h3 class="demo-section-title">
        基础用法
      </h3>
      <p class="demo-section-desc">
        按钮有五种类型：默认、主要、成功、警告和危险
      </p>
      <div class="demo-section-content">
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
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('basic')">
          {{ showCode.basic ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.basic" class="demo-code">
        <pre><code>{{ buttonBasicCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        按钮尺寸
      </h3>
      <p class="demo-section-desc">
        按钮有三种尺寸：小型、默认和大型
      </p>
      <div class="demo-section-content">
        <ui-button size="small">
          小型按钮
        </ui-button>
        <ui-button>默认大小</ui-button>
        <ui-button size="large">
          大型按钮
        </ui-button>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('size')">
          {{ showCode.size ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.size" class="demo-code">
        <pre><code>{{ buttonSizeCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        禁用状态
      </h3>
      <p class="demo-section-desc">
        按钮在禁用状态下不可点击
      </p>
      <div class="demo-section-content">
        <ui-button disabled>
          禁用状态
        </ui-button>
        <ui-button type="primary" disabled>
          禁用状态
        </ui-button>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('disabled')">
          {{ showCode.disabled ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.disabled" class="demo-code">
        <pre><code>{{ buttonDisabledCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        图标按钮
      </h3>
      <p class="demo-section-desc">
        带图标的按钮可以增强按钮的可识别性
      </p>
      <div class="demo-section-content">
        <ui-button icon="carbon:add">
          添加
        </ui-button>
        <ui-button icon="carbon:search" type="primary">
          搜索
        </ui-button>
        <ui-button icon="carbon:arrow-right" type="success" />
        <ui-button icon="carbon:close" type="danger" circle />
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('icon')">
          {{ showCode.icon ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.icon" class="demo-code">
        <pre><code>{{ buttonIconCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        加载状态
      </h3>
      <p class="demo-section-desc">
        用于异步操作等待时，在按钮上显示加载状态
      </p>
      <div class="demo-section-content">
        <ui-button loading>
          加载中
        </ui-button>
        <ui-button type="primary" loading>
          加载中
        </ui-button>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('loading')">
          {{ showCode.loading ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.loading" class="demo-code">
        <pre><code>{{ buttonLoadingCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        API 参考
      </h3>
      <table class="demo-api-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>type</td>
            <td>按钮类型</td>
            <td>'default' | 'primary' | 'success' | 'warning' | 'danger'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>size</td>
            <td>按钮尺寸</td>
            <td>'small' | 'default' | 'large'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>图标名称</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>loading</td>
            <td>是否显示加载状态</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>circle</td>
            <td>是否为圆形按钮</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-component {
  width: 100%;
}

.demo-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
  padding-bottom: 1.5rem;
}

.demo-section:last-child {
  border-bottom: none;
}

.demo-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.demo-section-desc {
  color: var(--ui-text-color-secondary, #6b7280);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.demo-section-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.demo-code-control {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.demo-code-button {
  background: none;
  border: none;
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.demo-code-button:hover {
  text-decoration: underline;
}

.demo-code {
  background-color: var(--ui-code-bg, #f3f4f6);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--ui-code-color, #1f2937);
}

.demo-api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.demo-api-table th,
.demo-api-table td {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  padding: 0.75rem 1rem;
  text-align: left;
}

.demo-api-table th {
  background-color: var(--ui-table-header-bg, #f9fafb);
  font-weight: 600;
}

.demo-api-table tr:nth-child(even) {
  background-color: var(--ui-table-stripe-bg, #f3f4f6);
}

.dark .demo-code {
  --ui-code-bg: #1f2937;
  --ui-code-color: #e5e7eb;
}

.dark .demo-api-table th {
  --ui-table-header-bg: #111827;
}

.dark .demo-api-table tr:nth-child(even) {
  --ui-table-stripe-bg: #1f2937;
}
</style>
