<script setup lang="ts" name="DemoCard">
/**
 * Card 卡片组件示例
 * 创建日期: 2024-06-22
 * 作者: aiftt
 * 更新日期: 2024-06-22 - 初始版本
 */

import { ref } from 'vue'

// 示例数据
const loading = ref(false)

// 加载状态切换
function toggleLoading() {
  loading.value = !loading.value
}
</script>

<template>
  <div class="demo-card">
    <h2 class="mb-6 text-xl font-bold">
      Card 卡片
    </h2>

    <!-- 基础卡片 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        基础卡片
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ui-card title="基础卡片" subtitle="这是一个基础卡片示例">
          <p class="mb-4">
            卡片内容区域，可以放置任意内容。
          </p>
          <p>卡片组件支持标题、副标题、内容区域和底部区域。</p>
        </ui-card>

        <ui-card>
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-base font-medium">
                  自定义头部
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  使用具名插槽自定义头部内容
                </div>
              </div>
              <ui-button size="small">
                操作按钮
              </ui-button>
            </div>
          </template>
          <p>卡片支持使用插槽自定义头部和底部内容。</p>
          <template #footer>
            <div class="flex justify-end">
              <ui-button size="small" type="primary">
                确认
              </ui-button>
            </div>
          </template>
        </ui-card>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        不同尺寸
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="小尺寸卡片" size="small">
          <p>小尺寸的卡片示例，适合空间较小的场景。</p>
        </ui-card>

        <ui-card title="默认尺寸卡片" size="default">
          <p>默认尺寸的卡片示例。</p>
        </ui-card>

        <ui-card title="大尺寸卡片" size="large">
          <p>大尺寸的卡片示例，内容更加突出。</p>
        </ui-card>
      </div>
    </div>

    <!-- 阴影效果 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        阴影效果
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="总是显示阴影" shadow="always">
          <p>总是显示阴影。</p>
        </ui-card>

        <ui-card title="悬停显示阴影" shadow="hover">
          <p>悬停时显示阴影（默认）。</p>
        </ui-card>

        <ui-card title="不显示阴影" shadow="never">
          <p>不显示阴影。</p>
        </ui-card>
      </div>
    </div>

    <!-- 边框与分割线 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        边框与分割线
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="带边框卡片" bordered>
          <p>默认带有边框。</p>
        </ui-card>

        <ui-card title="无边框卡片" :bordered="false">
          <p>无边框卡片。</p>
        </ui-card>

        <ui-card title="带分割线卡片" divided>
          <p>头部和底部有分割线。</p>
          <template #footer>
            <div>底部内容</div>
          </template>
        </ui-card>
      </div>
    </div>

    <!-- 对齐方式 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        对齐方式
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ui-card title="左对齐" header-align="left" footer-align="left" divided>
          <p>头部和底部左对齐（默认）。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>

        <ui-card title="居中对齐" header-align="center" footer-align="center" divided>
          <p>头部和底部居中对齐。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>

        <ui-card title="右对齐" header-align="right" footer-align="right" divided>
          <p>头部和底部右对齐。</p>
          <template #footer>
            底部内容
          </template>
        </ui-card>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        加载状态
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ui-card title="加载状态" :loading="loading">
          <p>卡片内容加载中...</p>
          <template #footer>
            <ui-button size="small" @click="toggleLoading">
              {{ loading ? '停止加载' : '开始加载' }}
            </ui-button>
          </template>
        </ui-card>

        <ui-card title="自定义样式" bg-color="#f0f9ff" border-color="#bae6fd" color="#0369a1">
          <p>使用自定义颜色和边框。</p>
        </ui-card>
      </div>
    </div>

    <!-- 无内边距 -->
    <div class="section">
      <h3 class="mb-4 text-lg font-medium">
        无内边距
      </h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-1">
        <ui-card title="无内边距卡片" :body-padding="false">
          <div class="p-0">
            <div class="bg-gray-100 p-4 dark:bg-gray-700">
              <p>自定义内容区域，卡片本身不提供内边距。</p>
            </div>
            <div class="bg-gray-200 p-4 dark:bg-gray-800">
              <p>适合需要完全自定义内容布局的场景。</p>
            </div>
            <div class="bg-gray-300 p-4 dark:bg-gray-900">
              <p>例如图表、列表等需要特殊样式的内容。</p>
            </div>
          </div>
        </ui-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-card .section {
  margin-bottom: 2rem;
}
</style>
