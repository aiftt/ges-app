<script setup lang="ts" name="UiCommentEditor">
/**
 * 评论编辑器组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-07-29
 */

const props = withDefaults(defineProps<{
  /**
   * 初始内容
   */
  value?: string
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 提交按钮文本
   */
  submitText?: string
  /**
   * 取消按钮文本
   */
  cancelText?: string
  /**
   * 是否显示取消按钮
   */
  showCancel?: boolean
  /**
   * 头像URL
   */
  avatar?: string
  /**
   * 评论者名称
   */
  author?: string
  /**
   * 最小高度（行数）
   */
  minRows?: number
  /**
   * 最大高度（行数）
   */
  maxRows?: number
  /**
   * 禁用状态
   */
  disabled?: boolean
}>(), {
  value: '',
  placeholder: '写下你的评论...',
  submitText: '发布',
  cancelText: '取消',
  showCancel: false,
  minRows: 3,
  maxRows: 6,
  disabled: false,
})

// 事件
const emit = defineEmits<{
  (e: 'submit', content: string): void
  (e: 'cancel'): void
  (e: 'update:value', content: string): void
}>()

// 双向绑定内容
const content = ref(props.value)

// 监听value变化
watch(() => props.value, (newValue) => {
  content.value = newValue
})

// 处理内容变化
function handleInput(value: string) {
  content.value = value
  emit('update:value', content.value)
}

// 提交评论
function handleSubmit() {
  if (!content.value.trim())
    return

  emit('submit', content.value)
  content.value = ''
}

// 取消评论
function handleCancel() {
  emit('cancel')
  content.value = ''
}
</script>

<template>
  <div class="ui-comment-editor">
    <!-- 头部信息 -->
    <div v-if="avatar || author" class="ui-comment-editor-header mb-2 flex items-center">
      <ui-avatar v-if="avatar" :src="avatar" :alt="author" size="small" class="mr-2" />
      <span v-if="author" class="text-sm text-gray-900 font-medium dark:text-gray-100">{{ author }}</span>
    </div>

    <!-- 输入区域 -->
    <div class="ui-comment-editor-content">
      <ui-textarea
        v-model="content"
        :placeholder="placeholder"
        :min-rows="minRows"
        :max-rows="maxRows"
        :disabled="disabled"
        class="w-full resize-none"
        @input="handleInput"
      />
    </div>

    <!-- 操作区域 -->
    <div class="ui-comment-editor-actions mt-3 flex justify-end">
      <ui-button
        v-if="showCancel"
        type="default"
        size="small"
        class="mr-2"
        @click="handleCancel"
      >
        {{ cancelText }}
      </ui-button>

      <ui-button
        type="primary"
        size="small"
        :disabled="!content.trim() || disabled"
        @click="handleSubmit"
      >
        {{ submitText }}
      </ui-button>
    </div>
  </div>
</template>

<style scoped>
.ui-comment-editor {
  --ui-comment-editor-border-color: #e5e7eb;
  --ui-comment-editor-bg-color: #ffffff;
  border-radius: 0.375rem;
  background-color: var(--ui-comment-editor-bg-color);
}

:root.dark .ui-comment-editor {
  --ui-comment-editor-border-color: #374151;
  --ui-comment-editor-bg-color: #1f2937;
}
</style>
