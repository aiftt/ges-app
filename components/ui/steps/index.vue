<script setup lang="ts" name="UiSteps">
/**
 * 步骤条组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 * 更新日期: 2024-08-17 - 修复注入键共享问题
 */
import { provide } from 'vue'
import { STEPS_INJECTION_KEY } from '~/utils/inject-keys'

// Props定义
const props = withDefaults(defineProps<{
  /**
   * 当前激活步骤
   */
  active?: number
  /**
   * 显示方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 是否启用点状步骤条
   */
  dot?: boolean
  /**
   * 步骤条类型，可选值: 'default', 'navigation'
   */
  type?: 'default' | 'navigation'
  /**
   * 是否为简洁风格
   */
  simple?: boolean
  /**
   * 步骤的状态，会覆盖子步骤的状态
   */
  status?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  /**
   * 步骤条尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 进度条背景色
   */
  progressDot?: boolean
  /**
   * 步骤图标的大小
   */
  iconSize?: number
  /**
   * 设置当前步骤的图标，优先级高于 step 的 icon
   */
  activeIcon?: string
  /**
   * 自定义线条颜色
   */
  lineColor?: string
  /**
   * 自定义激活状态颜色
   */
  activeColor?: string
}>(), {
  active: 0,
  direction: 'horizontal',
  dot: false,
  type: 'default',
  simple: false,
  size: 'medium',
  progressDot: false,
  iconSize: 24,
})

// 事件定义
const emit = defineEmits<{
  /**
   * 点击步骤时触发
   */
  (e: 'click', index: number): void
  /**
   * 当前步骤改变时触发
   */
  (e: 'change', active: number): void
}>()

// 获取所有子步骤
const items = ref<any[]>([])

// 向子组件提供数据
provide(STEPS_INJECTION_KEY, {
  props,
  items,
  addItem: (item: any) => {
    items.value.push(item)
  },
  removeItem: (uid: string) => {
    const index = items.value.findIndex(item => item.uid === uid)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  },
  emit,
})

// CSS变量绑定
const lineColorVar = computed(() => props.lineColor || null)
const activeColorVar = computed(() => props.activeColor || null)

// 样式计算
const stepsClass = computed(() => [
  'ui-steps',
  `ui-steps-${props.direction}`,
  `ui-steps-${props.size}`,
  {
    'ui-steps-dot': props.dot,
    'ui-steps-navigation': props.type === 'navigation',
    'ui-steps-simple': props.simple,
    'ui-steps-progress-dot': props.progressDot,
  },
])

// 暴露组件方法
defineExpose({
  /**
   * 获取所有步骤项数据
   */
  getItems: () => items.value,
  /**
   * 获取当前激活步骤
   */
  getActive: () => props.active,
})
</script>

<template>
  <div
    :class="stepsClass"
    :style="`--ui-steps-line-color: ${lineColorVar || ''}; --ui-steps-active-color: ${activeColorVar || ''}`"
    role="steps"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-steps {
  --ui-steps-line-color: var(--ui-color-border-light, #e5e7eb);
  --ui-steps-active-color: var(--ui-color-primary, #3b82f6);
  --ui-steps-title-color: var(--ui-color-text, #374151);
  --ui-steps-description-color: var(--ui-color-text-secondary, #6b7280);
  --ui-steps-icon-size: v-bind('`${props.iconSize}px`');

  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 0;

  &-horizontal {
    flex-direction: row;
    justify-content: space-between;
  }

  &-vertical {
    flex-direction: column;
    min-height: 0;
  }

  &-navigation {
    padding: 0 0.5rem;
    background-color: var(--ui-color-bg-light, #f9fafb);
    border-radius: 0.25rem;

    .ui-step {
      padding: 0.5rem 0;
      cursor: pointer;

      &-icon {
        background-color: transparent;
      }

      &:last-child {
        flex: 1;
      }

      &-active {
        .ui-step-title {
          font-weight: 500;
          color: var(--ui-steps-active-color);
        }
      }
    }
  }

  &-simple {
    .ui-step {
      &-title {
        position: relative;
        padding-right: 1rem;

        &::after {
          content: '>';
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          color: var(--ui-steps-line-color);
        }
      }

      &:last-child {
        .ui-step-title::after {
          display: none;
        }
      }
    }
  }

  &-dot {
    .ui-step-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      padding: 0;
      margin-right: 8px;

      .ui-step-icon-inner {
        display: none;
      }
    }
  }

  // 尺寸样式
  &-small {
    font-size: 14px;

    .ui-step-icon {
      width: 24px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
    }

    .ui-step-title {
      font-size: 14px;
      line-height: 24px;
    }

    .ui-step-description {
      font-size: 12px;
    }
  }

  &-medium {
    font-size: 14px;

    .ui-step-icon {
      width: 32px;
      height: 32px;
      font-size: 14px;
      line-height: 32px;
    }

    .ui-step-title {
      font-size: 16px;
      line-height: 32px;
    }

    .ui-step-description {
      font-size: 14px;
    }
  }

  &-large {
    font-size: 16px;

    .ui-step-icon {
      width: 40px;
      height: 40px;
      font-size: 18px;
      line-height: 40px;
    }

    .ui-step-title {
      font-size: 18px;
      line-height: 40px;
    }

    .ui-step-description {
      font-size: 14px;
    }
  }

  &-progress-dot {
    .ui-step-tail {
      top: 9px;
      height: 2px;
    }
  }
}
</style>
