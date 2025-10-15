---
title: LC3360. 跳跃游戏 IX jump-game-ix
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC3360. 跳跃游戏 IX jump-game-ix

给你一个整数数组 nums。

从任意下标 i 出发，你可以根据以下规则跳跃到另一个下标 j：

仅当 nums[j] < nums[i] 时，才允许跳跃到下标 j，其中 j > i。
仅当 nums[j] > nums[i] 时，才允许跳跃到下标 j，其中 j < i。
对于每个下标 i，找出从 i 出发且可以跳跃 任意 次，能够到达 nums 中的 最大值 是多少。

返回一个数组 ans，其中 ans[i] 是从下标 i 出发可以到达的最大值。

 
示例 1:

输入: nums = [2,1,3]

输出: [2,2,3]

解释:

对于 i = 0：没有跳跃方案可以获得更大的值。
对于 i = 1：跳到 j = 0，因为 nums[j] = 2 大于 nums[i]。
对于 i = 2：由于 nums[2] = 3 是 nums 中的最大值，没有跳跃方案可以获得更大的值。
因此，ans = [2, 2, 3]。

示例 2:

输入: nums = [2,3,1]

输出: [3,3,3]

解释:

对于 i = 0：向后跳到 j = 2，因为 nums[j] = 1 小于 nums[i] = 2，然后从 i = 2 跳到 j = 1，因为 nums[j] = 3 大于 nums[2]。
对于 i = 1：由于 nums[1] = 3 是 nums 中的最大值，没有跳跃方案可以获得更大的值。
对于 i = 2：跳到 j = 1，因为 nums[j] = 3 大于 nums[2] = 1。
因此，ans = [3, 3, 3]。


提示:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
 
# v1-DFS

## 思路

全局最大值，可以用 DFS 来试一下

## 实现

```java
class Solution {

    private int max = 0;

    public int[] maxValue(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        boolean[] visited = new boolean[n];
        for(int i = 0; i < n; i++) {
            // 重置
            max = nums[i];
            Arrays.fill(visited, false);

            dfs(nums, visited, i);
            res[i] = max;
        }
        return res;    
    }

    private void dfs(int[] nums, boolean[] visited, int i) {
        // 越界
        int n = nums.length;
        if(i < 0 || i > n-1) {
            return;
        }        
        if(visited[i]) {
            return;
        }

        visited[i] = true;
        max = Math.max(max, nums[i]);

        // 处理
        for(int j = 0; j < n; j++) {
            if(visited[j]) {
                continue;
            }
            if((nums[j] < nums[i] && j > i)
                || (nums[j] > nums[i] && j < i)) {
                dfs(nums, visited, j);
            }
        }
    }

}
```

## 效果

超出时间限制
893 / 1002 个通过的测试用例

## 复杂度

| 项目    | 复杂度                        |
| ----- | -------------------------- |
| 时间复杂度 | **O(n²)**                  |
| 空间复杂度 | **O(n)**                   |

## 反思

主要瓶颈在每个节点都要重新 DFS，且 DFS 内部全数组扫描

尝试引入 mem 记忆化

# v2-DP

## 思路

可以参考 https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/

## 实现

```java
class Solution {
    public int[] maxValue(int[] nums) {
        int n = nums.length;
        int[] preMax = new int[n];
        preMax[0] = nums[0];
        for (int i = 1; i < n; i++) {
            preMax[i] = Math.max(preMax[i - 1], nums[i]);
        }

        int[] ans = new int[n];
        int sufMin = Integer.MAX_VALUE;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] = preMax[i] <= sufMin ? preMax[i] : ans[i + 1];
            sufMin = Math.min(sufMin, nums[i]);
        }
        return ans;
    }
}
```






# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
