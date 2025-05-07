<script setup lang="ts" name="DemoPopconfirm">
/**
 * Popconfirm 组件演示
 * 创建日期: 2025-05-07
 * 作者: aiftt
 */

// 确认/取消处理函数
function handleConfirm() {
  // 确认操作处理
}

function handleCancel() {
  // 取消操作处理
}
</script>

<template>
  <div class="demo-section">
    <h2 class="demo-title">
      Popconfirm 气泡确认框
    </h2>
    <p class="mb-4">
      点击元素后弹出的气泡式确认框，用于需要用户确认操作的场景。
    </p>

    <div class="demo-card">
      <h3 class="mb-2 text-lg font-medium">
        基础用法
      </h3>
      <div class="mb-6 flex space-x-4">
        <ui-popconfirm
          title="确定要删除这条记录吗?"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <ui-button type="danger">
            删除
          </ui-button>
        </ui-popconfirm>
      </div>

      <h3 class="mb-2 text-lg font-medium">
        自定义按钮文本
      </h3>
      <div class="mb-6 flex space-x-4">
        <ui-popconfirm
          title="确定要执行此操作吗?"
          confirm-text="执行"
          cancel-text="返回"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <ui-button>自定义按钮文本</ui-button>
        </ui-popconfirm>
      </div>

      <h3 class="mb-2 text-lg font-medium">
        不同位置
      </h3>
      <div class="flex flex-wrap gap-4">
        <ui-popconfirm
          title="确定要执行操作吗?"
          placement="top"
          @confirm="handleConfirm"
        >
          <ui-button>上方</ui-button>
        </ui-popconfirm>

        <ui-popconfirm
          title="确定要执行操作吗?"
          placement="bottom"
          @confirm="handleConfirm"
        >
          <ui-button>下方</ui-button>
        </ui-popconfirm>

        <ui-popconfirm
          title="确定要执行操作吗?"
          placement="left"
          @confirm="handleConfirm"
        >
          <ui-button>左侧</ui-button>
        </ui-popconfirm>

        <ui-popconfirm
          title="确定要执行操作吗?"
          placement="right"
          @confirm="handleConfirm"
        >
          <ui-button>右侧</ui-button>
        </ui-popconfirm>
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
