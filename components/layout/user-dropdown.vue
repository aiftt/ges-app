<script setup lang="ts" name="LayoutUserDropdown">
import type { UserInfo } from '~/stores/auth'
/**
 * 用户下拉菜单组件
 * 创建日期: 2024-09-03
 * 作者: aiftt
 * 邮箱: ftt.loves@gmail.com
 */
import { onClickOutside } from '@vueuse/core'
import { useLogger } from '~/composables/useLogger'
import { useAppStore } from '~/stores/app'
import { useAuthStore } from '~/stores/auth'

const logger = useLogger('user-dropdown')
const authStore = useAuthStore()
const appStore = useAppStore()

// 下拉菜单是否打开
const isOpen = ref(false)
// 刷新状态
const isRefreshing = ref(false)

// 切换下拉菜单
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// 关闭下拉菜单
function closeDropdown() {
  isOpen.value = false
}

// 登出
function handleLogout() {
  authStore.logout()
  closeDropdown()
}

// 刷新缓存
async function refreshCache() {
  if (isRefreshing.value)
    return

  isRefreshing.value = true

  try {
    await appStore.refreshAppData()
    logger.info('缓存刷新成功')
  }
  catch (error) {
    logger.error('缓存刷新失败', error)
  }
  finally {
    isRefreshing.value = false
    closeDropdown()
  }
}

// 点击外部关闭下拉菜单
const dropdownRef = ref<HTMLElement | null>(null)
onClickOutside(dropdownRef, closeDropdown)

// 默认空用户信息
const emptyUserInfo: Partial<UserInfo> = {
  username: '',
  email: '',
  realName: '',
  avatar: '',
  roles: [],
}

// 用户信息
const userInfo = computed(() => {
  return authStore.user ?? emptyUserInfo as UserInfo
})
const userAvatar = computed(() => userInfo.value.avatar || '')
const userName = computed(() => userInfo.value.realName || userInfo.value.username || '')
</script>

<template>
  <div ref="dropdownRef" class="user-dropdown">
    <button class="user-dropdown-toggle" @click="toggleDropdown">
      <img
        v-if="userAvatar"
        :src="userAvatar"
        class="user-avatar"
        alt="用户头像"
      >
      <div v-else class="user-avatar-placeholder">
        {{ userName.substring(0, 1) }}
      </div>
      <span class="user-name">{{ userName }}</span>
      <ui-icon
        :icon="isOpen ? 'carbon:chevron-up' : 'carbon:chevron-down'"
        class="dropdown-icon"
      />
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="user-info">
        <div class="user-info-avatar">
          <img
            v-if="userAvatar"
            :src="userAvatar"
            alt="用户头像"
          >
          <div v-else class="avatar-placeholder">
            {{ userName.substring(0, 1) }}
          </div>
        </div>
        <div class="user-info-content">
          <div class="user-info-name">
            {{ userName }}
          </div>
          <div class="user-info-email">
            {{ userInfo.email || '未设置邮箱' }}
          </div>
        </div>
      </div>

      <div class="dropdown-divider" />

      <button class="dropdown-item" @click="refreshCache">
        <ui-icon
          :icon="isRefreshing ? 'carbon:renew animate-spin' : 'carbon:renew'"
          class="item-icon"
        />
        <span>刷新缓存</span>
      </button>

      <button class="dropdown-item" @click="handleLogout">
        <ui-icon icon="carbon:logout" class="item-icon" />
        <span>退出登录</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dropdown {
  position: relative;
  display: inline-flex;
}

.user-dropdown-toggle {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--ui-color-bg-hover, rgba(0, 0, 0, 0.05));
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--ui-color-primary, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}

.user-name {
  margin: 0 8px;
  font-size: 14px;
  color: var(--ui-color-text, #111827);
}

.dropdown-icon {
  color: var(--ui-color-text-light, #6b7280);
  font-size: 14px;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background-color: var(--ui-color-bg-light, white);
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.user-info {
  padding: 16px;
  display: flex;
  align-items: center;

  &-avatar {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--ui-color-primary, #4f46e5);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  &-content {
    flex-grow: 1;
    min-width: 0;
  }

  &-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--ui-color-text, #111827);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-email {
    font-size: 12px;
    color: var(--ui-color-text-light, #6b7280);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.dropdown-divider {
  height: 1px;
  background-color: var(--ui-color-border, #e5e7eb);
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: var(--ui-color-text, #111827);

  &:hover {
    background-color: var(--ui-color-bg-hover, rgba(0, 0, 0, 0.05));
  }

  .item-icon {
    margin-right: 8px;
    color: var(--ui-color-text-light, #6b7280);
  }
}
</style>
