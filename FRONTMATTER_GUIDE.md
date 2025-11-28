# Frontmatter 配置指南

## 什么是 Frontmatter

Frontmatter 是 Markdown 文件顶部的 YAML 格式元数据，用于配置页面的 SEO 信息和其他属性。

## 标准 Frontmatter 模板

```yaml
---
title: 文章标题 - 副标题或关键词
description: 详细描述文章内容，包含核心知识点和关键词（建议 120-160 字符）
keywords: 关键词1, 关键词2, 关键词3, 前端面试
date: 2025-11-27
category: JavaScript/Vue/网络/浏览器/Performance
difficulty: 基础/中级/高级
tags: [标签1, 标签2, 标签3]
related: [相关文章1.md, 相关文章2.md]
hasCode: true/false
---
```

## 字段说明

### SEO 相关字段（重要）

#### title
- **作用**：页面标题，显示在浏览器标签和搜索结果中
- **格式**：`主标题 - 副标题或关键词`
- **长度**：建议 50-60 字符
- **示例**：
  ```yaml
  title: JavaScript 数据类型与检测 - 基本类型 vs 引用类型详解
  ```

#### description
- **作用**：页面描述，显示在搜索结果摘要中
- **格式**：简洁描述文章内容，包含核心关键词
- **长度**：建议 120-160 字符
- **示例**：
  ```yaml
  description: 详解 JavaScript 的 7 种基本数据类型和引用类型的区别，以及 typeof、instanceof、Object.prototype.toString.call() 三种类型检测方法的使用场景和原理
  ```

#### keywords
- **作用**：关键词，帮助搜索引擎理解页面内容
- **格式**：逗号分隔的关键词列表
- **数量**：建议 5-10 个
- **示例**：
  ```yaml
  keywords: JavaScript数据类型, typeof, instanceof, 类型检测, 基本类型, 引用类型, 栈内存, 堆内存, 前端面试
  ```

### 内容分类字段

#### category
- **作用**：文章分类
- **可选值**：
  - `JavaScript`
  - `Vue`
  - `CSS`
  - `网络`
  - `浏览器`
  - `Performance`

#### difficulty
- **作用**：难度等级
- **可选值**：
  - `基础`：适合初学者
  - `中级`：需要一定基础
  - `高级`：深入原理和实现

#### tags
- **作用**：文章标签，用于分类和搜索
- **格式**：数组
- **示例**：
  ```yaml
  tags: [数据类型, typeof, instanceof, 类型检测]
  ```

### 其他字段

#### date
- **作用**：文章创建或更新日期
- **格式**：`YYYY-MM-DD`

#### related
- **作用**：相关文章链接
- **格式**：文件名数组
- **示例**：
  ```yaml
  related: [deep-clone.md, prototype-chain.md]
  ```

#### hasCode
- **作用**：是否包含代码示例
- **可选值**：`true` / `false`

## SEO 优化最佳实践

### 1. Title 优化

**好的标题：**
- ✅ `JavaScript 数据类型与检测 - 基本类型 vs 引用类型详解`
- ✅ `Vue 2 和 Vue 3 的核心区别 - 响应式原理与 Composition API`
- ✅ `深拷贝 vs 浅拷贝 - 手写深拷贝处理循环引用`

**不好的标题：**
- ❌ `数据类型`（太简短）
- ❌ `JavaScript 数据类型与检测方法详解包括 typeof instanceof Object.prototype.toString.call 的区别和使用场景`（太长）

### 2. Description 优化

**好的描述：**
- 包含核心关键词
- 简洁明了，突出重点
- 120-160 字符之间
- 能吸引用户点击

**示例：**
```yaml
description: 深入理解 JavaScript 闭包的本质和工作原理，掌握闭包的经典应用场景，学习如何避免内存泄漏问题
```

### 3. Keywords 优化

**关键词选择原则：**
1. **核心关键词**：文章主题（如 "JavaScript闭包"）
2. **长尾关键词**：更具体的搜索词（如 "闭包原理"）
3. **相关关键词**：相关技术（如 "作用域链"）
4. **通用关键词**：行业词汇（如 "前端面试"）

**示例：**
```yaml
keywords: JavaScript闭包, 闭包原理, 作用域链, 内存泄漏, 前端面试, 闭包应用
```

## 已优化的文章列表

### JavaScript 系列
- ✅ 数据类型与检测
- ✅ 原型与原型链
- ✅ this 指向与箭头函数
- ✅ call、apply、bind
- ✅ 闭包
- ✅ async/await 原理
- ✅ 深拷贝 vs 浅拷贝

### Vue 系列
- ✅ Vue 2 和 Vue 3 的区别
- ✅ Vue 生命周期
- ✅ computed 和 watch 的区别
- ✅ Vue 的 diff 算法

### 网络与浏览器
- ✅ HTTP 版本对比
- ✅ 跨域 (CORS)
- ✅ 重绘与回流
- ✅ 强缓存和协商缓存

## 添加新文章时的 Checklist

- [ ] 添加完整的 frontmatter
- [ ] title 包含核心关键词
- [ ] description 长度在 120-160 字符
- [ ] keywords 包含 5-10 个相关关键词
- [ ] 设置正确的 category 和 difficulty
- [ ] 添加相关文章链接
- [ ] 检查拼写和格式

## 工具推荐

### SEO 检查工具
- [Google Search Console](https://search.google.com/search-console)
- [百度站长平台](https://ziyuan.baidu.com/)
- [Ahrefs SEO Toolbar](https://ahrefs.com/seo-toolbar)

### 关键词研究工具
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)
- [百度指数](https://index.baidu.com/)
- [5118](https://www.5118.com/)

### 标题和描述优化工具
- [SERP Simulator](https://www.highervisibility.com/seo/tools/serp-snippet-optimizer/)
- [Yoast SEO](https://yoast.com/wordpress/plugins/seo/)

## 常见问题

### Q: 为什么需要 frontmatter？
A: Frontmatter 提供的元数据可以：
- 提升搜索引擎排名
- 改善搜索结果展示
- 提供更好的用户体验
- 方便内容管理和分类

### Q: 关键词越多越好吗？
A: 不是。关键词堆砌会被搜索引擎惩罚。建议：
- 5-10 个相关关键词
- 自然分布在 title、description 中
- 避免重复和无关关键词

### Q: 如何选择合适的关键词？
A: 
1. 使用关键词研究工具
2. 分析竞争对手
3. 考虑用户搜索意图
4. 选择搜索量适中、竞争度低的词

### Q: 需要为每篇文章都添加吗？
A: 是的。每篇文章都应该有完整的 frontmatter，这样才能获得最好的 SEO 效果。

## 参考资源

- [Google SEO 指南](https://developers.google.com/search/docs)
- [百度搜索优化指南](https://ziyuan.baidu.com/college/courseinfo?id=267)
- [VitePress Frontmatter 文档](https://vitepress.dev/reference/frontmatter-config)
