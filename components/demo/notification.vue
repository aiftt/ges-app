<script setup lang="ts" name="DemoNotification">
/**
 * 通知组件演示
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
 * 更新日期: 2024-12-15 - 使用ui-demo组件重构演示页面
 */

import { useNotification } from '~/composables/useNotification'

// 获取通知实例
const notification = useNotification()

// 通知方法
function showBasicNotification() {
  notification.info({
    title: '基本通知',
    content: '这是一条基本的通知信息',
  })
}

function showSuccessNotification() {
  notification.success({
    title: '成功通知',
    content: '操作已成功完成',
  })
}

function showWarningNotification() {
  notification.warning({
    title: '警告通知',
    content: '请注意这个操作可能有风险',
  })
}

function showErrorNotification() {
  notification.error({
    title: '错误通知',
    content: '操作执行失败，请稍后重试',
  })
}

function showPositionNotification(position: string) {
  notification.info({
    title: `${position}位置通知`,
    content: `这是一条显示在${position}的通知`,
    position: position as any,
  })
}

function showCustomNotification() {
  notification.info({
    title: '自定义通知',
    content: '这是一条带有自定义配置的通知',
    duration: 10000,
    icon: 'carbon:thumbs-up',
  })
}

function showPersistentNotification() {
  const id = notification.warning({
    title: '持久通知',
    content: '这条通知不会自动关闭，需要手动关闭',
    duration: 0,
  })

  setTimeout(() => {
    notification.close(id)
  }, 5000)
}

// 示例代码字符串
const basicCode = `<template>
  <div class="flex flex-wrap gap-2">
    <ui-button @click="showBasicNotification">基本通知</ui-button>
    <ui-button @click="showSuccessNotification">成功通知</ui-button>
    <ui-button @click="showWarningNotification">警告通知</ui-button>
    <ui-button @click="showErrorNotification">错误通知</ui-button>
  </div>
</template>

<script setup>
import { useNotification } from '~/composables/useNotification'

// 获取通知实例
const notification = useNotification()

function showBasicNotification() {
  notification.info({
    title: '基本通知',
    content: '这是一条基本的通知信息',
  })
}

function showSuccessNotification() {
  notification.success({
    title: '成功通知',
    content: '操作已成功完成',
  })
}

function showWarningNotification() {
  notification.warning({
    title: '警告通知',
    content: '请注意这个操作可能有风险',
  })
}

function showErrorNotification() {
  notification.error({
    title: '错误通知',
    content: '操作执行失败，请稍后重试',
  })
}
<\/script>`

const positionCode = `<template>
  <div class="flex flex-wrap gap-2">
    <ui-button @click="showPositionNotification('top-right')">右上角</ui-button>
    <ui-button @click="showPositionNotification('top-left')">左上角</ui-button>
    <ui-button @click="showPositionNotification('bottom-right')">右下角</ui-button>
    <ui-button @click="showPositionNotification('bottom-left')">左下角</ui-button>
  </div>
</template>

<script setup>
import { useNotification } from '~/composables/useNotification'

const notification = useNotification()

function showPositionNotification(position) {
  notification.info({
    title: \`\${position}位置通知\`,
    content: \`这是一条显示在\${position}的通知\`,
    position: position,
  })
}
<\/script>`

const advancedCode = `<template>
  <div class="flex flex-wrap gap-2">
    <ui-button @click="showCustomNotification">自定义图标</ui-button>
    <ui-button @click="showPersistentNotification">持久通知(5秒后自动关闭)</ui-button>
  </div>
</template>

<script setup>
import { useNotification } from '~/composables/useNotification'

const notification = useNotification()

function showCustomNotification() {
  notification.info({
    title: '自定义通知',
    content: '这是一条带有自定义配置的通知',
    duration: 10000,
    icon: 'carbon:thumbs-up',
  })
}

function showPersistentNotification() {
  const id = notification.warning({
    title: '持久通知',
    content: '这条通知不会自动关闭，需要手动关闭',
    duration: 0,
  })

  // 5秒后自动关闭
  setTimeout(() => {
    notification.close(id)
  }, 5000)
}
<\/script>`

const apiCode = `import { useNotification } from '~/composables/useNotification'

const notification = useNotification()

// 基本通知
notification.info({
  title: '通知标题',
  content: '这是一条通知信息'
})

// 成功通知
notification.success({
  title: '操作成功',
  content: '您的操作已完成'
})

// 自定义配置
notification.info({
  title: '自定义通知',
  content: '这是一条带有自定义配置的通知',
  duration: 10000,
  position: 'bottom-right',
  icon: 'carbon:thumbs-up'
})

// 持久通知
const id = notification.warning({
  title: '持久通知',
  content: '这条通知不会自动关闭',
  duration: 0
})

// 手动关闭通知
notification.close(id)`
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-6 text-2xl font-bold dark:text-white">
      Notification 通知
    </h2>
    <p class="mb-6 text-gray-500 dark:text-gray-400">
      通知组件用于显示全局的通知信息，支持不同类型和位置，适用于系统通知、操作反馈等场景。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="通知组件支持四种类型：信息、成功、警告和错误，用于不同场景的反馈。"
      :code="basicCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showBasicNotification">
          基本通知
        </ui-button>
        <ui-button @click="showSuccessNotification">
          成功通知
        </ui-button>
        <ui-button @click="showWarningNotification">
          警告通知
        </ui-button>
        <ui-button @click="showErrorNotification">
          错误通知
        </ui-button>
      </div>
    </ui-demo>

    <!-- 不同位置 -->
    <ui-demo
      title="不同位置"
      description="通知可以显示在页面的四个角落，默认显示在右上角。"
      :code="positionCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showPositionNotification('top-right')">
          右上角
        </ui-button>
        <ui-button @click="showPositionNotification('top-left')">
          左上角
        </ui-button>
        <ui-button @click="showPositionNotification('bottom-right')">
          右下角
        </ui-button>
        <ui-button @click="showPositionNotification('bottom-left')">
          左下角
        </ui-button>
      </div>
    </ui-demo>

    <!-- 高级用法 -->
    <ui-demo
      title="高级用法"
      description="通知支持自定义图标、持续时间等高级配置，提供更灵活的使用方式。"
      :code="advancedCode"
    >
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showCustomNotification">
          自定义图标
        </ui-button>
        <ui-button @click="showPersistentNotification">
          持久通知(5秒后自动关闭)
        </ui-button>
      </div>
    </ui-demo>

    <!-- API参考 -->
    <ui-demo
      title="API参考"
      description="通知组件使用方法和配置选项。"
      :code="apiCode"
      language="typescript"
    >
      <h4 class="mb-2 font-medium dark:text-white">
        useNotification() 方法
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                方法名
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                说明
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                参数
              </th>
              <th class="px-4 py-2 text-left dark:text-white">
                返回值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                info
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示信息通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                NotificationOptions
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string (通知ID)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                success
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示成功通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                NotificationOptions
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string (通知ID)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                warning
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示警告通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                NotificationOptions
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string (通知ID)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                error
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示错误通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                NotificationOptions
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string (通知ID)
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                close
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭指定ID的通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string (通知ID)
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                void
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                closeAll
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭所有通知
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 class="mb-2 mt-4 font-medium dark:text-white">
        NotificationOptions 配置选项
      </h4>
      <div class="overflow-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b dark:border-gray-700">
              <th class="px-4 py-2 text-left dark:text-white">
                属性名
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
                title
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                通知标题
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
                content
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                通知内容
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
                duration
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示时间，单位毫秒，设为0则不自动关闭
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                number
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                4500
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                position
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                显示位置
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                'top-right'
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                icon
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                自定义图标
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                string
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                根据类型自动选择
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                closable
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                是否显示关闭按钮
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
                onClose
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                关闭时的回调函数
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                () => void
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="px-4 py-2 dark:text-gray-300">
                onClick
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                点击通知时的回调函数
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                () => void
              </td>
              <td class="px-4 py-2 dark:text-gray-300">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-demo>
  </div>
</template>
