---
title: LC746. 使用最小花费爬楼梯 min-cost-climbing-stairs
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC746. 使用最小花费爬楼梯 min-cost-climbing-stairs

给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。

一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。

示例 1：

输入：cost = [10,15,20]
输出：15
解释：你将从下标为 1 的台阶开始。
- 支付 15 ，向上爬两个台阶，到达楼梯顶部。
总花费为 15 。
示例 2：

输入：cost = [1,100,1,1,1,100,1,1,100,1]
输出：6
解释：你将从下标为 0 的台阶开始。
- 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
- 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
- 支付 1 ，向上爬一个台阶，到达楼梯顶部。
总花费为 6 。
 

提示：

2 <= cost.length <= 1000
0 <= cost[i] <= 999

# v1-dp

## 思路

这一题和 LCR 088. 使用最小花费爬楼梯 完全一样。

需要注意的点是，我们在一层支付金额后，即可选择向上爬一个或者两个台阶。

也就是达到这一层不要钱。

我们按照定义

1）dp 数组

dp[i] 代表达到第 i 层，需要支付的最低费用

2）初始化

可以选择从第一层、第二层开始，费用为零

```java
dp[0] = 0;
dp[1] = 0;
```

3）递归公式

取两种方式种的最小值

从 i-1 层走1步上来的费用：

```java
int cost1 = dp[i-1] + cost[i-1];
```

从 i-2 层走2步上来的费用：

```java
int cost2 = dp[i-2] + cost[i-2];
```

则最小值

```java
dp[i] = Math.min(cost1, cost2);
```

4）结果

返回 dp[n]

## 实现

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        int[] dp = new int[n+1];

        dp[0] = 0;
        dp[1] = 0;

        for(int i = 2; i <= n; i++) {
            // 从 i-1 走 1 步上来，要付 cost[i-1]
            int c1 = dp[i-1] + cost[i-1];
            // 从 i-2 走 2 步上来，要付 cost[i-2]
            int c2 = dp[i-2] + cost[i-2];

            dp[i] = Math.min(c1, c2);
        }


        return dp[n];
    }
}
```

## 效果

1ms 击败 20.49%

## 反思

可以更快吗？

# v2-数组压缩

## 思路

此时的数组压缩，可以同时优化空间+时间。

其实我们只会用到 dp[i-1], dp[i-2]

完全可以用两个变量替代

## 实现

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        
        int res = 0;
        int pre1 = 0;
        int pre2 = 0;

        for(int i = 2; i <= n; i++) {
            int c1 = pre1 + cost[i-1];
            int c2 = pre2 + cost[i-2];

            res = Math.min(c1, c2);

            // 当前，就是下一次的 pre1
            pre2 = pre1;
            pre1 = res;
        }


        return res;
    }

}
```

## 效果

0ms 100%

## 反思

多学习一下压缩的写法。

# 参考资料