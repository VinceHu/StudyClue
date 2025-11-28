# 主题配置说明

## 颜色系统

本项目的颜色系统基于 logo 设计，确保整体视觉风格的一致性。

### 如何更新主题颜色

当 logo 颜色改变时，只需要更新 `colors.css` 文件中的两个变量：

```css
:root {
  --logo-primary: #42b883;    /* logo 的主色 */
  --logo-secondary: #35495e;  /* logo 的辅助色 */
}
```

### 当前配色方案

**从 logo.svg 提取的颜色：**
- 主色：`#42b883` (品牌绿) - 用于按钮、链接、高亮
- 辅助色：`#35495e` (深蓝灰) - 用于标题、正文

**自动生成的色阶：**
- `--vp-c-brand-1`: 主色原色
- `--vp-c-brand-2`: 主色加深 10%
- `--vp-c-brand-3`: 主色加深 20%
- `--vp-c-brand-soft`: 主色 10% 透明度（用于背景）

### 文件结构

```
.vitepress/theme/
├── colors.css      # 颜色变量定义（更新 logo 颜色时修改这里）
├── custom.css      # 自定义样式（使用 colors.css 中的变量）
├── index.ts        # 主题入口
└── README.md       # 本文档
```

### 应用场景

| 元素 | 使用的颜色变量 |
|------|---------------|
| Hero 标题 | `--app-hero-name-color` (主色) |
| Hero 正文 | `--app-hero-text-color` (辅助色) |
| 按钮 | `--vp-button-brand-bg` (主色) |
| 链接 | `--vp-c-brand-1` (主色) |
| Feature 卡片悬停 | `--app-feature-border-hover` (主色) |
| 导航栏文字 | `--vp-c-text-1` (辅助色) |

### 最佳实践

1. **更新 logo 时**：
   - 打开 `public/logo.svg`，查看新的颜色值
   - 更新 `colors.css` 中的 `--logo-primary` 和 `--logo-secondary`
   - 刷新页面查看效果

2. **添加新样式时**：
   - 优先使用 `colors.css` 中已定义的变量
   - 避免硬编码颜色值
   - 如需新颜色，在 `colors.css` 中定义变量

3. **保持一致性**：
   - 主色用于交互元素（按钮、链接）
   - 辅助色用于文字内容
   - 中性色用于背景和边框
