/**
 * CommitLint配置文件
 *
 * 创建日期: 2024-11-29
 * 作者: aiftt
 * 用途: 验证Git提交消息格式
 */

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [0], // 允许任何格式的主题
    'header-max-length': [2, 'always', 100], // 限制标题行长度为100字符
  },
}
