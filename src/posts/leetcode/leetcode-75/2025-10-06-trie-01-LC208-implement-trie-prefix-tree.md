---
title: LC208. 实现 Trie (前缀树) implement-trie-prefix-tree
date: 2025-10-06
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, trie]
published: true
---

# LC208. 实现 Trie (前缀树) implement-trie-prefix-tree

Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。

这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 

示例：

输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
 

提示：

1 <= word.length, prefix.length <= 2000
word 和 prefix 仅由小写英文字母组成
insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次


# v1-前缀树

## 思路

我们直接拿实现最基本的

## 实现

```java
class Trie {

    class TrieNode {
        boolean isEnd;
        TrieNode[] children = new TrieNode[26];
    }

    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        char[] chars = word.toCharArray();

        TrieNode node = root;
        for(char c : chars) {
            int ix = c - 'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                child = new TrieNode();
            }
            node.children[ix] = child;

            node = child;
        }   

        node.isEnd = true;
    }
    
    public boolean search(String word) {
        char[] chars = word.toCharArray();
        TrieNode node = root;

        for(char c : chars) {
            int ix = c - 'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                return false;
            }

            node = child;
        }   

        // 刚好结尾
        return node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        char[] chars = prefix.toCharArray();
        TrieNode node = root;

        for(char c : chars) {
            int ix = c - 'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                return false;
            }
            
            node = child;
        }   

        // 包含
        return true;
    }
}
```

## 效果

38ms 击败 30.78%

## 反思

为什么这么慢呢？

## 尝试优化1-避免数组创建

### 思路

首先避免 chars 数组创建

### 实现

```java
class Trie {

    class TrieNode {
        boolean isEnd;
        TrieNode[] children = new TrieNode[26];
    }

    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode node = root;

        for(int i = 0; i < word.length(); i++) {
            int ix = word.charAt(i)-'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                child = new TrieNode();
            }
            node.children[ix] = child;

            node = child;
        }   

        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = root;

        for(int i = 0; i < word.length(); i++) {
            int ix = word.charAt(i)-'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                return false;
            }

            node = child;
        }   

        // 刚好结尾
        return node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode node = root;

        for(int i = 0; i < prefix.length(); i++) {
            int ix = prefix.charAt(i)-'a';
            TrieNode child = node.children[ix];
            if(child == null) {
                return false;
            }
            
            node = child;
        }   

        // 包含
        return true;
    }
}
```

### 效果

39ms 击败 27.53%

jdk 中的 charAt 还有额外的边界校验，性能并没有变好。

## 反思

直接测试，就算把 top1 的解法执行，耗时依然差不多。实现也是大同小异。


# 参考资料