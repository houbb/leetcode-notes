---
title: LC215. 数组中的第K个最大元素 kth-largest-element-in-an-array
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, heap]
published: true
---

# LC215. 数组中的第K个最大元素 kth-largest-element-in-an-array

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

 

示例 1:

输入: [3,2,1,5,6,4], k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
 

提示：

1 <= k <= nums.length <= 10^5
-104 <= nums[i] <= 10^4


# v1-sort

## 思路

最简单的，排序+返回。

## 实现

```java
public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    
    return nums[nums.length-k];
}
```

## 效果

24ms 击败 68.85%

## 反思

各种角度而言，这是最实用的解法。

当然，本题不是为了考察这个。

# v2-优先级队列（大顶堆）

## 思路

一个大顶堆。

n 次遍历放入。

k 次遍历找到？

## 实现

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>((a,b)->(b-a));
        for(int num : nums) {
            heap.add(num);
        }

        int res = 0;
        for(int i = 0; i < k; i++) {
            res = heap.poll();
        }        

        return res;
    }
}
```

## 效果

75ms 击败 18.09%

## 复杂度

| 项目 | 复杂度                               |
| -- | --------------------------------- |
| 时间 | O(n log n + k log n) ≈ O(n log n) |
| 空间 | O(n)                              |

## 反思

可以进一步优化吗？

# v3-优先级队列（小顶堆）

## 思路

一个小顶堆。

n 次遍历放入。

只保留 k 个元素，堆顶就是结果

## 实现

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for(int num : nums) {
        heap.add(num);
        if(heap.size() > k) {
            heap.poll();
        }
    }
    return heap.peek();
}
```

## 效果

67ms 击败 20.21%

# v4-桶排序

## 思路

其实这个放在堆的系列中不太合适，因为这一题堆不是最佳解法。

甚至不符合题意。

直接用集合排序，然后累加找结果就行。

## 实现

```java 
public int findKthLargest(int[] nums, int k) {
    int[] bucket = new int[20001];
    int offset = 10000;
    for(int num : nums) {
        bucket[num+offset]++;
    }    
    // 找到符合范围的数字
    int count = 0;
    for(int i = 20000; i > 0; i--) {
        count += bucket[i];
        if(count >= k) {
            return i - offset;
        }
    }
    return -1;
}
```

## 效果

4ms 击败 96.65%

## 反思

还能更快吗？



# 参考资料