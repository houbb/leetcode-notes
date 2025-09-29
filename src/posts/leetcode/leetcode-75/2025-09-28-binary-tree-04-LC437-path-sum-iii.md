---
title: LC437. 路径总和 III path-sum-iii
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-tree]
published: true
---

# LC437. 路径总和 III path-sum-iii

给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

示例 1：

输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和等于 8 的路径有 3 条，如图所示。
示例 2：

输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
 

提示:

二叉树的节点个数的范围是 [0,1000]
-10^9 <= Node.val <= 10^9 
-1000 <= targetSum <= 1000 


# v1-DFS

## 思路

我们先回顾一下 LC113，二者是非常类似的。

区别是我们需要找到所有的开始位置，同时结束位置也不要求一定是叶子节点。

## 实现

我们可以在 LC113 的基础上修改一下。

我们可以尝试所有的节点作为开始，并且所有的节点都只有等于都算满足

```java
    public int pathSum(TreeNode root, int targetSum) {
        // 任意位置位置，如何找到任意位置？
        List<List<Integer>> res = new ArrayList<>();
        traverseTree(res, root, targetSum);
        return res.size();
    }

    private void traverseTree(List<List<Integer>> res, TreeNode root, int targetSum) {
        if(root == null) {
            return;
        }

        dfs(res, new ArrayList<>(), root, targetSum);
        traverseTree(res, root.left, targetSum);
        traverseTree(res, root.right, targetSum);
    }

    private void dfs(List<List<Integer>> res, List<Integer> tempList, TreeNode root, int targetSum) {
        if(root == null) {
            return;
        }   

        // 添加
        tempList.add(root.val);

        // 任意节点
        if(targetSum == root.val) {
            res.add(new ArrayList<>(tempList));
        } 

        // 无论当前节点是否满足，都继续递归左右子树
        dfs(res, tempList, root.left, targetSum - root.val);
        dfs(res, tempList, root.right, targetSum - root.val);

        //backtrack
        tempList.remove(tempList.size()-1);
    }
```

## 效果

超出内存限制

116 / 130 个通过的测试用例

## 复杂度

时间复杂度：O(n^2) 最坏情况 n 是节点数 每条根到叶子路径可能有 O(n) 个节点，要复制到结果集

空间复杂度：O(n)

## 反思

当然了，题目没有要求所有的路径信息，我们只需要一个 count 变量就行。

# v2-通过 int 替代

## 思路

我们移除掉所有的 list，因为不需要

其他基本不变

## 实现

```java
class Solution {
    
    private int count = 0;

    public int pathSum(TreeNode root, int targetSum) {
        // 任意位置位置，如何找到任意位置？
        traverseTree(root, targetSum);
        return count;
    }

    private void traverseTree(TreeNode root, int targetSum) {
        if(root == null) {
            return;
        }

        dfs(root, targetSum);
        traverseTree(root.left, targetSum);
        traverseTree(root.right, targetSum);
    }

    private void dfs(TreeNode root, int targetSum) {
        if(root == null) {
            return;
        }   
        
        if(targetSum == root.val) {
            count++;
        } 

        // 无论当前节点是否满足，都继续递归左右子树
        dfs(root.left, targetSum - root.val);
        dfs(root.right, targetSum - root.val);
    }

}
```

## 效果

解答错误 129 / 130 个通过的测试用例

输入

```
root =[1000000000,1000000000,null,294967296,null,1000000000,null,1000000000,null,1000000000]
targetSum =0
```

输出 2

预期结果 0

## 反思

只能说看到 294967296 这个值的时候，可以体会到用例的恶意。

也就是需要对应的类型兼容。

## 修正

```java
    private int count = 0;

    public int pathSum(TreeNode root, int targetSum) {
        // 任意位置位置，如何找到任意位置？
        traverseTree(root, targetSum);
        return count;
    }

    private void traverseTree(TreeNode root, long targetSum) {
        if(root == null) {
            return;
        }

        dfs(root, targetSum);
        traverseTree(root.left, targetSum);
        traverseTree(root.right, targetSum);
    }

    private void dfs(TreeNode root, long targetSum) {
        if(root == null) {
            return;
        }   

        if(targetSum == root.val) {
            count++;
        } 

        // 无论当前节点是否满足，都继续递归左右子树
        dfs(root.left, targetSum - root.val);
        dfs(root.right, targetSum - root.val);
    }
```

## 效果

19ms 击败 38.86%

## 反思

到这里，这一题只能算是一道中等题。

但是要想性能进一步提升，就需要动一下脑筋了。

如何提升性能呢？

# v3-前缀和

## 思路

todo...

如何实现呢？

# 参考资料