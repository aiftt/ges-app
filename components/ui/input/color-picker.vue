<script setup lang="ts" name="UiInputColorPicker">
import { onClickOutside } from '@vueuse/core'
/**
 * 颜色选择器组件
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-10 - 修复带透明度时无法选中颜色的问题
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

// 定义props
const props = withDefaults(defineProps<{
  /**
   * 绑定值（十六进制颜色值）
   */
  modelValue?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否显示透明度控制
   */
  showAlpha?: boolean
  /**
   * 格式化颜色值的格式
   */
  format?: 'hex' | 'rgb' | 'hsl'
  /**
   * 是否支持自定义颜色输入
   */
  allowCustom?: boolean
  /**
   * 预设颜色
   */
  presetColors?: string[]
  /**
   * 是否可清空
   */
  clearable?: boolean
  /**
   * 弹出位置
   */
  placement?: 'top' | 'bottom'
  /**
   * 颜色面板宽度
   */
  popoverWidth?: number | string
  /**
   * 是否显示历史记录
   */
  showHistory?: boolean
  /**
   * 历史记录最大数量
   */
  historyMax?: number
}>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  size: 'default',
  showAlpha: false,
  format: 'hex',
  allowCustom: true,
  presetColors: () => [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ],
  clearable: false,
  placement: 'bottom',
  popoverWidth: 250,
  showHistory: true,
  historyMax: 8,
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'blur'): void
  (e: 'focus'): void
  (e: 'clear'): void
}>()

// 内部状态
const containerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const saturationRef = ref<HTMLElement | null>(null)
const hueSliderRef = ref<HTMLElement | null>(null)
const alphaSliderRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const currentColor = ref(props.modelValue || '')
const hue = ref(0)
const saturation = ref(100)
const lightness = ref(50)
const alpha = ref(100)
const tempColor = ref('')
const colorHistory = ref<string[]>([])

// 拖拽状态
const isDraggingSaturation = ref(false)
const isDraggingHue = ref(false)
const isDraggingAlpha = ref(false)

// 添加RGB值状态
const rgbValues = ref({ r: 0, g: 0, b: 0 })

// 使用defineModel简化v-model绑定
const color = defineModel<string>('modelValue', { default: '' })

// 计算样式类
const colorPickerClass = computed(() => [
  'ui-color-picker',
  `ui-color-picker--${props.size}`,
  {
    'ui-color-picker--disabled': props.disabled,
    'ui-color-picker--readonly': props.readonly,
    'ui-color-picker--active': visible.value,
    'ui-color-picker--clearable': props.clearable,
  },
])

// 计算面板类
const panelClass = computed(() => [
  'ui-color-picker-panel',
  {
    'ui-color-picker-panel--top': props.placement === 'top',
    'ui-color-picker-panel--bottom': props.placement === 'bottom',
    'ui-color-picker-panel--alpha': props.showAlpha,
  },
])

// 计算当前颜色显示值
const displayValue = computed(() => {
  return formatColor(currentColor.value || '')
})

// 格式化颜色值
function formatColor(color: string): string {
  if (!color)
    return ''

  // 简单格式化颜色，实际实现可能需要更复杂的颜色转换逻辑
  return color
}

// 打开选色面板
function openPanel() {
  if (props.disabled || props.readonly)
    return

  visible.value = true
  emit('visibleChange', true)
  emit('focus')

  // 解析当前颜色值
  parseColor(currentColor.value)

  // 准备临时颜色
  tempColor.value = currentColor.value
}

// 关闭选色面板
function closePanel() {
  visible.value = false
  emit('visibleChange', false)
  emit('blur')
}

// 切换面板
function togglePanel() {
  if (visible.value) {
    closePanel()
  }
  else {
    openPanel()
  }
}

// 阻止面板点击事件冒泡，避免点击面板时关闭
function handlePanelClick(e: MouseEvent) {
  e.stopPropagation()
}

// 解析颜色值
function parseColor(colorStr: string) {
  if (!colorStr) {
    hue.value = 0
    saturation.value = 100
    lightness.value = 50
    alpha.value = 100
    rgbValues.value = { r: 0, g: 0, b: 0 }
    return
  }

  // 解析十六进制颜色
  if (colorStr.startsWith('#')) {
    const hex = colorStr.slice(1)
    let r = 0
    let g = 0
    let b = 0
    let a = 255

    // 处理不同格式的十六进制颜色
    if (hex.length === 3) {
      // #RGB
      r = Number.parseInt(hex[0] + hex[0], 16)
      g = Number.parseInt(hex[1] + hex[1], 16)
      b = Number.parseInt(hex[2] + hex[2], 16)
    }
    else if (hex.length === 6) {
      // #RRGGBB
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
    }
    else if (hex.length === 8) {
      // #RRGGBBAA
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
      a = Number.parseInt(hex.substring(6, 8), 16)
    }

    // 检查r, g, b是否是有效数值
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
      r = 0
      g = 0
      b = 0
    }

    rgbValues.value = { r, g, b }
    alpha.value = Math.round((a / 255) * 100)

    // 转换为HSL
    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255
      g /= 255
      b /= 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0
      let s = 0
      const l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0))
            break
          case g:
            h = ((b - r) / d + 2)
            break
          case b:
            h = ((r - g) / d + 4)
            break
        }

        h *= 60
      }

      return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      }
    }

    const hsl = rgbToHsl(r, g, b)
    hue.value = hsl.h
    saturation.value = hsl.s
    lightness.value = hsl.l
  }
  // 解析rgba颜色
  else if (colorStr.startsWith('rgba')) {
    const rgba = colorStr.match(/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/)
    if (rgba) {
      const r = Number.parseInt(rgba[1], 10)
      const g = Number.parseInt(rgba[2], 10)
      const b = Number.parseInt(rgba[3], 10)
      const a = Number.parseFloat(rgba[4])

      // 检查r, g, b是否是有效数值
      if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) || Number.isNaN(a)) {
        rgbValues.value = { r: 0, g: 0, b: 0 }
        alpha.value = 100
      }
      else {
        rgbValues.value = { r, g, b }
        alpha.value = Math.round(a * 100)
      }

      // 转换为HSL
      const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0))
              break
            case g:
              h = ((b - r) / d + 2)
              break
            case b:
              h = ((r - g) / d + 4)
              break
          }

          h *= 60
        }

        return {
          h: Math.round(h),
          s: Math.round(s * 100),
          l: Math.round(l * 100),
        }
      }

      const hsl = rgbToHsl(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      hue.value = hsl.h
      saturation.value = hsl.s
      lightness.value = hsl.l
    }
  }
  // 解析rgb颜色
  else if (colorStr.startsWith('rgb')) {
    const rgb = colorStr.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
    if (rgb) {
      const r = Number.parseInt(rgb[1], 10)
      const g = Number.parseInt(rgb[2], 10)
      const b = Number.parseInt(rgb[3], 10)

      // 检查r, g, b是否是有效数值
      if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
        rgbValues.value = { r: 0, g: 0, b: 0 }
      }
      else {
        rgbValues.value = { r, g, b }
      }
      alpha.value = 100

      // 转换为HSL
      const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0))
              break
            case g:
              h = ((b - r) / d + 2)
              break
            case b:
              h = ((r - g) / d + 4)
              break
          }

          h *= 60
        }

        return {
          h: Math.round(h),
          s: Math.round(s * 100),
          l: Math.round(l * 100),
        }
      }

      const hsl = rgbToHsl(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      hue.value = hsl.h
      saturation.value = hsl.s
      lightness.value = hsl.l
    }
  }
}

// 添加 RGB 到 HSL 的转换函数
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  hue.value = Math.round(h * 360)
  saturation.value = Math.round(s * 100)
  lightness.value = Math.round(l * 100)
}

// 添加 RGB 输入处理
function updateFromRgb() {
  const { r, g, b } = rgbValues.value

  // 确保值在有效范围内
  rgbValues.value.r = Math.min(255, Math.max(0, r))
  rgbValues.value.g = Math.min(255, Math.max(0, g))
  rgbValues.value.b = Math.min(255, Math.max(0, b))

  // 转换RGB到HSL
  rgbToHsl(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)

  // 更新颜色
  updateColor()
}

// 修改 updateColor 函数，支持 RGB 格式
function updateColor() {
  let newColor: string

  // 根据不同格式生成颜色字符串
  let rgb

  switch (props.format) {
    case 'hex':
      rgb = hslToRgb(hue.value, saturation.value, lightness.value)
      newColor = props.showAlpha && alpha.value < 100
        ? rgbaToHex(rgb, alpha.value / 100)
        : rgbToHex(rgb.r, rgb.g, rgb.b)
      break
    case 'rgb':
      rgb = hslToRgb(hue.value, saturation.value, lightness.value)
      newColor = props.showAlpha
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.value / 100})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      break
    case 'hsl':
      newColor = props.showAlpha
        ? `hsla(${Math.round(hue.value)}, ${Math.round(saturation.value)}%, ${Math.round(lightness.value)}%, ${alpha.value / 100})`
        : `hsl(${Math.round(hue.value)}, ${Math.round(saturation.value)}%, ${Math.round(lightness.value)}%)`
      break
    default:
      rgb = hslToRgb(hue.value, saturation.value, lightness.value)
      newColor = rgbToHex(rgb.r, rgb.g, rgb.b)
  }

  // 更新颜色值
  currentColor.value = newColor
  color.value = newColor

  // 触发事件
  emit('update:modelValue', newColor)
  emit('change', newColor)
}

// 颜色工具函数
// HSL转RGB
function hslToRgb(h: number, s: number, l: number) {
  // 转换成0-1范围
  h = h / 360
  s = s / 100
  l = l / 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l // achromatic
  }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// RGB转HEX
function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// RGBA转HEX
function rgbaToHex({ r, g, b }: { r: number, g: number, b: number }, a: number) {
  return `${rgbToHex(r, g, b)}${Math.round(a * 255).toString(16).padStart(2, '0')}`
}

// HSL转HEX
function hslToHex(h: number, s: number, l: number) {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

// 更新色相
function _updateHue(val: number) {
  hue.value = val
  updateColor()
}

// 更新饱和度和亮度
function _updateSaturationLightness(s: number, l: number) {
  saturation.value = s
  lightness.value = l
  updateColor()
}

// 更新透明度
function _updateAlpha(val: number) {
  alpha.value = val
  updateColor()
}

// 处理透明度条点击和拖拽
function handleAlphaMouseDown(e: MouseEvent) {
  if (props.disabled || props.readonly || !props.showAlpha)
    return

  isDraggingAlpha.value = true
  document.addEventListener('mousemove', handleAlphaMouseMove)
  document.addEventListener('mouseup', handleAlphaMouseUp)
  updateAlphaFromEvent(e)
}

function handleAlphaMouseMove(e: MouseEvent) {
  if (isDraggingAlpha.value) {
    updateAlphaFromEvent(e)
  }
}

function handleAlphaMouseUp() {
  isDraggingAlpha.value = false
  document.removeEventListener('mousemove', handleAlphaMouseMove)
  document.removeEventListener('mouseup', handleAlphaMouseUp)
}

function updateAlphaFromEvent(e: MouseEvent) {
  if (!alphaSliderRef.value)
    return

  const rect = alphaSliderRef.value.getBoundingClientRect()
  const { width } = rect

  // 限制位置在滑块范围内
  let left = e.clientX - rect.left
  left = Math.max(0, Math.min(left, width))

  // 计算透明度百分比
  const alphaPercent = Math.round((left / width) * 100)
  alpha.value = alphaPercent

  // 更新颜色
  updateColor()
}

// 选择预设颜色
function selectPresetColor(colorValue: string) {
  currentColor.value = colorValue
  parseColor(colorValue)
  updateColor()

  // 添加到历史记录
  if (props.showHistory && !colorHistory.value.includes(colorValue)) {
    colorHistory.value.unshift(colorValue)
    if (colorHistory.value.length > props.historyMax) {
      colorHistory.value = colorHistory.value.slice(0, props.historyMax)
    }
  }
}

// 清空选择
function clearSelection(e: Event) {
  e.stopPropagation()
  currentColor.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

// 确认选择
function confirmSelection() {
  // 添加到历史记录
  if (props.showHistory && currentColor.value && !colorHistory.value.includes(currentColor.value)) {
    colorHistory.value.unshift(currentColor.value)
    if (colorHistory.value.length > props.historyMax) {
      colorHistory.value = colorHistory.value.slice(0, props.historyMax)
    }
  }

  closePanel()
}

// 取消选择
function cancelSelection() {
  currentColor.value = tempColor.value
  emit('update:modelValue', tempColor.value)
  closePanel()
}

// 点击外部关闭面板
onClickOutside(containerRef, () => {
  if (visible.value) {
    confirmSelection()
  }
})

// 监听modelValue变化
watch(
  () => props.modelValue,
  (val) => {
    currentColor.value = val || ''
    if (visible.value) {
      parseColor(currentColor.value)
    }
  },
)

// 初始化
onMounted(() => {
  if (props.modelValue) {
    parseColor(props.modelValue)
  }
})

// 处理饱和度区域的点击和拖拽
function handleSaturationMouseDown(e: MouseEvent) {
  if (props.disabled || props.readonly)
    return

  isDraggingSaturation.value = true
  document.addEventListener('mousemove', handleSaturationMouseMove)
  document.addEventListener('mouseup', handleSaturationMouseUp)
  updateSaturationFromEvent(e)
}

function handleSaturationMouseMove(e: MouseEvent) {
  if (isDraggingSaturation.value) {
    updateSaturationFromEvent(e)
  }
}

function handleSaturationMouseUp() {
  isDraggingSaturation.value = false
  document.removeEventListener('mousemove', handleSaturationMouseMove)
  document.removeEventListener('mouseup', handleSaturationMouseUp)
}

function updateSaturationFromEvent(e: MouseEvent) {
  if (!saturationRef.value)
    return

  const rect = saturationRef.value.getBoundingClientRect()
  const { width, height } = rect

  // 修复指针位置计算
  let left = e.clientX - rect.left
  let top = e.clientY - rect.top

  // 限制在容器范围内
  left = Math.max(0, Math.min(left, width))
  top = Math.max(0, Math.min(top, height))

  // 计算百分比
  const saturationPercent = Math.round((left / width) * 100)
  const brightnessPercent = Math.round(100 - (top / height) * 100)

  // 更新状态
  saturation.value = saturationPercent
  lightness.value = brightnessPercent

  // 更新颜色
  updateColor()
}

// 处理色相条点击和拖拽
function handleHueMouseDown(e: MouseEvent) {
  if (props.disabled || props.readonly)
    return
  isDraggingHue.value = true
  document.addEventListener('mousemove', handleHueMouseMove)
  document.addEventListener('mouseup', handleHueMouseUp)
  updateHueFromEvent(e)
}

function handleHueMouseMove(e: MouseEvent) {
  if (isDraggingHue.value) {
    updateHueFromEvent(e)
  }
}

function handleHueMouseUp() {
  isDraggingHue.value = false
  document.removeEventListener('mousemove', handleHueMouseMove)
  document.removeEventListener('mouseup', handleHueMouseUp)
}

function updateHueFromEvent(e: MouseEvent) {
  if (!hueSliderRef.value)
    return

  const rect = hueSliderRef.value.getBoundingClientRect()
  const { width } = rect
  const { clientX } = e

  const huePercent = Math.max(0, Math.min(100, ((clientX - rect.left) / width) * 100))
  hue.value = Math.round(huePercent * 3.6) // 0-360
  updateColor()
}

// 确保在组件销毁时移除事件监听
onUnmounted(() => {
  document.removeEventListener('mousemove', handleSaturationMouseMove)
  document.removeEventListener('mouseup', handleSaturationMouseUp)
  document.removeEventListener('mousemove', handleHueMouseMove)
  document.removeEventListener('mouseup', handleHueMouseUp)
  document.removeEventListener('mousemove', handleAlphaMouseMove)
  document.removeEventListener('mouseup', handleAlphaMouseUp)
})
</script>

<template>
  <div
    ref="containerRef"
    :class="colorPickerClass"
    @click="togglePanel"
  >
    <!-- 颜色显示区域 -->
    <div class="ui-color-picker-trigger">
      <!-- 颜色预览 -->
      <div class="ui-color-picker-color">
        <div
          class="ui-color-picker-color-inner"
          :style="{ backgroundColor: currentColor }"
        />
      </div>

      <!-- 颜色值显示 -->
      <div class="ui-color-picker-value">
        {{ displayValue || '选择颜色' }}
      </div>

      <!-- 清除按钮 -->
      <div
        v-if="clearable && currentColor && !disabled"
        class="ui-color-picker-clear"
        @click.stop="clearSelection($event)"
      >
        <ui-icon icon="carbon:close" size="small" />
      </div>

      <!-- 下拉箭头 -->
      <div class="ui-color-picker-arrow">
        <ui-icon :icon="visible ? 'carbon:chevron-up' : 'carbon:chevron-down'" size="small" />
      </div>
    </div>

    <!-- 颜色选择面板 -->
    <div
      v-if="visible"
      ref="popoverRef"
      :class="panelClass"
      :style="{ width: typeof popoverWidth === 'number' ? `${popoverWidth}px` : popoverWidth }"
      @click.stop="handlePanelClick"
    >
      <!-- 颜色选择区域 -->
      <div class="ui-color-picker-panel-main">
        <!-- 饱和度/亮度面板 -->
        <div class="ui-color-picker-saturation" @mousedown="handleSaturationMouseDown">
          <div
            ref="saturationRef"
            class="ui-color-picker-saturation-inner"
            :style="{ backgroundColor: `hsl(${hue}, 100%, 50%)` }"
          >
            <div
              class="ui-color-picker-saturation-pointer"
              :style="{
                left: `${saturation}%`,
                top: `${100 - lightness}%`,
              }"
            />
          </div>
        </div>

        <!-- 色相条 -->
        <div
          ref="hueSliderRef"
          class="ui-color-picker-hue-slider"
          @mousedown="handleHueMouseDown"
        >
          <div class="ui-color-picker-hue-track" />
          <div
            class="ui-color-picker-hue-thumb"
            :style="{ left: `${hue / 360 * 100}%` }"
          />
        </div>

        <!-- 透明度条 -->
        <div
          v-if="showAlpha"
          ref="alphaSliderRef"
          class="ui-color-picker-alpha-slider"
          @mousedown="handleAlphaMouseDown"
        >
          <div
            class="ui-color-picker-alpha-track"
            :style="{
              backgroundImage: `linear-gradient(to right, transparent, ${hslToHex(hue, saturation, lightness)})`,
            }"
          />
          <div
            class="ui-color-picker-alpha-thumb"
            :style="{ left: `${alpha}%` }"
          />
        </div>
      </div>

      <!-- 预设颜色 -->
      <div v-if="presetColors.length" class="ui-color-picker-presets">
        <div
          v-for="(presetColor, index) in presetColors"
          :key="index"
          class="ui-color-picker-preset-color"
          :style="{ backgroundColor: presetColor }"
          @click.stop="selectPresetColor(presetColor)"
        />
      </div>

      <!-- 历史记录 -->
      <div v-if="showHistory && colorHistory.length" class="ui-color-picker-history">
        <div class="ui-color-picker-history-title">
          最近使用
        </div>
        <div class="ui-color-picker-history-colors">
          <div
            v-for="(historyColor, index) in colorHistory"
            :key="index"
            class="ui-color-picker-history-color"
            :style="{ backgroundColor: historyColor }"
            @click.stop="selectPresetColor(historyColor)"
          />
        </div>
      </div>

      <!-- 自定义输入区域 -->
      <div v-if="allowCustom" class="ui-color-picker-inputs">
        <!-- 根据format显示不同的输入类型 -->
        <div v-if="format === 'hex'" class="ui-color-picker-input-field">
          <label>Hex</label>
          <input
            v-model="currentColor"
            type="text"
            @change="parseColor(currentColor)"
            @blur="updateColor()"
          >
        </div>

        <!-- RGB输入 -->
        <template v-if="format === 'rgb'">
          <div class="ui-color-picker-input-field">
            <label>R</label>
            <input v-model.number="rgbValues.r" type="number" min="0" max="255" @input="updateFromRgb">
          </div>
          <div class="ui-color-picker-input-field">
            <label>G</label>
            <input v-model.number="rgbValues.g" type="number" min="0" max="255" @input="updateFromRgb">
          </div>
          <div class="ui-color-picker-input-field">
            <label>B</label>
            <input v-model.number="rgbValues.b" type="number" min="0" max="255" @input="updateFromRgb">
          </div>
          <div v-if="showAlpha" class="ui-color-picker-input-field">
            <label>A</label>
            <input v-model.number="alpha" type="number" min="0" max="100" @input="updateColor">
          </div>
        </template>

        <!-- HSL输入 -->
        <template v-if="format === 'hsl'">
          <div class="ui-color-picker-input-field">
            <label>H</label>
            <input v-model.number="hue" type="number" min="0" max="360" @input="updateColor">
          </div>
          <div class="ui-color-picker-input-field">
            <label>S</label>
            <input v-model.number="saturation" type="number" min="0" max="100" @input="updateColor">
          </div>
          <div class="ui-color-picker-input-field">
            <label>L</label>
            <input v-model.number="lightness" type="number" min="0" max="100" @input="updateColor">
          </div>
          <div v-if="showAlpha" class="ui-color-picker-input-field">
            <label>A</label>
            <input v-model.number="alpha" type="number" min="0" max="100" @input="updateColor">
          </div>
        </template>
      </div>

      <!-- 控制按钮 -->
      <div class="ui-color-picker-actions">
        <button class="ui-color-picker-btn ui-color-picker-btn-cancel" @click.stop="cancelSelection">
          取消
        </button>
        <button class="ui-color-picker-btn ui-color-picker-btn-confirm" @click.stop="confirmSelection">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-color-picker {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: var(--ui-font-size, 14px);
  color: var(--ui-color-text, #333);
}

.ui-color-picker-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ui-input-height, 36px);
  padding: 0 8px;
  background-color: var(--ui-color-bg, #fff);
  border: 1px solid var(--ui-color-border, #dcdfe6);
  border-radius: var(--ui-border-radius, 4px);
  transition: all 0.3s;
  cursor: pointer;
}

.ui-color-picker--active .ui-color-picker-trigger {
  border-color: var(--ui-color-primary, #409eff);
}

.ui-color-picker--disabled .ui-color-picker-trigger {
  background-color: var(--ui-color-disabled-bg, #f5f7fa);
  border-color: var(--ui-color-disabled-border, #e4e7ed);
  color: var(--ui-color-disabled-text, #c0c4cc);
  cursor: not-allowed;
}

.ui-color-picker-color {
  width: 20px;
  height: 20px;
  border: 1px solid var(--ui-color-border-light, #e4e7ed);
  border-radius: 2px;
  margin-right: 8px;
  overflow: hidden;
}

.ui-color-picker-color-inner {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0px;
}

.ui-color-picker-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-color-picker-clear {
  margin-left: 8px;
  color: var(--ui-color-text-secondary, #909399);
  cursor: pointer;
}

.ui-color-picker-clear:hover {
  color: var(--ui-color-text, #333);
}

.ui-color-picker-arrow {
  margin-left: 8px;
  color: var(--ui-color-text-secondary, #909399);
  transition: transform 0.3s;
}

.ui-color-picker--active .ui-color-picker-arrow {
  transform: rotate(180deg);
}

/* 面板样式 */
.ui-color-picker-panel {
  position: absolute;
  left: 0;
  z-index: 1000;
  width: 250px;
  background: var(--ui-color-bg, #fff);
  border: 1px solid var(--ui-color-border, #dcdfe6);
  border-radius: var(--ui-border-radius, 4px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 12px;
}

.ui-color-picker-panel--top {
  bottom: calc(100% + 4px);
}

.ui-color-picker-panel--bottom {
  top: calc(100% + 4px);
}

.ui-color-picker-saturation {
  position: relative;
  width: 100%;
  height: 150px;
  border: 1px solid var(--ui-color-border-light, #e4e7ed);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.ui-color-picker-saturation-inner {
  position: relative;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)), linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}

.ui-color-picker-saturation-pointer {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transform: translate(-8px, -8px);
  cursor: grab;
}

.ui-color-picker-hue-slider {
  position: relative;
  width: 100%;
  height: 12px;
  margin: 8px 0;
  border-radius: 12px;
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

.ui-color-picker-hue-thumb {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid var(--ui-color-border, #dcdfe6);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  top: 50%;
  transform: translate(-8px, -50%);
  cursor: grab;
}

.ui-color-picker-alpha-slider {
  position: relative;
  width: 100%;
  height: 12px;
  margin: 8px 0;
  border-radius: 12px;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0px;
}

.ui-color-picker-alpha-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
}

.ui-color-picker-alpha-thumb {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid var(--ui-color-border, #dcdfe6);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  top: 50%;
  transform: translate(-8px, -50%);
  cursor: grab;
}

.ui-color-picker-presets {
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
  gap: 4px;
}

.ui-color-picker-preset-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  cursor: pointer;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0px;
  background-color: transparent;
  border: 1px solid var(--ui-color-border-light, #e4e7ed);
  transition: transform 0.2s;
}

.ui-color-picker-preset-color:hover {
  transform: scale(1.1);
}

.ui-color-picker-history {
  margin: 8px 0;
}

.ui-color-picker-history-title {
  font-size: 12px;
  color: var(--ui-color-text-secondary, #909399);
  margin-bottom: 4px;
}

.ui-color-picker-history-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ui-color-picker-history-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  cursor: pointer;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position:
    0 0,
    0 4px,
    4px -4px,
    -4px 0px;
  background-color: transparent;
  border: 1px solid var(--ui-color-border-light, #e4e7ed);
}

.ui-color-picker-inputs {
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ui-color-picker-input-field {
  display: flex;
  flex-direction: column;
}

.ui-color-picker-input-field label {
  font-size: 12px;
  color: var(--ui-color-text-secondary, #909399);
  margin-bottom: 2px;
}

.ui-color-picker-input-field input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--ui-color-border, #dcdfe6);
  border-radius: 3px;
  outline: none;
  font-size: 12px;
}

.ui-color-picker-input-field input:focus {
  border-color: var(--ui-color-primary, #409eff);
}

.ui-color-picker-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 8px;
}

.ui-color-picker-btn {
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid var(--ui-color-border, #dcdfe6);
  background: #fff;
  outline: none;
}

.ui-color-picker-btn-confirm {
  color: #fff;
  background-color: var(--ui-color-primary, #409eff);
  border-color: var(--ui-color-primary, #409eff);
}

.ui-color-picker-btn-confirm:hover {
  background-color: var(--ui-color-primary-light-3, #66b1ff);
  border-color: var(--ui-color-primary-light-3, #66b1ff);
}

.ui-color-picker-btn-cancel:hover {
  background-color: var(--ui-color-bg-hover, #f5f7fa);
}

/* 尺寸变体 */
.ui-color-picker--small .ui-color-picker-trigger {
  height: var(--ui-input-height-small, 28px);
  font-size: var(--ui-font-size-small, 12px);
}

.ui-color-picker--large .ui-color-picker-trigger {
  height: var(--ui-input-height-large, 40px);
  font-size: var(--ui-font-size-large, 16px);
}
</style>
