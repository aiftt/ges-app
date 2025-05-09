<script setup lang="ts" name="UiCarousel">
/**
 * 轮播图组件
 * 创建日期: 2024-07-22
 * 作者: aiftt
 * 更新日期: 2024-07-22 - 初始实现
 * 更新日期: 2024-07-23 - 修复TypeScript类型错误
 * 更新日期: 2024-07-23 - 优化图片判断逻辑，添加imageMode属性
 */
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 轮播内容项
   */
  items?: any[]
  /**
   * 自动播放
   */
  autoplay?: boolean
  /**
   * 自动播放间隔，单位毫秒
   */
  interval?: number
  /**
   * 是否显示箭头
   */
  arrow?: 'always' | 'hover' | 'never'
  /**
   * 指示器位置
   */
  indicatorPosition?: 'inside' | 'outside' | 'none'
  /**
   * 初始激活索引
   */
  initialIndex?: number
  /**
   * 轮播方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 是否循环播放
   */
  loop?: boolean
  /**
   * 鼠标悬停时暂停自动播放
   */
  pauseOnHover?: boolean
  /**
   * 动画效果
   */
  effect?: 'fade' | 'slide'
  /**
   * 切换动画持续时间，单位毫秒
   */
  duration?: number
  /**
   * 是否显示指示器
   */
  indicator?: boolean
  /**
   * 高度
   */
  height?: string | number
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 指示器触发方式
   */
  indicatorTrigger?: 'click' | 'hover'
  /**
   * 图片模式
   * - auto: 自动检测字符串是否为图片URL
   * - always: 始终将items中的元素作为图片URL处理
   * - never: 不自动处理为图片
   */
  imageMode?: 'auto' | 'always' | 'never'
  /**
   * 图片加载质量，用于nuxt-img组件
   */
  imgQuality?: number
  /**
   * 图片格式，用于nuxt-img组件
   */
  imgFormat?: string
  /**
   * 图片懒加载，用于nuxt-img组件
   */
  imgLazy?: boolean
}>(), {
  items: () => [],
  autoplay: true,
  interval: 3000,
  arrow: 'hover',
  indicatorPosition: 'inside',
  initialIndex: 0,
  direction: 'horizontal',
  loop: true,
  pauseOnHover: true,
  effect: 'slide',
  duration: 300,
  indicator: true,
  height: '100%',
  width: '100%',
  indicatorTrigger: 'click',
  imageMode: 'auto',
  imgQuality: 80,
  imgFormat: 'webp',
  imgLazy: true,
})

// 定义事件
const emit = defineEmits<{
  /**
   * 轮播切换事件
   */
  (e: 'change', index: number, oldIndex: number): void
}>()

// 添加defineComponent来解决类型问题
defineComponent({
  name: 'UiCarousel',
  props: {
    items: Array,
    autoplay: Boolean,
    interval: Number,
    arrow: String,
    indicatorPosition: String,
    initialIndex: Number,
    direction: String,
    loop: Boolean,
    pauseOnHover: Boolean,
    effect: String,
    duration: Number,
    indicator: Boolean,
    height: [String, Number],
    width: [String, Number],
    indicatorTrigger: String,
    imageMode: String,
    imgQuality: Number,
    imgFormat: String,
    imgLazy: Boolean,
  },
})

// 内部状态
const activeIndex = ref(props.initialIndex || 0)
const isHovering = ref(false)
const isAnimating = ref(false)
const carouselRef = ref<HTMLElement | null>(null)
const itemsRef = ref<HTMLElement | null>(null)
const timer = ref<number | null>(null)
const slideDirection = ref<'forward' | 'backward'>('forward')
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const _translateX = ref(0)
const _translateY = ref(0)
const initialTranslate = ref(0)
const dragDistance = ref(0)

// 样式变量
const containerStyle = computed(() => {
  const style: Record<string, string> = {
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  }
  return style
})

const itemsContainerStyle = computed(() => {
  const transition = isAnimating.value ? `transform ${props.duration}ms ease` : 'none'
  const style: Record<string, string> = {
    transition,
  }

  if (props.effect === 'slide') {
    if (props.direction === 'horizontal') {
      const offset = -activeIndex.value * 100
      style.transform = `translateX(${offset + (dragDistance.value / (carouselRef.value?.offsetWidth || 1) * 100)}%)`
    }
    else {
      const offset = -activeIndex.value * 100
      style.transform = `translateY(${offset + (dragDistance.value / (carouselRef.value?.offsetHeight || 1) * 100)}%)`
    }
  }

  return style
})

// 切换到指定索引
function setActiveItem(index: number) {
  if (isAnimating.value)
    return

  // 保存前一个索引
  const oldIndex = activeIndex.value

  // 确定方向
  if (index > oldIndex) {
    slideDirection.value = 'forward'
  }
  else if (index < oldIndex) {
    slideDirection.value = 'backward'
  }

  // 处理循环逻辑
  if (props.loop) {
    if (index < 0) {
      index = props.items.length - 1
    }
    else if (index >= props.items.length) {
      index = 0
    }
  }
  else {
    if (index < 0 || index >= props.items.length) {
      return
    }
  }

  isAnimating.value = true
  activeIndex.value = index

  // 动画结束后清除标志
  setTimeout(() => {
    isAnimating.value = false
  }, props.duration)

  // 触发change事件
  emit('change', index, oldIndex)
}

// 切换到下一项
function next() {
  setActiveItem(activeIndex.value + 1)
}

// 切换到上一项
function prev() {
  setActiveItem(activeIndex.value - 1)
}

// 处理指示器点击
function handleIndicatorClick(index: number) {
  setActiveItem(index)
}

// 处理指示器悬停
function handleIndicatorHover(index: number) {
  if (props.indicatorTrigger === 'hover') {
    setActiveItem(index)
  }
}

// 鼠标悬停处理
function handleMouseEnter() {
  isHovering.value = true
  if (props.pauseOnHover && timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 鼠标离开处理
function handleMouseLeave() {
  isHovering.value = false
  startTimer()
}

// 触摸处理
function handleTouchStart(event: TouchEvent) {
  if (isAnimating.value)
    return

  isDragging.value = true
  startX.value = event.touches[0].clientX
  startY.value = event.touches[0].clientY
  dragDistance.value = 0

  if (props.direction === 'horizontal') {
    initialTranslate.value = -activeIndex.value * (carouselRef.value?.offsetWidth || 0)
  }
  else {
    initialTranslate.value = -activeIndex.value * (carouselRef.value?.offsetHeight || 0)
  }

  if (props.pauseOnHover && timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 触摸移动处理
function handleTouchMove(event: TouchEvent) {
  if (!isDragging.value)
    return

  const currentX = event.touches[0].clientX
  const currentY = event.touches[0].clientY

  if (props.direction === 'horizontal') {
    dragDistance.value = currentX - startX.value
  }
  else {
    dragDistance.value = currentY - startY.value
  }
}

// 触摸结束处理
function handleTouchEnd() {
  if (!isDragging.value)
    return

  isDragging.value = false
  const threshold = props.direction === 'horizontal'
    ? (carouselRef.value?.offsetWidth || 0) * 0.2
    : (carouselRef.value?.offsetHeight || 0) * 0.2

  if (Math.abs(dragDistance.value) > threshold) {
    // 切换到下一张或上一张
    if (dragDistance.value > 0) {
      prev()
    }
    else {
      next()
    }
  }

  // 重置拖拽距离
  dragDistance.value = 0

  // 恢复自动播放
  startTimer()
}

// 开始自动播放
function startTimer() {
  if (props.autoplay && !timer.value && props.items.length > 1) {
    timer.value = window.setInterval(() => {
      if (!isHovering.value || !props.pauseOnHover) {
        next()
      }
    }, props.interval)
  }
}

// 停止自动播放
function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 监听items变化
watch(() => props.items, () => {
  if (activeIndex.value >= props.items.length) {
    activeIndex.value = props.items.length > 0 ? props.items.length - 1 : 0
  }

  nextTick(() => {
    stopTimer()
    startTimer()
  })
}, { deep: true })

// 监听自动播放选项变化
watch(() => props.autoplay, (val) => {
  if (val) {
    startTimer()
  }
  else {
    stopTimer()
  }
})

// 组件挂载时初始化
onMounted(() => {
  nextTick(() => {
    startTimer()
  })
})

// 组件卸载前清理
onBeforeUnmount(() => {
  stopTimer()
})

// 暴露方法
defineExpose({
  next,
  prev,
  setActiveItem,
})
</script>

<template>
  <!-- @ts-ignore -->
  <div
    ref="carouselRef"
    class="ui-carousel"
    :class="[
      `ui-carousel--${props.direction}`,
      `ui-carousel--${props.effect}`,
      { 'ui-carousel--dragging': isDragging },
    ]"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 轮播容器 -->
    <div
      ref="itemsRef"
      class="ui-carousel-items"
      :style="itemsContainerStyle"
    >
      <!-- 默认插槽，用于自定义内容 -->
      <slot>
        <!-- 默认内容，根据items渲染 -->
        <div
          v-for="(item, index) in props.items"
          :key="index"
          class="ui-carousel-item"
          :class="{ 'ui-carousel-item--active': activeIndex === index }"
        >
          <!-- 使用item插槽优先展示 -->
          <slot name="item" :item="item" :index="index">
            <!-- 智能处理图片 -->
            <template
              v-if="(props.imageMode === 'always')
                || (props.imageMode === 'auto' && typeof item === 'string'
                  && (item.endsWith('.jpg') || item.endsWith('.jpeg')
                    || item.endsWith('.png') || item.endsWith('.gif')
                    || item.endsWith('.webp') || item.endsWith('.svg')))"
            >
              <nuxt-img
                :src="item"
                class="ui-carousel-item-image"
                :quality="props.imgQuality"
                :format="props.imgFormat"
                :loading="props.imgLazy ? 'lazy' : undefined"
                alt="carousel item"
              />
            </template>
            <!-- 非图片内容 -->
            <template v-else>
              {{ item }}
            </template>
          </slot>
        </div>
      </slot>
    </div>

    <!-- 箭头导航 -->
    <div
      v-if="props.arrow !== 'never' && props.items.length > 1"
      class="ui-carousel-arrow ui-carousel-arrow--prev"
      :class="{ 'ui-carousel-arrow--hover': props.arrow === 'hover' }"
      @click.stop="prev"
    >
      <slot name="arrow-prev">
        <ui-icon icon="carbon:chevron-left" class="ui-carousel-arrow-icon" />
      </slot>
    </div>
    <div
      v-if="props.arrow !== 'never' && props.items.length > 1"
      class="ui-carousel-arrow ui-carousel-arrow--next"
      :class="{ 'ui-carousel-arrow--hover': props.arrow === 'hover' }"
      @click.stop="next"
    >
      <slot name="arrow-next">
        <ui-icon icon="carbon:chevron-right" class="ui-carousel-arrow-icon" />
      </slot>
    </div>

    <!-- 指示器 -->
    <div
      v-if="props.indicator && props.items.length > 1"
      class="ui-carousel-indicators"
      :class="`ui-carousel-indicators--${props.indicatorPosition}`"
    >
      <slot name="indicators" :active-index="activeIndex" :count="props.items.length">
        <button
          v-for="index in props.items.length"
          :key="index"
          class="ui-carousel-indicator"
          :class="{ 'ui-carousel-indicator--active': activeIndex === index - 1 }"
          @click.stop="handleIndicatorClick(index - 1)"
          @mouseenter="handleIndicatorHover(index - 1)"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ui-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
}

.ui-carousel-items {
  display: flex;
  height: 100%;
  width: 100%;
}

.ui-carousel--horizontal .ui-carousel-items {
  flex-direction: row;
}

.ui-carousel--vertical .ui-carousel-items {
  flex-direction: column;
}

.ui-carousel--slide .ui-carousel-items {
  transition-property: transform;
}

.ui-carousel--fade .ui-carousel-items {
  position: relative;
}

.ui-carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.ui-carousel--fade .ui-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.ui-carousel--fade .ui-carousel-item--active {
  opacity: 1;
  z-index: 1;
}

.ui-carousel-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(31, 41, 55, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.ui-carousel-arrow:hover {
  background-color: rgba(31, 41, 55, 0.8);
}

.ui-carousel-arrow--prev {
  left: 16px;
}

.ui-carousel-arrow--next {
  right: 16px;
}

.ui-carousel-arrow--hover {
  opacity: 0;
}

.ui-carousel:hover .ui-carousel-arrow--hover {
  opacity: 1;
}

.ui-carousel-arrow-icon {
  font-size: 24px;
}

.ui-carousel-indicators {
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.ui-carousel-indicators--inside {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}

.ui-carousel-indicators--outside {
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.ui-carousel-indicators--none {
  display: none;
}

.ui-carousel-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: none;
  padding: 0;
  transition: all 0.3s ease;
}

.ui-carousel-indicator--active {
  background-color: var(--ui-color-primary, #10b981);
  width: 16px;
  border-radius: 4px;
}

/* 垂直方向样式调整 */
.ui-carousel--vertical .ui-carousel-arrow--prev {
  top: 16px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.ui-carousel--vertical .ui-carousel-arrow--next {
  top: auto;
  bottom: 16px;
  left: 50%;
  right: auto;
  transform: translateX(-50%) rotate(90deg);
}

.ui-carousel--vertical .ui-carousel-indicators {
  flex-direction: column;
  bottom: 50%;
  left: auto;
  right: 16px;
  transform: translateY(50%);
}

.ui-carousel--vertical .ui-carousel-indicators--outside {
  right: -30px;
  bottom: 50%;
}

.ui-carousel--vertical .ui-carousel-indicator--active {
  height: 16px;
  width: 8px;
}

/* 拖拽过程中禁用过渡效果 */
.ui-carousel--dragging .ui-carousel-items {
  transition: none;
}
</style>
