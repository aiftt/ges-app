<script setup lang="ts" name="DemoTag">
/**
 * Tag 标签组件演示
 * 创建日期: 2024-05-30
 * 作者: aiftt
 * 更新日期: 2024-05-30 - 初始版本
 * 更新日期: 2024-06-20 - 修改代码示例为ui-code组件
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

import { ref } from 'vue'

// 处理标签点击
function handleClick(_: string) {
  // 这里只是演示，实际应用中可能会根据点击执行相应操作
}

// 定义标签类型
type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

// 可控标签列表
const tags = ref([
  { content: '标签一', type: 'primary' as TagType },
  { content: '标签二', type: 'success' as TagType },
  { content: '标签三', type: 'warning' as TagType },
  { content: '标签四', type: 'danger' as TagType },
  { content: '标签五', type: 'default' as TagType },
])

// 删除标签
function removeTag(index: number) {
  tags.value.splice(index, 1)
}

// 代码示例
const basicCode = `<ui-tag>默认标签</ui-tag>
<ui-tag type="primary">主要标签</ui-tag>
<ui-tag type="success">成功标签</ui-tag>
<ui-tag type="warning">警告标签</ui-tag>
<ui-tag type="danger">危险标签</ui-tag>`

const sizeCode = `<ui-tag size="small" type="primary">小型标签</ui-tag>
<ui-tag type="primary">默认标签</ui-tag>
<ui-tag size="large" type="primary">大型标签</ui-tag>`

const closableCode = `<ui-tag v-for="(tag, index) in tags"
  :key="index"
  :type="tag.type"
  closable
  @close="removeTag(index)"
>
  {{ tag.content }}
</ui-tag>

<script setup>
// 定义标签类型
type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

// 可控标签列表
const tags = ref([
  { content: '标签一', type: 'primary' as TagType },
  { content: '标签二', type: 'success' as TagType },
  { content: '标签三', type: 'warning' as TagType },
  { content: '标签四', type: 'danger' as TagType },
  { content: '标签五', type: 'default' as TagType },
])

// 删除标签
function removeTag(index: number) {
  tags.value.splice(index, 1)
}
<\/script>`

const clickableCode = `<ui-tag clickable @click="handleClick('默认')">默认点击</ui-tag>
<ui-tag type="primary" clickable @click="handleClick('主要')">主要点击</ui-tag>
<ui-tag type="success" clickable @click="handleClick('成功')">成功点击</ui-tag>

<script setup>
function handleClick(type: string) {
  console.log('点击了' + type + '标签')
}
<\/script>`

const roundCode = `<ui-tag round>圆角标签</ui-tag>
<ui-tag type="primary" round>圆角主要</ui-tag>
<ui-tag type="success" round>圆角成功</ui-tag>
<ui-tag type="danger" round closable>圆角可关闭</ui-tag>`

const iconCode = `<ui-tag icon="carbon:user">用户</ui-tag>
<ui-tag type="primary" icon="carbon:location">位置</ui-tag>
<ui-tag type="success" icon="carbon:checkmark">完成</ui-tag>
<ui-tag type="warning" icon="carbon:warning">警告</ui-tag>
<ui-tag type="danger" icon="carbon:close">错误</ui-tag>`

const customCode = `<ui-tag color="#8B5CF6" bg-color="#F5F3FF">紫色标签</ui-tag>
<ui-tag color="#FF6B4A" bg-color="#FFF1EE">橙红色标签</ui-tag>
<ui-tag
  color="#0EA5E9"
  bg-color="#E0F2FE"
  border-color="#BAE6FD"
  bordered
>天蓝色标签</ui-tag>
<ui-tag color="white" bg-color="#374151">深灰色标签</ui-tag>
<ui-tag
  color="#047857"
  bg-color="#ECFDF5"
  border-color="#A7F3D0"
  bordered
>翠绿色标签</ui-tag>`

const disabledCode = `<ui-tag disabled>禁用标签</ui-tag>
<ui-tag type="primary" disabled>禁用主要</ui-tag>
<ui-tag type="danger" disabled closable>禁用关闭</ui-tag>
<ui-tag disabled clickable>禁用点击</ui-tag>`

const maxWidthCode = `<ui-tag max-width="100px">这是一个内容很长的标签，将会被截断显示</ui-tag>
<ui-tag type="primary" max-width="120px">这是另一个内容很长的标签，将会被截断显示</ui-tag>
<ui-tag type="success" max-width="80px" closable>这是可关闭的长内容标签</ui-tag>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Tag 标签
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于标记和选择的标签组件，可用于标记、分类和选择。
    </p>

    <!-- 基础用法 -->
    <ui-demo
      title="基础用法"
      description="标签有五种类型：默认、主要、成功、警告和危险。"
      :code="basicCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag>默认标签</ui-tag>
        <ui-tag type="primary">
          主要标签
        </ui-tag>
        <ui-tag type="success">
          成功标签
        </ui-tag>
        <ui-tag type="warning">
          警告标签
        </ui-tag>
        <ui-tag type="danger">
          危险标签
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 不同尺寸 -->
    <ui-demo
      title="不同尺寸"
      description="标签有小、默认、大三种尺寸。"
      :code="sizeCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag size="small" type="primary">
          小型标签
        </ui-tag>
        <ui-tag type="primary">
          默认标签
        </ui-tag>
        <ui-tag size="large" type="primary">
          大型标签
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 可关闭标签 -->
    <ui-demo
      title="可关闭标签"
      description="设置 closable 属性可以定义一个标签是否可以关闭，关闭标签时会触发 close 事件。"
      :code="closableCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag
          v-for="(tag, index) in tags"
          :key="index"
          :type="tag.type"
          closable
          @close="removeTag(index)"
        >
          {{ tag.content }}
        </ui-tag>
        <p v-if="tags.length === 0" class="text-sm text-gray-500 italic">
          所有标签都已被移除
        </p>
      </div>
    </ui-demo>

    <!-- 可点击标签 -->
    <ui-demo
      title="可点击标签"
      description="设置 clickable 属性可以定义一个标签是否可以点击，点击标签时会触发 click 事件。"
      :code="clickableCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag clickable @click="handleClick('默认')">
          默认点击
        </ui-tag>
        <ui-tag type="primary" clickable @click="handleClick('主要')">
          主要点击
        </ui-tag>
        <ui-tag type="success" clickable @click="handleClick('成功')">
          成功点击
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 圆角标签 -->
    <ui-demo
      title="圆角标签"
      description="设置 round 属性可以让标签显示为圆角形状。"
      :code="roundCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag round>
          圆角标签
        </ui-tag>
        <ui-tag type="primary" round>
          圆角主要
        </ui-tag>
        <ui-tag type="success" round>
          圆角成功
        </ui-tag>
        <ui-tag type="danger" round closable>
          圆角可关闭
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 带图标标签 -->
    <ui-demo
      title="带图标标签"
      description="设置 icon 属性可以在标签内容前添加图标。"
      :code="iconCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag icon="carbon:user">
          用户
        </ui-tag>
        <ui-tag type="primary" icon="carbon:location">
          位置
        </ui-tag>
        <ui-tag type="success" icon="carbon:checkmark">
          完成
        </ui-tag>
        <ui-tag type="warning" icon="carbon:warning">
          警告
        </ui-tag>
        <ui-tag type="danger" icon="carbon:close">
          错误
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 自定义样式标签 -->
    <ui-demo
      title="自定义样式标签"
      description="可以通过 color、bg-color 和 border-color 属性设置标签的样式。"
      :code="customCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag color="#8B5CF6" bg-color="#F5F3FF">
          紫色标签
        </ui-tag>
        <ui-tag color="#FF6B4A" bg-color="#FFF1EE">
          橙红色标签
        </ui-tag>
        <ui-tag color="#0EA5E9" bg-color="#E0F2FE" border-color="#BAE6FD" bordered>
          天蓝色标签
        </ui-tag>
        <ui-tag color="white" bg-color="#374151">
          深灰色标签
        </ui-tag>
        <ui-tag color="#047857" bg-color="#ECFDF5" border-color="#A7F3D0" bordered>
          翠绿色标签
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 禁用状态 -->
    <ui-demo
      title="禁用状态"
      description="设置 disabled 属性可以禁用标签，禁用后的标签不可点击。"
      :code="disabledCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag disabled>
          禁用标签
        </ui-tag>
        <ui-tag type="primary" disabled>
          禁用主要
        </ui-tag>
        <ui-tag type="danger" disabled closable>
          禁用关闭
        </ui-tag>
        <ui-tag disabled clickable>
          禁用点击
        </ui-tag>
      </div>
    </ui-demo>

    <!-- 最大宽度和内容截断 -->
    <ui-demo
      title="最大宽度和内容截断"
      description="设置 max-width 属性可以限制标签的最大宽度，超出部分会被截断。"
      :code="maxWidthCode"
    >
      <div class="flex flex-wrap items-center gap-3">
        <ui-tag max-width="100px">
          这是一个内容很长的标签，将会被截断显示
        </ui-tag>
        <ui-tag type="primary" max-width="120px">
          这是另一个内容很长的标签，将会被截断显示
        </ui-tag>
        <ui-tag type="success" max-width="80px" closable>
          这是可关闭的长内容标签
        </ui-tag>
      </div>
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-4 text-xl font-bold">
        API 参考
      </h2>

      <h3 class="mb-2 text-lg font-medium">
        属性
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                属性名
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
                type
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                标签类型
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default' / 'primary' / 'success' / 'warning' / 'danger'
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
                标签尺寸
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'small' / 'default' / 'large'
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                'default'
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                closable
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否可关闭
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
                round
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否为圆角标签
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
                icon
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                图标名称
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
                max-width
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                最大宽度
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
                color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                文字颜色
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
                bg-color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                背景颜色
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
                border-color
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                边框颜色
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
                bordered
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                是否显示边框
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                boolean
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                false
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-2 mt-6 text-lg font-medium">
        事件
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                事件名
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
                close
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                关闭标签时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (event: MouseEvent)
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                click
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                点击标签时触发
              </td>
              <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                (event: MouseEvent)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  font-family: var(--ui-font-family, system-ui, sans-serif);
  color: var(--ui-color-text);
}

.demo-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
}

.demo-item {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.demo-code {
  border-radius: 6px;
  margin-top: 12px;
  overflow-x: auto;
}

.demo-hint {
  color: var(--ui-color-text-light);
  font-style: italic;
  margin: 0;
}
</style>
