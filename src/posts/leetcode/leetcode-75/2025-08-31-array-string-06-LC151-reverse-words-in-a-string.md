---
title: LC151. 反转字符串中的单词 reverse-words-in-a-string
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# 151. 反转字符串中的单词

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

1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词
 

进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。
 
# v1-stack

## 思路

看到这个逆序，很自然的想到 stack。

我们把不是空格的部分，拼接成单词，放入 stack，最后逆序出栈即可。


## 实现

```java
    public String reverseWords(String s) {
        char pre = '\0';

        int n = s.length();
        Stack<String> stack = new Stack<>();
        StringBuilder temp = new StringBuilder();
        for(int i = 0; i < n; i++) {
            char c = s.charAt(i);

            // 处理
            if(c != ' ') {
                temp.append(c);
            } else {
                if(temp.length() > 0) {
                    stack.push(temp.toString());
                    // reset
                    temp.setLength(0);
                }
            }

            pre = c;
        }
        // 最后也要入队
        if(temp.length() > 0) {
            stack.push(temp.toString());
            // reset
            temp.setLength(0);
        }

        // pop
        StringBuilder sb = new StringBuilder();
        while(!stack.isEmpty()) {
            String word = stack.pop();
            sb.append(word).append(' ');
        }

        // 删除最后一个空格
        sb.deleteCharAt(sb.length()-1);

        return sb.toString();
    }
```


## 效果

6ms 击败 58.55%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

为什么慢呢？

`stack.push(temp.toString());` 这里每次构建对象，挺慢的。

如何优化呢

# v2-避免 string 创建

## 思路

我们不用 stack 试一下

## 实现

```java
public String reverseWords(String s) {
        char pre = '\0';

        int n = s.length();

        StringBuilder sb = new StringBuilder();

        Stack<String> stack = new Stack<>();
        StringBuilder temp = new StringBuilder();
        for(int i = 0; i < n; i++) {
            char c = s.charAt(i);

            // 处理
            if(c != ' ') {
                temp.append(c);
            } else {
                if(temp.length() > 0) {
                    sb.append(temp.reverse()).append(' ');
                    // reset
                    temp.setLength(0);
                }
            }

            pre = c;
        }
        // 最后也要入队
        if(temp.length() > 0) {
            sb.append(temp.reverse()).append(' ');
            // reset
            temp.setLength(0);
        }


        // 删除最后一个空格
        sb.deleteCharAt(sb.length()-1);

        return sb.reverse().toString();
    }
```

## 效果

5ms 击败 68.93%

## 反思

略有提升，但是不多，因为逆序也是比较消耗性的

有没有方法可以避免反转？


# v3-单词前插入

## 思路

有的，这个其实是对 stringbuiler 的理解。

我们可以把单词插入到前面，而不是末尾，这样就省的反转了。

## 实现

```java
 public String reverseWords(String s) {
    int n = s.length();
    StringBuilder sb = new StringBuilder();
    StringBuilder temp = new StringBuilder();

    for (int i = 0; i < n; i++) {
        char c = s.charAt(i);
        if (c != ' ') {
            temp.append(c);
        } else {
            if (temp.length() > 0) {
                if (sb.length() > 0) sb.insert(0, ' '); // 前插空格
                sb.insert(0, temp); // 前插单词
                temp.setLength(0);
            }
        }
    }

    // 最后一个单词
    if (temp.length() > 0) {
        if (sb.length() > 0) sb.insert(0, ' ');
        sb.insert(0, temp);
    }

    return sb.toString();
}
```

## 效果

5ms 击败 68.93%

## 反思

感觉 v3 其实是一种很巧妙的解法了，但是效果一般

怀疑底层还是会涉及到 char[] 数组的移动。

# v4-原始数组处理

## 思路

我们可以用空间换时间。

1）临时数组，用于存储去除多余空格后的字符串

2）逆序遍历原始的数组，单词可以从 i 位置向前，用 j 来找到单词的开头。一直到新的 ' ' 或者开头。从 s[j ... i]，依然是一个完整的单词。

通过 j 寻找，和直接逆序，效果应该是类似的。

## 实现

```java
public String reverseWords(String s) {
        int n = s.length();
        char[] arr = new char[n]; // 不用 n+1
        int right = 0; // 写入 arr 的位置

        int i = n - 1;
        while (i >= 0) {
            // 跳过空格
            while (i >= 0 && s.charAt(i) == ' ') i--;
            if (i < 0) break;

            int j = i;
            // 找到单词起始位置
            while (j >= 0 && s.charAt(j) != ' ') j--;

            // s[j+1 .. i] 是一个单词，顺序写入 arr
            if (right > 0) arr[right++] = ' '; // 单词间空格
            for (int k = j + 1; k <= i; k++) {
                arr[right++] = s.charAt(k);
            }

            i = j - 1; // 移动到下一个单词
        }

        return new String(arr, 0, right);
    }
```

## 效果

2ms 击败 97.75%

## 反思

这种写法的技巧性比较强，也体现了我们对于数组的深刻理解。

# 参考资料

