<script setup lang="ts" name="DemoBadge">
/**
 * Badge 徽章组件演示
 * 创建日期: 2024-06-20
 * 作者: aiftt
 * 更新日期: 2024-06-20 - 初始版本
 */

import { ref } from 'vue'

// 管理计数器值
const count = ref(12)

// 增加计数
function increment() {
  count.value += 1
}

// 减少计数
function decrement() {
  if (count.value > 0) {
    count.value -= 1
  }
}
</script>

<template>
  <div class="demo-container">
    <h2 class="demo-title">
      Badge 徽章
    </h2>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        基础用法
      </h3>
      <div class="demo-item">
        <ui-badge :value="5">
          <div class="demo-box">
            默认
          </div>
        </ui-badge>
        <ui-badge :value="0">
          <div class="demo-box">
            零值
          </div>
        </ui-badge>
        <ui-badge value="hot">
          <div class="demo-box">
            文本
          </div>
        </ui-badge>
        <ui-badge :value="count">
          <div class="demo-box">
            动态值
          </div>
        </ui-badge>
        <div class="demo-control">
          <ui-button size="small" @click="decrement">
            -
          </ui-button>
          <span class="mx-2">{{ count }}</span>
          <ui-button size="small" @click="increment">
            +
          </ui-button>
        </div>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot;>
  <div class=&quot;box&quot;>默认</div>
</ui-badge>

<ui-badge :value=&quot;0&quot;>
  <div class=&quot;box&quot;>零值</div>
</ui-badge>

<ui-badge value=&quot;hot&quot;>
  <div class=&quot;box&quot;>文本</div>
</ui-badge>

<ui-badge :value=&quot;count&quot;>
  <div class=&quot;box&quot;>动态值</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 最大值 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        最大值
      </h3>
      <div class="demo-item">
        <ui-badge :value="99" :max="10">
          <div class="demo-box">
            最大值 10
          </div>
        </ui-badge>
        <ui-badge :value="200" :max="99">
          <div class="demo-box">
            最大值 99
          </div>
        </ui-badge>
        <ui-badge :value="1000" :max="999">
          <div class="demo-box">
            最大值 999
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;99&quot; :max=&quot;10&quot;>
  <div class=&quot;box&quot;>最大值 10</div>
</ui-badge>

<ui-badge :value=&quot;200&quot; :max=&quot;99&quot;>
  <div class=&quot;box&quot;>最大值 99</div>
</ui-badge>

<ui-badge :value=&quot;1000&quot; :max=&quot;999&quot;>
  <div class=&quot;box&quot;>最大值 999</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 徽章类型 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        徽章类型
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" type="primary">
          <div class="demo-box">
            主要
          </div>
        </ui-badge>
        <ui-badge :value="5" type="success">
          <div class="demo-box">
            成功
          </div>
        </ui-badge>
        <ui-badge :value="5" type="warning">
          <div class="demo-box">
            警告
          </div>
        </ui-badge>
        <ui-badge :value="5" type="danger">
          <div class="demo-box">
            危险
          </div>
        </ui-badge>
        <ui-badge :value="5" type="info">
          <div class="demo-box">
            信息
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; type=&quot;primary&quot;>
  <div class=&quot;box&quot;>主要</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; type=&quot;success&quot;>
  <div class=&quot;box&quot;>成功</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; type=&quot;warning&quot;>
  <div class=&quot;box&quot;>警告</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; type=&quot;danger&quot;>
  <div class=&quot;box&quot;>危险</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; type=&quot;info&quot;>
  <div class=&quot;box&quot;>信息</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 小圆点 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        小圆点
      </h3>
      <div class="demo-item">
        <ui-badge is-dot>
          <div class="demo-box">
            默认
          </div>
        </ui-badge>
        <ui-badge is-dot type="primary">
          <div class="demo-box">
            主要
          </div>
        </ui-badge>
        <ui-badge is-dot type="success">
          <div class="demo-box">
            成功
          </div>
        </ui-badge>
        <ui-badge is-dot type="warning">
          <div class="demo-box">
            警告
          </div>
        </ui-badge>
        <ui-badge is-dot type="info">
          <div class="demo-box">
            信息
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge is-dot>
  <div class=&quot;box&quot;>默认</div>
</ui-badge>

<ui-badge is-dot type=&quot;primary&quot;>
  <div class=&quot;box&quot;>主要</div>
</ui-badge>

<ui-badge is-dot type=&quot;success&quot;>
  <div class=&quot;box&quot;>成功</div>
</ui-badge>

<ui-badge is-dot type=&quot;warning&quot;>
  <div class=&quot;box&quot;>警告</div>
</ui-badge>

<ui-badge is-dot type=&quot;info&quot;>
  <div class=&quot;box&quot;>信息</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 位置 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        徽章位置
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" position="top-right">
          <div class="demo-box">
            右上角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="top-left">
          <div class="demo-box">
            左上角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="bottom-right">
          <div class="demo-box">
            右下角
          </div>
        </ui-badge>
        <ui-badge :value="5" position="bottom-left">
          <div class="demo-box">
            左下角
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; position=&quot;top-right&quot;>
  <div class=&quot;box&quot;>右上角</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; position=&quot;top-left&quot;>
  <div class=&quot;box&quot;>左上角</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; position=&quot;bottom-right&quot;>
  <div class=&quot;box&quot;>右下角</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; position=&quot;bottom-left&quot;>
  <div class=&quot;box&quot;>左下角</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 自定义偏移 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        自定义偏移
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" :offset="[10, 10]">
          <div class="demo-box">
            偏移 [10, 10]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[20, 0]">
          <div class="demo-box">
            偏移 [20, 0]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[0, 20]">
          <div class="demo-box">
            偏移 [0, 20]
          </div>
        </ui-badge>
        <ui-badge :value="5" :offset="[-10, -10]" position="bottom-left">
          <div class="demo-box">
            负偏移 [-10, -10]
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; :offset=&quot;[10, 10]&quot;>
  <div class=&quot;box&quot;>偏移 [10, 10]</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; :offset=&quot;[20, 0]&quot;>
  <div class=&quot;box&quot;>偏移 [20, 0]</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; :offset=&quot;[0, 20]&quot;>
  <div class=&quot;box&quot;>偏移 [0, 20]</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; :offset=&quot;[-10, -10]&quot; position=&quot;bottom-left&quot;>
  <div class=&quot;box&quot;>负偏移 [-10, -10]</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        自定义颜色
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" bg-color="#8B5CF6">
          <div class="demo-box">
            紫色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#EC4899" color="#FFFFFF">
          <div class="demo-box">
            粉色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#34D399" color="#064E3B">
          <div class="demo-box">
            绿色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#FBBF24" color="#92400E">
          <div class="demo-box">
            橙色
          </div>
        </ui-badge>
        <ui-badge :value="5" bg-color="#FFFFFF" color="#374151" bordered>
          <div class="demo-box">
            白色带边框
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; bg-color=&quot;#8B5CF6&quot;>
  <div class=&quot;box&quot;>紫色</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; bg-color=&quot;#EC4899&quot; color=&quot;#FFFFFF&quot;>
  <div class=&quot;box&quot;>粉色</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; bg-color=&quot;#34D399&quot; color=&quot;#064E3B&quot;>
  <div class=&quot;box&quot;>绿色</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; bg-color=&quot;#FBBF24&quot; color=&quot;#92400E&quot;>
  <div class=&quot;box&quot;>橙色</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; bg-color=&quot;#FFFFFF&quot; color=&quot;#374151&quot; bordered>
  <div class=&quot;box&quot;>白色带边框</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 独立使用 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        独立使用
      </h3>
      <div class="grid grid-cols-8 gap-2">
        <ui-badge :value="5" />
        <ui-badge value="new" />
        <ui-badge is-dot />
        <ui-badge is-dot type="success" />
        <ui-badge :value="99" :max="10" type="warning" />
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; />
<ui-badge value=&quot;new&quot; />
<ui-badge is-dot />
<ui-badge is-dot type=&quot;success&quot; />
<ui-badge :value=&quot;99&quot; :max=&quot;10&quot; type=&quot;warning&quot; />"
        />
      </div>
    </section>

    <!-- 隐藏徽章 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        隐藏徽章
      </h3>
      <div class="demo-item">
        <ui-badge :value="0" :hidden="true">
          <div class="demo-box">
            强制隐藏
          </div>
        </ui-badge>
        <ui-badge :value="count" :hidden="count === 0">
          <div class="demo-box">
            计数为0时隐藏
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;0&quot; :hidden=&quot;true&quot;>
  <div class=&quot;box&quot;>强制隐藏</div>
</ui-badge>

<ui-badge :value=&quot;count&quot; :hidden=&quot;count === 0&quot;>
  <div class=&quot;box&quot;>计数为0时隐藏</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 非圆形徽章 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        非圆形徽章
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" :round="false">
          <div class="demo-box">
            方形
          </div>
        </ui-badge>
        <ui-badge value="NEW" :round="false" type="primary">
          <div class="demo-box">
            文本
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; :round=&quot;false&quot;>
  <div class=&quot;box&quot;>方形</div>
</ui-badge>

<ui-badge value=&quot;NEW&quot; :round=&quot;false&quot; type=&quot;primary&quot;>
  <div class=&quot;box&quot;>文本</div>
</ui-badge>"
        />
      </div>
    </section>

    <!-- 带边框徽章 -->
    <section class="demo-section">
      <h3 class="demo-section-title">
        带边框徽章
      </h3>
      <div class="demo-item">
        <ui-badge :value="5" bordered>
          <div class="demo-box">
            默认边框
          </div>
        </ui-badge>
        <ui-badge :value="5" bordered border-color="#3B82F6">
          <div class="demo-box">
            蓝色边框
          </div>
        </ui-badge>
        <ui-badge :value="5" bordered border-color="#10B981" bg-color="#FFFFFF" color="#10B981">
          <div class="demo-box">
            绿色边框白底
          </div>
        </ui-badge>
      </div>
      <div class="demo-code">
        <ui-code
          lang="html" code="<ui-badge :value=&quot;5&quot; bordered>
  <div class=&quot;box&quot;>默认边框</div>
</ui-badge>

<ui-badge :value=&quot;5&quot; bordered border-color=&quot;#3B82F6&quot;>
  <div class=&quot;box&quot;>蓝色边框</div>
</ui-badge>

<ui-badge
  :value=&quot;5&quot;
  bordered
  border-color=&quot;#10B981&quot;
  bg-color=&quot;#FFFFFF&quot;
  color=&quot;#10B981&quot;
>
  <div class=&quot;box&quot;>绿色边框白底</div>
</ui-badge>"
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
  gap: 16px;
  margin-bottom: 16px;
  align-items: flex-start;
}

.demo-box {
  width: 80px;
  height: 80px;
  background-color: var(--ui-color-bg-light);
  border: 1px solid var(--ui-color-border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--ui-color-text);
}

.demo-code {
  border-radius: 6px;
  margin-top: 12px;
  overflow-x: auto;
}

.demo-control {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
</style>
