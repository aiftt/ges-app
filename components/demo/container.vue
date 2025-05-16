<script setup lang="ts" name="DemoContainer">
/**
 * Container 组件示例
 * 创建日期: 2025-02-27
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 示例代码
const basicCode = `<ui-container padding="16px">
  <div>基础容器组件</div>
</ui-container>`

const widthCode = `<ui-container width="500px" border="1px solid #e5e7eb" padding="1rem">
  <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">水平项目 1</div>
  <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">水平项目 2</div>
</ui-container>`

const nestingCode = `<ui-container padding="1rem" border="1px solid #e5e7eb" radius="0.5rem">
  <h3 class="mb-4 text-lg font-medium">嵌套容器</h3>

  <ui-container
    direction="horizontal"
    padding="12px"
    background="#fff"
    border="1px dashed #cbd5e1"
    radius="4px"
  >
    <ui-container
      width="40%"
      padding="8px"
      background="#eff6ff"
      radius="4px"
    >
      <div>左侧区域</div>
    </ui-container>

    <ui-container
      width="60%"
      padding="8px"
      background="#f0fdf4"
      radius="4px"
    >
      <div>右侧区域</div>
    </ui-container>
  </ui-container>
</ui-container>`

const styleCode = `<ui-container
  padding="20px"
  background="#f0f9ff"
  border="1px solid #38bdf8"
  radius="8px"
  shadow="md"
>
  <div>样式定制容器</div>
</ui-container>`

const overflowCode = `<ui-container
  height="100px"
  padding="16px"
  overflow="auto"
  border="1px solid #ddd"
  radius="4px"
>
  <div>
    <p>这是一个内容溢出的例子。</p>
    <p>当内容超出容器高度时会出现滚动条。</p>
    <p>你可以尝试滚动查看全部内容。</p>
    <p>这是更多的内容...</p>
    <p>再多一些内容...</p>
    <p>最后一行内容。</p>
  </div>
</ui-container>`

const horizontalCode = `<ui-container
  direction="horizontal"
  padding="16px"
>
  <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
    水平项目 1
  </div>
  <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
    水平项目 2
  </div>
</ui-container>`
</script>

<template>
  <div class="demo-container">
    <h2 class="mb-6 text-xl font-bold">
      Container 容器组件
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      Container 容器组件用于布局包裹，提供灵活的布局和样式控制能力。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最简单的容器组件，可以包裹任何内容。"
      :code="basicCode"
    >
      <ui-container padding="16px" border="1px dashed #ddd" radius="4px">
        <div>基础容器组件</div>
      </ui-container>
    </ui-demo>

    <!-- 宽度设置 -->
    <ui-demo
      title="宽度设置"
      description="通过 width 属性设置容器的宽度。"
      :code="widthCode"
    >
      <ui-container width="500px" border="1px solid #e5e7eb" padding="1rem">
        <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
          水平项目 1
        </div>
        <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
          水平项目 2
        </div>
      </ui-container>
    </ui-demo>

    <!-- 样式定制 -->
    <ui-demo
      title="样式定制"
      description="容器组件支持样式定制，如背景色、边框、圆角和阴影等。"
      :code="styleCode"
    >
      <ui-container
        padding="20px"
        background="#f0f9ff"
        border="1px solid #38bdf8"
        radius="8px"
        shadow="md"
      >
        <div>样式定制容器</div>
      </ui-container>
    </ui-demo>

    <!-- 溢出处理 -->
    <ui-demo
      title="溢出处理"
      description="通过 overflow 属性控制内容溢出时的处理方式。"
      :code="overflowCode"
    >
      <ui-container
        height="100px"
        padding="16px"
        overflow="auto"
        border="1px solid #ddd"
        radius="4px"
      >
        <div>
          <p>这是一个内容溢出的例子。</p>
          <p>当内容超出容器高度时会出现滚动条。</p>
          <p>你可以尝试滚动查看全部内容。</p>
          <p>这是更多的内容...</p>
          <p>再多一些内容...</p>
          <p>最后一行内容。</p>
        </div>
      </ui-container>
    </ui-demo>

    <!-- 水平布局 -->
    <ui-demo
      title="水平布局"
      description="通过 direction 属性设置为 horizontal 实现水平布局。"
      :code="horizontalCode"
    >
      <ui-container
        direction="horizontal"
        padding="16px"
        border="1px solid #e5e7eb"
        radius="4px"
      >
        <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
          水平项目 1
        </div>
        <div class="m-2 bg-gray-100 p-4 dark:bg-gray-800">
          水平项目 2
        </div>
      </ui-container>
    </ui-demo>

    <!-- 嵌套容器 -->
    <ui-demo
      title="嵌套容器"
      description="容器组件可以嵌套使用，实现复杂的布局结构。"
      :code="nestingCode"
    >
      <ui-container padding="1rem" border="1px solid #e5e7eb" radius="0.5rem">
        <h3 class="mb-4 text-lg font-medium">
          嵌套容器
        </h3>

        <ui-container
          direction="horizontal"
          padding="12px"
          background="#fff"
          border="1px dashed #cbd5e1"
          radius="4px"
        >
          <ui-container
            width="40%"
            padding="8px"
            background="#eff6ff"
            radius="4px"
          >
            <div>左侧区域</div>
          </ui-container>

          <ui-container
            width="60%"
            padding="8px"
            background="#f0fdf4"
            radius="4px"
          >
            <div>右侧区域</div>
          </ui-container>
        </ui-container>
      </ui-container>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border rounded bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        API 参考
      </h3>

      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2 text-left">
              属性
            </th>
            <th class="border p-2 text-left">
              说明
            </th>
            <th class="border p-2 text-left">
              类型
            </th>
            <th class="border p-2 text-left">
              默认值
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">
              direction
            </td>
            <td class="border p-2">
              布局方向
            </td>
            <td class="border p-2">
              'vertical' | 'horizontal'
            </td>
            <td class="border p-2">
              'vertical'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              width
            </td>
            <td class="border p-2">
              容器宽度
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              height
            </td>
            <td class="border p-2">
              容器高度
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              padding
            </td>
            <td class="border p-2">
              内边距
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              margin
            </td>
            <td class="border p-2">
              外边距
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              background
            </td>
            <td class="border p-2">
              背景颜色
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              border
            </td>
            <td class="border p-2">
              边框样式
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              radius
            </td>
            <td class="border p-2">
              边框圆角
            </td>
            <td class="border p-2">
              string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              shadow
            </td>
            <td class="border p-2">
              阴影样式
            </td>
            <td class="border p-2">
              'sm' | 'md' | 'lg' | 'xl' | string
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              overflow
            </td>
            <td class="border p-2">
              溢出处理
            </td>
            <td class="border p-2">
              'visible' | 'hidden' | 'scroll' | 'auto'
            </td>
            <td class="border p-2">
              'visible'
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 1rem;
}
</style>
