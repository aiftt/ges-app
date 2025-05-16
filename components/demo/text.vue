<script setup lang="ts" name="DemoText">
/**
 * 文本组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 文本类型
const textTypes = [
  { label: '默认', value: 'default' },
  { label: '主要', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info' },
  { label: '次要', value: 'secondary' },
]

// 文本大小
const _textSizes = [
  { label: '超小', value: 'xs' },
  { label: '小', value: 'sm' },
  { label: '中', value: 'md' },
  { label: '大', value: 'lg' },
  { label: '超大', value: 'xl' },
]

// 示例文本
const sampleText = '这是一段示例文本内容'
const longText = '这是一段较长的文本内容，用于测试文本截断、省略和自动换行等功能，确保在各种情况下文本都能正确显示。文本组件是最基础的排版组件，通常用于呈现各类短文本内容，并支持丰富的样式定制和交互效果。'

// 特殊格式示例
const _specialFormats = [
  { label: '加粗', prop: 'bold' },
  { label: '斜体', prop: 'italic' },
  { label: '下划线', prop: 'underline' },
  { label: '删除线', prop: 'delete' },
  { label: '标记', prop: 'mark' },
  { label: '代码', prop: 'code' },
  { label: '可复制', prop: 'copyable' },
]

// 示例代码
const basicTextCode = `<ui-text>这是一段示例文本内容</ui-text>`

const textTypeCode = `<ui-text type="default">默认文本：这是一段示例文本内容</ui-text>
<ui-text type="primary">主要文本：这是一段示例文本内容</ui-text>
<ui-text type="success">成功文本：这是一段示例文本内容</ui-text>
<ui-text type="warning">警告文本：这是一段示例文本内容</ui-text>
<ui-text type="danger">危险文本：这是一段示例文本内容</ui-text>
<ui-text type="info">信息文本：这是一段示例文本内容</ui-text>
<ui-text type="secondary">次要文本：这是一段示例文本内容</ui-text>`

const textSizeCode = `<ui-text size="xs">特小文本：这是一段示例文本内容</ui-text>
<ui-text size="sm">小文本：这是一段示例文本内容</ui-text>
<ui-text size="base">默认文本：这是一段示例文本内容</ui-text>
<ui-text size="lg">大文本：这是一段示例文本内容</ui-text>
<ui-text size="xl">特大文本：这是一段示例文本内容</ui-text>`

const textStyleCode = `<ui-text bold>粗体文本：这是一段示例文本内容</ui-text>
<ui-text italic>斜体文本：这是一段示例文本内容</ui-text>
<ui-text underline>下划线文本：这是一段示例文本内容</ui-text>
<ui-text delete>删除线文本：这是一段示例文本内容</ui-text>
<ui-text mark>标记文本：这是一段示例文本内容</ui-text>
<ui-text code>代码文本：这是一段示例文本内容</ui-text>
<ui-text keyboard>键盘文本：这是一段示例文本内容</ui-text>`

const ellipsisTextCode = `<!-- 不省略 -->
<div class="max-w-md">
  <ui-text>这是一段较长的文本内容，用于测试文本截断、省略和自动换行等功能，确保在各种情况下文本都能正确显示。文本组件是最基础的排版组件，通常用于呈现各类短文本内容，并支持丰富的样式定制和交互效果。</ui-text>
</div>

<!-- 单行省略 -->
<div class="max-w-md">
  <ui-text ellipsis>
    这是一段较长的文本内容，用于测试文本截断、省略和自动换行等功能，确保在各种情况下文本都能正确显示。文本组件是最基础的排版组件，通常用于呈现各类短文本内容，并支持丰富的样式定制和交互效果。
  </ui-text>
</div>

<!-- 多行省略 (2行) -->
<div class="max-w-md">
  <ui-text :ellipsis="{ rows: 2 }">
    这是一段较长的文本内容，用于测试文本截断、省略和自动换行等功能，确保在各种情况下文本都能正确显示。文本组件是最基础的排版组件，通常用于呈现各类短文本内容，并支持丰富的样式定制和交互效果。
  </ui-text>
</div>

<!-- 可交互省略 -->
<div class="max-w-md">
  <ui-text :ellipsis="{ rows: 2, expandable: true, symbol: '展开/收起' }">
    这是一段较长的文本内容，用于测试文本截断、省略和自动换行等功能，确保在各种情况下文本都能正确显示。文本组件是最基础的排版组件，通常用于呈现各类短文本内容，并支持丰富的样式定制和交互效果。
  </ui-text>
</div>`

const copyableTextCode = `<!-- 基础复制 -->
<ui-text copyable>这是一段可复制的文本内容</ui-text>

<!-- 自定义提示 -->
<ui-text :copyable="{ tooltips: ['点击复制', '复制成功'] }">
  这是一段带自定义提示的可复制文本
</ui-text>

<!-- 自定义图标 -->
<ui-text :copyable="{ icon: ['carbon:copy', 'carbon:checkmark'] }">
  这是一段带自定义图标的可复制文本
</ui-text>

<!-- 带复制回调 -->
<ui-text :copyable="{ onCopy: () => {
  // 这里可以使用消息提示组件
  console.log('文本已复制!');
} }">
  复制后会触发回调函数
</ui-text>`

const editorTextCode = `<!-- 可编辑文本 -->
<ui-text editable>这是一段可编辑的文本，点击可以编辑</ui-text>

<!-- 自定义工具提示 -->
<ui-text :editable="{ tooltip: '点击编辑' }">
  这是一段带自定义提示的可编辑文本
</ui-text>

<!-- 带编辑回调 -->
<ui-text :editable="{ onChange: (value: string) => console.log('编辑后的文本:', value) }">
  编辑后会触发回调函数
</ui-text>

<!-- 编辑输入框样式 -->
<ui-text :editable="{ autoSize: { minRows: 2, maxRows: 6 } }">
  这是一段可以多行编辑的文本
</ui-text>`

const linkTextCode = `<!-- 基础链接 -->
<ui-text type="link" href="https://example.com" target="_blank">
  外部链接
</ui-text>

<!-- 内部路由链接 -->
<ui-text type="link" to="/demo">
  路由链接
</ui-text>

<!-- 链接样式 -->
<ui-text type="link" underline>
  带下划线的链接
</ui-text>

<!-- 链接颜色 -->
<ui-text type="link" color="success">
  成功色链接
</ui-text>`

const colorTextCode = `<!-- 预设颜色 -->
<ui-text type="primary">主要颜色文本</ui-text>
<ui-text type="success">成功颜色文本</ui-text>
<ui-text type="warning">警告颜色文本</ui-text>
<ui-text type="danger">危险颜色文本</ui-text>

<!-- 自定义颜色 -->
<ui-text color="#8B5CF6">紫色文本</ui-text>
<ui-text color="#EC4899">粉色文本</ui-text>
<ui-text color="#10B981">绿色文本</ui-text>
<ui-text color="rgba(59, 130, 246, 0.8)">透明蓝色文本</ui-text>`

const combinedTextCode = `<!-- 组合多种样式 -->
<ui-text type="primary" bold underline>
  主要粗体下划线文本
</ui-text>

<ui-text type="danger" italic mark>
  危险斜体标记文本
</ui-text>

<ui-text code copyable>
  可复制的代码文本
</ui-text>

<!-- 复杂组合 -->
<div>
  这里有一段文本，包含
  <ui-text type="primary" bold>重要内容</ui-text>
  和
  <ui-text type="danger" mark>警告信息</ui-text>，
  还有
  <ui-text code>代码片段</ui-text>
  以及
  <ui-text type="link" href="https://example.com">外部链接</ui-text>
</div>`
</script>

<template>
  <div class="demo-text">
    <h2 class="mb-6 text-xl font-bold">
      Text 文本
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      文本组件用于呈现各类文本内容，支持多种类型、大小、样式和交互方式。
    </p>

    <!-- 基础文本 -->
    <ui-demo
      title="基础文本"
      description="基础文本组件的默认样式。"
      :code="basicTextCode"
    >
      <ui-text>{{ sampleText }}</ui-text>
    </ui-demo>

    <!-- 文本类型 -->
    <ui-demo
      title="文本类型"
      description="通过设置type属性展示不同类型的文本。"
      :code="textTypeCode"
    >
      <div class="space-y-3">
        <div v-for="type in textTypes" :key="type.value" class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            {{ type.label }}:
          </div>
          <ui-text :type="type.value">
            {{ sampleText }}
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 文本大小 -->
    <ui-demo
      title="文本大小"
      description="通过设置size属性调整文本大小。"
      :code="textSizeCode"
    >
      <div class="space-y-3">
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            特小:
          </div>
          <ui-text size="xs">
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            小:
          </div>
          <ui-text size="sm">
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            默认:
          </div>
          <ui-text size="base">
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            大:
          </div>
          <ui-text size="lg">
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            特大:
          </div>
          <ui-text size="xl">
            {{ sampleText }}
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 文本修饰 -->
    <ui-demo
      title="文本修饰"
      description="展示各种文本修饰效果。"
      :code="textStyleCode"
    >
      <div class="space-y-3">
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            粗体:
          </div>
          <ui-text bold>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            斜体:
          </div>
          <ui-text italic>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            下划线:
          </div>
          <ui-text underline>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            删除线:
          </div>
          <ui-text delete>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            标记:
          </div>
          <ui-text mark>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            代码:
          </div>
          <ui-text code>
            {{ sampleText }}
          </ui-text>
        </div>
        <div class="flex items-center">
          <div class="w-20 text-sm text-gray-500">
            键盘:
          </div>
          <ui-text keyboard>
            {{ sampleText }}
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 文本省略 -->
    <ui-demo
      title="文本省略"
      description="通过设置ellipsis属性实现文本截断。"
      :code="ellipsisTextCode"
    >
      <div class="space-y-6">
        <div class="space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            不省略:
          </div>
          <div class="max-w-md">
            <ui-text>{{ longText }}</ui-text>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            单行省略:
          </div>
          <div class="max-w-md">
            <ui-text ellipsis>
              {{ longText }}
            </ui-text>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            多行省略 (2行):
          </div>
          <div class="max-w-md">
            <ui-text :ellipsis="{ rows: 2 }">
              {{ longText }}
            </ui-text>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            可交互省略:
          </div>
          <div class="max-w-md">
            <ui-text :ellipsis="{ rows: 2, expandable: true, symbol: '展开/收起' }">
              {{ longText }}
            </ui-text>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 可复制文本 -->
    <ui-demo
      title="可复制文本"
      description="通过设置copyable属性实现文本复制功能。"
      :code="copyableTextCode"
    >
      <div class="space-y-4">
        <div>
          <ui-text copyable>
            这是一段可复制的文本内容
          </ui-text>
        </div>

        <div>
          <ui-text :copyable="{ tooltips: ['点击复制', '复制成功'] }">
            这是一段带自定义提示的可复制文本
          </ui-text>
        </div>

        <div>
          <ui-text :copyable="{ icon: ['carbon:copy', 'carbon:checkmark'] }">
            这是一段带自定义图标的可复制文本
          </ui-text>
        </div>

        <div>
          <ui-text :copyable="{ onCopy: () => { console.log('文本已复制!'); } }">
            复制后会触发回调函数
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 可编辑文本 -->
    <ui-demo
      title="可编辑文本"
      description="通过设置editable属性实现文本编辑功能。"
      :code="editorTextCode"
    >
      <div class="space-y-4">
        <div>
          <ui-text editable>
            这是一段可编辑的文本，点击可以编辑
          </ui-text>
        </div>

        <div>
          <ui-text :editable="{ tooltip: '点击编辑' }">
            这是一段带自定义提示的可编辑文本
          </ui-text>
        </div>

        <div>
          <ui-text :editable="{ onChange: (value: string) => console.log('编辑后的文本:', value) }">
            编辑后会触发回调函数
          </ui-text>
        </div>

        <div>
          <ui-text :editable="{ autoSize: { minRows: 2, maxRows: 6 } }">
            这是一段可以多行编辑的文本
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 链接文本 -->
    <ui-demo
      title="链接文本"
      description="文本链接的使用方式。"
      :code="linkTextCode"
    >
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <ui-text type="link" href="https://example.com" target="_blank">
            外部链接
          </ui-text>

          <ui-text type="link" to="/demo">
            路由链接
          </ui-text>

          <ui-text type="link" underline>
            带下划线的链接
          </ui-text>

          <ui-text type="link" color="success">
            成功色链接
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 文本颜色 -->
    <ui-demo
      title="文本颜色"
      description="文本组件的颜色使用方式。"
      :code="colorTextCode"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <ui-text type="primary">
            主要颜色文本
          </ui-text>
          <ui-text type="success">
            成功颜色文本
          </ui-text>
          <ui-text type="warning">
            警告颜色文本
          </ui-text>
          <ui-text type="danger">
            危险颜色文本
          </ui-text>
        </div>

        <div class="flex flex-wrap gap-4">
          <ui-text color="#8B5CF6">
            紫色文本
          </ui-text>
          <ui-text color="#EC4899">
            粉色文本
          </ui-text>
          <ui-text color="#10B981">
            绿色文本
          </ui-text>
          <ui-text color="rgba(59, 130, 246, 0.8)">
            透明蓝色文本
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- 组合使用 -->
    <ui-demo
      title="组合使用"
      description="文本组件可以组合多种样式和功能。"
      :code="combinedTextCode"
    >
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <ui-text type="primary" bold underline>
            主要粗体下划线文本
          </ui-text>

          <ui-text type="danger" mark italic>
            危险斜体标记文本
          </ui-text>

          <ui-text code copyable>
            可复制的代码文本
          </ui-text>
        </div>

        <div class="pt-2">
          这里有一段文本，包含
          <ui-text type="primary" bold>
            重要内容
          </ui-text>
          和
          <ui-text type="danger" mark>
            警告信息
          </ui-text>，
          还有
          <ui-text code>
            代码片段
          </ui-text>
          以及
          <ui-text type="link" href="https://example.com">
            外部链接
          </ui-text>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border rounded bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        API 参考
      </h3>

      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2 text-left">
              属性
            </th>
            <th class="border p-2 text-left">
              说明
            </th>
            <th class="border p-2 text-left">
              类型
            </th>
            <th class="border p-2 text-left">
              默认值
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">
              type
            </td>
            <td class="border p-2">
              文本类型
            </td>
            <td class="border p-2">
              'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'link'
            </td>
            <td class="border p-2">
              'default'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              size
            </td>
            <td class="border p-2">
              文本大小
            </td>
            <td class="border p-2">
              'xs' | 'sm' | 'base' | 'lg' | 'xl'
            </td>
            <td class="border p-2">
              'base'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              color
            </td>
            <td class="border p-2">
              文本颜色
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              href
            </td>
            <td class="border p-2">
              链接地址
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              to
            </td>
            <td class="border p-2">
              路由链接
            </td>
            <td class="border p-2">
              string | object
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              bold
            </td>
            <td class="border p-2">
              是否加粗
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              italic
            </td>
            <td class="border p-2">
              是否斜体
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              underline
            </td>
            <td class="border p-2">
              是否下划线
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              delete
            </td>
            <td class="border p-2">
              是否删除线
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              mark
            </td>
            <td class="border p-2">
              是否标记
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              code
            </td>
            <td class="border p-2">
              是否代码样式
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              keyboard
            </td>
            <td class="border p-2">
              是否键盘样式
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              ellipsis
            </td>
            <td class="border p-2">
              是否显示省略号
            </td>
            <td class="border p-2">
              boolean | object
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              copyable
            </td>
            <td class="border p-2">
              是否可复制
            </td>
            <td class="border p-2">
              boolean | object
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              editable
            </td>
            <td class="border p-2">
              是否可编辑
            </td>
            <td class="border p-2">
              boolean | object
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              disabled
            </td>
            <td class="border p-2">
              是否禁用
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-text {
  padding: 1rem;
}
</style>
