# Vue CLI Lazy — 现代 Vue 3 脚手架

这是一个从 Vue CLI (Webpack) 迁移到 **Vite** 的现代 Vue 3 项目脚手架模版，适合用于教学和实际项目开发。

## 🛠️ 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 构建工具 | [Vite 8](https://vite.dev/) | 极速 HMR + ESBuild |
| 核心框架 | [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| 路由 | [Vue Router 5](https://router.vuejs.org/) | 路由懒加载 + 鉴权守卫 |
| 状态管理 | [Pinia 3](https://pinia.vuejs.org/) | Setup Store + 持久化 |
| 网络请求 | [Axios](https://axios-http.com/) | 独立实例 + 拦截器 + 自动取消 |
| 代码规范 | ESLint + Prettier | 代码质量 + 格式化 |
| CSS 预处理 | Less | 嵌套语法支持 |

## 📁 目录结构

```
src/
├── api/
│   └── modules/           # 按业务拆分的 API 模块
│       └── user.js         # 用户相关接口
├── composables/            # Composition API 逻辑复用
│   ├── useMinesweeper.js   # 扫雷游戏逻辑
│   └── useRequest.js       # 通用请求封装
├── config/                 # 配置中心
│   ├── index.js            # 环境 & 代理配置（多后端 IP 切换）
│   └── cos.js              # 腾讯云 COS 上传预设
├── router/                 # 路由
│   ├── index.js            # 路由实例 + 鉴权守卫
│   └── routes.js           # 路由表
├── store/                  # 状态管理（Pinia Setup Store）
│   ├── index.js            # Pinia 实例
│   ├── app.js              # 应用级状态（请求取消队列）
│   └── user.js             # 用户状态（Token 持久化）
├── utils/                  # 工具函数
│   ├── request.js          # Axios 实例（Token/401/取消）
│   └── format.js           # 数据格式化工具
├── views/                  # 页面
│   ├── common/index.vue    # 通用容器（KeepAlive）
│   ├── layout/             # 布局 + 首页（扫雷 Demo）
│   └── other/              # 登录 / 404
├── App.vue
├── main.js
└── style.css
```

## 🚀 核心特性

### 多后端 IP 切换

集中配置在 `src/config/index.js`，通过不同的 npm scripts 命令连接不同后端：

```bash
npm run dev           # 默认网关
npm run dev:zhangsan  # 连接张三的后端
npm run dev:lisi      # 连接李四的后端
npm run dev:split     # 按模块分发到不同后端
```

**同时连接多个后端**：`dev:split` 模式下按 API 路径前缀分发请求：

```javascript
// src/config/index.js
'dev:split': {
  apiTarget: {
    '/api/user': 'http://192.168.1.100:8080',    // 用户模块 → 张三
    '/api/order': 'http://192.168.1.101:8080',    // 订单模块 → 李四
    _default: 'http://gateway.hbgxzhny.com/api',  // 其他 → 网关
  },
}
```

### 安全的请求层

- Token 自动注入 + 401 自动跳转登录
- 路由切换时自动取消未完成请求
- 统一错误处理（401/403/404/500/超时）

### 构建优化

- Gzip 压缩（>10KB 自动生成 .gz）
- 分包策略（vue/pinia/axios 独立 chunk）
- 生产环境自动移除 console/debugger

## 💻 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 代码检查
npm run lint

# 代码格式化
npm run format

# 生产构建
npm run build:prd
```
