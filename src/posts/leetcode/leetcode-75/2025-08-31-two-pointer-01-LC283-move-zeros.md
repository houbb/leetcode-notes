---
title: LC283. 移动零 move-zeros
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, two-pointer]
published: true
---

# LC283. 移动零 move-zeros

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]
 

提示:

1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1
 

进阶：你能尽量减少完成的操作次数吗？

# v1-借助空间

## 思路

首先借助额外空间，实现这个基本的特性。

主要是协助大家先理解这个问题。

## 实现

```java
    public void moveZeroes(int[] nums) {
        int n = nums.length;
        int[] temp = new int[n];
        int left = 0;
        for(int i = 0; i < n; i++) {
            if(nums[i] != 0) {
                temp[left++] = nums[i];    
            }
        }

        // copy
        for(int i = 0; i < n; i++) {
            nums[i] = temp[i];
        }

    }
```

## 效果

1ms 击败 100.00%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

当然了，这种解法是不符合题意的。

因为我们借助了额外的空间。

# v2-使用常量的空间

## 思路

这种一般大概率就是指针来解决。

整体实现和上上面类似，我们用 left + right 两个指针。

left=right=0;

right 像普通的遍历一样，left 则对应的是结果真实的位置。

返回值：left

处理逻辑：如果 nums[left] == 0，那么就往右找到第一个 nums[right] != 0 的位置，然后 swap

## 实现

```java
public void moveZeroes(int[] nums) {
        int n = nums.length;
        for(int i = 0; i < n-1; i++) {
            if(nums[i] == 0) {
                // 找到右边的第一个非零数字
                for(int right = i+1; right < n; right++) {
                    if(nums[right] != 0) {
                        // swap
                        int temp = nums[i];
                        nums[i] = nums[right];
                        nums[right] = temp;
                        break;
                    }
                }
            }
        }
    }    
```

## 效果

48ms 击败 6.08%

## 复杂度

TC: O(n^2)

SC: O(1)

## 反思

虽然这个没有利用额外空间，但是性能太差。

那么世间安得双全法？

# v3-双指针

## 思路

我们用 right 指针正常遍历，left 指针代表着真实的非零的位置。

直接把不是0的数字放在 left 的位置，然后超过的部分全部设置为0

## 实现

```java
public void moveZeroes(int[] nums) {
        int n = nums.length;
        int left = 0;
        for(int i = 0; i < n; i++) {
            if(nums[i] != 0) {
                nums[left++] = nums[i];
            }
        }

        // 后续设置为0
        for(int i = left; i < n; i++) {
            nums[i] = 0;
        }
    } 
```

## 复杂度

TC: O(n)

SC: O(1)

# 参考资料