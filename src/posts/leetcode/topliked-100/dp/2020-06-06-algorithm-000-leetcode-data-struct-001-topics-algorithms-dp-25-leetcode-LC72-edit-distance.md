---

title: 算法篇专题之动态规划 dynamic-programming 26-LC72. 编辑距离 edit-distance
date:  2020-06-08
categories: [TopLiked100]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下编辑距离

# LC72. 编辑距离 edit-distance

给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
 

示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
 

提示：

0 <= word1.length, word2.length <= 500
word1 和 word2 由小写英文字母组成
 


# v1-递归

## 思路

两个字符串对比，其实就是如下几个情况：

终止条件：

其中一个先到了尽头，那么剩余的另一个部分，只能通过插入来实现。

如果 `s1[i] == s2[j]` 无需任何操作

如果不是的话，只有三种方式：

1）插入 dfs(i, j+1) + 1
 
2）删除 dfs(i+1, j) + 1
 
4）替换 dfs(i+1, j+1)

然后取三者的最小值

## 实现

```java
    public int minDistance(String word1, String word2) {
        return dfs(word1, word2, 0, 0);
    }

    private int dfs(String s1, String s2, int i, int j) {
        if(i >= s1.length()) {
            return s2.length()-j;
        }
        if(j >= s2.length()) {
            return s1.length()-i;
        }

        if(s1.charAt(i) == s2.charAt(j)) {
                return dfs(s1, s2, i+1,  j+1);
        } else {
            int insert = dfs(s1, s2, i, j+1) + 1;
            int delete = dfs(s1, s2, i+1, j) + 1;
            int update = dfs(s1, s2, i+1, j+1) + 1;

            return Math.min(insert, Math.min(delete, update));
        }
    }
```

## 效果

超出时间限制
25 / 1147 个通过的测试用例

## 复杂度

时间复杂度：指数级 O(3^(m+n))，非常慢

空间复杂度：递归栈深度 O(m+n)

# v2-dp

## 思路

我们用dp来实现。

1）dp 数组

dp[i][j] 表示 s1[0,...,i] 和 s2[0,...,j] 的最小操作数

2）状态转移方程

3）初始化

4）循环

5）返回值

`dp[m-1][n-1]`

## 实现

```java
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        if(m == 0 || n == 0) {
            return Math.abs(m-n);
        }
        int[][] dp = new int[m][n];

        // dp[0][0]
        dp[0][0] = word1.charAt(0) == word2.charAt(0) ? 0 : 1;
        // 第一行 s1 [0,...,0] 和 s2[0,...j]
        for(int i = 1 ; i < n; i++) {
            if(word1.charAt(0) == word2.charAt(i)) {
                // 前面用插入，最后一个匹配
                dp[0][i] = i; // 前面都需要插入 j 次，最后一个对上了
            } else {
                dp[0][i] = dp[0][i-1] + 1; // 前面基础上再插入/替换
            }
        }

        // 第一列
        for(int i = 1 ; i < m; i++) {
            if(word2.charAt(0) == word1.charAt(i)) {
                // 前面用插入，最后一个匹配
                dp[i][0] = i; // // 删除 i 次，最后一个对上
            } else {
                dp[i][0] = dp[i-1][0] + 1; // 基础上再删除/替换
            }
        }

        // 从1开始
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                if(word1.charAt(i) == word2.charAt(j)) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    int insert = dp[i-1][j] + 1;
                    int delete = dp[i][j-1] + 1;
                    int update = dp[i-1][j-1] + 1;

                    dp[i][j] = Math.min(insert, Math.min(delete, update));
                }
            }
        }

        // 剩下的部分呢？

        return dp[m-1][n-1];
    }
```

## 效果

4ms 击败 84.46%

## 复杂度

TC: O(m*n)

SC: O(m*n)

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

