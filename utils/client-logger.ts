/**
 * 客户端日志工具
 * 创建日期: 2023-11-28
 * 作者: aiftt
 * 更新日期: 2023-11-28 - 初始实现
 */

import { Logger } from './logger'

// 客户端专用日志记录器
const clientLogger = typeof window !== 'undefined'
  ? new Logger({
    scope: 'client',
    tag: 'browser',
  })
  : new Logger({ scope: 'server-stub', tag: 'ssr' }) // 服务端渲染时提供一个基本的stub

export default clientLogger
