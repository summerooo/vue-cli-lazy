# Vue CLI Lazy — 现代 Vue 3 项目脚手架模版

这是一个从 Vue CLI (Webpack) 迁移并深度优化的 **Vite + Vue 3** 现代全栈脚手架模版，专为项目实战与前端教学设计。

## 🛠️ 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 构建工具 | [Vite 8](https://vite.dev/) | 极速 HMR + ESBuild |
| 核心框架 | [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| 路由管理 | [Vue Router 5](https://router.vuejs.org/) | 路由懒加载 + 鉴权守卫 + 自动标题 |
| 状态管理 | [Pinia 3](https://pinia.vuejs.org/) | Setup Store + 自动持久化插件 |
| 网络请求 | [Axios](https://axios-http.com/) | 统一拦截器 + Token 注入 + 路由切换取消请求 |
| 代码规范 | ESLint + Prettier | Flat Config + 代码格式化 |
| CSS 预处理 | Less | 预处理器支持 |

## 📁 目录结构

```text
src/
├── api/                   # API 请求层
│   ├── index.js           # Axios 基础实例与请求/响应拦截器
│   ├── user.js            # 用户微服务接口模块
│   ├── order.js           # 订单微服务接口模块
│   └── cos.js             # 腾讯云 COS 上传接口与 SDK 封装
├── components/            # 全局公共组件
│   └── Minesweeper.vue    # 扫雷小游戏组件（复杂交互案例）
├── config/                # 静态配置中心
│   ├── index.js           # 多环境 / 多后端 IP 代理配置
│   └── cos.js             # 腾讯云 COS 存储桶静态参数
├── router/                # 路由
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
├── main.js
└── style.css              # 现代 CSS Reset
```

## 🚀 核心特性

### 1. 自动化多环境与多 IP 代理 (`src/config/index.js`)

只需要在 `environments` 中配置目标服务器地址（如 `targetUser`、`targetOrder`）：
- **`proxy` 自动生成**：自动识别出模块名生成对应的 Vite 代理规则。
- **`proxyApi` 自动派生**：供 `src/api/` 各模块引用，实现单源配置（Single Source of Truth）。

支持多环境命令切换：
```bash
npm run dev        # 默认本地开发（直接连后端同事个人 IP）
npm run dev:test   # 本地启动直连测试服务器
npm run dev:prd    # 本地启动直连正式服务器
npm run build:test # 测试环境打包
npm run build:prd  # 生产环境打包
```

### 2. 安全与规范的网络请求层

- **Token 自动注入与 401 自动处理**：未登录或 Token 失效自动清除凭证并重定向回登录页。
- **路由切换自动取消未完成请求**：防止切页面后无用请求占用带宽。
- **职责解耦**：所有网络请求统一存放在 `src/api/`，`utils/` 专注于纯数据格式化。

### 3. 生产环境构建优化

- **Gzip 压缩**：`vite-plugin-compression` 自动对 >10KB 的文件生成压缩包。
- **分包策略**：`manualChunks` 提取第三方库（Vue, Pinia, Axios）作为持久缓存 Chunk。
- **代码清理**：生产环境构建时自动剔除 `console` 与 `debugger`。

## 💻 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地开发
npm run dev

# 3. 代码检查与格式化
npm run lint
npm run format

# 4. 生产环境打包构建
npm run build:prd
```
