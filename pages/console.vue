<script setup lang="ts" name="ConsolePage">
/**
 * 控制台页面
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 功能卡片数据
const functionCards = [
  {
    title: '用户管理',
    description: '管理系统用户、角色和权限',
    icon: 'carbon:user-admin',
  },
  {
    title: '系统设置',
    description: '配置系统参数和全局选项',
    icon: 'carbon:settings',
  },
  {
    title: '日志中心',
    description: '查看系统运行和操作日志',
    icon: 'carbon:document',
  },
  {
    title: '资源监控',
    description: '监控系统资源使用情况',
    icon: 'carbon:chart-line',
  },
  {
    title: '备份恢复',
    description: '数据备份和恢复管理',
    icon: 'carbon:save',
  },
  {
    title: '任务调度',
    description: '定时任务和调度管理',
    icon: 'carbon:time',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <header class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto flex items-center justify-between px-4 py-4 container">
        <div class="flex items-center gap-2">
          <ui-icon icon="carbon:dashboard" size="large" class="text-primary" />
          <h1 class="text-xl text-gray-900 font-bold dark:text-white">
            系统控制台
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-gray-600 transition-colors dark:text-gray-400 hover:text-primary">
            <ui-icon icon="carbon:home" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="mx-auto px-4 py-12 container">
      <!-- 标题区域 -->
      <section class="mb-12">
        <h2 class="mb-4 text-3xl text-gray-900 font-bold dark:text-white">
          系统控制台
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          管理和配置系统各项功能
        </p>
      </section>

      <!-- 功能卡片区域 -->
      <section>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="card in functionCards"
            :key="card.title"
            class="border border-gray-100 rounded-xl bg-white p-6 shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg"
          >
            <div class="mb-4 flex items-center gap-4">
              <div class="rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
                <ui-icon :icon="card.icon" size="large" class="text-primary" />
              </div>
              <h3 class="text-xl text-gray-900 font-bold dark:text-white">
                {{ card.title }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ card.description }}
            </p>
            <div class="mt-6 flex justify-end">
              <button class="hover:text-primary-dark flex items-center gap-1 text-primary transition-colors">
                <span>进入</span>
                <ui-icon icon="carbon:arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 系统状态区域 -->
      <section class="mt-16 border border-gray-100 rounded-xl bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-6 text-xl text-gray-900 font-bold dark:text-white">
          系统状态
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">CPU 使用率</span>
              <span class="text-green-500 font-medium">正常</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-2xl text-gray-900 font-bold dark:text-white">32%</span>
              <span class="mb-1 text-sm text-gray-500 dark:text-gray-400">/ 100%</span>
            </div>
            <div class="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <div class="h-2 rounded-full bg-green-500" style="width: 32%" />
            </div>
          </div>

          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">内存使用率</span>
              <span class="text-yellow-500 font-medium">注意</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-2xl text-gray-900 font-bold dark:text-white">68%</span>
              <span class="mb-1 text-sm text-gray-500 dark:text-gray-400">/ 100%</span>
            </div>
            <div class="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <div class="h-2 rounded-full bg-yellow-500" style="width: 68%" />
            </div>
          </div>

          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">磁盘使用率</span>
              <span class="text-green-500 font-medium">正常</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-2xl text-gray-900 font-bold dark:text-white">45%</span>
              <span class="mb-1 text-sm text-gray-500 dark:text-gray-400">/ 100%</span>
            </div>
            <div class="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
              <div class="h-2 rounded-full bg-green-500" style="width: 45%" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto px-4 text-center text-gray-600 container dark:text-gray-400">
        <p>系统控制台 &copy; {{ new Date().getFullYear() }}. 版权所有</p>
      </div>
    </footer>
  </div>
</template>
