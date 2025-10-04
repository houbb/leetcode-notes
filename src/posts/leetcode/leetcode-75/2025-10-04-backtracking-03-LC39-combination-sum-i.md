---
title: LC39. 组合总和 combination-sum
date: 2025-10-04
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, backtracking]
published: true
---

# LC39. 组合总和 combination-sum


给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

示例 1：

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
示例 2：

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
示例 3：

输入: candidates = [2], target = 1
输出: []
 

提示：

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
candidates 的所有元素 互不相同
1 <= target <= 40

# v1-backtrack

## 思路

组合的问题，直接上回溯。

1) 排列与组合

我们用一个 boolean 数组，记录一个数字是否被使用过。

组合和排列的区别在于，组合要求 [1,2,4] 和 [1,4,2] 是相同的，所以需要额外引入一个 start 下标，每次只往后递增。

排列可以每次都从头开始。

2）数字可重复

可以重复就是 start 可以从当前 i 位置继续用。

不可重复，start = i+1

3) 剪枝

剪枝可选，这题用例不多。

## 实现

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();

        backtrack(res, candidates, new ArrayList<>(), 0, target);
        return res;
    }

    private void backtrack(List<List<Integer>> res, int[] candidates, List<Integer> path, int start, int remain){
        // 剪枝 都是正整数
        if(remain < 0) {
            return;
        }

        // 满足
        if(remain == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        int n = candidates.length;
        for(int i = start; i < n; i++) {
            // 尝试
            int num = candidates[i];
            path.add(num);

            // 递归 i 不变，可以重复取
            backtrack(res, candidates, path, i, remain - num);

            // 回溯
            path.remove(path.size()-1);
        }
    }   

}
```

## 效果 

2ms 击败 91.54%

## 反思

如何更快呢？

太骚气了，看了 top1 竟然再打 list 本身的主意。自己实现一个 list。



# 参考资料