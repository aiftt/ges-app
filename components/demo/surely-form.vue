<script setup lang="ts" name="DemoSurelyForm">
/**
 * SurelyForm 组件演示
 * 创建日期: 2024-09-01
 * 作者: Claude
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */
import { computed, ref } from 'vue'

// 获取SurelyForm类型
// 注意：确保这个组件已正确部署到项目中
interface IFormInstance {
  validate: () => Promise<any>
  resetFields: () => void
  clearValidate: (fields?: string | string[]) => void
  validateField: (field: string) => Promise<any>
  setFieldValue: (field: string, value: any) => void
  getFieldValue: (field: string) => any
  getFieldValues: () => Record<string, any>
  setFieldValues: (values: Record<string, any>) => void
  setFieldsDisabled: (fields: string[], disabled: boolean) => void
  setFieldsHidden: (fields: string[], hidden: boolean) => void
}

interface IFormItem {
  field: string
  label?: string
  value?: any
  rules?: any[]
  component?: any
  componentProps?: Record<string, any>
  defaultValue?: any
  placeholder?: string
  tips?: string
  disabled?: boolean
  hidden?: boolean | any
  labelWidth?: string | number
  labelPosition?: 'left' | 'top' | 'right'
  colSpan?: number
  validator?: (value: any, formData: any) => boolean | Promise<boolean>
  watch?: (value: any, oldValue: any, formData: any) => void
  onChange?: (value: any, formData: any) => void
  onBlur?: (value: any, formData: any) => void
  onEnter?: (value: any, formData: any) => void
  render?: (formData: any) => any
  required?: boolean
}

// 表单引用
const formRef = ref<IFormInstance | null>(null)

// 基础表单数据
const basicFormData = ref({
  username: '',
  password: '',
  email: '',
  age: '',
  agree: false,
})

// 基础表单规则
const basicFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' as const },
    { minLength: 3, maxLength: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' as const },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' as const },
    { minLength: 6, message: '密码长度不能小于6个字符', trigger: 'blur' as const },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' as const },
    { type: 'email' as const, message: '请输入正确的邮箱格式', trigger: 'blur' as const },
  ],
  age: [
    { type: 'number' as const, message: '年龄必须为数字', trigger: 'change' as const },
    { validator: (val: any, _formData: any) => !val || (Number(val) >= 18 && Number(val) <= 100), message: '年龄必须在18-100之间', trigger: 'change' as const },
  ],
  agree: [
    { required: true, message: '请同意用户协议', trigger: 'change' as const },
  ],
}

// 自定义渲染表单数据
const customFormData = ref({
  name: '',
  gender: 'male',
  interests: [],
  bio: '',
  birthdate: '',
})

// 自定义渲染表单架构
const customFormSchema = ref<IFormItem[]>([
  {
    field: 'name',
    label: '姓名',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    field: 'gender',
    label: '性别',
    component: 'ui-radio',
    componentProps: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' },
      ],
    },
  },
  {
    field: 'interests',
    label: '兴趣爱好',
    component: 'ui-checkbox',
    defaultValue: [],
    componentProps: {
      options: [
        { label: '阅读', value: 'reading' },
        { label: '音乐', value: 'music' },
        { label: '运动', value: 'sports' },
        { label: '旅行', value: 'travel' },
        { label: '编程', value: 'coding' },
      ],
    },
    rules: [{ type: 'array', message: '请选择兴趣爱好' }],
  },
  {
    field: 'bio',
    label: '个人简介',
    component: 'ui-textarea',
    componentProps: {
      placeholder: '请输入个人简介',
      rows: 4,
    },
    colSpan: 2,
  },
  {
    field: 'birthdate',
    label: '出生日期',
    component: 'ui-datepicker',
    componentProps: {
      placeholder: '请选择出生日期',
      format: 'YYYY-MM-DD',
    },
  },
])

// 动态表单数据
const dynamicFormData = ref({
  orderType: 'product',
  productId: '',
  serviceId: '',
  quantity: 1,
  address: '',
  contactName: '',
  contactPhone: '',
})

// 动态表单架构
const dynamicFormSchema = ref<IFormItem[]>([
  {
    field: 'orderType',
    label: '订单类型',
    component: 'ui-radio',
    componentProps: {
      options: [
        { label: '产品订单', value: 'product' },
        { label: '服务订单', value: 'service' },
      ],
    },
    onChange: (value: any, formData: any) => {
      // 切换订单类型时，重置相关字段
      if (value === 'product') {
        formData.serviceId = ''
      }
      else {
        formData.productId = ''
        formData.quantity = 1
      }
    },
  },
  {
    field: 'productId',
    label: '产品ID',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入产品ID',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'product'),
    rules: [{ required: true, message: '请输入产品ID' }],
  },
  {
    field: 'quantity',
    label: '数量',
    component: 'ui-input-number',
    componentProps: {
      min: 1,
      max: 999,
      placeholder: '请输入数量',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'product'),
    rules: [{ required: true, message: '请输入数量' }],
  },
  {
    field: 'serviceId',
    label: '服务ID',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入服务ID',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'service'),
    rules: [{ required: true, message: '请输入服务ID' }],
  },
  {
    field: 'address',
    label: '地址',
    component: 'ui-textarea',
    componentProps: {
      placeholder: '请输入地址',
      rows: 3,
    },
    colSpan: 2,
    rules: [{ required: true, message: '请输入地址' }],
  },
  {
    field: 'contactName',
    label: '联系人',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入联系人姓名',
    },
    rules: [{ required: true, message: '请输入联系人姓名' }],
  },
  {
    field: 'contactPhone',
    label: '联系电话',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入联系电话',
    },
    rules: [
      { required: true, message: '请输入联系电话' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
    ],
  },
])

// 提交表单
function handleSubmit(formData: any, valid: boolean) {
  if (valid) {
    logger.info('表单验证通过，数据:', formData)
  }
  else {
    logger.warn('表单验证失败')
  }
}

// 重置表单
function resetForm() {
  formRef.value?.resetFields()
}

// 表单验证（未使用，添加下划线前缀）
async function _validateForm() {
  try {
    const result = await formRef.value?.validate()
    if (result?.valid) {
      logger.info('表单验证通过')
    }
    else {
      logger.warn('表单验证失败，错误:', result?.errors)
    }
  }
  catch (error) {
    logger.error('表单验证异常:', error)
  }
}

// 代码示例
const basicFormCode = `<ui-surely-form
  ref="formRef"
  v-model="basicFormData"
  :rules="basicFormRules"
  label-width="120px"
  @submit="handleSubmit"
>
  <template #actions>
    <ui-button type="primary" native-type="submit">
      提交
    </ui-button>
    <ui-button class="ml-2" @click="resetForm">
      重置
    </ui-button>
  </template>
</ui-surely-form>

<script setup>
// 表单数据
const basicFormData = ref({
  username: '',
  password: '',
  email: '',
  age: '',
  agree: false,
})

// 表单规则
const basicFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { minLength: 3, maxLength: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { minLength: 6, message: '密码长度不能小于6个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  age: [
    { type: 'number', message: '年龄必须为数字', trigger: 'change' },
    {
      validator: (val, formData) => !val || (Number(val) >= 18 && Number(val) <= 100),
      message: '年龄必须在18-100之间',
      trigger: 'change'
    },
  ],
  agree: [
    { required: true, message: '请同意用户协议', trigger: 'change' },
  ],
}

// 提交和重置方法
function handleSubmit(formData, valid) {
  if (valid) {
    console.log('表单验证通过，数据:', formData)
  } else {
    console.warn('表单验证失败')
  }
}

function resetForm() {
  formRef.value?.resetFields()
}
<\/script>`

const customFormCode = `<ui-surely-form
  v-model="customFormData"
  :schema="customFormSchema"
  label-width="120px"
  label-position="left"
  layout="horizontal"
  :col-count="2"
  :gutter="20"
  @submit="handleSubmit"
>
  <template #actions>
    <ui-button type="primary" native-type="submit">
      提交
    </ui-button>
    <ui-button class="ml-2" @click="resetForm">
      重置
    </ui-button>
  </template>
</ui-surely-form>

<script setup>
// 表单数据
const customFormData = ref({
  name: '',
  gender: 'male',
  interests: [],
  bio: '',
  birthdate: '',
})

// 表单架构
const customFormSchema = ref([
  {
    field: 'name',
    label: '姓名',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入姓名',
      clearable: true,
    },
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    field: 'gender',
    label: '性别',
    component: 'ui-radio',
    componentProps: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' },
      ],
    },
  },
  {
    field: 'interests',
    label: '兴趣爱好',
    component: 'ui-checkbox',
    defaultValue: [],
    componentProps: {
      options: [
        { label: '阅读', value: 'reading' },
        { label: '音乐', value: 'music' },
        { label: '运动', value: 'sports' },
        { label: '旅行', value: 'travel' },
        { label: '编程', value: 'coding' },
      ],
    },
    rules: [{ type: 'array', message: '请选择兴趣爱好' }],
  },
  {
    field: 'bio',
    label: '个人简介',
    component: 'ui-textarea',
    componentProps: {
      placeholder: '请输入个人简介',
      rows: 4,
    },
    colSpan: 2,
  },
  {
    field: 'birthdate',
    label: '出生日期',
    component: 'ui-datepicker',
    componentProps: {
      placeholder: '请选择出生日期',
      format: 'YYYY-MM-DD',
    },
  },
])
<\/script>`

const dynamicFormCode = `<ui-surely-form
  v-model="dynamicFormData"
  :schema="dynamicFormSchema"
  label-width="120px"
  label-position="left"
  layout="horizontal"
  :col-count="2"
  :gutter="20"
  @submit="handleSubmit"
>
  <template #actions>
    <ui-button type="primary" native-type="submit">
      提交
    </ui-button>
    <ui-button class="ml-2" @click="resetForm">
      重置
    </ui-button>
  </template>
</ui-surely-form>

<script setup>
import { computed, ref } from 'vue'

// 表单数据
const dynamicFormData = ref({
  orderType: 'product',
  productId: '',
  serviceId: '',
  quantity: 1,
  address: '',
  contactName: '',
  contactPhone: '',
})

// 表单架构
const dynamicFormSchema = ref([
  {
    field: 'orderType',
    label: '订单类型',
    component: 'ui-radio',
    componentProps: {
      options: [
        { label: '产品订单', value: 'product' },
        { label: '服务订单', value: 'service' },
      ],
    },
    onChange: (value, formData) => {
      // 切换订单类型时，重置相关字段
      if (value === 'product') {
        formData.serviceId = ''
      } else {
        formData.productId = ''
        formData.quantity = 1
      }
    },
  },
  {
    field: 'productId',
    label: '产品ID',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入产品ID',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'product'),
    rules: [{ required: true, message: '请输入产品ID' }],
  },
  {
    field: 'quantity',
    label: '数量',
    component: 'ui-input-number',
    componentProps: {
      min: 1,
      max: 999,
      placeholder: '请输入数量',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'product'),
    rules: [{ required: true, message: '请输入数量' }],
  },
  {
    field: 'serviceId',
    label: '服务ID',
    component: 'ui-input',
    componentProps: {
      placeholder: '请输入服务ID',
    },
    hidden: computed(() => dynamicFormData.value.orderType !== 'service'),
    rules: [{ required: true, message: '请输入服务ID' }],
  },
  // ... 更多字段
])
<\/script>`

const layoutFormCode = `<!-- 垂直布局 -->
<ui-surely-form
  :model-value="{ name: '', email: '' }"
  layout="vertical"
  :schema="[
    { field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '请输入姓名' } },
    { field: 'email', label: '邮箱', component: 'ui-input', componentProps: { placeholder: '请输入邮箱' } },
  ]"
/>

<!-- 内联布局 -->
<ui-surely-form
  :model-value="{ name: '', email: '' }"
  layout="inline"
  :schema="[
    { field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '请输入姓名' } },
    { field: 'email', label: '邮箱', component: 'ui-input', componentProps: { placeholder: '请输入邮箱' } },
  ]"
>
  <template #actions>
    <ui-button type="primary" size="small">
      搜索
    </ui-button>
    <ui-button size="small" class="ml-2">
      重置
    </ui-button>
  </template>
</ui-surely-form>`

const sizeFormCode = `<!-- 小尺寸 -->
<ui-surely-form
  :model-value="{ name: '' }"
  size="small"
  :schema="[{ field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '小尺寸表单' } }]"
/>

<!-- 大尺寸 -->
<ui-surely-form
  :model-value="{ name: '' }"
  size="large"
  :schema="[{ field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '大尺寸表单' } }]"
/>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      SurelyForm 高级表单组件
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      SurelyForm 是一个高级表单组件，支持表单验证、动态表单项、布局定制和复杂数据处理，提供丰富的功能和灵活的配置选项。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="基础的表单示例，包含验证功能，支持字段验证、提交和重置操作。"
      :code="basicFormCode"
    >
      <ui-surely-form
        ref="formRef"
        v-model="basicFormData"
        :rules="basicFormRules"
        label-width="120px"
        @submit="handleSubmit"
      >
        <template #actions>
          <ui-button type="primary" native-type="submit">
            提交
          </ui-button>
          <ui-button class="ml-2" @click="resetForm">
            重置
          </ui-button>
        </template>
      </ui-surely-form>
    </ui-demo>

    <!-- 自定义表单项 -->
    <ui-demo
      title="自定义表单项"
      description="使用 Schema 自定义表单项和布局，可以设置多列布局、字段宽度和验证规则。"
      :code="customFormCode"
    >
      <ui-surely-form
        v-model="customFormData"
        :schema="customFormSchema"
        label-width="120px"
        label-position="left"
        layout="horizontal"
        :col-count="2"
        :gutter="20"
        @submit="handleSubmit"
      >
        <template #actions>
          <ui-button type="primary" native-type="submit">
            提交
          </ui-button>
          <ui-button class="ml-2" @click="resetForm">
            重置
          </ui-button>
        </template>
      </ui-surely-form>
    </ui-demo>

    <!-- 动态表单 -->
    <ui-demo
      title="动态表单"
      description="根据表单值动态显示或隐藏表单项，可以实现条件渲染和联动效果。"
      :code="dynamicFormCode"
    >
      <ui-surely-form
        v-model="dynamicFormData"
        :schema="dynamicFormSchema"
        label-width="120px"
        label-position="left"
        layout="horizontal"
        :col-count="2"
        :gutter="20"
        @submit="handleSubmit"
      >
        <template #actions>
          <ui-button type="primary" native-type="submit">
            提交
          </ui-button>
          <ui-button class="ml-2" @click="resetForm">
            重置
          </ui-button>
        </template>
      </ui-surely-form>
    </ui-demo>

    <!-- 不同布局 -->
    <ui-demo
      title="不同布局"
      description="支持水平、垂直和内联三种布局方式，适应不同的使用场景。"
      :code="layoutFormCode"
    >
      <div class="space-y-6">
        <div>
          <h4 class="mb-2 text-lg font-medium">
            垂直布局
          </h4>
          <ui-surely-form
            :model-value="{ name: '', email: '' }"
            layout="vertical"
            :schema="[
              { field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '请输入姓名' } },
              { field: 'email', label: '邮箱', component: 'ui-input', componentProps: { placeholder: '请输入邮箱' } },
            ]"
          />
        </div>

        <div>
          <h4 class="mb-2 text-lg font-medium">
            内联布局
          </h4>
          <ui-surely-form
            :model-value="{ name: '', email: '' }"
            layout="inline"
            :schema="[
              { field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '请输入姓名' } },
              { field: 'email', label: '邮箱', component: 'ui-input', componentProps: { placeholder: '请输入邮箱' } },
            ]"
          >
            <template #actions>
              <ui-button type="primary" size="small">
                搜索
              </ui-button>
              <ui-button size="small" class="ml-2">
                重置
              </ui-button>
            </template>
          </ui-surely-form>
        </div>
      </div>
    </ui-demo>

    <!-- 表单尺寸 -->
    <ui-demo
      title="表单尺寸"
      description="提供小、中、大三种表单尺寸，适应不同的界面需求。"
      :code="sizeFormCode"
    >
      <div class="space-y-6">
        <div>
          <h4 class="mb-2 text-lg font-medium">
            小尺寸
          </h4>
          <ui-surely-form
            :model-value="{ name: '' }"
            size="small"
            :schema="[{ field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '小尺寸表单' } }]"
          />
        </div>

        <div>
          <h4 class="mb-2 text-lg font-medium">
            大尺寸
          </h4>
          <ui-surely-form
            :model-value="{ name: '' }"
            size="large"
            :schema="[{ field: 'name', label: '姓名', component: 'ui-input', componentProps: { placeholder: '大尺寸表单' } }]"
          />
        </div>
      </div>
    </ui-demo>

    <!-- 属性说明 -->
    <div class="mt-8 border border-gray-200 rounded bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-2 text-lg font-medium">
        属性说明
      </h3>
      <ul class="ml-6 list-disc text-sm space-y-2">
        <li><code>modelValue</code>: 表单绑定的数据对象</li>
        <li><code>schema</code>: 表单项配置数组</li>
        <li><code>layout</code>: 表单布局，可选 horizontal、vertical、inline</li>
        <li><code>labelWidth</code>: 标签宽度</li>
        <li><code>labelPosition</code>: 标签位置，可选 left、top、right</li>
        <li><code>disabled</code>: 是否禁用整个表单</li>
        <li><code>validateOnRuleChange</code>: 表单规则变更时是否自动验证</li>
        <li><code>hideRequiredAsterisk</code>: 是否隐藏必填字段的星号</li>
        <li><code>size</code>: 表单尺寸，可选 small、medium、large</li>
        <li><code>errorMessagePosition</code>: 错误消息显示位置</li>
        <li><code>scrollToError</code>: 提交失败是否滚动到错误位置</li>
        <li><code>gutter</code>: 栅格间隔</li>
        <li><code>colCount</code>: 每行的列数</li>
        <li><code>rules</code>: 表单校验规则</li>
      </ul>

      <h3 class="mb-2 mt-4 text-lg font-medium">
        方法说明
      </h3>
      <ul class="ml-6 list-disc text-sm space-y-2">
        <li><code>validate</code>: 验证整个表单</li>
        <li><code>resetFields</code>: 重置表单字段</li>
        <li><code>clearValidate</code>: 清除表单验证信息</li>
        <li><code>validateField</code>: 验证指定字段</li>
        <li><code>setFieldValue</code>: 设置字段值</li>
        <li><code>getFieldValue</code>: 获取字段值</li>
        <li><code>getFieldValues</code>: 获取所有字段值</li>
        <li><code>setFieldValues</code>: 设置多个字段值</li>
        <li><code>setFieldsDisabled</code>: 设置字段禁用状态</li>
        <li><code>setFieldsHidden</code>: 设置字段隐藏状态</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-surely-form-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
