<script setup lang="ts" name="DemoResult">
/**
 * Result 组件演示
 * 创建日期: 2024-08-18
 * 作者: aiftt
 */

// 面板配置
const panels = ref([
  { title: '基本用法', active: true },
  { title: '不同状态', active: false },
  { title: '自定义图标和操作', active: false },
  { title: '自定义内容', active: false },
])
</script>

<template>
  <div class="demo-result">
    <ui-typography-title :level="2">
      Result 结果反馈
    </ui-typography-title>
    <ui-typography-paragraph>用于反馈操作结果，展示成功、警告、错误等状态。</ui-typography-paragraph>

    <ui-collapse v-model:active-panels="panels">
      <!-- 基本用法 -->
      <ui-collapse-panel :id="0" title="基本用法">
        <ui-typography-paragraph>最基本的成功结果反馈。</ui-typography-paragraph>
        <ui-result
          status="success"
          title="操作成功"
          sub-title="提交的内容已成功保存，请进入下一步操作。"
        >
          <template #extra>
            <ui-button type="primary">
              返回首页
            </ui-button>
            <ui-button>查看详情</ui-button>
          </template>
        </ui-result>

        <ui-divider>代码示例</ui-divider>
        <ui-code language="html">
          &lt;ui-result
          status="success"
          title="操作成功"
          sub-title="提交的内容已成功保存，请进入下一步操作。"
          &gt;
          &lt;template #extra&gt;
          &lt;ui-button type="primary"&gt;返回首页&lt;/ui-button&gt;
          &lt;ui-button&gt;查看详情&lt;/ui-button&gt;
          &lt;/template&gt;
          &lt;/ui-result&gt;
        </ui-code>
      </ui-collapse-panel>

      <!-- 不同状态 -->
      <ui-collapse-panel :id="1" title="不同状态">
        <ui-typography-paragraph>Result 组件支持四种状态：成功、错误、警告和信息。</ui-typography-paragraph>
        <ui-space direction="vertical" size="large" class="w-full">
          <ui-result
            status="success"
            title="成功状态"
            sub-title="操作已成功完成"
          />

          <ui-result
            status="error"
            title="错误状态"
            sub-title="提交的内容有错误，请检查修改后重试"
          />

          <ui-result
            status="warning"
            title="警告状态"
            sub-title="操作存在潜在风险，请确认"
          />

          <ui-result
            status="info"
            title="信息状态"
            sub-title="这是一条信息提示"
          />
        </ui-space>

        <ui-divider>代码示例</ui-divider>
        <ui-code language="html">
          &lt;ui-result
          status="success"
          title="成功状态"
          sub-title="操作已成功完成"
          /&gt;

          &lt;ui-result
          status="error"
          title="错误状态"
          sub-title="提交的内容有错误，请检查修改后重试"
          /&gt;

          &lt;ui-result
          status="warning"
          title="警告状态"
          sub-title="操作存在潜在风险，请确认"
          /&gt;

          &lt;ui-result
          status="info"
          title="信息状态"
          sub-title="这是一条信息提示"
          /&gt;
        </ui-code>
      </ui-collapse-panel>

      <!-- 自定义图标和操作 -->
      <ui-collapse-panel :id="2" title="自定义图标和操作">
        <ui-typography-paragraph>可以通过 icon 属性自定义图标，也可以自定义按钮组。</ui-typography-paragraph>
        <ui-result
          status="info"
          title="待支付"
          sub-title="您的订单已创建，请完成支付"
          icon="carbon:shopping-cart"
          icon-color="#1677ff"
        >
          <div class="my-4 text-lg font-bold">
            订单号：2024081812345
          </div>
          <template #extra>
            <ui-button type="primary">
              立即支付
            </ui-button>
            <ui-button>取消订单</ui-button>
          </template>
        </ui-result>

        <ui-divider>代码示例</ui-divider>
        <ui-code language="html">
          &lt;ui-result
          status="info"
          title="待支付"
          sub-title="您的订单已创建，请完成支付"
          icon="carbon:shopping-cart"
          icon-color="#1677ff"
          &gt;
          &lt;div class="my-4 text-lg font-bold"&gt;订单号：2024081812345&lt;/div&gt;
          &lt;template #extra&gt;
          &lt;ui-button type="primary"&gt;立即支付&lt;/ui-button&gt;
          &lt;ui-button&gt;取消订单&lt;/ui-button&gt;
          &lt;/template&gt;
          &lt;/ui-result&gt;
        </ui-code>
      </ui-collapse-panel>

      <!-- 自定义内容 -->
      <ui-collapse-panel :id="3" title="自定义内容">
        <ui-typography-paragraph>Result 组件可以容纳任何类型的内容。</ui-typography-paragraph>
        <ui-result
          status="error"
          title="提交失败"
          sub-title="请检查以下问题并重新提交"
        >
          <ui-card class="mx-auto max-w-lg w-full">
            <ui-typography-title :level="5">
              错误详情
            </ui-typography-title>
            <ui-space direction="vertical" class="mt-4">
              <div class="flex justify-between">
                <span class="text-red-500">• 用户名格式不正确</span>
                <ui-link href="#">
                  查看要求
                </ui-link>
              </div>
              <div class="flex justify-between">
                <span class="text-red-500">• 密码强度不足</span>
                <ui-link href="#">
                  修改密码
                </ui-link>
              </div>
              <div class="flex justify-between">
                <span class="text-red-500">• 邮箱地址已被使用</span>
                <ui-link href="#">
                  更换邮箱
                </ui-link>
              </div>
            </ui-space>
          </ui-card>
          <template #extra>
            <ui-button type="primary">
              重新提交
            </ui-button>
            <ui-button>返回</ui-button>
          </template>
        </ui-result>

        <ui-divider>代码示例</ui-divider>
        <ui-code language="html">
          &lt;ui-result
          status="error"
          title="提交失败"
          sub-title="请检查以下问题并重新提交"
          &gt;
          &lt;ui-card class="w-full max-w-lg mx-auto"&gt;
          &lt;ui-typography-title :level="5"&gt;错误详情&lt;/ui-typography-title&gt;
          &lt;ui-space direction="vertical" class="mt-4"&gt;
          &lt;div class="flex justify-between"&gt;
          &lt;span class="text-red-500"&gt;• 用户名格式不正确&lt;/span&gt;
          &lt;ui-link href="#"&gt;查看要求&lt;/ui-link&gt;
          &lt;/div&gt;
          &lt;div class="flex justify-between"&gt;
          &lt;span class="text-red-500"&gt;• 密码强度不足&lt;/span&gt;
          &lt;ui-link href="#"&gt;修改密码&lt;/ui-link&gt;
          &lt;/div&gt;
          &lt;div class="flex justify-between"&gt;
          &lt;span class="text-red-500"&gt;• 邮箱地址已被使用&lt;/span&gt;
          &lt;ui-link href="#"&gt;更换邮箱&lt;/ui-link&gt;
          &lt;/div&gt;
          &lt;/ui-space&gt;
          &lt;/ui-card&gt;
          &lt;template #extra&gt;
          &lt;ui-button type="primary"&gt;重新提交&lt;/ui-button&gt;
          &lt;ui-button&gt;返回&lt;/ui-button&gt;
          &lt;/template&gt;
          &lt;/ui-result&gt;
        </ui-code>
      </ui-collapse-panel>
    </ui-collapse>
  </div>
</template>
