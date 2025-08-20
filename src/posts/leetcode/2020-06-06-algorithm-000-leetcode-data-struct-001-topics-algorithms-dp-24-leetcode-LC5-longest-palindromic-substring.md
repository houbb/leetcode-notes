---

title: 算法篇专题之动态规划 dynamic-programming 24-LC5. 最长回文子串 longest-palindromic-substring
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下最长回文子串

# LC5. 最长回文子串 longest-palindromic-substring

给你一个字符串 s，找到 s 中最长的 回文 子串。

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成

# 历史回顾

[05-5. 最长回文子串 Longest Palindromic Substring](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-005-leetcode-05-longest-palindromic-substring.html)

# v1-暴力

## 思路

我们穷举所有的可能，然后判断是否为合法的回文。

返回最长的一个即可。

## 实现

```java
    public String longestPalindrome(String s) {
        // 全部
        int maxLeft = 0;
        int maxRight = 0;
        int maxLen = 0;
        int n = s.length();
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                if(isValid(s, i, j)) {
                    int len = j-i+1;
                    if(len > maxLen) {
                        maxLen = len;
                        maxLeft = i;
                        maxRight = j;
                    }
                }
            }
        }

        return s.substring(maxLeft, maxRight+1);
    }

    private boolean isValid(String s, int left, int right) {
        while(left < right) {
            if(s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
```

## 结果

2337ms 击败 5.02%

## 反思

枚举所有子串，再判断是不是回文，复杂度 **O(n³)**（枚举 O(n²)，判断 O(n)）。

还能更快吗？

# v2-dp

## 思路

我们之所以每次遍历一次，是因为没有复用上一次的结果。

如何才能复用上一次的结果呢？

要优化成 **DP**，核心思路是：

* 通过子问题结果（较小的子串是否回文），推出更大子串是否回文。
* 避免重复判断。

## 核心流程

1) 定义状态：

* `dp[i][j] = true` 表示 `s[i..j]` 是回文串。

2) 状态转移：

* 当 `s[i] == s[j]` 时，`dp[i][j]` 取决于里面的子串 `s[i+1..j-1]`：

  ```
  dp[i][j] = (s[i] == s[j]) && (j - i < 3 || dp[i+1][j-1])
  ```

  * `j - i < 3` 表示子串长度 ≤ 2 时，只需要两端相等即可。
  * 否则必须依赖子问题。

3) 初始化：

* 单个字符都是回文串：`dp[i][i] = true`。

4) 填表顺序：

* 要保证转移时 `dp[i+1][j-1]` 已经算好，

所以 `i` 要 从大到小 遍历，`j` 从小到大。

5) 返回

和 v1 类似，我们记录一下对应的最大值信息返回即可。

## 实现

```java
    public String longestPalindrome(String s) {
        int start = 0;
        int maxLen = 1;
        int n = s.length();

        boolean[][] dp = new boolean[n][n];
        for(int i = 0; i < n; i++) {
            dp[i][i] = true;        
        }

        // 注意这里的 i >= 0
        for(int i = n-1; i >= 0; i--) {
            for(int j = i+1; j < n; j++) {
                if(s.charAt(i) == s.charAt(j)) {
                    // 距离小于3，直接是回文
                    dp[i][j] = dp[i+1][j-1] || (j - i) < 3;

                    // 更新
                    int len = j-i+1;
                    if(dp[i][j] && len > maxLen) {
                        start = i;
                        maxLen = len;
                    }
                }
            }
        }

        return s.substring(start, start+maxLen);
    }
```

## 效果

107ms 击败 48.42%

## 复杂度

TC：O(n²)

SC：O(n²)（二维 dp 数组）

## 反思

dp 解法还是很清晰的。

还能更快吗？

# v3-中心扩展法

## 思路

是否为回文，我们用扩展的思路。

有 2 个场景：

1) 以 i 字符为中心，比如 i=a, 那么 bab

2) 以 i 和 i+1 为中心，比如 i=a,i+1=b  那么 baab

## 实现

```java
    public String longestPalindrome(String s) {
        int start = 0;
        int maxLen = 1;
        int n = s.length();

        
        for(int i = 0; i < n; i++) {
            int len1 = expand(i, i, s);    
            int len2 = expand(i, i+1, s);    

            int len = Math.max(len1, len2);

            if(len > maxLen) {
                maxLen = len;
                start = i - (len-1) / 2;
            }

        }   

        return s.substring(start, start+maxLen);
    }

    private int expand(int left, int right, String s) {
        while(left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }

        //在循环结束时，left 和 right 已经多减多加了一次，不再属于回文的范围。
        return right-left-1;
    }
```

## 效果

14ms 击败 89.68%

## 复杂度

时间复杂度: O(n²)

空间复杂度: O(1)


# v4-马拉车

> [马拉车](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-005-leetcode-05-longest-palindromic-substring.html#v3-%E9%A9%AC%E6%8B%89%E8%BD%A6%E7%AE%97%E6%B3%95)

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

