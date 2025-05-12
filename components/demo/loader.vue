<script setup lang="ts" name="DemoLoader">
/**
 * 加载器组件演示
 * 创建日期: 2024-12-04
 * 作者: Claude
 * 更新日期: 2024-12-07 - 添加更多加载器类型支持
 * 更新日期: 2024-12-08 - 增加CSS Loaders支持
 * 更新日期: 2024-12-11 - 添加6种新加载器类型
 */

// 多边形类型的加载器
const polyTypes = Array.from({ length: 12 }, (_, i) => i + 1)

// 旋转类型的加载器
const spinnerTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 圆点类型的加载器
const dotsTypes = Array.from({ length: 8 }, (_, i) => i + 1)

// 条形类型的加载器
const barsTypes = Array.from({ length: 6 }, (_, i) => i + 1)

// 环形类型的加载器
const ringTypes = Array.from({ length: 6 }, (_, i) => i + 1)

// 波浪类型的加载器
const waveTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 文本类型的加载器
const textTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// CSS Loaders 风格加载器
// 经典类型的加载器
const classicTypes = Array.from({ length: 10 }, (_, i) => i + 1)

// 形状类型的加载器
const shapeTypes = Array.from({ length: 10 }, (_, i) => i + 1)

// 3D类型的加载器
const threeDTypes = Array.from({ length: 10 }, (_, i) => i + 1)

// 进度类型的加载器
const progressTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 摇摆类型的加载器
const wobbleTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 无限循环类型的加载器
const infinityTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 之字形类型的加载器
const zigzagTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 机械类型的加载器
const mechanicTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 填充类型的加载器
const fillingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 弹跳类型的加载器
const bouncingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 发光类型的加载器
const glowingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 滚动类型的加载器
const rollingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 翻转类型的加载器
const flippingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 连续类型的加载器
const continuousTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 脉冲类型的加载器
const pulsingTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 街机风格类型的加载器
const arcadeTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 催眠类型的加载器
const hypnoticTypes = Array.from({ length: 5 }, (_, i) => i + 1)

// 点击复制代码
function copyCode(type: string) {
  const code = `<ui-loader type="${type}" />`
  navigator.clipboard.writeText(code)
    .then(() => {
      // 使用toast通知代替alert
      const toast = document.createElement('div')
      toast.style.position = 'fixed'
      toast.style.bottom = '20px'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
      toast.style.padding = '10px 16px'
      toast.style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
      toast.style.color = '#fff'
      toast.style.borderRadius = '4px'
      toast.style.zIndex = '9999'
      toast.style.fontWeight = '500'
      toast.textContent = `已复制：${code}`

      document.body.appendChild(toast)

      setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transition = 'opacity 0.3s'
        setTimeout(() => {
          document.body.removeChild(toast)
        }, 300)
      }, 2000)
    })
    .catch((err) => {
      console.error('复制失败:', err)
    })
}
</script>

<template>
  <div class="loader-demo">
    <div class="section-title">
      多边形加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in polyTypes"
        :key="`poly-${type}`"
        class="loader-item"
        @click="copyCode(type.toString())"
      >
        <ui-loader :type="type" />
        <div class="loader-type">
          类型 {{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      旋转加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in spinnerTypes"
        :key="`spinner-${type}`"
        class="loader-item"
        @click="copyCode(`spinner-${type}`)"
      >
        <ui-loader :type="`spinner-${type}`" />
        <div class="loader-type">
          spinner-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      圆点加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in dotsTypes"
        :key="`dots-${type}`"
        class="loader-item"
        @click="copyCode(`dots-${type}`)"
      >
        <ui-loader :type="`dots-${type}`" />
        <div class="loader-type">
          dots-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      条形加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in barsTypes"
        :key="`bars-${type}`"
        class="loader-item"
        @click="copyCode(`bars-${type}`)"
      >
        <ui-loader :type="`bars-${type}`" />
        <div class="loader-type">
          bars-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      环形加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in ringTypes"
        :key="`ring-${type}`"
        class="loader-item"
        @click="copyCode(`ring-${type}`)"
      >
        <ui-loader :type="`ring-${type}`" />
        <div class="loader-type">
          ring-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      波浪加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in waveTypes"
        :key="`wave-${type}`"
        class="loader-item"
        @click="copyCode(`wave-${type}`)"
      >
        <ui-loader :type="`wave-${type}`" />
        <div class="loader-type">
          wave-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      文本加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in textTypes"
        :key="`text-${type}`"
        class="loader-item"
        @click="copyCode(`text-${type}`)"
      >
        <ui-loader :type="`text-${type}`" />
        <div class="loader-type">
          text-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      经典加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in classicTypes"
        :key="`classic-${type}`"
        class="loader-item"
        @click="copyCode(`classic-${type}`)"
      >
        <ui-loader :type="`classic-${type}`" />
        <div class="loader-type">
          classic-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      形状加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in shapeTypes"
        :key="`shape-${type}`"
        class="loader-item"
        @click="copyCode(`shape-${type}`)"
      >
        <ui-loader :type="`shape-${type}`" />
        <div class="loader-type">
          shape-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      3D 加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in threeDTypes"
        :key="`3d-${type}`"
        class="loader-item"
        @click="copyCode(`3d-${type}`)"
      >
        <ui-loader :type="`3d-${type}`" />
        <div class="loader-type">
          3d-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      进度加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in progressTypes"
        :key="`progress-${type}`"
        class="loader-item"
        @click="copyCode(`progress-${type}`)"
      >
        <ui-loader :type="`progress-${type}`" />
        <div class="loader-type">
          progress-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      摇摆加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in wobbleTypes"
        :key="`wobble-${type}`"
        class="loader-item"
        @click="copyCode(`wobble-${type}`)"
      >
        <ui-loader :type="`wobble-${type}`" />
        <div class="loader-type">
          wobble-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      无限循环加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in infinityTypes"
        :key="`infinity-${type}`"
        class="loader-item"
        @click="copyCode(`infinity-${type}`)"
      >
        <ui-loader :type="`infinity-${type}`" />
        <div class="loader-type">
          infinity-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      之字形加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in zigzagTypes"
        :key="`zigzag-${type}`"
        class="loader-item"
        @click="copyCode(`zigzag-${type}`)"
      >
        <ui-loader :type="`zigzag-${type}`" />
        <div class="loader-type">
          zigzag-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      机械加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in mechanicTypes"
        :key="`mechanic-${type}`"
        class="loader-item"
        @click="copyCode(`mechanic-${type}`)"
      >
        <ui-loader :type="`mechanic-${type}`" />
        <div class="loader-type">
          mechanic-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      填充加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in fillingTypes"
        :key="`filling-${type}`"
        class="loader-item"
        @click="copyCode(`filling-${type}`)"
      >
        <ui-loader :type="`filling-${type}`" />
        <div class="loader-type">
          filling-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      弹跳加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in bouncingTypes"
        :key="`bouncing-${type}`"
        class="loader-item"
        @click="copyCode(`bouncing-${type}`)"
      >
        <ui-loader :type="`bouncing-${type}`" />
        <div class="loader-type">
          bouncing-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      发光加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in glowingTypes"
        :key="`glowing-${type}`"
        class="loader-item"
        @click="copyCode(`glowing-${type}`)"
      >
        <ui-loader :type="`glowing-${type}`" />
        <div class="loader-type">
          glowing-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      滚动加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in rollingTypes"
        :key="`rolling-${type}`"
        class="loader-item"
        @click="copyCode(`rolling-${type}`)"
      >
        <ui-loader :type="`rolling-${type}`" />
        <div class="loader-type">
          rolling-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      翻转加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in flippingTypes"
        :key="`flipping-${type}`"
        class="loader-item"
        @click="copyCode(`flipping-${type}`)"
      >
        <ui-loader :type="`flipping-${type}`" />
        <div class="loader-type">
          flipping-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      连续加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in continuousTypes"
        :key="`continuous-${type}`"
        class="loader-item"
        @click="copyCode(`continuous-${type}`)"
      >
        <ui-loader :type="`continuous-${type}`" />
        <div class="loader-type">
          continuous-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      脉冲加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in pulsingTypes"
        :key="`pulsing-${type}`"
        class="loader-item"
        @click="copyCode(`pulsing-${type}`)"
      >
        <ui-loader :type="`pulsing-${type}`" />
        <div class="loader-type">
          pulsing-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      街机风格加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in arcadeTypes"
        :key="`arcade-${type}`"
        class="loader-item"
        @click="copyCode(`arcade-${type}`)"
      >
        <ui-loader :type="`arcade-${type}`" />
        <div class="loader-type">
          arcade-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      催眠加载器
    </div>
    <div class="loaders-grid">
      <div
        v-for="type in hypnoticTypes"
        :key="`hypnotic-${type}`"
        class="loader-item"
        @click="copyCode(`hypnotic-${type}`)"
      >
        <ui-loader :type="`hypnotic-${type}`" />
        <div class="loader-type">
          hypnotic-{{ type }}
        </div>
      </div>
    </div>

    <div class="section-title">
      自定义示例
    </div>
    <div class="usage-examples">
      <div class="example-item">
        <ui-loader type="spinner-3" size="24px" color="#ff4d4f" />
        <div class="example-description">
          <div>小尺寸红色加载器</div>
          <code>&lt;ui-loader type="spinner-3" size="24px" color="#ff4d4f" /&gt;</code>
        </div>
      </div>

      <div class="example-item">
        <ui-loader type="dots-5" size="64px" color="#52c41a" />
        <div class="example-description">
          <div>大尺寸绿色加载器</div>
          <code>&lt;ui-loader type="dots-5" size="64px" color="#52c41a" /&gt;</code>
        </div>
      </div>

      <div class="example-item">
        <ui-loader type="bars-2" size="36px" color="rgba(24, 144, 255, 0.7)" />
        <div class="example-description">
          <div>半透明加载器</div>
          <code>&lt;ui-loader type="bars-2" size="36px" color="rgba(24, 144, 255, 0.7)" /&gt;</code>
        </div>
      </div>
    </div>

    <div class="section-title">
      插槽示例
    </div>
    <div class="slot-examples">
      <div class="example-item">
        <ui-loader type="ring-4" size="100px">
          <div class="loader-text">
            加载中...
          </div>
        </ui-loader>
        <div class="example-description">
          <div>带文字的加载器</div>
          <code>
            &lt;ui-loader type="ring-4" size="100px"&gt;<br>
            &nbsp;&nbsp;&lt;div class="loader-text"&gt;加载中...&lt;/div&gt;<br>
            &lt;/ui-loader&gt;
          </code>
        </div>
      </div>

      <div class="example-item">
        <ui-loader type="classic-6" size="120px">
          <div class="loader-content">
            <ui-icon icon="carbon:document" class="loader-icon" />
            <div class="loader-text">
              正在加载文件...
            </div>
          </div>
        </ui-loader>
        <div class="example-description">
          <div>带图标和文字的加载器</div>
          <code>
            &lt;ui-loader type="classic-6" size="120px"&gt;<br>
            &nbsp;&nbsp;&lt;div class="loader-content"&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-icon icon="carbon:document" class="loader-icon" /&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="loader-text"&gt;正在加载文件...&lt;/div&gt;<br>
            &nbsp;&nbsp;&lt;/div&gt;<br>
            &lt;/ui-loader&gt;
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader-demo {
  padding: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 30px 0 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.loaders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
}

.loader-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e6f7ff;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.loader-type {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.usage-examples,
.slot-examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.example-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
}

.example-description {
  margin-top: 20px;
  width: 100%;
  text-align: center;

  div {
    margin-bottom: 5px;
    font-weight: bold;
  }

  code {
    display: block;
    background-color: #f0f2f5;
    padding: 10px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    text-align: left;
    white-space: pre;
    overflow-x: auto;
  }
}

.loader-text {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  .loader-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .loader-text {
    margin-top: 5px;
  }
}
</style>
