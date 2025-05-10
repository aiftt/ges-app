/**
 * MessageBox消息弹框组合式函数
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
 */
/**
 * 消息弹框选项接口
 */
export interface MessageBoxOptions {
  /** 标题 */
  title?: string
  /** 内容 */
  content: string
  /** 类型 */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** 确认按钮文本 */
  confirmButtonText?: string
  /** 取消按钮文本 */
  cancelButtonText?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 是否显示取消按钮 */
  showCancelButton?: boolean
  /** 是否可通过点击蒙层关闭 */
  closeOnClickModal?: boolean
  /** 是否可通过按下 ESC 键关闭 */
  closeOnPressEscape?: boolean
  /** 自定义图标 */
  icon?: string
  /** 确认按钮加载状态 */
  confirmButtonLoading?: boolean
}

/**
 * 消息弹框实例接口
 */
export interface MessageBoxInstance extends MessageBoxOptions {
  /** 唯一标识 */
  id: string
  /** 是否可见 */
  visible: boolean
  /** Promise的resolve函数 */
  resolve: (value: any) => void
  /** Promise的reject函数 */
  reject: (reason?: any) => void
}

// 消息弹框默认选项
const defaultOptions: Partial<MessageBoxOptions> = {
  title: '提示',
  type: 'info',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showClose: true,
  showCancelButton: false,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  confirmButtonLoading: false,
}

// 生成唯一ID
let messageBoxId = 0

/**
 * 提供消息弹框功能的组合式函数
 *
 * @example
 * ```ts
 * const messageBox = useMessageBox()
 *
 * // 确认对话框
 * messageBox.confirm('确定要删除这条记录吗？').then(() => {
 *   // 用户点击确认
 *   console.log('用户确认了操作')
 * }).catch(() => {
 *   // 用户点击取消或关闭
 *   console.log('用户取消了操作')
 * })
 *
 * // 提示对话框
 * messageBox.alert('操作已完成').then(() => {
 *   console.log('用户关闭了提示')
 * })
 *
 * // 成功对话框
 * messageBox.success('数据保存成功')
 *
 * // 警告对话框
 * messageBox.warning('此操作不可逆，请谨慎处理')
 *
 * // 错误对话框
 * messageBox.error('操作失败，请重试')
 *
 * // 自定义图标
 * messageBox.confirm({
 *   title: '自定义图标',
 *   content: '这是一个带自定义图标的对话框',
 *   icon: 'carbon:thumbs-up'
 * })
 * ```
 */
export function useMessageBox() {
  // 创建单例状态
  const instances = useState<MessageBoxInstance[]>('messageBoxInstances', () => [])

  // 关闭弹框
  const close = (id: string, action: 'confirm' | 'cancel' | 'close' = 'close') => {
    const index = instances.value.findIndex(instance => instance.id === id)
    if (index > -1) {
      const instance = instances.value[index]
      instance.visible = false

      // 等待动画结束后移除实例
      setTimeout(() => {
        instances.value = instances.value.filter(item => item.id !== id)
        // 根据操作类型进行Promise的解决或拒绝
        if (action === 'confirm') {
          instance.resolve(true)
        }
        else {
          instance.reject(action)
        }
      }, 300)
    }
  }

  // 创建弹框
  const create = (options: MessageBoxOptions | string): Promise<boolean> => {
    // 处理字符串参数
    if (typeof options === 'string') {
      options = { content: options }
    }

    // 合并默认选项
    const mergedOptions = { ...defaultOptions, ...options }

    return new Promise((resolve, reject) => {
      const id = `messagebox_${++messageBoxId}`

      // 创建实例 - 直接设置 visible 为 true
      const instance: MessageBoxInstance = {
        id,
        ...mergedOptions,
        visible: true, // 改为 true，立即显示
        resolve,
        reject,
      }

      // 添加实例
      instances.value = [...instances.value, instance]
    })
  }

  // 便捷方法
  const alert = (options: MessageBoxOptions | string): Promise<boolean> => {
    const opts = typeof options === 'string' ? { content: options } : options
    return create({
      ...opts,
      showCancelButton: false,
    })
  }

  const confirm = (options: MessageBoxOptions | string): Promise<boolean> => {
    const opts = typeof options === 'string' ? { content: options } : options
    return create({
      ...opts,
      showCancelButton: true,
    })
  }

  const success = (options: MessageBoxOptions | string): Promise<boolean> => {
    const opts = typeof options === 'string' ? { content: options } : options
    return alert({
      ...opts,
      type: 'success',
    })
  }

  const warning = (options: MessageBoxOptions | string): Promise<boolean> => {
    const opts = typeof options === 'string' ? { content: options } : options
    return alert({
      ...opts,
      type: 'warning',
    })
  }

  const error = (options: MessageBoxOptions | string): Promise<boolean> => {
    const opts = typeof options === 'string' ? { content: options } : options
    return alert({
      ...opts,
      type: 'error',
    })
  }

  return {
    alert,
    confirm,
    success,
    warning,
    error,
    close,
    instances,
  }
}
