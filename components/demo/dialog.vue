<script setup lang="ts" name="DemoDialog">
/**
 * Dialog 对话框组件示例
 * 创建日期: 2024-08-04
 * 作者: aiftt
 * 更新日期: 2024-08-04 - 初始版本
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

const logger = useLogger('DialogDemo')

// 基础对话框
const basicVisible = ref(false)
function openBasicDialog() {
  basicVisible.value = true
}

// 不同类型对话框
const infoVisible = ref(false)
const successVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)

function openInfoDialog() {
  infoVisible.value = true
}
function openSuccessDialog() {
  successVisible.value = true
}
function openWarningDialog() {
  warningVisible.value = true
}
function openErrorDialog() {
  errorVisible.value = true
}

// 简单模式对话框
const simpleVisible = ref(false)
function openSimpleDialog() {
  simpleVisible.value = true
}

// 自定义对话框
const customVisible = ref(false)
function openCustomDialog() {
  customVisible.value = true
}

// 异步确认对话框
const asyncVisible = ref(false)
const loading = ref(false)

function openAsyncDialog() {
  asyncVisible.value = true
}

function handleAsyncOk() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    asyncVisible.value = false
    logger.info('异步操作完成')
  }, 2000)
}

// 不同位置的对话框
const centeredVisible = ref(false)
function openCenteredDialog() {
  centeredVisible.value = true
}

// 不同尺寸的对话框
const smallVisible = ref(false)
const largeVisible = ref(false)

function openSmallDialog() {
  smallVisible.value = true
}
function openLargeDialog() {
  largeVisible.value = true
}

// 自定义按钮的对话框
const customButtonsVisible = ref(false)
function openCustomButtonsDialog() {
  customButtonsVisible.value = true
}

// 对话框事件处理
function handleDialogOk() {
  logger.info('点击了确定按钮')
}

function handleDialogCancel() {
  logger.info('点击了取消按钮')
}

// 代码示例字符串
const basicCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    title="基础对话框"
    content="这是一个基础对话框的内容，用于展示简单的信息和交互。"
    @ok="handleOk"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

function handleOk() {
  console.log('点击了确定按钮')
}

function handleCancel() {
  console.log('点击了取消按钮')
}
<\/script>`

const typesCode = `<template>
  <div class="space-x-4">
    <ui-button type="primary" @click="infoVisible = true">信息对话框</ui-button>
    <ui-button type="success" @click="successVisible = true">成功对话框</ui-button>
    <ui-button type="warning" @click="warningVisible = true">警告对话框</ui-button>
    <ui-button type="danger" @click="errorVisible = true">错误对话框</ui-button>
  </div>

  <ui-dialog
    v-model="infoVisible"
    type="info"
    title="信息提示"
    content="这是一条信息提示，用于展示一般性的通知信息。"
  />

  <ui-dialog
    v-model="successVisible"
    type="success"
    title="成功提示"
    content="操作已成功完成，数据已保存。"
  />

  <ui-dialog
    v-model="warningVisible"
    type="warning"
    title="警告提示"
    content="此操作可能导致数据丢失，请确认是否继续？"
  />

  <ui-dialog
    v-model="errorVisible"
    type="error"
    title="错误提示"
    content="操作失败，请检查网络连接后重试。"
  />
</template>

<script setup>
import { ref } from 'vue'

const infoVisible = ref(false)
const successVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)
<\/script>`

const simpleCode = `<template>
  <ui-button @click="visible = true">
    打开简单对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    simple
    type="warning"
    content="此操作将永久删除该文件，是否继续？"
    ok-text="删除"
    ok-type="danger"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`

const customCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开自定义对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    title="用户协议"
  >
    <!-- 自定义内容 -->
    <div class="max-h-60 overflow-auto text-sm">
      <h4 class="mb-2 font-medium">1. 总则</h4>
      <p class="mb-2">欢迎使用我们的服务！这份用户协议是您与我们之间关于使用我们产品和服务的法律协议。</p>
      <!-- 更多内容... -->
    </div>

    <!-- 自定义底部按钮 -->
    <template #footer>
      <ui-button @click="visible = false">不同意</ui-button>
      <ui-button type="primary" @click="visible = false">同意并继续</ui-button>
    </template>
  </ui-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`

const asyncCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开异步对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    title="异步操作"
    content="点击确定按钮将执行异步操作，等待2秒后关闭对话框。"
    :ok-loading="loading"
    @ok="handleAsyncOk"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const loading = ref(false)

function handleAsyncOk() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    visible.value = false
    console.log('异步操作完成')
  }, 2000)
}
<\/script>`

const positionCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开居中对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    title="居中对话框"
    content="这个对话框在屏幕中央显示。"
    centered
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`

const sizeCode = `<template>
  <div class="space-x-4">
    <ui-button @click="smallVisible = true">小尺寸对话框</ui-button>
    <ui-button @click="largeVisible = true">大尺寸对话框</ui-button>
  </div>

  <ui-dialog
    v-model="smallVisible"
    title="小尺寸对话框"
    content="这是一个宽度较小的对话框。"
    width="300"
  />

  <ui-dialog
    v-model="largeVisible"
    title="大尺寸对话框"
    content="这是一个宽度较大的对话框，适合展示更多内容。"
    width="700"
  />
</template>

<script setup>
import { ref } from 'vue'

const smallVisible = ref(false)
const largeVisible = ref(false)
<\/script>`

const buttonsCode = `<template>
  <ui-button type="primary" @click="visible = true">
    打开自定义按钮对话框
  </ui-button>

  <ui-dialog
    v-model="visible"
    title="自定义按钮"
    content="这个对话框有自定义的底部按钮。"
  >
    <template #footer>
      <ui-button size="small" @click="visible = false">取消</ui-button>
      <ui-button size="small" type="warning" @click="visible = false">稍后再试</ui-button>
      <ui-button size="small" type="primary" @click="visible = false">确认操作</ui-button>
    </template>
  </ui-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Dialog 对话框
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      对话框是覆盖在应用程序之上的弹出窗口，用于显示信息、请求输入或需要用户做出决定。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的对话框，包含标题、内容和底部操作按钮。"
      :code="basicCode"
    >
      <ui-button type="primary" @click="openBasicDialog">
        打开对话框
      </ui-button>
      <ui-dialog
        v-model="basicVisible"
        title="基础对话框"
        content="这是一个基础对话框的内容，用于展示简单的信息和交互。"
        @ok="handleDialogOk"
        @cancel="handleDialogCancel"
      />
    </ui-demo>

    <!-- 不同类型 -->
    <ui-demo
      title="不同类型"
      description="对话框有多种类型，用于不同场景和信息重要程度。"
      :code="typesCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button type="primary" @click="openInfoDialog">
          信息对话框
        </ui-button>
        <ui-button type="success" @click="openSuccessDialog">
          成功对话框
        </ui-button>
        <ui-button type="warning" @click="openWarningDialog">
          警告对话框
        </ui-button>
        <ui-button type="danger" @click="openErrorDialog">
          错误对话框
        </ui-button>
      </div>

      <ui-dialog
        v-model="infoVisible"
        type="info"
        title="信息提示"
        content="这是一条信息提示，用于展示一般性的通知信息。"
      />

      <ui-dialog
        v-model="successVisible"
        type="success"
        title="成功提示"
        content="操作已成功完成，数据已保存。"
      />

      <ui-dialog
        v-model="warningVisible"
        type="warning"
        title="警告提示"
        content="此操作可能导致数据丢失，请确认是否继续？"
      />

      <ui-dialog
        v-model="errorVisible"
        type="error"
        title="错误提示"
        content="操作失败，请检查网络连接后重试。"
      />
    </ui-demo>

    <!-- 简单模式 -->
    <ui-demo
      title="简单模式"
      description="简化的对话框，移除标题，仅显示内容和操作按钮，适用于简单的确认操作。"
      :code="simpleCode"
    >
      <ui-button @click="openSimpleDialog">
        打开简单对话框
      </ui-button>
      <ui-dialog
        v-model="simpleVisible"
        simple
        type="warning"
        content="此操作将永久删除该文件，是否继续？"
        ok-text="删除"
        ok-type="danger"
      />
    </ui-demo>

    <!-- 自定义内容 -->
    <ui-demo
      title="自定义内容"
      description="对话框支持自定义内容，可以放入任何HTML元素或Vue组件。"
      :code="customCode"
    >
      <ui-button type="primary" @click="openCustomDialog">
        打开自定义对话框
      </ui-button>
      <ui-dialog
        v-model="customVisible"
        title="用户协议"
      >
        <div class="max-h-60 overflow-auto text-sm dark:text-gray-300">
          <h4 class="mb-2 font-medium dark:text-white">
            1. 总则
          </h4>
          <p class="mb-2">
            欢迎使用我们的服务！这份用户协议（"协议"）是您与我们之间关于使用我们的产品和服务的法律协议。
          </p>
          <h4 class="mb-2 font-medium dark:text-white">
            2. 服务说明
          </h4>
          <p class="mb-2">
            我们提供的服务包括但不限于：网站、应用程序、API和其他相关服务。我们保留随时修改、暂停或终止部分或全部服务的权利。
          </p>
          <h4 class="mb-2 font-medium dark:text-white">
            3. 用户责任
          </h4>
          <p class="mb-2">
            您同意：(1) 提供真实、准确、最新和完整的个人资料；(2) 维护并及时更新个人资料；(3) 不传播违法、有害信息；(4) 遵守所有适用的法律法规。
          </p>
          <h4 class="mb-2 font-medium dark:text-white">
            4. 隐私保护
          </h4>
          <p class="mb-2">
            我们重视您的隐私。我们按照隐私政策收集、使用、存储和共享您的个人信息，详情请参阅隐私政策文档。
          </p>
          <h4 class="mb-2 font-medium dark:text-white">
            5. 知识产权
          </h4>
          <p class="mb-2">
            我们的服务包含的专利、商标、著作权等知识产权受法律保护。未经许可，您不得使用这些知识产权。
          </p>
        </div>
        <template #footer>
          <ui-button @click="customVisible = false">
            不同意
          </ui-button>
          <ui-button type="primary" @click="customVisible = false">
            同意并继续
          </ui-button>
        </template>
      </ui-dialog>
    </ui-demo>

    <!-- 异步关闭 -->
    <ui-demo
      title="异步关闭"
      description="在处理异步操作时，可以设置确定按钮为加载状态，防止重复提交。"
      :code="asyncCode"
    >
      <ui-button type="primary" @click="openAsyncDialog">
        打开异步对话框
      </ui-button>
      <ui-dialog
        v-model="asyncVisible"
        title="异步操作"
        content="点击确定按钮将执行异步操作，等待2秒后关闭对话框。"
        :ok-loading="loading"
        @ok="handleAsyncOk"
      />
    </ui-demo>

    <!-- 对话框位置 -->
    <ui-demo
      title="居中显示"
      description="通过centered属性可以使对话框在屏幕中居中显示。"
      :code="positionCode"
    >
      <ui-button type="primary" @click="openCenteredDialog">
        打开居中对话框
      </ui-button>
      <ui-dialog
        v-model="centeredVisible"
        title="居中对话框"
        content="这个对话框在屏幕中央显示。"
        centered
      />
    </ui-demo>

    <!-- 对话框尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="通过width属性可以设置对话框的宽度，适应不同内容量的需求。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button @click="openSmallDialog">
          小尺寸对话框
        </ui-button>
        <ui-button @click="openLargeDialog">
          大尺寸对话框
        </ui-button>
      </div>

      <ui-dialog
        v-model="smallVisible"
        title="小尺寸对话框"
        content="这是一个宽度较小的对话框。"
        width="300"
      />

      <ui-dialog
        v-model="largeVisible"
        title="大尺寸对话框"
        content="这是一个宽度较大的对话框，适合展示更多内容。"
        width="700"
      />
    </ui-demo>

    <!-- 自定义按钮 -->
    <ui-demo
      title="自定义按钮"
      description="可以通过footer插槽自定义对话框底部的按钮组。"
      :code="buttonsCode"
    >
      <ui-button type="primary" @click="openCustomButtonsDialog">
        打开自定义按钮对话框
      </ui-button>
      <ui-dialog
        v-model="customButtonsVisible"
        title="自定义按钮"
        content="这个对话框有自定义的底部按钮。"
      >
        <template #footer>
          <ui-button size="small" @click="customButtonsVisible = false">
            取消
          </ui-button>
          <ui-button size="small" type="warning" @click="customButtonsVisible = false">
            稍后再试
          </ui-button>
          <ui-button size="small" type="primary" @click="customButtonsVisible = false">
            确认操作
          </ui-button>
        </template>
      </ui-dialog>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Dialog组件的属性、事件和插槽。"
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
                modelValue / v-model
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框是否可见
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框标题
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                content
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框内容
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                width
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框宽度
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                480
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'info' | 'success' | 'warning' | 'error'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                simple
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否为简单模式（无标题）
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                closable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示关闭按钮
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                centered
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否居中显示
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                show-close
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示关闭按钮
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                show-footer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示底部
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok-text
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确认按钮文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确定
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                cancel-text
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                取消按钮文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                取消
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok-type
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确认按钮类型
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'primary' | 'success' | 'warning' | 'danger'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                primary
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok-loading
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                确认按钮加载状态
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
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
                update:modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框可见状态变更
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                ok
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击确定按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                cancel
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击取消按钮时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                close
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框关闭时触发
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
                对话框内容
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框标题
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                footer
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                对话框底部
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>
