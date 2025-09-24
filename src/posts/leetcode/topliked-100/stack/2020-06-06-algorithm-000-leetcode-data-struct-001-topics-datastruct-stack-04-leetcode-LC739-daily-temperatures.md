---

title: 算法篇专题之栈 stack 03-LC739. 每日温度 daily-temperatures
date:  2020-06-08
categories: [TopLiked100]
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


# LC739. 每日温度 daily-temperatures

给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。

如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:

输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
示例 2:

输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
示例 3:

输入: temperatures = [30,60,90]
输出: [1,1,0]
 

提示：

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100

# v1-暴力

## 思路

最朴素的暴力解法

## 实现

```java
    public int[] dailyTemperatures(int[] temperatures) {
        //1. 暴力解法
        int n = temperatures.length;
        int[] answer = new int[n];

        // 最后一天不用考虑，为0
        for(int i = 0; i < n-1; i++) {
            for(int j = i+1; j < n; j++) {
                if(temperatures[j] > temperatures[i]) {
                    answer[i] = j-i;
                    break;
                }
            }
        }

        return answer;
    }
```

## 效果

超出时间限制
47 / 48 个通过的测试用例

## 复杂度

O(n^2)

## 反思

这一题和 stack 有什么关系？

如何提升当前比较的性能？

# v2-单调栈

## 是什么？

> [单调栈](https://houbb.github.io/2020/06/08/algorithm-000-leetcode-data-struct-001-topics-datastruct-monotonic-stack-01-intro)

## 思路

目标：对每一天 `i`，找到 **第一个比它温度高的日子 j**，并记录 `j - i`。

暴力法是每个 `i` 往后找，但我们可以用栈维护 **未找到答案的下标**，保证栈中下标对应的温度是**单调的**。

* 遍历 temperatures：

  * 如果当前温度比栈顶温度大，说明找到了栈顶元素的下一个更高温度。
  * 弹出栈顶，记录答案：`answer[stackTop] = i - stackTop`。
  * 如果当前温度不大于栈顶温度，把当前下标入栈。

栈只存 **未找到更高温度的下标**，每个下标只会入栈和出栈一次 → O(n)。

## 单调性如何实现？

单调栈是我们自己用 stack 实现的，不是什么特殊的数据结构，更像是一种技巧

### 如何保持单调的？

### 栈里存的是什么？

* 栈里存的是 **还没找到更高温度的下标**。

* 栈里的下标对应的温度是 **单调的**（从栈顶到底部）。

> 举例：如果 `stack = [5, 3, 2]`，对应的温度可能是 `[75, 70, 68]`，栈顶是 2 → 温度 68，栈底是 5 → 温度 75。

### 2入栈前为什么要 `while (temperatures[i] > temperatures[stack.peek()])`？

* 当前温度比栈顶温度高 → 栈顶下标找到了 **第一个比它高的温度**。
* 弹出栈顶，计算 `answer[stackTop] = i - stackTop`。
* 这样出栈后，栈里剩下的温度依然是单调递减的，因为：

  1. 所有比当前温度小的都已经被弹出。
  2. 栈里剩下的温度 ≥ 当前温度（没被弹出），保持递减。

### 3入栈逻辑

```java
stack.push(i);
```

* 栈里剩下的温度 ≥ 当前温度
* 当前温度作为新的栈顶加入 → 栈顶可能是栈里最小的
* 栈依然 **保持单调**（从栈底到栈顶）

## 实现

```java
public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Stack<Integer> stack = new Stack<>(); // 存下标

        for (int i = 0; i < n; i++) {
            // 比较温度 stack 中存储的是下标
            int curTemp = temperatures[i];
            while(!stack.isEmpty() && curTemp > temperatures[stack.peek()]) {
                int ix = stack.pop();
                answer[ix] = i - ix;
            }

            //入？
            stack.push(i);
        }

        return answer;
}
```

## 效果

166ms 击败 32.95%


## 复杂度

TC O(n)
SC O(n)（栈存下标）

## 反思

如何更快？

# v3-数组模拟单调栈+逆序

## 思路

1）从后往前遍历 temperatures

2）对于每个位置 i：

从 i+1 开始往后找第一个比 temperatures[i] 高的日子

利用已经计算好的 answer 来“跳跃”，跳过中间不可能的日子

如果没有更高温度，answer[i] = 0

这种方法 空间复杂度 O(1)（除了答案数组），时间复杂度仍是 O(n) 级别，因为跳跃避免了很多无效比较。

## 疑问

### 为什么要逆序？

对于每个 i，我们想快速知道 i 后面第一个比它大的温度。

如果我们从 前往后 遍历，i+1、i+2 的 answer 还没计算出来 → 不能跳跃，还是要逐个比较。

只有从 后往前 遍历，i+1、i+2 … 的答案已经算好了 → 可以直接用 answer[j] 跳过不可能的日子。


## 实现

```java
public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];

    // 从后往前
    for (int i = n - 2; i >= 0; i--) {

        int j = i + 1;
        while (j < n && temperatures[i] >= temperatures[j]) {
            // 利用 answer[j] 跳过不可能的日子
            if (answer[j] > 0) {
                j += answer[j];
            } else {
                j = n; // 后面没有更高温度了
            }
        }

        if (j < n) {
            answer[i] = j - i;
        }
    }

    return answer;
}
```

## 效果

8ms 击败 99.90%

## 反思

很巧妙

但是不太好想到，还是单调栈比较简单一些。

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