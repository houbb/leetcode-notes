---
title: LC62. 不同路径 unique-paths
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC62. 不同路径 unique-paths

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

示例 1：

输入：m = 3, n = 7
输出：28
示例 2：

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
示例 3：

输入：m = 7, n = 3
输出：28
示例 4：

输入：m = 3, n = 3
输出：6
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10^9

# v1-dp

## 思路

1）dp 数组

dp[i][j] 代表达到这个 [i][j] 位置的方式数量。


2）初始化

dp[0][j] 和 dp[i][0] 都是1，只能横向、竖着走


3）转移方程

其他的位置，可以有两种方式，从左边、上边

```
dp[i][j] = dp[i-1][j] + dp[i][j-1];
```

4） 返回

直接返回 dp[m-1][n-1] 就是结果

## 实现

```java
class Solution {
    public int uniquePaths(int m, int n) {
        // 从(0,0) 开始
        int[][] dp = new int[m][n];

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(i == 0 || j == 0) {
                    // 边缘
                    dp[i][j] = 1;
                } else {
                    // 两种方式过来的和
                    dp[i][j] = dp[i-1][j] + dp[i][j-1];
                }
            }
        }    

        return dp[m-1][n-1];
    }
}
```

## 效果

0ms 100%

## 反思

处理好边界值+转移方程，不难。

我们下一篇看一下 LC63 不同路径 II

# 参考资料