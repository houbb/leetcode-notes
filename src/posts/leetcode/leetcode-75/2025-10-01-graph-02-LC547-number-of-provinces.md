---
title: LC547. 省份数量 number-of-provinces
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, graph, dfs, bfs]
published: true
---

# LC547. 省份数量 number-of-provinces

有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

示例 1：


输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2
示例 2：


输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
 

提示：

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] 为 1 或 0
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]

# v1-DFS

## 思路

题目本质是一个 图连通性问题：

每个城市是图的一个节点。如果 `isConnected[i][j] == 1`，说明节点 i 和 j 有边相连。

省份就是图中的 连通分量（connected components）。

所以，这题可以转换为：给一个无向图，求图中连通分量的个数。

这里直接相连和间接都可以。

## 实现

```java
class Solution {

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;

        for(int i = 0; i < n; i++) {
            if(!visited[i]) {
                dfs(isConnected,visited, i);

                count++;
            }
        }

        return count;
    }   

    private void dfs(int[][] isConnected, boolean[] visited, int ix) {
        if(visited[ix]) {
            return;
        }

        visited[ix] = true;
        // 看邻居
        for(int n = 0; n < isConnected.length; n++) {
            if(isConnected[ix][n] == 1 && !visited[n]) {
                dfs(isConnected, visited, n);
            }
        }
    }

}
```

## 效果

1ms 击败 98.39%

## 复杂度

TC：O(n^2)

SC: O(n)

# v2-BFS

## 思路

类似的，我们用 bfs 来实现一下。

## 实现

```java
 public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        Queue<Integer> queue = new LinkedList<>();

        for(int i = 0; i < n; i++) {
            if(!visited[i]) {
                queue.offer(i);
                visited[i] = true;

                while(!queue.isEmpty()) {
                    int size = queue.size();
                    for(int ix = 0; ix < size; ix++) {
                        int j = queue.poll();

                        for(int k = 0; k < isConnected.length; k++) {
                            if(isConnected[j][k] == 1 && !visited[k]) {
                                visited[k] = true;
                                queue.offer(k);
                            }
                        }
                    }
                }

                count++;
            }
        }

        return count;
    }   
```

## 效果

3ms 击败 20.35%

## 反思

为什么这么慢呢？

## 复杂度

TC：O(n^2)

SC: O(n)

## 改版1-去掉 size

### 思路

BFS 中每一层看 size，是一个很好用的特性，按照层逐层遍历。

不过本题实际上不需要一层层来处理，直接穷举到结束即可。

这样代码简洁了不少。

### 实现

```java
public int findCircleNum(int[][] isConnected) {
    int n = isConnected.length;
    boolean[] visited = new boolean[n];
    int count = 0;
    Queue<Integer> queue = new LinkedList<>();
    for(int i = 0; i < n; i++) {
        if(!visited[i]) {
            queue.offer(i);
            visited[i] = true;
            while(!queue.isEmpty()) {
                int j = queue.poll();
                for(int k = 0; k < isConnected.length; k++) {
                    if(isConnected[j][k] == 1 && !visited[k]) {
                        visited[k] = true;
                        queue.offer(k);
                    }
                }
            }
            count++;
        }
    }
    return count;
}   
```

### 效果

2ms 击败 35.16%

性能并没有太大变化。

### 复杂度

| 方面 | 复杂度                 |
| -- | ------------------- |
| 时间 | O(n²) （每个节点扫描整行）    |
| 空间 | O(n) （队列 + visited） |


# v3-并查集

## 思路

并查集可以用来解决连通性的问题。

我们把链接的用在一个集合，看一下最后一共几个集合就行。

## 核心操作

并查集的核心操作其实是固定的

### 初始化

```java
int[] parent = new int[n];
for (int i = 0; i < n; i++) parent[i] = i;
```

每个节点自己是自己的根，表示初始 n 个独立集合。

### 查找（Find）

```java
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
}
```

目的：找到 x 所在集合的根节点

**路径压缩**：将访问路径上的所有节点直接挂到根节点下，优化后续查询

### 合并（Union）

```java
void union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX != rootY) {
        parent[rootX] = rootY; // 合并集合
    }
}
```

合并的逻辑，就是找二者的根节点。然后把 x 的根节点设置为 y。

## 实现

```java
class Solution {

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        
        // 每个是自己的根节点
        int[] parent = new int[n];
        for(int i = 0; i < n; i++) {
            parent[i] = i;
        }


        // 2层迭代
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < isConnected[i].length; j++) {
                // 二者放在一个集合中
                if(isConnected[i][j] == 1) {
                    union(parent, i, j);
                }
            }
        }

        int count = 0;
        for(int i = 0; i < n; i++) {
            if(parent[i] == i) {
                count++;
            }
        }
        // 计算总数
        return count;
    }   

    private int find(int[] parent, int x) {
        // 不是根，一直递归
        if(parent[x] != x){
            // 将这个路径的所有节点，都挂在 root 节点之上
            parent[x] = find(parent, parent[x]);
        }

        // root
        return parent[x];
    }

    private void union(int[] parent, int x, int y) {
        int xRoot = find(parent, x);
        int yRoot = find(parent, y);
        if(xRoot != yRoot) {
            parent[xRoot] = yRoot;
        }
    }
}
```

当然，你可以把 parent 当做一个全局变量，整体上是类似的，可以省去参数的传递。


## 效果

2ms 击败 35.16%

## 复杂度

TC： O(n^2)

## 反思

我们这里简单粗暴的 2 层循环，实际上循环可以优化。

毕竟 (i,j) 和 (j,i) 在集合中是一样的，避免多次判断。

### 实现

```java
// 2层迭代
for(int i = 0; i < n; i++) {
    for(int j = i+1; j < isConnected[i].length; j++) {
        // 二者放在一个集合中
        if(isConnected[i][j] == 1) {
            union(parent, i, j);
        }
    }
}
```

### 效果

1ms 击败 98.39%

效果拔群！

## 并查集的优势

  1. **动态性更强**

     * 如果图不是一次性给出，而是边动态增加，并查集特别适合
     * DFS/BFS 每次需要重新跑，而并查集只要 union 一下
  2. **逻辑清晰**

     * “属于同一个省份”这种集合划分问题，用并查集直观且贴切
  3. **可扩展性好**

     * 如果题目问的不只是数量，还要 **合并后的省份列表**、**查询两个城市是否同省**，并查集能直接回答
     * BFS/DFS 只能一次性算完，临时查询不高效

如果是这道题的原始静态版本（一次性输入，算出省份数），其实 DFS/BFS 和并查集复杂度差不多，没明显优势。

但如果题目换成 **动态加边** 或 **频繁查询两个城市是否同省**，那并查集就比 DFS/BFS 强太多了。

# 图矩阵的稀疏、稠密 对于几种解法的影响是什么？

邻接矩阵输入：DFS/BFS/并查集都要 O(n^2)，没太大差别。

邻接表输入：稀疏图 DFS/BFS 更快；并查集在动态合并/查询时更优。

这个区别其实对于我们自己抽象和实现图的时候，比较重要。

# 参考资料