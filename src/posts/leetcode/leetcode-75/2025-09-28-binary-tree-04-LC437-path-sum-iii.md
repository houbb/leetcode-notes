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

如果我们想进一步解决这个问题，就需要用到另一个技巧。

思考的过程也很重要：

### 慢在哪里

对每个节点都做一次 DFS，看看从它出发能不能找到和为 targetSum 的路径。

这样做其实在 重复计算：

比如一条路径 [10 → 5 → -3 → 3]，里面的很多子路径会被重复遍历。

所以瓶颈是：我们没有办法快速知道某一段路径的和是否等于 targetSum。

### 前缀和

这个和 [LC560. 和为 k 的子数组](https://houbb.github.io/leetcode-notes/posts/leetcode/history1/2020-06-06-algorithm-020-leetcode-56-prefix-sum-560-subarray-sum-equals-k.html) 非常类似。

我们把思想迁移到树：

树的路径 = 从 某个祖先节点到当前节点的一条链。其实和「数组的子数组」非常像，只不过树不是线性结构。

1）前缀和

currSum = 从根到当前节点的路径和

prevSum = 从根到某个祖先节点的路径和

如果从 祖先节点之后 到 当前节点 的这段路径和是 targetSum：

```java
currSum − prevSum = targetSum
```

改写一下 

```
prevSum = currSum - targetSum;
```

2）次数

遍历树的时候，随时记录所有可能的 prevSum（放到哈希表里）。

到某个节点时，检查 `currSum - targetSum` 是否存在。

有多少次出现，就有多少条路径。

## 实现

说了一堆，我们来看下实现

```java
class Solution {
    
    private int count = 0;

    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefixSumMap = new HashMap<>();
        prefixSumMap.put(0L, 1); // 空路径前缀和为 0
        dfs(root, 0L, (long) targetSum, prefixSumMap);
        return count;
    }

    private void dfs(TreeNode node, long currSum, long targetSum, Map<Long, Integer> prefixSumMap) {
        if(node == null) {
            return;
        }   

        // 加上当前值
        currSum += node.val;    

        // 查找从某个前缀节点到当前节点的路径是否等于 targetSum
        count += prefixSumMap.getOrDefault(currSum - targetSum, 0);

        // 更新 currSum 前缀和的 map+1
        prefixSumMap.put(currSum, prefixSumMap.getOrDefault(currSum, 0) + 1);

        // 递归左右子树
        dfs(node.left, currSum, targetSum, prefixSumMap);
        dfs(node.right, currSum, targetSum, prefixSumMap);

        // 更新 currSum 前缀和的 map -1
        prefixSumMap.put(currSum, prefixSumMap.get(currSum) - 1);
    }

}
```

1) 为什么 `prefixSumMap.put(0L, 1); // 空路径前缀和为 0`?

这个是为了统计从根路径开始的位置。

比如

```
   5
  / \
 3   2
```

targetSum = 5，那么在 root 节点的时候，其实已经满足了。

如果不初始化 {0, 1}，会导致这个场景的缺失。

## 效果

4ms 击败 58.47%

## 复杂度

TC: DFS 遍历每个节点一次，O(n)

MC: 最坏情况退化成链表，递归栈 O(n)

# v4-数组模拟 HashMap

## 思路

当卷到 v3 发现还不是最优的时候，那么大概率就是要考虑数组替代 HashMap。

看一下题目是否适合用：

```
二叉树的节点个数的范围是 [0,1000]
-10^9 <= Node.val <= 10^9 
-1000 <= targetSum <= 1000 
```

最大的问题在于前缀和非常大，所以无法直接用简单的数字实现。

我们可以自己手写简易版 HashMap。

这个是排名1的代码，我们来学习一下。

甚至是 BST，略有一点炫技，也是对数据结构深入理解的体现。

## 实现

```java
class Solution {
    private static final int CAPACITY = 1 << 10;

    private final Node[] table = new Node[CAPACITY];
    private int answer;

    public int pathSum(TreeNode root, int target) {
        incr(table, 0, 1);
        helper(root, target, 0);
        return answer;
    }

    private void helper(TreeNode root, int target, long prefix) {
        if (root == null) {
            return;
        }
        prefix += root.val;
        answer += get(table, prefix - target);
        incr(table, prefix, 1);
        helper(root.left, target, prefix);
        helper(root.right, target, prefix);
        incr(table, prefix, -1);
    }

    // 将哈希表 table 中 key 对应的值 + delta
    private void incr(Node[] table, long key, int delta) {
        int hash = Long.hashCode(key) & (CAPACITY - 1);
        Node node = table[hash];
        Node parent = null;
        while (node != null) {
            if (node.key == key) {
                node.val += delta;
                return;
            }
            parent = node;
            if (node.key > key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        if (parent == null) {
            table[hash] = new Node(key, delta);
        } else if (parent.key > key) {
            parent.left = new Node(key, delta);
        } else {
            parent.right = new Node(key, delta);
        }
    }

    // 获取哈希表 table 中 key 对应的 val
    private int get(Node[] table, long key) {
        int hash = Long.hashCode(key) & (CAPACITY - 1);
        Node node = table[hash];
        while (node != null) {
            if (node.key == key) {
                return node.val;
            }
            if (node.key > key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return 0;
    }

    private static class Node {
        private final long key;
        private int val;
        private Node left;
        private Node right;

        private Node(long key, int val) {
            this.key = key;
            this.val = val;
        }
    }
}
```

## 反思

追根到底，如果我们有一题想达到这个高度，底层的实现原理还是无法绕过的。

# 参考资料