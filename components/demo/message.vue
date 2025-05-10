<script setup lang="ts" name="DemoMessage">
/**
 * Message 组件演示
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 初始版本
 * 更新日期: 2025-05-11 - 重构适配新的 Message API
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
</script>

<template>
  <div class="demo-message">
    <div class="demo-message__section">
      <ui-typography-title :level="3">
        基础用法
      </ui-typography-title>
      <p class="demo-message__description">
        消息提示是一种轻量级的反馈方式，可以在不影响用户操作的情况下轻松地展示简短的信息。
      </p>
      <div class="demo-message__actions">
        <ui-button @click="showBasicMessage">
          显示消息
        </ui-button>
      </div>
    </div>

    <div class="demo-message__section">
      <ui-typography-title :level="3">
        消息类型
      </ui-typography-title>
      <p class="demo-message__description">
        有四种类型的消息：普通消息、成功消息、警告消息和错误消息。
      </p>
      <div class="demo-message__actions">
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
    </div>

    <div class="demo-message__section">
      <ui-typography-title :level="3">
        消息位置
      </ui-typography-title>
      <p class="demo-message__description">
        可以自定义消息显示的位置，支持顶部和底部两种位置。
      </p>
      <div class="demo-message__actions">
        <ui-button @click="showPositionedMessage('top')">
          顶部
        </ui-button>
        <ui-button @click="showPositionedMessage('bottom')">
          底部
        </ui-button>
      </div>
    </div>

    <div class="demo-message__section">
      <ui-typography-title :level="3">
        自定义配置
      </ui-typography-title>
      <p class="demo-message__description">
        可以自定义消息的持续时间和显示位置。
      </p>
      <div class="demo-message__form">
        <div class="demo-message__form-item">
          <label>持续时间 (毫秒):</label>
          <ui-input v-model.number="duration" type="number" />
        </div>
        <div class="demo-message__form-item">
          <label>位置:</label>
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
      <div class="demo-message__actions">
        <ui-button type="primary" @click="showCustomMessage">
          显示自定义消息
        </ui-button>
      </div>
    </div>

    <div class="demo-message__section">
      <ui-typography-title :level="3">
        高级用法
      </ui-typography-title>
      <p class="demo-message__description">
        更多高级用法示例。
      </p>
      <div class="demo-message__actions">
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
    </div>
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
