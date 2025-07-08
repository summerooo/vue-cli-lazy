import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { proxy } from './src/dev'
import path from 'path'

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
      // scss: {
      //   charset: false,
      //   additionalData: `@use "./src/assets/css/common.scss" as *;`
      // }
      less: {
        javascriptEnabled: true,
        additionalData: `@import "./src/assets/css/common.less";`
      }
    },
  }
})


