<script setup lang="ts" name="DemoPageHeader">
/**
 * 页头组件演示
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 面包屑配置示例
const breadcrumbItems = [
  { title: '首页', to: '/', icon: 'carbon:home' },
  { title: '组件', to: '/components' },
  { title: '导航', to: '/components/navigation' },
  { title: '页头' },
]

// 返回按钮事件处理
function handleBack() {
  // 在实际应用中可能会执行路由返回操作
  logger.warn('点击了返回按钮')
}

// 后退图标控制
const customBackIcon = ref('carbon:arrow-left')

// 自定义样式控制
const useCustomStyle = ref(false)
const backgroundColor = ref('#f9fafb')
const titleColor = ref('#374151')

// 示例代码字符串
const basicCode = `<template>
      <ui-page-header
        title="页面标题"
        subtitle="这是页面的副标题，用于补充说明"
        @back="handleBack"
      >
        <div class="py-4">
          这里是页面内容区域，可以放置任何需要的组件或内容。
        </div>
      </ui-page-header>
</template>

<script setup>
function handleBack() {
  // 在实际应用中可能会执行路由返回操作
  console.warn('点击了返回按钮')
}
<\/script>`

const breadcrumbCode = `<template>
      <ui-page-header
        title="带面包屑的页头"
        :breadcrumb="breadcrumbItems"
        @back="handleBack"
      >
        <div class="py-4">
          使用面包屑导航可以提供更清晰的层级结构和导航路径。
        </div>
      </ui-page-header>
</template>

<script setup>
// 面包屑配置示例
const breadcrumbItems = [
  { title: '首页', to: '/', icon: 'carbon:home' },
  { title: '组件', to: '/components' },
  { title: '导航', to: '/components/navigation' },
  { title: '页头' },
]

function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const customBackCode = `<template>
      <div class="mb-4 flex items-center gap-4">
        <span>选择图标:</span>
        <ui-button size="small" @click="customBackIcon = 'carbon:arrow-left'">
          左箭头
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:undo'">
          撤销图标
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:home'">
          首页图标
        </ui-button>
      </div>
      <ui-page-header
        title="自定义返回按钮"
        back-text="返回上级"
        :back-icon="customBackIcon"
        @back="handleBack"
      >
        <div class="py-4">
          可以自定义返回按钮的文本和图标，以适应不同场景的需求。
        </div>
      </ui-page-header>
</template>

<script setup>
import { ref } from 'vue'

const customBackIcon = ref('carbon:arrow-left')

function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const extraContentCode = `<template>
      <ui-page-header
        title="带额外操作的页头"
        subtitle="这里可以放置页面的详细描述"
        @back="handleBack"
      >
        <template #extra>
          <ui-button class="mr-2">
            取消
          </ui-button>
          <ui-button type="primary">
            保存
          </ui-button>
        </template>
        <div class="py-4">
          可以在页头右侧添加额外的操作按钮或其他内容。
        </div>
      </ui-page-header>
</template>

<script setup>
function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const footerCode = `<template>
      <ui-page-header
        title="带页脚的页头"
        subtitle="这是带有页脚操作区的页头示例"
        @back="handleBack"
      >
        <div class="py-4">
          这里是页面的主要内容区域。
        </div>
        <template #footer>
          <div class="flex gap-2">
            <ui-button>
              取消
            </ui-button>
            <ui-button type="primary">
              提交
            </ui-button>
          </div>
        </template>
      </ui-page-header>
</template>

<script setup>
function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const footerAlignCode = `<template>
      <div class="space-y-4">
        <ui-page-header
          title="左对齐页脚"
          footer-align="left"
          @back="handleBack"
        >
          <div class="py-2">
            左对齐的页脚操作区（默认）。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="居中对齐页脚"
          footer-align="center"
          @back="handleBack"
        >
          <div class="py-2">
            居中对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="右对齐页脚"
          footer-align="right"
          @back="handleBack"
        >
          <div class="py-2">
            右对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>
      </div>
</template>

<script setup>
function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const noDividerCode = `<template>
  <ui-page-header
    title="无分割线的页头"
    subtitle="去掉默认的分割线"
    :divider="false"
    @back="handleBack"
  >
    <div class="py-4">
      可以通过设置 divider 属性为 false 来移除默认的分割线。
    </div>
  </ui-page-header>
</template>

<script setup>
function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`

const customStyleCode = `<template>
  <div class="mb-4">
    <ui-switch v-model:checked="useCustomStyle">
      {{ useCustomStyle ? '使用自定义样式' : '使用默认样式' }}
    </ui-switch>
  </div>
  <div v-if="useCustomStyle" class="mb-4 flex items-center gap-4">
    <div>
      <div class="mb-1">背景色:</div>
      <div class="flex gap-2">
        <div
          v-for="color in ['#f9fafb', '#f0f9ff', '#f7fee7', '#fef2f2']"
          :key="color"
          class="h-8 w-8 cursor-pointer rounded-md transition-transform hover:scale-105"
          :style="{ backgroundColor: color }"
          @click="backgroundColor = color"
        ></div>
      </div>
    </div>
    <div>
      <div class="mb-1">标题色:</div>
      <div class="flex gap-2">
        <div
          v-for="color in ['#374151', '#1e40af', '#166534', '#b91c1c']"
          :key="color"
          class="h-8 w-8 cursor-pointer rounded-md transition-transform hover:scale-105"
          :style="{ backgroundColor: color }"
          @click="titleColor = color"
        ></div>
      </div>
    </div>
  </div>

  <ui-page-header
    title="自定义样式的页头"
    subtitle="可以通过自定义样式属性来设置页头的外观"
    @back="handleBack"
    :custom-style="{
      backgroundColor: useCustomStyle ? backgroundColor : undefined,
      color: useCustomStyle ? titleColor : undefined,
      borderRadius: useCustomStyle ? '8px' : undefined,
      padding: useCustomStyle ? '16px 24px' : undefined,
    }"
  >
    <div class="py-4">
      使用自定义样式可以灵活地调整页头的外观以匹配应用的设计风格。
    </div>
  </ui-page-header>
</template>

<script setup>
import { ref } from 'vue'

const useCustomStyle = ref(false)
const backgroundColor = ref('#f9fafb')
const titleColor = ref('#374151')

function handleBack() {
  // 处理返回按钮点击事件
  console.warn('点击了返回按钮')
}
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      PageHeader 页头
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      页头组件是用于展示页面标题、面包屑导航、返回按钮和操作区域的容器组件，通常位于页面顶部。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的页头组件，包含标题、副标题和返回按钮。"
      :code="basicCode"
    >
      <ui-page-header
        title="页面标题"
        subtitle="这是页面的副标题，用于补充说明"
        @back="handleBack"
      >
        <div class="py-4 dark:text-gray-300">
          这里是页面内容区域，可以放置任何需要的组件或内容。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- 带面包屑导航 -->
    <ui-demo
      title="带面包屑导航"
      description="页头组件可以配合面包屑导航一起使用，提供更清晰的层级结构。"
      :code="breadcrumbCode"
    >
      <ui-page-header
        title="带面包屑的页头"
        :breadcrumb="breadcrumbItems"
        @back="handleBack"
      >
        <div class="py-4 dark:text-gray-300">
          使用面包屑导航可以提供更清晰的层级结构和导航路径。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- 自定义返回按钮 -->
    <ui-demo
      title="自定义返回按钮"
      description="可以自定义返回按钮的图标和文本。"
      :code="customBackCode"
    >
      <div class="mb-4 flex items-center gap-4">
        <span class="dark:text-gray-300">选择图标:</span>
        <ui-button size="small" @click="customBackIcon = 'carbon:arrow-left'">
          左箭头
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:undo'">
          撤销图标
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:home'">
          首页图标
        </ui-button>
      </div>
      <ui-page-header
        title="自定义返回按钮"
        back-text="返回上级"
        :back-icon="customBackIcon"
        @back="handleBack"
      >
        <div class="py-4 dark:text-gray-300">
          可以自定义返回按钮的文本和图标，以适应不同场景的需求。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- 带额外内容 -->
    <ui-demo
      title="带额外内容"
      description="在页头右侧添加额外的操作按钮或其他内容。"
      :code="extraContentCode"
    >
      <ui-page-header
        title="带额外操作的页头"
        subtitle="这里可以放置页面的详细描述"
        @back="handleBack"
      >
        <template #extra>
          <ui-button class="mr-2">
            取消
          </ui-button>
          <ui-button type="primary">
            保存
          </ui-button>
        </template>
        <div class="py-4 dark:text-gray-300">
          可以在页头右侧添加额外的操作按钮或其他内容。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- 带页脚操作区 -->
    <ui-demo
      title="带页脚操作区"
      description="在页头底部添加操作区域，常用于表单提交等场景。"
      :code="footerCode"
    >
      <ui-page-header
        title="带页脚的页头"
        subtitle="这是带有页脚操作区的页头示例"
        @back="handleBack"
      >
        <div class="py-4 dark:text-gray-300">
          这里是页面的主要内容区域。
        </div>
        <template #footer>
          <div class="flex gap-2">
            <ui-button>
              取消
            </ui-button>
            <ui-button type="primary">
              提交
            </ui-button>
          </div>
        </template>
      </ui-page-header>
    </ui-demo>

    <!-- 不同对齐方式的页脚 -->
    <ui-demo
      title="不同对齐方式的页脚"
      description="页脚操作区支持左对齐、居中对齐和右对齐三种方式。"
      :code="footerAlignCode"
    >
      <div class="space-y-4">
        <ui-page-header
          title="左对齐页脚"
          footer-align="left"
          @back="handleBack"
        >
          <div class="py-2 dark:text-gray-300">
            左对齐的页脚操作区（默认）。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="居中对齐页脚"
          footer-align="center"
          @back="handleBack"
        >
          <div class="py-2 dark:text-gray-300">
            居中对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="右对齐页脚"
          footer-align="right"
          @back="handleBack"
        >
          <div class="py-2 dark:text-gray-300">
            右对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>
      </div>
    </ui-demo>

    <!-- 无分割线 -->
    <ui-demo
      title="无分割线"
      description="可以通过设置 divider 属性为 false 来移除默认的分割线。"
      :code="noDividerCode"
    >
      <ui-page-header
        title="无分割线的页头"
        subtitle="去掉默认的分割线"
        :divider="false"
        @back="handleBack"
      >
        <div class="py-4 dark:text-gray-300">
          可以通过设置 divider 属性为 false 来移除默认的分割线。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过 custom-style 属性可以自定义页头的样式。"
      :code="customStyleCode"
    >
      <div class="mb-4">
        <ui-switch v-model:checked="useCustomStyle">
          {{ useCustomStyle ? '使用自定义样式' : '使用默认样式' }}
        </ui-switch>
      </div>
      <div v-if="useCustomStyle" class="mb-4 flex items-center gap-4">
        <div>
          <div class="mb-1 dark:text-gray-300">
            背景色:
          </div>
          <div class="flex gap-2">
            <div
              v-for="color in ['#f9fafb', '#f0f9ff', '#f7fee7', '#fef2f2']"
              :key="color"
              class="h-8 w-8 cursor-pointer rounded-md transition-transform hover:scale-105"
              :style="{ backgroundColor: color }"
              @click="backgroundColor = color"
            />
          </div>
        </div>
        <div>
          <div class="mb-1 dark:text-gray-300">
            标题色:
          </div>
          <div class="flex gap-2">
            <div
              v-for="color in ['#374151', '#1e40af', '#166534', '#b91c1c']"
              :key="color"
              class="h-8 w-8 cursor-pointer rounded-md transition-transform hover:scale-105"
              :style="{ backgroundColor: color }"
              @click="titleColor = color"
            />
          </div>
        </div>
      </div>

      <ui-page-header
        title="自定义样式的页头"
        subtitle="可以通过自定义样式属性来设置页头的外观"
        :custom-style="{
          backgroundColor: useCustomStyle ? backgroundColor : undefined,
          color: useCustomStyle ? titleColor : undefined,
          borderRadius: useCustomStyle ? '8px' : undefined,
          padding: useCustomStyle ? '16px 24px' : undefined,
        }"
        @back="handleBack"
      >
        <div class="py-4" :style="{ color: useCustomStyle ? titleColor : undefined }">
          使用自定义样式可以灵活地调整页头的外观以匹配应用的设计风格。
        </div>
      </ui-page-header>
    </ui-demo>

    <!-- API 参考 -->
    <ui-demo
      title="API 参考"
      description="PageHeader 组件的属性和事件。"
      :show-code="false"
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                标题
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                subtitle
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                副标题
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                backIcon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                返回按钮图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                carbon:arrow-left
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                backText
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                返回按钮文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                返回
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                showBack
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示返回按钮
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                divider
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示分割线
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                breadcrumb
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                面包屑导航配置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                footerAlign
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                页脚对齐方式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left' | 'center' | 'right'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                left
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                customStyle
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义样式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                object
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                {}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                back
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击返回按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                event: MouseEvent
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 font-medium dark:text-white">
        插槽
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                插槽名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                default
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                页头内容
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义标题
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                subtitle
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义副标题
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                extra
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                操作区域
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                footer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                页脚内容
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style lang="scss" scoped>
.custom-page-header {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}
</style>
