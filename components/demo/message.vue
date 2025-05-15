<script setup lang="ts" name="DemoMessage">
/**
 * Message 组件演示
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 初始版本
 * 更新日期: 2025-05-11 - 重构适配新的 Message API
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 使用消息服务
const message = useMessage()

// 消息配置
const duration = ref<number>(3000)
const position = ref('top')

// 基础用法演示
function showBasicMessage() {
  message.info('这是一条普通消息')
}

// 不同类型演示
function showSuccessMessage() {
  message.success('操作成功')
}

function showWarningMessage() {
  message.warning('警告：请注意风险')
}

function showErrorMessage() {
  message.error('错误：操作失败')
}

// 不同位置演示
function showPositionedMessage(pos: string) {
  message.info({
    content: `在 ${pos} 位置的消息`,
    position: pos as any,
  })
}

// 自定义配置演示
function showCustomMessage() {
  message.info({
    content: '自定义配置的消息',
    duration: duration.value,
    position: position.value as any,
  })
}

// 不自动关闭演示
function showPersistentMessage() {
  message.info({
    content: '这条消息不会自动关闭，需要手动关闭',
    duration: 0,
  })
}

// 在底部显示消息
function showBottomMessages() {
  message.success({
    content: '在底部显示的成功消息',
    position: 'bottom',
  })

  setTimeout(() => {
    message.warning({
      content: '在底部显示的警告消息',
      position: 'bottom',
    })
  }, 300)

  setTimeout(() => {
    message.error({
      content: '在底部显示的错误消息',
      position: 'bottom',
    })
  }, 600)
}

// 链式调用演示
function showChainedMessages() {
  message.info('第一条消息')

  setTimeout(() => {
    message.success('第二条消息')
  }, 1000)

  setTimeout(() => {
    message.warning('第三条消息')
  }, 2000)

  setTimeout(() => {
    message.error('第四条消息')
  }, 3000)
}

// 关闭所有消息
function closeAllMessages() {
  message.clearAll()
}

// 代码示例
const basicCode = `<ui-button @click="showBasicMessage">
  显示消息
</ui-button>

<script setup>
const message = useMessage()

function showBasicMessage() {
  message.info('这是一条普通消息')
}
<\/script>`

const typesCode = `<ui-button type="primary" @click="showBasicMessage">
  普通消息
</ui-button>
<ui-button type="success" @click="showSuccessMessage">
  成功消息
</ui-button>
<ui-button type="warning" @click="showWarningMessage">
  警告消息
</ui-button>
<ui-button type="danger" @click="showErrorMessage">
  错误消息
</ui-button>

<script setup>
const message = useMessage()

function showBasicMessage() {
  message.info('这是一条普通消息')
}

function showSuccessMessage() {
  message.success('操作成功')
}

function showWarningMessage() {
  message.warning('警告：请注意风险')
}

function showErrorMessage() {
  message.error('错误：操作失败')
}
<\/script>`

const positionCode = `<ui-button @click="showPositionedMessage('top')">
  顶部
</ui-button>
<ui-button @click="showPositionedMessage('bottom')">
  底部
</ui-button>

<script setup>
const message = useMessage()

function showPositionedMessage(pos) {
  message.info({
    content: \`在 \${pos} 位置的消息\`,
    position: pos,
  })
}
<\/script>`

const customCode = `<div class="demo-message__form">
  <div class="demo-message__form-item">
    <label>持续时间 (毫秒):</label>
    <ui-input v-model.number="duration" type="number" />
  </div>
  <div class="demo-message__form-item">
    <label>位置:</label>
    <ui-select v-model="position">
      <option value="top">顶部</option>
      <option value="bottom">底部</option>
    </ui-select>
  </div>
</div>

<ui-button type="primary" @click="showCustomMessage">
  显示自定义消息
</ui-button>

<script setup>
const message = useMessage()
const duration = ref(3000)
const position = ref('top')

function showCustomMessage() {
  message.info({
    content: '自定义配置的消息',
    duration: duration.value,
    position: position.value,
  })
}
<\/script>`

const advancedCode = `<ui-button @click="showPersistentMessage">
  不自动关闭的消息
</ui-button>
<ui-button @click="showBottomMessages">
  底部显示多条消息
</ui-button>
<ui-button @click="showChainedMessages">
  链式显示消息
</ui-button>
<ui-button @click="closeAllMessages">
  关闭所有消息
</ui-button>

<script setup>
const message = useMessage()

// 不自动关闭演示
function showPersistentMessage() {
  message.info({
    content: '这条消息不会自动关闭，需要手动关闭',
    duration: 0,
  })
}

// 在底部显示消息
function showBottomMessages() {
  message.success({
    content: '在底部显示的成功消息',
    position: 'bottom',
  })

  setTimeout(() => {
    message.warning({
      content: '在底部显示的警告消息',
      position: 'bottom',
    })
  }, 300)

  setTimeout(() => {
    message.error({
      content: '在底部显示的错误消息',
      position: 'bottom',
    })
  }, 600)
}

// 链式调用演示
function showChainedMessages() {
  message.info('第一条消息')

  setTimeout(() => {
    message.success('第二条消息')
  }, 1000)

  setTimeout(() => {
    message.warning('第三条消息')
  }, 2000)

  setTimeout(() => {
    message.error('第四条消息')
  }, 3000)
}

// 关闭所有消息
function closeAllMessages() {
  message.clearAll()
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Message 消息提示
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      消息提示是一种轻量级的反馈方式，可以在不影响用户操作的情况下轻松地展示简短的信息。常用于主动操作后的反馈提示。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最简单的消息提示，使用 useMessage 组合式函数调用。"
      :code="basicCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showBasicMessage">
          显示消息
        </ui-button>
      </div>
    </ui-demo>

    <!-- 消息类型 -->
    <ui-demo
      title="消息类型"
      description="有四种类型的消息：普通消息、成功消息、警告消息和错误消息。"
      :code="typesCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button type="primary" @click="showBasicMessage">
          普通消息
        </ui-button>
        <ui-button type="success" @click="showSuccessMessage">
          成功消息
        </ui-button>
        <ui-button type="warning" @click="showWarningMessage">
          警告消息
        </ui-button>
        <ui-button type="danger" @click="showErrorMessage">
          错误消息
        </ui-button>
      </div>
    </ui-demo>

    <!-- 消息位置 -->
    <ui-demo
      title="消息位置"
      description="可以自定义消息显示的位置，支持顶部和底部两种位置。"
      :code="positionCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showPositionedMessage('top')">
          顶部
        </ui-button>
        <ui-button @click="showPositionedMessage('bottom')">
          底部
        </ui-button>
      </div>
    </ui-demo>

    <!-- 自定义配置 -->
    <ui-demo
      title="自定义配置"
      description="可以自定义消息的持续时间和显示位置。"
      :code="customCode"
    >
      <div class="grid grid-cols-1 mb-4 gap-4 sm:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label class="font-medium">持续时间 (毫秒):</label>
          <ui-input v-model.number="duration" type="number" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium">位置:</label>
          <ui-select v-model="position">
            <option value="top">
              顶部
            </option>
            <option value="bottom">
              底部
            </option>
          </ui-select>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <ui-button type="primary" @click="showCustomMessage">
          显示自定义消息
        </ui-button>
      </div>
    </ui-demo>

    <!-- 高级用法 -->
    <ui-demo
      title="高级用法"
      description="更多高级用法示例，包括不自动关闭、多条消息、链式调用和关闭所有消息。"
      :code="advancedCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showPersistentMessage">
          不自动关闭的消息
        </ui-button>
        <ui-button @click="showBottomMessages">
          底部显示多条消息
        </ui-button>
        <ui-button @click="showChainedMessages">
          链式显示消息
        </ui-button>
        <ui-button @click="closeAllMessages">
          关闭所有消息
        </ui-button>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-message__section {
  margin-bottom: 2rem;
}

.demo-message__description {
  margin-bottom: 1rem;
  color: var(--ui-color-text-secondary, #6b7280);
}

.demo-message__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.demo-message__form {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.demo-message__form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-message__form-item label {
  font-weight: 500;
  color: var(--ui-color-text, #374151);
}
</style>
