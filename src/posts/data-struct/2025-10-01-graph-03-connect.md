---

title: 图的连通性（Graph Connectivity）
date: 2025-10-01
categories: [Data Struct]
tags: [data-struct, graph, sh]
published: true
---

## 一、图连通性的基本概念

在图论中，**连通性（Connectivity）**描述图中节点之间可达的关系：

* **节点可达（Reachability）**：如果存在一条从节点 A 到节点 B 的路径，则称 A 可达 B。
* **连通图（Connected Graph）**：

  * **无向图**：如果任意两个节点之间都有路径，称图是连通的。
  * **有向图**：

    * **强连通（Strongly Connected）**：每对节点 u,v 都有路径 u→v 和 v→u。
    * **弱连通（Weakly Connected）**：将有向图看作无向图后连通，则称弱连通。

---

## 二、分类

### 1️⃣ 无向图

* **连通图（Connected Graph）**：任意两点可达。
* **不连通图（Disconnected Graph）**：存在至少一对点不可达。
* **连通分量（Connected Component）**：图中每个最大连通子图。

### 2️⃣ 有向图

* **强连通（Strongly Connected）**：每对节点 u,v 都可以互相到达。
* **弱连通（Weakly Connected）**：忽略边的方向后是连通的。
* **强连通分量（SCC, Strongly Connected Component）**：最大强连通子图。

---

## 三、检测连通性的方法

### 1️⃣ 无向图连通性

* **DFS/BFS 遍历**：

  * 从一个节点出发遍历整个图。
  * 如果遍历后所有节点都被访问 → 连通图。
  * 否则 → 不连通，可以统计 **连通分量** 数量。

**Java示例（DFS）**：

```java
int countConnectedComponents(List<List<Integer>> graph) {
    int n = graph.size();
    boolean[] visited = new boolean[n];
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, graph, visited);
            count++;
        }
    }
    return count;
}

void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) dfs(neighbor, graph, visited);
    }
}
```

---

### 2️⃣ 有向图强连通性

* **Kosaraju 算法**（经典两次 DFS）
* **Tarjan 算法**（单次 DFS 求 SCC）
* **思路**：

  * 找出图中所有强连通分量
  * 判断图整体是否强连通（只有一个强连通分量）

---

## 四、图连通性的应用场景

1. **网络连通性**

   * 网络是否存在孤立节点，是否能从任意节点通信到其他节点。
2. **社会网络分析**

   * 用户是否在同一社交圈（强/弱连通分量）。
3. **地图和交通**

   * 城市之间道路是否连通。
4. **任务依赖管理**

   * 任务是否能被完全执行（类似 LC841/LC207）。
5. **电力或水系统**

   * 系统是否存在孤立设备，保证整体连通性。

---

## 五、总结

1. **无向图**：连通图 = 任意节点可达，DFS/BFS 可轻松判断。
2. **有向图**：强连通/弱连通不同，需 SCC 算法判断。
3. **核心思想**：从一个节点出发，遍历能到达哪些节点 → 判断可达性 → 推导连通性。
4. **实际意义**：网络、交通、权限、任务依赖等场景都能应用。

