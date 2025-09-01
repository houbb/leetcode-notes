---
title: LC605. 种花问题 can-place-flowers
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# LC605. 种花问题 can-place-flowers

假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。

可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。

另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。

示例 1：

输入：flowerbed = [1,0,0,0,1], n = 1
输出：true
示例 2：

输入：flowerbed = [1,0,0,0,1], n = 2
输出：false
 

提示：

1 <= flowerbed.length <= 2 * 10^4
flowerbed[i] 为 0 或 1
flowerbed 中不存在相邻的两朵花
0 <= n <= flowerbed.length
 
# v1-暴力

## 思路

我们直接从左往右遍历数组，一个位置的左右如果没有花，则可以种植。

需要可考虑边界：

1）0 左边没有

2）n-1 右边没有

如果满足条件，则当前位置设置为1，同时 count++。

当满足条件时，直接返回结果。

## 实现

```java
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        if(n <= 0) {
            return true;
        }

        int count = 0;
        int len = flowerbed.length;
        for(int i = 0; i < len; i++) {
            // 跳过已有的
            if(flowerbed[i] == 1) {
                continue;
            }

            int pre = i-1;
            boolean left = false;
            if(pre < 0 || flowerbed[pre] == 0) {
                left = true;
            }

            int next = i+1;
            boolean right = false;
            if(next >= len || flowerbed[next] == 0) {
                right = true;
            }

            if(left && right) {
                count++;
                flowerbed[i] = 1;
                if(count >= n) {
                    return true;
                }
            }
        }    

        return false;    
    }
```


## 效果

1ms 击败 95.98%

## 反思

这样做就是简单纯粹的逻辑。

可以进一步优化吗？

# 优化1-跳过 next

## 思路

我们在当前位置设置为1之后，下一个位置可以直接跳过。


## 实现

```java
public boolean canPlaceFlowers(int[] flowerbed, int n) {
        if(n <= 0) {
            return true;
        }

        int count = 0;
        int len = flowerbed.length;
        for(int i = 0; i < len; i++) {
            // 跳过已有的
            if(flowerbed[i] == 1) {
                continue;
            }

            int pre = i-1;
            boolean left = false;
            if(pre < 0 || flowerbed[pre] == 0) {
                left = true;
            }

            int next = i+1;
            boolean right = false;
            if(next >= len || flowerbed[next] == 0) {
                right = true;
            }

            if(left && right) {
                count++;
                flowerbed[i] = 1;
                i++;
                if(count >= n) {
                    return true;
                }
            }
        }    

        return false;    
    }
```

## 复杂度

最坏情况：遍历整个数组 → O(len)，其中 len = flowerbed.length。

空间复杂度：只使用了几个整型变量 → O(1)，没有额外数组。


# 参考资料

