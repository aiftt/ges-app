<script setup lang="ts" name="UiTimelineItem">
/**
 * 时间线项组件
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-27 - 修复连接线显示问题，改进交替布局，添加结束节点支持
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
  padding-left: 0;
  padding-top: 0;
  margin-right: 40px;
  min-height: auto;
}

/* 节点容器 */
.ui-timeline-item__node-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

/* 连接线 */
.ui-timeline-item__tail {
  position: absolute;
  left: 50%;
  height: calc(100% - v-bind(nodeSizeStr));
  width: 2px;
  top: v-bind(nodeSizeStr); /* 从节点底部开始 */
  bottom: 0;
  transform: translateX(-50%);
  background-color: v-bind(tailColor);
}

/* 节点 */
.ui-timeline-item__node {
  position: absolute;
  background-color: var(--ui-color-primary, #409eff);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  box-sizing: border-box;
  z-index: 1;
  left: 0;
  top: 0;
  transform: translate(-50%, 0);
}

.ui-timeline-item--large .ui-timeline-item__node {
  width: 14px;
  height: 14px;
}

/* 图标样式 */
.ui-timeline-item__icon {
  font-size: 10px;
  line-height: 1;
  color: #fff;
}

.ui-timeline-item--large .ui-timeline-item__icon {
  font-size: 14px;
}

/* 内容容器 */
.ui-timeline-item__content {
  flex: 1;
  padding-top: 1px;
  min-width: 0;
}

.ui-timeline-item__wrapper {
  position: relative;
}

/* 时间戳样式 */
.ui-timeline-item__timestamp {
  color: var(--ui-color-text-secondary, #909399);
  font-size: 13px;
  line-height: 1.5;
}

.ui-timeline-item__timestamp--top {
  margin-bottom: 8px;
}

.ui-timeline-item__timestamp--bottom {
  margin-top: 8px;
}

/* 右侧模式 */
.ui-timeline-item--right {
  padding-left: 0;
  padding-right: 28px;
  text-align: right;
}

.ui-timeline-item--right .ui-timeline-item__node-container {
  left: auto;
  right: 0;
  height: 100%;
}

.ui-timeline-item--right .ui-timeline-item__tail {
  left: auto;
  right: -2px;
}

.ui-timeline-item--right .ui-timeline-item__node {
  left: auto;
  right: 0;
  transform: translate(50%, 0);
}

/* 居中模式 */
.ui-timeline-item--center {
  padding-left: 14px;
  padding-right: 14px;
}

.ui-timeline-item--center .ui-timeline-item__node-container {
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
}

.ui-timeline-item--center .ui-timeline-item__tail {
  left: 50%;
  transform: translateX(-50%);
}

.ui-timeline-item--center .ui-timeline-item__content {
  text-align: center;
}

/* 水平模式 */
.ui-timeline-item--horizontal .ui-timeline-item__tail {
  left: 0;
  top: 6px;
  width: calc(100% - 10px);
  height: 2px;
}

.ui-timeline-item--horizontal .ui-timeline-item__node-container {
  top: 0;
  height: auto;
}

.ui-timeline-item--horizontal .ui-timeline-item__content {
  padding-top: 20px;
}

/* 结束项目 */
.ui-timeline-item--last .ui-timeline-item__tail {
  display: none;
}

.ui-timeline-item--pending {
  padding-bottom: 0;
  min-height: 40px;
}

/* 顶部时间戳 */
.ui-timeline-item--top .ui-timeline-item__timestamp {
  position: relative;
  padding-top: 4px;
}

/* 交替时间线模式 */
.ui-timeline-item--alternate {
  position: relative;
  display: flex;
  min-height: 70px;
  padding-left: 0;
  padding-right: 0;
}

.ui-timeline-item--alternate .ui-timeline-item__node-container {
  position: absolute;
  left: 50%;
  width: 0;
  height: 100%;
  transform: translateX(-50%);
  z-index: 1;
}

.ui-timeline-item--alternate .ui-timeline-item__node {
  position: absolute;
  left: 0;
  transform: translate(-50%, 0);
}

.ui-timeline-item--alternate .ui-timeline-item__tail {
  position: absolute;
  left: 0;
  height: calc(100% - 10px);
  transform: translateX(-50%);
}

/* 左侧内容 */
.ui-timeline-item--alternate.ui-timeline-item--left .ui-timeline-item__content {
  flex: 0 0 calc(50% - 20px);
  max-width: calc(50% - 20px);
  margin-right: auto;
  text-align: right;
  padding-right: 20px;
}

/* 右侧内容 */
.ui-timeline-item--alternate.ui-timeline-item--right .ui-timeline-item__content {
  flex: 0 0 calc(50% - 20px);
  max-width: calc(50% - 20px);
  margin-left: auto;
  text-align: left;
  padding-left: 20px;
}
</style>
