<script setup lang="ts" name="UiWatermark">
/**
 * 水印组件
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-01
 */

import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * 水印文本内容
   */
  content?: string
  /**
   * 水印字体大小
   */
  fontSize?: number | string
  /**
   * 水印字体颜色
   */
  fontColor?: string
  /**
   * 水印字体
   */
  fontFamily?: string
  /**
   * 水印字体样式
   */
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  /**
   * 水印字体粗细
   */
  fontWeight?: 'normal' | 'light' | 'bold' | number
  /**
   * 水印图片地址
   */
  image?: string
  /**
   * 水印宽度
   */
  width?: number
  /**
   * 水印高度
   */
  height?: number
  /**
   * 水印旋转角度
   */
  rotate?: number
  /**
   * 水印之间的间距（像素）
   */
  gap?: [number, number]
  /**
   * 水印透明度
   */
  opacity?: number
  /**
   * 水印z-index
   */
  zIndex?: number
  /**
   * 是否全屏显示
   */
  fullPage?: boolean
  /**
   * 是否防止篡改水印（使用MutationObserver监听DOM变化）
   */
  preventTamper?: boolean
  /**
   * 水印偏移
   */
  offset?: [number, number]
}>(), {
  fontSize: 16,
  fontColor: 'rgba(0, 0, 0, 0.15)',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  fontWeight: 'normal',
  width: 120,
  height: 64,
  rotate: -22,
  gap: () => [100, 100],
  opacity: 1,
  zIndex: 1000,
  fullPage: false,
  preventTamper: true,
  offset: () => [0, 0],
})

// 水印容器引用
const watermarkRef = ref<HTMLDivElement | null>(null)
const watermarkContainer = ref<HTMLDivElement | null>(null)
// 水印画布
const canvas = ref<HTMLCanvasElement | null>(null)
// 观察者，用于防止篡改
let observer: MutationObserver | null = null

// 创建水印
const watermarkUrl = ref('')

// 计算样式
const containerStyle = computed((): CSSProperties => {
  return {
    position: props.fullPage ? 'fixed' : 'relative',
    zIndex: props.zIndex,
    inset: props.fullPage ? '0px' : undefined,
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
    backgroundImage: `url(${watermarkUrl.value})`,
    width: props.fullPage ? '100vw' : '100%',
    height: props.fullPage ? '100vh' : '100%',
  }
})

// 计算水印宽度，包含间距
const realWidth = computed(() => {
  return props.width + props.gap[0]
})

// 计算水印高度，包含间距
const realHeight = computed(() => {
  return props.height + props.gap[1]
})

// 创建水印
function createWatermark() {
  try {
    if (!canvas.value) {
      canvas.value = document.createElement('canvas')
    }

    const ctx = canvas.value.getContext('2d')
    if (!ctx)
      return

    // 设置画布尺寸
    canvas.value.width = realWidth.value
    canvas.value.height = realHeight.value

    // 清除画布
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // 配置字体
    const fontSize = typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize
    ctx.font = `${props.fontStyle} ${props.fontWeight} ${fontSize} ${props.fontFamily}`
    ctx.fillStyle = props.fontColor
    ctx.globalAlpha = props.opacity

    // 保存画布状态
    ctx.save()

    // 移动到水印中心
    ctx.translate(
      props.width / 2 + props.offset[0],
      props.height / 2 + props.offset[1],
    )

    // 旋转水印
    ctx.rotate((props.rotate * Math.PI) / 180)

    // 绘制文本或图片
    if (props.content) {
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 支持多行文本
      const lines = props.content.split('\n')
      const lineHeight = Number.parseInt(fontSize) * 1.2
      const totalHeight = lineHeight * lines.length

      lines.forEach((line, index) => {
        const yPos = -totalHeight / 2 + lineHeight * (index + 0.5)
        ctx.fillText(line, 0, yPos)
      })
    }

    // 如果提供了图片
    if (props.image) {
      const img = new Image()

      // 错误处理
      img.onerror = () => {
        console.error('Failed to load watermark image:', props.image)
        // 恢复画布状态
        ctx.restore()
        // 如果图片加载失败，则使用文本内容作为备用
        if (props.content) {
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(props.content, 0, 0)
        }
        // 导出为base64
        if (canvas.value) {
          try {
            watermarkUrl.value = canvas.value.toDataURL('image/png')
          }
          catch (e) {
            console.error('Failed to export canvas:', e)
          }
        }
      }

      // 图片加载完毕后绘制
      img.onload = () => {
        // 确保组件仍然挂载
        if (!canvas.value)
          return

        // 计算绘制区域，保持图片纵横比
        const aspectRatio = img.width / img.height
        let drawWidth = props.width * 0.8
        let drawHeight = drawWidth / aspectRatio

        // 如果高度超出，则按高度计算
        if (drawHeight > props.height * 0.8) {
          drawHeight = props.height * 0.8
          drawWidth = drawHeight * aspectRatio
        }

        // 居中绘制图片
        ctx.drawImage(
          img,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight,
        )

        // 恢复画布状态
        ctx.restore()

        try {
          // 导出为base64
          if (canvas.value) {
            watermarkUrl.value = canvas.value.toDataURL('image/png')
          }
        }
        catch (error) {
          console.error('Failed to generate watermark:', error)
        }
      }

      try {
        // 设置图片源
        img.src = props.image
        // 设置跨域
        img.crossOrigin = 'anonymous'
      }
      catch (error) {
        console.error('Failed to set image source:', error)
        // 还原画布状态
        ctx.restore()
        if (canvas.value) {
          try {
            watermarkUrl.value = canvas.value.toDataURL('image/png')
          }
          catch (e) {
            console.error('Failed to export canvas:', e)
          }
        }
      }
    }
    else {
      // 恢复画布状态
      ctx.restore()

      // 导出为base64
      if (canvas.value) {
        try {
          watermarkUrl.value = canvas.value.toDataURL('image/png')
        }
        catch (e) {
          console.error('Failed to export canvas:', e)
        }
      }
    }
  }
  catch (error) {
    console.error('Error creating watermark:', error)
  }
}

// 防止篡改监听函数
function startObserver() {
  if (!props.preventTamper || !watermarkContainer.value)
    return

  // 确保先断开之前的观察者
  stopObserver()

  // 创建观察者实例
  observer = new MutationObserver((mutations) => {
    let needRecreate = false

    // 检查变动类型
    for (const mutation of mutations) {
      // 节点被移除
      if (mutation.type === 'childList'
        && (mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0)) {
        needRecreate = true
        break
      }

      // 属性被修改
      if (mutation.type === 'attributes') {
        needRecreate = true
        break
      }
    }

    if (needRecreate) {
      // 断开观察者
      observer?.disconnect()

      // 设置延迟，避免连续触发
      setTimeout(() => {
        // 安全检查，如果组件已经卸载则不执行
        if (watermarkContainer.value) {
          createWatermark()
          // 重新启动观察者
          startObserver()
        }
      }, 100)
    }
  })

  try {
    // 开始观察目标节点
    observer.observe(watermarkContainer.value, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    })
  }
  catch (error) {
    console.error('Failed to start observer:', error)
  }
}

// 停止观察
function stopObserver() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

// 初始化
onMounted(() => {
  createWatermark()

  // 启动防篡改
  if (props.preventTamper) {
    startObserver()
  }
})

// 组件更新时，重新创建水印
watch(
  () => [
    props.content,
    props.fontSize,
    props.fontColor,
    props.fontFamily,
    props.fontStyle,
    props.fontWeight,
    props.image,
    props.width,
    props.height,
    props.rotate,
    props.opacity,
    props.gap,
    props.offset,
  ],
  () => {
    createWatermark()
  },
)

// 防止内存泄漏
onBeforeUnmount(() => {
  stopObserver()
})
</script>

<template>
  <div ref="watermarkRef" class="ui-watermark" style="position: relative; width: 100%; height: 100%;">
    <div
      ref="watermarkContainer"
      class="ui-watermark-container"
      :style="containerStyle"
    />
    <div class="ui-watermark-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ui-watermark {
  position: relative;
  width: 100%;
  height: 100%;
}

.ui-watermark-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: v-bind('props.zIndex');
}

.ui-watermark-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
