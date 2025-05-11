<script setup lang="ts" name="DemoCssShakeAnimation">
/**
 * CSS Shake动画演示组件
 * 创建日期: 2024-11-27
 * 作者: aiftt
 * 说明: 展示CSS Shake动画库的各种效果
 */

// 导入日志工具
const logger = useLogger('css-shake-animation')

// 定义摇晃类型
const shakeTypes = [
  { label: '基础摇晃', value: 'base' },
  { label: '慢速摇晃', value: 'slow' },
  { label: '小幅摇晃', value: 'little' },
  { label: '大幅摇晃', value: 'hard' },
  { label: '水平摇晃', value: 'horizontal' },
  { label: '垂直摇晃', value: 'vertical' },
  { label: '旋转摇晃', value: 'rotate' },
  { label: '透明度摇晃', value: 'opacity' },
  { label: '疯狂摇晃', value: 'crazy' },
  { label: '块状摇晃', value: 'chunk' },
] as const

// 定义类型
type ShakeType = 'base' | 'slow' | 'vertical' | 'little' | 'hard' | 'horizontal' | 'rotate' | 'opacity' | 'crazy' | 'chunk'

// 当前选择的配置
const selectedType = ref<ShakeType>('base')
const isLooping = ref(false)
const pauseOnHover = ref(false)
const freezeOnHover = ref(false)
const isPlaying = ref(false)

// 用于示例代码
const isAnimationPlaying = ref(false)

// 控制动画示例元素
const mainShakeRef = ref<{ play: () => void, stop: () => void } | null>(null)
const previewShakeRefs = ref<{ [key in ShakeType]?: { play: () => void } }>({})

// 监听配置变化自动播放动画
watch([
  selectedType,
  isLooping,
  pauseOnHover,
  freezeOnHover,
], () => {
  playAnimation()
}, { deep: true })

// 播放主动画
function playAnimation() {
  if (mainShakeRef.value) {
    isPlaying.value = false
    nextTick(() => {
      mainShakeRef.value?.play()
    })
  }
}

// 播放预览动画
function playPreviewAnimation(type: ShakeType) {
  selectedType.value = type

  // 先停止当前动画再重新播放
  isPlaying.value = false
  nextTick(() => {
    // 先播放主预览
    mainShakeRef.value?.play()

    // 播放指定的预览动画
    if (previewShakeRefs.value[type]) {
      previewShakeRefs.value[type].play()
    }
  })
}

// 为预览动画注册ref
function registerPreviewRef(type: ShakeType, el: any) {
  if (el) {
    previewShakeRefs.value[type] = el
  }
}

// 示例事件处理函数
function onAnimationStart() {
  logger.info('动画开始播放')
}

function onAnimationEnd() {
  logger.info('动画播放结束')
}

// 获取随机颜色
function getRandomColor() {
  const colors = [
    'bg-blue-100 dark:bg-blue-800/20',
    'bg-green-100 dark:bg-green-800/20',
    'bg-red-100 dark:bg-red-800/20',
    'bg-yellow-100 dark:bg-yellow-800/20',
    'bg-purple-100 dark:bg-purple-800/20',
    'bg-pink-100 dark:bg-pink-800/20',
    'bg-indigo-100 dark:bg-indigo-800/20',
    'bg-teal-100 dark:bg-teal-800/20',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<template>
  <div class="css-shake-animation-demo">
    <div class="mb-8">
      <h2 class="mb-4 text-xl font-semibold">
        CSS Shake动画库
      </h2>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        基于CSShake的动画库，提供多种摇晃效果。所有动画类名都有<code>css-shake-</code>前缀，与其他动画库区分。
      </p>
    </div>

    <!-- 主布局：左右结构 -->
    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- 左侧：配置区域 -->
      <div class="w-full lg:sticky lg:top-4 lg:w-1/3 lg:self-start">
        <div class="border border-gray-100 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-4 text-lg font-medium">
            动画配置
          </h3>

          <div class="mb-4 h-40 w-full flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800/40">
            <ui-css-shake
              ref="mainShakeRef"
              v-model:playing="isPlaying"
              :type="selectedType"
              :loop="isLooping"
              :pause-on-hover="pauseOnHover"
              :freeze-on-hover="freezeOnHover"
              @start="isPlaying = true"
              @end="isPlaying = false"
            >
              <div class="h-24 w-24 flex items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                <ui-icon icon="carbon:cube" size="large" />
              </div>
            </ui-css-shake>
          </div>

          <div class="grid grid-cols-1 mb-4 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium">摇晃类型</label>
              <select
                v-model="selectedType"
                class="w-full border border-gray-300 rounded bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <option
                  v-for="option in shakeTypes"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-4 flex flex-col gap-2">
            <ui-checkbox v-model="isLooping" label="循环播放" />
            <ui-checkbox v-model="pauseOnHover" label="悬停暂停" :disabled="!isLooping" />
            <ui-checkbox v-model="freezeOnHover" label="悬停冻结" />
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            配置变化时自动播放动画
          </p>
        </div>
      </div>

      <!-- 右侧：动画效果预览 -->
      <div class="max-h-80vh w-full overflow-y-auto lg:w-2/3">
        <div class="border border-gray-100 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 class="mb-4 text-lg font-medium">
            动画效果预览
          </h3>
          <div class="mb-6">
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div
                v-for="type in shakeTypes"
                :key="type.value"
                class="cursor-pointer"
              >
                <div
                  class="mb-1 h-24 flex items-center justify-center rounded-lg p-4"
                  :class="getRandomColor()"
                  @click="playPreviewAnimation(type.value)"
                >
                  <ui-css-shake
                    :ref="el => registerPreviewRef(type.value, el)"
                    :key="`preview-${type.value}`"
                    :type="type.value"
                    :autoplay="false"
                  >
                    <div class="h-16 w-16 flex items-center justify-center rounded-full bg-white/70 dark:bg-gray-700/80">
                      <ui-icon icon="carbon:cube" />
                    </div>
                  </ui-css-shake>
                </div>
                <div class="overflow-hidden break-words px-1 text-center text-sm hyphens-auto">
                  {{ type.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用方法 -->
    <div class="mt-6 border border-gray-100 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        使用方法
      </h3>
      <ui-code language="html">
        <!-- 基本使用（组件方式） -->
        <ui-css-shake>
          <div>要摇晃的元素</div>
        </ui-css-shake>

        <!-- 配置不同类型 -->
        <ui-css-shake type="hard">
          <div>大幅摇晃</div>
        </ui-css-shake>

        <!-- 循环播放 -->
        <ui-css-shake type="rotate" :loop="true">
          <div>旋转摇晃（循环）</div>
        </ui-css-shake>

        <!-- 悬停暂停 -->
        <ui-css-shake type="slow" :loop="true" :pause-on-hover="true">
          <div>慢速摇晃（悬停暂停）</div>
        </ui-css-shake>

        <!-- 悬停冻结 -->
        <ui-css-shake type="crazy" :freeze-on-hover="true">
          <div>疯狂摇晃（悬停冻结）</div>
        </ui-css-shake>

        <!-- 受控模式 -->
        <ui-css-shake
          v-model:playing="isAnimationPlaying"
          type="horizontal"
          :autoplay="false"
          @start="onAnimationStart"
          @end="onAnimationEnd"
        >
          <div>受控模式</div>
        </ui-css-shake>

        <!-- 直接使用CSS类 -->
        <div class="css-shake-vertical">
          直接使用CSS类添加垂直摇晃
        </div>
        <div class="css-shake-little css-shake-constant">
          小幅摇晃（持续）
        </div>
      </ui-code>
    </div>
  </div>
</template>
