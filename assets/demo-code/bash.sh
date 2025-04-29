#!/bin/bash
# Bash脚本示例

# 定义变量
NAME="World"
CURRENT_DATE=$(date +"%Y-%m-%d")

# 输出信息
echo "Hello, $NAME!"
echo "今天是 $CURRENT_DATE"

# 条件判断
if [ -d "/tmp" ]; then
  echo "/tmp 目录存在"
else
  echo "/tmp 目录不存在"
fi

# 循环语句
echo "计数从1到5:"
for i in {1..5}; do
  echo "第 $i 次"
done

# 函数定义
function greet() {
  local user=$1
  echo "欢迎, $user!"
}

# 函数调用
greet "用户"

# 读取用户输入
read -p "请输入您的名字: " USER_NAME
echo "您好, $USER_NAME!"

# 退出脚本
exit 0
