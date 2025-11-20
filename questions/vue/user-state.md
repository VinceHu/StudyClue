---
title: Vue用户信息存储方案
date: 2025-11-20
category: Vue
difficulty: 基础
tags: [Vue, Vuex, Pinia, localStorage, 状态管理]
related: []
hasCode: false
---

# 题目

在Vue项目中，用户信息应该如何存储？请对比各种方案的优缺点。

## 📝 标准答案

### 核心要点

常见的用户信息存储方案：

1. **Vuex/Pinia**：状态管理，页面刷新会丢失
2. **localStorage**：持久化存储，容量5MB，同源共享
3. **sessionStorage**：会话存储，关闭标签页丢失
4. **Cookie**：容量小（4KB），会自动发送到服务器

### 方案对比

| 方案 | 持久化 | 容量 | 跨标签页 | 安全性 | 推荐度 |
|------|--------|------|---------|--------|--------|
| Vuex/Pinia | ❌ | 无限制 | ❌ | ✅ 高 | ⭐⭐⭐⭐⭐ |
| localStorage | ✅ | 5MB | ✅ | ⚠️ 中 | ⭐⭐⭐⭐ |
| sessionStorage | ❌ | 5MB | ❌ | ⚠️ 中 | ⭐⭐⭐ |
| Cookie | ✅ | 4KB | ✅ | ⚠️ 低 | ⭐⭐ |

### 推荐方案

**Vuex/Pinia + localStorage组合：**

```javascript
// Pinia store
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    token: localStorage.getItem('token') || ''
  }),
  
  actions: {
    setUserInfo(info) {
      this.userInfo = info;
      localStorage.setItem('userInfo', JSON.stringify(info));
    },
    
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    
    logout() {
      this.userInfo = null;
      this.token = '';
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    }
  }
});
```

## 🧠 深度理解

### 安全性考虑

**敏感信息不要存localStorage：**
- Token可以存，但要设置过期时间
- 密码绝对不能存
- 个人隐私信息要加密

**推荐做法：**
```javascript
// Token存localStorage
localStorage.setItem('token', token);

// 敏感信息只存Vuex，不持久化
store.commit('SET_USER_SENSITIVE_DATA', data);
```

### 跨标签页同步

```javascript
// 监听storage事件
window.addEventListener('storage', (e) => {
  if (e.key === 'userInfo') {
    store.commit('SET_USER_INFO', JSON.parse(e.newValue));
  }
});
```

## 💡 面试回答技巧

### 推荐回答顺序

1. **说明推荐方案**：Vuex/Pinia + localStorage组合
2. **解释原因**：Vuex管理状态，localStorage持久化
3. **对比其他方案**：sessionStorage、Cookie的局限性
4. **强调安全性**：敏感信息不要存localStorage
5. **提到实际应用**：Token存储、自动登录等

### 可能的追问

**Q1: Token应该存在哪里？**

A: 
- 推荐：localStorage（方便但要注意XSS）
- 更安全：httpOnly Cookie（防XSS，但要防CSRF）
- 最安全：内存（但刷新丢失）

**Q2: 如何防止XSS攻击？**

A:
- 不要用innerHTML，用textContent
- 对用户输入进行转义
- 使用CSP（Content Security Policy）
- Token设置过期时间

**Q3: localStorage和sessionStorage的区别？**

A:
- localStorage：永久存储，除非手动删除
- sessionStorage：关闭标签页就清除
- 都是5MB容量，同源策略

## 🔗 相关知识点

- [Vue nextTick](./nextTick.md)

## 📚 参考资料

- [Pinia官方文档](https://pinia.vuejs.org/)
- [MDN - Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
