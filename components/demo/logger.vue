<script setup lang="ts" name="DemoLogger">
/**
 * 日志组件演示
 * 创建日期: 2023-12-06
 * 作者: aiftt
 */

// 导入日志工具
import logger from '~/utils/logger'

// 按钮点击时触发的日志方法
function logWithAutoDetect() {
  // 自动检测环境
  logger.info('这是自动检测环境的日志')
  logger.warn('这是自动检测环境的警告')
  logger.error('这是自动检测环境的错误', { code: 500 })
}

function logWithClient() {
  // 明确指定客户端日志
  logger.client.info('这是客户端日志')
  logger.client.warn('这是客户端警告')
  logger.client.error('这是客户端错误', { code: 500 })
}

function logWithServer() {
  // 明确指定服务端日志（在客户端环境下不会输出）
  logger.server.info('这是服务端日志')
  logger.server.warn('这是服务端警告')
  logger.server.error('这是服务端错误', { code: 500 })
}

function logWithChild() {
  // 创建子日志器
  const componentLogger = logger.child({ tag: 'demo-logger' })
  componentLogger.info('这是使用子日志器的日志')

  // 创建客户端子日志器
  const clientComponentLogger = logger.client.child({ tag: 'demo-logger-client' })
  clientComponentLogger.info('这是使用客户端子日志器的日志')
}

// 在组件挂载时记录日志
onMounted(() => {
  logger.info('DemoLogger组件已挂载')
})
</script>

<template>
  <div class="space-y-10">
    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        日志工具演示
      </h3>
      <p class="mb-4 text-gray-600 dark:text-gray-400">
        展示新的日志系统用法，所有日志将输出到控制台。
      </p>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <div class="flex flex-wrap gap-4">
          <ui-button type="primary" @click="logWithAutoDetect">
            自动检测环境
          </ui-button>
          <ui-button type="success" @click="logWithClient">
            客户端日志
          </ui-button>
          <ui-button type="warning" @click="logWithServer">
            服务端日志
          </ui-button>
          <ui-button type="info" @click="logWithChild">
            子日志器
          </ui-button>
        </div>
      </div>
    </section>

    <section>
      <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
        用法说明
      </h3>
      <div class="border rounded bg-white p-4 dark:bg-gray-800">
        <ui-typography-paragraph code>
          // 导入日志工具
          import logger from '~/utils/logger'

          // 自动检测环境
          logger.info('自动检测环境的日志')

          // 客户端日志（只在客户端环境输出）
          logger.client.info('客户端日志')

          // 服务端日志（只在服务端环境输出）
          logger.server.info('服务端日志')

          // 创建自定义标签的子日志器
          const moduleLogger = logger.child({ tag: 'module-name' })
          moduleLogger.info('模块日志')

          // 也可以创建客户端或服务端特定的子日志器
          const clientModuleLogger = logger.client.child({ tag: 'module-name' })
          clientModuleLogger.info('客户端模块日志')
        </ui-typography-paragraph>
      </div>
    </section>
  </div>
</template>
