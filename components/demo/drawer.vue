<script setup lang="ts" name="DemoDrawer">
/**
 * Drawer 抽屉组件示例
 * 创建日期: 2024-06-25
 * 作者: aiftt
 * 更新日期: 2024-06-25 - 初始版本
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
</script>

<template>
  <div class="demo-drawer">
    <h2 class="mb-6 text-xl font-bold">
      Drawer 抽屉组件
    </h2>

    <!-- 基础抽屉 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        最基本的抽屉，点击按钮从右侧滑出，点击遮罩或关闭按钮关闭。
      </p>

      <ui-button type="primary" @click="basicVisible = true">
        打开抽屉
      </ui-button>

      <ui-drawer
        v-model="basicVisible"
        title="基础抽屉"
        @open="handleOpen"
        @close="handleClose"
      >
        <p>这是一个基础抽屉的内容</p>
        <p>点击遮罩层或右上角叉号可以关闭</p>
      </ui-drawer>
    </section>

    <!-- 不同方向的抽屉 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不同方向
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        抽屉可以从不同方向滑出，支持左、右、上、下四个方向。
      </p>

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
    </section>

    <!-- 不同尺寸的抽屉 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不同尺寸
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        抽屉有小、中、大三种预设尺寸，也可以自定义宽度和高度。
      </p>

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
        v-model="customSizeVisible"
        title="自定义尺寸抽屉"
        width="600"
      >
        <p>这是一个自定义宽度的抽屉</p>
        <p>宽度设置为600px</p>
      </ui-drawer>
    </section>

    <!-- 带页脚的抽屉 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        带页脚的抽屉
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        在抽屉底部添加操作按钮，常用于需要确认操作的场景。
      </p>

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
    </section>

    <!-- 全屏抽屉 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        全屏抽屉
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        抽屉可以全屏展示，适合展示大量内容或复杂操作。
      </p>

      <ui-button type="primary" @click="fullscreenVisible = true">
        全屏抽屉
      </ui-button>

      <ui-drawer
        v-model="fullscreenVisible"
        title="全屏抽屉"
        fullscreen
      >
        <div class="p-4">
          <h4 class="mb-4 text-lg font-medium">
            这是一个全屏抽屉
          </h4>
          <p class="mb-4">
            全屏抽屉适合展示大量内容或复杂操作。
          </p>
          <p>抽屉内可以包含表单、表格、图表等各种复杂内容。</p>
        </div>
      </ui-drawer>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式
      </h3>
      <p class="mb-4 text-gray-500 dark:text-gray-400">
        可以自定义抽屉的背景色、文本颜色和边框颜色。
      </p>

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
    </section>
  </div>
</template>
