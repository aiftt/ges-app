<script setup lang="ts" name="UiPopover">
/**
 * 气泡卡片组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-02 - 初始版本
 * 更新日期: 2024-05-10 - 使用CSS变量替代内联样式
 */
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 标题
   */
  title?: string
  /**
   * 内容
   */
  content?: string
  /**
   * 触发方式：hover|click|manual
   */
  trigger?: 'hover' | 'click' | 'manual'
  /**
   * 弹出位置
   */
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'
  /**
   * 显示延迟(毫秒)
   */
  showDelay?: number
  /**
   * 隐藏延迟(毫秒)
   */
  hideDelay?: number
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
   * 是否使用arrow箭头
   */
  arrow?: boolean
  /**
   * 是否在点击外部时自动关闭
   */
  clickOutsideToClose?: boolean
  /**
   * 主题
   */
  theme?: 'light' | 'dark'
  /**
   * 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 弹出层的z-index
   */
  zIndex?: number
}>(), {
  title: '',
  content: '',
  trigger: 'click',
  placement: 'bottom',
  showDelay: 100,
  hideDelay: 100,
  disabled: false,
  offset: 8,
  visible: false,
  arrow: true,
  clickOutsideToClose: true,
  theme: 'light',
  showClose: false,
  width: 'auto',
  zIndex: 1000,
})

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}>()

// 控制显示状态
const popoverVisible = ref(props.visible)

// 监听popoverVisible的变化，向外部发送事件
function handleVisibleChange(visible: boolean) {
  popoverVisible.value = visible
  emit('update:visible', visible)
}

// 关闭气泡卡片
function closePopover() {
  popoverVisible.value = false
  emit('update:visible', false)
}

// 触发器组件引用
const triggerRef = ref()

// 计算CSS变量
const widthVar = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)

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
    :show-delay="showDelay"
    :hide-delay="hideDelay"
    :disabled="disabled"
    :offset="offset"
    :visible="popoverVisible"
    :arrow="arrow"
    :click-outside-to-close="clickOutsideToClose"
    :theme="theme"
    :z-index="zIndex"
    @update:visible="handleVisibleChange"
    @show="$emit('show')"
    @hide="$emit('hide')"
  >
    <!-- 默认插槽作为触发元素 -->
    <slot />

    <!-- 内容插槽 -->
    <template #content>
      <div class="ui-popover">
        <!-- 标题 -->
        <div v-if="title || $slots.title" class="ui-popover-title">
          <slot name="title">
            {{ title }}
          </slot>
          <button v-if="showClose" class="ui-popover-close" @click="closePopover">
            <svg class="ui-popover-close-icon" viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>

        <!-- 内容 -->
        <div class="ui-popover-content">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </div>
    </template>
  </UiTrigger>
</template>

<style scoped>
.ui-popover {
  --ui-popover-width: v-bind(widthVar);

  min-width: var(--ui-popconfirm-min-width, 180px);
  max-width: var(--ui-popconfirm-max-width, 350px);
  width: var(--ui-popover-width, auto);
  font-size: 14px;
  line-height: 1.5;
}

.ui-popover-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--ui-popover-border-color, #e5e7eb);
  color: var(--ui-popconfirm-title-color, rgba(0, 0, 0, 0.85));
  font-weight: 500;
}

.ui-popover-content {
  color: var(--ui-popconfirm-content-color, rgba(0, 0, 0, 0.65));
}

.ui-popover-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  color: var(--ui-popover-close-color, rgba(0, 0, 0, 0.45));
  transition: color 0.2s;
  margin-left: 8px;
}

.ui-popover-close:hover {
  color: var(--ui-popover-close-hover-color, rgba(0, 0, 0, 0.85));
}

.ui-popover-close-icon {
  pointer-events: none;
}

/* 深色模式适配 */
:root.dark {
  --ui-popover-border-color: #374151;
  --ui-popconfirm-title-color: #f9fafb;
  --ui-popconfirm-content-color: #e5e7eb;
  --ui-popover-close-color: #9ca3af;
  --ui-popover-close-hover-color: #f9fafb;
}
</style>
