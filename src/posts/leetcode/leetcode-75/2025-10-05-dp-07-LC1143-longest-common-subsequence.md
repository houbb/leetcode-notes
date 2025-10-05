---
title: LC1143. 最长公共子序列 longest-common-subsequence
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC1143. 最长公共子序列 longest-common-subsequence

给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。

如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

示例 1：

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。

示例 2：

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。

示例 3：

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
 

提示：

1 <= text1.length, text2.length <= 1000
text1 和 text2 仅由小写英文字符组成。

# v1-dp

## 思路

1）dp 数组

dp[i][j] 代表达到这个 `text1[0 ... i]` & `text2[0 ... j]` 所共同拥有的最长子序列

2）初始化

主要是边界值的处理。

3）转移方程

`text1[i] == text2[j]`，则 `dp[i][j] = dp[i-1][j-1] + 1` 

否则：

```java
dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
```

4） 返回

直接返回 dp[m-1][n-1] 就是结果

## 实现

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();

        int[][] dp = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n ; j++) {
                char ci = text1.charAt(i);
                char cj = text2.charAt(j);

                // 边界
                if(i == 0) {
                    if(j == 0) {
                        dp[0][0] = (ci == cj) ? 1 : 0;
                    } else {
                        dp[0][j] = (ci == cj) ? 1 : dp[0][j-1];
                    }
                } else if(j == 0) { 
                    dp[i][0] = (ci == cj) ? 1 : dp[i-1][0];
                } else {
                    // 相等，则+1
                    if(ci == cj) {
                        dp[i][j] = dp[i-1][j-1] + 1;
                    } else {
                        // 前边的最大值
                        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                    }
                }
            }
        }

        return dp[m-1][n-1];
    }
}
```

## 效果

24ms 击败 19.03%

## 反思

为什么 dp 这么慢，还有更好的解法吗？

## 优化1-数组

### 思路

charAt 存在边界校验。可以用 char 数组替代

### 实现

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        char[] mcs = text1.toCharArray();
        char[] ncs = text2.toCharArray();

        int[][] dp = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n ; j++) {
                char ci = mcs[i];
                char cj = ncs[j];

                // 边界
                if(i == 0) {
                    if(j == 0) {
                        dp[0][0] = (ci == cj) ? 1 : 0;
                    } else {
                        dp[0][j] = (ci == cj) ? 1 : dp[0][j-1];
                    }
                } else if(j == 0) { 
                    dp[i][0] = (ci == cj) ? 1 : dp[i-1][0];
                } else {
                    // 相等，则+1
                    if(ci == cj) {
                        dp[i][j] = dp[i-1][j-1] + 1;
                    } else {
                        // 前边的最大值
                        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                    }
                }
            }
        }

        return dp[m-1][n-1];
    }
}
```

### 效果

14ms 击败 71.54%

### 反思

这个不是算法角度的优化，而是 jdk 细节的优化。

## 调整2-简化实现

### 思路

各种边界的判断比较麻烦，我们可以额外创建一下数组，返回 dp[m][n]

从 1 开始，避免处理 0 的问题。

### 实现

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        char[] mcs = text1.toCharArray();
        char[] ncs = text2.toCharArray();

        int[][] dp = new int[m+1][n+1];
        for(int i = 1; i <= m; i++) {
            for(int j = 1; j <= n ; j++) {
                if(mcs[i-1] == ncs[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }

        return dp[m][n];
    }
}
```

### 效果

9ms 击败 97.70%

50.02MB 击败 26.69%

# v2-数组压缩

## 思路

空间压缩，同时可以提升性能。

## 实现

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        char[] mcs = text1.toCharArray();
        char[] ncs = text2.toCharArray();

        int[] dp = new int[n+1]; // 用一维数组代替二维
        for(int i = 1; i <= m; i++) {
            int prev = 0; // 相当于 dp[i-1][j-1]
            for(int j = 1; j <= n ; j++) {
                int temp = dp[j]; // 暂存 dp[i-1][j]
                if(mcs[i-1] == ncs[j-1]) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.max(dp[j], dp[j-1]);
                }
                prev = temp; // 更新 prev，为下一列使用
            }
        }

        return dp[n];
    }
}
```

## 效果 

7ms 击败 99.78%

40.70MB 击败 95.95%

## 反思

数组压缩确实是和不错的技巧。

# 参考资料