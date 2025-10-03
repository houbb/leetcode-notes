---
title: LC2300. 咒语和药水的成功对数 successful-pairs-of-spells-and-potions
date: 2025-10-03
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, binary-search]
published: true
---

# LC2300. 咒语和药水的成功对数 successful-pairs-of-spells-and-potions

给你两个正整数数组 spells 和 potions ，长度分别为 n 和 m ，其中 spells[i] 表示第 i 个咒语的能量强度，potions[j] 表示第 j 瓶药水的能量强度。

同时给你一个整数 success 。一个咒语和药水的能量强度 相乘 如果 大于等于 success ，那么它们视为一对 成功 的组合。

请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的 药水 数目。

示例 1：

输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
输出：[4,0,3]
解释：
- 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
- 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
- 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
所以返回 [4,0,3] 。
示例 2：

输入：spells = [3,1,2], potions = [8,5,8], success = 16
输出：[2,0,2]
解释：
- 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。总共 2 个成功组合。
- 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
- 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。总共 2 个成功组合。
所以返回 [2,0,2] 。
 

提示：

n == spells.length
m == potions.length
1 <= n, m <= 10^5
1 <= spells[i], potions[i] <= 10^5
1 <= success <= 10^10



# v1-暴力

## 思路

先用朴素的暴力尝试一下。

## 实现

```java
class Solution {

    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int sn = spells.length;
        int[] res = new int[sn];

        for(int i = 0; i < sn; i++) {
            int spell = spells[i];
            int count = count(potions, success, spell);
            res[i] = count;
        }

        return res;
    }

    private int count(int[] potions, long success, int spell) {
        int count = 0;

        for(int potion : potions) {
            if(potion * spell >= success) {
                count++;
            }
        }    
        return count;
    }

}
```

## 效果

解答错误

48 / 57 个通过的测试用例

## 反思

大概率是越界的问题，如何解决呢？

我们可以把用除法，避免越界。

### 实现

```java
private int count(int[] potions, long success, int spell) {
    int count = 0;
    double target = (double)success / spell;
    for(int potion : potions) {
        if(potion >= target) {
            count++;
        }
    }    
    return count;
}
```

### 效果

超出时间限制

51 / 57 个通过的测试用例

### 反思

如何更快呢？

# v2-二分

## 思路

我们在 count 中进行大小比较时，可以想到用 sort+binarySearch 快速找到预期的数量。

## 实现

```java
class Solution {

    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int sn = spells.length;
        int[] res = new int[sn];

        //sort
        Arrays.sort(potions);

        for(int i = 0; i < sn; i++) {
            int spell = spells[i];
            int count = count(potions, success, spell);
            res[i] = count;
        }

        return res;
    }

    private int count(int[] potions, long success, int spell) {
        double target = (double)success / spell;
        
        int ix = binarySearch(potions, target);
        return potions.length - ix;
    }

    // 需要找到左边第一个大于等于 target 的位置
    private int binarySearch(int[] potions, double target) {
        int n = potions.length;
        int left = 0;
        int right = n;

        while(left < right) {
            int mid = left + (right-left) / 2;
            if(potions[mid] < target) {
                // 往右
                left = mid+1;
            } else {
                // 右边可能就是结果
                right = mid;      
            }
        }

        return left;
    }       
}
```

## 效果

52ms 击败 59.76%

## 反思

为什么这么慢呢？还能更快吗？

### 快速失败

当然，我们可以给二分加一个最右边的判断，如果小于，就没必要后续操作了。

```java
    // 需要找到左边第一个大于等于 target 的位置
    private int binarySearch(int[] potions, double target) {
        int n = potions.length;
        int left = 0;
        int right = n;

        // 最右边
        if(potions[n-1] < target) {
            return n;
        }

        while(left < right) {
            int mid = left + (right-left) / 2;
            if(potions[mid] < target) {
                // 往右
                left = mid+1;
            } else {
                // 右边可能就是结果
                right = mid;      
            }
        }

        return left;
    }       
```

效果：

46ms 击败 76.37%

## 复杂度

时间复杂度：O((n + m) log m)   排序+二分

空间复杂度：O(n)

# v3-双指针

## 流程

先把 spells 带 index 排序（为了最后恢复结果顺序），降序排序。

potions 升序排列。

维护一个指针 j，从左往右走。对于当前 spell，如果 `spell * potions[j] < success`，就移动 j；否则停止。

因为 spell 越大，需要的 potion 越小，所以指针 j 单调递增，不会回退。

结果就是 m - j。

## 一些技巧

### 携带 ix 排序的选择

我们对 spells 也进行排序，当然要包含 ix，方便回归到原始的 ix 信息。

这里包含 ix 对象排序有两种方式：

1）Integer[] 数组，存储 spell 的下标，然后通过 `Integer.compare(spells[a], spells[b])` 排序

2）int[][] 二维数组，存储 spell 的值+索引，好处是排序后直接可以拿到原始下标。

比较快的方式是方式1

### 为什么 spells 要降序

核心目的是为了让 j 不会退。因为 spell 越来越小，要求的 j 越大才能满足。我们的 j 是递增的，左边的更小的 j 肯定也不满足。

## 实现

```java
class Solution {

    public int[] successfulPairs(int[] spells, int[] potions, long success) {
        int sn = spells.length;
        int pn = potions.length;
        
        // s ix 降序
        Integer[] sIndex = new Integer[sn];
        for(int i = 0; i < sn; i++) {
            sIndex[i] = i;
        }
        Arrays.sort(sIndex, (a,b)->Integer.compare(spells[b], spells[a]));

        //p 单调增
        Arrays.sort(potions);

        int[] res = new int[sn];
        int j = 0;
        for(int i : sIndex) {
            int spell = spells[i];

            while(j < pn && (long) potions[j] * spell < success) {
                j++;
            }

            res[i] = pn - j;
        }

        return res;
    }

}
```

## 效果

68ms 击败 5.02%

## 复杂度

TC:

```
O(n log n)  // spells 降序排序
+ O(m log m)  // potions 升序排序
+ O(n + m)  // 双指针扫描
= O(n log n + m log m)
```

## 反思 

反而变慢了，一顿操作猛如虎，回头一看 5%

# v4-计数排序+后缀和+查表

## 思路

核心思想：空间换时间

我们对 potions 直接 计算排序，然后提前预处理好每一个位置对应的数量。

预处理计算后缀和， cnt[i] 就是 potions 值 >= i 的药水个数

直接计算查表

## 实现

```java
public int[] successfulPairs(int[] spells, int[] potions, long success) {
    // 哈希
    int mx = 0;
    for(int x : potions) mx = Math.max(mx,x);

    int[] cnt = new int[mx+1];
    for(int x : potions) cnt[x]++;
    for(int i = mx-1; i >= 0; i--){
        cnt[i] += cnt[i+1];
    }

    for(int i = 0; i < spells.length; i++){
        long sub = (success- 1) / spells[i] + 1;
        spells[i] = sub > mx ? 0 : cnt[(int) sub];
    }
    return spells;
}
```

## 效果

7ms 击败 98.86%

## 复杂度

| 操作              | 时间复杂度         | 空间复杂度 |
| --------------- | ------------- | ----- |
| 遍历 potions 找最大值 | O(m)          | O(1)  |
| 统计每个值出现次数       | O(m)          | O(mx) |
| 倒序累加            | O(mx)         | O(0)  |
| 遍历 spells 查表    | O(n)          | O(0)  |
| **总计**          | O(m + mx + n) | O(mx) |

## 反思

这个解法确实非常强，超越了二分法。

# 参考资料