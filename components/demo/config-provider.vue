<script setup lang="ts" name="DemoConfigProvider">
/**
 * ConfigProvider组件演示
 * 创建日期: 2025-04-30
 * 作者: aiftt
 * 更新日期: 2025-04-30 - 初始版本
 */
import { computed, reactive, ref } from 'vue'

// 主题选项
const themeOptions = ['light', 'dark', 'auto']
const selectedTheme = ref('light')

// 尺寸选项
const sizeOptions = ['small', 'default', 'large']
const selectedSize = ref('default')

// 自定义主题配置
const customTheme = reactive({
  'color-primary': '#7c3aed', // 紫色
  'color-success': '#059669',
  'color-warning': '#f59e0b',
  'color-danger': '#ef4444',
  'color-info': '#3b82f6',
})

// 切换自定义主题
const useCustomTheme = ref(false)
const themeConfig = computed(() => useCustomTheme.value ? customTheme : {})

// 处理主题切换
function handleThemeChange(theme) {
  selectedTheme.value = theme
}
</script>

<template>
  <div class="demo-config-provider">
    <h2 class="mb-4 text-xl font-bold">
      ConfigProvider 全局配置
    </h2>
    <p class="mb-4">
      用于全局配置组件的主题、尺寸等属性，影响其所有子组件
    </p>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      基础用法
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <p class="mb-4">
        下面的组件将继承 ConfigProvider 提供的主题和尺寸配置:
      </p>

      <ui-config-provider :theme="selectedTheme" :size="selectedSize">
        <div class="flex flex-wrap gap-4">
          <ui-button>默认按钮</ui-button>
          <ui-button type="primary">
            主要按钮
          </ui-button>
          <ui-button type="success">
            成功按钮
          </ui-button>
          <ui-button type="warning">
            警告按钮
          </ui-button>
          <ui-button type="danger">
            危险按钮
          </ui-button>
        </div>
      </ui-config-provider>

      <div class="grid grid-cols-1 mt-6 gap-4 md:grid-cols-2">
        <div>
          <h4 class="mb-2 font-medium">
            主题选择:
          </h4>
          <div class="flex gap-2">
            <ui-button
              v-for="theme in themeOptions"
              :key="theme"
              :type="selectedTheme === theme ? 'primary' : 'default'"
              @click="handleThemeChange(theme)"
            >
              {{ theme === 'light' ? '亮色' : theme === 'dark' ? '暗色' : '自动' }}
            </ui-button>
          </div>
        </div>

        <div>
          <h4 class="mb-2 font-medium">
            尺寸选择:
          </h4>
          <div class="flex gap-2">
            <ui-button
              v-for="size in sizeOptions"
              :key="size"
              :type="selectedSize === size ? 'primary' : 'default'"
              @click="selectedSize = size"
            >
              {{ size === 'small' ? '小型' : size === 'large' ? '大型' : '默认' }}
            </ui-button>
          </div>
        </div>
      </div>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      自定义主题
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <div class="mb-4 flex items-center">
        <ui-checkbox v-model="useCustomTheme">
          使用自定义主题
        </ui-checkbox>
      </div>

      <ui-config-provider :theme="selectedTheme" :theme-config="themeConfig">
        <div class="flex flex-wrap gap-4">
          <ui-button>默认按钮</ui-button>
          <ui-button type="primary">
            自定义主色
          </ui-button>
          <ui-button type="success">
            成功按钮
          </ui-button>
          <ui-button type="warning">
            警告按钮
          </ui-button>
          <ui-button type="danger">
            危险按钮
          </ui-button>
        </div>

        <div class="mt-6 border rounded p-4">
          <p class="mb-2">
            自定义主题配置代码示例:
          </p>
          <ui-code language="typescript">
            const customTheme = {
            'color-primary': '#7c3aed', // 紫色
            'color-success': '#059669',
            'color-warning': '#f59e0b',
            'color-danger': '#ef4444',
            'color-info': '#3b82f6',
            }

            <ui-config-provider :theme-config="customTheme">
              <!-- 子组件将使用自定义主题 -->
            </ui-config-provider>
          </ui-code>
        </div>
      </ui-config-provider>
    </div>

    <h3 class="mb-2 mt-6 text-lg font-semibold">
      组件层级嵌套
    </h3>
    <div class="demo-block mb-6 border rounded p-4">
      <p class="mb-4">
        ConfigProvider 支持嵌套使用，内层配置会覆盖外层配置:
      </p>

      <ui-config-provider theme="light" size="default">
        <div class="mb-4 border rounded p-4">
          <h4 class="mb-2">
            外层配置: 亮色主题 + 默认尺寸
          </h4>
          <div class="flex gap-2">
            <ui-button type="primary">
              主要按钮
            </ui-button>
            <ui-button type="success">
              成功按钮
            </ui-button>
          </div>

          <div class="mt-4 border rounded bg-gray-50 p-4 dark:bg-gray-800">
            <ui-config-provider theme="dark" size="small">
              <h4 class="mb-2">
                内层配置: 暗色主题 + 小尺寸
              </h4>
              <div class="flex gap-2">
                <ui-button type="primary">
                  主要按钮
                </ui-button>
                <ui-button type="success">
                  成功按钮
                </ui-button>
              </div>
            </ui-config-provider>
          </div>
        </div>
      </ui-config-provider>

      <ui-code language="html">
        <!-- 外层配置 -->
        <ui-config-provider theme="light" size="default">
          <div>
            <!-- 使用外层配置的组件 -->
            <ui-button type="primary">
              主要按钮
            </ui-button>

            <!-- 内层配置 -->
            <ui-config-provider theme="dark" size="small">
              <!-- 使用内层配置的组件 -->
              <ui-button type="primary">
                主要按钮
              </ui-button>
            </ui-config-provider>
          </div>
        </ui-config-provider>
      </ui-code>
    </div>

    <h3 class="mb-4 mt-8 text-lg font-semibold">
      API参考
    </h3>

    <h4 class="mb-2 mt-4 font-semibold">
      Props
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border p-2 text-left">
            属性
          </th>
          <th class="border p-2 text-left">
            说明
          </th>
          <th class="border p-2 text-left">
            类型
          </th>
          <th class="border p-2 text-left">
            默认值
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">
            theme
          </td>
          <td class="border p-2">
            主题模式
          </td>
          <td class="border p-2">
            light | dark | auto
          </td>
          <td class="border p-2">
            light
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            size
          </td>
          <td class="border p-2">
            组件尺寸
          </td>
          <td class="border p-2">
            small | default | large
          </td>
          <td class="border p-2">
            default
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            themeConfig
          </td>
          <td class="border p-2">
            主题配置对象
          </td>
          <td class="border p-2">
            Record&lt;string, string&gt;
          </td>
          <td class="border p-2">
            {}
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            followSystemTheme
          </td>
          <td class="border p-2">
            是否跟随系统主题
          </td>
          <td class="border p-2">
            boolean
          </td>
          <td class="border p-2">
            true
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            namespace
          </td>
          <td class="border p-2">
            组件库命名空间前缀
          </td>
          <td class="border p-2">
            string
          </td>
          <td class="border p-2">
            ui
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            zIndex
          </td>
          <td class="border p-2">
            z-index 基础值
          </td>
          <td class="border p-2">
            number
          </td>
          <td class="border p-2">
            2000
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-4 font-semibold">
      提供的上下文
    </h4>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border p-2 text-left">
            名称
          </th>
          <th class="border p-2 text-left">
            说明
          </th>
          <th class="border p-2 text-left">
            类型
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">
            config
          </td>
          <td class="border p-2">
            全局配置对象
          </td>
          <td class="border p-2">
            Object
          </td>
        </tr>
        <tr>
          <td class="border p-2">
            setTheme
          </td>
          <td class="border p-2">
            设置主题的方法
          </td>
          <td class="border p-2">
            (theme: 'light' | 'dark' | 'auto') => void
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mb-2 mt-4 font-semibold">
      在组件中使用 ConfigProvider 提供的配置
    </h4>
    <div class="border rounded p-4">
      <ui-code language="typescript">
        // 在子组件中使用配置
        import { inject } from 'vue'

        // 获取配置
        const config = inject('config', {
        theme: 'light',
        size: 'default',
        zIndex: 2000
        })

        // 获取设置主题的方法
        const setTheme = inject('setTheme', (theme) => {})

        // 使用配置
        const componentSize = computed(() => config.size)
      </ui-code>
    </div>
  </div>
</template>

<style scoped>
.demo-config-provider {
  width: 100%;
}

.demo-block {
  background-color: var(--ui-bg-color, white);
  border-color: var(--ui-border-color, #e5e7eb);
}

:root.dark .demo-block {
  background-color: var(--ui-bg-color, #1f2937);
  border-color: var(--ui-border-color, #374151);
}
</style>
