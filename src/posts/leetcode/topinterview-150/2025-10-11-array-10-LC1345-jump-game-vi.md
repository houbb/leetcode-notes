---
title: LC1345. 跳跃游戏 IV jump game iv
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1345. 跳跃游戏 IV jump game iv

给你一个整数数组 arr ，你一开始在数组的第一个元素处（下标为 0）。

每一步，你可以从下标 i 跳到下标 i + 1 、i - 1 或者 j ：

i + 1 需满足：i + 1 < arr.length
i - 1 需满足：i - 1 >= 0
j 需满足：arr[i] == arr[j] 且 i != j
请你返回到达数组最后一个元素的下标处所需的 最少操作次数 。

注意：任何时候你都不能跳到数组外面。

示例 1：

输入：arr = [100,-23,-23,404,100,23,23,23,3,404]
输出：3
解释：那你需要跳跃 3 次，下标依次为 0 --> 4 --> 3 --> 9 。下标 9 为数组的最后一个元素的下标。
示例 2：

输入：arr = [7]
输出：0
解释：一开始就在最后一个元素处，所以你不需要跳跃。
示例 3：

输入：arr = [7,6,9,6,9,6,9,7]
输出：1
解释：你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。
 

提示：

1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8
 

# v1-BFS

## 思路

要求最短次数，我们用 BFS 来解决。

## 实现

```java
class Solution {


    public int minJumps(int[] arr) {
        //相同的值的位置
        Map<Integer, List<Integer>> valueIndexMap = new HashMap<>();
        int n = arr.length;
        for(int i = 0; i < n; i++) {
            int val = arr[i];
            List<Integer> indexList = valueIndexMap.getOrDefault(val, new ArrayList<>());
            indexList.add(i);
            valueIndexMap.put(val, indexList);
        }

        // bfs 跳跃
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        visited[0] = true;
        int step = 0;

        //i 跳到下标 i + 1 、i - 1 或者 j ：
        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                int ix = queue.poll();
                if(ix == n-1) {
                    return step;
                }

                // 剩余的位置入队
                int left = ix-1;
                if(left >= 0 && !visited[left]) {
                    queue.offer(left);
                    visited[left] = true;
                }

                int right = ix+1;
                if(right <= n-1 && !visited[right]) {
                    queue.offer(right);
                    visited[right] = true;
                }

                //相同值，不同位置
                int val = arr[ix];
                List<Integer> indexList = valueIndexMap.get(val);
                if(indexList != null) {
                    for(int otherIx : indexList) {
                        if(otherIx != ix && !visited[otherIx]) {
                            queue.offer(otherIx);
                            visited[otherIx] = true;   
                        }
                    }

                    // 清空，避免重复执行
                    indexList.clear();
                }
            }

            step++;
        }

        return step;
    }

}
```

## 效果

54ms 击败 50.46%

## 复杂度

| 项目    | 复杂度      |
| ----- | -------- |
| 时间复杂度 | **O(n)** |
| 空间复杂度 | **O(n)** |


## 反思

`indexList.clear();` 这一句非常重要，不然虽然有 visited 数组放置重复，但是依然会超时。


# v2-优化

## 思路

如果 `arr[i] == arr[i=1] == arr[i+1]` 可以跳过，数据重复。

## 实现

```java
class Solution {


    public int minJumps(int[] arr) {
        //相同的值的位置
        int n = arr.length;
        Map<Integer, List<Integer>> valueIndexMap = new HashMap<>(n);
        
        for(int i = 0; i < n; i++) {
            if (i > 0 && i + 1 < n && arr[i] == arr[i + 1] && arr[i] == arr[i - 1])
                continue;

            int val = arr[i];
            List<Integer> indexList = valueIndexMap.getOrDefault(val, new ArrayList<>());
            indexList.add(i);
            valueIndexMap.put(val, indexList);
        }

        // bfs 跳跃
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        visited[0] = true;
        int step = 0;

        //i 跳到下标 i + 1 、i - 1 或者 j ：
        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                int ix = queue.poll();
                if(ix == n-1) {
                    return step;
                }

                // 剩余的位置入队
                int left = ix-1;
                if(left >= 0 && !visited[left]) {
                    queue.offer(left);
                    visited[left] = true;
                }

                int right = ix+1;
                if(right <= n-1 && !visited[right]) {
                    queue.offer(right);
                    visited[right] = true;
                }

                //相同值，不同位置
                int val = arr[ix];
                List<Integer> indexList = valueIndexMap.get(val);
                if(indexList != null) {
                    for(int ox = indexList.size()-1; ox >= 0; ox -- ) {
                        int otherIx = indexList.get(ox);
                        if(otherIx != ix && !visited[otherIx]) {
                            queue.offer(otherIx);
                            visited[otherIx] = true;   
                        }
                    }

                    // 清空，避免重复执行
                    valueIndexMap.remove(val);
                }
            }

            step++;
        }

        return step;
    }

}
```

## 效果

44ms 击败 83.49%

## 反思

还能更快吗？


# v3-array 模拟 queue

## 思路

通过 array 模拟 queue

## 实现

```java
class Solution {

    public int minJumps(int[] arr) {
        int n = arr.length;
        if (n == 1) return 0;

        // 相同的值 → 索引列表
        Map<Integer, List<Integer>> valueIndexMap = new HashMap<>(n);
        for (int i = 0; i < n; i++) {
            // 连续三个及以上相同值的中间部分直接跳过，减少 map 冗余
            if (i > 0 && i + 1 < n && arr[i] == arr[i + 1] && arr[i] == arr[i - 1])
                continue;

            valueIndexMap.computeIfAbsent(arr[i], k -> new ArrayList<>()).add(i);
        }

        boolean[] visited = new boolean[n];
        visited[0] = true;

        // 用数组模拟 queue
        int[] queue = new int[n];
        int head = 0, tail = 0;
        queue[tail++] = 0;

        int step = 0;
        while (head < tail) {
            int size = tail - head;
            for (int i = 0; i < size; i++) {
                int ix = queue[head++];
                if (ix == n - 1) {
                    return step;
                }

                // 跳左
                int left = ix - 1;
                if (left >= 0 && !visited[left]) {
                    visited[left] = true;
                    queue[tail++] = left;
                }

                // 跳右
                int right = ix + 1;
                if (right < n && !visited[right]) {
                    visited[right] = true;
                    queue[tail++] = right;
                }

                // 跳到相同值的其他位置
                List<Integer> indexList = valueIndexMap.get(arr[ix]);
                if (indexList != null) {
                    for (int j = indexList.size() - 1; j >= 0; j--) {
                        int otherIx = indexList.get(j);
                        if (!visited[otherIx]) {
                            visited[otherIx] = true;
                            queue[tail++] = otherIx;
                        }
                    }
                    valueIndexMap.remove(arr[ix]); // 同值节点只处理一次
                }
            }
            step++;
        }

        return step;
    }
}
```

## 效果

39ms 击败 93.58%

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


