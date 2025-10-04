---

title: 回溯算法入门介绍 Backtracking
date: 2025-10-03
categories: [Althgorim]
tags: [althgorim, backtrack]
published: true
---


## 一、什么是回溯

回溯是一种 **系统地搜索所有可能解的算法思想**，常用于解决 **组合、排列、子集、路径等问题**。

它可以看作是一种 **“试错 + 撤销”** 的过程：

1. **试**：选择当前可行的选项，进入下一层决策。
2. **递归**：继续在下一层做选择。
3. **撤销（回溯）**：如果发现当前选择不能得到解，或者已尝试完所有选择，就回退到上一步，尝试其他选项。

> 核心特点：**DFS + 撤销**。

简单比喻：
假设你在迷宫中找路，回溯就像你每走一步，如果发现死路，就回退到上一个分叉点，换另一条路继续尝试，直到找到出口或者穷尽所有路径。

---

## 二、回溯的核心结构

回溯问题通常有以下几个要素：

1. **选择列表（choices）**：当前可以做的选择集合。
2. **路径（path）**：从起点到当前节点的决策路径。
3. **约束条件（constraints）**：判断当前选择是否合法。
4. **结束条件（end condition / base case）**：判断是否到达叶子节点（可能的解）。

### 回溯模板（Java示例）

```java
void backtrack(路径 path, 状态 state) {
    if (满足结束条件) {
        // 找到一个解
        res.add(path的拷贝);
        return;
    }

    for (选择 in 当前可选集合) {
        if (不合法) continue;

        // 做选择
        path.add(选择);
        更新状态(state);

        // 递归
        backtrack(path, state);

        // 撤销选择
        path.removeLast();
        恢复状态(state);
    }
}
```

### 核心思想：

* **尝试每一种可能**（for循环遍历选择）
* **递归深入**（回溯树的下一层）
* **撤销操作**（保证不影响其他选择）

---

## 三、典型问题分类

### 1. 组合问题

**例题**：从 `[1,2,3,4]` 中选 2 个数的所有组合。

```java
List<List<Integer>> res = new ArrayList<>();

void combine(int start, int k, LinkedList<Integer> path, int[] nums) {
    if (path.size() == k) {
        res.add(new ArrayList<>(path));
        return;
    }

    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        combine(i + 1, k, path, nums); // 注意 i+1，避免重复
        path.removeLast();
    }
}
```

---

### 2. 排列问题

**例题**：全排列 `[1,2,3]`。

```java
List<List<Integer>> res = new ArrayList<>();

void permute(LinkedList<Integer> path, boolean[] used, int[] nums) {
    if (path.size() == nums.length) {
        res.add(new ArrayList<>(path));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;

        path.add(nums[i]);
        used[i] = true;

        permute(path, used, nums);

        path.removeLast();
        used[i] = false;
    }
}
```

---

### 3. 子集问题

**例题**：求 `[1,2,3]` 的所有子集。

```java
List<List<Integer>> res = new ArrayList<>();

void subsets(int start, LinkedList<Integer> path, int[] nums) {
    res.add(new ArrayList<>(path)); // 每一步都是解

    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        subsets(i + 1, path, nums);
        path.removeLast();
    }
}
```

---

### 4. 路径问题（迷宫/棋盘）

**例题**：在 `m*n` 网格中从 `(0,0)` 到 `(m-1,n-1)` 的所有路径。

```java
List<List<int[]>> res = new ArrayList<>();
int[][] dirs = {{0,1},{1,0}}; // 右、下

void dfs(int x, int y, LinkedList<int[]> path, int m, int n) {
    if (x == m-1 && y == n-1) {
        res.add(new ArrayList<>(path));
        return;
    }

    for (int[] d : dirs) {
        int nx = x + d[0], ny = y + d[1];
        if (nx >= m || ny >= n) continue;

        path.add(new int[]{nx, ny});
        dfs(nx, ny, path, m, n);
        path.removeLast();
    }
}
```

---

## 四、回溯优化技巧

1. **剪枝（Pruning）**

   * 在递归前判断是否可以提前终止，减少无效搜索。
   * 例如：`if (当前和 > target) return;`

2. **排序 + 剪枝**

   * 对数组排序后，可以更容易判断不可能的选择，从而提前结束循环。

3. **状态记录（避免重复）**

   * 使用 `used` 数组或 `Set` 来避免重复选择或重复解。

4. **迭代改递归（可选）**

   * 对于某些组合/子集问题，可以用位运算或栈模拟递归，降低函数调用开销。

---

## 五、回溯总结

* **本质**：DFS + 撤销选择
* **适用场景**：

  * 全排列、组合、子集
  * 棋盘、迷宫、数独
  * 字符串匹配、括号生成
* **优化方向**：

  * 剪枝
  * 记忆化（避免重复计算）
  * 排序 + 优先选择更优解


