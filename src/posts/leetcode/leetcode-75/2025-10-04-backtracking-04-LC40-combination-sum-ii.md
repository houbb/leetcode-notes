---
title: LC40. 组合总和 II combination-sum-ii
date: 2025-10-04
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, backtracking]
published: true
---

# LC40. 组合总和 II combination-sum-ii

给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用 一次 。

注意：解集不能包含重复的组合。 

示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
 

提示:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30


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
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
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

            // 递归 i+1，不可以重复取
            backtrack(res, candidates, path, i+1, remain - num);

            // 回溯
            path.remove(path.size()-1);
        }
    }   

}
```

## 效果 

CASE 1 都过去不：

```
输入
candidates =[10,1,2,7,6,1,5]
target =8
输出[[1,2,5],[1,7],[1,6,1],[2,6],[2,1,5],[7,1]]
预期结果[[1,1,6],[1,2,5],[1,7],[2,6]]
```

## 反思

为什么呢？

这一题其实存在陷阱。不同于 LC39 和 LC216 的待选集合元素不同。

我们这样直接处理，会导致不同位置相同的数，被重复选择。

## 排序+去重

### 思路

为了解决这个问题，最好的方式就是排序。

处理时同一层跳过重复元素。

### 实现

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        // sort
        Arrays.sort(candidates);
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
            // 跳过同一层相同元素
            if(i > start && candidates[i] == candidates[i-1]) {
                continue;
            }

            // 尝试
            int num = candidates[i];
            path.add(num);  

            // 递归 i+1，不可以重复取
            backtrack(res, candidates, path, i+1, remain - num);

            // 回溯
            path.remove(path.size()-1);
        }
    }   

}
```

### 效果

5ms 击败 26.14%

### 反思

为什么这个慢？

## 优化1-剪枝

### 思路

我们已经做了数组的排序。

那么就没有如果当前的 num > remain，实际上后续就没必要继续了。

### 实现

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        // sort
        Arrays.sort(candidates);
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
            // 跳过同一层相同元素
            if(i > start && candidates[i] == candidates[i-1]) {
                continue;
            }

            // 剪枝2：排序后，后面数字更大，直接 break
            if(candidates[i] > remain) break;

            // 尝试
            int num = candidates[i];
            path.add(num);  

            // 递归 i+1，不可以重复取
            backtrack(res, candidates, path, i+1, remain - num);

            // 回溯
            path.remove(path.size()-1);
        }
    }   

}
```

### 效果

3ms 击败 72.83%

### 反思

有些提升，但是依然不是最优。

# v2-优化 path

## 思考

LC40 比较有趣，LC39 和 LC216 没有人卷解法，这一题大家在卷解法。

思路可以有几种:

1) 剪枝，减少计算

2）重写 ArrayList

3) 简化 path, 避免 list

我们尝试第 3 种

## 实现

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        // sort
        Arrays.sort(candidates);

        int[] path = new int[100];
        int pIx = 0;

        backtrack(res, candidates, path, pIx, 0, target);
        return res;
    }

    private void backtrack(List<List<Integer>> res, int[] candidates, int[] path, int pIx, int start, int remain){
        // 剪枝 都是正整数
        if(remain < 0) {
            return;
        }

        // 满足
        if(remain == 0) {
            // 自己累加
            List<Integer> list = new ArrayList<>(pIx);
            for(int i = 0; i < pIx; i++) {
                list.add(path[i]);
            }

            res.add(list);
            return;
        }

        int n = candidates.length;
        for(int i = start; i < n; i++) {
            // 跳过同一层相同元素
            if(i > start && candidates[i] == candidates[i-1]) {
                continue;
            }

            // 剪枝2：排序后，后面数字更大，直接 break
            if(candidates[i] > remain) break;

            // 尝试
            int num = candidates[i];
            path[pIx] = num;  

            // 递归 i+1，不可以重复取
            backtrack(res, candidates, path, pIx+1, i+1, remain - num);

            // 回溯
        }
    }   

}
```

## 效果

3ms 击败 72.83%

变化不大。






# 参考资料