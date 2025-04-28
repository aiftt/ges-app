/**
 * Git提交包装脚本
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 更新日期: 2024-11-29 - 添加eslint语法检查，自动推送
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

// 执行命令函数，可以静默执行且返回是否成功
function runCommand(command, { silent = false, ignoreError = false } = {}) {
  try {
    if (!silent) {
      log(`执行: ${command}`, 'blue')
    }

    execSync(command, {
      stdio: silent ? 'pipe' : 'inherit',
      encoding: 'utf-8',
    })
    return true
  } catch (error) {
    if (!ignoreError && !silent) {
      log(`命令执行失败: ${command}`, 'red')
      if (error.stdout) log(error.stdout, 'yellow')
      if (error.stderr) log(error.stderr, 'red')
    }
    return false
  }
}

async function main() {
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

    // 运行ESLint检查
    log('🔍 运行ESLint语法检查...', 'blue')
    const lintSuccess = runCommand('pnpm lint')

    if (!lintSuccess) {
      log('❌ ESLint检查发现错误，请修复后再提交', 'red')
      log('提示: 你可以运行 pnpm lint 查看详细错误信息', 'yellow')
      process.exit(1)
    }

    log('✅ ESLint检查通过', 'green')

    // 执行commitizen
    log('📝 启动提交流程...', 'blue')

    try {
      // 使用cz命令
      execSync('npx cz', { stdio: 'inherit' })
      log('✅ 提交成功!', 'green')

      // 自动推送到远程仓库
      const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
      log(`🚀 自动推送到远程分支: ${currentBranch}...`, 'blue')

      execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' })
      log('✅ 推送成功!', 'green')

    } catch (commitError) {
      // 检查是否是用户取消
      if (commitError.status === 130) {
        log('用户取消提交', 'yellow')
        process.exit(0)
      }

      throw commitError
    }
  } catch (error) {
    log(`❌ 提交过程出错: ${error.message}`, 'red')
    process.exit(1)
  }
}

// 运行主函数
main().catch((error) => {
  console.error(`未捕获错误: ${error}`)
  process.exit(1)
})
