<script setup lang="ts" name="UiButton">
/**
 * 按钮组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 按钮类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
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
}>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  icon: '',
  loading: false,
  circle: false,
})

// 定义事件
const emit = defineEmits<{
  (_e: 'click', _event: MouseEvent): void
}>()

// 处理点击事件
function handleClick(_: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', _)
  }
}

// 按钮类名计算
const buttonClass = computed(() => {
  // 基础样式
  const classes = [
    // 布局样式
    'inline-flex items-center justify-center',
    // 间距
    'gap-2',
    // 字体
    'font-medium',
    // 圆角和轮廓
    props.circle ? 'rounded-full' : 'rounded-md',
    // 过渡效果
    'transition-all duration-200',
    // 轮廓
    'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30',
  ]

  // 按钮类型样式
  if (props.type === 'default') {
    classes.push('bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 focus-visible:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600')
  }
  else if (props.type === 'primary') {
    classes.push('bg-primary text-white hover:bg-primary-600 focus-visible:ring-primary')
  }
  else if (props.type === 'success') {
    classes.push('bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500')
  }
  else if (props.type === 'warning') {
    classes.push('bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500')
  }
  else if (props.type === 'danger') {
    classes.push('bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500')
  }

  // 尺寸样式
  if (props.size === 'small') {
    if (props.circle) {
      classes.push('w-8 h-8 text-sm')
    }
    else {
      classes.push('px-2.5 py-1.5 text-sm')
    }
  }
  else if (props.size === 'large') {
    if (props.circle) {
      classes.push('w-12 h-12 text-lg')
    }
    else {
      classes.push('px-6 py-3 text-lg')
    }
  }
  else {
    if (props.circle) {
      classes.push('w-10 h-10')
    }
    else {
      classes.push('px-4 py-2 text-base')
    }
  }

  // 仅图标按钮
  if (props.icon && !props.circle && !$slots.default) {
    classes.push('p-2')
  }

  // 禁用状态
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none')
  }

  // 加载状态
  if (props.loading) {
    classes.push('opacity-80 cursor-wait')
  }

  // 激活状态
  classes.push('active:translate-y-0.5')

  return classes.join(' ')
})

// 加载图标名称
const loadingIcon = 'svg-spinners:8-dots-rotate'

// 图标类名
const iconClass = computed(() => {
  const classes = [
    'inline-flex',
    props.size === 'small' ? 'text-sm' : props.size === 'large' ? 'text-lg' : 'text-base',
  ]

  if (props.loading) {
    classes.push('animate-spin')
  }

  return classes.join(' ')
})
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <!-- 加载状态图标 -->
    <iconify-icon
      v-if="loading"
      :icon="loadingIcon"
      :class="iconClass"
    />

    <!-- 常规图标 -->
    <iconify-icon
      v-else-if="icon"
      :icon="icon"
      :class="iconClass"
    />

    <!-- 按钮内容 -->
    <span v-if="$slots.default" class="inline-flex items-center">
      <slot />
    </span>
  </button>
</template>
