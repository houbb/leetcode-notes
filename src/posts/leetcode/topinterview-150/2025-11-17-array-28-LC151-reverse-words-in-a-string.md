---
title: LC151. 反转字符串中的单词 reverse-words-in-a-string
date: 2025-11-17
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC151. 反转字符串中的单词 reverse-words-in-a-string

给你一个字符串 s ，请你反转字符串中 单词 的顺序。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

示例 1：

输入：s = "the sky is blue"
输出："blue is sky the"


示例 2：

输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。


示例 3：

输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
 

提示：

1 <= s.length <= 10^4

s 包含英文大小写字母、数字和空格 ' '

s 中 至少存在一个 单词
 
进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。


# v1-暴力

## 思路

借助 stack 实现逆序

借助 buffer 实现 append

## 实现

```java
class Solution {
    public String reverseWords(String s) {
        Stack<String> stack = new Stack<>();

        // 处理
        StringBuilder buffer = new StringBuilder();
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if(c == ' ') {
                if(buffer.length() > 0) {
                    stack.push(buffer.toString());
                    buffer.setLength(0);
                }   
            } else {
                buffer.append(c);
            }
        }
        // 还有剩余的
        if(buffer.length() > 0) {
            stack.push(buffer.toString());
        }

        // 拼接
        StringBuilder result = new StringBuilder();
        while(!stack.isEmpty()) {
            result.append(stack.pop()).append(' ');        
        }

        // 删除最后一个空格
        result.deleteCharAt(result.length()-1);
        return result.toString();
    }

}
```

## 效果

8ms 击败 36.06%

# v2-优化？




# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
