<script setup lang="ts" name="DemoTour">
/**
 * 漫游式引导组件示例页面
 * 创建日期: 2024-07-31
 * 作者: aiftt
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 定义 Tour 组件实例接口
interface TourInstance {
  start: () => void
  next: () => void
  prev: () => void
  close: () => void
}

// 定义 Tour 步骤的 placement 类型
type TourPlacement = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const logger = useLogger('tour-demo')

// 基础引导示例
const showBasicTour = ref(false)
const basicTourSteps = [
  {
    target: '#basic-tour-step1',
    title: '欢迎使用引导',
    content: '这是一个简单的引导示例，点击下一步继续。',
  },
  {
    target: '#basic-tour-step2',
    title: '第二步',
    content: '这是第二个引导步骤，展示了按钮的用法。',
  },
  {
    target: '#basic-tour-step3',
    title: '最后一步',
    content: '这是最后一步，点击完成结束引导。',
  },
]

// 自定义位置引导
const showPlacementTour = ref(false)
const placementTourSteps = [
  {
    target: '#placement-top',
    title: '顶部提示',
    content: '这个提示框将显示在目标元素的顶部。',
    placement: 'top' as TourPlacement,
  },
  {
    target: '#placement-right',
    title: '右侧提示',
    content: '这个提示框将显示在目标元素的右侧。',
    placement: 'right' as TourPlacement,
  },
  {
    target: '#placement-bottom',
    title: '底部提示',
    content: '这个提示框将显示在目标元素的底部。',
    placement: 'bottom' as TourPlacement,
  },
  {
    target: '#placement-left',
    title: '左侧提示',
    content: '这个提示框将显示在目标元素的左侧。',
    placement: 'left' as TourPlacement,
  },
]

// 自定义按钮文本引导
const showCustomTextTour = ref(false)
const customTextTourSteps = [
  {
    target: '#custom-text-target',
    title: '自定义按钮文本',
    content: '这个示例展示如何自定义引导步骤的按钮文本。',
    nextText: '继续',
    skipText: '不再显示',
  },
  {
    target: '#custom-text-target',
    title: '最终步骤',
    content: '点击完成按钮结束引导。',
    prevText: '返回',
    doneText: '我知道了',
  },
]

// 可编程控制引导
const tourRef = ref<TourInstance | null>(null)
const programmaticTourSteps = [
  {
    target: '#programmatic-step1',
    title: '可编程控制',
    content: '这个引导可以通过按钮手动控制。',
  },
  {
    target: '#programmatic-step2',
    title: '第二步',
    content: '你可以使用下面的按钮切换步骤。',
  },
  {
    target: '#programmatic-step3',
    title: '最后一步',
    content: '这是可编程引导的最后一步。',
  },
]

// 启动可编程引导
function startProgrammaticTour() {
  if (tourRef.value) {
    tourRef.value.start()
  }
}

// 点击下一步
function nextStep() {
  if (tourRef.value) {
    tourRef.value.next()
  }
}

// 点击上一步
function prevStep() {
  if (tourRef.value) {
    tourRef.value.prev()
  }
}

// 关闭引导
function closeTour() {
  if (tourRef.value) {
    tourRef.value.close()
  }
}

// 处理引导事件
function handleTourChange(step: number) {
  logger.info('当前步骤:', step)
}

function handleTourFinish() {
  logger.info('引导完成')
}

function handleTourSkip() {
  logger.info('引导被跳过')
}
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold">
      漫游式引导 (Tour)
    </h1>

    <div class="space-y-12">
      <!-- 基础用法 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          基础用法
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="space-y-4">
            <div id="basic-tour-step1" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第一步目标元素
            </div>

            <div id="basic-tour-step2" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第二步目标元素
            </div>

            <div id="basic-tour-step3" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第三步目标元素
            </div>

            <button
              class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              @click="showBasicTour = true"
            >
              开始基础引导
            </button>
          </div>

          <ui-tour
            v-model="showBasicTour"
            :steps="basicTourSteps"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tour
  v-model="showBasicTour"
  :steps="basicTourSteps"
/>

const basicTourSteps = [
  {
    target: '#basic-tour-step1',
    title: '欢迎使用引导',
    content: '这是一个简单的引导示例，点击下一步继续。'
  },
  {
    target: '#basic-tour-step2',
    title: '第二步',
    content: '这是第二个引导步骤，展示了按钮的用法。'
  },
  {
    target: '#basic-tour-step3',
    title: '最后一步',
    content: '这是最后一步，点击完成结束引导。'
  }
]` }}</code></pre>
        </div>
      </section>

      <!-- 自定义位置 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义提示位置
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="grid grid-cols-2 mb-4 justify-items-center gap-4">
            <div id="placement-top" class="w-full border border-gray-200 rounded p-4 text-center dark:border-gray-700">
              顶部 (top)
            </div>

            <div id="placement-right" class="w-full border border-gray-200 rounded p-4 text-center dark:border-gray-700">
              右侧 (right)
            </div>

            <div id="placement-bottom" class="w-full border border-gray-200 rounded p-4 text-center dark:border-gray-700">
              底部 (bottom)
            </div>

            <div id="placement-left" class="w-full border border-gray-200 rounded p-4 text-center dark:border-gray-700">
              左侧 (left)
            </div>
          </div>

          <div class="text-center">
            <button
              class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              @click="showPlacementTour = true"
            >
              开始位置引导
            </button>
          </div>

          <ui-tour
            v-model="showPlacementTour"
            :steps="placementTourSteps"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tour
  v-model="showPlacementTour"
  :steps="placementTourSteps"
/>

const placementTourSteps = [
  {
    target: '#placement-top',
    title: '顶部提示',
    content: '这个提示框将显示在目标元素的顶部。',
    placement: 'top'
  },
  {
    target: '#placement-right',
    title: '右侧提示',
    content: '这个提示框将显示在目标元素的右侧。',
    placement: 'right'
  },
  // ...更多位置
]` }}</code></pre>
        </div>
      </section>

      <!-- 自定义按钮文本 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          自定义按钮文本
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div id="custom-text-target" class="mb-4 border border-gray-200 rounded p-4 dark:border-gray-700">
            自定义按钮文本目标
          </div>

          <button
            class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
            @click="showCustomTextTour = true"
          >
            开始自定义文本引导
          </button>

          <ui-tour
            v-model="showCustomTextTour"
            :steps="customTextTourSteps"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tour
  v-model="showCustomTextTour"
  :steps="customTextTourSteps"
/>

const customTextTourSteps = [
  {
    target: '#custom-text-target',
    title: '自定义按钮文本',
    content: '这个示例展示如何自定义引导步骤的按钮文本。',
    nextText: '继续',
    skipText: '不再显示'
  },
  {
    target: '#custom-text-target',
    title: '最终步骤',
    content: '点击完成按钮结束引导。',
    prevText: '返回',
    doneText: '我知道了'
  }
]` }}</code></pre>
        </div>
      </section>

      <!-- 可编程控制 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          可编程控制
        </h2>
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div class="mb-4 space-y-4">
            <div id="programmatic-step1" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第一步目标
            </div>

            <div id="programmatic-step2" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第二步目标
            </div>

            <div id="programmatic-step3" class="border border-gray-200 rounded p-4 dark:border-gray-700">
              第三步目标
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              class="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              @click="startProgrammaticTour"
            >
              开始引导
            </button>

            <button
              class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              @click="nextStep"
            >
              下一步
            </button>

            <button
              class="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              @click="prevStep"
            >
              上一步
            </button>

            <button
              class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              @click="closeTour"
            >
              关闭引导
            </button>
          </div>

          <ui-tour
            ref="tourRef"
            :steps="programmaticTourSteps"
            @change="handleTourChange"
            @finish="handleTourFinish"
            @skip="handleTourSkip"
          />
        </div>

        <div class="mt-6 rounded bg-gray-100 p-4 dark:bg-gray-700">
          <pre class="overflow-auto text-sm"><code>{{ `<ui-tour
  ref="tourRef"
  :steps="programmaticTourSteps"
  @change="handleTourChange"
  @finish="handleTourFinish"
  @skip="handleTourSkip"
/>

// 启动可编程引导
function startProgrammaticTour() {
  if (tourRef.value) {
    tourRef.value.start()
  }
}

// 点击下一步
function nextStep() {
  if (tourRef.value) {
    tourRef.value.next()
  }
}

// 更多控制函数...` }}</code></pre>
        </div>
      </section>

      <!-- API文档 -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">
          API
        </h2>

        <h3 class="mb-2 mt-4 text-lg font-medium">
          Props
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                默认值
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                modelValue / v-model
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否显示引导
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                steps
              </td>
              <td class="border-b px-4 py-2">
                Array
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
              <td class="border-b px-4 py-2">
                引导步骤配置
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                maskColor
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                #000
              </td>
              <td class="border-b px-4 py-2">
                遮罩颜色
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                maskOpacity
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                0.5
              </td>
              <td class="border-b px-4 py-2">
                遮罩透明度
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                currentStep
              </td>
              <td class="border-b px-4 py-2">
                number
              </td>
              <td class="border-b px-4 py-2">
                0
              </td>
              <td class="border-b px-4 py-2">
                当前步骤索引
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                autoStart
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                是否自动开始
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                arrow
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                true
              </td>
              <td class="border-b px-4 py-2">
                是否显示箭头指示器
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                closeOnClickMask
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                false
              </td>
              <td class="border-b px-4 py-2">
                点击遮罩是否关闭
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                showStepIndicator
              </td>
              <td class="border-b px-4 py-2">
                boolean
              </td>
              <td class="border-b px-4 py-2">
                true
              </td>
              <td class="border-b px-4 py-2">
                是否显示步骤指示器
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                stepIndicatorType
              </td>
              <td class="border-b px-4 py-2">
                'dot' | 'number' | 'text'
              </td>
              <td class="border-b px-4 py-2">
                'dot'
              </td>
              <td class="border-b px-4 py-2">
                步骤指示器类型
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          步骤配置
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                属性
              </th>
              <th class="border-b px-4 py-2 text-left">
                类型
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                target
              </td>
              <td class="border-b px-4 py-2">
                string | HTMLElement
              </td>
              <td class="border-b px-4 py-2">
                目标元素选择器或DOM元素
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                content
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                提示内容
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                title
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                提示标题
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                placement
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                提示位置：top, right, bottom, left等
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                nextText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                下一步按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                prevText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                上一步按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                skipText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                跳过按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                doneText
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                完成按钮文本
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                className
              </td>
              <td class="border-b px-4 py-2">
                string
              </td>
              <td class="border-b px-4 py-2">
                自定义类名
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          Events
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                事件名
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
              <th class="border-b px-4 py-2 text-left">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                update:modelValue
              </td>
              <td class="border-b px-4 py-2">
                更新显示状态
              </td>
              <td class="border-b px-4 py-2">
                (value: boolean)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                update:currentStep
              </td>
              <td class="border-b px-4 py-2">
                更新当前步骤
              </td>
              <td class="border-b px-4 py-2">
                (value: number)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                change
              </td>
              <td class="border-b px-4 py-2">
                当前步骤改变
              </td>
              <td class="border-b px-4 py-2">
                (value: number)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                close
              </td>
              <td class="border-b px-4 py-2">
                引导关闭
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                finish
              </td>
              <td class="border-b px-4 py-2">
                引导完成
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                next
              </td>
              <td class="border-b px-4 py-2">
                下一步
              </td>
              <td class="border-b px-4 py-2">
                (currentStep: number, nextStep: number)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                prev
              </td>
              <td class="border-b px-4 py-2">
                上一步
              </td>
              <td class="border-b px-4 py-2">
                (currentStep: number, prevStep: number)
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                skip
              </td>
              <td class="border-b px-4 py-2">
                跳过引导
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-2 mt-6 text-lg font-medium">
          方法
        </h3>
        <table class="min-w-full border border-gray-300 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="border-b px-4 py-2 text-left">
                方法名
              </th>
              <th class="border-b px-4 py-2 text-left">
                说明
              </th>
              <th class="border-b px-4 py-2 text-left">
                参数
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <td class="border-b px-4 py-2">
                start
              </td>
              <td class="border-b px-4 py-2">
                开始引导
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                next
              </td>
              <td class="border-b px-4 py-2">
                下一步
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                prev
              </td>
              <td class="border-b px-4 py-2">
                上一步
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                skip
              </td>
              <td class="border-b px-4 py-2">
                跳过引导
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                finish
              </td>
              <td class="border-b px-4 py-2">
                完成引导
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
            <tr>
              <td class="border-b px-4 py-2">
                close
              </td>
              <td class="border-b px-4 py-2">
                关闭引导
              </td>
              <td class="border-b px-4 py-2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
