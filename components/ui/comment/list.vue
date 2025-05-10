<script setup lang="ts" name="UiCommentList">
/**
 * 评论列表组件
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-07-29
 */

const props = withDefaults(defineProps<{
  /**
   * 评论数据列表
   */
  comments?: any[]
  /**
   * 是否显示分页
   */
  pagination?: boolean
  /**
   * 当前页码
   */
  currentPage?: number
  /**
   * 总条数
   */
  total?: number
  /**
   * 每页条数
   */
  pageSize?: number
  /**
   * 是否加载中
   */
  loading?: boolean
  /**
   * 空状态文本
   */
  emptyText?: string
}>(), {
  comments: () => [],
  pagination: false,
  currentPage: 1,
  total: 0,
  pageSize: 10,
  loading: false,
  emptyText: '暂无评论',
})

// 事件
const emit = defineEmits<{
  (e: 'change', page: number): void
  (e: 'reply', comment: any, content: string): void
}>()

// 处理分页变化
function handlePageChange(page: number) {
  emit('change', page)
}

// 处理评论回复
function handleReply(comment: any, content: string) {
  emit('reply', comment, content)
}
</script>

<template>
  <div class="ui-comment-list">
    <!-- 评论列表 -->
    <div v-if="!props.loading && props.comments.length > 0" class="ui-comment-list-content">
      <ui-comment
        v-for="(comment, index) in props.comments"
        :key="index"
        v-bind="comment"
        @reply="content => handleReply(comment, content)"
      />
    </div>

    <!-- 加载中状态 -->
    <div v-else-if="props.loading" class="ui-comment-list-loading flex justify-center py-8">
      <div class="max-w-lg w-full flex animate-pulse space-x-4">
        <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div class="flex-1 space-y-3">
          <div class="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div class="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="ui-comment-list-empty py-8 text-center text-gray-500 dark:text-gray-400">
      <ui-empty :description="props.emptyText" />
    </div>

    <!-- 分页 -->
    <div v-if="props.pagination && props.total > props.pageSize" class="ui-comment-list-pagination mt-6">
      <ui-pagination
        :current="props.currentPage"
        :total="props.total"
        :page-size="props.pageSize"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.ui-comment-list {
  width: 100%;
}
</style>
