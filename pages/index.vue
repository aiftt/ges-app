<script setup lang="ts" name="HomePage">
/**
 * 首页欢迎页面
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

const appName = 'GesApp'
const appDescription = '基于Nuxt3的现代化应用框架'

// 导航卡片数据
const navCards = [
  {
    title: '控制台',
    description: '系统管理与监控中心',
    icon: 'carbon:dashboard',
    path: '/admin',
    color: 'emerald',
  },
  {
    title: 'Dashboard',
    description: '数据统计与可视化',
    icon: 'carbon:chart-line',
    path: '/dashboard',
    color: 'blue',
  },
  {
    title: 'UI组件库',
    description: '浏览和测试所有UI组件',
    icon: 'carbon:cube',
    path: '/demo/components',
    color: 'violet',
  },
]

// 卡片颜色样式映射
const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 shadow-emerald-200/20 dark:shadow-emerald-900/10',
  blue: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 shadow-blue-200/20 dark:shadow-blue-900/10',
  violet: 'bg-violet-50 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400 shadow-violet-200/20 dark:shadow-violet-900/10',
  amber: 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 shadow-amber-200/20 dark:shadow-amber-900/10',
}

// 获取卡片颜色类名
function getCardColorClass(color: string) {
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <header class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto flex items-center justify-between px-4 py-4 container">
        <div class="flex items-center gap-2">
          <ui-icon icon="carbon:application" size="large" class="text-primary" />
          <h1 class="text-xl text-gray-900 font-bold dark:text-white">
            {{ appName }}
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <a href="https://github.com/aiftt/ges-app" target="_blank" class="text-gray-600 transition-colors dark:text-gray-400 hover:text-primary">
            <ui-icon icon="carbon:logo-github" />
          </a>
          <a href="#" class="text-gray-600 transition-colors dark:text-gray-400 hover:text-primary">
            <ui-icon icon="carbon:help" />
          </a>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="mx-auto px-4 py-12 container">
      <!-- 欢迎区域 -->
      <section class="mb-16 text-center">
        <h2 class="mb-4 text-4xl text-gray-900 font-bold dark:text-white">
          欢迎使用 {{ appName }}
        </h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          {{ appDescription }}
        </p>
      </section>

      <!-- 导航卡片区域 -->
      <section>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          <NuxtLink
            v-for="card in navCards"
            :key="card.title"
            :to="card.path"
            class="block"
          >
            <div
              class="flex flex-col rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              :class="getCardColorClass(card.color)"
            >
              <div class="mb-4 flex items-center gap-4">
                <ui-icon :icon="card.icon" size="large" />
                <h3 class="text-xl font-bold">
                  {{ card.title }}
                </h3>
              </div>
              <p class="opacity-80">
                {{ card.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- 框架信息区域 -->
      <section class="mt-20 border-t border-gray-200 pt-12 dark:border-gray-800">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 class="mb-3 text-lg text-gray-900 font-bold dark:text-white">
              技术栈
            </h3>
            <ul class="text-gray-600 space-y-2 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>Nuxt.js 3.x</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>Vue.js 3.x Composition API</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>TypeScript</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>UnoCSS</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-lg text-gray-900 font-bold dark:text-white">
              特性
            </h3>
            <ul class="text-gray-600 space-y-2 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>自定义UI组件库</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>服务端渲染 (SSR)</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>响应式设计</span>
              </li>
              <li class="flex items-center gap-2">
                <ui-icon icon="carbon:checkmark" class="text-green-500" />
                <span>暗色模式支持</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-3 text-lg text-gray-900 font-bold dark:text-white">
              快速链接
            </h3>
            <ul class="text-gray-600 space-y-2 dark:text-gray-400">
              <li>
                <a href="https://nuxt.com/" target="_blank" class="flex items-center gap-2 transition-colors hover:text-primary">
                  <ui-icon icon="carbon:arrow-right" />
                  <span>Nuxt 官方文档</span>
                </a>
              </li>
              <li>
                <a href="https://vuejs.org/" target="_blank" class="flex items-center gap-2 transition-colors hover:text-primary">
                  <ui-icon icon="carbon:arrow-right" />
                  <span>Vue 官方文档</span>
                </a>
              </li>
              <li>
                <a href="https://unocss.dev/" target="_blank" class="flex items-center gap-2 transition-colors hover:text-primary">
                  <ui-icon icon="carbon:arrow-right" />
                  <span>UnoCSS 文档</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/aiftt/ges-app" target="_blank" class="flex items-center gap-2 transition-colors hover:text-primary">
                  <ui-icon icon="carbon:arrow-right" />
                  <span>项目仓库</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto px-4 text-center text-gray-600 container dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} {{ appName }}. 版权所有</p>
      </div>
    </footer>
  </div>
</template>
