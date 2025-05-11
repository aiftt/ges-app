<script setup lang="ts">
/**
 * 页头组件演示
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 */
import { ref } from 'vue'

// 面包屑配置示例
const breadcrumbItems = [
  { title: '首页', to: '/', icon: 'carbon:home' },
  { title: '组件', to: '/components' },
  { title: '导航', to: '/components/navigation' },
  { title: '页头' },
]

// 返回按钮事件处理
function handleBack() {
  // 在实际应用中可能会执行路由返回操作
  console.warn('点击了返回按钮')
}

// 后退图标控制
const customBackIcon = ref('carbon:arrow-left')

// 自定义样式控制
const useCustomStyle = ref(false)
const backgroundColor = ref('#f9fafb')
const titleColor = ref('#374151')
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      页头组件演示
    </h1>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>
      <ui-page-header
        title="页面标题"
        subtitle="这是页面的副标题，用于补充说明"
        @back="handleBack"
      >
        <div class="py-4">
          这里是页面内容区域，可以放置任何需要的组件或内容。
        </div>
      </ui-page-header>
    </section>

    <!-- 带面包屑导航 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带面包屑导航
      </h2>
      <ui-page-header
        title="带面包屑的页头"
        :breadcrumb="breadcrumbItems"
        @back="handleBack"
      >
        <div class="py-4">
          使用面包屑导航可以提供更清晰的层级结构和导航路径。
        </div>
      </ui-page-header>
    </section>

    <!-- 自定义返回按钮 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义返回按钮
      </h2>
      <div class="mb-4 flex items-center gap-4">
        <span>选择图标:</span>
        <ui-button size="small" @click="customBackIcon = 'carbon:arrow-left'">
          左箭头
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:undo'">
          撤销图标
        </ui-button>
        <ui-button size="small" @click="customBackIcon = 'carbon:home'">
          首页图标
        </ui-button>
      </div>
      <ui-page-header
        title="自定义返回按钮"
        back-text="返回上级"
        :back-icon="customBackIcon"
        @back="handleBack"
      >
        <div class="py-4">
          可以自定义返回按钮的文本和图标，以适应不同场景的需求。
        </div>
      </ui-page-header>
    </section>

    <!-- 带额外内容 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带额外内容
      </h2>
      <ui-page-header
        title="带额外操作的页头"
        subtitle="这里可以放置页面的详细描述"
        @back="handleBack"
      >
        <template #extra>
          <ui-button class="mr-2">
            取消
          </ui-button>
          <ui-button type="primary">
            保存
          </ui-button>
        </template>
        <div class="py-4">
          可以在页头右侧添加额外的操作按钮或其他内容。
        </div>
      </ui-page-header>
    </section>

    <!-- 带页脚操作区 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带页脚操作区
      </h2>
      <ui-page-header
        title="带页脚的页头"
        subtitle="这是带有页脚操作区的页头示例"
        @back="handleBack"
      >
        <div class="py-4">
          这里是页面的主要内容区域。
        </div>
        <template #footer>
          <div class="flex gap-2">
            <ui-button>
              取消
            </ui-button>
            <ui-button type="primary">
              提交
            </ui-button>
          </div>
        </template>
      </ui-page-header>
    </section>

    <!-- 不同对齐方式的页脚 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        不同对齐方式的页脚
      </h2>
      <div class="space-y-4">
        <ui-page-header
          title="左对齐页脚"
          footer-align="left"
          @back="handleBack"
        >
          <div class="py-2">
            左对齐的页脚操作区（默认）。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="居中对齐页脚"
          footer-align="center"
          @back="handleBack"
        >
          <div class="py-2">
            居中对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>

        <ui-page-header
          title="右对齐页脚"
          footer-align="right"
          @back="handleBack"
        >
          <div class="py-2">
            右对齐的页脚操作区。
          </div>
          <template #footer>
            <div class="flex gap-2">
              <ui-button>
                取消
              </ui-button>
              <ui-button type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-page-header>
      </div>
    </section>

    <!-- 无分割线 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        无分割线
      </h2>
      <ui-page-header
        title="无分割线的页头"
        subtitle="去掉默认的分割线"
        :divider="false"
        @back="handleBack"
      >
        <div class="py-4">
          可以通过设置 divider 属性为 false 来移除默认的分割线。
        </div>
      </ui-page-header>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义样式
      </h2>
      <div class="mb-4">
        <ui-switch v-model:checked="useCustomStyle">
          {{ useCustomStyle ? '使用自定义样式' : '使用默认样式' }}
        </ui-switch>
      </div>
      <div v-if="useCustomStyle" class="mb-4 flex items-center gap-4">
        <div>
          <div class="mb-1">
            背景色:
          </div>
          <div class="flex gap-2">
            <button
              v-for="color in ['#f9fafb', '#eff6ff', '#f0fdf4', '#fdf2f8', '#f5f3ff']"
              :key="color"
              class="h-6 w-6 cursor-pointer border rounded-full"
              :style="{ backgroundColor: color }"
              @click="backgroundColor = color"
            />
          </div>
        </div>
        <div>
          <div class="mb-1">
            标题色:
          </div>
          <div class="flex gap-2">
            <button
              v-for="color in ['#374151', '#1e40af', '#047857', '#be185d', '#5b21b6']"
              :key="color"
              class="h-6 w-6 cursor-pointer border rounded-full"
              :style="{ backgroundColor: color }"
              @click="titleColor = color"
            />
          </div>
        </div>
      </div>
      <ui-page-header
        title="自定义样式的页头"
        subtitle="通过自定义属性实现个性化样式"
        :background-color="useCustomStyle ? backgroundColor : ''"
        :title-color="useCustomStyle ? titleColor : ''"
        class="custom-page-header"
        @back="handleBack"
      >
        <div class="py-4">
          可以通过自定义样式属性来定制页头的外观，包括背景色、标题颜色等。
        </div>
      </ui-page-header>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.custom-page-header {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}
</style>
