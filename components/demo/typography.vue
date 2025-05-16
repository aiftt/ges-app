<script setup lang="ts" name="DemoTypography">
/**
 * 排版组件示例
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

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
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Typography 排版
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      Typography 排版组件提供了一套完整的文本排版解决方案，用于展示标题、段落、文本等内容。
    </p>

    <!-- 标题 Title -->
    <ui-demo
      title="标题 Title"
      description="用于展示不同级别的标题"
      :code="titleCode"
    >
      <div class="demo-typography-content">
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
    </ui-demo>

    <!-- 文本 Text -->
    <ui-demo
      title="文本 Text"
      description="用于展示不同样式的文本"
      :code="textCode"
    >
      <div class="demo-typography-content">
        <div class="mb-4 flex flex-wrap gap-4">
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
        <div class="flex flex-wrap gap-4">
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
    </ui-demo>

    <!-- 段落 Paragraph -->
    <ui-demo
      title="段落 Paragraph"
      description="用于展示文本段落"
      :code="paragraphCode"
    >
      <div class="demo-typography-content">
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
    </ui-demo>

    <!-- 排版 Typography -->
    <ui-demo
      title="排版 Typography"
      description="排版组件提供了文档级别的排版样式"
      :code="typographyCode"
    >
      <div class="demo-typography-content">
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
    </ui-demo>

    <!-- API 参考 -->
    <ui-demo
      title="API 参考"
      description="Typography 组件的属性和事件。"
      :show-code="false"
    >
      <h4 class="mb-2 font-medium dark:text-white">
        Typography Title
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                level
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                标题级别
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1 | 2 | 3 | 4 | 5 | 6
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                标题类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default' | 'primary' | 'success' | 'warning' | 'danger'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                weight
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                字体粗细
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'light' | 'normal' | 'medium' | 'semibold' | 'bold'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'bold'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                withMargin
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否添加下边距
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                align
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本对齐方式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left' | 'center' | 'right'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                copyable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可复制
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ellipsis
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示省略号
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        Typography Text
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本大小
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' | 'default' | 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                bold
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否加粗
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                italic
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否斜体
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                underline
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否添加下划线
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                delete
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否添加删除线
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                mark
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否标记文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                code
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为代码样式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                copyable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可复制
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ellipsis
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示省略号
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                lines
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                省略显示的行数
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                1
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        Typography Paragraph
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                段落类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                段落字体大小
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' | 'default' | 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                align
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本对齐方式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left' | 'center' | 'right' | 'justify'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ellipsis
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示省略号
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                lines
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                省略显示的行数
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                3
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                spacing
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                段落间距
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' | 'default' | 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        Typography
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                component
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                组件类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'article' | 'section' | 'div'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'div'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-typography-content {
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.dark .demo-typography-content {
  background-color: var(--ui-card-bg-dark, #1f2937);
  border-color: var(--ui-border-color-dark, #374151);
}
</style>
