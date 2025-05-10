<script setup lang="ts" name="DemoProgress">
/**
 * 进度条组件演示
 * 创建日期: 2024-08-03
 * 作者: aiftt
 */

// 普通进度值
const percentage = ref(30)

// 环形进度值
const circularPercentage = ref(50)

// 条纹动画进度值
const stripedPercentage = ref(70)

// 动态改变进度值
const dynamicPercentage = ref(0)
const dynamicStatus = ref<'' | 'success' | 'warning' | 'danger'>('')

// 动态进度值的定时器
let timer: NodeJS.Timeout | null = null

// 开始动态进度演示
function startDynamicProgress() {
  // 先重置
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  dynamicPercentage.value = 0
  dynamicStatus.value = ''

  // 创建定时器每200ms增加进度
  timer = setInterval(() => {
    dynamicPercentage.value += 5
    if (dynamicPercentage.value > 100) {
      clearInterval(timer!)
      timer = null
      dynamicStatus.value = 'success'
    }
    else {
      if (dynamicPercentage.value > 80) {
        dynamicStatus.value = 'success'
      }
      else if (dynamicPercentage.value > 50) {
        dynamicStatus.value = 'warning'
      }
    }
  }, 200)
}

// 自定义格式化函数
function customFormat(percentage: number): string {
  if (percentage < 30) {
    return '起步阶段'
  }
  else if (percentage < 70) {
    return '进行中'
  }
  else {
    return '接近完成'
  }
}

// 颜色随百分比变化
const colorPercentage = ref(20)
const colorChange = computed(() => {
  // 从红到绿的渐变
  if (colorPercentage.value < 30) {
    return '#f56c6c'
  }
  else if (colorPercentage.value < 60) {
    return '#e6a23c'
  }
  else if (colorPercentage.value < 80) {
    return '#1989fa'
  }
  else {
    return '#10b981'
  }
})

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 颜色数组演示
const colorArray = [
  { percentage: 20, color: '#f56c6c' },
  { percentage: 40, color: '#e6a23c' },
  { percentage: 60, color: '#1989fa' },
  { percentage: 80, color: '#10b981' },
  { percentage: 100, color: '#67c23a' },
]
</script>

<template>
  <div class="demo-card">
    <h3 class="mb-4 text-lg font-bold">
      进度条 (Progress)
    </h3>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- 基础进度条 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          基础进度条
        </h4>
        <div class="space-y-6">
          <!-- 默认进度条 -->
          <div>
            <p class="mb-2 text-sm">
              默认进度条：
            </p>
            <ui-progress :percentage="percentage" />
          </div>

          <!-- 带状态的进度条 -->
          <div>
            <p class="mb-2 text-sm">
              成功状态：
            </p>
            <ui-progress :percentage="percentage" status="success" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              警告状态：
            </p>
            <ui-progress :percentage="percentage" status="warning" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              危险状态：
            </p>
            <ui-progress :percentage="percentage" status="danger" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              信息状态：
            </p>
            <ui-progress :percentage="percentage" status="info" />
          </div>

          <div class="mt-4">
            <label class="mb-2 block text-sm">
              调整进度值：{{ percentage }}%
              <input
                v-model="percentage"
                type="range"
                min="0"
                max="100"
                step="10"
                class="w-full"
              >
            </label>
          </div>
        </div>
      </div>

      <!-- 进度条尺寸 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          进度条尺寸
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              小尺寸：
            </p>
            <ui-progress :percentage="percentage" size="small" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              默认尺寸：
            </p>
            <ui-progress :percentage="percentage" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              大尺寸：
            </p>
            <ui-progress :percentage="percentage" size="large" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              自定义高度和颜色：
            </p>
            <ui-progress
              :percentage="percentage"
              :stroke-width="12"
              color="#8B5CF6"
              track-color="#EDE9FE"
            />
          </div>
        </div>
      </div>

      <!-- 环形进度条 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          环形进度条
        </h4>
        <div class="flex flex-wrap items-center justify-around gap-4">
          <div class="text-center">
            <ui-progress
              :percentage="circularPercentage"
              circular
              :width="80"
            />
            <p class="mt-2 text-sm">
              默认
            </p>
          </div>

          <div class="text-center">
            <ui-progress
              :percentage="circularPercentage"
              circular
              :width="80"
              status="success"
            />
            <p class="mt-2 text-sm">
              成功
            </p>
          </div>

          <div class="text-center">
            <ui-progress
              :percentage="circularPercentage"
              circular
              :width="80"
              status="warning"
            />
            <p class="mt-2 text-sm">
              警告
            </p>
          </div>

          <div class="text-center">
            <ui-progress
              :percentage="circularPercentage"
              circular
              :width="80"
              status="danger"
            />
            <p class="mt-2 text-sm">
              危险
            </p>
          </div>

          <div class="mt-4 w-full">
            <label class="mb-2 block text-sm">
              调整环形进度值：{{ circularPercentage }}%
              <input
                v-model="circularPercentage"
                type="range"
                min="0"
                max="100"
                step="10"
                class="w-full"
              >
            </label>
          </div>
        </div>
      </div>

      <!-- 文本内显示和自定义格式 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          文本显示方式
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              内部文本：
            </p>
            <ui-progress :percentage="percentage" text-inside size="large" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              不显示文本：
            </p>
            <ui-progress :percentage="percentage" :show-text="false" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              自定义文本格式：
            </p>
            <ui-progress :percentage="percentage" :format="customFormat" />
          </div>
        </div>
      </div>

      <!-- 条纹和动画 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          条纹和动画效果
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              条纹效果：
            </p>
            <ui-progress :percentage="stripedPercentage" striped />
          </div>

          <div>
            <p class="mb-2 text-sm">
              动画条纹：
            </p>
            <ui-progress :percentage="stripedPercentage" striped animated />
          </div>

          <div>
            <p class="mb-2 text-sm">
              状态动画条纹：
            </p>
            <ui-progress :percentage="stripedPercentage" striped animated status="success" />
          </div>

          <div class="mt-4">
            <label class="mb-2 block text-sm">
              调整条纹进度值：{{ stripedPercentage }}%
              <input
                v-model="stripedPercentage"
                type="range"
                min="0"
                max="100"
                step="10"
                class="w-full"
              >
            </label>
          </div>
        </div>
      </div>

      <!-- 动态进度条 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          动态进度条
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              动态变化：
            </p>
            <ui-progress :percentage="dynamicPercentage" :status="dynamicStatus" />
          </div>

          <div class="mt-4">
            <button
              class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              @click="startDynamicProgress"
            >
              开始演示
            </button>
          </div>
        </div>
      </div>

      <!-- 颜色变化 -->
      <div class="border rounded-md p-4">
        <h4 class="mb-2 text-base font-medium">
          自定义颜色
        </h4>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm">
              颜色随进度变化：
            </p>
            <ui-progress :percentage="colorPercentage" :color="colorChange" />
          </div>

          <div>
            <p class="mb-2 text-sm">
              颜色阶段变化：
            </p>
            <ui-progress :percentage="colorPercentage" :color="colorArray" />
          </div>

          <div class="mt-4">
            <label class="mb-2 block text-sm">
              调整进度值：{{ colorPercentage }}%
              <input
                v-model="colorPercentage"
                type="range"
                min="0"
                max="100"
                step="5"
                class="w-full"
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
