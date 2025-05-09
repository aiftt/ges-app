<script setup lang="ts" name="DemoCascader">
/**
 * 级联选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */

import type { CascaderOption } from '~/components/ui/input/cascader.vue'
import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoCascader')

// 基础示例的选中值
const basicValue = ref('')

// 多选示例的选中值
const multipleValue = ref<string[]>([])

// 搜索示例的选中值
const searchValue = ref('')

// 自定义示例的选中值
const customValue = ref('')

// 禁用状态
const disabledValue = ref('guangdong')

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const

// 示例选项数据
const options: CascaderOption[] = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'datunli', label: '大屯里街道' },
          { value: 'jianguomen', label: '建国门街道' },
          { value: 'chaowai', label: '朝外街道' },
        ],
      },
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'wanshoulu', label: '万寿路街道' },
          { value: 'zhongguancun', label: '中关村街道' },
          { value: 'beitaipingzhuang', label: '北太平庄街道' },
        ],
      },
      {
        value: 'dongcheng',
        label: '东城区',
        children: [
          { value: 'dongdan', label: '东单街道' },
          { value: 'chaoyangmen', label: '朝阳门街道' },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'pudongxinqu',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴街道' },
          { value: 'zhangjiang', label: '张江街道' },
        ],
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjingdonglu', label: '南京东路街道' },
          { value: 'yuyuan', label: '豫园街道' },
        ],
      },
    ],
  },
  {
    value: 'guangdong',
    label: '广东',
    disabled: true,
    children: [
      {
        value: 'guangzhou',
        label: '广州',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'haizhu', label: '海珠区' },
        ],
      },
      {
        value: 'shenzhen',
        label: '深圳',
        children: [
          { value: 'futian', label: '福田区' },
          { value: 'nanshan', label: '南山区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'gulou', label: '鼓楼区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'wuzhong', label: '吴中区' },
          { value: 'huqiu', label: '虎丘区' },
        ],
      },
    ],
  },
]

// 处理变化
function handleChange(value: any) {
  logger.info('值已变更:', value)
}

// 处理打开状态变化
function handleVisibleChange(visible: boolean) {
  logger.info('打开状态变更:', visible)
}

// 处理移除标签
function handleRemoveTag(value: string) {
  logger.info('移除标签:', value)
}

// 处理展开变化
function handleExpandChange(value: string[]) {
  logger.info('展开节点变更:', value)
}
</script>

<template>
  <div class="demo-cascader">
    <h2>Cascader 级联选择器</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-block flex flex-col gap-4">
        <ui-input-cascader
          v-model="basicValue"
          :options="options"
          @change="handleChange"
          @visible-change="handleVisibleChange"
          @expand-change="handleExpandChange"
        />

        <div class="text-sm text-gray-500">
          当前选中值: {{ basicValue || '未选择' }}
        </div>
      </div>
    </div>

    <!-- 显示路径 -->
    <div class="demo-section">
      <h3>显示路径 vs 仅显示标签</h3>
      <div class="demo-block flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <p class="mb-2 text-sm">
              默认显示路径
            </p>
            <ui-input-cascader
              v-model="customValue"
              :options="options"
              :show-path="true"
            />
          </div>
          <div class="flex-1">
            <p class="mb-2 text-sm">
              仅显示标签
            </p>
            <ui-input-cascader
              v-model="customValue"
              :options="options"
              :show-path="false"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 多选模式 -->
    <div class="demo-section">
      <h3>多选模式</h3>
      <div class="demo-block flex flex-col gap-4">
        <ui-input-cascader
          v-model="multipleValue"
          :options="options"

          clearable multiple
          @remove-tag="handleRemoveTag"
        />

        <div class="text-sm text-gray-500">
          当前选中值: {{ multipleValue.length ? multipleValue.join(', ') : '未选择' }}
        </div>
      </div>
    </div>

    <!-- 可搜索 -->
    <div class="demo-section">
      <h3>可搜索</h3>
      <div class="demo-block flex flex-col gap-4">
        <ui-input-cascader
          v-model="searchValue"
          :options="options"

          clearable filterable
        />
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-block flex flex-col gap-4">
        <div v-for="size in sizes" :key="size" class="mb-2">
          <p class="mb-2 text-sm">
            {{ size }}
          </p>
          <ui-input-cascader
            v-model="basicValue"
            :options="options"
            :size="size"
          />
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-block flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <p class="mb-2 text-sm">
              整体禁用
            </p>
            <ui-input-cascader
              v-model="basicValue"
              :options="options"
              disabled
            />
          </div>
          <div class="flex-1">
            <p class="mb-2 text-sm">
              选项禁用
            </p>
            <ui-input-cascader
              v-model="disabledValue"
              :options="options"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-cascader {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section h3 {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 500;
}

.demo-block {
  padding: 24px;
  border: 1px solid var(--ui-border-color, #e5e7eb);
  border-radius: 8px;
  background-color: white;
}
</style>
