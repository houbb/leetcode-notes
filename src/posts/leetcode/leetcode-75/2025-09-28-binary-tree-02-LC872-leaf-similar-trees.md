---
title: LC872. 叶子相似的树 leaf-similar-trees
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC872. 叶子相似的树 leaf-similar-trees

请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。



举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。

如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。

如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。

示例 1：

![1](https://assets.leetcode.com/uploads/2020/09/03/leaf-similar-1.jpg)

输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
输出：true


示例 2：

![2](https://assets.leetcode.com/uploads/2020/09/03/leaf-similar-2.jpg)

输入：root1 = [1,2,3], root2 = [1,3,2]
输出：false
 

提示：

给定的两棵树结点数在 [1, 200] 范围内
给定的两棵树上的值在 [0, 200] 范围内



# v1-递归+列表

## 思路

这一题的基础是树的遍历。

在遍历的基础之上，我们需要搞清楚什么是叶子？

一个节点不是 null，且左右子节点都是空，那么他就是叶子节点。

遍历获取到两棵树的叶子节点，然后对比即可。

## 实现

```java
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> list1 = new ArrayList<>();    
        List<Integer> list2 = new ArrayList<>();  
        traverse(root1, list1);
        traverse(root2, list2);  

        return list1.toString().equals(list2.toString());
    }

    // 遍历找到叶子
    private void traverse(TreeNode root, List<Integer> list) {
        if(root == null) {
            return;
        }

        TreeNode left = root.left;
        TreeNode right = root.right;
        if(left == null && right == null) {
            list.add(root.val);
        }

        // 递归
        traverse(root.left, list);
        traverse(root.right, list);
    }
```

## 效果

1ms 击败 13.35%

## 反思

如何可以更快?

### 优化对比方法

```java
public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> list1 = new ArrayList<>();    
        List<Integer> list2 = new ArrayList<>();  
        traverse(root1, list1);
        traverse(root2, list2);  

        if(list1.size() != list2.size()) {
            return false;
        }
        for(int i = 0; i < list1.size(); i++) {
            if(!list1.get(i).equals(list2.get(i))) {
                return false;
            }
        }
        return true;
}
```

### 效果

0ms 100%

当然，这一题的测试用例还是太温柔了。

# v2-性能优化

## 思路

用数组替代 List

## 实现

```java
public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        int[] list1 = new int[200];    
        int[] list2 = new int[200];  
        traverse(root1, list1, 0);
        traverse(root2, list2, 0);  

        for(int i = 0; i < 200; i++) {
            if(list1[i] != list2[i]) {
                return false;
            }
        }
        return true;
    }

    // 遍历找到叶子
    private int traverse(TreeNode root, int[] list, int ix) {
        if(root == null) {
            return ix;
        }

        TreeNode left = root.left;
        TreeNode right = root.right;
        if(left == null && right == null) {
            list[ix++] = root.val;
        }

        // 递归
        ix = traverse(root.left, list, ix);
        ix = traverse(root.right, list, ix);

        return ix;
    }

    // 遍历找到叶子
    private void traverse(TreeNode root, List<Integer> list) {
        if(root == null) {
            return;
        }

        TreeNode left = root.left;
        TreeNode right = root.right;
        if(left == null && right == null) {
            list.add(root.val);
        }

        // 递归
        traverse(root.left, list);
        traverse(root.right, list);
    }

```

# 参考资料