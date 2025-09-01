---
title: LC334. 递增的三元子序列 increasing-triplet-subsequence
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# 334. 递增的三元子序列

给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。

如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

 

示例 1：

输入：nums = [1,2,3,4,5]
输出：true
解释：任何 i < j < k 的三元组都满足题意
示例 2：

输入：nums = [5,4,3,2,1]
输出：false
解释：不存在满足题意的三元组
示例 3：

输入：nums = [2,1,5,0,4,6]
输出：true
解释：其中一个满足题意的三元组是 (3, 4, 5)，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6
 

提示：

1 <= nums.length <= 5 * 10^5
-2^31 <= nums[i] <= 2^31 - 1
 

进阶：你能实现时间复杂度为 O(n) ，空间复杂度为 O(1) 的解决方案吗？

# v1-暴力

## 思路

管他 3*7，直接暴力。

## 实现

```java
    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        if(n < 3) {
            return false;
        }

        for(int i = 0; i < n-2; i++) {
            for(int j = i+1; j < n-1; j++) {
                for(int k = j+1; k < n; k++) {
                    if(nums[i] < nums[j] && nums[j] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
```


## 效果

出时间限制
34 / 86 个通过的测试用例

## 复杂度

TC: O(n^3)

## 反思

炸的意料之中，为什么这么慢？

如何优化？

# v2-避免 string 创建

## 思路

我们不用 stack 试一下

## 实现

```java
public String reverseWords(String s) {
        char pre = '\0';

        int n = s.length();

        StringBuilder sb = new StringBuilder();

        Stack<String> stack = new Stack<>();
        StringBuilder temp = new StringBuilder();
        for(int i = 0; i < n; i++) {
            char c = s.charAt(i);

            // 处理
            if(c != ' ') {
                temp.append(c);
            } else {
                if(temp.length() > 0) {
                    sb.append(temp.reverse()).append(' ');
                    // reset
                    temp.setLength(0);
                }
            }

            pre = c;
        }
        // 最后也要入队
        if(temp.length() > 0) {
            sb.append(temp.reverse()).append(' ');
            // reset
            temp.setLength(0);
        }


        // 删除最后一个空格
        sb.deleteCharAt(sb.length()-1);

        return sb.reverse().toString();
    }
```

## 效果

5ms 击败 68.93%

## 反思

略有提升，但是不多，因为逆序也是比较消耗性的

有没有方法可以避免反转？


# v3-单词前插入

## 思路

有的，这个其实是对 stringbuiler 的理解。

我们可以把单词插入到前面，而不是末尾，这样就省的反转了。

## 实现

```java
 public String reverseWords(String s) {
    int n = s.length();
    StringBuilder sb = new StringBuilder();
    StringBuilder temp = new StringBuilder();

    for (int i = 0; i < n; i++) {
        char c = s.charAt(i);
        if (c != ' ') {
            temp.append(c);
        } else {
            if (temp.length() > 0) {
                if (sb.length() > 0) sb.insert(0, ' '); // 前插空格
                sb.insert(0, temp); // 前插单词
                temp.setLength(0);
            }
        }
    }

    // 最后一个单词
    if (temp.length() > 0) {
        if (sb.length() > 0) sb.insert(0, ' ');
        sb.insert(0, temp);
    }

    return sb.toString();
}
```

## 效果

5ms 击败 68.93%

## 反思

感觉 v3 其实是一种很巧妙的解法了，但是效果一般

怀疑底层还是会涉及到 char[] 数组的移动。

# v4-原始数组处理

## 思路

我们可以用空间换时间。

1）临时数组，用于存储去除多余空格后的字符串

2）逆序遍历原始的数组，单词可以从 i 位置向前，用 j 来找到单词的开头。一直到新的 ' ' 或者开头。从 s[j ... i]，依然是一个完整的单词。

通过 j 寻找，和直接逆序，效果应该是类似的。

## 实现

```java
public String reverseWords(String s) {
        int n = s.length();
        char[] arr = new char[n]; // 不用 n+1
        int right = 0; // 写入 arr 的位置

        int i = n - 1;
        while (i >= 0) {
            // 跳过空格
            while (i >= 0 && s.charAt(i) == ' ') i--;
            if (i < 0) break;

            int j = i;
            // 找到单词起始位置
            while (j >= 0 && s.charAt(j) != ' ') j--;

            // s[j+1 .. i] 是一个单词，顺序写入 arr
            if (right > 0) arr[right++] = ' '; // 单词间空格
            for (int k = j + 1; k <= i; k++) {
                arr[right++] = s.charAt(k);
            }

            i = j - 1; // 移动到下一个单词
        }

        return new String(arr, 0, right);
    }
```

## 效果

2ms 击败 97.75%

## 反思

这种写法的技巧性比较强，也体现了我们对于数组的深刻理解。

# 参考资料

