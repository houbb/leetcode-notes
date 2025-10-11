---
title: LC1306. 跳跃游戏 III jump game iii
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1306. 跳跃游戏 III 

这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。

请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。

注意，不管是什么情况下，你都无法跳到数组之外。

示例 1：

输入：arr = [4,2,3,0,3,1,2], start = 5
输出：true
解释：
到达值为 0 的下标 3 有以下可能方案： 
下标 5 -> 下标 4 -> 下标 1 -> 下标 3 
下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3 
示例 2：

输入：arr = [4,2,3,0,3,1,2], start = 0
输出：true 
解释：
到达值为 0 的下标 3 有以下可能方案： 
下标 0 -> 下标 4 -> 下标 1 -> 下标 3
示例 3：

输入：arr = [3,0,2,1,2], start = 2
输出：false
解释：无法到达值为 0 的下标 1 处。 
 

提示：

1 <= arr.length <= 5 * 10^4
0 <= arr[i] < arr.length
0 <= start < arr.length

# v1-DFS

## 思路

看起来这一题和 LC45 和 LC55 非常类似，但是本质上是不同的。

这一题存在左右横跳，实际上是图的可达性问题。

图是非有向、可能有环的。我们可以用 visited 数组来解决环的问题。

我们直接通过 dfs 来解决。

## 实现

```java
class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        boolean[] visited = new boolean[n];
        return dfs(arr, start, visited);
    }

    private boolean dfs(int[] arr, int start, boolean[] visited) {
        if(start < 0 || start > arr.length-1) {
            return false;
        }
        if(visited[start]) {
            return false;
        }
        if(arr[start] == 0) {
            return true;
        }

        visited[start] = true;

        // 尝试向左、向右
        int val = arr[start];
        if(dfs(arr, start-val, visited)) {
            return true;
        }

        if(dfs(arr, start+val, visited)) {
            return true;
        }

        return false;
    }

}
```

## 效果

3ms击败 77.35%

## 复杂度

每个索引 i 最多会被访问一次，因为：访问过的节点被标记 `visited[i] = true；`

再次访问会被立即剪枝返回。每个访问节点时，最多递归到两个方向（常数次调用）。

时间复杂度=O(n)

SC: O(n)，visited 数组。

## 反思

dfs 的优势是全局遍历。

如果我们想找到最短的路径，可以使用 bfs。

一般而言，bfs 的性能会更好一些。因为可以找到最短的路径。

## 优化1-inplace 染色 

### 思路

直接原地修改数组，避免额外的 visited 数组开销。

比如 `nums[i] = -1;` 标识当前节点被访问过。

因为原始的数值范围 `0 <= arr[i] < arr.length`，用一个可以区分的特别值即可。

### 实现

```java
class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        return dfs(arr, start);
    }

    private boolean dfs(int[] arr, int start) {
        if(start < 0 || start > arr.length-1) {
            return false;
        }
        if(arr[start] == -1) {
            return false;
        }
        if(arr[start] == 0) {
            return true;
        }

        // 染色    
        int val = arr[start];
        arr[start] = -1;

        // 尝试向左、向右
        if(dfs(arr, start-val)) {
            return true;
        }

        if(dfs(arr, start+val)) {
            return true;
        }

        return false;
    }

}
```

### 效果

3ms 击败 77.35%

似乎没有太大变化。

### 复杂度

TC: O(n)

SC: O(1)

### 反思

一般这种可以染色的话，优先染色处理。

# v2-bfs

## 思路

类似的，我们可以通过 bfs 来解决这个问题。

## 实现

```java
class Solution {
    public boolean canReach(int[] arr, int start) {
        int n = arr.length;
        boolean[] visited = new boolean[n];
        
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        visited[start] = true;

        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                int ix = queue.poll();
                if(arr[ix] == 0) {
                    return true;
                }

                // 尝试向左、向右
                int left = ix - arr[ix];
                if(left >= 0 && !visited[left]) {
                    queue.offer(left);
                    visited[left] = true;
                }

                int right = ix + arr[ix];
                if(right <= n-1 && !visited[right]) {
                    queue.offer(right);
                    visited[right] = true;
                }
            }
        }

        return false;
    }
}
```

## 效果

8ms击败 41.99%

## 复杂度

## 反思

竟然比 dfs 还要慢，估计还是用例的问题。

## 优化1-array 模拟

可以用 array 模拟实现，这里不再赘述。

主要是这一题 bfs 不太占优势。

# 什么情况下不能用 dp+贪心

这种图的左右横跳就不能，不具有单调性。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


