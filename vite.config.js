// gzip
// const CompressionPlugin = require('compression-webpack-plugin')
// drop console
// const TerserPlugin = require('terser-webpack-plugin')

// import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import vue from '@vitejs/plugin-vue'
import { proxy } from './src/dev'
import path from 'path'
let mode = process.env.npm_lifecycle_event
let modeCorrespondingPath = {
  'build:client': path.resolve(__dirname, '/server/index.html'),
  'build:server': path.resolve(__dirname, '/server/entry-server.js'),
  'build': path.resolve(__dirname, '/index.html'),
}
export default {
  plugins: [vue()],
  // logLevel: 'silent',
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      },
    },
  // 默认：true 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    brotliSize: true,
    // manifest: true,
    rollupOptions: {
      input: {
        // 'entry-server': path.resolve(__dirname, 'server/entry-server.js'),
        // index: path.resolve(__dirname, '/index.html'),
        // client: true ? path.resolve(__dirname, '/server/index.html') : '',
        index: modeCorrespondingPath[mode] || '',
      },
      output: {
        inlineDynamicImports: false,
      }
    },

    // optimizeDeps: {
    //   entries: {

    //   }
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '/@/': path.resolve(__dirname, 'src')
    },
  },
  // hostname: '0.0.0.0', // 默认是 localhost
  // open: true, // 浏览器自动打开
  // https: false, // 是否开启 https
  // ssr: false, // 服务端渲染
  // base: './', // 生产环境下的公共路径
  // outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
  // cssPreprocessOptions: {
  //   scss: {
  //     additionalData: `@import "./src/assets/css/common.scss";`
  //   },
  // },
  server: {
    // port: '8000',
    proxy: proxy
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/common.scss";`
      }
    }
  }
}
