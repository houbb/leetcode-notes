---

title: leetcode sort 排序-04-mergeSort 归并排序入门介绍
date:  2020-6-8 15:13:08 +0800
categories: [Algorithm]
tags: [algorithm, sort, sf]
published: true
---

# 排序系列

[sort-00-排序算法汇总](https://houbb.github.io/2016/07/14/sort-00-overview-sort)

[sort-01-bubble sort 冒泡排序算法详解](https://houbb.github.io/2016/07/14/sort-01-bubble-sort)

[sort-02-QuickSort 快速排序到底快在哪里？](https://houbb.github.io/2016/07/14/sort-02-quick-sort)

[sort-03-SelectSort 选择排序算法详解](https://houbb.github.io/2016/07/14/sort-03-select-sort)

[sort-04-heap sort 堆排序算法详解](https://houbb.github.io/2016/07/14/sort-04-heap-sort)

[sort-05-insert sort 插入排序算法详解](https://houbb.github.io/2016/07/14/sort-05-insert-sort)

[sort-06-shell sort 希尔排序算法详解](https://houbb.github.io/2016/07/14/sort-06-shell-sort)

[sort-07-merge sort 归并排序](https://houbb.github.io/2016/07/14/sort-07-merge-sort)

[sort-08-counting sort 计数排序](https://houbb.github.io/2016/07/14/sort-08-counting-sort)

[sort-09-bucket sort 桶排序](https://houbb.github.io/2016/07/14/sort-09-bucket-sort)

[sort-10-bigfile 大文件外部排序](https://houbb.github.io/2016/07/14/sort-10-bigfile-sort)

# 前言

大家好，我是老马。

以前从工程的角度，已经梳理过一次排序算法。

这里从力扣算法的角度，重新梳理一遍。

核心内容包含：

1）常见排序算法介绍

2）背后的核心思想

3）leetcode 经典题目练习+讲解

4）应用场景、优缺点等对比总结

5）工程 sdk 包，这个已经完成。

6) 可视化

# 归并排序（Merge Sort）

## 📌 一、归并排序是什么？

**归并排序**是一种典型的\*\*“分治法”排序算法\*\*，其核心思想是：

> **先把数组分成小块分别排好序，再将有序小块“合并”成更大的有序块，最终合成一个完整的有序数组。**

---

## 🧠 二、核心算法思想：分治（Divide and Conquer）

### 分治过程分三步：

1. **分解（Divide）**：将数组从中间一分为二，递归地对子数组排序。
2. **解决（Conquer）**：对子数组分别排序。
3. **合并（Combine）**：将两个有序数组**合并成一个有序数组**。

---

## 🎯 三、图解流程

以数组 `[5, 2, 4, 7, 1, 3, 6, 8]` 为例：

```text
原数组：
[5, 2, 4, 7, 1, 3, 6, 8]

分成两半：
[5, 2, 4, 7]       [1, 3, 6, 8]

继续分：
[5,2] [4,7]        [1,3] [6,8]

再分：
[5],[2] [4],[7]    [1],[3] [6],[8]

合并排序：
[2,5] [4,7]        [1,3] [6,8]

合并成更大的：
[2,4,5,7]          [1,3,6,8]

最终结果：
[1,2,3,4,5,6,7,8]
```

---

## ✅ 四、Java 实现代码

```java
public void mergeSort(int[] arr) {
    if (arr == null || arr.length < 2) return;
    mergeSortRecursive(arr, 0, arr.length - 1);
}

private void mergeSortRecursive(int[] arr, int left, int right) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    mergeSortRecursive(arr, left, mid);
    mergeSortRecursive(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

private void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    // 拷贝回原数组
    System.arraycopy(temp, 0, arr, left, temp.length);
}
```

---

## 📈 五、时间 & 空间复杂度分析

| 情况   | 时间复杂度      | 空间复杂度 | 稳定性  |
| ---- | ---------- | ----- | ---- |
| 最好情况 | O(n log n) | O(n)  | ✅ 稳定 |
| 最坏情况 | O(n log n) | O(n)  | ✅ 稳定 |
| 平均情况 | O(n log n) | O(n)  | ✅ 稳定 |

> 空间复杂度为 O(n) 是因为每次合并都需要辅助数组（不是原地排序）

---

## ⚖️ 六、优点 & 缺点

| 优点                 | 缺点           |
| ------------------ | ------------ |
| 时间复杂度稳定 O(n log n) | 占用额外空间 O(n)  |
| 稳定排序，适合链表排序        | 实现比插排/冒泡略复杂  |
| 适合大规模数据排序          | 不适合内存受限的场景   |
| 容易用递归实现            | 非原地排序（但可以优化） |

---

## 📦 七、适用场景

| 场景       | 是否推荐           |
| -------- | -------------- |
| ✅ 大规模排序  | 非常推荐，效率稳定      |
| ✅ 需要稳定排序 | 推荐             |
| ✅ 数据是链表  | 推荐（归并比快排更适合链表） |
| ❌ 空间敏感场景 | 不推荐，空间 O(n)    |

---

## 💡 八、LeetCode 上推荐归并排序的题目

### 🔹 [912. 排序数组](https://leetcode.cn/problems/sort-an-array/)

* 要求自己实现排序算法
* ✅ 推荐使用归并排序实现

---

### 🔹 [148. 排序链表](https://leetcode.cn/problems/sort-list/)

* 单链表排序，不能使用额外空间
* ✅ 快排难以控制链表，**归并排序更合适**

---

### 🔹 [23. 合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

* 本质是**多路归并排序**
* ✅ 用最小堆归并多个链表

---

### 🔹 [315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)

* 要用归并排序做**逆序对计数**
* ✅ 深度应用：归并过程中统计结果

---

## 🔚 九、一句话总结

> **归并排序 = 分治 + 有序合并**，是一种时间复杂度稳定、适合大数据和链表的排序算法，尽管不是原地排序，但稳定性和效率兼备，是非常重要的“面试必备算法”。

