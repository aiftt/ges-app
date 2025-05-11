<script setup lang="ts" name="UiSurelyForm">
/**
 * 高级表单组件 SurelyForm
 * 创建日期: 2024-09-01
 * 作者: Claude
 * 更新日期: 2024-09-01 - 首次创建
 */

import type { Component, VNode } from 'vue'
import { useVModel } from '@vueuse/core'
import { debounce } from 'lodash'
import { computed, provide, reactive, ref, watch } from 'vue'

// 表单项规则
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

// 表单项配置
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

// 表单选项
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

// 表单项验证结果
export interface IFormValidateResult {
  valid: boolean
  errors: Record<string, string[]>
  fields: Record<string, string[]>
}

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

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 表单绑定的数据对象
   */
  modelValue?: Record<string, any>
  /**
   * 表单项配置
   */
  schema?: IFormItem[]
  /**
   * 表单布局，可选 horizontal、vertical、inline
   */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /**
   * 标签宽度
   */
  labelWidth?: string | number
  /**
   * 标签位置
   */
  labelPosition?: 'left' | 'top' | 'right'
  /**
   * 是否禁用整个表单
   */
  disabled?: boolean
  /**
   * 表单规则变更时是否自动验证
   */
  validateOnRuleChange?: boolean
  /**
   * 是否隐藏必填字段的星号
   */
  hideRequiredAsterisk?: boolean
  /**
   * 表单尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 错误消息显示位置
   */
  errorMessagePosition?: 'inline' | 'bottom'
  /**
   * 提交失败是否滚动到错误位置
   */
  scrollToError?: boolean
  /**
   * 栅格间隔
   */
  gutter?: number
  /**
   * 每行的列数
   */
  colCount?: number
  /**
   * 表单校验规则
   */
  rules?: Record<string, IFormRule[]>
}>(), {
  modelValue: () => ({}),
  schema: () => [],
  layout: 'horizontal',
  labelWidth: '120px',
  labelPosition: 'left',
  disabled: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  size: 'medium',
  errorMessagePosition: 'bottom',
  scrollToError: true,
  gutter: 0,
  colCount: 1,
  rules: () => ({}),
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'validate', field: string, result: boolean, message: string): void
  (e: 'submit', formData: Record<string, any>, valid: boolean): void
  (e: 'reset'): void
}>()

// 双向绑定表单数据
const formModel = useVModel(props, 'modelValue', emit)

// 表单项验证状态
const formItemStates = reactive<Record<string, {
  valid: boolean
  errors: string[]
  validating: boolean
  hidden: boolean
  disabled: boolean
}>>({})

// 表单引用
const formRef = ref<HTMLFormElement | null>(null)

// 表单状态
const formState = reactive({
  isValidating: false,
  submitCount: 0,
  isSubmitting: false,
})

// 是否已经初始化过表单数据
const initialized = ref(false)

// 计算属性：合并后的表单配置项
const mergedSchema = computed(() => {
  return props.schema.map((item) => {
    // 从表单值中获取当前值，或使用默认值
    const value = formModel.value[item.field] !== undefined
      ? formModel.value[item.field]
      : (item.defaultValue !== undefined ? item.defaultValue : null)

    // 确保表单数据中有该字段
    if (formModel.value[item.field] === undefined && item.defaultValue !== undefined) {
      formModel.value[item.field] = item.defaultValue
    }

    // 处理表单项的隐藏和禁用状态
    if (!formItemStates[item.field]) {
      formItemStates[item.field] = {
        valid: true,
        errors: [],
        validating: false,
        hidden: Boolean(item.hidden),
        disabled: Boolean(item.disabled),
      }
    }
    else {
      // 更新隐藏和禁用状态
      formItemStates[item.field].hidden = Boolean(item.hidden)
      formItemStates[item.field].disabled = Boolean(item.disabled)
    }

    return {
      ...item,
      value,
    }
  })
})

// 计算属性：表单样式类
const formClass = computed(() => {
  const classes = ['ui-surely-form']

  classes.push(`ui-surely-form--${props.layout}`)
  classes.push(`ui-surely-form--size-${props.size}`)

  if (props.disabled) {
    classes.push('ui-surely-form--disabled')
  }

  if (props.labelPosition) {
    classes.push(`ui-surely-form--label-${props.labelPosition}`)
  }

  return classes
})

// 初始化表单默认值
function initFormDefaultValues() {
  if (initialized.value)
    return

  const newFormData = { ...formModel.value }

  props.schema.forEach((item) => {
    if (newFormData[item.field] === undefined && item.defaultValue !== undefined) {
      newFormData[item.field] = item.defaultValue
    }
  })

  formModel.value = newFormData
  initialized.value = true
}

// 获取嵌套对象的值
function getValueByPath(obj: any, path: string) {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return undefined
    }
    result = result[key]
  }

  return result
}

// 设置嵌套对象的值
function setValueByPath(obj: any, path: string, value: any) {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] === undefined || current[key] === null) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
  return obj
}

// 更新表单字段值
function updateFieldValue(field: string, value: any) {
  // 处理嵌套路径
  if (field.includes('.')) {
    const newFormData = { ...formModel.value }
    setValueByPath(newFormData, field, value)
    formModel.value = newFormData
  }
  else {
    // 普通字段直接更新
    formModel.value = {
      ...formModel.value,
      [field]: value,
    }
  }

  // 触发字段验证
  validateField(field).then((result) => {
    emit('validate', field, result.valid, result.errors[field]?.[0] || '')
  })
}

// 验证单个字段
async function validateField(field: string): Promise<IFormValidateResult> {
  // 获取该字段的规则
  const fieldRules = [...(props.rules[field] || []), ...(mergedSchema.value.find(item => item.field === field)?.rules || [])]

  // 如果没有规则，则直接返回验证通过
  if (!fieldRules.length) {
    return {
      valid: true,
      errors: {},
      fields: {},
    }
  }

  const fieldValue = getValueByPath(formModel.value, field)
  formItemStates[field].validating = true

  try {
    // 执行验证规则
    const errors: string[] = []

    for (const rule of fieldRules) {
      // 处理必填规则
      if (rule.required) {
        if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
          errors.push(rule.message || `${field} 是必填项`)
          continue
        }

        if (Array.isArray(fieldValue) && fieldValue.length === 0) {
          errors.push(rule.message || `${field} 是必填项`)
          continue
        }
      }

      // 处理长度规则
      if (rule.minLength !== undefined && typeof fieldValue === 'string') {
        if (fieldValue.length < rule.minLength) {
          errors.push(rule.message || `${field} 长度不能小于 ${rule.minLength}`)
          continue
        }
      }

      if (rule.maxLength !== undefined && typeof fieldValue === 'string') {
        if (fieldValue.length > rule.maxLength) {
          errors.push(rule.message || `${field} 长度不能大于 ${rule.maxLength}`)
          continue
        }
      }

      // 处理数值范围规则
      if (rule.min !== undefined && typeof fieldValue === 'number') {
        if (fieldValue < rule.min) {
          errors.push(rule.message || `${field} 不能小于 ${rule.min}`)
          continue
        }
      }

      if (rule.max !== undefined && typeof fieldValue === 'number') {
        if (fieldValue > rule.max) {
          errors.push(rule.message || `${field} 不能大于 ${rule.max}`)
          continue
        }
      }

      // 处理正则表达式规则
      if (rule.pattern && typeof fieldValue === 'string') {
        if (!rule.pattern.test(fieldValue)) {
          errors.push(rule.message || `${field} 格式不正确`)
          continue
        }
      }

      // 处理空白字符规则
      if (rule.whitespace && typeof fieldValue === 'string') {
        if (fieldValue.trim() === '') {
          errors.push(rule.message || `${field} 不能只包含空白字符`)
          continue
        }
      }

      // 处理类型规则
      if (rule.type) {
        const isValid = validateType(fieldValue, rule.type)
        if (!isValid) {
          errors.push(rule.message || `${field} 类型不正确，应为 ${rule.type}`)
          continue
        }
      }

      // 处理自定义验证器
      if (rule.validator) {
        try {
          const result = rule.validator(fieldValue, formModel.value)
          if (result instanceof Promise) {
            const asyncResult = await result
            if (!asyncResult) {
              errors.push(rule.message || `${field} 验证失败`)
            }
          }
          else if (!result) {
            errors.push(rule.message || `${field} 验证失败`)
          }
        }
        catch (err) {
          errors.push(rule.message || `${field} 验证失败: ${err}`)
        }
      }
    }

    // 更新验证状态
    formItemStates[field].valid = errors.length === 0
    formItemStates[field].errors = errors

    const result = {
      valid: errors.length === 0,
      errors: { [field]: errors },
      fields: { [field]: errors },
    }

    return result
  }
  finally {
    formItemStates[field].validating = false
  }
}

// 类型验证函数
function validateType(value: any, type: string): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value)
    case 'boolean':
      return typeof value === 'boolean'
    case 'array':
      return Array.isArray(value)
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value)
    case 'email':
      return typeof value === 'string' && /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value)
    case 'url':
      return typeof value === 'string' && /^https?:\/\/\S+$/.test(value)
    case 'date':
      return value instanceof Date && !Number.isNaN(value.getTime())
    default:
      return true
  }
}

// 验证整个表单
async function validate(): Promise<IFormValidateResult> {
  formState.isValidating = true

  try {
    const errors: Record<string, string[]> = {}
    const fields: Record<string, string[]> = {}
    let valid = true

    // 获取所有需要验证的字段
    const fieldsToValidate = mergedSchema.value
      .filter(item => !formItemStates[item.field]?.hidden)
      .map(item => item.field)

    // 并行执行所有字段的验证
    const validationResults = await Promise.all(
      fieldsToValidate.map(field => validateField(field)),
    )

    // 合并验证结果
    validationResults.forEach((result) => {
      if (!result.valid) {
        valid = false
        Object.keys(result.errors).forEach((field) => {
          errors[field] = result.errors[field]
          fields[field] = result.errors[field]
        })
      }
    })

    // 如果验证失败且需要滚动到错误位置
    if (!valid && props.scrollToError) {
      // 寻找第一个错误字段
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`)
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }

    return {
      valid,
      errors,
      fields,
    }
  }
  finally {
    formState.isValidating = false
  }
}

// 重置表单
function resetFields() {
  // 重置表单数据为默认值
  const defaultFormData = props.schema.reduce((acc, item) => {
    if (item.defaultValue !== undefined) {
      acc[item.field] = item.defaultValue
    }
    else {
      acc[item.field] = null
    }
    return acc
  }, {} as Record<string, any>)

  formModel.value = defaultFormData

  // 清除所有验证状态
  Object.keys(formItemStates).forEach((field) => {
    formItemStates[field].valid = true
    formItemStates[field].errors = []
  })

  emit('reset')
}

// 清除验证信息
function clearValidate(fields?: string | string[]) {
  const fieldsToClean = fields
    ? (Array.isArray(fields) ? fields : [fields])
    : Object.keys(formItemStates)

  fieldsToClean.forEach((field) => {
    if (formItemStates[field]) {
      formItemStates[field].valid = true
      formItemStates[field].errors = []
    }
  })
}

// 设置字段值
function setFieldValue(field: string, value: any) {
  updateFieldValue(field, value)
}

// 获取字段值
function getFieldValue(field: string) {
  return getValueByPath(formModel.value, field)
}

// 获取所有字段值
function getFieldValues() {
  return { ...formModel.value }
}

// 设置多个字段值
function setFieldValues(values: Record<string, any>) {
  formModel.value = {
    ...formModel.value,
    ...values,
  }
}

// 设置字段禁用状态
function setFieldsDisabled(fields: string[], disabled: boolean) {
  fields.forEach((field) => {
    if (formItemStates[field]) {
      formItemStates[field].disabled = disabled
    }
  })
}

// 设置字段隐藏状态
function setFieldsHidden(fields: string[], hidden: boolean) {
  fields.forEach((field) => {
    if (formItemStates[field]) {
      formItemStates[field].hidden = hidden
    }
  })
}

// 处理表单提交
async function handleSubmit(e: Event) {
  e.preventDefault()
  formState.submitCount++
  formState.isSubmitting = true

  try {
    // 验证表单
    const result = await validate()
    emit('submit', formModel.value, result.valid)
    return result
  }
  finally {
    formState.isSubmitting = false
  }
}

// 处理表单项变化
function handleFormItemChange(field: string, value: any) {
  updateFieldValue(field, value)

  // 找到对应的表单项配置
  const formItem = props.schema.find(item => item.field === field)

  // 执行配置中的 onChange 回调
  if (formItem?.onChange) {
    formItem.onChange(value, formModel.value)
  }

  // 执行配置中的 watch 回调
  if (formItem?.watch) {
    formItem.watch(value, getValueByPath(formModel.value, field), formModel.value)
  }
}

// 处理表单项失焦
function handleFormItemBlur(field: string) {
  const value = getValueByPath(formModel.value, field)

  // 找到对应的表单项配置
  const formItem = props.schema.find(item => item.field === field)

  // 执行配置中的 onBlur 回调
  if (formItem?.onBlur) {
    formItem.onBlur(value, formModel.value)
  }

  // 根据规则的触发条件验证
  const fieldRules = [...(props.rules[field] || []), ...(formItem?.rules || [])]
  const hasBlurTrigger = fieldRules.some(rule =>
    rule.trigger === 'blur' || (Array.isArray(rule.trigger) && rule.trigger.includes('blur')),
  )

  if (hasBlurTrigger) {
    validateField(field)
  }
}

// 处理表单项回车
function handleFormItemEnter(field: string) {
  const value = getValueByPath(formModel.value, field)

  // 找到对应的表单项配置
  const formItem = props.schema.find(item => item.field === field)

  // 执行配置中的 onEnter 回调
  if (formItem?.onEnter) {
    formItem.onEnter(value, formModel.value)
  }
}

// 表单实例接口
const formInstance: IFormInstance = {
  validate,
  resetFields,
  clearValidate,
  validateField,
  setFieldValue,
  getFieldValue,
  getFieldValues,
  setFieldValues,
  setFieldsDisabled,
  setFieldsHidden,
}

// 使用 provide 提供表单上下文
provide('formContext', {
  formModel,
  formItemStates,
  formState,
  updateFieldValue,
  validateField,
  labelWidth: computed(() => props.labelWidth),
  labelPosition: computed(() => props.labelPosition),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  errorMessagePosition: computed(() => props.errorMessagePosition),
  hideRequiredAsterisk: computed(() => props.hideRequiredAsterisk),
})

// 暴露表单实例
defineExpose(formInstance)

// 初始化表单
onMounted(() => {
  initFormDefaultValues()
})

// 监视规则变化
watch(() => props.rules, () => {
  if (props.validateOnRuleChange && initialized.value) {
    validate()
  }
}, { deep: true })

// 使用debounce优化字段验证，避免频繁触发
const _debouncedValidateField = debounce((field: string) => {
  validateField(field).then((result) => {
    emit('validate', field, result.valid, result.errors[field]?.[0] || '')
  })
}, 300)
</script>

<template>
  <form
    ref="formRef"
    :class="formClass"
    novalidate
    @submit="handleSubmit"
  >
    <!-- 表单内容区域 -->
    <div
      class="ui-surely-form-content"
      :style="{
        'grid-template-columns': layout !== 'inline' ? `repeat(${colCount}, 1fr)` : undefined,
        'gap': `${gutter}px`,
      }"
    >
      <!-- 遍历表单项 -->
      <div
        v-for="(item, index) in mergedSchema"
        v-show="!(formItemStates[item.field] && formItemStates[item.field].hidden)"
        :key="`${item.field}-${index}`" class="ui-surely-form-item"
        :class="[
          {
            'ui-surely-form-item--invalid': formItemStates[item.field] && !formItemStates[item.field].valid,
            'ui-surely-form-item--validating': formItemStates[item.field] && formItemStates[item.field].validating,
            'ui-surely-form-item--hidden': formItemStates[item.field] && formItemStates[item.field].hidden,
          },
        ]"
        :style="{
          'grid-column': item.colSpan ? `span ${item.colSpan}` : undefined,
        }"
        :data-field="item.field"
      >
        <!-- 表单项标签 -->
        <div
          v-if="item.label !== undefined"
          class="ui-surely-form-item-label"
          :style="{
            width: typeof item.labelWidth === 'string' || typeof item.labelWidth === 'number' ? item.labelWidth : (labelWidth as string | number),
            textAlign: (item.labelPosition || labelPosition) as 'left' | 'right' | 'center',
          }"
        >
          <label>
            <span v-if="(item.required || (item.rules && item.rules.some(rule => rule.required))) && !hideRequiredAsterisk" class="ui-surely-form-item-required">*</span>
            {{ item.label }}
          </label>
        </div>

        <!-- 表单项内容 -->
        <div class="ui-surely-form-item-content">
          <!-- 使用 render 函数渲染 -->
          <template v-if="item.render">
            <component :is="item.render(formModel)" />
          </template>

          <!-- 使用组件渲染 -->
          <component
            :is="item.component"
            v-else-if="item.component"
            v-model="formModel[item.field]"
            v-bind="item.componentProps || {}"
            :disabled="(formItemStates[item.field] && formItemStates[item.field].disabled) || disabled"
            :placeholder="item.placeholder"
            @update:model-value="(val: any) => handleFormItemChange(item.field, val)"
            @change="(val: any) => handleFormItemChange(item.field, val)"
            @blur="() => handleFormItemBlur(item.field)"
            @keydown.enter="() => handleFormItemEnter(item.field)"
          />

          <!-- 使用输入框渲染 -->
          <input
            v-else
            :value="formModel[item.field]"
            :placeholder="item.placeholder"
            :disabled="(formItemStates[item.field] && formItemStates[item.field].disabled) || disabled"
            class="ui-surely-form-item-input"
            @input="(e) => handleFormItemChange(item.field, (e.target as HTMLInputElement).value)"
            @blur="() => handleFormItemBlur(item.field)"
            @keydown.enter="() => handleFormItemEnter(item.field)"
          >

          <!-- 提示信息 -->
          <div v-if="item.tips" class="ui-surely-form-item-tip">
            {{ item.tips }}
          </div>

          <!-- 错误信息 -->
          <div
            v-if="formItemStates[item.field] && !formItemStates[item.field].valid && formItemStates[item.field].errors.length > 0"
            class="ui-surely-form-item-error"
          >
            {{ formItemStates[item.field].errors[0] }}
          </div>
        </div>
      </div>
    </div>

    <!-- 可选的表单操作区域，可通过插槽自定义 -->
    <div class="ui-surely-form-actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.ui-surely-form {
  // CSS变量已迁移到主题文件: assets/scss/themes/light.scss 和 dark.scss 中
  font-size: var(--ui-form-font-size);
  line-height: var(--ui-form-line-height);
  color: var(--ui-form-text-color);
}

// 表单尺寸
.ui-surely-form--size-small {
  --ui-form-font-size: 12px;
  --ui-form-input-height: 28px;
  --ui-form-input-padding: 0 8px;
  --ui-form-gap: 12px;
}

.ui-surely-form--size-large {
  --ui-form-font-size: 16px;
  --ui-form-input-height: 44px;
  --ui-form-input-padding: 0 16px;
  --ui-form-gap: 20px;
}

// 表单布局
.ui-surely-form--horizontal {
  .ui-surely-form-content {
    display: grid;
  }

  .ui-surely-form-item {
    display: flex;
    margin-bottom: var(--ui-form-gap);
  }

  .ui-surely-form-item-label {
    flex-shrink: 0;
    padding-right: 12px;
  }

  .ui-surely-form-item-content {
    flex: 1;
  }
}

.ui-surely-form--vertical {
  .ui-surely-form-content {
    display: grid;
  }

  .ui-surely-form-item {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--ui-form-gap);
  }

  .ui-surely-form-item-label {
    margin-bottom: 8px;
  }
}

.ui-surely-form--inline {
  .ui-surely-form-content {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-form-gap);
  }

  .ui-surely-form-item {
    display: flex;
    align-items: center;
  }

  .ui-surely-form-item-label {
    flex-shrink: 0;
    margin-right: 8px;
  }
}

// 表单禁用状态
.ui-surely-form--disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

// 表单项
.ui-surely-form-item {
  position: relative;
}

.ui-surely-form-item--hidden {
  display: none;
}

.ui-surely-form-item-label {
  color: var(--ui-form-label-color);

  label {
    display: inline-flex;
    align-items: center;
  }
}

.ui-surely-form-item-required {
  color: var(--ui-form-required-color);
  margin-right: 4px;
}

.ui-surely-form-item-content {
  position: relative;
}

.ui-surely-form-item-input {
  width: 100%;
  height: var(--ui-form-input-height);
  border: 1px solid var(--ui-form-border-color);
  border-radius: var(--ui-form-input-radius);
  background-color: var(--ui-form-bg-color);
  color: var(--ui-form-text-color);
  padding: var(--ui-form-input-padding);
  font-size: var(--ui-form-font-size);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    border-color: var(--ui-form-focus-border);
    box-shadow: 0 0 0 3px var(--ui-form-focus-shadow);
    outline: none;
  }

  &:disabled {
    background-color: var(--ui-form-disabled-bg);
    color: var(--ui-form-disabled-color);
    cursor: not-allowed;
  }
}

.ui-surely-form-item-tip {
  font-size: 12px;
  color: var(--ui-form-tip-color);
  margin-top: 4px;
}

.ui-surely-form-item-error {
  font-size: 12px;
  color: var(--ui-form-error-color);
  margin-top: 4px;
}

.ui-surely-form-item--invalid {
  .ui-surely-form-item-input {
    border-color: var(--ui-form-error-color);
  }
}

.ui-surely-form-item--validating {
  .ui-surely-form-item-content::after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid var(--ui-form-border-color);
    border-top-color: var(--ui-form-focus-border);
    border-radius: 50%;
    animation: ui-form-spin 0.6s linear infinite;
  }
}

// 表单操作区域
.ui-surely-form-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

// 动画
@keyframes ui-form-spin {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
