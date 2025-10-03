---
title: LC875. 爱吃香蕉的珂珂 koko-eating-bananas
date: 2025-10-03
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-search]
published: true
---

# LC875. 爱吃香蕉的珂珂 koko-eating-bananas

珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。

珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

示例 1：

输入：piles = [3,6,7,11], h = 8
输出：4
示例 2：

输入：piles = [30,11,23,4,20], h = 5
输出：30
示例 3：

输入：piles = [30,11,23,4,20], h = 6
输出：23
 

提示：

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109

# v1-暴力

## 思路

先用朴素的暴力尝试一下。

## 实现

```java

class Solution {
    
  public int minEatingSpeed(int[] piles, int h) {
        for(int k = 1; k <= Integer.MAX_VALUE; k++) {
            long costTime = costTime(piles, k);
            if(costTime <= (long)h) { 
                return k;
            }
        }

        return -1;
    }

    private long costTime(int[] piles, int k) {
        long t = 0;

        for(int pile : piles) {
            int pt = pile / k;
            // 吃完等待问题
            if(pile % k != 0) {
                pt++;
            }
            t += pt;
        }
        return t;
    }
    
}
```

## 效果

超出时间限制

109 / 127 个通过的测试用例

# v2-二分

## 思路

当然，聪明如你发现没必要从1开始累加。

left = 1
right = max(piles[i])

直接二分！

## 实现

```java
class Solution {
    
  public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for(int pile : piles) {
            right = Math.max(pile, right);
        }

        while(left < right) {
            int mid = left + (right-left) / 2;
            long costTime = costTime(piles, mid);
            if(costTime > (long)h) { 
                // 吃的太慢，在右边
                left = mid+1;
            } else {
                // 左边 或者 mid
                right = mid;
            }
        }    
        
        return left;
    }

    private long costTime(int[] piles, int k) {
        long t = 0;

        for(int pile : piles) {
            int pt = pile / k;
            // 吃完等待问题
            if(pile % k != 0) {
                pt++;
            }
            t += pt;
        }
        return t;
    }
    
}
```

## 效果

13ms 击败 29.01%

## 反思

为什么这么慢呢？如何加速

## 优化1-向上取整

### 思路

我们计算 t 累加，太慢了

因为涉及到两次运算。

直接优化一下

### 实现

```java
private long costTime(int[] piles, int k) {
    long t = 0;
    for(int pile : piles) {
        t += (pile + k - 1) / k; // 向上取整
    }
    return t;
}
```

### 效果

7ms 击败 66.84%

## 优化2-提前剪枝

### 思路

我们之所以计算会越界，是因为一直在累加，直接提前结束。

好处：避免无意义的计算+避免 long 转换

### 实现

```java

class Solution {
    
  public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for(int pile : piles) {
            right = Math.max(pile, right);
        }

        while(left < right) {
            int mid = left + (right-left) / 2;
            int costTime = costTime(piles, mid, h);
            if(costTime > h) { 
                // 吃的太慢，在右边
                left = mid+1;
            } else {
                // 左边 或者 mid
                right = mid;
            }
        }    
        
        return left;
    }

    private int costTime(int[] piles, int k, int h) {
        int t = 0;

        for(int pile : piles) {
            t += (pile + k - 1) / k; // 向上取整

            if(t > h) {
                return t;
            }
        }
        return t;
    }
    
}
```

### 效果

9ms 击败 53.01%

### 反思

竟然没有提升，反而下降了

猜测是每次计算 t > h 判断也比较耗时。

所以这个改进废弃

## 优化3-上下界优化

### 思考

left=1 也并不是必须的，不是吗？

会增加大量的无效计算。

left 应该从 upper(sum / k) 开始


`int right = (int) Math.min(max, (sum - n + 1) / (h - n + 1) + 1);`

max：数组中最大的 pile。理论上速度不会超过这个值，因为速度再大，吃一堆 pile 最多也只需一小时。

(sum - n + 1) / (h - n + 1) + 1：这是一个 更紧的上界，解释如下：

推导思路：

假设有 n 堆香蕉。

每堆至少吃 1 小时（整数小时）。

如果总时间是 h 小时，那么在剩下 h - n + 1 小时内吃完剩余 sum - n + 1 根香蕉。

所以最大吃速约为 (sum - n + 1) / (h - n + 1) + 1 向上取整。

简单理解：right 是 可能速度的合理上限，不需要超过最大堆 max，也不需要超过根据剩余时间计算出的理论上限。

### 实现

```java
class Solution {
    
  public int minEatingSpeed(int[] piles, int h) {
        int n = piles.length;
        int max = 0;
        long sum = 0;
        for(int pile : piles) {
            max = Math.max(pile, max);
            sum += pile;
        }

        int left = (int) (sum % h == 0 ? sum / h : sum / h + 1);  // 平均值向上取整
        int right = (int) Math.min(max, (sum - n + 1) / (h - n + 1) + 1);

        while(left < right) {
            int mid = left + (right-left) / 2;
            long costTime = costTime(piles, mid);
            if(costTime > (long)h) { 
                // 吃的太慢，在右边
                left = mid+1;
            } else {
                // 左边 或者 mid
                right = mid;
            }
        }    
        
        return left;
    }

    private long costTime(int[] piles, int k) {
        long t = 0;

        for(int pile : piles) {
            t += (pile + k - 1) / k; // 向上取整
        }
        return t;
    }
    
}
```

### 效果

2ms 击败 98.80%

### 反思

除了二分，上下界的不断优化也非常出彩。

实际解题，可以考虑做到优化1即可。

# 参考资料