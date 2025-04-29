<script setup lang="ts" name="DemoColor">
/**
 * 颜色组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 颜色类别
const colorCategories = [
  {
    title: '主要颜色',
    description: '品牌的主要颜色，用于最重要的界面元素和交互',
    colors: [
      { name: 'primary', label: '主色', value: 'var(--ui-color-primary)' },
      { name: 'secondary', label: '次要', value: 'var(--ui-color-secondary)' },
      { name: 'accent', label: '强调', value: 'var(--ui-color-accent)' },
    ],
  },
  {
    title: '功能色',
    description: '表达特定状态或含义的颜色',
    colors: [
      { name: 'success', label: '成功', value: 'var(--ui-color-success)' },
      { name: 'warning', label: '警告', value: 'var(--ui-color-warning)' },
      { name: 'danger', label: '危险', value: 'var(--ui-color-danger)' },
      { name: 'info', label: '信息', value: 'var(--ui-color-info)' },
    ],
  },
  {
    title: '中性色',
    description: '用于文本、背景和边框的中性色调',
    colors: [
      { name: 'text', label: '文本色', value: 'var(--ui-color-text)' },
      { name: 'text-secondary', label: '次要文本', value: 'var(--ui-color-text-secondary)' },
      { name: 'text-disabled', label: '禁用文本', value: 'var(--ui-color-text-disabled)' },
      { name: 'border', label: '边框色', value: 'var(--ui-color-border)' },
      { name: 'divider', label: '分割线', value: 'var(--ui-color-divider)' },
      { name: 'background', label: '背景色', value: 'var(--ui-color-background)' },
    ],
  },
]

// 调色板
const colorPalettes = [
  {
    name: 'primary',
    label: '主色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'gray',
    label: '灰色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'red',
    label: '红色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'green',
    label: '绿色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'blue',
    label: '蓝色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'yellow',
    label: '黄色调色板',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
]

// 复制颜色值到剪贴板
function copyToClipboard(text: string) {
  if (import.meta.client) {
    navigator.clipboard.writeText(text)
      .then(() => {
        // 使用 toast 或其他方式显示消息
        const copyMessage = document.createElement('div')
        copyMessage.className = 'fixed right-4 top-4 bg-black/80 text-white px-4 py-2 rounded shadow-lg z-50'
        copyMessage.textContent = `已复制: ${text}`
        document.body.appendChild(copyMessage)

        setTimeout(() => {
          copyMessage.style.opacity = '0'
          copyMessage.style.transition = 'opacity 0.3s ease'
          setTimeout(() => {
            document.body.removeChild(copyMessage)
          }, 300)
        }, 2000)
      })
      .catch((err) => {
        console.error('复制失败:', err)
      })
  }
}
</script>

<template>
  <div class="space-y-10">
    <!-- 颜色系统介绍 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        颜色系统
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        UI组件库使用一致的颜色系统，通过CSS变量实现主题定制。点击颜色方块可复制颜色变量名。
      </p>
    </section>

    <!-- 基础颜色 -->
    <section v-for="category in colorCategories" :key="category.title">
      <h3 class="mb-2 text-lg text-gray-900 font-semibold dark:text-white">
        {{ category.title }}
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        {{ category.description }}
      </p>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <div
          v-for="color in category.colors"
          :key="color.name"
          class="overflow-hidden rounded-md bg-white shadow dark:bg-gray-800"
          @click="copyToClipboard(color.value)"
        >
          <div
            class="h-24 w-full cursor-pointer transition-transform hover:scale-105 hover:transform"
            :style="{ backgroundColor: color.value }"
          />
          <div class="p-3">
            <div class="text-gray-900 font-medium dark:text-white">
              {{ color.label }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ color.value }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 调色板 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        调色板
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        完整的调色板，提供不同深浅的色阶变化。
      </p>

      <div class="space-y-8">
        <div v-for="palette in colorPalettes" :key="palette.name" class="space-y-2">
          <h4 class="text-gray-900 font-medium dark:text-white">
            {{ palette.label }}
          </h4>
          <div class="grid grid-cols-11 h-12 overflow-hidden rounded-md shadow">
            <div
              v-for="shade in palette.shades"
              :key="shade"
              class="cursor-pointer transition-all hover:scale-y-110 hover:transform"
              :style="{ backgroundColor: `var(--ui-color-${palette.name}-${shade})` }"
              :title="`${palette.name}-${shade}`"
              @click="copyToClipboard(`var(--ui-color-${palette.name}-${shade})`)"
            />
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <span>{{ palette.name }}-50</span>
            <span>{{ palette.name }}-950</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 颜色使用示例 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        颜色使用示例
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        在组件中应用颜色系统的实际示例。
      </p>

      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-6">
          <!-- 按钮颜色 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              按钮颜色:
            </div>
            <div class="flex flex-wrap gap-2">
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

          <!-- 文本颜色 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              文本颜色:
            </div>
            <div class="space-y-2">
              <ui-text>默认文本</ui-text>
              <ui-text type="primary">
                主要文本
              </ui-text>
              <ui-text type="success">
                成功文本
              </ui-text>
              <ui-text type="warning">
                警告文本
              </ui-text>
              <ui-text type="danger">
                危险文本
              </ui-text>
              <ui-text type="info">
                信息文本
              </ui-text>
              <ui-text type="secondary">
                次要文本
              </ui-text>
            </div>
          </div>

          <!-- 背景颜色 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              背景颜色:
            </div>
            <div class="flex flex-wrap gap-2">
              <div class="rounded bg-primary-50 p-4">
                primary-50
              </div>
              <div class="rounded bg-primary-100 p-4">
                primary-100
              </div>
              <div class="rounded bg-primary-200 p-4">
                primary-200
              </div>
              <div class="rounded bg-primary-300 p-4 text-white">
                primary-300
              </div>
              <div class="rounded bg-primary-400 p-4 text-white">
                primary-400
              </div>
              <div class="rounded bg-primary-500 p-4 text-white">
                primary-500
              </div>
              <div class="rounded bg-primary-600 p-4 text-white">
                primary-600
              </div>
              <div class="rounded bg-primary-700 p-4 text-white">
                primary-700
              </div>
              <div class="rounded bg-primary-800 p-4 text-white">
                primary-800
              </div>
              <div class="rounded bg-primary-900 p-4 text-white">
                primary-900
              </div>
            </div>
          </div>

          <!-- 边框颜色 -->
          <div>
            <div class="mb-2 text-sm text-gray-500">
              边框颜色:
            </div>
            <div class="flex flex-wrap gap-2">
              <div class="border rounded p-4">
                默认边框
              </div>
              <div class="border-2 border-primary-500 rounded p-4">
                主要边框
              </div>
              <div class="border-success-500 border-2 rounded p-4">
                成功边框
              </div>
              <div class="border-warning-500 border-2 rounded p-4">
                警告边框
              </div>
              <div class="border-danger-500 border-2 rounded p-4">
                危险边框
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主题切换 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        主题定制
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        通过修改CSS变量自定义主题，支持亮色和暗色模式。
      </p>

      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="space-y-4">
          <div class="flex space-x-4">
            <ui-button type="primary">
              默认主题
            </ui-button>
            <ui-button type="primary" class="custom-theme-blue">
              蓝色主题
            </ui-button>
            <ui-button type="primary" class="custom-theme-purple">
              紫色主题
            </ui-button>
            <ui-button type="primary" class="custom-theme-orange">
              橙色主题
            </ui-button>
          </div>

          <div class="mt-4 text-sm text-gray-500">
            CSS变量定制示例:
          </div>
          <pre class="overflow-x-auto rounded bg-gray-100 p-3 text-sm font-mono dark:bg-gray-700 dark:text-gray-300">
:root {
  --ui-color-primary: #10b981;
  --ui-color-secondary: #6b7280;
  --ui-color-accent: #8b5cf6;
  --ui-color-success: #10b981;
  --ui-color-warning: #f59e0b;
  --ui-color-danger: #ef4444;
  --ui-color-info: #3b82f6;

  --ui-color-text: #1f2937;
  --ui-color-text-secondary: #6b7280;
  --ui-color-text-disabled: #d1d5db;
  --ui-color-border: #e5e7eb;
  --ui-color-divider: #f3f4f6;
  --ui-color-background: #ffffff;
}

.dark {
  --ui-color-text: #f9fafb;
  --ui-color-text-secondary: #e5e7eb;
  --ui-color-text-disabled: #6b7280;
  --ui-color-border: #374151;
  --ui-color-divider: #1f2937;
  --ui-color-background: #111827;
}
          </pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-theme-blue {
  --ui-color-primary: #3b82f6;
}

.custom-theme-purple {
  --ui-color-primary: #8b5cf6;
}

.custom-theme-orange {
  --ui-color-primary: #f97316;
}
</style>
