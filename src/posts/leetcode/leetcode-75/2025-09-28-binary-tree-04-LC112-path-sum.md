---
title: LC112. 路径总和 path-sum
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC112. 路径总和 path-sum

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。

判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。

如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。

示例 1：

![1](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。


示例 2：

![2](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4
不存在 sum = 5 的根节点到叶子节点的路径。

示例 3：

输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。
 

提示：

树中节点的数目在范围 [0, 5000] 内
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000


# v1-DFS

## 思路

1) 路径要求限制

必须从根开始。所以入口是固定的，就是 root。

必须到叶子结束。所以你不能中途停下来，必须走到一个没有子节点的位置。

2) 每走一步的思路

当你走到一个节点时，减掉当前值即可（targetSum - node.val）。

然后问题就变成了：在这个节点的左子树或右子树中，是否存在一条符合“剩余和”的路径？

3) 递归的分解

当前节点如果是叶子节点，那就直接检查剩余值是否正好等于它的值。

如果不是叶子，就把问题丢给左右子树去做。

## 实现

代码并不复杂

```java
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if(root == null) {
            return false;
        }   
        // 当前节点是否为叶子
        if(root.left == null && root.right == null) {
            return targetSum == root.val;
        }

        // 递归处理
        // 左右子树任何一边满足即可
        int remain = targetSum - root.val;
        return hasPathSum(root.left, remain) || hasPathSum(root.right, remain);
    }
```

## 效果

0ms 100%

## 复杂度

时间复杂度：O(n)，其中 n 是二叉树的节点数。

空间复杂度：O(h)，h 为树的高度（最坏 O(n)，平均 O(log n)）

## 反思

这一题是这个路径累加和的基础，我们可以在这个基础上拓展一下，好好学一下这个系列。



# 参考资料