---

title: 图遍历 graph dfs bfs
date: 2025-10-01
categories: [Data Struct]
tags: [data-struct, graph, sh]
published: true
---

# 图可以用 dfs 遍历，是不是就可以用 BFS 遍历？区别的场景是？

完全可以先确认一点：**在图中，理论上只要能用 DFS 遍历的图，也可以用 BFS 遍历**，因为两者都是遍历整个连通分量的算法。

它们的根本区别不在“能否遍历”，而在**遍历顺序、应用场景和性能差异**。

下面详细分析：

---

## 一、DFS 和 BFS 的核心区别

| 特性   | DFS                   | BFS                 |
| ---- | --------------------- | ------------------- |
| 遍历顺序 | 深度优先，尽可能沿一条路径走到底再回溯   | 广度优先，按层（距离起点的步数）访问  |
| 数据结构 | 栈 / 递归调用栈             | 队列                  |
| 访问顺序 | 先访问子节点最深的路径           | 先访问距离起点最近的节点        |
| 适用场景 | 搜索路径、连通分量、拓扑排序、回溯     | 最短路径（无权图）、层序问题、分层处理 |
| 性能   | 空间复杂度受递归深度影响（最坏 O(V)） | 空间复杂度受队列影响（最坏 O(V)） |

---

## 二、DFS 能做的事情 BFS 也能做

1. **遍历整个图**

```text
DFS: 0 → 1 → 3 → 2
BFS: 0 → 1 → 2 → 3
```

2. **连通性判断**

   * DFS：判断连通分量时深入访问
   * BFS：按层访问，每个节点只访问一次

3. **环检测**

   * DFS 和 BFS 都可以检测环，思路略不同（DFS 用递归栈，BFS 用父节点/队列标记）

---

## 三、DFS 做不到 BFS 特定场景的地方

1. **最短路径（无权图）**

   * BFS 保证先到达的节点是最短路径（步数最少）
   * DFS 没法保证最短路径，因为它可能先走很深的分支

2. **按层处理问题**

   * BFS 天生按层，适合“层序遍历”“每层计算”“传染/扩散模拟”
   * DFS 得自己额外记录层数或深度才能模拟层序

3. **搜索效率差异**

   * 在宽而浅的图中，DFS 可能先访问很多深分支，而 BFS 先遍历同层节点，往往更快找到目标节点
   * 在深而窄的图中，DFS 较省内存（递归栈比 BFS 队列小）

---

## 四、总结

1. **能用 DFS 遍历的图，理论上都能用 BFS 遍历**
2. **区别在于：**

   * BFS → 找最短路径、分层、逐步扩散
   * DFS → 深度探索、回溯、拓扑排序、连通性/环检测
3. **选择遍历方式的原则**

   * 要求“最短路径/层序” → BFS
   * 要求“深度搜索/回溯/拓扑排序” → DFS

# 图遍历 DFS BFS 和树的区别和联系

我们来详细分析一下 **图的遍历（DFS/BFS）** 与 **树遍历** 的区别和联系，并用力扣的角度举例说明。

---

## 一、基本区别

| 特性        | 树                       | 图                   |
| --------- | ----------------------- | ------------------- |
| 节点关系      | 每个节点有一个父节点，只有一条路径从根到该节点 | 节点可以有多个前驱，可能存在环     |
| 是否有环      | 无环                      | 可能有环（有向图/无向图）       |
| 根节点       | 必有根节点                   | 可以没有明确根节点，可能多个连通分量  |
| 遍历时是否需要标记 | 一般不需要（因为无环）             | 必须标记访问过的节点，否则可能无限循环 |

---

## 二、DFS 和 BFS 在树与图的应用

### 1. DFS（Depth-First Search）

**树遍历：**

* 本质上就是 **前序/中序/后序遍历**
* 不需要额外 `visited` 数组
* 递归或栈都可以

```java
// 树的DFS（前序）
void dfs(TreeNode root) {
    if(root == null) return;
    System.out.println(root.val);
    dfs(root.left);
    dfs(root.right);
}
```

**图遍历：**

* 可能有环，需要 **visited[]** 避免重复访问
* 可以递归或用栈

```java
// 图的DFS
void dfs(int node) {
    visited[node] = true;
    for(int neighbor : graph.get(node)) {
        if(!visited[neighbor]) dfs(neighbor);
    }
}
```

---

### 2. BFS（Breadth-First Search）

**树遍历：**

* 层序遍历
* 队列实现
* 无需 visited 数组（因为树无环）

```java
// 树的BFS
Queue<TreeNode> queue = new LinkedList<>();
queue.offer(root);
while(!queue.isEmpty()) {
    TreeNode node = queue.poll();
    System.out.println(node.val);
    if(node.left != null) queue.offer(node.left);
    if(node.right != null) queue.offer(node.right);
}
```

**图遍历：**

* 队列实现
* 必须 **visited[]** 标记
* 常用于最短路径（无权图）

```java
// 图的BFS
Queue<Integer> queue = new LinkedList<>();
queue.offer(start);
visited[start] = true;
while(!queue.isEmpty()) {
    int node = queue.poll();
    for(int neighbor : graph.get(node)) {
        if(!visited[neighbor]) {
            visited[neighbor] = true;
            queue.offer(neighbor);
        }
    }
}
```

---

## 三、联系

1. **树是特殊的图**

   * 树是无环连通图
   * 树的 DFS/BFS 是图 DFS/BFS 的特例
   * 树中不需要 visited 数组，图中必须要

2. **遍历思想相同**

   * DFS：尽可能深地访问，回溯
   * BFS：按层访问

3. **代码结构类似**

   * 树 DFS ≈ 图 DFS + 访问标记
   * 树 BFS ≈ 图 BFS + 访问标记

---

## 四、力扣常见应用

| 遍历方式                           | 树题目                       | 图题目                      |
| ------------------------------ | ------------------------- | ------------------------ |
| DFS                            | LC104 二叉树最大深度, LC112 路径总和 | LC200 岛屿数量, LC130 被围绕的区域 |
| BFS                            | LC102 二叉树层序遍历             | LC127 单词接龙, LC1091 最短路径  |
| DFS/BFS 的区别在于是否需要访问标记，树不需要，图需要 |                           |                          |

---

**总结一句话：**

> 树是无环图，图是通用结构；DFS/BFS 是通用遍历思想，树的遍历可以看作图遍历的特例，只是无需访问标记而已。


