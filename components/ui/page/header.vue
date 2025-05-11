<script setup lang="ts" name="UiPageHeader">
/**
 * 页头组件
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 */

// Props定义
const props = withDefaults(defineProps<{
  /**
   * 标题
   */
  title?: string
  /**
   * 副标题
   */
  subtitle?: string
  /**
   * 返回按钮文本
   */
  backText?: string
  /**
   * 是否显示返回按钮
   */
  showBack?: boolean
  /**
   * 自定义返回图标
   */
  backIcon?: string
  /**
   * 额外的内容，显示在标题右侧
   */
  extra?: string | string[]
  /**
   * 面包屑的配置，每个面包屑项应包含 title 和可选的 to
   */
  breadcrumb?: Array<{
    title: string
    to?: string
    icon?: string
  }>
  /**
   * 底部操作区域内容
   */
  footer?: string
  /**
   * 底部操作区域对齐方式
   */
  footerAlign?: 'left' | 'center' | 'right'
  /**
   * 是否显示分割线
   */
  divider?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 自定义样式
   */
  style?: string | object
  /**
   * 背景色
   */
  backgroundColor?: string
  /**
   * 标题颜色
   */
  titleColor?: string
}>(), {
  showBack: true,
  backIcon: 'carbon:arrow-left',
  backText: '返回',
  divider: true,
  footerAlign: 'left',
})

// 事件定义
const emit = defineEmits<{
  /**
   * 点击返回按钮时触发
   */
  (e: 'back'): void
}>()

// 处理返回操作
function handleBack() {
  emit('back')
}

// CSS变量绑定
const backgroundColorVar = computed(() => props.backgroundColor || null)
const titleColorVar = computed(() => props.titleColor || null)

// 样式计算
const containerClass = computed(() => [
  'ui-page-header',
  props.className,
])

// 页脚对齐样式
const footerClass = computed(() => [
  'ui-page-header-footer',
  `ui-page-header-footer-${props.footerAlign}`,
])

// 路由实例，用于面包屑导航
const router = useRouter()

// 处理面包屑项点击
function handleBreadcrumbClick(item: any) {
  if (item.to) {
    router.push(item.to)
  }
}
</script>

<template>
  <div
    :class="containerClass"
    :style="`--ui-page-header-bg-color: ${backgroundColorVar || ''}; --ui-page-header-title-color: ${titleColorVar || ''}`"
  >
    <!-- 面包屑导航区域 -->
    <div v-if="breadcrumb && breadcrumb.length > 0" class="ui-page-header-breadcrumb">
      <ui-breadcrumb>
        <ui-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
          :to="item.to"
          @click="handleBreadcrumbClick(item)"
        >
          <ui-icon v-if="item.icon" :icon="item.icon" class="mr-1" />
          {{ item.title }}
        </ui-breadcrumb-item>
      </ui-breadcrumb>
    </div>

    <div class="ui-page-header-content">
      <!-- 返回按钮 -->
      <div v-if="showBack" class="ui-page-header-back" @click="handleBack">
        <ui-icon :icon="backIcon" class="ui-page-header-back-icon" />
        <span v-if="backText" class="ui-page-header-back-text">{{ backText }}</span>
      </div>

      <!-- 标题区域 -->
      <div class="ui-page-header-title-wrapper">
        <h1 v-if="title" class="ui-page-header-title">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>
        <div v-if="subtitle" class="ui-page-header-subtitle">
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </div>
        <div class="ui-page-header-title-content">
          <slot name="title-content" />
        </div>
      </div>

      <!-- 额外内容区域 -->
      <div v-if="$slots.extra || extra" class="ui-page-header-extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>

    <!-- 分割线 -->
    <ui-divider v-if="divider" class="ui-page-header-divider" />

    <!-- 主体内容 -->
    <div class="ui-page-header-body">
      <slot />
    </div>

    <!-- 页脚操作区域 -->
    <div v-if="$slots.footer || footer" :class="footerClass">
      <slot name="footer">
        {{ footer }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-page-header {
  --ui-page-header-bg-color: var(--ui-color-bg-light, #f9fafb);
  --ui-page-header-title-color: var(--ui-color-text, #374151);

  position: relative;
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--ui-page-header-bg-color);
  border-radius: 4px;

  &-breadcrumb {
    margin-bottom: 16px;
  }

  &-content {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &-back {
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
    color: var(--ui-color-text-secondary, #6b7280);
    transition: color 0.2s;

    &:hover {
      color: var(--ui-color-primary, #3b82f6);
    }

    &-icon {
      font-size: 16px;
    }

    &-text {
      margin-left: 4px;
      font-size: 14px;
    }
  }

  &-title-wrapper {
    flex: 1;
    min-width: 0;
  }

  &-title {
    margin: 0;
    color: var(--ui-page-header-title-color);
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }

  &-subtitle {
    margin-top: 4px;
    color: var(--ui-color-text-secondary, #6b7280);
    font-size: 14px;
    line-height: 22px;
  }

  &-title-content {
    margin-top: 8px;
  }

  &-extra {
    margin-left: 16px;
    display: flex;
    gap: 8px;
  }

  &-divider {
    margin: 16px 0;
  }

  &-body {
    margin: 16px 0;
  }

  &-footer {
    margin-top: 16px;
    display: flex;

    &-left {
      justify-content: flex-start;
    }

    &-center {
      justify-content: center;
    }

    &-right {
      justify-content: flex-end;
    }
  }
}
</style>
