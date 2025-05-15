<script setup lang="ts" name="UiQrcode">
/**
 * 二维码组件
 * 创建日期: 2023-12-01
 * 作者: aiftt
 * 更新日期: 2023-12-01 - 初始实现
 * 更新日期: 2023-12-05 - 修复内联样式问题，改用CSS变量方式实现
 * 更新日期: 2024-05-10 - 替换console为logger
 */

import * as QRCode from 'qrcode'
import { computed, onMounted, ref, watch } from 'vue'
import logger from '~/utils/logger'

// 组件属性定义
const props = withDefaults(defineProps<{
  /**
   * 要编码的内容
   */
  value: string
  /**
   * 二维码尺寸
   */
  size?: number
  /**
   * 二维码前景色
   */
  color?: string
  /**
   * 二维码背景色
   */
  backgroundColor?: string
  /**
   * 二维码边距
   */
  margin?: number
  /**
   * 纠错级别 L(7%), M(15%), Q(25%), H(30%)
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  /**
   * 渲染方式: canvas, svg, img
   */
  renderAs?: 'canvas' | 'svg' | 'img'
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 图片类型(当renderAs=img时使用)
   */
  imageType?: 'image/png' | 'image/jpeg' | 'image/webp'
  /**
   * 图片质量(当renderAs=img时使用)
   */
  quality?: number
  /**
   * 是否使用圆角
   */
  rounded?: boolean
  /**
   * 加载中提示文本
   */
  loadingText?: string
  /**
   * 中心Logo图片地址
   */
  logo?: string
  /**
   * Logo尺寸比例(0-1)
   */
  logoSize?: number
}>(), {
  size: 150,
  color: '#000000',
  backgroundColor: '#ffffff',
  margin: 0,
  errorCorrectionLevel: 'M',
  renderAs: 'canvas',
  className: '',
  imageType: 'image/png',
  quality: 0.92,
  rounded: false,
  loadingText: '二维码生成中...',
  logoSize: 0.2,
})

// 创建二维码组件专用logger
const qrcodeLogger = logger.client.child({ tag: 'qrcode' })

// 响应式状态
const loading = ref(true)
const error = ref<Error | null>(null)
const qrcodeElement = ref<HTMLElement | null>(null)

// 二维码选项
const qrOptions = computed(() => ({
  errorCorrectionLevel: props.errorCorrectionLevel,
  margin: props.margin,
  color: {
    dark: props.color,
    light: props.backgroundColor,
  },
  width: props.size,
  type: props.imageType,
  quality: props.quality,
}))

// CSS变量计算
const sizeVar = computed(() => `${props.size}px`)
const backgroundColorVar = computed(() => props.backgroundColor || null)
const borderRadiusVar = computed(() => props.rounded ? '8px' : '0')

// 生成二维码
async function generateQRCode() {
  if (!props.value) {
    error.value = new Error('请提供有效的二维码内容')
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    // 等待DOM元素渲染完成
    await nextTick()

    if (!qrcodeElement.value) {
      throw new Error('QRCode元素未找到')
    }

    const el = qrcodeElement.value
    // 清空当前内容
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }

    // 根据不同的渲染类型生成二维码
    switch (props.renderAs) {
      case 'canvas': {
        const canvas = document.createElement('canvas')
        canvas.width = props.size
        canvas.height = props.size
        el.appendChild(canvas)
        await QRCode.toCanvas(canvas, props.value, qrOptions.value)
        // 如果需要添加Logo
        if (props.logo) {
          await addLogoToCanvas(canvas)
        }
        break
      }
      case 'svg': {
        const svgString = await QRCode.toString(props.value, {
          ...qrOptions.value,
          type: 'svg',
        })
        el.innerHTML = svgString
        // SVG添加Logo比较复杂，需要额外处理
        if (props.logo) {
          const svg = el.querySelector('svg')
          if (svg) {
            await addLogoToSvg(svg)
          }
        }
        break
      }
      case 'img': {
        const dataUrl = await QRCode.toDataURL(props.value, {
          ...qrOptions.value,
          type: props.imageType,
        })
        const img = document.createElement('img')
        img.src = dataUrl
        img.width = props.size
        img.height = props.size
        el.appendChild(img)
        // 图片上添加Logo
        if (props.logo) {
          img.onload = () => addLogoToImage(img)
        }
        break
      }
      default:
        throw new Error(`不支持的渲染类型: ${props.renderAs}`)
    }
  }
  catch (err) {
    error.value = err instanceof Error ? err : new Error('生成二维码时发生错误')
    qrcodeLogger.error('生成二维码错误:', err)
  }
  finally {
    loading.value = false
  }
}

// 为Canvas添加Logo
async function addLogoToCanvas(canvas: HTMLCanvasElement) {
  return new Promise<void>((resolve) => {
    if (!props.logo) {
      resolve()
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      resolve()
      return
    }

    const logoImg = new Image()
    logoImg.crossOrigin = 'anonymous'
    logoImg.src = props.logo

    logoImg.onload = () => {
      // 计算Logo尺寸和位置
      const size = props.size
      const logoSize = size * (props.logoSize || 0.2)
      const logoX = (size - logoSize) / 2
      const logoY = (size - logoSize) / 2

      // 为Logo添加白色背景
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10)

      // 绘制Logo
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
      resolve()
    }

    logoImg.onerror = () => {
      qrcodeLogger.error('Logo加载失败')
      resolve()
    }
  })
}

// 为SVG添加Logo
async function addLogoToSvg(svg: SVGElement) {
  return new Promise<void>((resolve) => {
    if (!props.logo) {
      resolve()
      return
    }

    // 设置SVG命名空间
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    // 计算Logo尺寸和位置
    const size = props.size
    const logoSize = size * (props.logoSize || 0.2)
    const logoX = (size - logoSize) / 2
    const logoY = (size - logoSize) / 2

    // 创建白色背景矩形
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bgRect.setAttribute('x', (logoX - 5).toString())
    bgRect.setAttribute('y', (logoY - 5).toString())
    bgRect.setAttribute('width', (logoSize + 10).toString())
    bgRect.setAttribute('height', (logoSize + 10).toString())
    bgRect.setAttribute('fill', '#ffffff')
    svg.appendChild(bgRect)

    // 创建Logo图片元素
    const logoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    logoElement.setAttribute('x', logoX.toString())
    logoElement.setAttribute('y', logoY.toString())
    logoElement.setAttribute('width', logoSize.toString())
    logoElement.setAttribute('height', logoSize.toString())
    logoElement.setAttribute('href', props.logo)
    svg.appendChild(logoElement)

    resolve()
  })
}

// 为Image添加Logo (实际上要创建一个新canvas来合成)
function addLogoToImage(img: HTMLImageElement) {
  if (!props.logo)
    return

  // 创建一个canvas来合成图片
  const canvas = document.createElement('canvas')
  canvas.width = props.size
  canvas.height = props.size
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  // 首先绘制QRCode图片
  ctx.drawImage(img, 0, 0, props.size, props.size)

  // 加载Logo图片
  const logoImg = new Image()
  logoImg.crossOrigin = 'anonymous'
  logoImg.src = props.logo

  logoImg.onload = () => {
    // 计算Logo尺寸和位置
    const logoSize = props.size * (props.logoSize || 0.2)
    const logoX = (props.size - logoSize) / 2
    const logoY = (props.size - logoSize) / 2

    // 为Logo添加白色背景
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10)

    // 绘制Logo
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

    // 替换原图片的src
    img.src = canvas.toDataURL(props.imageType, props.quality)
  }
}

// 当属性变化时重新生成二维码
watch(
  [
    () => props.value,
    () => props.size,
    () => props.color,
    () => props.backgroundColor,
    () => props.margin,
    () => props.errorCorrectionLevel,
    () => props.renderAs,
    () => props.logo,
    () => props.logoSize,
    () => props.rounded,
  ],
  () => {
    generateQRCode()
  },
)

// 组件挂载后生成二维码
onMounted(() => {
  generateQRCode()
})
</script>

<template>
  <div class="ui-qrcode-wrapper" :class="className">
    <div
      ref="qrcodeElement"
      class="ui-qrcode-container"
    />

    <!-- 加载状态 -->
    <div v-if="loading" class="ui-qrcode-loading">
      <div class="ui-qrcode-loading-spinner" />
      <span class="ui-qrcode-loading-text">{{ loadingText }}</span>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="ui-qrcode-error">
      <ui-icon icon="carbon:warning" size="24px" class="ui-qrcode-error-icon" />
      <span class="ui-qrcode-error-text">{{ error.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.ui-qrcode-wrapper {
  display: inline-block;
  position: relative;
}

.ui-qrcode-container {
  --ui-qrcode-size: v-bind(sizeVar);
  --ui-qrcode-bg-color: v-bind(backgroundColorVar);
  --ui-qrcode-border-radius: v-bind(borderRadiusVar);

  position: relative;
  width: var(--ui-qrcode-size);
  height: var(--ui-qrcode-size);
  background-color: var(--ui-qrcode-bg-color);
  border-radius: var(--ui-qrcode-border-radius);
  overflow: hidden;
}

.ui-qrcode-container svg,
.ui-qrcode-container canvas,
.ui-qrcode-container img {
  display: block;
  width: 100%;
  height: 100%;
}

.ui-qrcode-loading,
.ui-qrcode-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
}

.ui-qrcode-loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: ui-qrcode-spin 1s linear infinite;
  margin-bottom: 8px;
}

.ui-qrcode-loading-text,
.ui-qrcode-error-text {
  font-size: 14px;
  color: #666;
}

.ui-qrcode-error {
  background-color: rgba(255, 245, 245, 0.9);
}

.ui-qrcode-error-icon {
  color: #f56c6c;
  margin-bottom: 8px;
}

.ui-qrcode-error-text {
  color: #f56c6c;
  text-align: center;
  padding: 0 16px;
}

@keyframes ui-qrcode-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* CSS变量已移至主题文件中 */
</style>
