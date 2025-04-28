/**
 * Git提交包装脚本
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 更新日期: 2024-11-28 - 创建自动添加文件的提交包装脚本
 */

import { execSync } from 'node:child_process'
import * as process from 'node:process'

// 控制台颜色
const colors = {
  reset: '\x1B[0m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  red: '\x1B[31m',
}

// 简单日志函数
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

try {
  // 检查是否有文件在暂存区
  const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim()

  // 检查是否有未暂存的修改
  const changedFiles = execSync('git status --porcelain', { encoding: 'utf8' }).trim()

  // 如果没有文件在暂存区，但有未暂存的修改
  if (!stagedFiles && changedFiles) {
    log('没有文件在暂存区，自动执行 git add .', 'yellow')
    execSync('git add .', { stdio: 'inherit' })
    log('✅ 已自动添加所有修改的文件', 'green')
  } else if (!stagedFiles && !changedFiles) {
    log('没有修改需要提交', 'yellow')
    process.exit(0)
  }

  // 执行git-cz
  log('📝 启动提交流程...', 'blue')
  execSync('npx git-cz', { stdio: 'inherit' })

} catch (error) {
  // 如果是用户取消，不显示错误
  if (error.status === 130) {
    log('用户取消提交', 'yellow')
    process.exit(0)
  }

  log(`❌ 提交失败: ${error.message}`, 'red')
  process.exit(1)
}
