---
title: LC1448. 叶子相似的树 count-good-nodes-in-binary-tree
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC1448. 叶子相似的树 count-good-nodes-in-binary-tree


给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。

「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。

示例 1：

![1](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/16/test_sample_1.png)

输入：root = [3,1,4,3,null,1,5]
输出：4
解释：图中蓝色节点为好节点。
根节点 (3) 永远是个好节点。
节点 4 -> (3,4) 是路径中的最大值。
节点 5 -> (3,4,5) 是路径中的最大值。
节点 3 -> (3,1,3) 是路径中的最大值。

示例 2：

![2](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/16/test_sample_2.png)

输入：root = [3,3,null,4,2]
输出：3
解释：节点 2 -> (3, 3, 2) 不是好节点，因为 "3" 比它大。
示例 3：

输入：root = [1]
输出：1
解释：根节点是好节点。
 

提示：

二叉树中节点数目范围是 [1, 10^5] 。
每个节点权值的范围是 [-10^4, 10^4] 。
 


# v1-DFS

## 思路

「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。

我们只需要 dfs，然后维护一个 max 最大值就行。

## 实现

```java
    private int res;

    public int goodNodes(TreeNode root) {
        int max = -10001;
        dfs(root, max);
        return res;
    }

    private void dfs(TreeNode root, int max) {
        if(root == null) {
            return;
        }

        // 比较
        if(root.val >= max) {
            res++;
            max = root.val;
        }

        // 递归左右
        dfs(root.left, max);
        dfs(root.right, max);
    }
```

## 效果

2ms 击败 99.92%

## 反思

可以不用 res 的全局变量吗？


# v2-res 不是全局的写法

## 思路

个人不是很喜欢这种全局的写法，虽然很自然就是了。

## 实现

```java
    public int goodNodes(TreeNode root) {
        int max = -10001;
        return dfs(root, max);
    }

    private int dfs(TreeNode root, int max) {
        if(root == null) {
            return 0;
        }

        // 比较
        int count = 0;
        if(root.val >= max) {
            max = root.val;
            count++;
        }

        // 递归左右
        int left = dfs(root.left, max);
        int right = dfs(root.right, max);
        //左右子树+当前
        return left + right + count;
    }
```

## 效果

2ms 击败 99.92%

# 参考资料