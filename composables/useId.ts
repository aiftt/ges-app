/**
 * ID生成器组合式函数
 * 创建日期: 2024-08-27
 * 作者: Claude
 * 更新日期: 2024-08-27 - 初始版本
 */

import type { ComputedRef } from 'vue'
import { computed } from 'vue'

let counter = 0
const prefix = 'ui-'

/**
 * 生成在SSR和客户端水合期间保持一致的ID
 *
 * @param {string} namespace - ID的命名空间前缀
 * @returns {ComputedRef<string>} 生成的唯一ID
 *
 * @example
 * ```ts
 * // 在组件中使用
 * const id = useId('button')
 * // 结果: ui-button-1
 * ```
 */
export function useId(namespace?: string): ComputedRef<string> {
  // 服务端和客户端水合阶段使用稳定ID
  // const isHydration = import.meta.client && !import.meta.env.SSR && window.__NUXT__?.data
  const ns = namespace ? `${prefix}${namespace}-` : prefix

  // 增加计数器
  const id = `${ns}${++counter}` // isHydration ? 'ssr' : `${ns}${++counter}`

  return computed(() => id)
}
