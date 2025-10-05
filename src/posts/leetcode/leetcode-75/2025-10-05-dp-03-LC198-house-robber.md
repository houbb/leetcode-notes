---
title: LC198. 打家劫舍 house-robber
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC198. 打家劫舍 house-robber

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1：

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2：

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 

提示：

1 <= nums.length <= 100
0 <= nums[i] <= 400


# v1-dp

## 思路

这一题和 LCR 088. 使用最小花费爬楼梯 完全一样。

需要注意的点是，我们在一层支付金额后，即可选择向上爬一个或者两个台阶。

也就是达到这一层不要钱。

我们按照定义

1）dp 数组

dp[i] 代表打劫完第 i 家的最大金额

2）初始化

1家，唯一选择

2家，选择钱多的

```java
dp[0] = nums[0];
dp[1] = Math.max(nums[0], nums[1]);
```

3）递归公式

当前节点两种选择：

偷，则为 `dp[i-2] + nums[i-1]`

不偷，则为 `dp[i-1]`

取最大值

4）结果

返回 `dp[n-1]`

## 实现

```java
class Solution {
    
    public int rob(int[] nums) {
        int n = nums.length;
        if(n < 2) {
            return nums[0];
        }

        int[] dp = new int[n+1];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for(int i = 2; i < n; i++) {
            //rob or not
            int rob = dp[i-2] + nums[i];
            int notRob = dp[i-1];
            dp[i] = Math.max(rob, notRob);
        }    

        return dp[n-1];
    }

}
```

## 效果

0ms 100%

## 反思

这一题用例不太有区分度。

感觉不算太难，甚至和 LC746 差不多，二者题目难度却不同。

# v2-数组压缩

## 思路

此时的数组压缩，可以同时优化空间+时间。

其实我们只会用到 dp[i-1], dp[i-2]

完全可以用两个变量替代

## 实现

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        
        int res = 0;
        int pre1 = 0;
        int pre2 = 0;

        for(int i = 2; i <= n; i++) {
            int c1 = pre1 + cost[i-1];
            int c2 = pre2 + cost[i-2];

            res = Math.min(c1, c2);

            // 当前，就是下一次的 pre1
            pre2 = pre1;
            pre1 = res;
        }


        return res;
    }

}
```

## 效果

0ms 100%

## 反思

多学习一下压缩的写法。

# 参考资料