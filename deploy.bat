@echo off
:: =========================================================================
:: vue-cli-lazy 一键自动化部署批处理脚本 (Windows 专属)
:: 用法: 直接双击 deploy.bat 或在 CMD 中运行 deploy.bat
:: =========================================================================
chcp 65001 >nul
echo.
echo ===================================================
echo 🚀 [1/3] 开始打包编译生产环境静态资源...
echo ===================================================
call npm run build:prd

if %errorlevel% neq 0 (
    echo ❌ 打包失败，请检查编译错误！
    pause
    exit /b %errorlevel%
)

:: 设置服务器参数
set SERVER_IP=your-server-ip
set SERVER_USER=root
set REMOTE_WEB_DIR=/usr/share/nginx/html
set REMOTE_NGINX_CONF_DIR=/etc/nginx/conf.d

echo.
echo ===================================================
echo 📦 [2/3] 正在通过 scp 上传 dist 产物与 Nginx 配置...
echo ===================================================
scp -r .\dist\* %SERVER_USER%@%SERVER_IP%:%REMOTE_WEB_DIR%/
scp .\nginx.conf %SERVER_USER%@%SERVER_IP%:%REMOTE_NGINX_CONF_DIR%/vue-cli-lazy.conf

echo.
echo ===================================================
echo 🔄 [3/3] 远程平滑重启 Nginx 服务...
echo ===================================================
ssh %SERVER_USER%@%SERVER_IP% "nginx -t && nginx -s reload"

echo.
echo ✅ [SUCCESS] 一键部署成功！
pause
