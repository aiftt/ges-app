/**
 * 步骤组件共享常量
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 添加菜单组件注入键
 * 更新日期: 2024-08-28 - 添加菜单组件注入键类型定义
 * 更新日期: 2024-08-29 - 完善IMenuContext接口定义，增强类型安全
 * 更新日期: 2024-08-30 - 更新IMenuContext接口支持路由模式
 */
import type { Ref } from 'vue'

// 定义步骤组件注入键
export const STEPS_INJECTION_KEY = Symbol('UiSteps')

// 菜单组件接口定义
export interface IMenuContext {
  state: {
    selectedKey: string
    openKeys: string[]
  }
  props: {
    mode: Ref<'vertical' | 'horizontal' | 'inline'>
    theme: Ref<'light' | 'dark'>
    collapsed: Ref<boolean>
    inlineIndent: Ref<number>
    trigger: Ref<'hover' | 'click'>
    itemSpacing: Ref<number>
    popupPlacement: Ref<'right' | 'left'>
    [key: string]: Ref<any>
  }
  router: boolean
  handleSelect: (key: string, to?: string) => void
  handleToggleOpen: (key: string) => void
}

// 定义菜单组件注入键
export const MENU_INJECTION_KEY = Symbol('UiMenu')
