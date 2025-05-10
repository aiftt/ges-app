<script setup lang="ts" name="UiMessage">
/**
 * 消息提示组件
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-12 - 修复 Nuxt 兼容性问题
 * 更新日期: 2025-05-10 - 修复在非Nuxt上下文环境中的错误
 * 更新日期: 2025-05-11 - 重构实现，简化代码，参考 nuxt-ges-app 项目
 * 更新日期: 2025-05-14 - 重构样式，使用CSS变量实现主题
 */

import { computed } from 'vue'
import { useMessage } from '~/composables/useMessage'

const { messages, close } = useMessage()

// 根据位置分组消息
const messagesByPosition = computed(() => {
  const result: Record<string, any[]> = {
    top: [],
    bottom: [],
  }

  for (const message of messages.value) {
    const position = message.position || 'top'
    result[position].push(message)
  }

  return result
})

// 根据类型获取图标名称
function getIconName(type: string): string {
  switch (type) {
    case 'success':
      return 'carbon:checkmark-filled'
    case 'error':
      return 'carbon:error-filled'
    case 'warning':
      return 'carbon:warning-filled'
    case 'info':
    default:
      return 'carbon:information-filled'
  }
}

// 获取消息样式类名
function getMessageClass(type: string): string {
  return `ui-message-item ui-message-item--${type}`
}
</script>

<template>
  <Teleport to="body">
    <!-- 顶部消息 -->
    <div v-if="messagesByPosition.top.length" class="ui-message-container ui-message-top">
      <TransitionGroup name="message-fade">
        <div
          v-for="message in messagesByPosition.top"
          :key="message.id"
          :class="getMessageClass(message.type || 'info')"
        >
          <ClientOnly>
            <ui-icon
              :icon="getIconName(message.type || 'info')"
              class="ui-message-icon"
            />
          </ClientOnly>
          <span class="ui-message-content">{{ message.content }}</span>
          <!-- 显示关闭按钮，当duration为0时表示需要手动关闭 -->
          <ClientOnly v-if="message.duration === 0">
            <ui-button
              class="ui-message-close-btn"
              @click="close(message.id)"
            >
              <ui-icon icon="carbon:close" />
            </ui-button>
          </ClientOnly>
        </div>
      </TransitionGroup>
    </div>

    <!-- 底部消息 -->
    <div v-if="messagesByPosition.bottom.length" class="ui-message-container ui-message-bottom">
      <TransitionGroup name="message-fade">
        <div
          v-for="message in messagesByPosition.bottom"
          :key="message.id"
          :class="getMessageClass(message.type || 'info')"
        >
          <ClientOnly>
            <ui-icon
              :icon="getIconName(message.type || 'info')"
              class="ui-message-icon"
            />
          </ClientOnly>
          <span class="ui-message-content">{{ message.content }}</span>
          <!-- 显示关闭按钮，当duration为0时表示需要手动关闭 -->
          <ClientOnly v-if="message.duration === 0">
            <ui-button
              class="ui-message-close-btn"
              @click="close(message.id)"
            >
              <ui-icon icon="carbon:close" />
            </ui-button>
          </ClientOnly>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.ui-message-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ui-spacing-sm, 0.5rem);
  z-index: var(--ui-z-index-50, 9999);
  pointer-events: none;
  max-width: 80vw;
}

.ui-message-top {
  top: var(--ui-spacing-md, 1.5rem);
}

.ui-message-bottom {
  bottom: var(--ui-spacing-md, 1.5rem);
}

.ui-message-item {
  display: flex;
  align-items: center;
  padding: var(--ui-spacing-xs, 0.25rem) var(--ui-spacing, 1rem);
  border-radius: var(--ui-radius-lg, 0.5rem);
  box-shadow: var(--ui-shadow-md, 0 2px 8px rgba(0, 0, 0, 0.15));
  max-width: 100%;
  pointer-events: auto;
  font-size: var(--ui-font-size-sm, 0.875rem);
  border-width: 1px;
  border-style: solid;
}

.ui-message-icon {
  margin-right: var(--ui-spacing-xs, 0.25rem);
  flex-shrink: 0;
}

.ui-message-content {
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}

.ui-message-close-btn {
  margin-left: var(--ui-spacing-xs, 0.25rem);
  height: 1rem;
  width: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.ui-message-close-btn:hover {
  opacity: 1;
}

/* 消息类型样式 */
.ui-message-item--info {
  background-color: var(--ui-alert-info-bg, #e6f4ff);
  color: var(--ui-alert-info-color, #0958d9);
  border-color: var(--ui-alert-info-border, #91caff);
}

.ui-message-item--success {
  background-color: var(--ui-alert-success-bg, #f6ffed);
  color: var(--ui-alert-success-color, #389e0d);
  border-color: var(--ui-alert-success-border, #b7eb8f);
}

.ui-message-item--warning {
  background-color: var(--ui-alert-warning-bg, #fffbe6);
  color: var(--ui-alert-warning-color, #d48806);
  border-color: var(--ui-alert-warning-border, #ffe58f);
}

.ui-message-item--error {
  background-color: var(--ui-alert-error-bg, #fff2f0);
  color: var(--ui-alert-error-color, #cf1322);
  border-color: var(--ui-alert-error-border, #ffccc7);
}

/* 深色模式 */
:root.dark .ui-message-item--info {
  background-color: var(--ui-alert-info-bg, rgba(24, 144, 255, 0.1));
  border-color: var(--ui-alert-info-border, rgba(24, 144, 255, 0.2));
  color: var(--ui-alert-info-color, #40a9ff);
}

:root.dark .ui-message-item--success {
  background-color: var(--ui-alert-success-bg, rgba(82, 196, 26, 0.1));
  border-color: var(--ui-alert-success-border, rgba(82, 196, 26, 0.2));
  color: var(--ui-alert-success-color, #73d13d);
}

:root.dark .ui-message-item--warning {
  background-color: var(--ui-alert-warning-bg, rgba(250, 173, 20, 0.1));
  border-color: var(--ui-alert-warning-border, rgba(250, 173, 20, 0.2));
  color: var(--ui-alert-warning-color, #ffc53d);
}

:root.dark .ui-message-item--error {
  background-color: var(--ui-alert-error-bg, rgba(245, 34, 45, 0.1));
  border-color: var(--ui-alert-error-border, rgba(245, 34, 45, 0.2));
  color: var(--ui-alert-error-color, #ff4d4f);
}

/* 动画效果 */
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.ui-message-bottom .message-fade-enter-from,
.ui-message-bottom .message-fade-leave-to {
  transform: translateY(10px);
}
</style>
