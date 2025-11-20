# 部署指南

## 🚀 部署到 GitHub Pages

### 步骤 1: 准备 GitHub 仓库

```bash
# 初始化 git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/interview-guide.git

# 提交代码
git add .
git commit -m "Initial commit with VitePress"
git push -u origin main
```

### 步骤 2: 配置 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 保存设置

### 步骤 3: 自动部署

推送代码到 main 分支会自动触发部署：

```bash
git add .
git commit -m "Update content"
git push
```

等待几分钟，访问：`https://你的用户名.github.io/interview-guide/`

### 配置自定义域名（可选）

1. 在 GitHub Pages 设置中添加自定义域名
2. 在 `.vitepress/config.mts` 中设置 base：

```typescript
export default defineConfig({
  base: '/', // 自定义域名使用 '/'
  // 或者 GitHub Pages 子路径使用 '/interview-guide/'
})
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel Dashboard

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **New Project**
3. 导入你的 GitHub 仓库
4. Vercel 自动识别 VitePress 项目
5. 点击 **Deploy**

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

## 📦 部署到 Netlify

### 方式一：通过 Netlify Dashboard

1. 访问 [netlify.com](https://netlify.com)
2. 点击 **Add new site** → **Import an existing project**
3. 连接 GitHub 仓库
4. 配置构建设置：
   - **Build command**: `npm run docs:build`
   - **Publish directory**: `.vitepress/dist`
5. 点击 **Deploy site**

### 方式二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod
```

### 创建 netlify.toml 配置文件

```toml
[build]
  command = "npm run docs:build"
  publish = ".vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## ☁️ 部署到 Cloudflare Pages

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 连接 GitHub 仓库
3. 配置构建设置：
   - **Build command**: `npm run docs:build`
   - **Build output directory**: `.vitepress/dist`
4. 点击 **Save and Deploy**

## 🐳 Docker 部署

### 创建 Dockerfile

```dockerfile
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run docs:build

FROM nginx:alpine
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t interview-guide .

# 运行容器
docker run -p 8080:80 interview-guide
```

访问 http://localhost:8080

## 🔧 环境变量配置

如果需要在不同环境使用不同配置，可以使用环境变量：

```typescript
// .vitepress/config.mts
export default defineConfig({
  base: process.env.BASE_URL || '/',
  // 其他配置...
})
```

## 📊 添加分析统计

### Google Analytics

在 `.vitepress/config.mts` 中添加：

```typescript
export default defineConfig({
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');`
    ]
  ]
})
```

### 百度统计

```typescript
export default defineConfig({
  head: [
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?你的统计ID";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
  ]
})
```

## 🔍 SEO 优化

### 1. 添加 sitemap

安装插件：

```bash
npm i -D vitepress-plugin-sitemap
```

配置：

```typescript
import { defineConfig } from 'vitepress'
import { withSitemap } from 'vitepress-plugin-sitemap'

export default withSitemap(
  defineConfig({
    // 你的配置...
  }),
  {
    hostname: 'https://your-domain.com'
  }
)
```

### 2. 添加 robots.txt

在 `public/robots.txt`：

```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

### 3. 优化 meta 标签

在每个页面的 frontmatter 中：

```yaml
---
title: 页面标题
description: 页面描述
head:
  - - meta
    - name: keywords
      content: 前端面试,CSS,JavaScript,Vue
  - - meta
    - property: og:title
      content: 页面标题
  - - meta
    - property: og:description
      content: 页面描述
---
```

## 🚨 常见问题

### 部署后页面空白

检查 `base` 配置是否正确：
- GitHub Pages 子路径：`base: '/仓库名/'`
- 自定义域名或根路径：`base: '/'`

### 样式丢失

确保静态资源路径正确，使用相对路径或绝对路径。

### 404 错误

确保服务器配置了 SPA 路由重定向到 `index.html`。

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 构建命令正确
- [ ] base 路径配置正确
- [ ] 静态资源路径正确
- [ ] 环境变量已配置
- [ ] 域名已绑定（如需要）
- [ ] HTTPS 已启用
- [ ] 分析统计已添加（如需要）

---

**提示**：推荐使用 GitHub Pages 或 Vercel，它们都提供免费的 HTTPS 和 CDN 加速。
