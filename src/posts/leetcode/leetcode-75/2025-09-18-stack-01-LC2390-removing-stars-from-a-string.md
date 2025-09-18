---
title: LC2390. 从字符串中移除星号 removing-stars-from-a-string
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC1732. 找到最高海拔 find-the-highest-altitude

给你一个包含若干星号 * 的字符串 s 。

在一步操作中，你可以：

选中 s 中的一个星号。
移除星号 左侧 最近的那个 非星号 字符，并移除该星号自身。
返回移除 所有 星号之后的字符串。

注意：

生成的输入保证总是可以执行题面中描述的操作。
可以证明结果字符串是唯一的。
 

示例 1：

```
输入：s = "leet**cod*e"
输出："lecoe"
解释：从左到右执行移除操作：
- 距离第 1 个星号最近的字符是 "leet**cod*e" 中的 't' ，s 变为 "lee*cod*e" 。
- 距离第 2 个星号最近的字符是 "lee*cod*e" 中的 'e' ，s 变为 "lecod*e" 。
- 距离第 3 个星号最近的字符是 "lecod*e" 中的 'd' ，s 变为 "lecoe" 。
不存在其他星号，返回 "lecoe" 。
```

示例 2：

```
输入：s = "erase*****"
输出：""
解释：整个字符串都会被移除，所以返回空字符串。
```

提示：

1 <= s.length <= 10^5
s 由小写英文字母和星号 * 组成
s 可以执行上述操作


# v1-栈

## 思路

我们直接遍历字符串，然后 char 不是 `*` 入栈。

遇到 `*` 的时候，弹出顶部字符。

最后 stack 弹出构建，reverse 一下即可。

## 实现

```java
public String removeStars(String s) {
         Stack<Character> stack = new Stack<>();

         char[] chars = s.toCharArray();
         for(char c : chars) {
            if(c == '*') {
                if(!stack.isEmpty()){
                    stack.pop();
                }
            } else {
                stack.push(c);
            }
         }

         // 结果构建
         StringBuilder sb = new StringBuilder();
         while(!stack.isEmpty()) {
            char c = stack.pop();
            sb.append(c);
         }
         return sb.reverse().toString(); 
}
```

## 效果

103ms 击败 33.83%

## 反思

按理说是可以更快地。

那就是我们不用 stack？

# v2-不用 stack

## 思路

直接用 StringBuilder

如果是 `*`，移除最后一个；如果不是，则 append。其他不变。

## 实现

```java
public String removeStars(String s) {
         // 结果构建
         StringBuilder sb = new StringBuilder();

         char[] chars = s.toCharArray();
         for(char c : chars) {
            if(c == '*') {
                int len = sb.length();
                if(len > 0){
                    sb.deleteCharAt(len-1);
                }
            } else {
                sb.append(c);
            }
         }

         return sb.toString(); 
}
```

## 效果

38ms 击败 50.23%

## 反思

如何更快呢？

此时问 AI，可以发现 AI 本身认为这已经是最优。

说明还是缺少创造力啊，你个小AI。

# V3-更进一步

## 栈

v1 的栈，并不是算法中的最优解。

最快的方式其实是用数组模拟 stack。

## 实现

```java
public String removeStars(String s) {
         char[] chars = s.toCharArray();
         // 栈顶
         int top = 0;
         for(int i = 0; i < s.length(); i++) {
            char c = chars[i];
            if(c == '*') {
                top--;
            } else {
                chars[top++] = c;
            }
         }

         return new String(chars, 0, top); 
}
```

## 效果

13ms 击败 95.07%

## 反思

利用数字模拟实现常见的数据结构，性能一般是最好的。

# 参考资料