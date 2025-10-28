---
title: LC84. 柱状图中最大的矩形 largest-rectangle-in-histogram
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC84. 柱状图中最大的矩形 largest-rectangle-in-histogram

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

示例 1:

![1](https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg)

输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10


示例 2：

![2](https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg)

输入： heights = [2,4]
输出： 4
 

提示：

1 <= heights.length <=10^5

0 <= heights[i] <= 10^4

# v1-左右扫描

## 思路

对每个柱子 i：

向左扫描找到第一个比它矮的柱子 → left[i]

向右扫描找到第一个比它矮的柱子 → right[i]

面积 = `heights[i] * (right[i] - left[i] - 1)`

注意这里边界的计算方式稍微不同，因为 left[i] 和 right[i] 是“第一个比自己矮的柱子”的索引，所以是不包含二者的。

这里宽度如果要简单推断的话：

```
width = 最右索引 - 最左索引 + 1
= (right[i]-1) - (left[i]+1) + 1
= right[i] - left[i] - 1
```

## 实现

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;

        // 看左边
        int[] left = new int[n];
        for(int i = 0; i < n; i++) {
            int j = i-1;
            while(j >= 0 && heights[j] >= heights[i]) {
                j--;
            }
            left[i] = j; 
        }

        // 看右边
        int[] right = new int[n];
        for(int i = 0; i < n; i++) {
            int j = i+1;
            while(j < n && heights[j] >= heights[i]) {
                j++;
            }
            right[i]= j;
        }

        // 看结果
        int max = 0;
        for(int i = 0; i < n; i++) {
            int area = (right[i] - left[i] - 1) * heights[i];
            max = Math.max(area, max);
        }
        return max;
    }
}
```

## 效果

超出时间限制
93 / 99 个通过的测试用例

## 复杂度

TC: O(n^2)

## 反思

如果「左边的状态」会影响当前，但「右边的状态」也可能有另一种独立影响，那就很可能要分别从两个方向处理。

但是这里超时了，我们要想办法提升一下效率。

# v2-单调栈

## 思路

在对比左右的时候，每次都从头开始遍历，导致最差的时候复杂度为 O(n^2)。数据量比较大的时候直接超时。

有没有方法可以更快呢？

为了演示思考的过程，这里尽可能改动少一些。

## 如何找到左边比自己低的第一个位置？

目标：快速找到每个柱子左边第一个比它矮的柱子。

### 以前的方式

这里以 left 为例子，每次要走 O(n) 才能在左边找到比自己低的，整体是 O(n^2)

```java
// 看左边
int[] left = new int[n];
for(int i = 0; i < n; i++) {
    int j = i-1;
    while(j >= 0 && heights[j] >= heights[i]) {
        j--;
    }
    left[i] = j; 
}
```

### 单调栈方式

方法：用栈模拟实现一个单调递增的数据。

用一个栈 stack 保存 柱子的下标。栈内保持 高度单调递增（从栈底到栈顶）。

遍历每个柱子 i：

如果栈顶高度 ≥ 当前柱子高度 → 栈顶弹出→ 因为栈顶柱子不能作为当前柱子的左边界，它更高。

弹出后，栈顶（如果有）就是第一个比当前柱子矮的柱子 → 左边界确定。

入栈 i，为后续柱子提供“左边界候选”。

复杂度可以降低到 O(n)

```java
for (int i = 0; i < n; i++) {
    // 单调递增栈（栈顶高度 >= 当前高度时出栈）
    while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
        // 只要比当前高的都丢弃
        stack.pop();
    }

    left[i] = stack.isEmpty() ? -1 : stack.peek();
    stack.push(i);
}
```

右边类似，不过我们存储的是右边的较低的，可以逆序遍历

| 左边界           | 右边界           |
| ------------- | ------------- |
| 正序扫描（i=0→n-1） | 逆序扫描（i=n-1→0） |
| 栈中存储左边候选柱子    | 栈中存储右边候选柱子    |
| 弹出时确定左边界      | 弹出时确定右边界      |
| 逻辑与右边对称       | 逻辑与左边对称       |

## 实现

```java
import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Stack<Integer> stack = new Stack<>();

        // 计算 left[i]
        for (int i = 0; i < n; i++) {
            // 单调递增栈（栈顶高度 >= 当前高度时出栈）
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }

        // 清空栈再来一遍
        stack.clear();

        // 计算 right[i]
        for (int i = n - 1; i >= 0; i--) {
            // 单调递增栈（栈顶高度 >= 当前高度时出栈）
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        // 计算最大面积
        int max = 0;
        for (int i = 0; i < n; i++) {
            int area = (right[i] - left[i] - 1) * heights[i];
            max = Math.max(max, area);
        }
        return max;
    }
}
```

## 效果

327ms 击败 5.00%

## 反思

这个只能说是勉强 AC。

那么，还能优化吗？

# v3-单调栈一次遍历

## 思路

我们两次遍历其实是可以合并为1次的。

left/right 数组甚至都是多余的。

## 实现

```java
import java.util.*;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        // 在末尾加一个高度 0，保证栈中所有柱子都能被处理
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];

            // 如果当前柱子比栈顶柱子矮，就不断弹出栈顶柱子计算面积
            while (!stack.isEmpty() && heights[stack.peek()] >= h) {
                int height = heights[stack.pop()]; // 栈顶柱子高度
                int left = stack.isEmpty() ? -1 : stack.peek(); // 左边界
                int width = i - left - 1; // 宽度
                maxArea = Math.max(maxArea, height * width);
            }

            stack.push(i); // 当前柱子入栈
        }

        return maxArea;
    }
}
```

## 效果

163ms 击败 20.14%

## 详细解释

### 核心目标

我们回顾一下核心目标

对于每根柱子 i：

左边界 left[i] = 左侧第一个 比它矮 的柱子下标

右边界 right[i] = 右侧第一个 比它矮 的柱子下标

它的最大矩形宽度 = right[i] - left[i] - 1

暴力扫描的话，要两边都扫才能得到这两个值。

但单调栈却只需 从左往右一遍，就能同时确定它的「左右边界」。

## 单调栈为什么可以？

单调栈的本质：“延迟决策 + 一次结算两边”

我们来看看单调递增栈的核心不变式：栈中柱子高度从栈底到栈顶单调递增。

也就是说，栈顶元素是「到目前为止，最后一个还没遇到比它矮的柱子」。

### 当遇到一个更矮的柱子时（下降），发生什么？

假设我们当前处理柱子下标 i，高度 h = heights[i]。

如果 `h < heights[stack.top]`，说明：当前柱子（第 i 根）比栈顶柱子矮。

那么，栈顶柱子的“右边界”找到了——就是当前的 i。

于是我们开始出栈，计算面积。

### 为什么可以确定左右边界？

弹出时 “左右边界” 同时确定

当我们弹出一个柱子 idx = stack.pop() 时：

右边界（right[idx]） 当前柱子 i 就是第一个比它矮的 → right[idx] = i

左边界（left[idx]） 弹出后栈顶 stack.peek()（如果存在）就是它左边第一个比它矮的柱子 → left[idx] = stack.peek()

宽度 = right[idx] - left[idx] - 1

所以——当一个柱子被弹出时，它的左右边界都同时被确定了。

### 栈的“记忆功能”：延迟确定

再看为什么这能涵盖所有情况：

每个柱子一开始被压入栈时，右边界还未知；

我们先“记住”它（入栈），等到将来遇到一个更矮的柱子时，再一次性结算它的左右边界；

对于那些从未遇到更矮柱子的柱子，它们的右边界默认就是数组末尾 n；

对于那些左边没有更矮的柱子，左边界默认 -1。

换句话说：

**单调栈用「入栈」保存未决的左边界，用「出栈」事件触发右边界的确定**。

这一出一入，刚好确定左右两边。

# v4-数组模拟

## 思路

我们可以用 array 模拟实现单调栈。

其他不变

## 实现

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] stack = new int[n];
        int top = -1;
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (top >= 0 && heights[stack[top]] >= h) {
                int height = heights[stack[top--]];
                int left = (top >= 0) ? stack[top] : -1;
                int width = i - left - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack[++top] = i;
        }

        return maxArea;
    }
}
```

## 效果

6ms 100%

## 反思

数组模拟的效果是非常好的，避免了一些底层对象的开销，以及 int 基本类型的拆装箱操作。

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
