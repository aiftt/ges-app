<script setup lang="ts" name="UiResizeBox">
/**
 * ResizeBox 伸缩框组件
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 */

import { computed, onMounted, onUnmounted, ref } from 'vue'

// 定义props类型
interface ResizeBoxProps {
  /**
   * 初始宽度
   */
  width?: string | number
  /**
   * 初始高度
   */
  height?: string | number
  /**
   * 最小宽度
   */
  minWidth?: string | number
  /**
   * 最小高度
   */
  minHeight?: string | number
  /**
   * 最大宽度
   */
  maxWidth?: string | number
  /**
   * 最大高度
   */
  maxHeight?: string | number
  /**
   * 是否禁用调整大小
   */
  disabled?: boolean
  /**
   * 调整方向，可以是单个方向或多个方向的组合
   */
  directions?: ('top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left')[]
  /**
   * 是否显示调整手柄
   */
  showHandle?: boolean
  /**
   * 手柄样式类
   */
  handleClass?: string
  /**
   * 是否显示辅助线
   */
  showGuides?: boolean
  /**
   * 调整大小时是否保持比例
   */
  keepRatio?: boolean
  /**
   * 调整的最小步长（像素）
   */
  step?: number
}

// 定义事件类型
interface ResizeBoxEmits {
  (e: 'update:width', width: number): void
  (e: 'update:height', height: number): void
  (e: 'resize', size: { width: number, height: number }): void
  (e: 'resizestart', event: MouseEvent): void
  (e: 'resizeend', size: { width: number, height: number }): void
}

// 定义props默认值
const props = withDefaults(defineProps<ResizeBoxProps>(), {
  width: 'auto',
  height: 'auto',
  minWidth: 20,
  minHeight: 20,
  maxWidth: Number.MAX_SAFE_INTEGER,
  maxHeight: Number.MAX_SAFE_INTEGER,
  disabled: false,
  directions: () => ['right', 'bottom', 'bottom-right'] as ('top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left')[],
  showHandle: true,
  showGuides: false,
  keepRatio: false,
  step: 1,
})

// 定义事件
const emit = defineEmits<ResizeBoxEmits>()

// 容器引用
const containerRef = ref<HTMLElement | null>(null)

// 当前尺寸
const currentWidth = ref<number>(typeof props.width === 'number' ? props.width : 0)
const currentHeight = ref<number>(typeof props.height === 'number' ? props.height : 0)

// 调整状态
const isResizing = ref(false)
const resizeDirection = ref<string>('')
const startPosition = ref({ x: 0, y: 0 })
const startSize = ref({ width: 0, height: 0 })
const originalRatio = ref(1)

// 计算样式
const boxStyle = computed(() => {
  const style: Record<string, string> = {}

  // 使用当前尺寸而不是props中的初始值
  style.width = `${currentWidth.value}px`
  style.height = `${currentHeight.value}px`

  return style
})

// 计算最小尺寸
const minWidth = computed(() => {
  return typeof props.minWidth === 'number' ? props.minWidth : Number.parseInt(props.minWidth as string, 10) || 20
})

const minHeight = computed(() => {
  return typeof props.minHeight === 'number' ? props.minHeight : Number.parseInt(props.minHeight as string, 10) || 20
})

// 计算最大尺寸
const maxWidth = computed(() => {
  return typeof props.maxWidth === 'number' ? props.maxWidth : Number.parseInt(props.maxWidth as string, 10) || Number.MAX_SAFE_INTEGER
})

const maxHeight = computed(() => {
  return typeof props.maxHeight === 'number' ? props.maxHeight : Number.parseInt(props.maxHeight as string, 10) || Number.MAX_SAFE_INTEGER
})

// 初始化尺寸
onMounted(() => {
  if (containerRef.value) {
    if (props.width === 'auto') {
      currentWidth.value = containerRef.value.offsetWidth
    }
    else if (typeof props.width === 'string') {
      currentWidth.value = containerRef.value.offsetWidth
    }
    else {
      currentWidth.value = props.width
    }

    if (props.height === 'auto') {
      currentHeight.value = containerRef.value.offsetHeight
    }
    else if (typeof props.height === 'string') {
      currentHeight.value = containerRef.value.offsetHeight
    }
    else {
      currentHeight.value = props.height
    }

    originalRatio.value = currentWidth.value / currentHeight.value

    // 初始化后立即更新样式
    if (containerRef.value) {
      containerRef.value.style.width = `${currentWidth.value}px`
      containerRef.value.style.height = `${currentHeight.value}px`
    }
  }
})

// 处理调整开始
function handleResizeStart(direction: string, e: MouseEvent) {
  if (props.disabled)
    return

  e.preventDefault()
  resizeDirection.value = direction
  isResizing.value = true
  startPosition.value = { x: e.clientX, y: e.clientY }
  startSize.value = { width: currentWidth.value, height: currentHeight.value }
  originalRatio.value = currentWidth.value / currentHeight.value

  window.addEventListener('mousemove', handleResizeMove)
  window.addEventListener('mouseup', handleResizeEnd)

  emit('resizestart', e)
}

// 处理调整移动
function handleResizeMove(e: MouseEvent) {
  if (!isResizing.value)
    return

  e.preventDefault()
  const deltaX = e.clientX - startPosition.value.x
  const deltaY = e.clientY - startPosition.value.y

  let newWidth = startSize.value.width
  let newHeight = startSize.value.height

  // 根据调整方向计算新尺寸
  if (resizeDirection.value.includes('right')) {
    newWidth = Math.max(minWidth.value, Math.min(maxWidth.value, startSize.value.width + deltaX))
    if (newWidth % props.step !== 0) {
      newWidth = Math.round(newWidth / props.step) * props.step
    }
  }

  if (resizeDirection.value.includes('left')) {
    const maxDeltaX = startSize.value.width - minWidth.value
    const adjustedDeltaX = Math.max(-maxDeltaX, Math.min(startSize.value.width - minWidth.value, deltaX))
    newWidth = startSize.value.width - adjustedDeltaX
    if (newWidth % props.step !== 0) {
      newWidth = Math.round(newWidth / props.step) * props.step
    }
  }

  if (resizeDirection.value.includes('bottom')) {
    newHeight = Math.max(minHeight.value, Math.min(maxHeight.value, startSize.value.height + deltaY))
    if (newHeight % props.step !== 0) {
      newHeight = Math.round(newHeight / props.step) * props.step
    }
  }

  if (resizeDirection.value.includes('top')) {
    const maxDeltaY = startSize.value.height - minHeight.value
    const adjustedDeltaY = Math.max(-maxDeltaY, Math.min(startSize.value.height - minHeight.value, deltaY))
    newHeight = startSize.value.height - adjustedDeltaY
    if (newHeight % props.step !== 0) {
      newHeight = Math.round(newHeight / props.step) * props.step
    }
  }

  // 保持比例
  if (props.keepRatio) {
    if (resizeDirection.value.includes('right') || resizeDirection.value.includes('left')) {
      newHeight = newWidth / originalRatio.value
    }
    else if (resizeDirection.value.includes('bottom') || resizeDirection.value.includes('top')) {
      newWidth = newHeight * originalRatio.value
    }

    // 确保尺寸在范围内
    if (newWidth < minWidth.value) {
      newWidth = minWidth.value
      newHeight = newWidth / originalRatio.value
    }
    else if (newWidth > maxWidth.value) {
      newWidth = maxWidth.value
      newHeight = newWidth / originalRatio.value
    }

    if (newHeight < minHeight.value) {
      newHeight = minHeight.value
      newWidth = newHeight * originalRatio.value
    }
    else if (newHeight > maxHeight.value) {
      newHeight = maxHeight.value
      newWidth = newHeight * originalRatio.value
    }
  }

  // 更新尺寸
  currentWidth.value = newWidth
  currentHeight.value = newHeight

  // 发射事件
  emit('update:width', newWidth)
  emit('update:height', newHeight)
  emit('resize', { width: newWidth, height: newHeight })
}

// 处理调整结束
function handleResizeEnd() {
  isResizing.value = false
  window.removeEventListener('mousemove', handleResizeMove)
  window.removeEventListener('mouseup', handleResizeEnd)

  emit('resizeend', { width: currentWidth.value, height: currentHeight.value })
}

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('mousemove', handleResizeMove)
  window.removeEventListener('mouseup', handleResizeEnd)
})

// 生成手柄类名
function getHandleClass(direction: string) {
  return [
    'ui-resizebox-handle',
    `ui-resizebox-handle--${direction}`,
    { 'ui-resizebox-handle--disabled': props.disabled },
    props.handleClass,
  ]
}

// 判断是否显示特定方向的手柄
function shouldShowHandle(direction: string) {
  return props.showHandle && props.directions.includes(direction as any)
}
</script>

<template>
  <div
    ref="containerRef"
    class="ui-resizebox"
    :class="{ 'ui-resizebox--resizing': isResizing }"
    :style="boxStyle"
  >
    <div class="ui-resizebox-content">
      <slot />
    </div>

    <!-- 调整手柄 -->
    <div
      v-if="shouldShowHandle('top')"
      :class="getHandleClass('top')"
      @mousedown="handleResizeStart('top', $event)"
    />
    <div
      v-if="shouldShowHandle('right')"
      :class="getHandleClass('right')"
      @mousedown="handleResizeStart('right', $event)"
    />
    <div
      v-if="shouldShowHandle('bottom')"
      :class="getHandleClass('bottom')"
      @mousedown="handleResizeStart('bottom', $event)"
    />
    <div
      v-if="shouldShowHandle('left')"
      :class="getHandleClass('left')"
      @mousedown="handleResizeStart('left', $event)"
    />
    <div
      v-if="shouldShowHandle('top-left')"
      :class="getHandleClass('top-left')"
      @mousedown="handleResizeStart('top-left', $event)"
    />
    <div
      v-if="shouldShowHandle('top-right')"
      :class="getHandleClass('top-right')"
      @mousedown="handleResizeStart('top-right', $event)"
    />
    <div
      v-if="shouldShowHandle('bottom-right')"
      :class="getHandleClass('bottom-right')"
      @mousedown="handleResizeStart('bottom-right', $event)"
    />
    <div
      v-if="shouldShowHandle('bottom-left')"
      :class="getHandleClass('bottom-left')"
      @mousedown="handleResizeStart('bottom-left', $event)"
    />

    <!-- 辅助线 -->
    <div v-if="showGuides && isResizing" class="ui-resizebox-guides">
      <div class="ui-resizebox-guide ui-resizebox-guide--horizontal" />
      <div class="ui-resizebox-guide ui-resizebox-guide--vertical" />
    </div>
  </div>
</template>

<style scoped>
.ui-resizebox {
  position: relative;
  box-sizing: border-box;
  overflow: visible;
  transition: none;
  touch-action: none;
}

.ui-resizebox-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ui-resizebox--resizing {
  user-select: none;
}

.ui-resizebox-handle {
  position: absolute;
  z-index: 1;
}

.ui-resizebox-handle--top {
  top: -3px;
  left: 0;
  width: 100%;
  height: 6px;
  cursor: ns-resize;
}

.ui-resizebox-handle--right {
  top: 0;
  right: -3px;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
}

.ui-resizebox-handle--bottom {
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 6px;
  cursor: ns-resize;
}

.ui-resizebox-handle--left {
  top: 0;
  left: -3px;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
}

.ui-resizebox-handle--top-left {
  top: -3px;
  left: -3px;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
}

.ui-resizebox-handle--top-right {
  top: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  cursor: nesw-resize;
}

.ui-resizebox-handle--bottom-right {
  bottom: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
}

.ui-resizebox-handle--bottom-left {
  bottom: -3px;
  left: -3px;
  width: 10px;
  height: 10px;
  cursor: nesw-resize;
}

.ui-resizebox-handle:hover {
  background-color: var(--ui-resizebox-handle-hover-bg, rgba(0, 0, 0, 0.1));
}

.ui-resizebox-handle:active {
  background-color: var(--ui-resizebox-handle-active-bg, rgba(0, 0, 0, 0.2));
}

.ui-resizebox-handle--disabled {
  pointer-events: none;
  opacity: 0.5;
}

.ui-resizebox-guides {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.ui-resizebox-guide {
  position: absolute;
  background-color: var(--ui-color-primary, #1890ff);
  opacity: 0.5;
}

.ui-resizebox-guide--horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translateY(-50%);
}

.ui-resizebox-guide--vertical {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
}
</style>
