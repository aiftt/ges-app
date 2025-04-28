# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Git提交脚本使用说明

本项目包含一个增强型Git提交脚本，用于规范化和简化代码提交流程。

### 功能特点

- 跨平台支持（Windows、macOS和Linux）
- 自动检查依赖并安装缺失的包
- 规范化的提交信息格式（使用commitizen）
- 提交前自动拉取最新代码避免冲突
- 支持选择性添加文件
- 提交前**强制**运行代码检查（lint），确保代码质量
- 提交前可选运行测试
- 提供详细的操作反馈和错误提示

### 基本用法

```bash
pnpm submit
```

此命令将执行完整的提交流程：拉取最新代码、添加所有更改、运行检查和测试、提交并推送到远程仓库。

### 命令行参数

脚本支持以下命令行参数：

| 参数                      | 说明               |
| ------------------------- | ------------------ |
| `--help`, `-h`            | 显示帮助信息       |
| `--skip-pull`             | 跳过从远程拉取代码 |
| `--skip-test`             | 跳过测试           |
| `--selective`             | 选择性添加文件     |
| `--no-push`               | 不推送到远程仓库   |
| `--force`                 | 忽略警告继续执行   |
| `--branch`, `-b <分支名>` | 指定要提交的分支   |

### 使用示例

1. **标准提交**：

   ```bash
   pnpm submit
   ```

2. **选择性添加文件**：

   ```bash
   pnpm submit --selective
   ```

3. **跳过测试并强制提交**：

   ```bash
   pnpm submit --skip-test --force
   ```

4. **提交到指定分支**：

   ```bash
   pnpm submit --branch main
   ```

5. **仅提交但不推送**：

   ```bash
   pnpm submit --no-push
   ```

6. **只查看帮助**：
   ```bash
   pnpm submit --help
   ```

### 注意事项

- 提交前会**强制**执行 lint 检查，确保代码符合规范
- 使用`--force`参数时要谨慎，它会忽略警告继续执行流程
- 首次运行时，如果未安装commitizen，脚本会自动安装
- 选择性添加文件时，根据提示输入文件序号，多个用逗号分隔
