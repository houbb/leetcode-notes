---
title: LC104. 二叉树的最大深度 maximum-depth-of-binary-tree
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC104. 二叉树的最大深度 maximum-depth-of-binary-tree

给定一个二叉树 root ，返回其最大深度。

二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

![1](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

示例 1：

输入：root = [3,9,20,null,null,15,7]
输出：3
示例 2：

输入：root = [1,null,2]
输出：2

提示：

树中节点的数量在 [0, 10^4] 区间内。
-100 <= Node.val <= 100

# v1-递归

## 思路

树用递归解决一般是最简单的。

我们其实只需要对比左、右节点的最大高度，最后的结果就是二者中的最大值+1

## 实现

```java
    public int maxDepth(TreeNode root) {
        if(root == null) {
            return 0;
        }

        int left = maxDepth(root.left);
        int right = maxDepth(root.right);

        return Math.max(left, right) + 1;
    }
```

## 效果

0ms 100%

## 反思

发现自己做二叉树还是没有深入理解，只是凭直觉在解题。

还没有真正的入门。

# 参考资料