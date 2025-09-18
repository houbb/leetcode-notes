---

title: 算法篇专题之动态规划 dynamic-programming 23-LC1143. 最长公共子序列 longest-common-subsequence
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下不同路径

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


# v1-递归

## 思路

核心思路

1）如果 `text1[i] == text[j]`，那么长度等于 (i-1,j-1) + 1

如果不等于，长度等于 `max((i-1, j), (i, j-1))`

2) 终止条件 `i < 0 || j < 0`, 返回 0

## 实现

```java
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();

        return dfs(text1, text2, m-1, n-1);
    }

    private int dfs(String text1, String text2, int i, int j) {
        if(i < 0 || j < 0) {
            return 0;
        }

        if(text1.charAt(i) == text2.charAt(j)) {
            return dfs(text1, text2, i-1, j-1) + 1;
        } else {
            return Math.max(dfs(text1, text2, i-1, j), 
            dfs(text1, text2, i, j-1));    
        }
    }
```

## 效果

超出时间限制
17 / 47 个通过的测试用例

## 复杂度

时间复杂度：O(2^(m+n))，因为每一步递归有两条分支。

空间复杂度：O(m+n)，递归栈深度。

## 反思

DFS 递归比较直观，但是性能比较差。

我们可以尝试使用 dp 来优化。

# v2-DP

## 思路

分为5步走：

1）dp 数组含义

dp[i][j] 代表的是 text1[0,...,i] 和 text1[0,...,j] 的最长子串

2）状态转移方程

和递归类似

如果 text1[i] == text2[j]，那么 `dp[i][j] == dp[i-1][j-1] + 1`;

如果不相等，取前面的最大值 `dp[i][j] == max(dp[i-1][j], dp[i][j-1])`

3) 初始化

这一步其实可选，不过预处理一下，边界判断会变得优雅很多，建议做一下。

第一行

`dp[0][j]` 表示 text1[0] 和 text2[0..j] 的 LCS 长度。

其实就是如果 `text2[j] == text1[0]`，则后面的都是1，否则是0


第一列
`dp[0][j]` 表示 text1[0...i] 和 text2[0] 的 LCS 长度。

其实就是如果 `text1[i] == text2[0]`，则后面的都是1，否则是0

4）迭代

第三步处理完了边界，我们只需要从 i=1, j=1 双层迭代即可。

5）返回值

返回 `dp[m-1][n-1]`


## 实现

```java
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();

        int[][] dp = new int[m][n];
        //第一行+列
        for(int j = 0; j < n; j++) {
            if(text1.charAt(0) == text2.charAt(j)) {
                dp[0][j] = 1;
            }else {
                if(j >= 1) {
                    // 上一个
                    dp[0][j] = dp[0][j-1];
                }
            }
        }
        for(int i = 0; i < m; i++) {
            if(text1.charAt(i) == text2.charAt(0)) {
                dp[i][0] = 1;
            }else {
                if(i >= 1) {
                    // 上一个
                    dp[i][0] = dp[i-1][0];
                }
            }
        }

        // 3. 迭代
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                if(text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }


        return dp[m-1][n-1];
    }

```

## 结果

19ms 击败 62.43%

## 复杂度

TC: O(m*n)

## 反思

DFS 这种是指数级别的，特别慢。

我们来用 dp 来解决这个问题。



# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://github.com/houbb/lmxxf-it)

[老马主站](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。

