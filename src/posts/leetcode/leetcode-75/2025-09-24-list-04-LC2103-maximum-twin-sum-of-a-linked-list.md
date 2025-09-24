---
title: LC2130. 链表最大孪生和 maximum-twin-sum-of-a-linked-list
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, list]
published: true
---

# LC2130. 链表最大孪生和 maximum-twin-sum-of-a-linked-list

在一个大小为 n 且 n 为 偶数 的链表中，对于 `0 <= i <= (n / 2) - 1` 的 i ，第 i 个节点（下标从 0 开始）的孪生节点为第 (n-1-i) 个节点 。

比方说，n = 4 那么节点 0 是节点 3 的孪生节点，节点 1 是节点 2 的孪生节点。这是长度为 n = 4 的链表中所有的孪生节点。
孪生和 定义为一个节点和它孪生节点两者值之和。

给你一个长度为偶数的链表的头节点 head ，请你返回链表的 最大孪生和 。

示例 1：

输入：head = [5,4,2,1]
输出：6
解释：
节点 0 和节点 1 分别是节点 3 和 2 的孪生节点。孪生和都为 6 。
链表中没有其他孪生节点。
所以，链表的最大孪生和是 6 。


示例 2：

输入：head = [4,2,2,3]
输出：7
解释：
链表中的孪生节点为：
- 节点 0 是节点 3 的孪生节点，孪生和为 4 + 3 = 7 。
- 节点 1 是节点 2 的孪生节点，孪生和为 2 + 2 = 4 。
所以，最大孪生和为 max(7, 4) = 7 。


示例 3：

输入：head = [1,100000]
输出：100001
解释：
链表中只有一对孪生节点，孪生和为 1 + 100000 = 100001 。
 

提示：

链表的节点数目是 [2, 10^5] 中的 偶数 。
1 <= Node.val <= 10^5


# v1-借用 list

## 思路

通过 list 一次遍历，存储所有的 val 值。

然后直接根据找到满足条件的最大值。

不算难。

## 实现

```java
    public int pairSum(ListNode head) {
        List<Integer> list = new ArrayList<>();

        while(head != null) {
            list.add(head.val);
            head = head.next;
        }

        // 对比 pair
        int max = 0;
        int left = 0;
        int right = list.size()-1;

        while(left < right) {
            max = Math.max(max, list.get(left) + list.get(right));
            left++;
            right--;
        }

        return max;
    }
```

## 效果

12ms 击败 23.77%

## 反思

如何更快呢？

可以不借助 list 吗？


# v2-反转

## 思路

前边之所以慢，在于 list 的扩容，和 int 的拆箱、装箱操作。

我们可以避免：

1. 快慢找到中点

2. 反转后半部分

3. 双指针对比

## 实现 

```java
public int pairSum(ListNode head) {
    // 1. 找到中点
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. 反转后半部分
    ListNode prev = null, cur = slow;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }

    // 3. 双指针对比
    int max = 0;
    ListNode left = head, right = prev;
    while (right != null) {
        max = Math.max(max, left.val + right.val);
        left = left.next;
        right = right.next;
    }

    return max;
}
```

## 效果

5ms 77.78%

## 复杂度

时间 O(n)

空间 O(1)

## 反思

这个解法，适合在限制空间使用的时候用。

还能更快吗？

# v3-边找边翻转

## 思路

进一步加速

## 实现

```java
   public int pairSum(ListNode head) {
        ListNode prev = null, curr = head, last = head;
        while (last != null) {
            last = last.next.next;
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }

        int max = 0;
        while (curr != null) {
            max = Math.max(max, prev.val + curr.val);
            prev = prev.next;
            curr = curr.next;
        }
        return max;
    }
```

## 效果

3ms 100%

## 反思

这个翻转的思路还是非常巧妙地。


# 参考资料