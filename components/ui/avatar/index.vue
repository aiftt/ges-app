<script setup lang="ts" name="UiAvatar">
/**
 * Avatar 头像组件
 * 创建日期: 2024-06-21
 * 作者: aiftt
 * 更新日期: 2024-06-21 - 初始版本
 * 更新日期: 2024-06-21 - 修复TypeScript类型错误
 * 更新日期: 2024-06-21 - 将内联样式改为CSS变量
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */

import type { AvatarSize } from '~/types/ui'
import { computed, ref } from 'vue'

// 定义props类型
interface AvatarProps {
  /**
   * 图片源地址
   */
  src?: string
  /**
   * 头像尺寸
   */
  size?: AvatarSize
  /**
   * 形状，圆形或方形
   */
  shape?: 'circle' | 'square'
  /**
   * 图片加载失败时显示的文字
   */
  alt?: string
  /**
   * 自定义图标名称
   */
  icon?: string
  /**
   * 自定义文字内容
   */
  text?: string
  /**
   * 图片适应方式
   */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 自定义边框颜色
   */
  borderColor?: string
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文字颜色
   */
  color?: string
  /**
   * 头像组中的索引，用于计算自动颜色
   */
  index?: number
}

// 定义props
const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'default',
  shape: 'circle',
  fit: 'cover',
  bordered: false,
})

// 图片加载状态
const imgLoadError = ref(false)

// 处理图片加载失败
function handleError() {
  imgLoadError.value = true
}

// 计算自定义尺寸
const customSize = computed(() => {
  if (typeof props.size === 'number')
    return `${props.size}px`
  return null
})

const customFontSize = computed(() => {
  if (typeof props.size === 'number')
    return `${Math.floor(props.size / 2)}px`
  return null
})

// 生成显示文字（取第一个字符）
const displayText = computed(() => {
  if (!props.text)
    return ''
  return props.text.charAt(0).toUpperCase()
})

// 自动计算背景色（用于文字头像）
const autoColor = computed(() => {
  if (props.bgColor)
    return null

  // 预定义的颜色数组，用于轮换
  const colors = [
    '#1677ff', // 蓝色
    '#52c41a', // 绿色
    '#faad14', // 黄色
    '#f5222d', // 红色
    '#722ed1', // 紫色
    '#eb2f96', // 粉色
    '#fa8c16', // 橙色
    '#13c2c2', // 青色
  ]

  // 根据index或text确定颜色
  if (props.index !== undefined) {
    return colors[props.index % colors.length]
  }

  if (props.text) {
    // 使用文本的第一个字符的Unicode值作为索引
    const charCode = props.text.charCodeAt(0)
    return colors[charCode % colors.length]
  }

  return null
})

// CSS变量
const bgColorVar = computed(() => props.bgColor || autoColor.value || null)
const textColorVar = computed(() => props.color || null)
const borderColorVar = computed(() => props.borderColor || null)
const objectFitVar = computed(() => props.fit || null)

// 组件类名
const avatarClasses = computed(() => {
  const classes = ['ui-avatar']

  // 预设尺寸
  if (typeof props.size === 'string') {
    classes.push(`ui-avatar--${props.size}`)
  }
  else {
    classes.push('ui-avatar--custom-size')
  }

  // 形状
  classes.push(`ui-avatar--${props.shape}`)

  // 边框
  if (props.bordered) {
    classes.push('ui-avatar--bordered')
  }

  // 自定义样式
  if (props.bgColor || props.color || props.borderColor) {
    classes.push('ui-avatar--custom')
  }

  return classes.join(' ')
})

// 判断显示类型
const showType = computed(() => {
  if (props.src && !imgLoadError.value)
    return 'image'
  if (props.icon)
    return 'icon'
  if (props.text || props.alt)
    return 'text'
  return 'image' // 默认显示图片
})
</script>

<template>
  <div :class="avatarClasses">
    <!-- 图片头像 -->
    <img
      v-if="showType === 'image'"
      :src="src"
      :alt="alt"
      @error="handleError"
    >

    <!-- 图标头像 -->
    <ui-icon
      v-else-if="showType === 'icon'"
      :icon="icon || ''"
      :size="typeof size === 'number' ? `${Math.floor(size * 0.6)}px` : size"
    />

    <!-- 文字头像 -->
    <span v-else class="ui-avatar-text">
      {{ displayText || (alt ? alt.charAt(0).toUpperCase() : '') }}
    </span>
  </div>
</template>

<style scoped>
.ui-avatar {
  /* 动态变量绑定 */
  --ui-avatar-bg-color: v-bind(bgColorVar);
  --ui-avatar-text-color: v-bind(textColorVar);
  --ui-avatar-border-color: v-bind(borderColorVar);
  --ui-avatar-custom-size: v-bind(customSize);
  --ui-avatar-custom-font-size: v-bind(customFontSize);
  --ui-avatar-object-fit: v-bind(objectFitVar);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--ui-avatar-bg-color, var(--ui-avatar-bg, var(--ui-color-bg-light, #f3f4f6)));
  color: var(--ui-avatar-text-color, var(--ui-avatar-color, var(--ui-color-text, #374151)));
  white-space: nowrap;
  vertical-align: middle;
  font-weight: var(--ui-avatar-font-weight, 500);
  user-select: none;
}

.ui-avatar img {
  width: 100%;
  height: 100%;
  object-fit: var(--ui-avatar-object-fit, cover);
  display: block;
}

.ui-avatar-text {
  line-height: 1;
  transform: scale(1);
}

/* 尺寸变体 */
.ui-avatar--small {
  width: var(--ui-avatar-size-small, 32px);
  height: var(--ui-avatar-size-small, 32px);
  font-size: var(--ui-avatar-font-small, 14px);
}

.ui-avatar--default {
  width: var(--ui-avatar-size-default, 40px);
  height: var(--ui-avatar-size-default, 40px);
  font-size: var(--ui-avatar-font-default, 16px);
}

.ui-avatar--large {
  width: var(--ui-avatar-size-large, 48px);
  height: var(--ui-avatar-size-large, 48px);
  font-size: var(--ui-avatar-font-large, 20px);
}

.ui-avatar--custom-size {
  width: var(--ui-avatar-custom-size);
  height: var(--ui-avatar-custom-size);
  font-size: var(--ui-avatar-custom-font-size);
}

/* 形状变体 */
.ui-avatar--circle {
  border-radius: 50%;
}

.ui-avatar--square {
  border-radius: var(--ui-avatar-border-radius, 4px);
}

/* 边框样式 */
.ui-avatar--bordered {
  border: 1px solid var(--ui-avatar-border-color, var(--ui-border-color, #e5e7eb));
}
</style>
