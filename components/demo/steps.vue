<script setup lang="ts">
/**
 * 步骤条组件演示
 * 创建日期: 2024-08-16
 * 作者: aiftt
 * 更新日期: 2024-08-16 - 初始实现
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
</script>

<template>
  <div class="p-4">
    <h1 class="mb-6 text-2xl font-bold">
      步骤条组件演示
    </h1>

    <!-- 基础用法 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        基础用法
      </h2>
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
    </section>

    <!-- 带描述的步骤条 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        带描述的步骤条
      </h2>
      <ui-steps :active="descActiveStep">
        <ui-steps-step title="登录账号" description="使用您的账号登录系统" />
        <ui-steps-step title="验证身份" description="通过短信验证码验证身份" />
        <ui-steps-step title="设置密码" description="设置新的安全密码" />
        <ui-steps-step title="完成" description="所有设置已完成" />
      </ui-steps>
    </section>

    <!-- 垂直步骤条 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        垂直步骤条
      </h2>
      <ui-steps :active="verticalActive" direction="vertical">
        <ui-steps-step title="步骤1" description="这是步骤1的描述内容" />
        <ui-steps-step title="步骤2" description="这是步骤2的描述内容" />
        <ui-steps-step title="步骤3" description="这是步骤3的描述内容" />
      </ui-steps>
    </section>

    <!-- 简洁步骤条 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        简洁步骤条
      </h2>
      <ui-steps :active="simpleActive" simple>
        <ui-steps-step title="填写信息" />
        <ui-steps-step title="确认信息" />
        <ui-steps-step title="完成" />
      </ui-steps>
    </section>

    <!-- 可点击的步骤条 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        可点击的步骤条
      </h2>
      <ui-steps :active="clickableActive" @click="handleStepClick">
        <ui-steps-step title="步骤1" clickable />
        <ui-steps-step title="步骤2" clickable />
        <ui-steps-step title="步骤3" clickable />
        <ui-steps-step title="步骤4" disabled />
      </ui-steps>
      <p class="mt-2 text-gray-500">
        点击步骤可以直接导航（除了禁用的步骤4）
      </p>
    </section>

    <!-- 自定义图标 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义图标
      </h2>
      <ui-steps :active="iconActive">
        <ui-steps-step title="登录" icon="carbon:user" />
        <ui-steps-step title="验证" icon="carbon:shield-check" />
        <ui-steps-step title="支付" icon="carbon:credit-card" />
        <ui-steps-step title="完成" icon="carbon:check-circle" />
      </ui-steps>
    </section>

    <!-- 自定义样式 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        自定义样式
      </h2>
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
          <div class="mb-1">
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
          <div class="mb-1">
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
    </section>

    <!-- 导航类型 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        导航类型
      </h2>
      <ui-steps :active="1" type="navigation">
        <ui-steps-step title="已完成" />
        <ui-steps-step title="进行中" />
        <ui-steps-step title="等待中" />
        <ui-steps-step title="等待中" />
      </ui-steps>
    </section>

    <!-- 尺寸类型 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        尺寸类型
      </h2>
      <h3 class="mb-2 text-lg">
        小尺寸
      </h3>
      <ui-steps :active="1" size="small">
        <ui-steps-step title="步骤1" />
        <ui-steps-step title="步骤2" />
        <ui-steps-step title="步骤3" />
      </ui-steps>

      <h3 class="mb-2 mt-4 text-lg">
        中尺寸 (默认)
      </h3>
      <ui-steps :active="1">
        <ui-steps-step title="步骤1" />
        <ui-steps-step title="步骤2" />
        <ui-steps-step title="步骤3" />
      </ui-steps>

      <h3 class="mb-2 mt-4 text-lg">
        大尺寸
      </h3>
      <ui-steps :active="1" size="large">
        <ui-steps-step title="步骤1" />
        <ui-steps-step title="步骤2" />
        <ui-steps-step title="步骤3" />
      </ui-steps>
    </section>

    <!-- 实际应用案例 -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-bold">
        实际应用案例 - 分步表单
      </h2>
      <ui-steps :active="formActive">
        <ui-steps-step title="基本信息" />
        <ui-steps-step title="账户安全" />
        <ui-steps-step title="联系方式" />
        <ui-steps-step title="完成" />
      </ui-steps>

      <div class="mt-6 border rounded-md p-6">
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
    </section>
  </div>
</template>
