<script setup lang="ts" name="DemoAffix">
/**
 * Affix 组件演示
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

const affixed = ref(false)
const demoBlockRef = ref<HTMLElement | null>(null)

function handleChange(val: boolean) {
  affixed.value = val
}

// 代码示例
const basicCode = `<ui-affix :offset-top="80" @change="handleChange">
  <ui-button type="primary">
    固定在距离顶部 80px 的位置
  </ui-button>
</ui-affix>
<div>
  当前状态: {{ affixed ? '固定' : '未固定' }}
</div>

<script setup>
import { ref } from 'vue'

const affixed = ref(false)

function handleChange(val) {
  affixed.value = val
}
<\/script>`

const bottomCode = `<ui-affix :offset-bottom="20">
  <ui-button type="primary">
    固定在距离底部 20px 的位置
  </ui-button>
</ui-affix>`

const callbackCode = `<ui-affix :offset-top="120" @change="handleChange">
  <ui-button>
    <template v-if="affixed">
      固定中
    </template>
    <template v-else>
      未固定
    </template>
  </ui-button>
</ui-affix>

<script setup>
import { ref } from 'vue'

const affixed = ref(false)

function handleChange(val) {
  affixed.value = val
}
<\/script>`

const containerCode = `<div ref="demoBlockRef" style="height: 100px; overflow: auto; border: 1px solid #e8e8e8; padding: 10px;">
  <div style="height: 400px; padding-top: 60px;">
    <ui-affix :target="() => demoBlockRef" :offset-top="10">
      <ui-button type="primary">
        固定在容器内距离顶部 10px 的位置
      </ui-button>
    </ui-affix>
  </div>
</div>

<script setup>
import { ref } from 'vue'

const demoBlockRef = ref(null)
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Affix 固钉
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      将页面元素钉在可视范围内，常用于导航栏、返回顶部按钮等需要在页面滚动时保持可见的元素。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最简单的用法，当页面滚动到一定位置时，元素会固定在页面顶部。"
      :code="basicCode"
    >
      <ui-affix :offset-top="80" @change="handleChange">
        <ui-button type="primary">
          固定在距离顶部 80px 的位置
        </ui-button>
      </ui-affix>
      <div class="mt-2 text-gray-600 dark:text-gray-400">
        当前状态: {{ affixed ? '固定' : '未固定' }}
      </div>
    </ui-demo>

    <!-- 底部固定 -->
    <ui-demo
      title="底部固定"
      description="当页面滚动到底部时，元素会固定在页面底部。"
      :code="bottomCode"
    >
      <ui-affix :offset-bottom="20">
        <ui-button type="primary">
          固定在距离底部 20px 的位置
        </ui-button>
      </ui-affix>
    </ui-demo>

    <!-- 固定状态改变的回调 -->
    <ui-demo
      title="固定状态改变的回调"
      description="可以监听固定状态的改变，并做相应处理。"
      :code="callbackCode"
    >
      <ui-affix :offset-top="120" @change="handleChange">
        <ui-button>
          <template v-if="affixed">
            固定中
          </template>
          <template v-else>
            未固定
          </template>
        </ui-button>
      </ui-affix>
    </ui-demo>

    <!-- 指定容器 -->
    <ui-demo
      title="指定容器"
      description="使用target属性设置Affix需要监听其滚动事件的元素，适用于在特定容器内滚动的场景。"
      :code="containerCode"
    >
      <div ref="demoBlockRef" class="h-[100px] overflow-auto border border-gray-200 rounded-md p-4 dark:border-gray-700">
        <div class="h-[400px] pt-[60px]">
          <ui-affix :target="() => demoBlockRef as HTMLElement" :offset-top="10">
            <ui-button type="primary">
              固定在容器内距离顶部 10px 的位置
            </ui-button>
          </ui-affix>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <h4 class="mb-2 text-lg font-medium">
        属性
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性名
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
                offset-top
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                距离窗口顶部达到指定偏移量后触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                0
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                offset-bottom
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                距离窗口底部达到指定偏移量后触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                -
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                target
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                设置 Affix 需要监听其滚动事件的元素
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                () => HTMLElement
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                () => window
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                z-index
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                设置 z-index
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                number
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                100
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                disabled
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否禁用
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h4>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                说明
              </th>
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                change
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                固定状态改变时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (affixed: boolean) => void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  &-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  &-section {
    margin-bottom: 40px;
  }

  &-block {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }

  &-status {
    margin-top: 10px;
    color: #666;
  }
}

h2 {
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

h3 {
  margin: 20px 0 10px;
}

h4 {
  margin: 15px 0 10px;
}

code {
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 2px 4px;
  font-family: monospace;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}
</style>
