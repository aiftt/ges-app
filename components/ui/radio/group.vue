<script setup lang="ts" name="UiRadioGroup">
/**
 * 单选按钮组组件
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-06-12 - 初始版本
 */
import { computed, provide, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 选中的值
   */
  modelValue?: string | number
  /**
   * 单选按钮选项
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
   * 单选按钮尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 排列方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 组名称，用于原生表单提交
   */
  name?: string
}>(), {
  disabled: false,
  size: 'default',
  direction: 'horizontal',
  options: () => [],
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

// 内部选中值，使用ref跟踪
const selectedValue = ref<string | number | undefined>(props.modelValue)

// 生成一个稳定的radio组名称
const groupId = ref<string>(props.name || 'ui-radio-group')

// 监听外部传入的modelValue变化
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

// 处理单选按钮选中状态变更
function handleRadioChange(value: string | number) {
  selectedValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

// 提供给子组件的上下文
provide('radioGroup', {
  name: computed(() => props.name || groupId.value),
  modelValue: computed(() => selectedValue.value),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  handleChange: handleRadioChange,
})

// 计算group的样式类
const groupClass = computed(() => {
  const classes = ['ui-radio-group']

  if (props.direction === 'vertical') {
    classes.push('ui-radio-group--vertical')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="groupClass">
    <!-- 渲染通过options属性传入的选项 -->
    <template v-if="options && options.length > 0">
      <ui-radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="disabled || option.disabled"
        :size="size"
        :name="name"
      >
        {{ option.label }}
      </ui-radio>
    </template>

    <!-- 渲染插槽内容（自定义单选按钮） -->
    <slot />
  </div>
</template>

<style scoped>
.ui-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
}

.ui-radio-group--vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
