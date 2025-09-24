---
title: LC206. 反转链表 reverse-linked-list
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, list]
published: true
---

# LC206. 反转链表 reverse-linked-list

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：


输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]


示例 2：

输入：head = [1,2]
输出：[2,1]

示例 3：

输入：head = []
输出：[]
 

提示：

链表中节点的数目范围是 [0, 5000]
-5000 <= Node.val <= 5000
 

进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？


# 迭代

## 思路

当前节点，获取 next。然后将顺序反过来？

也就是

```
cur.next = pre;
```

最后返回最后一个节点(pre)即可

## 实现

```java
    public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode cur = head;

        while(cur != null) {
            ListNode next = cur.next;

            cur.next = pre;

            // update    
            pre = cur;

            //next
            cur = next;
        }   

        // 返回最后的节点
        return pre; 
    }
```

## 效果

0ms 击败 100.00%

# v2-递归

## 思路

如何通过递归实现？

1) 终止条件

```java
// base case：空链表或只有一个节点
    if (head == null || head.next == null) {
        return head;
    }
```

2) 递归

```java
// 递归反转子链表
ListNode newHead = reverseList(head.next);
```

3) 反转

```java
head.next.next = head; // 例如：2->3 变为 3->2
head.next = null;      // 当前节点变为尾节点，next置空
```

## 解法

```java
public ListNode reverseList(ListNode head) {
    // base case：空链表或只有一个节点
    if (head == null || head.next == null) {
        return head;
    }

    // 递归反转子链表
    ListNode newHead = reverseList(head.next);

    // 反转当前节点
    head.next.next = head; // 例如：2->3 变为 3->2
    head.next = null;      // 当前节点变为尾节点，next置空

    return newHead;        // 返回新头节点
}
```

## 效果

0ms 击败 100.00%

## 反思

二者本质上是一样的。

看个人喜好。

# 参考资料