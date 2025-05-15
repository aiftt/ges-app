<script setup lang="ts" name="UiTimelineItem">
/**
 * 时间线项组件
 * 创建日期: 2024-08-30
 * 作者: aiftt
 * 更新日期: 2024-08-30 - 从time/item.vue移动到timeline/item.vue，规范文件结构
 */
import { computed, inject, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 时间节点类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  /**
   * 时间节点颜色
   */
  color?: string
  /**
   * 时间节点图标
   */
  icon?: string
  /**
   * 时间戳内容
   */
  timestamp?: string
  /**
   * 是否隐藏时间戳
   */
  hideTimestamp?: boolean
  /**
   * 时间戳位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 时间节点大小
   */
  size?: 'normal' | 'large'
  /**
   * 是否为空心点
   */
  hollow?: boolean
  /**
   * 是否垂直居中（仅适用于垂直模式）
   */
  center?: boolean
  /**
   * 节点位置（仅在垂直方向且父组件position不为alternate时有效）
   */
  position?: 'left' | 'right'
  /**
   * 是否为结束节点
   */
  isPending?: boolean
  /**
   * 标签内容
   */
  label?: string
}>(), {
  type: '',
  hideTimestamp: false,
  placement: 'bottom',
  size: 'normal',
  hollow: false,
  center: false,
  isPending: false,
})

// 获取元素索引用于交替布局
const itemRef = ref<HTMLElement | null>(null)
const itemIndex = ref(-1)

onMounted(() => {
  if (itemRef.value && itemRef.value.parentElement) {
    // 获取当前元素在父元素中的索引
    const children = Array.from(itemRef.value.parentElement.children)
    itemIndex.value = children.indexOf(itemRef.value)
  }
})

// 注入父组件配置
const timeline = inject('timeline', {
  direction: computed(() => 'vertical'),
  position: computed(() => 'left'),
  color: computed(() => ''),
  itemsCount: computed(() => 0),
  pending: computed(() => false),
})

// 类型映射到颜色
const TypeColorMap: Record<string, string> = {
  primary: 'var(--ui-color-primary, #409EFF)',
  success: 'var(--ui-color-success, #67C23A)',
  warning: 'var(--ui-color-warning, #E6A23C)',
  danger: 'var(--ui-color-danger, #F56C6C)',
  info: 'var(--ui-color-info, #909399)',
}

// 计算节点颜色
const nodeColor = computed(() => {
  if (props.color)
    return props.color
  if (props.type && TypeColorMap[props.type])
    return TypeColorMap[props.type]
  return timeline.color.value || 'var(--ui-color-primary, #409EFF)'
})

// 计算节点位置，实现交替布局
const itemPosition = computed(() => {
  if (timeline.direction.value === 'horizontal')
    return ''

  // 如果是垂直模式且组件自身有position属性，则优先使用
  if (props.position) {
    return props.position
  }

  // 如果父组件是alternate模式，则根据索引交替位置
  if (timeline.position.value === 'alternate') {
    return itemIndex.value % 2 === 0 ? 'left' : 'right'
  }

  return timeline.position.value
})

// 计算是否为居中模式
const isCenter = computed(() => {
  if (timeline.direction.value === 'horizontal')
    return true
  if (props.center)
    return true
  return false
})

// 计算节点尺寸 (数值)
const nodeSize = computed<number>(() => {
  return props.size === 'large' ? 16 : 12
})

// 节点尺寸字符串
const nodeSizeStr = computed(() => {
  return `${nodeSize.value}px`
})

// 线条颜色
const tailColor = computed(() => {
  return timeline.color?.value || 'var(--ui-border-color, #dcdfe6)'
})

// 计算是否为最后一个项目
const isLastItem = computed(() => {
  if (props.isPending)
    return true
  if (timeline.pending.value)
    return false

  // 如果没有启用pending模式，则检查是否为最后一个子元素
  if (itemRef.value && itemRef.value.parentElement) {
    const lastIndex = itemRef.value.parentElement.children.length - 1
    return itemIndex.value === lastIndex
  }
  return false
})

// 计算类名
const classNames = computed(() => [
  'ui-timeline-item',
  `ui-timeline-item--${timeline.direction.value}`,
  {
    'ui-timeline-item--center': isCenter.value,
    'ui-timeline-item--left': itemPosition.value === 'left',
    'ui-timeline-item--right': itemPosition.value === 'right',
    'ui-timeline-item--top': props.placement === 'top',
    'ui-timeline-item--large': props.size === 'large',
    'ui-timeline-item--last': isLastItem.value,
    'ui-timeline-item--pending': props.isPending,
    'ui-timeline-item--alternate': timeline.position.value === 'alternate',
  },
])
</script>

<template>
  <div ref="itemRef" :class="classNames">
    <!-- 时间戳 (top placement) -->
    <div
      v-if="timestamp && !hideTimestamp && placement === 'top'"
      class="ui-timeline-item__timestamp ui-timeline-item__timestamp--top"
    >
      {{ timestamp }}
    </div>

    <!-- 节点容器 -->
    <div class="ui-timeline-item__node-container">
      <!-- 连接线 -->
      <div
        v-if="!isLastItem"
        class="ui-timeline-item__tail"
        :style="{ backgroundColor: tailColor }"
      />

      <!-- 时间点 -->
      <div
        class="ui-timeline-item__node"
        :style="{
          backgroundColor: hollow ? 'transparent' : nodeColor,
          borderColor: nodeColor,
          width: `${nodeSizeStr}`,
          height: `${nodeSizeStr}`,
        }"
      >
        <slot name="dot">
          <ui-icon
            v-if="icon"
            :icon="icon"
            class="ui-timeline-item__icon"
            :color="hollow ? nodeColor : '#fff'"
            :size="String(nodeSize)"
          />
        </slot>
      </div>
    </div>

    <!-- 内容容器 -->
    <div class="ui-timeline-item__content">
      <div class="ui-timeline-item__wrapper">
        <!-- 标签内容，如果提供了，则优先显示 -->
        <div v-if="label" class="ui-timeline-item__label">
          {{ label }}
        </div>
        <!-- 默认插槽 -->
        <slot />
      </div>

      <!-- 时间戳 (bottom placement) -->
      <div
        v-if="timestamp && !hideTimestamp && placement === 'bottom'"
        class="ui-timeline-item__timestamp ui-timeline-item__timestamp--bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-timeline-item {
  position: relative;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
  min-height: 70px;
}

/* 垂直模式 */
.ui-timeline-item--vertical {
  padding-left: 28px;
}

/* 水平模式 */
.ui-timeline-item--horizontal {
  flex-direction: column;
  padding-left: 0;
  padding-top: 28px;
  min-width: 120px;
  flex: 0 0 auto;
}

.ui-timeline-item__node-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ui-bg-color, #fff);
  z-index: 1;
}

/* 垂直方向节点容器 */
.ui-timeline-item--vertical .ui-timeline-item__node-container {
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
}

.ui-timeline-item--vertical.ui-timeline-item--right .ui-timeline-item__node-container {
  right: 0;
  left: auto;
}

/* 水平方向节点容器 */
.ui-timeline-item--horizontal .ui-timeline-item__node-container {
  top: 0;
  left: calc(50% - 7px);
  width: 16px;
  height: 16px;
}

/* 居中节点容器 */
.ui-timeline-item--vertical.ui-timeline-item--center .ui-timeline-item__node-container {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item__tail {
  position: absolute;
  content: '';
  height: 100%;
  width: 2px;
  background-color: var(--ui-border-color, #dcdfe6);
  z-index: 0;
}

/* 垂直方向时间线 */
.ui-timeline-item--vertical .ui-timeline-item__tail {
  left: 7px; /* 确保垂直方向时连接线位置正确 */
  top: 0;
  height: calc(100% - 10px); /* 确保连接线能够正确连接到下一个节点 */
}

.ui-timeline-item--vertical.ui-timeline-item--right .ui-timeline-item__tail {
  right: 7px;
  left: auto;
}

/* 水平时间线样式 */
.ui-timeline-item--horizontal .ui-timeline-item__tail {
  height: 2px;
  width: calc(100% - 10px); /* 确保连接线能够正确连接到下一个节点 */
  left: 10px; /* 稍微偏移起点，使连接线从节点中心开始 */
  top: 7px;
}

.ui-timeline-item--vertical.ui-timeline-item--center .ui-timeline-item__tail {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item--center.ui-timeline-item--horizontal .ui-timeline-item__tail {
  height: 2px;
  width: 100%;
  left: 0;
  top: 7px;
  transform: none;
}

.ui-timeline-item__node {
  width: 12px;
  height: 12px;
  background-color: var(--ui-color-primary, #409eff);
  border: 2px solid var(--ui-color-primary, #409eff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.ui-timeline-item--large .ui-timeline-item__node {
  width: 16px;
  height: 16px;
}

.ui-timeline-item__icon {
  color: #fff;
  font-size: 12px;
}

.ui-timeline-item--large .ui-timeline-item__icon {
  font-size: 16px;
}

.ui-timeline-item__content {
  flex: 1;
  padding-left: 20px;
}

.ui-timeline-item__wrapper {
  position: relative;
  padding-bottom: 10px;
}

.ui-timeline-item__timestamp {
  color: var(--ui-color-text-secondary, #909399);
  font-size: 13px;
  margin-top: 8px;
}

.ui-timeline-item__timestamp--top {
  margin-bottom: 8px;
  margin-top: 0;
}

.ui-timeline-item__timestamp--bottom {
  margin-top: 8px;
}

/* 右侧时间线样式 */
.ui-timeline-item--right {
  padding-right: 28px;
  padding-left: 0;
  flex-direction: row-reverse;
}

.ui-timeline-item--right .ui-timeline-item__node-container {
  right: 0;
}

.ui-timeline-item--right .ui-timeline-item__tail {
  right: 7px;
}

.ui-timeline-item--right .ui-timeline-item__node {
  right: 0;
}

/* 居中时间线样式 */
.ui-timeline-item--center {
  position: relative;
}

.ui-timeline-item--center .ui-timeline-item__node-container {
  left: calc(50% - 7px);
}

.ui-timeline-item--center .ui-timeline-item__tail {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item--center .ui-timeline-item__content {
  text-align: center;
  padding-left: 0;
}

/* 水平时间线样式 */
.ui-timeline-item--horizontal .ui-timeline-item__tail {
  height: 2px;
  width: 100%;
  left: 0;
  top: 7px;
}

.ui-timeline-item--horizontal .ui-timeline-item__node-container {
  top: 0;
  left: calc(50% - 7px);
}

.ui-timeline-item--horizontal .ui-timeline-item__content {
  padding-top: 15px;
  padding-left: 0;
}

/* 最后一个项目样式 */
.ui-timeline-item--last .ui-timeline-item__tail {
  display: none;
}

/* 结束节点样式 */
.ui-timeline-item--pending {
  color: var(--ui-color-text-secondary, #909399);
}

/* 时间戳位置样式 */
.ui-timeline-item--top .ui-timeline-item__timestamp {
  margin-bottom: 8px;
  margin-top: 0;
}

/* 交替时间线项样式 */
.ui-timeline-item--alternate {
  padding-left: calc(50% + 14px);
}

.ui-timeline-item--alternate.ui-timeline-item--right {
  padding-right: calc(50% + 14px);
  padding-left: 0;
}

.ui-timeline-item--alternate .ui-timeline-item__node-container {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item--alternate .ui-timeline-item__node {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item--alternate .ui-timeline-item__tail {
  left: 50%;
  transform: translateX(-50%);
}

/* 添加的标签样式 */
.ui-timeline-item__label {
  font-weight: 500;
  margin-bottom: 4px;
}
</style>
