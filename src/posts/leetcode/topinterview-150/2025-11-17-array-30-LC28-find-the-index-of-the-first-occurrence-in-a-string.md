---
title: LC28. 找出字符串中第一个匹配项的下标 find-the-index-of-the-first-occurrence-in-a-string
date: 2025-11-17
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC28. 找出字符串中第一个匹配项的下标 find-the-index-of-the-first-occurrence-in-a-string

给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 

示例 1：

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
示例 2：

输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 

提示：

1 <= haystack.length, needle.length <= 10^4

haystack 和 needle 仅由小写英文字符组成

# v1-基本解法

## 思路

直接逐个位置循环，判断是否相等即可。

这使我想到了 kmp 算法，应该可以优化

只不过这一题测试用例很简单

## 实现

```java
class Solution {
    public int strStr(String haystack, String needle) {
        if(haystack.length() < needle.length()) {
            return -1;
        }

        char[] firstChars = haystack.toCharArray();
        char[] secondChars = needle.toCharArray();

        for(int i = 0; i < firstChars.length; i++) {
            // 判断二者相同
            if(allSame(firstChars, secondChars, i)) {
                return i;
            }
        }

        return -1;
    }

    private boolean allSame(char[] chars1, char[] chars2, int i) {
        int length = chars1.length;
        if(length - i < chars2.length) {
            return false;
        }

        int n2 = chars2.length;
        int j = 0;
        while(j < n2) {
            if(chars1[i] != chars2[j]) {
                return false;
            }
            i++;
            j++;
        }

        return true;
    }

}
```

## 效果

0ms 100%

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
