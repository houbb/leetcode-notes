---
title: LC714. 买卖股票的最佳时机含手续费 best-time-to-buy-and-sell-stock-with-transaction-fee
date: 2025-10-05
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, dp]
published: true
---

# LC714. 买卖股票的最佳时机含手续费 best-time-to-buy-and-sell-stock-with-transaction-fee

给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

示例 1：

输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
输出：8
解释：能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8


示例 2：

输入：prices = [1,3,7,5,10,3], fee = 3
输出：6
 

提示：

1 <= prices.length <= 5 * 10^4
1 <= prices[i] < 5 * 10^4
0 <= fee < 5 * 10^4

# v1-dp

## 思路

所有的交易实际上都是两个部分组成：

```
一笔交易=买入+卖出
```

1) dp 数组含义

buy[i] 表示第 i 次买入操作的最大利润

sell[i] 表示第 i 次卖出操作的最大利润

2) 初始化

```java
buy[0] = -prices[0]; // 第一天买入需要支付费用
sell[0] = 0;    // 第一天无法卖出，没有股票
```

3）转移方程

A-买入操作，是否买入的 i 最大值

不买入：`buy[i-1]` 和上次一样

买入：`sell[i-1] - prices[i]`  上次卖出的最大利润 - 当前价格

B-卖出操作，是否卖出的 i 最大值

不卖出：`sell[i-1]` 和上次一样

卖出：`buy[i-1] - FEE + prices[i]`  上次卖出的最大利润 - FEE + 股票价格

PS: 我们约定股票卖出的时候才扣除手续费。

4）结果

一定是在卖出的时候，最大利润

返回 `sell[n-1]`

## 实现

```java
class Solution {
    
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        int[] buy = new int[n];
        int[] sell = new int[n];

        buy[0] = -prices[0];
        sell[0] = 0;

        for(int i = 1; i < n; i++) {
            //不买入：`buy[i-1]` 和上次一样
            //买入：`sell[i-1] - prices[i]`  上次卖出的最大利润 - 当前价格
            buy[i] = Math.max(buy[i-1], sell[i-1] - prices[i]); 

            //不卖出：`sell[i-1]` 和上次一样
            //卖出：`buy[i-1] - FEE`  上次卖出的最大利润 - FEE
            sell[i] = Math.max(sell[i-1], buy[i-1] - fee + prices[i]); 
        }

        return sell[n-1];
    }
    
}
```

## 效果

7ms 击败 70.43%

54.10MB 击败 35.83%

# v2-滚动数组压缩

## 思路

买卖其实都只依赖上一次。

所以用变量替代。

## 实现

```java
class Solution {
    
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;

        int buyPre = -prices[0];
        int sellPre = 0;
        int sellCur = 0;

        for(int i = 1; i < n; i++) {
            //不买入：`buy[i-1]` 和上次一样
            //买入：`sell[i-1] - prices[i]`  上次卖出的最大利润 - 当前价格
            int buyCur = Math.max(buyPre, sellPre - prices[i]); 

            //不卖出：`sell[i-1]` 和上次一样
            //卖出：`buy[i-1] - FEE`  上次卖出的最大利润 - FEE
            sellCur = Math.max(sellPre, buyPre - fee + prices[i]); 

            // 滚动更新
            buyPre = buyCur;
            sellPre = sellCur;
        }

        return sellCur;
    }
    
}
```

## 效果

5ms 击败 83.09%

53.95MB 击败 65.65%

# v3-贪心

## 思路

贪心永远最简洁，但是其实最难想。

最核心的就一句话：尽可能低的价格买入，有利润就立刻卖出盈利。

遇低则更新成本，遇高超出手续费则卖出并假装继续持有。

## 贪心策略

设：

`buy`：当前持仓的买入成本（不含手续费）

`profit`：累计利润

我们从左到右遍历价格

### 情况 1：出现更低的买入价

```java
if (prices[i] < buy)
    buy = prices[i];
```

——更便宜的机会出现了，更新买入价。

### 情况 2：出现可以获利的卖出价

```java
else if (prices[i] > buy + fee)
```

这说明当前价能覆盖买入价和手续费，还有利润空间。

于是我们：

1. 卖出：`profit += prices[i] - buy - fee`
2. 为了不漏掉后续可能的上涨行情，**立刻重设买入价**：

   ```java
   buy = prices[i] - fee;
   ```

   这样相当于“卖出后又立即买入”，让后续涨价继续累积利润。


## 实现

```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        int buy = prices[0]; // 当前持仓的买入价（不含手续费）
        int profit = 0;      // 当前累计利润

        for (int i = 1; i < n; i++) {
            // 出现更低买入价时，更新成本
            if (prices[i] < buy) {
                buy = prices[i];
            }
            // 如果可以盈利（扣除手续费后仍赚），就卖出
            else if (prices[i] > buy + fee) {
                profit += prices[i] - buy - fee; // 卖出时再扣手续费
                buy = prices[i] - fee; // 相当于“卖出后立刻买入”，保持连续性
            }
        }

        return profit;
    }
}
```

## 效果

4ms 击败 97.98%

## 反思

贪心其实很容易出错，除非题目 dp 超时才考虑贪心。

这个炒股策略实际生活中不可用，因为我们无法预知未来的股价变化。

# 参考资料