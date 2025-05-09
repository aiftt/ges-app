<script setup lang="ts" name="DemoUpload">
/**
 * Upload上传组件演示
 * 创建日期: 2024-07-16
 * 作者: aiftt
 * 更新日期: 2024-07-16 - 初始实现
 */
import { ref } from 'vue'

// 定义UploadFile接口，与组件内的接口保持一致
interface UploadFile {
  uid: string
  name: string
  size: number
  type: string
  status: 'ready' | 'uploading' | 'success' | 'error'
  percentage: number
  response?: any
  raw?: File
  error?: string
  url?: string
}

// 文件列表
const fileList = ref<UploadFile[]>([])
const fileListPicture = ref<UploadFile[]>([])
const fileListCard = ref<UploadFile[]>([])
const fileListDrag = ref<UploadFile[]>([])

// 上传前处理
function beforeUpload(file: File): boolean | Promise<File | Blob> {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    throw new Error('只能上传图片文件!')
  }

  // 检查文件大小
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    throw new Error('图片大小不能超过 2MB!')
  }

  return true
}

// 监听上传成功
function handleSuccess(_response: any, file: UploadFile): void {
  console.warn('上传成功:', file.name)
}

// 监听上传错误
function handleError(_error: any, file: UploadFile): void {
  console.error('上传失败:', file.name)
}

// 监听文件预览
function handlePreview(file: UploadFile): void {
  if (file.url) {
    window.open(file.url)
  }
}

// 监听文件删除
function handleRemove(file: UploadFile): void {
  console.warn('文件已移除:', file.name)
}

// 监听文件数量超出限制
function handleExceed(files: File[], fileList: UploadFile[]): void {
  console.warn(`超过文件数量限制，最多上传 3 个文件，当前已有 ${fileList.length} 个文件`)
}
</script>

<template>
  <div>
    <ui-typography>
      <ui-typography-title :level="3">
        Upload 上传组件
      </ui-typography-title>
      <ui-typography-paragraph>Upload组件允许用户上传文件，支持单文件和多文件上传、自动上传和手动上传、拖拽上传和点击上传等多种模式。</ui-typography-paragraph>
    </ui-typography>

    <!-- 基础用法 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        基础用法
      </ui-typography-title>
      <ui-typography-paragraph>通过点击上传按钮触发文件选择对话框。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-upload
          v-model="fileList"
          action="/api/upload"
          :auto-upload="false"
          tips="支持单个或多个文件上传，文件大小不超过 2MB"
          multiple
          @success="handleSuccess"
          @error="handleError"
        />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-upload
  v-model="fileList"
  action="/api/upload"
  :auto-upload="false"
  tips="支持单个或多个文件上传，文件大小不超过 2MB"
  multiple
  @success="handleSuccess"
  @error="handleError"
/>` }}</code></pre>
      </div>
    </div>

    <!-- 图片列表样式 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        图片列表样式
      </ui-typography-title>
      <ui-typography-paragraph>通过 list-type 属性设置不同的列表样式。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-upload
          v-model="fileListPicture"
          action="/api/upload"
          list-type="picture"
          :auto-upload="false"
          tips="使用 list-type='picture' 显示缩略图"
          multiple
          accept="image/*"
          :before-upload="beforeUpload"
          @preview="handlePreview"
          @remove="handleRemove"
        />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-upload
  v-model="fileListPicture"
  action="/api/upload"
  list-type="picture"
  :auto-upload="false"
  tips="使用 list-type='picture' 显示缩略图"
  multiple
  accept="image/*"
  :before-upload="beforeUpload"
  @preview="handlePreview"
  @remove="handleRemove"
/>

// 上传前处理
function beforeUpload(file: File): boolean | Promise<File | Blob> {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    throw new Error('只能上传图片文件!')
  }

  // 检查文件大小
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    throw new Error('图片大小不能超过 2MB!')
  }

  return true
}` }}</code></pre>
      </div>
    </div>

    <!-- 照片墙样式 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        照片墙
      </ui-typography-title>
      <ui-typography-paragraph>使用 list-type="picture-card" 设置照片墙样式。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-upload
          v-model="fileListCard"
          action="/api/upload"
          list-type="picture-card"
          :auto-upload="false"
          tips="显示为卡片网格布局，最大只能上传 3 个文件"
          multiple
          accept="image/*"
          :limit="3"
          :before-upload="beforeUpload"
          @preview="handlePreview"
          @remove="handleRemove"
          @exceed="handleExceed"
        />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-upload
  v-model="fileListCard"
  action="/api/upload"
  list-type="picture-card"
  :auto-upload="false"
  tips="显示为卡片网格布局，最大只能上传 3 个文件"
  multiple
  accept="image/*"
  :limit="3"
  :before-upload="beforeUpload"
  @preview="handlePreview"
  @remove="handleRemove"
  @exceed="handleExceed"
/>

// 监听文件数量超出限制
function handleExceed(files: File[], fileList: UploadFile[]): void {
  console.warn(\`超过文件数量限制，最多上传 3 个文件，当前已有 \${fileList.length} 个文件\`)
}` }}</code></pre>
      </div>
    </div>

    <!-- 拖拽上传 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        拖拽上传
      </ui-typography-title>
      <ui-typography-paragraph>通过拖拽文件到指定区域来上传。</ui-typography-paragraph>
      <div class="demo-component">
        <ui-upload
          v-model="fileListDrag"
          action="/api/upload"

          :auto-upload="false"
          multiple drag
          tips="支持拖拽多个文件上传，或者点击选择"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>
      <div class="demo-code">
        <pre><code>{{ `<ui-upload
  v-model="fileListDrag"
  action="/api/upload"
  drag
  :auto-upload="false"
  multiple
  tips="支持拖拽多个文件上传，或者点击选择"
  @success="handleSuccess"
  @error="handleError"
/>` }}</code></pre>
      </div>
    </div>

    <!-- 只读/禁用状态 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        只读与禁用状态
      </ui-typography-title>
      <ui-typography-paragraph>通过 readonly 和 disabled 属性设置只读或禁用状态。</ui-typography-paragraph>
      <div class="demo-component">
        <div style="margin-bottom: 1rem;">
          <ui-upload
            v-model="fileList"
            action="/api/upload"
            readonly
            tips="只读状态，不能上传和删除"
          />
        </div>
        <div>
          <ui-upload
            v-model="fileList"
            action="/api/upload"
            disabled
            tips="禁用状态，不能上传和删除"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>{{ `<!-- 只读状态 -->
<ui-upload
  v-model="fileList"
  action="/api/upload"
  readonly
  tips="只读状态，不能上传和删除"
/>

<!-- 禁用状态 -->
<ui-upload
  v-model="fileList"
  action="/api/upload"
  disabled
  tips="禁用状态，不能上传和删除"
/>` }}</code></pre>
      </div>
    </div>

    <!-- 属性表格 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        属性
      </ui-typography-title>
      <table class="demo-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>modelValue / v-model</td>
            <td>已上传的文件列表</td>
            <td>UploadFile[]</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>action</td>
            <td>上传地址</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>method</td>
            <td>上传请求方法</td>
            <td>string</td>
            <td>post</td>
          </tr>
          <tr>
            <td>data</td>
            <td>上传额外参数</td>
            <td>Record&lt;string, any&gt;</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>是否支持多文件上传</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>auto-upload</td>
            <td>是否自动上传</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>drag</td>
            <td>是否启用拖拽上传</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>accept</td>
            <td>接受的文件类型</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>before-upload</td>
            <td>上传前的验证函数</td>
            <td>(file: File) => boolean | Promise&lt;File | Blob&gt;</td>
            <td>-</td>
          </tr>
          <tr>
            <td>max-size</td>
            <td>限制文件大小（字节）</td>
            <td>number</td>
            <td>0</td>
          </tr>
          <tr>
            <td>limit</td>
            <td>限制文件数量</td>
            <td>number</td>
            <td>0</td>
          </tr>
          <tr>
            <td>show-file-list</td>
            <td>是否显示文件列表</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>是否只读</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>list-type</td>
            <td>列表类型</td>
            <td>'text' | 'picture' | 'picture-card'</td>
            <td>text</td>
          </tr>
          <tr>
            <td>tips</td>
            <td>提示文本</td>
            <td>string</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 事件表格 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        事件
      </ui-typography-title>
      <table class="demo-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>文件列表变更时触发</td>
            <td>UploadFile[]</td>
          </tr>
          <tr>
            <td>change</td>
            <td>文件列表变更时触发</td>
            <td>(file: UploadFile, fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>remove</td>
            <td>文件被移除时触发</td>
            <td>(file: UploadFile, fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>success</td>
            <td>文件上传成功时触发</td>
            <td>(response: any, file: UploadFile, fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>error</td>
            <td>文件上传失败时触发</td>
            <td>(error: any, file: UploadFile, fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>progress</td>
            <td>文件上传进度变化时触发</td>
            <td>(event: ProgressEvent, file: UploadFile, fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>exceed</td>
            <td>文件超出数量限制时触发</td>
            <td>(files: File[], fileList: UploadFile[])</td>
          </tr>
          <tr>
            <td>preview</td>
            <td>点击文件预览时触发</td>
            <td>(file: UploadFile)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 暴露的方法 -->
    <div class="demo-section">
      <ui-typography-title :level="4">
        暴露的方法
      </ui-typography-title>
      <table class="demo-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>submit</td>
            <td>手动上传文件</td>
            <td>-</td>
          </tr>
          <tr>
            <td>upload</td>
            <td>手动上传文件（submit的别名）</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 32px;
}

.demo-component {
  margin-top: 16px;
  padding: 24px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}

.demo-code {
  margin-top: 16px;
  padding: 16px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
}

.demo-table th,
.demo-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.demo-table th {
  background-color: #f7f8fa;
  color: #606266;
  font-weight: 500;
}

.demo-table td {
  color: #606266;
}
</style>
