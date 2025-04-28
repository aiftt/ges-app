/**
 * 通用日志工具
 * 创建日期: 2023-11-28
 * 作者: aiftt
 * 更新日期: 2023-11-28 - 初始实现
 */

// 日志级别定义
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// 日志选项接口
interface LogOptions {
  tag?: string
  timestamp?: boolean
  scope?: string
}

// 默认选项
const defaultOptions: LogOptions = {
  timestamp: true,
  scope: 'app',
}

// 颜色映射
const colorMap = {
  debug: '#7f8c8d', // 灰色
  info: '#2ecc71', // 绿色
  warn: '#f39c12', // 黄色
  error: '#e74c3c', // 红色
}

// 为客户端添加日志样式
function clientLogStyle(level: LogLevel) {
  return [
    `background: ${colorMap[level]}`,
    'color: white',
    'padding: 2px 4px',
    'border-radius: 2px',
    'font-weight: bold',
  ].join(';')
}

// 格式化日志内容，避免直接使用console.log/info
function formatLogContent(args: any[]): string {
  return args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
  ).join(' ')
}

/**
 * 创建带前缀的日志消息
 */
function createLogMessage(level: LogLevel, options: LogOptions, args: any[]): any[] {
  const { tag, timestamp, scope } = { ...defaultOptions, ...options }

  const prefix = []

  // 添加时间戳
  if (timestamp) {
    const now = new Date()
    const timeStr = now.toISOString().replace('T', ' ').replace('Z', '')
    prefix.push(`[${timeStr}]`)
  }

  // 添加作用域
  if (scope) {
    prefix.push(`[${scope}]`)
  }

  // 添加标签
  if (tag) {
    prefix.push(`[${tag}]`)
  }

  // 添加日志级别
  prefix.push(`[${level.toUpperCase()}]`)

  // 客户端带样式的日志
  if (typeof window !== 'undefined') {
    return [`%c${prefix.join(' ')}`, clientLogStyle(level), ...args]
  }

  // 服务端纯文本日志
  return [prefix.join(' '), ...args]
}

/**
 * 日志类
 */
export class Logger {
  private readonly options: LogOptions

  constructor(options: LogOptions = {}) {
    this.options = { ...defaultOptions, ...options }
  }

  /**
   * Debug级别日志
   */
  debug(...args: any[]): void {
    // 直接使用import.meta.dev判断是否为开发环境
    if ((typeof window !== 'undefined' && import.meta.dev) || (typeof window === 'undefined' && import.meta.dev)) {
      const logArgs = createLogMessage('debug', this.options, args)
      if (typeof window !== 'undefined') {
        // 客户端开发环境下使用console.debug
        // eslint-disable-next-line no-console
        console.debug(...logArgs)
      }
      else {
        // 服务端使用warn，符合ESLint规则
        const content = formatLogContent(args)
        console.warn(logArgs[0], `[DEBUG内容] ${content}`)
      }
    }
  }

  /**
   * Info级别日志
   */
  info(...args: any[]): void {
    const logArgs = createLogMessage('info', this.options, args)
    if (typeof window !== 'undefined') {
      // 客户端使用console.info
      // eslint-disable-next-line no-console
      console.info(...logArgs)
    }
    else {
      // 服务端使用warn，符合ESLint规则
      const content = formatLogContent(args)
      console.warn(logArgs[0], `[INFO内容] ${content}`)
    }
  }

  /**
   * Warn级别日志
   */
  warn(...args: any[]): void {
    const logArgs = createLogMessage('warn', this.options, args)
    // warn可以直接使用console.warn
    console.warn(...logArgs)
  }

  /**
   * Error级别日志
   */
  error(...args: any[]): void {
    const logArgs = createLogMessage('error', this.options, args)
    // error可以直接使用console.error
    console.error(...logArgs)
  }

  /**
   * 创建子日志记录器
   */
  child(options: LogOptions): Logger {
    return new Logger({
      ...this.options,
      ...options,
    })
  }
}

// 创建默认日志实例
const defaultLogger = new Logger()

// 导出默认实例和类
export default defaultLogger
