<script setup lang="ts" name="DemoSteps">
/**
 * 步骤条组件演示
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { ref } from 'vue'

// 基础步骤条
const activeStep = ref(1)

// 步骤点击功能
function handleStepClick(index: number) {
  activeStep.value = index
}

// 带描述的步骤条
const descActiveStep = ref(0)

// 垂直步骤条
const verticalActive = ref(1)

// 简洁步骤条
const simpleActive = ref(1)

// 可点击步骤条
const clickableActive = ref(0)

// 自定义图标步骤条
const iconActive = ref(0)

// 自定义样式
const customActive = ref(0)
const activeColor = ref('#3b82f6')
const lineColor = ref('#e5e7eb')

// 操作按钮
function next() {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}

function prev() {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 表单示例
const formActive = ref(0)
const formData = ref({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
})

// 错误消息提示
const errorTips = ref('')

// 表单验证示例
function validateForm() {
  // 简单验证
  if (formActive.value === 0) {
    if (!formData.value.name || !formData.value.email) {
      errorTips.value = '请填写完整的基本信息'
      return false
    }
    formActive.value = 1
  }
  else if (formActive.value === 1) {
    if (!formData.value.password) {
      errorTips.value = '请设置密码'
      return false
    }
    formActive.value = 2
  }
  else if (formActive.value === 2) {
    if (!formData.value.address || !formData.value.phone) {
      errorTips.value = '请填写完整的联系信息'
      return false
    }
    formActive.value = 3
  }
  errorTips.value = ''
  return true
}

function prevStep() {
  if (formActive.value > 0) {
    formActive.value--
  }
}

function nextStep() {
  if (validateForm() && formActive.value < 3) {
    formActive.value++
  }
}

// 代码示例
const basicCode = `<ui-steps :active="activeStep">
  <ui-steps-step title="步骤1" />
  <ui-steps-step title="步骤2" />
  <ui-steps-step title="步骤3" />
  <ui-steps-step title="步骤4" />
</ui-steps>
<div class="mt-4 flex gap-2">
  <ui-button :disabled="activeStep === 0" @click="prev">
    上一步
  </ui-button>
  <ui-button type="primary" :disabled="activeStep === 3" @click="next">
    下一步
  </ui-button>
</div>

<script setup>
const activeStep = ref(1)

function next() {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}

function prev() {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}
<\/script>`

const descriptionCode = `<ui-steps :active="descActiveStep">
  <ui-steps-step title="登录账号" description="使用您的账号登录系统" />
  <ui-steps-step title="验证身份" description="通过短信验证码验证身份" />
  <ui-steps-step title="设置密码" description="设置新的安全密码" />
  <ui-steps-step title="完成" description="所有设置已完成" />
</ui-steps>

<script setup>
const descActiveStep = ref(0)
<\/script>`

const verticalCode = `<ui-steps :active="verticalActive" direction="vertical">
  <ui-steps-step title="步骤1" description="这是步骤1的描述内容" />
  <ui-steps-step title="步骤2" description="这是步骤2的描述内容" />
  <ui-steps-step title="步骤3" description="这是步骤3的描述内容" />
</ui-steps>

<script setup>
const verticalActive = ref(1)
<\/script>`

const simpleCode = `<ui-steps :active="simpleActive" simple>
  <ui-steps-step title="填写信息" />
  <ui-steps-step title="确认信息" />
  <ui-steps-step title="完成" />
</ui-steps>

<script setup>
const simpleActive = ref(1)
<\/script>`

const clickableCode = `<ui-steps :active="clickableActive" @click="handleStepClick">
  <ui-steps-step title="步骤1" clickable />
  <ui-steps-step title="步骤2" clickable />
  <ui-steps-step title="步骤3" clickable />
  <ui-steps-step title="步骤4" disabled />
</ui-steps>

<script setup>
const clickableActive = ref(0)

function handleStepClick(index) {
  clickableActive.value = index
}
<\/script>`

const iconCode = `<ui-steps :active="iconActive">
  <ui-steps-step title="登录" icon="carbon:user" />
  <ui-steps-step title="验证" icon="carbon:shield-check" />
  <ui-steps-step title="支付" icon="carbon:credit-card" />
  <ui-steps-step title="完成" icon="carbon:check-circle" />
</ui-steps>

<script setup>
const iconActive = ref(0)
<\/script>`

const customStyleCode = `<ui-steps
  :active="customActive"
  :active-color="activeColor"
  :line-color="lineColor"
>
  <ui-steps-step title="步骤1" />
  <ui-steps-step title="步骤2" />
  <ui-steps-step title="步骤3" />
</ui-steps>

<div class="mt-4 flex items-center gap-4">
  <div>
    <div class="mb-1 text-sm">选择主色:</div>
    <div class="flex gap-2">
      <button
        v-for="color in ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']"
        :key="color"
        class="h-6 w-6 cursor-pointer border rounded-full"
        :style="{ backgroundColor: color }"
        @click="activeColor = color"
      />
    </div>
  </div>
  <div>
    <div class="mb-1 text-sm">选择线条色:</div>
    <div class="flex gap-2">
      <button
        v-for="color in ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151']"
        :key="color"
        class="h-6 w-6 cursor-pointer border rounded-full"
        :style="{ backgroundColor: color }"
        @click="lineColor = color"
      />
    </div>
  </div>
</div>

<script setup>
const customActive = ref(0)
const activeColor = ref('#3b82f6')
const lineColor = ref('#e5e7eb')
<\/script>`

const navigationCode = `<ui-steps :active="1" type="navigation">
  <ui-steps-step title="已完成" />
  <ui-steps-step title="进行中" />
  <ui-steps-step title="等待中" />
  <ui-steps-step title="等待中" />
</ui-steps>`

const sizeCode = `<!-- 小尺寸 -->
<ui-steps :active="1" size="small">
  <ui-steps-step title="步骤1" />
  <ui-steps-step title="步骤2" />
  <ui-steps-step title="步骤3" />
</ui-steps>

<!-- 中尺寸 (默认) -->
<ui-steps :active="1">
  <ui-steps-step title="步骤1" />
  <ui-steps-step title="步骤2" />
  <ui-steps-step title="步骤3" />
</ui-steps>

<!-- 大尺寸 -->
<ui-steps :active="1" size="large">
  <ui-steps-step title="步骤1" />
  <ui-steps-step title="步骤2" />
  <ui-steps-step title="步骤3" />
</ui-steps>`

const formStepsCode = `<ui-steps :active="formActive">
  <ui-steps-step title="基本信息" />
  <ui-steps-step title="账户安全" />
  <ui-steps-step title="联系方式" />
  <ui-steps-step title="完成" />
</ui-steps>

<div class="mt-6 border rounded-md p-6 dark:border-gray-700">
  <!-- 错误提示 -->
  <ui-alert v-if="errorTips" type="error" class="mb-4" closable @close="errorTips = ''">
    {{ errorTips }}
  </ui-alert>

  <!-- 步骤1：基本信息 -->
  <div v-if="formActive === 0">
    <h3 class="mb-4 text-lg font-medium">基本信息</h3>
    <div class="mb-4">
      <label class="mb-2 block">姓名</label>
      <ui-input v-model="formData.name" placeholder="请输入姓名" />
    </div>
    <div class="mb-4">
      <label class="mb-2 block">电子邮箱</label>
      <ui-input v-model="formData.email" placeholder="请输入电子邮箱" />
    </div>
  </div>

  <!-- 步骤2：账户安全 -->
  <div v-if="formActive === 1">
    <h3 class="mb-4 text-lg font-medium">账户安全</h3>
    <div class="mb-4">
      <label class="mb-2 block">设置密码</label>
      <ui-input v-model="formData.password" type="password" placeholder="请设置密码" />
    </div>
  </div>

  <!-- 步骤3：联系方式 -->
  <div v-if="formActive === 2">
    <h3 class="mb-4 text-lg font-medium">联系方式</h3>
    <div class="mb-4">
      <label class="mb-2 block">地址</label>
      <ui-input v-model="formData.address" placeholder="请输入地址" />
    </div>
    <div class="mb-4">
      <label class="mb-2 block">电话</label>
      <ui-input v-model="formData.phone" placeholder="请输入电话号码" />
    </div>
  </div>

  <!-- 步骤4：完成 -->
  <div v-if="formActive === 3">
    <h3 class="mb-4 text-lg font-medium">完成</h3>
    <div class="py-8 text-center">
      <div class="text-success mb-4">
        <ui-icon icon="carbon:check-circle" class="text-4xl text-green-500" />
      </div>
      <p class="mb-2 text-lg font-medium">信息提交成功！</p>
      <p class="text-gray-500">您的账户已创建完成，可以开始使用系统。</p>
    </div>
  </div>

  <!-- 导航按钮 -->
  <div class="mt-6 flex justify-between">
    <ui-button :disabled="formActive === 0" @click="prevStep">上一步</ui-button>
    <ui-button v-if="formActive < 3" type="primary" @click="nextStep">下一步</ui-button>
    <ui-button v-else type="success" @click="formActive = 0">完成</ui-button>
  </div>
</div>

<script setup>
const formActive = ref(0)
const formData = ref({
  name: '',
  email: '',
  password: '',
  address: '',
  phone: '',
})
const errorTips = ref('')

function validateForm() {
  // 简单验证
  if (formActive.value === 0) {
    if (!formData.value.name || !formData.value.email) {
      errorTips.value = '请填写完整的基本信息'
      return false
    }
    formActive.value = 1
  }
  else if (formActive.value === 1) {
    if (!formData.value.password) {
      errorTips.value = '请设置密码'
      return false
    }
    formActive.value = 2
  }
  else if (formActive.value === 2) {
    if (!formData.value.address || !formData.value.phone) {
      errorTips.value = '请填写完整的联系信息'
      return false
    }
    formActive.value = 3
  }
  errorTips.value = ''
  return true
}

function prevStep() {
  if (formActive.value > 0) {
    formActive.value--
  }
}

function nextStep() {
  if (validateForm() && formActive.value < 3) {
    formActive.value++
  }
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      Steps 步骤条
    </h1>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      步骤条组件用于引导用户按照流程完成任务，可以分步展示操作流程，或表示当前任务的处理进度。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的步骤条组合控制按钮，展示操作流程的各个阶段。"
      :code="basicCode"
    >
      <ui-steps :active="activeStep">
        <ui-steps-step title="步骤1" />
        <ui-steps-step title="步骤2" />
        <ui-steps-step title="步骤3" />
        <ui-steps-step title="步骤4" />
      </ui-steps>
      <div class="mt-4 flex gap-2">
        <ui-button :disabled="activeStep === 0" @click="prev">
          上一步
        </ui-button>
        <ui-button type="primary" :disabled="activeStep === 3" @click="next">
          下一步
        </ui-button>
      </div>
    </ui-demo>

    <!-- 带描述的步骤条 -->
    <ui-demo
      title="带描述的步骤条"
      description="为每个步骤提供详细的描述信息，增强用户理解。"
      :code="descriptionCode"
    >
      <ui-steps :active="descActiveStep">
        <ui-steps-step title="登录账号" description="使用您的账号登录系统" />
        <ui-steps-step title="验证身份" description="通过短信验证码验证身份" />
        <ui-steps-step title="设置密码" description="设置新的安全密码" />
        <ui-steps-step title="完成" description="所有设置已完成" />
      </ui-steps>
    </ui-demo>

    <!-- 垂直步骤条 -->
    <ui-demo
      title="垂直步骤条"
      description="垂直方向的步骤条，适用于垂直空间充足的场景。"
      :code="verticalCode"
    >
      <ui-steps :active="verticalActive" direction="vertical">
        <ui-steps-step title="步骤1" description="这是步骤1的描述内容" />
        <ui-steps-step title="步骤2" description="这是步骤2的描述内容" />
        <ui-steps-step title="步骤3" description="这是步骤3的描述内容" />
      </ui-steps>
    </ui-demo>

    <!-- 简洁步骤条 -->
    <ui-demo
      title="简洁步骤条"
      description="使用简洁模式的步骤条，展示更为精简的视觉效果。"
      :code="simpleCode"
    >
      <ui-steps :active="simpleActive" simple>
        <ui-steps-step title="填写信息" />
        <ui-steps-step title="确认信息" />
        <ui-steps-step title="完成" />
      </ui-steps>
    </ui-demo>

    <!-- 可点击的步骤条 -->
    <ui-demo
      title="可点击的步骤条"
      description="设置步骤可点击，允许用户直接跳转到指定步骤。"
      :code="clickableCode"
    >
      <div>
        <ui-steps :active="clickableActive" @click="handleStepClick">
          <ui-steps-step title="步骤1" clickable />
          <ui-steps-step title="步骤2" clickable />
          <ui-steps-step title="步骤3" clickable />
          <ui-steps-step title="步骤4" disabled />
        </ui-steps>
        <p class="mt-2 text-sm text-gray-500">
          点击步骤可以直接导航（除了禁用的步骤4）
        </p>
      </div>
    </ui-demo>

    <!-- 自定义图标 -->
    <ui-demo
      title="自定义图标"
      description="为步骤设置自定义图标，使步骤内容更加直观。"
      :code="iconCode"
    >
      <ui-steps :active="iconActive">
        <ui-steps-step title="登录" icon="carbon:user" />
        <ui-steps-step title="验证" icon="carbon:shield-check" />
        <ui-steps-step title="支付" icon="carbon:credit-card" />
        <ui-steps-step title="完成" icon="carbon:check-circle" />
      </ui-steps>
    </ui-demo>

    <!-- 自定义样式 -->
    <ui-demo
      title="自定义样式"
      description="通过属性自定义步骤条的主题色和线条颜色。"
      :code="customStyleCode"
    >
      <div>
        <ui-steps
          :active="customActive"
          :active-color="activeColor"
          :line-color="lineColor"
        >
          <ui-steps-step title="步骤1" />
          <ui-steps-step title="步骤2" />
          <ui-steps-step title="步骤3" />
        </ui-steps>
        <div class="mt-4 flex items-center gap-4">
          <div>
            <div class="mb-1 text-sm">
              选择主色:
            </div>
            <div class="flex gap-2">
              <button
                v-for="color in ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']"
                :key="color"
                class="h-6 w-6 cursor-pointer border rounded-full"
                :style="{ backgroundColor: color }"
                @click="activeColor = color"
              />
            </div>
          </div>
          <div>
            <div class="mb-1 text-sm">
              选择线条色:
            </div>
            <div class="flex gap-2">
              <button
                v-for="color in ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151']"
                :key="color"
                class="h-6 w-6 cursor-pointer border rounded-full"
                :style="{ backgroundColor: color }"
                @click="lineColor = color"
              />
            </div>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- 导航类型 -->
    <ui-demo
      title="导航类型"
      description="导航式步骤条，更适合页面顶部的流程导航展示。"
      :code="navigationCode"
    >
      <ui-steps :active="1" type="navigation">
        <ui-steps-step title="已完成" />
        <ui-steps-step title="进行中" />
        <ui-steps-step title="等待中" />
        <ui-steps-step title="等待中" />
      </ui-steps>
    </ui-demo>

    <!-- 尺寸类型 -->
    <ui-demo
      title="尺寸类型"
      description="不同尺寸的步骤条，提供 small、default 和 large 三种尺寸。"
      :code="sizeCode"
    >
      <div class="space-y-6">
        <div>
          <div class="mb-2 font-medium">
            小尺寸
          </div>
          <ui-steps :active="1" size="small">
            <ui-steps-step title="步骤1" />
            <ui-steps-step title="步骤2" />
            <ui-steps-step title="步骤3" />
          </ui-steps>
        </div>

        <div>
          <div class="mb-2 font-medium">
            中尺寸 (默认)
          </div>
          <ui-steps :active="1">
            <ui-steps-step title="步骤1" />
            <ui-steps-step title="步骤2" />
            <ui-steps-step title="步骤3" />
          </ui-steps>
        </div>

        <div>
          <div class="mb-2 font-medium">
            大尺寸
          </div>
          <ui-steps :active="1" size="large">
            <ui-steps-step title="步骤1" />
            <ui-steps-step title="步骤2" />
            <ui-steps-step title="步骤3" />
          </ui-steps>
        </div>
      </div>
    </ui-demo>

    <!-- 实际应用案例 -->
    <ui-demo
      title="实际应用案例 - 分步表单"
      description="结合表单的实际应用案例，展示分步操作的完整流程。"
      :code="formStepsCode"
    >
      <div>
        <ui-steps :active="formActive">
          <ui-steps-step title="基本信息" />
          <ui-steps-step title="账户安全" />
          <ui-steps-step title="联系方式" />
          <ui-steps-step title="完成" />
        </ui-steps>

        <div class="mt-6 border rounded-md p-6 dark:border-gray-700">
          <!-- 错误提示 -->
          <ui-alert v-if="errorTips" type="error" class="mb-4" closable @close="errorTips = ''">
            {{ errorTips }}
          </ui-alert>

          <!-- 步骤1：基本信息 -->
          <div v-if="formActive === 0">
            <h3 class="mb-4 text-lg font-medium">
              基本信息
            </h3>
            <div class="mb-4">
              <label class="mb-2 block">姓名</label>
              <ui-input v-model="formData.name" placeholder="请输入姓名" />
            </div>
            <div class="mb-4">
              <label class="mb-2 block">电子邮箱</label>
              <ui-input v-model="formData.email" placeholder="请输入电子邮箱" />
            </div>
          </div>

          <!-- 步骤2：账户安全 -->
          <div v-if="formActive === 1">
            <h3 class="mb-4 text-lg font-medium">
              账户安全
            </h3>
            <div class="mb-4">
              <label class="mb-2 block">设置密码</label>
              <ui-input v-model="formData.password" type="password" placeholder="请设置密码" />
            </div>
          </div>

          <!-- 步骤3：联系方式 -->
          <div v-if="formActive === 2">
            <h3 class="mb-4 text-lg font-medium">
              联系方式
            </h3>
            <div class="mb-4">
              <label class="mb-2 block">地址</label>
              <ui-input v-model="formData.address" placeholder="请输入地址" />
            </div>
            <div class="mb-4">
              <label class="mb-2 block">电话</label>
              <ui-input v-model="formData.phone" placeholder="请输入电话号码" />
            </div>
          </div>

          <!-- 步骤4：完成 -->
          <div v-if="formActive === 3">
            <h3 class="mb-4 text-lg font-medium">
              完成
            </h3>
            <div class="py-8 text-center">
              <div class="text-success mb-4">
                <ui-icon icon="carbon:check-circle" class="text-4xl text-green-500" />
              </div>
              <p class="mb-2 text-lg font-medium">
                信息提交成功！
              </p>
              <p class="text-gray-500">
                您的账户已创建完成，可以开始使用系统。
              </p>
            </div>
          </div>

          <!-- 导航按钮 -->
          <div class="mt-6 flex justify-between">
            <ui-button :disabled="formActive === 0" @click="prevStep">
              上一步
            </ui-button>
            <ui-button v-if="formActive < 3" type="primary" @click="nextStep">
              下一步
            </ui-button>
            <ui-button v-else type="success" @click="formActive = 0">
              完成
            </ui-button>
          </div>
        </div>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <!-- Steps 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          Steps 属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  active
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  当前激活步骤的索引，从0开始
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  number
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  0
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  direction
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  步骤条方向
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'horizontal' | 'vertical'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'horizontal'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  simple
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否使用简洁模式
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  type
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  步骤条类型
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default' | 'navigation'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  size
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  尺寸
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'small' | 'default' | 'large'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'default'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  active-color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  激活状态的颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  主题色
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  line-color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  连接线颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  边框色
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- StepsStep 属性 -->
      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          StepsStep 属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  类型
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  title
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  步骤标题
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  description
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  步骤描述
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义图标
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  clickable
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否可点击
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  disabled
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  是否禁用
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  boolean
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  false
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  status
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  当前步骤的状态
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'wait' | 'process' | 'finish' | 'error'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 事件 -->
      <div>
        <h4 class="mb-2 text-lg font-medium">
          事件
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  事件名称
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  回调参数
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  click
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  点击步骤时触发
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  (index: number) => void
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  change
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  当前步骤发生变化时触发
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  (newActive: number, oldActive: number) => void
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
