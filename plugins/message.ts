/**
 * Message 插件
 * 创建日期: 2024-08-04
 * 作者: aiftt
 * 更新日期: 2024-08-10 - 简化插件实现
 */

import { defineNuxtPlugin } from '#app'
import { useMessage } from '~/composables/useMessage'

/**
 * 注册全局消息服务插件
 * 提供全局可访问的消息方法
 */
export default defineNuxtPlugin(() => {
  // 获取消息服务
  const { message, success, error, warning, info, clearAll } = useMessage()

  // 返回插件对象，提供全局可用的消息方法
  return {
    provide: {
      message,
      messageSuccess: success,
      messageError: error,
      messageWarning: warning,
      messageInfo: info,
      messageClear: clearAll,
    },
  }
})
