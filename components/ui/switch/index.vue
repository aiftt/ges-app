<script setup lang="ts" name="UiSwitch">
/**
 * 开关组件
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始实现
 */
import { computed } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 是否打开
   */
  modelValue?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 开关尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 开启状态的文本
   */
  activeText?: string
  /**
   * 关闭状态的文本
   */
  inactiveText?: string
  /**
   * 开启状态的值
   */
  activeValue?: string | number | boolean
  /**
   * 关闭状态的值
   */
  inactiveValue?: string | number | boolean
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 开启状态的颜色
   */
  activeColor?: string
  /**
   * 关闭状态的颜色
   */
  inactiveColor?: string
  /**
   * 名称
   */
  name?: string
  /**
   * 是否为方形按钮
   */
  square?: boolean
}>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
  activeValue: true,
  inactiveValue: false,
  loading: false,
  square: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

// 计算当前值是否等于activeValue
const checked = computed(() => {
  return props.modelValue === props.activeValue
})

// 处理点击切换
function handleChange() {
  if (props.disabled || props.loading) {
    return
  }

  const newValue = !checked.value
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 开关样式类
const switchClass = computed(() => {
  const classes = ['ui-switch']

  // 尺寸
  classes.push(`ui-switch--${props.size}`)

  // 选中状态
  if (checked.value) {
    classes.push('ui-switch--checked')
  }

  // 禁用状态
  if (props.disabled) {
    classes.push('ui-switch--disabled')
  }

  // 加载状态
  if (props.loading) {
    classes.push('ui-switch--loading')
  }

  // 方形按钮
  if (props.square) {
    classes.push('ui-switch--square')
  }

  // 有文本描述
  if (props.activeText || props.inactiveText) {
    classes.push('ui-switch--with-text')
  }

  return classes.join(' ')
})

// 计算自定义颜色样式
const activeColorVar = computed(() => props.activeColor || null)
const inactiveColorVar = computed(() => props.inactiveColor || null)
</script>

<template>
  <div :class="switchClass" @click="handleChange">
    <input
      type="checkbox"
      class="ui-switch-input"
      :checked="checked"
      :disabled="disabled"
      :name="name"
    >

    <!-- 关闭状态文本 -->
    <span v-if="inactiveText" class="ui-switch-text ui-switch-text--off">
      {{ inactiveText }}
    </span>

    <!-- 开关按钮 -->
    <div class="ui-switch-core">
      <div class="ui-switch-handle">
        <ui-icon v-if="loading" icon="carbon:rotate" class="ui-switch-loading-icon" />
      </div>
    </div>

    <!-- 开启状态文本 -->
    <span v-if="activeText" class="ui-switch-text ui-switch-text--on">
      {{ activeText }}
    </span>
  </div>
</template>

<style scoped>
.ui-switch {
  /* 自定义变量 */
  --ui-switch-active-color: v-bind(activeColorVar);
  --ui-switch-inactive-color: v-bind(inactiveColorVar);

  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.ui-switch-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
}

.ui-switch-core {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background-color: var(--ui-switch-inactive-color, var(--ui-color-bg-secondary, #e5e7eb));
  transition: all 0.3s;
}

.ui-switch-handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: white;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 选中状态 */
.ui-switch--checked .ui-switch-core {
  background-color: var(--ui-switch-active-color, var(--ui-color-primary, #10b981));
}

.ui-switch--checked .ui-switch-handle {
  left: calc(100% - 20px);
}

/* 禁用状态 */
.ui-switch--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 加载状态 */
.ui-switch--loading .ui-switch-handle {
  cursor: wait;
}

.ui-switch-loading-icon {
  font-size: 12px;
  color: var(--ui-color-primary, #10b981);
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 尺寸变体 */
.ui-switch--small .ui-switch-core {
  width: 30px;
  height: 16px;
  border-radius: 8px;
}

.ui-switch--small .ui-switch-handle {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}

.ui-switch--small.ui-switch--checked .ui-switch-handle {
  left: calc(100% - 14px);
}

.ui-switch--large .ui-switch-core {
  width: 50px;
  height: 26px;
  border-radius: 13px;
}

.ui-switch--large .ui-switch-handle {
  width: 22px;
  height: 22px;
  border-radius: 11px;
}

.ui-switch--large.ui-switch--checked .ui-switch-handle {
  left: calc(100% - 24px);
}

/* 方形按钮 */
.ui-switch--square .ui-switch-core {
  border-radius: 4px;
}

.ui-switch--square .ui-switch-handle {
  border-radius: 2px;
}

/* 文本样式 */
.ui-switch-text {
  font-size: 14px;
  line-height: 1;
  margin: 0 4px;
}

.ui-switch-text--off {
  color: var(--ui-color-text, #374151);
}

.ui-switch-text--on {
  color: var(--ui-color-primary, #10b981);
}

.ui-switch--small .ui-switch-text {
  font-size: 12px;
}

.ui-switch--large .ui-switch-text {
  font-size: 16px;
}

/* 深色模式适配 */
:root.dark .ui-switch-core {
  background-color: var(--ui-switch-inactive-color, var(--ui-color-bg-secondary-dark, #4b5563));
}

:root.dark .ui-switch-text--off {
  color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-switch-handle {
  background-color: var(--ui-color-text-dark, #e5e7eb);
}

/* 提高对比度 */
:root.dark .ui-switch--checked .ui-switch-handle {
  background-color: white;
}

/* 修复暗色主题下激活态背景色 */
:root.dark .ui-switch--checked .ui-switch-core {
  background-color: var(--ui-switch-active-color, var(--ui-color-primary, #10b981));
}
</style>
