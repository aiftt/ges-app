<script setup lang="ts" name="DemoTheme">
/**
 * 主题色彩展示页面
 * 创建日期: 2023-12-12
 * 作者: aiftt
 * 展示更新后的主题色彩体系
 */

import { onMounted, ref } from 'vue'

// 当前主题
const isDarkTheme = ref(false)

// 切换暗色模式
function toggleDarkMode() {
  isDarkTheme.value = !isDarkTheme.value

  const html = document.documentElement
  if (isDarkTheme.value) {
    html.classList.add('dark')
  }
  else {
    html.classList.remove('dark')
  }
}

// 在mounted时检查当前主题
onMounted(() => {
  const html = document.documentElement
  isDarkTheme.value = html.classList.contains('dark')
})

// 颜色系列
const colorSeries = [
  {
    title: '主色系 Primary',
    colors: [
      { name: 'primary', var: '--ui-color-primary' },
      { name: 'primary-light', var: '--ui-color-primary-light' },
      { name: 'primary-dark', var: '--ui-color-primary-dark' },
    ],
  },
  {
    title: '成功色系 Success',
    colors: [
      { name: 'success', var: '--ui-color-success' },
      { name: 'success-light', var: '--ui-color-success-light' },
      { name: 'success-dark', var: '--ui-color-success-dark' },
    ],
  },
  {
    title: '警告色系 Warning',
    colors: [
      { name: 'warning', var: '--ui-color-warning' },
      { name: 'warning-light', var: '--ui-color-warning-light' },
      { name: 'warning-dark', var: '--ui-color-warning-dark' },
    ],
  },
  {
    title: '危险色系 Danger',
    colors: [
      { name: 'danger', var: '--ui-color-danger' },
      { name: 'danger-light', var: '--ui-color-danger-light' },
      { name: 'danger-dark', var: '--ui-color-danger-dark' },
    ],
  },
  {
    title: '信息色系 Info',
    colors: [
      { name: 'info', var: '--ui-color-info' },
      { name: 'info-light', var: '--ui-color-info-light' },
      { name: 'info-dark', var: '--ui-color-info-dark' },
    ],
  },
  {
    title: '次要色系 Secondary',
    colors: [
      { name: 'secondary', var: '--ui-color-secondary' },
      { name: 'secondary-light', var: '--ui-color-secondary-light' },
      { name: 'secondary-dark', var: '--ui-color-secondary-dark' },
    ],
  },
]

// 文本与背景色系
const neutralColors = [
  {
    title: '文本颜色',
    colors: [
      { name: 'text', var: '--ui-color-text' },
      { name: 'text-light', var: '--ui-color-text-light' },
      { name: 'text-lighter', var: '--ui-color-text-lighter' },
      { name: 'text-lightest', var: '--ui-color-text-lightest' },
      { name: 'text-dark', var: '--ui-color-text-dark' },
      { name: 'text-heading', var: '--ui-color-text-heading' },
    ],
  },
  {
    title: '背景颜色',
    colors: [
      { name: 'bg', var: '--ui-color-bg' },
      { name: 'bg-light', var: '--ui-color-bg-light' },
      { name: 'bg-dark', var: '--ui-color-bg-dark' },
    ],
  },
  {
    title: '边框颜色',
    colors: [
      { name: 'border', var: '--ui-color-border' },
      { name: 'border-dark', var: '--ui-color-border-dark' },
    ],
  },
  {
    title: '禁用状态颜色',
    colors: [
      { name: 'disabled-bg', var: '--ui-color-disabled-bg' },
      { name: 'disabled-text', var: '--ui-color-disabled-text' },
      { name: 'disabled-border', var: '--ui-color-disabled-border' },
    ],
  },
]

// 获取CSS变量的值
function getVariableValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
    <div class="mb-4 flex justify-end">
      <button class="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700" @click="toggleDarkMode">
        {{ isDarkTheme ? '切换到亮色模式' : '切换到暗色模式' }}
      </button>
    </div>

    <div class="mx-auto max-w-6xl">
      <h1 class="mb-8 text-3xl text-gray-900 font-bold dark:text-white">
        主题色彩系统
      </h1>

      <!-- 主题色系展示 -->
      <div class="mb-12">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          主题色系
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-for="series in colorSeries" :key="series.title" class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 class="mb-3 text-gray-700 font-bold dark:text-gray-300">
              {{ series.title }}
            </h3>
            <div class="space-y-3">
              <div v-for="color in series.colors" :key="color.name" class="flex items-center">
                <div
                  class="mr-3 h-10 w-10 flex-shrink-0 rounded-md"
                  :style="{ backgroundColor: `var(${color.var})` }"
                />
                <div class="flex-grow">
                  <div class="text-sm text-gray-700 font-medium dark:text-gray-300">
                    {{ color.name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getVariableValue(color.var) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文本与背景色系展示 -->
      <div class="mb-12">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          中性色系
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-for="series in neutralColors" :key="series.title" class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
            <h3 class="mb-3 text-gray-700 font-bold dark:text-gray-300">
              {{ series.title }}
            </h3>
            <div class="space-y-3">
              <div v-for="color in series.colors" :key="color.name" class="flex items-center">
                <div
                  class="mr-3 h-10 w-10 flex-shrink-0 rounded-md"
                  :style="{ backgroundColor: `var(${color.var})` }"
                />
                <div class="flex-grow">
                  <div class="text-sm text-gray-700 font-medium dark:text-gray-300">
                    {{ color.name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getVariableValue(color.var) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 按钮示例 -->
      <div class="mb-12">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          按钮组件示例
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="flex flex-wrap gap-4">
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
            <ui-button type="info">
              信息按钮
            </ui-button>
          </div>
        </div>
      </div>

      <!-- 示例代码 -->
      <div class="mb-12">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          使用主题色彩示例
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 class="mb-3 text-gray-700 font-bold dark:text-gray-300">
            CSS变量使用
          </h3>
          <div class="rounded bg-gray-100 p-4 dark:bg-gray-700">
            <pre class="overflow-x-auto text-sm text-gray-700 dark:text-gray-300">
.custom-element {
  /* 使用主题色彩 */
  color: var(--ui-color-primary);
  background-color: var(--ui-color-bg-light);
  border: 1px solid var(--ui-color-border);
}

/* 状态颜色 */
.success-message {
  color: var(--ui-color-success);
}

.error-message {
  color: var(--ui-color-danger);
}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
