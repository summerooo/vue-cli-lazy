# Vue CLI Lazy — 现代 Vue 3 项目脚手架模版

这是一个从 Vue CLI (Webpack) 迁移并深度优化的 **Vite + Vue 3** 现代全栈脚手架模版，专为企业级项目实战与前端工程化教学设计。

## 🛠️ 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 构建工具 | [Vite 8](https://vite.dev/) | 极速 HMR + ESBuild + Rolldown 打包 |
| 核心框架 | [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| 路由管理 | [Vue Router 5](https://router.vuejs.org/) | 路由懒加载 + 鉴权守卫 + 自动标题 |
| 状态管理 | [Pinia 3](https://pinia.vuejs.org/) | Setup Store + 自动持久化插件 |
| 网络请求 | [Axios](https://axios-http.com/) | 统一拦截器 + Token 自动注入 + 路由切换自动取消请求 |
| 图标体系 | [SvgIcon](src/components/common/SvgIcon.vue) | 自动扫描本地 SVG + 阿里 Iconfont 在线/离线双模式支持 |
| 样式工程 | [Sass / SCSS](https://sass-lang.com/) | 现代 SCSS 架构 + 变量全局自动注入 |
| 代码规范 | ESLint + Prettier | Flat Config + `.prettierrc.cjs` 详细注释规范 |

## 📁 目录结构

```text
src/
├── api/                   # API 请求层
│   ├── index.js           # Axios 基础实例与请求/响应拦截器
│   ├── user.js            # 用户微服务接口模块
│   ├── order.js           # 订单微服务接口模块
│   └── cos.js             # 腾讯云 COS 上传接口与 SDK 封装
├── assets/                # 静态资源与样式体系
│   ├── styles/            # SCSS 样式架构
│   │   ├── index.scss     # 全局样式总入口
│   │   ├── reset.scss     # 现代 CSS Reset 重置
│   │   ├── variables.scss # 全局 SCSS 主题变量 ($primary-color 等)
│   │   └── iconfont.scss  # 阿里 Iconfont 在线/离线样式支持
│   └── svg/               # 本地 SVG 图标存放目录 (支持名称自动检索)
│       ├── logo.svg
│       ├── user.svg
│       ├── logout.svg
│       ├── mine.svg
│       ├── flag.svg
│       ├── reset.svg
│       ├── win.svg
│       └── lost.svg
├── components/            # 公共组件
│   ├── common/
│   │   └── SvgIcon.vue    # 全能通用图标组件
│   └── Minesweeper.vue    # 扫雷小游戏组件（复杂交互与设计美学案例）
├── config/                # 静态配置中心
│   ├── index.js           # 单源多环境 / 多后端 IP 代理自动化配置
│   └── cos.js             # 腾讯云 COS 存储桶静态参数
├── router/                # 路由体系
│   ├── index.js           # 路由实例与鉴权守卫
│   └── routes.js          # 路由表定义
├── store/                 # Pinia 状态管理
│   ├── index.js           # Pinia 实例与持久化插件注册
│   ├── app.js             # 应用级状态（请求取消队列）
│   └── user.js            # 用户状态（Token 持久化与清除）
├── utils/                 # 工具函数
│   └── format.js          # 数据格式化工具函数（FormData / 日期 / 金额千分位）
├── views/                 # 页面视图层
│   ├── layout/
│   │   └── index.vue      # 布局外壳框架（Header 顶栏 + KeepAlive 容器）
│   ├── home.vue           # 首页视图
│   ├── login.vue          # 登录页面
│   └── notFound.vue       # 404 页面
├── App.vue
└── main.js                # 核心入口文件
```

## 🚀 核心特性

### 1. 全能 SvgIcon 通用图标体系 (`src/components/common/SvgIcon.vue`)

支持多种常用的图标调用形态：

- **自动检索本地 SVG**：无需手动 `import`，只要将 `.svg` 放入 `src/assets/svg/`，直接传文件名即可：
  ```html
  <SvgIcon name="logo" :size="22" />
  <SvgIcon name="user" :size="18" color="#ffffff" />
  ```
- **阿里 Iconfont 在线/离线支持**：
  - Font-class 模式：`<SvgIcon name="icon-user" :size="20" color="#1890ff" />`
  - Symbol 多色模式：`<SvgIcon name="#icon-user" :size="24" />`
- **动态图片与网络地址**：`<SvgIcon name="https://xxx/logo.png" :size="32" />`

### 2. 自动化多环境与多 IP 代理 (`src/config/index.js`)

在 `environments` 中集中配置不同环境与微服务目标地址：
- **`proxy` 自动生成**：自动识别模块生成 Vite 开发代理规则。
- **`proxyApi` 自动派生**：供 `src/api/` 各模块引用，实现单源配置（Single Source of Truth）。

支持命令一键切换环境：
```bash
npm run dev        # 本地开发直连
npm run dev:test   #直连测试服务器
npm run dev:prd    # 直连正式服务器
npm run build:test # 测试环境打包
npm run build:prd  # 生产环境打包
```

### 3. SCSS 全局工程化架构

- 全局 SCSS 变量定义在 `src/assets/styles/variables.scss`。
- 在 `vite.config.js` 中配置了 `additionalData` 自动注入，项目中所有组件的 `<style lang="scss">` 均可**直接使用全局变量**（如 `$primary-color`、`$header-bg`），无需手动 `@import`。

### 4. 生产环境构建与品质优化

- **Gzip 压缩**：`vite-plugin-compression` 自动对 >10KB 资源生成 `.gz` 包。
- **持久化 Chunk**：`manualChunks` 独立抽取 Vue、Pinia、Axios 打包 Chunk。
- **代码规范**：配置 `.prettierrc.cjs` 与 `eslint.config.js`，运行 `npm run lint` 和 `npm run format` 保持团队代码高度统一。

## 💻 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地开发启动
npm run dev

# 3. 代码检查与全量格式化
npm run lint
npm run format

# 4. 生产环境打包构建
npm run build:prd
```
