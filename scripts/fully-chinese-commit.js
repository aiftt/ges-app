/**
 * 完全汉化的Git提交脚本
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 更新日期: 2024-11-28 - 创建完全汉化的提交脚本
 */

import { execSync, spawnSync } from 'node:child_process'
import * as process from 'node:process'
import * as fs from 'node:fs'
import * as readline from 'node:readline'

// 控制台颜色
const colors = {
  reset: '\x1B[0m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  red: '\x1B[31m',
  cyan: '\x1B[36m',
  magenta: '\x1B[35m',
}

// 提交类型选项
const commitTypes = [
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
]

// 影响范围选项
const scopes = [
  '组件',
  'API',
  '页面',
  '工具',
  '服务',
  '文档',
  '配置',
  '依赖',
  '其他',
]

// 简单日志函数
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 创建readline接口
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

// 展示菜单并获取选择
function showMenu(title, options) {
  log(`\n${title}\n`, 'cyan')

  options.forEach((option, index) => {
    const displayText = typeof option === 'string'
      ? option
      : option.name
    log(`${index + 1}) ${displayText}`)
  })

  log('\n请输入选项编号: ', 'yellow')
}

// 获取用户输入
async function getUserInput(prompt) {
  const rl = createInterface()

  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${prompt}${colors.reset}`, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

// 获取Git用户信息
function getGitUserInfo() {
  let name
  let email

  try {
    name = execSync('git config --get user.name', { encoding: 'utf-8' }).trim()
    email = execSync('git config --get user.email', { encoding: 'utf-8' }).trim()
  } catch {
    // 忽略错误
  }

  return {
    name: name || 'aiftt',
    email: email || '',
  }
}

// 主函数
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

    log('📝 开始创建提交信息...', 'blue')

    // 1. 选择提交类型
    showMenu('选择你要提交的变更类型:', commitTypes)
    const typeIndexStr = await getUserInput('')
    const typeIndex = parseInt(typeIndexStr) - 1

    if (isNaN(typeIndex) || typeIndex < 0 || typeIndex >= commitTypes.length) {
      log('❌ 无效的选择，已取消提交', 'red')
      process.exit(1)
    }

    const selectedType = commitTypes[typeIndex].value
    log(`已选择: ${commitTypes[typeIndex].name}`, 'green')

    // 2. 输入影响范围
    log('\n选择变更的影响范围 (或直接按回车跳过):', 'cyan')
    scopes.forEach((scope, index) => {
      log(`${index + 1}) ${scope}`)
    })
    log(`${scopes.length + 1}) 自定义`)
    log(`${scopes.length + 2}) 跳过`)

    const scopeIndexStr = await getUserInput('\n请输入选项编号: ')
    const scopeIndex = parseInt(scopeIndexStr) - 1

    let scope = ''
    if (!isNaN(scopeIndex) && scopeIndex >= 0) {
      if (scopeIndex < scopes.length) {
        scope = scopes[scopeIndex]
        log(`已选择: ${scope}`, 'green')
      } else if (scopeIndex === scopes.length) {
        scope = await getUserInput('\n请输入自定义影响范围: ')
        log(`已输入: ${scope}`, 'green')
      }
    }

    // 3. 输入变更描述
    const subject = await getUserInput('\n请输入变更的简短描述 (必填): ')

    if (!subject) {
      log('❌ 变更描述不能为空，已取消提交', 'red')
      process.exit(1)
    }

    // 4. 输入详细描述
    const body = await getUserInput('\n请输入详细的变更描述 (可选，按回车跳过): ')

    // 5. 是否有不兼容变更
    const breakingConfirm = await getUserInput('\n是否包含不兼容变更? (y/N): ')
    const hasBreaking = breakingConfirm.toLowerCase() === 'y'

    let breaking = ''
    if (hasBreaking) {
      breaking = await getUserInput('\n请描述不兼容变更: ')
    }

    // 6. 是否关联Issue
    const issueConfirm = await getUserInput('\n是否关联Issue? (y/N): ')
    const hasIssue = issueConfirm.toLowerCase() === 'y'

    let issues = ''
    if (hasIssue) {
      issues = await getUserInput('\n请输入关联的Issue编号 (例如: #123, #456): ')
    }

    // 生成提交信息
    const scopeStr = scope ? `(${scope})` : ''
    let commitMessage = `${selectedType}${scopeStr}: ${subject}`

    if (body) {
      commitMessage += `\n\n${body}`
    }

    if (breaking) {
      commitMessage += `\n\n不兼容变更: ${breaking}`
    }

    if (issues) {
      commitMessage += `\n\n关联Issue: ${issues}`
    }

    // 添加作者信息
    const gitUser = getGitUserInfo()
    if (gitUser.name) {
      commitMessage += `\n\n署名: ${gitUser.name}`
      if (gitUser.email) {
        commitMessage += ` <${gitUser.email}>`
      }
    }

    // 预览提交信息
    log('\n📋 提交信息预览:', 'cyan')
    log('-----------------------------------', 'blue')
    log(commitMessage)
    log('-----------------------------------', 'blue')

    // 确认提交
    const confirmCommit = await getUserInput('\n确认提交? (y/N): ')

    if (confirmCommit.toLowerCase() !== 'y') {
      log('已取消提交', 'yellow')
      process.exit(0)
    }

    // 执行git commit
    log('\n执行提交...', 'blue')
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' })

    log('✅ 提交成功!', 'green')

    // 询问是否推送
    const confirmPush = await getUserInput('\n是否立即推送到远程仓库? (y/N): ')

    if (confirmPush.toLowerCase() === 'y') {
      const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
      log(`推送到远程分支: ${currentBranch}...`, 'blue')

      execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' })
      log('✅ 推送成功!', 'green')
    }

  } catch (error) {
    log(`❌ 提交过程出错: ${error.message}`, 'red')
    process.exit(1)
  }
}

// 执行主函数
main().catch((error) => {
  log(`❌ 未捕获错误: ${error.message}`, 'red')
  process.exit(1)
})
