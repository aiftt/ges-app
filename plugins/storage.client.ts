/**
 * 存储系统初始化插件
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { initStorage } from '~/utils/storage'

export default defineNuxtPlugin(() => {
  // 初始化存储系统，自动清理过期项
  initStorage()
})
