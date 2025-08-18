---

title: 算法篇专题之堆 heap 02-LC295. 数据流的中位数 find-median-from-data-stream
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, heap, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下LC295. 数据流的中位数 find-median-from-data-stream


# 历史回顾

> [04-4.median of two sorted arrays 寻找两个正序数组的中位数](https://houbb.github.io/2020/06/08/algorithm-004-leetcode-04-median-of-two-sorted-arrays)

[二分查找法？binary-search-02-leetcode T4 寻找两个正序数组的中位数 median-of-two-sorted-arrays](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-search-00-binary-search-02-leetcode-10-T4.html)

# 295. 数据流的中位数

中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

例如 arr = [2,3,4] 的中位数是 3 。
例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5 。
实现 MedianFinder 类:

MedianFinder() 初始化 MedianFinder 对象。

void addNum(int num) 将数据流中的整数 num 添加到数据结构中。

double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10-5 以内的答案将被接受。

示例 1：

```
输入
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]

输出
[null, null, null, 1.5, null, 2.0]

解释

MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

提示:

-10^5 <= num <= 10^5
在调用 findMedian 之前，数据结构中至少有一个元素
最多 5 * 10^4 次调用 addNum 和 findMedian

# v1-暴力

## 思路

我们用 arrayList 简单实现

## 实现

```java
class MedianFinder {

    private List<Integer> list = new ArrayList<>();

    public MedianFinder() {
        
    }
    
    public void addNum(int num) {
        // 后续用插入排序优化？
        list.add(num);
        Collections.sort(list);
    }
    
    public double findMedian() {
        // 中间位置
        int size = list.size();
        if(size == 1) {
            return list.get(0);
        }
        
        // 其他
        int midIx = size / 2;
        if(size % 2 != 0) {
            return list.get(midIx);
        } else {
            return (list.get(midIx-1) + list.get(midIx)) / 2.0;
        }
    }
}
```

## 效果

超出时间限制
18 / 22 个通过的测试用例

# v2-插入排序

## 思路

因为数组有序，没必要每次都排序

二分查找，然后插入

## 实现

```java
public void addNum(int num) {
        int left = 0, right = list.size();
        // 找到插入位置
        while (left < right) {
            int mid = (left + right) / 2;
            if (list.get(mid) < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        // left 就是正确插入位置
        list.add(left, num);
}
```

## 效果

378ms 击败 5.02%

# v3-双堆法

## 思路

* 左堆（最大堆）：存较小的一半元素
* 右堆（最小堆）：存较大的一半元素
* 保证两堆平衡：`left.size() == right.size()` 或 `left.size() == right.size() + 1`
* 中位数：

  * 奇数个元素 → 左堆堆顶
  * 偶数个元素 → `(左堆堆顶 + 右堆堆顶)/2`

实在是巧妙！

## 实现

```java
class MedianFinder {
    PriorityQueue<Integer> minHeap;
    PriorityQueue<Integer> maxHeap;
    / initialize your data structure here. */
    public MedianFinder() {
        minHeap = new PriorityQueue<>();
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    }
    
    public void addNum(int num) {
        minHeap.add(num);
        maxHeap.add(minHeap.poll());
        if (minHeap.size() < maxHeap.size()) {
            minHeap.add(maxHeap.poll());
        }
    }
    
    public double findMedian() {
        if (minHeap.size() > maxHeap.size()) return minHeap.peek();
        return (double) (minHeap.peek() + maxHeap.peek()) * 0.5;
    }
}
```

## 效果

186ms 击败 5.66%

令人汗颜！

## 复杂度

| 方法         | 时间复杂度    | 空间复杂度 |
| ---------- | -------- | ----- |
| addNum     | O(log n) | O(n)  |
| findMedian | O(1)     | —     |


# v4-计数数组 + mid 指针示意图

## 思路

1. 使用一个 固定大小的计数数组 `cnt[200001]` 来存储数字出现的次数。

   * 因为题目数字范围是 `[-10^5, 10^5]`，所以数组大小 200001 足够。
   * `num` 存储时做了偏移：`num += 100000`。

2. 使用两个变量：

   * `mid`：当前中位数的下标（在 `cnt` 数组中）
   * `midNum`：表示中位数“权重”或次数的状态（奇偶或者重复元素数目，用于判断中位数是否需要移动）

3. 每次 `addNum` 后，通过 调整 `mid` 和 `midNum`，保证 `mid` 指向 中位数，无需全局排序。

4. `findMedian` 直接用 `mid` 和 `midNum` 返回中位数即可。

## 总结

* 核心思想：用 计数数组 + 中位数指针 来维护中位数

* 特点：

  * 插入数字不需要排序
  * `addNum` 平均复杂度 接近 O(1)（指针移动只跳过非零计数）
  * 空间复杂度 O(200001)

* 适用场景：

  * 数字范围固定且不大
  * 插入操作很多，需要快速找到中位数

---

💡 可以把它理解为：

* 双堆法是维护两部分数据的平衡
* 计数数组法是直接维护数字出现次数 + 中位数索引
* 两者目的都是 保证随时能快速找到中位数

---

如果你愿意，我可以画一张 计数数组 + mid 指针示意图，把 `mid` 左右移动和 `midNum` 的含义可视化，非常直观。

你想看吗？



## 解法

```java
class MedianFinder {

    private final int[] cnt;
    private int mid,midNum;
    public MedianFinder() {
        cnt=new int[200001];
        mid=-1;
        midNum=1;
    }

    public void addNum(int num) {
        num=num+100000;
        ++cnt[num];
        if(mid==-1){
            mid=num;
            return;
        }
        if(num==mid){
            midNum++;   
        }else if(num>mid){
            if(midNum<cnt[mid]*2){
                midNum++;
            }else{
                while(cnt[++mid]==0);
                midNum=1;
            }
        }else{
            if(midNum>1)--midNum;
            else{
                while(cnt[--mid]==0);
                midNum=cnt[mid]*2;
            }
        }
    }

    public double findMedian() {
        if(midNum<cnt[mid]*2)return mid-100000.0;
        int left=mid;
        while(cnt[++left]==0);
        return (mid+left)/2.0-100000.0;
    }
}

/
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */
```

## 效果

85ms 击败 99.83%

# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。