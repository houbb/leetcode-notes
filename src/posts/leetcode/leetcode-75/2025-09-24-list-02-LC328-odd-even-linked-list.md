---
title: LC328. 奇偶链表 odd-even-linked-list
date: 2025-09-24 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, list]
published: true
---

# LC328. 奇偶链表 odd-even-linked-list

给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别分组，保持它们原有的相对顺序，然后把偶数索引节点分组连接到奇数索引节点分组之后，返回重新排序的链表。

第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。

请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。

你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。

示例 1:

输入: head = [1,2,3,4,5]
输出: [1,3,5,2,4]

示例 2:

输入: head = [2,1,3,5,6,4,7]
输出: [2,3,6,7,1,5,4]
 

提示:

n ==  链表中的节点数
0 <= n <= 10^4
-10^6 <= Node.val <= 10^6
 
 
# v1-指针

## 思路

其实只需要2个指针。从指定位置开始，然后每次都移动2步即可。

奇数：从 head 开始

偶数：从 head.next 开始

可以很自然的拆分为两个队列。

最后把二者拼在一起，返回奇数头节点即可。

拼接的话，需要知道奇数的尾巴节点。

## 实现

```java
public ListNode oddEvenList(ListNode head) {
        if(head == null) {
            return null;
        }

        ListNode oddHead = head;           
        ListNode evenHead = head.next;

        // 构建数据
        ListNode cur = head;           
        ListNode oddCur = null;
        ListNode evenCur = null;
        int count = 0;
        while(cur != null) {
            count++;
            ListNode nextNode = cur.next; // 保存下一个节点，避免链表乱
            cur.next = null;              // 断开当前节点旧的链接

            // 偶数
            if(count % 2 == 0) {
                if(evenCur != null) {
                   evenCur.next = cur;
                }                 
                evenCur = cur;
            } else {
                // 奇数
                if(oddCur != null) {
                   oddCur.next = cur;
                }                 
                oddCur = cur;
            }

            //next 
            cur = nextNode;
        }

        // 拼接偶数头到奇数的尾巴，奇数一定存在
        oddCur.next = evenHead;

        // 返回头
        return oddHead;
    }
```

## 效果

0ms 击败 100.00%

## 反思

当然，可以有更加优雅的写法。


# v2-优雅写法

## 思路

复杂度是一样的，看个人喜好。

下面的写法更加优雅一些。

## 实现

```java
public ListNode oddEvenList(ListNode head) {
    if (head == null) return null;

    ListNode odd = head;         // 奇数指针
    ListNode even = head.next;   // 偶数指针
    ListNode evenHead = even;    // 保存偶数头，最后要接上

    while (even != null && even.next != null) {
        odd.next = even.next;   // 奇数指针跨过偶数指针
        odd = odd.next;

        even.next = odd.next;   // 偶数指针跨过奇数指针
        even = even.next;
    }

    // 拼接偶数链表到奇数链表尾部
    odd.next = evenHead;

    return head;
}
```


# 参考资料