---
title: LC394. 字符串解码 decode-string
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC394. 字符串解码 decode-string

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

测试用例保证输出的长度不会超过 105。

 
示例 1：

输入：s = "3[a]2[bc]"
输出："aaabcbc"

示例 2：

输入：s = "3[a2[c]]"
输出："accaccacc"


示例 3：

输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"


示例 4：

输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
 

提示：

1 <= s.length <= 30
s 由小写英文字母、数字和方括号 '[]' 组成
s 保证是一个 有效 的输入。
s 中所有整数的取值范围为 [1, 300] 
 
# v1-StringBuilder 

## 思路

一种解法直接，但是不那么高效的方法。

通过 stringbuilder 记录字符信息。

遇到 `]` 再往前处理

1）截取 `[]` 中的字符，是需要重复的信息

2）重复的次数从 `[` 往前找到所有的数字，计算对应的次数

3）结果的处理更新

## 实现

```java
    public String decodeString(String s) {
        String ans="";
        for(char ch:s.toCharArray()){
            if(ch==']'){
                int end=ans.length();
                int start=ans.lastIndexOf('[');
                // 往前判断所有数字
                int i=start-1;
                int count=0;
                while(i>=0&&Character.isDigit(ans.charAt(i))){
                    count=((ans.charAt(i)-'0')*(int)Math.pow(10,start-1-i)+count);
                    i--;
                }
                ans=ans.substring(0,i+1)+ans.substring(start+1,end).repeat(count);
            }else{
                ans+=ch;
            }
        }
        return ans;
    }
```

## 效果

11ms 击败 23.65%

## 反思

按理说是可以更快地。

# v2-两个栈

## 思路

整体思路一样，不过我们可以借助栈，让流程看起来清晰一点。

只有两个部分需要关心：

1）次数

2）需要次数处理的字符串片段

## 处理流程

针对每一个字符，分为四个场景：

1）数字

更新 num

```java
num = num * 10 + (c - '0');
```

2) `[`

说明普通字符结束，数字也结束。

```java
numStack.push(num);
strStack.push(cur);

num = 0;
cur = new StringBuilder();
```

3) `]`

处理需要重复的部分

```java
StringBuilder pre = strStack.pop();
int times = numStack.pop();

for(int i = 0; i < times; i++) {
    pre.append(cur);
}

// 当前字符更新
cur = pre;
```

4) 其他字符

正常添加 

```java
cur.append(c);
```

## 实现

```java
    public String decodeString(String s) {
        Stack<Integer> numStack = new Stack<>();
        Stack<StringBuilder> strStack = new Stack<>();
        StringBuilder cur = new StringBuilder();
        int num = 0;

        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
            } else if (ch == '[') {
                numStack.push(num);
                strStack.push(cur);
                cur = new StringBuilder(); // 新的子串
                num = 0;
            } else if (ch == ']') {
                int times = numStack.pop();
                StringBuilder prev = strStack.pop();
                for (int i = 0; i < times; i++) {
                    prev.append(cur);
                }
                cur = prev;
            } else {
                cur.append(ch);
            }
        }

        return cur.toString();
    }
```

## 效果

1ms 击败 74.27%

## 反思

还能更快吗？

# v3-数字模拟

## 思路

还是用数组模拟，避免拆箱、装箱，集合创建的开销。

## 实现

```java
public String decodeString(String s) {
    int n = s.length();
    int[] countStack = new int[n];
    StringBuilder[] strStack = new StringBuilder[n];
    int top = -1;

    StringBuilder cur = new StringBuilder();
    int num = 0;

    for (char ch : s.toCharArray()) {
        if (Character.isDigit(ch)) {
            num = num * 10 + (ch - '0');
        } else if (ch == '[') {
            countStack[++top] = num;
            strStack[top] = cur;
            cur = new StringBuilder();
            num = 0;
        } else if (ch == ']') {
            int times = countStack[top];
            StringBuilder prev = strStack[top--];
            prev.append(cur.toString().repeat(times));
            cur = prev;
        } else {
            cur.append(ch);
        }
    }
    return cur.toString();
}
```

## 效果

0ms 击败 100.00%

# 参考资料