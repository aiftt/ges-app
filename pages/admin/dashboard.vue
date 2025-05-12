<script setup lang="ts" name="AdminDashboard">
/**
 * 管理系统仪表盘页面
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { useLogger } from '~/composables/useLogger'

// 创建日志记录器
const logger = useLogger('admin-dashboard')

// 页面元数据
definePageMeta({
  title: '仪表盘',
  layout: 'admin',
})

// 统计卡片数据
const stats = reactive({
  userCount: 0,
  roleCount: 0,
  menuCount: 0,
  dictCount: 0,
})

// 近期登录数据（模拟）
const recentLogins = ref([
  { id: 1, username: 'admin', time: '2024-12-01 10:30:45', ip: '192.168.1.1', location: '中国北京' },
  { id: 2, username: 'user1', time: '2024-12-01 09:15:22', ip: '192.168.1.2', location: '中国上海' },
  { id: 3, username: 'user2', time: '2024-11-30 16:45:10', ip: '192.168.1.3', location: '中国深圳' },
  { id: 4, username: 'user3', time: '2024-11-30 14:20:35', ip: '192.168.1.4', location: '中国广州' },
  { id: 5, username: 'user4', time: '2024-11-29 11:05:18', ip: '192.168.1.5', location: '中国杭州' },
])

// 加载状态
const loading = ref(true)

// 获取统计数据
async function fetchStats() {
  try {
    loading.value = true

    // TODO: 调用实际API
    const response = await fetch('/api/dashboard/stats')
    const data = await response.json()

    if (data.success) {
      stats.userCount = data.data.userCount
      stats.roleCount = data.data.roleCount
      stats.menuCount = data.data.menuCount
      stats.dictCount = data.data.dictCount
    }
  }
  catch (error) {
    logger.error('获取仪表盘统计数据失败', error)
    // 模拟数据
    stats.userCount = 12
    stats.roleCount = 3
    stats.menuCount = 25
    stats.dictCount = 8
  }
  finally {
    loading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="dashboard-container">
    <ui-card class="welcome-card">
      <template #header>
        <div class="welcome-header">
          <ui-icon icon="carbon:dashboard" size="large" color="primary" />
          <h2>欢迎使用GES管理系统</h2>
        </div>
      </template>
      <div class="welcome-content">
        <p>您可以在这里管理系统的所有功能和数据。使用左侧的菜单浏览不同的管理选项。</p>
      </div>
    </ui-card>

    <div class="stats-row">
      <ui-card class="stats-card" :loading="loading">
        <div class="stats-content">
          <div class="user-icon stats-icon">
            <ui-icon icon="carbon:user" size="large" />
          </div>
          <div class="stats-info">
            <div class="stats-value">
              {{ stats.userCount }}
            </div>
            <div class="stats-label">
              用户数量
            </div>
          </div>
        </div>
      </ui-card>

      <ui-card class="stats-card" :loading="loading">
        <div class="stats-content">
          <div class="stats-icon role-icon">
            <ui-icon icon="carbon:user-role" size="large" />
          </div>
          <div class="stats-info">
            <div class="stats-value">
              {{ stats.roleCount }}
            </div>
            <div class="stats-label">
              角色数量
            </div>
          </div>
        </div>
      </ui-card>

      <ui-card class="stats-card" :loading="loading">
        <div class="stats-content">
          <div class="stats-icon menu-icon">
            <ui-icon icon="carbon:list" size="large" />
          </div>
          <div class="stats-info">
            <div class="stats-value">
              {{ stats.menuCount }}
            </div>
            <div class="stats-label">
              菜单数量
            </div>
          </div>
        </div>
      </ui-card>

      <ui-card class="stats-card" :loading="loading">
        <div class="stats-content">
          <div class="stats-icon dict-icon">
            <ui-icon icon="carbon:book" size="large" />
          </div>
          <div class="stats-info">
            <div class="stats-value">
              {{ stats.dictCount }}
            </div>
            <div class="stats-label">
              字典数量
            </div>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="content-row">
      <ui-card class="recent-logins-card" :loading="loading">
        <template #header>
          <div class="card-header">
            <h3>最近登录记录</h3>
          </div>
        </template>
        <ui-table
          :data="recentLogins"
          :columns="[
            { title: 'ID', key: 'id', width: 80 },
            { title: '用户名', key: 'username' },
            { title: '登录时间', key: 'time' },
            { title: 'IP地址', key: 'ip' },
            { title: '位置', key: 'location' },
          ]"
          bordered
          stripe
        />
      </ui-card>

      <ui-card class="quick-links-card">
        <template #header>
          <div class="card-header">
            <h3>快捷操作</h3>
          </div>
        </template>
        <div class="quick-links">
          <ui-button type="primary" @click="$router.push('/admin/system/user')">
            <ui-icon icon="carbon:user-admin" />
            用户管理
          </ui-button>

          <ui-button type="primary" @click="$router.push('/admin/system/role')">
            <ui-icon icon="carbon:user-role" />
            角色管理
          </ui-button>

          <ui-button type="primary" @click="$router.push('/admin/system/menu')">
            <ui-icon icon="carbon:list-dropdown" />
            菜单管理
          </ui-button>

          <ui-button type="primary" @click="$router.push('/admin/system/dict')">
            <ui-icon icon="carbon:book" />
            字典管理
          </ui-button>
        </div>
      </ui-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
}

.welcome-card {
  margin-bottom: 24px;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
}

.welcome-content {
  font-size: 14px;
  color: #666;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.stats-card {
  height: 120px;
}

.stats-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.stats-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;

  &.user-icon {
    background-color: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }

  &.role-icon {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  &.menu-icon {
    background-color: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  &.dict-icon {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}

.stats-info {
  flex: 1;
}

.stats-value {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
}

.stats-label {
  font-size: 14px;
  color: #666;
}

.content-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.card-header {
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}
</style>
