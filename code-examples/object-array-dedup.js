/**
 * 对象数组去重 - 多种实现方式
 * 日期: 2025-11-20
 * 难度: 中级
 * 
 * 问题描述:
 * 实现对象数组的去重，支持按属性、按值等多种方式
 */

// ============================================
// 方法一: Map按属性去重（最推荐⭐⭐⭐⭐⭐）
// 优点: 性能好(O(n))、代码简洁
// 缺点: 需要指定去重属性
// 时间复杂度: O(n)
// 空间复杂度: O(n)
// ============================================

function uniqueBy(arr, key) {
  const map = new Map();
  return arr.filter(item => {
    const value = item[key];
    if (map.has(value)) {
      return false;
    }
    map.set(value, true);
    return true;
  });
}

// 简化版（利用逻辑运算符）
function uniqueByShort(arr, key) {
  const map = new Map();
  return arr.filter(item => !map.has(item[key]) && map.set(item[key], true));
}

// ============================================
// 方法二: reduce按属性去重
// 优点: 函数式编程风格
// 缺点: 性能较差(O(n²))
// 时间复杂度: O(n²)
// 空间复杂度: O(n)
// ============================================

function uniqueByReduce(arr, key) {
  return arr.reduce((acc, item) => {
    // 检查是否已存在相同key的对象
    if (!acc.find(x => x[key] === item[key])) {
      acc.push(item);
    }
    return acc;
  }, []);
}

// ============================================
// 方法三: filter + findIndex
// 优点: 易理解
// 缺点: 性能较差(O(n²))
// 时间复杂度: O(n²)
// 空间复杂度: O(n)
// ============================================

function uniqueByFindIndex(arr, key) {
  return arr.filter((item, index, self) => {
    return index === self.findIndex(t => t[key] === item[key]);
  });
}

// ============================================
// 方法四: JSON.stringify深度去重
// 优点: 可以按值比较
// 缺点: 有很多局限性、性能差
// 时间复杂度: O(n²)
// 空间复杂度: O(n)
// ============================================

function deepUnique(arr) {
  const seen = new Set();
  return arr.filter(item => {
    const str = JSON.stringify(item);
    if (seen.has(str)) {
      return false;
    }
    seen.add(str);
    return true;
  });
}

// ============================================
// 方法五: 多属性组合去重
// 优点: 支持多个属性
// 缺点: 需要指定多个属性
// 时间复杂度: O(n)
// 空间复杂度: O(n)
// ============================================

function uniqueByKeys(arr, keys) {
  const map = new Map();
  return arr.filter(item => {
    // 生成组合key
    const key = keys.map(k => item[k]).join('|');
    if (map.has(key)) {
      return false;
    }
    map.set(key, true);
    return true;
  });
}

// 使用JSON.stringify生成key（更安全）
function uniqueByKeysJSON(arr, keys) {
  const seen = new Set();
  return arr.filter(item => {
    const key = JSON.stringify(keys.map(k => item[k]));
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// ============================================
// 方法六: 保留最后一个而非第一个
// 优点: 可以保留最新数据
// 缺点: 需要额外处理
// 时间复杂度: O(n)
// 空间复杂度: O(n)
// ============================================

function uniqueByLast(arr, key) {
  const map = new Map();
  
  // 从后往前遍历，记录每个key的最后一个对象
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i][key];
    if (!map.has(value)) {
      map.set(value, arr[i]);
    }
  }
  
  // 按原顺序返回（需要反转）
  return Array.from(map.values()).reverse();
}

// 另一种实现：保持原数组顺序
function uniqueByLastKeepOrder(arr, key) {
  const map = new Map();
  
  // 先记录所有key的最后位置
  arr.forEach((item, index) => {
    map.set(item[key], index);
  });
  
  // 过滤出最后出现的
  return arr.filter((item, index) => {
    return map.get(item[key]) === index;
  });
}

// ============================================
// 方法七: 自定义比较函数
// 优点: 灵活，可以实现复杂逻辑
// 缺点: 性能较差(O(n²))
// 时间复杂度: O(n²)
// 空间复杂度: O(n)
// ============================================

function uniqueByComparator(arr, comparator) {
  return arr.filter((item, index, self) => {
    return index === self.findIndex(t => comparator(t, item));
  });
}

// ============================================
// 方法八: lodash风格实现（支持函数和属性名）
// 优点: 灵活，API友好
// 缺点: 需要额外判断
// 时间复杂度: O(n)
// 空间复杂度: O(n)
// ============================================

function uniqBy(arr, iteratee) {
  const seen = new Set();
  const result = [];
  
  // iteratee可以是函数或属性名
  const getter = typeof iteratee === 'function' 
    ? iteratee 
    : item => item[iteratee];
  
  arr.forEach(item => {
    const key = getter(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  });
  
  return result;
}

// ============================================
// 方法九: 深度比较（完整实现）
// 优点: 真正的按值比较
// 缺点: 性能差、实现复杂
// 时间复杂度: O(n²)
// 空间复杂度: O(n)
// ============================================

function deepEqual(obj1, obj2) {
  // 相同引用
  if (obj1 === obj2) return true;
  
  // 类型不同
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  
  // null处理
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  
  // 数组处理
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }
  
  // 对象处理
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => deepEqual(obj1[key], obj2[key]));
}

function deepUniqueByEqual(arr) {
  return arr.filter((item, index, self) => {
    return index === self.findIndex(t => deepEqual(t, item));
  });
}

// ============================================
// 测试用例
// ============================================

console.log('=== 基本对象数组去重测试 ===');
const users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 1, name: 'Charlie'}, // id重复
  {id: 3, name: 'David'}
];

console.log('原数组:', users);
console.log('Map方法(按id):', uniqueBy(users, 'id'));
console.log('reduce方法(按id):', uniqueByReduce(users, 'id'));
console.log('findIndex方法(按id):', uniqueByFindIndex(users, 'id'));

console.log('\n=== Set无法去重对象数组 ===');
const arr1 = [
  {a: 1},
  {a: 1},
  {a: 2}
];
console.log('原数组:', arr1);
console.log('Set方法:', [...new Set(arr1)]); // 不去重，因为引用不同

console.log('\n=== 深度去重测试 ===');
const arr2 = [
  {a: 1, b: 2},
  {a: 1, b: 2}, // 内容完全相同
  {a: 2, b: 3}
];
console.log('原数组:', arr2);
console.log('JSON.stringify:', deepUnique(arr2));
console.log('deepEqual:', deepUniqueByEqual(arr2));

console.log('\n=== 多属性去重测试 ===');
const data = [
  {id: 1, type: 'A', value: 100},
  {id: 1, type: 'B', value: 200},
  {id: 1, type: 'A', value: 150}, // id+type重复
  {id: 2, type: 'A', value: 300}
];
console.log('原数组:', data);
console.log('按[id, type]去重:', uniqueByKeys(data, ['id', 'type']));

console.log('\n=== 保留最后一个测试 ===');
const updates = [
  {id: 1, name: 'Alice', age: 20},
  {id: 2, name: 'Bob', age: 25},
  {id: 1, name: 'Alice', age: 21} // 更新的数据
];
console.log('原数组:', updates);
console.log('保留第一个:', uniqueBy(updates, 'id'));
console.log('保留最后一个:', uniqueByLast(updates, 'id'));

console.log('\n=== 自定义比较函数测试 ===');
const names = [
  {name: 'Alice'},
  {name: 'alice'}, // 大小写不同
  {name: 'Bob'}
];
console.log('原数组:', names);
console.log('忽略大小写去重:', uniqueByComparator(names, (a, b) => 
  a.name.toLowerCase() === b.name.toLowerCase()
));

console.log('\n=== lodash风格测试 ===');
console.log('按属性名:', uniqBy(users, 'id'));
console.log('按函数:', uniqBy(users, user => user.id));
console.log('自定义逻辑:', uniqBy(names, item => item.name.toLowerCase()));

console.log('\n=== 性能测试 ===');
const largeArr = Array.from({length: 10000}, (_, i) => ({
  id: i % 1000,
  value: Math.random()
}));

console.time('Map方法');
uniqueBy(largeArr, 'id');
console.timeEnd('Map方法');

console.time('reduce方法');
uniqueByReduce(largeArr, 'id');
console.timeEnd('reduce方法');

console.time('findIndex方法');
uniqueByFindIndex(largeArr, 'id');
console.timeEnd('findIndex方法');

// ============================================
// 面试中的最佳实践
// ============================================

/**
 * 推荐使用: Map方法
 * 理由:
 * 1. 性能最好: O(n)时间复杂度
 * 2. 代码简洁: 易读易维护
 * 3. 灵活性好: 可以轻松扩展
 * 
 * 面试回答顺序:
 * 1. 先明确去重依据（按哪个属性）
 * 2. 写Map方案，说明这是最推荐的
 * 3. 解释Map的原理和优势
 * 4. 补充其他方案(reduce、findIndex)
 * 5. 说明特殊情况(多属性、深度比较、保留最后一个)
 */

// 最终推荐方案
const uniqueByRecommended = (arr, key) => {
  const map = new Map();
  return arr.filter(item => !map.has(item[key]) && map.set(item[key], true));
};

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    uniqueBy,
    uniqueByReduce,
    uniqueByFindIndex,
    deepUnique,
    uniqueByKeys,
    uniqueByLast,
    uniqueByComparator,
    uniqBy,
    deepEqual,
    deepUniqueByEqual
  };
}
