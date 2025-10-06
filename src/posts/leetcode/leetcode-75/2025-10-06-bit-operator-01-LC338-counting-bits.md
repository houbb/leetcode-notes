---
title: LC338. 比特位计数 counting-bits
date: 2025-10-06
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, bit-operator]
published: true
---

# LC338. 比特位计数

给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。

 

示例 1：

输入：n = 2
输出：[0,1,1]
解释：
0 --> 0
1 --> 1
2 --> 10
示例 2：

输入：n = 5
输出：[0,1,1,2,1,2]
解释：
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 

提示：

0 <= n <= 10^5
 
进阶：

很容易就能实现时间复杂度为 O(n log n) 的解决方案，你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？

你能不使用任何内置函数解决此问题吗？（如，C++ 中的 __builtin_popcount ）

# v1-内置函数

## 思路

直接最简单的内置函数实现。

## 实现

```java
class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n+1];

        for(int i = 0; i <= n; i++) {
            res[i] = Integer.bitCount(i);
        }
        return res;
    }
}
```

## 效果

2ms 49.03%

# v2-自己实现

## 思路

直接把数字转为二进制，然后累加。

用 `i&1` 也可以判断最低位是否为1。

## 实现

```java
class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n+1];

        for(int i = 0; i <= n; i++) {
            res[i] = bitCount(i);
        }
        return res;
    }

    private int bitCount(int i) {
        int count = 0;
        while(i > 0) {
            // 最低位是否为1？
            count += i&1;
            i = i >> 1;
        }
        return count;
    }

}
```

## 效果

3ms 击败 19.60%


## 复杂度

和 v1 一样，依然是 n(logn)。但是性能没有 jdk 的好

只能说 jdk 还是太权威了

```java
public static int bitCount(int i) {
    // 第一步：每两位分组，统计 1 的个数
    i = i - ((i >>> 1) & 0x55555555);
    // 第二步：每四位分组，加总每组的 1 数
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    // 第三步：每八位分组，再次合并
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    // 第四步：累加每个字节的结果
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    // 取最低 6 位结果（因为不会超过 32）
    return i & 0x3f;
}
```

## 反思

那么问题来了，如何达到 O(n) 呢？

# v3-dp

## 思路

到这一步，这一题其实不能算是简单题。

能想到 dp 不容易。

其实从我们自己写的方法中可以看到一点思路。 

```java
private int bitCount(int i) {
    int count = 0;
    while(i > 0) {
        // 最低位是否为1？
        count += i&1;
        i = i >> 1;
    }
    return count;
}
```

核心的一句话：

```
每个数的 1 的个数 = 它除以 2 后的结果的 1 个数 + 最低位是否为 1。
```

这个也就是递归公式：

```
dp[i] = dp[i >> 1] + i&1;
```

## 实现

```java
class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i&1); 
        }
        return ans;
    }
}
```

## 效果

2ms 击败 49.03%

## 复杂度

| 项目    | 复杂度  | 说明      |
| ----- | ---- | ------- |
| 时间复杂度 | O(n) | 每个数只算一次 |
| 空间复杂度 | O(n) | 存储结果数组  |

## 反思

有点离谱的耗时，和 top2 一样的解法，但是耗时不同。

估计改过测试用例。


# 参考资料