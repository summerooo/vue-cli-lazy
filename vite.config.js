import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { proxy } from './src/dev'
import path from 'path'

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [vue()],
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
        // additionalData: `@use "~/styles/element/index.scss" as *;`,
        // additionalData: `@import "./src/assets/css/common.scss";`
        additionalData: `@use "./src/assets/css/common.scss" as *;`
      }
    },
  }
})
