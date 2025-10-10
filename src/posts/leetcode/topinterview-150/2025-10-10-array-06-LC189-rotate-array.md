---
title: LC189. 轮转数组 rotate-array
date: 2025-10-10
categories: [TopInterview150]
tags: [leetcode, topInterview150, array]
published: true
---

# 面试 TOP150 数组系列

[LC26. 删除有序数组中的重复项](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-09-array-03-LC26-remove-duplicates-from-sorted-array.html)

[LC27. 移除元素](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-09-array-02-LC27-remove-element.html)

[LC80. 删除有序数组中的重复项 II](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-09-array-04-LC80-remove-duplicates-from-sorted-array-ii.html)

[LC88. 合并两个有序数组](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-09-array-01-LC88-merge-sorted-array.html)

[LC169. 多数元素与 Boyer–Moore 投票算法](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-09-array-06-LC169-majority-element.html)

[LC189. 轮转数组](https://houbb.github.io/leetcode-notes/posts/leetcode/topinterview-150/2025-10-10-array-06-LC189-rotate-array.html)

# LC189. 轮转数组 rotate-array

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

示例 1:

```
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

示例 2:

```
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

提示：

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5
 

进阶：

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。

你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

# v1-暴力

## 思路

就直接用基础的方式，旋转多少次，执行多少次。

当然，可以预见的，大概率超时。

## 实现

```java
class Solution {

    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        
        for(int i = 0; i < k; i++) {
            // 旋转一圈
            int last = nums[n-1];

            for(int j = n-1; j > 0; j--) {
                nums[j] = nums[j-1];
            }

            nums[0] = last;
        }
    }

}
```

## 效果

超出时间限制
38 / 39 个通过的测试用例

## 复杂度

TC：`O(n*k)`

## 反思

暴力明显过于慢了。

# v2-借助额外空间

## 思路

我们没必要一次次移动，可以一次移动 k 个位置。

比较简单的方法是借助额外的空间数组。

1）把对应的元素放置在新数组 `(k+i) % n` 的位置

2）直接复制回去

## 实现

```java
class Solution {

    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;

        int[] temps = new int[n];
        for(int i = 0; i < n; i++) {
            int ix = (k + i) % n;

            temps[ix] = nums[i];
        }

        // 覆盖到原始数组
        for(int i = 0; i < n; i++) {
            nums[i] = temps[i];
        }
    }

}
```

## 效果

2ms 击败 13.64%

## 复杂度

SC: O(n)

TC: O(n) 一次遍历，一次覆盖

## 反思

如何才能不用额外空间呢？

# v3-环形替换（标准原地算法）

## 思路

i 位置的元素，新位置在 `(k+i) % n`。

但是没有额外空间会导致数据覆盖，怎么办呢？

其实可以借鉴 v1 的思路：

把一个元素搬到它的目标位置；

把目标位置原来的值临时保存，再搬到它自己的新位置；

这样周而复始，就形成了一个 循环环（cycle）。

## 实现

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        int count = 0; // 已移动的元素数量

        for (int start = 0; count < n; start++) {
            int current = start;
            int prev = nums[start];

            do {
                int next = (current + k) % n; // 目标位置
                int temp = nums[next];       // 暂存目标位置的值

                nums[next] = prev;           // 把 prev 放入目标位置
                prev = temp;                 // 更新 prev

                current = next;              // 前进
                count++;
            } while (start != current);
        }
    }
}
```

## 效果

2ms 13.64%

## 复杂度

TC: O(n)

SC: O(1)

## 反思

不过这个版本确实感觉难以记忆，容易写错。

# v4-多次翻转

## 思路

原地移动，可以通过 reverse 神奇的实现。

以 nums = [1,2,3,4,5,6,7], k=3 为例：

| 步骤    | 操作        | 结果                  |
| ----- | --------- | ------------------- |
| Step1 | 整体反转      | `[7,6,5,4,3,2,1]`   |
| Step2 | 反转前 k=3 段 | `[5,6,7,4,3,2,1]`   |
| Step3 | 反转剩余部分    | `[5,6,7,1,2,3,4]` |

## 实现

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;

        //整体
        reverse(nums, 0, n-1);

        // 前 k
        reverse(nums, 0, k-1);

        // 剩余部分
        reverse(nums, k, n-1);
    }

    
    private void reverse(int[] nums, int left, int right) {
        while(left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;

            left++;
            right--;
        }
    }

}
```

## 效果

0ms 击败 100.00%

## 复杂度

时间复杂度：O(n) （每个元素被交换常数次）

空间复杂度：O(1) （原地操作）

## 反思

其实这种技巧如何掌握了，反而是最好实现的。不容易出错。

关键在于理解为什么？

## 为什么正确？

```
A 部分 | B 部分   →   [A|B]
```

你想把 B 拿到前面变成 [B|A]。

方法不是“剪开再拼”，而是先把整条绳子翻个面（整个翻转），然后再把前后两段各自翻回来——这样两部分就自然互换了位置。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


