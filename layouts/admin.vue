<!--
 * 管理后台布局
 * 创建日期: 2024-06-19
 * 更新日期: 2024-10-10 - 改造为主流后台管理系统布局
 * 更新日期: 2024-10-13 - 使用ui组件库替代原生组件
 * 更新日期: 2024-10-13 - 直接使用ui/menu组件实现导航菜单
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
<script setup lang="ts" name="AdminLayout">
import type { IMenuItem } from '~/types/common'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('admin-layout')

// 是否折叠侧边栏
const isSidebarCollapsed = ref(false)

// 切换侧边栏折叠状态
function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// 当前用户信息
const currentUser = ref({
  avatar: '',
  username: 'admin',
  realName: '管理员',
})

// 用户菜单显示状态
const showUserMenu = ref(false)

// 处理退出登录
function handleLogout() {
  // TODO: 实现退出登录逻辑
  showUserMenu.value = false
  logger.info('用户点击退出登录')
}

// 从API获取菜单数据
const { data: menuData } = await useFetch<{
  success: boolean
  data?: {
    menus: Array<{
      id: string
      title: string
      path: string
      icon: string
      roles: string[]
      isHidden: boolean
      children: any[]
    }>
  }
  message?: string
}>('/api/menu')
const menuItems = computed(() => menuData.value?.data?.menus || [])

// 折叠宽度和展开宽度
const collapsedWidth = '64px'
const expandedWidth = '220px'

// 扁平化路由路径与菜单项的映射，用于渲染面包屑
const pathToMenuMap = computed(() => {
  const map = new Map()

  function traverse(items: any[], parentTitles: string[] = []) {
    items.forEach((item) => {
      if (item.path) {
        map.set(item.path, {
          ...item,
          parentTitles,
        })
      }

      if (item.children?.length) {
        traverse(item.children, [...parentTitles, item.title])
      }
    })
  }

  traverse(menuItems.value)
  return map
})

// 当前路由
const route = useRoute()

// 计算面包屑数据
const breadcrumbs = computed(() => {
  const currentPath = route.path
  const menuItem = pathToMenuMap.value.get(currentPath)

  if (!menuItem) {
    return []
  }

  const result = [
    { title: '首页', path: '/admin' },
    ...menuItem.parentTitles.map((title: string) => ({ title })),
    { title: menuItem.title },
  ]

  return result
})

// 用户菜单项
const userMenuItems: IMenuItem[] = [
  {
    key: 'profile',
    label: '个人信息',
    icon: 'carbon:user-profile',
  },
  {
    key: 'password',
    label: '修改密码',
    icon: 'carbon:password',
  },
  {
    key: 'divider',
    type: 'divider',
    label: '',
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: 'carbon:logout',
    danger: true,
  },
]

// 处理用户菜单选择
function handleUserMenuSelect(key: string | number) {
  if (key === 'logout') {
    handleLogout()
  }
  else {
    logger.info(`用户选择了菜单: ${key}`)
  }
  showUserMenu.value = false
}

// 将获取的菜单数据转换为ui-menu组件所需的格式
function convertMenuItems(items: any[] = []): any[] {
  return items.map((item) => {
    const menuItem = {
      itemKey: item.id,
      title: item.title,
      icon: item.icon,
      to: item.path,
      disabled: item.isHidden,
      children: item.children?.length ? convertMenuItems(item.children) : undefined,
    }

    return menuItem
  })
}

// 转换后的菜单数据
const uiMenuItems = computed(() => convertMenuItems(menuItems.value))

// 选中的菜单项
const selectedMenuKey = ref('')

// 监听路由变化，同步选中的菜单项
watch(() => route.path, (newPath) => {
  // 在扁平化的菜单映射中查找当前路径对应的菜单项
  const menuItem = pathToMenuMap.value.get(newPath)
  if (menuItem) {
    selectedMenuKey.value = menuItem.id
  }
}, { immediate: true })

// 默认展开的菜单项
const defaultOpenKeys = ref<string[]>([])

// 菜单选择事件处理
function handleMenuSelect(key: string) {
  logger.info(`选择了菜单项: ${key}`)
}

// 子菜单展开/收起事件处理
function handleOpenChange(keys: string[]) {
  logger.info(`菜单展开状态变化: ${keys.join(', ')}`)
}
</script>

<template>
  <ui-layout class="admin-layout">
    <ui-layout-sider
      class="sidebar h-full flex flex-col bg-gray-800 text-white transition-all duration-300 ease-out dark:bg-gray-950"
      :class="{ 'w-16': isSidebarCollapsed, 'w-55': !isSidebarCollapsed }"
      :style="{ width: isSidebarCollapsed ? collapsedWidth : expandedWidth }"
      resizable
    >
      <!-- 侧边栏头部 -->
      <div class="sidebar-header h-14 flex items-center justify-between border-b border-gray-700/50 px-4">
        <div class="logo flex items-center overflow-hidden">
          <ui-icon icon="carbon:logo-nodejs" class="flex-shrink-0 text-2xl text-primary" />
          <span v-if="!isSidebarCollapsed" class="logo-text ml-2 truncate text-lg font-medium">管理系统</span>
        </div>
      </div>

      <!-- 侧边栏导航 -->
      <div class="sidebar-menu flex-1 overflow-hidden hover:overflow-y-auto">
        <ui-menu
          v-model:selected-key="selectedMenuKey"
          mode="vertical"
          theme="dark"
          :collapsed="isSidebarCollapsed"
          :default-open-keys="defaultOpenKeys"
          :items="uiMenuItems"
          router
          class="border-none"
          @open-change="handleOpenChange"
          @select="handleMenuSelect"
        />
      </div>

      <!-- 侧边栏底部 -->
      <div class="sidebar-footer h-10 flex items-center justify-center border-t border-gray-700/50">
        <ui-button
          class="h-full w-full flex items-center justify-center"
          variant="text"
          color="gray"
          @click="toggleSidebar"
        >
          <ui-icon :icon="isSidebarCollapsed ? 'carbon:chevron-right' : 'carbon:chevron-left'" class="text-lg" />
        </ui-button>
      </div>
    </ui-layout-sider>

    <!-- 主体内容区 -->
    <ui-layout-content class="main-content flex flex-1 flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <ui-layout-header class="header h-14 flex items-center justify-between bg-white px-4 shadow dark:bg-gray-800">
        <div class="header-left flex items-center">
          <!-- 面包屑 -->
          <ui-breadcrumb separator=">" separator-icon="carbon:chevron-right">
            <ui-breadcrumb-item
              v-for="(crumb, index) in breadcrumbs"
              :key="index"
              :to="crumb.path"
            >
              {{ crumb.title }}
            </ui-breadcrumb-item>
          </ui-breadcrumb>
        </div>

        <div class="header-right flex items-center">
          <!-- 主题切换按钮 -->
          <ui-button
            variant="text"
            color="gray"
            class="mr-2 h-9 w-9 flex items-center justify-center rounded-full"
          >
            <ui-icon icon="carbon:light" class="text-lg" />
          </ui-button>

          <!-- 通知按钮 -->
          <ui-button
            variant="text"
            color="gray"
            class="relative mr-3 h-9 w-9 flex items-center justify-center rounded-full"
          >
            <ui-icon icon="carbon:notification" class="text-lg" />
            <ui-badge status="error" count="5" dot />
          </ui-button>

          <!-- 用户信息 -->
          <ui-dropdown
            :items="userMenuItems"
            trigger="click"
            @select="handleUserMenuSelect"
          >
            <div class="user-info flex cursor-pointer items-center">
              <ui-avatar
                :text="currentUser.realName"
                :src="currentUser.avatar"
                size="small"
                class="mr-2"
              />
              <span class="username text-sm font-medium">{{ currentUser.realName }}</span>
              <ui-icon icon="carbon:chevron-down" class="ml-1 text-xs" />
            </div>
          </ui-dropdown>
        </div>
      </ui-layout-header>

      <!-- 页面内容 -->
      <ui-layout-content class="content flex-1 overflow-auto p-4">
        <slot />
      </ui-layout-content>
    </ui-layout-content>
  </ui-layout>
</template>

<style lang="scss" scoped>
/* 导航菜单自定义样式 */
:deep(.ui-menu-dark) {
  background-color: transparent;

  .ui-menu-item:hover,
  .ui-submenu:hover > .ui-submenu-title {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .ui-menu-item-selected {
    background-color: var(--ui-color-primary-900, rgba(59, 130, 246, 0.9));
  }
}
</style>
