<script setup lang="ts" name="DemoOverflowList">
import type { IOverflowItem } from '~/types/common'
/**
 * 折叠列表组件演示
 * 创建日期: 2024-07-19
 * 作者: aiftt
 * 更新日期: 2024-07-19 - 初始实现
 * 更新日期: 2024-07-22 - 添加垂直方向折叠按钮在顶部的示例
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 * 更新日期: 2024-12-15 - 修复类型错误
 */
import { ref } from 'vue'

// 定义演示用数据
const tags = ref<IOverflowItem[]>([
  { text: '前端开发' },
  { text: '后端开发' },
  { text: 'UI设计' },
  { text: 'DevOps' },
  { text: '产品经理' },
  { text: '数据分析' },
  { text: '人工智能' },
  { text: '机器学习' },
  { text: '云计算' },
  { text: '网络安全' },
  { text: 'Java' },
  { text: 'TypeScript' },
  { text: 'Python' },
  { text: 'Rust' },
  { text: 'Go' },
])

const users = ref<IOverflowItem[]>([
  { id: 1, name: '张三', avatar: '👨‍💼' },
  { id: 2, name: '李四', avatar: '👩‍💼' },
  { id: 3, name: '王五', avatar: '👨‍💻' },
  { id: 4, name: '赵六', avatar: '👩‍💻' },
  { id: 5, name: '钱七', avatar: '👨‍🔧' },
  { id: 6, name: '孙八', avatar: '👩‍🔬' },
  { id: 7, name: '周九', avatar: '👨‍🚀' },
  { id: 8, name: '吴十', avatar: '👩‍🚀' },
])

// 添加复杂列表项的数据
const articles = ref<IOverflowItem[]>([
  {
    id: 1,
    title: '如何高效使用Vue3组合式API',
    summary: 'Vue3的组合式API为开发者提供了更灵活的组织代码的方式，本文详细介绍了如何使用Vue3的组合式API进行高效开发...',
    date: '2024-01-15',
    views: 1240,
  },
  {
    id: 2,
    title: 'TypeScript高级类型体操实战',
    summary: '本文将带你深入了解TypeScript的高级类型系统，包括条件类型、映射类型、递归类型等高级特性的实际应用...',
    date: '2024-02-22',
    views: 890,
  },
  {
    id: 3,
    title: 'CSS Grid布局完全指南',
    summary: 'CSS Grid是一种强大的二维布局系统，本文将帮助你全面掌握CSS Grid布局，从基础概念到复杂应用...',
    date: '2024-03-10',
    views: 1560,
  },
  {
    id: 4,
    title: '前端性能优化最佳实践',
    summary: '本文总结了前端性能优化的多种技术和方法，包括资源加载优化、渲染性能优化、代码分割等多种策略...',
    date: '2024-04-05',
    views: 2100,
  },
  {
    id: 5,
    title: 'WebAssembly入门与应用',
    summary: 'WebAssembly正在改变Web应用的性能边界，本文介绍了WebAssembly的基础知识和在实际项目中的应用方法...',
    date: '2024-05-18',
    views: 780,
  },
  {
    id: 6,
    title: '微前端架构实践指南',
    summary: '微前端为大型前端应用提供了一种可扩展的解决方案，本文分享了微前端架构的设计思路和实践经验...',
    date: '2024-06-30',
    views: 1320,
  },
])

// 处理"更多"点击
function handleOverflowClick(hiddenItems: IOverflowItem[]) {
  if (Array.isArray(hiddenItems)) {
    console.warn(`隐藏了 ${hiddenItems.length} 个项目`)
  }
}

// 可见性变化处理
function handleVisibilityChange(visibleItems: IOverflowItem[], hiddenItems: IOverflowItem[]) {
  console.warn('可见项:', visibleItems.length, '隐藏项:', hiddenItems.length)
}

// 显示的宽度
const demoWidth = ref('100%')

// 改变容器宽度
function changeContainerWidth(width: string) {
  demoWidth.value = width
}

// 示例代码
const basicCode = `<script setup>
// 定义标签数据
const tags = [
  { text: '前端开发' },
  { text: '后端开发' },
  { text: 'UI设计' },
  { text: 'DevOps' },
  { text: '产品经理' },
  { text: '数据分析' },
  { text: '人工智能' },
  { text: '机器学习' },
  { text: '云计算' },
  { text: '网络安全' }
]

function handleOverflowClick(hiddenItems) {
  console.log(\`隐藏了 \${hiddenItems.length} 个项目\`)
}
<\/script>

<template>
  <ui-overflowlist
    :items="tags"
    :min-visible-items="3"
    overflow-text="+ 更多标签"
    :min-item-width="60"
    :expand-on-click="true"
    @overflow-click="handleOverflowClick"
  >
    <template #item="{ item }">
      <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
        {{ item.text }}
      </div>
    </template>
  </ui-overflowlist>
</template>`

const startPositionCode = `<ui-overflowlist
  :items="tags"
  :min-visible-items="3"
  :min-item-width="60"
  overflow-position="start"
  overflow-text="更多标签 +"
  :expand-on-click="true"
>
  <template #item="{ item }">
    <div class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
      {{ item.text }}
    </div>
  </template>
</ui-overflowlist>`

const customStyleCode = `<ui-overflowlist
  :items="users"
  item-key="id"
  :min-visible-items="2"
  :min-item-width="100"
  overflow-text="更多用户"
  :gap="16"
  :expand-on-click="true"
  item-class="border border-gray-200 rounded-lg p-2 bg-white"
  overflow-class="bg-purple-600 text-white px-3 py-2 rounded-lg"
>
  <template #item="{ item }">
    <div class="flex items-center gap-2">
      <span class="text-xl">{{ item.avatar }}</span>
      <span>{{ item.name }}</span>
    </div>
  </template>
  <template #overflow="{ hiddenItems }">
    <div class="flex items-center gap-2">
      <span>+{{ hiddenItems.length }} 人</span>
    </div>
  </template>
</ui-overflowlist>`

const horizontalExpandCode = `<ui-overflowlist
  :items="tags"
  :min-visible-items="3"
  :min-item-width="60"
  overflow-text="+ 更多标签"
  collapse-text="收起标签"
  :expand-on-click="true"
>
  <template #item="{ item }">
    <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
      {{ item.text }}
    </div>
  </template>
  <template #overflow="{ hiddenItems, isExpanded }">
    <div class="flex items-center justify-center gap-2">
      {{ isExpanded ? '收起标签' : '+' + hiddenItems.length + ' 标签' }}
      <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
    </div>
  </template>
</ui-overflowlist>`

const verticalLayoutCode = `<script setup>
// 文章数据
const articles = [
  {
    id: 1,
    title: '如何高效使用Vue3组合式API',
    summary: 'Vue3的组合式API为开发者提供了更灵活的组织代码的方式...',
    date: '2024-01-15',
    views: 1240,
  },
  // 更多文章...
]
<\/script>

<template>
  <ui-overflowlist
    :items="articles"
    item-key="id"
    :min-visible-items="2"
    direction="vertical"
    max-height="300px"
    :expand-on-click="true"
    overflow-text="显示更多文章"
    collapse-text="收起文章列表"
  >
    <template #item="{ item }">
      <div class="mb-2 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow">
        <div class="mb-2 flex items-start justify-between">
          <h4 class="text-lg text-gray-900 font-medium">
            {{ item.title }}
          </h4>
          <span class="text-sm text-gray-500">{{ item.date }}</span>
        </div>
        <p class="mb-3 text-gray-700">
          {{ item.summary }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">阅读量: {{ item.views }}</span>
          <button class="text-sm text-blue-600 hover:text-blue-800">
            阅读全文
          </button>
        </div>
      </div>
    </template>
    <template #overflow="{ hiddenItems, isExpanded }">
      <div class="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-blue-600 hover:bg-blue-100">
        <span>{{ isExpanded ? '收起文章列表' : \`显示更多 \${hiddenItems.length} 篇文章\` }}</span>
        <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
      </div>
    </template>
  </ui-overflowlist>
</template>`

const verticalTopCode = `<ui-overflowlist
  :items="articles"
  item-key="id"
  :min-visible-items="2"
  direction="vertical"
  overflow-position="start"
  max-height="300px"
  :expand-on-click="true"
  overflow-text="展开文章列表"
  collapse-text="收起文章列表"
>
  <template #item="{ item }">
    <div class="mb-2 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow">
      <div class="mb-2 flex items-start justify-between">
        <h4 class="text-lg text-gray-900 font-medium">
          {{ item.title }}
        </h4>
        <span class="text-sm text-gray-500">{{ item.date }}</span>
      </div>
      <p class="mb-3 text-gray-700">
        {{ item.summary }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">阅读量: {{ item.views }}</span>
        <button class="text-sm text-blue-600 hover:text-blue-800">
          阅读全文
        </button>
      </div>
    </div>
  </template>
  <template #overflow="{ isExpanded }">
    <div class="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700">
      <span>{{ isExpanded ? '收起文章列表' : \`查看全部 \${articles.length} 篇文章\` }}</span>
      <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
    </div>
  </template>
</ui-overflowlist>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      OverflowList 折叠列表
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      折叠列表组件用于在有限空间内展示一组项目，当空间不足时自动折叠多余项目并显示"更多"按钮。
    </p>

    <!-- 控制面板 -->
    <div class="mb-6 flex gap-4">
      <button
        v-for="width in ['100%', '80%', '60%', '40%', '20%']"
        :key="width"
        class="border border-gray-300 rounded px-3 py-1 text-sm transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400': demoWidth === width }"
        @click="changeContainerWidth(width)"
      >
        宽度: {{ width }}
      </button>
    </div>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="当空间不足时，自动隐藏部分项目并显示更多按钮。点击更多按钮展开全部，再次点击收起。"
      :code="basicCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="tags"
          :min-visible-items="3"
          overflow-text="+ 更多标签"
          :min-item-width="60"
          :expand-on-click="true"
          @overflow-click="handleOverflowClick"
          @visibility-change="handleVisibilityChange"
        >
          <template #item="{ item }">
            <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {{ item.text }}
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- 开头显示更多 -->
    <ui-demo
      title="开头显示更多"
      description="设置overflow-position为start，可以将更多按钮显示在开头。"
      :code="startPositionCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="tags"
          :min-visible-items="3"
          :min-item-width="60"
          overflow-position="start"
          overflow-text="更多标签 +"
          :expand-on-click="true"
          @overflow-click="handleOverflowClick"
        >
          <template #item="{ item }">
            <div class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-100">
              {{ item.text }}
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过item-class和overflow-class可以自定义列表项和更多按钮的样式。"
      :code="customStyleCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="users"
          item-key="id"
          :min-visible-items="2"
          :min-item-width="100"
          overflow-text="更多用户"
          :gap="16"
          :expand-on-click="true"
          item-class="border border-gray-200 rounded-lg p-2 bg-white dark:border-gray-700 dark:bg-gray-700"
          overflow-class="bg-purple-600 text-white px-3 py-2 rounded-lg"
          @overflow-click="handleOverflowClick"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-2">
              <span class="text-xl">{{ item.avatar }}</span>
              <span>{{ item.name }}</span>
            </div>
          </template>
          <template #overflow="{ hiddenItems }">
            <div class="flex items-center gap-2">
              <span>+{{ hiddenItems.length }} 人</span>
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- 水平方向展开效果 -->
    <ui-demo
      title="水平方向展开效果"
      description="点击更多按钮展开所有标签项，标签将自动换行显示，确保所有内容可见。再次点击收起。"
      :code="horizontalExpandCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="tags"
          :min-visible-items="3"
          :min-item-width="60"
          overflow-text="+ 更多标签"
          collapse-text="收起标签"
          :expand-on-click="true"
          @overflow-click="handleOverflowClick"
        >
          <template #item="{ item }">
            <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {{ item.text }}
            </div>
          </template>
          <template #overflow="{ hiddenItems, isExpanded }">
            <div class="flex items-center justify-center gap-2">
              {{ isExpanded ? '收起标签' : `+${hiddenItems.length} 标签` }}
              <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- 垂直方向布局 -->
    <ui-demo
      title="垂直方向布局"
      description="垂直方向的折叠列表，适用于文章列表、评论列表等占据整行的内容。"
      :code="verticalLayoutCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="articles"
          item-key="id"
          :min-visible-items="2"
          direction="vertical"
          max-height="300px"
          :expand-on-click="true"
          overflow-text="显示更多文章"
          collapse-text="收起文章列表"
          @overflow-click="handleOverflowClick"
        >
          <template #item="{ item }">
            <div class="mb-2 rounded-lg bg-white p-4 shadow-sm transition-shadow dark:bg-gray-700 hover:shadow">
              <div class="mb-2 flex items-start justify-between">
                <h4 class="text-lg font-medium">
                  {{ item.title }}
                </h4>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.date }}</span>
              </div>
              <p class="mb-3 text-gray-700 dark:text-gray-300">
                {{ item.summary }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">阅读量: {{ item.views }}</span>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  阅读全文
                </button>
              </div>
            </div>
          </template>
          <template #overflow="{ hiddenItems, isExpanded }">
            <div class="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-blue-600 transition-colors dark:bg-blue-900/50 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900">
              <span>{{ isExpanded ? '收起文章列表' : `显示更多 ${hiddenItems.length} 篇文章` }}</span>
              <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- 垂直方向布局 - 顶部折叠按钮 -->
    <ui-demo
      title="垂直方向布局 - 顶部折叠按钮"
      description="垂直方向折叠列表，折叠按钮位于列表顶部。适用于需要在顶部展示查看全部或类似功能的场景。"
      :code="verticalTopCode"
    >
      <div :style="{ width: demoWidth }" class="border border-gray-200 rounded bg-gray-50 p-4 transition-all dark:border-gray-700 dark:bg-gray-800">
        <ui-overflowlist
          :items="articles"
          item-key="id"
          :min-visible-items="2"
          direction="vertical"
          overflow-position="start"
          max-height="300px"
          :expand-on-click="true"
          overflow-text="展开文章列表"
          collapse-text="收起文章列表"
          @overflow-click="handleOverflowClick"
        >
          <template #item="{ item }">
            <div class="mb-2 rounded-lg bg-white p-4 shadow-sm transition-shadow dark:bg-gray-700 hover:shadow">
              <div class="mb-2 flex items-start justify-between">
                <h4 class="text-lg font-medium">
                  {{ item.title }}
                </h4>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.date }}</span>
              </div>
              <p class="mb-3 text-gray-700 dark:text-gray-300">
                {{ item.summary }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">阅读量: {{ item.views }}</span>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  阅读全文
                </button>
              </div>
            </div>
          </template>
          <template #overflow="{ isExpanded }">
            <div class="flex items-center justify-center gap-2 text-amber-600 transition-colors dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400">
              <span>{{ isExpanded ? '收起文章列表' : `查看全部 ${articles.length} 篇文章` }}</span>
              <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      OverflowList 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            items
          </td>
          <td class="px-4 py-2">
            array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            列表项数据数组
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            itemKey
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            用于标识列表项的唯一键名，当items为对象数组时必填
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            minVisibleItems
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            1
          </td>
          <td class="px-4 py-2">
            最少显示的项目数
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            minItemWidth
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            水平模式下，每个项目的最小宽度
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            maxHeight
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            垂直模式下的最大高度，例如 '300px'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            direction
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'horizontal'
          </td>
          <td class="px-4 py-2">
            布局方向，可选值：'horizontal'、'vertical'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            overflowPosition
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'end'
          </td>
          <td class="px-4 py-2">
            折叠按钮位置，可选值：'start'、'end'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            overflowText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '更多'
          </td>
          <td class="px-4 py-2">
            折叠按钮文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            collapseText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '收起'
          </td>
          <td class="px-4 py-2">
            折叠按钮展开状态下的文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            expandOnClick
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            点击折叠按钮时是否展开所有项目
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            gap
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            8
          </td>
          <td class="px-4 py-2">
            项目之间的间距
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            itemClass
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义列表项类名
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            overflowClass
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义折叠按钮类名
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      OverflowList 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            overflow-click
          </td>
          <td class="px-4 py-2">
            (hiddenItems: IOverflowItem[]) => void
          </td>
          <td class="px-4 py-2">
            点击折叠按钮时触发，参数为隐藏的项目数组
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            visibility-change
          </td>
          <td class="px-4 py-2">
            (visibleItems: IOverflowItem[], hiddenItems: IOverflowItem[]) => void
          </td>
          <td class="px-4 py-2">
            可见性变化时触发，包含可见项目和隐藏项目数组
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      OverflowList 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            插槽属性
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            item
          </td>
          <td class="px-4 py-2">
            { item, index }
          </td>
          <td class="px-4 py-2">
            列表项内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            overflow
          </td>
          <td class="px-4 py-2">
            { hiddenItems, isExpanded }
          </td>
          <td class="px-4 py-2">
            折叠按钮内容
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
