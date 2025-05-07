<script setup lang="ts" name="DemoScrollbar">
/**
 * Scrollbar 组件演示
 * 创建日期: 2025-05-07
 * 作者: aiftt
 * 更新日期: 2025-05-08 - 合并详细演示内容
 */
import { ref } from 'vue'

// 示例长内容
const items = ref(Array.from({ length: 30 }, (_, i) => `内容项 ${i + 1}`))

// 示例代码
const examples = {
  basic: `<ui-scrollbar height="200px">
  <div class="p-4">
    <p v-for="i in 20" :key="i" class="mb-2">滚动内容行 {{ i }}</p>
  </div>
</ui-scrollbar>`,

  horizontal: `<ui-scrollbar height="200px">
  <div class="flex p-4 space-x-4">
    <div v-for="i in 20" :key="i" class="flex-shrink-0 w-40 h-32 p-4 border rounded">
      横向滚动项 {{ i }}
    </div>
  </div>
</ui-scrollbar>`,

  alwaysShow: `<ui-scrollbar height="200px" :always="true">
  <div class="p-4">
    <p v-for="i in 20" :key="i" class="mb-2">始终显示滚动条内容行 {{ i }}</p>
  </div>
</ui-scrollbar>`,

  customStyle: `<ui-scrollbar
  height="200px"
  :bar-width="8"
  bar-color="#10b981"
  bar-hover-color="#059669">
  <div class="p-4">
    <p v-for="i in 20" :key="i" class="mb-2">自定义滚动条样式内容行 {{ i }}</p>
  </div>
</ui-scrollbar>`,

  shadow: `<ui-scrollbar height="200px" shadow="hover">
  <div class="p-4">
    <p v-for="i in 20" :key="i" class="mb-2">悬停显示阴影内容行 {{ i }}</p>
  </div>
</ui-scrollbar>`,

  nestedScrollbars: `<ui-scrollbar height="300px">
  <div class="p-4">
    <h3 class="mb-4 text-lg font-medium">外层滚动区域</h3>
    <p v-for="i in 5" :key="i" class="mb-2">外层内容 {{ i }}</p>

    <div class="my-4 border p-2 rounded">
      <ui-scrollbar height="150px" bar-color="#3b82f6">
        <div class="p-4">
          <h4 class="mb-2 font-medium">内嵌滚动区域</h4>
          <p v-for="i in 15" :key="i" class="mb-2">内嵌内容行 {{ i }}</p>
        </div>
      </ui-scrollbar>
    </div>

    <p v-for="i in 15" :key="i" class="mb-2">外层内容 {{ i + 5 }}</p>
  </div>
</ui-scrollbar>`,
}
</script>

<template>
  <div class="demo-section">
    <h2 class="demo-title">
      Scrollbar 滚动条
    </h2>
    <p class="mb-6">
      提供美化的自定义滚动条，支持垂直和水平滚动，提供更好的样式和交互体验。
    </p>

    <!-- 基础示例 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        基础用法
      </h3>
      <div class="mb-4">
        <ui-scrollbar height="200px">
          <div class="p-4">
            <p v-for="item in items" :key="item" class="mb-2">
              {{ item }}
            </p>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.basic }}
        </template>
      </ui-code>
    </div>

    <!-- 水平滚动 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        水平滚动
      </h3>
      <div class="mb-4">
        <ui-scrollbar height="150px">
          <div class="flex p-4 space-x-4">
            <div v-for="i in 20" :key="i" class="h-32 w-40 flex-shrink-0 border rounded p-4">
              横向滚动项 {{ i }}
            </div>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.horizontal }}
        </template>
      </ui-code>
    </div>

    <!-- 始终显示滚动条 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        始终显示滚动条
      </h3>
      <div class="mb-4">
        <ui-scrollbar height="200px" :always="true">
          <div class="p-4">
            <p v-for="i in 20" :key="i" class="mb-2">
              始终显示滚动条内容行 {{ i }}
            </p>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.alwaysShow }}
        </template>
      </ui-code>
    </div>

    <!-- 自定义滚动条样式 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        自定义滚动条样式
      </h3>
      <div class="mb-4">
        <ui-scrollbar
          height="200px"
          :bar-width="8"
          bar-color="#10b981"
          bar-hover-color="#059669"
        >
          <div class="p-4">
            <p v-for="item in items.slice(0, 15)" :key="item" class="mb-2">
              {{ item }}
            </p>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.customStyle }}
        </template>
      </ui-code>
    </div>

    <!-- 阴影效果 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        阴影效果
      </h3>
      <div class="mb-4">
        <ui-scrollbar height="200px" shadow="hover">
          <div class="p-4">
            <p v-for="i in 20" :key="i" class="mb-2">
              悬停显示阴影内容行 {{ i }}
            </p>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.shadow }}
        </template>
      </ui-code>
    </div>

    <!-- 嵌套滚动条 -->
    <div class="demo-card mb-6">
      <h3 class="mb-2 text-lg font-medium">
        嵌套滚动条
      </h3>
      <div class="mb-4">
        <ui-scrollbar height="300px">
          <div class="p-4">
            <h3 class="mb-4 text-lg font-medium">
              外层滚动区域
            </h3>
            <p v-for="i in 5" :key="i" class="mb-2">
              外层内容 {{ i }}
            </p>

            <div class="my-4 border rounded p-2">
              <ui-scrollbar height="150px" bar-color="#3b82f6">
                <div class="p-4">
                  <h4 class="mb-2 font-medium">
                    内嵌滚动区域
                  </h4>
                  <p v-for="i in 15" :key="i" class="mb-2">
                    内嵌内容行 {{ i }}
                  </p>
                </div>
              </ui-scrollbar>
            </div>

            <p v-for="i in 15" :key="i" class="mb-2">
              外层内容 {{ i + 5 }}
            </p>
          </div>
        </ui-scrollbar>
      </div>
      <ui-code language="html">
        <template #code>
          {{ examples.nestedScrollbars }}
        </template>
      </ui-code>
    </div>

    <!-- API参考 -->
    <div class="demo-card">
      <h3 class="mb-4 text-lg font-medium">
        API参考
      </h3>

      <div class="mb-6">
        <h4 class="mb-2 font-medium">
          Props
        </h4>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border p-2 text-left">
                属性
              </th>
              <th class="border p-2 text-left">
                类型
              </th>
              <th class="border p-2 text-left">
                默认值
              </th>
              <th class="border p-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">
                horizontal
              </td>
              <td class="border p-2">
                boolean
              </td>
              <td class="border p-2">
                true
              </td>
              <td class="border p-2">
                是否显示水平滚动条
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                vertical
              </td>
              <td class="border p-2">
                boolean
              </td>
              <td class="border p-2">
                true
              </td>
              <td class="border p-2">
                是否显示垂直滚动条
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                barWidth
              </td>
              <td class="border p-2">
                number
              </td>
              <td class="border p-2">
                6
              </td>
              <td class="border p-2">
                滚动条宽度（像素）
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                barColor
              </td>
              <td class="border p-2">
                string
              </td>
              <td class="border p-2">
                ''
              </td>
              <td class="border p-2">
                滚动条颜色
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                barHoverColor
              </td>
              <td class="border p-2">
                string
              </td>
              <td class="border p-2">
                ''
              </td>
              <td class="border p-2">
                滚动条悬停颜色
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                height
              </td>
              <td class="border p-2">
                string
              </td>
              <td class="border p-2">
                ''
              </td>
              <td class="border p-2">
                容器高度
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                maxHeight
              </td>
              <td class="border p-2">
                string
              </td>
              <td class="border p-2">
                ''
              </td>
              <td class="border p-2">
                容器最大高度
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                noStop
              </td>
              <td class="border p-2">
                boolean
              </td>
              <td class="border p-2">
                false
              </td>
              <td class="border p-2">
                是否阻止滚动事件冒泡
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                always
              </td>
              <td class="border p-2">
                boolean
              </td>
              <td class="border p-2">
                false
              </td>
              <td class="border p-2">
                是否总是显示滚动条
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                shadow
              </td>
              <td class="border p-2">
                boolean | 'hover'
              </td>
              <td class="border p-2">
                false
              </td>
              <td class="border p-2">
                是否显示容器阴影，设为'hover'时仅在悬停时显示
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h4 class="mb-2 font-medium">
          方法
        </h4>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border p-2 text-left">
                方法名
              </th>
              <th class="border p-2 text-left">
                参数
              </th>
              <th class="border p-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">
                scrollTo
              </td>
              <td class="border p-2">
                options: ScrollToOptions
              </td>
              <td class="border p-2">
                滚动到指定位置
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                scrollBy
              </td>
              <td class="border p-2">
                options: ScrollToOptions
              </td>
              <td class="border p-2">
                滚动指定距离
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                scrollToTop
              </td>
              <td class="border p-2">
                -
              </td>
              <td class="border p-2">
                滚动到顶部
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                scrollToBottom
              </td>
              <td class="border p-2">
                -
              </td>
              <td class="border p-2">
                滚动到底部
              </td>
            </tr>
            <tr>
              <td class="border p-2">
                update
              </td>
              <td class="border p-2">
                -
              </td>
              <td class="border p-2">
                手动更新滚动条状态
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 2rem;
}

.demo-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-card {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: var(--ui-card-bg, white);
}
</style>
