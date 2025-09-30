---
title: LC236. 二叉树的最近公共祖先 lowest-common-ancestor-of-a-binary-tree
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC236. 二叉树的最近公共祖先 lowest-common-ancestor-of-a-binary-tree

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

示例 1：

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。

示例 2：

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。

示例 3：

输入：root = [1,2], p = 1, q = 2
输出：1
 

提示：

树中节点数目在范围 [2, 10^5] 内。
-10^9 <= Node.val <= 10^9
所有 Node.val 互不相同 。
p != q
p 和 q 均存在于给定的二叉树中。

# v1-dfs

## 几个场景

### 1. 两个节点在不同子树（最常见情况）

```
      A
     / \
    B   C
   /     \
  p       q
```

* 目标节点：p 和 q
* 最近公共祖先 LCA：A
* 解释：p 在左子树，q 在右子树 → 它们第一次汇合在根节点 A。

### 2. 一个节点是另一个节点的祖先

```
      A
     /
    p
     \
      q
```

* 目标节点：p 和 q
* 最近公共祖先 LCA：p
* 解释：p 本身就是 q 的祖先 → LCA 是 p。

### 3. 两个节点在同一子树

```
      A
     /
    B
   / \
  p   q
```

* 目标节点：p 和 q
* 最近公共祖先 LCA：B
* 解释：p 和 q 都在 B 的子树 → 第一次汇合在 B。

### 4. 目标节点就是根

```
      p
     / \
    B   C
         \
          q
```

* 目标节点：p 和 q
* 最近公共祖先 LCA：p
* 解释：根节点就是其中一个目标 → 根本身就是 LCA。

### 5. 目标节点在左右深度不同

```
      A
     / \
    B   C
       / \
      D   q
     /
    p
```

* 目标节点：p 和 q
* 最近公共祖先 LCA：C
* 解释：p 在 C 的左子树，q 在 C 的右子树 → 第一次汇合在 C。

## LCA 定义

对于两个节点 `p` 和 `q`，LCA 是 同时包含它们的最深的那个节点。

换句话说，从 `p` 和 `q` 往上走，路径第一次交汇的地方就是 LCA。

## 递归思路

### 转化

递归核心问题：

“在一棵子树里，能不能找到 `p` 和 `q`？如果能，返回什么？”

函数的定义是：

```java
TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)
```

返回值的语义：

* 如果子树里包含 `p` 或 `q`，返回找到的那个节点（或者子树内部已经找到的 LCA）。
* 如果子树里既没有 `p` 也没有 `q`，返回 `null`。

1) 基本情况（递归出口）

如果 `root == null`：子树为空 → 返回 `null`。

如果 `root == p || root == q`：找到目标节点之一 → 返回 root 作为“信号”。

2) 递归拆解

去左子树找 → `left = dfs(root.left, p, q)`

去右子树找 → `right = dfs(root.right, p, q)`

3) 合并结果（关键逻辑）

左右都非空：说明 `p` 在左边，`q` 在右边（或者反过来）。那么当前节点就是它们的最近公共祖先 → 返回 `root`。

只有一边非空：说明两个目标都在同一边，LCA 已经在子树里找到了 → 把非空的结果直接传上去。

两边都空：说明这一层子树里啥也没有 → 返回 `null`。

## 实现

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) {
        return root;
    }

    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);

    if (left != null && right != null) {
        return root;
    }

    return left != null ? left : right;
}
```

## 效果

8ms 击败 26.82%

## 反思

这么慢？离谱了点。

发现这个用例的区分度不大。也就是 2ms 的差别。

# v2-全局变量改进

## 思路

递归的剪枝，可以进一步提升性能。

我们可以定义一个全局变量，保存结果。

## 实现

```java
class Solution {
    private TreeNode ans = null;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        dfs(root, p, q);
        return ans;
    }

    private boolean dfs(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null || ans != null) return false; // 已经找到 LCA，快速返回

        boolean left = dfs(node.left, p, q);
        boolean right = dfs(node.right, p, q);
        boolean mid = (node == p || node == q);

        int count = (mid ? 1 : 0) + (left ? 1 : 0) + (right ? 1 : 0);

        if (count >= 2 && ans == null) {
            ans = node; // 找到 LCA
            return true; // 可以直接返回
        }

        return mid || left || right;
    }
}
```

## 效果

7ms 击败 99.85%

## 反思

不过个人还是喜欢 v1 的解法。

# 参考资料