<script setup lang="ts" name="AdminLayout">
/**
 * 管理系统布局组件
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */

// 菜单折叠状态
const menuCollapsed = ref(false)

// 是否展示移动端抽屉菜单
const showMobileDrawer = ref(false)

// 当前选中的菜单项
const selectedMenuKey = ref('')

// 默认展开的菜单项
const openMenuKeys = ref<string[]>([])

// 路由实例
const router = useRouter()
const route = useRoute()

// 监听路由变化更新选中菜单
watch(
  () => route.path,
  (path) => {
    // 根据路径计算当前菜单KEY
    updateSelectedMenu(path)
  },
  { immediate: true },
)

// 更新选中的菜单
function updateSelectedMenu(path: string) {
  if (path.includes('/admin/dashboard')) {
    selectedMenuKey.value = 'dashboard'
  }
  else if (path.includes('/admin/system/user')) {
    selectedMenuKey.value = 'user'
    openMenuKeys.value = ['system']
  }
  else if (path.includes('/admin/system/role')) {
    selectedMenuKey.value = 'role'
    openMenuKeys.value = ['system']
  }
  else if (path.includes('/admin/system/menu')) {
    selectedMenuKey.value = 'menu'
    openMenuKeys.value = ['system']
  }
  else if (path.includes('/admin/system/dict')) {
    selectedMenuKey.value = 'dict'
    openMenuKeys.value = ['system']
  }
}

// 切换菜单折叠状态
function toggleCollapsed() {
  menuCollapsed.value = !menuCollapsed.value
}

// 打开移动端抽屉菜单
function openMobileMenu() {
  showMobileDrawer.value = true
}

// 关闭移动端抽屉菜单
function closeMobileMenu() {
  showMobileDrawer.value = false
}

// 处理菜单点击
function handleMenuClick(key: string) {
  switch (key) {
    case 'dashboard':
      router.push('/admin/dashboard')
      break
    case 'user':
      router.push('/admin/system/user')
      break
    case 'role':
      router.push('/admin/system/role')
      break
    case 'menu':
      router.push('/admin/system/menu')
      break
    case 'dict':
      router.push('/admin/system/dict')
      break
    default:
      break
  }

  // 在移动端自动关闭抽屉菜单
  if (showMobileDrawer.value) {
    closeMobileMenu()
  }
}

// 处理用户退出
function handleLogout() {
  // TODO: 实现退出登录逻辑

  // 跳转到登录页面
  router.push('/admin/login')
}
</script>

<template>
  <div class="admin-layout">
    <!-- 侧边菜单 - 桌面端 -->
    <aside class="admin-sidebar" :class="{ 'admin-sidebar--collapsed': menuCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <ui-icon icon="carbon:application" size="24px" color="primary" />
          <span v-if="!menuCollapsed" class="logo-text">GES Admin</span>
        </div>
        <ui-button
          class="collapse-trigger"
          type="text"
          @click="toggleCollapsed"
        >
          <ui-icon :icon="menuCollapsed ? 'carbon:chevron-right' : 'carbon:chevron-left'" />
        </ui-button>
      </div>

      <div class="sidebar-menu">
        <ui-menu
          mode="vertical"
          :collapsed="menuCollapsed"
          :selected-key="selectedMenuKey"
          :default-open-keys="openMenuKeys"
          theme="dark"
          @select="handleMenuClick"
        >
          <ui-menu-item key="dashboard">
            <template #icon>
              <ui-icon icon="carbon:dashboard" />
            </template>
            <span>仪表盘</span>
          </ui-menu-item>

          <ui-menu-sub-menu key="system">
            <template #icon>
              <ui-icon icon="carbon:settings" />
            </template>
            <template #title>
              系统管理
            </template>

            <ui-menu-item key="user">
              <template #icon>
                <ui-icon icon="carbon:user" />
              </template>
              <span>用户管理</span>
            </ui-menu-item>

            <ui-menu-item key="role">
              <template #icon>
                <ui-icon icon="carbon:user-role" />
              </template>
              <span>角色管理</span>
            </ui-menu-item>

            <ui-menu-item key="menu">
              <template #icon>
                <ui-icon icon="carbon:list" />
              </template>
              <span>菜单管理</span>
            </ui-menu-item>

            <ui-menu-item key="dict">
              <template #icon>
                <ui-icon icon="carbon:book" />
              </template>
              <span>字典管理</span>
            </ui-menu-item>
          </ui-menu-sub-menu>
        </ui-menu>
      </div>
    </aside>

    <!-- 移动端抽屉菜单 -->
    <ui-drawer
      v-model="showMobileDrawer"
      title="菜单"
      :width="250"
      class="mobile-drawer"
    >
      <ui-menu
        mode="vertical"
        :selected-key="selectedMenuKey"
        :default-open-keys="openMenuKeys"
        theme="light"
        @select="handleMenuClick"
      >
        <ui-menu-item key="dashboard">
          <template #icon>
            <ui-icon icon="carbon:dashboard" />
          </template>
          <span>仪表盘</span>
        </ui-menu-item>

        <ui-menu-sub-menu key="system">
          <template #icon>
            <ui-icon icon="carbon:settings" />
          </template>
          <template #title>
            系统管理
          </template>

          <ui-menu-item key="user">
            <template #icon>
              <ui-icon icon="carbon:user" />
            </template>
            <span>用户管理</span>
          </ui-menu-item>

          <ui-menu-item key="role">
            <template #icon>
              <ui-icon icon="carbon:user-role" />
            </template>
            <span>角色管理</span>
          </ui-menu-item>

          <ui-menu-item key="menu">
            <template #icon>
              <ui-icon icon="carbon:list" />
            </template>
            <span>菜单管理</span>
          </ui-menu-item>

          <ui-menu-item key="dict">
            <template #icon>
              <ui-icon icon="carbon:book" />
            </template>
            <span>字典管理</span>
          </ui-menu-item>
        </ui-menu-sub-menu>
      </ui-menu>
    </ui-drawer>

    <!-- 主内容区域 -->
    <div class="admin-main" :class="{ 'admin-main--expanded': menuCollapsed }">
      <!-- 头部导航 -->
      <header class="admin-header">
        <div class="header-left">
          <!-- 移动端菜单按钮 -->
          <ui-button
            class="mobile-menu-button"
            type="text"
            @click="openMobileMenu"
          >
            <ui-icon icon="carbon:menu" />
          </ui-button>

          <!-- 面包屑导航 -->
          <ui-breadcrumb>
            <ui-breadcrumb-item>
              <ui-icon icon="carbon:home" />
            </ui-breadcrumb-item>
            <ui-breadcrumb-item>{{ route.meta.title || '管理系统' }}</ui-breadcrumb-item>
          </ui-breadcrumb>
        </div>

        <div class="header-right">
          <!-- 通知图标 -->
          <ui-dropdown>
            <ui-button type="text">
              <ui-icon icon="carbon:notification" />
            </ui-button>
            <template #overlay>
              <div class="notification-dropdown">
                <div class="notification-header">
                  <h3>通知</h3>
                  <ui-link>查看全部</ui-link>
                </div>
                <div class="notification-list">
                  <div class="notification-item">
                    <div class="notification-icon">
                      <ui-icon icon="carbon:user" />
                    </div>
                    <div class="notification-content">
                      <div class="notification-title">
                        用户登录通知
                      </div>
                      <div class="notification-time">
                        10分钟前
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </ui-dropdown>

          <!-- 用户信息 -->
          <ui-dropdown>
            <div class="user-info">
              <ui-avatar>
                <ui-icon icon="carbon:user-avatar" />
              </ui-avatar>
              <span class="username">管理员</span>
            </div>
            <template #overlay>
              <div class="user-dropdown">
                <ui-dropdown-item>
                  <ui-icon icon="carbon:user-profile" />
                  <span>个人中心</span>
                </ui-dropdown-item>
                <ui-dropdown-item>
                  <ui-icon icon="carbon:settings" />
                  <span>设置</span>
                </ui-dropdown-item>
                <ui-dropdown-divider />
                <ui-dropdown-item @click="handleLogout">
                  <ui-icon icon="carbon:logout" />
                  <span>退出登录</span>
                </ui-dropdown-item>
              </div>
            </template>
          </ui-dropdown>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="admin-content">
        <slot />
      </main>

      <!-- 页脚 -->
      <footer class="admin-footer">
        <div>Copyright © 2024 GES管理系统 All Rights Reserved.</div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 侧边栏样式 */
.admin-sidebar {
  width: 256px;
  height: 100%;
  overflow: hidden;
  background-color: #001529;
  transition: width 0.2s;
  position: relative;
  flex-shrink: 0;

  &--collapsed {
    width: 64px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.sidebar-header {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  height: 32px;

  .logo-text {
    margin-left: 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    transition: opacity 0.3s;
    white-space: nowrap;
  }
}

.collapse-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);

  &:hover {
    color: #fff;
  }
}

.sidebar-menu {
  height: calc(100% - 64px);
  overflow-y: auto;
  padding-bottom: 48px;
}

/* 主内容区域样式 */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.2s;
}

/* 头部导航样式 */
.admin-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right > * {
  margin-left: 16px;
}

.mobile-menu-button {
  display: none;
  margin-right: 12px;

  @media screen and (max-width: 768px) {
    display: block;
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .username {
    margin-left: 8px;

    @media screen and (max-width: 576px) {
      display: none;
    }
  }
}

/* 内容区域样式 */
.admin-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
  background-color: #f0f2f5;
}

/* 页脚样式 */
.admin-footer {
  padding: 16px 24px;
  background-color: #fff;
  text-align: center;
  color: #8c8c8c;
  font-size: 14px;
}

/* 通知下拉菜单样式 */
.notification-dropdown {
  min-width: 280px;
  max-width: 320px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    margin: 0;
    font-size: 16px;
  }
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
}

.notification-icon {
  margin-right: 12px;
  font-size: 20px;
  color: var(--ui-color-primary, #3b82f6);
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #8c8c8c;
}

/* 用户下拉菜单样式 */
.user-dropdown {
  min-width: 160px;
}
</style>
