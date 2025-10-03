---
title: LC374. 猜数字大小 guess-number-higher-or-lower
date: 2025-10-03
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-search]
published: true
---

# LC374. 猜数字大小 guess-number-higher-or-lower

我们正在玩猜数字游戏。猜数字游戏的规则如下：

我会从 1 到 n 随机选择一个数字。 请你猜选出的是哪个数字。（我选的数字在整个游戏中保持不变）。

如果你猜错了，我会告诉你，我选出的数字比你猜测的数字大了还是小了。

你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有三种可能的情况：

-1：你猜的数字比我选出的数字大 （即 num > pick）。
1：你猜的数字比我选出的数字小 （即 num < pick）。
0：你猜的数字与我选出的数字相等。（即 num == pick）。

返回我选出的数字。

示例 1：

输入：n = 10, pick = 6
输出：6
示例 2：

输入：n = 1, pick = 1
输出：1
示例 3：

输入：n = 2, pick = 1
输出：1
 

提示：

1 <= n <= 2^31 - 1
1 <= pick <= n

# v1-二分

## 思路

直接基础的二分实现。

只不过比较大小，改为了调用一下 guess 而已。

## 实现

```java
public class Solution extends GuessGame {
    public int guessNumber(int n) {
        int left = 1;
        int right = n;

        while(left <= right) {
            int mid = left + (right-left) / 2;

            int guess = guess(mid);
            if(guess == 0) {
                return mid;
            } else if(guess == -1) {
                // 太大了，去左边
                right = mid-1;
            } else {
                left = mid+1;
            }
        }

        return -1;
    }

}   
```

## 效果

0ms 100%

## 反思

比较简单，其实力扣题目虽然多，但是这种都是大差不多的。

所以没必要追求数量。


# 参考资料