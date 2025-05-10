<script setup lang="ts" name="UiMessagebox">
/**
 * 消息弹框组件
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
 */

import { onBeforeUnmount, onMounted } from 'vue'
import { useMessageBox } from '~/composables/useMessageBox'

const { instances, close } = useMessageBox()

// 监听 ESC 按键
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    const visibleInstances = instances.value.filter(instance => instance.visible && instance.closeOnPressEscape)
    if (visibleInstances.length > 0) {
      // 关闭最后一个可见的实例
      close(visibleInstances[visibleInstances.length - 1].id, 'cancel')
    }
  }
}

// 处理点击确认按钮
function handleConfirm(id: string) {
  const instance = instances.value.find(instance => instance.id === id)
  if (instance) {
    close(id, 'confirm')
  }
}

// 处理点击取消按钮
function handleCancel(id: string) {
  close(id, 'cancel')
}

// 处理点击关闭按钮
function handleClose(id: string) {
  close(id, 'close')
}

// 处理点击蒙层
function handleModalClick(id: string) {
  const instance = instances.value.find(instance => instance.id === id)
  if (instance && instance.closeOnClickModal) {
    close(id, 'cancel')
  }
}

// 防止点击内容时关闭
function handleContentClick(event: Event) {
  event.stopPropagation()
}

// 获取图标名称
function getIconName(type: string): string {
  switch (type) {
    case 'success':
      return 'carbon:checkmark-filled'
    case 'warning':
      return 'carbon:warning-filled'
    case 'error':
      return 'carbon:error-filled'
    case 'info':
    default:
      return 'carbon:information-filled'
  }
}

// 添加和移除事件监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-for="instance in instances" :key="instance.id" class="ui-messagebox-wrapper">
      <Transition name="messagebox-fade">
        <div v-if="instance.visible" class="ui-messagebox-overlay" @click="handleModalClick(instance.id)">
          <div class="ui-messagebox" @click="handleContentClick">
            <!-- 标题栏 -->
            <div class="ui-messagebox-header">
              <div class="ui-messagebox-header-content">
                <ClientOnly>
                  <ui-icon
                    v-if="instance.icon || instance.type"
                    :icon="instance.icon || getIconName(instance.type || 'info')"
                    class="ui-messagebox-icon"
                    :class="`ui-messagebox-icon--${instance.type || 'info'}`"
                  />
                </ClientOnly>
                <span class="ui-messagebox-title">{{ instance.title }}</span>
              </div>
              <ClientOnly v-if="instance.showClose">
                <ui-button
                  class="ui-messagebox-close-btn"
                  @click="handleClose(instance.id)"
                >
                  <ui-icon icon="carbon:close" />
                </ui-button>
              </ClientOnly>
            </div>

            <!-- 内容区 -->
            <div class="ui-messagebox-body">
              <div class="ui-messagebox-content">
                {{ instance.content }}
              </div>
            </div>

            <!-- 按钮区 -->
            <div class="ui-messagebox-footer">
              <ui-button
                v-if="instance.showCancelButton"
                class="ui-messagebox-btn"
                @click="handleCancel(instance.id)"
              >
                {{ instance.cancelButtonText }}
              </ui-button>
              <ui-button
                class="ui-messagebox-btn ui-messagebox-btn--primary"
                :loading="instance.confirmButtonLoading"
                @click="handleConfirm(instance.id)"
              >
                {{ instance.confirmButtonText }}
              </ui-button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.ui-messagebox-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--ui-z-index-60, 10000);
  pointer-events: none;
}

.ui-messagebox-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.ui-messagebox {
  width: 420px;
  max-width: 90vw;
  background-color: var(--ui-color-bg, white);
  border-radius: var(--ui-radius-lg, 0.5rem);
  box-shadow: var(--ui-shadow-lg, 0 4px 16px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.ui-messagebox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ui-spacing, 1rem);
  border-bottom: 1px solid var(--ui-color-border, #edf2f7);
}

.ui-messagebox-header-content {
  display: flex;
  align-items: center;
}

.ui-messagebox-title {
  font-size: var(--ui-font-size-lg, 1.125rem);
  font-weight: var(--ui-font-weight-medium, 500);
  color: var(--ui-color-text, #1a202c);
}

.ui-messagebox-close-btn {
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
}

.ui-messagebox-close-btn:hover {
  opacity: 1;
}

.ui-messagebox-body {
  padding: var(--ui-spacing-lg, 1.5rem);
  overflow-y: auto;
}

.ui-messagebox-icon {
  margin-right: var(--ui-spacing, 1rem);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.ui-messagebox-icon--info {
  color: var(--ui-color-info, #3b82f6);
}

.ui-messagebox-icon--success {
  color: var(--ui-color-success, #10b981);
}

.ui-messagebox-icon--warning {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-messagebox-icon--error {
  color: var(--ui-color-error, #ef4444);
}

.ui-messagebox-content {
  color: var(--ui-color-text, #1a202c);
  font-size: var(--ui-font-size-md, 1rem);
  line-height: 1.5;
}

.ui-messagebox-footer {
  padding: var(--ui-spacing, 1rem);
  display: flex;
  justify-content: flex-end;
  gap: var(--ui-spacing-sm, 0.5rem);
  border-top: 1px solid var(--ui-color-border, #edf2f7);
}

.ui-messagebox-btn {
  min-width: 80px;
}

.ui-messagebox-btn--primary {
  background-color: var(--ui-color-primary, #10b981);
  color: white;
}

/* 深色模式 */
:root.dark .ui-messagebox {
  background-color: var(--ui-color-bg-dark, #1f2937);
  border-color: var(--ui-color-border-dark, #374151);
}

:root.dark .ui-messagebox-header,
:root.dark .ui-messagebox-footer {
  border-color: var(--ui-color-border-dark, #374151);
}

:root.dark .ui-messagebox-title,
:root.dark .ui-messagebox-content {
  color: var(--ui-color-text-dark, #f3f4f6);
}

/* 动画效果 */
.messagebox-fade-enter-active,
.messagebox-fade-leave-active {
  transition: all 0.3s;
}

.messagebox-fade-enter-from,
.messagebox-fade-leave-to {
  opacity: 0;
}

.messagebox-fade-enter-from .ui-messagebox,
.messagebox-fade-leave-to .ui-messagebox {
  transform: scale(0.9);
}
</style>
