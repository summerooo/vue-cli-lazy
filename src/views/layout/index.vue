<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <header class="layout-header">
      <div class="brand">
        <!-- 直接输入名称 "logo"，自动读取 src/assets/svg/logo.svg -->
        <SvgIcon name="logo" :size="22" />
        <span class="logo-text">Vue CLI Lazy</span>
      </div>
      <div class="user-profile">
        <!-- 直接输入名称 "user"，自动读取 src/assets/svg/user.svg -->
        <div class="user-avatar">
          <SvgIcon name="user" :size="18" color="#ffffff" />
        </div>
        <span class="user-name">{{ userStore.username || '未登录' }}</span>

        <!-- 直接输入名称 "logout"，自动读取 src/assets/svg/logout.svg -->
        <button class="logout-btn" @click="handleLogout">
          <SvgIcon name="logout" :size="14" />
          <span>退出登录</span>
        </button>
      </div>
    </header>

    <!-- 核心业务区域 -->
    <main class="layout-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive" />
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import SvgIcon from '@/components/common/SvgIcon.vue'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $bg-color;
}

.layout-header {
  height: 60px;
  padding: 0 32px;
  background: $header-bg;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: $shadow-md;
  z-index: 10;

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 12px;

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, $primary-color 0%, $primary-hover 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #e2e8f0;
    }

    .logout-btn {
      margin-left: 8px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #cbd5e1;
      border-radius: $border-radius-sm;
      cursor: pointer;
      font-size: 13px;
      transition: $transition-base;

      &:hover {
        background: rgba(239, 68, 68, 0.2);
        border-color: rgba(239, 68, 68, 0.4);
        color: #fca5a5;
      }
    }
  }
}

.layout-content {
  flex: 1;
  display: flex;
  position: relative;
}
</style>
