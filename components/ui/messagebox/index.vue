<script setup lang="ts" name="UiMessageBox">
/**
 * MessageBox 消息弹框组件
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-11 - 修复布局问题，改进图标位置和滚动逻辑
 */

import type { MessageBoxType } from './types'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 是否可见
   */
  modelValue?: boolean
  /**
   * 消息内容
   */
  message: string
  /**
   * 标题
   */
  title?: string
  /**
   * 类型
   */
  type?: MessageBoxType
  /**
   * 是否显示关闭图标
   */
  showClose?: boolean
  /**
   * 是否显示取消按钮
   */
  showCancelButton?: boolean
  /**
   * 是否显示确认按钮
   */
  showConfirmButton?: boolean
  /**
   * 确认按钮文本
   */
  confirmButtonText?: string
  /**
   * 取消按钮文本
   */
  cancelButtonText?: string
  /**
   * 确认按钮类型
   */
  confirmButtonType?: 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 取消按钮类型
   */
  cancelButtonType?: 'default' | 'primary' | 'danger'
  /**
   * 是否显示输入框
   */
  showInput?: boolean
  /**
   * 输入框类型
   */
  inputType?: string
  /**
   * 输入框占位文本
   */
  inputPlaceholder?: string
  /**
   * 输入框初始值
   */
  inputValue?: string
  /**
   * 是否以HTML方式渲染消息
   */
  dangerouslyUseHTMLString?: boolean
  /**
   * 是否显示图标
   */
  showIcon?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 是否在点击遮罩层时关闭
   */
  closeOnClickMask?: boolean
  /**
   * 是否在按下ESC键时关闭
   */
  closeOnPressEscape?: boolean
  /**
   * 自定义z-index
   */
  zIndex?: number
  /**
   * 自定义class
   */
  customClass?: string
  /**
   * 自定义宽度
   */
  width?: string | number
  /**
   * 弹框顶部距离
   */
  top?: string | number
  /**
   * 确认按钮加载状态
   */
  confirmLoading?: boolean
  /**
   * 取消按钮加载状态
   */
  cancelLoading?: boolean
  /**
   * 自定义高度
   */
  height?: string | number
}>(), {
  modelValue: false,
  type: 'info',
  showClose: true,
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'primary',
  cancelButtonType: 'default',
  showInput: false,
  inputType: 'text',
  inputPlaceholder: '请输入',
  dangerouslyUseHTMLString: false,
  showIcon: true,
  closeOnClickMask: true,
  closeOnPressEscape: true,
  zIndex: 2000,
  width: 420,
  top: 100,
  confirmLoading: false,
  cancelLoading: false,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', value?: string): void
  (e: 'cancel'): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'update:inputValue', value: string): void
}>()

// 图标映射
const iconMap = {
  info: 'heroicons:information-circle',
  success: 'heroicons:check-circle',
  warning: 'heroicons:exclamation-triangle',
  error: 'heroicons:x-circle',
  confirm: 'heroicons:question-mark-circle',
}

// 计算当前图标
const currentIcon = computed(() => {
  if (props.icon)
    return props.icon
  return iconMap[props.type]
})

// 输入框值
const inputValue = ref(props.inputValue || '')

// 更新输入值
watch(() => props.inputValue, (newVal) => {
  if (newVal !== undefined) {
    inputValue.value = newVal
  }
})

// 当输入值变化时，触发事件
watch(inputValue, (newVal) => {
  emit('update:inputValue', newVal)
})

// 弹框样式
const dialogStyle = computed(() => {
  const style: Record<string, string> = {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    marginTop: typeof props.top === 'number' ? `${props.top}px` : props.top,
    zIndex: props.zIndex.toString(),
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return style
})

// 处理确认
function handleConfirm() {
  if (props.confirmLoading)
    return

  emit('confirm', props.showInput ? inputValue.value : undefined)
}

// 处理取消
function handleCancel() {
  if (props.cancelLoading)
    return

  emit('cancel')
  close()
}

// 处理关闭
function handleClose() {
  emit('close')
  close()
}

// 点击遮罩层
function handleMaskClick() {
  if (props.closeOnClickMask) {
    close()
  }
}

// 处理键盘事件
function handleKeydown(e: KeyboardEvent) {
  // ESC键关闭
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    close()
  }
  // Enter键确认 (当焦点不在输入框中时)
  else if (e.key === 'Enter' && !props.showInput && document.activeElement?.tagName !== 'INPUT') {
    handleConfirm()
  }
}

// 关闭弹框
function close() {
  emit('update:modelValue', false)
}

// 打开弹框时聚焦输入框
const inputRef = ref<HTMLInputElement | null>(null)
watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    emit('open')
    if (props.showInput) {
      await nextTick()
      inputRef.value?.focus()
    }
  }
})

// 添加键盘事件监听
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

// 移除键盘事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ui-messagebox-fade">
      <div
        v-if="modelValue"
        class="ui-messagebox-wrapper"
        :style="{ zIndex }"
      >
        <!-- 遮罩层 -->
        <div class="ui-messagebox-mask" @click="handleMaskClick" />

        <!-- 弹框 -->
        <div
          class="ui-messagebox"
          :class="[
            customClass,
            `ui-messagebox--${type}`,
            { 'ui-messagebox--with-input': showInput },
          ]"
          :style="dialogStyle"
        >
          <!-- 关闭按钮 -->
          <div v-if="showClose" class="ui-messagebox__close" @click="handleClose">
            <ui-icon icon="heroicons:x-mark" />
          </div>

          <!-- 标题区域 -->
          <div v-if="title" class="ui-messagebox__header">
            <!-- 图标与标题放在一起 -->
            <div v-if="showIcon" class="ui-messagebox__icon">
              <ui-icon :icon="currentIcon" :class="`ui-messagebox__icon--${type}`" />
            </div>
            <div class="ui-messagebox__title">
              {{ title }}
            </div>
          </div>

          <!-- 内容区域 (可滚动) -->
          <div class="ui-messagebox__body">
            <!-- 消息内容 -->
            <div class="ui-messagebox__message">
              <template v-if="dangerouslyUseHTMLString">
                <div v-html="message" />
              </template>
              <template v-else>
                {{ message }}
              </template>
            </div>

            <!-- 输入框 -->
            <div v-if="showInput" class="ui-messagebox__input">
              <ui-input
                ref="inputRef"
                v-model="inputValue"
                :type="inputType"
                :placeholder="inputPlaceholder"
              />
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="ui-messagebox__footer">
            <ui-button
              v-if="showCancelButton"
              :type="cancelButtonType"
              class="ui-messagebox__cancel"
              :loading="cancelLoading"
              @click="handleCancel"
            >
              {{ cancelButtonText }}
            </ui-button>

            <ui-button
              v-if="showConfirmButton"
              :type="confirmButtonType"
              class="ui-messagebox__confirm"
              :loading="confirmLoading"
              @click="handleConfirm"
            >
              {{ confirmButtonText }}
            </ui-button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ui-messagebox-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ui-messagebox-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.ui-messagebox {
  position: relative;
  margin: 0 auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 100px);
  width: 100%;
  overflow: hidden; /* 防止溢出 */
}

.ui-messagebox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 16px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.2s;
  z-index: 1; /* 确保在顶层 */
}

.ui-messagebox__close:hover {
  color: rgba(0, 0, 0, 0.75);
}

.ui-messagebox__header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.ui-messagebox__icon {
  font-size: 24px;
  margin-right: 10px;
  flex-shrink: 0;
}

.ui-messagebox__icon--info {
  color: var(--ui-color-info, #1890ff);
}

.ui-messagebox__icon--success {
  color: var(--ui-color-success, #52c41a);
}

.ui-messagebox__icon--warning {
  color: var(--ui-color-warning, #faad14);
}

.ui-messagebox__icon--error {
  color: var(--ui-color-error, #f5222d);
}

.ui-messagebox__icon--confirm {
  color: var(--ui-color-warning, #faad14);
}

.ui-messagebox__title {
  font-size: 18px;
  font-weight: 500;
  color: var(--ui-color-text, #333);
  flex: 1;
  word-break: break-word;
}

.ui-messagebox__body {
  flex: 1;
  overflow-y: auto; /* 只在内容区域滚动 */
  padding-right: 5px; /* 为滚动条留出空间 */
}

.ui-messagebox__message {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  color: var(--ui-color-text-secondary, #666);
  word-break: break-word;
}

.ui-messagebox__input {
  margin-bottom: 16px;
}

.ui-messagebox__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.ui-messagebox--with-input .ui-messagebox__message {
  margin-bottom: 8px;
}

/* 动画 */
.ui-messagebox-fade-enter-active,
.ui-messagebox-fade-leave-active {
  transition: opacity 0.2s; /* 减少动画时间，提升体验 */
}

.ui-messagebox-fade-enter-active .ui-messagebox,
.ui-messagebox-fade-leave-active .ui-messagebox {
  transition:
    transform 0.2s,
    opacity 0.2s;
}

.ui-messagebox-fade-enter-from,
.ui-messagebox-fade-leave-to {
  opacity: 0;
}

.ui-messagebox-fade-enter-from .ui-messagebox,
.ui-messagebox-fade-leave-to .ui-messagebox {
  transform: translateY(-20px);
  opacity: 0;
}

/* 暗黑模式 */
:root.dark .ui-messagebox {
  background-color: #1f1f1f;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}

:root.dark .ui-messagebox__close {
  color: rgba(255, 255, 255, 0.45);
}

:root.dark .ui-messagebox__close:hover {
  color: rgba(255, 255, 255, 0.75);
}

:root.dark .ui-messagebox__title {
  color: var(--ui-color-text, #e0e0e0);
}

:root.dark .ui-messagebox__message {
  color: var(--ui-color-text-secondary, #a0a0a0);
}

:root.dark .ui-messagebox__footer {
  border-top-color: #2c2c2c;
}
</style>
