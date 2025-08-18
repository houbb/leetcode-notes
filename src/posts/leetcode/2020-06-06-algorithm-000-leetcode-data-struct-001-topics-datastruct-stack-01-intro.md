---

title: 算法篇专题之栈 stack 01-入门介绍
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, stack, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下栈。

# chat

## 详细介绍一下力扣数据结构之栈

栈（Stack）是 LeetCode 中的高频数据结构之一，常用于括号匹配、表达式求值、单调栈、深度优先搜索等题型。

它具有\*\*先进后出（LIFO）\*\*的特点，操作简单、用途广泛。

---

## 🧱 一、栈的基本概念

| 特性   | 描述                                        |
| ---- | ----------------------------------------- |
| 操作方式 | 先进后出（LIFO）                                |
| 主要操作 | `push`（压栈）、`pop`（弹栈）、`peek`（栈顶）、`isEmpty` |
| 常见实现 | 数组、链表、双端队列                                |

---

## 🛠️ 二、Java 中的栈结构

| 类型              | 特点                            |
| --------------- | ----------------------------- |
| `Stack<E>`      | 标准栈类（继承自 `Vector`，线程安全，实际不推荐） |
| `Deque<E>`      | 推荐：用 `ArrayDeque` 实现栈更高效      |
| `LinkedList<E>` | 也可作为栈使用，但略慢                   |

推荐写法（使用 `Deque`）：

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);        // 入栈
int top = stack.pop(); // 出栈
int peek = stack.peek(); // 查看栈顶
```

---

## 🔁 三、栈的常见应用场景

| 场景     | 示例            | 说明                |
| ------ | ------------- | ----------------- |
| 括号匹配   | LC 20 有效括号    | 左括号入栈，右括号配对出栈     |
| 表达式求值  | LC 150 逆波兰表达式 | 数字入栈，操作符出栈两个数计算   |
| 单调栈    | LC 739 每日温度   | 维护递增或递减栈找下一个更大/小值 |
| DFS    | LC 200 岛屿数量   | 用栈代替递归实现深度优先遍历    |
| 历史状态保存 | LC 155 最小栈    | 保存最小值的辅助栈         |

---

## 📘 四、LeetCode 高频题型整理

### ✅ 括号相关

| 题号  | 名称     | 技巧      |
| --- | ------ | ------- |
| 20  | 有效的括号  | 栈匹配成对符号 |
| 32  | 最长有效括号 | 栈存下标    |
| 301 | 删除无效括号 | 栈 + 回溯  |

---

### 🧮 表达式相关

| 题号  | 名称       | 技巧                  |
| --- | -------- | ------------------- |
| 150 | 逆波兰表达式求值 | 遇数字入栈，遇运算符出栈两个数运算   |
| 227 | 基本计算器 II | 栈 + 优先级处理           |
| 394 | 字符串解码    | 嵌套解码，两个栈：数字栈 + 字符串栈 |

---

### 📊 单调栈

| 题号  | 名称        | 技巧           |
| --- | --------- | ------------ |
| 739 | 每日温度      | 单调递减栈        |
| 496 | 下一个更大元素 I | 模拟压栈寻找下一个更大值 |
| 84  | 柱状图中最大矩形  | 单调递增栈求左右边界   |
| 901 | 股票价格跨度    | 单调栈记录连续天数    |

---

### 🧱 其他经典题

| 题号  | 名称     | 技巧        |
| --- | ------ | --------- |
| 155 | 最小栈    | 用辅助栈维护最小值 |
| 225 | 用队列实现栈 | 两个队列模拟栈行为 |
| 232 | 用栈实现队列 | 两个栈实现先进先出 |

---

## 🧰 五、常用模板总结

### 1️⃣ 括号匹配（LC 20）

```java
Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') {
        stack.push(c);
    } else {
        if (stack.isEmpty()) return false;
        char top = stack.pop();
        if (!match(top, c)) return false;
    }
}
return stack.isEmpty();

boolean match(char a, char b) {
    return (a == '(' && b == ')') || (a == '[' && b == ']') || (a == '{' && b == '}');
}
```

---

### 2️⃣ 单调栈模板（找下一个更大元素）

```java
Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        int idx = stack.pop();
        res[idx] = nums[i]; // 找到了更大元素
    }
    stack.push(i);
}
```

---

### 3️⃣ 表达式求值（LC 150）

```java
Deque<Integer> stack = new ArrayDeque<>();
for (String token : tokens) {
    if (isOperator(token)) {
        int b = stack.pop(), a = stack.pop();
        stack.push(eval(a, b, token));
    } else {
        stack.push(Integer.parseInt(token));
    }
}
```

---

## ⚠️ 六、栈相关注意事项

| 注意点     | 说明                     |
| ------- | ---------------------- |
| 注意索引还是值 | 单调栈中通常存索引，不是数值本身       |
| 嵌套结构处理  | 可用多个栈分别维护状态（如字符串解码）    |
| 辅助栈保存状态 | 如最小栈，第二个栈保存当前最小值       |
| 栈为空判断   | 任何 pop、peek 操作前请判断是否为空 |

---

## 📚 七、刷题建议路线（由易到难）

1. 20. 有效的括号 ✅
2. 155. 最小栈 ✅
3. 150. 逆波兰表达式 ✅
4. 739. 每日温度 🟡
5. 496. 下一个更大元素 🟡
6. 84. 柱状图最大矩形 🔴
7. 32. 最长有效括号 🔴
8. 394. 字符串解码 🔴

---

## ✅ 总结一句话

> 栈的核心是“先进后出”，能帮我们在括号配对、延迟处理、单调关系、表达式求值等问题中快速建模。建议熟练掌握其基本用法和单调栈技巧。

---

需要我给你整理一份「单调栈题单」或者「表达式求值专题解析」也可以告诉我～



# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。


