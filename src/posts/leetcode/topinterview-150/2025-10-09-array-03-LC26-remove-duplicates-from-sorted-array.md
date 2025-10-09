---
title: LC26. 删除有序数组中的重复项 remove-duplicates-from-sorted-array
date: 2025-10-09 
categories: [TopInterview150]
tags: [leetcode, dp, topInterview150, array]
published: true
---

# LC26. 删除有序数组中的重复项 remove-duplicates-from-sorted-array

给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。

考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：

更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
返回 k 。
判题标准:

系统会用下面的代码来测试你的题解:

```java
int[] nums = [...]; // 输入数组
int[] expectedNums = [...]; // 长度正确的期望答案

int k = removeDuplicates(nums); // 调用

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```
如果所有断言都通过，那么您的题解将被 通过。


示例 1：

输入：nums = [1,1,2]
输出：2, nums = [1,2,_]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。


示例 2：

输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 

提示：

1 <= nums.length <= 3 * 10^4
-10^4 <= nums[i] <= 10^4
nums 已按 非严格递增 排列

# v1-基本

## 题意

要做什么？

1）移除重复元素

2）返回非重复的个数

3）保持原始的数据顺序

## 思路

left 指向“去重后数组的最后一个有效位置”

right 用来扫描整个数组

如果发现新数字，就把它放到 left+1 的位置上

返回 left+1;

## 实现

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length;
        int left = 0;
        int right= 1;

        for(right = 1; right < n; right++) {
            // 发现新的数字，放在 left 的右边
            if(nums[left] != nums[right]) {
                nums[++left] = nums[right];
            }
        }
        
        return left+1;
    }

}
```

## 效果

1ms 击败 35.28%

## 复杂度

时间复杂度：O(n)

空间复杂度：O(1)

## 反思

可是这一题比较奇怪的是 while 版本就是比 for 循环要快，为什么呢？

实际测试可能是以前的用例问题，因为同样的 while 代码，执行耗时依然是 1ms 不变。

# 参考资料

https://leetcode.cn/problems/merge-sorted-array/submissions/668896756/?envType=study-plan-v2&envId=top-interview-150

