<script setup lang="ts" name="DemoCard">
/**
 * Card 卡片组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 示例数据
const loading = ref(false)

// 加载状态切换
function toggleLoading() {
  loading.value = !loading.value
}

// 代码示例
const basicCode = `<ui-card title="基础卡片" subtitle="这是一个基础卡片示例">
  <p class="mb-4">卡片内容区域，可以放置任意内容。</p>
  <p>卡片组件支持标题、副标题、内容区域和底部区域。</p>
</ui-card>`

const customHeaderCode = `<ui-card>
  <template #header>
    <div class="flex items-center justify-between">
      <div>
        <div class="text-base font-medium">自定义头部</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          使用具名插槽自定义头部内容
        </div>
      </div>
      <ui-button size="small">操作按钮</ui-button>
    </div>
  </template>
  <p>卡片支持使用插槽自定义头部和底部内容。</p>
  <template #footer>
    <div class="flex justify-end">
      <ui-button size="small" type="primary">确认</ui-button>
    </div>
  </template>
</ui-card>`

const sizeCode = `<!-- 小尺寸 -->
<ui-card title="小尺寸卡片" size="small">
  <p>小尺寸的卡片示例，适合空间较小的场景。</p>
</ui-card>

<!-- 默认尺寸 -->
<ui-card title="默认尺寸卡片" size="default">
  <p>默认尺寸的卡片示例。</p>
</ui-card>

<!-- 大尺寸 -->
<ui-card title="大尺寸卡片" size="large">
  <p>大尺寸的卡片示例，内容更加突出。</p>
</ui-card>`

const shadowCode = `<!-- 总是显示阴影 -->
<ui-card title="总是显示阴影" shadow="always">
  <p>总是显示阴影。</p>
</ui-card>

<!-- 悬停显示阴影 -->
<ui-card title="悬停显示阴影" shadow="hover">
  <p>悬停时显示阴影（默认）。</p>
</ui-card>

<!-- 不显示阴影 -->
<ui-card title="不显示阴影" shadow="never">
  <p>不显示阴影。</p>
</ui-card>`

const borderCode = `<!-- 带边框卡片 -->
<ui-card title="带边框卡片" bordered>
  <p>默认带有边框。</p>
</ui-card>

<!-- 无边框卡片 -->
<ui-card title="无边框卡片" :bordered="false">
  <p>无边框卡片。</p>
</ui-card>

<!-- 带分割线卡片 -->
<ui-card title="带分割线卡片" divided>
  <p>头部和底部有分割线。</p>
  <template #footer>
    <div>底部内容</div>
  </template>
</ui-card>`

const alignCode = `<!-- 左对齐 -->
<ui-card title="左对齐" header-align="left" footer-align="left" divided>
  <p>头部和底部左对齐（默认）。</p>
  <template #footer>
    底部内容
  </template>
</ui-card>

<!-- 居中对齐 -->
<ui-card title="居中对齐" header-align="center" footer-align="center" divided>
  <p>头部和底部居中对齐。</p>
  <template #footer>
    底部内容
  </template>
</ui-card>

<!-- 右对齐 -->
<ui-card title="右对齐" header-align="right" footer-align="right" divided>
  <p>头部和底部右对齐。</p>
  <template #footer>
    底部内容
  </template>
</ui-card>`

const loadingCode = `<ui-card title="加载状态" :loading="loading">
  <p>卡片内容加载中...</p>
  <template #footer>
    <ui-button size="small" @click="toggleLoading">
      {{ loading ? '停止加载' : '开始加载' }}
    </ui-button>
  </template>
</ui-card>

<script setup>
const loading = ref(false)

function toggleLoading() {
  loading.value = !loading.value
}
<\/script>`

const styleCode = `<ui-card title="自定义样式" bg-color="#f0f9ff" border-color="#bae6fd" color="#0369a1">
  <p>使用自定义颜色和边框。</p>
</ui-card>`

const noPaddingCode = `<ui-card title="无内边距卡片" :body-padding="false">
  <div class="p-0">
    <div class="bg-gray-100 p-4 dark:bg-gray-700">
      <p>自定义内容区域，卡片本身不提供内边距。</p>
    </div>
    <div class="bg-gray-200 p-4 dark:bg-gray-800">
      <p>适合需要完全自定义内容布局的场景。</p>
    </div>
    <div class="bg-gray-300 p-4 dark:bg-gray-900">
      <p>例如图表、列表等需要特殊样式的内容。</p>
    </div>
  </div>
</ui-card>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Card 卡片
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      卡片容器组件，用于承载内容的容器，可以包含标题、内容、底部等区域。
    </p>

    <!-- 基础卡片 -->
    <ui-demo
      title="基础卡片"
      description="最基础的卡片用法，包含标题、副标题和内容。"
      :code="basicCode"
    >
      <div class="max-w-lg w-full">
        <ui-card title="基础卡片" subtitle="这是一个基础卡片示例">
          <p class="mb-4">
            卡片内容区域，可以放置任意内容。
          </p>
          <p>卡片组件支持标题、副标题、内容区域和底部区域。</p>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 自定义头部和底部 -->
    <ui-demo
      title="自定义头部和底部"
      description="使用具名插槽自定义卡片的头部和底部内容。"
      :code="customHeaderCode"
    >
      <div class="max-w-lg w-full">
        <ui-card>
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-base font-medium">
                  自定义头部
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  使用具名插槽自定义头部内容
                </div>
              </div>
              <ui-button size="small">
                操作按钮
              </ui-button>
            </div>
          </template>
          <p>卡片支持使用插槽自定义头部和底部内容。</p>
          <template #footer>
            <div class="flex justify-end">
              <ui-button size="small" type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="卡片组件提供三种尺寸：小、默认、大。"
      :code="sizeCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="小尺寸卡片" size="small">
          <p>小尺寸的卡片示例，适合空间较小的场景。</p>
        </ui-card>

        <ui-card title="默认尺寸卡片" size="default">
          <p>默认尺寸的卡片示例。</p>
        </ui-card>

        <ui-card title="大尺寸卡片" size="large">
          <p>大尺寸的卡片示例，内容更加突出。</p>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 阴影效果 -->
    <ui-demo
      title="阴影效果"
      description="卡片可以设置不同的阴影显示方式。"
      :code="shadowCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="总是显示阴影" shadow="always">
          <p>总是显示阴影。</p>
        </ui-card>

        <ui-card title="悬停显示阴影" shadow="hover">
          <p>悬停时显示阴影（默认）。</p>
        </ui-card>

        <ui-card title="不显示阴影" shadow="never">
          <p>不显示阴影。</p>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 边框与分割线 -->
    <ui-demo
      title="边框与分割线"
      description="卡片可以设置是否显示边框，以及头部和底部的分割线。"
      :code="borderCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="带边框卡片" bordered>
          <p>默认带有边框。</p>
        </ui-card>

        <ui-card title="无边框卡片" :bordered="false">
          <p>无边框卡片。</p>
        </ui-card>

        <ui-card title="带分割线卡片" divided>
          <p>头部和底部有分割线。</p>
          <template #footer>
            <div>底部内容</div>
          </template>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 对齐方式 -->
    <ui-demo
      title="对齐方式"
      description="卡片头部和底部的内容可以设置不同的对齐方式。"
      :code="alignCode"
    >
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="左对齐" header-align="left" footer-align="left" divided>
          <p>头部和底部左对齐（默认）。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>

        <ui-card title="居中对齐" header-align="center" footer-align="center" divided>
          <p>头部和底部居中对齐。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>

        <ui-card title="右对齐" header-align="right" footer-align="right" divided>
          <p>头部和底部右对齐。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 加载状态 -->
    <ui-demo
      title="加载状态"
      description="卡片可以设置加载状态，显示加载中的效果。"
      :code="loadingCode"
    >
      <div class="max-w-md w-full">
        <ui-card title="加载状态" :loading="loading">
          <p>卡片内容加载中...</p>
          <template #footer>
            <ui-button size="small" @click="toggleLoading">
              {{ loading ? '停止加载' : '开始加载' }}
            </ui-button>
          </template>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="卡片支持自定义背景色、边框颜色和文本颜色。"
      :code="styleCode"
    >
      <div class="max-w-md w-full">
        <ui-card title="自定义样式" bg-color="#f0f9ff" border-color="#bae6fd" color="#0369a1">
          <p>使用自定义颜色和边框。</p>
        </ui-card>
      </div>
    </ui-demo>

    <!-- 无内边距 -->
    <ui-demo
      title="无内边距"
      description="卡片内容区域可以设置为无内边距，便于完全自定义内容布局。"
      :code="noPaddingCode"
    >
      <div class="max-w-xl w-full">
        <ui-card title="无内边距卡片" :body-padding="false">
          <div class="p-0">
            <div class="bg-gray-100 p-4 dark:bg-gray-700">
              <p>自定义内容区域，卡片本身不提供内边距。</p>
            </div>
            <div class="bg-gray-200 p-4 dark:bg-gray-800">
              <p>适合需要完全自定义内容布局的场景。</p>
            </div>
            <div class="bg-gray-300 p-4 dark:bg-gray-900">
              <p>例如图表、列表等需要特殊样式的内容。</p>
            </div>
          </div>
        </ui-card>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                title
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片标题
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                subtitle
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片副标题
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片尺寸
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                shadow
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片阴影显示时机
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'always' / 'hover' / 'never'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'hover'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                bordered
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示边框
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                true
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                divided
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示分割线
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                header-align
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                头部对齐方式
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left' / 'center' / 'right'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                footer-align
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                底部对齐方式
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left' / 'center' / 'right'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'left'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                loading
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示加载状态
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                body-padding
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                内容区域是否有内边距
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                true
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                bg-color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                背景颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                border-color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                边框颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文本颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        插槽
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                插槽名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                default
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片内容
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                header
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片头部，会覆盖 title 和 subtitle 属性
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                footer
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                卡片底部
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-card .section {
  margin-bottom: 2rem;
}
</style>
