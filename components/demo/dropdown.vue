<script setup lang="ts" name="DemoDropdown">
/**
 * Dropdown 组件演示
 * 创建日期: 2024-08-18
 * 作者: aiftt
 * 更新日期: 2024-08-19 - 修复界面问题，改为直观展示
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import type { MenuItem } from '~/components/ui/dropdown/type'

// 基本菜单项
const basicItems = ref<MenuItem[]>([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])

// 带分割线的菜单项
const dividerItems = ref<MenuItem[]>([
  { key: '1', label: '编辑' },
  { key: '2', label: '复制' },
  { type: 'divider', key: 'd1', label: '' },
  { key: '3', label: '删除' },
])

// 带图标的菜单项
const iconItems = ref<MenuItem[]>([
  { key: '1', label: '编辑文档', icon: 'carbon:edit' },
  { key: '2', label: '复制链接', icon: 'carbon:copy-link' },
  { key: '3', label: '下载文件', icon: 'carbon:download' },
  { type: 'divider', key: 'd1', label: '' },
  { key: '4', label: '删除文档', icon: 'carbon:trash-can', danger: true },
])

// 禁用状态示例
const dropdownDisabled = ref(false)

// 选择回调
function handleSelect(key: string | number, item: MenuItem) {
  console.warn(`选择了: ${item.label}，键值: ${key}`)
}

// 危险菜单项和禁用状态
const dangerAndDisabledItems = ref<MenuItem[]>([
  { key: '1', label: '正常菜单项' },
  { key: '2', label: '禁用的菜单项', disabled: true },
  { key: '3', label: '危险操作', danger: true },
])

// 控制下拉菜单显示
const dropdownVisible = ref(false)

// 代码示例
const basicCode = `<ui-dropdown :items="basicItems">
  <ui-button>
    悬停触发
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<ui-dropdown :items="dividerItems" trigger="click">
  <ui-button>
    点击触发(带分割线)
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<script setup>
import type { MenuItem } from '~/components/ui/dropdown/type'

// 基本菜单项
const basicItems = ref([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])

// 带分割线的菜单项
const dividerItems = ref([
  { key: '1', label: '编辑' },
  { key: '2', label: '复制' },
  { type: 'divider', key: 'd1', label: '' },
  { key: '3', label: '删除' },
])
<\/script>`

const triggerCode = `<ui-dropdown :items="basicItems" trigger="hover">
  <ui-button>
    悬停触发
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<ui-dropdown :items="basicItems" trigger="click">
  <ui-button>
    点击触发
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<ui-dropdown :items="basicItems" trigger="contextmenu">
  <ui-button>
    右键触发
    <ui-icon icon="carbon:overflow-menu-horizontal" />
  </ui-button>
</ui-dropdown>

<script setup>
const basicItems = ref([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])
<\/script>`

const placementCode = `<div class="grid grid-cols-2 mb-4 gap-4 md:grid-cols-3">
  <ui-dropdown :items="basicItems" placement="top">
    <ui-button block>
      向上弹出
      <ui-icon icon="carbon:chevron-up" />
    </ui-button>
  </ui-dropdown>

  <ui-dropdown :items="basicItems" placement="top-start">
    <ui-button block>
      向上左对齐
      <ui-icon icon="carbon:chevron-up" />
    </ui-button>
  </ui-dropdown>

  <ui-dropdown :items="basicItems" placement="top-end">
    <ui-button block>
      向上右对齐
      <ui-icon icon="carbon:chevron-up" />
    </ui-button>
  </ui-dropdown>

  <ui-dropdown :items="basicItems" placement="bottom">
    <ui-button block>
      向下弹出
      <ui-icon icon="carbon:chevron-down" />
    </ui-button>
  </ui-dropdown>

  <ui-dropdown :items="basicItems" placement="bottom-start">
    <ui-button block>
      向下左对齐
      <ui-icon icon="carbon:chevron-down" />
    </ui-button>
  </ui-dropdown>

  <ui-dropdown :items="basicItems" placement="bottom-end">
    <ui-button block>
      向下右对齐
      <ui-icon icon="carbon:chevron-down" />
    </ui-button>
  </ui-dropdown>
</div>

<script setup>
const basicItems = ref([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])
<\/script>`

const iconCode = `<ui-dropdown :items="iconItems" trigger="click">
  <ui-button>
    文档操作
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<script setup>
// 带图标的菜单项
const iconItems = ref([
  { key: '1', label: '编辑文档', icon: 'carbon:edit' },
  { key: '2', label: '复制链接', icon: 'carbon:copy-link' },
  { key: '3', label: '下载文件', icon: 'carbon:download' },
  { type: 'divider', key: 'd1', label: '' },
  { key: '4', label: '删除文档', icon: 'carbon:trash-can', danger: true },
])
<\/script>`

const dangerDisabledCode = `<ui-dropdown :items="dangerAndDisabledItems" trigger="click">
  <ui-button>
    包含危险和禁用项
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<ui-dropdown :items="basicItems" :disabled="dropdownDisabled">
  <ui-button>
    {{ dropdownDisabled ? '已禁用' : '可用' }}的下拉菜单
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<ui-button @click="dropdownDisabled = !dropdownDisabled">
  {{ dropdownDisabled ? '启用' : '禁用' }}下拉菜单
</ui-button>

<script setup>
const dropdownDisabled = ref(false)

// 危险菜单项和禁用状态
const dangerAndDisabledItems = ref([
  { key: '1', label: '正常菜单项' },
  { key: '2', label: '禁用的菜单项', disabled: true },
  { key: '3', label: '危险操作', danger: true },
])
<\/script>`

const callbackCode = `<ui-dropdown :items="basicItems" @select="handleSelect">
  <ui-button>
    点击菜单项触发回调
    <ui-icon icon="carbon:chevron-down" />
  </ui-button>
</ui-dropdown>

<script setup>
// 选择回调
function handleSelect(key, item) {
  console.warn(\`选择了: \${item.label}，键值: \${key}\`)
}

const basicItems = ref([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])
<\/script>`

const controlVisibleCode = `<div class="flex items-center gap-4">
  <ui-dropdown v-model:visible="dropdownVisible" :items="basicItems" trigger="click">
    <ui-button>
      {{ dropdownVisible ? '关闭' : '打开' }}下拉菜单
      <ui-icon icon="carbon:chevron-down" />
    </ui-button>
  </ui-dropdown>

  <ui-button @click="dropdownVisible = !dropdownVisible">
    {{ dropdownVisible ? '关闭' : '打开' }}菜单
  </ui-button>

  <div class="text-gray-500">
    状态: {{ dropdownVisible ? '显示' : '隐藏' }}
  </div>
</div>

<script setup>
// 控制下拉菜单显示
const dropdownVisible = ref(false)
const basicItems = ref([
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
  { key: '3', label: '菜单项 3' },
])
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Dropdown 下拉菜单
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      触发元素点击或悬浮时，弹出一个下拉菜单。可用于收纳操作元素、提示、文本以及部分其他组件。
    </p>

    <!-- 基本用法 -->
    <ui-demo
      title="基本用法"
      description="最简单的下拉菜单，点击或悬停打开，包含了基本的菜单项。"
      :code="basicCode"
    >
      <ui-space>
        <!-- 悬停触发 -->
        <ui-dropdown :items="basicItems">
          <ui-button>
            悬停触发
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <!-- 带分割线 -->
        <ui-dropdown :items="dividerItems" trigger="click">
          <ui-button>
            点击触发(带分割线)
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>
      </ui-space>
    </ui-demo>

    <!-- 不同触发方式 -->
    <ui-demo
      title="不同触发方式"
      description="Dropdown 组件支持三种触发方式：hover、click 和 contextmenu。"
      :code="triggerCode"
    >
      <ui-space>
        <ui-dropdown :items="basicItems" trigger="hover">
          <ui-button>
            悬停触发
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" trigger="click">
          <ui-button>
            点击触发
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" trigger="contextmenu">
          <ui-button>
            右键触发
            <ui-icon icon="carbon:overflow-menu-horizontal" />
          </ui-button>
        </ui-dropdown>
      </ui-space>
    </ui-demo>

    <!-- 不同位置 -->
    <ui-demo
      title="不同位置"
      description="可以通过 placement 属性设置下拉菜单出现的位置。"
      :code="placementCode"
    >
      <div class="grid grid-cols-2 mb-4 gap-4 md:grid-cols-3">
        <ui-dropdown :items="basicItems" placement="top">
          <ui-button block>
            向上弹出
            <ui-icon icon="carbon:chevron-up" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" placement="top-start">
          <ui-button block>
            向上左对齐
            <ui-icon icon="carbon:chevron-up" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" placement="top-end">
          <ui-button block>
            向上右对齐
            <ui-icon icon="carbon:chevron-up" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" placement="bottom">
          <ui-button block>
            向下弹出
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" placement="bottom-start">
          <ui-button block>
            向下左对齐
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" placement="bottom-end">
          <ui-button block>
            向下右对齐
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>
      </div>
    </ui-demo>

    <!-- 带图标的菜单 -->
    <ui-demo
      title="带图标的菜单"
      description="可以在菜单项中添加图标。"
      :code="iconCode"
    >
      <ui-dropdown :items="iconItems" trigger="click">
        <ui-button>
          文档操作
          <ui-icon icon="carbon:chevron-down" />
        </ui-button>
      </ui-dropdown>
    </ui-demo>

    <!-- 危险菜单项和禁用状态 -->
    <ui-demo
      title="危险菜单项和禁用状态"
      description="可以设置菜单项为危险状态或禁用状态，也可以禁用整个下拉菜单。"
      :code="dangerDisabledCode"
    >
      <ui-space>
        <ui-dropdown :items="dangerAndDisabledItems" trigger="click">
          <ui-button>
            包含危险和禁用项
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-dropdown :items="basicItems" :disabled="dropdownDisabled">
          <ui-button>
            {{ dropdownDisabled ? '已禁用' : '可用' }}的下拉菜单
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-button @click="dropdownDisabled = !dropdownDisabled">
          {{ dropdownDisabled ? '启用' : '禁用' }}下拉菜单
        </ui-button>
      </ui-space>
    </ui-demo>

    <!-- 回调函数 -->
    <ui-demo
      title="回调函数"
      description="可以通过 @select 事件监听菜单项的选择，也可以在菜单项中定义 onClick 回调。"
      :code="callbackCode"
    >
      <ui-dropdown :items="basicItems" @select="handleSelect">
        <ui-button>
          点击菜单项触发回调
          <ui-icon icon="carbon:chevron-down" />
        </ui-button>
      </ui-dropdown>
    </ui-demo>

    <!-- 控制显示隐藏 -->
    <ui-demo
      title="控制显示隐藏"
      description="使用 v-model:visible 双向绑定控制下拉菜单的显示状态。"
      :code="controlVisibleCode"
    >
      <div class="flex items-center gap-4">
        <ui-dropdown v-model:visible="dropdownVisible" :items="basicItems" trigger="click">
          <ui-button>
            {{ dropdownVisible ? '关闭' : '打开' }}下拉菜单
            <ui-icon icon="carbon:chevron-down" />
          </ui-button>
        </ui-dropdown>

        <ui-button @click="dropdownVisible = !dropdownVisible">
          {{ dropdownVisible ? '关闭' : '打开' }}菜单
        </ui-button>

        <div class="text-gray-500">
          状态: {{ dropdownVisible ? '显示' : '隐藏' }}
        </div>
      </div>
    </ui-demo>
  </div>
</template>
