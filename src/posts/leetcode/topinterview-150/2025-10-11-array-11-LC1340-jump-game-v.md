---
title: LC1340. 跳跃游戏 V jump game v
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1340. 跳跃游戏 V jump game v

给你一个整数数组 arr 和一个整数 d 。每一步你可以从下标 i 跳到：

i + x ，其中 i + x < arr.length 且 0 < x <= d 。
i - x ，其中 i - x >= 0 且 0 < x <= d 。
除此以外，你从下标 i 跳到下标 j 需要满足：arr[i] > arr[j] 且 arr[i] > arr[k] ，其中下标 k 是所有 i 到 j 之间的数字（更正式的，min(i, j) < k < max(i, j)）。

你可以选择数组的任意下标开始跳跃。请你返回你 最多 可以访问多少个下标。

请注意，任何时刻你都不能跳到数组的外面。

 

示例 1：

输入：arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
输出：4
解释：你可以从下标 10 出发，然后如上图依次经过 10 --> 8 --> 6 --> 7 。
注意，如果你从下标 6 开始，你只能跳到下标 7 处。你不能跳到下标 5 处因为 13 > 9 。你也不能跳到下标 4 处，因为下标 5 在下标 4 和 6 之间且 13 > 9 。
类似的，你不能从下标 3 处跳到下标 2 或者下标 1 处。

示例 2：

输入：arr = [3,3,3,3,3], d = 3
输出：1
解释：你可以从任意下标处开始且你永远无法跳到任何其他坐标。

示例 3：

输入：arr = [7,6,5,4,3,2,1], d = 1
输出：7
解释：从下标 0 处开始，你可以按照数值从大到小，访问所有的下标。

示例 4：

输入：arr = [7,1,7,1,7,1], d = 2
输出：2
示例 5：

输入：arr = [66], d = 1
输出：1
 

提示：

1 <= arr.length <= 1000

1 <= arr[i] <= 10^5

1 <= d <= arr.length

# 题意

这一题题目实际上非常绕，到底在说什么？

## 限定条件

### 规则 1：跳的距离不能太远

`|i - j| <= d` 意思是你最多能跳 `d` 格。

### 🧩 规则 2：只能往“更低”的平台跳

`arr[i] > arr[j]` 不能往高的地方跳，只能往低的地方跳。

也就是说，每次你都在“往下跳”。

### 规则 3：中间不能有比起点更高的平台挡路

对所有在 `i` 和 `j` 之间的 `k`，必须满足：`arr[k] < arr[i]`

换句话说：

你不能“跨过”一个比你还高的平台。

路径中间必须都是比你低的。

## 问题本质

其实你是在一张**有向图**上移动：

- 每个索引是一个节点；

- 从高平台到低平台有一条有向边；

- 不能越过比自己高的平台；

- 每个节点都向比它低的节点连边；

- 图中不可能有环（因为高度严格递减）。

# v1-DFS

## 思路

最长的路径，属于全局性质。

我们用 DFS 来解决试一下。

## 实现

```java
class Solution {

    public int maxJumps(int[] arr, int d) {
        // 尝试所有的    
        int max = 1;
        for(int i = 0; i < arr.length; i++) {
            max = Math.max(max, dfs(i, arr, d));
        } 
        return max;
    }

    private int dfs(int i, int[] arr, int d) {
        int res = 1;
        int n = arr.length;

        // 可以往左
        for(int x = 1; x <= d; x++) {
            int j = i - x;
            // 边界
            if(j < 0) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d));
        }

        // 可以往右
        for(int x = 1; x <= d; x++) {
            int j = i + x;
            // 边界
            if(j > n-1) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d));
        }

        return res;
    }


}
```

## 效果

超出时间限制
113 / 127 个通过的测试用例

## 复杂度



## 反思

竟然超时了。

可见这种题目就要往 dp->贪心的方向努力了。



# todo...

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


