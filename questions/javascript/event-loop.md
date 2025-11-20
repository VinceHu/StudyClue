---
title: JavaScript事件循环
date: 2025-11-20
category: JavaScript
difficulty: 中级
tags: [事件循环, 异步, 宏任务, 微任务, Promise]
related: [closure.md, var-scope.md]
hasCode: false
---

# 题目

请详细说明JavaScript的事件循环机制，以及宏任务和微任务的区别。

## 📝 标准答案

### 核心要点

1. **JavaScript是单线程**：同一时间只能执行一个任务
2. **事件循环**：通过事件循环机制实现异步操作
3. **执行栈**：同步代码在执行栈中执行
4. **任务队列**：异步任务完成后进入任务队列
5. **宏任务（Macro Task）**：setTimeout、setInterval、I/O、UI渲染
6. **微任务（Micro Task）**：Promise.then、MutationObserver、process.nextTick（Node.js）

### 详细说明

#### 事件循环执行流程

```
1. 执行同步代码（执行栈）
2. 执行栈清空后，检查微任务队列
3. 执行所有微任务
4. 执行一个宏任务
5. 重复步骤2-4
```

**完整流程图：**

```
┌───────────────────────────┐
│  执行同步代码（执行栈）      │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│  执行栈是否为空？           │
└───────────┬───────────────┘
            │ 是
            ▼
┌───────────────────────────┐
│  执行所有微任务             │
│  (Promise.then, MutationObserver) │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│  执行一个宏任务             │
│  (setTimeout, setInterval)  │
└───────────┬───────────────┘
            │
            ▼
        (重复循环)
```

#### 宏任务 vs 微任务

| 类型 | 任务 | 执行时机 |
|------|------|---------|
| 宏任务 | setTimeout、setInterval、setImmediate、I/O、UI渲染 | 每次循环执行一个 |
| 微任务 | Promise.then/catch/finally、MutationObserver、process.nextTick | 每次循环执行所有 |

**关键区别：**
- 微任务优先级高于宏任务
- 每次事件循环会执行所有微任务，但只执行一个宏任务
- 微任务在当前宏任务结束后立即执行

## 🧠 深度理解

### 底层原理

#### 1. 执行栈（Call Stack）

```javascript
function first() {
  console.log('first');
  second();
}

function second() {
  console.log('second');
}

first();

// 执行栈变化：
// 1. [first]
// 2. [first, second]
// 3. [first]  (second执行完出栈)
// 4. []       (first执行完出栈)
```

#### 2. 任务队列（Task Queue）

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出: 1 4 3 2
// 解释:
// 1. 同步代码: 1, 4
// 2. 微任务: 3 (Promise.then)
// 3. 宏任务: 2 (setTimeout)
```

#### 3. 微任务的执行时机

```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('promise1');
  })
  .then(() => {
    console.log('promise2');
  });

console.log('end');

// 输出: start end promise1 promise2 timeout
// 解释:
// 1. 同步: start, end
// 2. 微任务: promise1, promise2 (链式调用，都是微任务)
// 3. 宏任务: timeout
```

#### 4. async/await的执行顺序

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end'); // 相当于Promise.then
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 输出:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

### 常见误区

- **误区1**：认为setTimeout(fn, 0)会立即执行
  - 正解：会在当前宏任务和所有微任务执行完后才执行
  
- **误区2**：认为Promise是异步的
  - 正解：Promise构造函数是同步的，只有then/catch/finally是异步（微任务）
  
- **误区3**：认为所有异步任务都是宏任务
  - 正解：Promise.then是微任务，setTimeout是宏任务
  
- **误区4**：认为微任务和宏任务交替执行
  - 正解：所有微任务执行完后，才执行下一个宏任务

### 进阶知识

#### Node.js的事件循环

Node.js的事件循环分为6个阶段：

```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout/setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  I/O回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  内部使用
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  I/O事件
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      close callbacks      │  关闭回调
   └───────────────────────────┘
```

**process.nextTick：**
- 优先级最高，在每个阶段结束后立即执行
- 比Promise.then更早执行

```javascript
// Node.js环境
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

// 输出: nextTick promise timeout immediate
// (timeout和immediate顺序可能不同)
```

#### requestAnimationFrame

在浏览器中，requestAnimationFrame在渲染前执行：

```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

requestAnimationFrame(() => {
  console.log('rAF');
});

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');

// 输出: start end promise rAF timeout
// rAF在渲染前执行，在微任务之后，宏任务之前
```


## 💡 面试回答技巧

### 推荐回答顺序

1. **先说JavaScript是单线程**：同一时间只能执行一个任务
2. **解释事件循环机制**：通过事件循环实现异步
3. **说明执行流程**：同步代码 → 微任务 → 宏任务
4. **区分宏任务和微任务**：列举常见的宏任务和微任务
5. **举例说明**：用代码示例展示执行顺序

### 重点强调

- 强调微任务优先级高于宏任务
- 说明每次循环执行所有微任务，但只执行一个宏任务
- 提到Promise构造函数是同步的，then是异步的
- 说明async/await本质上是Promise的语法糖

### 可能的追问

**Q1: 为什么JavaScript是单线程的？**

A: 主要原因是JavaScript最初是为浏览器设计的，用于操作DOM：

1. **避免冲突**：如果是多线程，一个线程删除DOM节点，另一个线程修改它，会产生冲突
2. **简化编程**：单线程避免了复杂的同步问题（锁、死锁等）
3. **历史原因**：JavaScript诞生时就是单线程，保持向后兼容

**但是：**
- 浏览器是多进程的（渲染进程、GPU进程、网络进程等）
- JavaScript可以通过Web Worker创建多线程（但Worker不能操作DOM）

**Q2: setTimeout(fn, 0)真的是0毫秒后执行吗？**

A: 不是，有几个原因：

1. **最小延迟**：浏览器有最小延迟限制（HTML5规范是4ms）
2. **任务队列**：需要等待当前宏任务和所有微任务执行完
3. **嵌套限制**：嵌套5层以上的setTimeout，最小延迟会变成4ms

```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');

// 输出: start end promise timeout
// timeout不是立即执行，而是在微任务之后
```

**实际延迟：**
```javascript
const start = Date.now();
setTimeout(() => {
  console.log(Date.now() - start); // 通常是4-10ms
}, 0);
```

**Q3: Promise构造函数是同步还是异步的？**

A: Promise构造函数是**同步**的，只有then/catch/finally是异步的：

```javascript
console.log('1');

new Promise((resolve) => {
  console.log('2'); // 同步执行
  resolve();
  console.log('3'); // 同步执行
}).then(() => {
  console.log('4'); // 异步执行（微任务）
});

console.log('5');

// 输出: 1 2 3 5 4
```

**原因：**
- Promise构造函数的executor函数是立即执行的
- 只有resolve/reject后的then/catch才是异步的

**Q4: async/await的执行顺序是怎样的？**

A: async/await本质上是Promise的语法糖：

```javascript
// async/await写法
async function fn() {
  console.log('1');
  await console.log('2');
  console.log('3');
}

// 等价于Promise写法
function fn() {
  return new Promise(resolve => {
    console.log('1');
    resolve(console.log('2'));
  }).then(() => {
    console.log('3');
  });
}
```

**关键点：**
- await之前的代码是同步的
- await表达式本身是同步的
- await之后的代码相当于Promise.then（微任务）

```javascript
async function async1() {
  console.log('async1 start'); // 同步
  await async2();              // 同步执行async2
  console.log('async1 end');   // 微任务
}

async function async2() {
  console.log('async2');       // 同步
}

console.log('script start');   // 同步

async1();

console.log('script end');     // 同步

// 输出:
// script start
// async1 start
// async2
// script end
// async1 end
```

**Q5: 如何理解"执行所有微任务，但只执行一个宏任务"？**

A: 这是事件循环的核心机制：

```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise3');
  });
}, 0);

setTimeout(() => {
  console.log('timeout2');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
});

console.log('end');

// 输出:
// start
// end
// promise1
// promise2
// timeout1
// promise3
// timeout2

// 解释:
// 1. 同步: start, end
// 2. 微任务: promise1, promise2 (执行所有)
// 3. 宏任务: timeout1 (执行一个)
// 4. 微任务: promise3 (timeout1产生的微任务)
// 5. 宏任务: timeout2 (执行下一个)
```

**原因：**
- 微任务是当前宏任务的延续，应该尽快执行
- 宏任务是独立的任务，需要分批执行，避免阻塞

**Q6: Node.js和浏览器的事件循环有什么区别？**

A: 主要区别：

**1. 阶段划分：**
- 浏览器：简单的宏任务-微任务循环
- Node.js：6个阶段的循环

**2. 微任务执行时机：**
- 浏览器：每个宏任务后执行所有微任务
- Node.js（11之前）：每个阶段后执行所有微任务
- Node.js（11之后）：与浏览器一致

**3. 特有API：**
- Node.js：process.nextTick、setImmediate
- 浏览器：requestAnimationFrame、requestIdleCallback

```javascript
// Node.js特有
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));

// 输出: nextTick timeout immediate
// (timeout和immediate顺序可能不同)
```

**4. setTimeout vs setImmediate：**
- setTimeout：在timers阶段执行
- setImmediate：在check阶段执行
- 在I/O回调中，setImmediate总是先执行

### 加分项

- 提到浏览器的渲染时机（在微任务之后，下一个宏任务之前）
- 说明requestAnimationFrame的执行时机
- 提到Node.js的process.nextTick优先级最高
- 结合实际项目经验，如防抖节流、异步数据处理等
- 提到性能优化：避免长时间占用主线程

## 💻 代码示例

### 经典面试题

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

new Promise((resolve) => {
  console.log('4');
  resolve();
}).then(() => {
  console.log('5');
}).then(() => {
  console.log('6');
});

setTimeout(() => {
  console.log('7');
  Promise.resolve().then(() => {
    console.log('8');
  });
}, 0);

console.log('9');

// 输出: 1 4 9 5 6 2 3 7 8
```

**详细解析：**
1. 同步代码：1, 4, 9
2. 微任务队列：[promise5, promise6]
3. 执行微任务：5, 6
4. 宏任务队列：[timeout2, timeout7]
5. 执行第一个宏任务：2
6. 微任务队列：[promise3]
7. 执行微任务：3
8. 执行第二个宏任务：7
9. 微任务队列：[promise8]
10. 执行微任务：8

### async/await题目

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 输出:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

## 🔗 相关知识点

- [闭包](./closure.md) - 异步回调中常用到闭包
- [var作用域](./var-scope.md) - 理解作用域有助于理解异步
- [Vue的nextTick](../vue/nextTick.md) - 基于事件循环实现

## 📚 参考资料

- [MDN - Event Loop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [Jake Archibald - Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [深入理解JavaScript事件循环](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
