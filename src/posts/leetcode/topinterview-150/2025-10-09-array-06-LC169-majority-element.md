---
title: LC169. 多数元素 majority-element + Boyer–Moore 投票算法（Boyer–Moore Majority Vote Algorithm）
date: 2025-10-09 
categories: [TopInterview150]
tags: [leetcode, topInterview150, array]
published: true
---

# LC169. 多数元素 majority-element

给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1：

输入：nums = [3,2,3]
输出：3
示例 2：

输入：nums = [2,2,1,1,1,2,2]
输出：2
 

提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109
 

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。



# v1-HashMap

## 思路

先不考虑进阶。

大家最自然的想法自然是计数+判断。

通过 HashMap 累计每一个数出现的次数，超过一半的自然就是结果。

## 实现

```java
class Solution {
    public int majorityElement(int[] nums) {
        int n = nums.length;
        int half = n / 2;
        Map<Integer, Integer> countMap = new HashMap<>();
        for(int num : nums) {
           Integer count = countMap.getOrDefault(num, 0);
           count++;
           if(count > half) {
                return num; 
           }     
           countMap.put(num, count);
        }

        // not found
        return -1;
    }
}
```

## 效果

14ms 击败 17.24%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

还有其他解法吗？


# v2-排序+取中间值

## 思路

因为个数超过 1/2，那么排序取中间值，自然就是结果。

## 实现

```java
class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }
}
```

## 效果

3ms 击败 30.91%

## 复杂度

TC: O(nlogn)

SC: O(1)

## 反思

排序自然也可以满足 O(n)，比如特殊的三种：技术+桶+基数

但是空间和稳定性之类的要有取舍。

比如基础排序，时间 O(n)，但是空间 O(n)。

| 优化                        | 原理                | 空间变化                    | 备注              |
| ------------------------- | ----------------- | ----------------------- | --------------- |
| 原地计数（in-place counting） | 不开 buffer，直接原数组覆盖 | 降低到常数倍                  | 但会破坏稳定性         |
| 两数组交替复用                 | 一轮在 A→B，下一轮 B→A   | 降低一半内存                  | 仍是 O(n)         |
| 原地基数排序（in-place radix） | 直接交换元素到目标位置       | 理论上 O(1)，但实现复杂且性能极差     | 仅适合学术研究，不适合实际工程 |
| 不稳定排序（如原地 quicksort）    | 直接比较 + 交换         | O(1) 空间，但 O(n log n) 时间 | 改变算法类别          |

## 算法改-三路快排

### 思路

实际上理论的复杂度，和实际的复杂度存在一定的区别。

比如这一题实际最快的解法可能是理论上 O(nlogn) 的三路快排序+取中间值。

### 实现

```java
    class Solution {
        public int majorityElement(int[] nums) {
            new Solution().ThreeWaySort(nums, 0, nums.length - 1);
            return nums[nums.length / 2];
        }

        private void ThreeWaySort(int[] arr, int left, int right) {
            if (left >= right) return;
            int pivot = arr[left];
            int leftArea = left;
            int rightArea = right + 1;
            for (int j = left + 1; j < rightArea; j++) {
                if(arr[j] < pivot){
                    swap(arr,j,++leftArea);
                }else if(arr[j] > pivot){
                    swap(arr,j--,--rightArea);
                }
            }
            swap(arr, left, leftArea);
            ThreeWaySort(arr, left, leftArea);
            ThreeWaySort(arr, rightArea, right);
        }

        private void swap(int[] arr, int j, int leftPos) {
            int temp = arr[j];
            arr[j] = arr[leftPos];
            arr[leftPos] = temp;
        }
    }
```

### 效果 

0ms 100%

### 为什么比 v3 还快？

三路快排在数组重复元素非常多时，实际运行速度可能比普通 O(n) 算法还快。

原因是 CPU 的缓存和指令流水线优化：

三路快排一次就把大量重复元素归到中间，递归次数少

Boyer-Moore 虽然 O(n)，但每次都要检查条件、更新计数 → 每个元素都有几次条件跳转

CPU cache 对连续数组的处理效率高，循环体短 → 实际 wall-clock 时间更短

# v3-投票算法

## 思路

其实这个的话，还是简单题就会有些不合适了。

前提是，我们要如何才能想到 Boyer–Moore 投票算法呢？

## 算法核心-抵消（cancel out）

想象数组中的元素是「投票人」：

每个数字代表一个候选人。他们互相投票。

如果遇到相同候选人 → 票数 +1；

如果遇到不同候选人 → 票数 -1。

当票数为 0 时，说明目前候选人被“抵消”了，我们就换一个新的候选人。

最后，剩下的候选人，就是那个出现次数超过一半的人。

## 实现

```java
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;  // 选出新候选人
            }

            if (num == candidate) {
                count++;          // 支持票
            } else {
                count--;          // 反对票
            }
        }

        return candidate;
    }
}
```

## 效果

1ms 击败 99.80%

执行不是特别稳定

## 复杂度

TC: O(n)

SC: O(1)

## 为什么是对的？

看起来感觉有道理，如何证明是对的呢？

假设数组长度为 n，多数元素为 x，出现次数 > n/2。

那意味着：

其他所有元素的总数 < n/2。

不管怎么配对，x 总会多出来至少一个。

换句话说：

如果我们不断地“用一个不同的数去抵消一个相同的数”，最后幸存的，一定是多数元素。


# 参考资料

https://leetcode.cn/problems/merge-sorted-array/submissions/668896756/?envType=study-plan-v2&envId=top-interview-150

