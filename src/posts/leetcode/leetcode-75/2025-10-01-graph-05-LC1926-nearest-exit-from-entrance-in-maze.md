---
title: LC1926. 迷宫中离入口最近的出口 nearest-exit-from-entrance-in-maze
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, graph, dfs, bfs]
published: true
---

# LC399. 除法求值 evaluate-division

给你一个 m x n 的迷宫矩阵 maze （下标从 0 开始），矩阵中有空格子（用 '.' 表示）和墙（用 '+' 表示）。同时给你迷宫的入口 entrance ，用 entrance = [entrancerow, entrancecol] 表示你一开始所在格子的行和列。

每一步操作，你可以往 上，下，左 或者 右 移动一个格子。你不能进入墙所在的格子，你也不能离开迷宫。你的目标是找到离 entrance 最近 的出口。出口 的含义是 maze 边界 上的 空格子。entrance 格子 不算 出口。

请你返回从 entrance 到最近出口的最短路径的 步数 ，如果不存在这样的路径，请你返回 -1 。

示例 1：

```
🟥 🟥 🟩 🟥
⬜ ⬜ 🚶 🟥
🟥 🟥 🟥 🟩
```

输入：maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
输出：1
解释：总共有 3 个出口，分别位于 (1,0)，(0,2) 和 (2,3) 。
一开始，你在入口格子 (1,2) 处。
- 你可以往左移动 2 步到达 (1,0) 。
- 你可以往上移动 1 步到达 (0,2) 。
从入口处没法到达 (2,3) 。
所以，最近的出口是 (0,2) ，距离为 1 步。


示例 2：

```
🟥 🟥 🟥
🚶 ⬜ 🟩
🟥 🟥 🟥
```

输入：maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
输出：2
解释：迷宫中只有 1 个出口，在 (1,2) 处。
(1,0) 不算出口，因为它是入口格子。
初始时，你在入口与格子 (1,0) 处。
- 你可以往右移动 2 步到达 (1,2) 处。
所以，最近的出口为 (1,2) ，距离为 2 步。

示例 3：

```
🚶 🟥
```

输入：maze = [[".","+"]], entrance = [0,0]
输出：-1
解释：这个迷宫中没有出口。
 

提示：

maze.length == m
maze[i].length == n
1 <= m, n <= 100
maze[i][j] 要么是 '.' ，要么是 '+' 。
entrance.length == 2
0 <= entrancerow < m
0 <= entrancecol < n
entrance 一定是空格子。


# v1-DFS

## 思路

老规矩，图问题先上一个 DFS。

我们可以遍历所有的路径，然后找到一个最短的距离。

1) 移动方向

每一个点出发都可以走 4 个方向，这个有个常见的实现方式：

```java
int[4][2] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
```

2) 结束条件

`越界 || 访问过 || 遇到了墙`

3）完成条件

`边界出口 && 不是出发点`

4) 回溯

这里每次访问过一个点之后，最后需要回溯。

以尝试完所有的路径

进入尝试时，`visited[x][y] = true;`

回溯，就是 `visited[x][y] = false;`

## 实现

```java
class Solution {

    private int min = Integer.MAX_VALUE;
    private int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
    public int nearestExit(char[][] maze, int[] entrance) {
        boolean[][] visited = new boolean[maze.length][maze[0].length];    
        dfs(maze, entrance, visited, entrance[0], entrance[1], 0);
        if(min == Integer.MAX_VALUE) {
            return -1;
        }
        return min;
    }

    private void dfs(char[][] maze, int[] entrance, boolean[][] visited, int x, int y, int step) {
        int m = maze.length;
        int n = maze[0].length;

        // 判断终止
        if(x < 0 || y < 0 || x >= m || y >= n || visited[x][y] || maze[x][y] == '+') {
            return;
        }

        // 判断满足
        if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1) ) {
            if(step < min) {
                min = step;
            }
            return;
        }

        visited[x][y] = true;

        // 循环4个方向
        for(int[] dir : dirs) {
            dfs(maze, entrance, visited, x+dir[0], y+dir[1], step+1);
        }

        // backtrack
        visited[x][y] = false;
    }

}
```

## 效果

超出时间限制

77 / 194 个通过的测试用例

## 复杂度

最坏情况：

DFS 可能会走到所有格子，并且因为有回溯（`visited[x][y] = false`），同一个格子可能被多次进入 → 路径数可能呈指数级。

在无剪枝的情况下，复杂度接近 `O(4^(m*n))`（完全指数级），这是完全不可接受的。

## 反思

其实如果这个路已经超过 min，就没必要继续了。

### 优化1-剪枝

我们新增一个提前终止条件

```java
if(step > min) {
    return;
}
```

只能说有改进，但是不多。

依然是 超出时间限制

156 / 194 个通过的测试用例

# v2-DFS+限定方向

## 思路

依然是 DFS，不过我们从边缘出发+限定方向可行吗？

### 核心

遍历所有出口（边界上且不是入口）。

对每个出口做 DFS，只沿着“朝出口方向”的方向搜索。

记录最短步数。

## 问题

实际测试发现遇到墙会存在问题。

# v3-BFS

## 思路

这种求最短的场景，其实还是 BFS 比较自然。

因为 BFS 是逐层展开，找到边界，就是最短。

避免了 DFS 的大量无效的路径。

## 实现

```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
        int m = maze.length, n = maze[0].length;
        boolean[][] visited = new boolean[m][n];

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(entrance);
        visited[entrance[0]][entrance[1]] = true;
        int step = 0;

        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                int[] cur = queue.poll();
                int x = cur[0];    
                int y = cur[1];

                // 判断满足
                if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1) ) {
                    return step;
                }

                // 入队列
                for(int[] dir : dirs) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];

                    // 终止条件
                    if (nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] == '+' || visited[nx][ny]) {
                        continue;
                    }

                    visited[nx][ny] = true;
                    queue.offer(new int[]{nx, ny});
                }
            }   

            step++;
        }

        //NOT-FOUND
        return -1;
    }

}
```


## 效果

6ms 击败 74.24%

## 复杂度

| 方面     | BFS 复杂度                 |
| ------ | ----------------------- |
| 时间     | O(m*n)                  |
| 空间     | O(m*n)                  |
| 优点     | 第一次到达出口就是最短路径，性能稳定      |
| DFS 对比 | DFS 要遍历所有路径，最坏情况指数级，慢很多 |

## 反思

聪明如你，一定发现我们的击败只有 74%。

是算法复杂度不是最优吗？

还是那句老话，数组永远优于集合，我们可以模拟改进一下。

## 优化1-对象替代 `int[2]`

### 思路

int[2] 实际上未必比对象性能优化

我们用一个对象类替代

```java
private class Point() {
    public int x;
    public int y;
    public Point(int x, int y) {        
        this.x = x;
        this.y = y;
    }
}
```

### 实现

```java
class Solution {
    private class Point {
        public int x;
        public int y;
        public Point(int x, int y) {        
            this.x = x;
            this.y = y;
        }
    }

    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
        int m = maze.length, n = maze[0].length;
        boolean[][] visited = new boolean[m][n];

        Queue<Point> queue = new LinkedList<>();
        queue.offer(new Point(entrance[0], entrance[1]));
        visited[entrance[0]][entrance[1]] = true;
        int step = 0;

        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                Point cur = queue.poll();
                int x = cur.x;    
                int y = cur.y;

                // 判断满足
                if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1) ) {
                    return step;
                }

                // 入队列
                for(int[] dir : dirs) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];

                    // 终止条件
                    if (nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] == '+' || visited[nx][ny]) {
                        continue;
                    }

                    visited[nx][ny] = true;
                    queue.offer(new Point(nx, ny));
                }
            }   

            step++;
        }

        //NOT-FOUND
        return -1;
    }
}
```

### 效果

5ms 击败 84.26%

略有提升

### 反思

还能更快吗？

# v4-数组模拟

## 思路

在 v3 的基础上，数组模拟队列。

数组大小设置为 m*n 就足够了。

## 实现

```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
        int m = maze.length, n = maze[0].length;
        boolean[][] visited = new boolean[m][n];

        int[][] queue = new int[m*n][2];
        int head = 0;
        int tail = 0;

        queue[tail++] = entrance;
        visited[entrance[0]][entrance[1]] = true;
        int step = 0;

        while(tail > head) {
            int size = tail - head;
            for(int i = 0; i < size; i++) {
                int[] cur = queue[head++];
                int x = cur[0];    
                int y = cur[1];

                // 判断满足
                if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1) ) {
                    return step;
                }

                // 入队列
                for(int[] dir : dirs) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];

                    // 终止条件
                    if (nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] == '+' || visited[nx][ny]) {
                        continue;
                    }

                    visited[nx][ny] = true;
                    queue[tail++] = new int[]{nx, ny};
                }
            }   

            step++;
        }

        //NOT-FOUND
        return -1;
    }

}
```

## 效果

16ms 击败 6.98%

## 反思

这个性能反而下降了。

有没有办法避免 int[2] 的对象创建？

## 优化1-数组压缩

### 思路

一维数组压缩存储，也就是不用额外的对象数组，而是把 (x, y) 坐标压缩成一个整数存储。

思路：

坐标 (x, y) 可以压缩为 `pos = x * n + y`。

入队列时用 `queue[tail++] = pos`，出队列时 `pos / n` 得到 x，`pos % n` 得到 y。

### 实现

```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
        int m = maze.length, n = maze[0].length;
        boolean[][] visited = new boolean[m][n];

        int[] queue = new int[m*n];  // 一维数组压缩队列
        int head = 0, tail = 0;

        int start = entrance[0] * n + entrance[1];
        queue[tail++] = start;
        visited[entrance[0]][entrance[1]] = true;
        int step = 0;

        while(tail > head) {
            int size = tail - head;
            for(int i = 0; i < size; i++) {
                int pos = queue[head++];
                int x = pos / n;
                int y = pos % n;

                // 判断出口
                if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1)) {
                    return step;
                }

                // 入队
                for(int[] dir : dirs) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];
                    if(nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] == '+' || visited[nx][ny]) {
                        continue;
                    }
                    visited[nx][ny] = true;
                    queue[tail++] = nx * n + ny; // 压缩坐标入队
                }
            }
            step++;
        }

        return -1;
    }
}
```

### 效果

3ms 击败 99.37%

### 反思

已经接近这个解法的最优。

还能进一步优化吗？


# v5-染色法

## 思路

当然，其实还有其他的解法。

比如把访问过的节点设置为 `+`，从而避免 visited 数组的创建，减少开销。

我们来尝试一下。

## 实现

```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
        int m = maze.length, n = maze[0].length;
        int[] queue = new int[m*n];  // 一维数组压缩队列
        int head = 0, tail = 0;

        int start = entrance[0] * n + entrance[1];
        queue[tail++] = start;
        maze[entrance[0]][entrance[1]] = '+';
        int step = 0;

        while(tail > head) {
            int size = tail - head;
            for(int i = 0; i < size; i++) {
                int pos = queue[head++];
                int x = pos / n;
                int y = pos % n;

                // 判断出口
                if((x != entrance[0] || y != entrance[1]) && (x == 0 || y == 0 || x == m-1 || y == n-1)) {
                    return step;
                }

                // 入队
                for(int[] dir : dirs) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];
                    if(nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] == '+') {
                        continue;
                    }
                    maze[nx][ny] = '+';
                    queue[tail++] = nx * n + ny; // 压缩坐标入队
                }
            }
            step++;
        }

        return -1;
    }
}
```

## 效果

2ms 100%

## 反思

这个应该是双 A 解法。

空间+时间都是最优。

还是那句话，一杯茶，一包yan，一题图论做一天。

# 参考资料