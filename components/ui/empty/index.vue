<script setup lang="ts" name="UiEmpty">
/**
 * 空状态组件
 * 创建日期: 2024-07-23
 * 作者: aiftt
 * 更新日期: 2024-07-23 - 初始实现
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 描述文字
   */
  description?: string
  /**
   * 自定义图标
   */
  icon?: string
  /**
   * 图标大小
   */
  iconSize?: string | number
  /**
   * 图标颜色
   */
  iconColor?: string
  /**
   * 图像尺寸
   */
  imageSize?: string | number
  /**
   * 自定义图片地址
   */
  image?: string
}>(), {
  description: '暂无数据',
  iconSize: '48px',
  imageSize: '100px',
})

// 图标尺寸样式
const iconSizeStyle = computed(() => {
  if (typeof props.iconSize === 'number') {
    return `${props.iconSize}px`
  }
  return props.iconSize
})

// 图像尺寸样式
const imageSizeStyle = computed(() => {
  if (typeof props.imageSize === 'number') {
    return `${props.imageSize}px`
  }
  return props.imageSize
})
</script>

<template>
  <div class="ui-empty">
    <!-- 自定义图片 -->
    <div v-if="image" class="ui-empty-image">
      <img :src="image" :style="{ width: imageSizeStyle, height: 'auto' }" alt="empty">
    </div>
    <!-- 默认图标 -->
    <div v-else-if="icon" class="ui-empty-icon">
      <ui-icon :icon="icon" :size="iconSizeStyle" :color="iconColor" />
    </div>
    <!-- 默认空状态图标 -->
    <div v-else class="ui-empty-icon">
      <ui-icon icon="carbon:document-blank" :size="iconSizeStyle" :color="iconColor || 'var(--ui-color-text-quaternary, #9ca3af)'" />
    </div>

    <!-- 描述文字 -->
    <div v-if="description" class="ui-empty-description">
      {{ description }}
    </div>

    <!-- 额外内容插槽 -->
    <div v-if="$slots.default" class="ui-empty-footer">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ui-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
}

.ui-empty-icon {
  margin-bottom: 1rem;
  color: var(--ui-color-text-quaternary, #9ca3af);
}

.ui-empty-image {
  margin-bottom: 1rem;
}

.ui-empty-description {
  margin-bottom: 1rem;
  color: var(--ui-color-text-secondary, #6b7280);
  font-size: 0.875rem;
}

.ui-empty-footer {
  margin-top: 1rem;
}
</style>
