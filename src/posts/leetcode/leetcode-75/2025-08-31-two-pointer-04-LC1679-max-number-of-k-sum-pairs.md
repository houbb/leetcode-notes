---
title: LC1679. K 和数对的最大数目 max-number-of-k-sum-pairs
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, two-pointer]
published: true
---

# LC1679. K 和数对的最大数目 max-number-of-k-sum-pairs

给你一个整数数组 nums 和一个整数 k 。

每一步操作中，你需要从数组中选出和为 k 的两个整数，并将它们移出数组。

返回你可以对数组执行的最大操作数。

示例 1：

输入：nums = [1,2,3,4], k = 5
输出：2
解释：开始时 nums = [1,2,3,4]：
- 移出 1 和 4 ，之后 nums = [2,3]
- 移出 2 和 3 ，之后 nums = []
不再有和为 5 的数对，因此最多执行 2 次操作。
示例 2：

输入：nums = [3,1,3,4,3], k = 6
输出：1
解释：开始时 nums = [3,1,3,4,3]：
- 移出前两个 3 ，之后nums = [1,4,3]
不再有和为 6 的数对，因此最多执行 1 次操作。
 

提示：

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= 10^9

# v1-Map

## 思路

这一题应该是两数之和的加强版本。

我们先用Map的方式来处理下每个数字出现的次数。然后通过 k 找到另一半就行。

需要区分一下场景：

1）num1==num2

count 一半

2) num1 != num2

二者中较小的出现次数。

为了避免计算重复，我们用 visited 记录一下。

## 实现

```java
    public int maxOperations(int[] nums, int k) {
        if(k <= 1) {
            return 0;
        }

        Map<Integer, Integer> countMap = new HashMap<>();
        for(int num : nums) {
            //num 最小为1，这个数字没有希望
            if(num >= k) {
                continue;
            }
            Integer count = countMap.get(num);
            if(count == null) {
                count = 0;
            } 
            count++;
            countMap.put(num, count);
        }

        // 循环计算
        Set<Integer> visited = new HashSet<>();
        int half = k / 2;
        int res = 0;
        for(Map.Entry<Integer,Integer> entry : countMap.entrySet()) {
            Integer num = entry.getKey();
            Integer count = entry.getValue();
            // 成对的数量 考虑相等的场景

            if(visited.contains(num)) {
                continue;
            }

            int num2 = k - num;
            if(num.equals(num2)) {
               res += count / 2;  
               //visited.add(num);   
            } else {
                Integer count2 = countMap.get(num2);
                if(count2 == null) {
                    continue;
                }
                res += Math.min(count, count2);

                //visited.add(num);
                visited.add(num2);   
            }
        }

        return res;
    }
```

## 效果

23ms 击败 61.73%

## 反思

如何进一步优化呢？

countMap 因为数字的范围很大，不适合用子哈希的数组优化。

visited 这个如何优化去掉呢？


# v2-二次合一

## 思路

这个又回到了思路问题。

我们 v1 的解法是，O(n) 的初始化，然后是 O(n) 的遍历。

当然，其实二者是可以合在一起的，虽然说整体复杂度都是 O(n)，但是 2*O(n) 和 O(n) 还是不同的。

## 实现

下面的写法确实简化了很多，有算法的感觉了。

```java
public int maxOperations(int[] nums, int k) {
        int res = 0;

        Map<Integer, Integer> countMap = new HashMap<>();
        for(int num : nums) {
            int target = k - num;
            Integer count = countMap.get(target);
            if(count != null && count > 0) {
                res++;
                countMap.put(target, count-1);
            } else {
                // 记录更新自己
                countMap.put(num, countMap.getOrDefault(num, 0) + 1);
            }
        }

        return res;
    }
```

## 效果

35ms 击败 41.27%

## 反思

这个就是传说中的一顿操作猛如虎，一看战绩 0-5。

说明基本的剪枝还是有需要的。

但是依然不是最佳，可以更进一步吗？

# v3-排序+双指针

## 思路

我们可以通过排序+双指针的方式进一步优化解法。

好处是可以避免 Map 这种创建的开销。

1) 初始化

l = 0, r = n-1;

2) 满足条件

nums[l] + nums[r] == k

3) 移动方式

sum < k，则 l++;

sum > k，则 r--;


## 实现

```java
public int maxOperations(int[] nums, int k) {
        int res = 0;

        Arrays.sort(nums);    
        int l = 0;
        int r = nums.length-1;

        while(l < r) {
            int sum = nums[l] + nums[r];
            if(sum == k) {
                res++;
                l++;
                r--;
            } else if(sum < k) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
```

## 效果

18ms 击败 99.45%

## 反思

这个确实有些违反直觉，因为排序是 O(n*lgn) 复杂度，但是却优于我们的 HashMap O(n)。


# 补充

## 为什么排序会被 Hash 更快？

「排序 `O(n log n)` 怎么可能比 HashMap `O(n)` 更快？」

但在 Java 实际运行里确实常常出现这种情况，原因主要有以下几点：

## 1. 常数因子的差异

* HashMap

  * 每次操作都要做哈希计算 (`hashCode`)、数组寻址、冲突处理（链表/红黑树），并且涉及到装箱/拆箱（`Integer`）。
  * 即使是 `O(1)`，常数开销也不小。
* 排序

  * `DualPivotQuickSort` 是手写的原生数组操作，内存连续、分支预测好、常数开销极低。
  * CPU 在这种连续访问模式下 cache 命中率极高。

虽然 `n log n` 看似慢，但常数因子可能比 HashMap 小 10 倍以上。

当 `n` 不是特别大（例如几万），`n log n` 的额外开销还不够抵消 HashMap 的高常数开销。

## 2. CPU 缓存友好性

* HashMap 存储是离散的，元素分布在不同的内存地址，CPU 访问时容易 cache miss。
* 排序 对数组做原地操作，访问连续，cache 命中率接近 100%，流水线和 SIMD 指令优化非常好。

现代 CPU 对顺序内存扫描的优化程度极高，所以 数组排序可能比散列访问还要快。

## 3. JVM 内联 & 向量化

* Java 的 `Arrays.sort(int[])` 在 HotSpot JVM 里有高度优化：

  * 内联 DualPivotQuickSort
  * 小数组用 插入排序（更快）
  * 有的 JVM 还能利用 向量化指令
* HashMap 的 `get/put` 是一堆方法调用（`hash()`, `table[index]`, 链表/红黑树遍历），不容易被 JIT 完全内联。

所以即便时间复杂度上不如排序，实际执行时排序的代码路径更短。

## 4. 数据规模的平衡点

* 当 `n` 很小（几百几千），`n log n` 和 `n` 几乎没区别，排序的低常数更占优势。
* 当 `n` 特别大（上千万），`n log n` 的劣势才逐渐显现，HashMap 才可能反超。

这就是为什么 LeetCode 上，`Arrays.sort + 双指针` 往往能打败绝大部分 `HashMap` 解法。

PS: 从平衡点可以看出，还是测试用例的问题，如果用例的数据足够多，那么 HashMap 的优势应该就会体现出来。


# 参考资料