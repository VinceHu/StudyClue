<template>
  <div class="category-cards">
    <a href="/questions/css/box-model" class="category-card">
      <h3>🎨 CSS</h3>
      <p>{{ stats.css }}道题目</p>
      <span>布局、定位、性能优化</span>
    </a>
    <a href="/questions/javascript/array-dedup" class="category-card">
      <h3>⚡ JavaScript</h3>
      <p>{{ stats.javascript }}道题目</p>
      <span>数组、Promise、作用域、异步</span>
    </a>
    <a href="/questions/vue/user-state" class="category-card">
      <h3>💚 Vue</h3>
      <p>{{ stats.vue }}道题目</p>
      <span>状态管理、原理机制</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const stats = computed(() => {
  const sidebar = theme.value.sidebar
  
  // 统计各分类题目数量
  const cssCount = sidebar['/questions/css/']?.[0]?.items?.length || 0
  const cssPerformance = sidebar['/questions/css/']?.[1]?.items?.length || 0
  const jsCount = sidebar['/questions/javascript/']?.[0]?.items?.length || 0
  const vueCount = sidebar['/questions/vue/']?.[0]?.items?.length || 0
  
  return {
    css: cssCount + cssPerformance,
    javascript: jsCount,
    vue: vueCount
  }
})
</script>

<style scoped>
.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.category-card {
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid var(--vp-c-divider);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.category-card h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.category-card p {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.category-card span {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
