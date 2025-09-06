---
title: LC392. 判断子序列 is-subsequence
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, two-pointer]
published: true
---

# LC392. 判断子序列 is-subsequence

给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。

（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

进阶：

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

示例 1：

输入：s = "abc", t = "ahbgdc"
输出：true
示例 2：

输入：s = "axc", t = "ahbgdc"
输出：false
 

提示：

0 <= s.length <= 100
0 <= t.length <= 10^4
两个字符串都只由小写字符组成。

# v1-双指针

## 思路

两个指针，同时从左往右移动。

ps 为 s 的指针；pt 为 t 的指针。

有相同的，则同时移动，否则就是一直移动到匹配的位置。



## 实现

```java
public boolean isSubsequence(String s, String t) {
        int j = 0;
        int nt = t.length();
        for(int i = 0; i < s.length(); i++) {
            //在t中寻找
            char c = s.charAt(i);

            boolean flag = false;
            for(int k = j ; k < nt; k++) {
                if(t.charAt(k) == c) {
                    j = k+1;
                    flag = true;
                    break;
                }
            }

            if(!flag) {
                return false;
            }
        }

        return true;
    }
```

## 效果

0ms 击败 100.00%

## 复杂度

TC: O(n)

## 反思

这个属于第一直觉直接解决了，还是多刷题比较好。

# 参考资料