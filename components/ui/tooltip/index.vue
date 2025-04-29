<script setup lang="ts" name="UiTooltip">
/**
 * 文字提示组件
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-04-30 - 初始版本
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 提示文字内容
   */
  content?: string
  /**
   * 提示框位置
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * 提示框主题
   */
  theme?: 'light' | 'dark'
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click' | 'focus'
  /**
   * 显示延迟(毫秒)
   */
  showDelay?: number
  /**
   * 隐藏延迟(毫秒)
   */
  hideDelay?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 最大宽度
   */
  maxWidth?: string
}>(), {
  content: '',
  placement: 'top',
  theme: 'dark',
  trigger: 'hover',
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  maxWidth: '200px',
})

// 引用和状态
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const showTimer = ref<number | null>(null)
const hideTimer = ref<number | null>(null)

// 计算提示框位置样式
const tooltipStyle = computed(() => {
  return {
    '--ui-tooltip-max-width': props.maxWidth,
  }
})

// 计算tooltip的类名
const tooltipClass = computed(() => {
  const classes = ['ui-tooltip']
  classes.push(`ui-tooltip--${props.placement}`)
  classes.push(`ui-tooltip--${props.theme}`)
  if (isVisible.value)
    classes.push('ui-tooltip--visible')
  return classes.join(' ')
})

// 显示提示框
function showTooltip() {
  if (props.disabled)
    return
  clearTimeout(hideTimer.value as number)

  showTimer.value = window.setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }, props.showDelay)
}

// 隐藏提示框
function hideTooltip() {
  clearTimeout(showTimer.value as number)

  hideTimer.value = window.setTimeout(() => {
    isVisible.value = false
  }, props.hideDelay)
}

// 更新提示框位置
function updatePosition() {
  if (!triggerRef.value || !tooltipRef.value)
    return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  let top = 0
  let left = 0

  switch (props.placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.right + 8
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.left - tooltipRect.width - 8
      break
  }

  // 边界修正
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 确保不超出视口右侧
  if (left + tooltipRect.width > viewportWidth) {
    left = viewportWidth - tooltipRect.width - 8
  }

  // 确保不超出视口左侧
  if (left < 8) {
    left = 8
  }

  // 确保不超出视口底部
  if (top + tooltipRect.height > viewportHeight) {
    top = viewportHeight - tooltipRect.height - 8
  }

  // 确保不超出视口顶部
  if (top < 8) {
    top = 8
  }

  tooltipRef.value.style.top = `${top}px`
  tooltipRef.value.style.left = `${left}px`
}

// 切换提示框显示状态
function toggleTooltip() {
  if (isVisible.value) {
    hideTooltip()
  }
  else {
    showTooltip()
  }
}

// 处理外部点击
function handleOutsideClick(event: MouseEvent) {
  if (
    triggerRef.value
    && !triggerRef.value.contains(event.target as Node)
    && tooltipRef.value
    && !tooltipRef.value.contains(event.target as Node)
  ) {
    hideTooltip()
  }
}

// 添加事件监听
function addEvents() {
  if (!triggerRef.value)
    return

  if (props.trigger === 'hover') {
    triggerRef.value.addEventListener('mouseenter', showTooltip)
    triggerRef.value.addEventListener('mouseleave', hideTooltip)
  }
  else if (props.trigger === 'click') {
    triggerRef.value.addEventListener('click', toggleTooltip)
    document.addEventListener('click', handleOutsideClick)
  }
  else if (props.trigger === 'focus') {
    triggerRef.value.addEventListener('focus', showTooltip)
    triggerRef.value.addEventListener('blur', hideTooltip)
  }

  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
}

// 移除事件监听
function removeEvents() {
  if (!triggerRef.value)
    return

  if (props.trigger === 'hover') {
    triggerRef.value.removeEventListener('mouseenter', showTooltip)
    triggerRef.value.removeEventListener('mouseleave', hideTooltip)
  }
  else if (props.trigger === 'click') {
    triggerRef.value.removeEventListener('click', toggleTooltip)
    document.removeEventListener('click', handleOutsideClick)
  }
  else if (props.trigger === 'focus') {
    triggerRef.value.removeEventListener('focus', showTooltip)
    triggerRef.value.removeEventListener('blur', hideTooltip)
  }

  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
}

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    addEvents()
  })
})

onBeforeUnmount(() => {
  removeEvents()
  clearTimeout(showTimer.value as number)
  clearTimeout(hideTimer.value as number)
})
</script>

<template>
  <div class="ui-tooltip-container">
    <!-- 触发元素 -->
    <div ref="triggerRef" class="ui-tooltip-trigger">
      <slot />
    </div>

    <!-- 提示内容 -->
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :class="tooltipClass"
        :style="tooltipStyle"
        role="tooltip"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div class="ui-tooltip-arrow" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.ui-tooltip-container {
  display: inline-block;
  position: relative;
}

.ui-tooltip-trigger {
  display: inline-block;
}

.ui-tooltip {
  position: fixed;
  z-index: 9999;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: var(--ui-tooltip-max-width, 200px);
  word-wrap: break-word;
  pointer-events: none;
  transition:
    opacity 0.3s,
    transform 0.3s;
  opacity: 0;
  transform: scale(0.8);
}

.ui-tooltip--visible {
  opacity: 1;
  transform: scale(1);
}

/* 箭头样式 */
.ui-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px;
}

/* 主题样式 */
.ui-tooltip--dark {
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
}

.ui-tooltip--light {
  background-color: white;
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid #e5e7eb;
}

/* 箭头位置和颜色 */
.ui-tooltip--top .ui-tooltip-arrow {
  bottom: -8px;
  left: 50%;
  margin-left: -4px;
  border-color: var(--ui-tooltip-bg, rgba(0, 0, 0, 0.85)) transparent transparent;
}

.ui-tooltip--right .ui-tooltip-arrow {
  left: -8px;
  top: 50%;
  margin-top: -4px;
  border-color: transparent var(--ui-tooltip-bg, rgba(0, 0, 0, 0.85)) transparent transparent;
}

.ui-tooltip--bottom .ui-tooltip-arrow {
  top: -8px;
  left: 50%;
  margin-left: -4px;
  border-color: transparent transparent var(--ui-tooltip-bg, rgba(0, 0, 0, 0.85));
}

.ui-tooltip--left .ui-tooltip-arrow {
  right: -8px;
  top: 50%;
  margin-top: -4px;
  border-color: transparent transparent transparent var(--ui-tooltip-bg, rgba(0, 0, 0, 0.85));
}

/* 暗色主题样式变量 */
.ui-tooltip--dark {
  --ui-tooltip-bg: rgba(0, 0, 0, 0.85);
}

/* 亮色主题样式变量 */
.ui-tooltip--light {
  --ui-tooltip-bg: white;
}

/* 亮色主题箭头颜色调整 */
.ui-tooltip--light.ui-tooltip--top .ui-tooltip-arrow {
  border-top-color: #e5e7eb;
}

.ui-tooltip--light.ui-tooltip--right .ui-tooltip-arrow {
  border-right-color: #e5e7eb;
}

.ui-tooltip--light.ui-tooltip--bottom .ui-tooltip-arrow {
  border-bottom-color: #e5e7eb;
}

.ui-tooltip--light.ui-tooltip--left .ui-tooltip-arrow {
  border-left-color: #e5e7eb;
}

/* 深色模式适配 */
:root.dark .ui-tooltip--light {
  background-color: #1f2937;
  color: #f9fafb;
  border-color: #374151;
}

:root.dark .ui-tooltip--light.ui-tooltip--top .ui-tooltip-arrow {
  border-top-color: #374151;
}

:root.dark .ui-tooltip--light.ui-tooltip--right .ui-tooltip-arrow {
  border-right-color: #374151;
}

:root.dark .ui-tooltip--light.ui-tooltip--bottom .ui-tooltip-arrow {
  border-bottom-color: #374151;
}

:root.dark .ui-tooltip--light.ui-tooltip--left .ui-tooltip-arrow {
  border-left-color: #374151;
}
</style>
