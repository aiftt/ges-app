<script setup lang="ts" name="DemoButton">
/**
 * 按钮组件演示页面
 * 创建日期: 2023-12-10
 * 作者: aiftt
 * 更新日期: 2023-12-11 - 适配暗色主题，更新示例
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
</script>

<template>
  <div class="button-demo p-6">
    <div class="mb-4 flex justify-end">
      <button class="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700" @click="toggleDarkMode">
        {{ isDarkTheme ? '切换到亮色模式' : '切换到暗色模式' }}
      </button>
    </div>

    <h1 class="mb-6 text-2xl text-gray-900 font-bold dark:text-gray-100">
      按钮组件示例
    </h1>

    <!-- 按钮类型 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        按钮类型
      </h2>
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
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button&gt;默认按钮&lt;/ui-button&gt;
&lt;ui-button type="primary"&gt;主要按钮&lt;/ui-button&gt;
&lt;ui-button type="success"&gt;成功按钮&lt;/ui-button&gt;
&lt;ui-button type="warning"&gt;警告按钮&lt;/ui-button&gt;
&lt;ui-button type="danger"&gt;危险按钮&lt;/ui-button&gt;
&lt;ui-button type="info"&gt;信息按钮&lt;/ui-button&gt;</pre>
      </div>
    </section>

    <!-- 按钮尺寸 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        按钮尺寸
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <ui-button size="small">
          小按钮
        </ui-button>
        <ui-button>默认尺寸</ui-button>
        <ui-button size="large">
          大按钮
        </ui-button>
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button size="small"&gt;小按钮&lt;/ui-button&gt;
&lt;ui-button&gt;默认尺寸&lt;/ui-button&gt;
&lt;ui-button size="large"&gt;大按钮&lt;/ui-button&gt;</pre>
      </div>
    </section>

    <!-- 带图标的按钮 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        带图标的按钮
      </h2>
      <div class="flex flex-wrap gap-4">
        <ui-button icon="carbon:add">
          添加
        </ui-button>
        <ui-button type="primary" icon="carbon:search">
          搜索
        </ui-button>
        <ui-button type="success" icon="carbon:checkmark">
          确认
        </ui-button>
        <ui-button type="warning" icon="carbon:warning">
          警告
        </ui-button>
        <ui-button type="danger" icon="carbon:trash-can">
          删除
        </ui-button>
        <!-- 仅图标 -->
        <ui-button icon="carbon:add" />
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button icon="carbon:add"&gt;添加&lt;/ui-button&gt;
&lt;ui-button type="primary" icon="carbon:search"&gt;搜索&lt;/ui-button&gt;
&lt;ui-button type="success" icon="carbon:checkmark"&gt;确认&lt;/ui-button&gt;
&lt;ui-button type="warning" icon="carbon:warning"&gt;警告&lt;/ui-button&gt;
&lt;ui-button type="danger" icon="carbon:trash-can"&gt;删除&lt;/ui-button&gt;
&lt;ui-button icon="carbon:add"&gt;&lt;/ui-button&gt;</pre>
      </div>
    </section>

    <!-- 圆形按钮 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        圆形按钮
      </h2>
      <div class="flex flex-wrap gap-4">
        <ui-button circle icon="carbon:add" />
        <ui-button circle type="primary" icon="carbon:search" />
        <ui-button circle type="success" icon="carbon:checkmark" />
        <ui-button circle type="warning" icon="carbon:warning" />
        <ui-button circle type="danger" icon="carbon:trash-can" />
        <ui-button circle type="info" icon="carbon:information" />
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button circle icon="carbon:add" /&gt;
&lt;ui-button circle type="primary" icon="carbon:search" /&gt;
&lt;ui-button circle type="success" icon="carbon:checkmark" /&gt;
&lt;ui-button circle type="warning" icon="carbon:warning" /&gt;
&lt;ui-button circle type="danger" icon="carbon:trash-can" /&gt;
&lt;ui-button circle type="info" icon="carbon:information" /&gt;</pre>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        禁用状态
      </h2>
      <div class="flex flex-wrap gap-4">
        <ui-button disabled>
          禁用按钮
        </ui-button>
        <ui-button disabled type="primary">
          禁用主要按钮
        </ui-button>
        <ui-button disabled type="success" icon="carbon:checkmark">
          禁用带图标
        </ui-button>
        <ui-button disabled circle icon="carbon:add" />
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button disabled&gt;禁用按钮&lt;/ui-button&gt;
&lt;ui-button disabled type="primary"&gt;禁用主要按钮&lt;/ui-button&gt;
&lt;ui-button disabled type="success" icon="carbon:checkmark"&gt;禁用带图标&lt;/ui-button&gt;
&lt;ui-button disabled circle icon="carbon:add" /&gt;</pre>
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        加载状态
      </h2>
      <div class="flex flex-wrap gap-4">
        <ui-button loading>
          加载中
        </ui-button>
        <ui-button loading type="primary">
          提交中
        </ui-button>
        <ui-button loading type="success" icon="carbon:checkmark">
          保存中
        </ui-button>
        <ui-button loading circle icon="carbon:add" />
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button loading&gt;加载中&lt;/ui-button&gt;
&lt;ui-button loading type="primary"&gt;提交中&lt;/ui-button&gt;
&lt;ui-button loading type="success" icon="carbon:checkmark"&gt;保存中&lt;/ui-button&gt;
&lt;ui-button loading circle icon="carbon:add" /&gt;</pre>
      </div>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl text-gray-900 font-bold dark:text-gray-100">
        自定义样式
      </h2>
      <div class="flex flex-wrap gap-4">
        <ui-button bg-color="#8B5CF6" text-color="white">
          紫色按钮
        </ui-button>
        <ui-button bg-color="#F472B6" text-color="white" radius="1.5rem">
          粉色圆角按钮
        </ui-button>
        <ui-button bg-color="#16A34A" text-color="white" shadow="0 4px 6px rgba(22, 163, 74, 0.4)">
          带阴影按钮
        </ui-button>
        <ui-button bg-color="transparent" text-color="#3B82F6" border-color="#3B82F6">
          边框按钮
        </ui-button>
        <ui-button bg-color="#1E40AF" text-color="white" hover-bg-color="#1E3A8A">
          悬停效果按钮
        </ui-button>
        <ui-button bg-color="white" text-color="#4B5563" border-color="#D1D5DB 2px dashed">
          虚线边框按钮
        </ui-button>
      </div>
      <div class="mt-4 rounded bg-gray-100 p-4 dark:bg-gray-800">
        <pre class="text-sm text-gray-700 dark:text-gray-300">
&lt;ui-button bg-color="#8B5CF6" text-color="white"&gt;紫色按钮&lt;/ui-button&gt;
&lt;ui-button bg-color="#F472B6" text-color="white" radius="1.5rem"&gt;粉色圆角按钮&lt;/ui-button&gt;
&lt;ui-button bg-color="#16A34A" text-color="white" shadow="0 4px 6px rgba(22, 163, 74, 0.4)"&gt;带阴影按钮&lt;/ui-button&gt;
&lt;ui-button bg-color="transparent" text-color="#3B82F6" border-color="#3B82F6"&gt;边框按钮&lt;/ui-button&gt;
&lt;ui-button bg-color="#1E40AF" text-color="white" hover-bg-color="#1E3A8A"&gt;悬停效果按钮&lt;/ui-button&gt;
&lt;ui-button bg-color="white" text-color="#4B5563" border-color="#D1D5DB 2px dashed"&gt;虚线边框按钮&lt;/ui-button&gt;</pre>
      </div>
    </section>

    <!-- 暗色主题演示 -->
    <section v-if="isDarkTheme" class="mb-8 rounded-lg bg-gray-800 p-6">
      <h2 class="mb-4 text-xl text-white font-bold">
        暗色主题下的按钮
      </h2>
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
        <ui-button disabled>
          禁用按钮
        </ui-button>
        <ui-button loading>
          加载中
        </ui-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.demo-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111827;
}

.demo-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #4b5563;
}

.demo-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.controls-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group label {
  font-size: 0.875rem;
  color: #4b5563;
}

.control-group input {
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .demo-title {
    color: #f9fafb;
  }

  .demo-description {
    color: #d1d5db;
  }

  .section-title {
    color: #f3f4f6;
  }

  .demo-section {
    border-color: #374151;
  }

  .controls-panel {
    background-color: #1f2937;
  }

  .control-group label {
    color: #d1d5db;
  }

  .control-group input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
}
</style>
