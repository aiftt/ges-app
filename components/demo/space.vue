<script setup lang="ts" name="DemoSpace">
/**
 * Space 组件示例
 * 创建日期: 2025-02-27
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 示例代码
const basicCode = `<ui-space>
  <ui-button>按钮 1</ui-button>
  <ui-button type="primary">按钮 2</ui-button>
  <ui-button type="success">按钮 3</ui-button>
</ui-space>`

const directionCode = `<!-- 水平间距 -->
<ui-space direction="horizontal">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
</ui-space>

<!-- 垂直间距 -->
<ui-space direction="vertical">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
</ui-space>`

const sizeCode = `<ui-space size="small">
  <ui-button>小间距</ui-button>
  <ui-button>小间距</ui-button>
</ui-space>

<ui-space>
  <ui-button>默认间距</ui-button>
  <ui-button>默认间距</ui-button>
</ui-space>

<ui-space size="large">
  <ui-button>大间距</ui-button>
  <ui-button>大间距</ui-button>
</ui-space>

<ui-space :size="24">
  <ui-button>自定义间距 24px</ui-button>
  <ui-button>自定义间距 24px</ui-button>
</ui-space>`

const alignCode = `<ui-space align="start" class="h-24 bg-gray-100 dark:bg-gray-800 p-2">
  <div class="h-8 bg-white p-2 dark:bg-gray-700">矮内容</div>
  <div class="h-16 bg-white p-2 dark:bg-gray-700">高内容</div>
</ui-space>

<ui-space align="center" class="h-24 bg-gray-100 dark:bg-gray-800 p-2 mt-4">
  <div class="h-8 bg-white p-2 dark:bg-gray-700">矮内容</div>
  <div class="h-16 bg-white p-2 dark:bg-gray-700">高内容</div>
</ui-space>

<ui-space align="end" class="h-24 bg-gray-100 dark:bg-gray-800 p-2 mt-4">
  <div class="h-8 bg-white p-2 dark:bg-gray-700">矮内容</div>
  <div class="h-16 bg-white p-2 dark:bg-gray-700">高内容</div>
</ui-space>`

const wrapCode = `<ui-space wrap class="w-64 bg-gray-100 dark:bg-gray-800 p-2">
  <ui-button>按钮 1</ui-button>
  <ui-button>按钮 2</ui-button>
  <ui-button>按钮 3</ui-button>
  <ui-button>按钮 4</ui-button>
  <ui-button>按钮 5</ui-button>
  <ui-button>按钮 6</ui-button>
</ui-space>`

const splitCode = `<ui-space split>
  <span>文本 1</span>
  <span>文本 2</span>
  <span>文本 3</span>
</ui-space>`

const fillCode = `<ui-space fill>
  <ui-button>填充按钮 1</ui-button>
  <ui-button>填充按钮 2</ui-button>
  <ui-button>填充按钮 3</ui-button>
</ui-space>`
</script>

<template>
  <div class="demo-space">
    <h2 class="mb-6 text-xl font-bold">
      Space 间距组件
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      Space 组件用于在多个组件或元素之间提供统一的间距，可以水平或垂直排列元素。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的用法，为子元素之间设置相同的间距。"
      :code="basicCode"
    >
      <ui-space>
        <ui-button>按钮 1</ui-button>
        <ui-button type="primary">
          按钮 2
        </ui-button>
        <ui-button type="success">
          按钮 3
        </ui-button>
      </ui-space>
    </ui-demo>

    <!-- 间距方向 -->
    <ui-demo
      title="间距方向"
      description="通过设置 direction 属性控制间距方向，可选值为 horizontal 或 vertical。"
      :code="directionCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            水平间距：
          </p>
          <ui-space direction="horizontal">
            <ui-button>按钮 1</ui-button>
            <ui-button>按钮 2</ui-button>
            <ui-button>按钮 3</ui-button>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            垂直间距：
          </p>
          <ui-space direction="vertical">
            <ui-button>按钮 1</ui-button>
            <ui-button>按钮 2</ui-button>
            <ui-button>按钮 3</ui-button>
          </ui-space>
        </div>
      </div>
    </ui-demo>

    <!-- 间距大小 -->
    <ui-demo
      title="间距大小"
      description="通过 size 属性设置间距大小，可以是预设尺寸（small、medium、large）或数字（像素值）。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            小间距：
          </p>
          <ui-space size="small">
            <ui-button>小间距</ui-button>
            <ui-button>小间距</ui-button>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            默认间距：
          </p>
          <ui-space>
            <ui-button>默认间距</ui-button>
            <ui-button>默认间距</ui-button>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            大间距：
          </p>
          <ui-space size="large">
            <ui-button>大间距</ui-button>
            <ui-button>大间距</ui-button>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            自定义间距 24px：
          </p>
          <ui-space :size="24">
            <ui-button>自定义间距 24px</ui-button>
            <ui-button>自定义间距 24px</ui-button>
          </ui-space>
        </div>
      </div>
    </ui-demo>

    <!-- 对齐方式 -->
    <ui-demo
      title="对齐方式"
      description="通过 align 属性设置子元素在交叉轴上的对齐方式。"
      :code="alignCode"
    >
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            顶部对齐：
          </p>
          <ui-space align="start" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
            <div class="h-8 bg-white p-2 dark:bg-gray-700">
              矮内容
            </div>
            <div class="h-16 bg-white p-2 dark:bg-gray-700">
              高内容
            </div>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            居中对齐：
          </p>
          <ui-space align="center" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
            <div class="h-8 bg-white p-2 dark:bg-gray-700">
              矮内容
            </div>
            <div class="h-16 bg-white p-2 dark:bg-gray-700">
              高内容
            </div>
          </ui-space>
        </div>

        <div>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            底部对齐：
          </p>
          <ui-space align="end" class="h-24 bg-gray-100 p-2 dark:bg-gray-800">
            <div class="h-8 bg-white p-2 dark:bg-gray-700">
              矮内容
            </div>
            <div class="h-16 bg-white p-2 dark:bg-gray-700">
              高内容
            </div>
          </ui-space>
        </div>
      </div>
    </ui-demo>

    <!-- 自动换行 -->
    <ui-demo
      title="自动换行"
      description="当设置 wrap 属性为 true 时，子元素会在容器宽度不足时自动换行。"
      :code="wrapCode"
    >
      <ui-space wrap class="w-64 bg-gray-100 p-2 dark:bg-gray-800">
        <ui-button>按钮 1</ui-button>
        <ui-button>按钮 2</ui-button>
        <ui-button>按钮 3</ui-button>
        <ui-button>按钮 4</ui-button>
        <ui-button>按钮 5</ui-button>
        <ui-button>按钮 6</ui-button>
      </ui-space>
    </ui-demo>

    <!-- 分隔符 -->
    <ui-demo
      title="分隔符"
      description="通过 split 属性在子元素之间添加分隔符。"
      :code="splitCode"
    >
      <ui-space split>
        <span>文本 1</span>
        <span>文本 2</span>
        <span>文本 3</span>
      </ui-space>
    </ui-demo>

    <!-- 填充父容器 -->
    <ui-demo
      title="填充父容器"
      description="通过 fill 属性使子元素填充整个容器宽度。"
      :code="fillCode"
    >
      <ui-space fill>
        <ui-button>填充按钮 1</ui-button>
        <ui-button>填充按钮 2</ui-button>
        <ui-button>填充按钮 3</ui-button>
      </ui-space>
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
              间距方向
            </td>
            <td class="border p-2">
              'horizontal' | 'vertical'
            </td>
            <td class="border p-2">
              'horizontal'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              size
            </td>
            <td class="border p-2">
              间距大小
            </td>
            <td class="border p-2">
              'small' | 'medium' | 'large' | number | [number, number]
            </td>
            <td class="border p-2">
              'medium'
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              align
            </td>
            <td class="border p-2">
              对齐方式
            </td>
            <td class="border p-2">
              'start' | 'center' | 'end' | 'baseline'
            </td>
            <td class="border p-2">
              -
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              wrap
            </td>
            <td class="border p-2">
              是否自动换行
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              split
            </td>
            <td class="border p-2">
              分隔符
            </td>
            <td class="border p-2">
              boolean | VNode
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
          <tr>
            <td class="border p-2">
              fill
            </td>
            <td class="border p-2">
              是否填充父容器
            </td>
            <td class="border p-2">
              boolean
            </td>
            <td class="border p-2">
              false
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-space {
  padding: 1rem;
}
</style>
