<script setup lang="ts" name="DemoDivider">
/**
 * 分割线组件示例
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { ref } from 'vue'

// 示例代码
const basicCode = `<ui-divider />

<ui-divider direction="vertical" />`

const withTextCode = `<ui-divider withText>中间文字</ui-divider>

<ui-divider withText textPosition="left">左侧文字</ui-divider>

<ui-divider withText textPosition="right">右侧文字</ui-divider>`

const typeCode = `<ui-divider type="solid" />

<ui-divider type="dashed" />

<ui-divider type="dotted" />`

const colorCode = `<ui-divider color="#3b82f6" />

<ui-divider withText color="#10b981">自定义颜色</ui-divider>`

// 是否显示代码
const showCode = ref({
  basic: false,
  withText: false,
  type: false,
  color: false,
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
        默认为水平分割线，可以通过设置 direction="vertical" 显示垂直分割线
      </p>
      <div class="demo-section-content">
        <div class="demo-divider-container">
          <ui-typography-paragraph>
            上面的内容
          </ui-typography-paragraph>

          <ui-divider />

          <ui-typography-paragraph>
            下面的内容
          </ui-typography-paragraph>
        </div>

        <div class="demo-divider-vertical-container">
          <span>文本</span>
          <ui-divider direction="vertical" />
          <span>文本</span>
          <ui-divider direction="vertical" />
          <span>文本</span>
        </div>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('basic')">
          {{ showCode.basic ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.basic" class="demo-code">
        <pre><code>{{ basicCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        带文字的分割线
      </h3>
      <p class="demo-section-desc">
        可以在分割线中间、左侧或右侧添加文字
      </p>
      <div class="demo-section-content">
        <ui-divider with-text>
          中间文字
        </ui-divider>
        <ui-divider with-text text-position="left">
          左侧文字
        </ui-divider>
        <ui-divider with-text text-position="right">
          右侧文字
        </ui-divider>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('withText')">
          {{ showCode.withText ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.withText" class="demo-code">
        <pre><code>{{ withTextCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        不同类型的分割线
      </h3>
      <p class="demo-section-desc">
        支持实线、虚线和点线三种类型
      </p>
      <div class="demo-section-content">
        <ui-divider type="solid" />
        <ui-typography-paragraph>实线（默认）</ui-typography-paragraph>

        <ui-divider type="dashed" />
        <ui-typography-paragraph>虚线</ui-typography-paragraph>

        <ui-divider type="dotted" />
        <ui-typography-paragraph>点线</ui-typography-paragraph>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('type')">
          {{ showCode.type ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.type" class="demo-code">
        <pre><code>{{ typeCode }}</code></pre>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        自定义颜色
      </h3>
      <p class="demo-section-desc">
        可以自定义分割线的颜色
      </p>
      <div class="demo-section-content">
        <ui-divider color="#3b82f6" />
        <ui-typography-paragraph>蓝色分割线</ui-typography-paragraph>

        <ui-divider with-text color="#10b981">
          绿色分割线
        </ui-divider>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('color')">
          {{ showCode.color ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.color" class="demo-code">
        <pre><code>{{ colorCode }}</code></pre>
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
            <td>direction</td>
            <td>分割线方向</td>
            <td>'horizontal' | 'vertical'</td>
            <td>'horizontal'</td>
          </tr>
          <tr>
            <td>withText</td>
            <td>是否带有文字</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>textPosition</td>
            <td>文字位置</td>
            <td>'left' | 'center' | 'right'</td>
            <td>'center'</td>
          </tr>
          <tr>
            <td>type</td>
            <td>分割线类型</td>
            <td>'solid' | 'dashed' | 'dotted'</td>
            <td>'solid'</td>
          </tr>
          <tr>
            <td>color</td>
            <td>分割线颜色</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>width</td>
            <td>分割线宽度</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>margin</td>
            <td>分割线上下margin</td>
            <td>string</td>
            <td>'1rem'</td>
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
  margin-bottom: 1rem;
}

.demo-divider-container {
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.demo-divider-vertical-container {
  display: flex;
  align-items: center;
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
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
