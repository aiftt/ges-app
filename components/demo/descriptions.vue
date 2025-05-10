<script setup lang="ts" name="DemoDescriptions">
/**
 * 描述列表组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
 */

// 基础信息示例数据
const userInfo = {
  name: '张三',
  age: 28,
  gender: '男',
  email: 'zhangsan@example.com',
  phone: '138****1234',
  address: '北京市朝阳区某街道88号',
  department: '技术部',
  position: '前端开发工程师',
}

// 详细产品信息示例
const productInfo = {
  name: '智能手机 Pro Max',
  brand: '某品牌',
  price: '¥6,999',
  storage: '256GB',
  color: '深空灰',
  screen: '6.7英寸 OLED',
  camera: '主摄: 4800万像素, 超广角: 1200万像素',
  battery: '4500mAh',
  system: 'Android 13',
  warranty: '1年保修',
  releaseDate: '2023-09-01',
  origin: '中国',
}

// 响应式布局示例
const _responsiveColumnSetting = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
}
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      描述列表 (Descriptions)
    </h1>

    <div class="space-y-10">
      <!-- 基础示例 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础用法
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions title="用户信息">
            <ui-descriptions-item label="姓名">
              {{ userInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="年龄">
              {{ userInfo.age }}
            </ui-descriptions-item>
            <ui-descriptions-item label="性别">
              {{ userInfo.gender }}
            </ui-descriptions-item>
            <ui-descriptions-item label="邮箱">
              {{ userInfo.email }}
            </ui-descriptions-item>
            <ui-descriptions-item label="电话">
              {{ userInfo.phone }}
            </ui-descriptions-item>
            <ui-descriptions-item label="地址">
              {{ userInfo.address }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions title="用户信息">
  <ui-descriptions-item label="姓名">张三</ui-descriptions-item>
  <ui-descriptions-item label="年龄">28</ui-descriptions-item>
  <ui-descriptions-item label="性别">男</ui-descriptions-item>
  <ui-descriptions-item label="邮箱">zhangsan@example.com</ui-descriptions-item>
  <ui-descriptions-item label="电话">138****1234</ui-descriptions-item>
  <ui-descriptions-item label="地址">北京市朝阳区某街道88号</ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 带边框的描述列表 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          带边框
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions title="产品信息" bordered>
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="存储容量">
              {{ productInfo.storage }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
            <ui-descriptions-item label="屏幕">
              {{ productInfo.screen }}
            </ui-descriptions-item>
            <ui-descriptions-item label="摄像头">
              {{ productInfo.camera }}
            </ui-descriptions-item>
            <ui-descriptions-item label="电池容量">
              {{ productInfo.battery }}
            </ui-descriptions-item>
            <ui-descriptions-item label="操作系统">
              {{ productInfo.system }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions title="产品信息" bordered>
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="存储容量">256GB</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="屏幕">6.7英寸 OLED</ui-descriptions-item>
  <ui-descriptions-item label="摄像头">主摄: 4800万像素, 超广角: 1200万像素</ui-descriptions-item>
  <ui-descriptions-item label="电池容量">4500mAh</ui-descriptions-item>
  <ui-descriptions-item label="操作系统">Android 13</ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          不同尺寸
        </h2>
        <div class="rounded-lg bg-white p-4 shadow space-y-6 dark:bg-gray-800">
          <ui-descriptions title="小尺寸" bordered size="small">
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
          </ui-descriptions>

          <ui-descriptions title="默认尺寸" bordered>
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
          </ui-descriptions>

          <ui-descriptions title="大尺寸" bordered size="large">
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<!-- 小尺寸 -->
<ui-descriptions title="小尺寸" bordered size="small">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <!-- ... 其他项 -->
</ui-descriptions>

<!-- 默认尺寸 -->
<ui-descriptions title="默认尺寸" bordered>
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <!-- ... 其他项 -->
</ui-descriptions>

<!-- 大尺寸 -->
<ui-descriptions title="大尺寸" bordered size="large">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <!-- ... 其他项 -->
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 垂直布局 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          垂直布局
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions title="垂直布局示例" bordered layout="vertical" :column="4">
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="存储容量">
              {{ productInfo.storage }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
            <ui-descriptions-item label="屏幕">
              {{ productInfo.screen }}
            </ui-descriptions-item>
            <ui-descriptions-item label="摄像头">
              {{ productInfo.camera }}
            </ui-descriptions-item>
            <ui-descriptions-item label="电池容量">
              {{ productInfo.battery }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions title="垂直布局示例" bordered layout="vertical" :column="4">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="存储容量">256GB</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="屏幕">6.7英寸 OLED</ui-descriptions-item>
  <ui-descriptions-item label="摄像头">主摄: 4800万像素, 超广角: 1200万像素</ui-descriptions-item>
  <ui-descriptions-item label="电池容量">4500mAh</ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 自定义样式 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义样式
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions
            title="自定义样式"
            bordered
            :label-style="{ 'font-weight': 'bold', 'color': '#2563eb' }"
            :content-style="{ color: '#10b981' }"
            label-align="right"
            content-align="center"
          >
            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
            <ui-descriptions-item label="保修期">
              {{ productInfo.warranty }}
            </ui-descriptions-item>
            <ui-descriptions-item label="发布日期">
              {{ productInfo.releaseDate }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions
  title="自定义样式"
  bordered
  :label-style="{ 'font-weight': 'bold', 'color': '#2563eb' }"
  :content-style="{ 'color': '#10b981' }"
  label-align="right"
  content-align="center"
>
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="保修期">1年保修</ui-descriptions-item>
  <ui-descriptions-item label="发布日期">2023-09-01</ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 自定义标题和额外内容 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义标题和额外内容
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions bordered>
            <template #title>
              <div class="flex items-center">
                <ui-icon icon="carbon:information" class="mr-2 text-blue-500" />
                <span class="font-bold">产品详情</span>
              </div>
            </template>

            <template #extra>
              <ui-button type="primary" size="small">
                编辑
              </ui-button>
            </template>

            <ui-descriptions-item label="名称">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="存储容量">
              {{ productInfo.storage }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
            <ui-descriptions-item label="屏幕">
              {{ productInfo.screen }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions bordered>
  <template #title>
    <div class="flex items-center">
      <ui-icon icon="carbon:information" class="mr-2 text-blue-500" />
      <span class="font-bold">产品详情</span>
    </div>
  </template>

  <template #extra>
    <ui-button type="primary" size="small">编辑</ui-button>
  </template>

  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="存储容量">256GB</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="屏幕">6.7英寸 OLED</ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- 使用span属性控制列宽 -->
      <section class="mt-10">
        <h2 class="mb-4 text-xl font-semibold">
          使用span属性控制列宽
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-descriptions title="跨列示例" bordered :column="3">
            <ui-descriptions-item label="名称" :span="3">
              {{ productInfo.name }}
            </ui-descriptions-item>
            <ui-descriptions-item label="品牌">
              {{ productInfo.brand }}
            </ui-descriptions-item>
            <ui-descriptions-item label="价格" :span="2">
              {{ productInfo.price }}
            </ui-descriptions-item>
            <ui-descriptions-item label="颜色">
              {{ productInfo.color }}
            </ui-descriptions-item>
            <ui-descriptions-item label="屏幕" :span="2">
              {{ productInfo.screen }}
            </ui-descriptions-item>
            <ui-descriptions-item label="摄像头" :span="3">
              {{ productInfo.camera }}
            </ui-descriptions-item>
          </ui-descriptions>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-descriptions title="跨列示例" bordered :column="3">
  <ui-descriptions-item label="名称" :span="3">
    智能手机 Pro Max
  </ui-descriptions-item>
  <ui-descriptions-item label="品牌">
    某品牌
  </ui-descriptions-item>
  <ui-descriptions-item label="价格" :span="2">
    ¥6,999
  </ui-descriptions-item>
  <ui-descriptions-item label="颜色">
    深空灰
  </ui-descriptions-item>
  <ui-descriptions-item label="屏幕" :span="2">
    6.7英寸 OLED
  </ui-descriptions-item>
  <ui-descriptions-item label="摄像头" :span="3">
    主摄: 4800万像素, 超广角: 1200万像素
  </ui-descriptions-item>
</ui-descriptions>` }}</code></pre>
        </div>
      </section>

      <!-- API文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          Descriptions Props
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
                -
              </td>
              <td class="border-b px-4 py-2">
                描述列表的标题
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                bordered
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示边框
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                column
              </td>
              <td class="border-b px-4 py-2">
                number | object
              </td>
              <td class="border-b px-4 py-2">
                3
              </td>
              <td class="border-b px-4 py-2">
                一行显示的条目数量
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                layout
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                'horizontal'
              </td>
              <td class="border-b px-4 py-2">
                布局方式，可选值：'horizontal'、'vertical'
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                size
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                'default'
              </td>
              <td class="border-b px-4 py-2">
                尺寸大小，可选值：'small'、'default'、'large'
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                colon
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                true
              </td>
              <td class="border-b px-4 py-2">
                是否显示冒号
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                labelStyle
              </td>
              <td class="border-b px-4 py-2">
                object
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                自定义标签样式
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                contentStyle
              </td>
              <td class="border-b px-4 py-2">
                object
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                自定义内容样式
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                labelAlign
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                'left'
              </td>
              <td class="border-b px-4 py-2">
                标签对齐方式，可选值：'left'、'right'、'center'
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                contentAlign
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                'left'
              </td>
              <td class="border-b px-4 py-2">
                内容对齐方式，可选值：'left'、'right'、'center'
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          DescriptionsItem Props
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
                label
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                标签文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                span
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                1
              </td>
              <td class="border-b px-4 py-2">
                列的数量
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                labelStyle
              </td>
              <td class="border-b px-4 py-2">
                object
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                自定义标签样式
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                contentStyle
              </td>
              <td class="border-b px-4 py-2">
                object
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                自定义内容样式
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          Descriptions Slots
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                名称
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                default
              </td>
              <td class="border-b px-4 py-2">
                描述列表项内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                title
              </td>
              <td class="border-b px-4 py-2">
                自定义标题
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                extra
              </td>
              <td class="border-b px-4 py-2">
                自定义操作区域
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 32px;
}

.demo-card {
  padding: 24px;
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 8px;
  background-color: white;
}

:root.dark .demo-card {
  background-color: var(--ui-color-bg-dark, #1f2937);
  border-color: var(--ui-border-color-dark, #374151);
}
</style>
