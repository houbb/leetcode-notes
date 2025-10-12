---

title: 单调队列（Monotonic Queue）
date: 2025-10-12
categories: [Althgorim]
tags: [althgorim, monotonic-queue]
published: true
---

# 单调队列（Monotonic Queue）

**单调队列（Monotonic Queue）** 是算法里一个非常高频、又极具“灵气”的工具。

你一旦掌握它，就能轻松解决一大类 **滑动窗口最值 / 动态规划优化** 的题目，比如：

* 🔹 LC239：滑动窗口最大值
* 🔹 LC1696：跳跃游戏 VI
* 🔹 LC1425：带约束的子序列和
* 🔹 LC862：和至少为 K 的最短子数组
* 🔹 各类“最大最小区间”、“DP 优化”等

下面我们分层讲，层层深入👇

---

## 🧩 一、它是什么？

**单调队列（Monotonic Queue）** 是一种特殊的双端队列（`Deque`），它里面的元素按照某种**单调性（递增或递减）**排列。

比如：

* 维护 **最大值** → 队列递减（队首最大）
* 维护 **最小值** → 队列递增（队首最小）

---

## 🧠 二、它解决什么问题？

👉 它的核心作用是：

> 在 **O(1)** 时间内，快速获取「滑动窗口」或「动态区间」的最大/最小值。

而普通做法（每次扫描窗口）需要 O(k) 时间，整体 O(nk)，太慢。

单调队列可以在 **O(n)** 时间内搞定所有窗口。

---

## ⚙️ 三、它怎么做到的？

假设我们要维护一个窗口 `[i - k, i]` 中的最大值：

我们用一个 **双端队列 dq** 存放“下标”，并保持：

```
dp[dq[0]] ≥ dp[dq[1]] ≥ dp[dq[2]] ...
```

每次处理新元素 `dp[i]` 时：

### ✅ Step 1. 弹出窗口外的下标

如果 `dq[0] < i - k`，说明已经滑出窗口，直接 `pollFirst()`。

### ✅ Step 2. 弹出比当前值更小的元素

如果 `dp[dq[last]] <= dp[i]`，那它永远不可能成为最大值，直接 `pollLast()`。

### ✅ Step 3. 把当前下标加入队尾

`dq.offerLast(i)`。

### ✅ Step 4. 队首即为窗口最大值

窗口内最大值 = `dp[dq[0]]`。

---

## 💡 四、直观理解

你可以把单调队列想象成一个“精英筛选系统”：

> 进队时：比我弱的都滚出去（pollLast）
> 过期时：太老的滚出去（pollFirst）
> 留下的永远是当前窗口的最强者（队首）。

---

## 🧩 五、代码模板（最大值版）

```java
class MonotonicQueue {
    Deque<Integer> dq = new ArrayDeque<>();

    // 入队：保持递减
    void push(int val) {
        while (!dq.isEmpty() && dq.peekLast() < val) {
            dq.pollLast();
        }
        dq.offerLast(val);
    }

    // 出队：如果出的是当前最大值，才弹出
    void pop(int val) {
        if (!dq.isEmpty() && dq.peekFirst() == val) {
            dq.pollFirst();
        }
    }

    // 获取当前最大值
    int max() {
        return dq.peekFirst();
    }
}
```

使用方式（比如滑动窗口最大值）：

```java
int[] nums = {1,3,-1,-3,5,3,6,7};
int k = 3;
MonotonicQueue mq = new MonotonicQueue();
List<Integer> res = new ArrayList<>();

for (int i = 0; i < nums.length; i++) {
    if (i < k - 1) {
        mq.push(nums[i]); // 先填满窗口
    } else {
        mq.push(nums[i]);
        res.add(mq.max());
        mq.pop(nums[i - k + 1]); // 移除左端
    }
}
```

---

## 🧩 六、DP 优化场景（比如 LC1696）

题意：

> 你每次可以跳 1～k 步，求路径最大得分。

递推式：

```
dp[i] = nums[i] + max(dp[i−1], dp[i−2], ..., dp[i−k])
```

这个「max」每次都要在一个滑动窗口中取最大值，用单调队列就刚好！

代码示例：

```java
int[] dp = new int[n];
dp[0] = nums[0];
Deque<Integer> dq = new ArrayDeque<>();
dq.offer(0);

for (int i = 1; i < n; i++) {
    // 移除超出窗口的下标
    while (!dq.isEmpty() && dq.peek() < i - k) dq.poll();

    // 计算 dp[i]
    dp[i] = dp[dq.peek()] + nums[i];

    // 维持单调递减
    while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) dq.pollLast();

    dq.offerLast(i);
}
```

---

## ⚡ 七、时间复杂度分析

* 每个元素最多被：

  * 入队一次
  * 出队一次
    ✅ 所以整体是 O(n)。

---

## 🎯 八、典型题目总结

| 题号     | 题名           | 用途            |
| ------ | ------------ | ------------- |
| LC239  | 滑动窗口最大值      | 经典模板          |
| LC1696 | Jump Game VI | DP 优化         |
| LC1425 | 带约束的子序列和     | DP 优化         |
| LC862  | 最短子数组和 ≥ K   | 最小值队列         |
| LC1438 | 绝对差限制最长子数组   | 同时维护最大 + 最小队列 |

---

## 🧭 九、你该怎么「想到用单调队列」

这才是重点 🎯

当你看到题目里出现这类特征时：

| 题目特征                                  | 往往可以用单调队列 |
| ------------------------------------- | --------- |
| “滑动窗口”、“固定范围 k 内”                     | ✅         |
| “取最大/最小值”                             | ✅         |
| “dp[i] = nums[i] + max(dp[i−k..i−1])” | ✅         |
| “维护区间最优值”                             | ✅         |

一旦看到这些关键字，脑中就该闪出一句：

> “这不就是单调队列干的活嘛。”