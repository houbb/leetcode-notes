---
title: LC643. 子数组最大平均数 I maximum-average-subarray-i
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC643. 子数组最大平均数 I maximum-average-subarray-i

给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。

请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。

任何误差小于 10-5 的答案都将被视为正确答案。

示例 1：

输入：nums = [1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
示例 2：

输入：nums = [5], k = 1
输出：5.00000
 

提示：

n == nums.length
1 <= k <= n <= 105
-104 <= nums[i] <= 104

# v1-暴力

## 思路

无任何技巧，就是直接 k 个数，然后取平均值。

最后返回平均数即可。

## 实现

```java
public double findMaxAverage(int[] nums, int k) {
        int n = nums.length;
        double res = -k*(10^4);
        for(int i = 0; i < n+1-k; i++) {
            // 累加
            double sum = 0;
            for(int j = 0; j < k; j++) {
                sum += nums[i+j];
            }
            sum /= k;    
            res = Math.max(res, sum);
        }   
        return res;
    }
```

## 效果

123/127 超时

## 反思

虽然知道会超时，但是这样的话，这一题还是简单就不太合理了。


# v2-滑动窗口

## 思路

我们之所以很慢，是因为每次计算耗时特别多。

我们可以在每次滑动时，移除第一个元素，累加上当前的元素。

## 实现

```java
    public double findMaxAverage(int[] nums, int k) {
        int n = nums.length;
        double res = -k*(10^4);
        //0..k
        double sum = 0;
        for(int i = 0; i < k; i++) {
            sum += nums[i];
        }
        res = sum / k;

        for(int i = k; i < n; i++) {
            sum -= nums[i-k];
            sum += nums[i];
            res = Math.max(res, sum / k);
        }   

        return res;
    }
```

## 效果

7ms 击败 9.73%

## 反思

这个我们多次计算 res，可以存放一个全局的 maxSum，减少计算次数。

### 优化

```java
    public double findMaxAverage(int[] nums, int k) {
        int n = nums.length;
        double sum = 0;
        for(int i = 0; i < k; i++) {
            sum += nums[i];
        }
        double maxSum = sum;

        for(int i = k; i < n; i++) {
            sum -= nums[i-k];
            sum += nums[i];
            
            maxSum = Math.max(maxSum, sum);
        }   

        return maxSum / k;
    }
```

### 效果

5ms 击败 36.85%

### 反思

如何更快呢？

# v3-最优写法

## 思路

算法本身其实已经没有问题了。

但是还是有一些优化空间的。

比如：

**避免使用 double 进行 sum 计算**

你完全可以用 long 来保存 sum 和 maxSum（因为 nums[i] 在 [-10^4, 10^4]，长度 ≤ 10^5，最大和大约 10^9，能放进 int/long）。

这样可以避免在循环中频繁做浮点数加法，性能略好。

只在最后返回时再转成 double。

## 实现

```java
public double findMaxAverage(int[] nums, int k) {
    int n = nums.length;
    long sum = 0;
    for (int i = 0; i < k; i++) {
        sum += nums[i];
    }
    long maxSum = sum;

    for (int i = k; i < n; i++) {
        sum += nums[i] - nums[i - k];
        if (sum > maxSum) {
            maxSum = sum;
        }
    }

    return (double) maxSum / k;
}
```

## 效果

2ms 100%

# 参考资料