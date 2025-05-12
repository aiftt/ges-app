<!--
 * 管理后台布局
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
<script setup lang="ts" name="AdminLayout">
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

// 模拟菜单数据
const menuItems = [
  {
    id: '1',
    title: '首页',
    icon: 'carbon:dashboard',
    path: '/admin',
  },
  {
    id: '2',
    title: '系统管理',
    icon: 'carbon:settings',
    children: [
      {
        id: '2-1',
        title: '用户管理',
        icon: 'carbon:user',
        path: '/admin/system/user',
      },
      {
        id: '2-2',
        title: '角色管理',
        icon: 'carbon:user-role',
        path: '/admin/system/role',
      },
      {
        id: '2-3',
        title: '菜单管理',
        icon: 'carbon:list',
        path: '/admin/system/menu',
      },
      {
        id: '2-4',
        title: '字典管理',
        icon: 'carbon:book',
        path: '/admin/system/dict',
      },
    ],
  },
]

// 扁平化路由路径与菜单项的映射，用于渲染面包屑
// 因为使用递归组件递归渲染菜单，需要提前将路径与菜单的映射关系计算出来
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

      if (item.children) {
        traverse(item.children, [...parentTitles, item.title])
      }
    })
  }

  traverse(menuItems)
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
</script>

<template>
  <div
    class="admin-layout"
    :class="{ 'sidebar-collapsed': isSidebarCollapsed }"
  >
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <ui-icon v-if="isSidebarCollapsed" icon="carbon:logo-nodejs" class="logo-icon" />
          <template v-else>
            <span class="logo-text">管理系统</span>
          </template>
        </div>
        <ui-button
          class="collapse-btn"
          variant="text"
          @click="toggleSidebar"
        >
          <ui-icon :icon="isSidebarCollapsed ? 'carbon:chevron-right' : 'carbon:chevron-left'" />
        </ui-button>
      </div>

      <div class="sidebar-menu">
        <template v-for="item in menuItems" :key="item.id">
          <!-- 有子菜单的项目 -->
          <div v-if="item.children" class="menu-group">
            <div class="menu-group-title">
              <ui-icon :icon="item.icon" />
              <span v-if="!isSidebarCollapsed" class="menu-title">{{ item.title }}</span>
            </div>

            <div class="submenu">
              <NuxtLink
                v-for="subItem in item.children"
                :key="subItem.id"
                :to="subItem.path"
                class="menu-item"
                active-class="active"
              >
                <ui-icon :icon="subItem.icon" />
                <span v-if="!isSidebarCollapsed" class="menu-title">{{ subItem.title }}</span>
              </NuxtLink>
            </div>
          </div>

          <!-- 没有子菜单的项目 -->
          <NuxtLink
            v-else
            :to="item.path"
            class="menu-item"
            active-class="active"
          >
            <ui-icon :icon="item.icon" />
            <span v-if="!isSidebarCollapsed" class="menu-title">{{ item.title }}</span>
          </NuxtLink>
        </template>
      </div>
    </aside>

    <!-- 主体内容区 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="header-left">
          <div class="breadcrumb">
            <template v-for="(crumb, index) in breadcrumbs" :key="index">
              <NuxtLink v-if="crumb.path" :to="crumb.path" class="breadcrumb-item">
                {{ crumb.title }}
              </NuxtLink>
              <span v-else class="breadcrumb-item current">{{ crumb.title }}</span>
              <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
            </template>
          </div>
        </div>

        <div class="header-right">
          <div class="user-info" @click="showUserMenu = !showUserMenu">
            <div
              class="avatar"
              :style="{ backgroundImage: currentUser.avatar ? `url(${currentUser.avatar})` : 'none' }"
            >
              <span v-if="!currentUser.avatar">{{ currentUser.realName.charAt(0) }}</span>
            </div>
            <span class="username">{{ currentUser.realName }}</span>
            <ui-icon icon="carbon:chevron-down" />

            <!-- 用户下拉菜单 -->
            <div v-if="showUserMenu" class="user-menu">
              <div class="user-menu-item">
                <ui-icon icon="carbon:user-profile" />
                <span>个人信息</span>
              </div>
              <div class="user-menu-item">
                <ui-icon icon="carbon:password" />
                <span>修改密码</span>
              </div>
              <div class="divider" />
              <div class="user-menu-item" @click="handleLogout">
                <ui-icon icon="carbon:logout" />
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  width: 100%;
  height: 100vh;

  // 侧边栏
  .sidebar {
    width: 220px;
    height: 100%;
    background-color: #001529;
    color: white;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;

    // 折叠时的宽度
    .admin-layout.sidebar-collapsed & {
      width: 80px;
    }

    // 侧边栏头部
    .sidebar-header {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .logo {
        flex: 1;
        font-size: 18px;
        font-weight: bold;
        color: white;
        display: flex;
        align-items: center;
        overflow: hidden;

        .logo-icon {
          font-size: 24px;
        }
      }

      .collapse-btn {
        color: rgba(255, 255, 255, 0.65);

        &:hover {
          color: white;
        }
      }
    }

    // 侧边栏菜单
    .sidebar-menu {
      flex: 1;
      overflow-y: auto;
      padding: 16px 0;

      .menu-group {
        margin-bottom: 8px;

        .menu-group-title {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: white;
          }

          .menu-title {
            margin-left: 8px;
          }
        }

        .submenu {
          margin-left: 16px;
        }
      }

      .menu-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        color: rgba(255, 255, 255, 0.65);
        font-size: 14px;
        text-decoration: none;
        border-left: 3px solid transparent;
        transition:
          background-color 0.3s,
          color 0.3s,
          border-color 0.3s;

        &:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.05);
        }

        &.active {
          color: white;
          background-color: #1890ff;
          border-left-color: white;
        }

        .menu-title {
          margin-left: 8px;
          white-space: nowrap;
        }
      }
    }
  }

  // 主体内容区
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    // 顶部导航栏
    .header {
      height: 64px;
      padding: 0 16px;
      background-color: white;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-left {
        .breadcrumb {
          display: flex;
          align-items: center;

          .breadcrumb-item {
            color: rgba(0, 0, 0, 0.65);
            text-decoration: none;

            &:hover {
              color: #1890ff;
            }

            &.current {
              color: rgba(0, 0, 0, 0.85);
              font-weight: 500;
            }
          }

          .breadcrumb-separator {
            margin: 0 8px;
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }

      .header-right {
        .user-info {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0 12px;
          height: 48px;
          border-radius: 4px;
          position: relative;

          &:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }

          .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #1890ff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            background-size: cover;
            background-position: center;
          }

          .username {
            margin: 0 8px;
            font-size: 14px;
          }

          // 用户下拉菜单
          .user-menu {
            position: absolute;
            top: 100%;
            right: 0;
            width: 160px;
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            padding: 4px 0;
            z-index: 1000;

            .user-menu-item {
              display: flex;
              align-items: center;
              padding: 8px 16px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              cursor: pointer;

              &:hover {
                background-color: rgba(0, 0, 0, 0.03);
              }

              span {
                margin-left: 8px;
              }
            }

            .divider {
              height: 1px;
              background-color: #f0f0f0;
              margin: 4px 0;
            }
          }
        }
      }
    }

    // 页面内容
    .content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background-color: #f0f2f5;
    }
  }
}

// 侧边栏折叠状态
.admin-layout.sidebar-collapsed {
  .sidebar {
    width: 80px;
  }
}
</style>
