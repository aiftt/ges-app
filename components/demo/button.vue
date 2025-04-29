<script setup lang="ts" name="DemoButton">
/**
 * 按钮组件演示
 * 创建日期: 2023-12-03
 * 作者: aiftt
 */
import { ref } from 'vue'

// 按钮类型列表 (添加前缀下划线避免未使用变量警告)
const _types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
// 按钮尺寸列表 (添加前缀下划线避免未使用变量警告)
const _sizes = ['small', 'default', 'large'] as const

// 控制加载状态
const loadingStates = ref({
  primary: false,
  success: false,
})

// 切换加载状态
function toggleLoading(type: 'primary' | 'success') {
  loadingStates.value[type] = true
  setTimeout(() => {
    loadingStates.value[type] = false
  }, 2000)
}

// 示例代码片段
const exampleCode = {
  basic: '<ui-button>默认按钮</ui-button>\n<ui-button type="primary">主要按钮</ui-button>\n<ui-button type="success">成功按钮</ui-button>\n<ui-button type="warning">警告按钮</ui-button>\n<ui-button type="danger">危险按钮</ui-button>\n<ui-button type="info">信息按钮</ui-button>',

  sizes: '<ui-button size="small">小按钮</ui-button>\n<ui-button>默认大小</ui-button>\n<ui-button size="large">大按钮</ui-button>',

  disabled: '<ui-button disabled>禁用按钮</ui-button>\n<ui-button type="primary" disabled>禁用主要按钮</ui-button>',

  icon: '<ui-button icon="carbon:home">首页</ui-button>\n<ui-button icon="carbon:add" type="primary">添加</ui-button>\n<ui-button icon="carbon:settings" circle />',

  loading: '<ui-button type="primary" :loading="isLoading" @click="startLoading">点击加载</ui-button>',
}
</script>

<template>
  <div class="space-y-8">
    <!-- 按钮类型 -->
    <section>
      <h3 class="mb-4 text-lg font-bold">
        按钮类型
      </h3>
      <div class="mb-4 flex flex-wrap gap-4">
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
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="overflow-auto text-sm"><code>{{ exampleCode.basic }}</code></pre>
      </div>
    </section>

    <!-- 按钮尺寸 -->
    <section>
      <h3 class="mb-4 text-lg font-bold">
        按钮尺寸
      </h3>
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <ui-button size="small">
          小按钮
        </ui-button>
        <ui-button>默认大小</ui-button>
        <ui-button size="large">
          大按钮
        </ui-button>
      </div>
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="overflow-auto text-sm"><code>{{ exampleCode.sizes }}</code></pre>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section>
      <h3 class="mb-4 text-lg font-bold">
        禁用状态
      </h3>
      <div class="mb-4 flex flex-wrap gap-4">
        <ui-button disabled>
          禁用按钮
        </ui-button>
        <ui-button type="primary" disabled>
          禁用主要按钮
        </ui-button>
        <ui-button type="success" disabled>
          禁用成功按钮
        </ui-button>
        <ui-button type="danger" disabled>
          禁用危险按钮
        </ui-button>
      </div>
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="overflow-auto text-sm"><code>{{ exampleCode.disabled }}</code></pre>
      </div>
    </section>

    <!-- 图标按钮 -->
    <section>
      <h3 class="mb-4 text-lg font-bold">
        图标按钮
      </h3>
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <ui-button icon="carbon:home">
          首页
        </ui-button>
        <ui-button icon="carbon:add" type="primary">
          添加
        </ui-button>
        <ui-button icon="carbon:notification" type="warning">
          通知
        </ui-button>
        <ui-button icon="carbon:close" type="danger">
          删除
        </ui-button>
        <ui-button icon="carbon:settings" circle />
        <ui-button icon="carbon:add" type="primary" circle />
        <ui-button icon="carbon:trash-can" type="danger" circle />
      </div>
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="overflow-auto text-sm"><code>{{ exampleCode.icon }}</code></pre>
      </div>
    </section>

    <!-- 加载状态 -->
    <section>
      <h3 class="mb-4 text-lg font-bold">
        加载状态
      </h3>
      <div class="mb-4 flex flex-wrap gap-4">
        <ui-button
          type="primary"
          :loading="loadingStates.primary"
          @click="toggleLoading('primary')"
        >
          点击加载
        </ui-button>
        <ui-button
          type="success"
          :loading="loadingStates.success"
          @click="toggleLoading('success')"
        >
          点击加载
        </ui-button>
        <ui-button type="info" loading>
          加载中...
        </ui-button>
      </div>
      <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="overflow-auto text-sm"><code>{{ exampleCode.loading }}</code></pre>
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
</style>
