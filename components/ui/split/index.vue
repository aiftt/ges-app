<script setup lang="ts" name="UiSplit">
import type { Direction } from '~/types/ui'
/**
 * 面板分割组件
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-09-09 - 提取CSS变量到主题文件中
 * 更新日期: 2024-08-20 - 添加拖拽功能
 * 更新日期: 2024-09-15 - 使用集中管理的类型定义
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 分割方向，水平或垂直
   */
  direction?: Direction
  /**
   * 分割条位置，可以是百分比（0-1）或具体像素值
   */
  modelValue?: number | number[]
  /**
   * 默认分割位置
   */
  defaultPosition?: number | string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 分割条大小（像素）
   */
  splitterSize?: number
  /**
   * 分隔条可调整的最小限制（像素或百分比）
   */
  min?: number | string
  /**
   * 分隔条可调整的最大限制（像素或百分比）
   */
  max?: number | string
  /**
   * 分隔条两侧的最小宽度/高度（像素）
   */
  minSizes?: number[]
  /**
   * 是否显示拖拽手柄
   */
  showHandle?: boolean
  /**
   * 拖拽手柄图标
   */
  splitterIcon?: string
  /**
   * 分割区域背景色
   */
  bgColor?: string
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 分割条颜色
   */
  splitterColor?: string
  /**
   * 分割条悬停颜色
   */
  splitterHoverColor?: string
  /**
   * 面板间距(像素)
   */
  gutter?: number
  /**
   * 自定义分隔条类名
   */
  splitterClass?: string
  /**
   * 自定义样式
   */
  customStyle?: Record<string, string>
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 是否显示拖拽条
   */
  showSplitter?: boolean
  /**
   * 是否保持比例在resize窗口时
   */
  keepRatio?: boolean
  /**
   * 分隔条拖拽后自动吸附灵敏度（像素）
   */
  snapThreshold?: number
  /**
   * 分隔条拖拽后自动吸附位置列表（像素或百分比）
   */
  snapSizes?: (number | string)[]
}>(), {
  direction: 'horizontal',
  defaultPosition: 50,
  disabled: false,
  splitterSize: 4,
  min: 10,
  max: 100,
  minSizes: () => [100, 100],
  showHandle: true,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | number[]): void
  (e: 'change', value: number | number[]): void
  (e: 'resizeStart', gutterIndex: number): void
  (e: 'resize', position: number): void
  (e: 'resizeEnd', gutterIndex: number): void
}>()

// 内部状态
const splitRef = ref<HTMLElement | null>(null)
const splitterRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startPosition = ref(0)
const endPosition = ref(0)
const containerSize = ref(0)
const position = ref(parsePosition(props.defaultPosition))

// 解析位置值
function parsePosition(pos: string | number): number {
  if (typeof pos === 'string') {
    if (pos.endsWith('%')) {
      return Number.parseFloat(pos) / 100
    }
    if (pos.endsWith('px')) {
      return Number.parseFloat(pos)
    }
    return Number.parseFloat(pos) / 100
  }

  // 如果是大于1的数，视为像素值，否则视为百分比(0-1)
  if (pos > 1 && pos <= 100) {
    return pos / 100
  }
  return pos
}

// 计算CSS变量
const borderColorVar = computed(() => props.borderColor || undefined)
const bgColorVar = computed(() => props.bgColor || undefined)
const splitterColorVar = computed(() => props.splitterColor || undefined)
const splitterHoverColorVar = computed(() => props.splitterHoverColor || undefined)

// 计算定位样式
const containerClass = computed(() => {
  return [
    'ui-split',
    `ui-split-${props.direction}`,
    {
      'ui-split-disabled': props.disabled,
      'ui-split-dragging': isDragging.value,
    },
  ]
})

// 计算第一面板样式
const firstPanelStyle = computed(() => {
  const isHorizontal = props.direction === 'horizontal'
  const size = position.value
  const sizeProperty = isHorizontal ? 'width' : 'height'

  return {
    [sizeProperty]: typeof size === 'number' && size <= 1
      ? `${size * 100}%`
      : `${size}px`,
  }
})

// 计算第二面板样式
const secondPanelStyle = computed(() => {
  // 第二个面板会自动占满剩余空间
  return {}
})

// 计算分割线样式
const splitterStyle = computed(() => {
  const isHorizontal = props.direction === 'horizontal'
  const size = typeof props.splitterSize === 'number'
    ? `${props.splitterSize}px`
    : props.splitterSize

  return {
    [isHorizontal ? 'width' : 'height']: size,
    [isHorizontal ? 'height' : 'width']: '100%',
    [isHorizontal ? 'cursor' : 'cursor']: isHorizontal ? 'col-resize' : 'row-resize',
    // 确保分隔条始终可见
    'z-index': '10',
    'background-color': isDragging.value
      ? 'var(--ui-split-splitter-hover-color, var(--ui-color-primary, #10b981))'
      : undefined,
  }
})

// 从事件中获取位置信息
function getPositionFromEvent(e: MouseEvent | TouchEvent): number {
  if (e instanceof MouseEvent) {
    return props.direction === 'horizontal' ? e.clientX : e.clientY
  }
  else {
    const touch = e.touches[0]
    return props.direction === 'horizontal' ? touch.clientX : touch.clientY
  }
}

// 处理拖动开始
function handleDragStart(e: MouseEvent | TouchEvent, gutterIndex: number) {
  if (props.disabled)
    return

  isDragging.value = true
  startPosition.value = getPositionFromEvent(e)

  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('touchmove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
  document.addEventListener('touchend', handleDragEnd)
  document.addEventListener('contextmenu', handleDragEnd)

  // 阻止默认事件
  e.preventDefault()
  // 触发开始调整大小事件
  emit('resizeStart', gutterIndex)
}

// 处理拖动过程
function handleDragMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value)
    return

  const isHorizontal = props.direction === 'horizontal'
  const currentPosition = getPositionFromEvent(e)
  const delta = currentPosition - startPosition.value

  // 获取容器最新尺寸
  if (splitRef.value) {
    containerSize.value = isHorizontal
      ? splitRef.value.offsetWidth
      : splitRef.value.offsetHeight
  }

  // 计算新位置（基于百分比）
  const oldPositionPercent = typeof position.value === 'number' && position.value <= 1
    ? position.value * 100
    : (position.value / containerSize.value) * 100

  // 计算新的百分比位置，确保不超出范围
  let newPositionPercent = oldPositionPercent + (delta / containerSize.value) * 100

  // 应用最小最大限制（确保每边至少有min%的空间）
  newPositionPercent = Math.max(Math.min(newPositionPercent, 100 - props.min), props.min)

  // 更新位置（使用小数表示百分比，0-1范围）
  position.value = newPositionPercent / 100

  // 更新modelValue
  emit('update:modelValue', position.value)

  // 重置起始位置，使下次移动基于当前位置计算
  startPosition.value = currentPosition

  // 触发resize事件
  emit('resize', position.value * 100)
}

// 处理拖动结束
function handleDragEnd() {
  if (!isDragging.value)
    return

  isDragging.value = false
  endPosition.value = position.value

  emit('resizeEnd', position.value)
  emit('change', props.direction === 'horizontal' ? position.value : 100 - position.value)

  // 移除全局事件监听
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('touchmove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  document.removeEventListener('touchend', handleDragEnd)
  document.removeEventListener('contextmenu', handleDragEnd)
}

// 监听defaultPosition变化
watch(() => props.defaultPosition, (newValue) => {
  if (!isDragging.value) {
    position.value = parsePosition(newValue)
  }
})

// 组件挂载时
onMounted(() => {
  // 初始化容器尺寸
  const splitElement = splitRef.value
  if (splitElement) {
    const isHorizontal = props.direction === 'horizontal'
    containerSize.value = isHorizontal
      ? splitElement.offsetWidth
      : splitElement.offsetHeight
  }

  // 确保拖动结束事件在用户移出浏览器窗口时也能触发
  window.addEventListener('mouseup', handleDragEnd)
})

// 组件卸载时
onUnmounted(() => {
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('touchmove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  document.removeEventListener('touchend', handleDragEnd)
  document.removeEventListener('contextmenu', handleDragEnd)
  window.removeEventListener('mouseup', handleDragEnd)
})
</script>

<template>
  <div
    ref="splitRef"
    :class="containerClass"
  >
    <!-- 第一个面板 -->
    <div class="ui-split-panel ui-split-first" :style="firstPanelStyle">
      <slot name="first" />
    </div>

    <!-- 分割条 -->
    <div
      ref="splitterRef"
      class="ui-split-splitter"
      :class="splitterClass"
      :style="splitterStyle"
      @mousedown="(e) => handleDragStart(e, 0)"
    >
      <div v-if="showHandle" class="ui-split-handle">
        <slot name="handle">
          <ui-icon v-if="splitterIcon" :icon="splitterIcon" />
          <template v-else>
            <div v-if="direction === 'horizontal'" class="ui-split-handle-dots horizontal">
              <div class="ui-split-handle-dot" />
              <div class="ui-split-handle-dot" />
            </div>
            <div v-else class="ui-split-handle-dots vertical">
              <div class="ui-split-handle-dot" />
              <div class="ui-split-handle-dot" />
            </div>
          </template>
        </slot>
      </div>
    </div>

    <!-- 第二个面板 -->
    <div class="ui-split-panel ui-split-second" :style="secondPanelStyle">
      <slot name="second" />
    </div>
  </div>
</template>

<style scoped>
.ui-split {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  /* 使用v-bind绑定自定义CSS变量，覆盖主题变量 */
  --ui-split-border-color: v-bind(borderColorVar);
  --ui-split-bg-color: v-bind(bgColorVar);
  --ui-split-splitter-color: v-bind(splitterColorVar);
  --ui-split-splitter-hover-color: v-bind(splitterHoverColorVar);
  /* CSS变量已迁移到主题文件: assets/scss/themes/light.scss 和 dark.scss 中 */
}

.ui-split-horizontal {
  flex-direction: row;
}

.ui-split-vertical {
  flex-direction: column;
}

.ui-split-panel {
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  background-color: var(--ui-split-bg-color, var(--ui-color-bg, #ffffff));
  border-color: var(--ui-split-border-color, var(--ui-border-color, #e5e7eb));
}

.ui-split-first {
  flex-grow: 0;
  flex-shrink: 0;
}

.ui-split-second {
  flex-grow: 1;
  flex-shrink: 1;
}

.ui-split-splitter {
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ui-split-splitter-color, var(--ui-border-color, #e5e7eb));
  z-index: 10;
  transition: background-color 0.2s;
}

.ui-split-splitter:hover {
  background-color: var(--ui-split-splitter-hover-color, var(--ui-color-primary, #10b981));
}

.ui-split-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.ui-split-handle-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.ui-split-handle-dots.horizontal {
  flex-direction: column;
}

.ui-split-handle-dots.vertical {
  flex-direction: row;
}

.ui-split-handle-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--ui-color-text-light, #9ca3af);
}

.ui-split-disabled {
  pointer-events: none;
  opacity: 0.6;
}

.ui-split-dragging {
  cursor: grabbing;
  user-select: none;
}

/* 水平分割时的样式调整 */
.ui-split-horizontal .ui-split-splitter {
  height: 100%;
}

/* 垂直分割时的样式调整 */
.ui-split-vertical .ui-split-splitter {
  width: 100%;
}
</style>
