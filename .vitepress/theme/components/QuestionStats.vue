<template>
  <div class="stats">
    <div class="stat-item">
      <div class="stat-number">{{ stats.total }}</div>
      <div class="stat-label">题目总数</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.css }}</div>
      <div class="stat-label">CSS题目</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.javascript }}</div>
      <div class="stat-label">JavaScript题目</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.vue }}</div>
      <div class="stat-label">Vue题目</div>
    </div>
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
    vue: vueCount,
    total: cssCount + cssPerformance + jsCount + vueCount
  }
})
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.stat-label {
  margin-top: 8px;
  color: var(--vp-c-text-2);
}
</style>
