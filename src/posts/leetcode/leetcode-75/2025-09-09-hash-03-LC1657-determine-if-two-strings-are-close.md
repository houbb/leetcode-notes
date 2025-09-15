---
title: LC1657. 确定两个字符串是否接近 determine-if-two-strings-are-close
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, sliding-window]
published: true
---

# LC1657. 确定两个字符串是否接近 determine-if-two-strings-are-close

如果可以使用以下操作从一个字符串得到另一个字符串，则认为两个字符串 接近 ：

操作 1：交换任意两个 现有 字符。
例如，abcde -> aecdb
操作 2：将一个 现有 字符的每次出现转换为另一个 现有 字符，并对另一个字符执行相同的操作。
例如，aacabb -> bbcbaa（所有 a 转化为 b ，而所有的 b 转换为 a ）
你可以根据需要对任意一个字符串多次使用这两种操作。

给你两个字符串，word1 和 word2 。

如果 word1 和 word2 接近 ，就返回 true ；否则，返回 false 。

示例 1：

输入：word1 = "abc", word2 = "bca"
输出：true
解释：2 次操作从 word1 获得 word2 。
执行操作 1："abc" -> "acb"
执行操作 1："acb" -> "bca"

示例 2：

输入：word1 = "a", word2 = "aa"
输出：false
解释：不管执行多少次操作，都无法从 word1 得到 word2 ，反之亦然。

示例 3：

输入：word1 = "cabbba", word2 = "abbccc"
输出：true
解释：3 次操作从 word1 获得 word2 。
执行操作 1："cabbba" -> "caabbb"
执行操作 2："caabbb" -> "baaccc"
执行操作 2："baaccc" -> "abbccc"

提示：

1 <= word1.length, word2.length <= 10^5
word1 和 word2 仅包含小写英文字母
 


# v1-HashMap

## 思路

这一题是一道阅读理解的题目，理解题意解决起来就不难。

总结下来就是 3 点：

1）两字符串的长度相同

2）两字符串的字符种类相同

3）字符频次相同。跟具体是什么字符无关，只要频次相同即可。

## 实现

```java
    public boolean closeStrings(String word1, String word2) {
        int n1 = word1.length();
        int n2 = word2.length();

        if(n1 != n2) {
            return false;
        }

        Map<Character, Integer> map1 = new HashMap<>();
        char[] chars1 = word1.toCharArray();
        for(char c : chars1) {
            map1.put(c, map1.getOrDefault(c, 0)+1);
        }
        Map<Character, Integer> map2 = new HashMap<>();
        char[] chars2 = word2.toCharArray();
        for(char c : chars2) {
            map2.put(c, map2.getOrDefault(c, 0)+1);
        }

        // 类型相同
        if(!map1.keySet().equals(map2.keySet())) {
            return false;
        }

        // 频率相同
        List<Integer> coll1 = new ArrayList<>(map1.values());
        List<Integer> coll2 = new ArrayList<>(map2.values());
        Collections.sort(coll1);
        Collections.sort(coll2);

        if(!coll1.equals(coll2)) {
            return false;
        }   

        return true;     
    }
```

## 效果

72ms 击败 19.35%

# v2-array

## 思路

因为 word1 和 word2 仅包含小写英文字母

所以可以用数组代替 map

## 实现

```java
    public boolean closeStrings(String word1, String word2) {
        int n1 = word1.length();
        int n2 = word2.length();

        if(n1 != n2) {
            return false;
        }

        int[] map1 = new int[26];
        char[] chars1 = word1.toCharArray();
        for(char c : chars1) {
            map1[c-'a']++;
        }

        int[] map2 = new int[26];
        char[] chars2 = word2.toCharArray();
        for(char c : chars2) {
            map2[c-'a']++;
        }

        // 类型相同
        for(int i = 0; i < 26; i++) {
            // 二者必须同时大于0
            if(map1[i] > 0 && map2[i] == 0
                || map1[i] == 0 && map2[i] > 0) {
                return false;
            }
        }

        // 频率相同
        Arrays.sort(map1);
        Arrays.sort(map2);
        for(int i = 0; i < 26; i++) {
            if(map1[i] != map2[i]) {
                return false;
            }
        }
        
        return true;     
    }
```

## 效果

10ms 击败 85.69%

## 反思 

为什么不是 100%

## 优化-避免 toCharArray

### 实现

```java
    public boolean closeStrings(String word1, String word2) {
        int n1 = word1.length();
        int n2 = word2.length();

        if(n1 != n2) {
            return false;
        }

        int[] map1 = new int[26];
        //char[] chars1 = word1.toCharArray();
        for(int i = 0; i < n1; i++) {
            map1[word1.charAt(i)-'a']++;
        }

        int[] map2 = new int[26];
        //char[] chars2 = word2.toCharArray();
        for(int i = 0; i < n1; i++) {
            map2[word2.charAt(i)-'a']++;
        }

        // 类型相同
        for(int i = 0; i < 26; i++) {
            // 二者必须同时大于0
            if(map1[i] > 0 && map2[i] == 0
                || map1[i] == 0 && map2[i] > 0) {
                return false;
            }
        }

        // 频率相同
        Arrays.sort(map1);
        Arrays.sort(map2);
        for(int i = 0; i < 26; i++) {
            if(map1[i] != map2[i]) {
                return false;
            }
        }
        
        return true;     
    }
```

### 效果

8ms 击败 96.91%




# 参考资料