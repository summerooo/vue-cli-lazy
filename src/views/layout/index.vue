<template>
  <div class="layout-container">
    <!-- 页头顶栏 -->
    <header class="layout-header">
      <div class="logo">Vue CLI Lazy</div>
      <div class="user-info">
        <span>👤 {{ userStore.username || '未登录' }}</span>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
    </header>

    <!-- 主体区域（原生结合 KeepAlive 缓存） -->
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
}

.layout-header {
  height: 56px;
  padding: 0 24px;
  background: $header-bg;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 18px;
    font-weight: bold;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 14px;

    .logout-btn {
      padding: 4px 12px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        border-color: #fff;
        background: rgba(255, 255, 255, 0.1);
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
