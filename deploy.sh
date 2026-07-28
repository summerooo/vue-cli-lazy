#!/bin/bash
# =========================================================================
# vue-cli-lazy 一键自动化部署脚本 (Mac / Linux 专属)
# 用法: 在终端运行 ./deploy.sh
# =========================================================================

# 设置服务器参数 (请替换为您真实的服务器 IP 与域名)
SERVER_IP="your-server-ip"
SERVER_USER="root"
REMOTE_WEB_DIR="/usr/share/nginx/html"
REMOTE_NGINX_CONF_DIR="/etc/nginx/conf.d"

echo "🚀 [1/3] 开始打包编译生产环境静态资源..."
npm run build:prd

if [ $? -ne 0 ]; then
    echo "❌ 打包失败，请检查编译错误！"
    exit 1
fi

echo "📦 [2/3] 正在通过 scp 上传 dist 产物与 Nginx 配置到远程服务器..."
# 上传 dist 产物
scp -r ./dist/* ${SERVER_USER}@${SERVER_IP}:${REMOTE_WEB_DIR}/
# 上传 Nginx 配置
scp ./nginx.conf ${SERVER_USER}@${SERVER_IP}:${REMOTE_NGINX_CONF_DIR}/vue-cli-lazy.conf

echo "🔄 [3/3] 远程平滑重启 Nginx 服务..."
ssh ${SERVER_USER}@${SERVER_IP} "nginx -t && nginx -s reload"

echo "✅ [SUCCESS] 一键部署成功！请访问您的线上域名测试。"
