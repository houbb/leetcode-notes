---
title: LC1340. 跳跃游戏 V jump game v
date: 2025-10-11
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, dfs, bfs]
published: true
---

# LC1340. 跳跃游戏 V jump game v

给你一个整数数组 arr 和一个整数 d 。每一步你可以从下标 i 跳到：

i + x ，其中 i + x < arr.length 且 0 < x <= d 。
i - x ，其中 i - x >= 0 且 0 < x <= d 。
除此以外，你从下标 i 跳到下标 j 需要满足：arr[i] > arr[j] 且 arr[i] > arr[k] ，其中下标 k 是所有 i 到 j 之间的数字（更正式的，min(i, j) < k < max(i, j)）。

你可以选择数组的任意下标开始跳跃。请你返回你 最多 可以访问多少个下标。

请注意，任何时刻你都不能跳到数组的外面。

示例 1：

输入：arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
输出：4
解释：你可以从下标 10 出发，然后如上图依次经过 10 --> 8 --> 6 --> 7 。
注意，如果你从下标 6 开始，你只能跳到下标 7 处。你不能跳到下标 5 处因为 13 > 9 。你也不能跳到下标 4 处，因为下标 5 在下标 4 和 6 之间且 13 > 9 。
类似的，你不能从下标 3 处跳到下标 2 或者下标 1 处。

示例 2：

输入：arr = [3,3,3,3,3], d = 3
输出：1
解释：你可以从任意下标处开始且你永远无法跳到任何其他坐标。

示例 3：

输入：arr = [7,6,5,4,3,2,1], d = 1
输出：7
解释：从下标 0 处开始，你可以按照数值从大到小，访问所有的下标。

示例 4：

输入：arr = [7,1,7,1,7,1], d = 2
输出：2
示例 5：

输入：arr = [66], d = 1
输出：1
 

提示：

1 <= arr.length <= 1000

1 <= arr[i] <= 10^5

1 <= d <= arr.length

# 题意

这一题题目实际上非常绕，到底在说什么？

## 限定条件

### 1：跳的距离不能太远

`|i - j| <= d` 意思是你最多能跳 `d` 格。

### 2：只能往“更低”的平台跳

`arr[i] > arr[j]` 不能往高的地方跳，只能往低的地方跳。也就是说，每次你都在“往下跳”。

### 3：中间不能有比起点更高的平台挡路

对所有在 `i` 和 `j` 之间的 `k`，必须满足：`arr[k] < arr[i]`

你不能“跨过”一个比你还高的平台。路径中间必须都是比你低的。

## 问题本质

其实你是在一张**有向图**上移动：

- 每个索引是一个节点；

- 从高平台到低平台有一条有向边；

- 不能越过比自己高的平台；

- 每个节点都向比它低的节点连边；

- 图中不可能有环（因为高度严格递减）。

# v1-DFS

## 思路

最长的路径，属于全局性质。

我们用 DFS 来解决试一下。

## 实现

```java
class Solution {

    public int maxJumps(int[] arr, int d) {
        // 尝试所有的    
        int max = 1;
        for(int i = 0; i < arr.length; i++) {
            max = Math.max(max, dfs(i, arr, d));
        } 
        return max;
    }

    private int dfs(int i, int[] arr, int d) {
        int res = 1;
        int n = arr.length;

        // 可以往左
        for(int x = 1; x <= d; x++) {
            int j = i - x;
            // 边界
            if(j < 0) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d));
        }

        // 可以往右
        for(int x = 1; x <= d; x++) {
            int j = i + x;
            // 边界
            if(j > n-1) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d));
        }

        return res;
    }


}
```

## 效果

超出时间限制
113 / 127 个通过的测试用例

## 复杂度

最坏复杂度：O(n × (2^d))

因为每个位置可能递归出 2d 条路径（左右），而这些路径又会相互重复调用。

## 反思

竟然超时了。

可见这种题目就要往 dp->贪心的方向努力了。

首先简单点，我们给 dfs 添加记忆化。

# v2-dp 记忆化

## 思路

避免重复计算

## 实现

```java
class Solution {

    public int maxJumps(int[] arr, int d) {
        // 尝试所有的    
        int max = 1;
        int n = arr.length;
        int[] mem = new int[n];

        for(int i = 0; i < n; i++) {
            max = Math.max(max, dfs(i, arr, d, mem));
        } 
        return max;
    }

    private int dfs(int i, int[] arr, int d, int[] mem) {
        // 直接取mem
        if(mem[i] != 0) {
            return mem[i];
        }

        int res = 1;
        int n = arr.length;

        // 可以往左
        for(int x = 1; x <= d; x++) {
            int j = i - x;
            // 边界
            if(j < 0) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d, mem));
        }

        // 可以往右
        for(int x = 1; x <= d; x++) {
            int j = i + x;
            // 边界
            if(j > n-1) {
                break;
            }
            // 必须往更低的地方跳跃
            if(arr[j] >= arr[i]) {
                break;
            }

            res = Math.max(res, 1+dfs(j, arr, d, mem));
        }

        //设置
        mem[i] = res;

        return res;
    }

}
```

## 效果

11ms  击败 77.61%

效果拔群

# v3-dp

## 思路

| 方法            | 思想              | 依赖解决方式                    |
| ------------- | --------------- | ------------------------- |
| **DFS + 记忆化** | 自顶向下（Top-down）  | 当依赖的状态没算好时，递归进去计算它        |
| **DP（迭代）**    | 自底向上（Bottom-up） | 必须确保：在计算当前状态前，所有依赖项都已被计算完 |

这样看的话，其实 dfs+mem 还更简单一些。因为不需要关心依赖项的问题。

## 既然 dfs+mem 也可以解答，为什么还需要 dp 呢

如果 DFS + 记忆化（Top-down）能跑得对、写得简单，那为什么还要折腾一个 DP（Bottom-up）版本？

DP 则完全没有递归栈问题，它是 纯数组操作 + 顺序访问，

对于大数据（特别是 n>10⁴、n>10⁵）时，运行时间和内存访问都更稳定。

| 对比项  | DFS + memo | DP（迭代）        |
| ---- | ---------- | ------------- |
| 实现   | 简单、递归自然    | 繁琐、要手动排顺序     |
| 性能   | 函数栈 + 缓存开销 | 紧凑、可排序优化      |
| 栈安全  | 有栈深限制      | 无递归栈          |
| 优化空间 | 难（访问顺序不可控） | 容易（可排序、可预处理）  |
| 适用场景 | 图搜索、状态稀疏   | 状态密集、大数据、可拓扑化 |

比如常见的空间压缩

## dp 流程

### 状态定义（和记忆化一致）

定义 dp[i] = 从下标 i 出发最多可访问多少个下标（包括 i 本身）。

### 转移关系（也和 DFS 一致）

```
dp[i] = 1 + max{ dp[j] }  for 所有 j 满足：
      - 0 < |i - j| <= d
      - arr[j] < arr[i]
      - 中间没有 k 使得 arr[k] >= arr[i]（遇到阻挡则停止那方向的扫描）
```

也就是左右分别扫描最多 d 步，一旦遇到 arr[?] >= arr[i] 就要 break。

### 关键：依赖方向

注意 dp[i] 只依赖于比 arr[i] 更 小 的位置的 dp 值。

这意味着如果我们先计算 值更小的索引 的 dp，再计算值更大的索引，就能保证依赖已计算完毕 —— 这是把记忆化改成自底向上的核心。

## 实现

```java
class Solution {

    public int maxJumps(int[] arr, int d) {
        int n = arr.length;
        //ix sort by val，需要保持拓扑排序
        Integer[] indexList = new Integer[n];
        for(int i = 0; i < n; i++) {
            indexList[i] = i;
        }
        Arrays.sort(indexList, (a,b)->(arr[a]-arr[b]));

        // 尝试所有的    
        int res = 1;
        int[] dp = new int[n];
        for(int t = 0; t < n; t++) {
            // 选择排序后的 i
            int i = indexList[t];
            dp[i] = 1; // at least itself

            // 可以往左
            for(int x = 1; x <= d; x++) {
                int j = i - x;
                // 边界
                if(j < 0) {
                    break;
                }
                // 必须往更低的地方跳跃
                if(arr[j] >= arr[i]) {
                    break;
                }

                // dp
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }

            // 可以往右
            for(int x = 1; x <= d; x++) {
                int j = i + x;
                // 边界
                if(j > n-1) {
                    break;
                }
                // 必须往更低的地方跳跃
                if(arr[j] >= arr[i]) {
                    break;
                }

                // dp
                dp[i] = Math.max(dp[i], 1 + dp[j]);
            }

            // 最大值
            res = Math.max(res, dp[i]);
        } 

        return res;
    }

}
```

## 效果

20ms 击败 38.81%

## 复杂度

排序开销 O(n log n)；每个索引计算时向左右各扫描最多 d 步 => 总 O(n * d)。

因此总体 O(n log n + n d)。

## 反思

我们费劲千辛万苦，好像性能还下降了。

如何优化呢？

# v4-dp 优化 单调栈

## 思路

既然是工程化实现，那么应该存在可以优化的点。

## 问题的本质

对于每个位置 i，我们最多能往左跳到「第一个比 arr[i] 高的柱子前面」。

同理，往右跳到「第一个比 arr[i] 高的柱子前面」。

## 单调栈预处理左右边界

PS: 这个又用到我们前面学习到的单调栈，好题。

我们可以分别用两次单调栈：从左往右（找左边界）

思路：

维护一个「单调递减栈」——栈里存下标，保证 `arr[stack[top]] < arr[i]`。

如果 `arr[stack[top]] < arr[i]` 不满足，就不断弹栈。

弹出的元素说明它右边第一个比它高的就是当前的 i。

## 实现

```java
class Solution {
    public int maxJumps(int[] arr, int d) {
        int n = arr.length;
        Integer[] indexList = new Integer[n];
        for (int i = 0; i < n; i++) indexList[i] = i;
        Arrays.sort(indexList, (a, b) -> Integer.compare(arr[a], arr[b]));

        int[] leftBound = new int[n];
        int[] rightBound = new int[n];
        Arrays.fill(leftBound, 0);
        Arrays.fill(rightBound, n - 1);

        // 找右边第一个 >= （注意改为 <=）
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] <= arr[i]) {
                int idx = stack.pop();
                rightBound[idx] = i - 1;
            }
            stack.push(i);
        }

        // 找左边第一个 >= （注意改为 <=）
        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] <= arr[i]) {
                int idx = stack.pop();
                leftBound[idx] = i + 1;
            }
            stack.push(i);
        }

        // 限制不超过 d
        for (int i = 0; i < n; i++) {
            leftBound[i] = Math.max(leftBound[i], i - d);
            rightBound[i] = Math.min(rightBound[i], i + d);
        }

        // DP（按值从小到大）
        int[] dp = new int[n];
        int res = 1;
        for (int idx : indexList) {
            dp[idx] = 1;
            // 左
            for (int j = idx - 1; j >= leftBound[idx]; j--) {
                if (arr[j] < arr[idx])
                    dp[idx] = Math.max(dp[idx], dp[j] + 1);
            }
            // 右
            for (int j = idx + 1; j <= rightBound[idx]; j++) {
                if (arr[j] < arr[idx])
                    dp[idx] = Math.max(dp[idx], dp[j] + 1);
            }
            res = Math.max(res, dp[idx]);
        }
        return res;
    }
}
```

## 复杂度

单调栈 预处理跳跃边界

TC: O(n)

# v5-segmentTree

## 思路

当我们处理每个点 i 时：它只能跳到 比它低 的位置；

因此我们按 arr[i] 从小到大排序；

对于当前 i，我们要计算：

```java
dp[i] = 1 + max( dp[j] )，//其中 j ∈ [i−d, i−1] 或 [i+1, i+d] 且 arr[j] < arr[i]
```

如果我们已经处理完所有比它低的点，就可以在 Segment Tree 中 区间查询最大 dp[j]。

## 实现

```java
class Solution {
    public int maxJumps(int[] arr, int d) {
        int n = arr.length;
        int[] dp = new int[n];
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++)
            idx[i] = i;
        Arrays.sort(idx, (a, b) -> arr[a] - arr[b]);

        SegmentTree seg = new SegmentTree(n);
        int res = 1;

        for (int t = 0; t < n; t++) {
            int i = idx[t];
            int best = 0;

            // 向左
            int L = Math.max(0, i - d);
            for (int j = i - 1; j >= L; j--) {
                if (arr[j] >= arr[i])
                    break;
                best = Math.max(best, seg.query(j, j));
            }

            // 向右
            int R = Math.min(n - 1, i + d);
            for (int j = i + 1; j <= R; j++) {
                if (arr[j] >= arr[i])
                    break;
                best = Math.max(best, seg.query(j, j));
            }

            dp[i] = best + 1;
            seg.update(i, dp[i]);
            res = Math.max(res, dp[i]);
        }

        return res;
    }

    class SegmentTree {
        int[] tree;
        int n;

        SegmentTree(int n) {
            this.n = n;
            tree = new int[4 * n];
        }

        void update(int idx, int val) {
            update(1, 0, n - 1, idx, val);
        }

        void update(int node, int l, int r, int idx, int val) {
            if (l == r) {
                tree[node] = val;
                return;
            }
            int mid = (l + r) / 2;
            if (idx <= mid)
                update(2 * node, l, mid, idx, val);
            else
                update(2 * node + 1, mid + 1, r, idx, val);
            tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
        }

        int query(int L, int R) {
            return query(1, 0, n - 1, L, R);
        }

        int query(int node, int l, int r, int L, int R) {
            if (R < l || L > r)
                return 0;
            if (L <= l && r <= R)
                return tree[node];
            int mid = (l + r) / 2;
            return Math.max(query(2 * node, l, mid, L, R),
                    query(2 * node + 1, mid + 1, r, L, R));
        }
    }

}
```

## 效果

207ms 击败 5.97%

## 反思

这种复杂的，性能反而很差。


# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)

# 参考资料


