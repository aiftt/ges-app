<script setup lang="ts" name="UiTrigger">
/**
 * 通用触发器组件
 * 创建日期: 2025-05-03
 * 作者: aiftt
 * 提供多种触发方式的弹出内容容器
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'
  /**
   * 弹出内容位置
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
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
   * 偏移量(像素)
   */
  offset?: number
  /**
   * 是否可见(用于manual模式)
   */
  visible?: boolean
  /**
   * 是否使用arrow箭头
   */
  arrow?: boolean
  /**
   * 是否在点击外部时自动关闭
   */
  clickOutsideToClose?: boolean
  /**
   * z-index值
   */
  zIndex?: number
  /**
   * 是否应用主题
   */
  themed?: boolean
  /**
   * 主题
   */
  theme?: 'light' | 'dark'
}>(), {
  trigger: 'hover',
  placement: 'bottom',
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  offset: 8,
  visible: false,
  arrow: true,
  clickOutsideToClose: true,
  zIndex: 1000,
  themed: true,
  theme: 'dark',
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}>()

// 引用和状态
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const isVisible = ref(props.visible)
const showTimer = ref<number | null>(null)
const hideTimer = ref<number | null>(null)

// 箭头尺寸
const ARROW_SIZE = 8

// 监听visible属性变化
watch(() => props.visible, (val) => {
  if (props.trigger === 'manual')
    isVisible.value = val
})

// 监听isVisible变化，向外发射事件
watch(isVisible, (val) => {
  emit('update:visible', val)
  if (val)
    emit('show')
  else
    emit('hide')
})

// 计算内容的类名
const contentClass = computed(() => {
  const classes = ['ui-trigger-content']

  if (props.themed)
    classes.push(`ui-trigger-theme-${props.theme}`)

  if (isVisible.value)
    classes.push('ui-trigger-content--visible')

  if (props.arrow)
    classes.push('ui-trigger-content--has-arrow')

  const placementClass = `ui-trigger-placement-${props.placement.replace(/-/g, '-')}`
  classes.push(placementClass)

  return classes.join(' ')
})

// 计算内容的样式
const contentStyle = computed(() => {
  return {
    zIndex: props.zIndex,
  }
})

// 显示内容
function show() {
  if (props.disabled || (props.trigger === 'manual' && !props.visible))
    return

  clearTimeout(hideTimer.value as number)

  showTimer.value = window.setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }, props.showDelay)
}

// 隐藏内容
function hide() {
  if (props.trigger === 'manual' && props.visible)
    return

  clearTimeout(showTimer.value as number)

  hideTimer.value = window.setTimeout(() => {
    isVisible.value = false
  }, props.hideDelay)
}

// 切换内容显示状态
function toggle() {
  if (isVisible.value)
    hide()
  else
    show()
}

// 处理外部点击
function handleOutsideClick(event: MouseEvent) {
  if (!props.clickOutsideToClose)
    return

  if (
    isVisible.value
    && triggerRef.value
    && !triggerRef.value.contains(event.target as Node)
    && contentRef.value
    && !contentRef.value.contains(event.target as Node)
  ) {
    hide()
  }
}

// 更新弹出内容位置
function updatePosition() {
  if (!triggerRef.value || !contentRef.value)
    return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const contentRect = contentRef.value.getBoundingClientRect()

  // 基本位置变量
  let top = 0
  let left = 0

  // 箭头位置变量
  let arrowTop = 0
  let arrowLeft = 0

  const offset = props.offset

  // 根据不同的placement计算位置
  switch (props.placement) {
    case 'top':
      top = triggerRect.top - contentRect.height - offset
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2

      if (props.arrow) {
        arrowTop = contentRect.height
        arrowLeft = contentRect.width / 2 - ARROW_SIZE / 2
      }
      break

    case 'top-start':
      top = triggerRect.top - contentRect.height - offset
      left = triggerRect.left

      if (props.arrow) {
        arrowTop = contentRect.height
        arrowLeft = Math.min(triggerRect.width / 2, 20)
      }
      break

    case 'top-end':
      top = triggerRect.top - contentRect.height - offset
      left = triggerRect.right - contentRect.width

      if (props.arrow) {
        arrowTop = contentRect.height
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20)
      }
      break

    case 'right':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
      left = triggerRect.right + offset

      if (props.arrow) {
        arrowTop = contentRect.height / 2 - ARROW_SIZE / 2
        arrowLeft = -ARROW_SIZE
      }
      break

    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + offset

      if (props.arrow) {
        arrowTop = Math.min(triggerRect.height / 2, 20)
        arrowLeft = -ARROW_SIZE
      }
      break

    case 'right-end':
      top = triggerRect.bottom - contentRect.height
      left = triggerRect.right + offset

      if (props.arrow) {
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20)
        arrowLeft = -ARROW_SIZE
      }
      break

    case 'bottom':
      top = triggerRect.bottom + offset
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2

      if (props.arrow) {
        arrowTop = -ARROW_SIZE
        arrowLeft = contentRect.width / 2 - ARROW_SIZE / 2
      }
      break

    case 'bottom-start':
      top = triggerRect.bottom + offset
      left = triggerRect.left

      if (props.arrow) {
        arrowTop = -ARROW_SIZE
        arrowLeft = Math.min(triggerRect.width / 2, 20)
      }
      break

    case 'bottom-end':
      top = triggerRect.bottom + offset
      left = triggerRect.right - contentRect.width

      if (props.arrow) {
        arrowTop = -ARROW_SIZE
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20)
      }
      break

    case 'left':
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
      left = triggerRect.left - contentRect.width - offset

      if (props.arrow) {
        arrowTop = contentRect.height / 2 - ARROW_SIZE / 2
        arrowLeft = contentRect.width
      }
      break

    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - contentRect.width - offset

      if (props.arrow) {
        arrowTop = Math.min(triggerRect.height / 2, 20)
        arrowLeft = contentRect.width
      }
      break

    case 'left-end':
      top = triggerRect.bottom - contentRect.height
      left = triggerRect.left - contentRect.width - offset

      if (props.arrow) {
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20)
        arrowLeft = contentRect.width
      }
      break
  }

  // 边界修正
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 确保不超出视口右侧
  if (left + contentRect.width > viewportWidth - 8) {
    const oldLeft = left
    left = viewportWidth - contentRect.width - 8

    // 如果位置发生了变化且有箭头，则调整箭头位置
    if (props.arrow && oldLeft !== left) {
      const placementSide = props.placement.split('-')[0]
      if (placementSide === 'top' || placementSide === 'bottom') {
        arrowLeft += (oldLeft - left)
      }
    }
  }

  // 确保不超出视口左侧
  if (left < 8) {
    const oldLeft = left
    left = 8

    // 调整箭头位置
    if (props.arrow && oldLeft !== left) {
      const placementSide = props.placement.split('-')[0]
      if (placementSide === 'top' || placementSide === 'bottom') {
        arrowLeft += (oldLeft - left)
      }
    }
  }

  // 确保不超出视口底部
  if (top + contentRect.height > viewportHeight - 8) {
    const oldTop = top
    top = viewportHeight - contentRect.height - 8

    // 调整箭头位置
    if (props.arrow && oldTop !== top) {
      const placementSide = props.placement.split('-')[0]
      if (placementSide === 'left' || placementSide === 'right') {
        arrowTop += (oldTop - top)
      }
    }
  }

  // 确保不超出视口顶部
  if (top < 8) {
    const oldTop = top
    top = 8

    // 调整箭头位置
    if (props.arrow && oldTop !== top) {
      const placementSide = props.placement.split('-')[0]
      if (placementSide === 'left' || placementSide === 'right') {
        arrowTop += (oldTop - top)
      }
    }
  }

  // 应用位置
  contentRef.value.style.setProperty('--ui-trigger-content-top', `${top}px`)
  contentRef.value.style.setProperty('--ui-trigger-content-left', `${left}px`)

  // 更新箭头位置
  if (props.arrow && arrowRef.value) {
    arrowRef.value.style.setProperty('--ui-trigger-arrow-top', `${arrowTop}px`)
    arrowRef.value.style.setProperty('--ui-trigger-arrow-left', `${arrowLeft}px`)
  }
}

// 添加事件监听
function addEvents() {
  if (!triggerRef.value)
    return

  if (props.trigger === 'hover') {
    triggerRef.value.addEventListener('mouseenter', show)
    triggerRef.value.addEventListener('mouseleave', hide)
    contentRef.value?.addEventListener('mouseenter', show)
    contentRef.value?.addEventListener('mouseleave', hide)
  }
  else if (props.trigger === 'click') {
    triggerRef.value.addEventListener('click', toggle)
    document.addEventListener('click', handleOutsideClick)
  }
  else if (props.trigger === 'focus') {
    triggerRef.value.addEventListener('focus', show)
    triggerRef.value.addEventListener('blur', hide)
  }
  else if (props.trigger === 'contextmenu') {
    triggerRef.value.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      show()
    })
    document.addEventListener('click', handleOutsideClick)
  }

  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
}

// 移除事件监听
function removeEvents() {
  if (!triggerRef.value)
    return

  if (props.trigger === 'hover') {
    triggerRef.value.removeEventListener('mouseenter', show)
    triggerRef.value.removeEventListener('mouseleave', hide)
    contentRef.value?.removeEventListener('mouseenter', show)
    contentRef.value?.removeEventListener('mouseleave', hide)
  }
  else if (props.trigger === 'click') {
    triggerRef.value.removeEventListener('click', toggle)
    document.removeEventListener('click', handleOutsideClick)
  }
  else if (props.trigger === 'focus') {
    triggerRef.value.removeEventListener('focus', show)
    triggerRef.value.removeEventListener('blur', hide)
  }
  else if (props.trigger === 'contextmenu') {
    triggerRef.value.removeEventListener('contextmenu', (e) => {
      e.preventDefault()
      show()
    })
    document.removeEventListener('click', handleOutsideClick)
  }

  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
}

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    addEvents()
    if (props.visible && props.trigger === 'manual') {
      show()
    }
  })
})

onBeforeUnmount(() => {
  removeEvents()
  clearTimeout(showTimer.value as number)
  clearTimeout(hideTimer.value as number)
})

// 暴露给父组件的方法
defineExpose({
  show,
  hide,
  toggle,
  updatePosition,
})
</script>

<template>
  <div class="ui-trigger">
    <!-- 触发元素 -->
    <div ref="triggerRef" class="ui-trigger-target">
      <slot />
    </div>

    <!-- 弹出内容 -->
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="contentRef"
        :class="contentClass"
        :style="contentStyle"
      >
        <div v-if="arrow" ref="arrowRef" class="ui-trigger-arrow" />
        <div class="ui-trigger-content-inner">
          <slot name="content" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.ui-trigger {
  display: inline-block;
  position: relative;
}

.ui-trigger-target {
  display: inline-block;
}

.ui-trigger-content {
  position: fixed;
  z-index: var(--ui-trigger-z-index, 1000);
  top: var(--ui-trigger-content-top, 0);
  left: var(--ui-trigger-content-left, 0);
  transition:
    opacity 0.2s,
    transform 0.2s;
  opacity: 0;
  transform: scale(0.9);
  transform-origin: center top;
  pointer-events: none;
}

.ui-trigger-content-inner {
  position: relative;
  border-radius: var(--ui-radius, 4px);
  padding: 8px 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.ui-trigger-content--visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

/* 根据position设置不同的transform-origin */
.ui-trigger-placement-top,
.ui-trigger-placement-top-start,
.ui-trigger-placement-top-end {
  transform-origin: center bottom;
}

.ui-trigger-placement-bottom,
.ui-trigger-placement-bottom-start,
.ui-trigger-placement-bottom-end {
  transform-origin: center top;
}

.ui-trigger-placement-left,
.ui-trigger-placement-left-start,
.ui-trigger-placement-left-end {
  transform-origin: right center;
}

.ui-trigger-placement-right,
.ui-trigger-placement-right-start,
.ui-trigger-placement-right-end {
  transform-origin: left center;
}

/* 箭头基础样式 */
.ui-trigger-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px;
  z-index: -1;
  top: var(--ui-trigger-arrow-top, 0);
  left: var(--ui-trigger-arrow-left, 0);
}

/* 箭头方向样式 */
.ui-trigger-placement-top .ui-trigger-arrow,
.ui-trigger-placement-top-start .ui-trigger-arrow,
.ui-trigger-placement-top-end .ui-trigger-arrow {
  border-color: var(--ui-trigger-bg) transparent transparent;
}

.ui-trigger-placement-right .ui-trigger-arrow,
.ui-trigger-placement-right-start .ui-trigger-arrow,
.ui-trigger-placement-right-end .ui-trigger-arrow {
  border-color: transparent var(--ui-trigger-bg) transparent transparent;
}

.ui-trigger-placement-bottom .ui-trigger-arrow,
.ui-trigger-placement-bottom-start .ui-trigger-arrow,
.ui-trigger-placement-bottom-end .ui-trigger-arrow {
  border-color: transparent transparent var(--ui-trigger-bg);
}

.ui-trigger-placement-left .ui-trigger-arrow,
.ui-trigger-placement-left-start .ui-trigger-arrow,
.ui-trigger-placement-left-end .ui-trigger-arrow {
  border-color: transparent transparent transparent var(--ui-trigger-bg);
}

/* 主题样式 */
.ui-trigger-theme-dark {
  --ui-trigger-bg: rgba(0, 0, 0, 0.85);
  --ui-trigger-border: rgba(0, 0, 0, 0.85);
  --ui-trigger-color: white;
}

.ui-trigger-theme-dark .ui-trigger-content-inner {
  background-color: var(--ui-trigger-bg);
  color: var(--ui-trigger-color);
}

.ui-trigger-theme-light {
  --ui-trigger-bg: white;
  --ui-trigger-border: #e5e7eb;
  --ui-trigger-color: rgba(0, 0, 0, 0.85);
}

.ui-trigger-theme-light .ui-trigger-content-inner {
  background-color: var(--ui-trigger-bg);
  color: var(--ui-trigger-color);
  border: 1px solid var(--ui-trigger-border);
}

/* 箭头颜色调整 */
.ui-trigger-theme-light.ui-trigger-placement-top .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-top-start .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-top-end .ui-trigger-arrow {
  border-top-color: var(--ui-trigger-border);
}

.ui-trigger-theme-light.ui-trigger-placement-right .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-right-start .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-right-end .ui-trigger-arrow {
  border-right-color: var(--ui-trigger-border);
}

.ui-trigger-theme-light.ui-trigger-placement-bottom .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-bottom-start .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-bottom-end .ui-trigger-arrow {
  border-bottom-color: var(--ui-trigger-border);
}

.ui-trigger-theme-light.ui-trigger-placement-left .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-left-start .ui-trigger-arrow,
.ui-trigger-theme-light.ui-trigger-placement-left-end .ui-trigger-arrow {
  border-left-color: var(--ui-trigger-border);
}

/* CSS变量已移至主题文件中 */
</style>
