---
title: LC17. 电话号码的字母组合 letter-combinations-of-a-phone-number
date: 2025-10-04
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, backtracking]
published: true
---

# LC17. 电话号码的字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![1](https://pic.leetcode.cn/1752723054-mfIHZs-image.png)

示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]
 

提示：

0 <= digits.length <= 4
digits[i] 是范围 ['2', '9'] 的一个数字。

# v1-backtrack

## 思路

组合问题，直接上回溯。

处理一下数字和字符集合的映射即可。

## 实现

```java
class Solution {

    String[] mappings = {
        "","", "abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if(digits == null || digits.equals("")) {
            return res;
        }

        StringBuilder path = new StringBuilder();
        backtrack(res, digits, path, 0);
        return res;
    }

    private void backtrack(List<String> res, String digits, StringBuilder path, int ix) {
        // 满足条件
        if(path.length() == digits.length()) {
            res.add(path.toString());
            return;
        }

        int num = digits.charAt(ix) - '0';
        String inputs = mappings[num];

        
        for(char c : inputs.toCharArray()) {
            //尝试 
            path.append(c);

            // 递归
            backtrack(res, digits, path, ix+1);

            // 回溯
            path.deleteCharAt(path.length()-1);
        }
    }

}
```


## 效果 

0ms 100%

## 反思

整体并不难，用例也不够严格。

可以作为回溯的入门题目。




# 参考资料