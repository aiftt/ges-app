<script setup lang="ts" name="DemoTheme">
/**
 * 主题色彩展示页面
 * 创建日期: 2023-12-12
 * 作者: aiftt
 * 更新日期: 2025-05-02 - 添加UiConfigProvider示例
 * 更新日期: 2025-05-03 - 更新示例，展示如何覆盖特定CSS变量
 */

import { computed, ref } from 'vue'

// 当前主题
const currentTheme = ref<'light' | 'dark' | 'auto'>('light')

// 自定义亮色主题 - 仅包含需要覆盖的变量
const customLightTheme = ref({
  'color-primary': '#3b82f6', // 自定义主色为蓝色
})

// 自定义暗色主题 - 仅包含需要覆盖的变量
const customDarkTheme = ref({
  'color-primary': '#2563eb', // 自定义主色为深蓝色
})

// 切换主题
function setTheme(theme: 'light' | 'dark' | 'auto') {
  currentTheme.value = theme
}

// 是否是暗色模式
const isDarkTheme = computed(() => {
  if (currentTheme.value === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return currentTheme.value === 'dark'
})

// 改变主题色为随机色
function changeRandomPrimaryColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  customLightTheme.value['color-primary'] = randomColor
  customDarkTheme.value['color-primary'] = randomColor
}

// 重置为默认主题色
function resetThemeColors() {
  // 移除自定义覆盖，回归到CSS变量默认值
  delete customLightTheme.value['color-primary']
  delete customDarkTheme.value['color-primary']

  // 为了使视图更新，我们需要创建一个新对象
  customLightTheme.value = { ...customLightTheme.value }
  customDarkTheme.value = { ...customDarkTheme.value }
}

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
      { name: 'text-secondary', var: '--ui-color-text-secondary' },
      { name: 'text-disabled', var: '--ui-color-text-disabled' },
    ],
  },
  {
    title: '背景颜色',
    colors: [
      { name: 'bg', var: '--ui-color-bg' },
      { name: 'bg-secondary', var: '--ui-color-bg-secondary' },
    ],
  },
  {
    title: '边框颜色',
    colors: [
      { name: 'border', var: '--ui-color-border' },
    ],
  },
]

// 获取CSS变量的值
function getVariableValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
</script>

<template>
  <ui-config-provider
    :theme="currentTheme"
    :light-theme="customLightTheme"
    :dark-theme="customDarkTheme"
  >
    <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <!-- 主题控制面板 -->
      <div class="mb-8 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          主题配置
        </h2>

        <div class="mb-4">
          <h3 class="mb-2 text-sm text-gray-700 font-medium dark:text-gray-300">
            主题模式
          </h3>
          <div class="flex space-x-2">
            <ui-button
              :type="currentTheme === 'light' ? 'primary' : 'default'"
              @click="setTheme('light')"
            >
              亮色模式
            </ui-button>
            <ui-button
              :type="currentTheme === 'dark' ? 'primary' : 'default'"
              @click="setTheme('dark')"
            >
              暗色模式
            </ui-button>
            <ui-button
              :type="currentTheme === 'auto' ? 'primary' : 'default'"
              @click="setTheme('auto')"
            >
              跟随系统
            </ui-button>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="mb-2 text-sm text-gray-700 font-medium dark:text-gray-300">
            主题颜色
          </h3>
          <div class="flex space-x-2">
            <ui-button @click="changeRandomPrimaryColor">
              随机主题色
            </ui-button>
            <ui-button @click="resetThemeColors">
              重置主题
            </ui-button>
          </div>
        </div>

        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="mb-2">
            当前主题: {{ currentTheme }}
          </p>
          <p>暗色模式: {{ isDarkTheme ? '已启用' : '未启用' }}</p>
          <p class="mt-2">
            自定义主色: {{ customLightTheme['color-primary'] || '使用默认值' }}
          </p>
        </div>
      </div>

      <!-- UiConfigProvider 使用示例 -->
      <div class="mb-8 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h2 class="mb-4 text-xl text-gray-800 font-bold dark:text-gray-200">
          UiConfigProvider 用法示例
        </h2>

        <div class="mb-4 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-x-auto text-sm text-gray-700 dark:text-gray-300">
&lt;script setup&gt;
// 自定义亮色主题 - 仅包含需要覆盖的变量
const customLightTheme = ref({
  'color-primary': '#3b82f6', // 自定义主色为蓝色
})

// 自定义暗色主题 - 仅包含需要覆盖的变量
const customDarkTheme = ref({
  'color-primary': '#2563eb', // 自定义主色为深蓝色
})

// 当前主题模式
const currentTheme = ref('light') // 可选值: 'light', 'dark', 'auto'
&lt;/script&gt;

&lt;template&gt;
  &lt;ui-config-provider
    :theme="currentTheme"
    :light-theme="customLightTheme"
    :dark-theme="customDarkTheme"
  &gt;
    &lt;!-- 应用内容 --&gt;
  &lt;/ui-config-provider&gt;
&lt;/template&gt;
          </pre>
        </div>

        <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
          新的ConfigProvider仅需要提供要覆盖的CSS变量，它会保留themes/目录下定义的基础变量值，避免重复设置所有变量。
        </p>
      </div>

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
    </div>
  </ui-config-provider>
</template>
