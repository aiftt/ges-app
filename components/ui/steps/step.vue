<script setup lang="ts" name="UiStep">
/**
 * 步骤条项组件
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 * 更新日期: 2024-08-17 - 修复注入键共享问题
 */
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { STEPS_INJECTION_KEY } from '~/utils/inject-keys'

// 定义Props
const props = withDefaults(defineProps<{
  /**
   * 步骤标题
   */
  title?: string
  /**
   * 步骤描述
   */
  description?: string
  /**
   * 步骤图标
   */
  icon?: string
  /**
   * 当前步骤状态
   */
  status?: 'wait' | 'process' | 'finish' | 'error' | 'success'
  /**
   * 是否可点击
   */
  clickable?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 子步骤
   */
  subTitle?: string
}>(), {
  clickable: false,
  disabled: false,
})

// 获取父组件注入的数据
const stepsContext = inject<any>(STEPS_INJECTION_KEY)

// 内部唯一标识
const uid = ref(`step-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
const index = ref(-1)

onMounted(() => {
  // 注册到父组件
  if (stepsContext) {
    stepsContext.addItem({
      uid: uid.value,
      props,
    })
    // 计算当前索引
    index.value = stepsContext?.items.value.findIndex((item: any) => item.uid === uid.value) || 0
  }
})

onBeforeUnmount(() => {
  if (stepsContext) {
    stepsContext.removeItem(uid.value)
  }
})

// 状态计算
const currentStatus = computed(() => {
  // 优先使用父组件传入的全局状态
  if (stepsContext?.props?.status) {
    return stepsContext.props.status
  }

  // 使用自身定义的状态
  if (props.status) {
    return props.status
  }

  // 根据激活步骤计算状态
  const stepIndex = index.value
  const activeIndex = stepsContext?.props?.active || 0

  if (stepIndex < activeIndex) {
    return 'finish'
  }
  else if (stepIndex === activeIndex) {
    return 'process'
  }
  return 'wait'
})

// 是否为当前激活步骤
const isActive = computed(() => {
  return index.value === stepsContext?.props.active
})

// 是否为最后一个步骤
const isLast = computed(() => {
  if (stepsContext?.items) {
    return index.value === stepsContext.items.value.length - 1
  }
  return false
})

// 根据状态计算图标
const _iconType = computed(() => {
  if (props.icon) {
    return props.icon
  }

  // 激活状态且有指定激活图标时，使用指定图标
  if (isActive.value && stepsContext?.props.activeIcon) {
    return stepsContext.props.activeIcon
  }

  // 根据状态显示默认图标
  switch (currentStatus.value) {
    case 'finish':
      return 'check'
    case 'error':
      return 'close'
    case 'success':
      return 'check'
    default:
      return `${index.value + 1}`
  }
})

// 处理点击事件
function handleClick() {
  if (props.disabled || !props.clickable) {
    return
  }
  stepsContext?.emit('click', index.value)
}

// 获取父组件方向
const direction = computed(() => stepsContext?.props?.direction || 'horizontal')

// 样式类计算
const stepClass = computed(() => [
  'ui-step',
  `ui-step-${currentStatus.value}`,
  `ui-step-${direction.value}`,
  {
    'ui-step-active': isActive.value,
    'ui-step-disabled': props.disabled,
    'ui-step-clickable': props.clickable && !props.disabled,
    'ui-step-last': isLast.value,
  },
])

// 图标样式
const iconClass = computed(() => [
  'ui-step-icon',
  `ui-step-icon-${currentStatus.value}`,
])

// 是否为简单模式
const isSimple = computed(() => stepsContext?.props?.simple || false)

// 是否为点状步骤
const _isDot = computed(() => stepsContext?.props?.dot || false)
</script>

<template>
  <div :class="stepClass" @click="handleClick">
    <!-- 普通模式 -->
    <template v-if="!isSimple">
      <!-- 步骤图标 -->
      <div :class="iconClass">
        <slot name="icon">
          <span class="ui-step-icon-inner">
            <i v-if="icon" class="ui-step-custom-icon">
              <ui-icon :icon="icon" />
            </i>
            <template v-else-if="currentStatus === 'finish'">
              <ui-icon icon="carbon:checkmark" />
            </template>
            <template v-else-if="currentStatus === 'error'">
              <ui-icon icon="carbon:close" />
            </template>
            <template v-else>{{ index + 1 }}</template>
          </span>
        </slot>
      </div>

      <!-- 连接线 -->
      <div v-if="!isLast" class="ui-step-tail">
        <i />
      </div>

      <!-- 内容区域 -->
      <div class="ui-step-content">
        <div class="ui-step-title">
          {{ title }}
          <span v-if="subTitle" class="ui-step-subtitle">{{ subTitle }}</span>
        </div>
        <div v-if="description || $slots.description" class="ui-step-description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </div>
    </template>

    <!-- 简洁模式 -->
    <template v-else>
      <div class="ui-step-simple-content">
        <span class="ui-step-title">{{ title }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ui-step {
  position: relative;
  display: inline-flex;
  flex: 1;
  overflow: hidden;
  vertical-align: top;

  &-horizontal {
    &:not(:last-child) {
      margin-right: 1rem;
    }

    .ui-step-tail {
      position: absolute;
      left: 32px;
      top: 16px;
      width: calc(100% - 64px);
      height: 1px;

      i {
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--ui-steps-line-color);
        transition: background-color 0.3s;
      }
    }
  }

  &-vertical {
    display: flex;
    flex-direction: column;
    min-height: 60px;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    .ui-step-tail {
      position: absolute;
      left: 16px;
      top: 32px;
      height: calc(100% - 32px);
      width: 1px;

      i {
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--ui-steps-line-color);
        transition: background-color 0.3s;
      }
    }

    .ui-step-content {
      min-height: 48px;
    }
  }

  &-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--ui-steps-icon-size, 32px);
    height: var(--ui-steps-icon-size, 32px);
    margin-right: 8px;
    border-radius: 50%;
    border: 1px solid var(--ui-steps-line-color);
    background-color: var(--ui-color-bg, #ffffff);
    transition: all 0.3s;

    &-inner {
      font-size: 14px;
      line-height: 1;
      color: var(--ui-steps-line-color);
      transition: color 0.3s;
    }

    &-wait {
      border-color: var(--ui-steps-line-color);

      .ui-step-icon-inner {
        color: var(--ui-steps-line-color);
      }
    }

    &-process {
      border-color: var(--ui-steps-active-color);
      background-color: var(--ui-steps-active-color);

      .ui-step-icon-inner {
        color: #fff;
      }
    }

    &-finish {
      border-color: var(--ui-steps-active-color);

      .ui-step-icon-inner {
        color: var(--ui-steps-active-color);
      }
    }

    &-error {
      border-color: var(--ui-color-danger, #ef4444);

      .ui-step-icon-inner {
        color: var(--ui-color-danger, #ef4444);
      }
    }

    &-success {
      border-color: var(--ui-color-success, #10b981);

      .ui-step-icon-inner {
        color: var(--ui-color-success, #10b981);
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &-title {
    position: relative;
    display: inline-block;
    padding-right: 8px;
    color: var(--ui-steps-title-color);
    font-size: 16px;
    line-height: 32px;
    transition: color 0.3s;
  }

  &-subtitle {
    margin-left: 8px;
    font-weight: normal;
    font-size: 14px;
    opacity: 0.8;
  }

  &-description {
    color: var(--ui-steps-description-color);
    font-size: 14px;
    line-height: 1.5;
    margin-top: 4px;
  }

  &-simple-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  // 状态相关样式
  &-finish {
    .ui-step-tail i {
      background-color: var(--ui-steps-active-color);
    }
  }

  &-active {
    .ui-step-title {
      color: var(--ui-steps-active-color);
      font-weight: 500;
    }
  }

  &-error {
    .ui-step-title {
      color: var(--ui-color-danger, #ef4444);
    }

    .ui-step-description {
      color: var(--ui-color-danger, #ef4444);
    }
  }

  &-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &-clickable {
    cursor: pointer;

    &:hover {
      .ui-step-title {
        color: var(--ui-steps-active-color);
      }
    }
  }
}
</style>
