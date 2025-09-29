---
title: LC113. 路径总和 II path-sum-ii
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC113. 路径总和 II path-sum-ii

给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

叶子节点 是指没有子节点的节点。

示例 1：

输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
示例 2：


输入：root = [1,2,3], targetSum = 5
输出：[]
示例 3：

输入：root = [1,2], targetSum = 0
输出：[]
 

提示：

树中节点总数在范围 [0, 5000] 内
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000

# v1-DFS

## 思路

我们先回顾一下 LC112，二者是非常类似的。

但是不同的是我们需要记录所有的路径，可以用 list 来实现。

### 递归分解

从根节点开始：

先把当前节点加入路径

剩余和 = targetSum - node.val

递归左右子树

回溯（移除当前节点）

### 为什么要回溯？

遇到叶子节点就收集路径，递归返回后撤销选择，保证上一条路径不受影响。

## 实现

```java
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> tempList = new ArrayList<>();
        dfs(res, tempList, root, targetSum);
        return res;
    }

    private void dfs(List<List<Integer>> res, List<Integer> tempList, TreeNode root, int targetSum) {
        if(root == null) {
            return;
        }   

        // 添加
        tempList.add(root.val);

        // 当前节点是否为叶子 && 满足条件
        if(root.left == null && root.right == null && targetSum == root.val) {
            res.add(new ArrayList<>(tempList));
        } else {
            // 左右子树递归
            dfs(res, tempList, root.left, targetSum-root.val);
            dfs(res, tempList, root.right, targetSum-root.val);
        }

        tempList.remove(tempList.size()-1);
    }
```

## 效果

1ms 99.98%

## 复杂度

时间复杂度：O(n^2) 最坏情况 n 是节点数 每条根到叶子路径可能有 O(n) 个节点，要复制到结果集

空间复杂度：O(n)

## 反思

这一题是这个路径和 III 的基础，我们来继续看一下路径和。

# 参考资料