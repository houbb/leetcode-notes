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









## 小结

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
