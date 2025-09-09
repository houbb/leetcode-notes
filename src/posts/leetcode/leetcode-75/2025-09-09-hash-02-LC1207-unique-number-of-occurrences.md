---
title: LC1207. 独一无二的出现次数 unique-number-of-occurrences
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC1207. 独一无二的出现次数 unique-number-of-occurrences

给你一个整数数组 arr，如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。

示例 1：

输入：arr = [1,2,2,1,1,3]
输出：true
解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。

示例 2：

输入：arr = [1,2]
输出：false
示例 3：

输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
输出：true
 

提示：

1 <= arr.length <= 1000
-1000 <= arr[i] <= 1000

# v1-HashMap+HashSet

## 思路

我们需要先统计每个数的次数

然后判断次数是否重复，重复的话，返回 false

## 实现

```java
public boolean uniqueOccurrences(int[] arr) {
        Map<Integer,Integer> countMap = new HashMap<>();
        for(int num : arr) {
            Integer count = countMap.getOrDefault(num, 0);
            count++;
            countMap.put(num, count);
        }

        // 次数是否唯一
        Set<Integer> set = new HashSet<>();
        for(Map.Entry<Integer,Integer> entry : countMap.entrySet()) {
            Integer count = entry.getValue();

            if(set.contains(count)) {
                return false;
            }
            set.add(count);
        }

        return true;    
    }
```

## 效果

2ms 击败 87.09%

## 反思

还能更快吗？

# v2-数组

## 反思

和上一题类似。

考虑到：

```
1 <= arr.length <= 1000
-1000 <= arr[i] <= 1000
```

数字的下标 offset=1000，保障从0开始

## 实现

```java

    public boolean uniqueOccurrences(int[] arr) {
        int offset = 1000;
        int[] countMap = new int[2000];
        for(int num : arr) {
            countMap[num+offset]++;
        }

        // 次数是否唯一
        int[] set = new int[1001];
        for(int i = 0; i < countMap.length; i++) {
            int count = countMap[i];
            if(count == 0) {
                continue;
            }

            if(set[count] > 0) {
                return false;
            }
            set[count]++;
        }

        return true;    
    }
```

## 效果

1ms 击败99.41%



# 参考资料