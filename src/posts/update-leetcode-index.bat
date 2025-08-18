@echo off
REM 一键更新 leetcode-index.js 文件
REM 需安装 node 环境
node src\posts\generate-leetcode-index.js
if %errorlevel% neq 0 (
    echo 生成失败，请检查 node 环境和脚本！
) else (
    echo leetcode-index.js 已更新！
)
pause
