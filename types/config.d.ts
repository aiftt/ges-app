/**
 * 全局配置相关的类型定义
 * 创建日期: 2024-09-11
 * 更新日期: 2024-09-12 - 添加 Size 类型
 */

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark' | 'auto'

/**
 * 主题配置对象类型
 */
export type ThemeConfig = Record<string, any>

/**
 * 组件尺寸类型
 */
export type Size = 'small' | 'default' | 'large'

/**
 * 触发方式类型
 */
export type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'

/**
 * 表单布局类型
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

/**
 * 标签位置类型
 */
export type LabelPosition = 'left' | 'top' | 'right'
