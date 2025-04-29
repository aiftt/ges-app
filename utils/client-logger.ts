/**
 * 客户端日志工具 - 从logger中导出
 * 创建日期: 2023-12-06
 * 作者: aiftt
 * 说明: 为保持向后兼容，从logger.ts中导出client命名空间
 */

import logger from './logger'

// 导出client命名空间作为默认导出
export default logger.client
