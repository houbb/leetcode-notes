---
title: LC42. 接雨水 trapping-rain-water
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC42. 接雨水 trapping-rain-water

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

示例 1：

![1](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9
 
提示：

n == height.length

1 <= n <= 2 * 10^4

0 <= height[i] <= 10^5
 
# v1-左右扫描

## 思路

每个位置 i 的积水量 = 当前位置能积的水高度

什么决定水能积多高？

左边挡板有多高？leftMax[i]

右边挡板有多高？rightMax[i]

当前高度 height[i]

水不会溢出，所以水位被左右较低挡板限制：

```java
水面高度 = min(leftMax[i], rightMax[i])
```

积水量 = 水面高度 - 当前高度：

```java
water[i] = 水面高度 - height[i]
```

所以，其实和 LC153 分糖果有些类似，我们左右扫描找到两边的最大值，然后取二者的较小者即可。

## 实现

```java
class Solution {

    
    public int trap(int[] height) {
        // 初始化
        int n = height.length;
        

        // 左-》右
        int[] maxLeft = new int[n];
        maxLeft[0] = height[0];
        for(int i = 1; i < n; i++) {
            maxLeft[i] = Math.max(maxLeft[i-1], height[i]);
        }

        // 右-》左
        int[] maxRight = new int[n];
        maxRight[n-1] = height[n-1];
        for(int i = n-2; i >= 0; i--) {
            maxRight[i] = Math.max(maxRight[i+1], height[i]);
        }

        // 高度取决于最小的一边
        int res = 0;
        for(int i = 0; i < n; i++) {
            res += Math.min(maxLeft[i], maxRight[i]) - height[i];
        }
        return res;
    }


}
```

## 效果

1ms 击败 72.85%

## 反思

如果「左边的状态」会影响当前，但「右边的状态」也可能有另一种独立影响，那就很可能要分别从两个方向处理。

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
