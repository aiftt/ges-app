<script setup lang="ts" name="DemoParagraph">
/**
 * 段落组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 段落类型
const paragraphTypes = [
  { label: '默认', value: 'default' },
  { label: '主要', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
  { label: '信息', value: 'info' },
  { label: '次要', value: 'secondary' },
]

// 段落间距示例
const _spacings = [
  { label: '紧凑', value: 'compact' },
  { label: '常规', value: 'normal' },
  { label: '宽松', value: 'loose' },
]

// 段落对齐方式
const _alignments = [
  { label: '左对齐', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右对齐', value: 'right' },
  { label: '两端对齐', value: 'justify' },
]

// 示例段落文本
const shortParagraph = '这是一个简短的段落示例，包含一些基本的文本内容。'

const _mediumParagraph = '这是一个中等长度的段落示例。段落是由多个句子组成的文本块，用于表达完整的思想或观点。段落通常包含一个主题句和若干支持句，形成一个连贯的论述单元。'

const longParagraph = '段落组件用于显示大段的文本内容，是构建文档、文章和各类富文本内容的基础。段落通常包含多个句子，表达完整的思想或观点。在界面设计中，段落的排版和样式直接影响用户的阅读体验和信息获取效率。良好的段落设计应当考虑字体大小、行高、段间距、颜色对比度等因素，以确保文本易于阅读和理解。同时，还应当支持响应式设计，在不同屏幕尺寸下依然保持良好的可读性。'

const multipleParagraphs = [
  '第一段：段落组件是排版系统的重要组成部分，用于展示大段的文本内容。它遵循一致的样式规范，使文本在视觉上形成统一的整体。',
  '第二段：在使用段落组件时，可以设置不同的样式属性，如字体大小、行高、对齐方式等，以满足不同的设计需求。通过这些属性的组合，可以创建出既美观又易读的文本内容。',
  '第三段：段落之间的间距也是排版的重要因素。适当的段间距可以帮助读者区分不同的段落，提高阅读的连贯性和舒适度。在设计界面时，应当根据内容的密度和重要性来调整段间距。',
]

// 示例引用文本
const _quoteText = '设计是关于功能、外观以及它们如何协同工作的。它不仅仅是关于漂亮，而是关于如何使事物更好地工作。'
</script>

<template>
  <div class="space-y-10">
    <!-- 基础段落 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础段落
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        基础段落组件的默认样式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-paragraph>{{ shortParagraph }}</ui-paragraph>
      </div>
    </section>

    <!-- 段落类型 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落类型
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置type属性展示不同类型的段落。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div v-for="type in paragraphTypes" :key="type.value" class="space-y-1">
            <div class="text-sm text-gray-500">
              {{ type.label }}:
            </div>
            <ui-paragraph :type="type.value">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落尺寸 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落尺寸
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置size属性调整段落文本大小。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              特小 (xs):
            </div>
            <ui-paragraph size="xs">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              小 (sm):
            </div>
            <ui-paragraph size="sm">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              默认 (base):
            </div>
            <ui-paragraph size="base">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              大 (lg):
            </div>
            <ui-paragraph size="lg">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              特大 (xl):
            </div>
            <ui-paragraph size="xl">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落样式 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落样式
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        设置段落的样式属性，如粗细、斜体等。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              粗体:
            </div>
            <ui-paragraph bold>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              斜体:
            </div>
            <ui-paragraph italic>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              标记:
            </div>
            <ui-paragraph mark>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              下划线:
            </div>
            <ui-paragraph underline>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              删除线:
            </div>
            <ui-paragraph delete>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              代码样式:
            </div>
            <ui-paragraph code>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落对齐 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落对齐
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置align属性控制段落文本的对齐方式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              左对齐 (默认):
            </div>
            <ui-paragraph align="left">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              居中对齐:
            </div>
            <ui-paragraph align="center">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              右对齐:
            </div>
            <ui-paragraph align="right">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              两端对齐:
            </div>
            <ui-paragraph align="justify">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落间距 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落间距
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置spacing属性控制段落的行高和间距。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              紧凑 (compact):
            </div>
            <ui-paragraph spacing="compact">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              默认 (normal):
            </div>
            <ui-paragraph spacing="normal">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              宽松 (relaxed):
            </div>
            <ui-paragraph spacing="relaxed">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落缩进 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落缩进
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置indent属性控制段落首行缩进。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              无缩进:
            </div>
            <ui-paragraph :indent="false">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              标准缩进 (2em):
            </div>
            <ui-paragraph :indent="true">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              自定义缩进 (4em):
            </div>
            <ui-paragraph :indent="4">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 段落省略 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落省略
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置ellipsis属性实现段落截断和省略。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              单行省略:
            </div>
            <div class="max-w-md">
              <ui-paragraph ellipsis>
                {{ longParagraph }}
              </ui-paragraph>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              多行省略 (3行):
            </div>
            <div class="max-w-md">
              <ui-paragraph :ellipsis="{ rows: 3 }">
                {{ longParagraph }}
              </ui-paragraph>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              可展开/收起:
            </div>
            <div class="max-w-md">
              <ui-paragraph :ellipsis="{ rows: 2, expandable: true, symbol: '展开/收起' }">
                {{ longParagraph }}
              </ui-paragraph>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 多段落显示 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        多段落显示
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        展示多个段落及其样式。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <ui-paragraph
            v-for="(paragraph, index) in multipleParagraphs"
            :key="index"
            :indent="true"
            :type="index === 0 ? 'primary' : 'default'"
          >
            {{ paragraph }}
          </ui-paragraph>
        </div>
      </div>
    </section>

    <!-- 段落复制 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        段落复制
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过设置copyable属性启用段落复制功能。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              基础复制:
            </div>
            <ui-paragraph copyable>
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              自定义提示:
            </div>
            <ui-paragraph :copyable="{ tooltips: ['点击复制内容', '复制成功'] }">
              {{ shortParagraph }}
            </ui-paragraph>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-500">
              复制带省略的段落:
            </div>
            <ui-paragraph :copyable="{ text: longParagraph }" :ellipsis="{ rows: 2 }">
              {{ longParagraph }}
            </ui-paragraph>
          </div>
        </div>
      </div>
    </section>

    <!-- 富文本段落 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        富文本段落
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        段落中包含各种富文本元素。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-paragraph>
          这是一个<ui-text bold>
            富文本
          </ui-text>段落示例，包含
          <ui-text type="primary">
            主要颜色
          </ui-text>、
          <ui-text type="success">
            成功颜色
          </ui-text>和
          <ui-text underline>
            下划线
          </ui-text>文本。
          还可以包含<ui-text code>
            代码片段
          </ui-text>和
          <ui-text mark>
            标记内容
          </ui-text>。
          这里是一个<a href="#" class="text-blue-500 hover:underline">链接</a>，
          以及一个<ui-text type="danger">
            警告信息
          </ui-text>。
        </ui-paragraph>
      </div>
    </section>

    <!-- 高级用法 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        高级用法
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        结合其他组件的高级用法示例。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <!-- 卡片组合 -->
          <div class="border rounded-lg p-4">
            <ui-title level="4">
              文章标题
            </ui-title>
            <ui-text type="secondary" size="sm" class="mb-4">
              发布于 2023-05-18 · 阅读时间：5分钟
            </ui-text>

            <ui-paragraph :indent="true">
              {{ multipleParagraphs[0] }}
            </ui-paragraph>

            <ui-paragraph :indent="true" class="my-4">
              {{ multipleParagraphs[1] }}
            </ui-paragraph>

            <ui-paragraph :indent="true">
              {{ multipleParagraphs[2] }}
            </ui-paragraph>

            <div class="mt-4 flex items-center space-x-4">
              <ui-text type="secondary" size="sm">
                标签：
              </ui-text>
              <div class="flex space-x-2">
                <span class="rounded bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">设计</span>
                <span class="rounded bg-green-100 px-2.5 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-300">排版</span>
                <span class="rounded bg-purple-100 px-2.5 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">用户体验</span>
              </div>
            </div>
          </div>

          <!-- 引用段落 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              引用段落:
            </div>
            <blockquote class="border-l-4 border-gray-300 pl-4 italic">
              <ui-paragraph type="secondary">
                良好的排版是提升用户阅读体验的关键因素之一。通过合理设置字体、大小、行高和间距，可以显著提高内容的可读性和吸引力。
              </ui-paragraph>
            </blockquote>
          </div>

          <!-- 项目符号列表 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              带项目符号的段落:
            </div>
            <div class="space-y-2">
              <div class="flex items-start">
                <span class="mr-2 h-6 w-6 inline-flex items-center justify-center rounded-full bg-blue-500 text-sm text-white font-semibold">1</span>
                <ui-paragraph class="flex-1">
                  确定段落的目标受众和用途。
                </ui-paragraph>
              </div>
              <div class="flex items-start">
                <span class="mr-2 h-6 w-6 inline-flex items-center justify-center rounded-full bg-blue-500 text-sm text-white font-semibold">2</span>
                <ui-paragraph class="flex-1">
                  根据内容的重要性和逻辑关系组织段落。
                </ui-paragraph>
              </div>
              <div class="flex items-start">
                <span class="mr-2 h-6 w-6 inline-flex items-center justify-center rounded-full bg-blue-500 text-sm text-white font-semibold">3</span>
                <ui-paragraph class="flex-1">
                  选择适合的字体、大小和行高以提高可读性。
                </ui-paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
