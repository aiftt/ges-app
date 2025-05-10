<script setup lang="ts" name="DemoNotification">
/**
 * 通知组件演示
 * 创建日期: 2025-05-14
 * 作者: aiftt
 * 更新日期: 2025-05-14 - 初始实现
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
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-semibold">
      通知（Notification）
    </h2>
    <p class="mb-4 text-gray-600 dark:text-gray-400">
      通知组件用于显示全局的通知信息，支持不同类型和位置
    </p>

    <div class="mb-8 border rounded-lg bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-lg font-medium">
        基础用法
      </h3>
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

      <h3 class="mb-4 mt-6 text-lg font-medium">
        不同位置
      </h3>
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

      <h3 class="mb-4 mt-6 text-lg font-medium">
        高级用法
      </h3>
      <div class="flex flex-wrap gap-2">
        <ui-button @click="showCustomNotification">
          自定义图标
        </ui-button>
        <ui-button @click="showPersistentNotification">
          持久通知(5秒后自动关闭)
        </ui-button>
      </div>
    </div>

    <div class="my-8">
      <h3 class="mb-4 text-xl font-medium">
        代码示例
      </h3>
      <ui-code language="typescript">
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
        notification.close(id)
      </ui-code>
    </div>
  </div>
</template>
