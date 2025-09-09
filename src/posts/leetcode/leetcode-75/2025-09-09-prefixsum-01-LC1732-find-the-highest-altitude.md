---
title: LC1732. 找到最高海拔 find-the-highest-altitude
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC1732. 找到最高海拔 find-the-highest-altitude

有一个自行车手打算进行一场公路骑行，这条路线总共由 n + 1 个不同海拔的点组成。自行车手从海拔为 0 的点 0 开始骑行。

给你一个长度为 n 的整数数组 gain ，其中 gain[i] 是点 i 和点 i + 1 的 净海拔高度差（0 <= i < n）。请你返回 最高点的海拔 。

 

示例 1：

输入：gain = [-5,1,5,0,-7]
输出：1
解释：海拔高度依次为 [0,-5,-4,1,1,-6] 。最高海拔为 1 。
示例 2：

输入：gain = [-4,-3,-2,-1,4,3,2]
输出：0
解释：海拔高度依次为 [0,-4,-7,-9,-10,-6,-3,-1] 。最高海拔为 0 。
 

提示：

n == gain.length
1 <= n <= 100
-100 <= gain[i] <= 100

# v1-普通

## 思路

说是前缀和，但是实际上贪心就行。

一次普通的遍历即可。

## 实现

```java
    public int largestAltitude(int[] gain) {
        int res = 0;
        int h = 0;
        int n = gain.length;

        for(int i = 0; i < n; i++) {
            h += gain[i];
            res = Math.max(res, h);
        }
        return res;
    }
```

## 效果

0ms 100%

## 复杂度

TC：O(n)

SC：O(1)

## 反思

整体还是非常简单的，一次遍历即可。

# 参考资料