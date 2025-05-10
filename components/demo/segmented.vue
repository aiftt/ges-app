<script setup lang="ts" name="DemoSegmented">
/**
 * 分段控制器组件演示
 * 创建日期: 2024-08-01
 * 作者: aiftt
 * 更新日期: 2024-08-01
 */

// 基础示例
const basicValue = ref('daily')
const basicOptions = [
  { label: '日', value: 'daily' },
  { label: '周', value: 'weekly' },
  { label: '月', value: 'monthly' },
  { label: '年', value: 'yearly' },
]

// 带图标示例
const iconValue = ref('list')
const iconOptions = [
  { label: '列表', value: 'list', icon: 'carbon:list-boxes' },
  { label: '网格', value: 'grid', icon: 'carbon:grid' },
  { label: '卡片', value: 'card', icon: 'carbon:carbon-for-ibm-product' },
]

// 尺寸示例
const sizeValue = ref('default')
type SegmentSize = 'small' | 'default' | 'large'
const segmentSizes: SegmentSize[] = ['small', 'default', 'large']

// 禁用示例
const disabledValue = ref('option1')
const disabledOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2', disabled: true },
  { label: '选项3', value: 'option3' },
]

// 可取消选中示例
const cancelableValue = ref('a')

// 圆角示例
const roundedValue = ref('circle')

// 块级示例
const blockValue = ref('left')
const blockOptions = [
  { label: '左对齐', value: 'left', icon: 'carbon:align-horizontal-left' },
  { label: '居中', value: 'center', icon: 'carbon:align-horizontal-center' },
  { label: '右对齐', value: 'right', icon: 'carbon:align-horizontal-right' },
]

// 加载示例
const loadingValue = ref('loading')
const isLoading = ref(false)

function toggleLoading() {
  isLoading.value = !isLoading.value

  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="demo-card">
    <h3 class="mb-4 text-lg font-bold">
      分段控制器组件 (Segmented)
    </h3>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- 基础用法 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          基础用法
        </h4>
        <ui-segmented
          v-model="basicValue"
          :options="basicOptions"
        />
        <div class="text-sm text-gray-500">
          当前选中: {{ basicValue }}
        </div>
      </div>

      <!-- 带图标 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          带图标
        </h4>
        <ui-segmented
          v-model="iconValue"
          :options="iconOptions"
        />
        <div class="text-sm text-gray-500">
          当前选中: {{ iconValue }}
        </div>
      </div>

      <!-- 不同尺寸 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          不同尺寸
        </h4>
        <div class="space-y-4">
          <div v-for="(sz, index) in segmentSizes" :key="index" class="flex items-center">
            <span class="w-16 text-sm">{{ sz }}:</span>
            <ui-segmented
              v-model="sizeValue"
              :options="basicOptions"
              :size="sz"
            />
          </div>
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          禁用状态
        </h4>
        <div class="space-y-4">
          <ui-segmented
            v-model="disabledValue"
            :options="disabledOptions"
          />
          <ui-segmented
            v-model="disabledValue"
            :options="basicOptions"
            disabled
          />
        </div>
      </div>

      <!-- 可取消选中 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          可取消选中
        </h4>
        <ui-segmented
          v-model="cancelableValue"
          :options="['a', 'b', 'c']"
          allow-empty
        />
        <div class="text-sm text-gray-500">
          当前选中: {{ cancelableValue || '无' }}
        </div>
      </div>

      <!-- 圆角样式 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          圆角样式
        </h4>
        <ui-segmented
          v-model="roundedValue"
          :options="[
            { label: '默认', value: 'default' },
            { label: '圆形', value: 'circle' },
          ]"
          rounded
        />
      </div>

      <!-- 块级布局 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          块级布局（宽度100%）
        </h4>
        <ui-segmented
          v-model="blockValue"
          :options="blockOptions"
          block
        />
      </div>

      <!-- 加载状态 -->
      <div class="space-y-4">
        <h4 class="text-base font-medium">
          加载状态
        </h4>
        <div class="space-y-2">
          <ui-segmented
            v-model="loadingValue"
            :options="[
              { label: '加载中', value: 'loading' },
              { label: '完成', value: 'done' },
              { label: '失败', value: 'error' },
            ]"
            :loading="isLoading"
          />
          <ui-button size="small" @click="toggleLoading">
            {{ isLoading ? '取消加载' : '模拟加载' }}
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>
