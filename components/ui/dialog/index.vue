<script setup lang="ts" name="UiDialog">
/**
 * Dialog 对话框组件
 * 创建日期: 2024-08-04
 * 作者: aiftt
 * 更新日期: 2024-08-04 - 初始版本
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 是否显示对话框
   */
  modelValue?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 内容，也可以通过默认插槽提供
   */
  content?: string
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean
  /**
   * 关闭按钮图标
   */
  closeIcon?: string
  /**
   * 是否显示遮罩层
   */
  mask?: boolean
  /**
   * 点击遮罩层是否可关闭
   */
  maskClosable?: boolean
  /**
   * 设置对话框宽度
   */
  width?: string | number
  /**
   * 顶部距离
   */
  top?: string | number
  /**
   * 内容水平对齐方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 是否显示底部按钮
   */
  showFooter?: boolean
  /**
   * 确认按钮文本
   */
  okText?: string
  /**
   * 取消按钮文本
   */
  cancelText?: string
  /**
   * 确认按钮类型
   */
  okType?: 'primary' | 'danger'
  /**
   * 确认按钮加载状态
   */
  okLoading?: boolean
  /**
   * 确认按钮禁用状态
   */
  okDisabled?: boolean
  /**
   * 取消按钮禁用状态
   */
  cancelDisabled?: boolean
  /**
   * 是否在初始渲染时挂载
   */
  mountOnEnter?: boolean
  /**
   * 是否在隐藏时卸载
   */
  unmountOnExit?: boolean
  /**
   * 是否居中显示
   */
  centered?: boolean
  /**
   * 动画效果
   */
  animation?: 'fade' | 'zoom' | 'slide-up'
  /**
   * 是否支持ESC键关闭
   */
  escClosable?: boolean
  /**
   * 自定义z-index
   */
  zIndex?: number
  /**
   * 对话框类型
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm'
  /**
   * 是否为简单模式（没有标题栏，只有内容和按钮）
   */
  simple?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 是否显示图标
   */
  showIcon?: boolean
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  textColor?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 自定义按钮颜色
   */
  buttonColor?: string
}>(), {
  modelValue: false,
  closable: true,
  closeIcon: 'heroicons:x-mark-20-solid',
  mask: true,
  maskClosable: true,
  width: 420,
  top: 100,
  align: 'left',
  showFooter: true,
  okText: '确定',
  cancelText: '取消',
  okType: 'primary',
  okLoading: false,
  okDisabled: false,
  cancelDisabled: false,
  mountOnEnter: true,
  unmountOnExit: true,
  centered: false,
  animation: 'zoom',
  escClosable: true,
  type: 'confirm',
  simple: false,
  showIcon: true,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'ok'): void
  (e: 'cancel'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
}>()

// 计算CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const borderColorVar = computed(() => props.borderColor || null)
const buttonColorVar = computed(() => props.buttonColor || null)

// 对话框可见状态
const visible = ref(props.modelValue)
const animating = ref(false)

// 监听visible变化
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    openDialog()
  }
  else {
    closeDialog()
  }
})

// 打开对话框
async function openDialog() {
  visible.value = true
  emit('open')
  if (props.escClosable) {
    document.addEventListener('keydown', handleKeyDown)
  }
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'

  animating.value = true
  await nextTick()
  // 等待动画结束
  setTimeout(() => {
    animating.value = false
    emit('opened')
  }, 250)
}

// 关闭对话框
async function closeDialog() {
  if (animating.value)
    return

  emit('close')
  animating.value = true

  // 减少动画时间提升体验
  setTimeout(() => {
    visible.value = false
    animating.value = false
    // 恢复背景滚动
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeyDown)
    emit('closed')
  }, 200)
}

// 处理确认
function handleOk() {
  if (props.okLoading || props.okDisabled)
    return

  emit('ok')
  // 如果没有外部监听处理，则自动关闭
  updateModelValue(false)
}

// 处理取消
function handleCancel() {
  if (props.cancelDisabled)
    return

  emit('cancel')
  // 如果没有外部监听处理，则自动关闭
  updateModelValue(false)
}

// 处理蒙层点击
function handleMaskClick() {
  if (props.maskClosable && !animating.value) {
    updateModelValue(false)
  }
}

// 处理键盘事件
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.escClosable && !animating.value) {
    updateModelValue(false)
  }
}

// 更新v-model
function updateModelValue(val: boolean) {
  emit('update:modelValue', val)
}

// 根据类型获取图标
const typeIcon = computed(() => {
  if (!props.showIcon)
    return ''

  const icons = {
    info: 'heroicons:information-circle-20-solid',
    success: 'heroicons:check-circle-20-solid',
    warning: 'heroicons:exclamation-triangle-20-solid',
    error: 'heroicons:exclamation-circle-20-solid',
    confirm: 'heroicons:question-mark-circle-20-solid',
  }

  return props.icon || icons[props.type]
})

// 计算对话框样式
const dialogStyle = computed(() => {
  const style: Record<string, any> = {}

  // 设置宽度
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  // 设置顶部距离
  if (props.top) {
    style.marginTop = typeof props.top === 'number' ? `${props.top}px` : props.top
  }

  // 设置z-index
  if (props.zIndex) {
    style.zIndex = props.zIndex
  }

  return style
})

// 计算动画类名
const animationClass = computed(() => {
  const animations = {
    'fade': 'ui-dialog-fade',
    'zoom': 'ui-dialog-zoom',
    'slide-up': 'ui-dialog-slide-up',
  }
  return animations[props.animation]
})

// 计算对话框内容对齐方式
const alignClass = computed(() => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  return alignments[props.align]
})

// 计算对话框类型相关样式
const typeClass = computed(() => {
  if (!props.type || props.type === 'confirm')
    return ''
  return `ui-dialog--${props.type}`
})

// 组件挂载
onMounted(() => {
  // 初始时如果是打开状态，则执行打开逻辑
  if (props.modelValue) {
    openDialog()
  }
})

// 组件销毁前
onBeforeUnmount(() => {
  // 移除事件监听器
  document.removeEventListener('keydown', handleKeyDown)

  // 如果对话框还在打开状态，恢复body滚动
  if (visible.value) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <teleport to="body">
    <transition name="ui-dialog-mask">
      <div
        v-if="visible"
        class="ui-dialog-mask"
        :style="{ zIndex }"
        @click="handleMaskClick"
      />
    </transition>

    <transition :name="animationClass">
      <div
        v-if="visible"
        class="ui-dialog-container"
        :style="{ zIndex: zIndex ? zIndex + 1 : 'auto' }"
      >
        <div
          class="ui-dialog"
          :class="[
            { 'ui-dialog--centered': centered },
            { 'ui-dialog--simple': simple },
            typeClass,
          ]"
          :style="dialogStyle"
          @click.stop
        >
          <!-- 对话框头部 -->
          <div v-if="!simple && (title || closable)" class="ui-dialog__header">
            <div v-if="title" class="ui-dialog__title">
              <div v-if="showIcon && typeIcon" class="ui-dialog__title-icon">
                <ui-icon :icon="typeIcon" size="20px" />
              </div>
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <button
              v-if="closable"
              type="button"
              class="ui-dialog__close"
              @click="updateModelValue(false)"
            >
              <ui-icon :icon="closeIcon" />
            </button>
          </div>

          <!-- 对话框内容 -->
          <div
            class="ui-dialog__body"
            :class="[alignClass]"
          >
            <div v-if="showIcon && typeIcon" class="ui-dialog__icon">
              <ui-icon :icon="typeIcon" size="28px" />
            </div>

            <div class="ui-dialog__content">
              <slot>{{ content }}</slot>
            </div>
          </div>

          <!-- 对话框底部 -->
          <div v-if="showFooter" class="ui-dialog__footer">
            <slot name="footer">
              <ui-button
                :disabled="cancelDisabled"
                @click="handleCancel"
              >
                {{ cancelText }}
              </ui-button>
              <ui-button
                :type="okType"
                :loading="okLoading"
                :disabled="okDisabled"
                @click="handleOk"
              >
                {{ okText }}
              </ui-button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
/* 遮罩层 */
.ui-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

/* 容器 */
.ui-dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
}

/* 对话框 */
.ui-dialog {
  /* 动态CSS变量绑定 */
  --ui-dialog-bg-color: v-bind(bgColorVar);
  --ui-dialog-text-color: v-bind(textColorVar);
  --ui-dialog-border-color: v-bind(borderColorVar);
  --ui-dialog-button-color: v-bind(buttonColorVar);

  position: relative;
  width: 420px;
  margin: 100px auto;
  background-color: var(--ui-dialog-bg-color, var(--ui-color-white, white));
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
}

/* 居中显示 */
.ui-dialog--centered {
  margin-top: 0;
  margin-bottom: 0;
  align-self: center;
  top: 50%;
  transform: translateY(-50%);
}

/* 对话框头部 */
.ui-dialog__header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ui-dialog-border-color, var(--ui-color-border, #f0f0f0));
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 标题 */
.ui-dialog__title {
  font-size: 16px;
  font-weight: 500;
  color: var(--ui-dialog-text-color, var(--ui-color-text, #1f2937));
  line-height: 22px;
  display: flex;
  align-items: center;
}

.ui-dialog__title-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

/* 关闭按钮 */
.ui-dialog__close {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ui-color-text-secondary, #6b7280);
  transition: color 0.3s;
}

.ui-dialog__close:hover {
  color: var(--ui-color-text, #1f2937);
}

/* 对话框内容 */
.ui-dialog__body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ui-dialog-text-color, var(--ui-color-text, #1f2937));
  overflow: auto;
  display: flex;
  align-items: flex-start;
}

/* 图标 */
.ui-dialog__icon {
  margin-right: 16px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 类型样式 */
.ui-dialog--info .ui-dialog__icon {
  color: var(--ui-color-info, #3b82f6);
}

.ui-dialog--success .ui-dialog__icon {
  color: var(--ui-color-success, #10b981);
}

.ui-dialog--warning .ui-dialog__icon {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-dialog--error .ui-dialog__icon {
  color: var(--ui-color-danger, #ef4444);
}

/* 对话框底部 */
.ui-dialog__footer {
  padding: 10px 24px 16px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 简单模式 */
.ui-dialog--simple .ui-dialog__body {
  padding-top: 32px;
}

/* 动画效果 */
.ui-dialog-mask-enter-active,
.ui-dialog-mask-leave-active {
  transition: opacity 0.2s;
}

.ui-dialog-mask-enter-from,
.ui-dialog-mask-leave-to {
  opacity: 0;
}

/* 淡入淡出动画 */
.ui-dialog-fade-enter-active,
.ui-dialog-fade-leave-active {
  transition: opacity 0.2s;
}

.ui-dialog-fade-enter-from,
.ui-dialog-fade-leave-to {
  opacity: 0;
}

/* 缩放动画 */
.ui-dialog-zoom-enter-active,
.ui-dialog-zoom-leave-active {
  transition: all 0.2s;
}

.ui-dialog-zoom-enter-from,
.ui-dialog-zoom-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* 上滑动画 */
.ui-dialog-slide-up-enter-active,
.ui-dialog-slide-up-leave-active {
  transition: all 0.2s;
}

.ui-dialog-slide-up-enter-from,
.ui-dialog-slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
