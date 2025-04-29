<script setup lang="ts" name="UiScrollbar">
/**
 * 滚动条组件
 * 创建日期: 2025-01-15
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量实现
 * 更新日期: 2025-03-01 - 优化为v-bind+CSS变量实现动态样式
 *
 * 自定义滚动条组件，提供更好的样式和控制
 */

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 容器高度
   */
  height?: string
  /**
   * 容器最大高度
   */
  maxHeight?: string
  /**
   * 是否总是显示滚动条
   */
  always?: boolean
  /**
   * 是否只在hover时显示滚动条
   */
  hover?: boolean
  /**
   * 滚动方向
   */
  direction?: 'vertical' | 'horizontal' | 'both'
  /**
   * 滚动条宽度
   */
  barWidth?: string
  /**
   * 滚动条圆角
   */
  barRadius?: string
  /**
   * 滚动条颜色
   */
  barColor?: string
  /**
   * 滚动条悬停颜色
   */
  barHoverColor?: string
  /**
   * 滚动容器背景颜色
   */
  bgColor?: string
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  height: '',
  maxHeight: '',
  always: false,
  hover: true,
  direction: 'both',
  barWidth: '6px',
  barRadius: '3px',
  barColor: '',
  barHoverColor: '',
  bgColor: '',
  class: '',
})

// 计算滚动容器的类名
const scrollbarClass = computed(() => {
  const classes = [
    'ui-scrollbar',
  ]

  // 是否只在hover时显示滚动条
  if (props.hover && !props.always) {
    classes.push('ui-scrollbar--hover')
  }

  // 滚动方向控制
  if (props.direction === 'vertical') {
    classes.push('ui-scrollbar--vertical')
  }
  else if (props.direction === 'horizontal') {
    classes.push('ui-scrollbar--horizontal')
  }
  else {
    classes.push('ui-scrollbar--both')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

// 使用计算属性和v-bind实现CSS变量
const heightVar = computed(() => props.height || null)
const maxHeightVar = computed(() => props.maxHeight || null)
const bgColorVar = computed(() => props.bgColor || null)
const barWidthVar = computed(() => props.barWidth || null)
const barRadiusVar = computed(() => props.barRadius || null)
const barColorVar = computed(() => props.barColor || null)
const barHoverColorVar = computed(() => props.barHoverColor || null)
</script>

<template>
  <div :class="scrollbarClass">
    <slot />
  </div>
</template>

<style scoped>
.ui-scrollbar {
  --ui-scrollbar-height: v-bind(heightVar);
  --ui-scrollbar-max-height: v-bind(maxHeightVar);
  --ui-scrollbar-bg-color: v-bind(bgColorVar);
  --ui-scrollbar-width: v-bind(barWidthVar);
  --ui-scrollbar-radius: v-bind(barRadiusVar);
  --ui-scrollbar-color: v-bind(barColorVar);
  --ui-scrollbar-hover-color: v-bind(barHoverColorVar);

  overflow: auto;
  height: var(--ui-scrollbar-height, auto);
  max-height: var(--ui-scrollbar-max-height, none);
  background-color: var(--ui-scrollbar-bg-color, transparent);
}

.ui-scrollbar::-webkit-scrollbar {
  width: var(--ui-scrollbar-width, 6px);
  height: var(--ui-scrollbar-width, 6px);
}

.ui-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--ui-scrollbar-color, rgba(0, 0, 0, 0.2));
  border-radius: var(--ui-scrollbar-radius, 3px);
}

.ui-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--ui-scrollbar-hover-color, rgba(0, 0, 0, 0.4));
}

.ui-scrollbar::-webkit-scrollbar-track {
  background-color: var(--ui-scrollbar-track-color, rgba(0, 0, 0, 0.05));
}

/* 方向控制 */
.ui-scrollbar--vertical {
  overflow-x: hidden;
}

.ui-scrollbar--horizontal {
  overflow-y: hidden;
}

.ui-scrollbar--both {
  overflow: auto;
}

/* 鼠标悬停显示 */
.ui-scrollbar--hover::-webkit-scrollbar {
  display: none;
}

.ui-scrollbar--hover {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.ui-scrollbar--hover:hover::-webkit-scrollbar {
  display: block;
}

.ui-scrollbar--hover:hover {
  -ms-overflow-style: auto;
  scrollbar-width: auto;
}

/* CSS变量已移至主题文件中 */
</style>
