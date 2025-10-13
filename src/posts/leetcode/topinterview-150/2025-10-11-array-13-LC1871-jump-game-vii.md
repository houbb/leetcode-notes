---
title: LC1871. 跳跃游戏 VII jump-game-vii
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1871. 跳跃游戏 VII jump-game-vii

给你一个下标从 0 开始的二进制字符串 s 和两个整数 minJump 和 maxJump 。

一开始，你在下标 0 处，且该位置的值一定为 '0' 。当同时满足如下条件时，你可以从下标 i 移动到下标 j 处：

`i + minJump <= j <= min(i + maxJump, s.length - 1) 且 s[j] == '0'.`

如果你可以到达 s 的下标 s.length - 1 处，请你返回 true ，否则返回 false 。

示例 1：

输入：s = "011010", minJump = 2, maxJump = 3
输出：true
解释：
第一步，从下标 0 移动到下标 3 。
第二步，从下标 3 移动到下标 5 。


示例 2：

输入：s = "01101110", minJump = 2, maxJump = 3
输出：false
 

提示：

2 <= s.length <= 10^5
s[i] 要么是 '0' ，要么是 '1'
s[0] == '0'
1 <= minJump <= maxJump < s.length

# v1-DFS

## 思路

我们直接 dfs 尝试所有的可能性。

用一个 visited 数组，放置重复访问，其他按照题意限制即可。

## 实现

```java
class Solution {
    
    //i + minJump <= j <= min(i + maxJump, s.length - 1) 且
    // s[j] == '0'.
    public boolean canReach(String s, int minJump, int maxJump) {
        // 最后一个位置必须是 0
        int n = s.length();
        if(s.charAt(n-1) != '0') {
            return false;
        }

        boolean[] visited = new boolean[n];
        return dfs(s, minJump, maxJump, visited, 0);
    }

    private boolean dfs(String s, int minJump, int maxJump, boolean[] visited, int ix) {
        // 在结尾的位置结束
        int n = s.length();

        // 满足
        if(ix == n-1) {
            return true;
        }
        // 边界
        if(ix < 0 || ix > n-1 || visited[ix]) {
            return false;
        }

        // 当前位置
        visited[ix] = true;

        // 遍历
        for(int j = ix+minJump; j <= Math.min(n-1, ix+maxJump); j++) {
            // 只能跳为0的数据？
            if(s.charAt(j) != '0') {
                continue;
            }
            
            if(dfs(s, minJump, maxJump, visited, j)) {
                return true;
            }
        }    

        return false;    
    }

}
```

## 效果

超出时间限制
120 / 143 个通过的测试用例

## 复杂度

时间复杂度 = O(n * (maxJump - minJump)) 在最坏情况下（maxJump - minJump = O(n)），即：O(n²)。

空间复杂度 = O(n)

## 反思

在 n 可达 10⁵ 的数据下：DFS O(n²) 会直接超时；

泪目了，dfs 为什么一直超时。是不够努力吗？


# v2-DFS + 记忆化思路（Top-down DP）

## 思路

避免重复计算，我们引入 dfs 的记忆化。

我们需要考虑一下 `mem[]` 数组的值情况

```
1 可达
-1 不可达
0 尚未计算
```

可以发现，有了 mem 数组之后，visited 数组可以去掉，因为 `mem[i] != 0` 等价于已经访问了。

## 实现

```java
class Solution {
    
    //i + minJump <= j <= min(i + maxJump, s.length - 1) 且
    // s[j] == '0'.
    public boolean canReach(String s, int minJump, int maxJump) {
        // 最后一个位置必须是 0
        int n = s.length();
        if(s.charAt(n-1) != '0') {
            return false;
        }

        int[] mem = new int[n];
        return dfs(s, minJump, maxJump, mem, 0);
    }

    private boolean dfs(String s, int minJump, int maxJump, int[] mem, int ix) {
        // 在结尾的位置结束
        int n = s.length();

        // 满足
        if(ix == n-1) {
            return true;
        }
        // 边界
        if(ix < 0 || ix > n-1) {
            return false;
        }
        // 记忆化
        if(mem[ix] != 0) {
            return mem[ix] == 1;
        }

        // 遍历
        for(int j = ix+minJump; j <= Math.min(n-1, ix+maxJump); j++) {
            // 只能跳为0的数据？
            if(s.charAt(j) != '0') {
                continue;
            }

            if(dfs(s, minJump, maxJump, mem, j)) {
                mem[ix] = 1;  // 成功
                return true;
            }
        }    

        mem[ix] = -1;  // fail
        return false;    
    }

}
```

## 效果

超出时间限制
120 / 143 个通过的测试用例

## 反思

看起来 mem 并没有太大的效果。

我们还是得抓住问题的本质在于我们的循环部分实在是太慢了。

下面的部分：

```java
for(int j = ix+minJump; j <= Math.min(n-1, ix+maxJump); j++) {
    // 只能跳为0的数据？
    if(s.charAt(j) != '0') {
        continue;
    }

    if(dfs(s, minJump, maxJump, mem, j)) {
        mem[ix] = 1;  // 成功
        return true;
    }
}
```

# v3-BFS

## 题意本质

从 0 出发，跳 minJump~maxJump 步，只能跳到 '0' 上，问能否到达最后。

表面上它像「图遍历」，但它其实是一个稀疏图 + 大范围跳跃 + 单向到达性问题。

## 思路

dfs 不行，我们尝试用一下 BFS 来解决。


## 实现

```java
class Solution {

    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) != '0') {
            return false;
        }

        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[n];
        queue.offer(0);
        visited[0] = true;
        char[] chars = s.toCharArray();

        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                int index = queue.poll();
                if(index == n-1) {
                    return true;
                }

                // 满足条件的入队列
                for(int j = index+minJump; j <= Math.min(n-1, index+maxJump); j++) {
                    if(chars[j] != '0' || visited[j]) {
                        continue;
                    }

                    // 入队列
                    visited[j] = true;
                    queue.offer(j);
                }
            }
        }

        return false;
    }
}
```

## 效果

超出时间限制
108 / 143 个通过的测试用例

## 慢的原因

```java
// 满足条件的入队列
for(int j = index+minJump; j <= Math.min(n-1, index+maxJump); j++) {
    if(chars[j] != '0' || visited[j]) {
        continue;
    }

    // 入队列
    visited[j] = true;
    queue.offer(j);
}
```

假设 n = 5e4, maxJump = 5e3，

即使每次队列里只有一个元素，你也要循环 5000 次 × 50000 次 ≈ 2.5亿 次！

这比 DFS 还慢，因为 BFS 每层都会重复扫这些区间。

## 优化1-滑动窗口

### 思路

不要在每次 BFS 层里“重新扫描一整个区间”，而是记住上次扫描到了哪里，下次只从新的范围继续扫。

我们维护一个变量 farthest 表示我们“之前扫描过的最远下标”。

### 实现

```java
class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) != '0') return false;

        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[n];
        queue.offer(0);
        visited[0] = true;

        char[] chars = s.toCharArray();
        int farthest = 0; // 我们上次最远扫描到哪里

        while (!queue.isEmpty()) {
            int index = queue.poll();

            // 终点
            if (index == n - 1) return true;

            // 从上次最远位置开始扫描
            int start = Math.max(index + minJump, farthest + 1);
            int end = Math.min(n - 1, index + maxJump);

            for (int j = start; j <= end; j++) {
                if (chars[j] == '0' && !visited[j]) {
                    visited[j] = true;
                    queue.offer(j);
                }
            }

            farthest = Math.max(farthest, end); // 更新已扫描范围
        }

        return false;
    }
}
```

### 效果

15ms 击败 26.14%

### 复杂度

| 项目    | 复杂度                                | 说明              |
| ----- | ---------------------------------- | --------------- |
| 时间复杂度 | O(n)                               | 滑动窗口避免重复扫描      |
| 空间复杂度 | O(n)                               | 队列 + visited 数组 |

### 反思

泪目了，AC 不容易。


## 优化2-数组模拟 queue

### 思路

老规矩，array 模拟 queue

### 实现

```java
class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) != '0') return false;

        int[] queue = new int[n];
        int head = 0;
        int tail = 0;

        boolean[] visited = new boolean[n];
        queue[tail++] = 0;
        visited[0] = true;

        char[] chars = s.toCharArray();
        int farthest = 0; // 我们上次最远扫描到哪里

        while (head < tail) {
            int index = queue[head++];

            // 终点
            if (index == n - 1) return true;

            // 从上次最远位置开始扫描
            int start = Math.max(index + minJump, farthest + 1);
            int end = Math.min(n - 1, index + maxJump);

            for (int j = start; j <= end; j++) {
                if (chars[j] == '0' && !visited[j]) {
                    visited[j] = true;
                    queue[tail++] = j;
                }
            }

            farthest = Math.max(farthest, end); // 更新已扫描范围
        }

        return false;
    }
}
```

### 效果

7ms 击败 96.73%

### 反思

效果不错。

# v4-dp

## 思路

核心思路一句话：

只要在 `[i - maxJump, i - minJump]` 区间内存在一个可达的 '0'，当前点 i 就可达。

也就是说，我们不需要 BFS，只要顺序遍历一次字符串，用一个「滑动窗口」统计这个区间内是否存在可达点即可。

## 流程

dp[i] = true 表示能跳到位置 i；

初始化：dp[0] = true；

用一个变量 reachableCount 维护当前窗口 `[i - maxJump, i - minJump]` 内的可达点数量；

当我们滑动到下一个位置时：

如果左端点出窗口且是可达点，reachableCount--

如果右端点进入窗口且是可达点，reachableCount++

当 reachableCount > 0 且 s[i] == '0'，说明 dp[i] = true

## 实现

```java
class Solution {
    public boolean canReach(String s, int minJump, int maxJump) {
        int n = s.length();
        if (s.charAt(n - 1) != '0') return false;

        boolean[] dp = new boolean[n];
        dp[0] = true;
        char[] chars = s.toCharArray();

        int reachable = 0;
        for (int i = 1; i < n; i++) {
            // 当 i 进入 [minJump, maxJump] 窗口区间时，更新 reachable
            if (i - minJump >= 0 && dp[i - minJump]) {
                reachable++;
            }
            if (i - maxJump - 1 >= 0 && dp[i - maxJump - 1]) {
                reachable--;
            }

            dp[i] = (chars[i] == '0' && reachable > 0);
        }

        return dp[n - 1];
    }
}
```

## 效果

8ms 击败 86.27%

## 复杂度

| 项目 | 复杂度      | 说明           |
| -- | -------- | ------------ |
| 时间 | **O(n)** | 每个点只进出滑动窗口一次 |
| 空间 | **O(n)** | dp 数组        |

## 反思

在 dp 眼里，也许 dfs 就是一个垃圾吧。

理论上 dfs+mem 接近 dp，但是这里可以发现并不是。



# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


