/**
 * 客户端日志工具
 * 创建日期: 2023-11-28
 * 作者: aiftt
 * 更新日期: 2023-11-28 - 初始实现
 */

import { Logger } from './logger'

// 客户端专用日志记录器
const clientLogger = new Logger({
  scope: 'client',
  tag: 'browser',
})

export default clientLogger
