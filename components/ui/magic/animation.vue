<script setup lang="ts" name="UiMagicAnimation">
/**
 * Magic动画组件
 * 创建日期: 2024-11-22
 * 作者: aiftt
 * 基于Magic.css动画库的组件封装
 * 更新日期: 2024-11-22 - 更新类名前缀为magic-anim-
 */

const props = withDefaults(defineProps<{
  /**
   * 动画名称
   */
  name?: string
  /**
   * 动画速度
   */
  speed?: 'normal' | 'fast' | 'slow'
  /**
   * 是否自动播放
   */
  autoplay?: boolean
  /**
   * 是否循环播放
   */
  loop?: boolean
  /**
   * 延迟时间(毫秒)
   */
  delay?: number
  /**
   * 是否正在播放
   */
  playing?: boolean
  /**
   * 是否反向播放
   */
  reverse?: boolean
}>(), {
  name: 'puffIn',
  speed: 'normal',
  autoplay: true,
  loop: false,
  delay: 0,
  playing: false,
  reverse: false,
})

const emit = defineEmits<{
  (e: 'update:playing', value: boolean): void
  (e: 'start'): void
  (e: 'end'): void
}>()

// 内部状态
const isPlaying = defineModel<boolean>('playing', { default: false })
const elementRef = ref<HTMLElement | null>(null)
const animationEndHandler = ref<() => void>(() => {})

// 计算动画类名
const animationClass = computed(() => {
  const speedClass = props.speed === 'normal'
    ? ''
    : props.speed === 'fast'
      ? 'magic-anim-animated--fast'
      : 'magic-anim-animated--slow'

  return {
    [`magic-anim-${props.name}`]: isPlaying.value,
    [speedClass]: speedClass && isPlaying.value,
  }
})

// 计算动画样式
const animationStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.delay > 0 && isPlaying.value) {
    styles['animation-delay'] = `${props.delay}ms`
  }

  if (props.loop && isPlaying.value) {
    styles['animation-iteration-count'] = 'infinite'
  }

  if (props.reverse && isPlaying.value) {
    styles['animation-direction'] = 'reverse'
  }

  return styles
})

// 播放动画
function play() {
  if (!isPlaying.value) {
    isPlaying.value = true
    emit('update:playing', true)
    emit('start')
  }
}

// 停止动画
function stop() {
  if (isPlaying.value) {
    isPlaying.value = false
    emit('update:playing', false)
  }
}

// 重新播放动画
function replay() {
  stop()
  // 使用nextTick确保DOM更新后再播放动画
  nextTick(() => {
    play()
  })
}

// 监听动画结束
function onAnimationEnd() {
  if (!props.loop) {
    isPlaying.value = false
    emit('update:playing', false)
    emit('end')
  }
}

// 设置动画监听
function setupAnimation() {
  if (elementRef.value) {
    elementRef.value.addEventListener('animationend', onAnimationEnd)
    animationEndHandler.value = onAnimationEnd
  }
}

// 移除动画监听
function cleanupAnimation() {
  if (elementRef.value) {
    elementRef.value.removeEventListener('animationend', animationEndHandler.value)
  }
}

// 自动播放
watch(() => props.autoplay, (newValue) => {
  if (newValue && !isPlaying.value) {
    play()
  }
}, { immediate: true })

// 监听playing属性变化
watch(() => props.playing, (newValue) => {
  if (newValue !== isPlaying.value) {
    isPlaying.value = newValue
  }
})

// 生命周期钩子
onMounted(() => {
  setupAnimation()
  if (props.autoplay) {
    play()
  }
})

onBeforeUnmount(() => {
  cleanupAnimation()
})

// 暴露API
defineExpose({
  play,
  stop,
  replay,
})
</script>

<template>
  <div ref="elementRef" :class="animationClass" :style="animationStyle">
    <slot />
  </div>
</template>
