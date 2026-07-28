<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <header class="layout-header">
      <div class="brand">
        <SvgIcon name="logo" :size="22" />
        <span class="logo-text">Vue CLI Lazy</span>
      </div>

      <nav class="nav-links">
        <router-link to="/home" class="nav-item">
          <SvgIcon name="mine" :size="18" />
          <span>扫雷游戏</span>
        </router-link>
        <router-link to="/directives" class="nav-item">
          <SvgIcon name="flag" :size="18" />
          <span>指令实验室</span>
        </router-link>
      </nav>

      <div class="user-profile">
        <div class="user-avatar">
          <SvgIcon name="user" :size="18" color="#ffffff" />
        </div>
        <span class="user-name">{{ userStore.username || '未登录' }}</span>
        <button class="logout-btn" @click="handleLogout">
          <SvgIcon name="logout" :size="14" />
          <span>退出登录</span>
        </button>
      </div>
    </header>

    <!-- 业务视图区 -->
    <main class="layout-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
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
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: $bg-color;
  color: $text-primary;

  .layout-header {
    height: 60px;
    padding: 0 24px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;

      .logo-text {
        font-size: 18px;
        font-weight: 700;
        background: linear-gradient(135deg, $primary-color, $primary-hover);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 0.5px;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 16px;

      .nav-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 8px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover,
        &.router-link-active {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.15);
        }
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
        background: linear-gradient(135deg, $primary-color, $primary-active);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: $shadow-sm;
      }

      .user-name {
        font-size: 14px;
        font-weight: 500;
        color: $text-primary;
      }

      .logout-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: 8px;
        padding: 6px 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 6px;
        background: transparent;
        color: #94a3b8;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.3);
        }
      }
    }
  }

  .layout-content {
    flex: 1;
    overflow-y: auto;
    position: relative;
  }
}
</style>
