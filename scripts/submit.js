/**
 * 跨平台提交脚本
 * 自动添加文件、提交并推送到远程仓库
 *
 * 创建日期: 2024-11-28
 * 作者: aiftt
 * 更新日期: 2024-11-28 - 增强错误处理和添加更多功能
 */

import { execSync } from 'node:child_process'
import * as process from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
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

// 命令行参数
const args = process.argv.slice(2)
const options = {
  skipPull: args.includes('--skip-pull'),
  skipTest: args.includes('--skip-test'),
  force: args.includes('--force'),
  help: args.includes('--help') || args.includes('-h'),
  selectiveAdd: args.includes('--selective'),
  noPush: args.includes('--no-push'),
  branch: getBranchOption(args),
}

// 解析分支参数
function getBranchOption(args) {
  const branchIndex = args.findIndex((arg) => arg === '--branch' || arg === '-b')
  if (branchIndex >= 0 && branchIndex < args.length - 1) {
    return args[branchIndex + 1]
  }
  return null
}

// 创建readline接口
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

// 打印带颜色的消息
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 执行命令并捕获输出
function runCommand(command, errorMessage, { silent = false, captureOutput = false } = {}) {
  try {
    if (!silent) {
      log(`执行: ${command}`, 'blue')
    }

    const options = { encoding: 'utf8' }

    if (captureOutput) {
      return execSync(command, options).trim()
    } else {
      execSync(command, { ...options, stdio: 'inherit' })
      return true
    }
  }
  catch (error) {
    if (!silent) {
      log(`❌ ${errorMessage || '命令执行失败'}`, 'red')
      log(`命令: ${command}`, 'yellow')
      if (error.message) {
        log(`错误详情: ${error.message}`, 'red')
      }
    }

    if (captureOutput) {
      return null
    }

    throw error
  }
}

// 检查依赖是否已安装
function checkDependencies() {
  try {
    // 检查git
    runCommand('git --version', '无法找到git命令', { silent: true, captureOutput: true })

    // 检查package.json是否存在
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      log('⚠️ 未找到package.json文件', 'yellow')
      return false
    }

    // 检查commitizen和git-cz
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const hasCommitizen = (packageJson.dependencies && packageJson.dependencies.commitizen) ||
                          (packageJson.devDependencies && packageJson.devDependencies.commitizen)

    if (!hasCommitizen) {
      log('⚠️ 未找到commitizen依赖，正在安装...', 'yellow')
      runCommand('pnpm add -D commitizen git-cz', '安装commitizen失败')
    }

    return true
  } catch (error) {
    log(`依赖检查失败: ${error.message}`, 'red')
    return false
  }
}

// 获取当前分支
function getCurrentBranch() {
  return runCommand('git rev-parse --abbrev-ref HEAD', '获取当前分支失败', { captureOutput: true })
}

// 获取未提交的更改列表
function getChangedFiles() {
  const status = runCommand('git status --porcelain', '获取文件状态失败', { captureOutput: true })
  if (!status) return []

  return status.split('\n').filter((line) => line.trim())
}

// 显示文件更改列表
function displayChangedFiles(files) {
  if (files.length === 0) {
    log('没有文件更改', 'yellow')
    return
  }

  log('📄 已更改的文件:', 'cyan')
  files.forEach((file, index) => {
    const status = file.substring(0, 2)
    const filename = file.substring(3)
    let statusText = ''

    if (status.includes('M')) statusText = '修改'
    else if (status.includes('A')) statusText = '新增'
    else if (status.includes('D')) statusText = '删除'
    else if (status.includes('R')) statusText = '重命名'
    else if (status.includes('C')) statusText = '复制'
    else if (status.includes('U')) statusText = '未合并'
    else if (status.includes('?')) statusText = '未跟踪'

    log(`  ${index + 1}. [${statusText}] ${filename}`, status.includes('?') ? 'yellow' : 'green')
  })
}

// 选择性添加文件
async function selectiveAdd(files) {
  if (files.length === 0) {
    log('没有可以添加的文件', 'yellow')
    return false
  }

  displayChangedFiles(files)
  log('\n请选择要添加的文件（输入序号，多个用逗号分隔，输入"a"全选，输入"q"退出）:', 'cyan')

  const rl = createInterface()

  return new Promise((resolve) => {
    rl.question('> ', (answer) => {
      rl.close()

      if (answer.toLowerCase() === 'q') {
        log('已取消操作', 'yellow')
        resolve(false)
        return
      }

      if (answer.toLowerCase() === 'a') {
        log('添加所有文件', 'green')
        runCommand('git add .', '添加文件失败')
        resolve(true)
        return
      }

      try {
        const selected = answer.split(',')
          .map((n) => parseInt(n.trim()))
          .filter((n) => !isNaN(n) && n > 0 && n <= files.length)

        if (selected.length === 0) {
          log('未选择任何文件，已取消操作', 'yellow')
          resolve(false)
          return
        }

        selected.forEach((n) => {
          const file = files[n - 1]
          const filename = file.substring(3)
          runCommand(`git add "${filename}"`, `添加文件 ${filename} 失败`)
          log(`已添加: ${filename}`, 'green')
        })

        resolve(true)
      } catch (error) {
        log(`添加文件失败: ${error.message}`, 'red')
        resolve(false)
      }
    })
  })
}

// 拉取最新代码
function pullLatestChanges(branch) {
  try {
    log('🔄 从远程仓库拉取最新代码...', 'yellow')
    runCommand(`git pull origin ${branch}`, '拉取代码失败')
    return true
  } catch {
    if (options.force) {
      log('⚠️ 拉取代码失败，但因为使用了--force标志，将继续执行', 'yellow')
      return true
    }
    return false
  }
}

// 运行测试
function runTests() {
  try {
    log('🧪 运行测试...', 'yellow')

    // 检查package.json中是否有test脚本
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    if (packageJson.scripts && packageJson.scripts.test) {
      runCommand('pnpm test', '测试失败')
    } else {
      log('⚠️ 未找到测试脚本，跳过测试', 'yellow')
    }

    return true
  } catch {
    if (options.force) {
      log('⚠️ 测试失败，但因为使用了--force标志，将继续执行', 'yellow')
      return true
    }
    return false
  }
}

// 运行代码检查
function runLint() {
  try {
    log('🔍 运行代码检查...', 'yellow')

    // 检查package.json中是否有lint脚本
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    if (packageJson.scripts && packageJson.scripts.lint) {
      runCommand('pnpm lint', '代码检查失败')
    } else {
      log('⚠️ 未找到lint脚本，跳过代码检查', 'yellow')
    }

    return true
  } catch {
    if (options.force) {
      log('⚠️ 代码检查失败，但因为使用了--force标志，将继续执行', 'yellow')
      return true
    }
    return false
  }
}

// 检查分支
function checkBranch(branch) {
  const currentBranch = getCurrentBranch()

  if (branch && currentBranch !== branch) {
    log(`⚠️ 当前分支(${currentBranch})与目标分支(${branch})不符`, 'yellow')

    if (!options.force) {
      log('请切换到正确的分支或使用--force标志强制提交', 'red')
      return false
    }

    log('由于使用了--force标志，将继续在当前分支上提交', 'yellow')
  }

  return true
}

// 使用commitizen提交
async function createCommit() {
  log('📝 创建规范提交信息...', 'yellow')

  try {
    // 使用pnpm commit（实际上会执行git-cz命令）
    runCommand('pnpm commit', '提交失败')
    return true
  } catch {
    return false
  }
}

// 推送到远程仓库
function pushToRemote(branch) {
  try {
    log('⬆️ 推送到远程仓库...', 'yellow')
    runCommand(`git push origin ${branch}`, '推送失败')
    return true
  } catch {
    return false
  }
}

// 显示帮助信息
function showHelp() {
  log('🔍 代码提交助手使用说明', 'cyan')
  log('\n用法: pnpm submit [选项]\n', 'reset')

  log('选项:', 'yellow')
  log('  --help, -h          显示帮助信息', 'reset')
  log('  --skip-pull         跳过从远程拉取代码', 'reset')
  log('  --skip-test         跳过测试', 'reset')
  log('  --selective         选择性添加文件', 'reset')
  log('  --no-push           不推送到远程仓库', 'reset')
  log('  --force             忽略警告继续执行', 'reset')
  log('  --branch, -b <分支名> 指定要提交的分支', 'reset')

  log('\n示例:', 'yellow')
  log('  pnpm submit                      # 常规提交流程', 'reset')
  log('  pnpm submit --selective          # 选择性添加文件', 'reset')
  log('  pnpm submit --skip-test --force  # 跳过测试并强制提交', 'reset')
}

// 主函数
async function main() {
  if (options.help) {
    showHelp()
    return
  }

  log('🚀 开始提交流程...', 'green')

  // 检测系统平台
  const isWindows = process.platform === 'win32'
  log(`检测到操作系统: ${isWindows ? 'Windows' : 'Unix/Linux/MacOS'}`, 'blue')

  try {
    // 检查依赖
    if (!checkDependencies()) {
      log('❌ 依赖检查失败，请安装所需依赖后重试', 'red')
      return
    }

    // 获取当前分支
    const currentBranch = getCurrentBranch()
    const targetBranch = options.branch || currentBranch

    log(`📌 当前分支: ${currentBranch}`, 'magenta')

    // 检查分支
    if (!checkBranch(targetBranch)) {
      return
    }

    // 拉取最新代码
    if (!options.skipPull && !pullLatestChanges(targetBranch)) {
      log('❌ 拉取最新代码失败，终止提交流程', 'red')
      log('💡 提示: 使用 --skip-pull 跳过拉取步骤，或使用 --force 强制继续', 'cyan')
      return
    }

    // 获取更改的文件
    const changedFiles = getChangedFiles()

    if (changedFiles.length === 0) {
      log('⚠️ 没有需要提交的更改，退出流程', 'yellow')
      return
    }

    // 添加文件到暂存区
    if (options.selectiveAdd) {
      log('🔍 进入选择性添加模式...', 'yellow')
      const added = await selectiveAdd(changedFiles)
      if (!added) {
        log('❌ 添加文件失败或操作被取消，终止提交流程', 'red')
        return
      }
    } else {
      log('📁 添加所有文件到暂存区...', 'yellow')
      displayChangedFiles(changedFiles)
      runCommand('git add .', '添加文件失败')
    }

    // 运行代码检查
    if (!runLint()) {
      log('❌ 代码检查失败，终止提交流程', 'red')
      log('💡 提示: 使用 --force 强制继续', 'cyan')
      return
    }

    // 运行测试
    if (!options.skipTest && !runTests()) {
      log('❌ 测试失败，终止提交流程', 'red')
      log('💡 提示: 使用 --force 强制继续', 'cyan')
      return
    }

    // 创建提交
    if (!await createCommit()) {
      log('❌ 创建提交失败，终止提交流程', 'red')
      return
    }

    // 推送到远程仓库
    if (!options.noPush) {
      if (!pushToRemote(targetBranch)) {
        log('❌ 推送到远程仓库失败', 'red')
        log('💡 提示: 可能需要先拉取最新代码解决冲突', 'cyan')
        return
      }
    } else {
      log('⚠️ 已跳过推送到远程仓库', 'yellow')
      log('💡 提示: 使用 git push 手动推送', 'cyan')
    }

    log('✅ 所有操作已完成!', 'green')
  }
  catch (err) {
    log(`❌ 提交过程中出现错误: ${err.message}`, 'red')
    process.exit(1)
  }
}

// 执行主函数
main().catch((error) => {
  log(`❌ 未捕获错误: ${error.message}`, 'red')
  process.exit(1)
})
