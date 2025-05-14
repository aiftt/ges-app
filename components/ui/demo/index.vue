<script setup lang="ts" name="UiDemo">
/**
 * 组件演示展示组件
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 * 更新日期: 2024-11-30 - 初始版本
 * 更新日期: 2024-12-08 - 添加代码折叠动画效果
 */

import { computed, ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 主标题
   */
  title: string
  /**
   * 父标题
   */
  parentTitle?: string
  /**
   * 描述内容
   */
  description?: string
  /**
   * 代码内容
   */
  code: string
  /**
   * 代码语言
   */
  language?: string
  /**
   * 主题
   */
  theme?: string
  /**
   * 是否显示代码
   */
  showCode?: boolean
  /**
   * 是否默认展开代码
   */
  defaultExpanded?: boolean
  /**
   * 是否启用边框
   */
  bordered?: boolean
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 代码区域背景颜色
   */
  codeBgColor?: string
  /**
   * 代码区域最大高度
   */
  codeMaxHeight?: string
}>(), {
  language: 'vue',
  theme: 'github-dark',
  showCode: true,
  defaultExpanded: false,
  bordered: true,
  codeMaxHeight: '400px',
})

const logger = useLogger('ui-demo')

// 代码是否展开
const codeExpanded = ref(props.defaultExpanded)

// 切换展开状态
function toggleCode() {
  codeExpanded.value = !codeExpanded.value
  logger.info(`代码展开状态: ${codeExpanded.value ? '展开' : '折叠'}`)
}

// CSS变量计算属性
const bgColorVar = computed(() => props.bgColor || null)
const borderColorVar = computed(() => props.borderColor || null)
const codeBgColorVar = computed(() => props.codeBgColor || null)
</script>

<template>
  <div
    class="ui-demo"
    :class="[
      { 'ui-demo--bordered': bordered },
    ]"
  >
    <!-- 标题和描述部分 -->
    <div class="ui-demo__header">
      <!-- 父标题 -->
      <div v-if="parentTitle" class="ui-demo__parent-title">
        {{ parentTitle }}
      </div>

      <!-- 主标题 -->
      <div class="ui-demo__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <!-- 描述 -->
      <div v-if="description || $slots.description" class="ui-demo__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>

    <!-- 示例展示区域 -->
    <div class="ui-demo__example">
      <slot />
    </div>

    <!-- 代码区域 -->
    <div v-if="showCode && code">
      <div class="ui-demo__code-toggle" @click="toggleCode">
        <span class="ui-demo__code-toggle-text">{{ codeExpanded ? '收起代码' : '查看代码' }}</span>
        <ui-icon
          :icon="codeExpanded ? 'carbon:chevron-up' : 'carbon:chevron-down'"
          :class="`ui-demo__code-toggle-icon ${codeExpanded ? 'ui-demo__code-toggle-icon--rotated' : ''}`"
        />
      </div>
      <transition
        :name="codeExpanded ? 'code-expand' : 'code-collapse'"
        :enter-active-class="codeExpanded ? 'magic-anim-animated magic-anim-slideDownReturn' : 'magic-anim-animated magic-anim-slideUpReturn'"
        :leave-active-class="codeExpanded ? 'magic-anim-animated magic-anim-slideUp' : 'magic-anim-animated magic-anim-slideDown'"
      >
        <div v-show="codeExpanded" class="ui-demo__code px-2">
          <ui-code
            :code="code"
            :lang="language"
            :theme="theme"
            :max-height="codeMaxHeight"
            :bg-color="codeBgColor"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.ui-demo {
  /* 动态变量绑定 */
  --ui-demo-bg-color: v-bind(bgColorVar);
  --ui-demo-border-color: v-bind(borderColorVar);
  --ui-demo-code-bg-color: v-bind(codeBgColorVar);

  margin: 2rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--ui-demo-bg-color, var(--ui-color-bg, #ffffff));
}

.ui-demo--bordered {
  border: 1px solid var(--ui-demo-border-color, var(--ui-border-color, #e5e7eb));
}

.ui-demo__header {
  padding: 1.5rem 1.5rem 0;
}

.ui-demo__parent-title {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-demo__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--ui-color-text, #1f2937);
}

.ui-demo__description {
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-demo__example {
  padding: 1.5rem;
  position: relative;
}

.ui-demo__code-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  cursor: pointer;
  border-top: 1px solid var(--ui-demo-border-color, var(--ui-border-color, #e5e7eb));
  font-size: 0.875rem;
  color: var(--ui-color-primary, #4f46e5);
  transition: background-color 0.2s;
}

.ui-demo__code-toggle:hover {
  background-color: var(--ui-color-bg-hover, #f9fafb);
}

.ui-demo__code-toggle-text {
  margin-right: 0.5rem;
}

.ui-demo__code-toggle-icon {
  font-size: 1rem;
  transition: transform 0.2s;
}

.ui-demo__code-toggle-icon--rotated {
  transform: rotate(180deg);
}

.ui-demo__code {
  background-color: var(--ui-demo-code-bg-color, var(--ui-color-bg, #ffffff));
  overflow: hidden;
}

/* 深色模式适配 */
:root.dark .ui-demo {
  background-color: var(--ui-demo-bg-color, var(--ui-color-bg-dark, #1f2937));
}

:root.dark .ui-demo--bordered {
  border-color: var(--ui-demo-border-color, var(--ui-border-color-dark, #374151));
}

:root.dark .ui-demo__title {
  color: var(--ui-color-text-dark, #f9fafb);
}

:root.dark .ui-demo__parent-title,
:root.dark .ui-demo__description {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

:root.dark .ui-demo__code-toggle {
  border-color: var(--ui-demo-border-color, var(--ui-border-color-dark, #374151));
}

:root.dark .ui-demo__code-toggle:hover {
  background-color: var(--ui-color-bg-hover-dark, #111827);
}
</style>
