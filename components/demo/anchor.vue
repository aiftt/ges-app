<script setup lang="ts" name="DemoAnchor">
/**
 * Anchor 组件演示
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import logger from '~/utils/logger'

const currentLink = ref('section-1')

function handleLinkChange(link: string, prev: string) {
  currentLink.value = link
  logger.debug('当前链接改变:', link, '前一个链接:', prev)
}

function handleClick(e: Event, link: string) {
  logger.debug('点击链接:', link)
}

// 预定义的锚点链接
const anchors = [
  {
    href: '#section-1',
    title: '基础锚点',
  },
  {
    href: '#section-2',
    title: '固定位置',
    children: [
      {
        href: '#section-2-1',
        title: '顶部固定',
      },
      {
        href: '#section-2-2',
        title: '底部固定',
      },
    ],
  },
  {
    href: '#section-3',
    title: '自定义样式',
  },
  {
    href: '#section-4',
    title: 'API',
  },
]

// 代码示例
const basicCode = `<ui-anchor :offset-top="30">
  <ui-anchor-link href="#section-1" title="基础锚点" />
  <ui-anchor-link href="#section-2" title="固定位置" />
  <ui-anchor-link href="#section-3" title="自定义样式" />
  <ui-anchor-link href="#section-4" title="API" />
</ui-anchor>`

const affixCode = `<ui-anchor :offset-top="80" :affix="true" />`

const itemsCode = `<ui-anchor :items="anchors" />

<script setup>
// 预定义的锚点链接
const anchors = [
  {
    href: '#section-1',
    title: '基础锚点',
  },
  {
    href: '#section-2',
    title: '固定位置',
    children: [
      {
        href: '#section-2-1',
        title: '顶部固定',
      },
      {
        href: '#section-2-2',
        title: '底部固定',
      },
    ],
  },
  {
    href: '#section-3',
    title: '自定义样式',
  },
  {
    href: '#section-4',
    title: 'API',
  },
]
<\/script>`

const customStyleCode = `<ui-anchor :show-ink-ball="false" active-class="my-active-link">
  <ui-anchor-link href="#section-1" title="基础锚点" />
  <ui-anchor-link href="#section-2" title="固定位置" />
  <ui-anchor-link href="#section-3" title="自定义样式" />
  <ui-anchor-link href="#section-4" title="API" />
</ui-anchor>

<p style="margin-top: 20px">
  当前激活的链接: {{ currentLink }}
</p>

<script setup>
import { ref } from 'vue'

const currentLink = ref('section-1')

function handleLinkChange(link, prev) {
  currentLink.value = link
  console.log('当前链接改变:', link, '前一个链接:', prev)
}
<\/script>`

const eventCode = `<ui-anchor
  :bounds="5"
  :target-offset="60"
  :offset-top="30"
  :affix="false"
  @change="handleLinkChange"
  @click="handleClick"
>
  <ui-anchor-link href="#section-1" title="基础锚点" />
  <ui-anchor-link href="#section-2" title="固定位置">
    <ui-anchor-link href="#section-2-1" title="顶部固定" />
    <ui-anchor-link href="#section-2-2" title="底部固定" />
  </ui-anchor-link>
  <ui-anchor-link href="#section-3" title="自定义样式" />
  <ui-anchor-link href="#section-4" title="API" />
</ui-anchor>

<script setup>
import { ref } from 'vue'

const currentLink = ref('section-1')

function handleLinkChange(link, prev) {
  currentLink.value = link
  console.log('当前链接改变:', link, '前一个链接:', prev)
}

function handleClick(e, link) {
  console.log('点击链接:', link)
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Anchor 锚点
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于跳转到页面指定位置的导航组件，常用于文档目录、页内导航等场景。
    </p>

    <!-- 页面右侧固定锚点 -->
    <ui-affix class="fixed right-4 top-8 z-30 hidden md:block">
      <div class="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <ui-anchor
          :bounds="5"
          :target-offset="60"
          :offset-top="30"
          :affix="false"
          @change="handleLinkChange"
          @click="handleClick"
        >
          <ui-anchor-link href="#section-basic" title="基础锚点" />
          <ui-anchor-link href="#section-fixed" title="固定位置">
            <ui-anchor-link href="#section-fixed-top" title="顶部固定" />
            <ui-anchor-link href="#section-fixed-items" title="预设数据" />
          </ui-anchor-link>
          <ui-anchor-link href="#section-custom" title="自定义样式" />
          <ui-anchor-link href="#section-events" title="事件处理" />
          <ui-anchor-link href="#section-api" title="API" />
        </ui-anchor>
      </div>
    </ui-affix>

    <!-- 基础锚点 -->
    <div id="section-basic" class="mb-16 border-b border-gray-200 pb-8 dark:border-gray-700">
      <ui-demo
        title="基础锚点"
        description="最简单的用法，通过锚点可快速定位到指定内容区域。"
        :code="basicCode"
      >
        <ui-anchor :offset-top="30">
          <ui-anchor-link href="#section-basic" title="基础锚点" />
          <ui-anchor-link href="#section-fixed" title="固定位置" />
          <ui-anchor-link href="#section-custom" title="自定义样式" />
          <ui-anchor-link href="#section-api" title="API" />
        </ui-anchor>
      </ui-demo>
    </div>

    <!-- 固定位置 -->
    <div id="section-fixed" class="mb-16 border-b border-gray-200 pb-8 dark:border-gray-700">
      <h3 class="mb-4 text-xl font-bold">
        固定位置
      </h3>
      <p class="mb-6 text-gray-500 dark:text-gray-400">
        可以设置锚点组件固定显示在页面特定位置。
      </p>

      <!-- 顶部固定 -->
      <div id="section-fixed-top" class="mb-8">
        <ui-demo
          title="使用 affix 属性实现顶部固定"
          description="默认值为 true，锚点组件会固定在页面顶部。"
          :code="affixCode"
        >
          <ui-anchor :offset-top="80" :affix="true" />
        </ui-demo>
      </div>

      <!-- 使用预设数据 -->
      <div id="section-fixed-items">
        <ui-demo
          title="使用预设数据自动生成锚点"
          description="可以通过 items 属性来自动生成锚点导航。"
          :code="itemsCode"
        >
          <ui-anchor :items="anchors" />
        </ui-demo>
      </div>
    </div>

    <!-- 自定义样式 -->
    <div id="section-custom" class="mb-16 border-b border-gray-200 pb-8 dark:border-gray-700">
      <ui-demo
        title="自定义样式"
        description="可以自定义锚点的样式，如显示或隐藏小圆点，自定义高亮样式等。"
        :code="customStyleCode"
      >
        <ui-anchor :show-ink-ball="false" active-class="my-active-link">
          <ui-anchor-link href="#section-basic" title="基础锚点" />
          <ui-anchor-link href="#section-fixed" title="固定位置" />
          <ui-anchor-link href="#section-custom" title="自定义样式" />
          <ui-anchor-link href="#section-api" title="API" />
        </ui-anchor>

        <p class="mt-4 text-gray-600 dark:text-gray-400">
          当前激活的链接: {{ currentLink }}
        </p>
      </ui-demo>
    </div>

    <!-- 事件处理 -->
    <div id="section-events" class="mb-16 border-b border-gray-200 pb-8 dark:border-gray-700">
      <ui-demo
        title="事件处理"
        description="通过监听 change 和 click 事件，可以在锚点链接改变或被点击时执行自定义逻辑。"
        :code="eventCode"
      >
        <ui-anchor
          :bounds="5"
          :target-offset="60"
          :offset-top="30"
          :affix="false"
          @change="handleLinkChange"
          @click="handleClick"
        >
          <ui-anchor-link href="#section-basic" title="基础锚点" />
          <ui-anchor-link href="#section-fixed" title="固定位置">
            <ui-anchor-link href="#section-fixed-top" title="顶部固定" />
            <ui-anchor-link href="#section-fixed-items" title="预设数据" />
          </ui-anchor-link>
          <ui-anchor-link href="#section-custom" title="自定义样式" />
          <ui-anchor-link href="#section-events" title="事件处理" />
        </ui-anchor>
      </ui-demo>
    </div>

    <!-- API 参考 -->
    <div id="section-api" class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <h4 class="mb-2 text-lg font-medium">
        Anchor 属性
      </h4>
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
                bounds
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                锚点区域边界，单位为像素
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                5
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                activeClass
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                自定义高亮类名
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
                targetOffset
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                指定滚动到锚点区域的偏移量
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                scrollOffset
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                锚点滚动偏移量
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                同 targetOffset
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                container
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                指定监听滚动的容器
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                () => HTMLElement
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                () => window
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                showInkBall
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示小圆点
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
                affix
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                固定模式
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
                offsetTop
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                固定模式的偏移量
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                items
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                向 Anchor 组件添加链接的方式
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                AnchorLinkItem[]
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                []
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 text-lg font-medium">
        Anchor 事件
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                change
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                锚点链接改变时触发事件
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (currentLink: string, previousLink: string) => void
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                click
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                点击锚点链接时触发事件
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (event: Event, link: string) => void
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 text-lg font-medium">
        AnchorLink 属性
      </h4>
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
                href
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                锚点链接
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
                title
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                链接标题
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-active-link {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
