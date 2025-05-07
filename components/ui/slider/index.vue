<script setup lang="ts" name="UiSlider">
/**
 * 滑块组件
 * 创建日期: 2024-06-12
 * 作者: aiftt
 * 更新日期: 2024-07-06 - 改进垂直模式实现
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值
   */
  modelValue?: number | number[]
  /**
   * 最小值
   */
  min?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 步长
   */
  step?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否显示标记点
   */
  showStops?: boolean
  /**
   * 是否显示提示气泡
   */
  showTooltip?: boolean
  /**
   * 是否显示输入框
   */
  showInput?: boolean
  /**
   * 滑块方向
   */
  vertical?: boolean
  /**
   * 滑块高度（垂直模式）
   */
  height?: number | string
  /**
   * 是否为范围选择
   */
  range?: boolean
  /**
   * 标记点配置
   */
  marks?: Record<number, string | { label: string, style?: Record<string, string> }>
  /**
   * 自定义颜色
   */
  color?: string
  /**
   * 自定义未激活颜色
   */
  inactiveColor?: string
  /**
   * 自定义标记点颜色
   */
  markColor?: string
  /**
   * 是否反转值的位置（垂直模式下值0在上方还是下方）
   */
  reverse?: boolean
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showStops: false,
  showTooltip: true,
  showInput: false,
  vertical: false,
  height: 200,
  range: false,
  marks: () => ({}),
  reverse: false,
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | number[]): void
  (e: 'change', value: number | number[]): void
  (e: 'input', value: number | number[]): void
}>()

// 滑块DOM引用
const sliderRef = ref<HTMLDivElement | null>(null)
const sliderTrackRef = ref<HTMLDivElement | null>(null)
const firstHandleRef = ref<HTMLDivElement | null>(null)
const secondHandleRef = ref<HTMLDivElement | null>(null)

// 内部状态
const isDragging = ref(false)
const currentValue = ref<number | number[]>(getInitialValue())
const startPosition = ref<number | null>(null)
const startValue = ref<number | number[]>(getInitialValue())
const activeHandle = ref<'first' | 'second' | null>(null)
const hoverIndex = ref<number | null>(null)
const hoverPosition = ref({ left: '0px', top: '0px' })

// 需要修改的部分 - 处理垂直模式下的方向
const isReversed = computed(() => props.vertical && props.reverse)

// 初始化内部值
function getInitialValue(): number | number[] {
  if (props.range) {
    if (Array.isArray(props.modelValue) && props.modelValue.length >= 2) {
      return [props.modelValue[0], props.modelValue[1]]
    }
    else {
      return [props.min, props.max]
    }
  }
  else {
    return typeof props.modelValue === 'number' ? props.modelValue : props.min
  }
}

// 在垂直模式下计算值时考虑reverse属性
function calculatePosition(value: number) {
  // 基本比例计算
  const percentage = ((value - props.min) / (props.max - props.min)) * 100

  // 如果是垂直模式且需要反转，则调整计算方式
  return isReversed.value ? 100 - percentage : percentage
}

// 获取值对应的百分比位置
function getValuePercent(value: number) {
  return calculatePosition(value)
}

// 计算滑块位置样式
const firstHandlePercent = computed(() => {
  const value = Array.isArray(currentValue.value)
    ? currentValue.value[0]
    : currentValue.value
  return getValuePercent(value)
})

const secondHandlePercent = computed(() => {
  if (!props.range || !Array.isArray(currentValue.value))
    return 0
  return getValuePercent(currentValue.value[1])
})

// 计算轨道进度条样式
const trackStartPercent = computed(() => {
  if (props.range && Array.isArray(currentValue.value))
    return getValuePercent(currentValue.value[0])
  return 0
})

const trackEndPercent = computed(() => {
  if (props.range && Array.isArray(currentValue.value))
    return getValuePercent(currentValue.value[1])
  return getValuePercent(typeof currentValue.value === 'number' ? currentValue.value : props.min)
})

// 计算轨道样式（用于非CSS变量场景，如标记点等）
const _trackStyle = computed(() => {
  if (props.range && Array.isArray(currentValue.value)) {
    const start = getValuePercent(currentValue.value[0])
    const end = getValuePercent(currentValue.value[1])

    if (props.vertical) {
      return {
        height: `${end - start}%`,
        bottom: `${start}%`,
        backgroundColor: props.color || '',
      }
    }
    else {
      return {
        width: `${end - start}%`,
        left: `${start}%`,
        backgroundColor: props.color || '',
      }
    }
  }
  else {
    const percent = getValuePercent(
      typeof currentValue.value === 'number' ? currentValue.value : props.min,
    )

    if (props.vertical) {
      return {
        height: `${percent}%`,
        bottom: '0%',
        backgroundColor: props.color || '',
      }
    }
    else {
      return {
        width: `${percent}%`,
        backgroundColor: props.color || '',
      }
    }
  }
})

// 计算滑块容器高度
const sliderHeight = computed(() => {
  if (props.vertical) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return null
})

// 计算样式变量
const colorVar = computed(() => props.color || '')
const inactiveColorVar = computed(() => props.inactiveColor || '')
const markColorVar = computed(() => props.markColor || '')

// 监听值变化
watch(() => props.modelValue, (newValue) => {
  if (!isDragging.value) {
    currentValue.value = newValue
  }
})

// 根据坐标计算值
function getValueByPosition(position: number): number {
  if (!sliderRef.value)
    return props.min

  const sliderRect = sliderRef.value.getBoundingClientRect()
  const sliderSize = props.vertical ? sliderRect.height : sliderRect.width

  // 计算百分比位置 - 垂直模式下需要根据reverse属性调整计算方式
  let percent
  if (props.vertical) {
    // 垂直模式下，滑块方向应该与拖动方向一致
    // reverse=true时，值0在顶部，最大值在底部
    if (isReversed.value) {
      // 往下拖动，值增大
      percent = Math.max(0, Math.min(1, position / sliderSize))
    }
    else {
      // reverse=false时，值0在底部，最大值在顶部（默认行为）
      percent = Math.max(0, Math.min(1, 1 - (position / sliderSize)))
    }
  }
  else {
    // 水平模式下，滑块从左到右
    percent = Math.max(0, Math.min(1, position / sliderSize))
  }

  // 计算值
  let value = props.min + percent * (props.max - props.min)

  // 应用步长
  if (props.step > 0) {
    value = Math.round(value / props.step) * props.step
  }

  // 限制在范围内
  value = Math.max(props.min, Math.min(props.max, value))

  return value
}

// 更新值并触发事件
function updateValue(newValue: number | number[]) {
  currentValue.value = newValue
  emit('update:modelValue', newValue)
  emit('input', newValue)
}

// 处理鼠标按下事件
function handleMouseDown(event: MouseEvent, handle: 'first' | 'second' = 'first') {
  if (props.disabled)
    return

  event.preventDefault()
  activeHandle.value = handle

  // 记录起始位置
  startPosition.value = props.vertical ? event.clientY : event.clientX
  startValue.value = currentValue.value
  isDragging.value = true

  // 添加全局事件监听
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('touchmove', handleTouchMove)
  window.addEventListener('touchend', handleTouchEnd)

  // 触发点击位置滑动
  handleClick(event)
}

// 处理鼠标移动事件
function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value || startPosition.value === null || !sliderRef.value)
    return

  const sliderRect = sliderRef.value.getBoundingClientRect()

  // 根据方向计算位置偏移
  let offsetPosition
  if (props.vertical) {
    // 垂直模式
    offsetPosition = event.clientY - sliderRect.top
  }
  else {
    // 水平模式
    offsetPosition = event.clientX - sliderRect.left
  }

  const newValue = getValueByPosition(offsetPosition)

  if (props.range && Array.isArray(currentValue.value)) {
    const values = [...currentValue.value]
    const handleIndex = activeHandle.value === 'first' ? 0 : 1

    // 更新当前滑块的值
    values[handleIndex] = newValue

    // 确保第一个值不大于第二个值
    if (handleIndex === 0) {
      values[0] = Math.min(values[0], values[1])
    }
    else {
      values[1] = Math.max(values[0], values[1])
    }

    updateValue(values)
  }
  else {
    updateValue(newValue)
  }
}

// 处理触摸移动事件
function handleTouchMove(event: TouchEvent) {
  if (!isDragging.value || startPosition.value === null || !event.touches[0] || !sliderRef.value)
    return

  const sliderRect = sliderRef.value.getBoundingClientRect()

  // 根据方向计算位置偏移
  let offsetPosition
  if (props.vertical) {
    // 垂直模式
    offsetPosition = event.touches[0].clientY - sliderRect.top
  }
  else {
    // 水平模式
    offsetPosition = event.touches[0].clientX - sliderRect.left
  }

  const newValue = getValueByPosition(offsetPosition)

  if (props.range && Array.isArray(currentValue.value)) {
    const values = [...currentValue.value]
    const handleIndex = activeHandle.value === 'first' ? 0 : 1

    // 更新当前滑块的值
    values[handleIndex] = newValue

    // 确保第一个值不大于第二个值
    if (handleIndex === 0) {
      values[0] = Math.min(values[0], values[1])
    }
    else {
      values[1] = Math.max(values[0], values[1])
    }

    updateValue(values)
  }
  else {
    updateValue(newValue)
  }
}

// 处理鼠标释放事件
function handleMouseUp() {
  if (isDragging.value) {
    isDragging.value = false
    activeHandle.value = null
    startPosition.value = null
    emit('change', currentValue.value)
  }

  // 移除全局事件监听
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
}

// 处理触摸结束事件
function handleTouchEnd() {
  handleMouseUp()
}

// 处理点击轨道事件
function handleClick(event: MouseEvent) {
  if (props.disabled || !sliderRef.value)
    return

  // 忽略滑块上的点击，只处理轨道上的点击
  if (
    event.target === firstHandleRef.value
    || event.target === secondHandleRef.value
    || firstHandleRef.value?.contains(event.target as Node)
    || secondHandleRef.value?.contains(event.target as Node)
  ) {
    return
  }

  // 计算点击位置相对于滑块的偏移
  const sliderRect = sliderRef.value.getBoundingClientRect()

  // 根据方向计算位置偏移
  let offset
  if (props.vertical) {
    // 垂直模式 - 从顶部开始计算
    offset = event.clientY - sliderRect.top
  }
  else {
    // 水平模式 - 从左侧开始计算
    offset = event.clientX - sliderRect.left
  }

  // 计算点击位置对应的值
  const value = getValueByPosition(offset)

  if (props.range && Array.isArray(currentValue.value)) {
    // 在范围模式下，找出离点击位置最近的滑块并更新它
    const [min, max] = currentValue.value
    const midpoint = (min + max) / 2

    if (value <= midpoint) {
      updateValue([value, max])
      activeHandle.value = 'first'
    }
    else {
      updateValue([min, value])
      activeHandle.value = 'second'
    }
  }
  else {
    // 单滑块模式直接更新值
    updateValue(value)
    activeHandle.value = 'first'
  }

  emit('change', currentValue.value)
}

// 生成标记点
const markList = computed(() => {
  if (!Object.keys(props.marks).length)
    return []

  return Object.keys(props.marks).map((key) => {
    const value = Number.parseFloat(key)
    const percent = getValuePercent(value)
    const isActive = Array.isArray(currentValue.value)
      ? value >= currentValue.value[0] && value <= currentValue.value[1]
      : value <= currentValue.value

    const mark = props.marks[value]
    const label = typeof mark === 'string' ? mark : mark.label
    const style = typeof mark === 'object' ? mark.style : {}

    return {
      value,
      label,
      percent,
      isActive,
      style,
    }
  })
})

// 生成刻度点列表
const stopList = computed(() => {
  if (!props.showStops || props.step <= 0)
    return []

  const stops: number[] = []
  const total = props.max - props.min
  const stepCount = total / props.step

  // 最多生成100个刻度点，避免过多DOM元素
  const maxStops = 100
  const interval = Math.max(1, Math.floor(stepCount / maxStops))

  for (let i = 1; i < stepCount; i += interval) {
    const value = props.min + i * props.step

    // 忽略已有标记点位置的刻度
    if (!Object.keys(props.marks).includes(value.toString())) {
      stops.push(value)
    }
  }

  return stops
})

// 处理输入框变化
function handleInputChange(value: string, index?: number) {
  let newValue = Number.parseFloat(value)

  // 验证输入值
  if (Number.isNaN(newValue))
    return

  // 限制在范围内
  newValue = Math.max(props.min, Math.min(props.max, newValue))

  // 更新值
  if (props.range && Array.isArray(currentValue.value) && index !== undefined) {
    const values = [...currentValue.value]
    values[index] = newValue

    // 确保第一个值不大于第二个值
    if (index === 0) {
      values[0] = Math.min(values[0], values[1])
    }
    else {
      values[1] = Math.max(values[0], values[1])
    }

    updateValue(values)
  }
  else if (!props.range) {
    updateValue(newValue)
  }

  emit('change', currentValue.value)
}

// 处理指针悬停，显示tooltip
function handleTooltipShow(event: MouseEvent, value: number) {
  hoverIndex.value = value
  updateTooltipPosition(event)
}

// 更新tooltip位置
function updateTooltipPosition(event: MouseEvent) {
  if (!sliderRef.value)
    return

  const { clientX, clientY } = event

  if (props.vertical) {
    hoverPosition.value = {
      left: `${clientX + 15}px`,
      top: `${clientY}px`,
    }
  }
  else {
    hoverPosition.value = {
      left: `${clientX}px`,
      top: `${clientY - 30}px`,
    }
  }
}

// 处理指针离开，隐藏tooltip
function handleTooltipHide() {
  hoverIndex.value = null
}

// 组件挂载后初始化
onMounted(() => {
  nextTick(() => {
    currentValue.value = getInitialValue()
  })
})

// 修改渲染逻辑，确保进度条正确显示
function getTrackStyle() {
  // 处理范围选择的轨道样式
  if (props.range && Array.isArray(currentValue.value)) {
    const start = getValuePercent(currentValue.value[0])
    const end = getValuePercent(currentValue.value[1])

    // 确保start始终小于end（视觉上）
    const min = Math.min(start, end)
    const max = Math.max(start, end)

    if (props.vertical) {
      return {
        bottom: `${min}%`,
        height: `${max - min}%`,
      }
    }
    else {
      return {
        left: `${min}%`,
        width: `${max - min}%`,
      }
    }
  }
  else {
    // 单滑块模式
    const value = Array.isArray(currentValue.value) ? currentValue.value[0] : currentValue.value
    const percentage = getValuePercent(value)

    if (props.vertical) {
      // 根据是否反转设置不同的填充方向
      if (isReversed.value) {
        // 反转模式：值0在顶部，值从顶部开始填充
        return {
          height: `${100 - percentage}%`, // 剩余的百分比
          top: '0', // 从顶部开始
          bottom: 'auto',
          width: '6px', // 保持宽度一致
        }
      }
      else {
        // 常规模式：值0在底部，值从底部开始填充
        return {
          height: `${percentage}%`,
          bottom: '0', // 从底部开始
          top: 'auto',
          width: '6px', // 保持宽度一致
        }
      }
    }
    else {
      return {
        width: `${percentage}%`,
      }
    }
  }
}

// 获取滑块按钮的位置样式
function getButtonStyle(index: number) {
  const value = Array.isArray(currentValue.value)
    ? currentValue.value[index]
    : currentValue.value

  const percentage = getValuePercent(value)

  if (props.vertical) {
    // 在垂直模式下，使用bottom来定位滑块
    return {
      bottom: `${percentage}%`,
      top: 'auto', // 确保不会被top影响
    }
  }
  else {
    return {
      left: `${percentage}%`,
    }
  }
}

// 获取标记点样式
function getMarkStyle(value: number, markStyle: Record<string, string> = {}) {
  const percentage = getValuePercent(value)

  if (props.vertical) {
    return {
      '--mark-percent': `${percentage}%`,
      ...markStyle,
    }
  }
  else {
    return {
      left: `${percentage}%`,
      ...markStyle,
    }
  }
}

// 获取刻度点样式
function getStopStyle(stop: number) {
  const percentage = getValuePercent(stop)

  if (props.vertical) {
    return {
      '--stop-percent': `${percentage}%`,
    }
  }
  else {
    return {
      left: `${percentage}%`,
    }
  }
}
</script>

<template>
  <div
    class="ui-slider-wrapper"
    :class="{
      'ui-slider--vertical': vertical,
      'ui-slider--disabled': disabled,
      'ui-slider--with-input': showInput,
      'ui-slider--dragging': isDragging,
    }"
  >
    <!-- 输入框（横向模式） -->
    <template v-if="showInput && !vertical">
      <div v-if="range && Array.isArray(currentValue)" class="ui-slider-input-wrapper">
        <input
          type="number"
          class="ui-slider-input"
          :value="currentValue[0]"
          :min="min"
          :max="currentValue[1]"
          :step="step"
          :disabled="disabled"
          @change="(e) => handleInputChange((e.target as HTMLInputElement).value, 0)"
        >
        <span class="ui-slider-input-separator">-</span>
        <input
          type="number"
          class="ui-slider-input"
          :value="currentValue[1]"
          :min="currentValue[0]"
          :max="max"
          :step="step"
          :disabled="disabled"
          @change="(e) => handleInputChange((e.target as HTMLInputElement).value, 1)"
        >
      </div>
      <input
        v-else
        type="number"
        class="ui-slider-input"
        :value="currentValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @change="(e) => handleInputChange((e.target as HTMLInputElement).value)"
      >
    </template>

    <!-- 滑块主体 -->
    <div
      ref="sliderRef"
      class="ui-slider"
      :style="props.vertical && sliderHeight ? { height: sliderHeight } : {}"
      @click="handleClick"
    >
      <!-- 轨道背景 -->
      <div class="ui-slider-runway" />

      <!-- 进度条 -->
      <div
        ref="sliderTrackRef"
        class="ui-slider-track"
        :style="getTrackStyle()"
      />

      <!-- 刻度点 -->
      <div
        v-for="stop in stopList"
        :key="`stop-${stop}`"
        class="ui-slider-stop"
        :class="{
          'ui-slider-stop--active': Array.isArray(currentValue)
            ? stop >= currentValue[0] && stop <= currentValue[1]
            : stop <= currentValue,
        }"
        :style="getStopStyle(stop)"
      />

      <!-- 标记点 -->
      <div
        v-for="mark in markList"
        :key="`mark-${mark.value}`"
        class="ui-slider-mark"
        :class="{
          'ui-slider-mark--active': mark.isActive,
        }"
        :style="getMarkStyle(mark.value, mark.style)"
      >
        <div class="ui-slider-mark-dot" />
        <div class="ui-slider-mark-label">
          {{ mark.label }}
        </div>
      </div>

      <!-- 第一个滑块 -->
      <div
        ref="firstHandleRef"
        class="ui-slider-handle"
        :style="getButtonStyle(0)"
        :class="{
          'ui-slider-handle--active': activeHandle === 'first' || !range,
        }"
        @mousedown="(e) => handleMouseDown(e, 'first')"
        @touchstart="(e) => handleMouseDown(e as unknown as MouseEvent, 'first')"
        @mouseover="showTooltip && handleTooltipShow($event, Array.isArray(currentValue) ? currentValue[0] : currentValue)"
        @mouseout="showTooltip && handleTooltipHide()"
      >
        <div v-if="showTooltip && (activeHandle === 'first' || !isDragging)" class="ui-slider-tooltip">
          {{ Array.isArray(currentValue) ? currentValue[0] : currentValue }}
        </div>
      </div>

      <!-- 第二个滑块（范围选择模式） -->
      <div
        v-if="range && Array.isArray(currentValue)"
        ref="secondHandleRef"
        class="ui-slider-handle second-handle"
        :style="getButtonStyle(1)"
        :class="{
          'ui-slider-handle--active': activeHandle === 'second',
        }"
        @mousedown="(e) => handleMouseDown(e, 'second')"
        @touchstart="(e) => handleMouseDown(e as unknown as MouseEvent, 'second')"
        @mouseover="showTooltip && handleTooltipShow($event, currentValue[1])"
        @mouseout="showTooltip && handleTooltipHide()"
      >
        <div v-if="showTooltip && activeHandle === 'second'" class="ui-slider-tooltip">
          {{ currentValue[1] }}
        </div>
      </div>
    </div>

    <!-- 输入框（纵向模式） -->
    <template v-if="showInput && vertical">
      <div v-if="range && Array.isArray(currentValue)" class="ui-slider-input-wrapper ui-slider-input-wrapper--vertical">
        <input
          type="number"
          class="ui-slider-input"
          :value="currentValue[1]"
          :min="currentValue[0]"
          :max="max"
          :step="step"
          :disabled="disabled"
          @change="(e) => handleInputChange((e.target as HTMLInputElement).value, 1)"
        >
        <span class="ui-slider-input-separator">-</span>
        <input
          type="number"
          class="ui-slider-input"
          :value="currentValue[0]"
          :min="min"
          :max="currentValue[1]"
          :step="step"
          :disabled="disabled"
          @change="(e) => handleInputChange((e.target as HTMLInputElement).value, 0)"
        >
      </div>
      <input
        v-else
        type="number"
        class="ui-slider-input"
        :value="currentValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @change="(e) => handleInputChange((e.target as HTMLInputElement).value)"
      >
    </template>
  </div>
</template>

<style scoped>
.ui-slider-wrapper {
  --ui-slider-color: v-bind(colorVar);
  --ui-slider-inactive-color: v-bind(inactiveColorVar);
  --ui-slider-mark-color: v-bind(markColorVar);
  --ui-slider-first-handle-percent: v-bind(firstHandlePercent);
  --ui-slider-second-handle-percent: v-bind(secondHandlePercent);
  --ui-slider-track-start-percent: v-bind(trackStartPercent);
  --ui-slider-track-end-percent: v-bind(trackEndPercent);
  --ui-slider-height: v-bind(sliderHeight);

  display: inline-flex;
  align-items: center;
  width: 100%;
  position: relative;
  font-size: 14px;
}

.ui-slider {
  flex: 1;
  position: relative;
  height: 32px;
  cursor: pointer;
}

/* 垂直模式样式 */
.ui-slider--vertical {
  flex-direction: column;
  height: var(--ui-slider-height, 200px);
  width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  min-width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  max-width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  margin: 0 auto;
}

.ui-slider--vertical .ui-slider {
  height: var(--ui-slider-height, 200px);
  width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  min-width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  max-width: 32px;
  min-width: 32px;
  flex-shrink: 0;
  margin: 0 auto;
}

/* 轨道样式 */
.ui-slider-runway {
  position: absolute;
  height: 6px;
  width: 100%;
  background-color: var(--ui-slider-inactive-color, var(--ui-color-bg-secondary, #e5e7eb));
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

/* 垂直模式轨道样式 */
.ui-slider--vertical .ui-slider-runway {
  height: 100%;
  width: 6px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.ui-slider-track {
  position: absolute;
  height: 6px;
  background-color: var(--ui-slider-color, var(--ui-color-primary, #10b981));
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
  transition:
    width 0.2s,
    left 0.2s;
  z-index: 1;
  width: calc(var(--ui-slider-track-end-percent) * 1%);
}

/* 垂直模式进度条样式 */
.ui-slider--vertical .ui-slider-track {
  width: 6px;
  top: auto;
  left: 50%;
  transform: translateX(-50%);
  transition:
    height 0.2s,
    bottom 0.2s;
  /* 以下样式由JavaScript动态计算并应用 */
}

/* 范围选择模式下的轨道 */
.ui-slider-wrapper:has(.ui-slider-handle.second-handle) .ui-slider .ui-slider-track {
  width: calc((var(--ui-slider-track-end-percent) - var(--ui-slider-track-start-percent)) * 1%);
  left: calc(var(--ui-slider-track-start-percent) * 1%);
}

/* 垂直模式范围选择轨道 */
.ui-slider--vertical:has(.ui-slider-handle.second-handle) .ui-slider .ui-slider-track {
  height: calc((var(--ui-slider-track-end-percent) - var(--ui-slider-track-start-percent)) * 1%);
  bottom: calc(var(--ui-slider-track-start-percent) * 1%);
  width: 6px;
  left: 50%;
}

/* 滑块手柄 */
.ui-slider-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: var(--ui-slider-handle-bg, white);
  border: 2px solid var(--ui-slider-color, var(--ui-color-primary, #10b981));
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  transition: box-shadow 0.2s;
  z-index: 3;
  left: calc(var(--ui-slider-first-handle-percent) * 1%);
}

/* 垂直模式滑块手柄 */
.ui-slider--vertical .ui-slider-handle {
  left: 50%;
  top: auto;
  bottom: calc(var(--ui-slider-first-handle-percent) * 1%);
  transform: translate(-50%, 50%);
}

.ui-slider-handle.second-handle {
  left: calc(var(--ui-slider-second-handle-percent) * 1%);
}

/* 垂直模式第二个滑块手柄 */
.ui-slider--vertical .ui-slider-handle.second-handle {
  left: 50%;
  bottom: calc(var(--ui-slider-second-handle-percent) * 1%);
  top: auto;
}

.ui-slider-handle--active,
.ui-slider-handle:hover {
  box-shadow: var(--ui-slider-handle-shadow, 0 0 0 5px rgba(16, 185, 129, 0.1));
}

.ui-slider--dragging .ui-slider-handle {
  cursor: grabbing;
}

/* 刻度点 */
.ui-slider-stop {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--ui-slider-inactive-color, var(--ui-color-bg-secondary, #e5e7eb));
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

/* 垂直模式刻度点 */
.ui-slider--vertical .ui-slider-stop {
  left: 50%;
  top: auto;
  bottom: var(--stop-percent, 0%);
  transform: translate(-50%, 50%);
}

.ui-slider-stop--active {
  background-color: var(--ui-slider-stop-active-color, white);
}

/* 标记点 */
.ui-slider-mark {
  position: absolute;
  top: 50%;
  transform: translate(-50%, 0);
}

/* 垂直模式标记点 */
.ui-slider--vertical .ui-slider-mark {
  left: 50%;
  top: auto;
  bottom: var(--mark-percent, 0%);
  transform: translate(0, 50%);
}

.ui-slider-mark-dot {
  width: 8px;
  height: 8px;
  background-color: var(--ui-slider-mark-color, var(--ui-slider-inactive-color, var(--ui-color-bg-secondary, #e5e7eb)));
  border-radius: 50%;
  margin: -4px 0 0 -4px;
}

.ui-slider-mark--active .ui-slider-mark-dot {
  background-color: var(--ui-slider-color, var(--ui-color-primary, #10b981));
}

.ui-slider-mark-label {
  position: absolute;
  font-size: 12px;
  color: var(--ui-color-text-secondary, #6b7280);
  white-space: nowrap;
  transform: translateX(-50%);
  margin-top: 10px;
}

/* 垂直模式下标记点样式调整 */
.ui-slider--vertical .ui-slider-mark-label {
  transform: translateY(0);
  margin-top: 0;
  margin-left: 10px;
  left: 0;
}

/* 提示气泡 */
.ui-slider-tooltip {
  position: absolute;
  left: 50%;
  bottom: 25px;
  transform: translateX(-50%);
  padding: 3px 8px;
  background-color: var(--ui-slider-tooltip-bg, var(--ui-slider-color, var(--ui-color-primary, #10b981)));
  color: var(--ui-slider-tooltip-color, white);
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.ui-slider-tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: var(--ui-slider-tooltip-bg, var(--ui-slider-color, var(--ui-color-primary, #10b981))) transparent
    transparent;
}

/* 垂直模式提示气泡 */
.ui-slider--vertical .ui-slider-tooltip {
  left: 100%;
  bottom: 50%;
  margin-left: 10px;
  transform: translateY(50%);
}

.ui-slider--vertical .ui-slider-tooltip::after {
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
  border-color: transparent var(--ui-slider-color, var(--ui-color-primary, #10b981)) transparent transparent;
}

.ui-slider-handle:hover .ui-slider-tooltip,
.ui-slider--dragging .ui-slider-handle--active .ui-slider-tooltip {
  opacity: 1;
}

/* 输入框 */
.ui-slider-input-wrapper {
  width: 120px;
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.ui-slider-input {
  width: 50px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--ui-color-border, #e5e7eb);
  border-radius: 4px;
  text-align: center;
}

.ui-slider-input:focus {
  outline: none;
  border-color: var(--ui-slider-color, var(--ui-color-primary, #10b981));
}

.ui-slider-input-separator {
  margin: 0 8px;
  color: var(--ui-color-text-secondary, #6b7280);
}

.ui-slider--vertical {
  flex-direction: column;
  height: var(--ui-slider-height, 200px);
}

.ui-slider--vertical .ui-slider-input-wrapper {
  margin-left: 0;
  margin-top: 16px;
  flex-direction: column;
}

.ui-slider-input-wrapper--vertical .ui-slider-input-separator {
  margin: 8px 0;
}

/* 深色模式适配 */
:root.dark .ui-slider-runway {
  background-color: var(--ui-slider-inactive-color, var(--ui-color-bg-secondary-dark, #4b5563));
}

:root.dark .ui-slider-track {
  background-color: var(--ui-slider-color, var(--ui-color-primary, #10b981));
}

:root.dark .ui-slider-handle {
  background-color: var(--ui-color-text-dark, #e5e7eb);
}

:root.dark .ui-slider-handle--active,
:root.dark .ui-slider-handle:hover {
  box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.2);
}

:root.dark .ui-slider-stop {
  background-color: var(--ui-slider-inactive-color, var(--ui-color-bg-secondary-dark, #4b5563));
}

:root.dark .ui-slider-mark-label {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

:root.dark .ui-slider-input {
  background-color: var(--ui-color-bg-dark, #1f2937);
  color: var(--ui-color-text-dark, #e5e7eb);
  border-color: var(--ui-color-border-dark, #4b5563);
}

:root.dark .ui-slider-input-separator {
  color: var(--ui-color-text-secondary-dark, #9ca3af);
}

/* 禁用状态 */
.ui-slider--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ui-slider--disabled .ui-slider {
  cursor: not-allowed;
}

.ui-slider--disabled .ui-slider-handle {
  cursor: not-allowed;
  box-shadow: none;
}
</style>
