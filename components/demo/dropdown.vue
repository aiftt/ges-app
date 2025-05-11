<script setup lang="ts" name="DemoDropdown">
/**
 * Dropdown 组件演示
 * 创建日期: 2024-08-18
 * 作者: aiftt
 * 更新日期: 2024-08-19 - 修复界面问题，改为直观展示
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
</script>

<template>
  <div class="demo-dropdown">
    <ui-typography-title :level="2">
      Dropdown 下拉菜单
    </ui-typography-title>
    <ui-typography-paragraph>
      触发元素点击或悬浮时，弹出一个下拉菜单。可用于收纳操作元素、提示、文本以及部分其他组件。
    </ui-typography-paragraph>

    <!-- 基本用法 -->
    <ui-typography-title :level="3">
      基本用法
    </ui-typography-title>
    <ui-typography-paragraph>
      最简单的下拉菜单，点击或悬停打开，包含了基本的菜单项。
    </ui-typography-paragraph>

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

    <ui-divider />

    <!-- 不同触发方式 -->
    <ui-typography-title :level="3">
      不同触发方式
    </ui-typography-title>
    <ui-typography-paragraph>
      Dropdown 组件支持三种触发方式：hover、click 和 contextmenu。
    </ui-typography-paragraph>

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

    <ui-divider />

    <!-- 不同位置 -->
    <ui-typography-title :level="3">
      不同位置
    </ui-typography-title>
    <ui-typography-paragraph>
      可以通过 placement 属性设置下拉菜单出现的位置。
    </ui-typography-paragraph>

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

    <ui-divider />

    <!-- 带图标的菜单 -->
    <ui-typography-title :level="3">
      带图标的菜单
    </ui-typography-title>
    <ui-typography-paragraph>
      可以在菜单项中添加图标。
    </ui-typography-paragraph>

    <ui-dropdown :items="iconItems" trigger="click">
      <ui-button>
        文档操作
        <ui-icon icon="carbon:chevron-down" />
      </ui-button>
    </ui-dropdown>

    <ui-divider />

    <!-- 危险菜单项和禁用状态 -->
    <ui-typography-title :level="3">
      危险菜单项和禁用状态
    </ui-typography-title>
    <ui-typography-paragraph>
      可以设置菜单项为危险状态或禁用状态，也可以禁用整个下拉菜单。
    </ui-typography-paragraph>

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

    <ui-divider />

    <!-- 回调函数 -->
    <ui-typography-title :level="3">
      回调函数
    </ui-typography-title>
    <ui-typography-paragraph>
      可以通过 @select 事件监听菜单项的选择，也可以在菜单项中定义 onClick 回调。
    </ui-typography-paragraph>

    <ui-space direction="vertical" size="large">
      <ui-dropdown :items="basicItems" @select="handleSelect">
        <ui-button>
          点击菜单项触发回调
          <ui-icon icon="carbon:chevron-down" />
        </ui-button>
      </ui-dropdown>

      <ui-typography-title :level="4">
        控制显示隐藏
      </ui-typography-title>
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
    </ui-space>

    <ui-divider />

    <!-- 代码示例 -->
    <ui-typography-title :level="3">
      代码示例
    </ui-typography-title>
    <ui-code language="html">
      &lt;!-- 基础用法 --&gt;
      &lt;ui-dropdown :items="basicItems"&gt;
      &lt;ui-button&gt;
      悬停触发
      &lt;ui-icon icon="carbon:chevron-down" /&gt;
      &lt;/ui-button&gt;
      &lt;/ui-dropdown&gt;

      &lt;!-- 使用 v-model:visible 控制显示隐藏 --&gt;
      &lt;ui-dropdown v-model:visible="dropdownVisible" :items="basicItems" trigger="click"&gt;
      &lt;ui-button&gt;
      下拉菜单
      &lt;ui-icon icon="carbon:chevron-down" /&gt;
      &lt;/ui-button&gt;
      &lt;/ui-dropdown&gt;

      &lt;script setup&gt;
      import type { MenuItem } from '~/components/ui/dropdown/type'

      const basicItems = ref&lt;MenuItem[]&gt;([
      { key: '1', label: '菜单项 1' },
      { key: '2', label: '菜单项 2' },
      { key: '3', label: '菜单项 3' },
      ])

      // 控制下拉菜单显示
      const dropdownVisible = ref(false)

      // 监听选择事件
      function handleSelect(key: string | number, item: MenuItem) {
      console.log(`选择了: ${item.label}，键值: ${key}`)
      }
      &lt;/script&gt;
    </ui-code>
  </div>
</template>
