<script setup lang="ts" name="DemoText">
/**
 * 文本组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
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
</script>

<template>
  <div class="space-y-10">
    <!-- 基础文本 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础文本
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        基础文本组件的默认样式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-text>{{ sampleText }}</ui-text>
      </div>
    </section>

    <!-- 文本类型 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本类型
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置type属性展示不同类型的文本。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 文本大小 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本大小
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置size属性调整文本大小。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 文本修饰 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本修饰
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        展示各种文本修饰效果。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
      </div>
    </section>

    <!-- 文本省略 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本省略
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置ellipsis属性实现文本截断。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
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
              <ui-text :ellipsis="{ expandable: true, symbol: '展开/收起' }">
                {{ longText }}
              </ui-text>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 文本复制 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本复制
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置copyable属性启用文本复制功能。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              基础复制:
            </div>
            <ui-text copyable>
              {{ sampleText }}
            </ui-text>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              自定义提示:
            </div>
            <ui-text :copyable="{ tooltips: ['点击复制', '复制成功'] }">
              {{ sampleText }}
            </ui-text>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              复制长文本:
            </div>
            <ui-text :copyable="{ text: longText }" ellipsis>
              {{ longText }}
            </ui-text>
          </div>
        </div>
      </div>
    </section>

    <!-- 链接文本 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        链接文本
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        实现可点击的链接文本。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-text>
            <a href="#" class="text-blue-500 hover:underline">普通链接</a>
          </ui-text>

          <ui-text type="primary">
            <a href="#" class="hover:underline">主题色链接</a>
          </ui-text>

          <ui-text>
            这段文本中包含一个<a href="#" class="text-blue-500 hover:underline">内联链接</a>，点击可跳转。
          </ui-text>
        </div>
      </div>
    </section>

    <!-- 文本组合 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        文本组合
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        多种文本样式的组合使用。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-text>
          正常文本与<ui-text type="primary" bold>
            主要粗体
          </ui-text>、
          <ui-text type="success" underline>
            成功下划线
          </ui-text>和
          <ui-text type="danger" delete>
            危险删除线
          </ui-text>文本的组合，
          还可以包含<ui-text code>
            代码片段
          </ui-text>和
          <ui-text mark>
            标记内容
          </ui-text>。
        </ui-text>
      </div>
    </section>

    <!-- 高级用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        高级用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        结合图标和其他组件的使用场景。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div>
            <ui-text type="primary" class="flex items-center">
              <ui-icon icon="carbon:information" class="mr-1" />
              带图标的信息文本
            </ui-text>
          </div>

          <div>
            <ui-text type="success" class="flex items-center">
              <ui-icon icon="carbon:checkmark" class="mr-1" />
              操作成功提示
            </ui-text>
          </div>

          <div>
            <ui-text type="warning" class="flex items-center">
              <ui-icon icon="carbon:warning" class="mr-1" />
              警告信息
            </ui-text>
          </div>

          <div>
            <ui-text type="danger" class="flex items-center">
              <ui-icon icon="carbon:error" class="mr-1" />
              错误提示
            </ui-text>
          </div>

          <div class="flex items-center space-x-2">
            <ui-text>状态:</ui-text>
            <ui-text type="success" bold>
              已完成
            </ui-text>
          </div>

          <div class="border rounded p-3">
            <ui-title :level="5">
              卡片标题
            </ui-title>
            <ui-text type="secondary" size="sm">
              这是卡片的辅助说明文本，用较小的字号和次要颜色展示。
            </ui-text>
            <div class="mt-2">
              <ui-text>卡片的主要内容文本，可以包含较长的描述信息。</ui-text>
            </div>
          </div>

          <!-- 各种类型 -->
          <div class="flex flex-col gap-4">
            <p>
              <ui-typography-text type="info">
                <ui-icon icon="carbon:information" class="mr-1" />
                信息文本
              </ui-typography-text>
            </p>
            <p>
              <ui-typography-text type="success">
                <ui-icon icon="carbon:checkmark" class="mr-1" />
                成功文本
              </ui-typography-text>
            </p>
            <p>
              <ui-typography-text type="warning">
                <ui-icon icon="carbon:warning" class="mr-1" />
                警告文本
              </ui-typography-text>
            </p>
            <p>
              <ui-typography-text type="danger">
                <ui-icon icon="carbon:error" class="mr-1" />
                危险文本
              </ui-typography-text>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
