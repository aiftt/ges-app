<script setup lang="ts" name="UiComment">
/**
 * Comment 评论组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-07-29
 */

// 定义组件属性
const props = withDefaults(defineProps<{
  /**
   * 评论作者
   */
  author?: string
  /**
   * 作者头像
   */
  avatar?: string
  /**
   * 评论内容
   */
  content?: string
  /**
   * 评论时间
   */
  datetime?: string
  /**
   * 嵌套评论
   */
  children?: any[]
  /**
   * 评论操作按钮，如回复、点赞等
   */
  actions?: any[]
  /**
   * 是否显示回复框
   */
  showReply?: boolean
}>(), {
  children: () => [],
  actions: () => [],
  showReply: false,
})

// 提交回复
const emit = defineEmits<{
  (e: 'reply', content: string): void
}>()

// 回复状态
const showReplyBox = ref(props.showReply)

// 处理回复按钮点击
function handleReplyClick() {
  showReplyBox.value = !showReplyBox.value
}

function handleSubmitReply(content: string) {
  emit('reply', content)
  showReplyBox.value = false
}
</script>

<template>
  <div class="ui-comment">
    <!-- 评论头部 -->
    <div class="ui-comment-header flex items-start">
      <!-- 头像 -->
      <div v-if="avatar" class="ui-comment-avatar mr-3">
        <ui-avatar :src="avatar" :alt="author" size="default" />
      </div>
      <div class="flex-1">
        <!-- 作者 -->
        <div class="ui-comment-author text-sm text-gray-900 font-medium dark:text-gray-100">
          {{ author }}
        </div>
        <!-- 时间 -->
        <div v-if="datetime" class="ui-comment-time mt-1 text-xs text-gray-500 dark:text-gray-400">
          {{ datetime }}
        </div>
      </div>
    </div>

    <!-- 评论内容 -->
    <div class="ui-comment-content mt-2 text-sm text-gray-700 dark:text-gray-300">
      <slot name="content">
        {{ content }}
      </slot>
    </div>

    <!-- 评论操作 -->
    <div v-if="actions && actions.length" class="ui-comment-actions mt-2 flex items-center space-x-4">
      <slot name="actions">
        <button
          v-for="(action, index) in actions"
          :key="index"
          class="ui-comment-action text-xs text-gray-500 transition-colors hover:text-primary"
          @click="action.onClick ? action.onClick() : null"
        >
          {{ action.label }}
        </button>
        <button
          v-if="!actions.some(action => action.label === '回复')"
          class="ui-comment-action text-xs text-gray-500 transition-colors hover:text-primary"
          @click="handleReplyClick"
        >
          回复
        </button>
      </slot>
    </div>
    <div v-else class="ui-comment-actions mt-2">
      <button
        class="ui-comment-action text-xs text-gray-500 transition-colors hover:text-primary"
        @click="handleReplyClick"
      >
        回复
      </button>
    </div>

    <!-- 回复框 -->
    <div v-if="showReplyBox" class="ui-comment-reply-box mt-3">
      <ui-comment-editor
        placeholder="写下你的回复..."
        submit-text="回复"
        @submit="handleSubmitReply"
      />
    </div>

    <!-- 嵌套评论 -->
    <div v-if="children && children.length" class="ui-comment-children mt-4 border-l border-gray-200 pl-6 dark:border-gray-700">
      <slot name="children">
        <ui-comment
          v-for="(child, index) in children"
          :key="index"
          v-bind="child"
          @reply="content => emit('reply', content)"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ui-comment {
  --ui-comment-spacing: 1rem;
  margin-bottom: var(--ui-comment-spacing);
}

.ui-comment:last-child {
  margin-bottom: 0;
}
</style>
