<script setup lang="ts" name="UiSpace">
/**
 * 空间间距组件
 * 创建日期: 2025-01-15
 * 作者: aiftt
 * 更新日期: 2025-02-27 - 将内联样式改为CSS变量
 * 更新日期: 2025-02-28 - 改进CSS变量实现，移除内联style
 *
 * 用于设置元素之间的间距，提供水平和垂直方向的间隔
 */

// 定义props
// 定义VNode类型
import type { VNode } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 间距大小
   */
  size?: 'small' | 'medium' | 'large' | number | string
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline'
  /**
   * 是否环绕式布局
   */
  wrap?: boolean
  /**
   * 是否渲染为行内元素
   */
  inline?: boolean
  /**
   * 是否填充父容器
   */
  fill?: boolean
  /**
   * 分隔符
   */
  split?: boolean
  /**
   * 自定义类名
   */
  class?: string
}>(), {
  direction: 'horizontal',
  size: 'medium',
  align: 'center',
  wrap: false,
  inline: false,
  fill: false,
  split: false,
  class: '',
})

// 计算空间容器的类名
const spaceClass = computed(() => {
  const classes = ['ui-space']

  // 间距方向
  classes.push(`ui-space--${props.direction}`)

  // 对齐方式
  classes.push(`ui-space--align-${props.align}`)

  // 换行
  if (props.wrap) {
    classes.push('ui-space--wrap')
  }

  // 行内显示
  if (props.inline) {
    classes.push('ui-space--inline')
  }

  // 填充父容器
  if (props.fill) {
    classes.push('ui-space--fill')
  }

  // 添加自定义类名
  if (props.class) {
    classes.push(props.class)
  }

  // 添加自定义间距类
  if (props.size) {
    classes.push('ui-space--custom-gap')
  }

  return classes.join(' ')
})

// 计算间距变量 - 用于CSS变量绑定
const gapVar = computed(() => {
  // 计算间距大小
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  else if (props.size === 'small') {
    return '8px'
  }
  else if (props.size === 'large') {
    return '24px'
  }
  else if (typeof props.size === 'string' && !['small', 'medium', 'large'].includes(props.size)) {
    return props.size
  }
  else {
    // 默认medium
    return '16px'
  }
})

// 处理子元素，过滤掉null和undefined
const filteredChildren = computed(() => {
  return filterEmptyChildren($slots.default?.())
})

// 过滤空子元素
function filterEmptyChildren(children?: VNode[]): VNode[] {
  if (!children)
    return []

  return children.filter((child) => {
    // 检查子元素是否为注释或空值
    return child && !(typeof child.type === 'symbol')
  })
}
</script>

<template>
  <div :class="spaceClass">
    <template v-for="(child, index) in filteredChildren" :key="index">
      <div class="ui-space-item">
        <component :is="child" />
      </div>
      <div v-if="split && index < filteredChildren.length - 1" class="ui-space-split">
        <div class="ui-space-split-line" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.ui-space {
  display: flex;
  gap: 16px; /* 默认间距 */
}

.ui-space--custom-gap {
  --ui-space-gap: v-bind(gapVar);
  gap: var(--ui-space-gap);
}

.ui-space--horizontal {
  flex-direction: row;
}

.ui-space--vertical {
  flex-direction: column;
}

.ui-space--align-start {
  align-items: flex-start;
}

.ui-space--align-end {
  align-items: flex-end;
}

.ui-space--align-center {
  align-items: center;
}

.ui-space--align-baseline {
  align-items: baseline;
}

.ui-space--wrap {
  flex-wrap: wrap;
}

.ui-space--inline {
  display: inline-flex;
}

.ui-space--fill {
  width: 100%;
}

.ui-space--fill > .ui-space-item {
  flex: 1;
}

.ui-space-split-line {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 1rem;
  width: 1px;
  background-color: var(--ui-color-split, #e5e7eb);
}

:root.dark .ui-space-split-line {
  background-color: var(--ui-color-split-dark, #4b5563);
}
</style>
