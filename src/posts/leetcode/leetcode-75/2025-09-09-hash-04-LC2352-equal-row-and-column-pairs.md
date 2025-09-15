---
title: LC2352. 相等行列对 equal-row-and-column-pairs
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC2352. 相等行列对

给你一个下标从 0 开始、大小为 n x n 的整数矩阵 grid ，返回满足 Ri 行和 Cj 列相等的行列对 (Ri, Cj) 的数目。

如果行和列以相同的顺序包含相同的元素（即相等的数组），则认为二者是相等的。

示例 1：

输入：grid = [[3,2,1],[1,7,6],[2,7,7]]
输出：1
解释：存在一对相等行列对：
- (第 2 行，第 1 列)：[2,7,7]

![1](https://assets.leetcode.com/uploads/2022/06/01/ex1.jpg)

示例 2：

输入：grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
输出：3
解释：存在三对相等行列对：
- (第 0 行，第 0 列)：[3,1,2,2]
- (第 2 行, 第 2 列)：[2,4,2,2]
- (第 3 行, 第 2 列)：[2,4,2,2]

![2](https://assets.leetcode.com/uploads/2022/06/01/ex2.jpg) 

提示：

n == grid.length == grid[i].length
1 <= n <= 200
1 <= grid[i][j] <= 10^5


# v1-HashMap

## 思路

我们通过哈希来进行实现，避免不停的对比。

思路：

用字符串构建 key

然后对应的数量就是 `rowCount * colCount` 的匹配之和。


## 实现

```java
    public int equalPairs(int[][] grid) {
        // 所有的行和列的哈希
        Map<String, Integer> rowHash = new HashMap<>();
        Map<String, Integer> colHash = new HashMap<>();

        int n = grid.length;
        StringBuilder buffer = new StringBuilder(n);
        for(int i = 0; i < n; i++) {
            buffer.setLength(0);
            for(int j = 0; j < n; j++) {
                buffer.append(grid[i][j]).append(",");
            }
            String key = buffer.toString();
            rowHash.put(key, rowHash.getOrDefault(key, 0)+1);
        }

        // 列
        for(int i = 0; i < n; i++) {
            buffer.setLength(0);
            for(int j = 0; j < n; j++) {
                buffer.append(grid[j][i]).append(",");
            }
            String key = buffer.toString();
            colHash.put(key, colHash.getOrDefault(key, 0)+1);
        }

        // 多少个相同的
        int count = 0;
        for(String row : rowHash.keySet()) {
            Integer countRow = rowHash.get(row);
            Integer countCol = colHash.getOrDefault(row, 0);
            count += countRow * countCol;
        }

        return count;
    }
```

## 效果

64ms 击败 12.61%

## 反思

如何更快？

# v2-自己定义哈希

## 思路

我们主要慢在不停的拼接 string 对象，效果自然比较差。

我们可以自己模仿哈希的原理，自己计算一个 Hash 值。

同时 map 也可以简化为 1 个。

## 实现

```java
    public int equalPairs(int[][] grid) {
        int n = grid.length;

        // 存每一行的哈希值 -> 出现次数
        Map<Long, Integer> rowMap = new HashMap<>();

        long base = 131_5423911L; // 大质数，减少冲突

        // 先存所有行的哈希
        for (int i = 0; i < n; i++) {
            long hash = 0;
            for (int j = 0; j < n; j++) {
                // 用 base 累乘避免顺序丢失
                hash = hash * base + (grid[i][j] + 1000); 
                // +1000 避免负数干扰
            }
            rowMap.put(hash, rowMap.getOrDefault(hash, 0) + 1);
        }

        int res = 0;
        // 枚举列，算哈希
        for (int j = 0; j < n; j++) {
            long hash = 0;
            for (int i = 0; i < n; i++) {
                hash = hash * base + (grid[i][j] + 1000);
            }
            res += rowMap.getOrDefault(hash, 0);
        }

        return res;
    }
```

## 效果

3ms  100%

## 反思

这样看效果还是挺好的。

# 参考资料