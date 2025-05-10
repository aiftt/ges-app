<script setup lang="ts" name="UiStatistic">
/**
 * 数值显示组件
 * 创建日期: 2024-07-31
 * 作者: aiftt
 */

import { computed } from 'vue'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 数值标题
   */
  title?: string
  /**
   * 数值内容，可以是数字或字符串
   */
  value?: string | number
  /**
   * 设置数值精度
   */
  precision?: number
  /**
   * 设置小数点
   */
  decimalSeparator?: string
  /**
   * 设置千分位标识符
   */
  groupSeparator?: string
  /**
   * 自定义前缀
   */
  prefix?: string
  /**
   * 自定义后缀
   */
  suffix?: string
  /**
   * 设置值的样式
   */
  valueStyle?: string | Record<string, any>
  /**
   * 数值是否加载中
   */
  loading?: boolean
  /**
   * 是否显示增长/减少趋势图标
   */
  showTrend?: boolean
  /**
   * 是否增长（用于趋势图标）
   */
  trend?: 'up' | 'down' | 'none' | null
  /**
   * 趋势图标的颜色，默认增长为绿色，下降为红色
   */
  trendColor?: 'inherit' | 'success' | 'danger' | string
  /**
   * 更新动画持续时间，单位为毫秒，设为0关闭更新动画
   */
  animation?: number | boolean
  /**
   * 是否使用千分位格式化
   */
  useGrouping?: boolean
  /**
   * 设置数值的尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right'
}>(), {
  title: '',
  value: 0,
  precision: undefined,
  decimalSeparator: '.',
  groupSeparator: ',',
  prefix: '',
  suffix: '',
  valueStyle: '',
  loading: false,
  showTrend: false,
  trend: null,
  trendColor: 'inherit',
  animation: 0,
  useGrouping: true,
  size: 'default',
  align: 'left',
})

// 计算处理后的值
const formattedValue = computed(() => {
  if (props.loading) {
    return '--'
  }

  // 转为数字处理
  let value: number | string = typeof props.value === 'string' ? Number(props.value) : props.value

  if (Number.isNaN(Number(value))) {
    // 如果不是有效数字，直接返回原始值
    return props.value
  }

  // 处理精度
  if (props.precision !== undefined) {
    value = Number(value).toFixed(props.precision)
  }

  if (props.useGrouping) {
    // 分离整数和小数部分
    const parts = String(value).split('.')
    const integerPart = parts[0]
    const decimalPart = parts[1] || ''

    // 应用千分位分隔符
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      props.groupSeparator,
    )

    // 重新组合小数部分
    return decimalPart
      ? `${formattedInteger}${props.decimalSeparator}${decimalPart}`
      : formattedInteger
  }

  return String(value)
})

// 计算趋势图标和颜色
const trendIcon = computed(() => {
  if (!props.showTrend || props.trend === 'none' || props.trend === null) {
    return null
  }

  return props.trend === 'up' ? 'carbon:arrow-up' : 'carbon:arrow-down'
})

const trendColorClass = computed(() => {
  if (!props.showTrend || props.trend === 'none' || props.trend === null) {
    return null
  }

  if (props.trendColor === 'inherit') {
    return props.trend === 'up' ? 'ui-statistic-trend--up' : 'ui-statistic-trend--down'
  }

  if (props.trendColor === 'success' || props.trendColor === 'danger') {
    return `ui-statistic-trend--${props.trendColor}`
  }

  return null
})

// 自定义样式
const valueStyleObj = computed(() => {
  if (typeof props.valueStyle === 'string') {
    return props.valueStyle
  }
  return props.valueStyle
})

// 计算容器类
const statisticClass = computed(() => {
  return [
    'ui-statistic',
    `ui-statistic--${props.size}`,
    `ui-statistic--${props.align}`,
  ]
})
</script>

<template>
  <div :class="statisticClass">
    <!-- 标题 -->
    <div v-if="title" class="ui-statistic-title">
      {{ title }}
    </div>

    <!-- 内容 -->
    <div class="ui-statistic-content">
      <!-- 前缀 -->
      <span v-if="prefix" class="ui-statistic-prefix">
        {{ prefix }}
      </span>

      <!-- 数值 -->
      <span class="ui-statistic-value" :style="valueStyleObj">
        {{ formattedValue }}
      </span>

      <!-- 后缀 -->
      <span v-if="suffix" class="ui-statistic-suffix">
        {{ suffix }}
      </span>

      <!-- 趋势图标 -->
      <span v-if="showTrend && trendIcon" class="ui-statistic-trend" :class="[trendColorClass]">
        <ui-icon :icon="trendIcon" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.ui-statistic {
  display: inline-block;
  box-sizing: border-box;
}

.ui-statistic--left {
  text-align: left;
}

.ui-statistic--center {
  text-align: center;
}

.ui-statistic--right {
  text-align: right;
}

.ui-statistic-title {
  margin-bottom: 4px;
  color: var(--ui-color-text-secondary, #6b7280);
  font-size: 14px;
  overflow-wrap: break-word;
}

.dark .ui-statistic-title {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

.ui-statistic-content {
  color: var(--ui-color-text, #111827);
  display: flex;
  align-items: center;
  line-height: 1.2;
}

.dark .ui-statistic-content {
  color: var(--ui-color-text-dark, #f9fafb);
}

.ui-statistic--small .ui-statistic-value {
  font-size: 24px;
}

.ui-statistic--default .ui-statistic-value {
  font-size: 32px;
}

.ui-statistic--large .ui-statistic-value {
  font-size: 40px;
}

.ui-statistic-prefix,
.ui-statistic-suffix {
  margin: 0 4px;
  font-size: 16px;
  color: var(--ui-color-text, #111827);
  display: inline-flex;
  align-items: center;
}

.dark .ui-statistic-prefix,
.dark .ui-statistic-suffix {
  color: var(--ui-color-text-dark, #f9fafb);
}

.ui-statistic-trend {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  font-size: 16px;
}

.ui-statistic-trend--up {
  color: var(--ui-color-success, #10b981);
}

.ui-statistic-trend--down {
  color: var(--ui-color-danger, #ef4444);
}

.ui-statistic-trend--success {
  color: var(--ui-color-success, #10b981);
}

.ui-statistic-trend--danger {
  color: var(--ui-color-danger, #ef4444);
}
</style>
