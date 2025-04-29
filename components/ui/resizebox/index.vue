<script setup lang="ts" name="UiResizebox">
/**
 * 可调整大小的容器组件
 * 创建日期: 2023-05-03
 * 作者: aiftt
 * 更新日期: 2023-05-03 - 初始版本
 * 更新日期: 2024-05-10 - 规范化CSS变量，移除内联样式
 * 允许用户通过拖动调整容器大小
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import logger from '~/utils/logger'

const props = withDefaults(defineProps<{
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
   * 是否可调整宽度
   */
  resizableWidth?: boolean
  /**
   * 是否可调整高度
   */
  resizableHeight?: boolean
  /**
   * 是否启用调整大小的动画效果
   */
  animate?: boolean
  /**
   * 控制器大小
   */
  handleSize?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 调整大小结束后是否保存尺寸到本地存储
   */
  storage?: boolean
  /**
   * 本地存储的键名
   */
  storageKey?: string
}>(), {
  width: 'auto',
  height: 'auto',
  minWidth: 20,
  minHeight: 20,
  maxWidth: '100%',
  maxHeight: '100%',
  resizableWidth: true,
  resizableHeight: true,
  animate: true,
  handleSize: 6,
  disabled: false,
  storage: false,
  storageKey: 'ui-resizebox-size',
})

const emit = defineEmits<{
  (e: 'update:width', width: number): void
  (e: 'update:height', height: number): void
  (e: 'resizeStart', size: { width: number, height: number }): void
  (e: 'resizing', size: { width: number, height: number }): void
  (e: 'resizeEnd', size: { width: number, height: number }): void
}>()

// 创建组件专用logger
const resizeboxLogger = logger.client.child({ tag: 'resizebox' })

// 容器引用
const boxRef = ref<HTMLElement | null>(null)

// 当前尺寸
const currentWidth = ref<number>(
  typeof props.width === 'number' ? props.width : 0,
)
const currentHeight = ref<number>(
  typeof props.height === 'number' ? props.height : 0,
)

// 拖拽状态
const isResizing = ref(false)
const resizeDirection = ref<{
  right: boolean
  bottom: boolean
  corner: boolean
}>({
  right: false,
  bottom: false,
  corner: false,
})

// 开始点
const startPosition = ref({ x: 0, y: 0 })
const startSize = ref({ width: 0, height: 0 })

// CSS变量
const widthVar = computed(() => currentWidth.value > 0 ? `${currentWidth.value}px` : typeof props.width === 'string' ? props.width : null)
const heightVar = computed(() => currentHeight.value > 0 ? `${currentHeight.value}px` : typeof props.height === 'string' ? props.height : null)
const minWidthVar = computed(() => typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth)
const minHeightVar = computed(() => typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight)
const maxWidthVar = computed(() => typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth)
const maxHeightVar = computed(() => typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight)
const handleSizeVar = computed(() => `${props.handleSize}px`)
const transitionVar = computed(() => props.animate && !isResizing.value ? 'width 0.2s ease, height 0.2s ease' : 'none')

// 监听尺寸变化
watch(() => props.width, (val) => {
  if (typeof val === 'number' && val !== currentWidth.value) {
    currentWidth.value = val
  }
})

watch(() => props.height, (val) => {
  if (typeof val === 'number' && val !== currentHeight.value) {
    currentHeight.value = val
  }
})

// 调整大小处理
function handleResizeStart(e: MouseEvent | TouchEvent, direction: 'right' | 'bottom' | 'corner') {
  if (props.disabled)
    return

  e.preventDefault()
  e.stopPropagation()

  // 设置调整方向
  resizeDirection.value = {
    right: direction === 'right' || direction === 'corner',
    bottom: direction === 'bottom' || direction === 'corner',
    corner: direction === 'corner',
  }

  isResizing.value = true

  // 获取起始位置
  const touchEvent = e as TouchEvent
  const mouseEvent = e as MouseEvent

  startPosition.value = {
    x: touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX,
    y: touchEvent.touches ? touchEvent.touches[0].clientY : mouseEvent.clientY,
  }

  // 获取初始尺寸
  const box = boxRef.value
  if (box) {
    startSize.value = {
      width: box.offsetWidth,
      height: box.offsetHeight,
    }

    currentWidth.value = box.offsetWidth
    currentHeight.value = box.offsetHeight
  }

  // 添加事件监听
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('touchmove', handleResizeMove, { passive: false })
  document.addEventListener('mouseup', handleResizeEnd)
  document.addEventListener('touchend', handleResizeEnd)

  // 发出事件
  emit('resizeStart', {
    width: currentWidth.value,
    height: currentHeight.value,
  })
}

function handleResizeMove(e: MouseEvent | TouchEvent) {
  if (!isResizing.value)
    return

  e.preventDefault()

  // 获取当前位置
  const touchEvent = e as TouchEvent
  const mouseEvent = e as MouseEvent

  const currentPosition = {
    x: touchEvent.touches ? touchEvent.touches[0].clientX : mouseEvent.clientX,
    y: touchEvent.touches ? touchEvent.touches[0].clientY : mouseEvent.clientY,
  }

  // 计算偏移量
  const deltaX = currentPosition.x - startPosition.value.x
  const deltaY = currentPosition.y - startPosition.value.y

  // 根据方向调整大小
  if (resizeDirection.value.right && props.resizableWidth) {
    let newWidth = startSize.value.width + deltaX

    // 应用边界限制
    const minWidth = typeof props.minWidth === 'number' ? props.minWidth : 0
    if (newWidth < minWidth)
      newWidth = minWidth

    const maxWidth = typeof props.maxWidth === 'number' ? props.maxWidth : Infinity
    if (newWidth > maxWidth)
      newWidth = maxWidth

    currentWidth.value = Math.round(newWidth)
    emit('update:width', currentWidth.value)
  }

  if (resizeDirection.value.bottom && props.resizableHeight) {
    let newHeight = startSize.value.height + deltaY

    // 应用边界限制
    const minHeight = typeof props.minHeight === 'number' ? props.minHeight : 0
    if (newHeight < minHeight)
      newHeight = minHeight

    const maxHeight = typeof props.maxHeight === 'number' ? props.maxHeight : Infinity
    if (newHeight > maxHeight)
      newHeight = maxHeight

    currentHeight.value = Math.round(newHeight)
    emit('update:height', currentHeight.value)
  }

  // 发出事件
  emit('resizing', {
    width: currentWidth.value,
    height: currentHeight.value,
  })
}

function handleResizeEnd() {
  if (!isResizing.value)
    return

  isResizing.value = false

  // 移除事件监听
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('touchmove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
  document.removeEventListener('touchend', handleResizeEnd)

  // 保存到本地存储
  if (props.storage && props.storageKey) {
    try {
      const sizeData = {
        width: currentWidth.value,
        height: currentHeight.value,
      }
      localStorage.setItem(props.storageKey, JSON.stringify(sizeData))
    }
    catch (e) {
      resizeboxLogger.error('保存ResizeBox尺寸到本地存储失败:', e)
    }
  }

  // 发出事件
  emit('resizeEnd', {
    width: currentWidth.value,
    height: currentHeight.value,
  })
}

// 初始化
onMounted(() => {
  // 尝试从本地存储加载尺寸
  if (props.storage && props.storageKey) {
    try {
      const savedData = localStorage.getItem(props.storageKey)
      if (savedData) {
        const { width, height } = JSON.parse(savedData)
        if (width && props.resizableWidth) {
          currentWidth.value = width
        }
        if (height && props.resizableHeight) {
          currentHeight.value = height
        }
      }
    }
    catch (e) {
      resizeboxLogger.error('从本地存储加载ResizeBox尺寸失败:', e)
    }
  }

  // 初始化尺寸
  const box = boxRef.value
  if (box) {
    if (currentWidth.value === 0 && box.offsetWidth > 0) {
      currentWidth.value = box.offsetWidth
    }
    if (currentHeight.value === 0 && box.offsetHeight > 0) {
      currentHeight.value = box.offsetHeight
    }
  }
})

// 组件卸载时清理
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('touchmove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
  document.removeEventListener('touchend', handleResizeEnd)
})
</script>

<template>
  <div
    ref="boxRef"
    class="ui-resizebox"
    :class="{ 'ui-resizebox--resizing': isResizing, 'ui-resizebox--disabled': disabled }"
  >
    <div class="ui-resizebox-content">
      <slot />
    </div>

    <!-- 右侧调整柄 -->
    <div
      v-if="resizableWidth"
      class="ui-resizebox-handle ui-resizebox-handle-right"
      @mousedown="(e) => handleResizeStart(e, 'right')"
      @touchstart="(e) => handleResizeStart(e, 'right')"
    />

    <!-- 底部调整柄 -->
    <div
      v-if="resizableHeight"
      class="ui-resizebox-handle ui-resizebox-handle-bottom"
      @mousedown="(e) => handleResizeStart(e, 'bottom')"
      @touchstart="(e) => handleResizeStart(e, 'bottom')"
    />

    <!-- 角落调整柄 -->
    <div
      v-if="resizableWidth && resizableHeight"
      class="ui-resizebox-handle ui-resizebox-handle-corner"
      @mousedown="(e) => handleResizeStart(e, 'corner')"
      @touchstart="(e) => handleResizeStart(e, 'corner')"
    />
  </div>
</template>

<style scoped>
.ui-resizebox {
  --ui-resizebox-width: v-bind(widthVar);
  --ui-resizebox-height: v-bind(heightVar);
  --ui-resizebox-min-width: v-bind(minWidthVar);
  --ui-resizebox-min-height: v-bind(minHeightVar);
  --ui-resizebox-max-width: v-bind(maxWidthVar);
  --ui-resizebox-max-height: v-bind(maxHeightVar);
  --ui-resizebox-handle-size: v-bind(handleSizeVar);
  --ui-resizebox-transition: v-bind(transitionVar);

  position: relative;
  box-sizing: border-box;
  overflow: visible;
  width: var(--ui-resizebox-width, auto);
  height: var(--ui-resizebox-height, auto);
  min-width: var(--ui-resizebox-min-width, 20px);
  min-height: var(--ui-resizebox-min-height, 20px);
  max-width: var(--ui-resizebox-max-width, 100%);
  max-height: var(--ui-resizebox-max-height, 100%);
  transition: var(--ui-resizebox-transition);
}

.ui-resizebox-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ui-resizebox-handle {
  position: absolute;
  background: transparent;
  z-index: 1;
}

.ui-resizebox-handle:hover {
  background-color: var(--ui-resizebox-handle-hover-bg, rgba(0, 0, 0, 0.1));
}

.ui-resizebox--resizing .ui-resizebox-handle,
.ui-resizebox-handle:active {
  background-color: var(--ui-resizebox-handle-active-bg, rgba(0, 0, 0, 0.2));
}

.ui-resizebox-handle-right {
  top: 0;
  right: calc(var(--ui-resizebox-handle-size, 6px) / -2);
  height: 100%;
  width: var(--ui-resizebox-handle-size, 6px);
  cursor: ew-resize;
}

.ui-resizebox-handle-bottom {
  bottom: calc(var(--ui-resizebox-handle-size, 6px) / -2);
  left: 0;
  width: 100%;
  height: var(--ui-resizebox-handle-size, 6px);
  cursor: ns-resize;
}

.ui-resizebox-handle-corner {
  right: calc(var(--ui-resizebox-handle-size, 6px) / -2);
  bottom: calc(var(--ui-resizebox-handle-size, 6px) / -2);
  width: var(--ui-resizebox-handle-size, 6px);
  height: var(--ui-resizebox-handle-size, 6px);
  cursor: nwse-resize;
}

.ui-resizebox--disabled .ui-resizebox-handle {
  display: none;
}

/* 深色模式适配 */
:root.dark {
  --ui-resizebox-handle-hover-bg: rgba(255, 255, 255, 0.1);
  --ui-resizebox-handle-active-bg: rgba(255, 255, 255, 0.2);
}
</style>
