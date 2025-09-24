---
title: LC933. 最近的请求次数 number-of-recent-calls
date: 2025-09-19 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC933. 最近的请求次数 number-of-recent-calls

写一个 RecentCounter 类来计算特定时间范围内最近的请求。

请你实现 RecentCounter 类：

RecentCounter() 初始化计数器，请求数为 0 。

int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。

确切地说，返回在 [t-3000, t] 内发生的请求数。

保证 每次对 ping 的调用都使用比之前更大的 t 值。

示例 1：

```
输入：
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
输出：
[null, 1, 2, 3, 3]

解释：
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
``` 

提示：

1 <= t <= 10^9

保证每次对 ping 调用所使用的 t 值都 严格递增

至多调用 ping 方法 10^4 次
 
# v1-queue

## 思路

直接队列头部的时间和当前时间对比，如果超过 3000 丢弃即可。

返回整体的 size

## 实现

```java
class RecentCounter {

    private Queue<Integer> queue;

    public RecentCounter() {
        queue = new LinkedList<>();
    }
    
    public int ping(int t) {
        while(!queue.isEmpty()) {
            Integer first = queue.peek();
            if(t - first > 3000) {
                queue.remove();
            } else {
                break;
            }
        }      

        // 放入当前位置
        queue.add(t);

        return queue.size();
    }

}
```

## 效果

32ms 击败 11.64%

## 反思

如何才能更快？

# v2-ArrayDeque

## 思路

我们换一种数据结构试一下。

LinkedList 是双向链表，节点分配和内存分散，缓存局部性差。

改成 ArrayDeque，性能会更好，因为它是基于数组实现的。

## 实现

```java
class RecentCounter {

    private Queue<Integer> queue;

    public RecentCounter() {
        queue = new ArrayDeque<>();
    }
    
    public int ping(int t) {
        while(!queue.isEmpty()) {
            Integer first = queue.peek();
            if(t - first > 3000) {
                queue.remove();
            } else {
                break;
            }
        }      

        // 放入当前位置
        queue.add(t);

        return queue.size();
    }

}
```

## 效果

21ms 击败 60.37%

# v3-数组

## 思路

看一下题目，数组要多长呢？

至多调用 ping 方法 10^4 次

也就是1万的数组就可以满足，好处可以避免集合的额外开销，以及 int 的装箱+拆箱。

## 实现

```java
class RecentCounter {

    private int[] queue;

    private int headPos;

    private int curPos;

    public RecentCounter() {
        queue = new int[10000];
        curPos = 0;
        headPos = 0;
    }
    
    public int ping(int t) {
        while(headPos < curPos) {
            int first = queue[headPos];
            if(t - first > 3000) {
                // remove
                headPos++;
            } else {
                break;
            }
        }      

        // 添加
        queue[curPos++] = t;

        return curPos - headPos;
    }

}
```

## 效果

19ms 超过 97.38%

# 参考资料