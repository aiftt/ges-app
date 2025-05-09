<script setup lang="ts">
/**
 * 折叠列表组件演示
 * 创建日期: 2024-07-19
 * 作者: aiftt
 * 更新日期: 2024-07-19 - 初始实现
 * 2024-07-22 - 添加垂直方向折叠按钮在顶部的示例
 */
import { ref } from 'vue'

// 定义演示用数据
const tags = ref([
  '前端开发',
  '后端开发',
  'UI设计',
  'DevOps',
  '产品经理',
  '数据分析',
  '人工智能',
  '机器学习',
  '云计算',
  '网络安全',
  'Java',
  'TypeScript',
  'Python',
  'Rust',
  'Go',
])

const users = ref([
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
const articles = ref([
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
function handleOverflowClick(hiddenItems: any[]) {
  if (Array.isArray(hiddenItems)) {
    console.warn(`隐藏了 ${hiddenItems.length} 个项目`)
  }
}

// 可见性变化处理
function handleVisibilityChange(visibleItems: any[], hiddenItems: any[]) {
  console.warn('可见项:', visibleItems.length, '隐藏项:', hiddenItems.length)
}

// 显示的宽度
const demoWidth = ref('100%')

// 改变容器宽度
function changeContainerWidth(width: string) {
  demoWidth.value = width
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-xl font-bold">
      折叠列表 OverflowList
    </h2>

    <!-- 控制面板 -->
    <div class="mb-6 flex gap-4">
      <button
        v-for="width in ['100%', '80%', '60%', '40%', '20%']"
        :key="width"
        class="border border-gray-300 rounded px-3 py-1 text-sm transition hover:bg-gray-100"
        :class="{ 'bg-blue-100 border-blue-500': demoWidth === width }"
        @click="changeContainerWidth(width)"
      >
        宽度: {{ width }}
      </button>
    </div>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
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
            <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {{ item }}
            </div>
          </template>
        </ui-overflowlist>
      </div>
      <p class="text-sm text-gray-600">
        当空间不足时，自动隐藏部分项目并显示"更多"按钮。点击"更多"按钮展开全部，再次点击收起。
      </p>
    </section>

    <!-- 开头显示更多 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        开头显示更多
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
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
            <div class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              {{ item }}
            </div>
          </template>
        </ui-overflowlist>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
        <ui-overflowlist
          :items="users"
          item-key="id"
          :min-visible-items="2"
          :min-item-width="100"
          overflow-text="更多用户"
          :gap="16"
          :expand-on-click="true"
          item-class="border border-gray-200 rounded-lg p-2 bg-white"
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
    </section>

    <!-- 点击展开 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        水平方向展开效果
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
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
            <div class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              {{ item }}
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
      <p class="text-sm text-gray-600">
        点击"更多"按钮展开所有标签项，标签将自动换行显示，确保所有内容可见。再次点击收起。
      </p>
    </section>

    <!-- 垂直方向布局 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        垂直方向布局
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
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
            <div class="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-100">
              <span>{{ isExpanded ? '收起文章列表' : `显示更多 ${hiddenItems.length} 篇文章` }}</span>
              <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
            </div>
          </template>
        </ui-overflowlist>
      </div>
      <p class="text-sm text-gray-600">
        垂直方向的折叠列表，适用于文章列表、评论列表等占据整行的内容。点击"显示更多"按钮展开全部，再次点击收起。
      </p>
    </section>

    <!-- 垂直方向布局 - 顶部折叠按钮 -->
    <section class="mb-8">
      <h3 class="mb-4 text-lg font-medium">
        垂直方向布局 - 顶部折叠按钮
      </h3>
      <div :style="{ width: demoWidth }" class="mb-6 border border-gray-200 rounded bg-gray-50 p-4 transition-all">
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
            <div class="flex items-center justify-center gap-2 text-amber-600 transition-colors hover:text-amber-700">
              <span>{{ isExpanded ? '收起文章列表' : `查看全部 ${articles.length} 篇文章` }}</span>
              <ui-icon :icon="isExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
            </div>
          </template>
        </ui-overflowlist>
      </div>
      <p class="text-sm text-gray-600">
        垂直方向折叠列表，折叠按钮位于列表顶部。适用于需要在顶部展示"查看全部"或类似功能的场景。
      </p>
    </section>
  </div>
</template>
