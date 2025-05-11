<script setup lang="ts" name="DemoMagicAnimation">
/**
 * Magic动画演示组件
 * 创建日期: 2024-11-22
 * 作者: aiftt
 * 说明: 提供Magic动画库的使用示例
 * 更新日期: 2024-11-22 - 更新类名前缀为magic-anim-
 * 更新日期: 2024-11-22 - 优化下拉框和预览功能
 * 更新日期: 2024-11-26 - 修改为配置变化自动播放动画
 * 更新日期: 2024-11-27 - 更新所有动画分组和动画列表
 */

// 导入日志工具
const logger = useLogger('magic-animation')

// 动画分类和对应的动画效果
const animationGroups = [
  {
    name: '注意力效果',
    animations: [
      'bounce',
      'flash',
      'pulse',
      'rubberBand',
      'shake',
      'swing',
      'tada',
      'wobble',
      'jello',
    ],
  },
  {
    name: '入场动画',
    animations: [
      'puffIn',
      'vanishIn',
      'boingInUp',
      'magic',
      'swap',
      'twisterInDown',
      'twisterInUp',
      'foolishIn',
      'swashIn',
      'spaceInDown',
      'spaceInLeft',
      'spaceInRight',
      'spaceInUp',
    ],
  },
  {
    name: '出场动画',
    animations: [
      'puffOut',
      'vanishOut',
      'boingOutDown',
      'bombLeftOut',
      'bombRightOut',
      'foolishOut',
      'holeOut',
      'swashOut',
      'spaceOutDown',
      'spaceOutLeft',
      'spaceOutRight',
      'spaceOutUp',
    ],
  },
  {
    name: '透视效果',
    animations: [
      'perspectiveDown',
      'perspectiveLeft',
      'perspectiveRight',
      'perspectiveUp',
      'perspectiveDownReturn',
      'perspectiveLeftReturn',
      'perspectiveRightReturn',
      'perspectiveUpReturn',
    ],
  },
  {
    name: '旋转动画',
    animations: [
      'rotateDown',
      'rotateLeft',
      'rotateRight',
      'rotateUp',
    ],
  },
  {
    name: '滑动动画',
    animations: [
      'slideDown',
      'slideLeft',
      'slideRight',
      'slideUp',
      'slideDownReturn',
      'slideLeftReturn',
      'slideRightReturn',
      'slideUpReturn',
    ],
  },
  {
    name: '开合动画',
    animations: [
      'openDownLeft',
      'openDownRight',
      'openUpLeft',
      'openUpRight',
      'openDownLeftReturn',
      'openDownRightReturn',
      'openUpLeftReturn',
      'openUpRightReturn',
      'openDownLeftOut',
      'openDownRightOut',
      'openUpLeftOut',
      'openUpRightOut',
    ],
  },
  {
    name: 'Tin系列动画',
    animations: [
      'tinDownIn',
      'tinLeftIn',
      'tinRightIn',
      'tinUpIn',
      'tinDownOut',
      'tinLeftOut',
      'tinRightOut',
      'tinUpOut',
    ],
  },
]

// 预处理所有动画名称，方便下拉框选择
const allAnimations = ref<{ label: string, value: string }[]>([])
const allAnimationsByGroup = ref<{ label: string, options: { label: string, value: string }[] }[]>([])

// 初始化动画列表
onMounted(() => {
  // 预处理所有动画为扁平列表
  const animations: { label: string, value: string }[] = []
  const animationsByGroup: { label: string, options: { label: string, value: string }[] }[] = []

  animationGroups.forEach((group) => {
    const groupOptions: { label: string, value: string }[] = []

    group.animations.forEach((animation) => {
      animations.push({ label: animation, value: animation })
      groupOptions.push({ label: animation, value: animation })
    })

    animationsByGroup.push({
      label: group.name,
      options: groupOptions,
    })
  })

  allAnimations.value = animations
  allAnimationsByGroup.value = animationsByGroup
})

// 当前选择的动画
const selectedAnimation = ref('puffIn')
const selectedSpeed = ref<'normal' | 'fast' | 'slow'>('normal')
const isLooping = ref(false)
const isReverse = ref(false)
const animationDelay = ref(0)
const isPlaying = ref(false)

// 用于示例代码
const isAnimationPlaying = ref(false)

// 动画配置选项
const speedOptions = [
  { label: '正常', value: 'normal' },
  { label: '快速', value: 'fast' },
  { label: '慢速', value: 'slow' },
]

// 控制动画示例元素
const mainAnimationRef = ref<{ play: () => void, stop: () => void, replay: () => void } | null>(null)
const previewAnimRefs = ref<{ [key: string]: { play: () => void } }>({})

// 监听配置变化自动播放动画
watch([
  selectedAnimation,
  selectedSpeed,
  isLooping,
  isReverse,
  animationDelay,
], () => {
  playAnimation()
}, { deep: true })

// 播放主动画
function playAnimation() {
  if (mainAnimationRef.value) {
    isPlaying.value = false
    nextTick(() => {
      mainAnimationRef.value?.replay()
    })
  }
}

// 播放预览动画
function playPreviewAnimation(animation: string) {
  selectedAnimation.value = animation

  // 先停止当前动画再重新播放
  isPlaying.value = false
  nextTick(() => {
    // 先播放主预览
    mainAnimationRef.value?.replay()

    // 播放指定的预览动画
    if (previewAnimRefs.value[animation]) {
      previewAnimRefs.value[animation].play()
    }
  })
}

// 为预览动画注册ref
function registerPreviewRef(animation: string, el: any) {
  if (el) {
    previewAnimRefs.value[animation] = el
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
  <div class="magic-animation-demo">
    <div class="mb-8">
      <h2 class="mb-4 text-xl font-semibold">
        Magic动画库
      </h2>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        基于Magic.css的动画库，提供丰富的动画效果，使用简单的方式为元素添加动画。现在所有动画类名都有<code>magic-anim-</code>前缀，更容易与其他动画库区分。
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
            <ui-magic-animation
              ref="mainAnimationRef"
              v-model:playing="isPlaying"
              :name="selectedAnimation"
              :speed="selectedSpeed"
              :loop="isLooping"
              :reverse="isReverse"
              :delay="animationDelay"
              @start="isPlaying = true"
              @end="isPlaying = false"
            >
              <div class="h-24 w-24 flex items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                <ui-icon icon="carbon:rocket" size="large" />
              </div>
            </ui-magic-animation>
          </div>

          <div class="grid grid-cols-1 mb-4 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium">动画效果</label>
              <select
                v-model="selectedAnimation"
                class="w-full border border-gray-300 rounded bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <optgroup v-for="group in allAnimationsByGroup" :key="group.label" :label="group.label">
                  <option
                    v-for="option in group.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">动画速度</label>
              <select
                v-model="selectedSpeed"
                class="w-full border border-gray-300 rounded bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <option
                  v-for="option in speedOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-4 flex items-center gap-4">
            <ui-checkbox v-model="isLooping" label="循环播放" />
            <ui-checkbox v-model="isReverse" label="反向播放" />
          </div>

          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">延迟 (毫秒): {{ animationDelay }}ms</label>
            <ui-slider v-model="animationDelay" :min="0" :max="2000" :step="100" />
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
          <div v-for="group in animationGroups" :key="group.name" class="mb-6">
            <h4 class="mb-2 font-medium">
              {{ group.name }}
            </h4>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              <div
                v-for="animation in group.animations"
                :key="animation"
                class="cursor-pointer"
              >
                <div
                  class="mb-1 h-24 flex items-center justify-center rounded-lg p-4"
                  :class="getRandomColor()"
                  @click="playPreviewAnimation(animation)"
                >
                  <ui-magic-animation
                    :ref="el => registerPreviewRef(animation, el)"
                    :key="`preview-${animation}`"
                    :name="animation"
                    :autoplay="false"
                  >
                    <div class="h-16 w-16 flex items-center justify-center rounded-full bg-white/70 dark:bg-gray-700/80">
                      <ui-icon icon="carbon:fire" />
                    </div>
                  </ui-magic-animation>
                </div>
                <div class="overflow-hidden break-words px-1 text-center text-sm hyphens-auto">
                  {{ animation }}
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
        <ui-magic-animation name="puffIn">
          <div>元素内容</div>
        </ui-magic-animation>

        <!-- 配置参数 -->
        <ui-magic-animation
          name="vanishIn"
          speed="fast"
          :loop="true"
          :delay="500"
          :reverse="false"
          @start="onAnimationStart()"
          @end="onAnimationEnd()"
        >
          <div>元素内容</div>
        </ui-magic-animation>

        <!-- 受控模式 -->
        <ui-magic-animation
          v-model:playing="isAnimationPlaying"
          name="boingInUp"
          :autoplay="false"
        >
          <div>元素内容</div>
        </ui-magic-animation>

        <!-- 直接使用CSS类 -->
        <div class="magic-anim-puffIn">
          直接使用CSS类添加动画
        </div>
        <div class="magic-anim-vanishIn magic-anim-animated--slow">
          慢速动画
        </div>
      </ui-code>
    </div>
  </div>
</template>
