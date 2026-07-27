<template>
  <div class="login-container">
    <div class="login-card">
      <div class="brand-logo">✨ Vue CLI Lazy</div>
      <h2>欢迎回来</h2>
      <p class="subtitle">Vue 3 + Vite 现代脚手架演示项目</p>

      <div class="form-group">
        <label>账号名称</label>
        <input
          v-model="username"
          type="text"
          placeholder="请输入用户名..."
          @keyup.enter="handleLogin"
        />
      </div>

      <button class="login-btn" @click="handleLogin">登 录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const username = ref('Admin')

function handleLogin() {
  userStore.setToken('mock-jwt-token-123456')
  userStore.setUser({ name: username.value || 'Admin', role: 'admin' })

  const redirect = route.query.redirect || '/home'
  router.push(redirect)
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;

  // 背景装饰科技感渐变圈
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.25) 0%, rgba(0, 0, 0, 0) 70%);
    top: -100px;
    right: -100px;
  }
}

.login-card {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  animation: cardFadeIn 0.4s ease-out;

  .brand-logo {
    font-size: 14px;
    font-weight: 600;
    color: $primary-color;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 14px;
    color: $text-secondary;
    margin-bottom: 28px;
  }

  .form-group {
    margin-bottom: 24px;
    text-align: left;

    label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: $text-secondary;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 12px 16px;
      font-size: 14px;
      border: 1px solid $border-color;
      border-radius: $border-radius-md;
      outline: none;
      transition: $transition-base;

      &:focus {
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, $primary-color 0%, $primary-hover 100%);
    border: none;
    border-radius: $border-radius-md;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    transition: $transition-base;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
