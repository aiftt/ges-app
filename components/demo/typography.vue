<script setup lang="ts" name="DemoTypography">
/**
 * 排版组件示例
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { ref } from 'vue'

// 示例代码
const titleCode = `<ui-typography-title>默认标题</ui-typography-title>
<ui-typography-title level="2">二级标题</ui-typography-title>
<ui-typography-title level="3" type="primary">三级主色标题</ui-typography-title>
<ui-typography-title level="4" type="success">四级成功标题</ui-typography-title>
<ui-typography-title level="5" type="warning">五级警告标题</ui-typography-title>
<ui-typography-title level="6" type="danger">六级危险标题</ui-typography-title>`

const textCode = `<ui-typography-text>默认文本</ui-typography-text>
<ui-typography-text type="primary">主色文本</ui-typography-text>
<ui-typography-text type="success">成功文本</ui-typography-text>
<ui-typography-text type="warning">警告文本</ui-typography-text>
<ui-typography-text type="danger">危险文本</ui-typography-text>
<ui-typography-text type="secondary">次要文本</ui-typography-text>

<!-- 文本样式 -->
<ui-typography-text bold>加粗文本</ui-typography-text>
<ui-typography-text italic>斜体文本</ui-typography-text>
<ui-typography-text underline>下划线文本</ui-typography-text>
<ui-typography-text delete>删除线文本</ui-typography-text>
<ui-typography-text mark>标记文本</ui-typography-text>
<ui-typography-text code>代码文本</ui-typography-text>`

const paragraphCode = `<ui-typography-paragraph>
  这是一个默认段落，用于展示基本段落样式。段落可以包含多行文本，并且具有合适的行高和间距。
</ui-typography-paragraph>

<ui-typography-paragraph type="primary">
  这是一个主色段落，用于强调重要内容。
</ui-typography-paragraph>

<ui-typography-paragraph ellipsis :lines="2">
  这是一个具有省略功能的段落，当文本超出指定行数时会自动截断并显示省略号。
  这是更多的文本内容，用于演示省略效果。这是更多的文本内容，用于演示省略效果。
  这是更多的文本内容，用于演示省略效果。这是更多的文本内容，用于演示省略效果。
</ui-typography-paragraph>`

const typographyCode = `<ui-typography>
  <h1>This is H1 Title</h1>
  <h2>This is H2 Title</h2>
  <h3>This is H3 Title</h3>
  <h4>This is H4 Title</h4>
  <h5>This is H5 Title</h5>
  <h6>This is H6 Title</h6>

  <p>This is a paragraph with <a href="#">link</a>, <code>code</code>, and <strong>strong</strong> text.</p>

  <blockquote>
    This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </blockquote>

  <ul>
    <li>Unordered list item 1</li>
    <li>Unordered list item 2</li>
    <li>Unordered list item 3</li>
  </ul>

  <ol>
    <li>Ordered list item 1</li>
    <li>Ordered list item 2</li>
    <li>Ordered list item 3</li>
  </ol>

  <hr />

  <pre><code>// This is a code block
function example() {
  console.log('Hello, world!');
}</code></pre>
</ui-typography>`

// 是否显示代码
const showCode = ref({
  title: false,
  text: false,
  paragraph: false,
  typography: false,
})

// 切换代码显示
function toggleCode(section: 'title' | 'text' | 'paragraph' | 'typography') {
  showCode.value[section] = !showCode.value[section]
}
</script>

<template>
  <div class="demo-component">
    <div class="demo-section">
      <h3 class="demo-section-title">
        标题 Title
      </h3>
      <p class="demo-section-desc">
        用于展示不同级别的标题
      </p>
      <div class="demo-section-content demo-typography-content">
        <ui-typography-title>默认标题</ui-typography-title>
        <ui-typography-title :level="2">
          二级标题
        </ui-typography-title>
        <ui-typography-title :level="3" type="primary">
          三级主色标题
        </ui-typography-title>
        <ui-typography-title :level="4" type="success">
          四级成功标题
        </ui-typography-title>
        <ui-typography-title :level="5" type="warning">
          五级警告标题
        </ui-typography-title>
        <ui-typography-title :level="6" type="danger">
          六级危险标题
        </ui-typography-title>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('title')">
          {{ showCode.title ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.title">
        <ui-code :code="titleCode" lang="vue" :line-numbers="true" theme="auto" />
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        文本 Text
      </h3>
      <p class="demo-section-desc">
        用于展示不同样式的文本
      </p>
      <div class="demo-section-content demo-typography-content">
        <div class="demo-text-row">
          <ui-typography-text>默认文本</ui-typography-text>
          <ui-typography-text type="primary">
            主色文本
          </ui-typography-text>
          <ui-typography-text type="success">
            成功文本
          </ui-typography-text>
          <ui-typography-text type="warning">
            警告文本
          </ui-typography-text>
          <ui-typography-text type="danger">
            危险文本
          </ui-typography-text>
          <ui-typography-text type="secondary">
            次要文本
          </ui-typography-text>
        </div>
        <div class="demo-text-row">
          <ui-typography-text bold>
            加粗文本
          </ui-typography-text>
          <ui-typography-text italic>
            斜体文本
          </ui-typography-text>
          <ui-typography-text underline>
            下划线文本
          </ui-typography-text>
          <ui-typography-text delete>
            删除线文本
          </ui-typography-text>
          <ui-typography-text mark>
            标记文本
          </ui-typography-text>
          <ui-typography-text code>
            代码文本
          </ui-typography-text>
        </div>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('text')">
          {{ showCode.text ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.text">
        <ui-code :code="textCode" lang="vue" :line-numbers="true" theme="auto" />
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        段落 Paragraph
      </h3>
      <p class="demo-section-desc">
        用于展示文本段落
      </p>
      <div class="demo-section-content demo-typography-content">
        <ui-typography-paragraph>
          这是一个默认段落，用于展示基本段落样式。段落可以包含多行文本，并且具有合适的行高和间距。
        </ui-typography-paragraph>
        <ui-typography-paragraph type="primary">
          这是一个主色段落，用于强调重要内容。
        </ui-typography-paragraph>
        <ui-typography-paragraph ellipsis :lines="2">
          这是一个具有省略功能的段落，当文本超出指定行数时会自动截断并显示省略号。
          这是更多的文本内容，用于演示省略效果。这是更多的文本内容，用于演示省略效果。
          这是更多的文本内容，用于演示省略效果。这是更多的文本内容，用于演示省略效果。
        </ui-typography-paragraph>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('paragraph')">
          {{ showCode.paragraph ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.paragraph">
        <ui-code :code="paragraphCode" lang="vue" :line-numbers="true" theme="auto" />
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        排版 Typography
      </h3>
      <p class="demo-section-desc">
        排版组件提供了文档级别的排版样式
      </p>
      <div class="demo-section-content">
        <ui-typography>
          <h1>This is H1 Title</h1>
          <h2>This is H2 Title</h2>
          <h3>This is H3 Title</h3>
          <h4>This is H4 Title</h4>
          <h5>This is H5 Title</h5>
          <h6>This is H6 Title</h6>

          <p>This is a paragraph with <a href="#">link</a>, <code>code</code>, and <strong>strong</strong> text.</p>

          <blockquote>
            This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </blockquote>

          <ul>
            <li>Unordered list item 1</li>
            <li>Unordered list item 2</li>
            <li>Unordered list item 3</li>
          </ul>

          <ol>
            <li>Ordered list item 1</li>
            <li>Ordered list item 2</li>
            <li>Ordered list item 3</li>
          </ol>

          <hr>

          <pre><code>// This is a code block
function example() {
  console.log('Hello, world!');
}</code></pre>
        </ui-typography>
      </div>
      <div class="demo-code-control">
        <button class="demo-code-button" @click="toggleCode('typography')">
          {{ showCode.typography ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
      <div v-if="showCode.typography">
        <ui-code :code="typographyCode" lang="vue" :line-numbers="true" theme="auto" />
      </div>
    </div>

    <div class="demo-section">
      <h3 class="demo-section-title">
        API 参考
      </h3>

      <h4 class="demo-api-subtitle">
        Typography Title
      </h4>
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
            <td>level</td>
            <td>标题级别</td>
            <td>1 | 2 | 3 | 4 | 5 | 6</td>
            <td>1</td>
          </tr>
          <tr>
            <td>type</td>
            <td>标题类型</td>
            <td>'default' | 'primary' | 'success' | 'warning' | 'danger'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>weight</td>
            <td>字体粗细</td>
            <td>'light' | 'normal' | 'medium' | 'semibold' | 'bold'</td>
            <td>'bold'</td>
          </tr>
          <tr>
            <td>withMargin</td>
            <td>是否添加下边距</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>align</td>
            <td>文本对齐方式</td>
            <td>'left' | 'center' | 'right'</td>
            <td>'left'</td>
          </tr>
          <tr>
            <td>copyable</td>
            <td>是否可复制</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>ellipsis</td>
            <td>是否显示省略号</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>

      <h4 class="demo-api-subtitle">
        Typography Text
      </h4>
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
            <td>文本类型</td>
            <td>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>size</td>
            <td>文本大小</td>
            <td>'small' | 'default' | 'large'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>bold</td>
            <td>是否加粗</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>italic</td>
            <td>是否斜体</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>underline</td>
            <td>是否添加下划线</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>delete</td>
            <td>是否添加删除线</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>mark</td>
            <td>是否标记文本</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>code</td>
            <td>是否为代码样式</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>copyable</td>
            <td>是否可复制</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>ellipsis</td>
            <td>是否显示省略号</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>lines</td>
            <td>省略显示的行数</td>
            <td>number</td>
            <td>1</td>
          </tr>
          <tr>
            <td>color</td>
            <td>文本颜色</td>
            <td>string</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <h4 class="demo-api-subtitle">
        Typography Paragraph
      </h4>
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
            <td>段落类型</td>
            <td>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>size</td>
            <td>段落字体大小</td>
            <td>'small' | 'default' | 'large'</td>
            <td>'default'</td>
          </tr>
          <tr>
            <td>align</td>
            <td>文本对齐方式</td>
            <td>'left' | 'center' | 'right' | 'justify'</td>
            <td>'left'</td>
          </tr>
          <tr>
            <td>ellipsis</td>
            <td>是否显示省略号</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>lines</td>
            <td>省略显示的行数</td>
            <td>number</td>
            <td>3</td>
          </tr>
          <tr>
            <td>spacing</td>
            <td>段落间距</td>
            <td>'small' | 'default' | 'large'</td>
            <td>'default'</td>
          </tr>
        </tbody>
      </table>

      <h4 class="demo-api-subtitle">
        Typography
      </h4>
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
            <td>component</td>
            <td>组件类型</td>
            <td>'article' | 'section' | 'div'</td>
            <td>'div'</td>
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

.demo-typography-content {
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.demo-text-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
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

.demo-api-subtitle {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.demo-api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
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
