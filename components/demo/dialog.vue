<script setup lang="ts" name="DemoDialog">
/**
 * Dialog 对话框组件示例
 * 创建日期: 2024-08-04
 * 作者: aiftt
 * 更新日期: 2024-08-04 - 初始版本
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
    logger.success('异步操作完成')
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
</script>

<template>
  <div class="demo-dialog">
    <h2 class="mb-6 text-xl font-bold">
      Dialog 对话框
    </h2>

    <!-- 基础用法 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
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
    </section>

    <!-- 不同类型 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不同类型
      </h3>
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
    </section>

    <!-- 简单模式 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        简单模式
      </h3>
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
    </section>

    <!-- 自定义内容 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义内容
      </h3>
      <ui-button type="primary" @click="openCustomDialog">
        打开自定义对话框
      </ui-button>
      <ui-dialog
        v-model="customVisible"
        title="用户协议"
      >
        <div class="max-h-60 overflow-auto text-sm">
          <h4 class="mb-2 font-medium">
            1. 总则
          </h4>
          <p class="mb-2">
            欢迎使用我们的服务！这份用户协议（"协议"）是您与我们之间关于使用我们的产品和服务的法律协议。
          </p>
          <h4 class="mb-2 font-medium">
            2. 服务说明
          </h4>
          <p class="mb-2">
            我们提供的服务包括但不限于：网站、应用程序、API和其他相关服务。我们保留随时修改、暂停或终止部分或全部服务的权利。
          </p>
          <h4 class="mb-2 font-medium">
            3. 用户责任
          </h4>
          <p class="mb-2">
            您同意：(1) 提供真实、准确、最新和完整的个人资料；(2) 维护并及时更新个人资料；(3) 不传播违法、有害信息；(4) 遵守所有适用的法律法规。
          </p>
          <h4 class="mb-2 font-medium">
            4. 隐私保护
          </h4>
          <p class="mb-2">
            我们重视您的隐私。我们按照隐私政策收集、使用、存储和共享您的个人信息，详情请参阅隐私政策文档。
          </p>
          <h4 class="mb-2 font-medium">
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
    </section>

    <!-- 异步关闭 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        异步关闭
      </h3>
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
    </section>

    <!-- 对话框位置 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        居中显示
      </h3>
      <ui-button type="primary" @click="openCenteredDialog">
        打开居中对话框
      </ui-button>
      <ui-dialog
        v-model="centeredVisible"
        title="居中对话框"
        content="这个对话框在屏幕中央显示。"
        centered
      />
    </section>

    <!-- 对话框尺寸 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        不同尺寸
      </h3>
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
    </section>

    <!-- 自定义按钮 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        自定义按钮
      </h3>
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
    </section>

    <!-- 对话框事件 -->
    <section class="mb-10">
      <h3 class="mb-4 text-lg font-medium">
        事件监听
      </h3>
      <ui-button type="primary" @click="basicVisible = true">
        打开有事件监听的对话框
      </ui-button>
      <p class="mt-2 text-sm text-gray-500">
        查看控制台日志以了解事件触发情况
      </p>
    </section>
  </div>
</template>
