# 自动统计题目数量

## ✅ 已实现自动统计

现在首页的题目数量会**自动统计**，不需要手动更新！

### 工作原理

通过 Vue 组件读取 VitePress 配置中的侧边栏数据，自动计算题目数量。

### 实现的组件

#### 1. QuestionStats 组件
显示题库概览的统计卡片

**位置：** `.vitepress/theme/components/QuestionStats.vue`

**功能：**
- 自动统计总题目数
- 自动统计各分类题目数（CSS、JavaScript、Vue）
- 从 VitePress 配置的侧边栏读取数据

**使用方式：**
```markdown
<QuestionStats />
```

#### 2. CategoryCards 组件
显示分类导航卡片

**位置：** `.vitepress/theme/components/CategoryCards.vue`

**功能：**
- 自动显示各分类题目数量
- 提供分类导航链接
- 响应式设计

**使用方式：**
```markdown
<CategoryCards />
```

### 如何工作

```vue
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const stats = computed(() => {
  const sidebar = theme.value.sidebar
  
  // 从侧边栏配置读取题目数量
  const cssCount = sidebar['/questions/css/']?.[0]?.items?.length || 0
  const cssPerformance = sidebar['/questions/css/']?.[1]?.items?.length || 0
  const jsCount = sidebar['/questions/javascript/']?.[0]?.items?.length || 0
  const vueCount = sidebar['/questions/vue/']?.[0]?.items?.length || 0
  
  return {
    css: cssCount + cssPerformance,
    javascript: jsCount,
    vue: vueCount,
    total: cssCount + cssPerformance + jsCount + vueCount
  }
})
</script>
```

### 添加新题目时

现在添加新题目只需要：

1. ✅ 创建题目文档
2. ✅ 更新 `.vitepress/config.mts` 侧边栏
3. ✅ ~~手动更新首页统计~~ **不需要了！自动更新！**

### 示例

**添加新题目前：**
- 总题目：14
- JavaScript：7

**在 `.vitepress/config.mts` 添加新题目：**
```typescript
{
  text: 'JavaScript',
  items: [
    // ... 其他题目
    { text: 'async/await详解', link: '/questions/javascript/async-await' }
  ]
}
```

**添加新题目后：**
- 总题目：15 ✨ 自动更新
- JavaScript：8 ✨ 自动更新

### 优势

1. **自动化** - 不需要手动更新数字
2. **准确性** - 数据来源于配置，不会出错
3. **维护性** - 只需维护一个地方（侧边栏配置）
4. **实时性** - 添加题目后立即生效

### 查看效果

访问首页 http://localhost:5173 查看自动统计的效果！

### 技术细节

**使用的技术：**
- Vue 3 Composition API
- VitePress useData API
- Computed 响应式计算

**数据来源：**
- `.vitepress/config.mts` 中的 `sidebar` 配置
- 通过 `useData()` 获取主题配置
- 计算各分类的 `items.length`

### 扩展

如果将来添加新分类（如 React、TypeScript），只需：

1. 在 `.vitepress/config.mts` 添加侧边栏配置
2. 在组件中添加对应的统计逻辑

```vue
const stats = computed(() => {
  const sidebar = theme.value.sidebar
  
  return {
    css: sidebar['/questions/css/']?.[0]?.items?.length || 0,
    javascript: sidebar['/questions/javascript/']?.[0]?.items?.length || 0,
    vue: sidebar['/questions/vue/']?.[0]?.items?.length || 0,
    react: sidebar['/questions/react/']?.[0]?.items?.length || 0, // 新增
    typescript: sidebar['/questions/typescript/']?.[0]?.items?.length || 0, // 新增
    total: /* 计算总数 */
  }
})
```

---

**总结：** 现在题目数量完全自动化，添加新题目时只需更新侧边栏配置即可！🎉
