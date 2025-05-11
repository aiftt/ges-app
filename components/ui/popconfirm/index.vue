<script setup lang="tsx" name="UiPopconfirm">
import type { PopconfirmIconType, Trigger } from '~/types/interaction'
/**
 * 气泡确认框组件
 * 创建日期: 2025-05-03
 * 作者: aiftt
 * 更新日期: 2025-05-10 - 规范化CSS变量，移除内联样式
 * 更新日期: 2024-09-11 - 使用集中管理的类型定义
 * 更新日期: 2024-09-15 - 使用更多集中管理的类型定义
 * 点击元素弹出的气泡确认框，常用于需要用户确认的操作
 */
import type { Placement, TagType } from '~/types/ui'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 确认标题
   */
  title?: string
  /**
   * 确认内容文本
   */
  content?: string
  /**
   * 确认按钮文本
   */
  okText?: string
  /**
   * 取消按钮文本
   */
  cancelText?: string
  /**
   * 确认按钮类型
   */
  okType?: TagType
  /**
   * 取消按钮类型
   */
  cancelType?: TagType
  /**
   * 确认按钮加载状态
   */
  okLoading?: boolean
  /**
   * 触发方式
   */
  trigger?: Trigger
  /**
   * 弹出内容位置
   */
  placement?: Placement
  /**
   * 是否显示图标
   */
  icon?: boolean
  /**
   * 图标类型
   */
  iconType?: PopconfirmIconType
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 偏移量(像素)
   */
  offset?: number
  /**
   * 是否可见(用于manual模式)
   */
  visible?: boolean
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 弹出层的z-index
   */
  zIndex?: number
}>(), {
  title: '确认操作',
  content: '是否确认执行此操作？',
  okText: '确认',
  cancelText: '取消',
  okType: 'primary',
  cancelType: 'default',
  okLoading: false,
  trigger: 'click',
  placement: 'top',
  icon: true,
  iconType: 'question',
  disabled: false,
  offset: 8,
  visible: false,
  width: 'auto',
  zIndex: 1000,
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// 控制显示状态
const confirmVisible = ref(props.visible)

// 监听状态变化
function handleVisibleChange(visible: boolean) {
  confirmVisible.value = visible
  emit('update:visible', visible)
}

// 确认操作
function handleConfirm() {
  emit('confirm')
  if (!props.okLoading) {
    confirmVisible.value = false
    emit('update:visible', false)
  }
}

// 取消操作
function handleCancel() {
  emit('cancel')
  confirmVisible.value = false
  emit('update:visible', false)
}

// 触发器组件引用
const triggerRef = ref()

// CSS变量计算
const widthVar = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

// 渲染图标
function getIconName(): string {
  if (!props.icon)
    return 'carbon:help'

  switch (props.iconType) {
    case 'warning':
      return 'carbon:warning'
    case 'info':
      return 'carbon:information'
    case 'success':
      return 'carbon:checkmark-outline'
    case 'error':
      return 'carbon:error'
    case 'question':
    default:
      return 'carbon:help'
  }
}

// 获取图标颜色类名
function getIconColorClass(): string {
  return `ui-popconfirm-icon-${props.iconType}`
}

// 暴露方法给父组件
defineExpose({
  show: () => triggerRef.value?.show(),
  hide: () => triggerRef.value?.hide(),
  toggle: () => triggerRef.value?.toggle(),
})
</script>

<template>
  <UiTrigger
    ref="triggerRef"
    :trigger="trigger"
    :placement="placement"
    :disabled="disabled"
    :offset="offset"
    :visible="confirmVisible"
    theme="light"
    :z-index="zIndex"
    @update:visible="handleVisibleChange"
  >
    <!-- 默认插槽作为触发元素 -->
    <slot />

    <!-- 内容插槽 -->
    <template #content>
      <div class="ui-popconfirm">
        <div class="ui-popconfirm-title">
          <span v-if="icon" class="ui-popconfirm-icon-wrapper">
            <ui-icon :icon="getIconName()" :class="getIconColorClass()" size="16px" />
          </span>
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div v-if="content || $slots.content" class="ui-popconfirm-content">
          <slot name="content">
            {{ content }}
          </slot>
        </div>

        <div class="ui-popconfirm-buttons">
          <ui-button
            :type="cancelType"
            size="small"
            @click="handleCancel"
          >
            <slot name="cancel">
              {{ cancelText }}
            </slot>
          </ui-button>

          <ui-button
            :type="okType"
            size="small"
            :loading="okLoading"
            @click="handleConfirm"
          >
            <slot name="confirm">
              {{ okText }}
            </slot>
          </ui-button>
        </div>
      </div>
    </template>
  </UiTrigger>
</template>

<style scoped>
.ui-popconfirm {
  --ui-popconfirm-width: v-bind(widthVar);

  min-width: 180px;
  max-width: 350px;
  font-size: 14px;
  line-height: 1.5;
  width: var(--ui-popconfirm-width, auto);
}

.ui-popconfirm-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--ui-popconfirm-title-color, rgba(0, 0, 0, 0.85));
}

.ui-popconfirm-icon-wrapper {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.ui-popconfirm-icon {
  vertical-align: middle;
}

.ui-popconfirm-icon-warning {
  color: var(--ui-color-warning, #faad14);
}

.ui-popconfirm-icon-info {
  color: var(--ui-color-info, #1890ff);
}

.ui-popconfirm-icon-success {
  color: var(--ui-color-success, #52c41a);
}

.ui-popconfirm-icon-error {
  color: var(--ui-color-danger, #f5222d);
}

.ui-popconfirm-icon-question {
  color: var(--ui-color-warning, #faad14);
}

.ui-popconfirm-content {
  margin-bottom: 12px;
  color: var(--ui-popconfirm-content-color, rgba(0, 0, 0, 0.65));
}

.ui-popconfirm-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
</style>
