---

title: 技巧篇专题之计数 Counting 01-入门介绍
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, counting, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下数组这种数据结构。

## 主要知识

数组需要拆分下面几个部分：

1. 理论介绍

2. 源码分析

3. 数据结构实现？

4. 题目练习（按照算法思想分类）

5. 梳理对应的 sdk 包

6. 应用实战

因为这个是 leetcode 系列，所以重点是 4、5(对4再一次总结)。

为了照顾没有基础的小伙伴，会简单介绍一下1的基础理论。

简单介绍1，重点为4。其他不是本系列的重点。

# 技巧篇

双指针

滑动窗口

位运算--状态压缩

扫描线

前缀和

哈希哈数--滚动哈希

计数

# chat

## 详细介绍一下力扣技巧之计数 counting

在力扣（LeetCode）中，**计数（counting）技巧**是一种非常基础但极其高效的算法思想，它通过**统计元素出现的频次**或某种数量关系，来解决问题，避免复杂的数据结构或多重遍历。

你可以把它理解为**暴力的极限优化版本**，简单但实用！

---

## 🧠 一、核心思想

计数法的基本操作是：

* 建一个“桶”或“数组”或“Map”。
* 每当遇到某个元素，就记录/更新它的“次数”。
* 之后基于这个次数做判断、更新、比较等操作。

可以说它是**时间换空间**的典型代表：用额外空间存储统计信息，换取更快的处理效率。

---

## 🛠️ 二、常见实现方式

| 数据结构              | 适用情况                      |
| ----------------- | ------------------------- |
| `int[]` 数组        | 元素范围已知且较小，如小写字母、0-100     |
| `Map<T, Integer>` | 元素范围未知或较大，如字符串、对象、坐标对等    |
| `Set`             | 判断是否出现过（等价于 `count == 1`） |

---

## 📚 三、典型应用场景

---

### ✅ 1. 出现次数统计（最经典）

#### 力扣 T169：多数元素

找出数组中出现次数大于 n/2 的元素。

**解法 1：计数 Map**

```java
public int majorityElement(int[] nums) {
    Map<Integer, Integer> countMap = new HashMap<>();
    for (int num : nums) {
        countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        if (countMap.get(num) > nums.length / 2) {
            return num;
        }
    }
    return -1; // 不可能到这
}
```

---

### ✅ 2. 判断是否为变位词

#### 力扣 T242：Valid Anagram

判断两个字符串是否互为字母异位词（anagram）

**解法：统计字符频次**

```java
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;

    int[] counts = new int[26];
    for (int i = 0; i < s.length(); i++) {
        counts[s.charAt(i) - 'a']++;
        counts[t.charAt(i) - 'a']--;
    }

    for (int c : counts) {
        if (c != 0) return false;
    }
    return true;
}
```

---

### ✅ 3. 判断子数组是否满足某种计数关系

#### 力扣 T76：最小覆盖子串

滑动窗口 + 计数数组判断是否满足条件

```java
public String minWindow(String s, String t) {
    int[] countT = new int[128];
    for (char c : t.toCharArray()) countT[c]++;

    int left = 0, right = 0, start = 0, minLen = Integer.MAX_VALUE;
    int[] window = new int[128];
    int required = t.length(), formed = 0;

    while (right < s.length()) {
        char c = s.charAt(right++);
        if (countT[c]-- > 0) required--;

        while (required == 0) {
            if (right - left < minLen) {
                minLen = right - left;
                start = left;
            }

            char l = s.charAt(left++);
            if (++countT[l] > 0) required++;
        }
    }

    return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
}
```

---

### ✅ 4. 出现奇数次 or 只出现一次的元素

#### 力扣 T136：Single Number

数组中其他元素出现两次，只有一个元素出现一次。

```java
public int singleNumber(int[] nums) {
    int res = 0;
    for (int num : nums) res ^= num;
    return res;
}
```

这其实也是一种“计数思想”，但通过 **位运算模拟** 了“是否为偶数次”。

---

### ✅ 5. 前缀计数、后缀计数、差分统计

#### 力扣 T370：区间加法（差分数组）

```java
public int[] getModifiedArray(int length, int[][] updates) {
    int[] diff = new int[length + 1];
    for (int[] update : updates) {
        int start = update[0], end = update[1], inc = update[2];
        diff[start] += inc;
        if (end + 1 < length) diff[end + 1] -= inc;
    }

    int[] res = new int[length];
    res[0] = diff[0];
    for (int i = 1; i < length; i++) {
        res[i] = res[i - 1] + diff[i];
    }
    return res;
}
```

---

## ⚠️ 四、常见注意事项

| 问题           | 说明                                            |
| ------------ | --------------------------------------------- |
| 数组越界         | 注意索引对应关系，如字符 'a' 用 `c - 'a'`                  |
| 不同字符集        | 英文小写 26，ASCII 128，Unicode 65536，视题目而定         |
| Map 的 key 类型 | 注意 hashMap 的 key 不一定是 int，有时是 `String`、`Pair` |
| 空间复杂度        | 对于海量数据，注意避免过大的计数桶（如频繁 new HashMap）            |

---

## 📌 五、计数技巧的变种/拓展

* **桶排序（Bucket Counting）**：将元素分布到有限的桶中后排序，比如 T164 最大间距。
* **差分数组**：通过记录“变动值”来快速构造结果，如区间加法问题。
* **前缀和频次**：常用于求子数组和为 k 的个数（T560）等。
* **计数排序/基数排序**：也是建立在 counting 的思想上。

---

## 🧾 总结一句话

> 只要问题里涉及“**出现次数**”、“**是否存在重复**”、“**数量关系满足**”，你都可以优先考虑用 **counting** 统计来简化逻辑！

---

需要我帮你总结一份「力扣中经典的计数法题单 + 模板代码」吗？

还是你想把这部分和滑动窗口、哈希表、差分这些技巧统一整理对比？


