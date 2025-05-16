<script setup lang="ts" name="DemoTimeSelect">
/**
 * 时间选择器演示
 * 创建日期: 2024-08-27
 * 作者: aiftt
 * 更新日期: 2024-08-27 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoTimeSelect')

// 基础用法
const selectedTime = ref('')

// 不同尺寸
const smallTime = ref('')
const mediumTime = ref('')
const largeTime = ref('')

// 时间范围
const workTime = ref('')

// 步长设置
const stepTime = ref('')

// 12小时制
const time12h = ref('')

// 禁用和只读状态
const disabledTime = ref('10:30')
const readonlyTime = ref('14:00')

// 自定义前后缀图标
const customIconTime = ref('')
const prefixIcon = ref('carbon:time')
const suffixIcon = ref('carbon:chevron-down')

// 弹出位置控制
const placementTime = ref('')
const placement = ref<'bottom-start' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'>('bottom-start')

// 值改变事件处理
function handleChange(value: string) {
  logger.info('时间改变:', value)
}

// 清除事件处理
function handleClear() {
  logger.info('时间已清除')
}

// 示例代码字符串
const basicCode = `<template>
  <ui-time-select
    v-model="selectedTime"
    placeholder="请选择时间"
    @change="handleChange"
    @clear="handleClear"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedTime = ref('')

function handleChange(value) {
  console.log('时间改变:', value)
}

function handleClear() {
  console.log('时间已清除')
}
<\/script>`

const sizesCode = `<template>
  <div class="space-y-4">
    <ui-time-select
      v-model="smallTime"
      size="small"
      placeholder="小尺寸"
    />
    <ui-time-select
      v-model="mediumTime"
      size="medium"
      placeholder="中等尺寸(默认)"
    />
    <ui-time-select
      v-model="largeTime"
      size="large"
      placeholder="大尺寸"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const smallTime = ref('')
const mediumTime = ref('')
const largeTime = ref('')
<\/script>`

const rangeCode = `<template>
  <ui-time-select
    v-model="workTime"
    start="09:00"
    end="18:00"
    :step="30"
    placeholder="工作时间 (9:00 - 18:00)"
  />
</template>

<script setup>
import { ref } from 'vue'

const workTime = ref('')
<\/script>`

const stepCode = `<template>
  <ui-time-select
    v-model="stepTime"
    :step="60"
    placeholder="每小时间隔"
  />
</template>

<script setup>
import { ref } from 'vue'

const stepTime = ref('')
<\/script>`

const format12hCode = `<template>
  <ui-time-select
    v-model="time12h"
    :format="12"
    placeholder="选择时间 (12小时制)"
  />
</template>

<script setup>
import { ref } from 'vue'

const time12h = ref('')
<\/script>`

const disabledCode = `<template>
  <div class="space-y-4">
    <ui-time-select
      v-model="disabledTime"
      disabled
      placeholder="禁用状态"
    />
    <ui-time-select
      v-model="readonlyTime"
      readonly
      placeholder="只读状态"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabledTime = ref('10:30')
const readonlyTime = ref('14:00')
<\/script>`

const customIconCode = `<template>
  <ui-time-select
    v-model="customIconTime"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    placeholder="自定义图标"
  />
</template>

<script setup>
import { ref } from 'vue'

const customIconTime = ref('')
const prefixIcon = ref('carbon:time')
const suffixIcon = ref('carbon:chevron-down')
<\/script>`

const placementCode = `<template>
  <ui-time-select
    v-model="placementTime"
    :placement="placement"
    placeholder="选择弹出位置"
  />
</template>

<script setup>
import { ref } from 'vue'

const placementTime = ref('')
const placement = ref('bottom-start')
<\/script>`

const widthCode = `<template>
  <ui-time-select
    v-model="selectedTime"
    :popper-width="240"
    placeholder="宽度为240px的下拉框"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedTime = ref('')
<\/script>`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      TimeSelect 时间选择器
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      时间选择器用于选择固定时间点，以列表形式展示可选的时间，支持自定义时间间隔、可选范围和显示格式。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基本的时间选择器，显示可选时间列表供用户选择。"
      :code="basicCode"
    >
      <div class="space-y-4">
        <div class="w-72">
          <ui-time-select
            v-model="selectedTime"
            placeholder="请选择时间"
            @change="handleChange"
            @clear="handleClear"
          />
        </div>
        <div v-if="selectedTime" class="text-sm text-gray-600 dark:text-gray-400">
          已选择时间: {{ selectedTime }}
        </div>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="提供三种不同尺寸：small、medium(默认)、large。"
      :code="sizesCode"
    >
      <div class="w-72 space-y-4">
        <ui-time-select
          v-model="smallTime"
          size="small"
          placeholder="小尺寸"
        />
        <ui-time-select
          v-model="mediumTime"
          size="medium"
          placeholder="中等尺寸(默认)"
        />
        <ui-time-select
          v-model="largeTime"
          size="large"
          placeholder="大尺寸"
        />
      </div>
    </ui-demo>

    <!-- 时间范围 -->
    <ui-demo
      title="时间范围"
      description="可以设置开始时间和结束时间来限制可选范围。"
      :code="rangeCode"
    >
      <div class="space-y-4">
        <div class="w-72">
          <ui-time-select
            v-model="workTime"
            start="09:00"
            end="18:00"
            :step="30"
            placeholder="工作时间 (9:00 - 18:00)"
          />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          此例限制了可选范围在上午9点到下午6点之间，时间间隔为30分钟
        </p>
      </div>
    </ui-demo>

    <!-- 步长设置 -->
    <ui-demo
      title="时间间隔"
      description="可以自定义时间间隔，控制可选时间点的密度。"
      :code="stepCode"
    >
      <div class="space-y-4">
        <div class="w-72">
          <ui-time-select
            v-model="stepTime"
            :step="60"
            placeholder="每小时间隔"
          />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          设置 step 为 60 表示每小时一个选项
        </p>
      </div>
    </ui-demo>

    <!-- 12小时制 -->
    <ui-demo
      title="12小时制"
      description="支持12小时制显示时间，带有AM/PM指示。"
      :code="format12hCode"
    >
      <div class="space-y-4">
        <div class="w-72">
          <ui-time-select
            v-model="time12h"
            :format="12"
            placeholder="选择时间 (12小时制)"
          />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          设置 format 为 12 以使用 12 小时制（带 AM/PM）
        </p>
      </div>
    </ui-demo>

    <!-- 禁用和只读 -->
    <ui-demo
      title="禁用和只读"
      description="支持禁用和只读两种状态，限制用户交互。"
      :code="disabledCode"
    >
      <div class="w-72 space-y-4">
        <ui-time-select
          v-model="disabledTime"
          disabled
          placeholder="禁用状态"
        />
        <ui-time-select
          v-model="readonlyTime"
          readonly
          placeholder="只读状态"
        />
      </div>
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="可以自定义前缀和后缀图标，增强视觉提示。"
      :code="customIconCode"
    >
      <div class="space-y-4">
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span class="dark:text-white">前缀图标:</span>
          <ui-button size="small" @click="prefixIcon = 'carbon:time'">
            时钟
          </ui-button>
          <ui-button size="small" @click="prefixIcon = 'carbon:calendar'">
            日历
          </ui-button>
          <ui-button size="small" @click="prefixIcon = 'carbon:alarm'">
            闹钟
          </ui-button>
        </div>
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <span class="dark:text-white">后缀图标:</span>
          <ui-button size="small" @click="suffixIcon = 'carbon:chevron-down'">
            向下箭头
          </ui-button>
          <ui-button size="small" @click="suffixIcon = 'carbon:caret-down'">
            下三角
          </ui-button>
          <ui-button size="small" @click="suffixIcon = 'carbon:overflow-menu-horizontal'">
            菜单
          </ui-button>
        </div>
        <div class="w-72">
          <ui-time-select
            v-model="customIconTime"
            :prefix-icon="prefixIcon"
            :suffix-icon="suffixIcon"
            placeholder="自定义图标"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 弹出位置 -->
    <ui-demo
      title="弹出位置"
      description="可以控制下拉列表的弹出位置，适应不同的布局需求。"
      :code="placementCode"
    >
      <div class="space-y-4">
        <div class="mb-4 flex flex-wrap gap-2">
          <ui-button
            v-for="pos in ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']"
            :key="pos"
            size="small"
            :type="placement === pos ? 'primary' : 'default'"
            @click="placement = pos as 'bottom-start' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'"
          >
            {{ pos }}
          </ui-button>
        </div>
        <div class="w-72">
          <ui-time-select
            v-model="placementTime"
            :placement="placement"
            :popper-class="`placement-${placement}`"
            placeholder="选择弹出位置"
          />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          当前弹出位置: {{ placement }}
        </p>
      </div>
    </ui-demo>

    <!-- 自定义宽度 -->
    <ui-demo
      title="自定义宽度"
      description="可以自定义下拉菜单的宽度，满足不同的显示需求。"
      :code="widthCode"
    >
      <div class="space-y-4">
        <div class="w-72">
          <ui-time-select
            v-model="selectedTime"
            :popper-width="240"
            placeholder="宽度为240px的下拉框"
          />
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          通过 popper-width 属性设置下拉菜单宽度为 240px
        </p>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="TimeSelect组件的属性、事件和方法。"
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
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
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
                '选择时间'
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
                readonly
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否只读
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
                size
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                尺寸
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'small' / 'medium' / 'large'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'medium'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                start
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                开始时间
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '00:00'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                end
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                结束时间
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                '23:59'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                step
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                时间间隔（分钟）
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                30
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                format
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                时间格式（12或24）
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                24
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                prefixIcon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                前缀图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                suffixIcon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                后缀图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'carbon:chevron-down'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                placement
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                弹出位置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'bottom-start'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                popperWidth
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                下拉框宽度
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                popperClass
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                下拉框类名
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ''
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
                当选中值变化时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (value: string)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                blur
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当组件失去焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                focus
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当组件获得焦点时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                (event: FocusEvent)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                clear
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                当清空选择时触发
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                ()
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>

<style lang="scss" scoped>
// 自定义弹出样式
:deep(.placement-top),
:deep(.placement-top-start),
:deep(.placement-top-end) {
  border-bottom: 2px solid var(--ui-color-primary, #3b82f6);
}

:deep(.placement-bottom),
:deep(.placement-bottom-start),
:deep(.placement-bottom-end) {
  border-top: 2px solid var(--ui-color-primary, #3b82f6);
}
</style>
