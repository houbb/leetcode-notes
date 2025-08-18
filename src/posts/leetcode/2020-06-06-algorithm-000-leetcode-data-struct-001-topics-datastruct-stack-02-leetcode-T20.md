---

title: leetcode 算法篇专题之栈 stack 02-LC20. 有效的括号 valid-parentheses
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, stack, top100 sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下有效的括号

# 栈专题

[LC20. 有效的括号 valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-datastruct-stack-02-leetcode-T20.html)

[LC32. 最长有效括号 longest-valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-algorithms-dp-21-leetcode-LC32-longest-valid-parentheses.html)

[22.括号生成 generate-parentheses + 20. 有效的括号 valid parentheses + 32. 最长有效括号 Longest Valid Parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-012-leetcode-22-generate-parentheses.html)

# LC20 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

示例 1：

输入：s = "()"

输出：true

示例 2：

输入：s = "()[]{}"

输出：true

示例 3：

输入：s = "(]"

输出：false

示例 4：

输入：s = "([])"

输出：true

示例 5：

输入：s = "([)]"

输出：false
 

提示：

1 <= s.length <= 10^4
s 仅由括号 '()[]{}' 组成


# v1-stack

## 思路

因为 stack 先进后出的特性，很适合模拟这个。

## 实现

```java
public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        char[] chars = s.toCharArray();
        for(char c : chars) {
            // 入
            if('{' == c
                    || '(' == c
                    || '[' == c) {
                stack.push(c);
                continue;
            }
            // 出
            if(stack.isEmpty()) {
                return false;
            }
            char popChar = stack.pop();
            if('}' == c) {
                if('{' != popChar) {
                    return false;
                }
            }
            if(']' == c) {
                if('[' != popChar) {
                    return false;
                }
            }
            if(')' == c) {
                if('(' != popChar) {
                    return false;
                }
            }
        }

        // 出
        // 必须为空
        return stack.isEmpty();
}
```
## 效果

2ms 击败 97.76%

# v2-数组模拟

## 思路

这种数据结构，都可以通过 array 来模拟。

这样性能一般是最好的，而且这个长度固定。

## 解法

```java
public boolean isValid(String s) {
        char[] chars = s.toCharArray();
        char[] stack = new char[chars.length]; // 模拟栈
        int top = -1; // 栈顶指针

        for (char c : chars) {
            // 入栈
            if (c == '{' || c == '(' || c == '[') {
                stack[++top] = c;
                continue;
            }

            // 出栈前判断是否为空
            if (top == -1) {
                return false;
            }

            char popChar = stack[top--]; // 出栈

            // 匹配判断
            if (c == '}' && popChar != '{') return false;
            if (c == ']' && popChar != '[') return false;
            if (c == ')' && popChar != '(') return false;
        }

        // 最终必须栈为空
        return top == -1;
    }
```

## 效果

0ms 100%

# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。