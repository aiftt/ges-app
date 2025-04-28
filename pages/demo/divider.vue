<script setup lang="ts">
/**
 * Divider分割线组件演示页面
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { ref } from 'vue'

// 基础用法代码
const basicCode = ref(`<ui-divider />

<div>上方内容</div>
<ui-divider />
<div>下方内容</div>`)

// 带文本的分割线代码
const withTextCode = ref(`<ui-divider with-text>默认居中文本</ui-divider>

<ui-divider with-text text-position="left">左侧文本</ui-divider>

<ui-divider with-text text-position="right">右侧文本</ui-divider>`)

// 垂直分割线代码
const verticalCode = ref(`<div style="height: 50px; display: flex; align-items: center;">
  文本
  <ui-divider direction="vertical" />
  文本
  <ui-divider direction="vertical" />
  文本
</div>`)

// 不同类型的分割线代码
const typeCode = ref(`<ui-divider type="solid" />

<ui-divider type="dashed" />

<ui-divider type="dotted" />`)

// 自定义颜色代码
const colorCode = ref(`<ui-divider color="#f56c6c" />

<ui-divider with-text color="#409eff">自定义颜色</ui-divider>

<ui-divider color="rgba(103, 194, 58, 0.8)" />`)

// 控制代码片段的显示状态
const codeVisible = ref({
  basic: false,
  withText: false,
  vertical: false,
  type: false,
  color: false,
})

// 切换代码显示状态
function toggleCode(type: keyof typeof codeVisible.value) {
  codeVisible.value[type] = !codeVisible.value[type]
}
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">
      Divider 分割线
    </h1>
    <p class="demo-desc">
      区隔内容的分割线，可在水平和垂直方向上使用，支持添加文本内容。
    </p>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        基础用法
      </h2>
      <div class="demo-block">
        <div class="demo-block-content">
          <div>上方内容</div>
          <ui-divider />
          <div>下方内容</div>
        </div>
        <div class="demo-block-code">
          <div class="code-control" @click="toggleCode('basic')">
            {{ codeVisible.basic ? '隐藏代码' : '显示代码' }}
          </div>
          <pre v-if="codeVisible.basic" class="code-content"><code>{{ basicCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 带文本的分割线 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        带文本的分割线
      </h2>
      <div class="demo-block">
        <div class="demo-block-content">
          <ui-divider with-text>
            默认居中文本
          </ui-divider>
          <ui-divider with-text text-position="left">
            左侧文本
          </ui-divider>
          <ui-divider with-text text-position="right">
            右侧文本
          </ui-divider>
        </div>
        <div class="demo-block-code">
          <div class="code-control" @click="toggleCode('withText')">
            {{ codeVisible.withText ? '隐藏代码' : '显示代码' }}
          </div>
          <pre v-if="codeVisible.withText" class="code-content"><code>{{ withTextCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 垂直分割线 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        垂直分割线
      </h2>
      <div class="demo-block">
        <div class="demo-block-content">
          <div style="height: 50px; display: flex; align-items: center;">
            文本
            <ui-divider direction="vertical" />
            文本
            <ui-divider direction="vertical" />
            文本
          </div>
        </div>
        <div class="demo-block-code">
          <div class="code-control" @click="toggleCode('vertical')">
            {{ codeVisible.vertical ? '隐藏代码' : '显示代码' }}
          </div>
          <pre v-if="codeVisible.vertical" class="code-content"><code>{{ verticalCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 不同类型的分割线 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        不同类型的分割线
      </h2>
      <div class="demo-block">
        <div class="demo-block-content">
          <ui-divider type="solid" />
          <ui-divider type="dashed" />
          <ui-divider type="dotted" />
        </div>
        <div class="demo-block-code">
          <div class="code-control" @click="toggleCode('type')">
            {{ codeVisible.type ? '隐藏代码' : '显示代码' }}
          </div>
          <pre v-if="codeVisible.type" class="code-content"><code>{{ typeCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        自定义颜色
      </h2>
      <div class="demo-block">
        <div class="demo-block-content">
          <ui-divider color="#f56c6c" />
          <ui-divider with-text color="#409eff">
            自定义颜色
          </ui-divider>
          <ui-divider color="rgba(103, 194, 58, 0.8)" />
        </div>
        <div class="demo-block-code">
          <div class="code-control" @click="toggleCode('color')">
            {{ codeVisible.color ? '隐藏代码' : '显示代码' }}
          </div>
          <pre v-if="codeVisible.color" class="code-content"><code>{{ colorCode }}</code></pre>
        </div>
      </div>
    </div>

    <!-- API参考 -->
    <div class="demo-section">
      <h2 class="demo-section-title">
        API 参考
      </h2>
      <div class="api-table">
        <h3>Props</h3>
        <table>
          <thead>
            <tr>
              <th>参数</th>
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
            <tr>
              <td>class</td>
              <td>自定义类名</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Slots</h3>
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>default</td>
              <td>分割线文本内容</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(
    --ui-font-family,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif
  );
}

.demo-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--ui-text-color, #374151);
}

.demo-desc {
  font-size: 16px;
  color: var(--ui-text-color-secondary, #6b7280);
  margin-bottom: 32px;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--ui-text-color, #374151);
}

.demo-block {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.demo-block-content {
  padding: 24px;
  background-color: var(--ui-bg-color, #ffffff);
}

.demo-block-code {
  border-top: 1px solid var(--ui-border-color, #e5e7eb);
  background-color: var(--ui-bg-color-secondary, #f9fafb);
}

.code-control {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--ui-text-color-secondary, #6b7280);
  cursor: pointer;
  text-align: center;
  transition: color 0.2s;
}

.code-control:hover {
  color: var(--ui-color-primary, #10b981);
}

.code-content {
  margin: 0;
  padding: 16px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

.api-table {
  margin-top: 24px;
}

.api-table h3 {
  font-size: 18px;
  font-weight: 500;
  margin: 24px 0 16px;
  color: var(--ui-text-color, #374151);
}

.api-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  padding: 12px 16px;
  text-align: left;
}

.api-table th {
  background-color: var(--ui-bg-color-secondary, #f9fafb);
  font-weight: 500;
  color: var(--ui-text-color, #374151);
}

.api-table td {
  color: var(--ui-text-color-secondary, #6b7280);
}

/* 暗色主题适配 */
.dark {
  --ui-text-color: #e5e7eb;
  --ui-text-color-secondary: #9ca3af;
  --ui-bg-color: #1f2937;
  --ui-bg-color-secondary: #111827;
  --ui-border-color: #374151;
}
</style>
