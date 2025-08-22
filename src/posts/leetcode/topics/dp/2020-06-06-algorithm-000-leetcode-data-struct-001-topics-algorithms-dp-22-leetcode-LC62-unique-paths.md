---

title: 算法篇专题之动态规划 dynamic-programming 22-LC62 不同路径 unique-paths
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下不同路径

# LC62 不同路径 unique-paths

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

示例 1：

![1](https://pic.leetcode.cn/1697422740-adxmsI-image.png)

输入：m = 3, n = 7
输出：28
示例 2：

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
示例 3：

输入：m = 7, n = 3
输出：28
示例 4：

输入：m = 3, n = 3
输出：6
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10^9


# v1-递归

## 思路

我们每走一步只有两种选择：向下走，或者向右走。

所以递归方程为：`f(x, y) = f(x-1, y) + f(x, y-1)`

解释为当前的位置，要么从左边过来，要么从上边过来。

终止条件：`x < 0 || y < 0`

初始化值：第一行、第一列只有一种方式。

## 实现

```java
    public int uniquePaths(int m, int n) {
        return dfs(m-1, n-1);    
    }

    private int dfs(int x, int y) {
        if(x < 0 || y < 0) {
            return 0;
        }
        if(x == 0 || y == 0) {
            return 1;
        }
        return dfs(x-1, y) + dfs(x, y-1);
    }
```

## 结果

超出时间限制
41 / 63 个通过的测试用例

## 反思

DFS 这种是指数级别的，特别慢。

我们来用 dp 来解决这个问题。


# v2-dp

## 思路

1) dp 数组的含义

dp[i][j] 代表到 (i,j) 这个位置共有多少种方式到达。

2）状态转移公式

其实和递归是类似的

```java
dp[i][j] = dp[i-1][j] + dp[i][j-1];
```

3) 初始化

第一行、第一列初始化为 1

4）迭代

两层循环，都从1开始

5）返回结果

返回 `dp[m-1][n-1]`



## 实现

```java
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for(int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for(int i = 0; i < n; i++) {
            dp[0][i] = 1;
        }

        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
```

## 效果

0ms 击败 100.00%


## 复杂度

TC: O(m*n)


## 反思

dp 解法还是很清晰的。

还能更快吗？


# v3-数学

## 思路

也就是转换为组合问题。

### 特点

观察路径特点：

1. 网格大小：`m x n`
2. 机器人从左上角 `(0,0)` 到右下角 `(m-1,n-1)`
3. 每条路径只允许 **向下** 或 **向右** 移动

### 步数统计

* 向下走的步数 = `m-1`
* 向右走的步数 = `n-1`
* 总步数 = `(m-1) + (n-1) = m + n - 2`

> 例如，3x3 网格：
>
> * 下步数 = 2
> * 右步数 = 2
> * 总步数 = 4


### 问题转换

* 问有多少条不同路径 = **总步数中选择哪几步向下** 或 **向右**
* 数学公式：

```
C(总步数, 向下步数) = C(m+n-2, m-1)
```

或等价的：

```
C(m+n-2, n-1)
```

这是标准的组合问题：从总步数中选出若干步作为向下，其余为向右。

## 实现

```java
public int uniquePaths(int m, int n) {
    int N = m + n - 2; // 总步数
    int k = Math.min(m-1, n-1); // 选取较小的作为组合数

    long res = 1; // 用 long 防止溢出
    for (int i = 1; i <= k; i++) {
        res = res * (N - k + i) / i;
    }

    return (int) res;
}
```


## 效果

0ms 100%

## 复杂度

TC: `O(min(m,n))`


## 反思

还是那句话，数学永远是天花板！

但是面试之类的，这个很难想到。


# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://github.com/houbb/lmxxf-it)

[老马主站](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。

