---

title: 算法篇专题之动态规划 dynamic-programming 22-LC64. 最小路径和 minimum-path-sum
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, dynamic-programming, dp, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下不同路径

# LC64. 最小路径和 minimum-path-sum

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例 1：

![1](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
示例 2：

输入：grid = [[1,2,3],[4,5,6]]
输出：12
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 200

# v1-递归

## 思路

1) 方程

我们每走一步只有两种选择：向下走，或者向右走。

因为要选择最小值路径，所以递归方程为：`Math.min(dfs(grid, x, y-1), dfs(grid, x-1, y)) + grid[x][y]`

解释为当前的位置，要么从左边过来，要么从上边过来。

2）终止条件

`x < 0 || y < 0`，此时返回路径为最大值。（不可达）

3）初始化值：

第一行，要加上左边的距离。

第一列，要加上上边的距离。

```java
if(x == 0) {
    return dfs(grid, 0, y-1) + grid[0][y];
}
if(y == 0) {
    return dfs(grid, x-1, y) + grid[x][0];
}
```

## 实现

```java
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        return dfs(grid, m-1, n-1);        
    }

    private int dfs(int[][] grid, int x, int y) {
        // 此路不同
        if(x < 0 || y < 0) {
            return Integer.MAX_VALUE;
        }
        if(x == 0 && y == 0) {
            return grid[x][y];
        }
        if(x == 0) {
            return dfs(grid, 0, y-1) + grid[0][y];
        }
        if(y == 0) {
            return dfs(grid, x-1, y) + grid[x][0];
        }

        // 两个中的最小值
        return Math.min(dfs(grid, x, y-1), dfs(grid, x-1, y)) + grid[x][y];
    }
```

## 结果

超出时间限制
25 / 66 个通过的测试用例

## 反思

这种递归的方法虽然直观，但是复杂度是指数的。

我们用 dp 来改进。

# v2-dp

## 思路

1) dp 数组的含义

dp[i][j] 代表到 (i,j) 这个位置的移动最小距离。

2）状态转移公式

其实和递归是类似的

```java
dp[x,y] = min(dp[x][y-1], dp[x-1][y]) + grid[x][y];
```

3) 初始化

```java
dp[0][0] = grid[0][0];
```

第一行、第一列初始化为前面的累加

4）迭代

两层循环，都从1开始

5）返回结果

返回 `dp[m-1][n-1]`

## 实现

```java
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        int[][] dp = new int[m][n];
        dp[0][0] = grid[0][0];
        for(int i = 1; i < m; i++) {
           dp[i][0] = dp[i-1][0] + grid[i][0];     
        }
        for(int i = 1; i < n; i++) {
           dp[0][i] = dp[0][i-1] + grid[0][i];     
        }

        // 迭代
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }

        return dp[m-1][n-1];        
    }
```

## 效果

4ms 击败 12.63%

## 复杂度

TC: O(m*n)

## 反思

dp 解法还是很清晰的。

还能更快吗？

# v3-空间压缩

## 滚动数组

只需要记住上一行的数据即可，二维 dp 可以压缩成一维 dp[n]：

```java
public int minPathSum(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;

    int[] dp = new int[n];
    dp[0] = grid[0][0];

    // 初始化第一行
    for (int j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }

    // 迭代
    for (int i = 1; i < m; i++) {
        dp[0] += grid[i][0]; // 更新第一列
        for (int j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    }

    return dp[n - 1];
}
```

### 效果

2ms 击败 95.85%

### 复杂度

时间复杂度：O(m·n)

空间复杂度：O(n)

## 原地修改 grid

如果允许修改输入数组，可以直接在 grid 上做累加，避免额外空间：

```java
public int minPathSum(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;

    for (int i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    for (int j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }

    return grid[m - 1][n - 1];
}
```

### 效果

2ms 击败 95.85%

### 复杂度

时间复杂度：O(m·n)

空间复杂度：O(1)

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

