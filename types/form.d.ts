/**
 * 表单相关的类型定义
 * 创建日期: 2024-09-11
 */

import type { Component, VNode } from 'vue'

/**
 * 表单项规则
 */
export interface IFormRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change' | 'submit' | Array<'blur' | 'change' | 'submit'>
  validator?: (value: any, formData: any) => boolean | Promise<boolean>
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  whitespace?: boolean
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url' | 'date'
}

/**
 * 表单项配置
 */
export interface IFormItem {
  field: string
  label?: string
  value?: any
  rules?: IFormRule[]
  component?: Component | string
  componentProps?: Record<string, any>
  defaultValue?: any
  placeholder?: string
  tips?: string
  disabled?: boolean
  hidden?: boolean
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  colSpan?: number
  validator?: (value: any, formData: any) => boolean | Promise<boolean>
  watch?: (value: any, oldValue: any, formData: any) => void
  onChange?: (value: any, formData: any) => void
  onBlur?: (value: any, formData: any) => void
  onEnter?: (value: any, formData: any) => void
  render?: (formData: any) => VNode
  required?: boolean
}

/**
 * 表单选项
 */
export interface IFormOptions {
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  layout?: 'horizontal' | 'vertical' | 'inline'
  model?: Record<string, any>
  schema?: IFormItem[]
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  size?: 'small' | 'medium' | 'large'
  errorMessagePosition?: 'inline' | 'bottom'
  scrollToError?: boolean
  gutter?: number
  colCount?: number
  rules?: Record<string, IFormRule[]>
}

/**
 * 表单项验证结果
 */
export interface IFormValidateResult {
  valid: boolean
  errors: Record<string, string[]>
  fields: Record<string, string[]>
}

/**
 * 表单实例接口
 */
export interface IFormInstance {
  validate: () => Promise<IFormValidateResult>
  resetFields: () => void
  clearValidate: (fields?: string | string[]) => void
  validateField: (field: string) => Promise<IFormValidateResult>
  setFieldValue: (field: string, value: any) => void
  getFieldValue: (field: string) => any
  getFieldValues: () => Record<string, any>
  setFieldValues: (values: Record<string, any>) => void
  setFieldsDisabled: (fields: string[], disabled: boolean) => void
  setFieldsHidden: (fields: string[], hidden: boolean) => void
}
