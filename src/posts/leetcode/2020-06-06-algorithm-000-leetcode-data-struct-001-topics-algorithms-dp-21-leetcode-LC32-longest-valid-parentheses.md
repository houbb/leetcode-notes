---

title: 算法篇专题之动态规划 dynamic-programming 21-LC32. 最长有效括号 longest-valid-parentheses
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下分割等和子集

# LC32. 最长有效括号 longest-valid-parentheses

给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号 子串 的长度。

左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 "(()())"。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

示例 3：

输入：s = ""
输出：0
 

提示：

0 <= s.length <= 3 * 10^4
s[i] 为 '(' 或 ')'


# v1-回溯

## 思路

1）穷举所有的可能性

2）判断是否符合

3）找到最长的结果

## 实现

```java
    public int longestValidParentheses(String s) {
        // 找到最大的信息
        int max = 0;
        int n = s.length();
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                if(isValid(s, i, j)) {
                    max = Math.max(max, j-i+1);
                }
            }
        }
        return max;
    }

    private boolean isValid(String s, int left, int right) {
        int count = 0;
        while(left <= right) {
            if(s.charAt(left) == '(') {
                count++;
            } else {
                count--;
                if(count < 0) {
                    return false;
                }
            }

            left++;
        }

        return count == 0;
    }
```

## 结果

超出时间限制
228 / 232 个通过的测试用例

## 反思

意料之中，慢在哪里呢？

我们 O(n^2) 的遍历，然后 isValid 又需要 O(N)，整体就是 O(N^3)。

那么，有没有办法进一步降级耗时呢？

我们可以先从 isValid 入手。

## isValid 改进

### 思路

1）个数不是偶数，直接失败。

2）如果 `dp[i][j-2]` 满足，那么只需要 `dp[i][j-1], dp[i][j]` 符合，其实也满足。

当然，感觉这种优化只能改进一部分的场景。

## 实现

```java
class Solution {
    public int longestValidParentheses(String s) {
        // 找到最大的信息
        int max = 0;
        int n = s.length();
        
        boolean[][] dp = new boolean[n][n];
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                int len = j-i+1;
                if(len % 2 != 0) {
                    continue;
                }
                // 偶数 0 1 2 3
                if(j-i > 2 
                    && dp[i][j-2]
                    && s.charAt(j-1) == '('
                   && s.charAt(j) == ')') {
                    // 满足
                        dp[i][j] = true;
                        max = Math.max(max, j-i+1); 
                } else {
                    // 不符合 是第二个
                    if(isValid(s, i, j)) {
                        // 满足
                        dp[i][j] = true;
                        max = Math.max(max, j-i+1);
                    }
                }
            }
        }
        return max;
    }

    private boolean isValid(String s, int left, int right) {
        int count = 0;
        int len = right-left+1;
        if(len % 2 != 0) {
            return false;
        }

        while(left <= right) {
            if(s.charAt(left) == '(') {
                count++;
            } else {
                count--;
                if(count < 0) {
                    return false;
                }
            }

            left++;
        }

        return count == 0;
    }

}
```

### 效果

超出时间限制
228 / 232 个通过的测试用例

### 反思

没什么太大的变化，依然会超时。

感觉是陷入错误的思路了。


# v2-遍历时判断

## 思路

其实我们也可以在遍历的时候直接判断，把 isValid 给去掉。

思路就是：

1）`(` 增加 open 数量，`)` 增加 close 数量

2）如果 open == close，说明是一个有效的，直接更新最大值。

3）如何避免 `)(` 这种场景？

如果 `close > open` 的时候，我们直接 break 本次循环即可。

这样整体的复杂度就是 O(n^2)

## 实现

```java
    public int longestValidParentheses(String s) {
        // 找到最大的信息
        int max = 0;
        int n = s.length();
        
        for(int i = 0; i < n; i++) {
            int open = 0;
            int close = 0;

            for(int j = i; j < n; j++) {
                char c = s.charAt(j);
                if('(' == c) {
                    open++;
                } else {
                    close++;
                }
                if(open == close) {
                    // 整体长度
                    max = Math.max(max, 2*open);
                }

                // 非法
                if(close > open) {
                    break;
                }
            }
        }
        return max;
    }
```

## 效果

2135ms 击败 8.73%

## 反思

这种解法非常接近暴力，而且相对比较容易想到。

那么，还能进一步优化吗？


# v3-双向扫描

## 思路

如果我们大胆一点，不是每次都记录两层循环。

直接用 v2 的思路，从左遍历一次会怎么样？

会发现 `(()` 这种场景，会导致遗漏，因为 open 在前边，导致后边的 `()` 一直匹配不到。

这种场景，我们反向在遍历一次即可。

## 实现

```java
    public int longestValidParentheses(String s) {
        // 找到最大的信息
        int max = 0;
        int n = s.length();
        
        // 从->
        int open = 0;
        int close = 0;
        for(int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if('(' == c) {
                open++;
            } else {
                close++;
            }
            if(open == close) {
                max = Math.max(max, 2*open);
            }
            if(close > open) {
                open = 0;
                close = 0;
            }
        }

        // reverse
        open = 0;
        close = 0;
        for(int i = n-1; i > 0; i--) {
            char c = s.charAt(i);
            if('(' == c) {
                open++;
            } else {
                close++;
            }
            if(open == close) {
                max = Math.max(max, 2*open);
            }
            // 改一下 反向判断
            if(open > close) {
                open = 0;
                close = 0;
            }
        }

        return max;
    }
```


## 效果

1ms 99.79%

效果拔群

## 复杂度

时间 O(n)

空间 O(1)

## 反思

正反 2 次遍历固然巧妙，不过不常用的话不见得想到。

只适合求「最大长度」，不能找具体位置

但是这种判断怎么能少了 stack 的身影。

# v4-stack

## 思路

我们可以借助 stack 来判断。

用一个栈来存下标（而不是括号本身）。

1） 遇到 '(' → 入栈（存它的下标）。

2） 遇到 ')' →

栈顶弹出（匹配一个 '('）

如果栈空了，说明无法匹配 → 把当前下标 i 入栈（作为新的“断点”）。

如果栈不空 → 当前有效长度 = i - 栈顶元素（因为栈顶存的是上一个没匹配的下标）。更新最大长度。

可以发现这个是可以解决 `(()` 这种场景的。

## 实现

```java
public int longestValidParentheses(String s) {
        // 找到最大的信息
        int max = 0;
        int n = s.length();
        
        Stack<Integer> stack = new Stack<>();
        stack.push(-1);

        for(int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if(c == '(') {
                stack.push(i);
            } else {
                stack.pop();

                // 如果空了，说明 ) 更多，更新最新的位置    
                if(stack.isEmpty()) {
                   stack.push(i);     
                } else {
                    // 此时是符合的场景 ((()))  一一对应的会被消耗掉
                    max = Math.max(max, i - stack.peek());
                }
            }
        }

        return max;
    }
```

## 效果

7ms 击败 8.73%

## 反思

时间 O(n)

空间 O(n)

这种实际效果一般，但是理论复杂度已经是很优秀了。


# v5-dp

## 思路

因为我们在判断当前位置的长度时，可以依赖前面的信息。所以可以用 dp 来解决。

但是感觉这一题的 dp 有一些绕。

## 核心流程

### 1 dp 数组的确切含义

```
dp[i] = 以 s[i] 结尾的最长有效括号长度
```

### 2 转移方程

* A--如果 `s[i] = '('` → `dp[i] = 0`，因为以 `(` 结尾不可能形成有效括号

* B--如果 `s[i] = ')'` → 看前面的字符如何匹配，分两种情况

情况 1：`s[i-1] == '('`

例如 `"(...)"`

* 末尾两字符是 `"()"`，直接匹配
* 长度 = `dp[i-2] + 2`（注意边界处理）

```java
dp[i] = (i >= 2 ? dp[i-2] : 0) + 2
```

情况 2：`s[i-1] == ')'`

例如 `"((...))"`

* 末尾是 `"))"`，可能和前面某个 `'('` 配对
* 配对的 `'('` 下标 = `i - dp[i-1] - 1`
* 如果 `s[i - dp[i-1] - 1] == '('`，说明形成了新的有效串

```java
dp[i] = dp[i-1] + 2 + (i - dp[i-1] - 2 >= 0 ? dp[i - dp[i-1] - 2] : 0)
```

* `dp[i-1]` → 前一个有效子串长度
* `2` → 新匹配的 `()`
* `dp[i - dp[i-1] - 2]` → 新匹配前还有更长的有效串，加上

### 疑问点

B-2 中，`i - dp[i-1] - 1`  这个神奇的下标是什么含义？

其实是在寻找 `))` 这个结尾的匹配场景。

我们要找 和 s[i] 匹配的 '('，也就是这个 '))' 最外层的左括号。

前一个位置 i-1 结尾的子串长度是 dp[i-1]

dp[i-1] 表示 以 s[i-1] 结尾的有效括号子串长度

明白，我来详细拆解一下这个关键表达式：

计算匹配的 `'('` 下标

末尾的两个字符：

```
... (   ...   )   )
       |   |   |
       ?  i-1  i
```

* `i` → 当前 `')'`
* `i-1` → 前一个字符
* `dp[i-1]` → 之前连续有效括号长度

所以和 `s[i]` 配对的 `'('` 的下标 = `i - dp[i-1] - 1`

###  初始条件

`dp[0] = 0`，因为单个字符不能形成有效括号

## 代码实现

```java
public int longestValidParentheses(String s) {
    int n = s.length();
    int[] dp = new int[n];
    int maxLen = 0;

    for (int i = 1; i < n; i++) {  // 从 1 开始，因为 i=0 不可能形成有效串
        if (s.charAt(i) == ')') {
            if (s.charAt(i - 1) == '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] - 1 >= 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                dp[i] = dp[i - 1] + 2 + ((i - dp[i - 1] - 2 >= 0) ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
    }

    return maxLen;
}
```

## 效果

1ms 击败 99.79%

## 复杂度分析

TC: O(n)，每个位置只算一次
SC: O(n)，存 dp 数组

## 反思

个人不是很推荐这个解法，容易分析错。




# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://github.com/houbb/leetcode-visual)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。

