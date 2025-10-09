---
title: LC80. 删除有序数组中的重复项 II remove-duplicates-from-sorted-array-ii
date: 2025-10-09 
categories: [TopInterview150]
tags: [leetcode, topInterview150, array]
published: true
---

# LC80. 删除有序数组中的重复项 II remove-duplicates-from-sorted-array-ii

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

说明：

为什么返回数值是整数，但输出的答案是数组呢？

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```java
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
``` 

示例 1：

输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
示例 2：

输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应返回新长度 length = 7, 并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
 

提示：

1 <= nums.length <= 3 * 10^4
-10^4 <= nums[i] <= 10^4
nums 已按升序排列


# v1-基本

## 思路

其实这一题和 LC26 非常类似，不同的是我们需要保留2个元素。

其实不需要用变量存储重复了几次，因为数组本身是有序的。

直接双指针，比较 `nums[right] != nums[left-2]` 就是满足条件的。

前 2 个元素不需要考虑。

## 实现

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        // 前2个不用处理
        int left = 2;
        int n = nums.length;

        for(int right = 2; right < n; right++) {
            // 保留次数小于2
            if(nums[right] != nums[left-2]) {
                nums[left++] = nums[right];
            }
        }   

        return left;    
    }
}
```

## 效果

1ms 击败 22.44%

看了下 top1 的写法其实是类似的，同样的执行耗时依然是 1ms。估计是后期的用例发生了变化。


# v2-能力泛化

## 思路

如果我们把这一题推广为保留 k 个重复的元素，要如何实现呢？？

## 实现

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        return removeDuplicatesForK(nums, 2);
    }

    public int removeDuplicatesForK(int[] nums, int k) {
        // 前k个不用处理
        int left = k;
        int n = nums.length;

        for(int right = k; right < n; right++) {
            // 保留次数小于k
            if(nums[right] != nums[left-k]) {
                nums[left++] = nums[right];
            }
        }   

        return left;    
    }
    
}
```

## 效果

AC

## 验证下 LC26

### 实现

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        return removeDuplicatesForK(nums, 1);
    }

    public int removeDuplicatesForK(int[] nums, int k) {
        // 前k个不用处理
        int left = k;
        int n = nums.length;

        for(int right = k; right < n; right++) {
            // 保留次数小于k
            if(nums[right] != nums[left-k]) {
                nums[left++] = nums[right];
            }
        }   

        return left;    
    }
    
}
```

### 效果

AC

# 反思

设计哲学层面，为什么力扣没有出第三个题目，也就是泛化呢？

可以这么做，但是不太有必要。虽然力扣也有不少 k 的泛化题目，但是这个难度其实和 LC80 差不多。

力扣的设计哲学，主要是让你掌握某种算法思维模式。

LC26 → 让你理解 “双指针去重” 的基本形态。
LC80 → 让你学会 “控制保留次数” 的进阶变体。

# 参考资料

https://leetcode.cn/problems/merge-sorted-array/submissions/668896756/?envType=study-plan-v2&envId=top-interview-150

