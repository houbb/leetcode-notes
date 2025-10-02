---
title: LC2542. 最大子序列的分数 maximum-subsequence-score
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, heap]
published: true
---

# LC2542. 最大子序列的分数 maximum-subsequence-score

给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，两者长度都是 n ，再给你一个正整数 k 。你必须从 nums1 中选一个长度为 k 的 子序列 对应的下标。

对于选择的下标 i0 ，i1 ，...， ik - 1 ，你的 分数 定义如下：

nums1 中下标对应元素求和，乘以 nums2 中下标对应元素的 最小值 。
用公式表示： (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]) 。
请你返回 最大 可能的分数。

一个数组的 子序列 下标是集合 {0, 1, ..., n-1} 中删除若干元素得到的剩余集合，也可以不删除任何元素。

示例 1：

输入：nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
输出：12
解释：
四个可能的子序列分数为：
- 选择下标 0 ，1 和 2 ，得到分数 (1+3+3) * min(2,1,3) = 7 。
- 选择下标 0 ，1 和 3 ，得到分数 (1+3+2) * min(2,1,4) = 6 。
- 选择下标 0 ，2 和 3 ，得到分数 (1+3+2) * min(2,3,4) = 12 。
- 选择下标 1 ，2 和 3 ，得到分数 (3+3+2) * min(1,3,4) = 8 。
所以最大分数为 12 。
示例 2：

输入：nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
输出：30
解释：
选择下标 2 最优：nums1[2] * nums2[2] = 3 * 10 = 30 是最大可能分数。
 

提示：

n == nums1.length == nums2.length
1 <= n <= 105
0 <= nums1[i], nums2[j] <= 105
1 <= k <= n

# v1-heap+sort

## 思路

这一题实际上设计的很巧妙。

为了达到目标，我们实际上做了只需要关心：

1) 针对 nums1 中选择 k 个最大的数，很自然的用 heap

2) 针对 nums2 中选择最大的值，很自然的对 nums 排序

但是 nums1、nums2 之间顺序不能乱，所以需要绑定在一起，按照 nums2 排序。

## 流程

1. 把 (nums1[i], nums2[i]) 配对，按 nums2 从大到小排序。

2. 初始化一个最小堆，sum = 0，ans = 0。

3. 遍历排序后的数组：

把当前的 nums1 加入堆，更新 sum。

如果堆大小 > k，弹掉最小的，更新 sum。

如果堆大小 == k，说明可以组成合法子序列，此时：

## 实现

```java
class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        int[][] pairs = new int[n][2];
        for(int i = 0; i < n; i++) {
            pairs[i] = new int[]{nums1[i], nums2[i]};
        }
        // 排序 nums2 大的在前面
        Arrays.sort(pairs, (a,b)->b[1] - a[1]);

        PriorityQueue<Integer> heap = new PriorityQueue<>();

        long max = Long.MIN_VALUE;
        long sum = 0;
        for(int i = 0; i < n; i++) {
            int[] pair = pairs[i];

            heap.add(pair[0]);
            // 移除最小的
            if(heap.size() > k) {
                int del = heap.poll();
                sum -= del;    
            }
            sum += pair[0];

            // 判断大小满足
            if(heap.size() == k) {
                long temp = sum * pair[1];
                max = Math.max(temp, max);
            }
        }

        
        return max;
    }

}
```

## 效果

84ms 击败 21.56%

## 反思

为什么这么慢？

# v2-优化

## 思路

在 k 之前，不需要这么多复杂的考虑。

可以只对 nums2 进行排序。

## 实现

```java
class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        Integer[] index2 = new Integer[n];
        for(int i = 0; i < n; i++) {
            index2[i] = i;
        }

        // 排序 nums2 大的在前面
        Arrays.sort(index2, (a,b)->nums2[b] - nums2[a]);

        PriorityQueue<Integer> heap = new PriorityQueue<>();
        long sum = 0;

        for(int i = 0; i < k; i++) {
            int num1 = nums1[index2[i]];
            heap.add(num1);
            sum += num1;    
        }

        // 当前最大值
        long max = sum * nums2[index2[k-1]];
        for(int i = k; i < n; i++) {
            int num1 = nums1[index2[i]];
            int num2 = nums2[index2[i]];    

            // 移除最小的
            if(num1 > heap.peek()) {
                int del = heap.poll();
                sum = sum - del + num1;    
                heap.add(num1);

                long temp = sum * num2;
                max = Math.max(temp, max);
            }
        }

        
        return max;
    }

}
```

## 效果

70ms 击败 68.56%

## 反思

如何更快？

# v3-手写堆

## 思路

系统默认的 PriorityQueue 涉及到 int 的装箱、拆箱，性能会有一些打折。

如果追求极致，那么就是手写 heap。

## 实现

```java
class Solution {
    // 堆封装
    static class MinHeap {
        int[] heap;
        int size;

        public MinHeap(int capacity) {
            heap = new int[capacity];
            size = 0;
        }

        public void add(int val) {
            heap[size] = val;
            siftUp(size++);
        }

        public int peek() {
            return heap[0];
        }

        public int poll() {
            int ret = heap[0];
            heap[0] = heap[--size];
            siftDown(0);
            return ret;
        }

        private void siftUp(int i) {
            int val = heap[i];
            while (i > 0) {
                int parent = (i - 1) / 2;
                if (heap[parent] <= val) break;
                heap[i] = heap[parent];
                i = parent;
            }
            heap[i] = val;
        }

        private void siftDown(int i) {
            int val = heap[i];
            int half = size / 2;
            while (i < half) { // 有子节点
                int left = 2 * i + 1;
                int right = left + 1;
                int smallest = left;
                if (right < size && heap[right] < heap[left]) smallest = right;
                if (heap[smallest] >= val) break;
                heap[i] = heap[smallest];
                i = smallest;
            }
            heap[i] = val;
        }
    }

    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        Integer[] index = new Integer[n];
        for (int i = 0; i < n; i++) index[i] = i;

        // 按 nums2 降序排序
        Arrays.sort(index, (a, b) -> Integer.compare(nums2[b], nums2[a]));

        MinHeap heap = new MinHeap(k);
        long sum = 0;

        // 先加入前 k 个
        for (int i = 0; i < k; i++) {
            int val = nums1[index[i]];
            heap.add(val);
            sum += val;
        }

        long max = sum * nums2[index[k - 1]];

        // 遍历后续元素
        for (int i = k; i < n; i++) {
            int val1 = nums1[index[i]];
            int val2 = nums2[index[i]];

            if (val1 > heap.peek()) {
                sum = sum - heap.poll() + val1;
                heap.add(val1);
                max = Math.max(max, sum * val2);
            }
        }

        return max;
    }
}
```

## 效果

0ms 100%

## 反思

这一道中等题目不至于手写堆。

以后总归要面对这一座手写的大山

# 参考资料