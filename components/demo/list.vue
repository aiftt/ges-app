<script setup lang="ts" name="DemoList">
/**
 * 列表组件示例页面
 * 创建日期: 2024-07-29
 * 作者: aiftt
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
const _paginationListData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `项目 ${i + 1}`,
  description: `这是项目 ${i + 1} 的描述文本，用于演示列表分页功能。`,
}))
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      列表 (List)
    </h1>

    <div class="space-y-10">
      <!-- 基础列表 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础列表
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-list :data-source="basicListData" bordered />
        </div>
      </section>

      <!-- 自定义列表项 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义列表项
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-list :data-source="objectListData" bordered>
            <template #item="{ item }">
              <ui-list-item
                :title="item.title"
                :description="item.description"
              />
            </template>
          </ui-list>
        </div>
      </section>

      <!-- 复杂列表 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          复杂列表
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
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
        </div>
      </section>

      <!-- 列表布局 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          水平列表布局
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
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
        </div>
      </section>

      <!-- 不同尺寸 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          不同尺寸
        </h2>
        <div class="rounded-lg bg-white p-4 shadow space-y-8 dark:bg-gray-800">
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
      </section>

      <!-- 分页列表 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          分页列表
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-list
            :data-source="_paginationListData"
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
        </div>
      </section>

      <!-- 加载中状态 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          加载中状态
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <ui-list
            :data-source="[]"

            loading-text="数据加载中..."
            bordered loading
          />
        </div>
      </section>

      <!-- 自定义空状态 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义空状态
        </h2>
        <div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
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
        </div>
      </section>
    </div>
  </div>
</template>
