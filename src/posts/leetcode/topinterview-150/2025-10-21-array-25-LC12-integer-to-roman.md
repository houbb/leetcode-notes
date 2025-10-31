---
title: LC12. 整数转罗马数字 integer-to-roman
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC12. 整数转罗马数字 integer-to-roman

罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

罗马数字是通过添加从最高到最低的小数位值的转换而形成的。将小数位值转换为罗马数字有以下规则：

如果该值不是以 4 或 9 开头，请选择可以从输入中减去的最大值的符号，将该符号附加到结果，减去其值，然后将其余部分转换为罗马数字。
如果该值以 4 或 9 开头，使用 减法形式，表示从以下符号中减去一个符号，例如 4 是 5 (V) 减 1 (I): IV ，9 是 10 (X) 减 1 (I)：IX。仅使用以下减法形式：4 (IV)，9 (IX)，40 (XL)，90 (XC)，400 (CD) 和 900 (CM)。
只有 10 的次方（I, X, C, M）最多可以连续附加 3 次以代表 10 的倍数。你不能多次附加 5 (V)，50 (L) 或 500 (D)。如果需要将符号附加4次，请使用 减法形式。
给定一个整数，将其转换为罗马数字。

 

示例 1：

输入：num = 3749

输出： "MMMDCCXLIX"

解释：

3000 = MMM 由于 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC 由于 500 (D) + 100 (C) + 100 (C)
  40 = XL 由于 50 (L) 减 10 (X)
   9 = IX 由于 10 (X) 减 1 (I)
注意：49 不是 50 (L) 减 1 (I) 因为转换是基于小数位
示例 2：

输入：num = 58

输出："LVIII"

解释：

50 = L
 8 = VIII
示例 3：

输入：num = 1994

输出："MCMXCIV"

解释：

1000 = M
 900 = CM
  90 = XC
   4 = IV
 

提示：

1 <= num <= 3999

# v1-常规

## 思路

从最大到最小，能减多少就减多少，同时拼上对应的符号。

也就是说：

准备一个「数值→符号」映射表；

从最大值开始，不断地看当前 num 能减去多少；

每减一次，就把对应符号拼上去；

直到 num = 0。

### 映射关系

| 数值   | 罗马字符 |
| ---- | ---- |
| 1000 | M    |
| 900  | CM   |
| 500  | D    |
| 400  | CD   |
| 100  | C    |
| 90   | XC   |
| 50   | L    |
| 40   | XL   |
| 10   | X    |
| 9    | IX   |
| 5    | V    |
| 4    | IV   |
| 1    | I    |




## 实现

```java
public String intToRoman(int num) {
    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < values.length && num > 0; i++) {
        while (num >= values[i]) {
            num -= values[i];
            sb.append(symbols[i]);
        }
    }
    return sb.toString();
}
```

## 效果

3ms 击败 98.87%

# v2-提前处理

## 说明

这个和 LC13 类似，提前处理所有。

不过因为测试用例的关系，性能一般

## 实现

```java
class Solution {

    public static final String[] ROMAN_MAP = new String[4000]; // 1~3999

    static {
        String[] M = {"", "M", "MM", "MMM"};
        String[] C = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] X = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] I = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

        for (int num = 1; num <= 3999; num++) {
            String roman = 
                M[num / 1000] + 
                C[(num % 1000) / 100] + 
                X[(num % 100) / 10] + 
                I[num % 10];

             ROMAN_MAP[num] = roman;
        }
    }

    public String intToRoman(int num) {
        return ROMAN_MAP[num];
    }
}
```

## 效果

6 ms 击败 33.56%

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
