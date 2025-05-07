<script setup lang="ts" name="DemoTsx">
/**
 * TSX组件演示
 * 创建日期: 2024-01-08
 * 作者: aiftt
 */

// 计数回调
function handleClick(_count: number) {
  // 在实际应用中可以处理点击事件
  // 仅演示用途，这里什么都不做
}
</script>

<template>
  <div class="demo-section">
    <h2 class="demo-title">
      TSX组件演示
    </h2>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- 基础用法 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          基础用法
        </div>
        <div class="demo-card">
          <ui-tsx-demo @click="handleClick">
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              这是默认插槽内容
            </div>
          </ui-tsx-demo>

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            基础的TSX组件，展示了如何使用TSX编写Vue组件。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <ui-code language="html">
              <template #code>
                &lt;ui-tsx-demo @click="handleClick"&gt;
                &lt;div class="text-sm"&gt;这是默认插槽内容&lt;/div&gt;
                &lt;/ui-tsx-demo&gt;
              </template>
            </ui-code>
          </div>
        </div>
      </div>

      <!-- 不同主题 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          不同主题
        </div>
        <div class="demo-card">
          <div class="space-y-4">
            <div>
              <div class="mb-1 text-sm">
                Primary 主题
              </div>
              <ui-tsx-demo theme="primary" button-text="Primary按钮" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                Success 主题
              </div>
              <ui-tsx-demo theme="success" button-text="Success按钮" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                Warning 主题
              </div>
              <ui-tsx-demo theme="warning" button-text="Warning按钮" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                Danger 主题
              </div>
              <ui-tsx-demo theme="danger" button-text="Danger按钮" />
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            TSX组件支持不同的主题风格，可以通过theme属性设置。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <ui-code language="html">
              <template #code>
                &lt;ui-tsx-demo theme="primary" button-text="Primary按钮" /&gt;
                &lt;ui-tsx-demo theme="success" button-text="Success按钮" /&gt;
                &lt;ui-tsx-demo theme="warning" button-text="Warning按钮" /&gt;
                &lt;ui-tsx-demo theme="danger" button-text="Danger按钮" /&gt;
              </template>
            </ui-code>
          </div>
        </div>
      </div>

      <!-- 自定义内容 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          自定义内容
        </div>
        <div class="demo-card">
          <ui-tsx-demo
            title="自定义标题"
            content="这是自定义的内容文本，可以通过props传入"
            button-text="自定义按钮文本"
          />

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            TSX组件允许通过props自定义各种内容。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <ui-code language="html">
              <template #code>
                &lt;ui-tsx-demo
                title="自定义标题"
                content="这是自定义的内容文本，可以通过props传入"
                button-text="自定义按钮文本"
                /&gt;
              </template>
            </ui-code>
          </div>
        </div>
      </div>
    </div>

    <!-- API 说明 -->
    <div class="mt-8 space-y-4">
      <div class="text-xl font-medium">
        API
      </div>
      <div class="demo-card">
        <h3 class="mb-3 text-lg font-medium">
          属性
        </h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left">
                参数
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                类型
              </th>
              <th class="px-4 py-2 text-left">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                title
              </td>
              <td class="px-4 py-2">
                组件标题
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                TSX演示组件
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                content
              </td>
              <td class="px-4 py-2">
                组件内容
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                这是一个使用TSX编写的组件
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                button-text
              </td>
              <td class="px-4 py-2">
                按钮文本
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                点击我
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                theme
              </td>
              <td class="px-4 py-2">
                主题风格
              </td>
              <td class="px-4 py-2">
                'default' | 'primary' | 'success' | 'warning' | 'danger'
              </td>
              <td class="px-4 py-2">
                default
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-3 mt-6 text-lg font-medium">
          事件
        </h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left">
                事件名
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                click
              </td>
              <td class="px-4 py-2">
                按钮点击事件
              </td>
              <td class="px-4 py-2">
                (count: number) 点击次数
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
