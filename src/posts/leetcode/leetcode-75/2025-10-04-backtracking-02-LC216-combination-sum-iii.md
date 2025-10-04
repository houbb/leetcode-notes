---
title: LC216. 组合总和 III combination-sum-iii
date: 2025-10-04
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, backtracking]
published: true
---

# LC216. 组合总和 III combination-sum-iii

找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：

只使用数字1到9

每个数字 最多使用一次 

返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。

示例 1:

输入: k = 3, n = 7
输出: [[1,2,4]]
解释:
1 + 2 + 4 = 7
没有其他符合的组合了。
示例 2:

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]
解释:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
没有其他符合的组合了。
示例 3:

输入: k = 4, n = 1
输出: []
解释: 不存在有效的组合。
在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是1+2+3+4 = 10，因为10 > 1，没有有效的组合。
 

提示:

2 <= k <= 9
1 <= n <= 60


# v1-backtrack

## 思路

组合的问题，直接上回溯。

我们用一个 boolean 数组，记录一个数字是否被使用过。

组合和排列的区别在于，组合要求 [1,2,4] 和 [1,4,2] 是相同的，所以需要额外引入一个 start 下标，每次只往后递增。

排列可以每次都从头开始。

剪枝可选，这题用例不多。

## 实现

```java
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        boolean[] visited = new boolean[10];

        backtrack(res, new ArrayList<>(), k, n, visited, 1);

        return res;
    }

    private void backtrack(List<List<Integer>> res, List<Integer> path, int k, int targetSum, boolean[] visited, int start) {
        // 剪枝
        if(targetSum < 0) {
            return;
        }

        // 满足
        if(path.size() == k && targetSum == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 全部的可能
        for(int i = start; i <= 9; i++) {
            if(visited[i]) {
                continue;
            }

            // 尝试
            visited[i] = true;
            path.add(i);

            // 递归
            backtrack(res, path, k, targetSum - i, visited, i+1);

            // 回溯 
            visited[i] = false;
            path.remove(path.size()-1);
        }
    }

}
```


## 效果 

0ms 100%

## 反思

我们来一起看一下相关的几个题目。


# v2-简化

## 思路

仔细思考一下，visited 数组也不用。

start 让数字天然只会用一次。

## 实现

```java
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), k, n, 1);

        return res;
    }

    private void backtrack(List<List<Integer>> res, List<Integer> path, int k, int targetSum, int start) {
        // 剪枝
        if(targetSum < 0) {
            return;
        }

        // 满足
        if(path.size() == k && targetSum == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 全部的可能
        for(int i = start; i <= 9; i++) {
            // 尝试
            path.add(i);

            // 递归 i+1，数字不能重复用
            backtrack(res, path, k, targetSum - i, i+1);

            // 回溯 
            path.remove(path.size()-1);
        }
    }

}
```

## 效果 

0ms 100%

## 反思

还是尽可能的简洁

# 参考资料