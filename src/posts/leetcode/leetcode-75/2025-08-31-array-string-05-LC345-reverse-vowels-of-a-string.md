---
title: LC345. 反转字符串中的元音字母  reverse-vowels-of-a-string
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# 345. 反转字符串中的元音字母

给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。

示例 1：

输入：s = "IceCreAm"

输出："AceCreIm"

解释：

s 中的元音是 ['I', 'e', 'e', 'A']。反转这些元音，s 变为 "AceCreIm".

示例 2：

输入：s = "leetcode"

输出："leotcede"

 

提示：

1 <= s.length <= 3 * 10^5
s 由 可打印的 ASCII 字符组成
 
# v1-交换

## 思路

反转的本质上来说是交换。

我们可以先从头到尾找到所有的元音的位置，然后 2 个一对交换位置。

## 实现

```java
    public String reverseVowels(String s) {
        char[] chars = s.toCharArray();
        int n = chars.length;

        List<Integer> indexList = new ArrayList<>();
        Set<Character> set = new HashSet<>();
        set.add('a');
        set.add('e');
        set.add('i');
        set.add('o');
        set.add('u');
        set.add('A');
        set.add('E');
        set.add('I');
        set.add('O');
        set.add('U');
        for(int i = 0; i < n; i++) {
            char c = chars[i];
            if(set.contains(c)) {
                indexList.add(i);
            }
        }

        if(indexList.size() <= 1) {
            return s;
        }

        // 交换
        int left = 0;
        int right = indexList.size()-1;

        while(left < right) {
            int li = indexList.get(left);
            int ri = indexList.get(right);

            char lc = chars[li];
            char rc = chars[ri];

            //swap
            chars[li] = rc;
            chars[ri] = lc;

            left++;
            right--;
        }

        return new String(chars);
    }
```


## 效果

4ms 击败 56.81%

## 复杂度

时间复杂度是 O(n)，空间复杂度是 O(n)

## 反思

当然，这样有一点慢，我们可以优化一下

# 优化1-set 优化

## 思路

char 的范围，我们可以用自哈希数组来替代。

这个字符的判断中是一个很常见的技巧


## 实现

```java
public String reverseVowels(String s) {
        char[] chars = s.toCharArray();
        int n = chars.length;

        boolean[] set = new boolean[128];
        for(char c : new char[]{'a','e','i','o','u','A','E','I','O', 'U'}) {
            set[c] = true;
        }

        List<Integer> indexList = new ArrayList<>();
        for(int i = 0; i < n; i++) {
            char c = chars[i];
            if(set[c]) {
                indexList.add(i);
            }
        }

        if(indexList.size() <= 1) {
            return s;
        }

        // 交换
        int left = 0;
        int right = indexList.size()-1;

        while(left < right) {
            int li = indexList.get(left);
            int ri = indexList.get(right);

            char lc = chars[li];
            char rc = chars[ri];

            //swap
            chars[li] = rc;
            chars[ri] = lc;

            left++;
            right--;
        }

        return new String(chars);
    }
```

## 效果

2ms 击败 98.50%

反思，如此，就从普通变得优秀起来了。

## 复杂度

时间复杂度是 O(n)，空间复杂度是 O(n)

# v3-空间优化

## 思路

其实 indexList 真的是必须的吗？

我们现在是把元音字母放在 indexList 中，然后再交换。

当然，格局可以大一点。

直接在原始的 char 数组上处理。

## 实现

```java
    public String reverseVowels(String s) {
        char[] chars = s.toCharArray();
        int n = chars.length;

        boolean[] set = new boolean[128];
        for(char c : new char[]{'a','e','i','o','u','A','E','I','O', 'U'}) {
            set[c] = true;
        }

        int left = 0;
        int right = n-1;

        while(left < right) {
            // 跳过不是元音的部分
            while(left < right && !set[chars[left]]) {
                left++;
            }
            while(left < right && !set[chars[right]]) {
                right--;
            }

            //swap
            if(left < right) {
                char temp = chars[left];
                chars[left] = chars[right];
                chars[right] = temp;

                left++;
                right--;
            }
        }

        return new String(chars);
    }
```

## 效果

1ms 击败 100.00%

## 复杂度

TC: O(N)

SC: O(1)

# 参考资料

