---
title: LC6. Z 字形变换 zigzag-conversion
date: 2025-11-17
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC6. Z 字形变换 zigzag-conversion

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"

示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"


解释：

```
P     I    N
A   L S  I G
Y A   H R
P     I
```

示例 3：

输入：s = "A", numRows = 1
输出："A"
 

提示：

1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000


# v1-基本解法

## 思路

这一题难点在于理解题意。

其实就是从上到下，从左到右排列。

1）最开始向下

2）行达到  nums-1，开始向上

3）行达到0，开始向下

如此返回

我们可以用 nums 数量的 `List<StringBuilder>`，最后拼接在一起就行。

## 实现

```java
class Solution {
    public String convert(String s, int numRows) {
        if(numRows == 1) {
            return s;
        }

        List<StringBuilder> list = new ArrayList<>();
        for(int i = 0; i < numRows; i++) {
            list.add(new StringBuilder());
        }

        int curRow = 0;
        boolean directionDown = true;
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            list.get(curRow).append(c);

            // 往哪里走
            if(directionDown) {
                curRow++;
            } else {
                curRow--;
            }

            // 判断是否转向
            if(curRow == 0) {
                directionDown = true;
            } 
            if(curRow == (numRows-1)) {
                directionDown = false;
            }
        }

        // 拼接
        StringBuilder buffer = new StringBuilder();
        for(int i = 0; i < numRows; i++) {
            buffer.append(list.get(i));
        }
        return buffer.toString();

    }
}
```


### 效果

7ms 击败 48.78%

# v2-性能优化

## 思路

数组替代 list

提前指定 buffer 的大小，避免再次扩展。

减少charAt调用

## 实现

```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        
        // 预估计每行容量，减少扩容
        int avgLen = s.length() / numRows + 1;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder(avgLen);
        }
        
        int curRow = 0;
        int step = 1;
        char[] chars = s.toCharArray(); // 减少charAt调用
        
        for (char c : chars) {
            rows[curRow].append(c);
            curRow += step;
            if (curRow == 0 || curRow == numRows - 1) {
                step = -step;
            }
        }
        
        // 预估计总容量
        StringBuilder result = new StringBuilder(s.length());
        for (StringBuilder row : rows) {
            result.append(row);
        }
        return result.toString();
    }
}
```

## 效果

4ms 击败 87.94%

# v3-数学规律

## 思路

这个是最强的，但是不太容易想到。

## 实现

```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        
        StringBuilder result = new StringBuilder(s.length());
        int n = s.length();
        int cycleLen = 2 * numRows - 2; // 每个周期的长度
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j + i < n; j += cycleLen) {
                // 垂直列上的字符
                result.append(s.charAt(j + i));
                
                // 斜线上的字符（不包括第一行和最后一行）
                if (i != 0 && i != numRows - 1 && j + cycleLen - i < n) {
                    result.append(s.charAt(j + cycleLen - i));
                }
            }
        }
        return result.toString();
    }
}
```

## 效果

2ms 99.70%

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
