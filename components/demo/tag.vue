<script setup lang="ts" name="DemoTag">
/**
 * Tag 标签组件演示
 * 创建日期: 2024-05-30
 * 作者: aiftt
 * 更新日期: 2024-05-30 - 初始版本
 * 更新日期: 2024-06-20 - 修改代码示例为ui-code组件
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
</script>

<template>
  <div class="demo-container">
    <h2 class="demo-title">
      Tag 标签
    </h2>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        基础用法
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag>默认标签</ui-tag>
<ui-tag type=&quot;primary&quot;>主要标签</ui-tag>
<ui-tag type=&quot;success&quot;>成功标签</ui-tag>
<ui-tag type=&quot;warning&quot;>警告标签</ui-tag>
<ui-tag type=&quot;danger&quot;>危险标签</ui-tag>"
        />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        不同尺寸
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag size=&quot;small&quot; type=&quot;primary&quot;>小型标签</ui-tag>
<ui-tag type=&quot;primary&quot;>默认标签</ui-tag>
<ui-tag size=&quot;large&quot; type=&quot;primary&quot;>大型标签</ui-tag>"
        />
      </div>
    </section>

    <!-- 可关闭标签 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        可关闭标签
      </h3>
      <div class="demo-item">
        <ui-tag
          v-for="(tag, index) in tags"
          :key="index"
          :type="tag.type"
          closable
          @close="removeTag(index)"
        >
          {{ tag.content }}
        </ui-tag>
        <p v-if="tags.length === 0" class="demo-hint">
          所有标签都已被移除
        </p>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag v-for=&quot;(tag, index) in tags&quot;
  :key=&quot;index&quot;
  :type=&quot;tag.type&quot;
  closable
  @close=&quot;removeTag(index)&quot;
>
  {{ tag.content }}
</ui-tag>"
        />
      </div>
    </section>

    <!-- 可点击标签 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        可点击标签
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag clickable @click=&quot;handleClick('默认')&quot;>默认点击</ui-tag>
<ui-tag type=&quot;primary&quot; clickable @click=&quot;handleClick('主要')&quot;>主要点击</ui-tag>
<ui-tag type=&quot;success&quot; clickable @click=&quot;handleClick('成功')&quot;>成功点击</ui-tag>"
        />
      </div>
    </section>

    <!-- 圆角标签 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        圆角标签
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag round>圆角标签</ui-tag>
<ui-tag type=&quot;primary&quot; round>圆角主要</ui-tag>
<ui-tag type=&quot;success&quot; round>圆角成功</ui-tag>
<ui-tag type=&quot;danger&quot; round closable>圆角可关闭</ui-tag>"
        />
      </div>
    </section>

    <!-- 带图标标签 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        带图标标签
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag icon=&quot;carbon:user&quot;>用户</ui-tag>
<ui-tag type=&quot;primary&quot; icon=&quot;carbon:location&quot;>位置</ui-tag>
<ui-tag type=&quot;success&quot; icon=&quot;carbon:checkmark&quot;>完成</ui-tag>
<ui-tag type=&quot;warning&quot; icon=&quot;carbon:warning&quot;>警告</ui-tag>
<ui-tag type=&quot;danger&quot; icon=&quot;carbon:close&quot;>错误</ui-tag>"
        />
      </div>
    </section>

    <!-- 自定义样式标签 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        自定义样式标签
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag color=&quot;#8B5CF6&quot; bg-color=&quot;#F5F3FF&quot;>紫色标签</ui-tag>
<ui-tag color=&quot;#FF6B4A&quot; bg-color=&quot;#FFF1EE&quot;>橙红色标签</ui-tag>
<ui-tag
  color=&quot;#0EA5E9&quot;
  bg-color=&quot;#E0F2FE&quot;
  border-color=&quot;#BAE6FD&quot;
  bordered
>天蓝色标签</ui-tag>
<ui-tag color=&quot;white&quot; bg-color=&quot;#374151&quot;>深灰色标签</ui-tag>
<ui-tag
  color=&quot;#047857&quot;
  bg-color=&quot;#ECFDF5&quot;
  border-color=&quot;#A7F3D0&quot;
  bordered
>翠绿色标签</ui-tag>"
        />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        禁用状态
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag disabled>禁用标签</ui-tag>
<ui-tag type=&quot;primary&quot; disabled>禁用主要</ui-tag>
<ui-tag type=&quot;danger&quot; disabled closable>禁用关闭</ui-tag>
<ui-tag disabled clickable>禁用点击</ui-tag>"
        />
      </div>
    </section>

    <!-- 最大宽度和内容截断 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        最大宽度和内容截断
      </h3>
      <div class="demo-item">
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
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-tag max-width=&quot;100px&quot;>这是一个内容很长的标签，将会被截断显示</ui-tag>
<ui-tag type=&quot;primary&quot; max-width=&quot;120px&quot;>这是另一个内容很长的标签，将会被截断显示</ui-tag>
<ui-tag type=&quot;success&quot; max-width=&quot;80px&quot; closable>这是可关闭的长内容标签</ui-tag>"
        />
      </div>
    </section>
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
