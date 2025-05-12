<!--
 * 管理后台首页
 * 创建日期: 2024-06-19
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
<script setup lang="ts" name="AdminDashboard">
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('admin-dashboard')

// 页面元数据
definePageMeta({
  layout: 'admin',
  title: '仪表盘',
})

// 统计数据
const statistics = reactive({
  totalUsers: 0,
  totalRoles: 0,
  totalMenus: 0,
  totalDicts: 0,
})

// 加载中状态
const isLoading = ref(true)

// 图表数据
const chartData = ref({
  labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
  datasets: [
    {
      label: '用户增长',
      data: [65, 78, 90, 120, 144, 156, 179],
      backgroundColor: 'rgba(24, 144, 255, 0.6)',
    },
  ],
})

// 系统通知
const notifications = ref([
  {
    id: 1,
    title: '系统更新通知',
    content: '系统将于今晚22:00-23:00进行升级，请提前保存数据',
    time: '10分钟前',
    read: false,
  },
  {
    id: 2,
    title: '新增用户',
    content: '有3位新用户完成了注册',
    time: '1小时前',
    read: true,
  },
  {
    id: 3,
    title: '安全通知',
    content: '系统检测到异常登录行为，请及时修改密码',
    time: '1天前',
    read: true,
  },
])

// 快捷入口
const shortcuts = [
  {
    id: 1,
    title: '用户管理',
    icon: 'carbon:user',
    color: '#1890ff',
    path: '/admin/system/user',
  },
  {
    id: 2,
    title: '角色管理',
    icon: 'carbon:user-role',
    color: '#52c41a',
    path: '/admin/system/role',
  },
  {
    id: 3,
    title: '菜单管理',
    icon: 'carbon:list',
    color: '#faad14',
    path: '/admin/system/menu',
  },
  {
    id: 4,
    title: '字典管理',
    icon: 'carbon:book',
    color: '#722ed1',
    path: '/admin/system/dict',
  },
]

// 获取统计数据
async function fetchStatistics() {
  try {
    isLoading.value = true

    // TODO: 调用实际API获取数据
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟数据
    statistics.totalUsers = 256
    statistics.totalRoles = 8
    statistics.totalMenus = 42
    statistics.totalDicts = 18

    logger.info('获取统计数据成功')
  }
  catch (error) {
    logger.error('获取统计数据失败', error)
  }
  finally {
    isLoading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchStatistics()
})
</script>

<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="stat-cards">
      <ui-card class="stat-card" :loading="isLoading">
        <div class="stat-content">
          <div class="user-icon stat-icon">
            <ui-icon icon="carbon:user" />
          </div>
          <div class="stat-info">
            <div class="stat-number">
              {{ statistics.totalUsers }}
            </div>
            <div class="stat-title">
              用户数量
            </div>
          </div>
        </div>
        <div class="stat-footer">
          <NuxtLink to="/admin/system/user">
            查看详情
          </NuxtLink>
          <ui-icon icon="carbon:arrow-right" />
        </div>
      </ui-card>

      <ui-card class="stat-card" :loading="isLoading">
        <div class="stat-content">
          <div class="stat-icon role-icon">
            <ui-icon icon="carbon:user-role" />
          </div>
          <div class="stat-info">
            <div class="stat-number">
              {{ statistics.totalRoles }}
            </div>
            <div class="stat-title">
              角色数量
            </div>
          </div>
        </div>
        <div class="stat-footer">
          <NuxtLink to="/admin/system/role">
            查看详情
          </NuxtLink>
          <ui-icon icon="carbon:arrow-right" />
        </div>
      </ui-card>

      <ui-card class="stat-card" :loading="isLoading">
        <div class="stat-content">
          <div class="stat-icon menu-icon">
            <ui-icon icon="carbon:list" />
          </div>
          <div class="stat-info">
            <div class="stat-number">
              {{ statistics.totalMenus }}
            </div>
            <div class="stat-title">
              菜单数量
            </div>
          </div>
        </div>
        <div class="stat-footer">
          <NuxtLink to="/admin/system/menu">
            查看详情
          </NuxtLink>
          <ui-icon icon="carbon:arrow-right" />
        </div>
      </ui-card>

      <ui-card class="stat-card" :loading="isLoading">
        <div class="stat-content">
          <div class="stat-icon dict-icon">
            <ui-icon icon="carbon:book" />
          </div>
          <div class="stat-info">
            <div class="stat-number">
              {{ statistics.totalDicts }}
            </div>
            <div class="stat-title">
              字典数量
            </div>
          </div>
        </div>
        <div class="stat-footer">
          <NuxtLink to="/admin/system/dict">
            查看详情
          </NuxtLink>
          <ui-icon icon="carbon:arrow-right" />
        </div>
      </ui-card>
    </div>

    <!-- 快捷入口 -->
    <ui-card title="快捷入口" class="quick-access">
      <div class="shortcuts">
        <NuxtLink
          v-for="item in shortcuts"
          :key="item.id"
          :to="item.path"
          class="shortcut-item"
        >
          <div class="shortcut-icon" :style="{ backgroundColor: item.color }">
            <ui-icon :icon="item.icon" />
          </div>
          <div class="shortcut-title">
            {{ item.title }}
          </div>
        </NuxtLink>
      </div>
    </ui-card>

    <!-- 图表和通知的两列布局 -->
    <div class="dashboard-row">
      <!-- 图表区域 -->
      <ui-card title="用户增长趋势" class="chart-card">
        <ClientOnly>
          <!-- 图表将在客户端渲染 -->
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div
                v-for="(value, index) in chartData.datasets[0].data"
                :key="index"
                class="chart-bar"
                :style="{
                  height: `${value / 2}px`,
                  backgroundColor: chartData.datasets[0].backgroundColor,
                }"
              />
            </div>
            <div class="chart-labels">
              <div
                v-for="(label, index) in chartData.labels"
                :key="index"
                class="chart-label"
              >
                {{ label }}
              </div>
            </div>
          </div>
        </ClientOnly>
      </ui-card>

      <!-- 系统通知 -->
      <ui-card title="系统通知" class="notification-card">
        <div class="notifications">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="{ unread: !notification.read }"
          >
            <div class="notification-content">
              <div class="notification-title">
                {{ notification.title }}
              </div>
              <div class="notification-desc">
                {{ notification.content }}
              </div>
              <div class="notification-time">
                {{ notification.time }}
              </div>
            </div>
          </div>
        </div>
      </ui-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .stat-card {
    padding: 0;

    .stat-content {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 8px;
      margin-right: 16px;

      .ui-icon {
        font-size: 28px;
        color: white;
      }
    }

    .user-icon {
      background-color: #1890ff;
    }

    .role-icon {
      background-color: #52c41a;
    }

    .menu-icon {
      background-color: #faad14;
    }

    .dict-icon {
      background-color: #722ed1;
    }

    .stat-info {
      .stat-number {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .stat-title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .stat-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-top: 1px solid #f0f0f0;
      background-color: #fafafa;

      a {
        color: #1890ff;
        text-decoration: none;

        &:hover {
          color: #40a9ff;
        }
      }
    }
  }
}

.quick-access {
  .shortcuts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;

    .shortcut-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;

      .shortcut-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 12px;

        .ui-icon {
          font-size: 24px;
          color: white;
        }
      }

      .shortcut-title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }

      &:hover .shortcut-title {
        color: #1890ff;
      }
    }
  }
}

.dashboard-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
}

.chart-card {
  height: 400px;

  .chart-placeholder {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px 0;

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 250px;

      .chart-bar {
        width: 40px;
        border-radius: 4px 4px 0 0;
        transition: height 0.5s;
      }
    }

    .chart-labels {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;

      .chart-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        text-align: center;
        width: 40px;
      }
    }
  }
}

.notification-card {
  height: 400px;

  .notifications {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .notification-item {
      padding: 12px;
      border-radius: 4px;
      background-color: #f9f9f9;

      &.unread {
        background-color: #e6f7ff;
        border-left: 3px solid #1890ff;
      }

      .notification-title {
        font-weight: 500;
        margin-bottom: 6px;
      }

      .notification-desc {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 8px;
      }

      .notification-time {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
