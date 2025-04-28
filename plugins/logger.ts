/**
 * 日志工具插件
 * 创建日期: 2023-11-28
 * 作者: aiftt
 */

import { defineNuxtPlugin } from '#app'
import clientLogger from '~/utils/client-logger'
import { Logger } from '~/utils/logger'
import serverLogger from '~/utils/server-logger'

export default defineNuxtPlugin((nuxtApp) => {
  // 注册不同环境下的日志工具
  const log = import.meta.client ? clientLogger : serverLogger

  // 记录应用初始化日志
  log.info(`应用初始化 [${import.meta.client ? '客户端' : '服务端'}]`)

  // 监听应用生命周期事件
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      log.info('应用已挂载')
    })
  }

  // 全局错误处理
  nuxtApp.hook('vue:error', (err) => {
    log.error('Vue错误:', err)
  })

  nuxtApp.hook('app:error', (err) => {
    log.error('应用错误:', err)
  })

  // 提供给应用使用
  return {
    provide: {
      logger: log,
      createLogger: (options: any) => new Logger(options),
    },
  }
})
