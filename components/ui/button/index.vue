<script setup lang="ts" name="UiButton">
/**
 * 按钮组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 修复服务端渲染错误
 * 更新日期: 2023-12-03 - 优化主题色调，添加info按钮类型，移除未使用变量
 * 更新日期: 2023-12-05 - 添加v-bind + CSS变量实现方式，支持自定义颜色、圆角
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
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const radiusVar = computed(() => props.radius || null)
const shadowVar = computed(() => props.shadow || null)
const borderColorVar = computed(() => props.borderColor || null)
const hoverBgColorVar = computed(() => props.hoverBgColor || null)

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
  /* 使用v-bind绑定CSS变量 */
  --ui-button-bg-color: v-bind(bgColorVar);
  --ui-button-text-color: v-bind(textColorVar);
  --ui-button-radius: v-bind(radiusVar);
  --ui-button-shadow: v-bind(shadowVar);
  --ui-button-border-color: v-bind(borderColorVar);
  --ui-button-hover-bg-color: v-bind(hoverBgColorVar);

  /* 基础样式 */
  border-radius: var(--ui-button-radius, 0.375rem);
  transition: all 0.2s;
  outline: none;
}

.ui-button:focus-visible {
  outline-width: 2px;
  outline-color: rgba(0, 0, 0, 0.3);
  outline-offset: 2px;
  outline-style: solid;
}

.ui-button:active {
  transform: translateY(2px);
}

/* 自定义样式 - 当有自定义属性时应用 */
.ui-button--custom {
  background-color: var(--ui-button-bg-color);
  color: var(--ui-button-text-color);
  box-shadow: var(--ui-button-shadow);
  border-color: var(--ui-button-border-color);
}

.ui-button--custom:hover:not(.ui-button--disabled) {
  background-color: var(--ui-button-hover-bg-color);
}

/* 按钮类型 */
.ui-button--default {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.ui-button--default:hover:not(.ui-button--disabled) {
  background-color: #e5e7eb;
}

.ui-button--primary {
  background-color: #3b82f6;
  color: white;
}

.ui-button--primary:hover:not(.ui-button--disabled) {
  background-color: #2563eb;
}

.ui-button--success {
  background-color: #10b981;
  color: white;
}

.ui-button--success:hover:not(.ui-button--disabled) {
  background-color: #059669;
}

.ui-button--warning {
  background-color: #f59e0b;
  color: white;
}

.ui-button--warning:hover:not(.ui-button--disabled) {
  background-color: #d97706;
}

.ui-button--danger {
  background-color: #ef4444;
  color: white;
}

.ui-button--danger:hover:not(.ui-button--disabled) {
  background-color: #dc2626;
}

.ui-button--info {
  background-color: #06b6d4;
  color: white;
}

.ui-button--info:hover:not(.ui-button--disabled) {
  background-color: #0891b2;
}

/* 按钮尺寸 */
.ui-button--small {
  padding: 0.375rem 0.625rem;
  font-size: 0.875rem;
}

.ui-button--default {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.ui-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* 圆形按钮 */
.ui-button--circle.ui-button--small {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: 9999px;
}

.ui-button--circle.ui-button--default {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 9999px;
}

.ui-button--circle.ui-button--large {
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: 9999px;
}

/* 图标按钮 */
.ui-button--icon-only {
  padding: 0.5rem;
}

/* 禁用状态 */
.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 加载状态 */
.ui-button--loading {
  opacity: 0.8;
  cursor: wait;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .ui-button--default {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }

  .ui-button--default:hover:not(.ui-button--disabled) {
    background-color: #4b5563;
  }

  .ui-button--primary {
    background-color: #3b82f6;
  }

  .ui-button--primary:hover:not(.ui-button--disabled) {
    background-color: #2563eb;
  }

  .ui-button--success {
    background-color: #10b981;
  }

  .ui-button--success:hover:not(.ui-button--disabled) {
    background-color: #059669;
  }

  .ui-button--warning {
    background-color: #f59e0b;
  }

  .ui-button--warning:hover:not(.ui-button--disabled) {
    background-color: #d97706;
  }

  .ui-button--danger {
    background-color: #ef4444;
  }

  .ui-button--danger:hover:not(.ui-button--disabled) {
    background-color: #dc2626;
  }

  .ui-button--info {
    background-color: #06b6d4;
  }

  .ui-button--info:hover:not(.ui-button--disabled) {
    background-color: #0891b2;
  }
}
</style>
