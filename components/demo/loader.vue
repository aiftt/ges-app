<script setup lang="ts" name="DemoLoader">
/**
 * 加载器组件演示
 * 创建日期: 2024-12-04
 * 作者: Claude
 * 更新日期: 2024-12-07 - 添加更多加载器类型支持
 * 更新日期: 2024-12-08 - 增加CSS Loaders支持
 * 更新日期: 2024-12-11 - 添加6种新加载器类型
 * 更新日期: 2024-06-15 - 使用ui-demo组件重构演示页面
 */

// 多边形类型的加载器
const polyTypes = Array.from({ length: 12 }, (_, i) => i + 1)

// 旋转类型的加载器
const spinnerTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 圆点类型的加载器
const dotsTypes = Array.from({ length: 8 }, (_, i) => i + 1)

// 条形类型的加载器
const barsTypes = Array.from({ length: 6 }, (_, i) => i + 1)

// 环形类型的加载器
const ringTypes = Array.from({ length: 6 }, (_, i) => i + 1)

// 波浪类型的加载器
const waveTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 经典类型的加载器
const classicTypes = Array.from({ length: 10 }, (_, i) => i + 1)

// 点击复制代码
function copyCode(type: string) {
  const code = `<ui-loader type="${type}" />`
  navigator.clipboard.writeText(code)
    .then(() => {
      // 使用toast通知代替alert
      const toast = document.createElement('div')
      toast.style.position = 'fixed'
      toast.style.bottom = '20px'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
      toast.style.padding = '10px 16px'
      toast.style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
      toast.style.color = '#fff'
      toast.style.borderRadius = '4px'
      toast.style.zIndex = '9999'
      toast.style.fontWeight = '500'
      toast.textContent = `已复制：${code}`

      document.body.appendChild(toast)

      setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transition = 'opacity 0.3s'
        setTimeout(() => {
          document.body.removeChild(toast)
        }, 300)
      }, 2000)
    })
    .catch((err) => {
      console.error('复制失败:', err)
    })
}

// 示例代码
const basicExampleCode = `<!-- 基础加载器示例 -->
<ui-loader /> <!-- 默认类型 -->
<ui-loader type="2" /> <!-- 类型2 -->
<ui-loader type="3" /> <!-- 类型3 -->

<!-- 旋转类型 -->
<ui-loader type="spinner-1" />
<ui-loader type="spinner-2" />

<!-- 圆点类型 -->
<ui-loader type="dots-1" />
<ui-loader type="dots-2" />

<!-- 条形类型 -->
<ui-loader type="bars-1" />
<ui-loader type="bars-2" />`

const sizeExampleCode = `<!-- 不同尺寸的加载器 -->
<ui-loader type="spinner-3" size="24px" /> <!-- 小尺寸 -->
<ui-loader type="spinner-3" /> <!-- 默认尺寸 -->
<ui-loader type="spinner-3" size="64px" /> <!-- 大尺寸 -->
<ui-loader type="spinner-3" size="128px" /> <!-- 超大尺寸 -->`

const colorExampleCode = `<!-- 自定义颜色的加载器 -->
<ui-loader type="spinner-3" color="#ff4d4f" />
<ui-loader type="dots-5" color="#52c41a" />
<ui-loader type="bars-2" color="rgba(24, 144, 255, 0.7)" />
<ui-loader type="ring-4" color="#722ed1" />`

const customExampleCode = `<!-- 带文字的加载器 -->
<ui-loader type="ring-4" size="100px">
  <div class="mt-4 text-sm text-gray-600">
    加载中...
  </div>
</ui-loader>

<!-- 带图标和文字的加载器 -->
<ui-loader type="classic-6" size="120px">
  <div class="mt-2 flex flex-col items-center">
    <ui-icon icon="carbon:document" class="text-2xl mb-2" />
    <div class="text-sm text-gray-600">
      正在加载文件...
    </div>
  </div>
</ui-loader>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Loader 加载器
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      提供多种风格的加载动画，适用于各种加载场景，支持自定义尺寸、颜色和内容。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="加载器组件提供多种类型，可通过type属性指定不同的样式。"
      :code="basicExampleCode"
    >
      <div class="mb-6">
        <h3 class="mb-4 text-lg font-medium">
          多边形加载器（点击可复制代码）
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in polyTypes"
            :key="`poly-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(type.toString())"
          >
            <ui-loader :type="type" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              类型 {{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="mb-4 text-lg font-medium">
          旋转类加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in spinnerTypes"
            :key="`spinner-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`spinner-${type}`)"
          >
            <ui-loader :type="`spinner-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              spinner-{{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="mb-4 text-lg font-medium">
          圆点类加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in dotsTypes.slice(0, 4)"
            :key="`dots-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`dots-${type}`)"
          >
            <ui-loader :type="`dots-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              dots-{{ type }}
            </div>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 尺寸设置 -->
    <ui-demo
      title="尺寸设置"
      description="通过 size 属性可以自定义加载器的尺寸，支持像素值。"
      :code="sizeExampleCode"
    >
      <div class="flex flex-wrap items-center gap-8">
        <div class="flex flex-col items-center">
          <ui-loader type="spinner-3" size="24px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            24px
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="spinner-3" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            默认
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="spinner-3" size="64px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            64px
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="spinner-3" size="96px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            96px
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义颜色"
      description="通过 color 属性可以自定义加载器的颜色，支持各种颜色格式。"
      :code="colorExampleCode"
    >
      <div class="flex flex-wrap items-center gap-8">
        <div class="flex flex-col items-center">
          <ui-loader type="spinner-3" color="#ff4d4f" size="48px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            红色
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="dots-5" color="#52c41a" size="48px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            绿色
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="bars-2" color="rgba(24, 144, 255, 0.7)" size="48px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            半透明蓝色
          </div>
        </div>
        <div class="flex flex-col items-center">
          <ui-loader type="ring-4" color="#722ed1" size="48px" />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            紫色
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 内容定制 -->
    <ui-demo
      title="内容定制"
      description="通过插槽可以在加载器中添加自定义内容，如文字说明或图标。"
      :code="customExampleCode"
    >
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex flex-col items-center border border-gray-200 rounded-lg p-6 dark:border-gray-700">
          <ui-loader type="ring-4" size="80px">
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              加载中...
            </div>
          </ui-loader>
          <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            带文字的加载器
          </div>
        </div>
        <div class="flex flex-col items-center border border-gray-200 rounded-lg p-6 dark:border-gray-700">
          <ui-loader type="classic-6" size="80px">
            <div class="mt-2 flex flex-col items-center">
              <ui-icon icon="carbon:document" class="mb-2 text-2xl" />
              <div class="text-sm text-gray-600 dark:text-gray-400">
                正在加载文件...
              </div>
            </div>
          </ui-loader>
          <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            带图标和文字的加载器
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 更多类型 -->
    <div class="mb-4 mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 class="mb-6 text-xl font-bold">
        更多加载器类型
      </h2>
      <p class="mb-6 text-gray-500 dark:text-gray-400">
        以下是更多可用的加载器类型，点击可复制对应的代码。
      </p>

      <div class="mb-8">
        <h3 class="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">
          条形加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in barsTypes"
            :key="`bars-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`bars-${type}`)"
          >
            <ui-loader :type="`bars-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              bars-{{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">
          环形加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in ringTypes"
            :key="`ring-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`ring-${type}`)"
          >
            <ui-loader :type="`ring-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              ring-{{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">
          波浪加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in waveTypes"
            :key="`wave-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`wave-${type}`)"
          >
            <ui-loader :type="`wave-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              wave-{{ type }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="mb-4 border-b border-gray-200 pb-2 text-lg font-medium dark:border-gray-700">
          经典加载器
        </h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          <div
            v-for="type in classicTypes.slice(0, 5)"
            :key="`classic-${type}`"
            class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-4 transition-all duration-300 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 dark:hover:bg-blue-900/30"
            @click="copyCode(`classic-${type}`)"
          >
            <ui-loader :type="`classic-${type}`" />
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              classic-{{ type }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        Props
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                类型
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                默认值
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string | number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                1
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                加载器类型，支持数字或预设类型名称
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                size
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string | number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                '40px'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                加载器尺寸，支持CSS尺寸值
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                string
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                当前主题颜色
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                加载器颜色，支持各种颜色格式
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        插槽
      </h3>
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
                自定义加载器的附加内容，如文字说明或图标
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader-demo {
  padding: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 30px 0 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.loaders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

.loader-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e6f7ff;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.loader-type {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.usage-examples,
.slot-examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.example-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
}

.example-description {
  margin-top: 20px;
  width: 100%;
  text-align: center;

  div {
    margin-bottom: 5px;
    font-weight: bold;
  }

  code {
    display: block;
    background-color: #f0f2f5;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    text-align: left;
    white-space: pre;
    overflow-x: auto;
  }
}

.loader-text {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  .loader-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .loader-text {
    margin-top: 5px;
  }
}
</style>
