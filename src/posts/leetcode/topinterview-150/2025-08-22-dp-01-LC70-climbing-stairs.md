---
title: LC70. 爬楼梯 climbing-stairs
date: 2025-08-22 
categories: [TopInterview150]
tags: [leetcode, dp, topInterview150]
published: true
---

# 70. 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。

你有多少种不同的方法可以爬到楼顶呢？

示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
 
提示：

1 <= n <= 45

# v1-递归

## 思路

我们能到达当前的位置 i，右两种可能可以达到：

1）跳1格 从 dfs(i-1) 过来

2）跳2格 从 dfs(i-2) 过来

全部的方式 dfs(i) = dfs(i-1) + dfs(i-2)

结束条件：

i == 0，返回1（第一个台阶）

i == 1，返回2（第2个台阶）

开始位置：从 n-1 开始。

## 实现

```java
    public int climbStairs(int n) {
        return dfs(n-1);
    }

    private int dfs(int ix) {
        if(ix == 0) {
            return 1;
        }
        if(ix == 1) {
            return 2;
        }

        return dfs(ix-1) + dfs(ix-2);
    }
```

## 效果

超出时间限制
31 / 45 个通过的测试用例

## 复杂度

时间复杂度：O(2^n)

空间复杂度：O(n)

# v2-dp

## 思路

我们用 dp 加速

1) 数组定义

dp[i] 代表 i 位置的达到方式，dp[0] 代表第一个阶梯

2）状态转移方程

和 v1 类似

```
dp[i] = dp[i-1] + dp[i-2];
```

3) 初始化

```
dp[0] = 1;  // 阶梯1
dp[1] = 2;  // 阶梯2
```

4）迭代

从 i=2（第三个）阶梯开始遍历

5）返回 dp[n-1]

## 实现

```java
    public int climbStairs(int n) {
        if(n <= 1) {
            return 1;
        }

        int[] dp = new int[n];
        dp[0] = 1;
        dp[1] = 2;
        for(int i = 2; i < n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        } 

        return dp[n-1];
    }
```

## 效果

100%

## 复杂度

O(n)






# 参考资料

https://leetcode.cn/problems/climbing-stairs/description/?envType=study-plan-v2&envId=top-interview-150

