<script setup lang="ts" name="DemoBackTop">
/**
 * BackTop 回到顶部组件演示
 * 创建日期: 2024-08-25
 * 作者: aiftt
 * 更新日期: 2024-08-25 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

// 示例代码字符串
const basicCode = `<template>
  <div id="scroll-target" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4" style="height: 200px;">
    <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2">
      这是第 \{{ i }} 行内容，请滚动查看更多内容。
    </div>
  </div>

  <ui-back-top :bottom="120" target="#scroll-target" :visibility-height="100" />
</template>

<script setup>
// 无需额外的代码
<\/script>`

const customStyleCode = `<template>
  <div id="scroll-target-2" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4" style="height: 200px;">
    <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2">
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
</template>

<script setup>
// 无需额外的代码
<\/script>`

const sizesCode = `<template>
  <div class="flex gap-8">
    <div class="text-center">
      <div class="ui-back-top--small mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full shadow-md">
        <ui-icon icon="carbon:arrow-up" />
      </div>
      <span class="text-sm">small</span>
    </div>
    <div class="text-center">
      <div class="ui-back-top--default mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full shadow-md">
        <ui-icon icon="carbon:arrow-up" />
      </div>
      <span class="text-sm">default</span>
    </div>
    <div class="text-center">
      <div class="ui-back-top--large mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full shadow-md">
        <ui-icon icon="carbon:arrow-up" />
      </div>
      <span class="text-sm">large</span>
    </div>
  </div>
</template>

<style scoped>
.ui-back-top--small,
.ui-back-top--default,
.ui-back-top--large {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  color: #409eff;
}

.dark .ui-back-top--small,
.dark .ui-back-top--default,
.dark .ui-back-top--large {
  background-color: rgba(40, 40, 40, 0.9);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  color: #a0cfff;
}
</style>`

const customContentCode = `<template>
  <div id="scroll-target-3" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4" style="height: 200px;">
    <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2">
      这是第 {{ i }} 行带自定义内容的演示。
    </div>
  </div>

  <ui-back-top target="#scroll-target-3" :visibility-height="50" :right="80" :bottom="120">
    <div class="flex flex-col items-center justify-center">
      <ui-icon icon="carbon:arrow-up" />
      <span class="mt-1 text-xs">顶部</span>
    </div>
  </ui-back-top>
</template>

<script setup>
// 无需额外的代码
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      BackTop 回到顶部
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      返回页面顶部的操作按钮，当页面内容较长时，滚动到一定高度会显示回到顶部按钮。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="向下滚动容器，右下角会出现回到顶部的按钮。当滚动高度超过设定值时按钮才会显示。"
      :code="basicCode"
    >
      <div id="scroll-target" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
        <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800 dark:text-gray-300">
          这是第 {{ i }} 行内容，请滚动查看更多内容。
        </div>
      </div>
      <ui-back-top :bottom="120" target="#scroll-target" :visibility-height="100" />
    </ui-demo>

    <!-- 定制样式 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义按钮的样式、位置和图标，满足不同场景的需求。"
      :code="customStyleCode"
    >
      <div id="scroll-target-2" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
        <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800 dark:text-gray-300">
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
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="BackTop 组件提供 small、default、large 三种尺寸，适应不同场景需求。"
      :code="sizesCode"
    >
      <div class="my-4 flex gap-8">
        <div class="text-center">
          <div class="ui-back-top--small mx-auto mb-2 flex items-center justify-center" style="position: relative;">
            <ui-icon icon="carbon:arrow-up" />
          </div>
          <span class="text-sm dark:text-gray-300">small</span>
        </div>
        <div class="text-center">
          <div class="ui-back-top--default mx-auto mb-2 flex items-center justify-center" style="position: relative;">
            <ui-icon icon="carbon:arrow-up" />
          </div>
          <span class="text-sm dark:text-gray-300">default</span>
        </div>
        <div class="text-center">
          <div class="ui-back-top--large mx-auto mb-2 flex items-center justify-center" style="position: relative;">
            <ui-icon icon="carbon:arrow-up" />
          </div>
          <span class="text-sm dark:text-gray-300">large</span>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义内容 -->
    <ui-demo
      title="自定义内容"
      description="通过默认插槽可以自定义按钮内容，实现更多的个性化需求。"
      :code="customContentCode"
    >
      <div id="scroll-target-3" class="h-200 overflow-y-auto border border-gray-200 rounded-lg p-4 dark:border-gray-700" style="height: 200px;">
        <div v-for="i in 20" :key="i" class="border-b border-gray-100 py-2 dark:border-gray-800 dark:text-gray-300">
          这是第 {{ i }} 行带自定义内容的演示。
        </div>
      </div>
      <ui-back-top target="#scroll-target-3" :visibility-height="50" :right="80" :bottom="120">
        <div class="flex flex-col items-center justify-center">
          <ui-icon icon="carbon:arrow-up" />
          <span class="mt-1 text-xs">顶部</span>
        </div>
      </ui-back-top>
    </ui-demo>

    <!-- API 参考 -->
    <ui-demo
      title="API 参考"
      description="BackTop 组件的属性、事件和插槽。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                visibilityHeight
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                滚动高度达到此值才出现回到顶部按钮
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                200
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                right
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                距离页面右侧的距离
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                40
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                bottom
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                距离页面底部的距离
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                40
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                target
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                触发滚动的对象
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | HTMLElement
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                duration
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                回到顶部的动画持续时间
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                300
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                icon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                carbon:arrow-up
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                组件大小
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                small | default | large
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                default
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                customStyle
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义样式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                Record&lt;string, string&gt;
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                {}
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                customClass
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义类名
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                click
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击按钮触发的事件
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        插槽
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                插槽名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                default
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义回到顶部按钮的内容
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
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
