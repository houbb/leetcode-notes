---
title: LC11. 盛最多水的容器 container-with-most-water
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, two-pointer]
published: true
---

# LC11. 盛最多水的容器 container-with-most-water

给定一个长度为 n 的整数数组 height。

有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

示例 1：

![1](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例 2：

输入：height = [1,1]
输出：1
 

提示：

n == height.length
2 <= n <= 10^5
0 <= height[i] <= 10^4
 




# v1-双指针

## 思路

两个指针，left=0, right=n-1

好处是这样保障宽度最大，高度就是 `min(height[left], height[right])`

问题是，左右如何移动呢？

其实就是保留高度最大的一边，移动另一边即可，尽可能的让面积最大。

## 实现

```java
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length-1;

        int max = 0;    
        while(left < right) {
            int leftH = height[left];
            int rightH = height[right];
            int w = right - left;
            int h = Math.min(leftH, rightH);

            int area = w*h;
            max = Math.max(area, max);

            // 左右移动
            if(leftH > rightH) {
                right--;
            } else {
                left++;
            }
        }

        return max;
    }
```

## 效果

4ms 击败 75.48%

## 复杂度

TC: O(n)

## 反思

这个解法应该是理论最优，为什么不是 100%?

# v2-剪枝优化

## 思路

看了眼最佳解法，实际上是对 v1 进行优化。

如果后续的高度和不能高于当前的高度，那么就可以忽略掉。

目的是为了避免多余的计算。

## 实现

```java
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length-1;

        int max = 0;    
        while(left < right) {
            int leftH = height[left];
            int rightH = height[right];
            int w = right - left;
            int h = Math.min(leftH, rightH);

            int area = w*h;
            max = Math.max(area, max);

            // 左右移动
            while(height[left] <= h && left < right) {
                left++;
            }
            while(height[right] <= h && left < right) {
                right--;
            }
        }

        return max;
    }
```

## 效果

1ms 100%

## 反思

整体的逻辑不变，但是追求极致，令人赞叹的算法。

# 参考资料