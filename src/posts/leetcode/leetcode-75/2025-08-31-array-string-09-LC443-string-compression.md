---
title: LC443. 压缩字符串 string-compression
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, string]
published: true
---

# LC443. 压缩字符串 string-compression

给你一个字符数组 chars ，请使用下述算法压缩：

从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符 ：

如果这一组长度为 1 ，则将字符追加到 s 中。
否则，需要向 s 追加字符，后跟这一组的长度。
压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。

请在 修改完输入数组后 ，返回该数组的新长度。

你必须设计并实现一个只使用常量额外空间的算法来解决此问题。

注意：数组中超出返回长度的字符无关紧要，应予忽略。

 

示例 1：

输入：chars = ["a","a","b","b","c","c","c"]
输出：返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]
解释："aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。
示例 2：

输入：chars = ["a"]
输出：返回 1 ，输入数组的前 1 个字符应该是：["a"]
解释：唯一的组是“a”，它保持未压缩，因为它是一个字符。
示例 3：

输入：chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
输出：返回 4 ，输入数组的前 4 个字符应该是：["a","b","1","2"]。
解释：由于字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbbb" 被 “b12” 替代。
 

提示：

1 <= chars.length <= 2000
chars[i] 可以是小写英文字母、大写英文字母、数字或符号



# v1-借助空间

## 思路

首先借助额外空间，实现这个基本的特性。

这里主要是理解题意就行，原始的 chars 需要进行处理，然后返回的是需要关注的长度。

## 实现

```java
    public int compress(char[] chars) {
        int n = chars.length;
        if(n == 1) {
            return 1;
        }

        StringBuilder buffer = new StringBuilder();

        char pre = chars[0];
        int count = 1;
        // 遍历
        for(int i = 1; i < n; i++) {
            char c = chars[i];

                
            
            // 最后一个
            if(i == n-1) {
                if(c != pre) {
                    buffer.append(pre);
                    if(count > 1) {
                        buffer.append(count);
                    }
                    buffer.append(c);
                } else {
                    // 相同
                    count++;
                    buffer.append(c);
                    buffer.append(count);
                }
            } else {
                // 不是最后一个
                // 不相等，则前面的信息入库
                if(c != pre) {
                    buffer.append(pre);
                    if(count > 1) {
                        buffer.append(count);
                    }
                    count = 1;
                } else {
                    count++;
                } 
            }

            pre = c;    
        }

        for(int i = 0; i < buffer.length(); i++) {
            chars[i] = buffer.charAt(i);
        }

        return buffer.length();    
    }
```


## 效果

1ms 击败 81.36%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

我们是否存在一种方法，可以只使用常量空间呢

# v2-使用常量的空间

## 思路

这种一般大概率就是指针来解决。

整体实现和上上面类似，我们用 left + right 两个指针。

left=right=0;

right 像普通的遍历一样，left 则对应的是结果真实的位置。

返回值：left

## 实现

```java
    public int compress(char[] chars) {
        int n = chars.length;
        if(n == 1) {
            return 1;
        }


        char pre = chars[0];
        int count = 1;
        int left = 0;
        // 遍历
        for(int right = 1; right < n; right++) {
            char c = chars[right];
            
            // 最后一个
            if(right == n-1) {
                if(c != pre) {
                    chars[left++] = pre;
                    if(count > 1) {
                        left = appendCount(chars, left, count);
                    }
                    chars[left++] = c;
                } else {
                    // 相同
                    count++;
                    chars[left++] = c;
                    left = appendCount(chars, left, count);
                }
            } else {
                // 不是最后一个
                // 不相等，则前面的信息入库
                if(c != pre) {
                    chars[left++] = pre;
                    if(count > 1) {
                        left = appendCount(chars, left, count);
                    }
                    count = 1;
                } else {
                    count++;
                } 
            }

            pre = c;    
        }


        return left;    
    }

    // 也可以用除法加入
    private int appendCount(char[] chars, int left, int count) {
        String countStr = count+"";
        for(int i = 0; i < countStr.length(); i++) {
            chars[left++] = countStr.charAt(i);
        }

        return left;
    }
```

## 效果

1ms 击败 81.36%

## 复杂度

TC: O(n)

SC: O(1)

# v3-优化

## 最后一个字符的优化

其实我们可以针对最后一个判断稍微优化下，看起来代码简单一些

```java
public int compress(char[] chars) {
        int n = chars.length;
        if(n == 1) {
            return 1;
        }


        char pre = chars[0];
        int count = 1;
        int left = 0;
        // 遍历
        for(int right = 1; right < n; right++) {
            char c = chars[right];
            
            // 不相等，则前面的信息入库
            if(c != pre) {
                chars[left++] = pre;
                if(count > 1) {
                    left = appendCount(chars, left, count);
                }
                count = 1;
            } else {
                count++;
            }

            pre = c;    
        }

        // 最后一个
        chars[left++] = pre;
        if(count > 1) {
            left = appendCount(chars, left, count);
        }


        return left;    
    }

    // 也可以用除法加入
    private int appendCount(char[] chars, int left, int count) {
        String countStr = count+"";
        for(int i = 0; i < countStr.length(); i++) {
            chars[left++] = countStr.charAt(i);
        }

        return left;
    }
```

## appendCount 改写

可以考虑这样写，这样避免 string 对象的创建，性能会好一些。

通过除法，获取逆序数字，然后 reverse

```java
private int appendCount(char[] chars, int left, int count) {
    // 先把数字倒着写，再反转
    int start = left;
    while (count > 0) {
        chars[left++] = (char) ('0' + (count % 10));
        count /= 10;
    }
    // 翻转刚写的数字部分
    reverse(chars, start, left - 1);
    return left;
}

private void reverse(char[] chars, int l, int r) {
    while (l < r) {
        char tmp = chars[l];
        chars[l++] = chars[r];
        chars[r--] = tmp;
    }
}
```

### 效果

0ms 100%

# 参考资料