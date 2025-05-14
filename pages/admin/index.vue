<!--
 * 管理后台首页
 * 创建日期: 2024-10-10
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 -->
<script setup lang="ts" name="AdminIndex">
// 定义页面元数据
definePageMeta({
  layout: 'admin',
  title: '管理控制台',
})

// 显示的卡片数据
const cardData = [
  {
    title: '用户总数',
    value: '1,286',
    icon: 'carbon:user-multiple',
    color: 'blue',
  },
  {
    title: '访问量',
    value: '8,648',
    icon: 'carbon:chart-line',
    color: 'green',
  },
  {
    title: '系统消息',
    value: '12',
    icon: 'carbon:notification',
    color: 'amber',
  },
  {
    title: '待办任务',
    value: '35',
    icon: 'carbon:task',
    color: 'red',
  },
]

// 最近活动
const recentActivities = [
  {
    id: 1,
    user: '管理员',
    action: '创建了新用户',
    time: '10分钟前',
    avatar: '',
  },
  {
    id: 2,
    user: '张三',
    action: '提交了审批单',
    time: '1小时前',
    avatar: '',
  },
  {
    id: 3,
    user: '李四',
    action: '修改了系统配置',
    time: '2小时前',
    avatar: '',
  },
  {
    id: 4,
    user: '王五',
    action: '上传了文件',
    time: '昨天',
    avatar: '',
  },
]
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎信息 -->
    <div class="welcome-section mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h1 class="mb-2 text-2xl text-gray-800 font-bold dark:text-white">
        欢迎使用管理控制台
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        您可以在这里管理系统的所有功能和数据
      </p>
    </div>

    <!-- 统计卡片行 -->
    <div class="grid grid-cols-1 mb-6 gap-6 lg:grid-cols-4 sm:grid-cols-2">
      <div
        v-for="(card, index) in cardData"
        :key="index"
        class="stat-card rounded-lg bg-white p-6 shadow transition-transform hover:scale-105 hover:transform dark:bg-gray-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="mb-1 text-sm text-gray-500 font-medium dark:text-gray-400">
              {{ card.title }}
            </h3>
            <p class="text-2xl font-bold" :class="`text-${card.color}-600 dark:text-${card.color}-400`">
              {{ card.value }}
            </p>
          </div>
          <div :class="`bg-${card.color}-100 dark:bg-${card.color}-900/30 p-3 rounded-full`">
            <ui-icon :icon="card.icon" :class="`text-${card.color}-500 text-xl`" />
          </div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- 图表区域 -->
      <div class="chart-section col-span-2 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h2 class="mb-4 text-lg text-gray-800 font-bold dark:text-white">
          数据统计
        </h2>
        <div class="chart-placeholder h-64 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
          <p class="text-gray-500 dark:text-gray-400">
            图表数据加载中...
          </p>
        </div>
      </div>

      <!-- 活动日志 -->
      <div class="activity-section rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h2 class="mb-4 text-lg text-gray-800 font-bold dark:text-white">
          最近活动
        </h2>
        <ul class="space-y-4">
          <li v-for="activity in recentActivities" :key="activity.id" class="flex items-start border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700 last:pb-0">
            <div class="avatar mr-3 h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <span v-if="!activity.avatar" class="text-blue-500 font-medium">{{ activity.user.charAt(0) }}</span>
              <img v-else :src="activity.avatar" class="rounded-full">
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white">
                <span class="font-medium">{{ activity.user }}</span>
                <span class="text-gray-600 dark:text-gray-300"> {{ activity.action }}</span>
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ activity.time }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
