<script setup lang="ts" name="UiAlert">
/**
 * Alert 警告提示组件
 * 创建日期: 2024-06-24
 * 作者: aiftt
 * 更新日期: 2024-06-24 - 初始版本
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 */

import type { AlertType } from '~/types/ui'
import { computed, ref } from 'vue'

// 定义props类型
const props = withDefaults(defineProps<{
  /**
   * 警告提示的类型
   */
  type?: AlertType
  /**
   * 是否显示图标
   */
  showIcon?: boolean
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 警告提示的标题
   */
  title?: string
  /**
   * 警告提示的辅助性文字介绍
   */
  description?: string
  /**
   * 是否可关闭
   */
  closable?: boolean
  /**
   * 自定义关闭图标
   */
  closeIcon?: string
  /**
   * 是否居中显示
   */
  center?: boolean
  /**
   * 是否显示边框
   */
  border?: boolean
  /**
   * 是否带有阴影
   */
  shadow?: boolean
  /**
   * 是否可收起
   */
  collapsible?: boolean
  /**
   * 初始是否展开
   */
  defaultOpen?: boolean
  /**
   * 圆角大小
   */
  borderRadius?: string
  /**
   * 自定义背景颜色
   */
  bgColor?: string
  /**
   * 自定义文本颜色
   */
  textColor?: string
  /**
   * 自定义边框颜色
   */
  borderColor?: string
}>(), {
  type: 'info',
  showIcon: true,
  closable: false,
  closeIcon: 'heroicons:x-mark-20-solid',
  center: false,
  border: true,
  shadow: false,
  collapsible: false,
  defaultOpen: true,
  borderRadius: '',
})

// 定义事件
const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
  (e: 'toggle', expanded: boolean): void
}>()

// 是否可见
const visible = ref(true)

// 是否展开（用于可收起的警告提示）
const expanded = ref(props.defaultOpen)

// 处理关闭
function handleClose(event: MouseEvent) {
  visible.value = false
  emit('close', event)
}

// 处理折叠/展开
function handleToggle() {
  expanded.value = !expanded.value
  emit('toggle', expanded.value)
}

// 计算CSS变量
const bgColorVar = computed(() => props.bgColor || null)
const textColorVar = computed(() => props.textColor || null)
const borderColorVar = computed(() => props.borderColor || null)
const borderRadiusVar = computed(() => props.borderRadius || null)

// 根据类型获取图标
const typeIcon = computed(() => {
  const icons = {
    info: 'heroicons:information-circle-20-solid',
    success: 'heroicons:check-circle-20-solid',
    warning: 'heroicons:exclamation-triangle-20-solid',
    error: 'heroicons:exclamation-circle-20-solid',
  }

  return props.icon || icons[props.type]
})

// 计算alert主类名
const alertClass = computed(() => {
  const classes = [
    'ui-alert',
    `ui-alert--${props.type}`,
  ]

  if (props.center) {
    classes.push('ui-alert--center')
  }

  if (props.border) {
    classes.push('ui-alert--bordered')
  }

  if (props.shadow) {
    classes.push('ui-alert--shadow')
  }

  if (props.collapsible) {
    classes.push('ui-alert--collapsible')
  }

  if (!expanded.value) {
    classes.push('ui-alert--collapsed')
  }

  return classes.join(' ')
})

// 计算折叠图标
const collapseIcon = computed(() => {
  return expanded.value
    ? 'heroicons:chevron-up-20-solid'
    : 'heroicons:chevron-down-20-solid'
})
</script>

<template>
  <transition name="ui-alert-fade">
    <div v-if="visible" :class="alertClass" role="alert">
      <!-- 图标 -->
      <div v-if="showIcon" class="ui-alert__icon">
        <ui-icon :icon="typeIcon" size="20px" />
      </div>

      <!-- 内容 -->
      <div class="ui-alert__content">
        <!-- 标题 -->
        <div v-if="title" class="ui-alert__title">
          <slot name="title">
            {{ title }}
          </slot>
          <!-- 折叠按钮 -->
          <button
            v-if="collapsible"
            type="button"
            class="ui-alert__collapse-btn"
            @click="handleToggle"
          >
            <ui-icon :icon="collapseIcon" size="16px" />
          </button>
        </div>

        <!-- 描述 -->
        <div v-show="!collapsible || expanded" class="ui-alert__description">
          <slot name="description">
            <slot>{{ description }}</slot>
          </slot>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <button
        v-if="closable"
        type="button"
        class="ui-alert__close-btn"
        @click="handleClose"
      >
        <ui-icon :icon="closeIcon" size="16px" />
      </button>
    </div>
  </transition>
</template>

<style scoped>
.ui-alert {
  /* 动态CSS变量绑定 */
  --ui-alert-bg-color: v-bind(bgColorVar);
  --ui-alert-text-color: v-bind(textColorVar);
  --ui-alert-border-color: v-bind(borderColorVar);
  --ui-alert-border-radius: v-bind(borderRadiusVar);

  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: var(--ui-alert-border-radius, var(--ui-alert-border-radius, 4px));
  transition: all 0.3s;
}

/* 不同类型的警告框样式 */
.ui-alert--info {
  background-color: var(--ui-alert-bg-color, var(--ui-alert-info-bg));
  color: var(--ui-alert-text-color, var(--ui-alert-info-color));
}

.ui-alert--success {
  background-color: var(--ui-alert-bg-color, var(--ui-alert-success-bg));
  color: var(--ui-alert-text-color, var(--ui-alert-success-color));
}

.ui-alert--warning {
  background-color: var(--ui-alert-bg-color, var(--ui-alert-warning-bg));
  color: var(--ui-alert-text-color, var(--ui-alert-warning-color));
}

.ui-alert--error {
  background-color: var(--ui-alert-bg-color, var(--ui-alert-error-bg));
  color: var(--ui-alert-text-color, var(--ui-alert-error-color));
}

/* 带边框样式 */
.ui-alert--bordered.ui-alert--info {
  border: 1px solid var(--ui-alert-border-color, var(--ui-alert-info-border));
}

.ui-alert--bordered.ui-alert--success {
  border: 1px solid var(--ui-alert-border-color, var(--ui-alert-success-border));
}

.ui-alert--bordered.ui-alert--warning {
  border: 1px solid var(--ui-alert-border-color, var(--ui-alert-warning-border));
}

.ui-alert--bordered.ui-alert--error {
  border: 1px solid var(--ui-alert-border-color, var(--ui-alert-error-border));
}

/* 阴影样式 */
.ui-alert--shadow {
  box-shadow: var(--ui-alert-shadow);
}

/* 内容居中 */
.ui-alert--center {
  justify-content: center;
  text-align: center;
}

.ui-alert--center .ui-alert__content {
  flex-direction: column;
  align-items: center;
}

/* 图标样式 */
.ui-alert__icon {
  margin-right: 12px;
  font-size: 20px;
  color: var(--ui-alert-icon-color);
}

/* 内容样式 */
.ui-alert__content {
  flex: 1;
  min-width: 0;
}

/* 标题样式 */
.ui-alert__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 4px;
}

/* 描述样式 */
.ui-alert__description {
  font-size: 14px;
  line-height: 1.5;
}

/* 关闭按钮样式 */
.ui-alert__close-btn {
  position: absolute;
  top: 8px;
  right: 16px;
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
  color: currentColor;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.ui-alert__close-btn:hover {
  opacity: 1;
  color: var(--ui-alert-close-hover-color);
}

/* 折叠按钮样式 */
.ui-alert__collapse-btn {
  margin-left: 8px;
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
  color: currentColor;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.ui-alert__collapse-btn:hover {
  opacity: 1;
}

.ui-alert--collapsible .ui-alert__title {
  cursor: pointer;
}

/* 淡入淡出动画 */
.ui-alert-fade-enter-active,
.ui-alert-fade-leave-active {
  transition:
    opacity 0.3s,
    max-height 0.3s,
    margin-bottom 0.3s;
}

.ui-alert-fade-enter-from,
.ui-alert-fade-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}
</style>
