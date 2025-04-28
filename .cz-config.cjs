/**
 * Commitizen配置文件 - 完全中文化版本
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 更新日期: 2024-11-29 - 全面中文化配置
 */
module.exports = {
  // 定义提交类型
  types: [
    { value: 'feat', name: '✨ 新功能: 新增功能或特性' },
    { value: 'fix', name: '🐛 缺陷修复: 修复bug或问题' },
    { value: 'docs', name: '📚 文档更新: 仅文档变更' },
    { value: 'style', name: '💄 代码样式: 不影响代码功能的格式修改' },
    { value: 'refactor', name: '♻️ 代码重构: 既不修复错误也不添加功能的代码变更' },
    { value: 'perf', name: '⚡️ 性能优化: 提高性能的代码变更' },
    { value: 'test', name: '✅ 测试相关: 添加或修改测试' },
    { value: 'build', name: '📦 构建相关: 影响构建系统或外部依赖的更改' },
    { value: 'ci', name: '🔧 CI/CD: 持续集成/部署配置变更' },
    { value: 'chore', name: '🔨 杂项变更: 其他不修改源代码或测试文件的变更' },
    { value: 'revert', name: '⏪ 回滚: 恢复之前的提交' },
  ],

  // 定义影响范围
  scopes: [
    { name: '组件' },
    { name: 'API' },
    { name: '页面' },
    { name: '工具' },
    { name: '服务' },
    { name: '文档' },
    { name: '配置' },
    { name: '依赖' },
    { name: '其他' },
  ],

  // 是否允许自定义影响范围
  allowCustomScopes: true,

  // 自定义影响范围消息
  customScopeValidationRegex: /^[\w\u4E00-\u9FA5-]+$/,

  // 跳过的问题
  skipQuestions: ['breaking', 'footer', 'body'],

  // 提交消息格式化
  messages: {
    type: '请选择你要提交的变更类型:',
    scope: '请选择变更的影响范围 (可选):',
    customScope: '请输入自定义的影响范围:',
    subject: '请输入变更的简短描述 (必填):',
    body: '请输入详细的变更描述 (按回车跳过):',
    breaking: '请描述不兼容变更 (按回车跳过):',
    footer: '请输入关联的Issue编号，例如: #123, #456 (按回车跳过):',
    confirmCommit: '确认使用以上信息提交? (Y/n)',
  },

  // 主题的长度限制
  subjectLimit: 100,

  // 允许的破坏性变更类型
  allowBreakingChanges: ['feat', 'fix'],

  // 默认确认提交为"是"
  confirmationKeyword: 'y',
  defaultConfirmation: true,
}
