---
title: LC45. 跳跃游戏 II jump game ii
date: 2025-10-10
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, dp, greedy]
published: true
---

# LC45. 跳跃游戏 II jump game ii

给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。

每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。

换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：

`0 <= j <= nums[i] 且 i + j < n`

返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。

示例 1:

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
示例 2:

输入: nums = [2,3,0,1,4]
输出: 2
 

提示:

1 <= nums.length <= 10^4
0 <= nums[i] <= 1000
题目保证可以到达 n - 1

# v1-暴力

## 思路

说是暴力，实际上就是用 dfs 尝试全部的可能性。

LC55 在前，我们在其基础上添加一个全局的最小变量。

## 实现

```java
class Solution {
    int min = Integer.MAX_VALUE;

    public int jump(int[] nums) {
        dfs(nums, 0, 0);
        return min;
    }

    private void dfs(int[] nums, int index, int count) {
        // 剪枝：如果已经不可能更优
        if (count >= min) return;

        // 达到结尾
        if (index >= nums.length - 1) {
            min = Math.min(min, count);
            return;
        }

        // 所有跳法
        int max = nums[index];
        for (int step = 1; step <= max; step++) {
            dfs(nums, index + step, count + 1);
        }
    }
}

```

## 效果

超出时间限制
83 / 110 个通过的测试用例

## 复杂度

假设数组长度为 n, 每个位置平均能跳 k 步。

那么大概会生成：

```
1 + k + k² + k³ + ... + kⁿ ≈ O(kⁿ)
```

的递归调用。

如果 k = 1，复杂度退化为 O(n)

如果 k = 2，就是 O(2ⁿ)

如果 k = n，就是 O(nⁿ)

所以最坏情况下，复杂度为：O(2ⁿ)（指数级）

递归深度最多为 n，所以空间复杂度（递归栈）为：O(n)

## 反思

暴力明显过于慢了。

# v2-dp

## 思路

首先我们要思考 dp 的含义，可以定义 dp[i] 达到 i 的最小次数。

那么状态转移方程是什么？

我们可以尝试如下思考：

任何一个位置，dp[j] 如果可以达到，且 `j + nums[j] >= i`(从 j 出发可以跳到 i 的位置)，那么 `dp[i] = Math.min(dp[i], dp[j] + 1)`;

初始化：dp[0] = 0; 其他都是最大值，标识不可达。

返回结果：dp[n-1]

## 实现

```java
class Solution {
    int min = Integer.MAX_VALUE;

    public int jump(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        dp[0] = 0;
        for (int i = 1; i < n; i++) {
            dp[i] = Integer.MAX_VALUE;
        }

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n - 1; j++) {
                // 一定可以抵达
                if (dp[j] < Integer.MAX_VALUE && (j + nums[j] >= i)) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }

        return dp[n - 1];
    }

}
```

## 效果

822ms 击败 5.05%

## 复杂度

SC: O(n)

TC: O(n^2) 最差情况

## 反思

完全是在 LC55 的基础上改动了一点。虽然很慢，好歹 AC 了。

看起来大概率要用到贪心了。

# v3-贪心

## 思路

但是贪心需要我们能想到这个角度，也就是我们需要换一种思考的角度。

我们发现：其实不需要关心每个点能不能到，只需要知道：

**“我目前能到达的最远位置是哪里。”**

假设我们维护一个变量： farthest = 目前能到达的最远下标

那我们只需要遍历数组：

否则更新最远可达： `farthest = max(farthest, i + nums[i])`

我们更新一下 end 位置，每一次 i 越过 end 时，jumps++；

最后返回 jumps 就是需要跳跃的最少次数。

## 实现

```java
class Solution {

    public int jump(int[] nums) {
        int n = nums.length;
        int jumps = 0; // 跳跃次数
        int end = 0; // 当前跳跃的边界
        int farthest = 0; // 下一跳能到的最远距离

        for (int i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == end) { // 到达当前跳跃边界
                jumps++;
                end = farthest; // 更新下一次跳跃边界
            }
        }

        return jumps;
    }

}
```

## 效果

2ms 85.48%

## 反思

虽然解决了 LC55，但是要解决这个还是需要一定的技巧的。

需要融汇贯通。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


