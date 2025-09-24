---

title: 算法篇专题之堆 heap 12-LC215. 数组中的第K个最大元素 kth-largest-element-in-an-array
date:  2020-06-08
categories: [TopLiked100]
tags: [algorithm, data-struct, topics, leetcode, heap, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下数组中的第K个最大元素

# 215. 数组中的第K个最大元素

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
-10^4 <= nums[i] <= 10^4



# v1-数组排序

## 思路

内置sort+return

## 复杂度

这个复杂度一般是 O(nlog) 不满足的

## 实现

```java
    public int findKthLargest(int[] nums, int k) {
        //1. sort + return
        Arrays.sort(nums);

        return nums[nums.length-k];
    }
```

## 效果

32ms 击败 52.65%

# v2-计数排序

## 思路

主要问题还是出在了排序这个部分。

我们用计数排序来实现。（空间换时间）

为了减少空间，可以先计算一下 min max

## 实现

```java
    public int findKthLargest(int[] nums, int k) {
        int min = 10000;
        int max = -10000;
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }

        int[] temp = new int[max - min + 1];
        // 正确计数
        for (int num : nums) {
            temp[num - min]++;
        }

        // 排序（其实就是数频统计）
        int targetIx = nums.length - k; // 转成第 (n-k) 小
        int count = 0;
        for (int i = 0; i < temp.length; i++) {
            count += temp[i];
            if (count > targetIx) {

                // 这里返回的就是数字本身
                return i + min;
            }
        }
        return -1;
    }
```

## 效果

2ms 击败 100.00%

## 复杂度

最好情况（数值范围小）：时间 O(n)，空间 O(n) → 比排序（O(n log n)) 更优。

最坏情况（数值范围大）：时间 O(n + R)，空间 O(R) → 不如快排 / 堆排序。


# v3-优先级队列（小根堆）

## 思路

放入优先级队列，然后只保留 k 个元素，peek 最上层元素就是。

## 实现

```java
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> queue = new PriorityQueue<>();

        for(int num : nums) {
            queue.offer(num);
        }

        // 保留k
        while(queue.size() > k) {
            queue.poll();
        }

        return queue.peek();
    }
```

## 效果

76ms 击败 18.07%

## 复杂度

优先级队列法：O(n log k) 时间，O(k) 空间。

# v4-基数排序

## 思路

因为数字范围是 -10^4~10^4，为了避免负数，可以统一加 base 10^4

## 实现

```java
public int findKthLargest(int[] nums, int k) {
        int n = nums.length;

        // 1. 平移所有数字，加上 base
        int base = 10000;
        for (int i = 0; i < n; i++) {
            nums[i] += base;
        }

        // 2. 基数排序
        radixSort(nums);

        // 3. 取出第 k 大，再减去 base 还原
        return nums[n - k] - base;
    }

    private void radixSort(int[] nums) {
        int n = nums.length;
        int maxVal = 0;
        for (int num : nums) {
            maxVal = Math.max(maxVal, num);
        }

        int exp = 1; // 当前位：个位，十位，百位...
        int[] buffer = new int[n];

        while (maxVal / exp > 0) {
            int[] count = new int[10];

            // 统计每一位的频次
            for (int num : nums) {
                int digit = (num / exp) % 10;
                count[digit]++;
            }

            // 前缀和 -> 确定位置
            for (int i = 1; i < 10; i++) {
                count[i] += count[i - 1];
            }

            // 稳定排序，倒序填充
            for (int i = n - 1; i >= 0; i--) {
                int digit = (nums[i] / exp) % 10;
                buffer[--count[digit]] = nums[i];
            }

            // 拷贝回 nums
            System.arraycopy(buffer, 0, nums, 0, n);

            exp *= 10;
        }
    }
}
```


## 效果

24ms 击败 69.12%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

还是用例不够多，没有区分度。

# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。