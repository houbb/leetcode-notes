---
title: LC162. 寻找峰值 find-peak-element
date: 2025-10-03
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-search]
published: true
---

# LC162. 寻找峰值

峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。

你可以假设 `nums[-1] = nums[n] = -∞` 。

你必须实现时间复杂度为 O(log n) 的算法来解决此问题。

 

示例 1：

输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
示例 2：

输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5 
解释：你的函数可以返回索引 1，其峰值元素为 2；
     或者返回索引 5， 其峰值元素为 6。
 

提示：

1 <= nums.length <= 1000
-2^31 <= nums[i] <= 2^31 - 1
对于所有有效的 i 都有 nums[i] != nums[i + 1]

# v1-暴力

## 思路

先用朴素的暴力尝试一下。

## 实现

```java
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        if(n == 1) {
            return 0;
        }

        // 直接先看左右边界
        if(nums[0] > nums[1]) {
            return 0;
        }
        if(nums[n-1] > nums[n-2]) {
            return n-1;
        }

        // 正常迭代
        for(int i = 1; i < n-1; i++) {
            if(nums[i] > nums[i-1] && nums[i] > nums[i+1]) {
                return i;
            }
        }   

        // 没有？
        return -1;
    }
}
```

## 效果

0ms 100%

## 反思

这一题用例本身并没有区分度。

# v2-二分

## 思路

O(log n) 的算法要如何解决呢？

当然我们是按照专题刷的，提示我们用二分法来实现。

但是奇怪的是，如果我们不排序，峰值和二分法有什么联系呢？

而且我们是要找到任何一个就行。

## 流程

因为题目保证 `nums[i] != nums[i+1]`，数组总是存在 上升段和下降段。

利用这一点，可以用二分法寻找峰值。

核心思路

选择中间元素 mid。

比较 nums[mid] 和 nums[mid+1]：

如果 nums[mid] < nums[mid+1]，说明峰值 在右边（因为数组在上升）。

如果 nums[mid] > nums[mid+1]，说明峰值 在左边或就是 mid（因为数组开始下降）。

缩小区间，继续二分，直到找到峰值。

## 实现

```java
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;

        int left = 0;
        int right = n-1;
        while(left < right) {
            int mid = left + (right-left) / 2;

            if(nums[mid] < nums[mid+1]) {
                // 小于右边，说明单调增。则峰值在右边
                left = mid+1;
            } else {
                // 左边或者 mid
                right = mid;
            }
        }   

        return left;
    }
}
```

## 效果

0ms 100%

## 反思

二分法总体还是太全面了，不要局限于排序查找。

本质上二分法只要求“单调”，局部也行。


# 参考资料