---
title: LC238. 除自身以外数组的乘积 product-of-array-except-self 
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC238. 除自身以外数组的乘积 product-of-array-except-self 

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
 

提示：

2 <= nums.length <= 10^5
-30 <= nums[i] <= 30
输入 保证 数组 answer[i] 在  32 位 整数范围内
 

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）

# v1-暴力

## 思路

简单粗暴的 2 层循环来实现。

## 实现

```java
class Solution {
    
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;

        int[] res = new int[n];    

        int temp = 1;
        for(int i = 0; i < n; i++) {
            temp = 1;
            for(int j = 0; j < n; j++) {
                if(i == j) {
                    continue;
                }

                temp *= nums[j];
            }        

            res[i] = temp;
        }

        return res;
    }

}
```

## 效果

超出时间限制
19 / 24 个通过的测试用例

## 反思

这个复杂度为 O(n^2)，数量一多就不行了。

有没有更快的方法呢？

# v2-前后乘积

## 核心思路

用两个数组 left 和 right：

```java
left[i] = nums[0] * nums[1] * ... * nums[i-1]
right[i] = nums[i+1] * ... * nums[n-1]
```

那么 `answer[i] = left[i] * right[i]`

## 实现

```java
class Solution {
    
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;

        int temp = 1;
        //left
        int[] left = new int[n];
        left[0] = 1;
        for(int i = 1; i < n; i++) {
            // 左边的
            left[i] = left[i-1] * nums[i-1];
        }

        //right
        int[] right = new int[n];
        right[n-1] = 1;
        for(int i = n-2; i >= 0; i--) {
            right[i] = right[i+1] * nums[i+1];
        }    

        // 计算
        int[] res = new int[n];    
        for(int i = 0; i < n; i++) {
            res[i] = left[i] * right[i];
        }
        return res;
    }

}
```


## 效果

2ms 击败 86.18%

## 复杂度

空间：O(N)

时间：O(N)


# v3-空间优化

## 思路

可以先把 left 放入结果

其他的类似，好处是可以节省空间，而且可以更快的获取结果。

## 实现

```java
class Solution {
    
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int prefix = 1;
        int suffix = 1;

        int[] results = new int[n];

        for(int i = 0; i < n; i++) {
            results[i] = prefix;

            prefix *= nums[i];
        }

        for(int i = n-1; i >= 0; i--) {
            results[i] *= suffix;
            suffix *= nums[i];
        }

        return results;
    }

}
```

## 效果

1ms 击败 100.00%

## 复杂度

时间：O(n)

空间：O(1)


# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
