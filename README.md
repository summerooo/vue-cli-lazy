# Vue CLI Lazy (Vite Migrated Template)

这是一个从 Vue CLI (Webpack) 成功迁移到 **Vite** 的现代 Vue 3 项目脚手架模版。该模版已针对现代前端开发完成了底层优化与版本升级。

## 🛠️ 技术栈

- **构建工具**: [Vite 8](https://vite.dev/) (极速的热更新与打包体验)
- **核心框架**: [Vue 3](https://vuejs.org/) (SFC 开发模式)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/) (单页应用路由路由系统)
- **状态管理**: [Pinia 3](https://pinia.vuejs.org/) & [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) (轻量状态管理与本地持久化)
- **网络请求**: [Axios](https://axios-http.com/) (含统一请求/响应拦截与路由跳转时自动取消请求逻辑)
- **CSS 预处理器**: Less & Sass (配置全局公共样式注入)

## 📁 目录结构

```text
vue-cli-lazy/
├── public/                 # 静态资源
├── src/
│   ├── api/                # API 接口定义与 Axios 拦截器配置
│   ├── assets/             # 全局静态资源 (图片、样式等)
│   ├── components/         # 公共组件
│   ├── config.js           # 核心配置文件 (代理配置、COS 配置、环境变量映射)
│   ├── router/             # 路由配置 (页面路由定义、路由拦截)
│   ├── store/              # Pinia 状态管理 (含持久化插件)
│   ├── views/              # 页面视图层 (含 layout、common 模块)
│   ├── App.vue             # 入口组件
│   └── main.js             # 入口文件
├── vite.config.js          # Vite 配置文件 (含 Gzip 压缩与开发代理配置)
└── package.json            # 依赖关系及运行脚本
```

## 🚀 核心优化特性

1. **统一环境与服务配置 (`src/config.js`)**：
   - 区分了前端运行时使用的地址 (`host`/`socket`) 与 Vite 开发代理的真实转发地址 (`targetHost`/`targetSocket`)。
   - 完美适配开发环境与 `build:production` 生产环境的多端接口地址。

2. **自动清理路由变更请求**：
   - 在 Axios 请求拦截器中集成了自动取消逻辑，路由切换时会自动取消未完成的 HTTP 请求，避免无用带宽占用。

3. **Gzip 压缩优化**：
   - 生产环境打包时使用 `vite-plugin-compression` 自动对超过 10KB 的 JS/CSS 文件生成 `.gz` 压缩包，提升首屏加载性能。

## 💻 快速开始

### 1. 安装依赖

本项目已优化依赖关系树，可使用主流包管理器直接安装：

```bash
# 使用 npm 直接安装（已解决 npm v7+ 严格 peer 依赖冲突问题）
npm install

# 或者使用 yarn 安装
yarn install
```

### 2. 本地开发

启动 Vite 本地开发服务器：

```bash
npm run dev
# 或
yarn dev
```

### 3. 生产环境打包

编译并压缩打包生产环境代码：

```bash
# 默认环境打包
npm run build

# 生产环境打包 (携带 mode production)
npm run build:production
```
