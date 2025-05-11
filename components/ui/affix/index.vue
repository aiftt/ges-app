<script setup lang="ts" name="UiAffix">
/**
 * Affix 固钉组件
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19
 * 更新日期: 2024-09-15 - 使用集中管理的类型定义
 */

import type { PositionMode } from '~/types/ui'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 定义属性
const props = withDefaults(defineProps<{
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number
  /**
   * 距离窗口底部达到指定偏移量后触发
   */
  offsetBottom?: number
  /**
   * 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
   */
  target?: () => HTMLElement | Window
  /**
   * 设置固定的区域范围
   */
  targetContainer?: () => HTMLElement | Window
  /**
   * 固定状态改变时触发的回调函数
   */
  onChange?: (affixed: boolean) => void
  /**
   * z-index 值
   */
  zIndex?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 自定义样式类名
   */
  customClass?: string
  /**
   * 自定义样式
   */
  customStyle?: Record<string, any>
}>(), {
  offsetTop: undefined,
  offsetBottom: undefined,
  target: () => window,
  targetContainer: () => window,
  onChange: () => {},
  zIndex: 100,
  disabled: false,
  customClass: '',
  customStyle: () => ({}),
})

// 事件定义
const emit = defineEmits<{
  (e: 'change', affixed: boolean): void
}>()

// 响应式状态
const affixed = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const fixedEl = ref<HTMLElement | null>(null)
const placeholderEl = ref<HTMLElement | null>(null)
const position = ref<PositionMode>(props.offsetBottom === undefined ? 'top' : 'bottom')

// 样式计算
const fixedStyle = computed(() => {
  if (!affixed.value)
    return {}

  const style: Record<string, any> = {
    position: 'fixed',
    zIndex: props.zIndex,
  }

  if (position.value === 'top') {
    style.top = `${props.offsetTop}px`
  }
  else {
    style.bottom = `${props.offsetBottom}px`
  }

  return style
})

// 处理滚动事件
let scrollEventListener: (() => void) | null = null

function getTargetRect(target: Window | HTMLElement) {
  if (target === window) {
    return {
      top: 0,
      bottom: window.innerHeight,
      width: window.innerWidth,
    }
  }
  return (target as HTMLElement).getBoundingClientRect()
}

function updatePosition() {
  if (props.disabled || !wrapperRef.value)
    return

  const targetNode = props.target()
  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  const targetRect = getTargetRect(targetNode)

  if (position.value === 'top') {
    const affixedNow = wrapperRect.top - (props.offsetTop || 0) < targetRect.top

    if (affixedNow !== affixed.value) {
      affixed.value = affixedNow

      if (affixed.value && fixedEl.value && placeholderEl.value) {
        placeholderEl.value.style.width = `${wrapperRect.width}px`
        placeholderEl.value.style.height = `${wrapperRect.height}px`
        fixedEl.value.style.width = `${wrapperRect.width}px`
      }

      emit('change', affixed.value)
      props.onChange?.(affixed.value)
    }
  }
  else {
    const affixedNow = targetRect.bottom - (props.offsetBottom || 0) < wrapperRect.bottom

    if (affixedNow !== affixed.value) {
      affixed.value = affixedNow

      if (affixed.value && fixedEl.value && placeholderEl.value) {
        placeholderEl.value.style.width = `${wrapperRect.width}px`
        placeholderEl.value.style.height = `${wrapperRect.height}px`
        fixedEl.value.style.width = `${wrapperRect.width}px`
      }

      emit('change', affixed.value)
      props.onChange?.(affixed.value)
    }
  }
}

// 初始化滚动监听
function initScrollListener() {
  const targetNode = props.target()
  const targetContainerNode = props.targetContainer()

  const handleScroll = () => {
    if (wrapperRef.value) {
      updatePosition()
    }
  }

  targetNode.addEventListener('scroll', handleScroll)
  if (targetContainerNode !== targetNode) {
    targetContainerNode.addEventListener('scroll', handleScroll)
  }

  scrollEventListener = () => {
    targetNode.removeEventListener('scroll', handleScroll)
    if (targetContainerNode !== targetNode) {
      targetContainerNode.removeEventListener('scroll', handleScroll)
    }
  }

  window.addEventListener('resize', updatePosition)
}

// 生命周期钩子
onMounted(() => {
  if (!props.disabled) {
    initScrollListener()
    // 初始化时执行一次位置更新
    nextTick(() => {
      updatePosition()
    })
  }
})

onBeforeUnmount(() => {
  if (scrollEventListener) {
    scrollEventListener()
    window.removeEventListener('resize', updatePosition)
  }
})
</script>

<template>
  <div ref="wrapperRef" :class="customClass" :style="customStyle">
    <div v-if="affixed" ref="placeholderEl" />
    <div ref="fixedEl" :style="affixed ? fixedStyle : {}">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-affix {
  position: relative;
}
</style>
