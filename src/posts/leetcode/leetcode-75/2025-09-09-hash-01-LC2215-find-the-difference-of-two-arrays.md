---
title: LC2215. 找出两数组的不同 find-the-difference-of-two-arrays
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC2215. 找出两数组的不同 find-the-difference-of-two-arrays

给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，请你返回一个长度为 2 的列表 answer ，其中：

answer[0] 是 nums1 中所有 不 存在于 nums2 中的 不同 整数组成的列表。
answer[1] 是 nums2 中所有 不 存在于 nums1 中的 不同 整数组成的列表。
注意：列表中的整数可以按 任意 顺序返回。

示例 1：

输入：nums1 = [1,2,3], nums2 = [2,4,6]
输出：[[1,3],[4,6]]
解释：
对于 nums1 ，nums1[1] = 2 出现在 nums2 中下标 0 处，然而 nums1[0] = 1 和 nums1[2] = 3 没有出现在 nums2 中。因此，answer[0] = [1,3]。
对于 nums2 ，nums2[0] = 2 出现在 nums1 中下标 1 处，然而 nums2[1] = 4 和 nums2[2] = 6 没有出现在 nums2 中。因此，answer[1] = [4,6]。
示例 2：

输入：nums1 = [1,2,3,3], nums2 = [1,1,2,2]
输出：[[3],[]]
解释：
对于 nums1 ，nums1[2] 和 nums1[3] 没有出现在 nums2 中。由于 nums1[2] == nums1[3] ，二者的值只需要在 answer[0] 中出现一次，故 answer[0] = [3]。
nums2 中的每个整数都在 nums1 中出现，因此，answer[1] = [] 。 
 

提示：

1 <= nums1.length, nums2.length <= 1000
-1000 <= nums1[i], nums2[i] <= 1000


# v1-Hash

## 思路

我们用 HashSet 去重，同时判断元素是否存在。

## 实现

```java
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
       // hash
       Set<Integer> num1Set = new HashSet<>(); 
       for(int num : nums1) {
            num1Set.add(num);
       }
       Set<Integer> num2Set = new HashSet<>(); 
        for(int num : nums2) {
            num2Set.add(num);
       }


         
       List<Integer> list1 = new ArrayList<>();
       for(int num : num1Set) {
            if(!num2Set.contains(num)) {
                list1.add(num);
            }
       }

       List<Integer> list2 = new ArrayList<>();
       for(int num : num2Set) {
            if(!num1Set.contains(num)) {
                list2.add(num);
            }
       }

       return Arrays.asList(list1, list2);

    }
```



## 效果

10ms 击败 88.74%

## 反思

所以呢？为什么不是 100%?


# v2-数组优化

## 思路

注意到 `-1000 <= nums1[i], nums2[i] <= 1000`

我们可以用数组来替代 hashSet

## 实现

```java
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        boolean[] seen1 = new boolean[2001];
        boolean[] seen2 = new boolean[2001];

        // 偏移量，避免负数下标
        int offset = 1000;

        for (int num : nums1) seen1[num + offset] = true;
        for (int num : nums2) seen2[num + offset] = true;

        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();

        for (int i = 0; i <= 2000; i++) {
            if (seen1[i] && !seen2[i]) list1.add(i - offset);
            if (seen2[i] && !seen1[i]) list2.add(i - offset);
        }

        return Arrays.asList(list1, list2);
    }
```

## 效果

3ms 击败 98.98%


# 参考资料