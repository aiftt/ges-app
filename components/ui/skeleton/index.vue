<script setup lang="ts" name="UiSkeleton">
/**
 * 骨架屏组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 *
 * 用于在页面数据加载过程中显示一个占位图形，提高用户体验
 */

import { computed, h } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 组件是否处于加载中状态
   */
  loading?: boolean
  /**
   * 组件是否显示动画效果
   */
  animated?: boolean
  /**
   * 骨架屏类型
   */
  type?: 'text' | 'button' | 'avatar' | 'image' | 'paragraph' | 'card' | 'list' | 'custom'
  /**
   * 骨架屏形状
   */
  shape?: 'circle' | 'square' | 'rectangle' | 'round'
  /**
   * 骨架屏行数，仅在type为paragraph时有效
   */
  rows?: number
  /**
   * 骨架屏宽度
   */
  width?: string | number
  /**
   * 骨架屏高度
   */
  height?: string | number
  /**
   * 骨架屏圆角大小，仅在shape为square或rectangle时有效
   */
  radius?: string
  /**
   * 自定义类名
   */
  class?: string
  /**
   * 骨架屏背景色
   */
  backgroundColor?: string
  /**
   * 动画渐变颜色
   */
  animateColor?: string
  /**
   * 是否使用占位元素包裹内容
   */
  placeholder?: boolean
  /**
   * 骨架屏的标题元素，仅在type为card或list时有效
   */
  title?: boolean
  /**
   * 阴影效果
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  loading: true,
  animated: true,
  type: 'text',
  shape: 'rectangle',
  rows: 3,
  width: '',
  height: '',
  radius: '',
  class: '',
  backgroundColor: '',
  animateColor: '',
  placeholder: false,
  title: false,
  shadow: 'none',
})

// 骨架屏容器类名
const skeletonClass = computed(() => {
  const classes = ['ui-skeleton']

  if (props.animated) {
    classes.push('ui-skeleton--animated')
  }

  if (props.type) {
    classes.push(`ui-skeleton--${props.type}`)
  }

  if (props.shadow !== 'none') {
    classes.push(`ui-skeleton--shadow-${props.shadow}`)
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 计算样式变量
const widthVar = computed(() => props.width || null)
const heightVar = computed(() => props.height || null)
const radiusVar = computed(() => props.radius || null)
const backgroundVar = computed(() => props.backgroundColor || null)
const animateColorVar = computed(() => props.animateColor || null)

// 根据类型计算骨架屏项
const skeletonItems = computed(() => {
  if (props.type === 'paragraph') {
    return Array.from({ length: props.rows }).map((_, index) => ({
      width: index === props.rows - 1 ? '60%' : '100%',
      key: `p-${index}`,
    }))
  }
  return []
})

// 渲染骨架屏内容
function renderSkeleton() {
  if (props.type === 'paragraph') {
    const paragraphItems = skeletonItems.value.map(item =>
      h('div', {
        key: item.key,
        class: 'ui-skeleton__paragraph-item',
        style: { width: item.width },
      }),
    )

    return h('div', { class: 'ui-skeleton__paragraph' }, paragraphItems)
  }

  if (props.type === 'avatar') {
    return h('div', {
      class: `ui-skeleton__avatar ui-skeleton__avatar--${props.shape}`,
    })
  }

  if (props.type === 'button') {
    return h('div', { class: 'ui-skeleton__button' })
  }

  if (props.type === 'image') {
    return h('div', { class: 'ui-skeleton__image' })
  }

  if (props.type === 'card') {
    const cardContent = []

    if (props.title) {
      cardContent.push(h('div', { class: 'ui-skeleton__card-title' }))
    }

    const paragraphItems = Array.from({ length: 3 }).map((_, index) =>
      h('div', {
        key: `card-p-${index}`,
        class: 'ui-skeleton__paragraph-item',
      }),
    )

    cardContent.push(h('div', { class: 'ui-skeleton__card-content' }, paragraphItems))

    return h('div', { class: 'ui-skeleton__card' }, cardContent)
  }

  if (props.type === 'list') {
    const listItems = Array.from({ length: 3 }).map((_, index) => {
      const contentItems = []

      if (props.title) {
        contentItems.push(h('div', { class: 'ui-skeleton__list-title' }))
      }

      contentItems.push(h('div', { class: 'ui-skeleton__list-text' }))

      return h('div', {
        key: `list-${index}`,
        class: 'ui-skeleton__list-item',
      }, [
        h('div', { class: 'ui-skeleton__list-avatar ui-skeleton__avatar--circle' }),
        h('div', { class: 'ui-skeleton__list-content' }, contentItems),
      ])
    })

    return h('div', { class: 'ui-skeleton__list' }, listItems)
  }

  return h('div', { class: 'ui-skeleton__text' })
}
</script>

<template>
  <div :class="skeletonClass">
    <template v-if="loading">
      <div class="ui-skeleton__container ui-skeleton--custom-style">
        <slot name="skeleton">
          <component :is="renderSkeleton()" />
        </slot>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ui-skeleton {
  display: block;
  width: 100%;

  &--custom-style {
    --ui-skeleton-width: v-bind(widthVar);
    --ui-skeleton-height: v-bind(heightVar);
    --ui-skeleton-radius: v-bind(radiusVar);
    --ui-skeleton-background: v-bind(backgroundVar);
    --ui-skeleton-animate-color: v-bind(animateColorVar);
  }

  &__container {
    width: var(--ui-skeleton-width, 100%);
    height: var(--ui-skeleton-height, auto);
  }

  &__text,
  &__paragraph-item,
  &__button,
  &__avatar,
  &__image,
  &__card-title,
  &__list-title,
  &__list-text {
    background-color: var(--ui-skeleton-background, var(--ui-color-neutral-200, #e5e7eb));
    border-radius: var(--ui-skeleton-radius, 4px);
  }

  &__text {
    width: 100%;
    height: 16px;
  }

  &__paragraph {
    width: 100%;

    &-item {
      height: 16px;
      margin-top: 12px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  &__button {
    width: 100px;
    height: 36px;
  }

  &__avatar {
    width: 40px;
    height: 40px;

    &--circle {
      border-radius: 50%;
    }

    &--square {
      border-radius: 4px;
    }

    &--round {
      border-radius: 8px;
    }
  }

  &__image {
    width: 100%;
    height: 200px;
    border-radius: 4px;
  }

  &__card {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--ui-color-bg-card, #fff);

    &-title {
      width: 50%;
      height: 24px;
      margin-bottom: 16px;
    }

    &-content {
      .ui-skeleton__paragraph-item {
        margin-top: 12px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  &__list {
    width: 100%;

    &-item {
      display: flex;
      align-items: flex-start;
      padding: 12px 0;
      border-bottom: 1px solid var(--ui-color-border, #e5e7eb);

      &:last-child {
        border-bottom: none;
      }
    }

    &-avatar {
      flex-shrink: 0;
      margin-right: 12px;
    }

    &-content {
      flex: 1;
    }

    &-title {
      width: 40%;
      height: 20px;
      margin-bottom: 8px;
    }

    &-text {
      width: 100%;
      height: 16px;
    }
  }

  &--animated {
    $base-delay: 0.1s;
    $animation-elements: (
      'text',
      'paragraph-item',
      'button',
      'avatar',
      'image',
      'card-title',
      'list-title',
      'list-text'
    );

    // 基础骨架动画样式
    @each $element in $animation-elements {
      .ui-skeleton__#{$element} {
        position: relative;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: -150%;
          bottom: 0;
          left: -150%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--ui-skeleton-animate-color, rgba(255, 255, 255, 0.3)),
            transparent
          );
          animation: ui-skeleton-loading 1.5s infinite;
        }
      }
    }

    // 段落项动画延迟
    .ui-skeleton__paragraph {
      @for $i from 1 through 5 {
        &-item:nth-child(#{$i})::after {
          animation-delay: ($i - 1) * $base-delay * 2;
        }
      }
    }

    // 卡片动画延迟
    .ui-skeleton__card {
      &-title::after {
        animation-delay: 0s;
      }

      .ui-skeleton__paragraph-item {
        @for $i from 1 through 3 {
          &:nth-child(#{$i})::after {
            animation-delay: $i * $base-delay * 2;
          }
        }
      }
    }

    // 列表项动画延迟
    @for $i from 1 through 3 {
      $base-item-delay: ($i - 1) * $base-delay * 3;

      .ui-skeleton__list-item:nth-child(#{$i}) {
        .ui-skeleton__list-avatar::after {
          animation-delay: $base-item-delay;
        }

        .ui-skeleton__list-title::after {
          animation-delay: $base-item-delay + $base-delay;
        }

        .ui-skeleton__list-text::after {
          animation-delay: $base-item-delay + $base-delay * 2;
        }
      }
    }

    // 自定义骨架屏动画延迟
    .custom-skeleton {
      &-header .ui-skeleton__avatar::after {
        animation-delay: 0s;
      }

      &-info .ui-skeleton__text {
        @for $i from 1 through 2 {
          &:nth-child(#{$i})::after {
            animation-delay: $i * $base-delay;
          }
        }
      }
    }
  }

  &--shadow {
    &-sm {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    &-md {
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &-lg {
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }
}

@keyframes ui-skeleton-loading {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
