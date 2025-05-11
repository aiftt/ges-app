<script setup lang="ts" name="UiInfiniteScroll">
/**
 * InfiniteScroll 无限滚动组件
 * 创建日期: 2024-09-01
 * 作者: aiftt
 * 更新日期: 2024-09-01 - 首次实现
 * 更新日期: 2024-09-02 - 优化为虚拟滚动实现，解决大数据量DOM元素过多问题
 */

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 滚动容器，默认为组件的父容器
   * 可以是CSS选择器或HTML元素
   */
  target?: string | HTMLElement
  /**
   * 距离底部多少像素触发加载
   */
  distance?: number
  /**
   * 是否立即检查并触发加载
   */
  immediate?: boolean
  /**
   * 滚动方向
   */
  direction?: 'top' | 'bottom'
  /**
   * 节流延迟时间(ms)
   */
  throttleDelay?: number
  /**
   * 是否显示加载中状态
   */
  loading?: boolean
  /**
   * 是否已无更多数据
   */
  noMore?: boolean
  /**
   * 加载中的文本
   */
  loadingText?: string
  /**
   * 无更多数据的文本
   */
  noMoreText?: string
  /**
   * 加载失败的文本
   */
  errorText?: string
  /**
   * 是否发生加载错误
   */
  error?: boolean
  /**
   * 列表项高度，用于虚拟滚动计算
   */
  itemHeight?: number
  /**
   * 预渲染的屏幕数量（缓冲区大小）
   */
  bufferSize?: number
  /**
   * 数据列表
   */
  data?: any[]
}>(), {
  disabled: false,
  distance: 50,
  immediate: true,
  direction: 'bottom',
  throttleDelay: 200,
  loading: false,
  noMore: false,
  loadingText: '加载中...',
  noMoreText: '没有更多数据了',
  errorText: '加载失败，点击重试',
  error: false,
  itemHeight: 50,
  bufferSize: 5,
  data: () => [],
})

// 定义事件
const emit = defineEmits<{
  (e: 'load'): void
  (e: 'retry'): void
}>()

// 组件引用
const containerRef = ref<HTMLElement>()
// 滚动容器
let scrollContainer: HTMLElement | Window | null = null
// 上次滚动位置
let lastScrollTop = 0
// 节流定时器
let throttleTimer: number | null = null

// 虚拟滚动相关状态
const containerHeight = ref(0)
const scrollTop = ref(0)

// 列表容器总高度
const listHeight = computed(() => {
  return props.data.length * props.itemHeight
})

// 可视区域可以显示的元素数量
const visibleCount = computed(() => {
  return Math.ceil(containerHeight.value / props.itemHeight)
})

// 计算当前应该渲染的元素范围
const visibleRange = computed(() => {
  // 根据滚动位置和缓冲区大小计算开始和结束索引
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.bufferSize)
  const end = Math.min(
    props.data.length,
    start + visibleCount.value + 2 * props.bufferSize,
  )

  return { start, end }
})

// 实际需要渲染的数据列表
const visibleData = computed(() => {
  const { start, end } = visibleRange.value
  return props.data.slice(start, end)
})

// 计算每个元素的偏移位置
function getTransform(index: number) {
  const { start } = visibleRange.value
  const offset = (index + start) * props.itemHeight
  return `translate3d(0, ${offset}px, 0)`
}

// 获取滚动容器
function getScrollContainer() {
  if (!import.meta.client)
    return null

  if (props.target === undefined) {
    // 默认使用父容器
    return containerRef.value?.parentElement || null
  }

  // 如果提供了具体的元素
  if (props.target instanceof HTMLElement) {
    return props.target
  }

  // 如果提供了选择器
  if (typeof props.target === 'string') {
    return document.querySelector(props.target) as HTMLElement
  }

  return null
}

// 检查是否应该加载更多
function checkShouldLoadMore() {
  if (props.disabled || props.loading || props.noMore || props.error) {
    return false
  }

  if (!scrollContainer)
    return false

  let containerHeight = 0
  let scrollTop = 0
  let scrollHeight = 0

  if (scrollContainer === window) {
    // 窗口滚动
    containerHeight = window.innerHeight
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  }
  else {
    // 元素滚动
    const container = scrollContainer as HTMLElement
    containerHeight = container.clientHeight
    scrollTop = container.scrollTop
    scrollHeight = container.scrollHeight
  }

  // 根据方向决定是否触发加载
  if (props.direction === 'bottom') {
    return scrollTop + containerHeight + props.distance >= scrollHeight
  }
  else {
    return scrollTop <= props.distance
  }
}

// 触发加载事件
function emitLoad() {
  if (checkShouldLoadMore()) {
    emit('load')
  }
}

// 节流函数
function throttle(fn: () => void) {
  if (throttleTimer !== null)
    return

  throttleTimer = window.setTimeout(() => {
    fn()
    throttleTimer = null
  }, props.throttleDelay)
}

// 处理滚动事件
function handleScroll(event: Event) {
  if (!import.meta.client)
    return

  const target = event.target as HTMLElement | Document

  // 更新滚动位置
  if (target === document) {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
  }
  else {
    scrollTop.value = (target as HTMLElement).scrollTop
  }

  // 处理方向检查
  if (scrollContainer === window) {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 处理滚动方向
    if (props.direction === 'bottom' && currentScrollTop < lastScrollTop) {
      lastScrollTop = currentScrollTop
      return
    }
    else if (props.direction === 'top' && currentScrollTop > lastScrollTop) {
      lastScrollTop = currentScrollTop
      return
    }
    lastScrollTop = currentScrollTop
  }
  else if (scrollContainer) {
    const container = scrollContainer as HTMLElement
    const currentScrollTop = container.scrollTop

    // 处理滚动方向
    if (props.direction === 'bottom' && currentScrollTop < lastScrollTop) {
      lastScrollTop = currentScrollTop
      return
    }
    else if (props.direction === 'top' && currentScrollTop > lastScrollTop) {
      lastScrollTop = currentScrollTop
      return
    }
    lastScrollTop = currentScrollTop
  }

  // 使用节流函数处理加载检查
  throttle(emitLoad)
}

// 处理加载失败重试
function handleRetry() {
  if (props.error) {
    emit('retry')
  }
}

// 测量容器高度
function measureContainer() {
  if (!scrollContainer)
    return

  if (scrollContainer === window) {
    containerHeight.value = window.innerHeight
  }
  else {
    containerHeight.value = (scrollContainer as HTMLElement).clientHeight
  }
}

// 绑定滚动事件
function bindScrollEvent() {
  if (!import.meta.client)
    return

  scrollContainer = getScrollContainer()
  if (!scrollContainer) {
    // 如果没有找到容器，使用window作为滚动容器
    scrollContainer = window
  }

  // 记录初始滚动位置
  if (scrollContainer === window) {
    lastScrollTop = document.documentElement.scrollTop || document.body.scrollTop
    scrollTop.value = lastScrollTop
  }
  else {
    lastScrollTop = (scrollContainer as HTMLElement).scrollTop
    scrollTop.value = lastScrollTop
  }

  scrollContainer.addEventListener('scroll', handleScroll)

  // 测量容器高度，用于虚拟滚动计算
  measureContainer()

  // 当窗口大小改变时重新计算高度
  window.addEventListener('resize', measureContainer)

  // 如果设置了immediate，立即检查是否需要加载
  if (props.immediate) {
    emitLoad()
  }
}

// 解绑滚动事件
function unbindScrollEvent() {
  if (!import.meta.client || !scrollContainer)
    return

  scrollContainer.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measureContainer)
  scrollContainer = null

  // 清除节流定时器
  if (throttleTimer !== null) {
    clearTimeout(throttleTimer)
    throttleTimer = null
  }
}

// 生命周期钩子
onMounted(() => {
  bindScrollEvent()
})

onBeforeUnmount(() => {
  unbindScrollEvent()
})

// 监听data变化，更新视图
watch(() => props.data, () => {
  nextTick(() => {
    if (props.direction === 'bottom' && props.immediate) {
      emitLoad()
    }
  })
}, { deep: true })
</script>

<template>
  <div ref="containerRef" class="ui-infinite-scroll">
    <!-- 虚拟滚动容器 -->
    <div class="ui-infinite-scroll-list" :style="{ height: `${listHeight}px` }">
      <!-- 只渲染可见区域的元素 -->
      <div
        v-for="(item, index) in visibleData"
        :key="index"
        class="ui-infinite-scroll-item"
        :style="{ transform: getTransform(index), position: 'absolute', width: '100%', height: `${props.itemHeight}px` }"
      >
        <slot :item="item" :index="index + visibleRange.start" />
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="ui-infinite-scroll-loading">
      <slot name="loading">
        <div class="ui-infinite-scroll-text">
          {{ loadingText }}
        </div>
      </slot>
    </div>

    <!-- 无更多数据 -->
    <div v-else-if="noMore" class="ui-infinite-scroll-no-more">
      <slot name="no-more">
        <div class="ui-infinite-scroll-text">
          {{ noMoreText }}
        </div>
      </slot>
    </div>

    <!-- 加载错误 -->
    <div v-else-if="error" class="ui-infinite-scroll-error" @click="handleRetry">
      <slot name="error">
        <div class="ui-infinite-scroll-text">
          {{ errorText }}
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-infinite-scroll {
  position: relative;
  width: 100%;
  overflow: hidden;

  &-list {
    position: relative;
    width: 100%;
  }

  &-loading,
  &-no-more,
  &-error {
    padding: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-error {
    cursor: pointer;
  }

  &-text {
    font-size: 14px;
    color: var(--ui-color-text-secondary, #909399);
  }
}
</style>
