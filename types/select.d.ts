/**
 * 选择器相关的类型定义
 * 创建日期: 2024-09-11
 */

import type { TagType } from './ui'

/**
 * 选择器选项接口
 */
export interface ISelectOption {
  value: string | number
  label: string
  disabled?: boolean
  class?: string
  style?: Record<string, string>
  // 为分组功能添加
  children?: ISelectOption[]
  // 为自定义标签添加
  tagType?: TagType
  tagClass?: string
}

/**
 * 自动完成选项
 */
export interface IAutocompleteOption {
  value: string | number
  label: string
  disabled?: boolean
}

/**
 * 选项组接口
 */
export interface IOptionGroup {
  label: string
  options: IAutocompleteOption[]
  disabled?: boolean
}

/**
 * 级联选择器选项接口
 */
export interface ICascaderOption {
  value: string | number
  label: string
  children?: ICascaderOption[]
  disabled?: boolean
  leaf?: boolean
  [key: string]: any
}

/**
 * 提及组件选项接口
 */
export interface IMentionOption {
  value: string
  label: string
  disabled?: boolean
  avatar?: string
}

/**
 * 分段控制器选项接口
 */
export interface ISegmentOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: string
}

/**
 * 过滤方法类型
 */
export type FilterMethod = (value: string, option: ISelectOption) => boolean

/**
 * 远程搜索方法类型
 */
export type RemoteMethod = (query: string) => void
