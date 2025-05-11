<script setup lang="ts" name="DemoBackTop">
/**
 * BackTop 回到顶部组件演示
 * 创建日期: 2024-08-25
 * 作者: aiftt
 * 更新日期: 2024-08-25 - 初始实现
 */
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">
      BackTop 回到顶部
    </h2>
    <p class="mb-6 text-gray-500">
      返回页面顶部的操作按钮，当页面内容较长时，滚动到一定高度会显示回到顶部按钮。
    </p>

    <!-- 基础用法 -->
    <div class="mb-10">
      <h3 class="mb-4 text-lg font-semibold">
        基础用法
      </h3>
      <div class="border border-gray-300 rounded-lg bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          向下滚动页面，右下角会出现回到顶部的按钮。
        </p>
        <div id="scroll-target" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
          <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800">
            这是第 {{ i }} 行内容，请滚动查看更多内容。
          </div>
        </div>
        <ui-back-top :bottom="120" target="#scroll-target" :visibility-height="100" />
      </div>
      <div class="mt-4 rounded bg-gray-50 p-4 dark:bg-gray-900">
        <pre class="overflow-auto text-sm"><code>&lt;ui-back-top :bottom="120" target="#scroll-target" :visibility-height="100" /&gt;</code></pre>
      </div>
    </div>

    <!-- 定制样式 -->
    <div class="mb-10">
      <h3 class="mb-4 text-lg font-semibold">
        自定义样式
      </h3>
      <div class="border border-gray-300 rounded-lg bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          可以自定义按钮的样式、位置和图标。
        </p>
        <div id="scroll-target-2" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
          <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800">
            这是第 {{ i }} 行自定义样式的内容。
          </div>
        </div>
        <ui-back-top
          target="#scroll-target-2"
          :visibility-height="50"
          :right="20"
          :bottom="20"
          icon="carbon:rocket"
          size="small"
          :custom-style="{ backgroundColor: 'var(--ui-color-primary)', color: '#fff' }"
        />
      </div>
      <div class="mt-4 rounded bg-gray-50 p-4 dark:bg-gray-900">
        <pre class="overflow-auto text-sm"><code>&lt;ui-back-top
  target="#scroll-target-2"
  :visibility-height="50"
  :right="20"
  :bottom="20"
  icon="carbon:rocket"
  size="small"
  :custom-style="{ backgroundColor: 'var(--ui-color-primary)', color: '#fff' }"
/&gt;</code></pre>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="mb-10">
      <h3 class="mb-4 text-lg font-semibold">
        不同尺寸
      </h3>
      <div class="border border-gray-300 rounded-lg bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          提供三种尺寸：small、default、large。
        </p>
        <div class="my-4 flex gap-8">
          <div class="text-center">
            <div class="ui-back-top--small mx-auto mb-2 flex items-center justify-center" style="position: relative;">
              <ui-icon icon="carbon:arrow-up" />
            </div>
            <span class="text-sm">small</span>
          </div>
          <div class="text-center">
            <div class="ui-back-top--default mx-auto mb-2 flex items-center justify-center" style="position: relative;">
              <ui-icon icon="carbon:arrow-up" />
            </div>
            <span class="text-sm">default</span>
          </div>
          <div class="text-center">
            <div class="ui-back-top--large mx-auto mb-2 flex items-center justify-center" style="position: relative;">
              <ui-icon icon="carbon:arrow-up" />
            </div>
            <span class="text-sm">large</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义内容 -->
    <div class="mb-10">
      <h3 class="mb-4 text-lg font-semibold">
        自定义内容
      </h3>
      <div class="border border-gray-300 rounded-lg bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          使用插槽自定义按钮内容。
        </p>
        <div id="scroll-target-3" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
          <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800">
            这是第 {{ i }} 行带自定义内容的演示。
          </div>
        </div>
        <ui-back-top target="#scroll-target-3" :visibility-height="50" :right="80" :bottom="120">
          <div class="flex flex-col items-center justify-center">
            <ui-icon icon="carbon:arrow-up" />
            <span class="mt-1 text-xs">顶部</span>
          </div>
        </ui-back-top>
      </div>
      <div class="mt-4 rounded bg-gray-50 p-4 dark:bg-gray-900">
        <pre class="overflow-auto text-sm"><code>&lt;ui-back-top target="#scroll-target-3" :visibility-height="50"&gt;
  &lt;div class="flex flex-col items-center justify-center"&gt;
    &lt;ui-icon icon="carbon:arrow-up" /&gt;
    &lt;span class="text-xs mt-1"&gt;顶部&lt;/span&gt;
  &lt;/div&gt;
&lt;/ui-back-top&gt;</code></pre>
      </div>
    </div>

    <!-- API 说明 -->
    <div>
      <h3 class="mb-4 mt-8 text-xl font-semibold">
        API 参考
      </h3>

      <h4 class="mb-3 mt-6 text-lg font-medium">
        属性
      </h4>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                属性名
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                说明
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                类型
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                visibilityHeight
              </td>
              <td class="px-4 py-2">
                滚动高度达到此值才出现回到顶部按钮
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                200
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                right
              </td>
              <td class="px-4 py-2">
                距离页面右侧的距离
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                40
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                bottom
              </td>
              <td class="px-4 py-2">
                距离页面底部的距离
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                40
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                target
              </td>
              <td class="px-4 py-2">
                触发滚动的对象
              </td>
              <td class="px-4 py-2">
                string | HTMLElement
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                duration
              </td>
              <td class="px-4 py-2">
                回到顶部的动画持续时间
              </td>
              <td class="px-4 py-2">
                number
              </td>
              <td class="px-4 py-2">
                300
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                icon
              </td>
              <td class="px-4 py-2">
                自定义图标
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                carbon:arrow-up
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                size
              </td>
              <td class="px-4 py-2">
                组件大小
              </td>
              <td class="px-4 py-2">
                small | default | large
              </td>
              <td class="px-4 py-2">
                default
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                customStyle
              </td>
              <td class="px-4 py-2">
                自定义样式
              </td>
              <td class="px-4 py-2">
                Record&lt;string, string&gt;
              </td>
              <td class="px-4 py-2">
                {}
              </td>
            </tr>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                customClass
              </td>
              <td class="px-4 py-2">
                自定义类名
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                ''
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-3 mt-6 text-lg font-medium">
        事件
      </h4>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                事件名
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                说明
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                click
              </td>
              <td class="px-4 py-2">
                点击按钮触发的事件
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-3 mt-6 text-lg font-medium">
        插槽
      </h4>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                插槽名
              </th>
              <th class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="px-4 py-2">
                default
              </td>
              <td class="px-4 py-2">
                自定义回到顶部按钮的内容
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-back-top--small,
.ui-back-top--default,
.ui-back-top--large {
  border-radius: 50%;
  background-color: var(--ui-back-top-bg, rgba(255, 255, 255, 0.9));
  box-shadow: var(--ui-back-top-shadow, 0 2px 8px 0 rgba(0, 0, 0, 0.12));
  color: var(--ui-back-top-color, #409eff);
}

.dark .ui-back-top--small,
.dark .ui-back-top--default,
.dark .ui-back-top--large {
  --ui-back-top-bg: rgba(40, 40, 40, 0.9);
  --ui-back-top-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  --ui-back-top-color: #a0cfff;
}

.ui-back-top--small {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.ui-back-top--default {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.ui-back-top--large {
  width: 56px;
  height: 56px;
  font-size: 24px;
}
</style>
