---
title: LC58. 最后一个单词的长度 length-of-last-word
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC58. 最后一个单词的长度 length-of-last-word



给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。

单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

 

示例 1：

输入：s = "Hello World"
输出：5
解释：最后一个单词是“World”，长度为 5。
示例 2：

输入：s = "   fly me   to   the moon  "
输出：4
解释：最后一个单词是“moon”，长度为 4。
示例 3：

输入：s = "luffy is still joyboy"
输出：6
解释：最后一个单词是长度为 6 的“joyboy”。
 

提示：

1 <= s.length <= 10^4

s 仅有英文字母和空格 ' ' 组成

s 中至少存在一个单词
 
# v1-基础

## 思路

值得注意的就是从后往前，性能更好一些。

## 实现

```java
class Solution {
    public int lengthOfLastWord(String s) {
        int len = 0;
        int n = s.length();
        for(int i = n-1; i >= 0; i--) {
            char c = s.charAt(i);

            // 忽略后边的空格
            if(c == ' ' && len == 0) {
                continue;
            } else if(c != ' ') {
                len++;
            } else if(c == ' ') {
                // 再次遇到空格
                break;
            }
        }

        return len;
    }
}
```

## 效果

0ms 击败 100.00%

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
