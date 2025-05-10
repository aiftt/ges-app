<script setup lang="ts" name="UiNotification">
/**
 * 通知提示组件
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
 */

import { computed } from 'vue'
import { useNotification } from '~/composables/useNotification'

const { notifications, close } = useNotification()

// 根据位置分组通知
const notificationsByPosition = computed(() => {
  const result: Record<string, any[]> = {
    'top-right': [],
    'top-left': [],
    'bottom-right': [],
    'bottom-left': [],
  }

  for (const notification of notifications.value) {
    const position = notification.position || 'top-right'
    result[position].push(notification)
  }

  return result
})

// 根据类型获取图标名称
function getIconName(notification: any): string {
  // 如果有自定义图标，优先使用
  if (notification.icon) {
    return notification.icon
  }

  // 否则根据类型返回默认图标
  switch (notification.type) {
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

// 处理通知点击
function handleNotificationClick(notification: any) {
  if (notification.onClick) {
    notification.onClick()
  }
}

// 获取通知样式类名
function getNotificationClass(type: string): string {
  return `ui-notification-item ui-notification-item--${type}`
}
</script>

<template>
  <Teleport to="body">
    <!-- 右上角通知 -->
    <div v-if="notificationsByPosition['top-right'].length" class="ui-notification-container ui-notification-top-right">
      <TransitionGroup name="notification-right">
        <div
          v-for="notification in notificationsByPosition['top-right']"
          :key="notification.id"
          :class="getNotificationClass(notification.type || 'info')"
          @click="handleNotificationClick(notification)"
        >
          <div class="ui-notification-header">
            <ClientOnly>
              <ui-icon
                :icon="getIconName(notification)"
                class="ui-notification-icon"
              />
            </ClientOnly>
            <span class="ui-notification-title">{{ notification.title }}</span>
            <ClientOnly v-if="notification.showClose">
              <ui-button
                class="ui-notification-close-btn"
                @click.stop="close(notification.id)"
              >
                <ui-icon icon="carbon:close" />
              </ui-button>
            </ClientOnly>
          </div>
          <div v-if="notification.content" class="ui-notification-content">
            {{ notification.content }}
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- 左上角通知 -->
    <div v-if="notificationsByPosition['top-left'].length" class="ui-notification-container ui-notification-top-left">
      <TransitionGroup name="notification-left">
        <div
          v-for="notification in notificationsByPosition['top-left']"
          :key="notification.id"
          :class="getNotificationClass(notification.type || 'info')"
          @click="handleNotificationClick(notification)"
        >
          <div class="ui-notification-header">
            <ClientOnly>
              <ui-icon
                :icon="getIconName(notification)"
                class="ui-notification-icon"
              />
            </ClientOnly>
            <span class="ui-notification-title">{{ notification.title }}</span>
            <ClientOnly v-if="notification.showClose">
              <ui-button
                class="ui-notification-close-btn"
                @click.stop="close(notification.id)"
              >
                <ui-icon icon="carbon:close" />
              </ui-button>
            </ClientOnly>
          </div>
          <div v-if="notification.content" class="ui-notification-content">
            {{ notification.content }}
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- 右下角通知 -->
    <div v-if="notificationsByPosition['bottom-right'].length" class="ui-notification-container ui-notification-bottom-right">
      <TransitionGroup name="notification-right">
        <div
          v-for="notification in notificationsByPosition['bottom-right']"
          :key="notification.id"
          :class="getNotificationClass(notification.type || 'info')"
          @click="handleNotificationClick(notification)"
        >
          <div class="ui-notification-header">
            <ClientOnly>
              <ui-icon
                :icon="getIconName(notification)"
                class="ui-notification-icon"
              />
            </ClientOnly>
            <span class="ui-notification-title">{{ notification.title }}</span>
            <ClientOnly v-if="notification.showClose">
              <ui-button
                class="ui-notification-close-btn"
                @click.stop="close(notification.id)"
              >
                <ui-icon icon="carbon:close" />
              </ui-button>
            </ClientOnly>
          </div>
          <div v-if="notification.content" class="ui-notification-content">
            {{ notification.content }}
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- 左下角通知 -->
    <div v-if="notificationsByPosition['bottom-left'].length" class="ui-notification-container ui-notification-bottom-left">
      <TransitionGroup name="notification-left">
        <div
          v-for="notification in notificationsByPosition['bottom-left']"
          :key="notification.id"
          :class="getNotificationClass(notification.type || 'info')"
          @click="handleNotificationClick(notification)"
        >
          <div class="ui-notification-header">
            <ClientOnly>
              <ui-icon
                :icon="getIconName(notification)"
                class="ui-notification-icon"
              />
            </ClientOnly>
            <span class="ui-notification-title">{{ notification.title }}</span>
            <ClientOnly v-if="notification.showClose">
              <ui-button
                class="ui-notification-close-btn"
                @click.stop="close(notification.id)"
              >
                <ui-icon icon="carbon:close" />
              </ui-button>
            </ClientOnly>
          </div>
          <div v-if="notification.content" class="ui-notification-content">
            {{ notification.content }}
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.ui-notification-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: var(--ui-spacing-sm, 0.5rem);
  z-index: var(--ui-z-index-50, 9999);
  width: 320px;
  max-width: calc(100vw - 32px);
  margin: var(--ui-spacing-md, 1rem);
}

.ui-notification-top-right {
  top: 0;
  right: 0;
}

.ui-notification-top-left {
  top: 0;
  left: 0;
}

.ui-notification-bottom-right {
  bottom: 0;
  right: 0;
}

.ui-notification-bottom-left {
  bottom: 0;
  left: 0;
}

.ui-notification-item {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: var(--ui-radius-lg, 0.5rem);
  box-shadow: var(--ui-shadow-md, 0 2px 8px rgba(0, 0, 0, 0.15));
  overflow: hidden;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-left-width: 4px;
}

.ui-notification-header {
  display: flex;
  align-items: center;
  padding: var(--ui-spacing-sm, 0.5rem) var(--ui-spacing, 1rem);
  position: relative;
}

.ui-notification-icon {
  margin-right: var(--ui-spacing-xs, 0.25rem);
  flex-shrink: 0;
}

.ui-notification-title {
  font-weight: var(--ui-font-weight-medium, 500);
  flex-grow: 1;
  font-size: var(--ui-font-size-md, 1rem);
}

.ui-notification-content {
  padding: 0 var(--ui-spacing, 1rem) var(--ui-spacing-sm, 0.5rem);
  color: var(--ui-color-text-secondary, #666);
  font-size: var(--ui-font-size-sm, 0.875rem);
}

.ui-notification-close-btn {
  height: 1.5rem;
  width: 1.5rem;
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

.ui-notification-close-btn:hover {
  opacity: 1;
}

/* 通知类型样式 */
.ui-notification-item--info {
  background-color: var(--ui-notification-info-bg, white);
  color: var(--ui-notification-info-color, #0958d9);
  border-color: var(--ui-notification-info-border, #91caff);
}

.ui-notification-item--success {
  background-color: var(--ui-notification-success-bg, white);
  color: var(--ui-notification-success-color, #389e0d);
  border-color: var(--ui-notification-success-border, #b7eb8f);
}

.ui-notification-item--warning {
  background-color: var(--ui-notification-warning-bg, white);
  color: var(--ui-notification-warning-color, #d48806);
  border-color: var(--ui-notification-warning-border, #ffe58f);
}

.ui-notification-item--error {
  background-color: var(--ui-notification-error-bg, white);
  color: var(--ui-notification-error-color, #cf1322);
  border-color: var(--ui-notification-error-border, #ffccc7);
}

/* 深色模式 */
:root.dark .ui-notification-item {
  background-color: var(--ui-color-bg-dark, #1f2937);
}

:root.dark .ui-notification-item--info {
  border-color: var(--ui-notification-info-border-dark, rgba(24, 144, 255, 0.5));
  color: var(--ui-notification-info-color-dark, #40a9ff);
}

:root.dark .ui-notification-item--success {
  border-color: var(--ui-notification-success-border-dark, rgba(82, 196, 26, 0.5));
  color: var(--ui-notification-success-color-dark, #73d13d);
}

:root.dark .ui-notification-item--warning {
  border-color: var(--ui-notification-warning-border-dark, rgba(250, 173, 20, 0.5));
  color: var(--ui-notification-warning-color-dark, #ffc53d);
}

:root.dark .ui-notification-item--error {
  border-color: var(--ui-notification-error-border-dark, rgba(245, 34, 45, 0.5));
  color: var(--ui-notification-error-color-dark, #ff4d4f);
}

:root.dark .ui-notification-content {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

/* 动画效果 */
.notification-right-enter-active,
.notification-right-leave-active,
.notification-left-enter-active,
.notification-left-leave-active {
  transition: all 0.3s ease-out;
}

.notification-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notification-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.notification-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
