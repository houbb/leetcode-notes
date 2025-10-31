---
title: LC13. 罗马数字转整数 roman-to-integer
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC13. 罗马数字转整数 roman-to-integer

罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。

但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。

同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。

示例 1:

输入: s = "III"
输出: 3
示例 2:

输入: s = "IV"
输出: 4
示例 3:

输入: s = "IX"
输出: 9
示例 4:

输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
示例 5:

输入: s = "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
 

提示：

1 <= s.length <= 15

s 仅含字符 ('I', 'V', 'X', 'L', 'C', 'D', 'M')

题目数据保证 s 是一个有效的罗马数字，且表示整数在范围 [1, 3999] 内

题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。

IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。

# v1-常规

## 思路

这一题最大的问题在于题意。

可以分为几个核心的部分：

1）数字的映射关系

```
I  = 1
V  = 5
X  = 10
L  = 50
C  = 100
D  = 500
M  = 1000
```

2) 减法的场景

```
IV = 4   (5 - 1)
IX = 9   (10 - 1)
XL = 40  (50 - 10)
XC = 90  (100 - 10)
CD = 400 (500 - 100)
CM = 900 (1000 - 100)
```

什么时候使用减法呢？

如果当前数字比后一个数字小，就减；否则就加。

## 实现

```java
class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);


        // 循环
        int res = 0;

        // 和后一个比较
        int n = s.length();
        // char[] chars = s.toCharArray();
        for(int i = 0; i < n-1; i++) {
            int cur = map.get(s.charAt(i));
            int next = map.get(s.charAt(i+1));

            // 小于    
            if(cur < next) {
                res -= cur;
            } else {
                res += cur;
            }
        }

        // 最后一个
        res += map.get(s.charAt(n-1));

        return res;
    }

}
```

# v2-贪心

## 穷举

准备所有合法罗马字符组合及其对应数值；

遍历输入字符串，从左到右；

每次优先匹配 2 个字符的组合（比如 "CM"、"IX"）；

如果匹配到，就加上对应数值并跳过 2 个字符；

否则匹配单字符。

## 实现

```java
import java.util.*;

public class Solution {
    public int romanToInt(String s) {
        // 直接映射所有可能的罗马组合
        Map<String, Integer> map = new HashMap<>();
        map.put("I", 1);
        map.put("IV", 4);
        map.put("V", 5);
        map.put("IX", 9);
        map.put("X", 10);
        map.put("XL", 40);
        map.put("L", 50);
        map.put("XC", 90);
        map.put("C", 100);
        map.put("CD", 400);
        map.put("D", 500);
        map.put("CM", 900);
        map.put("M", 1000);

        int res = 0;
        int i = 0;
        while (i < s.length()) {
            // 尝试取两个字符
            if (i + 1 < s.length()) {
                String two = s.substring(i, i + 2);
                if (map.containsKey(two)) {
                    res += map.get(two);
                    i += 2;
                    continue;
                }
            }
            // 否则取单字符
            String one = s.substring(i, i + 1);
            res += map.get(one);
            i++;
        }
        return res;
    }
}
```

## 效果

8ms 击败 13.58%


## 反思

这种反而比较慢，需要创建很多 string 对象


# v3-打表

## 思路

常言道，如果有上限，那么就是直接打标。

## 实现

```java
import java.util.*;

public class Solution {

    public static final String[] ROMAN_MAP = new String[4000]; // 1~3999
    private static final Map<String, Integer> reverseMap = new HashMap<>();

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

             reverseMap.put(roman, num); 
        }
    }

    public int romanToInt(String s) {
        return reverseMap.get(s);
    }
}
```

## 效果

8ms 击败 13.58%

## 反思

这个效果一般，但是其实和 LC12 是通用的。


# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
