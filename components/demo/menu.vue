<script setup lang="ts" name="DemoMenu">
/**
 * Menu组件示例
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2024-08-01 - 完善组件示例，修复属性名与实现不匹配的问题
 * 更新日期: 2024-08-27 - 更新示例，展示更多功能和使用场景
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 选中菜单项
const selectedKey = ref('home')

// 垂直菜单展开的子菜单
const verticalOpenKeys = ref(['sub1'])

// 切换折叠状态
const collapsed = ref(false)
function toggleCollapsed() {
  collapsed.value = !collapsed.value
}

// 处理菜单选择事件
function handleSelect(key: string) {
  selectedKey.value = key
}

// 深色主题设置
const isDarkTheme = ref(false)

// 切换菜单模式
const menuMode = ref<'vertical' | 'horizontal' | 'inline'>('vertical')
function setMenuMode(mode: 'vertical' | 'horizontal' | 'inline') {
  menuMode.value = mode
}

// 子菜单触发方式
const triggerType = ref<'hover' | 'click'>('hover')
function setTriggerType(type: 'hover' | 'click') {
  triggerType.value = type
}

// 带用户信息的菜单
const avatar = ref('https://avatars.githubusercontent.com/u/1?v=4')
const username = ref('Admin User')

// 代码示例
const horizontalMenuCode = `<ui-menu
  mode="horizontal"
  :selected-key="selectedKey"
  @select="handleSelect"
>
  <ui-menu-item item-key="home" icon="carbon:home">
    首页
  </ui-menu-item>
  <ui-menu-submenu item-key="sub1" title="产品" icon="carbon:product">
    <ui-menu-item item-key="sub1-1">
      产品列表
    </ui-menu-item>
    <ui-menu-item item-key="sub1-2">
      产品详情
    </ui-menu-item>
  </ui-menu-submenu>
  <ui-menu-item item-key="about" icon="carbon:information">
    关于我们
  </ui-menu-item>
  <ui-menu-item item-key="contact" icon="carbon:email" disabled>
    联系我们
  </ui-menu-item>
</ui-menu>

<script setup>
const selectedKey = ref('home')

function handleSelect(key) {
  selectedKey.value = key
}
<\/script>`

const verticalMenuCode = `<div class="mb-4">
  <ui-button @click="toggleCollapsed">
    {{ collapsed ? '展开' : '折叠' }}
  </ui-button>
</div>
<div class="w-200px transition-all duration-300">
  <ui-menu
    mode="vertical"
    :collapsed="collapsed"
    :selected-key="selectedKey"
    :default-open-keys="verticalOpenKeys"
    @select="handleSelect"
  >
    <ui-menu-item item-key="home" icon="carbon:home">
      首页
    </ui-menu-item>
    <ui-menu-submenu item-key="sub1" title="产品管理" icon="carbon:product">
      <ui-menu-item item-key="sub1-1" icon="carbon:list">
        产品列表
      </ui-menu-item>
      <ui-menu-item item-key="sub1-2" icon="carbon:add">
        添加产品
      </ui-menu-item>
    </ui-menu-submenu>
    <ui-menu-item item-key="settings" icon="carbon:settings">
      系统设置
    </ui-menu-item>
  </ui-menu>
</div>

<script setup>
const selectedKey = ref('home')
const verticalOpenKeys = ref(['sub1'])
const collapsed = ref(false)

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}

function handleSelect(key) {
  selectedKey.value = key
}
<\/script>`

const inlineMenuCode = `<ui-menu
  mode="inline"
  :selected-key="selectedKey"
  @select="handleSelect"
>
  <ui-menu-item item-key="home" icon="carbon:home">
    首页
  </ui-menu-item>
  <ui-menu-submenu item-key="sub1" title="产品管理" icon="carbon:product">
    <ui-menu-item item-key="sub1-1">
      产品列表
    </ui-menu-item>
    <ui-menu-item item-key="sub1-2">
      添加产品
    </ui-menu-item>
    <ui-menu-submenu item-key="sub1-3" title="产品分类">
      <ui-menu-item item-key="sub1-3-1">
        电子产品
      </ui-menu-item>
      <ui-menu-item item-key="sub1-3-2">
        家居用品
      </ui-menu-item>
    </ui-menu-submenu>
  </ui-menu-submenu>
  <ui-menu-item item-key="settings" icon="carbon:settings">
    系统设置
  </ui-menu-item>
</ui-menu>`

const configPanelCode = `<template>
  <div class="mb-4 flex flex-wrap gap-4">
    <ui-button :type="menuMode === 'vertical' ? 'primary' : 'default'" @click="setMenuMode('vertical')">
      垂直菜单
    </ui-button>
    <ui-button :type="menuMode === 'horizontal' ? 'primary' : 'default'" @click="setMenuMode('horizontal')">
      水平菜单
    </ui-button>
    <ui-button :type="menuMode === 'inline' ? 'primary' : 'default'" @click="setMenuMode('inline')">
      内联菜单
    </ui-button>
  </div>

  <div class="mb-4">
    <span class="mr-2">子菜单触发方式:</span>
    <ui-button :type="triggerType === 'hover' ? 'primary' : 'default'" size="small" @click="setTriggerType('hover')">
      悬停
    </ui-button>
    <ui-button :type="triggerType === 'click' ? 'primary' : 'default'" size="small" @click="setTriggerType('click')">
      点击
    </ui-button>
  </div>

  <div class="mb-4">
    <span class="mr-2">主题:</span>
    <ui-switch v-model:checked="isDarkTheme">
      {{ isDarkTheme ? '暗色' : '亮色' }}
    </ui-switch>
  </div>

  <div class="mt-6 border-t pt-4">
    <h4 class="mb-2 font-bold">预览:</h4>
    <div :class="menuMode === 'horizontal' ? 'w-full' : 'w-250px'">
      <ui-menu
        :mode="menuMode"
        :selected-key="selectedKey"
        :theme="isDarkTheme ? 'dark' : 'light'"
        :trigger-sub-menu-action="triggerType"
        @select="handleSelect"
      >
        <!-- 菜单项... -->
      </ui-menu>
    </div>
  </div>
</template>

<script setup>
const menuMode = ref('vertical')
const triggerType = ref('hover')
const isDarkTheme = ref(false)
const selectedKey = ref('home')

function setMenuMode(mode) {
  menuMode.value = mode
}

function setTriggerType(type) {
  triggerType.value = type
}

function handleSelect(key) {
  selectedKey.value = key
}
<\/script>`

const dashboardLayoutCode = `<div class="overflow-hidden border rounded">
  <!-- 顶部导航栏 -->
  <div class="flex items-center justify-between border-b bg-white p-4 dark:bg-gray-900">
    <div class="flex items-center">
      <ui-icon icon="carbon:code" class="mr-2 text-2xl text-primary-500" />
      <span class="text-lg font-bold">应用管理系统</span>
    </div>

    <div class="flex items-center">
      <ui-icon icon="carbon:notification" class="mr-4 cursor-pointer" />
      <ui-icon icon="carbon:help" class="mr-4 cursor-pointer" />
      <div class="flex items-center">
        <img :src="avatar" class="mr-2 h-8 w-8 rounded-full" alt="User avatar">
        <span>{{ username }}</span>
      </div>
    </div>
  </div>

  <!-- 主体内容 -->
  <div class="flex">
    <!-- 侧边栏 -->
    <div class="h-96 w-60 overflow-auto border-r bg-white dark:bg-gray-900">
      <ui-menu mode="inline" :selected-key="selectedKey" @select="handleSelect">
        <ui-menu-item item-key="dashboard" icon="carbon:dashboard">
          仪表盘
        </ui-menu-item>
        <ui-menu-submenu item-key="products" title="产品管理" icon="carbon:product">
          <!-- 子菜单项... -->
        </ui-menu-submenu>
        <!-- 更多菜单项... -->
      </ui-menu>
    </div>

    <!-- 内容区域 -->
    <div class="h-96 flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-800">
      <div class="mb-4">
        <h2 class="mb-2 text-xl font-bold">仪表盘</h2>
        <p class="text-gray-500 dark:text-gray-400">
          欢迎使用菜单组件进行导航，点击左侧菜单项可以切换内容。
        </p>
      </div>

      <div class="rounded bg-white p-4 shadow dark:bg-gray-700">
        <p>当前选中菜单项: <strong>{{ selectedKey }}</strong></p>
      </div>
    </div>
  </div>
</div>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Menu 导航菜单
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      导航菜单是一种网站的导航容器，用户可以在这个导航上逐步找到需要的页面。适用于网站导航、侧边栏导航和下拉菜单等场景。
    </p>

    <!-- 水平菜单 -->
    <ui-demo
      title="水平菜单"
      description="水平导航菜单，适用于页面顶部导航，通过 mode 属性设置为 horizontal。"
      :code="horizontalMenuCode"
    >
      <ui-menu
        mode="horizontal"
        :selected-key="selectedKey"
        @select="handleSelect"
      >
        <ui-menu-item item-key="home" icon="carbon:home">
          首页
        </ui-menu-item>
        <ui-menu-submenu item-key="sub1" title="产品" icon="carbon:product">
          <ui-menu-item item-key="sub1-1">
            产品列表
          </ui-menu-item>
          <ui-menu-item item-key="sub1-2">
            产品详情
          </ui-menu-item>
        </ui-menu-submenu>
        <ui-menu-item item-key="about" icon="carbon:information">
          关于我们
        </ui-menu-item>
        <ui-menu-item item-key="contact" icon="carbon:email" disabled>
          联系我们
        </ui-menu-item>
      </ui-menu>
    </ui-demo>

    <!-- 垂直菜单 -->
    <ui-demo
      title="垂直菜单"
      description="垂直导航菜单，常用于侧边栏导航，支持折叠/展开功能。"
      :code="verticalMenuCode"
    >
      <div class="flex space-x-8">
        <div>
          <div class="mb-4">
            <ui-button @click="toggleCollapsed">
              {{ collapsed ? '展开' : '折叠' }}
            </ui-button>
          </div>
          <div class="w-200px transition-all duration-300">
            <ui-menu
              mode="vertical"
              :collapsed="collapsed"
              :selected-key="selectedKey"
              :default-open-keys="verticalOpenKeys"
              @select="handleSelect"
            >
              <ui-menu-item item-key="home" icon="carbon:home">
                首页
              </ui-menu-item>
              <ui-menu-submenu item-key="sub1" title="产品管理" icon="carbon:product">
                <ui-menu-item item-key="sub1-1" icon="carbon:list">
                  产品列表
                </ui-menu-item>
                <ui-menu-item item-key="sub1-2" icon="carbon:add">
                  添加产品
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-item item-key="settings" icon="carbon:settings">
                系统设置
              </ui-menu-item>
            </ui-menu>
          </div>
        </div>

        <div class="dark rounded bg-gray-900 p-4">
          <h4 class="mb-2 text-white">
            暗色主题
          </h4>
          <div class="w-200px">
            <ui-menu
              mode="vertical"
              theme="dark"
              :selected-key="selectedKey"
              @select="handleSelect"
            >
              <ui-menu-item item-key="home" icon="carbon:home">
                首页
              </ui-menu-item>
              <ui-menu-submenu item-key="sub1" title="产品管理" icon="carbon:product">
                <ui-menu-item item-key="sub1-1">
                  产品列表
                </ui-menu-item>
                <ui-menu-item item-key="sub1-2">
                  添加产品
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-item item-key="settings" icon="carbon:settings">
                系统设置
              </ui-menu-item>
            </ui-menu>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 内联菜单 -->
    <ui-demo
      title="内联菜单"
      description="内联菜单，子菜单内嵌在菜单区域中，支持多级嵌套。"
      :code="inlineMenuCode"
    >
      <div class="w-250px border rounded p-4">
        <ui-menu
          mode="inline"
          :selected-key="selectedKey"
          @select="handleSelect"
        >
          <ui-menu-item item-key="home" icon="carbon:home">
            首页
          </ui-menu-item>
          <ui-menu-submenu item-key="sub1" title="产品管理" icon="carbon:product">
            <ui-menu-item item-key="sub1-1">
              产品列表
            </ui-menu-item>
            <ui-menu-item item-key="sub1-2">
              添加产品
            </ui-menu-item>
            <ui-menu-submenu item-key="sub1-3" title="产品分类">
              <ui-menu-item item-key="sub1-3-1">
                电子产品
              </ui-menu-item>
              <ui-menu-item item-key="sub1-3-2">
                家居用品
              </ui-menu-item>
            </ui-menu-submenu>
          </ui-menu-submenu>
          <ui-menu-item item-key="settings" icon="carbon:settings">
            系统设置
          </ui-menu-item>
        </ui-menu>
      </div>
    </ui-demo>

    <!-- 配置面板 -->
    <ui-demo
      title="可配置菜单"
      description="菜单提供多种配置选项，包括显示模式、触发方式和主题。"
      :code="configPanelCode"
    >
      <div class="border rounded p-4">
        <div class="mb-4 flex flex-wrap gap-4">
          <ui-button :type="menuMode === 'vertical' ? 'primary' : 'default'" @click="setMenuMode('vertical')">
            垂直菜单
          </ui-button>
          <ui-button :type="menuMode === 'horizontal' ? 'primary' : 'default'" @click="setMenuMode('horizontal')">
            水平菜单
          </ui-button>
          <ui-button :type="menuMode === 'inline' ? 'primary' : 'default'" @click="setMenuMode('inline')">
            内联菜单
          </ui-button>
        </div>

        <div class="mb-4">
          <span class="mr-2">子菜单触发方式:</span>
          <ui-button :type="triggerType === 'hover' ? 'primary' : 'default'" size="small" @click="setTriggerType('hover')">
            悬停
          </ui-button>
          <ui-button :type="triggerType === 'click' ? 'primary' : 'default'" size="small" @click="setTriggerType('click')">
            点击
          </ui-button>
        </div>

        <div class="mb-4">
          <span class="mr-2">主题:</span>
          <ui-switch v-model:checked="isDarkTheme">
            {{ isDarkTheme ? '暗色' : '亮色' }}
          </ui-switch>
        </div>

        <div class="mt-6 border-t pt-4">
          <h4 class="text-md mb-2 font-bold">
            预览:
          </h4>
          <div :class="menuMode === 'horizontal' ? 'w-full' : 'w-250px'">
            <ui-menu
              :mode="menuMode"
              :selected-key="selectedKey"
              :theme="isDarkTheme ? 'dark' : 'light'"
              :trigger-sub-menu-action="triggerType"
              class="rounded bg-white dark:bg-gray-800"
              @select="handleSelect"
            >
              <ui-menu-item item-key="home" icon="carbon:home">
                首页
              </ui-menu-item>
              <ui-menu-submenu item-key="sub1" title="产品" icon="carbon:product">
                <ui-menu-item item-key="sub1-1">
                  产品列表
                </ui-menu-item>
                <ui-menu-item item-key="sub1-2">
                  产品详情
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-submenu item-key="sub2" title="客户" icon="carbon:user">
                <ui-menu-item item-key="sub2-1">
                  客户列表
                </ui-menu-item>
                <ui-menu-item item-key="sub2-2" danger>
                  客户黑名单
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-item item-key="settings" icon="carbon:settings">
                设置
              </ui-menu-item>
            </ui-menu>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 应用示例 -->
    <ui-demo
      title="应用示例 - 仪表盘布局"
      description="将菜单组件集成到仪表盘布局中，实现完整的导航系统。"
      :code="dashboardLayoutCode"
    >
      <div class="overflow-hidden border rounded">
        <!-- 顶部导航栏 -->
        <div class="flex items-center justify-between border-b bg-white p-4 dark:bg-gray-900">
          <div class="flex items-center">
            <ui-icon icon="carbon:code" class="mr-2 text-2xl text-primary-500" />
            <span class="text-lg font-bold">应用管理系统</span>
          </div>

          <div class="flex items-center">
            <ui-icon icon="carbon:notification" class="mr-4 cursor-pointer" />
            <ui-icon icon="carbon:help" class="mr-4 cursor-pointer" />
            <div class="flex items-center">
              <img :src="avatar" class="mr-2 h-8 w-8 rounded-full" alt="User avatar">
              <span>{{ username }}</span>
            </div>
          </div>
        </div>

        <!-- 主体内容 -->
        <div class="flex">
          <!-- 侧边栏 -->
          <div class="h-96 w-60 overflow-auto border-r bg-white dark:bg-gray-900">
            <ui-menu mode="inline" :selected-key="selectedKey" @select="handleSelect">
              <ui-menu-item item-key="dashboard" icon="carbon:dashboard">
                仪表盘
              </ui-menu-item>
              <ui-menu-submenu item-key="products" title="产品管理" icon="carbon:product">
                <ui-menu-item item-key="product-list">
                  产品列表
                </ui-menu-item>
                <ui-menu-item item-key="product-add">
                  添加产品
                </ui-menu-item>
                <ui-menu-item item-key="product-categories">
                  产品分类
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-submenu item-key="orders" title="订单管理" icon="carbon:shopping-cart">
                <ui-menu-item item-key="order-list">
                  订单列表
                </ui-menu-item>
                <ui-menu-item item-key="order-review">
                  订单审核
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-submenu item-key="users" title="用户管理" icon="carbon:user">
                <ui-menu-item item-key="user-list">
                  用户列表
                </ui-menu-item>
                <ui-menu-item item-key="user-roles">
                  角色管理
                </ui-menu-item>
                <ui-menu-item item-key="user-permissions">
                  权限设置
                </ui-menu-item>
              </ui-menu-submenu>
              <ui-menu-item item-key="settings" icon="carbon:settings">
                系统设置
              </ui-menu-item>
            </ui-menu>
          </div>

          <!-- 内容区域 -->
          <div class="h-96 flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-800">
            <div class="mb-4">
              <h2 class="mb-2 text-xl font-bold">
                仪表盘
              </h2>
              <p class="text-gray-500 dark:text-gray-400">
                欢迎使用菜单组件进行导航，点击左侧菜单项可以切换内容。
              </p>
            </div>

            <div class="rounded bg-white p-4 shadow dark:bg-gray-700">
              <p>
                当前选中菜单项: <strong>{{ selectedKey }}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ui-demo>
  </div>
</template>
