---
title: LC2297. 跳跃游戏 VIII jump-game-viii
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC2297. 跳跃游戏 VIII jump-game-viii

给定一个长度为 n 的下标从 0 开始的整数数组 nums。

初始位置为下标 0。当 i < j 时，你可以从下标 i 跳转到下标 j:

对于在 i < k < j 范围内的所有下标 k 有 nums[i] <= nums[j] 和 nums[k] < nums[i] , 或者
对于在 i < k < j 范围内的所有下标 k 有 nums[i] > nums[j] 和 nums[k] >= nums[i] 。

你还得到了一个长度为 n 的整数数组 costs，其中 costs[i] 表示跳转到下标 i 的代价。

返回跳转到下标 n - 1 的最小代价。

示例 1:

输入: nums = [3,2,4,4,1], costs = [3,7,6,4,2]
输出: 8
解释: 从下标 0 开始。
- 以 costs[2]= 6 的代价跳转到下标 2。
- 以 costs[4]= 2 的代价跳转到下标 4。
总代价是 8。可以证明，8 是所需的最小代价。
另外两个可能的路径是:下标 0 -> 1 -> 4 和下标 0 -> 2 -> 3 -> 4。
它们的总代价分别为9和12。

示例 2:

输入: nums = [0,1,2], costs = [1,1,1]
输出: 2
解释: 从下标 0 开始。
- 以 costs[1] = 1 的代价跳转到下标 1。
- 以 costs[2] = 1 的代价跳转到下标 2。
总代价是 2。注意您不能直接从下标 0 跳转到下标 2，因为 nums[0] <= nums[1]。
 

解释:

n == nums.length == costs.length
1 <= n <= 10^5
0 <= nums[i], costs[i] <= 10^5



# 解法

## 解法

```java
class Solution {
    public long minCost(int[] nums, int[] costs) {
        int n = nums.length;
        List<Integer>[] g = new List[n];
        Arrays.setAll(g, k -> new ArrayList<>());
        Deque<Integer> stk = new ArrayDeque<>();
        for (int i = n - 1; i >= 0; --i) {
            while (!stk.isEmpty() && nums[stk.peek()] < nums[i]) {
                stk.pop();
            }
            if (!stk.isEmpty()) {
                g[i].add(stk.peek());
            }
            stk.push(i);
        }
        stk.clear();
        for (int i = n - 1; i >= 0; --i) {
            while (!stk.isEmpty() && nums[stk.peek()] >= nums[i]) {
                stk.pop();
            }
            if (!stk.isEmpty()) {
                g[i].add(stk.peek());
            }
            stk.push(i);
        }
        long[] f = new long[n];
        Arrays.fill(f, 1L << 60);
        f[0] = 0;
        for (int i = 0; i < n; ++i) {
            for (int j : g[i]) {
                f[j] = Math.min(f[j], f[i] + costs[j]);
            }
        }
        return f[n - 1];
    }
}
```


# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


