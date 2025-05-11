<script setup lang="ts" name="DemoAffix">
/**
 * Affix 组件演示
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19
 */

import { ref } from 'vue'

const affixed = ref(false)
const demoBlockRef = ref<HTMLElement | null>(null)

function handleChange(val: boolean) {
  affixed.value = val
}
</script>

<template>
  <div class="demo-container">
    <h2>Affix 固钉</h2>
    <p>将页面元素钉在可视范围。</p>

    <div class="demo-section">
      <h3>基础用法</h3>
      <p>最简单的用法，当页面滚动到一定位置时，元素会固定在页面顶部。</p>
      <div class="demo-block">
        <ui-affix :offset-top="80" @change="handleChange">
          <ui-button type="primary">
            固定在距离顶部 80px 的位置
          </ui-button>
        </ui-affix>
        <div class="demo-status">
          当前状态: {{ affixed ? '固定' : '未固定' }}
        </div>
      </div>

      <div class="demo-block">
        <h4>底部固定</h4>
        <ui-affix :offset-bottom="20">
          <ui-button type="primary">
            固定在距离底部 20px 的位置
          </ui-button>
        </ui-affix>
      </div>
    </div>

    <div class="demo-section">
      <h3>固定状态改变的回调</h3>
      <p>可以监听固定状态的改变，并做相应处理。</p>
      <div class="demo-block">
        <ui-affix :offset-top="120" @change="handleChange">
          <ui-button>
            <template v-if="affixed">
              固定中
            </template>
            <template v-else>
              未固定
            </template>
          </ui-button>
        </ui-affix>
      </div>
    </div>

    <div class="demo-section">
      <h3>指定容器</h3>
      <p>用 target 设置 Affix 需要监听其滚动事件的元素</p>
      <div ref="demoBlockRef" class="demo-block" style="height: 100px; overflow: auto; border: 1px solid #e8e8e8; padding: 10px;">
        <div style="height: 400px; padding-top: 60px;">
          <ui-affix :target="() => demoBlockRef as HTMLElement" :offset-top="10">
            <ui-button type="primary">
              固定在容器内距离顶部 10px 的位置
            </ui-button>
          </ui-affix>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>API 说明</h3>
      <h4>Affix Props</h4>
      <ul>
        <li><code>offsetTop</code>: 距离窗口顶部达到指定偏移量后触发</li>
        <li><code>offsetBottom</code>: 距离窗口底部达到指定偏移量后触发</li>
        <li><code>target</code>: 设置 Affix 需要监听其滚动事件的元素</li>
        <li><code>targetContainer</code>: 设置固定的区域范围</li>
        <li><code>z-index</code>: 设置 z-index</li>
        <li><code>disabled</code>: 是否禁用</li>
      </ul>

      <h4>Affix Events</h4>
      <ul>
        <li><code>change</code>: 固定状态改变时触发的事件</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  &-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  &-section {
    margin-bottom: 40px;
  }

  &-block {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }

  &-status {
    margin-top: 10px;
    color: #666;
  }
}

h2 {
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

h3 {
  margin: 20px 0 10px;
}

h4 {
  margin: 15px 0 10px;
}

code {
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 2px 4px;
  font-family: monospace;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}
</style>
