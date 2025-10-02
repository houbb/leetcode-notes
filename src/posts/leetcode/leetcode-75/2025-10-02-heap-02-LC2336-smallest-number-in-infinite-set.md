---
title: LC2336. 无限集中的最小数字 smallest-number-in-infinite-set
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, heap]
published: true
---

# LC2336. 无限集中的最小数字 smallest-number-in-infinite-set

现有一个包含所有正整数的集合 [1, 2, 3, 4, 5, ...] 。

实现 SmallestInfiniteSet 类：

SmallestInfiniteSet() 初始化 SmallestInfiniteSet 对象以包含 所有 正整数。
int popSmallest() 移除 并返回该无限集中的最小整数。
void addBack(int num) 如果正整数 num 不 存在于无限集中，则将一个 num 添加 到该无限集中。
 

示例：

输入
["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]
输出
[null, null, 1, 2, 3, null, 1, 4, 5]

解释
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 已经在集合中，所以不做任何变更。
smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 是最小的整数，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 2 ，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 3 ，并将其从集合中移除。
smallestInfiniteSet.addBack(1);    // 将 1 添加到该集合中。
smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 在上一步中被添加到集合中，
                                   // 且 1 是最小的整数，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 4 ，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 5 ，并将其从集合中移除。
 

提示：

1 <= num <= 1000
最多调用 popSmallest 和 addBack 方法 共计 1000 次

# v1-heap+set

## 思路

set 去重

heap 判断最小值

## 实现

```java
class SmallestInfiniteSet {

    private PriorityQueue<Integer> heap = new PriorityQueue<>();
    Set<Integer> set = new HashSet<>();
    public SmallestInfiniteSet() {
        for(int i = 1; i <= 1000; i++) {
            heap.add(i);
            set.add(i);
        }        
    }
    
    public int popSmallest() {
        int val = heap.poll();
        set.remove(val);
        return val;
    }
    
    public void addBack(int num) {
        if(!set.contains(num)) {
            heap.add(num);
            set.add(num);
        }
    }
}
```

## 效果

36ms 击败 14.95%

## 复杂度

| 方法          | 时间复杂度      | 空间复杂度 |
| ----------- | ---------- | ----- |
| 构造函数        | O(n log n) | O(n)  |
| popSmallest | O(log m)   | O(1)  |
| addBack     | O(log m)   | O(1)  |

## 反思

优先级队列看起来并不是一定需要。

# v2-TreeSet

## 思路

判断是否存在+自动排序

## 实现

```java
class SmallestInfiniteSet {

    TreeSet<Integer> set = new TreeSet<>();
    public SmallestInfiniteSet() {
        for(int i = 1; i <= 1000; i++) {
            set.add(i);
        }        
    }
    
    public int popSmallest() {
        return set.pollFirst();
    }
    
    public void addBack(int num) {
        if(!set.contains(num)) {
            set.add(num);
        }
    }

}
```

## 效果

34ms 击败 14.95%

## 复杂度

| 方法          | 时间复杂度      | 空间复杂度 |
| ----------- | ---------- | ----- |
| 构造函数        | O(n log n) | O(n)  |
| popSmallest | O(log n)   | O(1)  |
| addBack     | O(log n)   | O(1)  |


## 反思

如何更快呢？

# v3-heap+set+next

## 思路

和 v1 类似，我们额外加一个 min 变量。

这样可以减少 heap 的调整次数。

## 实现

```java
class SmallestInfiniteSet {

    private PriorityQueue<Integer> heap = new PriorityQueue<>();
    Set<Integer> set = new HashSet<>();
    int min=1;
    public SmallestInfiniteSet() {
    }
    
    public int popSmallest() {
        if(!heap.isEmpty()) {
            int val = heap.poll();
            set.remove(val);
            return val;
        }

        // 顺序返回最小值
        return min++;
    }
    
    public void addBack(int num) {
        if(num < min && !set.contains(num)) {
            heap.add(num);
            set.add(num);
        }
    }
}
```

## 效果

11ms 击败 43.63%

## 反思

还能更快吗？

# v4-数组模拟 map

## 思路

我们可以用数组替代掉 map

这个性能好，主要还是用例太温柔了。

定义一个 map 存储被弹出的元素信息。

## 实现

```java
class SmallestInfiniteSet {

    int minIdx = 1;
    boolean[] map = new boolean[1002];

    public SmallestInfiniteSet() {
        
    }
    
    public int popSmallest() {
        map[minIdx] = true;
        int v = minIdx;
        while(map[minIdx]){
            minIdx++;
        }
        return v;
    }
    
    public void addBack(int num) {
        if(num < minIdx){
            minIdx = num;
        }
        map[num] = false;
    }

}
```

## 效果

9ms 击败 99.02%


# 参考资料