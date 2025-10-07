---
title: LC452. 用最少数量的箭引爆气球 minimum-number-of-arrows-to-burst-balloons
date: 2025-10-07
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, intervals]
published: true
---

#  LC452. 用最少数量的箭引爆气球 minimum-number-of-arrows-to-burst-balloons

有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，其中 points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。

你不知道气球的确切 y 坐标。

一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。

在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被 引爆。

可以射出的弓箭的数量 没有限制 。 弓箭一旦被射出之后，可以无限地前进。

给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数 。
 
示例 1：

输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：气球可以用2支箭来爆破:
-在x = 6处射出箭，击破气球[2,8]和[1,6]。
-在x = 11处发射箭，击破气球[10,16]和[7,12]。
示例 2：

输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
解释：每个气球需要射出一支箭，总共需要4支箭。
示例 3：

输入：points = [[1,2],[2,3],[3,4],[4,5]]
输出：2
解释：气球可以用2支箭来爆破:
- 在x = 2处发射箭，击破气球[1,2]和[2,3]。
- 在x = 4处射出箭，击破气球[3,4]和[4,5]。
 

提示:

1 <= points.length <= 10^5

points[i].length == 2

-2^31 <= xstart < xend <= 2^31 - 1

# v1-贪心

## 思路

这一题和 LC435. 无重叠区间 非常类似。

## 流程

我们想射的箭 尽可能地让更多气球被射中。

那就意味着**我们希望一支箭能覆盖尽可能多的重叠区间**。

因此，我们要：

先排序：按每个气球的“结束位置（end）”升序排列。

因为“最早结束”的气球会限制我们能放箭的位置。

从左到右遍历：

用一支箭射穿第一个气球（箭射在它的 end 上）。

只要后面的气球的 start ≤ 当前箭的位置（说明有重叠），这支箭还能射到它。（因为 end 升序，如果满足 start，说明肯定重叠。）

一旦遇到气球的 start > 当前箭的位置，就说明新的气球不被当前箭覆盖 → 需要再射一支箭。

## 实现

```java
public int findMinArrowShots(int[][] points) {
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
    int end = points[0][1]; // 当前箭射在第一个气球的末尾
    int res = 1;

    for(int i = 1; i < points.length; i++) {
        if(points[i][0] > end) { // 判断气球起点是否在箭的右侧
            res++; 
            end = points[i][1];  // 新箭射在该气球末尾
        }
    }

    return res;
}
```

## 效果

55ms 击败 88.89%

## 反思

效果一般

这里有一个 case 比较坑，`points = [[-2147483646,-2147483645],[2147483646,2147483647]]`

简单的比较会越界。

贪心本身并没有优化空间，针对排序优化即可。

## 优化1-radixSort 排序

### 思路

用 O(n) 的排序优化系统内置的稳定排序。

桶排序会有内存限制，不适合。

### 实现

```java
import java.util.Arrays;

class Solution {

    public int findMinArrowShots(int[][] points) {
        radixSort(points); // 对 end 升序排序

        int end = points[0][1]; // 当前箭射在第一个气球的末尾
        int res = 1;

        for(int i = 1; i < points.length; i++) {
            if(points[i][0] > end) { // 不重叠
                res++;
                end = points[i][1];
            }
        }

        return res;
    }

    // LSD 基数排序，对 points 按 points[i][1] 排序
    private void radixSort(int[][] points) {
        int n = points.length;
        int[][] aux = new int[n][2];
        int radix = 256; // 每次处理 8 位
        int mask = radix - 1;

        for(int shift = 0; shift < 32; shift += 8) {
            int[] count = new int[radix + 1];

            // 计数
            for(int i = 0; i < n; i++) {
                int c = ((points[i][1] >> shift) & mask) + 1;
                count[c]++;
            }

            // 前缀和
            for(int r = 0; r < radix; r++) count[r+1] += count[r];

            // 分配
            for(int i = 0; i < n; i++) {
                int c = (points[i][1] >> shift) & mask;
                aux[count[c]++] = points[i];
            }

            // 拷贝回原数组
            for(int i = 0; i < n; i++) points[i] = aux[i];
        }

        // 处理负数（因为基数排序按无符号处理，需要把负数移到前面）
        int negCount = 0;
        for(int[] p : points) if(p[1] < 0) negCount++;

        if(negCount > 0) {
            int[][] temp = new int[n][2];
            int idx = 0;
            // 先放负数
            for(int[] p : points) if(p[1] < 0) temp[idx++] = p;
            // 再放非负数
            for(int[] p : points) if(p[1] >= 0) temp[idx++] = p;
            for(int i = 0; i < n; i++) points[i] = temp[i];
        }
    }
}
```

### 效果

29ms 击败 100.00%

超越目前的 top1 快排 30ms

## 优化2-双缓冲区间

### 思路

针对 radix 排序本身的进一步优化

双缓冲数组优化

### 实现

```java
    // LSD 基数排序，对 points 按 points[i][1] 排序
    private void radixSort(int[][] points) {
        int n = points.length;
        int[][] aux = new int[n][2];

        int[][] from = points; // 本轮源数组
        int[][] to = aux;      // 本轮目标数组

        int radix = 256; // 每次处理 8 位
        int mask = radix - 1;

        for(int shift = 0; shift < 32; shift += 8) {
            int[] count = new int[radix + 1];

            // 计数
            for(int i = 0; i < n; i++) {
                int c = ((from[i][1] >> shift) & mask) + 1;
                count[c]++;
            }

            // 前缀和
            for(int r = 0; r < radix; r++) count[r+1] += count[r];

            // 分配
            for(int i = 0; i < n; i++) {
                int c = (from[i][1] >> shift) & mask;
                to[count[c]++] = from[i];
            }

            // 双缓冲切换，不再每轮都拷贝
            int[][] tmp = from;
            from = to;
            to = tmp;
        }

        // 处理负数（因为基数排序按无符号处理，需要把负数移到前面）
        int negCount = 0;
        for(int[] p : from) if(p[1] < 0) negCount++;

        if(negCount > 0) {
            int[][] temp = new int[n][2];
            int idx = 0;
            // 先放负数
            for(int[] p : from) if(p[1] < 0) temp[idx++] = p;
            // 再放非负数
            for(int[] p : from) if(p[1] >= 0) temp[idx++] = p;
            from = temp;
        }

        // 最终结果放回 points
        if(from != points) {
            for(int i = 0; i < n; i++) points[i] = from[i];
        }
    }
```

### 效果

25ms 击败 100.00%

## 优化3-细节

### 思路

双缓冲，避免每轮都拷贝

8 位 LSD，每轮 256 桶

负数自动处理，在最高字节轮 `XOR 0x80`

去掉 count +1

### 实现

```java
// LSD 基数排序，对 points 按 points[i][1] 升序
    private void radixSort(int[][] points) {
        int n = points.length;
        int[][] aux = new int[n][2];

        int[][] from = points; // 本轮源数组
        int[][] to = aux;      // 本轮目标数组

        int radix = 256;

        for (int shift = 0; shift < 32; shift += 8) {
            int[] count = new int[radix + 1];

            // 计数
            for (int i = 0; i < n; i++) {
                int key = (from[i][1] >>> shift) & 0xFF;
                // 最高字节轮处理符号位
                if (shift == 24) key ^= 0x80;
                count[key + 1]++;
            }

            // 前缀和
            for (int r = 0; r < radix; r++) count[r + 1] += count[r];

            // 分配
            for (int i = 0; i < n; i++) {
                int key = (from[i][1] >>> shift) & 0xFF;
                if (shift == 24) key ^= 0x80;
                to[count[key]++] = from[i];
            }

            // 双缓冲切换
            int[][] tmp = from;
            from = to;
            to = tmp;
        }

        // 最终结果放回 points
        if (from != points) {
            for (int i = 0; i < n; i++) points[i] = from[i];
        }
    }
```

### 效果

20ms 击败 100.00%

## 反思

针对某一个算法的优化，应该交给专门研究这个算法的人。

后续也许更多的是，我们选择合适的方法，来尽可能的快的解决这个问题。

# 参考资料