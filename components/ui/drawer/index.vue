<script setup lang="ts" name="UiDrawer">
/**
 * Drawer 抽屉组件
 * 创建日期: 2024-06-24
 * 作者: aiftt
 * 更新日期: 2024-06-24 - 初始版本
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 是否显示抽屉
   */
  modelValue?: boolean
  /**
   * 抽屉打开的方向
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * 抽屉标题
   */
  title?: string
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean
  /**
   * 自定义关闭图标
   */
  closeIcon?: string
  /**
   * 是否显示遮罩
   */
  mask?: boolean
  /**
   * 点击遮罩是否关闭
   */
  maskClosable?: boolean
  /**
   * 是否支持ESC键关闭
   */
  escClosable?: boolean
  /**
   * 抽屉尺寸
   */
  size?: 'sm' | 'md' | 'lg' | number
  /**
   * 是否占满整个容器（全屏显示）
   */
  fullscreen?: boolean
  /**
   * 自定义宽度（placement为左或右时生效）
   */
  width?: string | number
  /**
   * 自定义高度（placement为上或下时生效）
   */
  height?: string | number
  /**
   * 是否显示页脚
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
   * 是否内容可滚动
   */
  scrollable?: boolean
  /**
   * 是否在隐藏时卸载内容
   */
  unmountOnExit?: boolean
  /**
   * 自定义样式
   */
  customStyle?: Record<string, any>
  /**
   * 自定义内容区域样式
   */
  bodyStyle?: Record<string, any>
  /**
   * 自定义z-index
   */
  zIndex?: number
  /**
   * 挂载的节点
   */
  appendTo?: string | HTMLElement
  /**
   * 显示页脚分隔线
   */
  footerBordered?: boolean
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
}>(), {
  modelValue: false,
  placement: 'right',
  closable: true,
  closeIcon: 'heroicons:x-mark-20-solid',
  mask: true,
  maskClosable: true,
  escClosable: true,
  size: 'md',
  showFooter: false,
  okText: '确定',
  cancelText: '取消',
  okType: 'primary',
  okLoading: false,
  okDisabled: false,
  cancelDisabled: false,
  scrollable: true,
  unmountOnExit: true,
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

// 计算CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const borderColorVar = computed(() => props.borderColor || null)

// 抽屉可见状态
const visible = ref(props.modelValue)
const animating = ref(false)

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    openDrawer()
  }
  else {
    closeDrawer()
  }
})

// 打开抽屉
async function openDrawer() {
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
  }, 300)
}

// 关闭抽屉
async function closeDrawer() {
  if (animating.value)
    return

  emit('close')
  animating.value = true

  setTimeout(() => {
    visible.value = false
    animating.value = false
    // 恢复背景滚动
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeyDown)
    emit('closed')
  }, 150)
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

// 计算抽屉样式
const drawerStyle = computed(() => {
  const style: Record<string, any> = {
    ...props.customStyle,
  }

  // 设置z-index
  if (props.zIndex) {
    style.zIndex = props.zIndex
  }

  // 设置尺寸
  if (!props.fullscreen) {
    if (props.placement === 'left' || props.placement === 'right') {
      if (props.width) {
        style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      else {
        // 根据size设置宽度
        style.width = `var(--ui-drawer-width-${props.size}, ${typeof props.size === 'number' ? `${props.size}px` : '384px'})`
      }
    }
    else if (props.placement === 'top' || props.placement === 'bottom') {
      if (props.height) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }
      else {
        // 根据size设置高度
        style.height = `var(--ui-drawer-height-${props.size}, ${typeof props.size === 'number' ? `${props.size}px` : '384px'})`
      }
    }
  }

  return style
})

// 计算内容样式
const contentStyle = computed(() => {
  return {
    ...props.bodyStyle,
  }
})

// 计算动画类名
const transitionName = computed(() => {
  return `ui-drawer-${props.placement}`
})

// 获取挂载容器
const getContainer = computed(() => {
  if (typeof props.appendTo === 'string') {
    return document.querySelector(props.appendTo) || document.body
  }
  return props.appendTo || document.body
})

// 停止事件冒泡
function stopPropagation(e: Event) {
  e.stopPropagation()
}

// 挂载时处理
onMounted(() => {
  if (props.modelValue) {
    openDrawer()
  }
})

// 卸载前清理
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <teleport :to="getContainer">
    <!-- 只有在可见或不需要卸载时才渲染 -->
    <div
      v-if="visible || !unmountOnExit"
      class="ui-drawer-wrapper"
      :class="{ 'ui-drawer-wrapper--visible': visible }"
    >
      <!-- 遮罩层 -->
      <transition name="ui-drawer-mask">
        <div
          v-if="mask && visible"
          class="ui-drawer-mask"
          @click="handleMaskClick"
        />
      </transition>

      <!-- 抽屉容器 -->
      <transition :name="transitionName">
        <div
          v-if="visible"
          class="ui-drawer"
          :class="[
            `ui-drawer--${placement}`,
            { 'ui-drawer--fullscreen': fullscreen },
            { 'ui-drawer--scrollable': scrollable },
          ]"
          :style="drawerStyle"
          @click.self="handleMaskClick"
        >
          <!-- 抽屉内容 -->
          <div
            class="ui-drawer__content"
            :class="{ 'ui-drawer__content--footer-bordered': footerBordered && showFooter }"
            @click="stopPropagation"
          >
            <!-- 标题区域 -->
            <div v-if="title || $slots.title || closable" class="ui-drawer__header">
              <div class="ui-drawer__title">
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
              <button
                v-if="closable"
                type="button"
                class="ui-drawer__close"
                @click="handleCancel"
              >
                <ui-icon :icon="closeIcon" />
              </button>
            </div>

            <!-- 内容区域 -->
            <div v-auto-animate class="ui-drawer__body" :style="contentStyle">
              <slot />
            </div>

            <!-- 底部区域 -->
            <div v-if="showFooter" class="ui-drawer__footer">
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
    </div>
  </teleport>
</template>

<style scoped>
.ui-drawer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--ui-drawer-z-index, 1000);
  pointer-events: none;
  visibility: hidden;
}

.ui-drawer-wrapper--visible {
  visibility: visible;
  pointer-events: auto;
}

.ui-drawer-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--ui-drawer-mask-bg, rgba(0, 0, 0, 0.45));
  z-index: var(--ui-drawer-mask-z-index, 1000);
}

.ui-drawer {
  /* 动态变量绑定 */
  --ui-drawer-bg-color: v-bind(bgColorVar);
  --ui-drawer-text-color: v-bind(textColorVar);
  --ui-drawer-border-color: v-bind(borderColorVar);

  position: fixed;
  z-index: var(--ui-drawer-content-z-index, 1001);
  background-color: var(--ui-drawer-bg-color, var(--ui-drawer-bg, var(--ui-color-bg)));
  color: var(--ui-drawer-text-color, var(--ui-drawer-color, var(--ui-color-text)));
  box-shadow: var(--ui-drawer-shadow);
  overflow: hidden;
}

.ui-drawer--left {
  top: 0;
  left: 0;
  height: 100%;
}

.ui-drawer--right {
  top: 0;
  right: 0;
  height: 100%;
}

.ui-drawer--top {
  top: 0;
  left: 0;
  width: 100%;
}

.ui-drawer--bottom {
  bottom: 0;
  left: 0;
  width: 100%;
}

.ui-drawer--fullscreen {
  width: 100% !important;
  height: 100% !important;
}

.ui-drawer--scrollable .ui-drawer__body {
  overflow-y: auto;
}

.ui-drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.ui-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ui-drawer-header-padding, 16px 24px);
  border-bottom: 1px solid var(--ui-drawer-border-color, var(--ui-drawer-border, var(--ui-border-color)));
}

.ui-drawer__title {
  font-size: var(--ui-drawer-title-font-size, 16px);
  font-weight: var(--ui-drawer-title-font-weight, 500);
  color: var(--ui-drawer-title-color, var(--ui-color-text-heading));
  line-height: 22px;
  word-wrap: break-word;
}

.ui-drawer__close {
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  color: var(--ui-drawer-close-color, var(--ui-color-text-secondary));
  transition: color 0.2s;
}

.ui-drawer__close:hover {
  color: var(--ui-drawer-close-hover-color, var(--ui-color-text));
}

.ui-drawer__body {
  flex: 1;
  padding: var(--ui-drawer-body-padding, 24px);
}

.ui-drawer__footer {
  padding: var(--ui-drawer-footer-padding, 10px 24px);
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.ui-drawer__content--footer-bordered .ui-drawer__footer {
  border-top: 1px solid var(--ui-drawer-border-color, var(--ui-drawer-border, var(--ui-border-color)));
}

/* 遮罩动画 */
.ui-drawer-mask-enter-active,
.ui-drawer-mask-leave-active {
  transition: opacity 0.2s ease;
}

.ui-drawer-mask-enter-from,
.ui-drawer-mask-leave-to {
  opacity: 0;
}

/* 左侧弹出动画 */
.ui-drawer-left-enter-active,
.ui-drawer-left-leave-active {
  transition: transform 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-drawer-left-enter-from,
.ui-drawer-left-leave-to {
  transform: translateX(-100%);
}

/* 右侧弹出动画 */
.ui-drawer-right-enter-active,
.ui-drawer-right-leave-active {
  transition: transform 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-drawer-right-enter-from,
.ui-drawer-right-leave-to {
  transform: translateX(100%);
}

/* 顶部弹出动画 */
.ui-drawer-top-enter-active,
.ui-drawer-top-leave-active {
  transition: transform 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-drawer-top-enter-from,
.ui-drawer-top-leave-to {
  transform: translateY(-100%);
}

/* 底部弹出动画 */
.ui-drawer-bottom-enter-active,
.ui-drawer-bottom-leave-active {
  transition: transform 0.2s cubic-bezier(0.3, 1.3, 0.3, 1);
}

.ui-drawer-bottom-enter-from,
.ui-drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
