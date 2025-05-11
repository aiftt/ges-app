<script setup lang="ts" name="UiBackTop">
/**
 * BackTop 回到顶部组件
 * 创建日期: 2024-08-25
 * 作者: aiftt
 * 更新日期: 2024-08-25 - 初始实现
 */

import { useScroll } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 显示回到顶部按钮的滚动高度，单位 px
   */
  visibilityHeight?: number
  /**
   * 显示位置，右下角距离页面右部和底部的距离，单位 px
   */
  right?: number
  bottom?: number
  /**
   * 自定义样式
   */
  customStyle?: Record<string, string>
  /**
   * 自定义类名
   */
  customClass?: string
  /**
   * 滚动目标元素，默认为 document
   */
  target?: string | HTMLElement
  /**
   * 回到顶部的动画持续时间，单位 ms
   */
  duration?: number
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 组件大小
   */
  size?: 'small' | 'default' | 'large'
}>(), {
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
  customStyle: () => ({}),
  customClass: '',
  duration: 300,
  icon: 'carbon:arrow-up',
  size: 'default',
})

// 定义事件
const emit = defineEmits<{
  (e: 'click'): void
}>()

// 响应式状态
const visible = ref(false)
const isClient = ref(false)

// 获取目标元素的滚动信息
function getTarget(): HTMLElement | Document {
  if (!isClient.value)
    return document

  if (props.target) {
    if (typeof props.target === 'string') {
      return document.querySelector(props.target) as HTMLElement || document
    }
    return props.target || document
  }
  return document
}

// 使用 vueuse 的 useScroll 获取滚动状态
const { y: scrollTop } = useScroll(getTarget)

// 监听滚动位置变化
watch(scrollTop, (value) => {
  visible.value = value >= props.visibilityHeight
})

// 计算样式
const wrapperStyle = computed(() => {
  const style = {
    ...props.customStyle,
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
  }
  return style
})

// 计算组件尺寸类名
const sizeClass = computed(() => {
  const classes = ['ui-back-top']
  if (props.size) {
    classes.push(`ui-back-top--${props.size}`)
  }
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

// 滚动到顶部
function scrollToTop() {
  // 仅在客户端执行
  if (!isClient.value)
    return

  const target = getTarget()
  const startTime = Date.now()
  const startScrollTop = target === document
    ? document.documentElement.scrollTop || document.body.scrollTop
    : (target as HTMLElement).scrollTop

  const frameFunc = () => {
    if (!isClient.value)
      return

    const progress = (Date.now() - startTime) / props.duration
    if (progress < 1) {
      const scrollTop = startScrollTop * (1 - easeInOutCubic(progress))
      if (target === document) {
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop
      }
      else {
        (target as HTMLElement).scrollTop = scrollTop
      }
      requestAnimationFrame(frameFunc)
    }
    else {
      if (target === document) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      }
      else {
        (target as HTMLElement).scrollTop = 0
      }
    }
  }

  requestAnimationFrame(frameFunc)
  emit('click')
}

// 缓动函数
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

// 组件挂载
onMounted(() => {
  isClient.value = import.meta.client
})
</script>

<template>
  <ClientOnly>
    <Transition name="back-top">
      <div
        v-show="visible"
        :class="sizeClass"
        :style="wrapperStyle"
        @click="scrollToTop"
      >
        <slot>
          <ui-icon :icon="icon" class="ui-back-top-icon" />
        </slot>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.ui-back-top {
  position: fixed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--ui-back-top-bg, rgba(255, 255, 255, 0.9));
  box-shadow: var(--ui-back-top-shadow, 0 2px 8px 0 rgba(0, 0, 0, 0.12));
  transition: all 0.3s;
  color: var(--ui-back-top-color, #409eff);
  z-index: 1000;
}

.ui-back-top:hover {
  background-color: var(--ui-back-top-hover-bg, rgba(255, 255, 255, 1));
  color: var(--ui-back-top-hover-color, #2872e8);
}

.dark .ui-back-top {
  --ui-back-top-bg: rgba(40, 40, 40, 0.9);
  --ui-back-top-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  --ui-back-top-color: #a0cfff;
  --ui-back-top-hover-bg: rgba(50, 50, 50, 1);
  --ui-back-top-hover-color: #79bbff;
}

.ui-back-top--small {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.ui-back-top--default {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.ui-back-top--large {
  width: 56px;
  height: 56px;
  font-size: 24px;
}

/* 过渡动画 */
.back-top-enter-active,
.back-top-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
