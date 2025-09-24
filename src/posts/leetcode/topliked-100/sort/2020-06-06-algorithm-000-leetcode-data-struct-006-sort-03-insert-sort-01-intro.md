---

title: leetcode sort 排序-03-insertSort 插入排序入门介绍
date:  2020-06-08
categories: [TopLiked100]
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

# 插入排序

## 📌 一、插入排序是什么？

插入排序是一种**模仿人手整理扑克牌的排序方法**。

从第二个元素开始，每次将当前元素**插入到前面已经有序的区域**中合适的位置。

---

## 🧠 二、算法核心思想

> 从第一个元素开始假设已经有序，从第二个元素开始向前扫描，**找到合适的位置插入当前元素**，使得插入后前部分依然有序。

### 类比：

像玩扑克牌时，一张一张拿牌，每次将新拿的牌插入到已经排好序的牌堆中合适的位置。

---

## 🔧 三、算法逻辑（伪代码）

```text
for i from 1 to n - 1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j = j - 1
    arr[j + 1] = key
```

* 把 `arr[i]` 插入到前面 `arr[0...i-1]` 这段**有序区域**
* 倒着比较、腾出位置插入

---

## ✅ 四、Java 实现代码

```java
void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  // 元素后移
            j--;
        }
        arr[j + 1] = key;  // 插入正确位置
    }
}
```

---

## 🎨 五、插入排序可视化示例（排序 `[4, 2, 5, 1]`）

| i | 当前值 `key` | 插入过程                                 | 数组状态           |
| - | --------- | ------------------------------------ | -------------- |
| 1 | 2         | 4 > 2 → 移动                           | `[2, 4, 5, 1]` |
| 2 | 5         | 5 >= 4 → 无需移动                        | `[2, 4, 5, 1]` |
| 3 | 1         | 5 > 1 → 移动...4 > 1 → 移动...2 > 1 → 移动 | `[1, 2, 4, 5]` |

---

## 📈 六、时间和空间复杂度分析

| 情况   | 比较次数      | 时间复杂度   | 空间复杂度 |
| ---- | --------- | ------- | ----- |
| 最好情况 | O(n)（已排序） | ✅ O(n)  | O(1)  |
| 最坏情况 | O(n²)（逆序） | ❌ O(n²) | O(1)  |
| 平均情况 | O(n²)     | ❌ O(n²) | O(1)  |
| 稳定性  | ✅ 稳定排序    |         |       |

> 比如 `[1,2,3,4,5]`，插入排序会一轮都不动，直接 O(n) 结束。

---

## ⚖️ 七、优点 & 缺点

| 优点           | 缺点             |
| ------------ | -------------- |
| 实现简单，代码短     | 时间复杂度高，不能应对大数据 |
| 稳定排序         | 插入多次会有较多数据移动   |
| 适合少量、部分有序的数据 | 不适合大规模无序数据     |
| 原地排序，空间复杂度低  | -              |

---

## 📦 八、适用场景

| 场景          | 说明                    |
| ----------- | --------------------- |
| ✅ 数据量小      | 插入排序处理 1000 以内数据基本没问题 |
| ✅ 数据接近有序    | 效率可达 O(n)，优于选择/冒泡     |
| ✅ 有稳定性要求    | 插入排序是稳定排序             |
| ❌ 大规模随机无序数据 | 性能太差，推荐快排/归并          |

---

## 💡 九、LeetCode 上可用插入排序解的题目

虽然实际应用中不会用插排做最优解，但这些题目适合用来练习插入排序的写法与思路：

---

### 🔹 [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/)

* ✅ 插入排序的链表版，不能使用索引，只能指针操作
* 考察对链表插入位置处理逻辑

---

### 🔹 [912. 排序数组](https://leetcode.cn/problems/sort-an-array/)

* ✅ 用插入排序可以完成，但在大数据下效率不高
* 适合写一个插排版本训练基本功

---

### 🔹 [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

* 虽然不是排序题，但可以借助插入排序的稳定性思路处理

---

## 🔚 十、一句话总结

> 插入排序是一种“逐个插入到有序区”的排序方法，**思路简单、实现容易、适合少量或近乎有序的数据**，但性能不足以处理大规模数据。


