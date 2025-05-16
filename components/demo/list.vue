<script setup lang="ts" name="DemoList">
/**
 * 列表组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
 * 更新日期: 2024-06-17 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 基础列表示例数据
const basicListData = [
  '项目 1',
  '项目 2',
  '项目 3',
  '项目 4',
  '项目 5',
]

// 对象列表示例数据
const objectListData = [
  { id: 1, title: '阿里云服务器', description: 'ECS云服务器 - 8核16G' },
  { id: 2, title: '数据库服务', description: 'MySQL数据库 - 高可用版' },
  { id: 3, title: '对象存储', description: 'OSS对象存储 - 标准存储类型' },
]

// 复杂列表示例数据
const complexListData = [
  {
    id: 1,
    title: '新的产品需求讨论',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    author: '张三',
    datetime: '2024-07-29 10:15',
    description: '关于新产品的需求分析和功能规划讨论',
    content: '我们需要讨论一下新产品的需求和功能规划，请相关同事于下周一上午10点在会议室集合。',
    tags: ['产品', '需求', '讨论'],
    actions: [
      { label: '编辑', icon: 'carbon:edit', onClick: () => console.warn('编辑项目1') },
      { label: '删除', icon: 'carbon:trash-can', onClick: () => console.warn('删除项目1') },
    ],
  },
  {
    id: 2,
    title: '用户体验优化计划',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    author: '李四',
    datetime: '2024-07-29 14:30',
    description: '基于用户反馈的产品体验优化方案',
    content: '根据最近收集到的用户反馈，我们需要对产品的以下几个方面进行优化：1. 登录流程简化；2. 首页布局调整；3. 操作响应速度提升。',
    tags: ['用户体验', '优化'],
    actions: [
      { label: '编辑', icon: 'carbon:edit', onClick: () => console.warn('编辑项目2') },
      { label: '删除', icon: 'carbon:trash-can', onClick: () => console.warn('删除项目2') },
    ],
  },
  {
    id: 3,
    title: '系统性能监控报告',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    author: '王五',
    datetime: '2024-07-29 16:45',
    description: '上周系统性能监控数据分析',
    content: '上周系统整体运行稳定，平均响应时间为0.8秒，服务可用性达到99.9%，CPU使用率峰值为75%，内存使用率峰值为68%。',
    tags: ['系统', '性能', '监控'],
    actions: [
      { label: '编辑', icon: 'carbon:edit', onClick: () => console.warn('编辑项目3') },
      { label: '删除', icon: 'carbon:trash-can', onClick: () => console.warn('删除项目3') },
    ],
  },
]

// 悬停和选中演示
const isSelected = ref(1)
function selectItem(id: number) {
  isSelected.value = id
}

// 分页数据示例
const paginationListData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `项目 ${i + 1}`,
  description: `这是项目 ${i + 1} 的描述文本，用于演示列表分页功能。`,
}))

// 示例代码
const basicCode = `<ui-list :data-source="basicListData" bordered />`

const customItemCode = `<script setup>
const objectListData = [
  { id: 1, title: '阿里云服务器', description: 'ECS云服务器 - 8核16G' },
  { id: 2, title: '数据库服务', description: 'MySQL数据库 - 高可用版' },
  { id: 3, title: '对象存储', description: 'OSS对象存储 - 标准存储类型' },
]
<\/script>

<template>
  <ui-list :data-source="objectListData" bordered>
    <template #item="{ item }">
      <ui-list-item
        :title="item.title"
        :description="item.description"
      />
    </template>
  </ui-list>
</template>`

const complexCode = `<script setup>
import { ref } from 'vue'

// 列表数据
const complexListData = [
  {
    id: 1,
    title: '新的产品需求讨论',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    datetime: '2024-07-29 10:15',
    description: '关于新产品的需求分析和功能规划讨论',
    content: '我们需要讨论一下新产品的需求和功能规划...',
    tags: ['产品', '需求', '讨论'],
    actions: [
      { label: '编辑', icon: 'carbon:edit', onClick: () => console.log('编辑') },
      { label: '删除', icon: 'carbon:trash-can', onClick: () => console.log('删除') },
    ],
  },
  // ... 更多数据
]

const isSelected = ref(1)
function selectItem(id) {
  isSelected.value = id
}
<\/script>

<template>
  <ui-list
    :data-source="complexListData"
    header="通知列表"
    footer="共 3 条通知"
    bordered
    :item-gap="16"
  >
    <template #item="{ item }">
      <ui-list-item
        :title="item.title"
        :description="item.description"
        :content="item.content"
        :actions="item.actions"
        clickable
        :selected="isSelected === item.id"
        @click="selectItem(item.id)"
      >
        <template #prefix>
          <ui-avatar :src="item.avatar" size="default" />
        </template>
        <template #suffix>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ item.datetime }}
          </div>
        </template>
        <template #title>
          <div class="flex items-center">
            <span>{{ item.title }}</span>
            <div class="ml-2 flex">
              <ui-tag v-for="tag in item.tags" :key="tag" size="small" class="mr-1">
                {{ tag }}
              </ui-tag>
            </div>
          </div>
        </template>
      </ui-list-item>
    </template>
  </ui-list>
</template>`

const horizontalCode = `<ui-list
  :data-source="objectListData.slice(0, 3)"
  layout="horizontal"
  :item-gap="16"
  bordered
>
  <template #item="{ item }">
    <ui-list-item
      :title="item.title"
      :description="item.description"
      style="width: 200px"
    />
  </template>
</ui-list>`

const sizeCode = `<!-- 小尺寸 -->
<ui-list
  :data-source="basicListData.slice(0, 3)"
  bordered
  size="small"
/>

<!-- 默认尺寸 -->
<ui-list
  :data-source="basicListData.slice(0, 3)"
  bordered
  size="default"
/>

<!-- 大尺寸 -->
<ui-list
  :data-source="basicListData.slice(0, 3)"
  bordered
  size="large"
/>`

const paginationCode = `<script setup>
// 分页数据示例 (25项数据)
const paginationListData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: \`项目 \${i + 1}\`,
  description: \`这是项目 \${i + 1} 的描述文本，用于演示列表分页功能。\`,
}))
<\/script>

<template>
  <ui-list
    :data-source="paginationListData"
    header="分页列表示例"
    bordered
    :pagination="true"
  >
    <template #item="{ item }">
      <ui-list-item
        :title="item.title"
        :description="item.description"
      />
    </template>
  </ui-list>
</template>`

const loadingCode = `<ui-list
  :data-source="[]"
  loading-text="数据加载中..."
  bordered
  loading
/>`

const emptyCode = `<ui-list
  :data-source="[]"
  bordered
  empty-text="暂无列表数据"
>
  <template #empty>
    <ui-empty description="暂无列表数据">
      <template #extra>
        <ui-button type="primary" size="small">
          创建新项目
        </ui-button>
      </template>
    </ui-empty>
  </template>
</ui-list>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold">
      List 列表
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      列表组件用于展示一组数据项，支持基础列表、自定义列表项、复杂交互和分页等功能。
    </p>

    <!-- 基础列表 -->
    <ui-demo
      title="基础列表"
      description="最简单的列表展示，使用字符串数组作为数据源。"
      :code="basicCode"
    >
      <ui-list :data-source="basicListData" bordered />
    </ui-demo>

    <!-- 自定义列表项 -->
    <ui-demo
      title="自定义列表项"
      description="使用对象数组作为数据源，通过插槽自定义列表项内容。"
      :code="customItemCode"
    >
      <ui-list :data-source="objectListData" bordered>
        <template #item="{ item }">
          <ui-list-item
            :title="item.title"
            :description="item.description"
          />
        </template>
      </ui-list>
    </ui-demo>

    <!-- 复杂列表 -->
    <ui-demo
      title="复杂列表"
      description="展示带有头像、标签、操作的复杂列表，支持选中状态和点击交互。"
      :code="complexCode"
    >
      <ui-list
        :data-source="complexListData"
        header="通知列表"
        footer="共 3 条通知"
        bordered
        :item-gap="16"
      >
        <template #item="{ item }">
          <ui-list-item
            :title="item.title"
            :description="item.description"
            :content="item.content"
            :actions="item.actions"
            clickable
            :selected="isSelected === item.id"
            @click="selectItem(item.id)"
          >
            <template #prefix>
              <ui-avatar :src="item.avatar" size="default" />
            </template>
            <template #suffix>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.datetime }}
              </div>
            </template>
            <template #title>
              <div class="flex items-center">
                <span>{{ item.title }}</span>
                <div class="ml-2 flex">
                  <ui-tag v-for="tag in item.tags" :key="tag" size="small" class="mr-1">
                    {{ tag }}
                  </ui-tag>
                </div>
              </div>
            </template>
          </ui-list-item>
        </template>
      </ui-list>
    </ui-demo>

    <!-- 水平列表布局 -->
    <ui-demo
      title="水平列表布局"
      description="设置layout属性为horizontal可以实现水平列表布局。"
      :code="horizontalCode"
    >
      <ui-list
        :data-source="objectListData.slice(0, 3)"
        layout="horizontal"
        :item-gap="16"
        bordered
      >
        <template #item="{ item }">
          <ui-list-item
            :title="item.title"
            :description="item.description"
            style="width: 200px"
          />
        </template>
      </ui-list>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="列表组件提供小、中（默认）、大三种尺寸。"
      :code="sizeCode"
    >
      <div class="space-y-8">
        <div>
          <h3 class="mb-2 font-medium">
            小尺寸
          </h3>
          <ui-list
            :data-source="basicListData.slice(0, 3)"
            bordered
            size="small"
          />
        </div>

        <div>
          <h3 class="mb-2 font-medium">
            默认尺寸
          </h3>
          <ui-list
            :data-source="basicListData.slice(0, 3)"
            bordered
            size="default"
          />
        </div>

        <div>
          <h3 class="mb-2 font-medium">
            大尺寸
          </h3>
          <ui-list
            :data-source="basicListData.slice(0, 3)"
            bordered
            size="large"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 分页列表 -->
    <ui-demo
      title="分页列表"
      description="当数据量较大时，可以启用分页功能。"
      :code="paginationCode"
    >
      <ui-list
        :data-source="paginationListData"
        header="分页列表示例"
        bordered
        :pagination="true"
      >
        <template #item="{ item }">
          <ui-list-item
            :title="item.title"
            :description="item.description"
          />
        </template>
      </ui-list>
    </ui-demo>

    <!-- 加载中状态 -->
    <ui-demo
      title="加载中状态"
      description="列表数据加载中的展示状态。"
      :code="loadingCode"
    >
      <ui-list
        :data-source="[]"
        loading-text="数据加载中..."
        bordered
        loading
      />
    </ui-demo>

    <!-- 自定义空状态 -->
    <ui-demo
      title="自定义空状态"
      description="自定义列表为空时的展示内容。"
      :code="emptyCode"
    >
      <ui-list
        :data-source="[]"
        bordered
        empty-text="暂无列表数据"
      >
        <template #empty>
          <ui-empty description="暂无列表数据">
            <template #extra>
              <ui-button type="primary" size="small">
                创建新项目
              </ui-button>
            </template>
          </ui-empty>
        </template>
      </ui-list>
    </ui-demo>

    <!-- API 参考 -->
    <h3 class="mb-4 mt-10 text-xl font-semibold">
      API 参考
    </h3>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      List 属性
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
            dataSource
          </td>
          <td class="px-4 py-2">
            array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            列表数据源
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            bordered
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否显示边框
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            header
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列表头部文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            footer
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列表底部文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            size
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'default'
          </td>
          <td class="px-4 py-2">
            列表尺寸，可选值：'small'、'default'、'large'
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            layout
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            'vertical'
          </td>
          <td class="px-4 py-2">
            列表布局方式，可选值：'vertical'、'horizontal'
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
            是否显示加载状态
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            loadingText
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            '加载中...'
          </td>
          <td class="px-4 py-2">
            加载中提示文本
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
            '暂无数据'
          </td>
          <td class="px-4 py-2">
            空数据提示文本
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            itemGap
          </td>
          <td class="px-4 py-2">
            number
          </td>
          <td class="px-4 py-2">
            0
          </td>
          <td class="px-4 py-2">
            列表项间距
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            pagination
          </td>
          <td class="px-4 py-2">
            boolean | object
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            分页配置
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      ListItem 属性
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
            title
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列表项标题
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            description
          </td>
          <td class="px-4 py-2">
            string
          </td>
          <td class="px-4 py-2">
            -
          </td>
          <td class="px-4 py-2">
            列表项描述
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
            -
          </td>
          <td class="px-4 py-2">
            列表项内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            actions
          </td>
          <td class="px-4 py-2">
            array
          </td>
          <td class="px-4 py-2">
            []
          </td>
          <td class="px-4 py-2">
            操作项配置，每项包含label、icon和onClick属性
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            clickable
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否可点击
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            selected
          </td>
          <td class="px-4 py-2">
            boolean
          </td>
          <td class="px-4 py-2">
            false
          </td>
          <td class="px-4 py-2">
            是否选中
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      List 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            header
          </td>
          <td class="px-4 py-2">
            自定义头部内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            footer
          </td>
          <td class="px-4 py-2">
            自定义底部内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            item
          </td>
          <td class="px-4 py-2">
            自定义列表项内容，参数: { item, index }
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            empty
          </td>
          <td class="px-4 py-2">
            自定义空状态内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            loading
          </td>
          <td class="px-4 py-2">
            自定义加载中状态内容
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-6 text-lg font-medium">
      ListItem 插槽
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="px-4 py-2 text-left">
            插槽名称
          </th>
          <th class="px-4 py-2 text-left">
            说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-4 py-2">
            prefix
          </td>
          <td class="px-4 py-2">
            列表项前缀内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            suffix
          </td>
          <td class="px-4 py-2">
            列表项后缀内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            title
          </td>
          <td class="px-4 py-2">
            自定义标题内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            description
          </td>
          <td class="px-4 py-2">
            自定义描述内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            content
          </td>
          <td class="px-4 py-2">
            自定义内容
          </td>
        </tr>
        <tr class="border-b">
          <td class="px-4 py-2">
            actions
          </td>
          <td class="px-4 py-2">
            自定义操作区域
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
