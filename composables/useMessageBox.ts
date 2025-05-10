/**
 * useMessageBox 组合式函数
 * 创建日期: 2024-08-10
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 初始版本
 */

import type { MessageBoxServiceMethods } from '~/components/ui/messagebox/types'
import { messageBox } from '~/components/ui/messagebox/service'

/**
 * 提供消息弹框功能的组合式函数
 *
 * @example
 * ```ts
 * const messageBox = useMessageBox()
 *
 * // 警告框
 * messageBox.alert('这是一条提示信息', '提示').then(result => {
 *   console.log(result.action) // 'confirm' 或 'close'
 * })
 *
 * // 确认框
 * messageBox.confirm('是否确认删除？', '警告').then(result => {
 *   if (result.action === 'confirm') {
 *     // 用户点击确认
 *   } else {
 *     // 用户点击取消或关闭
 *   }
 * })
 *
 * // 输入框
 * messageBox.prompt('请输入姓名', '输入').then(result => {
 *   if (result.action === 'confirm') {
 *     console.log('输入的值:', result.value)
 *   }
 * })
 *
 * // 自定义配置
 * messageBox.open({
 *   title: '自定义标题',
 *   message: '自定义内容',
 *   showInput: true,
 *   confirmButtonText: '提交',
 *   cancelButtonText: '返回',
 *   type: 'warning'
 * })
 * ```
 */
export function useMessageBox(): MessageBoxServiceMethods {
  return messageBox
}
