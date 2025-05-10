<script setup lang="ts" name="UiModal">
/**
 * Modal 模态对话框组件
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 * 更新日期: 2024-06-23 - 修复动画效果，优化交互体验
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 是否显示模态框
   */
  modelValue?: boolean
  /**
   * 标题
   */
  title?: string
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
   * 设置模态框宽度
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
   * 显示底部按钮
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
   * 全屏模式
   */
  fullscreen?: boolean
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
  animation?: 'fade' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-right' | 'slide-left'
  /**
   * 自定义样式
   */
  customStyle?: Record<string, any>
  /**
   * 自定义内容样式
   */
  bodyStyle?: Record<string, any>
  /**
   * 附加到哪个DOM元素
   */
  appendTo?: string | HTMLElement
  /**
   * 是否显示底部分割线
   */
  footerBordered?: boolean
  /**
   * 是否支持ESC键关闭
   */
  escClosable?: boolean
  /**
   * 自定义z-index
   */
  zIndex?: number
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
  width: 520,
  top: 100,
  align: 'left',
  showFooter: true,
  okText: '确定',
  cancelText: '取消',
  okType: 'primary',
  okLoading: false,
  okDisabled: false,
  cancelDisabled: false,
  fullscreen: false,
  mountOnEnter: true,
  unmountOnExit: true,
  centered: false,
  animation: 'zoom',
  escClosable: true,
  footerBordered: true,
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

// 获取slots
const slots = useSlots()

// 计算CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const borderColorVar = computed(() => props.borderColor || null)
const buttonColorVar = computed(() => props.buttonColor || null)

// 模态框可见状态
const visible = ref(props.modelValue)
const animating = ref(false)
// 用于异步关闭的倒计时
const asyncCloseTimer = ref(0)
const asyncClosing = ref(false)

// 监听visible变化
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    openModal()
  }
  else {
    closeModal()
  }
})

// 打开模态框
async function openModal() {
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
  }, 300) // 恢复为300ms以确保动画完成
}

// 关闭模态框
async function closeModal() {
  if (animating.value)
    return

  emit('close')
  animating.value = true

  // 完整的动画时间
  setTimeout(() => {
    visible.value = false
    animating.value = false
    // 恢复背景滚动
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeyDown)
    emit('closed')
  }, 300) // 恢复为300ms以确保动画完成
}

// 异步关闭模态框，提供倒计时
function asyncClose(timeout = 3) {
  if (asyncClosing.value)
    return

  asyncClosing.value = true
  asyncCloseTimer.value = timeout

  const timer = setInterval(() => {
    asyncCloseTimer.value--
    if (asyncCloseTimer.value <= 0) {
      clearInterval(timer)
      asyncClosing.value = false
      handleUpdateVisible(false)
    }
  }, 1000)
}

// 处理键盘事件
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.escClosable) {
    handleCancel()
  }
}

// 处理点击蒙层
function handleMaskClick() {
  if (props.maskClosable) {
    handleCancel()
  }
}

// 处理确认按钮
function handleOk() {
  emit('ok')
  if (!props.okLoading) {
    handleUpdateVisible(false)
  }
  else {
    // 当okLoading为true时，启用异步关闭
    asyncClose()
  }
}

// 处理取消按钮
function handleCancel() {
  emit('cancel')
  handleUpdateVisible(false)
}

// 更新可见状态
function handleUpdateVisible(status: boolean) {
  emit('update:modelValue', status)
}

// 计算模态框样式
const modalStyle = computed(() => {
  const style: Record<string, any> = {
    ...props.customStyle,
  }

  // 设置宽度
  if (!props.fullscreen) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  // 设置位置
  if (props.centered) {
    style.top = '50%'
    style.transform = 'translateY(-50%)'
    style.margin = '0 auto'
  }
  else {
    style.top = typeof props.top === 'number' ? `${props.top}px` : props.top
  }

  // 设置z-index
  if (props.zIndex) {
    style.zIndex = props.zIndex
  }

  return style
})

// 计算内容样式
const contentStyle = computed(() => {
  return {
    textAlign: props.align,
    ...props.bodyStyle,
  }
})

// 计算动画类名
const transitionName = computed(() => {
  return `ui-modal-${props.animation}`
})

// 计算遮罩动画类名
const maskTransitionName = computed(() => {
  return 'ui-modal-mask'
})

// 模态框内容元素
const contentRef = ref<HTMLElement | null>(null)

// 停止事件冒泡
function stopPropagation(e: Event) {
  e.stopPropagation()
}

// 处理点击外部
function handleClickOutside(e: MouseEvent) {
  if (contentRef.value && !contentRef.value.contains(e.target as Node)) {
    handleMaskClick()
  }
}

// 挂载时处理
onMounted(() => {
  if (props.modelValue) {
    openModal()
  }
})

// 卸载前清理
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

// 获取挂载容器
const getContainer = computed(() => {
  if (typeof props.appendTo === 'string') {
    return document.querySelector(props.appendTo) || document.body
  }
  return props.appendTo || document.body
})
</script>

<template>
  <teleport :to="getContainer">
    <!-- 只有在可见或不需要卸载时才渲染 -->
    <div
      v-if="visible || !unmountOnExit"
      class="ui-modal-wrapper"
      :class="{ 'ui-modal-wrapper--visible': visible }"
    >
      <!-- 遮罩层 -->
      <transition :name="maskTransitionName">
        <div
          v-if="mask && visible"
          class="ui-modal-mask"
          @click="handleMaskClick"
        />
      </transition>

      <!-- 模态框容器 -->
      <transition :name="transitionName">
        <div
          v-if="visible"
          class="ui-modal"
          :class="[
            { 'ui-modal--fullscreen': fullscreen },
            { 'ui-modal--centered': centered },
          ]"
          :style="modalStyle"
          @click="handleClickOutside"
        >
          <!-- 模态框内容 -->
          <div
            ref="contentRef"
            class="ui-modal__content"
            :class="{ 'ui-modal__content--footer-bordered': footerBordered && showFooter }"
            @click="stopPropagation"
          >
            <!-- 标题区域 -->
            <div v-if="title || slots.title || closable" class="ui-modal__header">
              <div class="ui-modal__title">
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
              <button
                v-if="closable"
                type="button"
                class="ui-modal__close"
                @click="handleCancel"
              >
                <ui-icon :icon="closeIcon" />
              </button>
            </div>

            <!-- 内容区域 -->
            <div v-auto-animate class="ui-modal__body" :style="contentStyle">
              <slot />
              <!-- 异步关闭倒计时提示 -->
              <div v-if="asyncClosing" class="ui-modal__async-close-tip">
                {{ asyncCloseTimer }}秒后自动关闭
              </div>
            </div>

            <!-- 底部区域 -->
            <div v-if="showFooter" class="ui-modal__footer">
              <slot name="footer">
                <ui-button
                  :disabled="cancelDisabled || asyncClosing"
                  @click="handleCancel"
                >
                  {{ cancelText }}
                </ui-button>
                <ui-button
                  :type="okType"
                  :loading="okLoading"
                  :disabled="okDisabled || asyncClosing"
                  @click="handleOk"
                >
                  {{ okText }}
                </ui-button>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style scoped>
.ui-modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--ui-modal-z-index, 1000);
  pointer-events: none;
  visibility: hidden;
}

.ui-modal-wrapper--visible {
  visibility: visible;
  pointer-events: auto;
}

.ui-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--ui-modal-mask-bg, rgba(0, 0, 0, 0.45));
  z-index: var(--ui-modal-mask-z-index, 1000);
}

.ui-modal {
  /* 动态变量绑定 */
  --ui-modal-bg-color: v-bind(bgColorVar);
  --ui-modal-text-color: v-bind(textColorVar);
  --ui-modal-border-color: v-bind(borderColorVar);
  --ui-modal-button-color: v-bind(buttonColorVar);

  position: relative;
  margin: 0 auto;
  top: var(--ui-modal-top, 100px);
  background-color: var(--ui-modal-bg-color, var(--ui-modal-bg, var(--ui-color-bg)));
  color: var(--ui-modal-text-color, var(--ui-modal-color, var(--ui-color-text)));
  border-radius: var(--ui-modal-border-radius, 6px);
  box-shadow: var(--ui-modal-shadow, 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08));
  z-index: var(--ui-modal-content-z-index, 1001);
  overflow: hidden;
}

.ui-modal--fullscreen {
  width: 100% !important;
  height: 100vh !important;
  top: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  max-height: 100% !important;
  border-radius: 0 !important;
}

.ui-modal--centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-modal__content {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
}

.ui-modal--fullscreen .ui-modal__content {
  max-height: 100vh;
}

.ui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ui-modal-header-padding, 16px 24px);
  border-bottom: 1px solid var(--ui-modal-border-color, var(--ui-modal-border, var(--ui-border-color)));
}

.ui-modal__title {
  font-size: var(--ui-modal-title-font-size, 16px);
  font-weight: var(--ui-modal-title-font-weight, 500);
  color: var(--ui-modal-title-color, var(--ui-color-text-heading));
  line-height: 22px;
  word-wrap: break-word;
}

.ui-modal__close {
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  color: var(--ui-modal-close-color, var(--ui-color-text-secondary));
  transition: color 0.2s;
}

.ui-modal__close:hover {
  color: var(--ui-modal-close-hover-color, var(--ui-color-text));
}

.ui-modal__body {
  flex: 1;
  padding: var(--ui-modal-body-padding, 24px);
  overflow: auto;
  position: relative;
}

.ui-modal__async-close-tip {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: var(--ui-color-warning-bg, rgba(245, 158, 11, 0.1));
  color: var(--ui-color-warning, #f59e0b);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.ui-modal__footer {
  padding: var(--ui-modal-footer-padding, 10px 24px);
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.ui-modal__content--footer-bordered .ui-modal__footer {
  border-top: 1px solid var(--ui-modal-border-color, var(--ui-modal-border, var(--ui-border-color)));
}

/* 动画效果 */
/* 淡入淡出 */
.ui-modal-fade-enter-active,
.ui-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.ui-modal-fade-enter-from,
.ui-modal-fade-leave-to {
  opacity: 0 !important;
}

/* 缩放 */
.ui-modal-zoom-enter-active,
.ui-modal-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-modal-zoom-enter-from,
.ui-modal-zoom-leave-to {
  opacity: 0 !important;
  transform: scale(0.85) !important;
}

/* 从下往上 */
.ui-modal-slide-up-enter-active,
.ui-modal-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-modal-slide-up-enter-from,
.ui-modal-slide-up-leave-to {
  opacity: 0 !important;
  transform: translate3d(0, 30px, 0) !important;
}

/* 从上往下 */
.ui-modal-slide-down-enter-active,
.ui-modal-slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-modal-slide-down-enter-from,
.ui-modal-slide-down-leave-to {
  opacity: 0 !important;
  transform: translate3d(0, -30px, 0) !important;
}

/* 从右往左 */
.ui-modal-slide-left-enter-active,
.ui-modal-slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-modal-slide-left-enter-from,
.ui-modal-slide-left-leave-to {
  opacity: 0 !important;
  transform: translate3d(30px, 0, 0) !important;
}

/* 从左往右 */
.ui-modal-slide-right-enter-active,
.ui-modal-slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-modal-slide-right-enter-from,
.ui-modal-slide-right-leave-to {
  opacity: 0 !important;
  transform: translate3d(-30px, 0, 0) !important;
}

/* 蒙层动画 */
.ui-modal-mask-enter-active,
.ui-modal-mask-leave-active {
  transition: opacity 0.3s ease;
}

.ui-modal-mask-enter-from,
.ui-modal-mask-leave-to {
  opacity: 0 !important;
}
</style>
