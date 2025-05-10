<script setup lang="ts" name="DemoMessageBox">
/**
 * MessageBox 组件演示
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 适配新的 MessageBox 组件
 */

import { ref } from 'vue'
import { useMessageBox } from '~/composables/useMessageBox'
import { useNotification } from '~/composables/useNotification'

// 使用MessageBox和Notification服务
const messageBox = useMessageBox()
const notification = useNotification()

// 基础警告框
function showAlert() {
  messageBox.alert({
    content: '这是一条警告提示信息',
  }).then(() => {
    notification.success('您关闭了警告框')
  }).catch(() => {
    // 用户取消或关闭
  })
}

// 确认对话框
function showConfirm() {
  messageBox.confirm({
    content: '此操作将永久删除该文件, 是否继续?',
  }).then(() => {
    notification.success('删除成功!')
  }).catch(() => {
    notification.info('已取消删除操作')
  })
}

// 成功消息框
function showSuccess() {
  messageBox.success({
    content: '操作已成功完成',
  }).then(() => {
    // 操作完成后的回调
  })
}

// 错误消息框
function showError() {
  messageBox.error({
    content: '操作失败，请稍后重试',
  }).then(() => {
    // 操作完成后的回调
  })
}

// 警告消息框
function showWarning() {
  messageBox.warning({
    content: '此操作存在一定风险',
  }).then(() => {
    // 操作完成后的回调
  })
}

// 自定义配置
const customOptions = ref({
  title: '自定义消息弹框',
  content: '这是一条自定义的消息内容',
  type: 'info',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showClose: true,
  showCancelButton: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  icon: '',
  confirmButtonLoading: false,
})

// 显示自定义消息框
function showCustomMessageBox() {
  messageBox.confirm({
    title: customOptions.value.title,
    content: customOptions.value.content,
    type: customOptions.value.type as any,
    confirmButtonText: customOptions.value.confirmButtonText,
    cancelButtonText: customOptions.value.cancelButtonText,
    showClose: customOptions.value.showClose,
    showCancelButton: customOptions.value.showCancelButton,
    closeOnClickModal: customOptions.value.closeOnClickModal,
    closeOnPressEscape: customOptions.value.closeOnPressEscape,
    icon: customOptions.value.icon || undefined,
    confirmButtonLoading: customOptions.value.confirmButtonLoading,
  }).then(() => {
    notification.success('操作已确认')
  }).catch(() => {
    notification.info('操作已取消')
  })
}

// 带确认加载状态的消息框
function showLoadingMessageBox() {
  const options = {
    title: '保存确认',
    content: '确定要保存当前设置吗？',
    confirmButtonText: '保存',
    confirmButtonLoading: false,
  }

  messageBox.confirm(options).then(() => {
    // 创建一个新的带加载状态的消息框
    const loadingOptions = {
      ...options,
      confirmButtonLoading: true,
      // 添加其他选项确保用户无法关闭
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
    }

    messageBox.confirm(loadingOptions)

    // 模拟3秒后操作完成
    setTimeout(() => {
      // 不直接关闭，而是显示成功消息
      notification.success('设置已保存')
    }, 3000)
  })
}

// 多步骤操作示例
function showStepByStepOperation() {
  messageBox.confirm({
    title: '多步操作示例',
    content: '这是第一步，您要继续吗？',
    confirmButtonText: '继续',
  }).then(() => {
    messageBox.confirm({
      title: '第二步',
      content: '您确定要执行第二步操作吗？',
      type: 'warning',
    }).then(() => {
      messageBox.success({
        title: '操作完成',
        content: '所有步骤已成功完成！',
      })
    })
  })
}
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-semibold">
      消息弹框（MessageBox）
    </h2>
    <p class="mb-4 text-gray-600 dark:text-gray-400">
      消息弹框用于显示系统的提示信息，常用于确认用户操作、警告提示和信息展示
    </p>

    <div class="mb-8 border rounded-lg bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showAlert">
          提示框
        </ui-button>
        <ui-button @click="showConfirm">
          确认框
        </ui-button>
      </div>

      <h3 class="mb-4 mt-6 text-lg font-medium">
        不同状态
      </h3>
      <div class="flex flex-wrap gap-2">
        <ui-button type="primary" @click="showSuccess">
          成功提示
        </ui-button>
        <ui-button type="warning" @click="showWarning">
          警告提示
        </ui-button>
        <ui-button type="danger" @click="showError">
          错误提示
        </ui-button>
      </div>

      <h3 class="mb-4 mt-6 text-lg font-medium">
        自定义配置
      </h3>
      <div class="grid grid-cols-1 mb-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
        <div>
          <label class="mb-1 block text-sm">
            标题
          </label>
          <ui-input v-model="customOptions.title" />
        </div>
        <div>
          <label class="mb-1 block text-sm">
            内容
          </label>
          <ui-input v-model="customOptions.content" />
        </div>
        <div>
          <label class="mb-1 block text-sm">
            类型
          </label>
          <ui-select v-model="customOptions.type">
            <option value="info">
              信息
            </option>
            <option value="success">
              成功
            </option>
            <option value="warning">
              警告
            </option>
            <option value="error">
              错误
            </option>
          </ui-select>
        </div>
        <div>
          <label class="mb-1 block text-sm">
            确认按钮文本
          </label>
          <ui-input v-model="customOptions.confirmButtonText" />
        </div>
        <div>
          <label class="mb-1 block text-sm">
            取消按钮文本
          </label>
          <ui-input v-model="customOptions.cancelButtonText" />
        </div>
        <div>
          <label class="mb-1 block text-sm">
            自定义图标
          </label>
          <ui-input v-model="customOptions.icon" placeholder="例如: carbon:thumbs-up" />
        </div>
        <div class="flex items-center">
          <ui-checkbox v-model="customOptions.showClose">
            显示关闭按钮
          </ui-checkbox>
        </div>
        <div class="flex items-center">
          <ui-checkbox v-model="customOptions.showCancelButton">
            显示取消按钮
          </ui-checkbox>
        </div>
        <div class="flex items-center">
          <ui-checkbox v-model="customOptions.closeOnClickModal">
            点击遮罩关闭
          </ui-checkbox>
        </div>
        <div class="flex items-center">
          <ui-checkbox v-model="customOptions.closeOnPressEscape">
            按ESC关闭
          </ui-checkbox>
        </div>
        <div class="flex items-center">
          <ui-checkbox v-model="customOptions.confirmButtonLoading">
            确认按钮加载状态
          </ui-checkbox>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <ui-button type="primary" @click="showCustomMessageBox">
          显示自定义弹框
        </ui-button>
      </div>

      <h3 class="mb-4 mt-6 text-lg font-medium">
        高级用法
      </h3>
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showLoadingMessageBox">
          带加载状态
        </ui-button>
        <ui-button @click="showStepByStepOperation">
          多步骤操作
        </ui-button>
      </div>
    </div>

    <div class="my-8">
      <h3 class="mb-4 text-xl font-medium">
        代码示例
      </h3>
      <ui-code language="typescript">
        const messageBox = useMessageBox()

        // 基础提示框
        messageBox.alert({
        content: '这是一条提示信息'
        }).then(() => {
        // 用户关闭后的回调
        })

        // 确认对话框
        messageBox.confirm({
        content: '确认执行此操作?'
        }).then(() => {
        // 用户点击确认
        console.log('用户确认了操作')
        }).catch(() => {
        // 用户点击取消或关闭
        console.log('用户取消了操作')
        })

        // 成功提示框
        messageBox.success({
        content: '操作已完成'
        })

        // 警告提示框
        messageBox.warning({
        content: '此操作存在风险'
        })

        // 错误提示框
        messageBox.error({
        content: '操作失败'
        })

        // 自定义配置
        messageBox.confirm({
        title: '自定义标题',
        content: '自定义内容',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        icon: 'carbon:warning-filled',
        showClose: true,
        showCancelButton: true
        })
      </ui-code>
    </div>
  </div>
</template>

<style scoped>
.demo-messagebox__section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--ui-border-color, #eee);
}

.demo-messagebox__description {
  margin-bottom: 1rem;
  color: var(--ui-color-text-secondary, #666);
}

.demo-messagebox__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.demo-messagebox__form {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.demo-messagebox__form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-messagebox__form-item label {
  font-size: 0.875rem;
  color: var(--ui-color-text, #333);
}

:root.dark .demo-messagebox__description {
  color: var(--ui-color-text-secondary, #aaa);
}

:root.dark .demo-messagebox__section {
  border-bottom-color: var(--ui-border-color, #333);
}

:root.dark .demo-messagebox__form-item label {
  color: var(--ui-color-text, #e0e0e0);
}
</style>
