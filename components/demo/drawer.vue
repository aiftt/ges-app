<script setup lang="ts" name="DemoDrawer">
/**
 * Drawer 抽屉组件示例
 * 创建日期: 2024-06-25
 * 作者: aiftt
 * 更新日期: 2024-06-25 - 初始版本
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('DrawerDemo')

// 基础抽屉
const basicVisible = ref(false)

// 不同方向的抽屉
const leftVisible = ref(false)
const rightVisible = ref(false)
const topVisible = ref(false)
const bottomVisible = ref(false)

// 不同尺寸的抽屉
const smallVisible = ref(false)
const mediumVisible = ref(false)
const largeVisible = ref(false)
const customSizeVisible = ref(false)

// 带页脚的抽屉
const withFooterVisible = ref(false)

// 全屏抽屉
const fullscreenVisible = ref(false)

// 自定义样式抽屉
const customDrawerVisible = ref(false)

// 事件处理
function handleOpen() {
  logger.info('抽屉已打开')
}

function handleClose() {
  logger.info('抽屉已关闭')
}

function handleOk() {
  logger.info('点击了确认按钮')
}

function handleCancel() {
  logger.info('点击了取消按钮')
}

// 示例代码字符串
const basicCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开抽屉
  </ui-button>

  <ui-drawer
    v-model="visible"
    title="基础抽屉"
    @open="handleOpen"
    @close="handleClose"
  >
    <p>这是一个基础抽屉的内容</p>
    <p>点击遮罩层或右上角叉号可以关闭</p>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

function handleOpen() {
  console.log('抽屉已打开')
}

function handleClose() {
  console.log('抽屉已关闭')
}
<\/script>`

const placementCode = `<template>
  <div class="flex flex-wrap gap-4">
    <ui-button @click="leftVisible = true">从左侧打开</ui-button>
    <ui-button @click="rightVisible = true">从右侧打开</ui-button>
    <ui-button @click="topVisible = true">从顶部打开</ui-button>
    <ui-button @click="bottomVisible = true">从底部打开</ui-button>
  </div>

  <ui-drawer
    v-model="leftVisible"
    placement="left"
    title="左侧抽屉"
  >
    <p>从左侧滑出的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="rightVisible"
    placement="right"
    title="右侧抽屉"
  >
    <p>从右侧滑出的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="topVisible"
    placement="top"
    title="顶部抽屉"
  >
    <p>从顶部滑出的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="bottomVisible"
    placement="bottom"
    title="底部抽屉"
  >
    <p>从底部滑出的抽屉</p>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const leftVisible = ref(false)
const rightVisible = ref(false)
const topVisible = ref(false)
const bottomVisible = ref(false)
<\/script>`

const sizeCode = `<template>
  <div class="flex flex-wrap gap-4">
    <ui-button @click="smallVisible = true">小尺寸</ui-button>
    <ui-button @click="mediumVisible = true">中等尺寸</ui-button>
    <ui-button @click="largeVisible = true">大尺寸</ui-button>
    <ui-button @click="customVisible = true">自定义尺寸</ui-button>
  </div>

  <ui-drawer
    v-model="smallVisible"
    title="小尺寸抽屉"
    size="sm"
  >
    <p>这是一个小尺寸的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="mediumVisible"
    title="中等尺寸抽屉"
    size="md"
  >
    <p>这是一个中等尺寸的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="largeVisible"
    title="大尺寸抽屉"
    size="lg"
  >
    <p>这是一个大尺寸的抽屉</p>
  </ui-drawer>

  <ui-drawer
    v-model="customVisible"
    title="自定义尺寸抽屉"
    width="600"
  >
    <p>这是一个自定义宽度的抽屉</p>
    <p>宽度设置为600px</p>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const smallVisible = ref(false)
const mediumVisible = ref(false)
const largeVisible = ref(false)
const customVisible = ref(false)
<\/script>`

const footerCode = `<template>
  <ui-button type="primary" @click="visible = true">
    带页脚的抽屉
  </ui-button>

  <ui-drawer
    v-model="visible"
    title="表单提交"
    show-footer
    footer-bordered
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="p-4">
      <ui-input class="mb-4" placeholder="请输入名称" />
      <ui-textarea placeholder="请输入描述" />
    </div>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

function handleOk() {
  console.log('点击了确认按钮')
}

function handleCancel() {
  console.log('点击了取消按钮')
}
<\/script>`

const fullscreenCode = `<template>
  <ui-button type="primary" @click="visible = true">
    全屏抽屉
  </ui-button>

  <ui-drawer
    v-model="visible"
    title="全屏抽屉"
    fullscreen
  >
    <div class="p-4">
      <h4 class="mb-4 text-lg font-medium">这是一个全屏抽屉</h4>
      <p class="mb-4">全屏抽屉适合展示大量内容或复杂操作。</p>
      <p>抽屉内可以包含表单、表格、图表等各种复杂内容。</p>
    </div>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`

const customStyleCode = `<template>
  <ui-button @click="visible = true">
    自定义样式抽屉
  </ui-button>

  <ui-drawer
    v-model="visible"
    title="自定义样式"
    size="md"
    bg-color="#f0f9ff"
    text-color="#0369a1"
    border-color="#bae6fd"
  >
    <p>这是一个自定义样式的抽屉</p>
    <p>使用了蓝色主题</p>
  </ui-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Drawer 抽屉
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      抽屉是从屏幕边缘滑出的浮层面板，常用于展示侧边菜单、详情页、表单等内容。
    </p>

    <!-- 基础抽屉 -->
    <ui-demo
      title="基础用法"
      description="最基本的抽屉，点击按钮从右侧滑出，点击遮罩或关闭按钮关闭。"
      :code="basicCode"
    >
      <ui-button type="primary" @click="basicVisible = true">
        打开抽屉
      </ui-button>

      <ui-drawer
        v-model="basicVisible"
        title="基础抽屉"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="dark:text-gray-300">
          <p>这是一个基础抽屉的内容</p>
          <p>点击遮罩层或右上角叉号可以关闭</p>
        </div>
      </ui-drawer>
    </ui-demo>

    <!-- 不同方向的抽屉 -->
    <ui-demo
      title="不同方向"
      description="抽屉可以从不同方向滑出，支持左、右、上、下四个方向。"
      :code="placementCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button @click="leftVisible = true">
          从左侧打开
        </ui-button>
        <ui-button @click="rightVisible = true">
          从右侧打开
        </ui-button>
        <ui-button @click="topVisible = true">
          从顶部打开
        </ui-button>
        <ui-button @click="bottomVisible = true">
          从底部打开
        </ui-button>
      </div>

      <ui-drawer
        v-model="leftVisible"
        placement="left"
        title="左侧抽屉"
      >
        <p class="dark:text-gray-300">
          从左侧滑出的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="rightVisible"
        placement="right"
        title="右侧抽屉"
      >
        <p class="dark:text-gray-300">
          从右侧滑出的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="topVisible"
        placement="top"
        title="顶部抽屉"
      >
        <p class="dark:text-gray-300">
          从顶部滑出的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="bottomVisible"
        placement="bottom"
        title="底部抽屉"
      >
        <p class="dark:text-gray-300">
          从底部滑出的抽屉
        </p>
      </ui-drawer>
    </ui-demo>

    <!-- 不同尺寸的抽屉 -->
    <ui-demo
      title="不同尺寸"
      description="抽屉有小、中、大三种预设尺寸，也可以自定义宽度和高度。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button @click="smallVisible = true">
          小尺寸
        </ui-button>
        <ui-button @click="mediumVisible = true">
          中等尺寸
        </ui-button>
        <ui-button @click="largeVisible = true">
          大尺寸
        </ui-button>
        <ui-button @click="customSizeVisible = true">
          自定义尺寸
        </ui-button>
      </div>

      <ui-drawer
        v-model="smallVisible"
        title="小尺寸抽屉"
        size="sm"
      >
        <p class="dark:text-gray-300">
          这是一个小尺寸的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="mediumVisible"
        title="中等尺寸抽屉"
        size="md"
      >
        <p class="dark:text-gray-300">
          这是一个中等尺寸的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="largeVisible"
        title="大尺寸抽屉"
        size="lg"
      >
        <p class="dark:text-gray-300">
          这是一个大尺寸的抽屉
        </p>
      </ui-drawer>

      <ui-drawer
        v-model="customSizeVisible"
        title="自定义尺寸抽屉"
        width="600"
      >
        <div class="dark:text-gray-300">
          <p>这是一个自定义宽度的抽屉</p>
          <p>宽度设置为600px</p>
        </div>
      </ui-drawer>
    </ui-demo>

    <!-- 带页脚的抽屉 -->
    <ui-demo
      title="带页脚的抽屉"
      description="在抽屉底部添加操作按钮，常用于需要确认操作的场景。"
      :code="footerCode"
    >
      <ui-button type="primary" @click="withFooterVisible = true">
        带页脚的抽屉
      </ui-button>

      <ui-drawer
        v-model="withFooterVisible"
        title="表单提交"
        show-footer
        footer-bordered
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div class="p-4">
          <ui-input class="mb-4" placeholder="请输入名称" />
          <ui-textarea placeholder="请输入描述" />
        </div>
      </ui-drawer>
    </ui-demo>

    <!-- 全屏抽屉 -->
    <ui-demo
      title="全屏抽屉"
      description="抽屉可以全屏展示，适合展示大量内容或复杂操作。"
      :code="fullscreenCode"
    >
      <ui-button type="primary" @click="fullscreenVisible = true">
        全屏抽屉
      </ui-button>

      <ui-drawer
        v-model="fullscreenVisible"
        title="全屏抽屉"
        fullscreen
      >
        <div class="p-4">
          <h4 class="mb-4 text-lg font-medium dark:text-white">
            这是一个全屏抽屉
          </h4>
          <p class="mb-4 dark:text-gray-300">
            全屏抽屉适合展示大量内容或复杂操作。
          </p>
          <p class="dark:text-gray-300">
            抽屉内可以包含表单、表格、图表等各种复杂内容。
          </p>
        </div>
      </ui-drawer>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义抽屉的背景色、文本颜色和边框颜色。"
      :code="customStyleCode"
    >
      <ui-button @click="customDrawerVisible = true">
        自定义样式抽屉
      </ui-button>

      <ui-drawer
        v-model="customDrawerVisible"
        title="自定义样式"
        size="md"
        bg-color="#f0f9ff"
        text-color="#0369a1"
        border-color="#bae6fd"
      >
        <p>这是一个自定义样式的抽屉</p>
        <p>使用了蓝色主题</p>
      </ui-drawer>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Drawer组件的属性、事件和插槽。"
      :show-code="false"
      code=""
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
                modelValue / v-model
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉是否可见
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉标题
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
                placement
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉方向
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'left' | 'right' | 'top' | 'bottom'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                right
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                预设尺寸
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'sm' | 'md' | 'lg'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                md
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                width
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉宽度（左右方向有效）
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                height
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉高度（上下方向有效）
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                show-close
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示关闭按钮
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
                closable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可以通过点击遮罩关闭
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
                show-footer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示底部
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                footer-bordered
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                底部是否有边框
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok-text
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确认按钮文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确定
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                cancel-text
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                取消按钮文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                取消
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                fullscreen
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否全屏显示
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                bg-color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                背景颜色
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
                text-color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                文本颜色
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
                border-color
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                边框颜色
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
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
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉可见状态变更
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                open
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉打开时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                close
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉关闭时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击确定按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                cancel
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击取消按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
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
                抽屉内容
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉标题
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                footer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                抽屉底部
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>
