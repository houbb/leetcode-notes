---
title: LC88. 合并两个有序数组 merge-sorted-array
date: 2025-10-09 
categories: [TopInterview150]
tags: [leetcode, dp, topInterview150, array]
published: true
---

# LC88. 合并两个有序数组 merge-sorted-array

给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。

为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

示例 1：

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。


示例 2：

输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。


示例 3：

输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
 

提示：

nums1.length == m + n
nums2.length == n
0 <= m, n <= 200
1 <= m + n <= 200
-10^9 <= nums1[i], nums2[j] <= 10^9
 

进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？


# v1-基本

## 思路

首先一定要利用好原始的有序性。

这里我们先借助一个额外数组，主要是让实现比较简单直接。

## 实现

```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int ix1 = 0;
        int ix2 = 0;

        // 额外空间，后续考虑优化
        int[] res = new int[m+n];
        int i = 0;
        while(ix1 < m && ix2 < n) {
            // 比较
            int n1 = nums1[ix1];
            int n2 = nums2[ix2];

            if(n1 <= n2) {
                res[i++] = n1;
                ix1++;
            } else {
                res[i++] = n2;
                ix2++;
            }
        }

        // 剩余的放入数组中
        while(ix1 < m) {
            res[i++] = nums1[ix1];
            ix1++;
        }
        while(ix2 < n) {
            res[i++] = nums2[ix2];
            ix2++;
        }

        // 结果数组同步到结果 nums1
        for(int j = 0; j < m+n; j++) {
            nums1[j] = res[j];
        }
    }
}
```

## 效果

0ms 击败 100.00%

## 复杂度

时间复杂度：O(m+n)

空间复杂度：O(m+n)

## 反思

可以不用额外的数组吗？

# v2-原地排序

## 思路

如果我们从前往后排序，会导致 nums1 位置不合适元素都要移动，性能肯定很差。

所以思路要换一下：

从 nums1 和 nums2 的后往前排序，谁大把这个数字放在 nums1 的最后。

这样就不需要移动 nums1 了。

## 实现

```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int ix1 = m-1;
        int ix2 = n-1;

        // 从后往前比
        int i = m+n-1;
        while(ix1 >=0 && ix2 >= 0) {
            // 比较
            int n1 = nums1[ix1];
            int n2 = nums2[ix2];

            // 大的放在末尾
            if(n1 > n2) {
                nums1[i--] = n1;
                ix1--;
            } else {
                nums1[i--] = n2;
                ix2--;
            }
        }

        // 剩余的放入数组中
        while(ix1 >= 0) {
            nums1[i--] = nums1[ix1--];
        }
        while(ix2 >= 0) {
            nums1[i--] = nums2[ix2--];
        }
    }

}
```

## 效果

0ms 击败 100.00%

## 复杂度

TC: O(m+n)

SC: 没有额外空间

## 反思

很多解法看起来效果差不多，主要还是用例太仁慈了。

# 参考资料

https://leetcode.cn/problems/merge-sorted-array/submissions/668896756/?envType=study-plan-v2&envId=top-interview-150

