<script setup lang="ts" name="DemoSkeleton">
/**
 * 骨架屏组件示例
 * 创建日期: 2024-08-16
 * 作者: aiftt
 */

import { ref } from 'vue'

// 控制loading状态
const loading = ref(true)

// 切换加载状态
function toggleLoading() {
  loading.value = !loading.value
}

// 定时切换加载状态，模拟数据加载
function simulateLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="demo-skeleton">
    <h2>Skeleton 骨架屏</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <p>用于在页面加载过程中显示占位图形，提高用户体验</p>

      <div class="demo-control">
        <ui-button @click="toggleLoading">
          切换加载状态
        </ui-button>
        <ui-button @click="simulateLoading">
          模拟加载 (2秒)
        </ui-button>
        <span class="loading-status">当前状态: {{ loading ? '加载中' : '加载完成' }}</span>
      </div>

      <div class="demo-block">
        <ui-skeleton :loading="loading" type="text">
          <div class="content-block">
            已加载的文本内容
          </div>
        </ui-skeleton>
      </div>
    </div>

    <div class="demo-section">
      <h3>不同类型骨架屏</h3>

      <div class="demo-row">
        <div class="demo-col">
          <h4>文本 (text)</h4>
          <ui-skeleton type="text" />
        </div>

        <div class="demo-col">
          <h4>按钮 (button)</h4>
          <ui-skeleton type="button" />
        </div>

        <div class="demo-col">
          <h4>头像 (avatar)</h4>
          <ui-skeleton type="avatar" shape="circle" />
        </div>
      </div>

      <div class="demo-row">
        <div class="demo-col">
          <h4>段落 (paragraph)</h4>
          <ui-skeleton type="paragraph" :rows="3" />
        </div>

        <div class="demo-col">
          <h4>图片 (image)</h4>
          <ui-skeleton type="image" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>复合骨架屏</h3>

      <div class="demo-row">
        <div class="demo-col">
          <h4>卡片 (card)</h4>
          <ui-skeleton type="card" title />
        </div>

        <div class="demo-col">
          <h4>列表 (list)</h4>
          <ui-skeleton type="list" title />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>动画效果</h3>

      <div class="demo-row">
        <div class="demo-col">
          <h4>有动画</h4>
          <ui-skeleton type="paragraph" :rows="3" animated />
        </div>

        <div class="demo-col">
          <h4>无动画</h4>
          <ui-skeleton type="paragraph" :rows="3" :animated="false" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义样式</h3>

      <div class="demo-row">
        <div class="demo-col">
          <h4>自定义背景色</h4>
          <ui-skeleton
            type="paragraph"
            :rows="2"
            background-color="var(--ui-color-primary-200)"
            animate-color="rgba(255, 255, 255, 0.5)"
          />
        </div>

        <div class="demo-col">
          <h4>自定义尺寸和圆角</h4>
          <ui-skeleton
            type="button"
            width="200px"
            height="50px"
            radius="25px"
          />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>综合示例</h3>

      <div class="demo-block">
        <ui-skeleton :loading="loading" type="custom">
          <template #skeleton>
            <div class="custom-skeleton">
              <div class="custom-skeleton-header">
                <ui-skeleton type="avatar" shape="circle" width="50px" height="50px" />
                <div class="custom-skeleton-info">
                  <ui-skeleton type="text" width="150px" />
                  <ui-skeleton type="text" width="100px" />
                </div>
              </div>
              <ui-skeleton type="paragraph" :rows="4" />
              <div class="custom-skeleton-footer">
                <ui-skeleton type="button" width="80px" height="32px" />
                <ui-skeleton type="button" width="80px" height="32px" />
              </div>
            </div>
          </template>

          <div class="content-block">
            <div class="content-header">
              <ui-avatar src="https://via.placeholder.com/50" />
              <div class="content-info">
                <div class="content-title">
                  用户名称
                </div>
                <div class="content-subtitle">
                  发布于 2024-08-16
                </div>
              </div>
            </div>
            <div class="content-body">
              <p>这是一段示例内容，用于展示骨架屏加载完成后的实际内容。骨架屏组件可以提升用户在等待内容加载时的体验。</p>
              <p>当数据加载完成后，实际内容会替换占位的骨架屏，让用户感受到更流畅的页面过渡。</p>
            </div>
            <div class="content-footer">
              <ui-button size="small">
                点赞
              </ui-button>
              <ui-button size="small">
                评论
              </ui-button>
            </div>
          </div>
        </ui-skeleton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-skeleton {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .demo-section {
    margin-bottom: 40px;

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--ui-color-text-secondary);
    }

    p {
      margin-bottom: 16px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-control {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    gap: 12px;

    .loading-status {
      margin-left: 8px;
      font-size: 14px;
      color: var(--ui-color-text-secondary);
    }
  }

  .demo-block {
    padding: 24px;
    border: 1px solid var(--ui-color-border);
    border-radius: 8px;
    background-color: var(--ui-color-bg-card);
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;
    margin-bottom: 24px;
  }

  .demo-col {
    padding: 0 12px;
    margin-bottom: 24px;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  .content-block {
    min-height: 200px;

    .content-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .content-info {
      margin-left: 12px;
    }

    .content-title {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .content-subtitle {
      font-size: 12px;
      color: var(--ui-color-text-secondary);
    }

    .content-body {
      margin-bottom: 16px;

      p {
        margin-bottom: 12px;
      }
    }

    .content-footer {
      display: flex;
      gap: 12px;
    }
  }

  .custom-skeleton {
    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    &-info {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-footer {
      margin-top: 16px;
      display: flex;
      gap: 12px;
    }
  }
}
</style>
