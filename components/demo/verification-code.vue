<script setup lang="ts" name="DemoVerificationCode">
/**
 * 验证码输入组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 初始化logger
const logger = useLogger('DemoVerificationCode')

// 基础演示数据
const basicValue = ref('')

// 数字类型验证码
const numberValue = ref('')

// 带掩码的验证码
const maskedValue = ref('')

// 自动提交
const autoSubmitValue = ref('')
function handleSubmit(value: string) {
  logger.info('验证码已提交:', value)
}

// 自定义样式
const customValue = ref('')

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const

// 不同长度
const lengths = [4, 6, 8]

// 清空演示
function reset() {
  basicValue.value = ''
  numberValue.value = ''
  maskedValue.value = ''
  autoSubmitValue.value = ''
  customValue.value = ''
}
</script>

<template>
  <div class="demo-verification-code">
    <h2>VerificationCode 验证码输入</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-box">
        <ui-input-verification
          v-model="basicValue"
          placeholder="输入验证码"
        />
        <div class="demo-value">
          当前值: {{ basicValue }}
        </div>
        <div class="demo-button" @click="reset">
          清空所有示例
        </div>
      </div>
    </div>

    <!-- 不同长度 -->
    <div class="demo-section">
      <h3>不同位数</h3>
      <div class="demo-box">
        <div v-for="length in lengths" :key="length" class="demo-item">
          <div class="demo-label">
            {{ length }}位验证码
          </div>
          <ui-input-verification :length="length" />
        </div>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-box">
        <div v-for="size in sizes" :key="size" class="demo-item">
          <div class="demo-label">
            {{ size }}
          </div>
          <ui-input-verification :size="size" />
        </div>
      </div>
    </div>

    <!-- 数字类型验证码 -->
    <div class="demo-section">
      <h3>数字类型验证码</h3>
      <div class="demo-box">
        <ui-input-verification
          v-model="numberValue"
          type="number"
        />
        <div class="demo-tip">
          只允许输入数字，尝试输入字母将被过滤
        </div>
      </div>
    </div>

    <!-- 带掩码的验证码 -->
    <div class="demo-section">
      <h3>密码掩码</h3>
      <div class="demo-box">
        <ui-input-verification
          v-model="maskedValue"
          mask
        />
        <div class="demo-tip">
          输入的字符会被掩码隐藏，适用于密码等敏感信息
        </div>
      </div>
    </div>

    <!-- 自动提交 -->
    <div class="demo-section">
      <h3>自动提交</h3>
      <div class="demo-box">
        <ui-input-verification
          v-model="autoSubmitValue"
          auto-submit
          @submit="handleSubmit"
        />
        <div class="demo-tip">
          填写完所有字符后将自动提交，查看控制台输出
        </div>
      </div>
    </div>

    <!-- 显示分隔符 -->
    <div class="demo-section">
      <h3>显示分隔符</h3>
      <div class="demo-box">
        <ui-input-verification
          show-separator
        />
        <div class="demo-tip">
          在输入框之间显示分隔符
        </div>
      </div>
    </div>

    <!-- 自动大写 -->
    <div class="demo-section">
      <h3>自动大写</h3>
      <div class="demo-box">
        <ui-input-verification
          uppercase
        />
        <div class="demo-tip">
          输入的字母将自动转为大写
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-box">
        <ui-input-verification
          disabled
        />
      </div>
    </div>

    <!-- 错误状态 -->
    <div class="demo-section">
      <h3>错误状态</h3>
      <div class="demo-box">
        <ui-input-verification
          error
          error-message="验证码错误"
        />
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <h3>自定义样式</h3>
      <div class="demo-box">
        <ui-input-verification
          v-model="customValue"
          border-color="#1890ff"
          bg-color="#f0f8ff"
          text-color="#0050b3"
          focus-color="#40a9ff"
          gap="12px"
        />
        <div class="demo-tip">
          可以自定义边框颜色、背景色、文字颜色和输入框间距
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-verification-code {
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

.demo-item {
  margin-bottom: 1.5rem;
}

.demo-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--ui-color-text-light);
}

.demo-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--ui-color-primary);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.demo-button:hover {
  opacity: 0.8;
}
</style>
