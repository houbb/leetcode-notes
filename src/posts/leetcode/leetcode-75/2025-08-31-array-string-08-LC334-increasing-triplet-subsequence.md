---
title: LC334. 递增的三元子序列 increasing-triplet-subsequence
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# 334. 递增的三元子序列

给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。

如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

示例 1：

输入：nums = [1,2,3,4,5]
输出：true
解释：任何 i < j < k 的三元组都满足题意
示例 2：

输入：nums = [5,4,3,2,1]
输出：false
解释：不存在满足题意的三元组
示例 3：

输入：nums = [2,1,5,0,4,6]
输出：true
解释：其中一个满足题意的三元组是 (3, 4, 5)，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6
 

提示：

1 <= nums.length <= 5 * 10^5
-2^31 <= nums[i] <= 2^31 - 1
 

进阶：你能实现时间复杂度为 O(n) ，空间复杂度为 O(1) 的解决方案吗？

# v1-暴力

## 思路

管他 3*7，直接暴力。

## 实现

```java
    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        if(n < 3) {
            return false;
        }

        for(int i = 0; i < n-2; i++) {
            for(int j = i+1; j < n-1; j++) {
                for(int k = j+1; k < n; k++) {
                    if(nums[i] < nums[j] && nums[j] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
```


## 效果

出时间限制
34 / 86 个通过的测试用例

## 复杂度

TC: O(n^3)

## 反思

炸的意料之中，为什么这么慢？

如何优化？


# v2-贪心

## 思路

核心思想：

我们只需要知道数组中是否存在 三个递增的数字

不需要记录下标或具体子序列

可以用两个变量保存最小值和第二小值：

```java
first < second < third ?
```

这里并不要求连续。

## 实现

```java
class Solution {
    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        if(n < 3) {
            return false;
        }

        int first = Integer.MAX_VALUE;
        int second = Integer.MAX_VALUE;

        for (int num : nums) {
            if (num <= first) first = num;
            else if (num <= second) second = num;
            else return true; // 找到第三个 > second > first
        }

        return false;
    }
}
```

## 效果

2ms 击败 99.83%

## 反思

这种贪心还是过于优秀了。