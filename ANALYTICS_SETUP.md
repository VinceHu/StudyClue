# 网站统计配置指南

本项目已集成 Google Analytics 和百度统计，只需要简单配置即可使用。

## 1. Google Analytics 配置

### 步骤 1：创建 Google Analytics 账号

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 点击"开始测量"
3. 创建账号和媒体资源
4. 选择"网站"平台
5. 获取你的测量 ID（格式：`G-XXXXXXXXXX`）

### 步骤 2：配置到项目

打开文件：`.vitepress/theme/components/Analytics.vue`

找到这一行：
```typescript
const GA_ID = 'G-XXXXXXXXXX' // 替换为你的 Google Analytics ID
```

替换为你的实际 ID：
```typescript
const GA_ID = 'G-ABC123DEF4' // 你的真实 ID
```

### Google Analytics 功能

配置完成后，你可以在 Google Analytics 后台看到：
- 实时访问用户数
- 页面浏览量（PV）
- 独立访客数（UV）
- 用户地理位置
- 访问设备类型
- 用户行为路径
- 停留时间
- 跳出率

## 2. 百度统计配置

### 步骤 1：创建百度统计账号

1. 访问 [百度统计](https://tongji.baidu.com/)
2. 注册并登录
3. 点击"管理" → "新增网站"
4. 填写网站信息
5. 获取统计代码中的 ID（一串32位字符）

示例代码：
```javascript
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  //                                      ↑ 这就是你的百度统计 ID
})();
```

### 步骤 2：配置到项目

打开文件：`.vitepress/theme/components/Analytics.vue`

找到这一行：
```typescript
const BAIDU_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // 替换为你的百度统计 ID
```

替换为你的实际 ID：
```typescript
const BAIDU_ID = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' // 你的真实 ID
```

### 百度统计功能

配置完成后，你可以在百度统计后台看到：
- 实时访客
- 趋势分析
- 来源分析（搜索引擎、外部链接）
- 访问页面排行
- 搜索词排行
- 地域分布
- 系统环境（浏览器、操作系统）

## 3. 验证配置

### 本地测试

1. 构建项目：
```bash
npm run build
npm run preview
```

2. 打开浏览器开发者工具（F12）
3. 切换到 Network 标签
4. 访问网站，查看是否有以下请求：
   - Google Analytics: `https://www.googletagmanager.com/gtag/js`
   - 百度统计: `https://hm.baidu.com/hm.js`

### 线上验证

部署后：

**Google Analytics：**
1. 访问你的网站
2. 打开 Google Analytics 后台
3. 查看"实时" → "概览"
4. 应该能看到 1 个活跃用户（你自己）

**百度统计：**
1. 访问你的网站
2. 打开百度统计后台
3. 查看"实时访客"
4. 应该能看到你的访问记录

## 4. 隐私政策（重要）

使用统计工具需要告知用户，建议添加隐私政策页面。

创建文件：`privacy.md`

```markdown
# 隐私政策

## 数据收集

本网站使用以下工具收集匿名访问数据：
- Google Analytics：用于分析网站流量
- 百度统计：用于分析国内用户访问情况

## 收集的信息

- 页面访问记录
- 访问时间
- 地理位置（城市级别）
- 设备类型
- 浏览器类型

## 数据用途

收集的数据仅用于：
- 改进网站内容
- 优化用户体验
- 分析访问趋势

我们不会：
- 收集个人身份信息
- 出售或分享用户数据
- 用于商业营销

## Cookie 使用

本网站使用 Cookie 来：
- 记录访问统计
- 改善用户体验

您可以通过浏览器设置禁用 Cookie。
```

## 5. 高级配置

### 自定义事件跟踪

如果需要跟踪特定事件（如按钮点击），可以在代码中添加：

```typescript
// Google Analytics 事件
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'button_click', {
    event_category: 'engagement',
    event_label: 'download_button'
  })
}

// 百度统计事件
if (typeof window !== 'undefined' && (window as any)._hmt) {
  (window as any)._hmt.push(['_trackEvent', 'button', 'click', 'download'])
}
```

### 排除特定页面

如果不想统计某些页面，可以在 `Analytics.vue` 中添加过滤逻辑：

```typescript
function trackPageView() {
  // 排除管理页面
  if (route.path.startsWith('/admin')) {
    return
  }
  
  // 继续统计...
}
```

## 6. 常见问题

### Q: 为什么看不到数据？
A: 
- 检查 ID 是否正确配置
- 确认网站已部署到线上
- Google Analytics 数据有 24-48 小时延迟（实时数据除外）
- 百度统计需要等待 20 分钟左右

### Q: 本地开发时会统计吗？
A: 会的。如果不想统计本地开发数据，可以添加环境判断：

```typescript
const isDev = import.meta.env.DEV
if (!isDev) {
  initGoogleAnalytics()
  initBaiduAnalytics()
}
```

### Q: 两个统计工具都需要吗？
A: 
- 如果用户主要在国内：百度统计更准确
- 如果用户在海外：Google Analytics 更好
- 建议两个都配置，互为补充

### Q: 会影响网站性能吗？
A: 
- 统计脚本异步加载，不会阻塞页面渲染
- 对性能影响很小（< 100ms）
- 建议使用 CDN 加速

## 7. 数据分析建议

### 关注的核心指标

1. **流量指标**
   - PV（页面浏览量）
   - UV（独立访客）
   - 新访客比例

2. **用户行为**
   - 平均停留时间
   - 跳出率
   - 页面深度

3. **内容效果**
   - 热门页面排行
   - 搜索关键词
   - 来源渠道

### 优化建议

- 跳出率 > 70%：内容质量需要提升
- 停留时间 < 1分钟：内容不够吸引人
- 移动端访问 > 50%：优先优化移动端体验

## 8. 合规要求

### GDPR（欧盟用户）
如果有欧盟用户，需要：
- 添加 Cookie 同意横幅
- 提供隐私政策链接
- 允许用户拒绝跟踪

### 中国网络安全法
- 明确告知用户数据收集
- 提供隐私政策
- 不收集敏感个人信息

## 需要帮助？

如有问题，请查看官方文档：
- [Google Analytics 文档](https://support.google.com/analytics)
- [百度统计帮助中心](https://tongji.baidu.com/web/help/index)
