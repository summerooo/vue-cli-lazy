import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import { proxy } from './src/config/index.js'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      // Gzip 压缩：生产构建时自动对大于 10KB 的文件生成 .gz 版本
      viteCompression({
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
        compressionOptions: {
          level: 9,
        },
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    server: {
      host: true,
      // 代理配置从 src/config/index.js 集中管理
      proxy,
    },

    build: {
      // 分包策略：将第三方库拆分为独立 chunk，利用浏览器缓存
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
                return 'vue'
              }
              if (id.includes('axios')) {
                return 'axios'
              }
            }
          },
        },
      },
    },

    // 生产构建移除 console 和 debugger
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
})
