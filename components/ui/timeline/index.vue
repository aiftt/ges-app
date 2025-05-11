<script setup lang="ts" name="UiTimeline">
/**
 * 时间线组件
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-27 - 参考Element Plus重新实现，优化交替布局和水平模式
 * 更新日期: 2024-09-13 - 使用集中管理的类型定义
 */
import type { Direction, Position } from '~/types/ui'
import { computed, onMounted, provide, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 时间线方向
   */
  direction?: Direction
  /**
   * 时间线节点间距
   */
  itemGap?: string | number
  /**
   * 时间线颜色
   */
  color?: string
  /**
   * 节点位置，仅在垂直方向有效
   * left: 节点在左侧
   * right: 节点在右侧
   * alternate: 节点交替出现在两侧
   */
  position?: Position
  /**
   * 是否反转显示顺序
   */
  reverse?: boolean
  /**
   * 是否添加结束节点
   */
  pending?: boolean
  /**
   * 自定义结束节点内容
   */
  pendingDot?: string
}>(), {
  direction: 'vertical',
  position: 'left',
  reverse: false,
  itemGap: '0',
  pending: false,
})

// 获取子元素数量用于交替布局
const timelineRef = ref<HTMLElement | null>(null)
const itemsCount = ref(0)

onMounted(() => {
  if (timelineRef.value) {
    // 获取子元素数量
    itemsCount.value = timelineRef.value.children.length
  }
})

// 提供timeline配置给子组件
provide('timeline', {
  direction: computed(() => props.direction),
  position: computed(() => props.position),
  color: computed(() => props.color),
  itemsCount: computed(() => itemsCount.value),
  pending: computed(() => props.pending),
})

// 计算间距样式
const gapStyle = computed(() => {
  const gap = typeof props.itemGap === 'number'
    ? `${props.itemGap}px`
    : props.itemGap

  return {
    [props.direction === 'vertical' ? 'rowGap' : 'columnGap']: gap,
  }
})

// 计算容器类名
const timelineClass = computed(() => [
  'ui-timeline',
  `ui-timeline--${props.direction}`,
  {
    'ui-timeline--reverse': props.reverse,
    'ui-timeline--pending': props.pending,
  },
])
</script>

<template>
  <div ref="timelineRef" :class="timelineClass" :style="gapStyle">
    <slot />

    <!-- 结束节点 -->
    <ui-timeline-item
      v-if="pending"
      class="ui-timeline-item--pending"
      :is-pending="true"
    >
      <template #dot>
        <div v-if="pendingDot" class="ui-timeline-item__pending-dot">
          {{ pendingDot }}
        </div>
        <ui-icon v-else icon="carbon:time" class="ui-timeline-item__icon--pending" />
      </template>
      <slot name="pendingNode" />
    </ui-timeline-item>
  </div>
</template>

<style scoped>
.ui-timeline {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  font-size: var(--ui-font-size, 14px);
}

/* 垂直时间线 */
.ui-timeline--vertical {
  display: flex;
  flex-direction: column;
}

/* 水平时间线 */
.ui-timeline--horizontal {
  display: flex;
  flex-direction: row;
  padding-top: 14px;
  overflow-x: auto;
}

/* 反向排序 */
.ui-timeline--reverse.ui-timeline--vertical {
  flex-direction: column-reverse;
}

.ui-timeline--reverse.ui-timeline--horizontal {
  flex-direction: row-reverse;
}

/* 结束节点样式 */
.ui-timeline-item--pending .ui-timeline-item__pending-dot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-timeline-item__icon--pending {
  color: var(--ui-color-text-secondary, #909399);
  animation: ui-timeline-pending-spin 1.2s infinite linear;
}

@keyframes ui-timeline-pending-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
