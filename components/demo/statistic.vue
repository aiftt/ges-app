<script setup lang="ts" name="DemoStatistic">
/**
 * 数值显示组件示例页面
 * 创建日期: 2024-07-31
 * 作者: aiftt
 */

import { onMounted, ref } from 'vue'

// 基础示例数据
const basicValue = ref(12345)

// 带千分位和小数示例
const formattedValue = ref(1234567.89)

// 带前缀后缀示例
const priceValue = ref(568.08)
const percentValue = ref(78.5)

// 不同对齐方式
const alignValue = ref(1234)

// 带趋势示例
const upValue = ref(12.34)
const downValue = ref(56.78)

// 动态更新示例
const dynamicValue = ref(1000)
const isLoading = ref(false)

// 随机更新数据
function randomUpdate() {
  isLoading.value = true

  // 模拟数据加载
  setTimeout(() => {
    dynamicValue.value = Math.floor(Math.random() * 9000) + 1000
    isLoading.value = false
  }, 1000)
}

// 自定义样式示例
const customValue = ref(8546)
const valueStyle = {
  color: '#3b82f6',
  fontWeight: 'bold',
}

// 不同尺寸
const sizes = ['small', 'default', 'large']

// 倒计时示例
const countdown = ref(86400) // 24小时（秒）

// 格式化倒计时
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: secs.toString().padStart(2, '0'),
  }
}

// 倒计时计时器
onMounted(() => {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    }
    else {
      clearInterval(timer)
    }
  }, 1000)
})
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      数值显示 (Statistic)
    </h1>

    <div class="space-y-12">
      <!-- 基础用法 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础用法
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <ui-statistic
            title="活跃用户"
            :value="basicValue"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="活跃用户"
  :value="12345"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 数值格式化 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          数值格式化
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ui-statistic
              title="带千分位分隔符"
              :value="formattedValue"
              :precision="2"
            />

            <ui-statistic
              title="自定义分隔符"
              :value="formattedValue"
              :precision="2"
              decimal-separator="，"
              group-separator=" "
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="带千分位分隔符"
  :value="1234567.89"
  :precision="2"
/>

<ui-statistic
  title="自定义分隔符"
  :value="1234567.89"
  :precision="2"
  decimal-separator="，"
  group-separator=" "
/>` }}</code></pre>
        </div>
      </section>

      <!-- 前缀和后缀 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          前缀和后缀
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ui-statistic
              title="账户余额"
              :value="priceValue"
              :precision="2"
              prefix="￥"
            />

            <ui-statistic
              title="完成率"
              :value="percentValue"
              :precision="1"
              suffix="%"
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="账户余额"
  :value="568.08"
  :precision="2"
  prefix="￥"
/>

<ui-statistic
  title="完成率"
  :value="78.5"
  :precision="1"
  suffix="%"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 对齐方式 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          对齐方式
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ui-statistic
              title="左对齐 (默认)"
              :value="alignValue"
              align="left"
            />

            <ui-statistic
              title="居中对齐"
              :value="alignValue"
              align="center"
            />

            <ui-statistic
              title="右对齐"
              :value="alignValue"
              align="right"
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="左对齐 (默认)"
  :value="1234"
  align="left"
/>

<ui-statistic
  title="居中对齐"
  :value="1234"
  align="center"
/>

<ui-statistic
  title="右对齐"
  :value="1234"
  align="right"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 带趋势标记 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          趋势标记
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ui-statistic
              title="增长率"
              :value="upValue"
              :precision="2"
              suffix="%"
              show-trend
              trend="up"
            />

            <ui-statistic
              title="下降率"
              :value="downValue"
              :precision="2"
              suffix="%"
              show-trend
              trend="down"
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="增长率"
  :value="12.34"
  :precision="2"
  suffix="%"
  show-trend
  trend="up"
/>

<ui-statistic
  title="下降率"
  :value="56.78"
  :precision="2"
  suffix="%"
  show-trend
  trend="down"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 动态更新 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          动态更新和加载状态
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <ui-statistic
            title="动态数据"
            :value="dynamicValue"
            :loading="isLoading"
          />

          <div class="mt-4">
            <button
              class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              @click="randomUpdate"
            >
              随机更新
            </button>
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="动态数据"
  :value="dynamicValue"
  :loading="isLoading"
/>

<button @click="randomUpdate">随机更新</button>

// 随机更新数据
function randomUpdate() {
  isLoading.value = true

  // 模拟数据加载
  setTimeout(() => {
    dynamicValue.value = Math.floor(Math.random() * 9000) + 1000
    isLoading.value = false
  }, 1000)
}` }}</code></pre>
        </div>
      </section>

      <!-- 自定义样式 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义样式
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <ui-statistic
            title="自定义样式"
            :value="customValue"
            :value-style="valueStyle"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  title="自定义样式"
  :value="8546"
  :value-style="{
    color: '#3b82f6',
    fontWeight: 'bold'
  }"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          不同尺寸
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="space-y-6">
            <div v-for="size in sizes" :key="size" class="flex items-center">
              <div class="w-24 text-sm">
                {{ size }}:
              </div>
              <ui-statistic
                :value="12345"
                :size="size"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-statistic
  :value="12345"
  size="small"
/>

<ui-statistic
  :value="12345"
  size="default"
/>

<ui-statistic
  :value="12345"
  size="large"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 倒计时示例 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          倒计时示例
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
            <ui-statistic
              title="小时"
              :value="formatTime(countdown).hours"
              size="large"
            />

            <ui-statistic
              title="分钟"
              :value="formatTime(countdown).minutes"
              size="large"
            />

            <ui-statistic
              title="秒数"
              :value="formatTime(countdown).seconds"
              size="large"
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<div class="grid grid-cols-3 gap-4 text-center">
  <ui-statistic
    title="小时"
    :value="formatTime(countdown).hours"
    size="large"
  />

  <ui-statistic
    title="分钟"
    :value="formatTime(countdown).minutes"
    size="large"
  />

  <ui-statistic
    title="秒数"
    :value="formatTime(countdown).seconds"
    size="large"
  />
</div>

// 格式化倒计时
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: secs.toString().padStart(2, '0')
  }
}` }}</code></pre>
        </div>
      </section>

      <!-- 卡片布局 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          卡片布局
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div class="rounded-lg bg-blue-50 p-6 shadow-sm dark:bg-blue-900/20">
              <ui-statistic
                title="新用户"
                :value="1528"
                prefix="+"
              />
            </div>

            <div class="rounded-lg bg-green-50 p-6 shadow-sm dark:bg-green-900/20">
              <ui-statistic
                title="转化率"
                :value="15.6"
                suffix="%"
                show-trend
                trend="up"
              />
            </div>

            <div class="rounded-lg bg-yellow-50 p-6 shadow-sm dark:bg-yellow-900/20">
              <ui-statistic
                title="总销售额"
                :value="8846523"
                prefix="￥"
                :precision="2"
              />
            </div>

            <div class="rounded-lg bg-red-50 p-6 shadow-sm dark:bg-red-900/20">
              <ui-statistic
                title="退款率"
                :value="2.8"
                suffix="%"
                show-trend
                trend="down"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<div class="grid grid-cols-4 gap-4">
  <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-6 shadow-sm">
    <ui-statistic
      title="新用户"
      :value="1528"
      prefix="+"
    />
  </div>

  <div class="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 shadow-sm">
    <ui-statistic
      title="转化率"
      :value="15.6"
      suffix="%"
      show-trend
      trend="up"
    />
  </div>

  <!-- ...更多卡片 -->
</div>` }}</code></pre>
        </div>
      </section>

      <!-- API文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                title
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ''
              </td>
              <td class="border-b px-4 py-2">
                数值标题
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                value
              </td>
              <td class="border-b px-4 py-2">
                string | number
              </td>
              <td class="border-b px-4 py-2">
                0
              </td>
              <td class="border-b px-4 py-2">
                数值内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                precision
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                数值精度(小数位数)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                decimalSeparator
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                .
              </td>
              <td class="border-b px-4 py-2">
                小数点分隔符
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                groupSeparator
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ,
              </td>
              <td class="border-b px-4 py-2">
                千分位分隔符
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                prefix
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ''
              </td>
              <td class="border-b px-4 py-2">
                前缀
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                suffix
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ''
              </td>
              <td class="border-b px-4 py-2">
                后缀
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                valueStyle
              </td>
              <td class="border-b px-4 py-2">
                string | object
              </td>
              <td class="border-b px-4 py-2">
                {}
              </td>
              <td class="border-b px-4 py-2">
                数值样式
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                loading
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否加载中
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                showTrend
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示趋势图标
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                trend
              </td>
              <td class="border-b px-4 py-2">
                'up' | 'down' | 'none' | null
              </td>
              <td class="border-b px-4 py-2">
                null
              </td>
              <td class="border-b px-4 py-2">
                趋势方向
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                trendColor
              </td>
              <td class="border-b px-4 py-2">
                'inherit' | 'success' | 'danger' | string
              </td>
              <td class="border-b px-4 py-2">
                'inherit'
              </td>
              <td class="border-b px-4 py-2">
                趋势图标颜色
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                useGrouping
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                true
              </td>
              <td class="border-b px-4 py-2">
                是否使用千分位格式化
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                size
              </td>
              <td class="border-b px-4 py-2">
                'small' | 'default' | 'large'
              </td>
              <td class="border-b px-4 py-2">
                'default'
              </td>
              <td class="border-b px-4 py-2">
                尺寸
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                align
              </td>
              <td class="border-b px-4 py-2">
                'left' | 'center' | 'right'
              </td>
              <td class="border-b px-4 py-2">
                'left'
              </td>
              <td class="border-b px-4 py-2">
                对齐方式
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
