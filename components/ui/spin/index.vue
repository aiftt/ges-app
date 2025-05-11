<script setup lang="ts" name="UiSpin">
/**
 * 旋转加载组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 * 更新日期: 2024-09-14 - 使用集中管理的类型定义
 */
import type { SpinType, StepSize } from '~/types/ui'

// Props 定义
const props = withDefaults(defineProps<{
  /**
   * 是否显示加载中
   */
  spinning?: boolean
  /**
   * 尺寸，可选值 small, medium, large
   */
  size?: StepSize
  /**
   * 加载指示器类型，可选值 circle, dot, pulse
   */
  type?: SpinType
  /**
   * 自定义加载指示器
   */
  indicator?: string
  /**
   * 自定义描述文案
   */
  tip?: string
  /**
   * 当作为包裹元素时，是否设置蒙层
   */
  overlay?: boolean
  /**
   * 延迟显示时间（毫秒）
   */
  delay?: number
  /**
   * 自定义颜色
   */
  color?: string
}>(), {
  spinning: true,
  size: 'medium',
  type: 'circle',
  overlay: true,
  delay: 0,
})

// CSS变量绑定
const colorVar = computed(() => props.color ? props.color : null)
const sizeVar = computed(() => {
  if (props.size === 'small')
    return '20px'
  if (props.size === 'large')
    return '40px'
  return '30px' // medium
})

// 控制是否显示，支持延迟
const shouldShow = ref(false)
let timer: any = null

// 监听spinning变化，实现延迟控制
watch(() => props.spinning, (val) => {
  clearTimeout(timer)
  if (val) {
    timer = setTimeout(() => {
      shouldShow.value = true
    }, props.delay)
  }
  else {
    shouldShow.value = false
  }
}, { immediate: true })

// 组件销毁时清除定时器
onBeforeUnmount(() => {
  clearTimeout(timer)
})

// 包裹样式计算
const wrapperClass = computed(() => [
  'ui-spin-wrapper',
  {
    'ui-spin-wrapper-overlay': props.overlay && !!useSlots().default,
    'ui-spin-wrapper-spinning': shouldShow.value && !!useSlots().default,
  },
])

// 指示器类型样式
const indicatorClass = computed(() => [
  'ui-spin-indicator',
  `ui-spin-indicator-${props.type}`,
  `ui-spin-size-${props.size}`,
])
</script>

<template>
  <div v-if="$slots.default" class="ui-spin-container" role="status" aria-live="polite" :aria-busy="shouldShow">
    <!-- 有默认插槽时，作为包裹元素使用 -->
    <div :class="wrapperClass">
      <div v-if="shouldShow" class="ui-spin-dot-wrapper">
        <!-- 自定义指示器 -->
        <template v-if="indicator">
          <div class="ui-spin-custom-indicator">
            {{ indicator }}
          </div>
        </template>
        <!-- 默认指示器 -->
        <template v-else>
          <div :class="indicatorClass">
            <template v-if="type === 'circle'">
              <span
                v-for="i in 12"
                :key="i"
                class="ui-spin-circle-item"
                :style="`--ui-spin-circle-delay: ${(i - 1) * -0.083}s; --ui-spin-dot-color: ${colorVar || ''}`"
              />
            </template>
            <template v-else-if="type === 'dot'">
              <span
                v-for="i in 4"
                :key="i"
                class="ui-spin-dot-item"
                :style="`--ui-spin-dot-delay: ${(i - 1) * 0.16}s; --ui-spin-dot-color: ${colorVar || ''}`"
              />
            </template>
            <template v-else-if="type === 'pulse'">
              <span
                v-for="i in 3"
                :key="i"
                class="ui-spin-pulse-item"
                :style="`--ui-spin-pulse-delay: ${(i - 1) * 0.16}s; --ui-spin-dot-color: ${colorVar || ''}`"
              />
            </template>
          </div>
        </template>

        <!-- 提示文字 -->
        <div v-if="tip" class="ui-spin-tip">
          {{ tip }}
        </div>
      </div>
      <div class="ui-spin-content">
        <slot />
      </div>
    </div>
  </div>
  <div v-else class="ui-spin-standalone" role="status" aria-live="polite" :aria-busy="shouldShow">
    <!-- 无默认插槽时，作为独立元素使用 -->
    <template v-if="shouldShow">
      <!-- 自定义指示器 -->
      <template v-if="indicator">
        <div class="ui-spin-custom-indicator">
          {{ indicator }}
        </div>
      </template>
      <!-- 默认指示器 -->
      <template v-else>
        <div :class="indicatorClass" :style="`--ui-spin-size: ${sizeVar}`">
          <template v-if="type === 'circle'">
            <span
              v-for="i in 12"
              :key="i"
              class="ui-spin-circle-item"
              :style="`--ui-spin-circle-delay: ${(i - 1) * -0.083}s; --ui-spin-dot-color: ${colorVar || ''}`"
            />
          </template>
          <template v-else-if="type === 'dot'">
            <span
              v-for="i in 4"
              :key="i"
              class="ui-spin-dot-item"
              :style="`--ui-spin-dot-delay: ${(i - 1) * 0.16}s; --ui-spin-dot-color: ${colorVar || ''}`"
            />
          </template>
          <template v-else-if="type === 'pulse'">
            <span
              v-for="i in 3"
              :key="i"
              class="ui-spin-pulse-item"
              :style="`--ui-spin-pulse-delay: ${(i - 1) * 0.16}s; --ui-spin-dot-color: ${colorVar || ''}`"
            />
          </template>
        </div>
      </template>

      <!-- 提示文字 -->
      <div v-if="tip" class="ui-spin-tip">
        {{ tip }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ui-spin {
  &-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  &-wrapper {
    position: relative;
    transition: opacity 0.3s;

    &-spinning {
      .ui-spin-content {
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
      }
    }

    &-overlay {
      .ui-spin-dot-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      }
    }
  }

  &-dot-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-standalone {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-content {
    transition: opacity 0.3s;
  }

  &-tip {
    margin-top: 8px;
    color: var(--ui-color-primary, #3b82f6);
    font-size: 14px;
    text-align: center;
  }

  &-custom-indicator {
    font-size: var(--ui-spin-size, 30px);
    color: var(--ui-color-primary, #3b82f6);
  }

  &-indicator {
    position: relative;
    display: inline-block;

    &-circle {
      width: var(--ui-spin-size, 30px);
      height: var(--ui-spin-size, 30px);

      .ui-spin-circle-item {
        position: absolute;
        top: calc(var(--ui-spin-size, 30px) * 0.5 - 1px);
        left: calc(var(--ui-spin-size, 30px) * 0.5 - 1px);
        width: 2px;
        height: calc(var(--ui-spin-size, 30px) * 0.31);
        transform-origin: 50% 100%;
        background-color: var(--ui-spin-dot-color, var(--ui-color-primary, #3b82f6));
        opacity: 0.25;
        animation: ui-spin-circle 1.2s infinite linear;
        animation-delay: var(--ui-spin-circle-delay, 0s);

        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            transform: rotate(#{($i - 1) * 30}deg);
          }
        }
      }
    }

    &-dot {
      display: flex;
      justify-content: center;
      align-items: center;

      .ui-spin-dot-item {
        display: inline-block;
        width: calc(var(--ui-spin-size, 30px) * 0.25);
        height: calc(var(--ui-spin-size, 30px) * 0.25);
        border-radius: 50%;
        margin: 0 3px;
        background-color: var(--ui-spin-dot-color, var(--ui-color-primary, #3b82f6));
        animation: ui-spin-dot 1.4s infinite ease-in-out;
        animation-delay: var(--ui-spin-dot-delay, 0s);
      }
    }

    &-pulse {
      display: flex;
      justify-content: center;
      align-items: center;

      .ui-spin-pulse-item {
        display: inline-block;
        width: calc(var(--ui-spin-size, 30px) * 0.2);
        height: calc(var(--ui-spin-size, 30px) * 0.6);
        border-radius: 2px;
        margin: 0 2px;
        background-color: var(--ui-spin-dot-color, var(--ui-color-primary, #3b82f6));
        animation: ui-spin-pulse 1.2s infinite ease-in-out;
        animation-delay: var(--ui-spin-pulse-delay, 0s);
      }
    }
  }

  &-size {
    &-small {
      --ui-spin-size: 20px;
    }

    &-medium {
      --ui-spin-size: 30px;
    }

    &-large {
      --ui-spin-size: 40px;
    }
  }
}

@keyframes ui-spin-circle {
  0% {
    opacity: 0.25;
  }
  40% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0.25;
  }
}

@keyframes ui-spin-dot {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.2;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes ui-spin-pulse {
  0%,
  80%,
  100% {
    transform: scaleY(0.4);
    opacity: 0.2;
  }
  40% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
