<script setup lang="ts" name="DemoTheme">
/**
 * 主题变量演示组件
 * 创建日期: 2023-12-05
 * 作者: aiftt
 */
import { ref } from 'vue'

// 主题色彩示例
const colorVariables = [
  { name: '主色', variable: '--ui-color-primary', light: '#10b981', dark: '#10b981' },
  { name: '成功色', variable: '--ui-color-success', light: '#10b981', dark: '#10b981' },
  { name: '警告色', variable: '--ui-color-warning', light: '#f59e0b', dark: '#f59e0b' },
  { name: '危险色', variable: '--ui-color-danger', light: '#ef4444', dark: '#ef4444' },
  { name: '信息色', variable: '--ui-color-info', light: '#3b82f6', dark: '#3b82f6' },
  { name: '文本色', variable: '--ui-color-text', light: '#374151', dark: '#f9fafb' },
  { name: '次要文本色', variable: '--ui-color-text-secondary', light: '#6b7280', dark: '#e5e7eb' },
  { name: '边框色', variable: '--ui-color-border', light: '#e5e7eb', dark: '#374151' },
  { name: '背景色', variable: '--ui-color-bg', light: '#ffffff', dark: '#111827' },
]

// 尺寸变量示例
const sizeVariables = [
  { name: '极小间距', variable: '--ui-spacing-xs', value: '0.25rem' },
  { name: '小间距', variable: '--ui-spacing-sm', value: '0.5rem' },
  { name: '标准间距', variable: '--ui-spacing', value: '1rem' },
  { name: '中等间距', variable: '--ui-spacing-md', value: '1.5rem' },
  { name: '大间距', variable: '--ui-spacing-lg', value: '2rem' },
  { name: '特大间距', variable: '--ui-spacing-xl', value: '3rem' },
]

// 圆角变量示例
const radiusVariables = [
  { name: '小圆角', variable: '--ui-border-radius-sm', value: '0.25rem' },
  { name: '标准圆角', variable: '--ui-border-radius', value: '0.375rem' },
  { name: '中等圆角', variable: '--ui-border-radius-md', value: '0.5rem' },
  { name: '大圆角', variable: '--ui-border-radius-lg', value: '0.75rem' },
  { name: '圆形', variable: '--ui-border-radius-full', value: '9999px' },
]

// 字体大小变量示例
const fontSizeVariables = [
  { name: '极小字体', variable: '--ui-font-size-xs', value: '0.75rem' },
  { name: '小字体', variable: '--ui-font-size-sm', value: '0.875rem' },
  { name: '标准字体', variable: '--ui-font-size', value: '1rem' },
  { name: '中等字体', variable: '--ui-font-size-md', value: '1.125rem' },
  { name: '大字体', variable: '--ui-font-size-lg', value: '1.25rem' },
  { name: '特大字体', variable: '--ui-font-size-xl', value: '1.5rem' },
]

// 阴影变量示例
const shadowVariables = [
  { name: '小阴影', variable: '--ui-shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  { name: '标准阴影', variable: '--ui-shadow', value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
  { name: '中等阴影', variable: '--ui-shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  { name: '大阴影', variable: '--ui-shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  { name: '特大阴影', variable: '--ui-shadow-xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
]

// 示例代码 - 使用变量定制组件
const sampleCode = `<!-- 使用 CSS 变量定制样式 -->
<div class="card">
  使用CSS变量定制卡片样式
</div>

<style>
.card {
  background-color: var(--ui-color-bg);
  color: var(--ui-color-text);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-border-radius);
  padding: var(--ui-spacing);
  box-shadow: var(--ui-shadow);
}

/* 暗色模式自动适配 */
@media (prefers-color-scheme: dark) {
  .card {
    background-color: var(--ui-color-bg-dark);
    color: var(--ui-color-text-dark);
  }
}
</style>`

// 示例代码 - UnoCSS 使用
const unocssCode = `<!-- 使用 Tailwind CSS 与 CSS 变量结合 -->
<div class="bg-theme-bg text-theme-text border border-theme-border rounded-theme p-theme shadow-theme">
  使用 Tailwind CSS 与 CSS 变量结合
</div>

<!-- 使用主题辅助类 -->
<div class="bg-primary text-white rounded p-4">
  使用预定义的主题辅助类
</div>`

// 是否使用暗色模式
const darkMode = ref(false)

// 切换暗色模式
function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<template>
  <div class="space-y-10">
    <section>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl text-gray-900 font-bold dark:text-white">
          主题变量系统
        </h2>
        <button
          class="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          @click="toggleDarkMode"
        >
          <ui-icon :icon="darkMode ? 'material-symbols:light-mode-outline' : 'material-symbols:dark-mode-outline'" />
          {{ darkMode ? '亮色模式' : '暗色模式' }}
        </button>
      </div>
      <p class="mb-6 text-gray-600 dark:text-gray-400">
        主题变量系统使用 CSS 变量实现，可以在全局范围内定制 UI 组件的外观。通过修改这些变量，可以轻松地创建自定义主题。
      </p>
    </section>

    <!-- 颜色变量 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        颜色变量
      </h3>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="color in colorVariables" :key="color.variable" class="border border-gray-200 rounded-md p-4 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 rounded-full"
              :class="{
                'border border-gray-300 dark:border-gray-600': color.variable.includes('bg') || color.variable.includes('white'),
              }"
              :style="`background-color: var(${color.variable})`"
            />
            <div>
              <div class="text-gray-800 font-medium dark:text-gray-200">
                {{ color.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ color.variable }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 尺寸与间距变量 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        尺寸与间距变量
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="size in sizeVariables" :key="size.variable" class="border border-gray-200 rounded-md p-4 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-gray-800 font-medium dark:text-gray-200">
                {{ size.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ size.variable }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ size.value }}
              </div>
            </div>
            <div class="bg-primary" :style="`width: calc(${size.value} * 4); height: 1rem;`" />
          </div>
        </div>
      </div>
    </section>

    <!-- 边框圆角变量 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        边框圆角变量
      </h3>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-5 md:grid-cols-3">
        <div v-for="radius in radiusVariables" :key="radius.variable" class="text-center">
          <div
            class="mx-auto mb-2 h-16 w-16 border-2 border-primary"
            :style="`border-radius: var(${radius.variable})`"
          />
          <div class="text-gray-800 font-medium dark:text-gray-200">
            {{ radius.name }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ radius.variable }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ radius.value }}
          </div>
        </div>
      </div>
    </section>

    <!-- 字体大小变量 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        字体大小变量
      </h3>
      <div class="space-y-4">
        <div v-for="fontSize in fontSizeVariables" :key="fontSize.variable" class="border border-gray-200 rounded-md p-4 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-gray-800 font-medium dark:text-gray-200">
                {{ fontSize.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ fontSize.variable }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ fontSize.value }}
              </div>
            </div>
            <div :style="`font-size: var(${fontSize.variable})`" class="text-gray-700 dark:text-gray-300">
              示例文本
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 阴影变量 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        阴影变量
      </h3>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="shadow in shadowVariables" :key="shadow.variable" class="text-center">
          <div
            class="mx-auto mb-4 h-24 w-24 bg-white dark:bg-gray-700"
            :style="`box-shadow: var(${shadow.variable})`"
          />
          <div class="text-gray-800 font-medium dark:text-gray-200">
            {{ shadow.name }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ shadow.variable }}
          </div>
        </div>
      </div>
    </section>

    <!-- 使用示例 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        使用示例 - CSS 变量
      </h3>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div class="card mb-4">
            使用CSS变量定制卡片样式
          </div>
          <div class="overflow-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <ui-code :code="sampleCode" lang="css" :line-numbers="true" theme="auto" />
          </div>
        </div>
        <div>
          <div class="rounded-theme shadow-theme bg-theme-bg p-theme border-theme-border text-theme-text mb-4 border">
            使用 Tailwind CSS 与 CSS 变量结合
          </div>
          <div class="mb-4 rounded bg-primary p-4 text-white">
            使用预定义的主题辅助类
          </div>
          <div class="overflow-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <ui-code :code="unocssCode" lang="css" :line-numbers="true" theme="auto" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--ui-color-bg);
  color: var(--ui-color-text);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-border-radius);
  padding: var(--ui-spacing);
  box-shadow: var(--ui-shadow);
}
</style>
