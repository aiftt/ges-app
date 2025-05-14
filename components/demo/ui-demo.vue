<script setup lang="ts" name="DemoUiDemo">
/**
 * 组件展示组件示例
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 * 更新日期: 2024-11-30 - 初始版本
 */

const headingsCode = `<h1 class="text-2xl font-bold mb-2">标题 Title</h1>
<h2 class="text-xl font-bold mb-2">二级标题</h2>
<h3 class="text-lg font-bold mb-2 text-blue-500">三级主色标题</h3>
<h4 class="text-md font-bold mb-2 text-green-500">四级成功标题</h4>
<h5 class="text-sm font-bold mb-2 text-yellow-500">五级警告标题</h5>
<h6 class="text-xs font-bold mb-2 text-red-500">六级危险标题</h6>`

const buttonsCode = `<div class="flex gap-2">
  <ui-button>默认按钮</ui-button>
  <ui-button type="primary">主要按钮</ui-button>
  <ui-button type="success">成功按钮</ui-button>
  <ui-button type="warning">警告按钮</ui-button>
  <ui-button type="danger">危险按钮</ui-button>
</div>`

const paragraphCode = `<p class="mb-2">
  这是一个段落示例。段落可以包含多行文本并自动进行换行。
  这是第二句话，用于展示自然段落的样式。
</p>
<p class="mb-2 text-gray-600">
  这是一个浅色段落示例，通常用于次要文本信息。
</p>`
</script>

<template>
  <div class="demo-ui-demo">
    <h2 class="mb-6 text-xl font-bold">
      UiDemo 组件演示组件
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      UiDemo组件用于在演示页面中展示UI组件和代码示例。它支持主标题、父标题、描述，并可以显示实际组件效果和对应代码，同时提供代码折叠功能。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的用法，展示标题和示例内容。"
      :code="headingsCode"
    >
      <h1 class="mb-2 text-2xl font-bold">
        标题 Title
      </h1>
      <h2 class="mb-2 text-xl font-bold">
        二级标题
      </h2>
      <h3 class="mb-2 text-lg text-blue-500 font-bold">
        三级主色标题
      </h3>
      <h4 class="text-md mb-2 text-green-500 font-bold">
        四级成功标题
      </h4>
      <h5 class="mb-2 text-sm text-yellow-500 font-bold">
        五级警告标题
      </h5>
      <h6 class="mb-2 text-xs text-red-500 font-bold">
        六级危险标题
      </h6>
    </ui-demo>

    <!-- 带父标题和默认展开代码 -->
    <ui-demo
      title="按钮示例"
      parent-title="交互组件"
      description="展示不同类型的按钮。"
      :code="buttonsCode"
      :default-expanded="true"
    >
      <div class="flex gap-2">
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
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以通过属性自定义组件的背景色和边框。"
      :code="paragraphCode"
      bg-color="#f8f9fa"
      border-color="#dee2e6"
      code-bg-color="#f1f3f5"
    >
      <p class="mb-2">
        这是一个段落示例。段落可以包含多行文本并自动进行换行。
        这是第二句话，用于展示自然段落的样式。
      </p>
      <p class="mb-2 text-gray-600">
        这是一个浅色段落示例，通常用于次要文本信息。
      </p>
    </ui-demo>

    <!-- API参考 -->
    <div class="mb-4 mt-8">
      <h3 class="mb-4 text-lg font-bold">
        API参考
      </h3>
      <h4 class="text-md mb-2 font-medium">
        Props
      </h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              属性
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              类型
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              默认值
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              title
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              主标题
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              parentTitle
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              父标题，显示在主标题上方
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              description
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              描述文本
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              code
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              要展示的代码
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              language
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              vue
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              代码语言
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              theme
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              github-dark
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              代码高亮主题
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              showCode
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              boolean
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              true
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              是否显示代码部分
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              defaultExpanded
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              boolean
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              false
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              代码是否默认展开
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              bordered
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              boolean
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              true
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              是否显示边框
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              bgColor
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              背景颜色
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              borderColor
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              边框颜色
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              codeBgColor
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              -
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              代码区域背景颜色
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              codeMaxHeight
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              string
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              400px
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              代码区域最大高度
            </td>
          </tr>
        </tbody>
      </table>

      <h4 class="text-md mb-2 mt-4 font-medium">
        Slots
      </h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              名称
            </th>
            <th class="border border-gray-300 p-2 text-left dark:border-gray-700">
              说明
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              default
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              示例内容
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              title
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              自定义标题内容
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              description
            </td>
            <td class="border border-gray-300 p-2 dark:border-gray-700">
              自定义描述内容
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-ui-demo {
  padding: 1rem;
}
</style>
