---
title: LC1137. 第 N 个泰波那契数 n-th-tribonacci-number
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC1137. 第 N 个泰波那契数 n-th-tribonacci-number


泰波那契序列 Tn 定义如下： 

T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2

给你整数 n，请返回第 n 个泰波那契数 Tn 的值。

示例 1：

输入：n = 4
输出：4
解释：
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
示例 2：

输入：n = 25
输出：1389537
 

提示：

0 <= n <= 37
答案保证是一个 32 位整数，即 answer <= 2^31 - 1。

# v1-dp

## 思路

题目很友善，dp 公式都给出来了，直接 dp

## 实现

```java
class Solution {

    public int tribonacci(int n) {
        int size = Math.max(3, n+1);

        int[] dp = new int[size];
        dp[0] = 0;
        dp[1] = 1;
        dp[2] = 1;

        for(int i = 3; i <= n; i++) {
            dp[i] = dp[i-1]+dp[i-2] + dp[i-3];
        }
        return dp[n];
    }

}
```

## 效果 

0ms 100%

## 反思

整体并不难，用例也不够严格。

可以作为 dp 的入门题目。

# 参考资料