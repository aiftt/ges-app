<script setup lang="ts" name="UiCheckboxGroup">
/**
 * 复选框组组件
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始版本
 */
import { computed, provide, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 选中的值数组
   */
  modelValue?: (string | number)[]
  /**
   * 复选框选项
   */
  options?: Array<{
    label: string
    value: string | number
    disabled?: boolean
  }>
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 复选框尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 最小可选数量
   */
  min?: number
  /**
   * 最大可选数量
   */
  max?: number
}>(), {
  modelValue: () => [],
  options: () => [],
  disabled: false,
  size: 'default',
  direction: 'horizontal',
  min: 0,
  max: Infinity,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}>()

// 内部选中值，使用ref跟踪
const selectedValues = ref<(string | number)[]>(props.modelValue)

// 监听外部传入的modelValue变化
watch(() => props.modelValue, (newVal) => {
  selectedValues.value = [...newVal]
})

// 处理子复选框选中状态变更
function handleCheckboxChange(value: string | number, checked: boolean) {
  const newSelectedValues = [...selectedValues.value]

  if (checked) {
    // 如果已达到最大选择数量且尝试添加新项
    if (newSelectedValues.length >= props.max && !newSelectedValues.includes(value)) {
      return
    }

    // 添加到选中列表
    if (!newSelectedValues.includes(value)) {
      newSelectedValues.push(value)
    }
  }
  else {
    // 如果移除后低于最小选择数量，阻止操作
    if (newSelectedValues.length <= props.min && newSelectedValues.includes(value)) {
      return
    }

    // 从选中列表移除
    const index = newSelectedValues.indexOf(value)
    if (index !== -1) {
      newSelectedValues.splice(index, 1)
    }
  }

  // 更新内部值和通知父组件
  selectedValues.value = newSelectedValues
  emit('update:modelValue', newSelectedValues)
  emit('change', newSelectedValues)
}

// 检查值是否被选中
function isChecked(value: string | number): boolean {
  return selectedValues.value.includes(value)
}

// 提供给子组件的上下文
provide('checkboxGroup', {
  name: 'checkboxGroup',
  modelValue: selectedValues,
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  handleChange: handleCheckboxChange,
  isChecked,
})

// 计算group的样式类
const groupClass = computed(() => {
  const classes = ['ui-checkbox-group']

  if (props.direction === 'vertical') {
    classes.push('ui-checkbox-group--vertical')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="groupClass">
    <!-- 渲染通过options属性传入的选项 -->
    <template v-if="options && options.length > 0">
      <ui-checkbox
        v-for="option in options"
        :key="option.value"
        :model-value="isChecked(option.value)"
        :disabled="disabled || option.disabled"
        :size="size"
        @change="(checked) => handleCheckboxChange(option.value, checked)"
      >
        {{ option.label }}
      </ui-checkbox>
    </template>

    <!-- 渲染插槽内容（自定义复选框） -->
    <slot />
  </div>
</template>

<style scoped>
.ui-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
}

.ui-checkbox-group--vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
