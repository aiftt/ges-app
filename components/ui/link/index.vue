<script setup lang="ts" name="UiLink">
/**
 * 链接组件
 * 创建日期: 2023-11-15
 * 作者: aiftt
 *
 * 用于文本链接和导航链接，支持内部路由和外部链接
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 链接地址
   */
  href?: string
  /**
   * 链接类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /**
   * 链接大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否下划线
   */
  underline?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否为外部链接
   */
  external?: boolean
  /**
   * 打开链接的目标
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /**
   * 链接图标(左侧)
   */
  icon?: string
  /**
   * 链接图标(右侧)
   */
  rightIcon?: string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  href: '',
  type: 'default',
  size: 'default',
  underline: false,
  disabled: false,
  external: false,
  target: '_self',
  icon: '',
  rightIcon: '',
  class: '',
})

// 定义emit事件
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 计算链接类名
const linkClass = computed(() => {
  const classes = [
    'ui-link',
    'inline-flex items-center',
    'transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ]

  // 链接类型
  if (props.type === 'default') {
    classes.push('text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white')
    classes.push('focus-visible:ring-gray-400')
  }
  else if (props.type === 'primary') {
    classes.push('text-primary hover:text-primary-600')
    classes.push('focus-visible:ring-primary')
  }
  else if (props.type === 'success') {
    classes.push('text-green-500 hover:text-green-600')
    classes.push('focus-visible:ring-green-500')
  }
  else if (props.type === 'warning') {
    classes.push('text-yellow-500 hover:text-yellow-600')
    classes.push('focus-visible:ring-yellow-500')
  }
  else if (props.type === 'danger') {
    classes.push('text-red-500 hover:text-red-600')
    classes.push('focus-visible:ring-red-500')
  }

  // 链接大小
  if (props.size === 'small') {
    classes.push('text-sm')
  }
  else if (props.size === 'large') {
    classes.push('text-lg')
  }
  else {
    classes.push('text-base')
  }

  // 下划线
  if (props.underline) {
    classes.push('underline')
  }
  else {
    classes.push('hover:underline')
  }

  // 禁用状态
  if (props.disabled) {
    classes.push('opacity-50 cursor-not-allowed pointer-events-none')
    classes.push('no-underline')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算图标大小
const iconSize = computed(() => {
  return props.size === 'small' ? 'small' : props.size === 'large' ? 'large' : 'default'
})

// 处理点击事件
function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}

// 是否应该作为nuxt链接处理
const isNuxtLink = computed(() => {
  return !props.external && props.href && !props.href.startsWith('http') && !props.href.startsWith('mailto:') && !props.href.startsWith('tel:')
})

// 计算外部链接属性
const externalAttrs = computed(() => {
  if (props.external || (props.href && props.href.startsWith('http'))) {
    return {
      target: props.target,
      rel: 'noopener noreferrer',
    }
  }
  return {}
})
</script>

<template>
  <component
    :is="isNuxtLink ? 'NuxtLink' : 'a'"
    :to="isNuxtLink ? href : undefined"
    :href="!isNuxtLink ? href : undefined"
    :class="linkClass"
    v-bind="externalAttrs"
    @click="handleClick"
  >
    <!-- 左侧图标 -->
    <ui-icon v-if="icon" :icon="icon" :size="iconSize" class="mr-1.5" />

    <!-- 内容 -->
    <slot />

    <!-- 右侧图标 -->
    <ui-icon v-if="rightIcon" :icon="rightIcon" :size="iconSize" class="ml-1.5" />
  </component>
</template>
