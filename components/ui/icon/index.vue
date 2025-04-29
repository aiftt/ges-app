<script setup lang="ts" name="UiIcon">
/**
 * 图标组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 使用 Nuxt Icon 替代 iconify-icon
 * 更新日期: 2023-12-05 - 修复内联样式问题，改用CSS变量方式实现
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 图标名称（使用iconify格式，如：'carbon:home'）
   */
  icon: string
  /**
   * 图标尺寸
   */
  size?: 'small' | 'default' | 'large' | string
  /**
   * 图标颜色，可以是任何有效的CSS颜色值
   */
  color?: string
  /**
   * 是否旋转图标
   */
  spin?: boolean
  /**
   * 自定义样式类名
   */
  class?: string
}>(), {
  size: 'default',
  color: '',
  spin: false,
  class: '',
})

// 是否使用预设尺寸
const isPresetSize = computed(() => {
  return ['small', 'default', 'large'].includes(props.size)
})

// 计算自定义样式变量
const customStyle = computed(() => {
  const styles: Record<string, string> = {}

  // 自定义尺寸
  if (!isPresetSize.value && props.size) {
    styles['--ui-icon-custom-size'] = props.size
  }

  // 自定义颜色
  if (props.color) {
    styles['--ui-icon-custom-color'] = props.color
  }

  return styles
})

// 计算图标类名
const iconClass = computed(() => {
  const classes = [
    'ui-icon',
  ]

  // 尺寸样式
  if (isPresetSize.value) {
    classes.push(`ui-icon--size-${props.size}`)
  }
  else if (props.size) {
    classes.push('ui-icon--size-custom')
  }

  // 颜色样式
  if (props.color) {
    if (['primary', 'success', 'warning', 'danger', 'info'].includes(props.color)) {
      classes.push(`ui-icon--color-${props.color}`)
    }
    else {
      classes.push('ui-icon--color-custom')
    }
  }

  // 旋转动画
  if (props.spin) {
    classes.push('ui-icon--spin')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})
</script>

<template>
  <Icon
    :name="icon"
    :class="iconClass"
    :style="customStyle"
  />
</template>

<style scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

/* 预设尺寸 */
.ui-icon--size-small {
  font-size: 1rem;
  width: 1rem;
  height: 1rem;
}

.ui-icon--size-default {
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

.ui-icon--size-large {
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
}

/* 自定义尺寸 */
.ui-icon--size-custom {
  font-size: var(--ui-icon-custom-size);
  width: var(--ui-icon-custom-size);
  height: var(--ui-icon-custom-size);
}

/* 预设颜色 */
.ui-icon--color-primary {
  color: var(--ui-color-primary, #10b981);
}

.ui-icon--color-success {
  color: var(--ui-color-success, #10b981);
}

.ui-icon--color-warning {
  color: var(--ui-color-warning, #f59e0b);
}

.ui-icon--color-danger {
  color: var(--ui-color-danger, #ef4444);
}

.ui-icon--color-info {
  color: var(--ui-color-info, #3b82f6);
}

/* 自定义颜色 */
.ui-icon--color-custom {
  color: var(--ui-icon-custom-color);
}

/* 旋转动画 */
.ui-icon--spin {
  animation: ui-icon-spin 1s linear infinite;
}

@keyframes ui-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
