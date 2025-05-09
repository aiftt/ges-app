<script setup lang="ts" name="UiRate">
import { useVModel } from '@vueuse/core'
/**
 * 评分组件
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */
import { computed, ref } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: number
  /**
   * 最大分值
   */
  max?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 是否允许半选
   */
  allowHalf?: boolean
  /**
   * 是否允许清空
   */
  clearable?: boolean
  /**
   * 评分图标
   */
  icon?: string
  /**
   * 未选中图标
   */
  voidIcon?: string
  /**
   * 自定义评分颜色
   */
  color?: string
  /**
   * 未选中时的颜色
   */
  voidColor?: string
  /**
   * 不同分值对应的颜色，可用于分级评价
   */
  colors?: string[]
  /**
   * 图标大小
   */
  size?: 'small' | 'default' | 'large' | number
  /**
   * 是否显示辅助文字
   */
  showText?: boolean
  /**
   * 辅助文字字典
   */
  texts?: string[]
  /**
   * 辅助文字位置
   */
  textPosition?: 'left' | 'right'
  /**
   * 鼠标进入提示文字
   */
  showScore?: boolean
  /**
   * 文字模板
   */
  textTemplate?: string
}>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  readonly: false,
  allowHalf: false,
  clearable: true,
  icon: 'mdi:star',
  voidIcon: 'mdi:star-outline',
  color: '#FFCC00',
  voidColor: '#C0C4CC',
  colors: () => [],
  size: 'default',
  showText: false,
  texts: () => ['极差', '失望', '一般', '满意', '惊喜'],
  textPosition: 'right',
  showScore: false,
  textTemplate: '{value}',
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'hoverChange', value: number): void
}>()

// 内部状态
const rate = useVModel(props, 'modelValue', emit)
const hoverValue = ref(-1)
const focused = ref(false)

// 计算评分组件类名
const rateClass = computed(() => [
  'ui-rate',
  `ui-rate--${typeof props.size === 'number' ? 'custom' : props.size}`,
  {
    'ui-rate--disabled': props.disabled,
    'ui-rate--readonly': props.readonly,
    'ui-rate--focused': focused.value,
  },
])

// 计算当前显示的辅助文字
const activeText = computed(() => {
  if (!props.showText && !props.showScore)
    return ''

  if (hoverValue.value !== -1) {
    if (props.texts.length > 0 && props.texts[Math.ceil(hoverValue.value) - 1]) {
      return props.texts[Math.ceil(hoverValue.value) - 1]
    }
    if (props.showScore) {
      return props.textTemplate.replace('{value}', hoverValue.value.toString())
    }
  }
  else {
    if (props.texts.length > 0 && props.texts[Math.ceil(rate.value) - 1]) {
      return props.texts[Math.ceil(rate.value) - 1]
    }
    if (props.showScore) {
      return props.textTemplate.replace('{value}', rate.value.toString())
    }
  }

  return ''
})

// 获取评分图标的大小
const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }

  switch (props.size) {
    case 'small': return '16px'
    case 'large': return '24px'
    default: return '20px'
  }
})

// 根据当前分值获取对应的颜色
function getActiveColor(value: number): string {
  if (props.colors.length === 0) {
    return props.color
  }

  // 计算当前分值在总分中的占比
  const percent = value / props.max

  if (props.colors.length === 1) {
    return props.colors[0]
  }

  // 根据分值占比确定对应的颜色
  const colorCount = props.colors.length
  const colorIndex = Math.floor(percent * colorCount)
  const boundedIndex = Math.min(colorIndex, colorCount - 1)

  return props.colors[boundedIndex]
}

// 处理鼠标进入
function handleMouseMove(e: MouseEvent, index: number) {
  if (props.disabled || props.readonly)
    return

  // 计算当前星星的位置信息
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const position = (e.clientX - rect.left) / rect.width

  if (props.allowHalf && position <= 0.5) {
    hoverValue.value = index + 0.5
  }
  else {
    hoverValue.value = index + 1
  }

  emit('hoverChange', hoverValue.value)
}

// 处理鼠标离开
function handleMouseLeave() {
  if (props.disabled || props.readonly)
    return
  hoverValue.value = -1
}

// 处理点击事件
function handleClick(index: number, e: MouseEvent) {
  if (props.disabled || props.readonly)
    return

  const currentValue = rate.value
  let newValue: number

  // 计算点击位置
  if (props.allowHalf) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const position = (e.clientX - rect.left) / rect.width

    if (position <= 0.5) {
      newValue = index + 0.5
    }
    else {
      newValue = index + 1
    }
  }
  else {
    newValue = index + 1
  }

  // 允许清空评分，点击当前值时重置为0
  if (props.clearable && Math.abs(newValue - currentValue) < 0.001) {
    newValue = 0
  }

  rate.value = newValue
  emit('change', newValue)
}

// 计算每个评分项的样式
function getItemStyle(index: number) {
  const activeValue = hoverValue.value !== -1 ? hoverValue.value : rate.value
  const activeColor = getActiveColor(activeValue)

  if (activeValue >= index + 1) {
    // 整颗星
    return { color: activeColor }
  }
  else if (props.allowHalf && activeValue + 0.5 >= index + 1) {
    // 半颗星
    return { color: props.voidColor, position: 'relative' as const }
  }
  else {
    // 未选中
    return { color: props.voidColor }
  }
}

// 半星点击处理
function getHalfStyle(index: number) {
  const activeValue = hoverValue.value !== -1 ? hoverValue.value : rate.value
  const activeColor = getActiveColor(activeValue)

  if (activeValue >= index + 1) {
    // 整颗星
    return { display: 'none' }
  }
  else if (props.allowHalf && activeValue + 0.5 >= index + 1) {
    // 半颗星
    return {
      position: 'absolute' as const,
      left: '0',
      top: '0',
      width: '50%',
      color: activeColor,
      overflow: 'hidden',
    }
  }
  else {
    // 未选中
    return { display: 'none' }
  }
}

// 键盘事件处理
function handleKeyDown(e: KeyboardEvent) {
  if (props.disabled || props.readonly)
    return

  let newValue = rate.value

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      if (props.allowHalf) {
        newValue += 0.5
      }
      else {
        newValue += 1
      }
      e.stopPropagation()
      e.preventDefault()
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      if (props.allowHalf) {
        newValue -= 0.5
      }
      else {
        newValue -= 1
      }
      e.stopPropagation()
      e.preventDefault()
      break
  }

  // 限制在有效范围内
  newValue = Math.max(0, Math.min(props.max, newValue))

  if (newValue !== rate.value) {
    rate.value = newValue
    emit('change', newValue)
  }
}

// 获取焦点状态处理
function handleFocus() {
  focused.value = true
}

// 失去焦点状态处理
function handleBlur() {
  focused.value = false
}
</script>

<template>
  <div
    :class="rateClass"
    tabindex="0"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- 辅助文字（左侧） -->
    <div v-if="showText && textPosition === 'left' && activeText" class="ui-rate-text ui-rate-text--left">
      {{ activeText }}
    </div>

    <!-- 评分图标 -->
    <div class="ui-rate-items">
      <div
        v-for="index in max"
        :key="index"
        class="ui-rate-item"
        :style="getItemStyle(index - 1)"
        @mousemove="handleMouseMove($event, index - 1)"
        @mouseleave="handleMouseLeave"
        @click="handleClick(index - 1, $event)"
      >
        <!-- 未选中状态的图标 -->
        <ui-icon
          :icon="voidIcon"
          :size="iconSize"
          class="ui-rate-icon"
        />

        <!-- 半选状态的图标 -->
        <ui-icon
          v-if="allowHalf"
          :icon="icon"
          :size="iconSize"
          class="ui-rate-icon ui-rate-icon--half"
          :style="getHalfStyle(index - 1)"
        />

        <!-- 全选状态的图标（仅当非半选时显示） -->
        <ui-icon
          v-if="!allowHalf && (hoverValue !== -1 ? hoverValue : rate) >= index"
          :icon="icon"
          :size="iconSize"
          class="ui-rate-icon ui-rate-icon--full"
        />
      </div>
    </div>

    <!-- 辅助文字（右侧） -->
    <div v-if="(showText && textPosition === 'right' || showScore) && activeText" class="ui-rate-text ui-rate-text--right">
      {{ activeText }}
    </div>
  </div>
</template>

<style scoped>
.ui-rate {
  display: inline-flex;
  align-items: center;
  font-size: var(--ui-font-size, 14px);
  outline: none;
}

.ui-rate--focused {
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ui-rate--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ui-rate-items {
  display: inline-flex;
  align-items: center;
}

.ui-rate-item {
  position: relative;
  cursor: pointer;
  margin-right: 6px;
  transition: transform 0.2s;
  display: inline-flex;
}

.ui-rate-item:hover {
  transform: scale(1.1);
}

.ui-rate--disabled .ui-rate-item,
.ui-rate--readonly .ui-rate-item {
  cursor: default;
  transform: none;
}

.ui-rate-icon {
  display: inline-flex;
  transition: color 0.3s;
  line-height: 1;
}

.ui-rate-icon--half {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.ui-rate-text {
  margin: 0 8px;
  font-size: 14px;
  color: var(--ui-color-text-secondary, #909399);
}

.ui-rate--small .ui-rate-text {
  font-size: 12px;
}

.ui-rate--large .ui-rate-text {
  font-size: 16px;
}
</style>
