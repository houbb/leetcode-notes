---
title: LC739. 每日温度 daily-temperatures
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

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

我们先用最基本的思路，来解决。

## 实现

```java
class Solution {

    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;

        int[] res = new int[n];

        for(int i = 0; i < n; i++) {
            //找到几天后的温度更高
            int day = 0;
            int temp = temperatures[i];
            for(int j = i+1; j < n; j++) {
                if(temperatures[j] > temp) {
                    day = j-i;
                    break;
                }
            }

            res[i] = day;
        }

        return res;       
    }

}
```

## 效果

超出时间限制
47 / 48 个通过的测试用例

## 复杂度

TC: O(n^2)

## 反思

看的出来，这一题不是想让我们用这个解法来解决。

那么应该如何解决呢？

# v2-单调栈

## 题意

抽象成数组问题就是：

给定一个数组 arr，对每个下标 i，找 右边第一个大于 arr[i] 的下标

这是一类经典问题：下一个更大元素（Next Greater Element）。

## 单调栈

右边第一个更大元素 → 可以考虑 栈来保存还没找到右边界的元素

栈维护顺序：

栈中存下标

栈内保持 温度递减（从栈底到栈顶）当遇到更高温度时，说明栈顶元素找到了右边第一个更高温度 → 出栈

一次遍历就能搞定：当前元素入栈，等它右边遇到更高温度时弹出 → 自动得到左右边界

每个元素最多进栈一次，出栈一次 → O(n)

## 实现

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;

        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();

        for(int i = 0; i < n; i++) {
            // 栈顶温度小于当前温度 → 栈顶找到右边更高温度
            while(!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
                int idx = stack.pop();

                // 天数差  延迟计算，拿到的其实是以前的下标
                res[idx] = i - idx;  
            }

            // 入栈
            stack.push(i);
        }

        return res;
    }
}
```

## 效果

167ms 击败 27.47%

## 反思

单调栈其实是非常强的一个技巧，值得深入学习+掌握。

# v3-数组模拟

## 思路

我们可以用 array 模拟实现单调栈。

其他不变

## 实现

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;

        int[] res = new int[n];
        int[] stack = new int[n];
        int top = -1;

        for(int i = 0; i < n; i++) {
            // 栈顶温度小于当前温度 → 栈顶找到右边更高温度
            while(top >= 0 && temperatures[stack[top]] < temperatures[i]) {
                int idx = stack[top--];

                // 天数差  延迟计算，拿到的其实是以前的下标
                res[idx] = i - idx;  
            }

            // 入栈
            stack[++top] = i;
        }

        return res;
    }
}
```

## 效果

8ms 击败 99.92%

## 反思

如此，效果不错。

# 小结

类似的题目其实还是不少的。

| 题目                                      | 为什么双向扫描            |
| --------------------------------------- | ------------------ |
| **LC135 Candy**                         | 要同时满足左、右的“评分高→糖果多” |
| **LC42 Trapping Rain Water**            | 每格水高度由左右最高墙共同决定    |
| **LC84 Largest Rectangle in Histogram** | 每个柱子的最大宽度取决于左右边界   |
| **LC739 Daily Temperatures**            | 每天温度要看右边第一个更高温度的位置 |
| **LC238 Product of Array Except Self**  | 每个位置要看左积和右积        |





# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
