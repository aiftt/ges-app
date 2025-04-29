<script setup lang="ts" name="DashboardPage">
/**
 * 数据统计页面
 * 创建日期: 2024-11-30
 * 作者: aiftt
 */

// 时间段选项
const timeRanges = [
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '全年', value: 'year' },
]

// 当前选择的时间范围
const currentTimeRange = ref('week')

// 统计数据
const statistics = [
  {
    title: '访问量',
    value: 12468,
    unit: '次',
    trend: 'up',
    percentage: 12.5,
    icon: 'carbon:user-online',
    color: 'blue',
  },
  {
    title: '用户数',
    value: 3254,
    unit: '人',
    trend: 'up',
    percentage: 8.2,
    icon: 'carbon:user-profile',
    color: 'green',
  },
  {
    title: '订单量',
    value: 846,
    unit: '笔',
    trend: 'down',
    percentage: 3.1,
    icon: 'carbon:document',
    color: 'orange',
  },
  {
    title: '收入',
    value: 48672,
    unit: '元',
    trend: 'up',
    percentage: 15.8,
    icon: 'carbon:currency',
    color: 'violet',
  },
]

// 趋势颜色类
const trendColorClass = {
  up: 'text-green-500',
  down: 'text-red-500',
}

// 趋势图标
const trendIcon = {
  up: 'carbon:arrow-up',
  down: 'carbon:arrow-down',
}

// 格式化数字
function formatNumber(num: number) {
  return new Intl.NumberFormat('zh-CN').format(num)
}

// 生成随机图表数据
function generateChartData() {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 70) + 10)
}

// 各图表数据
const visitChartData = generateChartData()
const userChartData = generateChartData()
const orderChartData = generateChartData()
const revenueChartData = generateChartData()

// 获取柱状图高度样式
function getBarHeight(value: number) {
  return `height: ${value}%;`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 顶部导航栏 -->
    <header class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto flex items-center justify-between px-4 py-4 container">
        <div class="flex items-center gap-2">
          <ui-icon icon="carbon:chart-line" size="large" class="text-primary" />
          <h1 class="text-xl text-gray-900 font-bold dark:text-white">
            数据仪表盘
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-gray-600 transition-colors dark:text-gray-400 hover:text-primary">
            <ui-icon icon="carbon:home" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="mx-auto px-4 py-12 container">
      <!-- 标题和筛选区域 -->
      <section class="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="mb-2 text-3xl text-gray-900 font-bold dark:text-white">
            数据仪表盘
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            实时数据统计与可视化
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <div class="inline-flex border border-gray-200 rounded-lg bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <button
              v-for="range in timeRanges"
              :key="range.value"
              class="rounded-md px-4 py-2 text-sm font-medium transition-colors" :class="[
                currentTimeRange === range.value
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
              ]"
              @click="currentTimeRange = range.value"
            >
              {{ range.label }}
            </button>
          </div>
        </div>
      </section>

      <!-- 数据卡片区域 -->
      <section class="grid grid-cols-1 mb-12 gap-6 lg:grid-cols-4 md:grid-cols-2">
        <div
          v-for="(stat, index) in statistics"
          :key="stat.title"
          class="overflow-hidden border border-gray-100 rounded-xl bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="p-6">
            <div class="mb-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <ui-icon :icon="stat.icon" class="text-gray-500 dark:text-gray-400" />
                <span class="text-gray-500 dark:text-gray-400">{{ stat.title }}</span>
              </div>
              <div class="flex items-center gap-1" :class="[trendColorClass[stat.trend]]">
                <ui-icon :icon="trendIcon[stat.trend]" size="small" />
                <span class="text-sm font-medium">{{ stat.percentage }}%</span>
              </div>
            </div>
            <div class="flex items-end">
              <span class="text-3xl text-gray-900 font-bold dark:text-white">{{ formatNumber(stat.value) }}</span>
              <span class="mb-1 ml-1 text-gray-500 dark:text-gray-400">{{ stat.unit }}</span>
            </div>
          </div>

          <!-- 简易图表 -->
          <div class="h-20 p-3">
            <div v-if="index === 0" class="h-full flex items-end justify-between">
              <div
                v-for="(value, i) in visitChartData"
                :key="i"
                class="w-3 rounded-t from-blue-500 to-blue-300 bg-gradient-to-t"
                :style="getBarHeight(value)"
              />
            </div>
            <div v-else-if="index === 1" class="h-full flex items-end justify-between">
              <div
                v-for="(value, i) in userChartData"
                :key="i"
                class="w-3 rounded-t from-emerald-500 to-emerald-300 bg-gradient-to-t"
                :style="getBarHeight(value)"
              />
            </div>
            <div v-else-if="index === 2" class="h-full flex items-end justify-between">
              <div
                v-for="(value, i) in orderChartData"
                :key="i"
                class="w-3 rounded-t from-orange-500 to-orange-300 bg-gradient-to-t"
                :style="getBarHeight(value)"
              />
            </div>
            <div v-else class="h-full flex items-end justify-between">
              <div
                v-for="(value, i) in revenueChartData"
                :key="i"
                class="w-3 rounded-t from-violet-500 to-violet-300 bg-gradient-to-t"
                :style="getBarHeight(value)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 图表区域 -->
      <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 折线图 -->
        <div class="border border-gray-100 rounded-xl bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-6 text-xl text-gray-900 font-bold dark:text-white">
            访问趋势
          </h3>
          <div class="h-60 flex items-center justify-center">
            <div class="text-center text-gray-400 dark:text-gray-500">
              <ui-icon icon="carbon:chart-line" size="large" class="mb-2" />
              <p>图表组件待实现</p>
            </div>
          </div>
        </div>

        <!-- 饼图 -->
        <div class="border border-gray-100 rounded-xl bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-6 text-xl text-gray-900 font-bold dark:text-white">
            用户分布
          </h3>
          <div class="h-60 flex items-center justify-center">
            <div class="text-center text-gray-400 dark:text-gray-500">
              <ui-icon icon="carbon:chart-pie" size="large" class="mb-2" />
              <p>图表组件待实现</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据表格区域 -->
      <section class="mt-12 border border-gray-100 rounded-xl bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl text-gray-900 font-bold dark:text-white">
            最近订单
          </h3>
          <button class="hover:text-primary-dark flex items-center gap-1 text-primary transition-colors">
            <span>查看全部</span>
            <ui-icon icon="carbon:arrow-right" size="small" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th class="px-4 py-3 text-gray-600 font-medium dark:text-gray-400">
                  订单编号
                </th>
                <th class="px-4 py-3 text-gray-600 font-medium dark:text-gray-400">
                  客户
                </th>
                <th class="px-4 py-3 text-gray-600 font-medium dark:text-gray-400">
                  金额
                </th>
                <th class="px-4 py-3 text-gray-600 font-medium dark:text-gray-400">
                  状态
                </th>
                <th class="px-4 py-3 text-gray-600 font-medium dark:text-gray-400">
                  日期
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  #ORDER-12345
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  张三
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  ¥2,345.00
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800 font-medium dark:bg-green-900/30 dark:text-green-400">
                    已完成
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
                  2024-11-30
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  #ORDER-12344
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  李四
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  ¥1,267.00
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800 font-medium dark:bg-blue-900/30 dark:text-blue-400">
                    处理中
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
                  2024-11-29
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  #ORDER-12343
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  王五
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  ¥3,490.00
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs text-yellow-800 font-medium dark:bg-yellow-900/30 dark:text-yellow-400">
                    待付款
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
                  2024-11-28
                </td>
              </tr>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  #ORDER-12342
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  赵六
                </td>
                <td class="px-4 py-3 text-gray-900 dark:text-white">
                  ¥899.00
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-800 font-medium dark:bg-red-900/30 dark:text-red-400">
                    已取消
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
                  2024-11-27
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
      <div class="mx-auto px-4 text-center text-gray-600 container dark:text-gray-400">
        <p>数据仪表盘 &copy; {{ new Date().getFullYear() }}. 版权所有</p>
      </div>
    </footer>
  </div>
</template>
