# 🚀 快速开始

## 当前状态

✅ **VitePress 已成功配置并运行！**

🌐 **本地访问**: http://localhost:5173

## 一分钟上手

### 1. 查看效果（已启动）

开发服务器已经在运行，直接访问：
```
http://localhost:5173
```

### 2. 如果需要重启

```bash
# 停止服务器（Ctrl + C）
# 然后重新启动
npm run docs:dev
```

### 3. 构建生产版本

```bash
npm run docs:build
```

## 📁 重要文件

| 文件 | 说明 |
|------|------|
| `.vitepress/config.mts` | VitePress 配置（导航、侧边栏等） |
| `index.md` | 首页内容 |
| `questions/` | 所有题目文档 |
| `.vitepress/theme/custom.css` | 自定义样式 |

## 🎯 常用操作

### 修改首页

编辑 `index.md`

### 添加新题目

1. 在 `questions/` 对应目录创建 `.md` 文件
2. 更新 `.vitepress/config.mts` 的侧边栏配置

### 修改导航

编辑 `.vitepress/config.mts` 的 `nav` 配置

### 修改样式

编辑 `.vitepress/theme/custom.css`

## 🚀 部署到线上

### 最简单：GitHub Pages

1. 推送代码到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为部署源
4. 完成！

详细步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 完整文档

- [VitePress 使用指南](VITEPRESS_GUIDE.md) - 详细的使用说明
- [部署指南](DEPLOYMENT.md) - 各种部署方式
- [项目总结](SUMMARY.md) - 完整的项目信息

## 💡 提示

- 修改文件后会自动热更新
- 使用 `Ctrl/Cmd + K` 打开搜索
- 支持明暗主题切换
- 移动端自适应

## 🎉 下一步

1. ✅ 本地预览 - 访问 http://localhost:5173
2. 📝 自定义内容 - 修改首页和题目
3. 🚀 部署上线 - 选择部署平台
4. 📢 分享链接 - 让更多人使用

---

**需要帮助？** 查看 [VITEPRESS_GUIDE.md](VITEPRESS_GUIDE.md) 获取详细说明。
