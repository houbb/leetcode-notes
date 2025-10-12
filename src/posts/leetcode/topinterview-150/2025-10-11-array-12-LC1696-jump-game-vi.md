---
title: LC1696. 跳跃游戏 VI jump-game-vi
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1696. 跳跃游戏 VI jump-game-vi

给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。

一开始你在下标 0 处。每一步，你最多可以往前跳 k 步，但你不能跳出数组的边界。

也就是说，你可以从下标 i 跳到 `[i + 1， min(n - 1, i + k)]` 包含 两个端点的任意位置。

你的目标是到达数组最后一个位置（下标为 n - 1 ），你的 得分 为经过的所有数字之和。

请你返回你能得到的 最大得分 。

示例 1：

输入：nums = [1,-1,-2,4,-7,3], k = 2
输出：7
解释：你可以选择子序列 [1,-1,4,3] （上面加粗的数字），和为 7 。
示例 2：

输入：nums = [10,-5,-2,4,0,3], k = 3
输出：17
解释：你可以选择子序列 [10,4,3] （上面加粗数字），和为 17 。
示例 3：

输入：nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
输出：0
 

提示：

 1 <= nums.length, k <= 10^5
-10^4 <= nums[i] <= 10^4

# v1-DFS

## 思路

最长的路径，属于全局性质。

我们用 DFS 来解决试一下。

## 实现

```java
class Solution {
    // 最大值
    int max = -10001;

    public int maxResult(int[] nums, int k) {
        dfs(nums, k, 0, 0);
        return max;
    }
    
    private void dfs(int[] nums, int k, int i, int count) {
        // 边界
        int n = nums.length;
        if(i < 0 || i > n-1) {
            return;
        }

        count += nums[i];
        // 满足
        if(i == n-1) {
            max = Math.max(max, count);
            return;
        }

        // 遍历
        for(int j = i+1; j <= Math.min(n-1, i+k); j++) {
            dfs(nums, k, j, count);
        }

    }

}
```

## 效果

超出时间限制
5 / 73 个通过的测试用例

## 复杂度

DFS 在最坏情况下是指数级的（O(k^n)），会直接超时。

## 反思

我们可以通过引入 mem 记忆化来优化吗？


# v2-DFS + 记忆化思路（Top-down DP）

## 思路

避免重复计算，我们引入 dfs 的记忆化。

当你想引入「记忆化」优化时，某个位置 i 的“最佳得分”计算完一次后，下次直接用，不再重新递归。

这个时候我们的 dfs 就需要返回每一步的最大值了。

mem 数组初始化为 Integer.MIN_VALUE（一个特别的值，区分是否有值就行）


## 流程

定义一个函数：`f(i) = 从下标 i 出发到达末尾的最大得分`

递推公式：

`f(i) = nums[i] + max(f(j))，其中 j ∈ [i+1, i+k]`

边界条件：

`f(n-1) = nums[n-1]`

## 实现

```java
class Solution {
    int[] memo;
    int n, k;
    int[] nums;

    public int maxResult(int[] nums, int k) {
        this.nums = nums;
        this.k = k;
        this.n = nums.length;
        memo = new int[n];
        Arrays.fill(memo, Integer.MIN_VALUE);

        return dfs(0);
    }

    private int dfs(int i) {
        // 到达终点
        if (i == n - 1) return nums[i];

        // 已记忆
        if (memo[i] != Integer.MIN_VALUE) return memo[i];

        int best = Integer.MIN_VALUE;

        // 向前跳 k 步以内
        for (int j = i + 1; j <= Math.min(n - 1, i + k); j++) {
            best = Math.max(best, dfs(j));
        }

        // 记忆结果
        memo[i] = nums[i] + best;
        return memo[i];
    }
}
```

## 效果

超出时间限制
58 / 73 个通过的测试用例

## 反思

只能说略好一点，但是还是超时了。

# v3-dp

## 思路

dp 性能上其实和 dfs+mem 差不多，好处在于可以进行更多的工程化上的优化。

我们首先来实现 dp

## dp 流程

### 1. dp 方程定义

`dp[i]` = 到达位置 i 时的最大得分

### 2. 转移方程

`f(i) = nums[i] + max(f(j))，其中 j ∈ [i+1, i+k]`

### 3. 初始化

`dp[0] = nums[0]`

从 0 位置直接达到得分为 nums[0]

## 实现

```java
class Solution {
    public int maxResult(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n];
        dp[0] = nums[0];

        for(int i = 1; i < n; i++) {
            int max = Integer.MIN_VALUE;

            // 找到前面的最大值
            int start = Math.max(0, i-k);
            for(int j =start; j < i; j++) {
                max = Math.max(max, dp[j]);
            }

            dp[i] = nums[i] + max;
        }

        // 结果
        return dp[n-1];
    }

}
```

## 效果

超出时间限制
61 / 73 个通过的测试用例

## 反思

可以发现，我们在寻找 max 前面的最大值时耗费非常大。

有没有更快的方式呢？

有的，单调队列。

# v4-dp+单调队列

## 思路

我们用单调单调队列维护一下最大值，可以把找到 `max(dp[j])` 复杂度降低到 O(1)。

用一个 单调递减队列 保存最近 k 个候选下标，保证队首永远是「最大 dp」。

## 实现

```java
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {
    public int maxResult(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n];
        dp[0] = nums[0];

        Deque<Integer> deque = new ArrayDeque<>();
        deque.offer(0);

        for (int i = 1; i < n; i++) {
            // 移除不在窗口内的下标
            while (!deque.isEmpty() && deque.peekFirst() < i - k) {
                deque.pollFirst();
            }

            // 计算当前 dp[i]
            dp[i] = dp[deque.peekFirst()] + nums[i];

            // 维持单调性：新的 dp[i] 更大，就弹出队尾
            while (!deque.isEmpty() && dp[i] >= dp[deque.peekLast()]) {
                deque.pollLast();
            }

            deque.offerLast(i);
        }

        return dp[n - 1];
    }
}
```

## 效果

25ms 击败 67.43%

## 复杂度

| 操作          | 时间复杂度    |
| ----------- | -------- |
| 每个元素最多进出队一次 | O(n)     |
| 取最大值、更新 dp  | O(1)     |
| **总复杂度**    | **O(n)** |
| **空间复杂度**   | **O(n)** |

# v5-dp+单调队列数组模拟

## 思路

用数组模拟实现单调队列。

## 实现

```java
class Solution {
    public int maxResult(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n];
        dp[0] = nums[0];

        // 模拟单调队列：用数组存下标
        int[] queue = new int[n]; // 最多 n 个元素
        int head = 0, tail = 0;   // 队首、队尾指针
        queue[tail++] = 0;

        for (int i = 1; i < n; i++) {
            // 移除不在窗口内的下标
            while (head < tail && queue[head] < i - k) {
                head++;
            }

            // 计算 dp[i]
            dp[i] = dp[queue[head]] + nums[i];

            // 维持单调性：弹出队尾小于当前值的
            while (head < tail && dp[i] >= dp[queue[tail - 1]]) {
                tail--;
            }

            queue[tail++] = i; // 入队
        }

        return dp[n - 1];
    }
}
```

## 效果

9ms 击败 93.58%

## 反思

到这里，基本上算是比较完整的掌握这个解题的技巧了。

可惜第一遍做感觉还是很吃力的。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


