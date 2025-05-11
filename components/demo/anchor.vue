<script setup lang="ts" name="DemoAnchor">
/**
 * Anchor 组件演示
 * 创建日期: 2024-08-19
 * 作者: Claude
 * 更新日期: 2024-08-19
 */

import { ref } from 'vue'
import logger from '~/utils/logger'

const currentLink = ref('section-1')

function handleLinkChange(link: string, prev: string) {
  currentLink.value = link
  logger.debug('当前链接改变:', link, '前一个链接:', prev)
}

function handleClick(e: Event, link: string) {
  logger.debug('点击链接:', link)
}

// 预定义的锚点链接
const anchors = [
  {
    href: '#section-1',
    title: '基础锚点',
  },
  {
    href: '#section-2',
    title: '固定位置',
    children: [
      {
        href: '#section-2-1',
        title: '顶部固定',
      },
      {
        href: '#section-2-2',
        title: '底部固定',
      },
    ],
  },
  {
    href: '#section-3',
    title: '自定义样式',
  },
  {
    href: '#section-4',
    title: 'API',
  },
]
</script>

<template>
  <div class="demo-container">
    <!-- 锚点菜单 -->
    <ui-affix style="position: absolute; right: 20px; top: 30px; z-index: 1000">
      <div style="padding: 10px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15)">
        <ui-anchor
          :bounds="5"
          :target-offset="60"
          :offset-top="30"
          :affix="false"
          @change="handleLinkChange"
          @click="handleClick"
        >
          <ui-anchor-link href="#section-1" title="基础锚点" />
          <ui-anchor-link href="#section-2" title="固定位置">
            <ui-anchor-link href="#section-2-1" title="顶部固定" />
            <ui-anchor-link href="#section-2-2" title="底部固定" />
          </ui-anchor-link>
          <ui-anchor-link href="#section-3" title="自定义样式" />
          <ui-anchor-link href="#section-4" title="API" />
        </ui-anchor>
      </div>
    </ui-affix>

    <h2>Anchor 锚点</h2>
    <p>用于跳转到页面指定位置的导航组件。</p>

    <!-- 锚点内容 -->
    <div class="anchor-content">
      <div id="section-1" class="section">
        <h2>基础锚点</h2>
        <p>最简单的用法，通过锚点可快速定位到指定内容区域。</p>
        <div class="demo-block">
          <ui-anchor :offset-top="30">
            <ui-anchor-link href="#section-1" title="基础锚点" />
            <ui-anchor-link href="#section-2" title="固定位置" />
            <ui-anchor-link href="#section-3" title="自定义样式" />
            <ui-anchor-link href="#section-4" title="API" />
          </ui-anchor>
        </div>
      </div>

      <div id="section-2" class="section">
        <h2>固定位置</h2>
        <p>可以设置锚点组件固定显示在页面特定位置。</p>

        <div id="section-2-1" class="sub-section">
          <h3>使用 affix 属性实现顶部固定</h3>
          <div class="demo-block">
            <p>默认值为 true，锚点组件会固定在页面顶部。</p>
            <ui-anchor :offset-top="80" :affix="true" />
          </div>
        </div>

        <div id="section-2-2" class="sub-section">
          <h3>使用预设数据自动生成锚点</h3>
          <div class="demo-block">
            <p>可以通过 items 属性来自动生成锚点导航。</p>
            <ui-anchor :items="anchors" />
          </div>
        </div>
      </div>

      <div id="section-3" class="section">
        <h2>自定义样式</h2>
        <p>可以自定义锚点的样式，如显示或隐藏小圆点，自定义高亮样式等。</p>
        <div class="demo-block">
          <ui-anchor :show-ink-ball="false" active-class="my-active-link">
            <ui-anchor-link href="#section-1" title="基础锚点" />
            <ui-anchor-link href="#section-2" title="固定位置" />
            <ui-anchor-link href="#section-3" title="自定义样式" />
            <ui-anchor-link href="#section-4" title="API" />
          </ui-anchor>

          <p style="margin-top: 20px">
            当前激活的链接: {{ currentLink }}
          </p>
        </div>
      </div>

      <div id="section-4" class="section">
        <h2>API</h2>

        <h3>Anchor Props</h3>
        <ul>
          <li><code>bounds</code>: 锚点区域边界，单位为像素</li>
          <li><code>activeClass</code>: 自定义高亮类名</li>
          <li><code>targetOffset</code>: 指定滚动到锚点区域的偏移量</li>
          <li><code>scrollOffset</code>: 锚点滚动偏移量，默认与 targetOffset 相同</li>
          <li><code>container</code>: 指定监听滚动的容器</li>
          <li><code>showInkBall</code>: 是否显示小圆点</li>
          <li><code>affix</code>: 固定模式</li>
          <li><code>offsetTop</code>: 固定模式的偏移量</li>
          <li><code>items</code>: 向 Anchor 组件添加链接的方式</li>
        </ul>

        <h3>Anchor Events</h3>
        <ul>
          <li><code>change</code>: 锚点链接改变时触发事件</li>
          <li><code>click</code>: 点击锚点链接时触发事件</li>
        </ul>

        <h3>AnchorLink Props</h3>
        <ul>
          <li><code>href</code>: 锚点链接</li>
          <li><code>title</code>: 链接标题</li>
        </ul>

        <h3>AnchorLink Events</h3>
        <ul>
          <li><code>click</code>: 点击锚点链接时触发事件</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  &-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
  }

  &-block {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }
}

.anchor-content {
  margin-right: 160px;
}

.section {
  min-height: 300px;
  padding: 20px 0;
  border-bottom: 1px dashed #e8e8e8;

  &:last-child {
    border-bottom: none;
  }
}

.sub-section {
  margin: 30px 0;
  padding-left: 20px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 16px 0;
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
  margin-bottom: 8px;
}

:deep(.my-active-link) {
  color: #ff4d4f !important;
  font-weight: bold;
}
</style>
