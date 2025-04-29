<script setup lang="ts" name="DemoComponents">
/**
 * UI组件展示页面
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-11-15 - 添加 Image 组件
 * 2023-12-01 - 添加 QRCode 组件和 Menu 组件
 * 2023-12-12 - 添加主题色彩展示页面
 */
import { computed, ref } from 'vue'
import DemoAutoAnimate from '~/components/demo/auto-animate.vue'
import DemoBorder from '~/components/demo/border.vue'
import DemoButton from '~/components/demo/button.vue'
import DemoCode from '~/components/demo/code.vue'
import DemoDivider from '~/components/demo/divider.vue'
import DemoIcon from '~/components/demo/icon.vue'
import DemoImage from '~/components/demo/image.vue'
import DemoMenu from '~/components/demo/menu.vue'
import DemoQrcode from '~/components/demo/qrcode.vue'
import DemoText from '~/components/demo/text.vue'
import DemoTypography from '~/components/demo/typography.vue'
import DemoTheme from '~/pages/demo/theme.vue'

// 定义组件分类
const categories = [
  {
    title: '基础组件',
    items: [
      { id: 'border', name: '边框', component: DemoBorder },
      { id: 'button', name: '按钮', component: DemoButton },
      { id: 'code', name: '代码展示', component: DemoCode },
      { id: 'divider', name: '分割线', component: DemoDivider },
      { id: 'icon', name: '图标', component: DemoIcon },
      { id: 'theme', name: '主题色彩 Theme', component: DemoTheme },
      { id: 'auto-animate', name: '动画效果', component: DemoAutoAnimate },
    ],
  },
  {
    title: '文本展示',
    items: [
      { id: 'text', name: '文本', component: DemoText },
      { id: 'typography', name: '排版', component: DemoTypography },
    ],
  },
  {
    title: '表单组件',
    items: [
      { id: 'input', name: '输入框 Input', component: undefined },
      { id: 'select', name: '选择器 Select', component: undefined },
      { id: 'checkbox', name: '复选框 Checkbox', component: undefined },
      { id: 'radio', name: '单选框 Radio', component: undefined },
      { id: 'switch', name: '开关 Switch', component: undefined },
      { id: 'form', name: '表单 Form', component: undefined },
    ],
  },
  {
    title: '数据展示',
    items: [
      { id: 'image', name: '图片', component: DemoImage },
      { id: 'qrcode', name: '二维码', component: DemoQrcode },
      { id: 'tag', name: '标签 Tag', component: undefined },
      { id: 'avatar', name: '头像 Avatar', component: undefined },
      { id: 'badge', name: '徽章 Badge', component: undefined },
      { id: 'card', name: '卡片 Card', component: undefined },
      { id: 'carousel', name: '轮播图 Carousel', component: undefined },
      { id: 'collapse', name: '折叠面板 Collapse', component: undefined },
      { id: 'table', name: '表格 Table', component: undefined },
      { id: 'tree', name: '树形控件 Tree', component: undefined },
      { id: 'tooltip', name: '提示 Tooltip', component: undefined },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { id: 'alert', name: '警告 Alert', component: undefined },
      { id: 'dialog', name: '对话框 Dialog', component: undefined },
      { id: 'drawer', name: '抽屉 Drawer', component: undefined },
      { id: 'loading', name: '加载 Loading', component: undefined },
      { id: 'message', name: '消息提示 Message', component: undefined },
      { id: 'notification', name: '通知 Notification', component: undefined },
      { id: 'progress', name: '进度条 Progress', component: undefined },
      { id: 'popconfirm', name: '气泡确认框 Popconfirm', component: undefined },
      { id: 'result', name: '结果 Result', component: undefined },
      { id: 'skeleton', name: '骨架屏 Skeleton', component: undefined },
    ],
  },
  {
    title: '导航组件',
    items: [
      { id: 'menu', name: '菜单 Menu', component: DemoMenu },
      { id: 'tabs', name: '标签页 Tabs', component: undefined },
      { id: 'breadcrumb', name: '面包屑 Breadcrumb', component: undefined },
      { id: 'dropdown', name: '下拉菜单 Dropdown', component: undefined },
      { id: 'pagination', name: '分页 Pagination', component: undefined },
      { id: 'steps', name: '步骤条 Steps', component: undefined },
      { id: 'anchor', name: '锚点 Anchor', component: undefined },
      { id: 'page-header', name: '页头 PageHeader', component: undefined },
      { id: 'backtop', name: '回到顶部 BackTop', component: undefined },
    ],
  },
]

// 当前选中的组件ID
const activeComponentId = ref('button')

// 获取所有组件的扁平列表
const allComponents = computed(() => {
  return categories.flatMap(category => category.items)
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
        <div v-for="category in categories" :key="category.title" class="ui-demo-category">
          <h3 class="ui-demo-category-title">
            {{ category.title }}
          </h3>
          <ul class="ui-demo-component-list">
            <li
              v-for="component in category.items"
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
          <component
            :is="activeComponent.component"
            v-if="activeComponent?.component"
          />
          <div v-else class="ui-demo-empty">
            {{ activeComponent ? '该组件尚未实现' : '请选择一个组件' }}
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
