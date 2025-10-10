---

title:  力扣 买卖股票的最佳时机系列汇总 best-time-to-buy-and-sell-stock 
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, backtrack, leetcode]
published: true
---

# 买卖股票系列

[40-best-time-to-buy-and-sell-stock 力扣 121. 买卖股票的最佳时机](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-40-leetcode-121-best-time-to-buy-and-sell-stock)

[41-best-time-to-buy-and-sell-stock-ii 力扣 122. 买卖股票的最佳时机 II](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-41-leetcode-122-best-time-to-buy-and-sell-stock-ii)

[42-best-time-to-buy-and-sell-stock-iii 力扣 123. 买卖股票的最佳时机 III](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-42-leetcode-123-best-time-to-buy-and-sell-stock-iii)

[43-best-time-to-buy-and-sell-stock-iv 力扣 188. 买卖股票的最佳时机 IV](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-43-leetcode-188-best-time-to-buy-and-sell-stock-iv)

[44-best-time-to-buy-and-sell-stock-with-cooldown 力扣 309. 买卖股票的最佳时机包含冷冻期](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-44-leetcode-309-best-time-to-buy-and-sell-stock-with-cooldown)

[45-best-time-to-buy-and-sell-stock-with-cooldown 力扣 714. 买卖股票的最佳时机包含手续费](https://houbb.github.io/2020/06/08/algorithm-020-leetcode-45-leetcode-714-best-time-to-buy-and-sell-stock-with-transaction-fee)

# 前言

在经历了前面一系列的股市算法洗礼之后，老马作为一名股市韭菜，发现投资技术没有长进。

于是决定本篇作为股市系列的汇总篇算法题。

那么，有没有一个模板可以通吃下力扣的上面 6 个题目？

有的，兄弟。

# 题目

| 序号 | 题号  | 题名            | 特点         |
| -- | --- | ------------- | ---------- |
| ①  | 121 | 买卖股票的最佳时机     | 只能交易一次     |
| ②  | 122 | 买卖股票的最佳时机 II  | 无限次交易      |
| ③  | 123 | 买卖股票的最佳时机 III | 最多两次交易     |
| ④  | 188 | 买卖股票的最佳时机 IV  | 最多 `k` 次交易 |
| ⑤  | 309 | 含冷冻期          | 卖出后冷冻一天    |
| ⑥  | 714 | 含手续费          | 卖出需扣手续费    |

# 模板

## 思路

这也是为什么个人不那么个人不那么推荐贪心的原因，除非 dp 性能不满足。

当然，这个模板其实还是贪心+dp的组合。

## 模板

“买卖股票”系列其实都是**同一个 DP 模板的不同特例**。

我们可以把这些题都统一到一个“通用状态机”模板中理解。

## 核心思想：状态机模型

我们用 `dp[i][k][0/1]` 表示：

* 第 `i` 天（从 0 开始计）
* 最多允许交易 `k` 次
* 第三维是是否持有股票：

  * `0` 表示当天**不持股**
  * `1` 表示当天**持股**

转移方程如下：

```java
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + price[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - price[i])
```

含义解释：

* 不持股状态：

  * 前一天就不持股（啥也不干）
  * 或今天卖出（昨天持股 + 今天卖）
* 持股状态：

  * 前一天就持股（啥也不干）
  * 或今天买入（昨天没股 + 今天买入，消耗一次交易机会）

---

## 模板代码（通用版本）

```java
class Solution {
    public int maxProfit(int K, int[] prices) {
        if (prices == null || prices.length == 0) return 0;
        int n = prices.length;
        
        // 当 k >= n/2 时，相当于不限交易次数
        if (K > n / 2) {
            return maxProfitUnlimited(prices);
        }
        
        int[][][] dp = new int[n][K + 1][2];
        
        // 初始化
        for (int k = 0; k <= K; k++) {
            dp[0][k][0] = 0;
            dp[0][k][1] = -prices[0];
        }
        
        // 状态转移
        for (int i = 1; i < n; i++) {
            for (int k = 1; k <= K; k++) {
                dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
                dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
            }
        }
        
        return dp[n-1][K][0];
    }

    private int maxProfitUnlimited(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i-1]) {
                profit += prices[i] - prices[i-1];
            }
        }
        return profit;
    }
}
```

## 贪心部分

可以发现，这里不限制次数的时候，直接可以用贪心来解决。

贪心的关键：任意相邻两天的价格差大于 0，都可以赚钱。

贪心算法复杂度 O(n)，比 DP O(n × k) 更快。


# LeetCode 121 — 买卖股票的最佳时机（只能交易一次）

## 题意

只能交易一次（买 + 卖一次）

即 k = 1

## dp 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;
        
        int[][] dp = new int[n][2]; // k=1 不需要单独维度
        
        // 初始化
        dp[0][0] = 0;          // 第一天不持股
        dp[0][1] = -prices[0]; // 第一天持股（买了）
        
        for (int i = 1; i < n; i++) {
            dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]); // 卖
            dp[i][1] = Math.max(dp[i-1][1], -prices[i]);             // 买
        }
        
        return dp[n-1][0];
    }
}
```

### 效果

27ms 击败 5.80%

## 贪心

### 思路

遍历数组，记录到目前为止的 最小价格 minPrice

每天尝试卖出：`profit = prices[i] - minPrice`

更新最大利润 maxProfit

关键点：只需要记录到今天为止的最低价，因为只能买一次。

### 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int minPrice = prices[0];    
        int maxProfit = 0;
        for (int i = 1; i < n; i++) {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            minPrice = Math.min(minPrice, prices[i]);
        }
        
        return maxProfit;
    }
}
```

### 效果

2ms 击败 44.39%

# LeetCode 122 — 买卖股票的最佳时机 II（无限次交易）

## 题意：

可以买卖多次（不限制交易次数）

相当于 k → ∞

## dp

```java
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;
        
        int[][] dp = new int[n][2];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        
        for (int i = 1; i < n; i++) {
            dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
        }
        
        return dp[n-1][0];
    }
}
```

### 效果

2ms 击败 10.27%

## 贪心

### 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i-1]) {
                profit += prices[i] - prices[i-1];
            }
        }
        return profit;
    }
}
```

### 效果 

0ms 100%

# LeetCode 123 — 买卖股票的最佳时机 III（最多两次交易）

## 题意：

最多只能交易两次 → k = 2

## dp

### 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;
        int K = 2;
        
        int[][][] dp = new int[n][K+1][2];
        
        // 初始化
        for (int k = 0; k <= K; k++) {
            dp[0][k][0] = 0;
            dp[0][k][1] = -prices[0];
        }
        
        // 状态转移
        for (int i = 1; i < n; i++) {
            for (int k = 1; k <= K; k++) {
                dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
                dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
            }
        }
        
        return dp[n-1][K][0];
    }
}
```


### 效果

76ms 击败 7.61%

## 贪心

### 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = -prices[0];
        int sell1 = 0;
        int buy2 = -prices[0];
        int sell2 = 0;

        for (int price : prices) {
            // 第一次买入：越便宜越好
            buy1 = Math.max(buy1, -price);

            // 第一次卖出：尽可能高价卖
            sell1 = Math.max(sell1, buy1 + price);

            // 第二次买入：用第一次卖的钱再买
            buy2 = Math.max(buy2, sell1 - price);

            // 第二次卖出：尽可能高价卖
            sell2 = Math.max(sell2, buy2 + price);
        }

        return sell2;
    }
}
```

### 效果

2ms 击败 87.85%


# LeetCode 188《买卖股票的最佳时机 IV》

## 题意

它的核心是 最多进行 k 次交易。

## dp

### 实现

```java
class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;

        // 特殊情况：k 足够大，相当于不限次数交易
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        int[][][] dp = new int[n][k + 1][2];

        // 初始化
        for (int j = 0; j <= k; j++) {
            dp[0][j][0] = 0;
            dp[0][j][1] = -prices[0];
        }

        // 状态转移
        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k; j++) {
                dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
                dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
            }
        }

        return dp[n - 1][k][0];
    }
}
```

### 效果

8ms 击败 21.90%

## 贪心

### 实现

```java
class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;

        // 当交易次数足够多时，等价于无限次交易
        if (k >= n / 2) {
            return maxProfitUnlimited(prices);
        }

        // ---------------------------
        // 否则走 DP（通用状态机模板）
        // ---------------------------
        int[][] dp = new int[k + 1][2];
        for (int j = 0; j <= k; j++) {
            dp[j][0] = 0;
            dp[j][1] = -prices[0];
        }

        for (int i = 1; i < n; i++) {
            for (int j = k; j >= 1; j--) {
                dp[j][0] = Math.max(dp[j][0], dp[j][1] + prices[i]);
                dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - prices[i]);
            }
        }

        return dp[k][0];
    }

    // 当 k >= n/2 时，使用贪心
    private int maxProfitUnlimited(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}
```

### 效果

1ms 击败 99.76%



# LeetCode 309 —— 买卖股票的最佳时机含冷冻期（Best Time to Buy and Sell Stock with Cooldown）

## 题意

可以看作是 DP 模型的一个“有状态约束”的变体。

给定一组股价 prices，你可以多次交易，但：

卖出股票后，必须“冷冻”一天，第二天不能买入。

求最大利润。

## dp

### 实现

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) return 0;

        int hold = -prices[0]; // 当前持股
        int sold = 0;          // 今天刚卖
        int rest = 0;          // 冷冻/休息

        for (int i = 1; i < prices.length; i++) {
            int prevSold = sold;
            sold = hold + prices[i];         // 今天卖
            hold = Math.max(hold, rest - prices[i]); // 今天买 or 持续持股
            rest = Math.max(rest, prevSold); // 冷冻或休息
        }

        return Math.max(sold, rest);
    }
}
```

### 效果

0ms 击败 100.00%

# LeetCode 714 —— 买卖股票的最佳时机含手续费（Best Time to Buy and Sell Stock with Transaction Fee）

## 题意

你可以无限次交易（买卖股票），但每次卖出股票都要支付手续费 fee。

求最大利润。

## dp

### 实现

```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        if (prices.length == 0) return 0;

        int hold = -prices[0]; // 持股状态
        int cash = 0;          // 空仓状态

        for (int i = 1; i < prices.length; i++) {
            int prevCash = cash;
            cash = Math.max(cash, hold + prices[i] - fee); // 卖出或休息
            hold = Math.max(hold, prevCash - prices[i]);   // 买入或继续持股
        }

        return cash;
    }
}
```

### 效果

4ms 97.96%

# 小结

这样，我们就完成了买卖股票比较完整的整个系列。

最核心的还是 DP，基本可以从头到尾。

## 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

