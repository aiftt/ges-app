<script setup lang="ts" name="DemoMessageBox">
/**
 * MessageBox 组件演示
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 初始版本
 */

import { ref } from 'vue'
import { useMessage } from '~/composables/useMessage'
import { useMessageBox } from '~/composables/useMessageBox'

// 使用MessageBox服务
const messageBox = useMessageBox()
const message = useMessage()

// 基础警告框
function showAlert() {
  messageBox.alert('这是一条警告提示信息', '提示').then(() => {
    // 警告框关闭后的回调
  })
}

// 确认对话框
function showConfirm() {
  messageBox.confirm('此操作将永久删除该文件, 是否继续?', '警告').then((result) => {
    if (result.action === 'confirm') {
      message.success('删除成功!')
    }
  })
}

// 带输入框的对话框
function showPrompt() {
  messageBox.prompt('请输入邮箱', '提示').then(({ value, action }) => {
    if (action === 'confirm' && value) {
      message.success(`您的邮箱是: ${value}`)
    }
  })
}

// 使用HTML内容
function showHtmlMessageBox() {
  messageBox.alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML内容', {
    dangerouslyUseHTMLString: true,
  })
}

// 不同类型的对话框
function showTypedMessageBox(type: string) {
  messageBox.open({
    type: type as any,
    title: '类型示例',
    message: `这是一个 ${type} 类型的对话框`,
    showClose: true,
    showCancelButton: true,
  })
}

// 自定义配置
const customConfig = ref({
  title: '自定义对话框',
  message: '这是一个可以定制的对话框',
  showClose: true,
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'info',
  showInput: false,
  width: 420,
  closeOnClickMask: true,
})

function showCustomMessageBox() {
  messageBox.open({
    ...customConfig.value,
    // 将type转换为正确的类型
    type: customConfig.value.type as any,
    // 转换宽度类型
    width: Number(customConfig.value.width),
  }).then(() => {
    // 对话框关闭后的回调
  })
}

// 执行复杂操作
function showComplexOperation() {
  messageBox.confirm('执行此操作需要先确认您的身份', '安全验证', {
    confirmButtonText: '继续验证',
    cancelButtonText: '稍后再说',
    type: 'warning',
  }).then(({ action }) => {
    if (action === 'confirm') {
      // 第二步：请求输入验证码
      messageBox.prompt('请输入手机收到的验证码', '验证码验证', {
        inputType: 'text',
        inputPlaceholder: '6位数字验证码',
      }).then(({ action, value }) => {
        if (action === 'confirm' && value) {
          // 第三步：成功确认
          messageBox.alert('身份验证成功，操作已完成', '操作完成', {
            type: 'success',
          })
        }
      })
    }
  })
}
</script>

<template>
  <div class="demo-messagebox">
    <div class="demo-messagebox__section">
      <ui-typography-title :level="3">
        基本用法
      </ui-typography-title>
      <p class="demo-messagebox__description">
        MessageBox 提供了简单的消息提示、确认和输入框功能。
      </p>
      <div class="demo-messagebox__actions">
        <ui-button @click="showAlert">
          消息提示
        </ui-button>
        <ui-button @click="showConfirm">
          确认消息
        </ui-button>
        <ui-button @click="showPrompt">
          提示输入
        </ui-button>
      </div>
    </div>

    <div class="demo-messagebox__section">
      <ui-typography-title :level="3">
        不同类型
      </ui-typography-title>
      <p class="demo-messagebox__description">
        以不同的状态展示不同类型的消息提示。
      </p>
      <div class="demo-messagebox__actions">
        <ui-button type="primary" @click="showTypedMessageBox('info')">
          Info
        </ui-button>
        <ui-button type="success" @click="showTypedMessageBox('success')">
          Success
        </ui-button>
        <ui-button type="warning" @click="showTypedMessageBox('warning')">
          Warning
        </ui-button>
        <ui-button type="danger" @click="showTypedMessageBox('error')">
          Error
        </ui-button>
        <ui-button @click="showTypedMessageBox('confirm')">
          Confirm
        </ui-button>
      </div>
    </div>

    <div class="demo-messagebox__section">
      <ui-typography-title :level="3">
        HTML 内容
      </ui-typography-title>
      <p class="demo-messagebox__description">
        通过设置 dangerouslyUseHTMLString 属性可以在消息中包含 HTML 片段。
      </p>
      <div class="demo-messagebox__actions">
        <ui-button @click="showHtmlMessageBox">
          HTML 内容
        </ui-button>
      </div>
    </div>

    <div class="demo-messagebox__section">
      <ui-typography-title :level="3">
        自定义配置
      </ui-typography-title>
      <p class="demo-messagebox__description">
        可以根据需要自定义对话框的外观和行为。
      </p>

      <div class="demo-messagebox__form">
        <div class="demo-messagebox__form-item">
          <label>标题:</label>
          <ui-input v-model="customConfig.title" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>内容:</label>
          <ui-input v-model="customConfig.message" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>类型:</label>
          <ui-select v-model="customConfig.type">
            <option value="info">
              Info
            </option>
            <option value="success">
              Success
            </option>
            <option value="warning">
              Warning
            </option>
            <option value="error">
              Error
            </option>
            <option value="confirm">
              Confirm
            </option>
          </ui-select>
        </div>
        <div class="demo-messagebox__form-item">
          <label>宽度:</label>
          <ui-input v-model="customConfig.width" type="number" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>显示关闭图标:</label>
          <ui-switch v-model="customConfig.showClose" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>显示取消按钮:</label>
          <ui-switch v-model="customConfig.showCancelButton" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>显示确认按钮:</label>
          <ui-switch v-model="customConfig.showConfirmButton" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>确认按钮文本:</label>
          <ui-input v-model="customConfig.confirmButtonText" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>取消按钮文本:</label>
          <ui-input v-model="customConfig.cancelButtonText" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>显示输入框:</label>
          <ui-switch v-model="customConfig.showInput" />
        </div>
        <div class="demo-messagebox__form-item">
          <label>点击遮罩关闭:</label>
          <ui-switch v-model="customConfig.closeOnClickMask" />
        </div>
      </div>

      <div class="demo-messagebox__actions">
        <ui-button type="primary" @click="showCustomMessageBox">
          显示自定义对话框
        </ui-button>
      </div>
    </div>

    <div class="demo-messagebox__section">
      <ui-typography-title :level="3">
        高级用法
      </ui-typography-title>
      <p class="demo-messagebox__description">
        可以将多个对话框组合起来，实现复杂的交互流程。
      </p>
      <div class="demo-messagebox__actions">
        <ui-button type="primary" @click="showComplexOperation">
          复杂操作流程
        </ui-button>
      </div>
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
