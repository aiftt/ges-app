<script setup lang="ts" name="DemoDescriptions">
/**
 * 描述列表组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
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

// 示例代码字符串
const basicCode = `<ui-descriptions title="用户信息">
  <ui-descriptions-item label="姓名">张三</ui-descriptions-item>
  <ui-descriptions-item label="年龄">28</ui-descriptions-item>
  <ui-descriptions-item label="性别">男</ui-descriptions-item>
  <ui-descriptions-item label="邮箱">zhangsan@example.com</ui-descriptions-item>
  <ui-descriptions-item label="电话">138****1234</ui-descriptions-item>
  <ui-descriptions-item label="地址">北京市朝阳区某街道88号</ui-descriptions-item>
</ui-descriptions>`

const borderedCode = `<ui-descriptions title="产品信息" bordered>
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="存储容量">256GB</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="屏幕">6.7英寸 OLED</ui-descriptions-item>
  <ui-descriptions-item label="摄像头">主摄: 4800万像素, 超广角: 1200万像素</ui-descriptions-item>
  <ui-descriptions-item label="电池容量">4500mAh</ui-descriptions-item>
  <ui-descriptions-item label="操作系统">Android 13</ui-descriptions-item>
</ui-descriptions>`

const sizeCode = `<!-- 小尺寸 -->
<ui-descriptions title="小尺寸" bordered size="small">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
</ui-descriptions>

<!-- 默认尺寸 -->
<ui-descriptions title="默认尺寸" bordered>
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
</ui-descriptions>

<!-- 大尺寸 -->
<ui-descriptions title="大尺寸" bordered size="large">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
</ui-descriptions>`

const verticalCode = `<ui-descriptions title="垂直布局示例" bordered layout="vertical" :column="4">
  <ui-descriptions-item label="名称">智能手机 Pro Max</ui-descriptions-item>
  <ui-descriptions-item label="品牌">某品牌</ui-descriptions-item>
  <ui-descriptions-item label="价格">¥6,999</ui-descriptions-item>
  <ui-descriptions-item label="存储容量">256GB</ui-descriptions-item>
  <ui-descriptions-item label="颜色">深空灰</ui-descriptions-item>
  <ui-descriptions-item label="屏幕">6.7英寸 OLED</ui-descriptions-item>
  <ui-descriptions-item label="摄像头">主摄: 4800万像素, 超广角: 1200万像素</ui-descriptions-item>
  <ui-descriptions-item label="电池容量">4500mAh</ui-descriptions-item>
</ui-descriptions>`

const customStyleCode = `<ui-descriptions
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
</ui-descriptions>`

const customTitleCode = `<ui-descriptions bordered>
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
</ui-descriptions>`

const spanCode = `<ui-descriptions title="跨列示例" bordered :column="3">
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
</ui-descriptions>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Descriptions 描述列表
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      描述列表用于展示多个只读字段，通常用于详情页面展示数据。
    </p>

    <!-- 基础示例 -->
    <ui-demo
      title="基础用法"
      description="基础的描述列表，用于展示简单的用户信息。"
      :code="basicCode"
    >
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
    </ui-demo>

    <!-- 带边框的描述列表 -->
    <ui-demo
      title="带边框"
      description="添加bordered属性可以显示边框，使数据更加清晰。"
      :code="borderedCode"
    >
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
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="描述列表有三种尺寸：小、中（默认）、大，可以根据需要进行选择。"
      :code="sizeCode"
    >
      <div class="space-y-6">
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
    </ui-demo>

    <!-- 垂直布局 -->
    <ui-demo
      title="垂直布局"
      description="设置layout属性为vertical可以使标签和内容垂直排列。"
      :code="verticalCode"
    >
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
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义标签和内容的样式以及对齐方式。"
      :code="customStyleCode"
    >
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
    </ui-demo>

    <!-- 自定义标题和额外内容 -->
    <ui-demo
      title="自定义标题和额外内容"
      description="可以通过插槽自定义标题和右上角的额外操作区域。"
      :code="customTitleCode"
    >
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
    </ui-demo>

    <!-- 使用span属性控制列宽 -->
    <ui-demo
      title="使用span属性控制列宽"
      description="使用span属性可以控制条目的列宽，特别适合展示较长内容。"
      :code="spanCode"
    >
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
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Descriptions 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            描述列表的标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            bordered
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示边框
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            column
          </td>
          <td class="px-4 py-2">
            number | object
          </td>
          <td class="px-4 py-2">
            3
          </td>
          <td class="px-4 py-2">
            一行显示的条目数量
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            layout
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'horizontal'
          </td>
          <td class="px-4 py-2">
            布局方式，可选值：'horizontal'、'vertical'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            size
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'default'
          </td>
          <td class="px-4 py-2">
            尺寸大小，可选值：'small'、'default'、'large'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            colon
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            true
          </td>
          <td class="px-4 py-2">
            是否显示冒号
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            labelStyle
          </td>
          <td class="px-4 py-2">
            object
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义标签样式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            contentStyle
          </td>
          <td class="px-4 py-2">
            object
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义内容样式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            labelAlign
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'left'
          </td>
          <td class="px-4 py-2">
            标签对齐方式，可选值：'left'、'right'、'center'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            contentAlign
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'left'
          </td>
          <td class="px-4 py-2">
            内容对齐方式，可选值：'left'、'right'、'center'
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      DescriptionsItem 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            label
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            标签文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            span
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            1
          </td>
          <td class="px-4 py-2">
            列的数量
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            labelStyle
          </td>
          <td class="px-4 py-2">
            object
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义标签样式
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            contentStyle
          </td>
          <td class="px-4 py-2">
            object
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            自定义内容样式
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Descriptions 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            default
          </td>
          <td class="px-4 py-2">
            描述列表项内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            自定义标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            extra
          </td>
          <td class="px-4 py-2">
            自定义操作区域
          </td>
        </tr>
      </tbody>
    </table>
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
