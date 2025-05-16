<script setup lang="ts" name="DemoComment">
/**
 * 评论组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
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

// 示例代码字符串
const basicCode = `<ui-comment
  author="张三"
  avatar="https://randomuser.me/api/portraits/men/32.jpg"
  content="这是一条单独的评论，没有嵌套回复。"
  datetime="2024-07-29 10:30"
  :actions="[
    { label: '点赞', onClick: () => console.warn('点赞成功!') },
    { label: '回复', onClick: () => console.warn('点击了回复按钮!') }
  ]"
/>`

const nestedCode = `<ui-comment
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
/>`

const editorCode = `<script setup>
import { ref } from 'vue'

const editorContent = ref('')

function handleSubmitComment(content) {
  console.log('提交评论:', content)
  // 处理评论提交逻辑
}
<\/script>

<template>
  <ui-comment-editor
    v-model:value="editorContent"
    submit-text="发表评论"
    show-cancel
    @submit="handleSubmitComment"
    @cancel="editorContent = ''"
  />
</template>`

const commentListCode = `<script setup>
import { ref } from 'vue'

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
  }
])

// 当前页码
const currentPage = ref(1)

// 处理分页变化
function handlePageChange(page) {
  currentPage.value = page
  // 在实际应用中可以在这里加载对应页的数据
}

// 处理回复
function handleReply(comment, content) {
  console.log('回复评论:', comment.id, '内容:', content)
  // 处理回复逻辑
}

// 提交新评论
function handleSubmitComment(content) {
  console.log('提交新评论:', content)
  // 处理评论提交逻辑
}
<\/script>

<template>
  <!-- 评论编辑器 -->
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
  />
</template>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      Comment 评论
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      评论组件用于展示评论内容、处理回复和发表新评论，适用于文章、帖子、产品等需要用户讨论的场景。
    </p>

    <!-- 基础评论 -->
    <ui-demo
      title="基础评论"
      description="基础评论组件，展示作者、头像、内容、时间和操作按钮。"
      :code="basicCode"
    >
      <ui-comment v-bind="singleCommentData" />
    </ui-demo>

    <!-- 嵌套评论 -->
    <ui-demo
      title="嵌套评论"
      description="通过children属性设置嵌套评论，支持多层级嵌套结构。"
      :code="nestedCode"
    >
      <ui-comment v-bind="nestedCommentData" />
    </ui-demo>

    <!-- 评论编辑器 -->
    <ui-demo
      title="评论编辑器"
      description="用于输入和发表评论的编辑器组件，支持取消操作。"
      :code="editorCode"
    >
      <ui-comment-editor
        v-model:value="editorContent"
        submit-text="发表评论"
        show-cancel
        @submit="handleSubmitComment"
        @cancel="editorContent = ''"
      />
    </ui-demo>

    <!-- 评论列表 -->
    <ui-demo
      title="评论列表"
      description="完整的评论系统示例，包括评论输入框和带分页的评论列表，支持回复功能。"
      :code="commentListCode"
    >
      <div>
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
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      Comment 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            author
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            评论作者
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            avatar
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            作者头像URL
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            content
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            评论内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            datetime
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            评论时间
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            actions
          </td>
          <td class="px-4 py-2">
            Array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            操作按钮列表，每项包含label和onClick属性
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            children
          </td>
          <td class="px-4 py-2">
            Array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            嵌套的子评论
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            showReply
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否默认显示回复框
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CommentList 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            comments
          </td>
          <td class="px-4 py-2">
            Array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            评论数据列表
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            pagination
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示分页
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            currentPage
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            1
          </td>
          <td class="px-4 py-2">
            当前页码
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            total
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            总条数
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            pageSize
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            10
          </td>
          <td class="px-4 py-2">
            每页条数
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            loading
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否加载中
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            emptyText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '暂无评论'
          </td>
          <td class="px-4 py-2">
            空状态文本
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CommentEditor 属性
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            属性名
          </th>
          <th class="px-4 py-2 text-left">
            类型
          </th>
          <th class="px-4 py-2 text-left">
            默认值
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            value
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            ''
          </td>
          <td class="px-4 py-2">
            输入内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            placeholder
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '写下你的评论...'
          </td>
          <td class="px-4 py-2">
            占位文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            submitText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '发布'
          </td>
          <td class="px-4 py-2">
            提交按钮文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            cancelText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '取消'
          </td>
          <td class="px-4 py-2">
            取消按钮文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            showCancel
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示取消按钮
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            avatar
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            评论者头像
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            author
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            undefined
          </td>
          <td class="px-4 py-2">
            评论者名称
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            minRows
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            3
          </td>
          <td class="px-4 py-2">
            最小行数
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            maxRows
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            6
          </td>
          <td class="px-4 py-2">
            最大行数
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            disabled
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否禁用
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CommentList 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            change
          </td>
          <td class="px-4 py-2">
            (page: number)
          </td>
          <td class="px-4 py-2">
            页码变化时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            reply
          </td>
          <td class="px-4 py-2">
            (comment: object, content: string)
          </td>
          <td class="px-4 py-2">
            回复评论时触发
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      CommentEditor 事件
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            事件名
          </th>
          <th class="px-4 py-2 text-left">
            参数
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            submit
          </td>
          <td class="px-4 py-2">
            (content: string)
          </td>
          <td class="px-4 py-2">
            提交评论时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            cancel
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            取消评论时触发
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            update:value
          </td>
          <td class="px-4 py-2">
            (value: string)
          </td>
          <td class="px-4 py-2">
            输入内容更新时触发
          </td>
        </tr>
      </tbody>
    </table>
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
