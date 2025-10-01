---
title: LC841. 钥匙和房间 keys-and-rooms
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree, bst]
published: true
---

# LC841. 钥匙和房间 keys-and-rooms

有 n 个房间，房间按从 0 到 n - 1 编号。最初，除 0 号房间外的其余所有房间都被锁住。你的目标是进入所有的房间。然而，你不能在没有获得钥匙的时候进入锁住的房间。

当你进入一个房间，你可能会在里面找到一套 不同的钥匙，每把钥匙上都有对应的房间号，即表示钥匙可以打开的房间。你可以拿上所有钥匙去解锁其他房间。

给你一个数组 rooms 其中 rooms[i] 是你进入 i 号房间可以获得的钥匙集合。如果能进入 所有 房间返回 true，否则返回 false。

示例 1：

输入：rooms = [[1],[2],[3],[]]
输出：true
解释：
我们从 0 号房间开始，拿到钥匙 1。
之后我们去 1 号房间，拿到钥匙 2。
然后我们去 2 号房间，拿到钥匙 3。
最后我们去了 3 号房间。
由于我们能够进入每个房间，我们返回 true。

示例 2：

输入：rooms = [[1,3],[3,0,1],[2],[0]]
输出：false
解释：我们不能进入 2 号房间。
 

提示：

n == rooms.length
2 <= n <= 1000
0 <= rooms[i].length <= 1000
1 <= sum(rooms[i].length) <= 3000
0 <= rooms[i][j] < n
所有 rooms[i] 的值 互不相同

# v1-DFS

## 思路

这一题的本质是有向图的遍历。

我们最初拥有 0 号房间的钥匙，然后依次根据获取的钥匙进入后续的房间。

最后只需要判断是否已经访问了全部的房间即可。

## 实现

```java
class Solution {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];   
        dfs(visited, rooms, 0);

        for(boolean b : visited) {
            if(!b) {
                return false;
            }
        }
        return true;
    }

    private void dfs(boolean[] visited, List<List<Integer>> rooms, int ix) {
        if(visited[ix]) {
            return;
        }

        visited[ix] = true;
        for(Integer key : rooms.get(ix)) {
            dfs(visited, rooms, key);
        }
    }

}
```

## 效果

1ms 击败 66.31%

## 反思

如何可以更快呢？

算法层面应该已经是最优了。

可以考虑添加一个变量，避免最后再比较一次。

## 优化-全局变量

### 实现

```java
class Solution {

    private int count = 0;

    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];   
        dfs(visited, rooms, 0);

        return count == n;
    }

    private void dfs(boolean[] visited, List<List<Integer>> rooms, int ix) {
        if(visited[ix]) {
            return;
        }

        visited[ix] = true;
        count++;
        for(Integer key : rooms.get(ix)) {
            dfs(visited, rooms, key);
        }
    }

}
```

### 效果

0ms 100%

### 反思

这种全局变量也是一种比较常见的优化技巧。

# v2-BFS

## 思路

类似的，我们用 bfs 来实现一下。

## 实现

```java
public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];   
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        visited[0] = true;
        int count = 1;

        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                Integer cur = queue.poll();
                List<Integer> keys = rooms.get(cur);
                for(Integer key : keys) {
                    if(!visited[key]) {
                        visited[key] = true;
                        count++;
                        queue.offer(key);
                    }
                }
            }
        }

        return count == n;
    }
```

## 效果

2ms 击败 51.47%

## 反思

这里比较慢，主要慢在 Queue 的结构耗时+ int 的装箱/拆箱。

实现的细节也可以根据自己的喜好调整。

## 优化-数组模拟

### 思路

我们可以用 array 替代 queue。

房间最多有1000个。

### 实现

```java
  public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];   

        int[] queue = new int[1000];
        int queueHead = 0;
        int queueTail = 0;

        queue[queueTail++] = 0;
        visited[0] = true;
        int count = 1;

        while(queueHead < queueTail) {
            int size = queueTail - queueHead;
            for(int i = 0; i < size; i++) {
                int cur = queue[queueHead++];
                List<Integer> keys = rooms.get(cur);
                for(Integer key : keys) {
                    if(!visited[key]) {
                        visited[key] = true;
                        count++;
                        queue[queueTail++] = key;
                    }
                }
            }
        }

        return count == n;
    }
```

### 效果

2ms 51.47%

### 反思

性能并没有太大差别。

确实有点奇怪，按理说应该会提升一些才对。



# 参考资料