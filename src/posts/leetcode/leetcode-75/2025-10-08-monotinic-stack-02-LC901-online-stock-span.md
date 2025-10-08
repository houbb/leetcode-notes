---
title: LC901.  股票价格跨度 online-stock-span
date: 2025-10-07
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC901.  股票价格跨度 online-stock-span

设计一个算法收集某些股票的每日报价，并返回该股票当日价格的 跨度 。

当日股票价格的 跨度 被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。

例如，如果未来 7 天股票的价格是 [100,80,60,70,60,75,85]，那么股票跨度将是 [1,1,1,2,1,4,6] 。

实现 StockSpanner 类：

StockSpanner() 初始化类对象。
int next(int price) 给出今天的股价 price ，返回该股票当日价格的 跨度 。
 

示例：

输入：
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
输出：
[null, 1, 1, 1, 2, 1, 4, 6]

解释：
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // 返回 1
stockSpanner.next(80);  // 返回 1
stockSpanner.next(60);  // 返回 1
stockSpanner.next(70);  // 返回 2
stockSpanner.next(60);  // 返回 1
stockSpanner.next(75);  // 返回 4 ，因为截至今天的最后 4 个股价 (包括今天的股价 75) 都小于或等于今天的股价。
stockSpanner.next(85);  // 返回 6
 
提示：

1 <= price <= 10^5

最多调用 next 方法 10^4 次

# v1-暴力

## 思路

先不用思考任何技巧，直接用最暴力的方式来解决。

这里要求的是连续小于等于，不满足的话直接中断累加即可。

## 实现

```java
class StockSpanner {

    private List<Integer> list;

    public StockSpanner() {
        list = new ArrayList<>();    
    }
    
    public int next(int price) {
       list.add(price);

       // 从后往前计算 而且要求连续小于
       int res = 1;
       for(int i = list.size()-2; i >=0; i--) {
            if(list.get(i) <= price) {
                res++;
            } else {
                break;
            } 
       }
       return res;     
    }
}
```

## 效果

1228ms 击败 5.03%

## 复杂度

O(N^2)

## 反思

这一题相对 LC739 比较仁慈，竟然 AC 了。

# v2-排序+二分

## 思路

那么排序+二分可行吗？

不太可行，这里的结果不一定连续。

# v3-单调栈

## 思路

这个是这种类型题目，最推荐的解法。

### 单调栈

用单调栈维护 (price, span) 对。price：当天的价格；span：以这天为 末尾 的连续 ≤ price 的天数。

### 流程

每次 next(price)：

弹出栈顶所有 ≤ price 的元素

跨度 = 1 + 弹出的所有元素的 span 累加

## 实现

```java
class StockSpanner {
    private Stack<int[]> stack; // 每个元素 [price, span]

    public StockSpanner() {
        stack = new Stack<>();
    }

    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[]{price, span});
        return span;
    }
}
```

## 效果

32ms 击败 40.74%

## 复杂度

时间复杂度 O(n)，空间 O(n)

### 为什么要累加？

栈顶的 span 表示 栈顶价格对应的连续天数

如果新价格 ≥ 栈顶价格：

新价格可以把 栈顶那段连续天数 都包含进去，并且把历史的小于的都弹出栈。（如果都保留，那么就降级和以前一样了。）

# v4-数组模拟

## 思路

我们用 array 模拟实现 stack，实现性能的提升。

模拟创建一个数组，大小为 n。然后 top 指针模拟。

最多调用 next 方法 10^4 次，我们默认空间位 10^4 即可。


## 实现

```java
class StockSpanner {
    private int[][] stack = new int[10000][2]; // 每个元素 [price, span]
    private int top = 0;

    public StockSpanner() {
    }

    public int next(int price) {
        int span = 1;
        while ((top > 0) && stack[top-1][0] <= price) {
            span += stack[--top][1];
        }
        stack[top++] = new int[]{price, span};
        return span;
    }
    
}
```

## 效果

46ms 击败 31.99%

## 反思

为什么性能这么差。

其实每一次都创建一个 `int[]` 数组，我们可以拆分开。

### 实现

```java
class StockSpanner {
    
    private int[] prices = new int[10000]; 
    private int[] spans = new int[10000]; 

    private int top = 0;

    public StockSpanner() {
    }

    public int next(int price) {
        int span = 1;
        while ((top > 0) && prices[top-1] <= price) {
            span += spans[--top];
        }
        spans[top] = span;
        prices[top] = price;

        top++;

        return span;
    }
    
}
```

## 效果

24ms 72.84%

## 反思

还能更快吗？

有的，空间复用

# v5-空间复用

## 思路

其实可以进一步空间复用。

也就是数组只开辟一次空间。

## 实现

```java
class StockSpanner {
    
    private static final int[] prices = new int[10000]; 
    private static final int[] spans = new int[10000]; 

    private int top = 0;

    public StockSpanner() {
        top = 0;
    }

    public int next(int price) {
        int span = 1;
        while ((top > 0) && prices[top-1] <= price) {
            span += spans[--top];
        }
        spans[top] = span;
        prices[top] = price;

        top++;

        return span;
    }
    
}
```

## 效果

20ms 击败 99.30%

## 反思

数组模拟的空间复用这个思路不错，以前用的不多。

# 参考资料