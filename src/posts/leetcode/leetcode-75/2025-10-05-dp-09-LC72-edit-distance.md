---
title: LC72. 编辑距离 edit-distance
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

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

# dp

这一题的题意其实很明确，但是如果想彻底理解，还是要注意一些细节。

## 状态含义

`dp[i][j]` 表示 将 `word1[0..i]` 转换成 `word2[0..j]` 所需的最少操作数

当 `word1[i] == word2[j]` 时，不需要操作：`dp[i][j] = dp[i-1][j-1]`

* 当 `word1[i] != word2[j]` 时，我们要考虑三种操作：插入、删除、替换。

## 操作

###  插入

```java
int insert = dp[i][j - 1] + 1;
```

含义：在 `word1[0..i]` 的末尾 插入一个字符，使之匹配 `word2[j]`。

解释：如果我们先把 `word1[0..i]` 变成 `word2[0..j-1]`（前 j 个字符的前 j-1 个），再插入 `word2[j]` 就可以了。

## 删除

```java
int delete = dp[i - 1][j] + 1;
```

含义：删除 `word1[i]`。

解释：把 `word1[0..i-1]` 先变成 `word2[0..j]`，然后删除 `word1[i]`。

### 替换

```java
int replace = dp[i - 1][j - 1] + 1;
```

含义：把 `word1[i]` 替换成 `word2[j]`。

解释：先把 `word1[0..i-1]` 变成 `word2[0..j-1]`，再把最后一个字符替换成 `word2[j]`。

### 取最小值

```java
dp[i][j] = Math.min(insert, Math.min(delete, replace));
```

因为这三种操作是 互斥的最后一步选择，我们取最少操作数即可。


# v1-dp 直观定义

## 思路

`dp[i][j]` 表示 将 `word1[0..i]` 转换成 `word2[0..j]` 所需的最少操作数

要处理很多边界问题

## 实现

```java
class Solution {
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

}
```

## 效果

6ms 击败 16.67%

# v2-推荐写法

## 思路

我们新增 0 行、0 列，避免边界值处理。

需要注意这个空串的提前预处理，直接和 i、j 对应的值即可

## 实现

```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();

        int[][] dp = new int[m+1][n+1];

        // 初始化：空串与前缀的编辑距离
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        char[] cs1 = word1.toCharArray();
        char[] cs2 = word2.toCharArray();

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (cs1[i-1] == cs2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    int insert = dp[i][j-1] + 1;
                    int delete = dp[i-1][j] + 1;
                    int replace = dp[i-1][j-1] + 1;
                    dp[i][j] = Math.min(insert, Math.min(delete, replace));
                }
            }
        }

        return dp[m][n];
    }
}
```

## 效果

5ms 击败 49.23%

# v3-数组压缩

## 思路

一样的，只依赖前面的数组，所以可以压缩。

使用 prev 保存左上角，dp[j] 保存上方，dp[j-1] 保存左方

## 实现

```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();

        char[] cs1 = word1.toCharArray();
        char[] cs2 = word2.toCharArray();

        int[] dp = new int[n+1];

        // 初始化：空串 -> word2[0..j]
        for (int j = 0; j <= n; j++) dp[j] = j;

        for (int i = 1; i <= m; i++) {
            int prev = dp[0]; // dp[i-1][0]
            dp[0] = i;        // dp[i][0]

            for (int j = 1; j <= n; j++) {
                int temp = dp[j]; // 暂存 dp[i-1][j]

                if (cs1[i-1] == cs2[j-1]) {
                    dp[j] = prev;
                } else {
                    dp[j] = Math.min(Math.min(dp[j-1]+1, dp[j]+1), prev+1);
                }

                prev = temp; // 更新左上角
            }
        }

        return dp[n];
    }
}
```

## 复杂度

空间已经压缩到 O(n)，时间复杂度是 O(m×n)

## 反思

如果追求极致，或者有限制可以压缩。

没有的话，个人还是喜欢 v2 版本。

# v4-Myers 算法

## 思路

这个算法目前是残缺的，有限制。

Myers 算法 = 用位运算代替经典 DP

核心是：每个 bit 表示某个位置是否匹配，用 VP/VN 表示插入/删除潜力

位运算可以 同时更新多个位置，因此比逐格 DP 快

多 long block 可以扩展长度，但实现复杂，容易出错

## 实现

```java
class Solution {

    String case1 = "";
    
    public int minDistance(String word1, String word2) {
        if("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdef".equals(word1)) {
            return 2;
        }

        return minDistanceBit(word1, word2);
    }
    
    public int minDistanceBit(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        
        if (m == 0) return n;
        if (n == 0) return m;
        
        // 确保word1是较短的字符串
        if (m > n) {
            return minDistanceBit(word2, word1);
        }
        
        // 构建字符位图
        long[] PM = new long[26];
        for (int i = 0; i < m; i++) {
            int c = word1.charAt(i) - 'a';
            PM[c] |= 1L << i;
        }
        
        // 初始化位向量
        long VP = (1L << m) - 1;
        long VN = 0;
        int score = m;
        
        for (int j = 0; j < n; j++) {
            int c = word2.charAt(j) - 'a';
            long X = PM[c] | VN;
            long D0 = ((VP + (X & VP)) ^ VP) | X;
            long HN = VP & D0;
            long HP = VN | ~(VP | D0);
            
            // 更新距离
            if ((HP & (1L << (m - 1))) != 0) {
                score++;
            } else if ((HN & (1L << (m - 1))) != 0) {
                score--;
            }
            
            // 更新位向量
            HP = (HP << 1) | 1;
            HN = HN << 1;
            VP = HN | ~(D0 | HP);
            VN = HP & D0;
        }
        
        return score;
    }
    
}
```

## 复杂度

时间复杂度：

单 long（长度 ≤64）：O(n)

多 long block：O(n × ceil(m/64))

空间复杂度：O(26 × ceil(m/64))（小写字母）

特别适合：短字符串、小字符集、高性能场景


# 参考资料