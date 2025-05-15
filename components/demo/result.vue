<script setup lang="ts" name="DemoResult">
/**
 * Result 组件演示
 * 创建日期: 2024-08-18
 * 作者: aiftt
 * 更新日期: 2024-12-08 - 使用ui-demo组件重构演示页面
 */

// 基础用法代码示例
const basicCode = `<ui-result
  status="success"
  title="操作成功"
  sub-title="提交的内容已成功保存，请进入下一步操作。"
>
  <template #extra>
    <ui-button type="primary">返回首页</ui-button>
    <ui-button>查看详情</ui-button>
  </template>
</ui-result>`

// 不同状态代码示例
const statusCode = `<ui-result
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
/>`

// 自定义图标和操作代码示例
const customIconCode = `<ui-result
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
    <ui-button type="primary">立即支付</ui-button>
    <ui-button>取消订单</ui-button>
  </template>
</ui-result>`

// 自定义内容代码示例
const customContentCode = `<ui-result
  status="error"
  title="提交失败"
  sub-title="请检查以下问题并重新提交"
>
  <ui-card class="w-full max-w-lg mx-auto">
    <ui-typography-title :level="5">
      错误详情
    </ui-typography-title>
    <ui-space direction="vertical" class="mt-4">
      <div class="flex justify-between">
        <span class="text-red-500">• 用户名格式不正确</span>
        <ui-link href="#">查看要求</ui-link>
      </div>
      <div class="flex justify-between">
        <span class="text-red-500">• 密码强度不足</span>
        <ui-link href="#">修改密码</ui-link>
      </div>
      <div class="flex justify-between">
        <span class="text-red-500">• 邮箱地址已被使用</span>
        <ui-link href="#">更换邮箱</ui-link>
      </div>
    </ui-space>
  </ui-card>
  <template #extra>
    <ui-button type="primary">重新提交</ui-button>
    <ui-button>返回</ui-button>
  </template>
</ui-result>`
</script>

<template>
  <div class="p-4">
    <h2 class="mb-6 text-2xl font-bold">
      Result 结果反馈
    </h2>
    <p class="mb-8 text-gray-500 dark:text-gray-400">
      用于反馈操作结果，展示成功、警告、错误等状态。
    </p>

    <!-- 基本用法 -->
    <ui-demo
      title="基本用法"
      description="最基本的成功结果反馈，展示操作完成后的结果。"
      :code="basicCode"
    >
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
    </ui-demo>

    <!-- 不同状态 -->
    <ui-demo
      title="不同状态"
      description="Result 组件支持四种状态：成功（success）、错误（error）、警告（warning）和信息（info）。"
      :code="statusCode"
    >
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
    </ui-demo>

    <!-- 自定义图标和操作 -->
    <ui-demo
      title="自定义图标和操作"
      description="可以通过 icon 属性自定义图标，也可以自定义按钮组和额外内容。"
      :code="customIconCode"
    >
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
    </ui-demo>

    <!-- 自定义内容 -->
    <ui-demo
      title="自定义内容"
      description="Result 组件可以容纳任何类型的内容，灵活展示不同场景下的反馈信息。"
      :code="customContentCode"
    >
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
    </ui-demo>

    <!-- API 参考 -->
    <div class="mt-8 border border-gray-200 rounded-lg bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold">
        API 参考
      </h3>

      <div class="mb-6">
        <h4 class="mb-2 text-lg font-medium">
          属性
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  属性
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
                  status
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  结果状态，决定图标和颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'success' | 'error' | 'info' | 'warning'
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  'info'
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  title
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  标题
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
                  sub-title
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  副标题
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
                  icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义图标
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
                  icon-color
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  图标颜色
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  string
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-lg font-medium">
          插槽
        </h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  名称
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left dark:border-gray-600">
                  说明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  default
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义内容，显示在标题和副标题下方
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  extra
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  操作区域，通常放置按钮等元素
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  icon
                </td>
                <td class="border border-gray-300 px-4 py-2 dark:border-gray-600">
                  自定义图标区域
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
