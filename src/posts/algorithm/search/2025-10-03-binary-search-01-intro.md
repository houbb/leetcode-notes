---

title:  二分查找（Binary Search）
date: 2025-10-03
categories: [Algorithm]
tags: [algorithm, search]
published: true
---

## 1. 基本概念

**二分查找**是一种在 **有序数组**（或者满足单调性的集合/区间）中查找目标值的算法。
核心思想是：

* 每次把搜索范围减半；
* 根据目标值和中间值的比较，决定往左半边还是右半边继续查找。

时间复杂度：

* 每次都缩小一半 → **O(log n)**
  空间复杂度：
* 迭代版 O(1)，递归版 O(log n)（栈深度）

---

## 2. 基本实现思路（迭代）

假设数组 `nums` 升序，查找目标 `target`。

```java
public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) { // 注意这里是 <=
        int mid = left + (right - left) / 2; // 防止溢出
        if (nums[mid] == target) {
            return mid; // 找到
        } else if (nums[mid] < target) {
            left = mid + 1; // 目标在右边
        } else {
            right = mid - 1; // 目标在左边
        }
    }
    return -1; // 未找到
}
```

特点：

* 每次都用 `mid` 与 `target` 比较
* 如果等于 → 找到
* 如果小于 → 往右边找
* 如果大于 → 往左边找

---

## 3. 细节与坑点

### (1) 中点计算

很多人写 `mid = (left + right) / 2`。

* 在 C/C++/Java 里如果 `left + right` 溢出会出错。
* 推荐写：

  ```java
  int mid = left + (right - left) / 2;
  ```

### (2) 区间定义

二分查找有两种常见写法：

* **闭区间** `[left, right]` → `while(left <= right)`
* **左闭右开** `[left, right)` → `while(left < right)`

两种写法都可以，但要保持始终一致，不然容易错。

### (3) 无法找到时返回什么

* 通常返回 `-1`
* 也可以返回 `left` 或 `right`，用来表示应该插入的位置（如 `Arrays.binarySearch` 的定义）。

---

## 4. 扩展用法（常考点）

### (1) 查找左边界（lower_bound）

例如：找第一个 **大于等于 target** 的下标。

```java
public int lowerBound(int[] nums, int target) {
    int left = 0, right = nums.length; // 注意右边 = n，不是 n-1
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1; // 往右找
        } else {
            right = mid; // mid 可能是答案
        }
    }
    return left;
}
```

### (2) 查找右边界（upper_bound）

例如：找第一个 **大于 target** 的下标。

```java
public int upperBound(int[] nums, int target) {
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```

---

## 5. 常见应用场景

1. **查找元素**：经典的有序数组找目标。
2. **边界查找**：找第一个 ≥ / > / ≤ / < 的元素。
3. **答案二分（Binary Search on Answer）**

   * 如果问题的解答空间是单调的，可以在“答案区间”上二分。
   * 例如：

     * **最小化最大值**问题（如分割数组、最小速度/最大时间）
     * **最大化最小值**问题（如磁力球间距问题）
4. **浮点数二分**

   * 在实数区间上二分逼近，比如开方、几何问题、概率问题。

---

## 6. 举个例子

题目：给定有序数组 `nums = [1,2,4,4,5,7,9]`，查找目标 `4` 的最左位置。

* `lowerBound(nums, 4)` → 返回 `2`（第一个 `4` 的下标）
* `upperBound(nums, 4)` → 返回 `4`（第一个大于 `4` 的下标）

---

✅ 总结：

* **核心**：缩小区间，每次排除一半
* **关键点**：区间定义一致、中点防溢出
* **扩展**：边界查找、二分答案、浮点二分







