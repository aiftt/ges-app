<script setup lang="ts" name="DemoAlert">
/**
 * Alert 警告提示组件示例
 * 创建日期: 2024-06-24
 * 作者: aiftt
 * 更新日期: 2024-06-24 - 初始版本
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('AlertDemo')

// 自定义关闭处理
function handleClose() {
  logger.info('Alert已关闭')
}

// 控制是否可见
const visible = ref(true)
function toggleVisible() {
  visible.value = !visible.value
}

// 处理折叠切换
function handleToggle(expanded: boolean) {
  logger.info('折叠状态改变:', expanded ? '展开' : '折叠')
}
</script>

<template>
  <div class="demo-alert">
    <h2 class="mb-6 text-xl font-bold">
      Alert 警告提示
    </h2>

    <!-- 基础用法 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <ui-alert>
        这是一条信息提示
      </ui-alert>
    </section>

    <!-- 不同类型 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不同类型
      </h3>
      <ui-alert type="info">
        这是一条信息提示
      </ui-alert>
      <ui-alert type="success">
        这是一条成功提示
      </ui-alert>
      <ui-alert type="warning">
        这是一条警告提示
      </ui-alert>
      <ui-alert type="error">
        这是一条错误提示
      </ui-alert>
    </section>

    <!-- 不带图标 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不带图标
      </h3>
      <ui-alert type="info" :show-icon="false">
        这是一条不带图标的信息提示
      </ui-alert>
      <ui-alert type="success" :show-icon="false">
        这是一条不带图标的成功提示
      </ui-alert>
    </section>

    <!-- 自定义图标 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义图标
      </h3>
      <ui-alert type="info" icon="heroicons:light-bulb-20-solid">
        使用自定义图标的信息提示
      </ui-alert>
    </section>

    <!-- 带标题和描述 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        带标题和描述
      </h3>
      <ui-alert
        type="success"
        title="成功提示标题"
        description="这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。"
      />
      <ui-alert type="warning" title="警告提示标题">
        这是一段描述文字，用于提供更详细的信息说明，帮助用户理解通知内容。
      </ui-alert>
    </section>

    <!-- 可关闭的警告提示 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        可关闭的警告提示
      </h3>
      <div class="mb-4">
        <ui-alert
          type="info"
          closable
          title="可关闭的提示"
          description="点击右上角的关闭按钮可以关闭这个警告提示"
          @close="handleClose"
        />
      </div>
      <div class="flex items-center gap-4">
        <ui-button @click="toggleVisible">
          {{ visible ? '关闭' : '显示' }}警告提示
        </ui-button>
        <ui-alert v-if="visible" type="warning" closable>
          这是一个可通过外部控制的警告提示
        </ui-alert>
      </div>
    </section>

    <!-- 居中显示 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        居中显示
      </h3>
      <ui-alert
        type="info"
        center
        title="居中显示的标题"
        description="这是居中显示的描述文本，包括标题和内容都会居中对齐。"
      />
    </section>

    <!-- 无边框 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        无边框
      </h3>
      <ui-alert type="info" :border="false">
        这是一条没有边框的信息提示
      </ui-alert>
      <ui-alert type="success" :border="false">
        这是一条没有边框的成功提示
      </ui-alert>
    </section>

    <!-- 带阴影 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        带阴影
      </h3>
      <ui-alert type="warning" shadow>
        这是一条带有阴影效果的警告提示
      </ui-alert>
      <ui-alert type="error" shadow>
        这是一条带有阴影效果的错误提示
      </ui-alert>
    </section>

    <!-- 可折叠的提示 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        可折叠的提示
      </h3>
      <ui-alert
        type="info"
        collapsible
        title="可折叠的提示"
        description="点击标题或箭头图标可以展开或折叠这个提示的详细内容。这对于长内容的提示特别有用，可以节省页面空间。"
        @toggle="handleToggle"
      />
      <ui-alert
        type="warning"
        collapsible
        :default-open="false"
        title="默认折叠的提示"
        description="这个提示默认是折叠状态的，点击标题或箭头图标可以展开查看详细内容。"
      />
    </section>

    <!-- 自定义样式 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义样式
      </h3>
      <ui-alert
        bg-color="#edeafd"
        text-color="#5b21b6"
        border-color="#c4b5fd"
        border-radius="8px"
      >
        这是一个紫色主题的自定义样式提示
      </ui-alert>
      <ui-alert
        bg-color="#fee2e2"
        text-color="#7f1d1d"
        border-color="#fca5a5"
        shadow
      >
        这是一个深红色主题的自定义样式提示
      </ui-alert>
    </section>

    <!-- 使用插槽自定义 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        使用插槽自定义
      </h3>
      <ui-alert type="info" title="自定义内容">
        <template #description>
          <div>
            <p>这里可以放置任何自定义内容，比如：</p>
            <ul class="my-2 list-disc pl-6">
              <li>列表项1</li>
              <li>列表项2</li>
              <li>列表项3</li>
            </ul>
            <ui-button size="small" type="primary">
              操作按钮
            </ui-button>
          </div>
        </template>
      </ui-alert>
      <ui-alert type="success">
        <template #title>
          <div class="flex items-center gap-2">
            <ui-icon icon="heroicons:check-badge-20-solid" />
            <span>自定义标题内容</span>
          </div>
        </template>
        这是一个带有自定义标题的提示
      </ui-alert>
    </section>
  </div>
</template>
