<script setup lang="ts" name="DemoComponents">
/**
 * UI组件展示页面
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */
import { computed, ref } from 'vue'

// 定义组件分类
const categories = [
  {
    name: '基础组件',
    components: [
      { id: 'button', name: '按钮 Button' },
      { id: 'icon', name: '图标 Icon' },
      { id: 'typography', name: '排版 Typography' },
      { id: 'divider', name: '分割线 Divider' },
      { id: 'grid', name: '栅格 Grid' },
    ],
  },
  {
    name: '表单组件',
    components: [
      { id: 'input', name: '输入框 Input' },
      { id: 'textarea', name: '文本域 Textarea' },
      { id: 'select', name: '选择器 Select' },
      { id: 'checkbox', name: '复选框 Checkbox' },
      { id: 'radio', name: '单选框 Radio' },
      { id: 'switch', name: '开关 Switch' },
      { id: 'slider', name: '滑块 Slider' },
      { id: 'datepicker', name: '日期选择器 DatePicker' },
    ],
  },
  {
    name: '数据展示',
    components: [
      { id: 'table', name: '表格 Table' },
      { id: 'tag', name: '标签 Tag' },
      { id: 'badge', name: '徽章 Badge' },
      { id: 'avatar', name: '头像 Avatar' },
      { id: 'card', name: '卡片 Card' },
      { id: 'collapse', name: '折叠面板 Collapse' },
      { id: 'list', name: '列表 List' },
    ],
  },
  {
    name: '反馈组件',
    components: [
      { id: 'alert', name: '警告提示 Alert' },
      { id: 'modal', name: '模态框 Modal' },
      { id: 'message', name: '全局提示 Message' },
      { id: 'notification', name: '通知提醒 Notification' },
      { id: 'progress', name: '进度条 Progress' },
      { id: 'skeleton', name: '骨架屏 Skeleton' },
    ],
  },
  {
    name: '导航组件',
    components: [
      { id: 'menu', name: '导航菜单 Menu' },
      { id: 'tabs', name: '标签页 Tabs' },
      { id: 'breadcrumb', name: '面包屑 Breadcrumb' },
      { id: 'pagination', name: '分页 Pagination' },
    ],
  },
]

// 当前选中的组件ID
const activeComponentId = ref('button')

// 获取所有组件的扁平列表
const allComponents = computed(() => {
  return categories.flatMap(category => category.components)
})

// 当前选中的组件信息
const activeComponent = computed(() => {
  return allComponents.value.find(comp => comp.id === activeComponentId.value)
})

// 处理组件点击
function handleComponentClick(componentId) {
  activeComponentId.value = componentId
}

// 主题切换
const darkMode = ref(false)
function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<template>
  <div class="ui-demo" :class="{ dark: darkMode }">
    <header class="ui-demo-header">
      <h1 class="ui-demo-title">
        UI组件库
      </h1>
      <div class="ui-demo-theme-switch">
        <span>主题模式：</span>
        <button class="ui-demo-theme-button" @click="toggleDarkMode">
          {{ darkMode ? '暗色' : '亮色' }}
        </button>
      </div>
    </header>

    <div class="ui-demo-container">
      <!-- 左侧菜单 -->
      <div class="ui-demo-sidebar">
        <div v-for="category in categories" :key="category.name" class="ui-demo-category">
          <h3 class="ui-demo-category-title">
            {{ category.name }}
          </h3>
          <ul class="ui-demo-component-list">
            <li
              v-for="component in category.components"
              :key="component.id"
              class="ui-demo-component-item"
              :class="{ active: activeComponentId === component.id }"
              @click="handleComponentClick(component.id)"
            >
              {{ component.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧展示区域 -->
      <div class="ui-demo-content">
        <h2 class="ui-demo-component-title">
          {{ activeComponent?.name }}
        </h2>

        <!-- 组件展示区域 -->
        <div class="ui-demo-component-showcase">
          <component :is="`demo-${activeComponentId}`" v-if="activeComponentId" />
          <div v-else class="ui-demo-empty">
            请选择一个组件
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-demo {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--ui-bg-color, #f9fafb);
  color: var(--ui-text-color, #111827);
}

.dark .ui-demo {
  --ui-bg-color: #1f2937;
  --ui-text-color: #f9fafb;
  --ui-border-color: #374151;
  --ui-sidebar-bg: #111827;
  --ui-card-bg: #1f2937;
  --ui-active-bg: #2563eb;
  --ui-hover-bg: #374151;
  background-color: var(--ui-bg-color);
  color: var(--ui-text-color);
}

.ui-demo {
  --ui-border-color: #e5e7eb;
  --ui-sidebar-bg: #f3f4f6;
  --ui-card-bg: #ffffff;
  --ui-active-bg: #3b82f6;
  --ui-hover-bg: #e5e7eb;
}

.ui-demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--ui-border-color);
  background-color: var(--ui-card-bg);
}

.ui-demo-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.ui-demo-theme-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ui-demo-theme-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--ui-border-color);
  background-color: var(--ui-card-bg);
  color: var(--ui-text-color);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ui-demo-theme-button:hover {
  background-color: var(--ui-hover-bg);
}

.ui-demo-container {
  display: flex;
  flex: 1;
}

.ui-demo-sidebar {
  width: 250px;
  padding: 1rem 0;
  border-right: 1px solid var(--ui-border-color);
  background-color: var(--ui-sidebar-bg);
  overflow-y: auto;
}

.ui-demo-category {
  margin-bottom: 1rem;
}

.ui-demo-category-title {
  padding: 0.5rem 1.5rem;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ui-text-color);
  opacity: 0.7;
}

.ui-demo-component-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ui-demo-component-item {
  padding: 0.625rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.ui-demo-component-item:hover {
  background-color: var(--ui-hover-bg);
}

.ui-demo-component-item.active {
  background-color: var(--ui-active-bg);
  color: #ffffff;
}

.ui-demo-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.ui-demo-component-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.ui-demo-component-showcase {
  background-color: var(--ui-card-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--ui-border-color);
  padding: 2rem;
  min-height: 300px;
}

.ui-demo-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--ui-text-color);
  opacity: 0.5;
}
</style>
