import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { proxy } from './src/config'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  // 加载当前模式的环境变量（安全地只加载 VITE_ 开头的变量，避免泄露系统敏感变量）
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        ...env
      }
    },
    plugins: [
      vue(),
      viteCompression({
        threshold: 10240, // 超过 10kb 则压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 文件后缀
        compressionOptions: {
          level: 9,               // 压缩级别 1-9，数字越大压缩率越高
        },
      })
    ],
    server: {
      proxy,
      host: true
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '/@/': path.resolve(__dirname, 'src')
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "./src/assets/css/common.scss" as *;`
        }
      },
    }
  }
})
