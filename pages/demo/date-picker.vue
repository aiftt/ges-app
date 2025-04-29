<script setup lang="ts">
/**
 * 日期选择器组件演示页面
 * 创建日期: 2024-01-08
 * 作者: aiftt
 */

// 示例数据
const date1 = ref('')
const date2 = ref('')
const date3 = ref('2024-01-01')
const dateFormat2 = ref('yyyy年MM月dd日')
</script>

<template>
  <div class="p-6 space-y-8">
    <div class="text-2xl font-bold">
      日期选择器组件演示
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- 基础用法 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          基础用法
        </div>
        <div class="rounded bg-white p-4 shadow dark:bg-gray-800">
          <div class="mb-2">
            选择日期：{{ date1 || '未选择' }}
          </div>
          <ui-date-picker v-model="date1" />

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            基础的日期选择器组件，用于选择指定日期。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-900">
&lt;script setup&gt;
const date = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;ui-date-picker v-model="date" /&gt;
&lt;/template&gt;</pre>
          </div>
        </div>
      </div>

      <!-- 不同尺寸 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          不同尺寸
        </div>
        <div class="rounded bg-white p-4 shadow dark:bg-gray-800">
          <div class="space-y-4">
            <div>
              <div class="mb-1 text-sm">
                小尺寸
              </div>
              <ui-date-picker v-model="date1" size="small" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                默认尺寸
              </div>
              <ui-date-picker v-model="date1" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                大尺寸
              </div>
              <ui-date-picker v-model="date1" size="large" />
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Date Picker 提供了三种尺寸：small、default 和 large，用于不同场景下的适配。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-900">
&lt;ui-date-picker v-model="date" size="small" /&gt;
&lt;ui-date-picker v-model="date" /&gt;
&lt;ui-date-picker v-model="date" size="large" /&gt;</pre>
          </div>
        </div>
      </div>

      <!-- 日期格式 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          日期格式
        </div>
        <div class="rounded bg-white p-4 shadow dark:bg-gray-800">
          <div class="space-y-4">
            <div>
              <div class="mb-1 text-sm">
                默认格式 (yyyy-MM-dd)
              </div>
              <ui-date-picker v-model="date2" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                中文格式 (yyyy年MM月dd日)
              </div>
              <ui-date-picker v-model="date2" :format="dateFormat2" />
            </div>

            <div class="mb-2">
              选择日期：{{ date2 || '未选择' }}
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            可以通过 format 属性设置日期的显示格式，而不影响实际的值格式。值始终以ISO格式 (yyyy-MM-dd) 返回。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-900">
&lt;ui-date-picker v-model="date" /&gt;
&lt;ui-date-picker v-model="date" format="yyyy年MM月dd日" /&gt;</pre>
          </div>
        </div>
      </div>

      <!-- 其他特性 -->
      <div class="space-y-4">
        <div class="text-xl font-medium">
          其他特性
        </div>
        <div class="rounded bg-white p-4 shadow dark:bg-gray-800">
          <div class="space-y-4">
            <div>
              <div class="mb-1 text-sm">
                默认值
              </div>
              <ui-date-picker v-model="date3" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                禁用状态
              </div>
              <ui-date-picker v-model="date1" disabled />
            </div>

            <div>
              <div class="mb-1 text-sm">
                只读状态
              </div>
              <ui-date-picker v-model="date3" readonly />
            </div>

            <div>
              <div class="mb-1 text-sm">
                自定义占位符
              </div>
              <ui-date-picker v-model="date1" placeholder="请选择生日" />
            </div>

            <div>
              <div class="mb-1 text-sm">
                禁用清除按钮
              </div>
              <ui-date-picker v-model="date3" :clearable="false" />
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Date Picker 组件支持丰富的配置选项，包括默认值、禁用状态、只读状态、占位符自定义及清除按钮控制等。
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="text-sm font-medium">
              示例代码：
            </div>
            <pre class="mt-2 rounded bg-gray-100 p-3 text-sm dark:bg-gray-900">
&lt;ui-date-picker v-model="date" disabled /&gt;
&lt;ui-date-picker v-model="date" readonly /&gt;
&lt;ui-date-picker v-model="date" placeholder="请选择生日" /&gt;
&lt;ui-date-picker v-model="date" :clearable="false" /&gt;</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- API 说明 -->
    <div class="mt-8 space-y-4">
      <div class="text-xl font-medium">
        API
      </div>
      <div class="rounded bg-white p-4 shadow dark:bg-gray-800">
        <h3 class="mb-3 text-lg font-medium">
          属性
        </h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left">
                参数
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                类型
              </th>
              <th class="px-4 py-2 text-left">
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                modelValue / v-model
              </td>
              <td class="px-4 py-2">
                绑定值
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                format
              </td>
              <td class="px-4 py-2">
                日期格式
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                yyyy-MM-dd
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                placeholder
              </td>
              <td class="px-4 py-2">
                输入框占位文本
              </td>
              <td class="px-4 py-2">
                string
              </td>
              <td class="px-4 py-2">
                请选择日期
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                disabled
              </td>
              <td class="px-4 py-2">
                是否禁用
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                readonly
              </td>
              <td class="px-4 py-2">
                是否只读
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                false
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                clearable
              </td>
              <td class="px-4 py-2">
                是否显示清除按钮
              </td>
              <td class="px-4 py-2">
                boolean
              </td>
              <td class="px-4 py-2">
                true
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2">
                size
              </td>
              <td class="px-4 py-2">
                尺寸
              </td>
              <td class="px-4 py-2">
                small / default / large
              </td>
              <td class="px-4 py-2">
                default
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mb-3 mt-6 text-lg font-medium">
          事件
        </h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left">
                事件名
              </th>
              <th class="px-4 py-2 text-left">
                说明
              </th>
              <th class="px-4 py-2 text-left">
                回调参数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2">
                update:modelValue
              </td>
              <td class="px-4 py-2">
                当选择日期时触发
              </td>
              <td class="px-4 py-2">
                (value: string)
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2">
                change
              </td>
              <td class="px-4 py-2">
                当选择日期时触发
              </td>
              <td class="px-4 py-2">
                (value: string)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
