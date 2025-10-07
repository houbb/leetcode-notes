---
title: LC435. 无重叠区间 non-overlapping-intervals
date: 2025-10-07
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, intervals]
published: true
---

# LC435. 无重叠区间 non-overlapping-intervals

给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。

注意 只在一点上接触的区间是 不重叠的。例如 [1, 2] 和 [2, 3] 是不重叠的。

示例 1:

输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。


示例 2:

输入: intervals = [ [1,2], [1,2], [1,2] ]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。


示例 3:

输入: intervals = [ [1,2], [2,3] ]
输出: 0
解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 
提示:

1 <= intervals.length <= 10^5
intervals[i].length == 2
-5 * 10^4 <= starti < endi <= 5 * 10^4


# v1-DFS 暴力

## 思路

对每个区间都有两种选择：保留 or 删除

枚举所有可能的保留组合，记录其中「不重叠」的最大数量。

那么 **最少删除数 = 总数 - 最大不重叠数量**

我们用 dfs 来实现最大的不重叠数量。

## 实现

```java
import java.util.*;

class Solution {
    int maxCount = 0; // 最大的不重叠区间数量

    public int eraseOverlapIntervals(int[][] intervals) {
        int n = intervals.length;
        if (n == 0) return 0;

        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        dfs(intervals, 0, new ArrayList<>());

        return n - maxCount;
    }

    private void dfs(int[][] intervals, int index, List<int[]> chosen) {
        maxCount = Math.max(maxCount, chosen.size());

        for(int i = index; i < intervals.length; i++) {
            if(canAdd(chosen, intervals[i])) {
                // 添加
                chosen.add(intervals[i]);

                // 递归 当前位置往后
                dfs(intervals, i+1, chosen);

                // 回溯
                chosen.remove(chosen.size()-1);
            }        
        }
    }

    /**
     * 判断当前区间是否能加入已选择集合（不重叠）
     */
    private boolean canAdd(List<int[]> chosen, int[] cur) {
        for(int[] prev : chosen) {
            // 有重叠：max(start) < min(end)
            if (Math.max(prev[0], cur[0]) < Math.min(prev[1], cur[1])) {
                return false;
            }
        }

        return true;
    }

}
```

## 效果

超出时间限制

41 / 59 个通过的测试用例

## 复杂度

O(2ⁿ) 超时也在情理之中

## 反思

如何更快呢？

一般 dfs 不行，我们可以考虑上 dp

# v2-dp

## 思路

我们可以 v1 的思路 **最少删除数 = 总数 - 最大不重叠数量**

重要的是找到这个子问题的状态转移方程。

### 1）dp 数组定义

dp[i] 是 以 intervals[i] 结尾的最长不重叠区间子序列长度

### 2) 初始化

每一个区间都可以单独存在，初始化为1

### 3）状态转移

按结束时间升序

遍历 `0..i-1` 的所有区间 j，判断是否可以接在 i 后面：

```java
if (intervals[j][1] <= intervals[i][0]) { // 不重叠
    dp[i] = Math.max(dp[i], dp[j] + 1);
}
```

意思是 第 j 个区间结束时间 ≤ 第 i 个区间开始时间

也就是说，j 和 i 不重叠，可以组成一个连续的子序列

### 4) 结果

最终最大值 max(dp[i]) → 最大不重叠区间数

删除的最少数量 = 总区间数 - 最大不重叠数

当然，实现上第四步可以和第三步合并，减少一次迭代。

## 实现

```java
import java.util.*;

class Solution {

    public int eraseOverlapIntervals(int[][] intervals) {
        int n = intervals.length;
        if (n == 0) return 0;

        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);

        int max = 0;    
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) { // 不重叠
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }

            max = Math.max(dp[i], max);
        }

        return n -  max;
    }

}
```

## 效果

超出时间限制
55 / 59 个通过的测试用例

## 复杂度

TC O(n^2)，竟然没有 AC

看来这个用例还是有点严格的。

# v3-dp+二分

## 思路

我们两层循环，但是里面实际上是可以改进的。

把前面所有区间的结束时间存到一个数组（可选），然后用 二分查找 快速找到最后一个不重叠的 j

## 实现

```java
 import java.util.*;

 class Solution {
     public int eraseOverlapIntervals(int[][] intervals) {
         int n = intervals.length;
         if (n == 0) return 0;

         // 排序：按结束时间升序，结束时间相同按开始时间升序
         Arrays.sort(intervals, (a, b) -> {
             if (a[1] == b[1]) {
                 return a[0] - b[0];
             }
             return a[1] - b[1];
         });

         int[] dp = new int[n];
         int[] maxDp = new int[n];
         Arrays.fill(dp, 1);
         maxDp[0] = 1;

         for (int i = 1; i < n; i++) {
             int j = findLastNonOverlap(intervals, intervals[i][0], i);
             if (j != -1) {
                 dp[i] = maxDp[j] + 1;
             } else {
                 dp[i] = 1;
             }
             maxDp[i] = Math.max(maxDp[i-1], dp[i]);
         }

         return n - maxDp[n-1];
     }

     // 二分查找：在 intervals[0..right-1] 中找结束时间 <= target 的最后一个位置
     private int findLastNonOverlap(int[][] intervals, int target, int i) {
         int left = 0;
         int right = i-1;
         int res = -1;
         while (left <= right) {
             int mid = left + (right - left) / 2;
             if (intervals[mid][1] <= target) {
                 res = mid;
                 left = mid + 1;
             } else {
                 right = mid - 1;
             }
         }
         return res;
     }
 }
```

## 效果

145ms 击败 5.19%

## 复杂度

排序 + DP+二分 = O(n log n + n log n) = O(n log n) 

## 反思

那么，还有一种可能，那就是贪心了。

# v4-贪心

## 思路

一般贪心放在最后实现，因为贪心不太好想。

想不到就是想不到。

和 v2 有些类似，只不过更简单。

## 实现

```java
import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        Arrays.sort(intervals, (a,b) -> a[1]-b[1]);

        int count = 0;
        int end = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                // 重叠，需要删除
                count++;
            } else {
                // 更新最后一个不重叠区间的结束时间
                end = intervals[i][1]; 
            }
        }

        return count;
    }
}
```

## 效果

49ms 击败 90.77%

## 复杂度

总体时间复杂度 = 排序 + 遍历 = O(n log n + n) = O(n log n)

这个比 v3 要快。

## 反思

这种题目，如果可以，还是推荐先用 dp 尝试。

不行的话，那就 dp+二分。

最优的话，用贪心尝试。

## 优化1-排序优化

### 思路

一般测试用例的数据量不大，所以可以用快排来替代系统排序。一般效果更好。

看了一下 top1 是双轴快排 21ms。

当然排序方法我们看自己喜欢，比如用桶排序。

问题就演变成了如何找到一个最快的排序方法。

### 实现

```java
import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // 调用优化后的桶排序按结束时间升序
        int[][] sortedIntervals = bucketSort(intervals);

        // 贪心遍历
        int count = 0;      // 删除的区间数
        int lastEnd = Integer.MIN_VALUE;

        for (int[] interval : sortedIntervals) {
            if (interval[0] >= lastEnd) {
                // 不重叠，选择
                lastEnd = interval[1];
            } else {
                // 重叠，需要删除
                count++;
            }
        }

        return count;
    }

    private int[][] bucketSort(int[][] intervals) {
        // 先找到实际最小和最大结束时间
        int minEnd = Integer.MAX_VALUE;
        int maxEnd = Integer.MIN_VALUE;
        for (int[] interval : intervals) {
            minEnd = Math.min(minEnd, interval[1]);
            maxEnd = Math.max(maxEnd, interval[1]);
        }

        int bucketSize = maxEnd - minEnd + 1;
        List<int[]>[] buckets = new List[bucketSize];
        for (int i = 0; i < bucketSize; i++) buckets[i] = new ArrayList<>();

        // 放入桶
        for (int[] interval : intervals) {
            int idx = interval[1] - minEnd; // 映射到 0..bucketSize-1
            buckets[idx].add(interval);
        }

        // 收集排序结果
        int[][] result = new int[intervals.length][2];
        int pos = 0;
        for (List<int[]> bucket : buckets) {
            for (int[] interval : bucket) {
                result[pos++] = interval;
            }
        }

        return result;
    }
}
```

### 效果

40ms 击败 99.75%

一般般，还能改进吗？

## 改进2-原地桶排序

### 思路

我们上边用了桶排序，但是重新创建了数组耗时。

有没有可能通过原地排序实现呢？

有的

### 实现

```java
import java.util.*;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        int[][] sortedIntervals = sort(intervals);
        int count = 0;
        int end = Integer.MIN_VALUE;
        for (int[] interval : sortedIntervals) {
            if (interval[0] >= end) {
                end = interval[1];
            } else {
                count++;
            }
        }

        return count;
    }

    private int[][] sort(int[][] intervals) {
        int n = intervals.length;

        // 1. 找实际最小/最大结束时间
        int minEnd = Integer.MAX_VALUE;
        int maxEnd = Integer.MIN_VALUE;
        for (int[] interval : intervals) {
            minEnd = Math.min(minEnd, interval[1]);
            maxEnd = Math.max(maxEnd, interval[1]);
        }

        int range = maxEnd - minEnd + 1;

        // 2. 统计每个结束时间出现次数
        int[] counts = new int[range];
        for (int[] interval : intervals) {
            counts[interval[1] - minEnd]++;
        }

        // 3. 前缀和，确定每个桶起始位置
        int[] starts = new int[range];
        starts[0] = 0;
        for (int i = 1; i < range; i++) {
            starts[i] = starts[i - 1] + counts[i - 1];
        }

        // 4. 创建临时数组存放排序结果
        int[][] result = new int[n][2];

        // 5. 放入桶
        for (int[] interval : intervals) {
            int idx = interval[1] - minEnd;
            int pos = starts[idx]++;
            result[pos] = interval;
        }

        return result;
    }
}
```

### 效果

15ms 击败 100.00%

TC 第一。

## 为什么可以贪心？

用交换法证明：

假设有一个最优解 OPT，它选出的第一个区间不是结束最早的

假设结束最早的区间是 A，OPT 选的是 B（结束时间更晚）

由于 A 结束早 → 不会比 B 重叠更多区间 → 可以交换 B → A

交换后不影响后续选择

这样每次都可以把最优解调整成 按结束时间升序选择区间

所以贪心选择结束时间最早的区间 一定能得到最大数量的不重叠区间

# 参考资料