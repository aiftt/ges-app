/**
 * 文本复制组合式函数
 * 创建日期: 2024-09-17
 * 作者: aiftt
 * 更新日期: 2024-09-17 - 添加对自定义工具提示的支持
 */

import type { Ref } from 'vue'
import logger from '~/utils/logger'

export interface UseCopyTextOptions {
  /**
   * 复制成功后的状态保持时间(ms)
   */
  successDuration?: number
  /**
   * 复制成功回调
   */
  onSuccess?: (text: string) => void
  /**
   * 复制失败回调
   */
  onError?: (error: Error) => void
  /**
   * 自定义工具提示文本
   * [0] - 默认提示文本
   * [1] - 复制成功提示文本
   */
  tooltips?: [string, string]
}

/**
 * 文本复制组合式函数
 * @param textSource 要复制的文本源（字符串、ref或返回字符串的函数）
 * @param options 配置选项
 * @returns 复制相关的状态和方法
 */
export function useCopyText(
  textSource: string | Ref<string> | (() => string | undefined | null),
  options: UseCopyTextOptions = {},
) {
  const copyLogger = logger.client.child({ tag: 'copy-text' })

  // 设置默认选项
  const {
    successDuration = 2000,
    onSuccess,
    onError,
    tooltips = ['复制', '已复制'],
  } = options

  // 复制状态
  const copied = ref(false)
  const copying = ref(false)
  const error = ref<Error | null>(null)

  // 当前工具提示文本
  const tooltipText = computed(() => {
    return copied.value ? tooltips[1] : tooltips[0]
  })

  /**
   * 执行复制操作
   */
  const copy = async () => {
    // 非客户端环境不执行
    if (!import.meta.client)
      return

    // 重置状态
    copied.value = false
    copying.value = true
    error.value = null

    try {
      // 获取要复制的文本
      let text: string = ''

      if (typeof textSource === 'function') {
        text = textSource() || ''
      }
      else if (isRef(textSource)) {
        text = textSource.value
      }
      else {
        text = textSource
      }

      if (!text) {
        copyLogger.warn('没有找到可复制的文本')
        return
      }

      copyLogger.info('复制文本', { length: text.length })

      // 执行复制
      await navigator.clipboard.writeText(text)

      // 复制成功
      copied.value = true
      copyLogger.info('文本复制成功')

      // 调用成功回调
      onSuccess?.(text)

      // 设置状态重置定时器
      setTimeout(() => {
        copied.value = false
      }, successDuration)
    }
    catch (err) {
      // 复制失败
      error.value = err instanceof Error ? err : new Error(String(err))
      copyLogger.error('文本复制失败', error.value)

      // 调用错误回调
      onError?.(error.value)
    }
    finally {
      copying.value = false
    }
  }

  return {
    copied,
    copying,
    error,
    tooltipText,
    copy,
  }
}
