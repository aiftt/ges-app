/**
 * MessageBox 服务
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-11 - 修复关闭时DOM错误
 */

import type { MessageBoxOptions, MessageBoxResult, MessageBoxServiceMethods } from './types'
import { createApp, h, ref } from 'vue'
import MessageBoxConstructor from './index.vue'

// 创建唯一ID
let messageBoxIdCounter = 0
function generateId(): string {
  return `messagebox-${Date.now()}-${messageBoxIdCounter++}`
}

// 打开 MessageBox
function openMessageBox(options: MessageBoxOptions): Promise<MessageBoxResult> {
  // 构建默认选项
  const defaultOptions: Partial<MessageBoxOptions> = {
    type: 'info',
    showClose: true,
    showCancelButton: options.type === 'confirm',
    showConfirmButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonType: 'primary',
    cancelButtonType: 'default',
    closeOnClickMask: true,
    closeOnPressEscape: true,
    dangerouslyUseHTMLString: false,
  }

  // 合并选项
  const finalOptions: MessageBoxOptions = {
    ...defaultOptions,
    ...options,
  }

  // 创建容器元素
  const container = document.createElement('div')
  const id = generateId()
  container.id = id

  // 创建可响应的状态
  const visible = ref(false)
  const inputValue = ref(finalOptions.inputValue || '')

  // 标记是否已清理
  let isCleaned = false

  // 返回 Promise
  return new Promise((resolve) => {
    // 创建组件实例
    const app = createApp({
      setup() {
        // 清理函数
        const cleanup = () => {
          if (isCleaned)
            return // 防止重复清理

          isCleaned = true
          setTimeout(() => {
            // 检查节点是否存在且仍是document.body的子节点
            if (container && document.body.contains(container)) {
              try {
                document.body.removeChild(container)
              }
              catch (error) {
                console.warn('MessageBox cleanup: Failed to remove container', error)
              }
            }
            app.unmount()
          }, 300) // 等待动画结束
        }

        // 处理确认
        const handleConfirm = (value?: string) => {
          visible.value = false
          if (finalOptions.onConfirm) {
            finalOptions.onConfirm(value)
          }
          resolve({ action: 'confirm', value })
          cleanup()
        }

        // 处理取消
        const handleCancel = () => {
          visible.value = false
          if (finalOptions.onCancel) {
            finalOptions.onCancel()
          }
          resolve({ action: 'cancel' })
          cleanup()
        }

        // 处理关闭
        const handleClose = () => {
          visible.value = false
          if (finalOptions.onClose) {
            finalOptions.onClose()
          }
          resolve({ action: 'close' })
          cleanup()
        }

        // 挂载后显示
        setTimeout(() => {
          visible.value = true
        }, 20)

        // 返回渲染函数
        return () => h(MessageBoxConstructor, {
          ...finalOptions,
          'modelValue': visible.value,
          'onUpdate:modelValue': (val: boolean) => {
            visible.value = val
            if (!val) {
              handleClose()
            }
          },
          'onUpdate:inputValue': (val: string) => {
            inputValue.value = val
          },
          'onConfirm': handleConfirm,
          'onCancel': handleCancel,
          'onClose': handleClose,
        })
      },
    })

    // 挂载组件前确保容器元素有效
    try {
      document.body.appendChild(container)
      app.mount(container)
    }
    catch (error) {
      console.error('Failed to mount MessageBox', error)
      isCleaned = true
      resolve({ action: 'close' })
    }
  })
}

// 创建服务方法
export const messageBox: MessageBoxServiceMethods = {
  // 显示警告框
  alert(message: string, title?: string, options: any = {}) {
    return openMessageBox({
      message,
      title,
      ...options,
      showCancelButton: false,
      type: 'info',
    })
  },

  // 显示确认框
  confirm(message: string, title?: string, options: any = {}) {
    return openMessageBox({
      message,
      title,
      ...options,
      showCancelButton: true,
      type: 'confirm',
    })
  },

  // 显示输入框
  prompt(message: string, title?: string, options: any = {}) {
    return openMessageBox({
      message,
      title,
      ...options,
      showCancelButton: true,
      showInput: true,
      type: 'info',
    })
  },

  // 自定义配置
  open(options: MessageBoxOptions) {
    return openMessageBox(options)
  },
}

// 兼容Vue插件用法
export default {
  install(app: any) {
    app.config.globalProperties.$messageBox = messageBox
  },
}
