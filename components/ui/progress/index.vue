<script setup lang="ts" name="UiProgress">
/**
 * 进度条组件
 * 创建日期: 2024-08-03
 * 作者: aiftt
 * 更新日期: 2024-09-14 - 使用集中管理的类型定义
 */

import type { CSSProperties } from 'vue'
import type { ComponentSize, ProgressType, StepStatus } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 进度百分比（0-100）
   */
  percentage: number
  /**
   * 进度条类型
   */
  type?: ProgressType
  /**
   * 进度条尺寸
   */
  size?: ComponentSize
  /**
   * 是否显示进度文字
   */
  showText?: boolean
  /**
   * 进度条文字内部显示
   */
  textInside?: boolean
  /**
   * 自定义进度条文字
   */
  format?: (percentage: number) => string
  /**
   * 进度条宽度
   */
  strokeWidth?: number
  /**
   * 进度条的状态
   */
  status?: StepStatus | ''
  /**
   * 是否为环形进度条
   */
  circular?: boolean
  /**
   * 环形进度条画布宽度
   */
  width?: number
  /**
   * 是否显示条纹效果
   */
  striped?: boolean
  /**
   * 是否显示动画效果
   */
  animated?: boolean
  /**
   * 进度条颜色
   */
  color?: string | Array<{ percentage: number, color: string }> | ((percentage: number) => string)
  /**
   * 轨道颜色
   */
  trackColor?: string
  /**
   * 进度条圆角
   */
  borderRadius?: string | number
  /**
   * 进度条背景色
   */
  bgColor?: string
  /**
   * 进度条动画持续时间
   */
  duration?: number
}>(), {
  type: 'default',
  size: 'default',
  showText: true,
  textInside: false,
  strokeWidth: 6,
  status: '',
  circular: false,
  width: 120,
  striped: false,
  animated: false,
  trackColor: '#e5e7eb',
  borderRadius: '100px',
  bgColor: '',
  duration: 0.3,
})

// 当前显示的百分比（用于动画）
const currentPercentage = ref(0)

// 格式化显示文本
const formatText = computed(() => {
  if (props.format) {
    return props.format(props.percentage)
  }
  return `${props.percentage}%`
})

// 根据type或status计算颜色
const statusColor = computed(() => {
  // 优先使用status
  const status = props.status || props.type
  if (status === 'success')
    return 'var(--ui-color-success, #10b981)'
  if (status === 'warning')
    return 'var(--ui-color-warning, #f59e0b)'
  if (status === 'danger')
    return 'var(--ui-color-danger, #ef4444)'
  if (status === 'info')
    return 'var(--ui-color-info, #3b82f6)'
  // 默认颜色
  return 'var(--ui-color-primary, #10b981)'
})

// 计算颜色
const barColor = computed(() => {
  if (typeof props.color === 'string') {
    return props.color
  }
  if (typeof props.color === 'function') {
    return props.color(props.percentage)
  }
  if (Array.isArray(props.color)) {
    // 根据当前百分比匹配对应颜色段
    for (let i = 0; i < props.color.length; i++) {
      if (props.percentage <= props.color[i].percentage) {
        return props.color[i].color
      }
    }
    // 如果没有匹配到，返回最后一个颜色
    return props.color[props.color.length - 1].color
  }
  // 使用状态颜色
  return statusColor.value
})

// 计算大小样式
const sizeStyle = computed(() => {
  if (props.size === 'small')
    return { height: '4px' }
  if (props.size === 'large')
    return { height: '12px' }
  return { height: '8px' }
})

// 计算线性进度条样式
const barStyle = computed(() => {
  const style: CSSProperties = {
    width: `${currentPercentage.value}%`,
    backgroundColor: barColor.value,
    borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
    transition: `width ${props.duration}s ease-in-out`,
  }
  return style
})

// 计算轨道样式
const trackStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: props.trackColor,
    borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
  }
  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  return style
})

// 计算环形进度条路径
const circularPathStyle = computed(() => {
  const radius = 50 - props.strokeWidth / 2
  const perimeter = 2 * Math.PI * radius
  const strokeDasharray = `${perimeter}px, ${perimeter}px`
  const strokeDashoffset = `${((100 - currentPercentage.value) / 100) * perimeter}px`

  return {
    strokeDasharray,
    strokeDashoffset,
    transition: `stroke-dashoffset ${props.duration}s ease-in-out`,
    stroke: barColor.value,
  }
})

// 计算环形轨道样式
const circularTrackStyle = computed(() => {
  return {
    stroke: props.trackColor,
  }
})

// 计算条纹样式
const stripedStyle = computed(() => {
  if (!props.striped)
    return {}

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
    backgroundSize: '1rem 1rem',
  }

  if (props.animated) {
    style.animation = 'ui-progress-stripes 1s linear infinite'
  }

  return style
})

// 监听百分比变化
watch(() => props.percentage, (val) => {
  currentPercentage.value = Math.min(Math.max(val, 0), 100)
}, { immediate: true })

// 定义状态图标
const statusIcon = computed(() => {
  if (!props.status)
    return ''

  if (props.status === 'success')
    return 'carbon:checkmark'
  if (props.status === 'warning')
    return 'carbon:warning'
  if (props.status === 'danger')
    return 'carbon:close'
  if (props.status === 'info')
    return 'carbon:information'

  return ''
})

// 计算环形进度条中心文本样式
const circularTextStyle = computed(() => {
  return {
    fontSize: props.width && props.width < 100 ? '0.75rem' : '1rem',
    color: props.status ? statusColor.value : undefined,
  }
})

// 计算线性进度条文本位置样式
const textPositionStyle = computed(() => {
  if (props.textInside) {
    return {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fff',
      fontSize: props.size === 'small' ? '0.75rem' : '0.875rem',
    }
  }
  return {
    marginLeft: '8px',
    color: props.status ? statusColor.value : undefined,
  }
})
</script>

<template>
  <div
    class="ui-progress" :class="[
      `ui-progress--${size}`,
      circular ? 'ui-progress--circular' : 'ui-progress--line',
      { 'ui-progress--with-text': showText && !textInside },
      { [`ui-progress--${status}`]: status },
    ]"
  >
    <!-- 线性进度条 -->
    <div v-if="!circular" class="ui-progress-bar-wrapper" :style="sizeStyle">
      <div class="ui-progress-bar-track" :style="trackStyle">
        <div class="ui-progress-bar" :style="[barStyle, stripedStyle]">
          <span v-if="showText && textInside" class="ui-progress-text-inside" :style="textPositionStyle">
            {{ formatText }}
          </span>
        </div>
      </div>
      <div v-if="showText && !textInside" class="ui-progress-text" :style="textPositionStyle">
        <span>{{ formatText }}</span>
        <ui-icon v-if="statusIcon" :icon="statusIcon" class="ui-progress-icon" />
      </div>
    </div>

    <!-- 环形进度条 -->
    <div v-else class="ui-progress-circular" :style="{ width: `${width}px`, height: `${width}px` }">
      <svg viewBox="0 0 100 100">
        <!-- 背景轨道 -->
        <circle
          class="ui-progress-circular-track"
          cx="50"
          cy="50"
          :r="50 - strokeWidth / 2"
          :stroke-width="strokeWidth"
          fill="none"
          :style="circularTrackStyle"
        />
        <!-- 进度路径 -->
        <circle
          class="ui-progress-circular-path"
          cx="50"
          cy="50"
          :r="50 - strokeWidth / 2"
          :stroke-width="strokeWidth"
          fill="none"
          :style="circularPathStyle"
        />
      </svg>
      <!-- 中心文本 -->
      <div v-if="showText" class="ui-progress-circular-text" :style="circularTextStyle">
        <span>{{ formatText }}</span>
        <ui-icon v-if="statusIcon" :icon="statusIcon" class="ui-progress-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-progress {
  --ui-progress-height: 8px;
  --ui-progress-text-color: var(--ui-color-text, #374151);

  position: relative;
  display: inline-flex;
  align-items: center;
}

/* 尺寸样式 */
.ui-progress--small {
  --ui-progress-height: 4px;
  font-size: 12px;
}

.ui-progress--default {
  --ui-progress-height: 8px;
  font-size: 14px;
}

.ui-progress--large {
  --ui-progress-height: 12px;
  font-size: 16px;
}

/* 类型样式 */
.ui-progress--success .ui-progress-text,
.ui-progress--success .ui-progress-circular-text {
  color: var(--ui-color-success, #10b981);
}

.ui-progress--warning .ui-progress-text,
.ui-progress--warning .ui-progress-circular-text {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-progress--danger .ui-progress-text,
.ui-progress--danger .ui-progress-circular-text {
  color: var(--ui-color-danger, #ef4444);
}

.ui-progress--info .ui-progress-text,
.ui-progress--info .ui-progress-circular-text {
  color: var(--ui-color-info, #3b82f6);
}

/* 线性进度条 */
.ui-progress--line {
  width: 100%;
}

.ui-progress--with-text .ui-progress-bar-wrapper {
  flex: 1;
}

.ui-progress-bar-wrapper {
  position: relative;
  width: 100%;
  border-radius: 100px;
  overflow: hidden;
}

.ui-progress-bar-track {
  width: 100%;
  height: 100%;
  position: relative;
}

.ui-progress-bar {
  position: relative;
  height: 100%;
  transition: width 0.3s ease-in-out;
  text-align: right;
}

.ui-progress-text {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  color: var(--ui-progress-text-color);
  white-space: nowrap;
}

.ui-progress-text-inside {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
  line-height: 1;
}

.ui-progress-icon {
  margin-left: 4px;
}

/* 环形进度条 */
.ui-progress--circular {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.ui-progress-circular {
  position: relative;
}

.ui-progress-circular-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--ui-progress-text-color);
}

/* 动画效果 */
@keyframes ui-progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
