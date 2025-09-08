---
title: LC1456. 定长子串中元音的最大数目 maximum-number-of-vowels-in-a-substring-of-given-length
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC1456. 定长子串中元音的最大数目 maximum-number-of-vowels-in-a-substring-of-given-length

给你字符串 s 和整数 k 。

请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。

英文中的 元音字母 为（a, e, i, o, u）。

示例 1：

输入：s = "abciiidef", k = 3
输出：3
解释：子字符串 "iii" 包含 3 个元音字母。
示例 2：

输入：s = "aeiou", k = 2
输出：2
解释：任意长度为 2 的子字符串都包含 2 个元音字母。
示例 3：

输入：s = "leetcode", k = 3
输出：2
解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
示例 4：

输入：s = "rhythms", k = 4
输出：0
解释：字符串 s 中不含任何元音字母。
示例 5：

输入：s = "tryhard", k = 4
输出：1
 

提示：

1 <= s.length <= 10^5
s 由小写英文字母组成
1 <= k <= s.length
 


# v1-滑动窗口

## 思路

因为这个是在刷专题，我们已经知道了是滑动窗口，所以反而很简单。

当然额外用一下子哈希的优化，替代 HashSet 之类的包含判断。

## 实现

```java
public int maxVowels(String s, int k) {
        int res = 0;
        int n = s.length();

        char[] chars = new char[]{'a','e','i','o','u'};
        boolean[] countChars = new boolean[256];
        for(char c : chars) {
            countChars[c] = true;
        }        

        //0..k
        int count = 0;
        for(int i = 0; i < k; i++) {
            if(countChars[s.charAt(i)]) {
                count++;
            }
        }
        res = count;

        //滑动
        for(int i = k; i < n; i++) {
            if(countChars[s.charAt(i-k)]) {
                count--;
            }
            if(countChars[s.charAt(i)]) {
                count++;
            }

            res = Math.max(count, res);
        }

        return res;   
    }
```

## 效果

8ms 击败 85.69%

## 反思

还能继续优化吗？

# 优化1-去掉数组

## 说明

在字符特别少的情况下，也许直接判断才是最好的，我们来对比一下。

## 实现

```java
public int maxVowels(String s, int k) {
        int res = 0;
        int n = s.length();

        // char[] chars = new char[]{'a','e','i','o','u'};
        // boolean[] countChars = new boolean[256];
        // for(char c : chars) {
        //     countChars[c] = true;
        // }        

        //0..k
        int count = 0;
        for(int i = 0; i < k; i++) {
            if(isVowel(s.charAt(i))) {
                count++;
            }
        }
        res = count;

        //滑动
        for(int i = k; i < n; i++) {
            if(isVowel(s.charAt(i-k))) {
                count--;
            }
            if(isVowel(s.charAt(i))) {
                count++;
            }

            res = Math.max(count, res);
        }

        return res;   
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
```

## 效果

16ms 击败 38.95%

## 反思

看到出来，还是数组的方式最快。

# v2-数组访问

## 说明

s.charAt 在 java 中有一个问题，会有额外的边界检查。

所以不如转换为数组，直接访问来的快。

当然，这个只是小道的优化。整体的算法并不会有变化。

## 实现

```java
    public int maxVowels(String s, int k) {
        int res = 0;
        int n = s.length();

        char[] chars = new char[]{'a','e','i','o','u'};
        boolean[] countChars = new boolean[256];
        for(char c : chars) {
            countChars[c] = true;
        }        

        //0..k
        char[] scs = s.toCharArray();
        int count = 0;
        for(int i = 0; i < k; i++) {
            if(countChars[scs[i]]) {
                count++;
            }
        }
        res = count;

        //滑动
        
        for(int i = k; i < n; i++) {
            if(countChars[scs[i-k]]) {
                count--;
            }
            if(countChars[scs[i]]) {
                count++;
            }

            // 剪枝
            // if(count == k) {
            //     return k;
            // }

            res = Math.max(count, res);
        }

        return res;   
    }
```

## 效果

6ms 击败 98.82%

## 反思

看了最好的解法用的是 static + bytes 之类的，拓展性不强，可以忽略。

# 参考资料