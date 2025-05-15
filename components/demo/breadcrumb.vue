<script setup lang="ts" name="DemoBreadcrumb">
/**
 * 面包屑导航组件示例
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 路由配置示例
const routes1 = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/products', name: '产品', icon: 'mdi:shopping-outline' },
  { path: '/products/electronics', name: '电子产品', icon: 'mdi:chip' },
  { path: '/products/electronics/phones', name: '手机', icon: 'mdi:cellphone' },
]

const routes2 = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/dashboard', name: '控制台', icon: 'mdi:view-grid' },
  { path: '/dashboard/analysis', name: '分析页', icon: 'mdi:chart-pie' },
  { path: '/dashboard/analysis/realtime', name: '实时数据', icon: 'mdi:chart-line' },
  { path: '/dashboard/analysis/realtime/traffic', name: '流量监控', icon: 'mdi:chart-bar' },
  { path: '/dashboard/analysis/realtime/traffic/details', name: '详情', icon: 'mdi:information' },
]

// 长路径示例
const longRoutes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/level1', name: '一级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2', name: '二级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3', name: '三级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4', name: '四级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5', name: '五级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5/target', name: '目标页面', icon: 'mdi:target' },
]

// 不同分隔符示例
const separators = [
  { name: '斜杠', value: '/' },
  { name: '反斜杠', value: '\\' },
  { name: '大于号', value: '>' },
  { name: '箭头', value: '→' },
  { name: '双箭头', value: '>>' },
]

// 当前选中的分隔符
const currentSeparator = ref(separators[0].value)

// 自定义图标分隔符
const useIconSeparator = ref(false)

// 代码示例
const basicCode = `<ui-breadcrumb :routes="routes" />

<script setup>
// 路由配置
const routes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/products', name: '产品', icon: 'mdi:shopping-outline' },
  { path: '/products/electronics', name: '电子产品', icon: 'mdi:chip' },
  { path: '/products/electronics/phones', name: '手机', icon: 'mdi:cellphone' },
]
<\/script>`

const homeCode = `<ui-breadcrumb
  :routes="[
    { path: '/products', name: '产品' },
    { path: '/products/electronics', name: '电子产品' },
  ]"
  show-home
  home-text="主页"
  home-icon="mdi:home"
/>`

const separatorCode = `<template>
  <div>
    <div class="mb-4 flex flex-wrap items-center gap-4">
      <span>选择分隔符：</span>
      <ui-radio-group v-model="currentSeparator">
        <ui-radio
          v-for="item in separators"
          :key="item.value"
          :value="item.value"
        >
          {{ item.name }} ({{ item.value }})
        </ui-radio>
      </ui-radio-group>

      <ui-checkbox v-model="useIconSeparator">
        使用图标分隔符
      </ui-checkbox>
    </div>

    <ui-breadcrumb
      :routes="routes"
      :separator="currentSeparator"
      :separator-icon="useIconSeparator ? 'mdi:chevron-right' : ''"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const routes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/products', name: '产品', icon: 'mdi:shopping-outline' },
  { path: '/products/electronics', name: '电子产品', icon: 'mdi:chip' },
  { path: '/products/electronics/phones', name: '手机', icon: 'mdi:cellphone' },
]

// 不同分隔符示例
const separators = [
  { name: '斜杠', value: '/' },
  { name: '反斜杠', value: '\\\\' },
  { name: '大于号', value: '>' },
  { name: '箭头', value: '→' },
  { name: '双箭头', value: '>>' },
]

// 当前选中的分隔符
const currentSeparator = ref(separators[0].value)

// 自定义图标分隔符
const useIconSeparator = ref(false)
<\/script>`

const iconCode = `<ui-breadcrumb :routes="routes" />

<script setup>
// 带图标的路由配置
const routes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/dashboard', name: '控制台', icon: 'mdi:view-grid' },
  { path: '/dashboard/analysis', name: '分析页', icon: 'mdi:chart-pie' },
  { path: '/dashboard/analysis/realtime', name: '实时数据', icon: 'mdi:chart-line' },
  { path: '/dashboard/analysis/realtime/traffic', name: '流量监控', icon: 'mdi:chart-bar' },
]
<\/script>`

const collapseCode = `<!-- 不折叠 (默认) -->
<ui-breadcrumb :routes="longRoutes" />

<!-- 启用折叠 -->
<ui-breadcrumb
  :routes="longRoutes"
  collapsible
  :max-items="4"
/>

<script setup>
// 长路径示例
const longRoutes = [
  { path: '/', name: '首页', icon: 'mdi:home' },
  { path: '/level1', name: '一级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2', name: '二级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3', name: '三级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4', name: '四级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5', name: '五级菜单', icon: 'mdi:folder' },
  { path: '/level1/level2/level3/level4/level5/target', name: '目标页面', icon: 'mdi:target' },
]
<\/script>`

const slotCode = `<!-- 使用插槽自定义面包屑项 -->
<ui-breadcrumb separator=">">
  <ui-breadcrumb-item to="/" icon="mdi:home">
    首页
  </ui-breadcrumb-item>
  <ui-breadcrumb-item to="/components" icon="mdi:package">
    组件
  </ui-breadcrumb-item>
  <ui-breadcrumb-item to="/components/navigation" icon="mdi:compass">
    导航组件
  </ui-breadcrumb-item>
  <ui-breadcrumb-item icon="mdi:navigation">
    面包屑
  </ui-breadcrumb-item>
</ui-breadcrumb>

<!-- 自定义内容 -->
<ui-breadcrumb>
  <ui-breadcrumb-item to="/">
    首页
  </ui-breadcrumb-item>
  <ui-breadcrumb-item to="/user">
    <span class="inline-flex items-center">
      <ui-icon icon="mdi:account" />
      <span class="ml-1">用户中心</span>
    </span>
  </ui-breadcrumb-item>
  <ui-breadcrumb-item>
    <span class="inline-flex items-center">
      <ui-icon icon="mdi:cog" />
      <span class="ml-1">设置</span>
    </span>
  </ui-breadcrumb-item>
</ui-breadcrumb>`

const disabledCode = `<ui-breadcrumb>
  <ui-breadcrumb-item to="/">
    首页
  </ui-breadcrumb-item>
  <ui-breadcrumb-item to="/products">
    产品
  </ui-breadcrumb-item>
  <ui-breadcrumb-item disabled>
    已下架产品
  </ui-breadcrumb-item>
  <ui-breadcrumb-item>产品详情</ui-breadcrumb-item>
</ui-breadcrumb>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Breadcrumb 面包屑导航
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      面包屑导航用于显示当前页面在系统层级结构中的位置，允许用户返回任何一个层级。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="面包屑导航基础使用方式，通过 routes 属性传入路由配置。"
      :code="basicCode"
    >
      <ui-breadcrumb :routes="routes1" />
    </ui-demo>

    <!-- 显示首页 -->
    <ui-demo
      title="显示首页"
      description="设置 show-home 属性确保始终显示首页链接，可通过 home-text 和 home-icon 自定义首页文本和图标。"
      :code="homeCode"
    >
      <ui-breadcrumb
        :routes="[
          { path: '/products', name: '产品' },
          { path: '/products/electronics', name: '电子产品' },
        ]"
        show-home
        home-text="主页"
        home-icon="mdi:home"
      />
    </ui-demo>

    <!-- 自定义分隔符 -->
    <ui-demo
      title="自定义分隔符"
      description="通过 separator 属性自定义分隔符，也可以使用 separator-icon 设置图标作为分隔符。"
      :code="separatorCode"
    >
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <span>选择分隔符：</span>
        <ui-radio-group v-model="currentSeparator">
          <ui-radio
            v-for="item in separators"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }} ({{ item.value }})
          </ui-radio>
        </ui-radio-group>

        <ui-checkbox v-model="useIconSeparator">
          使用图标分隔符
        </ui-checkbox>
      </div>

      <ui-breadcrumb
        :routes="routes1"
        :separator="currentSeparator"
        :separator-icon="useIconSeparator ? 'mdi:chevron-right' : ''"
      />
    </ui-demo>

    <!-- 图标支持 -->
    <ui-demo
      title="图标支持"
      description="为每个面包屑项添加图标，通过 routes 中的 icon 属性指定。"
      :code="iconCode"
    >
      <ui-breadcrumb :routes="routes2" />
    </ui-demo>

    <!-- 自动折叠 -->
    <ui-demo
      title="自动折叠"
      description="当路径层级较多时，可以启用自动折叠功能，通过 collapsible 和 max-items 属性控制。"
      :code="collapseCode"
    >
      <div>
        <div class="mb-2 font-medium">
          不折叠 (默认)
        </div>
        <ui-breadcrumb :routes="longRoutes" />

        <div class="mb-2 mt-6 font-medium">
          启用折叠
        </div>
        <ui-breadcrumb
          :routes="longRoutes"
          collapsible
          :max-items="4"
        />
      </div>
    </ui-demo>

    <!-- 使用插槽自定义 -->
    <ui-demo
      title="使用插槽自定义"
      description="使用默认插槽和 BreadcrumbItem 组件可以自定义面包屑的内容和样式。"
      :code="slotCode"
    >
      <div class="space-y-6">
        <ui-breadcrumb separator=">">
          <ui-breadcrumb-item to="/" icon="mdi:home">
            首页
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/components" icon="mdi:package">
            组件
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/components/navigation" icon="mdi:compass">
            导航组件
          </ui-breadcrumb-item>
          <ui-breadcrumb-item icon="mdi:navigation">
            面包屑
          </ui-breadcrumb-item>
        </ui-breadcrumb>

        <ui-breadcrumb>
          <ui-breadcrumb-item to="/">
            首页
          </ui-breadcrumb-item>
          <ui-breadcrumb-item to="/user">
            <span class="inline-flex items-center">
              <ui-icon icon="mdi:account" />
              <span class="ml-1">用户中心</span>
            </span>
          </ui-breadcrumb-item>
          <ui-breadcrumb-item>
            <span class="inline-flex items-center">
              <ui-icon icon="mdi:cog" />
              <span class="ml-1">设置</span>
            </span>
          </ui-breadcrumb-item>
        </ui-breadcrumb>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="通过 disabled 属性设置面包屑项的禁用状态，禁用后不可点击。"
      :code="disabledCode"
    >
      <ui-breadcrumb>
        <ui-breadcrumb-item to="/">
          首页
        </ui-breadcrumb-item>
        <ui-breadcrumb-item to="/products">
          产品
        </ui-breadcrumb-item>
        <ui-breadcrumb-item disabled>
          已下架产品
        </ui-breadcrumb-item>
        <ui-breadcrumb-item>产品详情</ui-breadcrumb-item>
      </ui-breadcrumb>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <!-- Breadcrumb 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          Breadcrumb 属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  routes
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  路由配置数组
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  Array
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  []
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  separator
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  分隔符
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  /
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  separator-icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  图标分隔符
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  show-home
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否显示首页
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  home-text
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  首页文本
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  首页
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  home-icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  首页图标
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  mdi:home
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  collapsible
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否启用折叠功能
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  max-items
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  最大显示项数
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- BreadcrumbItem 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          BreadcrumbItem 属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  to
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  链接地址
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  图标名称
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  disabled
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否禁用
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 插槽 -->
      <div>
        <h4 class="mb-2 text-lg font-medium">
          插槽
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  名称
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  default
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义面包屑内容，通常放置 BreadcrumbItem 组件
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  separator
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义分隔符内容
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-breadcrumb {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .demo-section {
    margin-bottom: 40px;

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;

      &.mt-4 {
        margin-top: 16px;
      }
    }

    p {
      margin-bottom: 16px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-control {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;

    span {
      font-size: 14px;
    }
  }

  .demo-block {
    padding: 24px;
    margin-bottom: 16px;
    border: 1px solid var(--ui-color-border);
    border-radius: 8px;
    background-color: var(--ui-color-bg-card);
  }

  .custom-item {
    display: inline-flex;
    align-items: center;

    .ui-icon + span {
      margin-left: 4px;
    }
  }
}
</style>
