<script setup lang="ts" name="DemoIcon">
/**
 * 图标组件示例
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { ref } from 'vue'

// 常用图标示例
const commonIcons = [
  { name: 'home', icon: 'carbon:home' },
  { name: 'search', icon: 'carbon:search' },
  { name: 'user', icon: 'carbon:user' },
  { name: 'settings', icon: 'carbon:settings' },
  { name: 'notification', icon: 'carbon:notification' },
  { name: 'menu', icon: 'carbon:menu' },
  { name: 'add', icon: 'carbon:add' },
  { name: 'edit', icon: 'carbon:edit' },
  { name: 'delete', icon: 'carbon:delete' },
  { name: 'cloud', icon: 'carbon:cloud' },
  { name: 'download', icon: 'carbon:download' },
  { name: 'upload', icon: 'carbon:upload' },
]

// 示例代码
const iconBasicCode = `<ui-icon icon="carbon:home" />
<ui-icon icon="carbon:search" />
<ui-icon icon="carbon:settings" />`

const iconSizeCode = `<ui-icon icon="carbon:home" size="small" />
<ui-icon icon="carbon:home" />
<ui-icon icon="carbon:home" size="large" />
<ui-icon icon="carbon:home" size="2.5rem" />`

const iconColorCode = `<ui-icon icon="carbon:home" color="#3b82f6" />
<ui-icon icon="carbon:home" color="#10b981" />
<ui-icon icon="carbon:home" color="#f59e0b" />
<ui-icon icon="carbon:home" color="#ef4444" />`

const iconSpinCode = '<ui-icon icon="carbon:refresh" spin />'

// 是否显示代码
const showCode = ref({
  basic: false,
  size: false,
  color: false,
  spin: false,
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
        使用icon属性指定图标名称
      </p>
      <div class="demo-section-content">
        <ui-icon icon="carbon:home" />
        <ui-icon icon="carbon:search" />
        <ui-icon icon="carbon:settings" />
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('basic')">
          {{ showCode.basic ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.basic" class="demo-code">
        <pre><code>{{ iconBasicCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        图标尺寸
      </h3>
      <p class="demo-section-desc">
        使用size属性设置图标大小，可以是预设值或具体尺寸
      </p>
      <div class="demo-section-content">
        <ui-icon icon="carbon:home" size="small" />
        <ui-icon icon="carbon:home" />
        <ui-icon icon="carbon:home" size="large" />
        <ui-icon icon="carbon:home" size="2.5rem" />
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('size')">
          {{ showCode.size ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.size" class="demo-code">
        <pre><code>{{ iconSizeCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        图标颜色
      </h3>
      <p class="demo-section-desc">
        使用color属性设置图标颜色
      </p>
      <div class="demo-section-content">
        <ui-icon icon="carbon:home" color="#3b82f6" />
        <ui-icon icon="carbon:home" color="#10b981" />
        <ui-icon icon="carbon:home" color="#f59e0b" />
        <ui-icon icon="carbon:home" color="#ef4444" />
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('color')">
          {{ showCode.color ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.color" class="demo-code">
        <pre><code>{{ iconColorCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        旋转动画
      </h3>
      <p class="demo-section-desc">
        使用spin属性让图标旋转
      </p>
      <div class="demo-section-content">
        <ui-icon icon="carbon:refresh" spin />
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('spin')">
          {{ showCode.spin ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.spin" class="demo-code">
        <pre><code>{{ iconSpinCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        常用图标
      </h3>
      <p class="demo-section-desc">
        以下是一些常用的图标示例
      </p>
      <div class="demo-icon-grid">
        <div v-for="icon in commonIcons" :key="icon.name" class="demo-icon-item">
          <ui-icon :icon="icon.icon" />
          <div class="demo-icon-name">
            {{ icon.name }}
          </div>
          <div class="demo-icon-key">
            {{ icon.icon }}
          </div>
        </div>
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
            <td>icon</td>
            <td>图标名称（Iconify格式）</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>size</td>
            <td>图标尺寸</td>
            <td>'small' | 'default' | 'large' | string</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>color</td>
            <td>图标颜色</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>spin</td>
            <td>是否旋转图标</td>
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

.demo-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.demo-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  transition: all 0.2s;
}

.demo-icon-item:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.demo-icon-name {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-icon-key {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-text-color-secondary, #6b7280);
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

.dark .demo-icon-item {
  border-color: var(--ui-border-color, #374151);
}
</style>
