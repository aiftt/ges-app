<script setup lang="ts" name="DemoAutocomplete">
/**
 * 自动完成输入框组件演示
 * 创建日期: 2024-07-09
 * 作者: aiftt
 * 更新日期: 2024-07-09 - 初始实现
 */

import { ref } from 'vue'
import { useLogger } from '~/composables/useLogger'

// 定义选项类型
type OptionValue = string | number
interface Option {
  value: OptionValue
  label: string
  disabled?: boolean
  [key: string]: any
}

// 初始化logger
const logger = useLogger('DemoAutocomplete')

// 基础演示数据
const basicValue = ref('')
const basicOptions = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

// 分组选项
const groupedOptions = [
  {
    label: '分组1',
    options: [
      { value: 'group1-1', label: '分组1选项1' },
      { value: 'group1-2', label: '分组1选项2' },
    ],
  },
  {
    label: '分组2',
    options: [
      { value: 'group2-1', label: '分组2选项1' },
      { value: 'group2-2', label: '分组2选项2' },
    ],
  },
]

// 远程搜索
const remoteValue = ref('')
const remoteOptions = ref<Option[]>([])
const remoteLoading = ref(false)

// 模拟远程搜索
async function searchRemote(query: string): Promise<Option[]> {
  if (!query) {
    remoteOptions.value = []
    return []
  }

  remoteLoading.value = true
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    const results: Option[] = [
      { value: `remote-${query}-1`, label: `${query}的搜索结果1` },
      { value: `remote-${query}-2`, label: `${query}的搜索结果2` },
      { value: `remote-${query}-3`, label: `${query}的搜索结果3` },
    ]

    remoteOptions.value = results
    return results
  }
  catch (error) {
    logger.error('远程搜索失败:', error)
    return []
  }
  finally {
    remoteLoading.value = false
  }
}

// 自定义选项过滤
const customFilterValue = ref('')
function customFilterMethod(query: string, option: Option): boolean {
  // 仅匹配以查询开头的选项
  return option.label.toLowerCase().startsWith(query.toLowerCase())
}

// 可创建新选项
const createOptionsValue = ref('')
const createOptions = ref([
  { value: 'create1', label: '可创建选项1' },
  { value: 'create2', label: '可创建选项2' },
])

// 不同尺寸
const sizes = ['small', 'default', 'large'] as const
</script>

<template>
  <div class="demo-autocomplete">
    <h2>Autocomplete 自动完成输入框</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          v-model="basicValue"
          placeholder="请输入内容"
          :options="basicOptions"
        />
        <div class="demo-value">
          当前值: {{ basicValue }}
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
          <ui-input-autocomplete
            placeholder="请输入内容"
            :size="size"
            :options="basicOptions"
          />
        </div>
      </div>
    </div>

    <!-- 选项分组 -->
    <div class="demo-section">
      <h3>选项分组</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          placeholder="请选择一个分组选项"
          :groups="groupedOptions"
        />
        <div class="demo-tip">
          选项可以按照分组显示，便于分类浏览
        </div>
      </div>
    </div>

    <!-- 远程搜索 -->
    <div class="demo-section">
      <h3>远程搜索</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          v-model="remoteValue"
          placeholder="输入关键词进行搜索"
          :options="remoteOptions"
          :loading="remoteLoading"
          remote
          :remote-method="searchRemote"
        />
        <div class="demo-tip">
          输入关键词后将从服务器获取匹配的选项
        </div>
      </div>
    </div>

    <!-- 自定义过滤方法 -->
    <div class="demo-section">
      <h3>自定义过滤方法</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          v-model="customFilterValue"
          placeholder="仅匹配选项开头的输入"
          :options="basicOptions"
          :filter-method="customFilterMethod"
        />
        <div class="demo-tip">
          此示例只会匹配以输入内容开头的选项
        </div>
      </div>
    </div>

    <!-- 可创建新选项 -->
    <div class="demo-section">
      <h3>可创建新选项</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          v-model="createOptionsValue"
          placeholder="可创建新选项"
          :options="createOptions"
          allow-create
          create-text="创建新选项: {query}"
        />
        <div class="demo-tip">
          当输入的内容不在选项中时，可以创建新的选项
        </div>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          placeholder="禁用状态"
          :options="basicOptions"
          disabled
        />
      </div>
    </div>

    <!-- 错误状态 -->
    <div class="demo-section">
      <h3>错误状态</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          placeholder="错误状态"
          :options="basicOptions"
          error
          error-message="请输入有效的内容"
        />
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="demo-section">
      <h3>自定义样式</h3>
      <div class="demo-box">
        <ui-input-autocomplete
          placeholder="自定义样式"
          :options="basicOptions"
          border-color="#1890ff"
          bg-color="#f0f8ff"
          text-color="#0050b3"
        />
        <div class="demo-tip">
          可以自定义输入框的边框颜色、背景色和文字颜色
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-autocomplete {
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
