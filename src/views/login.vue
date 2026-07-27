<template>
  <div class="login-container">
    <div class="login-card">
      <h2>系统登录</h2>
      <div class="form-item">
        <input v-model="username" type="text" placeholder="用户名 (任意填写)" />
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
  background: #f0f2f5;
}

.login-card {
  width: 360px;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;

  h2 {
    margin-bottom: 24px;
    color: #333;
  }

  .form-item {
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      outline: none;

      &:focus {
        border-color: #40a9ff;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 10px;
    background: #1890ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background: #40a9ff;
    }
  }
}
</style>
