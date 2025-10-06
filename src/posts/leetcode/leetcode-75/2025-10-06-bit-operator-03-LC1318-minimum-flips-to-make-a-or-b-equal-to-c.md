---
title: LC1318. 或运算的最小翻转次数 minimum-flips-to-make-a-or-b-equal-to-c
date: 2025-10-06
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, bit-operator]
published: true
---

# LC1318. 或运算的最小翻转次数

给你三个正整数 a、b 和 c。

你可以对 a 和 b 的二进制表示进行位翻转操作，返回能够使按位或运算   `a OR b == c`  成立的最小翻转次数。

「位翻转操作」是指将一个数的二进制表示任何单个位上的 1 变成 0 或者 0 变成 1 。

示例 1：

输入：a = 2, b = 6, c = 5
输出：3
解释：翻转后 a = 1 , b = 4 , c = 5 使得 a OR b == c
示例 2：

输入：a = 4, b = 2, c = 7
输出：1
示例 3：

输入：a = 1, b = 2, c = 3
输出：0
 

提示：

1 <= a <= 10^9
1 <= b <= 10^9
1 <= c <= 10^9


# v1-位运算

## 思路

这是个人比较喜欢的解法，相对来说比较直观，也不算特别难想到。

和 LC338 类似，我们逐个比较二进制每一位 1 的个数。

指定位数上最低位是否为1：`(num >> i) & 1`

剩下的就是判断：

1）如果 c 是 0，那么 a、b 的 1 都要反转

2) 如果 c 是 1,那么只在 `a | b == 0` 的时候，反转一次即可

## 实现

```java
class Solution {
    public int minFlips(int a, int b, int c) {
        int flips = 0;
        for (int i = 0; i < 32; i++) {
            int abit = (a >> i) & 1;
            int bbit = (b >> i) & 1;
            int cbit = (c >> i) & 1;

            if (cbit == 1) {
                // 目标是 1，但 (a|b) == 0
                if ((abit | bbit) == 0) flips += 1;
            } else {
                // 目标是 0，要清掉所有 1
                flips += abit + bbit;
            }
        }
        return flips;
    }
}

```

## 效果

1ms 击败 98.67%

## 反思

位运算非常奇妙，值得深入学习。

# 参考资料