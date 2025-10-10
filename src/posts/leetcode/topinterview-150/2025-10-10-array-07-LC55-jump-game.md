---
title: LC55. 跳跃游戏 jump game
date: 2025-10-10
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, dp, greedy]
published: true
---

# LC55. 跳跃游戏 jump game

给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

示例 1：

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 
提示：

1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5

# v1-暴力

## 思路

说是暴力，实际上就是用 dfs 尝试全部的可能性。

如果没接触过 dfs 可能不太简单。

## 实现

```java
class Solution {

        public boolean canJump(int[] nums) {
            return dfs(nums, 0);
        }

        private boolean dfs(int[] nums, int index){
            // 达到结尾
            if(index >= nums.length-1) {
                return true;
            }

            // 所有的可能性
            int max = nums[index];
            for(int step = 1; step <= max; step++){
                if(dfs(nums, index+step)) {
                    return true;
                }
            }

            return false;
        }

}
```

## 效果

超出时间限制
78 / 175 个通过的测试用例

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

首先我们要思考 dp 的含义，可以定义 dp[i] 为能否达到 i 的位置。

那么状态转移方程是什么？

我们可以尝试如下思考：任何一个位置，dp[j] 如果可以达到，且 `j + nums[j] >= i`(从 j 出发可以跳到 i 的位置)，那么 dp[i] = true;

初始化：dp[0] = true;

返回结果：dp[n-1]

## 实现

```java
public boolean canJump(int[] nums) {
    int n = nums.length;
    boolean[] dp = new boolean[n];
    dp[0] = true;

    for(int i = 1; i < n; i++) {
        for(int j = 0; j < n-1; j++) {
            // 提前终止
            if(dp[j] && (j + nums[j] >= i)) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n-1];
}
```

## 效果

724ms 击败 5.02%

## 复杂度

SC: O(n)

TC: O(n^2) 最差情况

## 反思

看起来大概率要用到贪心了。

# v3-贪心

## 思路

但是贪心需要我们能想到这个角度，也就是我们需要换一种思考的角度。

我们发现：其实不需要关心每个点能不能到，只需要知道：

**“我目前能到达的最远位置是哪里。”**

假设我们维护一个变量： maxReach = 目前能到达的最远下标

那我们只需要遍历数组：

如果当前下标 i 已经超出 maxReach，说明“走不到这里” → false

否则更新最远可达： `maxReach = max(maxReach, i + nums[i])`

最后看 maxReach 是否覆盖终点。

## 实现

```java
class Solution {

        public boolean canJump(int[] nums) {
            int n = nums.length;
            // 能达到最远的地方
            int maxReach = nums[0];

            for(int i = 1; i < n; i++) {
                if(maxReach < i) {
                    return false;
                }

                // 最远的地方
                maxReach = Math.max(maxReach, i + nums[i]);
                if(maxReach >= n-1) {
                    return true;
                }
            }

            return true;
        }

}
```

## 效果

2ms 85.48%

## 反思

测试了下，加一个提前返回性能会好一些。

# v4-贪心-逆序

## 逆序

### 思路

和 v3 类似，只不过是从后往前处理

### 实现

```java
class Solution {
    
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int g = n-1;

        for (int i = n-2; i >= 0; i--){
            // i 可以跳跃到 g
            if(i+nums[i] >= g){
                g=i;
            }
        }
        // 是否可达
        return g==0;
    }

}
```

### 效果

1ms 99%

### 反思

确实比较奇怪，这个什么都不用考虑的反而最快。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


