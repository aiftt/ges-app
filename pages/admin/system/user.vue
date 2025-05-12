<script setup lang="ts" name="UserManagement">
import type { IUser } from '~/server/types'
/**
 * 用户管理页面
 * 创建日期: 2024-12-01
 * 作者: aiftt
 */
import { useLogger } from '~/composables/useLogger'
import { useMessageBox } from '~/composables/useMessageBox'

// 创建日志记录器
const logger = useLogger('user-management')

// 创建消息弹框实例
const messageBox = useMessageBox()

// 页面元数据
definePageMeta({
  title: '用户管理',
  layout: 'admin',
})

// 用户列表数据
const userList = ref<IUser[]>([])

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

// 查询参数
const queryParams = reactive({
  username: '',
  status: '',
  email: '',
  createTimeRange: [] as Date[],
})

// 加载状态
const loading = ref(false)

// 显示添加/编辑对话框
const showUserDialog = ref(false)

// 当前编辑的用户
const currentUser = ref<Partial<IUser>>({})

// 对话框模式（添加/编辑）
const dialogMode = ref<'add' | 'edit'>('add')

// 选择的用户IDs（批量操作用）
const selectedUserIds = ref<string[]>([])

// 获取用户列表
async function fetchUsers() {
  try {
    loading.value = true

    // 构建查询参数
    const params = new URLSearchParams()
    params.append('page', pagination.page.toString())
    params.append('pageSize', pagination.pageSize.toString())

    if (queryParams.username) {
      params.append('username', queryParams.username)
    }

    if (queryParams.status) {
      params.append('status', queryParams.status)
    }

    if (queryParams.email) {
      params.append('email', queryParams.email)
    }

    // TODO: 调用实际API
    const response = await fetch(`/api/users?${params.toString()}`)
    const result = await response.json()

    if (result.success) {
      userList.value = result.data.items
      pagination.total = result.data.total
    }
    else {
      // 处理错误
      logger.error('获取用户列表失败', result.message)
    }
  }
  catch (error) {
    logger.error('获取用户列表异常', error)
    // 使用模拟数据
    userList.value = [
      {
        _id: '1',
        username: 'admin',
        email: 'admin@example.com',
        realName: '管理员',
        status: 'active',
        roles: ['admin'],
        createTime: new Date('2024-12-01'),
        updateTime: new Date('2024-12-01'),
      },
      {
        _id: '2',
        username: 'user1',
        email: 'user1@example.com',
        realName: '测试用户1',
        status: 'active',
        roles: ['user'],
        createTime: new Date('2024-12-01'),
        updateTime: new Date('2024-12-01'),
      },
    ] as IUser[]
    pagination.total = 2
  }
  finally {
    loading.value = false
  }
}

// 处理查询按钮点击
function handleSearch() {
  pagination.page = 1
  fetchUsers()
}

// 处理重置按钮点击
function handleReset() {
  // 重置查询参数
  queryParams.username = ''
  queryParams.status = ''
  queryParams.email = ''
  queryParams.createTimeRange = []

  // 重置分页并查询
  pagination.page = 1
  fetchUsers()
}

// 处理分页变化
function handlePageChange(page: number) {
  pagination.page = page
  fetchUsers()
}

// 处理每页条数变化
function handleSizeChange(pageSize: number) {
  pagination.pageSize = pageSize
  pagination.page = 1
  fetchUsers()
}

// 打开添加用户对话框
function handleAdd() {
  dialogMode.value = 'add'
  currentUser.value = {
    status: 'active',
    roles: [],
  }
  showUserDialog.value = true
}

// 打开编辑用户对话框
function handleEdit(user: IUser) {
  dialogMode.value = 'edit'
  currentUser.value = { ...user }
  showUserDialog.value = true
}

// 处理删除用户
async function handleDelete(userId: string) {
  try {
    // 确认删除
    await messageBox.confirm({
      title: '删除确认',
      content: '确定要删除此用户吗？',
      type: 'warning',
    })

    // TODO: 调用删除API
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })

    const result = await response.json()

    if (result.success) {
      // 删除成功，重新加载列表
      await messageBox.success('删除成功')
      fetchUsers()
    }
    else {
      // 处理错误
      await messageBox.error(`删除失败：${result.message}`)
      logger.error('删除用户失败', result.message)
    }
  }
  catch (error) {
    // 用户取消删除时不显示错误提示
    if (error === 'cancel' || error === 'close')
      return
    logger.error('删除用户异常', error)
  }
}

// 处理批量删除
async function handleBatchDelete() {
  if (selectedUserIds.value.length === 0) {
    await messageBox.warning('请至少选择一条记录')
    return
  }

  try {
    // 确认删除
    await messageBox.confirm({
      title: '批量删除确认',
      content: `确定要删除选中的 ${selectedUserIds.value.length} 个用户吗？`,
      type: 'warning',
    })

    // TODO: 调用批量删除API
    const response = await fetch('/api/users/batch-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedUserIds.value }),
    })

    const result = await response.json()

    if (result.success) {
      // 删除成功，重新加载列表
      await messageBox.success('批量删除成功')
      selectedUserIds.value = []
      fetchUsers()
    }
    else {
      // 处理错误
      await messageBox.error(`批量删除失败：${result.message}`)
      logger.error('批量删除用户失败', result.message)
    }
  }
  catch (error) {
    // 用户取消删除时不显示错误提示
    if (error === 'cancel' || error === 'close')
      return
    logger.error('批量删除用户异常', error)
  }
}

// 处理提交用户表单
async function handleSubmitUser() {
  try {
    // TODO: 调用添加/编辑API
    const url = dialogMode.value === 'add' ? '/api/users' : `/api/users/${currentUser.value._id}`
    const method = dialogMode.value === 'add' ? 'POST' : 'PUT'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser.value),
    })

    const result = await response.json()

    if (result.success) {
      // 操作成功，关闭对话框并重新加载列表
      showUserDialog.value = false
      fetchUsers()
    }
    else {
      // 处理错误
      logger.error(`${dialogMode.value === 'add' ? '添加' : '编辑'}用户失败`, result.message)
    }
  }
  catch (error) {
    logger.error(`${dialogMode.value === 'add' ? '添加' : '编辑'}用户异常`, error)
  }
}

// 处理选择变化
function handleSelectionChange(selection: IUser[]) {
  selectedUserIds.value = selection.map(item => item._id)
}

// 在组件挂载时获取用户列表
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="user-management">
    <!-- 搜索表单 -->
    <ui-card class="search-card">
      <div class="search-form">
        <div class="form-item">
          <label>用户名</label>
          <ui-input v-model="queryParams.username" placeholder="请输入用户名" />
        </div>

        <div class="form-item">
          <label>邮箱</label>
          <ui-input v-model="queryParams.email" placeholder="请输入邮箱" />
        </div>

        <div class="form-item">
          <label>状态</label>
          <ui-select v-model="queryParams.status" placeholder="请选择状态">
            <ui-select-option value="">
              全部
            </ui-select-option>
            <ui-select-option value="active">
              正常
            </ui-select-option>
            <ui-select-option value="disabled">
              禁用
            </ui-select-option>
          </ui-select>
        </div>

        <div class="form-buttons">
          <ui-button type="primary" @click="handleSearch">
            <ui-icon icon="carbon:search" />
            搜索
          </ui-button>

          <ui-button @click="handleReset">
            <ui-icon icon="carbon:reset" />
            重置
          </ui-button>
        </div>
      </div>
    </ui-card>

    <!-- 操作按钮和表格 -->
    <ui-card class="table-card">
      <template #header>
        <div class="table-header">
          <div class="left">
            <ui-button type="primary" @click="handleAdd">
              <ui-icon icon="carbon:add" />
              新增
            </ui-button>

            <ui-button
              type="danger"
              :disabled="selectedUserIds.length === 0"
              @click="handleBatchDelete"
            >
              <ui-icon icon="carbon:trash-can" />
              批量删除
            </ui-button>
          </div>
        </div>
      </template>

      <ui-table
        :data="userList"
        :loading="loading"

        stripe show-selection border
        @selection-change="handleSelectionChange"
      >
        <ui-table-column type="selection" width="50px" />
        <ui-table-column prop="_id" label="ID" width="80px" />
        <ui-table-column prop="username" label="用户名" />
        <ui-table-column prop="email" label="邮箱" />
        <ui-table-column prop="realName" label="姓名" />
        <ui-table-column prop="status" label="状态">
          <template #default="{ row }">
            <ui-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '正常' : '禁用' }}
            </ui-tag>
          </template>
        </ui-table-column>
        <ui-table-column prop="createTime" label="创建时间">
          <template #default="{ row }">
            {{ new Date(row.createTime).toLocaleString() }}
          </template>
        </ui-table-column>
        <ui-table-column label="操作" width="200px">
          <template #default="{ row }">
            <ui-button type="primary" size="small" @click="handleEdit(row)">
              <ui-icon icon="carbon:edit" />
              编辑
            </ui-button>

            <ui-button type="danger" size="small" @click="handleDelete(row._id)">
              <ui-icon icon="carbon:trash-can" />
              删除
            </ui-button>
          </template>
        </ui-table-column>
      </ui-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <ui-pagination
          v-model:current="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"

          show-jumper show-total
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </ui-card>

    <!-- 用户表单对话框 -->
    <ui-modal
      v-model="showUserDialog"
      :title="dialogMode === 'add' ? '添加用户' : '编辑用户'"
      @ok="handleSubmitUser"
    >
      <div class="user-form">
        <div class="form-item">
          <label>用户名</label>
          <ui-input
            v-model="currentUser.username"
            placeholder="请输入用户名"
            :disabled="dialogMode === 'edit'"
          />
        </div>

        <div v-if="dialogMode === 'add'" class="form-item">
          <label>密码</label>
          <ui-input
            v-model="currentUser.password"
            type="password"
            placeholder="请输入密码"
          />
        </div>

        <div class="form-item">
          <label>邮箱</label>
          <ui-input v-model="currentUser.email" placeholder="请输入邮箱" />
        </div>

        <div class="form-item">
          <label>姓名</label>
          <ui-input v-model="currentUser.realName" placeholder="请输入姓名" />
        </div>

        <div class="form-item">
          <label>状态</label>
          <ui-select v-model="currentUser.status" placeholder="请选择状态">
            <ui-select-option value="active">
              正常
            </ui-select-option>
            <ui-select-option value="disabled">
              禁用
            </ui-select-option>
          </ui-select>
        </div>
      </div>
    </ui-modal>
  </div>
</template>

<style lang="scss" scoped>
.user-management {
  width: 100%;
}

.search-card {
  margin-bottom: 16px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .form-item {
    display: flex;
    flex-direction: column;
    min-width: 200px;

    label {
      margin-bottom: 8px;
      font-size: 14px;
    }
  }

  .form-buttons {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }
}

.table-card {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      gap: 8px;
    }
  }
}

.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .form-item {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
      font-size: 14px;
    }
  }
}
</style>
