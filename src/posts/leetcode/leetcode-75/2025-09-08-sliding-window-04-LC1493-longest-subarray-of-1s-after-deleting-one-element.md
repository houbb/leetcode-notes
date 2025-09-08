---
title: LC1493. 删掉一个元素以后全为 1 的最长子数组 longest-subarray-of-1s-after-deleting-one-element
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC1493. 删掉一个元素以后全为 1 的最长子数组 longest-subarray-of-1s-after-deleting-one-element

给你一个二进制数组 nums ，你需要从中删掉一个元素。

请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。

如果不存在这样的子数组，请返回 0 。

提示 1：

输入：nums = [1,1,0,1]
输出：3
解释：删掉位置 2 的数后，[1,1,1] 包含 3 个 1 。
示例 2：

输入：nums = [0,1,1,1,0,1,1,0,1]
输出：5
解释：删掉位置 4 的数字后，[0,1,1,1,1,1,0,1] 的最长全 1 子数组为 [1,1,1,1,1] 。
示例 3：

输入：nums = [1,1,1]
输出：2
解释：你必须要删除一个元素。
 

提示：

1 <= nums.length <= 10^5
nums[i] 要么是 0 要么是 1 。

# v1-暴力

## 思路

这一题和 LC1004 非常类似。

区别在于翻转0的数量为1，结果是删除，所以需要-1.

管他这么多，直接从第一个位置开始，暴力计算。

## 实现

```java
    public int longestOnes(int[] nums, int k) {
        int res = 0;

        int n = nums.length;
        int zeroCount = 0;
        int count = 0;
        for(int i = 0; i < n; i++) {
            count = 0;
            zeroCount = 0;
            
            for(int j = i; j < n; j++) {
                if(nums[j] == 0) {
                    zeroCount++;
                }
                if(zeroCount > k) {
                    break;
                }

                count++;
            }

            res = Math.max(res, count);
        }

        return res;
    }
```

## 效果

1459ms 击败 5.30%

## 复杂度

TC：最坏情况是 O(n²)

SC：只用到几个变量（zeroCount, count, res），所以是 O(1)

## 反思

如何进一步优化呢?

最大的问题在于重复的计算，如果可以复用就好了。

# v2-滑动窗口

## 思路

我们按照滑动窗口的思路来解决，只不过这次定的不是长度，而是 0 的总数。

用两个指针 left 和 right 表示窗口的左右边界。

窗口内 0 的个数不能超过 k。

每次右指针 right 右移，如果遇到 0，就增加 zeroCount。

当 zeroCount > k 时，左指针 left 右移，直到窗口内 0 的个数 ≤ k。

每次更新窗口长度，取最大值。

## 实现

```java
public int longestSubarray(int[] nums) {
        int n = nums.length;

        int res = 0;
        int zeroCount = 0;
        int left = 0;
        for(int right = 0; right < n; right++) {
            if(nums[right] == 0) {
                zeroCount++;
            }
            
            while(zeroCount > 1) {
                if(nums[left] == 0) {
                    zeroCount--;
                }

                left++;        
            }

            res = Math.max(res, (right-left));
        }

        return res;
}
```

## 效果

3ms 击败 42.68%

## 反思

为什么不是 100%?

# v3-更精简的写法

## 思路

算法本身已经复杂度最优，剩下的就是分支判断之类的优化。

## 实现

下面的方法避免了 zeroCount 和 maxLen。

```java
public int longestSubarray(int[] nums) {
        int n = nums.length;
        int l = 0, r = 0;

        int k = 1;
        while (r < n) {
            k -= 1 - nums[r];
            r++;

            // 翻转 0 数量不够，左边收缩边界
            if (k < 0) {
                k += 1 - nums[l];
                l++;
            }
        }

        return r - l - 1;
    }
```

这个代码需要解释一下

```
k -= 1 - nums[r];
nums[r] 是 1 时：1 - nums[r] = 0 → k 不变
nums[r] 是 0 时：1 - nums[r] = 1 → k 减 1
```

也就是说，k 就是 剩余可翻转 0 的数量。

结果返回：

每次循环，窗口 `[l, r)` 始终满足 0 的数量 ≤ 原 k

`r - l - 1` 所以最终窗口长度就是 最长连续 1（删掉1个0）

## 反思

这种解法固然巧妙，不过很容易出错，可以作为进阶的学习对象。

# 参考资料