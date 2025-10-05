---
title: LC63. 不同路径 II unique-paths-ii
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC63. 不同路径 II

给定一个 m x n 的整数数组 grid。一个机器人初始位于 左上角（即 grid[0][0]）。机器人尝试移动到 右下角（即 grid[m - 1][n - 1]）。机器人每次只能向下或者向右移动一步。

网格中的障碍物和空位置分别用 1 和 0 来表示。机器人的移动路径中不能包含 任何 有障碍物的方格。

返回机器人能够到达右下角的不同路径数量。

测试用例保证答案小于等于 2 * 109。

 
示例 1：

输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。

```
⬜ ⬜ ⬜
⬜ 🚫 ⬜
⬜ ⬜ ⬜
```

从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右


示例 2：


输入：obstacleGrid = [[0,1],[0,0]]
输出：1

```
⬜ 🚫
⬜ ⬜
``` 

提示：

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] 为 0 或 1

# v1-dp

## 思路

1）dp 数组

dp[i][j] 代表达到这个 [i][j] 位置的方式数量。


2）初始化

如果当前位置有障碍，则为0。

如果没有，则和前面一步保持一致。

3）转移方程

其他的位置，可以有两种方式，从左边、上边。

如果当前位置有障碍，则为0

```
dp[i][j] = dp[i-1][j] + dp[i][j-1];
```

4） 返回

直接返回 dp[m-1][n-1] 就是结果

## 实现

```java
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
       int m = obstacleGrid.length;
       int n = obstacleGrid[0].length;

       int[][] dp = new int[m][n];

       
       for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            if(obstacleGrid[i][j] != 0) {
                continue;
            }

            if(i == 0) {
                // 第一列   
                if(j == 0) {
                    dp[0][0] = 1;
                } else {
                    // 上边可达
                    dp[0][j] = dp[0][j-1];
                }
            } else if(j == 0) {
                // 第一行
                dp[i][0] = dp[i-1][0];
            } else {
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

和 LC62 有一点区别。但是难度还好。

# 参考资料