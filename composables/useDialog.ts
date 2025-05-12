/**
 * 对话框组合式函数
 * 创建日期: 2024-03-21
 * 作者: aiftt
 */

export function useDialog() {
  // 创建一个响应式变量来控制对话框的显示状态
  const visible = ref(false)
  const message = ref('')
  const type = ref<'alert' | 'confirm'>('alert')
  let resolvePromise: ((value: boolean) => void) | null = null

  // 显示确认对话框
  function confirm(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      message.value = msg
      type.value = 'confirm'
      visible.value = true
      resolvePromise = resolve
    })
  }

  // 显示提示对话框
  function alert(msg: string): Promise<void> {
    return new Promise((resolve) => {
      message.value = msg
      type.value = 'alert'
      visible.value = true
      resolvePromise = () => {
        resolve()
        return true
      }
    })
  }

  // 处理确认
  function handleOk() {
    visible.value = false
    resolvePromise?.(true)
    resolvePromise = null
  }

  // 处理取消
  function handleCancel() {
    visible.value = false
    resolvePromise?.(false)
    resolvePromise = null
  }

  return {
    visible,
    message,
    type,
    confirm,
    alert,
    handleOk,
    handleCancel,
  }
}
