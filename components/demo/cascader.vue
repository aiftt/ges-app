<script setup lang="ts" name="DemoCascader">
/**
 * 级联选择器组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
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
function handleRemoveTag(value: string | number) {
  logger.info('移除标签:', value)
}

// 处理展开变化
function handleExpandChange(value: string[]) {
  logger.info('展开节点变更:', value)
}

// 示例代码字符串
const basicCode = `<template>
  <ui-input-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @expand-change="handleExpandChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

// 城市数据
const options = [
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
        ],
      },
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'wanshoulu', label: '万寿路街道' },
          { value: 'zhongguancun', label: '中关村街道' },
        ],
      },
    ],
  },
  // 更多城市选项...
]

function handleChange(value) {
  console.log('值已变更:', value)
}

function handleVisibleChange(visible) {
  console.log('打开状态变更:', visible)
}

function handleExpandChange(value) {
  console.log('展开节点变更:', value)
}
<\/script>`

const showPathCode = `<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <p class="mb-2 text-sm">默认显示路径</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        :show-path="true"
      />
    </div>
    <div class="flex-1">
      <p class="mb-2 text-sm">仅显示标签</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        :show-path="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  // 城市数据选项...
]
<\/script>`

const multipleCode = `<template>
  <ui-input-cascader
    v-model="value"
    :options="options"
    clearable
    multiple
    @remove-tag="handleRemoveTag"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])
const options = [
  // 城市数据选项...
]

function handleRemoveTag(value) {
  console.log('移除标签:', value)
}
<\/script>`

const searchCode = `<template>
  <ui-input-cascader
    v-model="value"
    :options="options"
    clearable
    filterable
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  // 城市数据选项...
]
<\/script>`

const sizeCode = `<template>
  <div class="space-y-4">
    <div>
      <p class="mb-2 text-sm">small</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        size="small"
      />
    </div>

    <div>
      <p class="mb-2 text-sm">default</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        size="default"
      />
    </div>

    <div>
      <p class="mb-2 text-sm">large</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        size="large"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  // 城市数据选项...
]
<\/script>`

const disabledCode = `<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <p class="mb-2 text-sm">整体禁用</p>
      <ui-input-cascader
        v-model="value"
        :options="options"
        disabled
      />
    </div>
    <div class="flex-1">
      <p class="mb-2 text-sm">选项禁用</p>
      <ui-input-cascader
        v-model="disabledValue"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
// 预设一个被禁用选项的值
const disabledValue = ref('guangdong')
const options = [
  // 城市数据选项，其中广东省被设置为 disabled: true
]
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Cascader 级联选择器
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      级联选择器用于从一系列相关联的数据集合中进行选择，常用于省市区、组织架构、分类目录等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的级联选择器用法，支持选择省市区等多级数据。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <ui-input-cascader
          v-model="basicValue"
          :options="options"
          @change="handleChange"
          @visible-change="handleVisibleChange"
          @expand-change="handleExpandChange"
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ basicValue || '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 显示路径 -->
    <ui-demo
      title="显示路径 vs 仅显示标签"
      description="可以选择是否显示完整的选择路径或仅显示最终选择的标签。"
      :code="showPathCode"
    >
      <div class="flex gap-4">
        <div class="flex-1">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            默认显示路径
          </p>
          <ui-input-cascader
            v-model="customValue"
            :options="options"
            :show-path="true"
          />
        </div>
        <div class="flex-1">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            仅显示标签
          </p>
          <ui-input-cascader
            v-model="customValue"
            :options="options"
            :show-path="false"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 多选模式 -->
    <ui-demo
      title="多选模式"
      description="支持多选模式，可以同时选择多个选项。"
      :code="multipleCode"
    >
      <div class="space-y-4">
        <ui-input-cascader
          v-model="multipleValue"
          :options="options"
          clearable
          multiple
          @remove-tag="handleRemoveTag"
        />

        <div class="text-sm text-gray-600 dark:text-gray-400">
          当前选中值: {{ multipleValue.length ? multipleValue.join(', ') : '未选择' }}
        </div>
      </div>
    </ui-demo>

    <!-- 可搜索 -->
    <ui-demo
      title="可搜索"
      description="支持搜索功能，方便快速查找选项。"
      :code="searchCode"
    >
      <ui-input-cascader
        v-model="searchValue"
        :options="options"
        clearable
        filterable
      />
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种不同尺寸：small、default、large。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div v-for="size in sizes" :key="size">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            {{ size }}
          </p>
          <ui-input-cascader
            v-model="basicValue"
            :options="options"
            :size="size"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="支持整体禁用和选项禁用两种方式。"
      :code="disabledCode"
    >
      <div class="flex gap-4">
        <div class="flex-1">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            整体禁用
          </p>
          <ui-input-cascader
            v-model="basicValue"
            :options="options"
            disabled
          />
        </div>
        <div class="flex-1">
          <p class="mb-2 text-sm font-medium dark:text-gray-300">
            选项禁用
          </p>
          <ui-input-cascader
            v-model="disabledValue"
            :options="options"
          />
        </div>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="Cascader组件的属性、事件和方法。"
      :show-code="false"
      code=""
    >
      <h4 class="mb-2 font-medium dark:text-white">
        属性
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                名称
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                modelValue
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                绑定值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string / number / array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                options
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                可选项数据源
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                []
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placeholder
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                占位文本
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '请选择'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clearable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否支持清空选项
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                showPath
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示完整路径
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                true
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                expandTrigger
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                次级菜单的展开方式
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'click' / 'hover'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'click'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                multiple
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否多选
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                filterable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否可搜索
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                separator
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选项分隔符
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ' / '
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                尺寸
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' / 'default' / 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'default'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                checkStrictly
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否严格的遵守父子节点不互相关联
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        事件
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                事件名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当选中节点变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: any)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                expand-change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当展开节点发生变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: array)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                visible-change
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当下拉框显示/隐藏时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (visible: boolean)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                remove-tag
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                在多选模式下，移除标签时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string | number)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        CascaderOption类型
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                名称
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                类型
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                value
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选项的值
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string | number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                label
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                选项的标签
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                children
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                子选项
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                array
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                disabled
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否禁用
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                boolean
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
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
