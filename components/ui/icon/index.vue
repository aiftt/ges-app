<script setup lang="ts" name="UiIcon">
/**
 * 图标组件
 * 创建日期: 2023-11-14
 * 作者: aiftt
 * 更新日期: 2023-12-03 - 使用 Nuxt Icon 替代 iconify-icon
 * 更新日期: 2023-12-05 - 修复内联样式问题，改用CSS变量方式实现
 * 更新日期: 2024-08-19 - 修复服务端渲染水合问题
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-12-13 - 修复动画效果无法生效的问题，使用项目现有动画库
 * 更新日期: 2024-12-13 - 增强动画支持，允许直接传递动画类名
 */

import type { IconColor, IconSize } from '~/types/ui'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 图标名称（使用iconify格式，如：'carbon:home'）
   */
  icon: string
  /**
   * 图标尺寸
   */
  size?: IconSize
  /**
   * 图标颜色，可以是任何有效的CSS颜色值
   */
  color?: IconColor
  /**
   * 动画效果
   * - 预设: spin(旋转)、pulse(跳动)、shake(摇晃)、blink(闪烁)
   * - 魔法动画: magic-anim-{name}，如 magic-anim-tada、magic-anim-bounce 等
   * - CSS摇晃: css-shake-{name}，如 css-shake-little、css-shake-crazy 等
   * - 其它任意有效的 CSS 动画类名
   */
  animation?: string
  /**
   * 自定义样式类名
   */
  class?: string
}>(), {
  size: 'default',
  color: '',
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

  // 动画效果
  if (props.animation) {
    // 处理预设动画类型
    switch (props.animation) {
      case 'spin':
        classes.push('animate-spin')
        break
      case 'pulse':
        classes.push('magic-anim-pulse')
        break
      case 'shake':
        classes.push('css-shake-base')
        break
      case 'blink':
        classes.push('magic-anim-flash')
        break
      default:
        // 允许直接传递动画类名
        classes.push(props.animation)
    }
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes
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
</style>
