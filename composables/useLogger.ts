/**
 * Logger组合式函数
 * 创建日期: 2024-06-24
 * 作者: aiftt
 * 更新日期: 2024-06-24 - 初始版本
 */

import { Logger } from '~/utils/logger'

/**
 * 使用日志记录器
 * @param {string} tag 日志标签，通常是组件或模块名称
 * @param {string} scope 日志作用域，默认为'app'
 * @returns {Logger} 日志记录器实例
 */
export function useLogger(tag: string, scope: string = 'app'): Logger {
  return new Logger({ tag, scope })
}
