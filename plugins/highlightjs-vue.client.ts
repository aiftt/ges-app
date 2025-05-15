/**
 * highlight.js Vue插件客户端集成
 * 创建日期: 2024-11-30
 * 作者: aiftt
 * 更新日期: 2024-11-30 - 初始化插件配置
 * 更新日期: 2024-12-16 - 添加对行号和高亮行的支持
 */

import { defineNuxtPlugin } from '#app'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { useLogger } from '~/composables/useLogger'

// 导入样式文件
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

// 导入行号插件
import 'highlight.js/lib/common'
import '~/assets/scss/highlightjs-line-numbers.scss'

// 注册常用语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('markdown', markdown)

export default defineNuxtPlugin((nuxtApp) => {
  const logger = useLogger('highlight.js')

  try {
    // 配置插件以支持行号和高亮行
    nuxtApp.vueApp.use(hljsVuePlugin, {
      hljs,
      // 自定义组件设置
      hljsOptions: {
        // 启用行号支持
        lineNumbers: true,
      },
    })

    logger.info('高亮代码插件注册成功')
  }
  catch (error) {
    logger.error('高亮代码插件注册失败', error)
  }
})
