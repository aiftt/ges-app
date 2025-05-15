<script setup lang="ts" name="DemoSkeleton">
/**
 * 骨架屏组件示例
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 控制loading状态
const loading = ref(true)

// 切换加载状态
function toggleLoading() {
  loading.value = !loading.value
}

// 定时切换加载状态，模拟数据加载
function simulateLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// 代码示例
const basicCode = `<ui-button @click="toggleLoading">
  切换加载状态
</ui-button>
<ui-button @click="simulateLoading">
  模拟加载 (2秒)
</ui-button>
<span class="ml-2">当前状态: {{ loading ? '加载中' : '加载完成' }}</span>

<div class="mt-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
  <ui-skeleton :loading="loading" type="text">
    <div>已加载的文本内容</div>
  </ui-skeleton>
</div>

<script setup>
import { ref } from 'vue'

const loading = ref(true)

function toggleLoading() {
  loading.value = !loading.value
}

function simulateLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
<\/script>`

const typesCode = `<!-- 文本 -->
<ui-skeleton type="text" />

<!-- 按钮 -->
<ui-skeleton type="button" />

<!-- 头像 -->
<ui-skeleton type="avatar" shape="circle" />

<!-- 段落 -->
<ui-skeleton type="paragraph" :rows="3" />

<!-- 图片 -->
<ui-skeleton type="image" />`

const compositeCode = `<!-- 卡片 -->
<ui-skeleton type="card" title />

<!-- 列表 -->
<ui-skeleton type="list" title />`

const animatedCode = `<!-- 有动画 -->
<ui-skeleton type="paragraph" :rows="3" animated />

<!-- 无动画 -->
<ui-skeleton type="paragraph" :rows="3" :animated="false" />`

const customStyleCode = `<!-- 自定义背景色 -->
<ui-skeleton
  type="paragraph"
  :rows="2"
  background-color="var(--ui-color-primary-200)"
  animate-color="rgba(255, 255, 255, 0.5)"
/>

<!-- 自定义尺寸和圆角 -->
<ui-skeleton
  type="button"
  width="200px"
  height="50px"
  radius="25px"
/>`

const complexCode = `<ui-skeleton :loading="loading" type="custom">
  <template #skeleton>
    <div class="flex flex-col">
      <div class="flex items-center mb-4">
        <ui-skeleton type="avatar" shape="circle" width="50px" height="50px" />
        <div class="ml-3 flex flex-col gap-2">
          <ui-skeleton type="text" width="150px" />
          <ui-skeleton type="text" width="100px" />
        </div>
      </div>
      <ui-skeleton type="paragraph" :rows="4" />
      <div class="mt-4 flex gap-3">
        <ui-skeleton type="button" width="80px" height="32px" />
        <ui-skeleton type="button" width="80px" height="32px" />
      </div>
    </div>
  </template>

  <div>
    <div class="flex items-center mb-4">
      <ui-avatar src="https://via.placeholder.com/50" />
      <div class="ml-3">
        <div class="font-medium">用户名称</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">发布于 2024-08-16</div>
      </div>
    </div>
    <div class="mb-4">
      <p class="mb-2">这是一段示例内容，用于展示骨架屏加载完成后的实际内容。骨架屏组件可以提升用户在等待内容加载时的体验。</p>
      <p>当数据加载完成后，实际内容会替换占位的骨架屏，让用户感受到更流畅的页面过渡。</p>
    </div>
    <div class="flex gap-3">
      <ui-button size="small">点赞</ui-button>
      <ui-button size="small">评论</ui-button>
    </div>
  </div>
</ui-skeleton>

<script setup>
import { ref } from 'vue'

const loading = ref(true)

function toggleLoading() {
  loading.value = !loading.value
}

// 自动模拟加载
function simulateLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Skeleton 骨架屏
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      在页面加载过程中显示占位图形，提高用户体验，减少等待过程中的视觉不适。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础骨架屏用于在页面加载过程中显示占位图形，可通过控制loading属性切换显示内容。"
      :code="basicCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-button @click="toggleLoading">
          切换加载状态
        </ui-button>
        <ui-button @click="simulateLoading">
          模拟加载 (2秒)
        </ui-button>
        <span class="text-sm">当前状态: {{ loading ? '加载中' : '加载完成' }}</span>
      </div>

      <div class="mt-4 border border-gray-200 rounded-lg p-4 dark:border-gray-700">
        <ui-skeleton :loading="loading" type="text">
          <div class="min-h-[24px]">
            已加载的文本内容
          </div>
        </ui-skeleton>
      </div>
    </ui-demo>

    <!-- 不同类型骨架屏 -->
    <ui-demo
      title="不同类型骨架屏"
      description="骨架屏提供多种类型，适用于不同场景的内容占位。"
      :code="typesCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div class="mb-2 font-medium">
            文本 (text)
          </div>
          <ui-skeleton type="text" />
        </div>

        <div>
          <div class="mb-2 font-medium">
            按钮 (button)
          </div>
          <ui-skeleton type="button" />
        </div>

        <div>
          <div class="mb-2 font-medium">
            头像 (avatar)
          </div>
          <ui-skeleton type="avatar" shape="circle" />
        </div>

        <div>
          <div class="mb-2 font-medium">
            段落 (paragraph)
          </div>
          <ui-skeleton type="paragraph" :rows="3" />
        </div>

        <div>
          <div class="mb-2 font-medium">
            图片 (image)
          </div>
          <ui-skeleton type="image" />
        </div>
      </div>
    </ui-demo>

    <!-- 复合骨架屏 -->
    <ui-demo
      title="复合骨架屏"
      description="组合多个骨架屏元素，构建更复杂的加载占位。"
      :code="compositeCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div class="mb-2 font-medium">
            卡片 (card)
          </div>
          <ui-skeleton type="card" title />
        </div>

        <div>
          <div class="mb-2 font-medium">
            列表 (list)
          </div>
          <ui-skeleton type="list" title />
        </div>
      </div>
    </ui-demo>

    <!-- 动画效果 -->
    <ui-demo
      title="动画效果"
      description="骨架屏可以添加动画效果，使加载状态更加生动。"
      :code="animatedCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div class="mb-2 font-medium">
            有动画
          </div>
          <ui-skeleton type="paragraph" :rows="3" animated />
        </div>

        <div>
          <div class="mb-2 font-medium">
            无动画
          </div>
          <ui-skeleton type="paragraph" :rows="3" :animated="false" />
        </div>
      </div>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义骨架屏的背景色、尺寸和圆角等样式。"
      :code="customStyleCode"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div class="mb-2 font-medium">
            自定义背景色
          </div>
          <ui-skeleton
            type="paragraph"
            :rows="2"
            background-color="var(--ui-color-primary-200)"
            animate-color="rgba(255, 255, 255, 0.5)"
          />
        </div>

        <div>
          <div class="mb-2 font-medium">
            自定义尺寸和圆角
          </div>
          <ui-skeleton
            type="button"
            width="200px"
            height="50px"
            radius="25px"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 综合示例 -->
    <ui-demo
      title="综合示例"
      description="使用自定义骨架屏和实际内容，展示真实场景中的加载效果。"
      :code="complexCode"
    >
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <ui-button @click="toggleLoading">
          切换加载状态
        </ui-button>
        <ui-button @click="simulateLoading">
          模拟加载 (2秒)
        </ui-button>
        <span class="text-sm">当前状态: {{ loading ? '加载中' : '加载完成' }}</span>
      </div>

      <div class="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
        <ui-skeleton :loading="loading" type="custom">
          <template #skeleton>
            <div class="flex flex-col">
              <div class="mb-4 flex items-center">
                <ui-skeleton type="avatar" shape="circle" width="50px" height="50px" />
                <div class="ml-3 flex flex-col gap-2">
                  <ui-skeleton type="text" width="150px" />
                  <ui-skeleton type="text" width="100px" />
                </div>
              </div>
              <ui-skeleton type="paragraph" :rows="4" />
              <div class="mt-4 flex gap-3">
                <ui-skeleton type="button" width="80px" height="32px" />
                <ui-skeleton type="button" width="80px" height="32px" />
              </div>
            </div>
          </template>

          <div>
            <div class="mb-4 flex items-center">
              <ui-avatar src="https://via.placeholder.com/50" />
              <div class="ml-3">
                <div class="font-medium">
                  用户名称
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  发布于 2024-08-16
                </div>
              </div>
            </div>
            <div class="mb-4">
              <p class="mb-2">
                这是一段示例内容，用于展示骨架屏加载完成后的实际内容。骨架屏组件可以提升用户在等待内容加载时的体验。
              </p>
              <p>当数据加载完成后，实际内容会替换占位的骨架屏，让用户感受到更流畅的页面过渡。</p>
            </div>
            <div class="flex gap-3">
              <ui-button size="small">
                点赞
              </ui-button>
              <ui-button size="small">
                评论
              </ui-button>
            </div>
          </div>
        </ui-skeleton>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <!-- 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  loading
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否显示骨架屏
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  true
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  type
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  骨架屏类型
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'text' | 'button' | 'avatar' | 'image' | 'paragraph' | 'card' | 'list' | 'custom'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'text'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  animated
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否启用动画效果
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  true
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  rows
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  段落行数（paragraph类型适用）
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  3
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  width
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  宽度
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string | number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  height
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  高度
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string | number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  radius
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  圆角大小
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string | number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  shape
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  形状（avatar类型适用）
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'circle' | 'square'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'square'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  title
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否显示标题（card和list类型适用）
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  background-color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  背景颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  animate-color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  动画颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 插槽 -->
      <div>
        <h4 class="mb-2 text-lg font-medium">
          插槽
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  名称
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  default
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  实际内容，在loading为false时显示
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  skeleton
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义骨架屏内容，type为custom时使用
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-skeleton {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .demo-section {
    margin-bottom: 40px;

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--ui-color-text-secondary);
    }

    p {
      margin-bottom: 16px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-control {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;

    .loading-status {
      margin-left: 8px;
      font-size: 14px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-block {
    padding: 24px;
    border: 1px solid var(--ui-color-border);
    border-radius: 8px;
    background-color: var(--ui-color-bg-card);
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;
    margin-bottom: 24px;
  }

  .demo-col {
    padding: 0 12px;
    margin-bottom: 24px;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  .content-block {
    min-height: 200px;

    .content-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .content-info {
      margin-left: 12px;
    }

    .content-title {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .content-subtitle {
      font-size: 12px;
      color: var(--ui-color-text-secondary);
    }

    .content-body {
      margin-bottom: 16px;

      p {
        margin-bottom: 12px;
      }
    }

    .content-footer {
      display: flex;
      gap: 12px;
    }
  }

  .custom-skeleton {
    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    &-info {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-footer {
      margin-top: 16px;
      display: flex;
      gap: 12px;
    }
  }
}
</style>
