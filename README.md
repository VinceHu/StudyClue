# 前端面试指导系统

一个系统化的前端面试题整理和学习平台，按照"标准答案"、"深度理解"、"面试技巧"三个维度组织面试题，帮助你不仅知道答案，更理解原理，并掌握如何在面试中有效表达。

## 🌐 在线访问

本项目使用 VitePress 构建，支持在线访问和本地开发。

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产版本
npm run docs:preview
```

访问 http://localhost:5173 查看效果。

## 📚 项目特点

- **三维度学习**：标准答案 + 深度理解 + 面试技巧
- **系统化组织**：按分类、难度、标签多维度索引
- **实践导向**：包含可运行的代码示例
- **知识关联**：建立知识点之间的关联网络
- **每日积累**：记录学习日志，追踪进度

## 🗂️ 项目结构

```
interview-guide/
├── questions/              # 题目库
│   ├── css/               # CSS相关题目
│   ├── javascript/        # JavaScript相关题目
│   ├── vue/               # Vue相关题目
│   └── performance/       # 性能优化相关
├── code-examples/         # 代码示例
├── daily-logs/            # 每日学习记录
├── knowledge-map/         # 知识图谱
└── README.md             # 本文件
```

## 🚀 快速开始

### 按分类浏览

- **CSS** (5题)
  - [CSS盒模型](questions/css/box-model.md) - 基础
  - [左固定右自适应布局](questions/css/layout-flex.md) - 中级
  - [Position定位](questions/css/position.md) - 基础
  - [水平垂直居中](questions/css/center-methods.md) - 中级
  - [绝对定位vs Transform](questions/performance/transform-vs-position.md) - 高级

- **JavaScript** (6题)
  - [数组去重](questions/javascript/array-dedup.md) - 基础
  - [对象数组去重](questions/javascript/object-array-dedup.md) - 中级
  - [事件循环](questions/javascript/event-loop.md) - 中级
  - [var/let/const区别](questions/javascript/var-let-const.md) - 基础
  - [var作用域](questions/javascript/var-scope.md) - 基础
  - [闭包](questions/javascript/closure.md) - 中级

- **Vue** (2题)
  - [用户信息存储](questions/vue/user-state.md) - 基础
  - [nextTick原理](questions/vue/nextTick.md) - 高级

### 按难度浏览

- **基础题目** (6题)：适合入门和基础巩固
- **中级题目** (5题)：适合进阶学习
- **高级题目** (2题)：适合深入理解

详见 [知识点索引](knowledge-map/index.md)

### 查看代码示例

所有代码示例都可以直接运行：

- **HTML示例**：在浏览器中打开即可查看效果
  - [布局示例](code-examples/layout-demos.html)
  - [居中方法示例](code-examples/center-methods.html)

- **JavaScript示例**：在Node.js或浏览器控制台运行
  - [数组去重](code-examples/array-dedup.js)
  - [对象数组去重](code-examples/object-array-dedup.js)

## 📖 使用指南

### 如何学习一道题目

每道题目都包含以下部分：

1. **📝 标准答案**
   - 核心要点：快速了解关键概念
   - 详细说明：完整的答案内容

2. **🧠 深度理解**
   - 底层原理：技术背后的原理
   - 常见误区：避免理解偏差
   - 进阶知识：扩展学习

3. **💡 面试回答技巧**
   - 推荐回答顺序：如何组织答案
   - 重点强调：面试中要突出的点
   - 可能的追问：常见追问及答案
   - 加分项：如何让回答更出彩

4. **💻 代码示例**（如有）
   - 可运行的代码
   - 多种实现方式对比

5. **🔗 相关知识点**
   - 关联题目链接
   - 建立知识网络

### 学习路径推荐

#### 入门路径（1-2周）
适合前端基础薄弱或刚开始准备面试的同学

1. CSS盒模型
2. Position定位
3. var/let/const区别
4. 数组去重
5. 用户信息存储

#### 进阶路径（2-3周）
适合有一定基础，想要系统提升的同学

1. 左固定右自适应布局
2. 水平垂直居中
3. var作用域
4. 闭包
5. 对象数组去重
6. 事件循环

#### 高级路径（1-2周）
适合准备冲刺大厂或高级岗位的同学

1. 绝对定位vs Transform
2. nextTick原理
3. 浏览器渲染机制
4. 性能优化实践

### 如何添加新题目

1. 在对应分类目录下创建markdown文件
2. 使用统一的文档模板（包含元数据、标准答案、深度理解、面试技巧）
3. 如有代码示例，放在`code-examples/`目录
4. 更新`knowledge-map/index.md`索引
5. 在每日日志中记录

## 🎯 高频面试题

### 必考题（⭐⭐⭐⭐⭐）
- CSS盒模型
- 水平垂直居中
- 数组去重
- var/let/const区别
- 事件循环
- 闭包
- nextTick原理

### 常考题（⭐⭐⭐⭐）
- 左固定右自适应布局
- Position定位
- 对象数组去重
- var作用域
- 用户信息存储
- 绝对定位vs Transform

## 📊 学习统计

- 总题目数：13题
- CSS：5题
- JavaScript：6题
- Vue：2题
- 代码示例：4个

## 🔗 相关资源

- [知识点索引](knowledge-map/index.md) - 按分类、难度、标签查找
- [今日学习日志](daily-logs/2025-11-20.md) - 学习记录和心得
- [代码示例目录](code-examples/) - 可运行的代码

## 💡 学习建议

1. **系统学习**：按照学习路径，循序渐进
2. **实践验证**：运行代码示例，加深理解
3. **关联记忆**：通过知识点关联，建立知识网络
4. **模拟面试**：按照面试技巧，练习回答
5. **每日积累**：坚持每天学习，记录日志

## 📝 贡献指南

欢迎贡献新的面试题或改进现有内容：

1. 遵循现有的文档结构和格式
2. 确保内容准确、完整
3. 提供可运行的代码示例
4. 更新相关索引和日志

## 🚀 部署

### GitHub Pages

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码到 main 分支，自动触发部署

### 其他平台

- **Vercel**: 导入 GitHub 仓库，自动识别 VitePress 项目
- **Netlify**: 设置构建命令为 `npm run docs:build`，发布目录为 `.vitepress/dist`
- **Cloudflare Pages**: 同 Netlify 配置

## 📄 License

MIT

---

**开始学习**：
- 在线访问：访问部署后的网站
- 本地开发：运行 `npm run docs:dev`
- 查看源码：浏览 [知识点索引](knowledge-map/index.md)
