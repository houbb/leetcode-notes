---
title: LC1071. 字符串的最大公因子 greatest-common-divisor-of-strings
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# LC1071. 字符串的最大公因子

对于字符串 s 和 t，只有在 s = t + t + t + ... + t + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。

给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。

示例 1：

输入：str1 = "ABCABC", str2 = "ABC"
输出："ABC"
示例 2：

输入：str1 = "ABABAB", str2 = "ABAB"
输出："AB"
示例 3：

输入：str1 = "LEET", str2 = "CODE"
输出：""
 

提示：

1 <= str1.length, str2.length <= 1000
str1 和 str2 由大写英文字母组成


# v1-暴力

## 思路

我们先用暴力的方法。

直接尝试 min(len(s1), min(s2))，用二者最短的直接遍历尝试。

可以从短到长，当然，从长到短可以直接结束。

## 实现

```java
public String gcdOfStrings(String str1, String str2) {
        int n1 = str1.length();
        int n2 = str2.length();

        int min = Math.min(n1, n2);
        //遍历
        for(int i = min; i >= 0; i--) {
            int len = i+1;
            // 无法整除
            if(n1 % len != 0 || n2 % len != 0) {
                continue;
            }

            // 二者都可以被整除
            String item = str1.substring(0, i+1);
            int times1 = n1 / len;

            if(!repeat(item, times1).equals(str1)) {
                continue;
            }
            int times2 = n2 / len;
            if(!repeat(item, times2).equals(str2)) {
                continue;
            }

            return item;
        }



        return "";
    }

    private String repeat(String item, int times) {
        StringBuilder buffer = new StringBuilder();

        for(int i = 0; i < times; i++) {
            buffer.append(item);
        }

        return buffer.toString();
    }
```


## 效果

1ms 击败 81.51%

## 反思

当然，看到 gcd 让我想到了数学定理。

这一题肯定有更好的解法。

# v2-数学方法

## 思路

gcd 我们可以很自然的想到数学欧几里得定理。

1）检查 str1 + str2 == str2 + str1，否则返回 ""

2）求 len(str1) 和 len(str2) 的 GCD，记为 g

3）返回 str1[:g]

## 疑问

1) 为什么要求 str1 + str2 == str2 + str1？

假设有一个最大公因子字符串 X，满足：

```
str1 = X * m （重复 m 次）
str2 = X * n （重复 n 次）
```

那么把两个字符串拼接起来：

```
str1 + str2 = (X*m) + (X*n) = X*(m+n)
str2 + str1 = (X*n) + (X*m) = X*(n+m)
```

可以得到二者相等，进而：

```
str1 + str2 = X*(m+n) = X*(n+m) = str2 + str1
```

这是存在公因子的必要条件。

2) 如何求 2 个数的 gcd?

```
gcd(a,b)=gcd(b,a%b)
```

其中 % 表示取余数。

直到 b = 0，此时 a 就是最大公约数。

也就是

```java
public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

## 实现

```java
public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    public String gcdOfStrings(String str1, String str2) {
        if(!(str1+str2).equals(str2+str1)) {
            return "";
        }

        // gcd
        int len1 = str1.length();
        int len2 = str2.length();
        int len = gcd(len1, len2);

        return str1.substring(0, len);
    }

```

## 效果

1ms 击败 81.51%

时间复杂度低，O(n)

## 反思

为什么不是 100%?


# 参考资料

https://leetcode.cn/problems/greatest-common-divisor-of-strings/description/?envType=study-plan-v2&envId=leetcode-75
