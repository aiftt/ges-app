<script setup lang="ts" name="DemoComment">
/**
 * 评论组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
 */

// 简单评论示例数据
const singleCommentData = {
  author: '张三',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  content: '这是一条单独的评论，没有嵌套回复。',
  datetime: '2024-07-29 10:30',
  actions: [
    { label: '点赞', onClick: () => console.warn('点赞成功!') },
    { label: '回复', onClick: () => console.warn('点击了回复按钮!') },
  ],
}

// 嵌套评论示例数据
const nestedCommentData = {
  author: '李四',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  content: '这是一条有嵌套回复的评论。',
  datetime: '2024-07-29 09:15',
  children: [
    {
      author: '王五',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      content: '这是对李四评论的回复。',
      datetime: '2024-07-29 09:20',
    },
    {
      author: '赵六',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      content: '我也来回复一下李四。',
      datetime: '2024-07-29 09:25',
      children: [
        {
          author: '李四',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          content: '谢谢你的回复，赵六。',
          datetime: '2024-07-29 09:30',
        },
      ],
    },
  ],
}

// 评论列表示例数据
const commentListData = ref([
  {
    id: 1,
    author: '用户A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: '评论列表示例中的第一条评论。',
    datetime: '2024-07-29 08:00',
    children: [],
  },
  {
    id: 2,
    author: '用户B',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    content: '评论列表示例中的第二条评论。',
    datetime: '2024-07-29 09:30',
    children: [
      {
        id: 3,
        author: '用户C',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        content: '对第二条评论的回复。',
        datetime: '2024-07-29 10:15',
      },
    ],
  },
  {
    id: 4,
    author: '用户D',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    content: '评论列表示例中的第三条评论。',
    datetime: '2024-07-29 11:45',
    children: [],
  },
])

// 当前页码
const currentPage = ref(1)

// 处理分页变化
function handlePageChange(page: number) {
  currentPage.value = page
  // 在实际应用中可以在这里加载对应页的数据
}

// 处理回复
function handleReply(comment: any, content: string) {
  // 在实际应用中，这里会调用API提交回复
  console.warn('回复评论:', comment.id, '内容:', content)

  // 模拟添加回复
  const newReply = {
    id: Date.now(),
    author: '当前用户',
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    content,
    datetime: new Date().toLocaleString(),
  }

  // 查找并添加到对应评论的子评论中
  const targetComment = commentListData.value.find(item => item.id === comment.id)
  if (targetComment) {
    if (!targetComment.children) {
      targetComment.children = []
    }
    targetComment.children.push(newReply)
  }
}

// 编辑器内容
const editorContent = ref('')

// 提交新评论
function handleSubmitComment(content: string) {
  // 在实际应用中，这里会调用API提交评论
  console.warn('提交新评论:', content)

  // 模拟添加新评论
  const newComment = {
    id: Date.now(),
    author: '当前用户',
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    content,
    datetime: new Date().toLocaleString(),
    children: [],
  }

  commentListData.value.unshift(newComment)
}
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      评论组件 (Comment)
    </h1>

    <div class="space-y-10">
      <!-- 基础示例 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础评论
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-comment v-bind="singleCommentData" />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-comment
  author="张三"
  avatar="https://randomuser.me/api/portraits/men/32.jpg"
  content="这是一条单独的评论，没有嵌套回复。"
  datetime="2024-07-29 10:30"
  :actions="[
    { label: '点赞', onClick: () => console.warn('点赞成功!') },
    { label: '回复', onClick: () => console.warn('点击了回复按钮!') }
  ]"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 嵌套评论示例 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          嵌套评论
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-comment v-bind="nestedCommentData" />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-comment
  author="李四"
  avatar="https://randomuser.me/api/portraits/women/44.jpg"
  content="这是一条有嵌套回复的评论。"
  datetime="2024-07-29 09:15"
  :children="[
    {
      author: '王五',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      content: '这是对李四评论的回复。',
      datetime: '2024-07-29 09:20'
    },
    {
      author: '赵六',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      content: '我也来回复一下李四。',
      datetime: '2024-07-29 09:25',
      children: [/* 更多嵌套 */]
    }
  ]"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 评论编辑器 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          评论编辑器
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-comment-editor
            v-model:value="editorContent"
            submit-text="发表评论"
            show-cancel
            @submit="handleSubmitComment"
            @cancel="editorContent = ''"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-comment-editor
  v-model:value="editorContent"
  submit-text="发表评论"
  show-cancel
  @submit="handleSubmitComment"
  @cancel="editorContent = ''"
/>` }}</code></pre>
        </div>
      </section>

      <!-- 评论列表 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          评论列表
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-comment-editor
            placeholder="写下你的评论..."
            submit-text="发表"
            @submit="handleSubmitComment"
          />

          <div class="mt-6">
            <ui-comment-list
              :comments="commentListData"
              :current-page="currentPage"
              :total="commentListData.length"
              :page-size="10"
              pagination
              @change="handlePageChange"
              @reply="handleReply"
            />
          </div>
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<!-- 评论编辑器 -->
<ui-comment-editor
  placeholder="写下你的评论..."
  submit-text="发表"
  @submit="handleSubmitComment"
/>

<!-- 评论列表 -->
<ui-comment-list
  :comments="commentListData"
  :current-page="currentPage"
  :total="commentListData.length"
  :page-size="10"
  pagination
  @change="handlePageChange"
  @reply="handleReply"
/>` }}</code></pre>
        </div>
      </section>

      <!-- API文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          UiComment Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                author
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                评论作者
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                avatar
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                作者头像URL
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                content
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                评论内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                datetime
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                评论时间
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                actions
              </td>
              <td class="border-b px-4 py-2">
                Array
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                操作按钮列表，每项包含label和onClick属性
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                children
              </td>
              <td class="border-b px-4 py-2">
                Array
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                嵌套的子评论
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                showReply
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否默认显示回复框
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          UiCommentList Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                comments
              </td>
              <td class="border-b px-4 py-2">
                Array
              </td>
              <td class="border-b px-4 py-2">
                []
              </td>
              <td class="border-b px-4 py-2">
                评论数据列表
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                pagination
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示分页
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                currentPage
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                1
              </td>
              <td class="border-b px-4 py-2">
                当前页码
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                total
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                0
              </td>
              <td class="border-b px-4 py-2">
                总条数
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                pageSize
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                10
              </td>
              <td class="border-b px-4 py-2">
                每页条数
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                loading
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否加载中
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                emptyText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                '暂无评论'
              </td>
              <td class="border-b px-4 py-2">
                空状态文本
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          UiCommentEditor Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                value
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                ''
              </td>
              <td class="border-b px-4 py-2">
                输入内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                placeholder
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                '写下你的评论...'
              </td>
              <td class="border-b px-4 py-2">
                占位文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                submitText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                '发布'
              </td>
              <td class="border-b px-4 py-2">
                提交按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                cancelText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                '取消'
              </td>
              <td class="border-b px-4 py-2">
                取消按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                showCancel
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示取消按钮
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                avatar
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                评论者头像
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                author
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                undefined
              </td>
              <td class="border-b px-4 py-2">
                评论者名称
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                minRows
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                3
              </td>
              <td class="border-b px-4 py-2">
                最小行数
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                maxRows
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                6
              </td>
              <td class="border-b px-4 py-2">
                最大行数
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                disabled
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否禁用
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 32px;
}

.demo-card {
  padding: 24px;
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 8px;
  background-color: white;
}

:root.dark .demo-card {
  background-color: var(--ui-color-bg-dark, #1f2937);
  border-color: var(--ui-border-color-dark, #374151);
}
</style>
