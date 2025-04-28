/**
 * 服务端日志工具
 * 创建日期: 2023-11-28
 * 作者: aiftt
 * 更新日期: 2023-11-28 - 初始实现
 */

import { Logger } from './logger'

// 服务端专用日志记录器
const serverLogger = new Logger({
  scope: 'server',
  tag: 'node',
})

export default serverLogger
