/**
 * 通用日志工具
 * 创建日期: 2023-11-28
 * 作者: aiftt
 * 更新日期: 2023-12-02 - 修复运行时环境检测
 * 更新日期: 2023-12-06 - 优化实现方式，添加client和server命名空间
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

// 检查是否为开发环境
const isDev = import.meta.client
  ? (import.meta.env?.MODE === 'development' || import.meta.env?.DEV === true)
  : (import.meta.env?.MODE === 'development' || import.meta.env?.DEV === true)

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
  if (import.meta.client) {
    return [`%c${prefix.join(' ')}`, clientLogStyle(level), ...args]
  }

  // 服务端纯文本日志
  return [prefix.join(' '), ...args]
}

/**
 * 日志类基类
 */
export class BaseLogger {
  protected readonly options: LogOptions

  constructor(options: LogOptions = {}) {
    this.options = { ...defaultOptions, ...options }
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

  /**
   * 创建内部使用的命名空间日志器
   */
  protected createNamespaceLogger(isClientSide: boolean): NamespaceLogger {
    return new NamespaceLogger(this.options, isClientSide)
  }
}

/**
 * 命名空间日志记录器
 * 用于实现特定环境(客户端/服务端)的日志
 */
export class NamespaceLogger {
  private readonly options: LogOptions
  private readonly isClientSide: boolean

  constructor(options: LogOptions = {}, isClientSide: boolean) {
    this.options = { ...defaultOptions, ...options }
    this.isClientSide = isClientSide
  }

  /**
   * Debug级别日志
   */
  debug(...args: any[]): void {
    // 仅在开发环境下输出debug日志
    if (!isDev)
      return

    // 如果是客户端日志但当前不在客户端环境，则不输出
    if (this.isClientSide && !import.meta.client)
      return
    // 如果是服务端日志但当前不在服务端环境，则不输出
    if (!this.isClientSide && !import.meta.server)
      return

    const logArgs = createLogMessage('debug', this.options, args)
    if (import.meta.client) {
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

  /**
   * Info级别日志
   */
  info(...args: any[]): void {
    // 如果是客户端日志但当前不在客户端环境，则不输出
    if (this.isClientSide && !import.meta.client)
      return
    // 如果是服务端日志但当前不在服务端环境，则不输出
    if (!this.isClientSide && !import.meta.server)
      return

    const logArgs = createLogMessage('info', this.options, args)
    if (import.meta.client) {
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
    // 如果是客户端日志但当前不在客户端环境，则不输出
    if (this.isClientSide && !import.meta.client)
      return
    // 如果是服务端日志但当前不在服务端环境，则不输出
    if (!this.isClientSide && !import.meta.server)
      return

    const logArgs = createLogMessage('warn', this.options, args)
    // warn可以直接使用console.warn
    console.warn(...logArgs)
  }

  /**
   * Error级别日志
   */
  error(...args: any[]): void {
    // 如果是客户端日志但当前不在客户端环境，则不输出
    if (this.isClientSide && !import.meta.client)
      return
    // 如果是服务端日志但当前不在服务端环境，则不输出
    if (!this.isClientSide && !import.meta.server)
      return

    const logArgs = createLogMessage('error', this.options, args)
    // error可以直接使用console.error
    console.error(...logArgs)
  }

  /**
   * 创建子日志记录器
   */
  child(options: LogOptions): NamespaceLogger {
    return new NamespaceLogger(
      {
        ...this.options,
        ...options,
      },
      this.isClientSide,
    )
  }
}

/**
 * 主日志类
 */
export class Logger extends BaseLogger {
  /**
   * 客户端日志命名空间
   */
  readonly client: NamespaceLogger

  /**
   * 服务端日志命名空间
   */
  readonly server: NamespaceLogger

  constructor(options: LogOptions = {}) {
    super(options)
    // 创建客户端和服务端专用logger
    this.client = this.createNamespaceLogger(true)
    this.server = this.createNamespaceLogger(false)
  }

  /**
   * Debug级别日志 - 自动判断环境
   */
  debug(...args: any[]): void {
    // 直接使用isDev判断是否为开发环境
    if (isDev) {
      const logArgs = createLogMessage('debug', this.options, args)
      if (import.meta.client) {
        // 客户端开发环境下使用console.debug
        // eslint-disable-next-line no-console
        console.debug(...logArgs)
      }
      else if (import.meta.server) {
        // 服务端使用warn，符合ESLint规则
        const content = formatLogContent(args)
        console.warn(logArgs[0], `[DEBUG内容] ${content}`)
      }
    }
  }

  /**
   * Info级别日志 - 自动判断环境
   */
  info(...args: any[]): void {
    const logArgs = createLogMessage('info', this.options, args)
    if (import.meta.client) {
      // 客户端使用console.info
      // eslint-disable-next-line no-console
      console.info(...logArgs)
    }
    else if (import.meta.server) {
      // 服务端使用warn，符合ESLint规则
      const content = formatLogContent(args)
      console.warn(logArgs[0], `[INFO内容] ${content}`)
    }
  }

  /**
   * Warn级别日志 - 自动判断环境
   */
  warn(...args: any[]): void {
    const logArgs = createLogMessage('warn', this.options, args)
    // warn可以直接使用console.warn
    console.warn(...logArgs)
  }

  /**
   * Error级别日志 - 自动判断环境
   */
  error(...args: any[]): void {
    const logArgs = createLogMessage('error', this.options, args)
    // error可以直接使用console.error
    console.error(...logArgs)
  }
}

// 创建默认日志实例
const defaultLogger = new Logger()

// 导出默认实例和类
export default defaultLogger
