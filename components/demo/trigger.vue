<script setup lang="ts" name="DemoTrigger">
/**
 * Trigger 组件演示
 * 创建日期: 2025-05-07
 * 作者: aiftt
 */
import { ref } from 'vue'

type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'
type PlacementType = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'

const triggers = ['hover', 'click', 'focus', 'contextmenu'] as const
const placements = ['top', 'right', 'bottom', 'left'] as const
const selectedTrigger = ref<TriggerType>('hover')
const selectedPlacement = ref<PlacementType>('top')

// 更新选中的触发方式
function updateTrigger(trigger: TriggerType) {
  selectedTrigger.value = trigger
}

// 更新选中的位置
function updatePlacement(placement: PlacementType) {
  selectedPlacement.value = placement
}
</script>

<template>
  <div class="demo-section">
    <h2 class="demo-title">
      Trigger 触发器
    </h2>
    <p class="mb-4">
      通用的触发器组件，用于实现各种弹出层交互，是Popover和Tooltip等组件的基础。
    </p>

    <div class="demo-card">
      <h3 class="mb-2 text-lg font-medium">
        基础用法
      </h3>

      <div class="mb-4">
        <div class="mb-2">
          触发方式:
        </div>
        <div class="flex space-x-2">
          <button
            v-for="trigger in triggers"
            :key="trigger"
            class="border rounded px-3 py-1"
            :class="{ 'bg-blue-500 text-white': selectedTrigger === trigger }"
            @click="updateTrigger(trigger)"
          >
            {{ trigger }}
          </button>
        </div>
      </div>

      <div class="mb-4">
        <div class="mb-2">
          弹出位置:
        </div>
        <div class="flex space-x-2">
          <button
            v-for="placement in placements"
            :key="placement"
            class="border rounded px-3 py-1"
            :class="{ 'bg-blue-500 text-white': selectedPlacement === placement }"
            @click="updatePlacement(placement)"
          >
            {{ placement }}
          </button>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <ui-trigger
          :trigger="selectedTrigger"
          :placement="selectedPlacement"
          :offset="12"
        >
          <template #default>
            <ui-button>{{ selectedTrigger }} 触发</ui-button>
          </template>
          <template #content>
            <div class="min-w-[200px] border rounded bg-white p-3 text-center shadow-md dark:bg-gray-800">
              <div class="mb-1 font-medium">
                {{ selectedPlacement }} 位置弹出层
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                触发方式: {{ selectedTrigger }}
              </div>
            </div>
          </template>
        </ui-trigger>
      </div>
    </div>

    <div class="demo-card mt-4">
      <h3 class="mb-2 text-lg font-medium">
        自定义内容
      </h3>
      <div class="flex justify-center">
        <ui-trigger
          trigger="click"
          placement="bottom"
        >
          <template #default>
            <ui-button>点击查看更多内容</ui-button>
          </template>
          <template #content>
            <div class="min-w-[250px] border rounded bg-white p-4 shadow-md dark:bg-gray-800">
              <h4 class="mb-2 font-medium">
                自定义内容
              </h4>
              <p class="mb-2 text-sm">
                可以在内容区域放置任意内容，包括表单、列表、按钮等。
              </p>
              <div class="mt-3 flex justify-end">
                <ui-button type="primary" size="small">
                  操作按钮
                </ui-button>
              </div>
            </div>
          </template>
        </ui-trigger>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 2rem;
}

.demo-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-card {
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: var(--ui-card-bg, white);
}
</style>
