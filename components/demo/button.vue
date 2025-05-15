<script setup lang="ts" name="DemoButton">
/**
 * 按钮组件演示
 * 创建日期: 2023-12-03
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 控制加载状态
const loadingStates = ref({
  primary: false,
  success: false,
})

// 切换加载状态
function toggleLoading(type: 'primary' | 'success') {
  loadingStates.value[type] = true
  setTimeout(() => {
    loadingStates.value[type] = false
  }, 2000)
}

// 示例代码片段
const typesButtonCode = `<ui-button>默认按钮</ui-button>
<ui-button type="primary">主要按钮</ui-button>
<ui-button type="success">成功按钮</ui-button>
<ui-button type="warning">警告按钮</ui-button>
<ui-button type="danger">危险按钮</ui-button>
<ui-button type="info">信息按钮</ui-button>`

const sizesButtonCode = `<ui-button size="small">小按钮</ui-button>
<ui-button>默认大小</ui-button>
<ui-button size="large">大按钮</ui-button>`

const disabledButtonCode = `<ui-button disabled>禁用按钮</ui-button>
<ui-button type="primary" disabled>禁用主要按钮</ui-button>
<ui-button type="success" disabled>禁用成功按钮</ui-button>
<ui-button type="danger" disabled>禁用危险按钮</ui-button>`

const iconButtonCode = `<ui-button icon="carbon:home">首页</ui-button>
<ui-button icon="carbon:add" type="primary">添加</ui-button>
<ui-button icon="carbon:notification" type="warning">通知</ui-button>
<ui-button icon="carbon:close" type="danger">删除</ui-button>
<ui-button icon="carbon:settings" circle />
<ui-button icon="carbon:add" type="primary" circle />
<ui-button icon="carbon:trash-can" type="danger" circle />`

const loadingButtonCode = `<template>
  <ui-button
    type="primary"
    :loading="loadingStates.primary"
    @click="toggleLoading('primary')"
  >
    点击加载
  </ui-button>
  <ui-button
    type="success"
    :loading="loadingStates.success"
    @click="toggleLoading('success')"
  >
    点击加载
  </ui-button>
  <ui-button type="info" loading>加载中...</ui-button>
</template>

<script setup>
const loadingStates = ref({
  primary: false,
  success: false,
})

function toggleLoading(type) {
  loadingStates.value[type] = true
  setTimeout(() => {
    loadingStates.value[type] = false
  }, 2000)
}
<\/script>`
</script>

<template>
  <div class="demo-ui-demo">
    <h2 class="mb-6 text-xl font-bold">
      Button 按钮
    </h2>
    <p class="mb-4 text-gray-500 dark:text-gray-400">
      按钮组件用于触发操作或事件，如提交表单、打开对话框、取消操作或执行删除操作。
    </p>

    <!-- 按钮类型 -->
    <ui-demo
      title="按钮类型"
      description="按钮有六种类型：默认按钮、主要按钮、成功按钮、警告按钮、危险按钮和信息按钮。"
      :code="typesButtonCode"
    >
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
        <ui-button type="info">
          信息按钮
        </ui-button>
      </div>
    </ui-demo>

    <!-- 按钮尺寸 -->
    <ui-demo
      title="按钮尺寸"
      description="按钮有三种尺寸：小型、默认和大型。"
      :code="sizesButtonCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-button size="small">
          小按钮
        </ui-button>
        <ui-button>默认大小</ui-button>
        <ui-button size="large">
          大按钮
        </ui-button>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="按钮在禁用状态下不可点击。"
      :code="disabledButtonCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button disabled>
          禁用按钮
        </ui-button>
        <ui-button type="primary" disabled>
          禁用主要按钮
        </ui-button>
        <ui-button type="success" disabled>
          禁用成功按钮
        </ui-button>
        <ui-button type="danger" disabled>
          禁用危险按钮
        </ui-button>
      </div>
    </ui-demo>

    <!-- 图标按钮 -->
    <ui-demo
      title="图标按钮"
      description="带图标的按钮，可以在文字前添加图标，也可以仅使用图标。"
      :code="iconButtonCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <ui-button icon="carbon:home">
          首页
        </ui-button>
        <ui-button icon="carbon:add" type="primary">
          添加
        </ui-button>
        <ui-button icon="carbon:notification" type="warning">
          通知
        </ui-button>
        <ui-button icon="carbon:close" type="danger">
          删除
        </ui-button>
        <ui-button icon="carbon:settings" circle />
        <ui-button icon="carbon:add" type="primary" circle />
        <ui-button icon="carbon:trash-can" type="danger" circle />
      </div>
    </ui-demo>

    <!-- 加载状态 -->
    <ui-demo
      title="加载状态"
      description="点击按钮后进入加载状态，加载完成后恢复正常状态。"
      :code="loadingButtonCode"
    >
      <div class="flex flex-wrap gap-4">
        <ui-button
          type="primary"
          :loading="loadingStates.primary"
          @click="toggleLoading('primary')"
        >
          点击加载
        </ui-button>
        <ui-button
          type="success"
          :loading="loadingStates.success"
          @click="toggleLoading('success')"
        >
          点击加载
        </ui-button>
        <ui-button type="info" loading>
          加载中...
        </ui-button>
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-ui-demo {
  padding: 1rem;
}
</style>
