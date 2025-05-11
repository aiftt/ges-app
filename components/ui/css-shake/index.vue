<script setup lang="ts" name="UiCssShake">
/**
 * CSS Shake动画组件
 * 创建日期: 2024-11-27
 * 作者: aiftt
 * 说明: 为元素添加摇晃动画效果，基于CSShake库
 */

import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue'

interface Props {
  /**
   * 摇晃类型
   * @default 'base'
   */
  type?: 'base' | 'slow' | 'little' | 'hard' | 'horizontal' | 'vertical' | 'rotate' | 'opacity' | 'crazy' | 'chunk'
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean
  /**
   * 是否无限循环
   * @default false
   */
  loop?: boolean
  /**
   * 是否悬停时停止动画
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * 是否悬停时冻结动画
   * @default false
   */
  freezeOnHover?: boolean
  /**
   * 受控模式下的播放状态
   */
  playing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'base',
  autoplay: true,
  loop: false,
  pauseOnHover: false,
  freezeOnHover: false,
  playing: undefined, // undefined表示非受控模式
})

const emit = defineEmits<{
  (e: 'update:playing', value: boolean): void
  (e: 'start'): void
  (e: 'end'): void
}>()

// 内部播放状态
const isPlaying = ref(props.autoplay)

// 在受控模式下同步playing属性
watch(() => props.playing, (val) => {
  if (val !== undefined) {
    isPlaying.value = val
  }
}, { immediate: true })

// 监听内部播放状态变化并更新到父组件
watch(isPlaying, (val) => {
  if (props.playing !== undefined) {
    emit('update:playing', val)
  }
})

// 计算应用的类名
const shakeClass = computed(() => {
  const classes = ['css-shake']

  // 添加类型类
  if (props.type !== 'base') {
    classes.push(`css-shake-${props.type}`)
  }

  // 添加无限循环类
  if (props.loop || isPlaying.value) {
    classes.push('css-shake-constant')

    // 添加悬停暂停类
    if (props.pauseOnHover) {
      classes.push('css-shake-constant--hover')
    }
  }

  // 添加冻结类
  if (props.freezeOnHover) {
    classes.push('css-shake-freeze')
  }

  return classes.join(' ')
})

// 是否已播放
const hasPlayed = ref(false)

// 开始播放
function play() {
  if (!isPlaying.value) {
    isPlaying.value = true
    emit('start')
  }
}

// 停止播放
function stop() {
  if (isPlaying.value) {
    isPlaying.value = false
    emit('end')
  }
}

// 暴露组件方法
defineExpose({
  play,
  stop,
})

// 挂载和销毁逻辑
if (props.autoplay && !hasPlayed.value) {
  hasPlayed.value = true
  isPlaying.value = true
  emit('start')
}

onBeforeUnmount(() => {
  if (isPlaying.value) {
    isPlaying.value = false
  }
})

// 合并额外属性
const attrs = useAttrs()
</script>

<template>
  <div :class="shakeClass" v-bind="attrs">
    <slot />
  </div>
</template>
