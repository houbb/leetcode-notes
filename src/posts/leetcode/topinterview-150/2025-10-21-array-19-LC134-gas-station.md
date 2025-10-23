---
title: LC134. 加油站 gas-station
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC134. 加油站 gas-station

在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。

 

示例 1:

输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出: 3
解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
示例 2:

输入: gas = [2,3,4], cost = [3,4,3]
输出: -1
解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。
 

提示:

n == gas.length == cost.length
1 <= n <= 10^5
0 <= gas[i], cost[i] <= 10^4
输入保证答案唯一。


# v1-暴力

## 思路

简单粗暴的 2 层循环来实现。

## 实现

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int n = gas.length;

        for(int i = 0; i < n; i++) {
            // 结束
            if(canReach(i, gas, cost)) {
                return i;
            }    
        }

        return -1;    
    }

    private boolean canReach(int startI, int[] gas, int[] cost) {
        int remain = 0;
        int n = gas.length;
        
        // 当前位置到结尾
        for(int i = startI; i < n; i++) {
            remain += gas[i];
            remain -= cost[i];

             if(remain < 0) {
                return false;
            }
        }

        // 结尾位置到 start
        for(int i = 0; i < startI; i++) {
            remain += gas[i];
            remain -= cost[i];

             if(remain < 0) {
                return false;
            }
        }

        //all pass
        return true;
    }
}
```

## 效果

超出时间限制
35 / 40 个通过的测试用例

## 反思

这个复杂度为 O(n^2)，数量一多就不行了。

有没有更快的方法呢？


# v2-贪心

## 思路

这种时候一般就是可以尝试一下贪心

| 原理    | 解释                                          |
| ----- | ------------------------------------------- |
| 全局可行性 | 如果总油量 < 总花费 → 不可能绕一圈                        |
| 局部淘汰  | 若从 start 到 i 时油箱负了 → start 到 i 任意点都不可能是起点   |
| 唯一性   | 因为每次 tank<0 时我们都跳到下一个点，因此最后的 start 是唯一可行的起点 |

## 实现

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0;  // 总盈余：判断整体能不能跑完一圈
        int tank = 0;   // 当前油箱：从当前起点出发后还能剩多少油
        int start = 0;  // 当前假设的起点
        int n = gas.length;

        for (int i = 0; i < n; i++) {
            int diff = gas[i] - cost[i]; // 当前站净赚多少油
            total += diff;
            tank += diff;

            // 如果当前油箱没油了，说明从 start 到 i 都走不通
            // 那么下一个位置 i+1 才有可能是新的起点
            if (tank < 0) {
                start = i + 1; // 重置起点
                tank = 0;      // 清空油箱，从头再来
            }
        }

        // 如果总油量 < 总花费，说明不管从哪出发都不行
        // 否则，start 就是唯一可行的起点
        return total >= 0 ? start : -1;
    }
}
```

## 效果

2ms 击败 85.90%

## 反思

做到现在还是觉得贪心不太好思考。


# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
