---
title: LC724. 寻找数组的中心下标 find-pivot-index
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC724. 寻找数组的中心下标 find-pivot-index

给你一个整数数组 nums ，请计算数组的 中心下标 。

数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

 

示例 1：

输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
中心下标是 3 。
左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
示例 2：

输入：nums = [1, 2, 3]
输出：-1
解释：
数组中不存在满足此条件的中心下标。
示例 3：

输入：nums = [2, 1, -1]
输出：0
解释：
中心下标是 0 。
左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 。
 

提示：

1 <= nums.length <= 10^4
-1000 <= nums[i] <= 1000
 

注意：本题与主站 1991 题相同：https://leetcode-cn.com/problems/find-the-middle-index-in-array/

# v1-暴力

## 思路

直接从 i=0开始，遍历看左右位置的全部数字之和信息

找到第一个满足的返回。

## 实现

```java
public int pivotIndex(int[] nums) {
        int n = nums.length;

        for(int i = 0; i < n; i++) {
            long leftSum = calcSum(nums, 0, i-1);
            long rightSum = calcSum(nums, i+1, n-1);

            if(leftSum == rightSum) {
                return i;
            }
        }
        
        return -1;
    }

    private long calcSum(int[] nums, int l, int r) {
        if(l < 0) {
            return 0;
        }
        if(r > nums.length-1) {
            return 0;
        }

        long sum = 0;
        for(int i = l; i <= r; i++) {
            sum += nums[i];
        }

        return sum;
    }
```



## 效果

589ms 击败 5.04%

## 反思

这个累加和我们一次次的重复计算，有没有更简单的方法呢？


# v2-前缀和

## 思路

我们可以定义一个数组 prefixSum，存放每一个 0...i 位置的和到 prefixSum[i] 中。

## 实现

```java
    public int pivotIndex(int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n];
        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            long leftSum = calcSum(prefixSum, 0, i - 1);
            long rightSum = calcSum(prefixSum, i + 1, n - 1);

            if (leftSum == rightSum) {
                return i;
            }
        }

        return -1;
    }

    private long calcSum(int[] prefixSum, int l, int r) {
        if (l > r) return 0;  // 区间无效
        if (l == 0) return prefixSum[r];
        return prefixSum[r] - prefixSum[l - 1];
    }
```

## 效果

1ms 击败 65.18%

## 反思

还能更快吗？

# v3-何必前缀和

## 思路

以一个固定的公式：

```
总和 = leftSum + numsi[i] + rightSum
rightSum = 总和 - leftSum - numsi[i]；
```

其实我们首先计算出总和，然后更新 leftSum，就可以实时计算 rightSum。可以不用前缀和。

## 实现

```java
public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;

        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (leftSum == total - leftSum - nums[i]) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
}
```

## 效果

0ms 100%

## 反思

这样计算会简单很多。


# 参考资料