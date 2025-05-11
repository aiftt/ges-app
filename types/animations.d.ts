/**
 * 全局动画类型定义
 * 创建日期: 2023-11-21
 * 更新日期: 2024-07-03
 */

declare global {
  /**
   * 动画类型
   */
  type AnimationType = 'base' | 'slow' | 'little' | 'hard' | 'horizontal' | 'vertical' | 'rotate' | 'opacity' | 'crazy' | 'chunk'

  /**
   * 动画方向
   */
  type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
}

// 导出空对象以使文件被视为模块
export {}
