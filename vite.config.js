// gzip
// const CompressionPlugin = require('compression-webpack-plugin')
// drop console
// const TerserPlugin = require('terser-webpack-plugin')
import { proxy } from './src/dev'
import path from 'path'
export default {
  terserOptions: {
    compress: {
      drop_console: true
    },
  },
  // 默认：true 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  brotliSize: true,
  port: '8000',
  proxy: proxy,
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  // hostname: '0.0.0.0', // 默认是 localhost
  // open: true, // 浏览器自动打开
  // https: false, // 是否开启 https
  // ssr: false, // 服务端渲染
  // base: './', // 生产环境下的公共路径
  // outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
  cssPreprocessOptions: {
    scss: {
      additionalData: `@import "./src/assets/css/common.scss";`
    },
  },
}
