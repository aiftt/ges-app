/**
 * 交互类型定义
 * 创建日期: 2024-09-13
 * 作者: aiftt
 * 包含所有与用户交互相关的类型
 * 更新日期: 2024-09-14 - 添加气泡确认、菜单、轮播相关类型
 */

/**
 * 触发方式
 */
export type Trigger = 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'

/**
 * 事件类型
 */
export type EventType = 'click' | 'change' | 'input' | 'focus' | 'blur'

/**
 * 加载状态
 */
export type LoadingType = 'spinner' | 'dots' | 'bars' | 'circle'

/**
 * 弹窗动画类型
 */
export type AnimationType = 'fade' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'

/**
 * 键盘导航键
 */
export type NavigationKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Enter' | 'Escape' | 'Tab'

/**
 * 拖拽方向
 */
export type DragDirection = 'x' | 'y' | 'both'

/**
 * 手势类型
 */
export type GestureType = 'tap' | 'press' | 'pan' | 'swipe' | 'pinch' | 'rotate'

/**
 * 气泡确认图标类型
 */
export type PopconfirmIconType = 'warning' | 'info' | 'success' | 'question' | 'error'

/**
 * 菜单触发方式
 */
export type MenuTrigger = 'hover' | 'click'

/**
 * 轮播图指示器触发方式
 */
export type CarouselTrigger = 'click' | 'hover'

/**
 * 提及组件位置
 */
export type MentionPlacement = 'bottom' | 'top'

/**
 * 无限滚动方向
 */
export type InfiniteScrollDirection = 'top' | 'bottom'

/**
 * 导航器类型
 */
export type NavigatorType = 'dot' | 'number' | 'text'
