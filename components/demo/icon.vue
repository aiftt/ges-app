<script setup lang="ts" name="DemoIcon">
/**
 * 图标组件演示
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 常用图标集合
const iconCollections = [
  { name: 'Material Design Icons', prefix: 'mdi', icons: ['home', 'account', 'cog', 'bell', 'heart', 'email', 'calendar', 'file', 'folder', 'star'] },
  { name: 'Carbon', prefix: 'carbon', icons: ['home', 'user', 'settings', 'notification', 'favorite', 'email', 'calendar', 'document', 'folder', 'star'] },
  { name: 'Ant Design', prefix: 'ant-design', icons: ['home-outlined', 'user-outlined', 'setting-outlined', 'bell-outlined', 'heart-outlined', 'mail-outlined', 'calendar-outlined', 'file-outlined', 'folder-outlined', 'star-outlined'] },
  { name: 'Feather', prefix: 'feather', icons: ['home', 'user', 'settings', 'bell', 'heart', 'mail', 'calendar', 'file', 'folder', 'star'] },
]

// 图标尺寸示例
const iconSizes = [
  { name: '超小', value: 'xs', size: '12px' },
  { name: '小', value: 'sm', size: '16px' },
  { name: '中', value: 'md', size: '24px' },
  { name: '大', value: 'lg', size: '32px' },
  { name: '超大', value: 'xl', size: '48px' },
]

// 图标颜色示例
const iconColors = [
  { name: '主要色', value: 'primary', color: 'var(--ui-color-primary, #10b981)' },
  { name: '成功色', value: 'success', color: 'var(--ui-color-success, #10b981)' },
  { name: '警告色', value: 'warning', color: 'var(--ui-color-warning, #f59e0b)' },
  { name: '危险色', value: 'danger', color: 'var(--ui-color-danger, #ef4444)' },
  { name: '信息色', value: 'info', color: 'var(--ui-color-info, #3b82f6)' },
  { name: '自定义色', value: '#8B5CF6', color: '#8B5CF6' },
]

// 动画效果列表
const animations = [
  { name: '旋转', value: 'spin' },
  { name: '跳动', value: 'pulse' },
  { name: '摇晃', value: 'shake' },
  { name: '闪烁', value: 'blink' },
]

// 复制图标名称到剪贴板
function copyIconName(collection: string, name: string) {
  const iconName = `${collection}:${name}`
  navigator.clipboard.writeText(iconName)
    .then(() => {
      // 创建Toast消息
      const message = document.createElement('div')
      message.textContent = `已复制图标名称: ${iconName}`
      message.style.position = 'fixed'
      message.style.bottom = '20px'
      message.style.left = '50%'
      message.style.transform = 'translateX(-50%)'
      message.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
      message.style.color = 'white'
      message.style.padding = '8px 16px'
      message.style.borderRadius = '4px'
      message.style.zIndex = '9999'
      message.style.opacity = '1'
      message.style.transition = 'opacity 0.3s'

      document.body.appendChild(message)

      // 2秒后移除消息
      setTimeout(() => {
        message.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(message)
        }, 300)
      }, 2000)
    })
    .catch((err) => {
      console.error('复制失败:', err)
    })
}
</script>

<template>
  <div class="space-y-10">
    <!-- 基础图标 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        基础图标
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        图标组件基于Iconify提供跨框架的图标支持，可以使用多种流行图标库。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap items-center gap-4">
          <ui-icon icon="mdi:home" />
          <ui-icon icon="carbon:user" />
          <ui-icon icon="ant-design:setting-outlined" />
          <ui-icon icon="feather:mail" />
          <ui-icon icon="mdi:github" />
          <ui-icon icon="carbon:logo-vue" />
        </div>
      </div>
    </section>

    <!-- 图标尺寸 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        图标尺寸
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持多种预设尺寸，也可以通过传入自定义尺寸数值设置图标大小。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap items-end gap-6">
          <div v-for="size in iconSizes" :key="size.value" class="flex flex-col items-center">
            <ui-icon icon="mdi:star" :size="size.size" />
            <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ size.name }} ({{ size.size }})</span>
          </div>
          <div class="flex flex-col items-center">
            <ui-icon icon="mdi:star" size="56px" />
            <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">自定义 (56px)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 图标颜色 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        图标颜色
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        可以使用主题预设的语义化颜色或自定义颜色值。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap gap-6">
          <div v-for="color in iconColors" :key="color.value" class="flex flex-col items-center">
            <ui-icon icon="mdi:heart" :color="color.color" size="large" />
            <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ color.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 图标动画 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        图标动画
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        支持多种动画效果，使图标更具交互性。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap gap-6">
          <div v-for="animation in animations" :key="animation.value" class="flex flex-col items-center">
            <ui-icon icon="mdi:refresh" :animation="animation.value" size="large" color="primary" />
            <span class="mt-2 text-xs text-gray-600 dark:text-gray-400">{{ animation.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 常用图标集合 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        常用图标集合
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        点击图标可复制图标名称。
      </p>

      <div v-for="collection in iconCollections" :key="collection.prefix" class="mb-8">
        <h4 class="mb-3 text-gray-800 font-medium dark:text-gray-200">
          {{ collection.name }}
        </h4>
        <div class="border rounded bg-white p-4 dark:bg-gray-800">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-3">
            <div
              v-for="icon in collection.icons"
              :key="`${collection.prefix}-${icon}`"
              class="flex flex-col cursor-pointer items-center rounded p-3 transition hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="copyIconName(collection.prefix, icon)"
            >
              <ui-icon :icon="`${collection.prefix}:${icon}`" />
              <span class="mt-2 w-full truncate text-center text-xs text-gray-600 dark:text-gray-400">{{ icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 与按钮结合使用 -->
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        与按钮结合使用
      </h3>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap gap-4">
          <ui-button type="primary" icon="mdi:plus">
            创建
          </ui-button>
          <ui-button type="success" icon="mdi:check">
            确认
          </ui-button>
          <ui-button type="danger" icon="mdi:delete">
            删除
          </ui-button>
          <ui-button type="info" icon="mdi:information">
            信息
          </ui-button>
          <ui-button type="warning" icon="mdi:alert">
            警告
          </ui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-component {
  width: 100%;
}

.demo-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
  padding-bottom: 1.5rem;
}

.demo-section:last-child {
  border-bottom: none;
}

.demo-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.demo-section-desc {
  color: var(--ui-text-color-secondary, #6b7280);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.demo-section-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.demo-code-control {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.demo-code-button {
  background: none;
  border: none;
  color: var(--ui-color-primary, #3b82f6);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.demo-code-button:hover {
  text-decoration: underline;
}

.demo-code {
  background-color: var(--ui-code-bg, #f3f4f6);
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--ui-code-color, #1f2937);
}

.demo-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.demo-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--ui-card-bg, #ffffff);
  border: 1px solid var(--ui-border-color, #e5e7eb);
  transition: all 0.2s;
}

.demo-icon-item:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.demo-icon-name {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.demo-icon-key {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--ui-text-color-secondary, #6b7280);
}

.demo-api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.demo-api-table th,
.demo-api-table td {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  padding: 0.75rem 1rem;
  text-align: left;
}

.demo-api-table th {
  background-color: var(--ui-table-header-bg, #f9fafb);
  font-weight: 600;
}

.demo-api-table tr:nth-child(even) {
  background-color: var(--ui-table-stripe-bg, #f3f4f6);
}

.dark .demo-code {
  --ui-code-bg: #1f2937;
  --ui-code-color: #e5e7eb;
}

.dark .demo-api-table th {
  --ui-table-header-bg: #111827;
}

.dark .demo-api-table tr:nth-child(even) {
  --ui-table-stripe-bg: #1f2937;
}

.dark .demo-icon-item {
  border-color: var(--ui-border-color, #374151);
}
</style>
