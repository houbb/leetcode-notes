---
title: LC14. 最长公共前缀 longest-common-prefix
date: 2025-10-21
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC14. 最长公共前缀 longest-common-prefix

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

 

示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
 

提示：

1 <= strs.length <= 200

0 <= strs[i].length <= 200

strs[i] 如果非空，则仅由小写英文字母组成
 
# v1-暴力

## 思路

直接暴力循环匹配

## 实现

```java
class Solution {
    
    public String longestCommonPrefix(String[] strs) {
        int n = strs.length;

        StringBuilder buffer = new StringBuilder();
        String first = strs[0];

        for(int i = 0; i < first.length(); i++) {
            // 每一个位置？
            if(!isAllFit(strs, i)) {
                break;
            }

            buffer.append(first.charAt(i));
        }    

        return buffer.toString();    
    }

    private boolean isAllFit(String[] strs, int i) {
        String first = strs[0];
        int n = first.length();
        if(i > n - 1) {
            return false;
        }

        char fc = first.charAt(i);
        for(int j = 1; j < strs.length; j++) {
            String str = strs[j];
            
            if(i >= str.length() || str.charAt(i) != fc) {
                return false;
            }
        }

        return true;
    }

}
```

## 效果

1ms 击败 75.03%

## 反思

还能更快吗？

# 其他解法思路

| 方法    | 平均速度          | 适用场景      |
| ----- | ------------- | --------- |
| 逐字符比对 | ✅ 快且简单        | 一般情况      |
| 二分查找  | 🚀 更快（长字符串场景） | 字符串极长，前缀短 |
| 分治法   | 🧩 理论优雅       | 并行或递归应用   |
| Trie  | 🔍 扩展性强       | 频繁前缀查询    |

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
