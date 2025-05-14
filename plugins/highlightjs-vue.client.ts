/**
 * highlight.js Vue插件客户端集成
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 更新日期: 2024-11-30 - 初始化插件配置
 */

import { defineNuxtPlugin } from '#app'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { useLogger } from '~/composables/useLogger'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/atom-one-light.css'
import 'highlight.js/styles/monokai.css'
import 'highlight.js/styles/monokai-sublime.css'
import 'highlight.js/styles/vs.css'
import 'highlight.js/styles/vs2015.css'
import 'highlight.js/styles/a11y-dark.css'
import 'highlight.js/styles/a11y-light.css'
import 'highlight.js/styles/nord.css'

import 'highlight.js/styles/xcode.css'
import 'highlight.js/styles/tokyo-night-dark.css'
import 'highlight.js/styles/tokyo-night-light.css'
import 'highlight.js/lib/common'

export default defineNuxtPlugin((nuxtApp) => {
  const logger = useLogger('highlight.js')

  try {
    nuxtApp.vueApp.use(hljsVuePlugin)
    logger.info('高亮代码插件注册成功')
  }
  catch (error) {
    logger.error('高亮代码插件注册失败', error)
  }
})
