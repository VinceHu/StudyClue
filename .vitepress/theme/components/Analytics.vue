<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// Google Analytics 配置
const GA_ID = 'G-XXXXXXXXXX' // 替换为你的 Google Analytics ID

// 百度统计配置
const BAIDU_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // 替换为你的百度统计 ID

onMounted(() => {
  // 初始化 Google Analytics
  if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
    initGoogleAnalytics()
  }

  // 初始化百度统计
  if (BAIDU_ID && BAIDU_ID !== 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    initBaiduAnalytics()
  }

  // 监听路由变化
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', trackPageView)
  }
})

function initGoogleAnalytics() {
  // 加载 Google Analytics 脚本
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  // 初始化 gtag
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `
  document.head.appendChild(script2)
}

function initBaiduAnalytics() {
  // 加载百度统计脚本
  const script = document.createElement('script')
  script.innerHTML = `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ID}";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `
  document.head.appendChild(script)
}

function trackPageView() {
  // Google Analytics 页面跟踪
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_ID, {
      page_path: route.path
    })
  }

  // 百度统计页面跟踪
  if (typeof window !== 'undefined' && (window as any)._hmt) {
    ;(window as any)._hmt.push(['_trackPageview', route.path])
  }
}
</script>
