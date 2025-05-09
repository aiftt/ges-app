<script setup lang="ts" name="DemoInputTag">
/**
 * 标签输入框组件演示
 * 创建日期: 2024-07-08
 * 作者: aiftt
 * 更新日期: 2024-07-08 - 初始实现
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
</script>

<template>
  <div class="demo-input-tag">
    <h2>InputTag 标签输入框</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-box">
        <ui-input-tag v-model="basicTags" placeholder="请输入标签并按回车" />
        <div class="demo-value">
          当前值: {{ JSON.stringify(basicTags) }}
        </div>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-box">
        <div v-for="size in sizes" :key="size" class="demo-size-item">
          <div class="demo-size-label">
            {{ size }}
          </div>
          <ui-input-tag placeholder="请输入标签" :size="size" />
        </div>
      </div>
    </div>

    <!-- 分隔符 -->
    <div class="demo-section">
      <h3>使用分隔符</h3>
      <div class="demo-box">
        <ui-input-tag placeholder="输入多个标签，使用逗号、分号或空格分隔" :delimiter="[',', ';', ' ']" />
        <div class="demo-tip">
          提示: 输入 "标签1,标签2;标签3 标签4" 会自动创建四个标签
        </div>
      </div>
    </div>

    <!-- 标签验证 -->
    <div class="demo-section">
      <h3>标签验证</h3>
      <div class="demo-box">
        <ui-input-tag
          v-model="validateTags"
          placeholder="标签长度2-10个字符，只允许中英文和数字"
          :min-length="minLength"
          :max-length="maxLength"
          :validate-fn="validateTag"
          @invalid="handleInvalid"
        />
        <div class="demo-tip">
          最小长度: {{ minLength }}，最大长度: {{ maxLength }}，不允许特殊字符
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-box">
        <ui-input-tag
          v-model="disabledTags"
          placeholder="禁用状态"
          disabled
        />
      </div>
    </div>

    <!-- 只读状态 -->
    <div class="demo-section">
      <h3>只读状态</h3>
      <div class="demo-box">
        <ui-input-tag
          :model-value="['只读标签1', '只读标签2']"
          placeholder="只读状态"
          readonly
        />
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h3>自定义样式</h3>
      <div class="demo-box">
        <ui-input-tag
          v-model="customTags"
          placeholder="自定义样式"
          tag-color="#e6f7ff"
          border-color="#1890ff"
          bg-color="#f0f8ff"
        />
        <div class="demo-tip">
          自定义标签颜色、边框颜色和背景颜色
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div class="demo-section">
      <h3>错误状态</h3>
      <div class="demo-box">
        <ui-input-tag
          placeholder="错误状态示例"
          error
          error-message="请输入有效的标签"
        />
      </div>
    </div>

    <!-- 事件处理 -->
    <div class="demo-section">
      <h3>事件处理</h3>
      <div class="demo-box">
        <ui-input-tag
          placeholder="添加或删除标签查看控制台输出"
          @add="handleAdd"
          @remove="handleRemove"
        />
        <div class="demo-tip">
          添加或删除标签时会在控制台输出相关信息
        </div>
      </div>
    </div>
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
