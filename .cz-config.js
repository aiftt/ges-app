module.exports = {
  // 使用中文提示
  messages: {
    type: '选择你要提交的变更类型:',
    scope: '此变更的影响范围(组件或文件名):',
    customScope: '请输入自定义的影响范围:',
    subject: '写一个简短的变更描述:',
    body: '提供更详细的变更描述(可选，按回车跳过):\n',
    breaking: '列出不兼容变更(可选，按回车跳过):\n',
    footer: '列出关闭的议题(可选，例如: #123, #456):\n',
    confirmCommit: '确认以上提交信息?',
  },

  // 设置选择类型的中文说明
  types: [
    { value: 'feat', name: 'feat:     ✨ 新功能' },
    { value: 'fix', name: 'fix:      🐛 修复缺陷' },
    { value: 'docs', name: 'docs:     📚 文档更新' },
    { value: 'style', name: 'style:    💄 代码格式(不影响功能)' },
    { value: 'refactor', name: 'refactor: ♻️  代码重构(不是新功能也不是修复缺陷)' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化' },
    { value: 'test', name: 'test:     ✅ 测试相关' },
    { value: 'build', name: 'build:    📦 构建相关' },
    { value: 'ci', name: 'ci:       🔧 CI/CD配置' },
    { value: 'chore', name: 'chore:    🔨 其他修改' },
    { value: 'revert', name: 'revert:   ⏪️ 回滚提交' },
  ],

  // 设置影响范围
  scopes: [
    { name: 'api' },
    { name: 'ui' },
    { name: 'components' },
    { name: 'pages' },
    { name: 'utils' },
    { name: 'services' },
    { name: 'docs' },
    { name: 'config' },
    { name: 'deps' },
    { name: 'other' },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'refactor'],

  // 跳过问题
  skipQuestions: ['footer'],

  // 设置主题变更描述的长度限制
  subjectLimit: 100,

  // 设置详细信息的换行长度
  breaklineChar: '|',

  // 添加自定义的提交信息格式
  formatMessageCB: function(messageConfig) {
    const scope = messageConfig.scope ? `(${messageConfig.scope})` : ''
    let message = `${messageConfig.type}${scope}: ${messageConfig.subject}`

    if (messageConfig.body) {
      message += `\n\n${messageConfig.body.split('|').join('\n')}`
    }

    if (messageConfig.breaking) {
      message += `\n\n不兼容变更: ${messageConfig.breaking.split('|').join('\n')}`
    }

    return message
  },
}
