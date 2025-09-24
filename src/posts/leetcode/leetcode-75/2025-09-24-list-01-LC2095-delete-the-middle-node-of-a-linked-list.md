---
title: LC2095. 删除链表的中间节点 delete-the-middle-node-of-a-linked-list
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, list]
published: true
---

# LC2095. 删除链表的中间节点 delete-the-middle-node-of-a-linked-list


给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head 。

长度为 n 链表的中间节点是从头数起第 ⌊n / 2⌋ 个节点（下标从 0 开始），其中 ⌊x⌋ 表示小于或等于 x 的最大整数。

对于 n = 1、2、3、4 和 5 的情况，中间节点的下标分别是 0、1、1、2 和 2 。
 
示例 1：

![1](https://assets.leetcode.com/uploads/2021/11/16/eg1drawio.png)

输入：head = [1,3,4,7,1,2,6]
输出：[1,3,4,1,2,6]
解释：
上图表示给出的链表。节点的下标分别标注在每个节点的下方。
由于 n = 7 ，值为 7 的节点 3 是中间节点，用红色标注。
返回结果为移除节点后的新链表。 

示例 2：

![2](https://assets.leetcode.com/uploads/2021/11/16/eg2drawio.png)

输入：head = [1,2,3,4]
输出：[1,2,4]
解释：
上图表示给出的链表。
对于 n = 4 ，值为 3 的节点 2 是中间节点，用红色标注。

示例 3：

![2](https://assets.leetcode.com/uploads/2021/11/16/eg3drawio.png)

输入：head = [2,1]
输出：[2]
解释：
上图表示给出的链表。
对于 n = 2 ，值为 1 的节点 1 是中间节点，用红色标注。
值为 2 的节点 0 是移除节点 1 后剩下的唯一一个节点。
 

提示：

链表中节点的数目在范围 [1, 10^5] 内

1 <= Node.val <= 10^5

 
# v1-快慢指针

## 思路

### 找到中间节点

针对这种找中点的链表，最简单的思路是从头到尾遍历，计算出总长度，然后再计算一半的大小，从头到尾再找一次。

比较推荐的方法是快慢指针。

快指针一次走2步，慢指针走一步。

这样，快指针到头时，慢指针就在中间位置。

### 删除中间节点

删除的时候，需要考虑一些边界场景

```
pre-middle-next #1
pre-middle #2
middle-next #3
middle #4
```

其实可以简化为2个场景

1）middle 没有 pre。直接返回 middle.next 作为结果

2）middle 有 pre。`pre.next = middle.next;` 移除 middle，然后返回以前的 head 即可

## 实现

```java
    public ListNode deleteMiddle(ListNode head) {
        ListNode tempHead = head;

        // 开始迭代
        ListNode fast = head;
        ListNode slow = head;
        ListNode slowPre = null;
        while(fast != null) {
            fast = fast.next;
            if(fast == null) {
                break;
            }

            // 快走2步
            fast = fast.next;
            // 慢节点走一步，同时记录慢节点的 pre
            slowPre = slow;
            slow = slow.next;
        }   

        // slow 就是中点
        //1. 没有 pre 前，直接返回 slow.next
        if(slowPre == null) {
            return slow.next;
        }

        // 移除 middle
        ListNode next = slow.next;
        slowPre.next = next;

        // 返回新的头
        return tempHead;        
    }
```

## 效果

3ms 击败 100.00%

## 反思

快慢指针是链表中的常用技巧，值得掌握。

# 参考资料