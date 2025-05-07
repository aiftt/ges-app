<script setup lang="ts" name="UiScrollbar">
/**
 * 滚动条组件
 * 创建日期: 2025-05-06
 * 作者: aiftt
 * 提供美化的自定义滚动条
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 是否显示水平滚动条
   */
  horizontal?: boolean
  /**
   * 是否显示垂直滚动条
   */
  vertical?: boolean
  /**
   * 滚动条宽度
   */
  barWidth?: number
  /**
   * 滚动条颜色
   */
  barColor?: string
  /**
   * 滚动条悬停颜色
   */
  barHoverColor?: string
  /**
   * 内容高度
   */
  height?: string
  /**
   * 内容最大高度
   */
  maxHeight?: string
  /**
   * 是否阻止滚动事件冒泡
   */
  noStop?: boolean
  /**
   * 是否总是显示滚动条
   */
  always?: boolean
  /**
   * 是否显示内容阴影
   */
  shadow?: boolean | 'hover'
}>(), {
  horizontal: true,
  vertical: true,
  barWidth: 6,
  barColor: '',
  barHoverColor: '',
  height: '',
  maxHeight: '',
  noStop: false,
  always: false,
  shadow: false,
})

// 获取日志记录器但目前未使用
// const scrollLogger = logger.client.child({ tag: 'scrollbar' })

// DOM引用
const containerRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const verticalThumbRef = ref<HTMLElement | null>(null)
const horizontalThumbRef = ref<HTMLElement | null>(null)

// 计算属性
const showVertical = computed(() => props.vertical)
const showHorizontal = computed(() => props.horizontal)

// 滚动条CSS变量
const barWidthVar = computed(() => props.barWidth)
const barColorVar = computed(() => props.barColor || null)
const barHoverColorVar = computed(() => props.barHoverColor || null)

// 容器样式
const containerStyle = computed(() => {
  const style = {} as Record<string, string>

  if (props.height)
    style.height = props.height
  if (props.maxHeight)
    style.maxHeight = props.maxHeight

  return style
})

// 滚动条状态
const verticalThumbHeight = ref(0)
const verticalThumbTop = ref(0)
const horizontalThumbWidth = ref(0)
const horizontalThumbLeft = ref(0)
const verticalThumbPressed = ref(false)
const horizontalThumbPressed = ref(false)
const verticalThumbHovered = ref(false)
const horizontalThumbHovered = ref(false)
const scrollbarHovered = ref(false)

// 计算滚动条显示状态
const showVerticalBar = computed(() =>
  props.always || scrollbarHovered.value || verticalThumbPressed.value,
)
const showHorizontalBar = computed(() =>
  props.always || scrollbarHovered.value || horizontalThumbPressed.value,
)

// 计算滚动条样式类
const scrollbarClass = computed(() => {
  const classes = ['ui-scrollbar']

  if (props.shadow === true)
    classes.push('ui-scrollbar--shadow')
  if (props.shadow === 'hover' && scrollbarHovered.value)
    classes.push('ui-scrollbar--shadow')

  return classes.join(' ')
})

// 计算滚动条轨道类
const verticalTrackClass = computed(() => {
  const classes = ['ui-scrollbar-track ui-scrollbar-track--vertical']

  if (showVerticalBar.value)
    classes.push('ui-scrollbar-track--visible')

  return classes.join(' ')
})

const horizontalTrackClass = computed(() => {
  const classes = ['ui-scrollbar-track ui-scrollbar-track--horizontal']

  if (showHorizontalBar.value)
    classes.push('ui-scrollbar-track--visible')

  return classes.join(' ')
})

// 计算滚动条滑块类
const verticalThumbClass = computed(() => {
  const classes = ['ui-scrollbar-thumb ui-scrollbar-thumb--vertical']

  if (verticalThumbPressed.value)
    classes.push('ui-scrollbar-thumb--active')
  if (verticalThumbHovered.value)
    classes.push('ui-scrollbar-thumb--hover')

  return classes.join(' ')
})

const horizontalThumbClass = computed(() => {
  const classes = ['ui-scrollbar-thumb ui-scrollbar-thumb--horizontal']

  if (horizontalThumbPressed.value)
    classes.push('ui-scrollbar-thumb--active')
  if (horizontalThumbHovered.value)
    classes.push('ui-scrollbar-thumb--hover')

  return classes.join(' ')
})

// 计算滚动条滑块样式
const verticalThumbStyle = computed(() => {
  return {
    height: `${verticalThumbHeight.value}px`,
    transform: `translateY(${verticalThumbTop.value}px)`,
  }
})

const horizontalThumbStyle = computed(() => {
  return {
    width: `${horizontalThumbWidth.value}px`,
    transform: `translateX(${horizontalThumbLeft.value}px)`,
  }
})

// 鼠标拖动状态记录
const thumbDragState = ref({
  startY: 0,
  startX: 0,
  startTop: 0,
  startLeft: 0,
  startScrollTop: 0,
  startScrollLeft: 0,
})

// 更新滚动条尺寸和位置
function updateScrollbar() {
  if (!wrapperRef.value || !contentRef.value)
    return

  const wrapper = wrapperRef.value
  const content = contentRef.value

  // 容器尺寸
  const wrapperHeight = wrapper.clientHeight
  const wrapperWidth = wrapper.clientWidth

  // 内容尺寸
  const contentHeight = content.scrollHeight
  const contentWidth = content.scrollWidth

  // 计算垂直滚动条尺寸和位置
  if (showVertical.value && contentHeight > wrapperHeight) {
    // 滑块高度比例：视口高度 / 内容高度
    const thumbHeightPercentage = wrapperHeight / contentHeight

    // 计算滑块高度，最小为20px
    verticalThumbHeight.value = Math.max(
      thumbHeightPercentage * wrapperHeight,
      20,
    )

    // 计算滑块位置
    const scrollPercentage = wrapper.scrollTop / (contentHeight - wrapperHeight)
    verticalThumbTop.value = scrollPercentage * (wrapperHeight - verticalThumbHeight.value)
  }
  else {
    verticalThumbHeight.value = 0
  }

  // 计算水平滚动条尺寸和位置
  if (showHorizontal.value && contentWidth > wrapperWidth) {
    // 滑块宽度比例：视口宽度 / 内容宽度
    const thumbWidthPercentage = wrapperWidth / contentWidth

    // 计算滑块宽度，最小为20px
    horizontalThumbWidth.value = Math.max(
      thumbWidthPercentage * wrapperWidth,
      20,
    )

    // 计算滑块位置
    const scrollPercentage = wrapper.scrollLeft / (contentWidth - wrapperWidth)
    horizontalThumbLeft.value = scrollPercentage * (wrapperWidth - horizontalThumbWidth.value)
  }
  else {
    horizontalThumbWidth.value = 0
  }
}

// 处理容器滚动事件
function handleScroll() {
  updateScrollbar()
}

// 处理鼠标进入/离开事件
function handleMouseEnter() {
  scrollbarHovered.value = true
}

function handleMouseLeave() {
  scrollbarHovered.value = false
}

// 处理垂直滚动条滑块鼠标事件
function handleVerticalThumbMouseDown(e: MouseEvent) {
  e.preventDefault()

  // 记录初始状态
  thumbDragState.value = {
    startY: e.clientY,
    startX: 0,
    startTop: verticalThumbTop.value,
    startLeft: 0,
    startScrollTop: wrapperRef.value?.scrollTop || 0,
    startScrollLeft: 0,
  }

  verticalThumbPressed.value = true

  // 添加全局鼠标事件监听
  document.addEventListener('mousemove', handleVerticalMouseMove)
  document.addEventListener('mouseup', handleVerticalMouseUp)
}

// 处理垂直滚动条鼠标移动
function handleVerticalMouseMove(e: MouseEvent) {
  if (!verticalThumbPressed.value || !wrapperRef.value)
    return

  // 计算鼠标移动距离
  const deltaY = e.clientY - thumbDragState.value.startY

  // 计算滚动条轨道有效高度
  const wrapper = wrapperRef.value
  const trackHeight = wrapper.clientHeight
  const thumbHeight = verticalThumbHeight.value

  // 计算新的滑块位置，确保在有效范围内
  const newTop = Math.max(0, Math.min(trackHeight - thumbHeight, thumbDragState.value.startTop + deltaY))
  verticalThumbTop.value = newTop

  // 计算对应的内容滚动位置
  const scrollRatio = newTop / (trackHeight - thumbHeight)
  const scrollHeight = wrapper.scrollHeight
  const maxScrollTop = scrollHeight - trackHeight

  // 设置内容滚动位置
  wrapper.scrollTop = scrollRatio * maxScrollTop
}

// 处理垂直滚动条鼠标释放
function handleVerticalMouseUp() {
  verticalThumbPressed.value = false

  // 移除全局鼠标事件监听
  document.removeEventListener('mousemove', handleVerticalMouseMove)
  document.removeEventListener('mouseup', handleVerticalMouseUp)
}

// 处理水平滚动条滑块鼠标事件
function handleHorizontalThumbMouseDown(e: MouseEvent) {
  e.preventDefault()

  // 记录初始状态
  thumbDragState.value = {
    startY: 0,
    startX: e.clientX,
    startTop: 0,
    startLeft: horizontalThumbLeft.value,
    startScrollTop: 0,
    startScrollLeft: wrapperRef.value?.scrollLeft || 0,
  }

  horizontalThumbPressed.value = true

  // 添加全局鼠标事件监听
  document.addEventListener('mousemove', handleHorizontalMouseMove)
  document.addEventListener('mouseup', handleHorizontalMouseUp)
}

// 处理水平滚动条鼠标移动
function handleHorizontalMouseMove(e: MouseEvent) {
  if (!horizontalThumbPressed.value || !wrapperRef.value)
    return

  // 计算鼠标移动距离
  const deltaX = e.clientX - thumbDragState.value.startX

  // 计算滚动条轨道有效宽度
  const wrapper = wrapperRef.value
  const trackWidth = wrapper.clientWidth
  const thumbWidth = horizontalThumbWidth.value

  // 计算新的滑块位置，确保在有效范围内
  const newLeft = Math.max(0, Math.min(trackWidth - thumbWidth, thumbDragState.value.startLeft + deltaX))
  horizontalThumbLeft.value = newLeft

  // 计算对应的内容滚动位置
  const scrollRatio = newLeft / (trackWidth - thumbWidth)
  const scrollWidth = wrapper.scrollWidth
  const maxScrollLeft = scrollWidth - trackWidth

  // 设置内容滚动位置
  wrapper.scrollLeft = scrollRatio * maxScrollLeft
}

// 处理水平滚动条鼠标释放
function handleHorizontalMouseUp() {
  horizontalThumbPressed.value = false

  // 移除全局鼠标事件监听
  document.removeEventListener('mousemove', handleHorizontalMouseMove)
  document.removeEventListener('mouseup', handleHorizontalMouseUp)
}

// 处理轨道点击事件
function handleVerticalTrackClick(e: MouseEvent) {
  if (!wrapperRef.value)
    return

  // 获取点击位置相对于轨道的偏移
  const track = e.currentTarget as HTMLElement
  const trackRect = track.getBoundingClientRect()
  const clickPosition = e.clientY - trackRect.top

  // 计算点击位置在轨道中的比例
  const wrapper = wrapperRef.value
  const trackHeight = wrapper.clientHeight
  const thumbHeight = verticalThumbHeight.value

  // 计算滑块中心应该在的位置
  const targetThumbCenter = clickPosition
  const targetThumbTop = Math.max(0, Math.min(trackHeight - thumbHeight, targetThumbCenter - (thumbHeight / 2)))

  // 计算对应的内容滚动位置
  const scrollRatio = targetThumbTop / (trackHeight - thumbHeight)
  const scrollHeight = wrapper.scrollHeight
  const maxScrollTop = scrollHeight - trackHeight

  // 设置内容滚动位置，使用平滑滚动
  wrapper.scrollTo({
    top: scrollRatio * maxScrollTop,
    behavior: 'smooth',
  })
}

function handleHorizontalTrackClick(e: MouseEvent) {
  if (!wrapperRef.value)
    return

  // 获取点击位置相对于轨道的偏移
  const track = e.currentTarget as HTMLElement
  const trackRect = track.getBoundingClientRect()
  const clickPosition = e.clientX - trackRect.left

  // 计算点击位置在轨道中的比例
  const wrapper = wrapperRef.value
  const trackWidth = wrapper.clientWidth
  const thumbWidth = horizontalThumbWidth.value

  // 计算滑块中心应该在的位置
  const targetThumbCenter = clickPosition
  const targetThumbLeft = Math.max(0, Math.min(trackWidth - thumbWidth, targetThumbCenter - (thumbWidth / 2)))

  // 计算对应的内容滚动位置
  const scrollRatio = targetThumbLeft / (trackWidth - thumbWidth)
  const scrollWidth = wrapper.scrollWidth
  const maxScrollLeft = scrollWidth - trackWidth

  // 设置内容滚动位置，使用平滑滚动
  wrapper.scrollTo({
    left: scrollRatio * maxScrollLeft,
    behavior: 'smooth',
  })
}

// 监听props.height和maxHeight的变化，更新滚动条
watch([() => props.height, () => props.maxHeight], () => {
  nextTick(updateScrollbar)
})

// 处理滑块鼠标悬停事件
function handleVerticalThumbMouseEnter() {
  verticalThumbHovered.value = true
}

function handleVerticalThumbMouseLeave() {
  verticalThumbHovered.value = false
}

function handleHorizontalThumbMouseEnter() {
  horizontalThumbHovered.value = true
}

function handleHorizontalThumbMouseLeave() {
  horizontalThumbHovered.value = false
}

// 滚动方法
function scrollTo(options: ScrollToOptions) {
  wrapperRef.value?.scrollTo(options)
}

function scrollBy(options: ScrollToOptions) {
  wrapperRef.value?.scrollBy(options)
}

function scrollToTop() {
  wrapperRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBottom() {
  if (wrapperRef.value) {
    const { scrollHeight, clientHeight } = wrapperRef.value
    wrapperRef.value.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' })
  }
}

// 处理滚轮事件
function handleWheel(e: WheelEvent) {
  if (props.noStop)
    return

  const isVerticalScroll = Math.abs(e.deltaY) >= Math.abs(e.deltaX)

  if (isVerticalScroll && showVertical.value) {
    const wrapper = wrapperRef.value
    if (!wrapper)
      return

    const { scrollTop, scrollHeight, clientHeight } = wrapper

    // 只有当滚动到边界时才阻止事件冒泡
    if (
      (e.deltaY < 0 && scrollTop <= 0) // 向上滚动且已到顶部
      || (e.deltaY > 0 && scrollTop >= scrollHeight - clientHeight) // 向下滚动且已到底部
    ) {
      e.preventDefault()
    }
  }
  else if (!isVerticalScroll && showHorizontal.value) {
    const wrapper = wrapperRef.value
    if (!wrapper)
      return

    const { scrollLeft, scrollWidth, clientWidth } = wrapper

    // 只有当滚动到边界时才阻止事件冒泡
    if (
      (e.deltaX < 0 && scrollLeft <= 0) // 向左滚动且已到左边界
      || (e.deltaX > 0 && scrollLeft >= scrollWidth - clientWidth) // 向右滚动且已到右边界
    ) {
      e.preventDefault()
    }
  }
}

// 在DOM更新后初始化
onMounted(() => {
  // 初始化滚动条
  nextTick(() => {
    updateScrollbar()

    // 添加DOM变化监听，当内容变化时更新滚动条
    if (contentRef.value) {
      const observer = new MutationObserver(() => {
        updateScrollbar()
      })

      observer.observe(contentRef.value, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      })

      // 清理观察器
      onUnmounted(() => {
        observer.disconnect()
      })
    }

    // 添加窗口尺寸变化监听
    window.addEventListener('resize', updateScrollbar)

    // 清理窗口事件监听
    onUnmounted(() => {
      window.removeEventListener('resize', updateScrollbar)

      // 确保清理鼠标事件监听
      document.removeEventListener('mousemove', handleVerticalMouseMove)
      document.removeEventListener('mouseup', handleVerticalMouseUp)
      document.removeEventListener('mousemove', handleHorizontalMouseMove)
      document.removeEventListener('mouseup', handleHorizontalMouseUp)
    })
  })
})

// 暴露组件方法和属性
defineExpose({
  scrollTo,
  scrollBy,
  scrollToTop,
  scrollToBottom,
  update: updateScrollbar,
  wrapperRef,
})
</script>

<template>
  <div
    ref="containerRef"
    :class="scrollbarClass"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 滚动内容容器 -->
    <div
      ref="wrapperRef"
      class="ui-scrollbar-wrapper"
      @scroll="handleScroll"
      @wheel="handleWheel"
    >
      <!-- 实际内容 -->
      <div ref="contentRef" class="ui-scrollbar-content">
        <slot />
      </div>
    </div>

    <!-- 垂直滚动条 -->
    <div
      v-if="showVertical && verticalThumbHeight > 0"
      :class="verticalTrackClass"
      @click="handleVerticalTrackClick"
    >
      <div
        ref="verticalThumbRef"
        :class="verticalThumbClass"
        :style="verticalThumbStyle"
        @mousedown="handleVerticalThumbMouseDown"
        @mouseenter="handleVerticalThumbMouseEnter"
        @mouseleave="handleVerticalThumbMouseLeave"
      />
    </div>

    <!-- 水平滚动条 -->
    <div
      v-if="showHorizontal && horizontalThumbWidth > 0"
      :class="horizontalTrackClass"
      @click="handleHorizontalTrackClick"
    >
      <div
        ref="horizontalThumbRef"
        :class="horizontalThumbClass"
        :style="horizontalThumbStyle"
        @mousedown="handleHorizontalThumbMouseDown"
        @mouseenter="handleHorizontalThumbMouseEnter"
        @mouseleave="handleHorizontalThumbMouseLeave"
      />
    </div>
  </div>
</template>

<style scoped>
.ui-scrollbar {
  --ui-scrollbar-bar-width: v-bind(barWidthVar);
  --ui-scrollbar-bar-color: v-bind(barColorVar);
  --ui-scrollbar-bar-hover-color: v-bind(barHoverColorVar);

  position: relative;
  overflow: hidden;
}

.ui-scrollbar--shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.ui-scrollbar-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
}

.ui-scrollbar-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.ui-scrollbar-content {
  min-width: 100%;
  box-sizing: border-box;
}

/* 滚动条轨道样式 */
.ui-scrollbar-track {
  position: absolute;
  border-radius: calc(var(--ui-scrollbar-bar-width, 6px) / 2);
  background-color: transparent;
  transition: background-color 0.3s;
  opacity: 0;
  transition:
    opacity 0.3s,
    background-color 0.3s;
}

.ui-scrollbar-track--visible {
  opacity: 1;
  background-color: var(--ui-scrollbar-track-bg, rgba(0, 0, 0, 0.1));
}

.ui-scrollbar-track--vertical {
  top: 0;
  right: 0;
  width: var(--ui-scrollbar-bar-width, 6px);
  height: 100%;
}

.ui-scrollbar-track--horizontal {
  bottom: 0;
  left: 0;
  height: var(--ui-scrollbar-bar-width, 6px);
  width: 100%;
}

/* 滚动条滑块样式 */
.ui-scrollbar-thumb {
  position: absolute;
  border-radius: calc(var(--ui-scrollbar-bar-width, 6px) / 2);
  background-color: var(--ui-scrollbar-bar-color, var(--ui-scrollbar-thumb-color, rgba(0, 0, 0, 0.3)));
  cursor: pointer;
  transition: background-color 0.3s;
}

.ui-scrollbar-thumb--vertical {
  width: 100%;
  left: 0;
}

.ui-scrollbar-thumb--horizontal {
  height: 100%;
  top: 0;
}

.ui-scrollbar-thumb--hover {
  background-color: var(--ui-scrollbar-bar-hover-color, var(--ui-scrollbar-thumb-hover-color, rgba(0, 0, 0, 0.5)));
}

.ui-scrollbar-thumb--active {
  background-color: var(--ui-scrollbar-bar-hover-color, var(--ui-scrollbar-thumb-active-color, rgba(0, 0, 0, 0.6)));
}
</style>
