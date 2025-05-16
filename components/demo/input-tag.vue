<script setup lang="ts" name="DemoInputTag">
/**
 * 标签输入框组件演示
 * 创建日期: 2024-07-08
 * 作者: aiftt
 * 更新日期: 2024-07-08 - 初始实现
 * 更新日期: 2024-12-14 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoInputTag')

// 基础演示数据
const basicTags = ref<string[]>(['标签1', '标签2', '标签3'])

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const

// 自定义验证
const validateTags = ref<string[]>(['已验证标签'])
const minLength = 2
const maxLength = 10

function validateTag(tag: string): boolean {
  // 简单的验证：不允许包含特殊字符
  return /^[a-z0-9\u4E00-\u9FA5]+$/i.test(tag)
}

// 禁用状态
const disabledTags = ref<string[]>(['禁用状态'])

// 自定义样式
const customTags = ref<string[]>(['自定义标签', '颜色样式'])

// 处理添加标签事件
function handleAdd(tag: string) {
  logger.info('添加标签:', tag)
}

// 处理移除标签事件
function handleRemove(tag: string, index: number) {
  logger.info('移除标签:', tag, '索引:', index)
}

// 处理验证失败事件
function handleInvalid(tag: string, reason: string) {
  logger.warn('标签验证失败:', tag, '原因:', reason)
}

// 代码示例
const basicCode = `<ui-input-tag v-model="basicTags" placeholder="请输入标签并按回车" />

<script setup>
// 基础演示数据
const basicTags = ref(['标签1', '标签2', '标签3'])
<\/script>`

const sizesCode = `<ui-input-tag placeholder="小尺寸" size="small" />
<ui-input-tag placeholder="默认尺寸" />
<ui-input-tag placeholder="大尺寸" size="large" />`

const delimiterCode = `<ui-input-tag
  placeholder="输入多个标签，使用逗号、分号或空格分隔"
  :delimiter="[',', ';', ' ']"
/>`

const validateCode = `<ui-input-tag
  v-model="validateTags"
  placeholder="标签长度2-10个字符，只允许中英文和数字"
  :min-length="minLength"
  :max-length="maxLength"
  :validate-fn="validateTag"
  @invalid="handleInvalid"
/>

<script setup>
const validateTags = ref(['已验证标签'])
const minLength = 2
const maxLength = 10

function validateTag(tag) {
  // 简单的验证：不允许包含特殊字符
  return /^[a-z0-9\u4E00-\u9FA5]+$/i.test(tag)
}

function handleInvalid(tag, reason) {
  console.warn('标签验证失败:', tag, '原因:', reason)
}
<\/script>`

const disabledCode = `<ui-input-tag
  v-model="disabledTags"
  placeholder="禁用状态"
  disabled
/>`

const readonlyCode = `<ui-input-tag
  :model-value="['只读标签1', '只读标签2']"
  placeholder="只读状态"
  readonly
/>`

const customStyleCode = `<ui-input-tag
  v-model="customTags"
  placeholder="自定义样式"
  tag-color="#e6f7ff"
  border-color="#1890ff"
  bg-color="#f0f8ff"
/>`

const errorCode = `<ui-input-tag
  placeholder="错误状态示例"
  error
  error-message="请输入有效的标签"
/>`

const eventsCode = `<ui-input-tag
  placeholder="添加或删除标签查看控制台输出"
  @add="handleAdd"
  @remove="handleRemove"
/>

<script setup>
function handleAdd(tag) {
  console.log('添加标签:', tag)
}

function handleRemove(tag, index) {
  console.log('移除标签:', tag, '索引:', index)
}
<\/script>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      InputTag 标签输入框
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      标签输入框组件允许用户输入和管理多个标签，支持键盘操作、验证和自定义样式。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="最基本的标签输入框用法，输入内容后按回车键创建新标签。"
      :code="basicCode"
    >
      <ui-input-tag v-model="basicTags" placeholder="请输入标签并按回车" />
      <div class="mt-4 rounded bg-gray-100 p-2 text-sm font-mono dark:bg-gray-800">
        当前值: {{ JSON.stringify(basicTags) }}
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="标签输入框支持三种尺寸：小、默认、大。"
      :code="sizesCode"
    >
      <div class="space-y-4">
        <div v-for="size in sizes" :key="size" class="flex items-center">
          <div class="w-24 font-medium">
            {{ size }}:
          </div>
          <ui-input-tag placeholder="请输入标签" :size="size" />
        </div>
      </div>
    </ui-demo>

    <!-- 分隔符 -->
    <ui-demo
      title="使用分隔符"
      description="通过设置分隔符，可以在输入时自动将内容分割成多个标签。"
      :code="delimiterCode"
    >
      <ui-input-tag placeholder="输入多个标签，使用逗号、分号或空格分隔" :delimiter="[',', ';', ' ']" />
      <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        提示: 输入 "标签1,标签2;标签3 标签4" 会自动创建四个标签
      </div>
    </ui-demo>

    <!-- 标签验证 -->
    <ui-demo
      title="标签验证"
      description="支持对输入的标签进行验证，包括长度限制和自定义验证函数。"
      :code="validateCode"
    >
      <ui-input-tag
        v-model="validateTags"
        placeholder="标签长度2-10个字符，只允许中英文和数字"
        :min-length="minLength"
        :max-length="maxLength"
        :validate-fn="validateTag"
        @invalid="handleInvalid"
      />
      <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        最小长度: {{ minLength }}，最大长度: {{ maxLength }}，不允许特殊字符
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="禁用状态的标签输入框不可交互。"
      :code="disabledCode"
    >
      <ui-input-tag
        v-model="disabledTags"
        placeholder="禁用状态"
        disabled
      />
    </ui-demo>

    <!-- 只读状态 -->
    <ui-demo
      title="只读状态"
      description="只读状态的标签输入框显示现有标签，但不能添加或删除。"
      :code="readonlyCode"
    >
      <ui-input-tag
        :model-value="['只读标签1', '只读标签2']"
        placeholder="只读状态"
        readonly
      />
    </ui-demo>

    <!-- 自定义颜色 -->
    <ui-demo
      title="自定义样式"
      description="可以自定义标签颜色、边框颜色和背景颜色。"
      :code="customStyleCode"
    >
      <ui-input-tag
        v-model="customTags"
        placeholder="自定义样式"
        tag-color="#e6f7ff"
        border-color="#1890ff"
        bg-color="#f0f8ff"
      />
    </ui-demo>

    <!-- 错误状态 -->
    <ui-demo
      title="错误状态"
      description="展示错误状态的标签输入框，可以显示错误信息。"
      :code="errorCode"
    >
      <ui-input-tag
        placeholder="错误状态示例"
        error
        error-message="请输入有效的标签"
      />
    </ui-demo>

    <!-- 事件处理 -->
    <ui-demo
      title="事件处理"
      description="可以监听添加和删除标签的事件，进行相应处理。"
      :code="eventsCode"
    >
      <ui-input-tag
        placeholder="添加或删除标签查看控制台输出"
        @add="handleAdd"
        @remove="handleRemove"
      />
      <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        添加或删除标签时会在控制台输出相关信息
      </div>
    </ui-demo>
  </div>
</template>

<style scoped>
.demo-input-tag {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 2rem;
}

.demo-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--ui-color-text);
}

.demo-box {
  padding: 1.5rem;
  border: 1px solid var(--ui-border-color);
  border-radius: 0.5rem;
  background-color: var(--ui-color-bg-light);
}

.demo-value {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: var(--ui-color-bg);
  border-radius: 0.25rem;
  font-family: monospace;
  color: var(--ui-color-text-light);
}

.demo-tip {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--ui-color-text-light);
}

.demo-size-item {
  margin-bottom: 1rem;
}

.demo-size-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--ui-color-text-light);
}
</style>
