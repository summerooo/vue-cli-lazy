<template>
  <div class="directives-demo">
    <div class="header-section">
      <h2>🚀 自定义指令实验室 (Directives Lab)</h2>
      <p class="subtitle">企业级 7 大高频 DOM 逻辑解耦指令现场实操体验</p>
    </div>

    <div class="card-grid">
      <!-- 1. v-ripple 水波纹指令 -->
      <div class="demo-card">
        <div class="card-title">1. 水波纹特效 (v-ripple)</div>
        <p class="card-desc">点击按钮从点击坐标向外扩散 Material 特效涟漪</p>
        <button v-ripple class="btn primary-btn">点击体验水波纹</button>
      </div>

      <!-- 2. v-debounce 防抖指令 -->
      <div class="demo-card">
        <div class="card-title">2. 防抖提交 (v-debounce)</div>
        <p class="card-desc">
          300ms 内连续快速点击只触发一次响应 (当前触发次数: {{ debounceCount }})
        </p>
        <button v-debounce:300="handleDebounce" class="btn warning-btn">连续快速连点我</button>
      </div>

      <!-- 3. v-copy 一键复制指令 -->
      <div class="demo-card">
        <div class="card-title">3. 一键复制 (v-copy)</div>
        <p class="card-desc">点击文本或按钮将绑定文本写入剪贴板</p>
        <div class="copy-box">
          <code>{{ copyText }}</code>
          <button v-copy="copyText" class="btn copy-btn" @click="showCopySuccess">复制秘钥</button>
        </div>
        <span v-if="copied" class="success-tip">✓ 已成功复制到剪贴板！</span>
      </div>

      <!-- 4. v-focus 自动聚焦指令 -->
      <div class="demo-card">
        <div class="card-title">4. 自动聚焦 (v-focus)</div>
        <p class="card-desc">进入本页面时自动 focus 选中输入框</p>
        <input
          v-focus
          type="text"
          class="input-field"
          placeholder="页面挂载后光标自动聚焦于此..."
        />
      </div>

      <!-- 5. v-permission 权限鉴权指令 -->
      <div class="demo-card">
        <div class="card-title">5. 权限鉴权 (v-permission)</div>
        <p class="card-desc">无对应权限字符的元素会被 DOM 物理拔除（而非 display: none）</p>
        <div class="btn-group">
          <!-- 这个按钮有模拟权限，正常渲染 -->
          <button v-permission="['order:refund:approve']" class="btn success-btn">
            有权限: order:refund:approve
          </button>
          <!-- 这个按钮无权限，会被自动拔除 -->
          <button v-permission="['system:super:delete']" class="btn danger-btn">
            无权限按钮 (已被 DOM 拔除)
          </button>
        </div>
      </div>

      <!-- 6. v-draggable 拖拽指令 -->
      <div class="demo-card">
        <div class="card-title">6. 元素拖拽 (v-draggable)</div>
        <p class="card-desc">按住下方卡片即可在页面任意拖动位置</p>
        <div class="drag-area">
          <div v-draggable class="drag-box">🖐️ 按住我自由拖拽</div>
        </div>
      </div>

      <!-- 7. v-lazy 图片懒加载指令 -->
      <div class="demo-card full-width">
        <div class="card-title">7. 图片懒加载 (v-lazy)</div>
        <p class="card-desc">基于 IntersectionObserver，滚动进入视口区域后才加载真实图片</p>
        <div class="lazy-box">
          <img
            v-lazy="'https://picsum.photos/800/300?random=1'"
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='300' viewBox='0 0 800 300'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8'>图片加载中...</text></svg>"
            class="lazy-img"
            alt="懒加载测试"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const debounceCount = ref(0)
const copyText = ref('VUE-CLI-LAZY-KEY-88888888')
const copied = ref(false)

function handleDebounce() {
  debounceCount.value++
}

function showCopySuccess() {
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
.directives-demo {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  .header-section {
    margin-bottom: 24px;
    h2 {
      font-size: 24px;
      font-weight: 700;
      color: #f8fafc;
    }
    .subtitle {
      font-size: 14px;
      color: #94a3b8;
      margin-top: 4px;
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }

  .demo-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &.full-width {
      grid-column: 1 / -1;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #38bdf8;
    }

    .card-desc {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
    }

    .btn {
      padding: 10px 18px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &.primary-btn {
        background: linear-gradient(135deg, #6366f1, #3b82f6);
        color: #ffffff;
      }
      &.warning-btn {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: #ffffff;
      }
      &.success-btn {
        background: linear-gradient(135deg, #10b981, #059669);
        color: #ffffff;
      }
      &.copy-btn {
        background: #334155;
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }
    }

    .copy-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0f172a;
      padding: 8px 12px;
      border-radius: 8px;
      code {
        color: #f43f5e;
        font-family: monospace;
      }
    }

    .success-tip {
      font-size: 12px;
      color: #10b981;
    }

    .input-field {
      width: 100%;
      padding: 10px 14px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      color: #f8fafc;
      outline: none;
      &:focus {
        border-color: #38bdf8;
      }
    }

    .drag-area {
      height: 120px;
      background: #0f172a;
      border-radius: 8px;
      position: relative;
      overflow: hidden;

      .drag-box {
        padding: 8px 16px;
        background: #6366f1;
        color: #ffffff;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        user-select: none;
        width: max-content;
      }
    }

    .lazy-box {
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      .lazy-img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>
