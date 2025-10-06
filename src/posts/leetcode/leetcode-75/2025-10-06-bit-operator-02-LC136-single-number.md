---
title: LC136. 只出现一次的数字 single-number
date: 2025-10-06
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, bit-operator]
published: true
---

# LC136. 只出现一次的数字 single-number

给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

示例 1 ：

输入：nums = [2,2,1]

输出：1

示例 2 ：

输入：nums = [4,1,2,1,2]

输出：4

示例 3 ：

输入：nums = [1]

输出：1

 

提示：

1 <= nums.length <= 3 * 10^4
-3 * 10^4 <= nums[i] <= 3 * 10^4
除了某个元素只出现一次以外，其余每个元素均出现两次。

# v1-内置函数

## 思路

最简单的思路就是计数，但是要求算法只使用常量额外空间。

所以最基础的就不演示了。

这里最核心的是要想到位运算的特性：一个数异或自己=0

题目中除了某个元素只出现一次以外，其余每个元素均出现两次。所以全部异或，结果就是这个数。

## 实现

```java
class Solution {
    /**
     * 异或的性质是：相同的数字异或结果为 0，0 和任何数字异或结果为该数字本身。
     * 所以异或所有元素，最后的结果就是那个只出现一次的数字。
     */
    public int singleNumber(int[] nums) {
        int result = 0;

        for(int num : nums){
            result ^= num;
        }

        return result;
    }
}
```

## 效果

1ms 击败 98.67%

# 参考资料