---
title: LC1768. 交替合并字符串 merge-strings-alternately
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# 1768. 交替合并字符串

给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。

如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。

返回 合并后的字符串 。


示例 1：

输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"
解释：字符串合并情况如下所示：
word1：  a   b   c
word2：    p   q   r
合并后：  a p b q c r
示例 2：

输入：word1 = "ab", word2 = "pqrs"
输出："apbqrs"
解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
word1：  a   b 
word2：    p   q   r   s
合并后：  a p b q   r   s
示例 3：

输入：word1 = "abcd", word2 = "pq"
输出："apbqcd"
解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
word1：  a   b   c   d
word2：    p   q 
合并后：  a p b q c   d
 

提示：

1 <= word1.length, word2.length <= 100
word1 和 word2 由小写英文字母组成

# 思路1

## 思路

简单的通过 min 控制二者共同的部分，然后分别添加二者剩余的。

## 实现

```java
    public String mergeAlternately(String word1, String word2) {
        int left = 0;
        int right = 0;
        StringBuilder buffer = new StringBuilder();    


        //1. 最小的长度
        int n1 = word1.length();
        int n2 = word2.length();
        int min = Math.min(n1, n2);
        for(int i = 0; i < min; i++) {
            buffer.append(word1.charAt(left++));
            buffer.append(word2.charAt(right++));
        }

        // 剩余的
        for(int i = left; i < n1; i++) {
            buffer.append(word1.charAt(i));
        }
        for(int i = right; i < n2; i++) {
            buffer.append(word2.charAt(i));
        }    
        return buffer.toString();
    }
```

## 效果

0ms 击败 100.00%

# 参考资料

https://leetcode.cn/problems/merge-strings-alternately/description/?envType=study-plan-v2&envId=leetcode-75
