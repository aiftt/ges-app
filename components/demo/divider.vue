<script setup lang="ts" name="DemoDivider">
/**
 * 分割线组件演示
 * 创建日期: 2023-11-30
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 分割线方向
const _directions = ['horizontal', 'vertical']

// 分割线文本位置
const textPositions = ['left', 'center', 'right']

// 分割线类型
const dividerTypes = ['solid', 'dashed', 'dotted']

// 分割线颜色
const dividerColors = [
  { name: '默认色', value: '' },
  { name: '主要色', value: 'primary' },
  { name: '成功色', value: 'success' },
  { name: '警告色', value: 'warning' },
  { name: '危险色', value: 'danger' },
  { name: '信息色', value: 'info' },
]

// 段落文本样例
const paragraphText = 'Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。'

// 示例代码
const basicDividerCode = `<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>
<ui-divider />
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>`

const textDividerCode = `<!-- 默认居中文本 -->
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>
<ui-divider>默认居中</ui-divider>
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>

<!-- 左对齐文本 -->
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>
<ui-divider text-position="left">左对齐文本</ui-divider>
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>

<!-- 右对齐文本 -->
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>
<ui-divider text-position="right">右对齐文本</ui-divider>
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。</p>`

const textPositionDividerCode = `<!-- 左对齐 -->
<ui-divider text-position="left" with-text>left</ui-divider>

<!-- 居中对齐（默认） -->
<ui-divider text-position="center" with-text>center</ui-divider>

<!-- 右对齐 -->
<ui-divider text-position="right" with-text>right</ui-divider>`

const verticalDividerCode = `<div class="h-40 flex items-center">
  <span>左侧内容</span>
  <ui-divider direction="vertical" width="80%" margin="0 20px" />
  <div class="flex-1">
    <p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>
  </div>
  <ui-divider direction="vertical" width="60%" margin="0 20px" />
  <span>右侧内容</span>
</div>`

const typeDividerCode = `<!-- 实线分割线（默认） -->
<ui-divider type="solid">solid</ui-divider>

<!-- 虚线分割线 -->
<ui-divider type="dashed">dashed</ui-divider>

<!-- 点线分割线 -->
<ui-divider type="dotted">dotted</ui-divider>`

const colorDividerCode = `<!-- 默认颜色 -->
<ui-divider>默认色</ui-divider>

<!-- 主要颜色 -->
<ui-divider color="primary">主要色</ui-divider>

<!-- 成功颜色 -->
<ui-divider color="success">成功色</ui-divider>

<!-- 警告颜色 -->
<ui-divider color="warning">警告色</ui-divider>

<!-- 危险颜色 -->
<ui-divider color="danger">危险色</ui-divider>

<!-- 信息颜色 -->
<ui-divider color="info">信息色</ui-divider>`

const customDividerCode = `<!-- 粗线分割 -->
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>
<ui-divider
  color="primary"
  width="5px"
  type="solid"
  margin="24px 0"
>
  粗线分割
</ui-divider>
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>

<!-- 自定义颜色 -->
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>
<ui-divider
  color="#FF6B6B"
  class="font-bold"
>
  自定义颜色
</ui-divider>
<p>Vue.js是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。</p>`
</script>

<template>
  <div class="demo-divider">
    <h2 class="mb-6 text-xl font-bold">
      Divider 分割线
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      分割线组件用于分隔内容的区域，可以是水平的或垂直的，同时支持文本和自定义样式。
    </p>

    <!-- 基础分割线 -->
    <ui-demo
      title="基础分割线"
      description="最基本的分割线用法，用于分隔段落。"
      :code="basicDividerCode"
    >
      <p>{{ paragraphText }}</p>
      <ui-divider />
      <p>{{ paragraphText }}</p>
    </ui-demo>

    <!-- 带文本的分割线 -->
    <ui-demo
      title="带文本的分割线"
      description="可以在分割线中添加文本内容，支持不同的文本位置。"
      :code="textDividerCode"
    >
      <div class="space-y-8">
        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider>默认居中</ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider text-position="left">
            左对齐文本
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider text-position="right">
            右对齐文本
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>
      </div>
    </ui-demo>

    <!-- 文本位置对比 -->
    <ui-demo
      title="文本位置"
      description="分割线文本支持左、中、右三种对齐方式。"
      :code="textPositionDividerCode"
    >
      <div class="space-y-4">
        <div v-for="position in textPositions" :key="position" class="flex items-center">
          <span class="w-20 text-gray-600 dark:text-gray-400">{{ position }}</span>
          <div class="flex-1">
            <ui-divider :text-position="position" with-text>
              {{ position }}
            </ui-divider>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 垂直分割线 -->
    <ui-demo
      title="垂直分割线"
      description="垂直方向的分割线，用于分隔内联元素。"
      :code="verticalDividerCode"
    >
      <div class="h-40 flex items-center">
        <span>左侧内容</span>
        <ui-divider direction="vertical" width="80%" margin="0 20px" />
        <div class="flex-1">
          <p>{{ paragraphText }}</p>
        </div>
        <ui-divider direction="vertical" width="60%" margin="0 20px" />
        <span>右侧内容</span>
      </div>
    </ui-demo>

    <!-- 分割线类型 -->
    <ui-demo
      title="分割线类型"
      description="支持实线、虚线和点线三种类型。"
      :code="typeDividerCode"
    >
      <div class="space-y-6">
        <div v-for="type in dividerTypes" :key="type" class="space-y-2">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ type }}
          </div>
          <ui-divider :type="type">
            {{ type }}
          </ui-divider>
        </div>
      </div>
    </ui-demo>

    <!-- 分割线颜色 -->
    <ui-demo
      title="分割线颜色"
      description="支持多种预设颜色，匹配不同的语义场景。"
      :code="colorDividerCode"
    >
      <div class="space-y-6">
        <div v-for="color in dividerColors" :key="color.value || 'default'" class="space-y-2">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ color.name }}
          </div>
          <ui-divider :color="color.value">
            {{ color.name }}
          </ui-divider>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以通过属性和类名自定义分割线的样式。"
      :code="customDividerCode"
    >
      <div class="space-y-6">
        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider
            color="primary"
            width="5px"
            type="solid"
            margin="24px 0"
          >
            粗线分割
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>

        <div>
          <p>{{ paragraphText }}</p>
          <ui-divider
            color="#FF6B6B"
            class="font-bold"
          >
            自定义颜色
          </ui-divider>
          <p>{{ paragraphText }}</p>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border rounded bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        API 参考
      </h3>

      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2 text-left">
              属性
            </th>
            <th class="border p-2 text-left">
              说明
            </th>
            <th class="border p-2 text-left">
              类型
            </th>
            <th class="border p-2 text-left">
              默认值
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">
              direction
            </td>
            <td class="border p-2">
              分割线方向
            </td>
            <td class="border p-2">
              'horizontal' | 'vertical'
            </td>
            <td class="border p-2">
              'horizontal'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              type
            </td>
            <td class="border p-2">
              分割线类型
            </td>
            <td class="border p-2">
              'solid' | 'dashed' | 'dotted'
            </td>
            <td class="border p-2">
              'solid'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              color
            </td>
            <td class="border p-2">
              分割线颜色
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              width
            </td>
            <td class="border p-2">
              分割线宽度
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              '1px'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              margin
            </td>
            <td class="border p-2">
              分割线外边距
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              '16px 0'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              textPosition
            </td>
            <td class="border p-2">
              文本位置
            </td>
            <td class="border p-2">
              'left' | 'center' | 'right'
            </td>
            <td class="border p-2">
              'center'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              withText
            </td>
            <td class="border p-2">
              是否包含文本
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-divider {
  padding: 1rem;
}
</style>
