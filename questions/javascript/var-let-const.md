---
title: var/let/const区别
date: 2025-11-20
category: JavaScript
difficulty: 基础
tags: [变量声明, 作用域, 块级作用域, 变量提升]
related: [var-scope.md, closure.md]
hasCode: false
---

# 题目

请详细说明var、let、const的区别。

## 📝 标准答案

### 核心要点

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | ✅ 提升并初始化为undefined | ✅ 提升但不初始化（TDZ） | ✅ 提升但不初始化（TDZ） |
| 重复声明 | ✅ 允许 | ❌ 不允许 | ❌ 不允许 |
| 修改值 | ✅ 可以 | ✅ 可以 | ❌ 不可以 |
| 全局对象属性 | ✅ 是 | ❌ 否 | ❌ 否 |
| 暂时性死区 | ❌ 无 | ✅ 有 | ✅ 有 |

### 详细说明

#### 1. 作用域差异

```javascript
// var: 函数作用域
function fn() {
  if (true) {
    var a = 1;
  }
  console.log(a); // 1，可以访问
}

// let/const: 块级作用域
function fn() {
  if (true) {
    let b = 2;
    const c = 3;
  }
  console.log(b); // ReferenceError
  console.log(c); // ReferenceError
}
```

#### 2. 变量提升

```javascript
// var: 提升并初始化为undefined
console.log(a); // undefined
var a = 1;

// let/const: 提升但不初始化（暂时性死区）
console.log(b); // ReferenceError
let b = 2;

console.log(c); // ReferenceError
const c = 3;
```

#### 3. 重复声明

```javascript
// var: 允许重复声明
var a = 1;
var a = 2; // 正常

// let/const: 不允许重复声明
let b = 1;
let b = 2; // SyntaxError

const c = 1;
const c = 2; // SyntaxError
```

#### 4. 修改值

```javascript
// var/let: 可以修改
var a = 1;
a = 2; // 正常

let b = 1;
b = 2; // 正常

// const: 不可以修改（引用不可变）
const c = 1;
c = 2; // TypeError

// 但对象属性可以修改
const obj = {a: 1};
obj.a = 2; // 正常，引用没变
obj = {}; // TypeError，引用改变了
```

## 🧠 深度理解

### 暂时性死区（TDZ）

```javascript
let x = 1;
{
  console.log(x); // ReferenceError，不是1
  let x = 2;
}
// 块内的let x创建了TDZ，从块开始到声明语句
```

### const的本质

```javascript
// const保证的是引用不变，不是值不变
const obj = {a: 1};
obj.a = 2; // 可以
obj.b = 3; // 可以
obj = {}; // TypeError

// 如果要冻结对象
const obj2 = Object.freeze({a: 1});
obj2.a = 2; // 严格模式下TypeError，非严格模式静默失败
```

### 循环中的差异

```javascript
// var: 共享同一个变量
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出: 3 3 3

// let: 每次循环创建新变量
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出: 0 1 2
```

## 💡 面试回答技巧

### 推荐回答顺序

1. **作用域**：var是函数作用域，let/const是块级作用域
2. **变量提升**：var提升并初始化，let/const提升但有TDZ
3. **重复声明**：var允许，let/const不允许
4. **修改值**：const不可修改引用
5. **举例说明**：循环中的经典问题

### 可能的追问

**Q1: 什么是暂时性死区（TDZ）？**

A: 从块开始到变量声明语句之间的区域，在这个区域内访问变量会报错：

```javascript
{
  // TDZ开始
  console.log(x); // ReferenceError
  // TDZ结束
  let x = 1;
}
```

**Q2: 为什么推荐使用let/const而不是var？**

A: 
1. 块级作用域更符合直觉，避免变量泄漏
2. 不允许重复声明，避免意外覆盖
3. TDZ机制，避免在声明前使用
4. const语义更明确，表明不可修改

**Q3: 如何选择let还是const？**

A: 
- 默认使用const，表明变量不会重新赋值
- 只有需要重新赋值时才用let
- 永远不用var

## 🔗 相关知识点

- [var作用域](./var-scope.md) - 深入理解var的作用域
- [闭包](./closure.md) - 循环中的闭包问题
- [事件循环](./event-loop.md) - 理解异步执行

## 📚 参考资料

- [MDN - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [MDN - var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
