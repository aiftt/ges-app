<script setup lang="ts" name="UiButton">
/**
 * 按钮组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复服务端渲染错误
 * 更新日期: 2023-12-03 - 优化主题色调，添加info按钮类型，移除未使用变量
 * 更新日期: 2023-12-05 - 添加v-bind + CSS变量实现方式，支持自定义颜色、圆角
 * 更新日期: 2023-12-07 - 添加点击动画效果，优化暗色主题，去掉黑色边框
 * 更新日期: 2023-12-10 - 使用全局主题变量，优化颜色定义
 * 更新日期: 2023-12-11 - 优化暗色主题适配，使用新的主题变量
 * 更新日期: 2024-09-09 - 提取CSS变量到主题文件中
 */
import { useSlots } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 按钮类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * 按钮尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 图标名称（使用iconify格式）
   */
  icon?: string
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 是否为圆形按钮
   */
  circle?: boolean
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  textColor?: string
  /**
   * 自定义圆角大小
   */
  radius?: string
  /**
   * 自定义阴影
   */
  shadow?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 自定义悬停背景色
   */
  hoverBgColor?: string
}>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  icon: '',
  loading: false,
  circle: false,
  bgColor: '',
  textColor: '',
  radius: '',
  shadow: '',
  borderColor: '',
  hoverBgColor: '',
})

// 定义事件
const emit = defineEmits<{
  (_e: 'click', _event: MouseEvent): void
}>()

// 获取插槽
const slots = useSlots()

// 处理点击事件
function handleClick(_: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', _)
  }
}

// 检查是否有默认插槽内容
const hasDefaultSlot = computed(() => Boolean(slots.default))

// 按钮类名计算
const buttonClass = computed(() => {
  // 基础样式
  const classes = [
    // 组件基础类名
    'ui-button',
    // 布局样式
    'inline-flex items-center justify-center',
    // 间距
    'gap-2',
    // 字体
    'font-medium',
  ]

  // 按钮类型样式
  classes.push(`ui-button--${props.type}`)

  // 尺寸样式
  classes.push(`ui-button--${props.size}`)

  // 形状样式
  if (props.circle) {
    classes.push('ui-button--circle')
  }

  // 仅图标按钮
  if (props.icon && !props.circle && !hasDefaultSlot.value) {
    classes.push('ui-button--icon-only')
  }

  // 禁用状态
  if (props.disabled) {
    classes.push('ui-button--disabled')
  }

  // 加载状态
  if (props.loading) {
    classes.push('ui-button--loading')
  }

  // 自定义样式
  if (props.bgColor || props.textColor || props.radius || props.borderColor) {
    classes.push('ui-button--custom')
  }

  return classes.join(' ')
})

// CSS变量计算
const bgColorVar = computed(() => props.bgColor || undefined)
const textColorVar = computed(() => props.textColor || undefined)
const radiusVar = computed(() => props.radius || undefined)
const shadowVar = computed(() => props.shadow || undefined)
const borderColorVar = computed(() => props.borderColor || undefined)
const hoverBgColorVar = computed(() => props.hoverBgColor || undefined)

// 图标尺寸转换
const iconSize = computed(() => {
  if (props.size === 'small')
    return 'small'
  if (props.size === 'large')
    return 'large'
  return 'default'
})
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <!-- 加载状态图标 -->
    <ui-icon
      v-if="loading"
      icon="svg-spinners:8-dots-rotate"
      :size="iconSize"
      class="inline-flex"
    />

    <!-- 常规图标 -->
    <ui-icon
      v-else-if="icon"
      :icon="icon"
      :size="iconSize"
      class="inline-flex"
    />

    <!-- 按钮内容 -->
    <span v-if="hasDefaultSlot" class="inline-flex items-center">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.ui-button {
  /* CSS变量已迁移到主题文件: assets/scss/themes/light.scss 和 dark.scss 中 */
  /* 使用v-bind绑定CSS变量 */
  --ui-button-bg-color: v-bind(bgColorVar);
  --ui-button-text-color: v-bind(textColorVar);
  --ui-button-radius: v-bind(radiusVar);
  --ui-button-shadow: v-bind(shadowVar);
  --ui-button-border-color: v-bind(borderColorVar);
  --ui-button-hover-bg-color: v-bind(hoverBgColorVar);

  /* 基础样式 */
  border-radius: var(--ui-button-radius, var(--ui-radius-md));
  transition: all var(--ui-transition);
  outline: none;
  position: relative;
  overflow: hidden;
}

.ui-button:focus-visible {
  outline-width: 2px;
  outline-color: rgba(0, 0, 0, 0.3);
  outline-offset: 2px;
  outline-style: solid;
}

.ui-button:active {
  transform: scale(0.97);
}

/* 点击动画效果 */
.ui-button::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition:
    transform 0.5s,
    opacity 0.8s;
}

.ui-button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

/* 自定义样式 - 当有自定义属性时应用 */
.ui-button--custom {
  background-color: var(--ui-button-bg-color);
  color: var(--ui-button-text-color);
  box-shadow: var(--ui-button-shadow);
  border: var(--ui-button-border-color, none);
}

.ui-button--custom:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-hover-bg-color, var(--ui-button-bg-color));
  filter: brightness(0.9);
}

/* 按钮类型 */
.ui-button--default {
  background-color: var(--ui-button-default-bg);
  color: var(--ui-button-default-text);
  border: 1px solid var(--ui-button-default-border);
}

.ui-button--default:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-default-hover-bg);
}

.ui-button--primary {
  background-color: var(--ui-button-primary-bg);
  color: var(--ui-button-primary-text);
  border: none;
}

.ui-button--primary:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-primary-bg);
  filter: brightness(0.9);
}

.ui-button--success {
  background-color: var(--ui-button-success-bg);
  color: var(--ui-button-success-text);
  border: none;
}

.ui-button--success:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-success-bg);
  filter: brightness(0.9);
}

.ui-button--warning {
  background-color: var(--ui-button-warning-bg);
  color: var(--ui-button-warning-text);
  border: none;
}

.ui-button--warning:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-warning-bg);
  filter: brightness(0.9);
}

.ui-button--danger {
  background-color: var(--ui-button-danger-bg);
  color: var(--ui-button-danger-text);
  border: none;
}

.ui-button--danger:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-danger-bg);
  filter: brightness(0.9);
}

.ui-button--info {
  background-color: var(--ui-button-info-bg);
  color: var(--ui-button-info-text);
  border: none;
}

.ui-button--info:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-info-bg);
  filter: brightness(0.9);
}

/* 按钮尺寸 */
.ui-button--small {
  padding: calc(var(--ui-spacing-xs) + 0.125rem) var(--ui-spacing-sm);
  font-size: var(--ui-font-size-sm);
}

.ui-button--default {
  padding: var(--ui-spacing-sm) var(--ui-spacing);
  font-size: var(--ui-font-size);
}

.ui-button--large {
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  font-size: var(--ui-font-size-lg);
}

/* 圆形按钮 */
.ui-button--circle.ui-button--small {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: var(--ui-radius-full);
}

.ui-button--circle.ui-button--default {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: var(--ui-radius-full);
}

.ui-button--circle.ui-button--large {
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: var(--ui-radius-full);
}

/* 图标按钮 */
.ui-button--icon-only {
  padding: var(--ui-spacing-sm);
}

/* 禁用状态 */
.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  background-color: var(--ui-button-disabled-bg) !important;
  color: var(--ui-button-disabled-text) !important;
  border-color: var(--ui-button-disabled-border) !important;
}

/* 加载状态 */
.ui-button--loading {
  opacity: 0.8;
  cursor: wait;
}
</style>
