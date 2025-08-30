---

title: 算法篇专题之栈 stack 03-LC394. 字符串解码 decode-string
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, stack, top100, sf]
published: true
---



# 数组

大家好，我是老马。

今天我们一起来学习一下最小栈 

# 栈专题

[LC20. 有效的括号 valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-datastruct-stack-02-leetcode-T20.html)

[LC32. 最长有效括号 longest-valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-algorithms-dp-21-leetcode-LC32-longest-valid-parentheses.html)

[22.括号生成 generate-parentheses + 20. 有效的括号 valid parentheses + 32. 最长有效括号 Longest Valid Parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-012-leetcode-22-generate-parentheses.html)


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


# v1-DFS 显式栈

## 思路

这是最直观的方式，用两个栈：

数字栈：记录重复次数 k

字符串栈：记录当前解析好的字符串

## 核心流程

遍历字符串 s，

1) 如果是数字，就解析完整的数字（可能多位数，比如 "10[ab]"）。

2）如果是字母，就追加到当前 curStr。

3）如果遇到 '['：把当前的 curStr 和 num 入栈，重置 curStr = ""，继续。

4）如果遇到 ']'：从栈中弹出一个数字和之前的字符串， `curStr = prevStr + repeat(num, curStr)`。

遍历结束，curStr 就是答案。

### 疑问1：普通的字母和括号内的字母需要区分吗？

答案是不需要

遍历时，如果读到 字母，不管是不是在括号里，都是直接追加到 curStr。

区别只在遇到 `[` 和 `]` 时：

遇到 `[` → 把 当前已有的字符串 + 数字 保存起来，表示新的一层开始。

遇到 `]` → 说明当前子串结束，拿到前一个保存的状态，进行重复拼接。

### 例子

比如：`2[ab]cd`

* 初始化：`curStr = ""`
* 读到 `'2'`：`num = 2`
* 读到 `'['`：

  * 栈保存 `(num=2, str="")`
  * 重置 `curStr = ""`
* 读到 `"ab"`：

  * `curStr = "ab"`
* 读到 `']'`：

  * 栈弹出 `(num=2, str="")`
  * 新的 `curStr = "" + "ab"*2 = "abab"`
* 读到 `"c"`：`curStr = "ababc"`
* 读到 `"d"`：`curStr = "ababcd"`

最终结果：`"ababcd"`。

## 实现

```java
    public String decodeString(String s) {
        Stack<Integer> numStack = new Stack<>();
        Stack<String> strStack = new Stack<>();
        StringBuilder curStr = new StringBuilder();
        int num = 0;

        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            //1. 数字
            if(c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
            } else if(c == '[') {
                //2. 此时数字结束，curStr 也要结束
                numStack.push(num);
                strStack.push(curStr.toString());

                num = 0;
                curStr = new StringBuilder();
            } else if(c == ']') {
                //3. 此时需要重复的字符遍历结束
                String pre = strStack.pop();    // 原来的字符串
                int times = numStack.pop();
                StringBuilder temp = new StringBuilder(pre);

                for(int j = 0; j < times; j++) {
                    // 针对 [] 的字符串 repeat
                    temp.append(curStr);
                }
                curStr = temp;
            } else {
                curStr.append(c);
            }
        }    

        return curStr.toString();
    }
```

## 效果

1ms 击败 74.75%

## 反思

如何通过 dfs 来解决呢？

# v2-递归

## 思路

1) 用一个全局下标 i 遍历字符串。

2) 定义一个函数 decode(s)：

从 i 开始，解析出一个子串。

如果遇到 字母，直接拼接到结果。

如果遇到 数字，解析出完整的数字 num，跳过 [，递归调用 decode(s) 得到括号里的子串。
然后重复 num 次拼接到结果里。

如果遇到 ]，说明当前层结束，返回结果。

3) 外层调用 decode(s) 就能得到最终答案。

## 实现

某种角度而言，和 stack 很类似。只不过这个栈是系统帮我们隐式处理了而已

```java
    private int i = 0; // 用于记录当前遍历到的位置

    public String decodeString(String s) {
        return helper(s);
    }

    // 递归函数：从当前位置开始解码，直到遇到 ']' 或字符串结尾
    private String helper(String s) {
        StringBuilder res = new StringBuilder();

        while (i < s.length() && s.charAt(i) != ']') {
            char c = s.charAt(i);

            // 1如果是字母，直接拼到结果里
            if (Character.isLetter(c)) {
                res.append(c);
                i++;
            }
            // 2如果是数字，说明接下来是 k[xxx] 的格式
            else if (Character.isDigit(c)) {
                int num = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    num = num * 10 + (s.charAt(i) - '0'); // 处理多位数
                    i++;
                }

                i++; // 跳过 '['
                String sub = helper(s); // 递归解码括号里面的内容
                i++; // 跳过 ']'

                // 把 sub 重复 num 次拼接到结果
                for (int k = 0; k < num; k++) {
                    res.append(sub);
                }
            }
        }

        return res.toString();
    }
```

## 效果

0ms 100%

# v3-BFS

## 思路

个人感觉BFS解决这一题不适合阅读，不太推荐。只是记录一下。

1）用 队列 BFS 逐层展开字符串。

2）每次处理最外层的 k[xxx]：

找到数字 k

找到匹配的 [...]

将子串重复 k 次

拼接成新字符串，放回队列继续处理

3） 队列为空时，说明字符串已经完全展开，返回结果。

## 实现

```java
    public String decodeString(String s) {
        Queue<String> queue = new LinkedList<>();
        queue.offer(s);

        while (!queue.isEmpty()) {
            String curr = queue.poll();

            // 找到最外层的 k[xxx] 模式
            int start = curr.indexOf('[');
            if (start == -1) {
                // 没有 '['，说明已经完全展开
                return curr;
            }

            int numStart = start - 1;
            while (numStart >= 0 && Character.isDigit(curr.charAt(numStart))) {
                numStart--;
            }
            numStart++; // k 的起始位置

            int repeat = Integer.parseInt(curr.substring(numStart, start));

            // 找到匹配的 ']'
            int end = start;
            int count = 1;
            while (count > 0) {
                end++;
                char c = curr.charAt(end);
                if (c == '[') count++;
                if (c == ']') count--;
            }

            String sub = curr.substring(start + 1, end); // 子串
            String repeated = sub.repeat(repeat);       // 重复 k 次

            // 拼接生成新字符串，并放回队列继续处理
            String next = curr.substring(0, numStart) + repeated + curr.substring(end + 1);
            queue.offer(next);
        }

        return "";
    }
```

## 耗时

8ms 10.95%

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