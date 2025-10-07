---

title: Trie (前缀树)
date: 2025-10-06
categories: [Althgorim]
tags: [althgorim, trie]
published: true
---


# 前缀树（Trie）

## 1️⃣ 前缀树的概念

前缀树，又叫 **字典树（Trie）**，是一种树形数据结构，用于 **高效存储和查找字符串集合**，尤其擅长处理 **前缀匹配问题**。

特点：

1. 每个节点表示一个字符串的 **前缀**，根节点表示空字符串。
2. 从根节点到某个节点的路径，形成了该节点所代表的字符串前缀。
3. 节点通常包含：

   * 子节点指针（可以是数组、哈希表等）
   * 是否为完整字符串的标记（例如 `isEnd`）

**核心思想**：公共前缀只存储一次，节省空间，并且查找操作复杂度与字符串长度相关，而不是与集合大小成正比。

---

## 2️⃣ 前缀树的结构

举个例子，我们有字符串集合：`["cat", "cap", "can"]`。

前缀树可表示为：

```
        root
       /    
      c
     / 
    a
   /|\
  t p n
```

* `c → a → t` 表示 `"cat"`
* `c → a → p` 表示 `"cap"`
* `c → a → n` 表示 `"can"`
* 节点 `t`, `p`, `n` 的 `isEnd = true` 表示字符串结束

如果有 `"bat"`，结构会变成：

```
        root
       /    \
      c      b
     /       \
    a         a
   /|\         \
  t p n         t
```

---

## 3️⃣ 前缀树的常见操作

假设我们用一个简单的类结构表示节点：

```java
class TrieNode {
    boolean isEnd;
    Map<Character, TrieNode> children = new HashMap<>();
}
```

### 3.1 插入（Insert）

向前缀树中插入字符串：

```java
void insert(String word) {
    TrieNode node = root;
    for (char ch : word.toCharArray()) {
        node.children.putIfAbsent(ch, new TrieNode());
        node = node.children.get(ch);
    }
    node.isEnd = true;
}
```

**时间复杂度**：O(L)，L = 字符串长度

---

### 3.2 查询（Search）

判断字符串是否存在：

```java
boolean search(String word) {
    TrieNode node = root;
    for (char ch : word.toCharArray()) {
        if (!node.children.containsKey(ch)) return false;
        node = node.children.get(ch);
    }
    return node.isEnd;
}
```

**时间复杂度**：O(L)

---

### 3.3 前缀查询（StartsWith）

判断是否存在某个前缀：

```java
boolean startsWith(String prefix) {
    TrieNode node = root;
    for (char ch : prefix.toCharArray()) {
        if (!node.children.containsKey(ch)) return false;
        node = node.children.get(ch);
    }
    return true;
}
```

* 前缀查询非常快，因为只需要遍历前缀长度，不需要遍历整个集合。

---

## 4️⃣ 前缀树的变体

1. **数组代替哈希表**
   如果字符集固定（如小写字母 a–z），用 `TrieNode[26]` 代替 `Map` 更快、更省内存。

```java
class TrieNode {
    boolean isEnd;
    TrieNode[] children = new TrieNode[26];
}
```

2. **压缩前缀树（Radix Tree）**
   当一个节点只有一个子节点时，可以将路径压缩成一个字符串，减少空间。

3. **后缀树**
   存储字符串所有后缀，方便做模式匹配、字符串统计。

---

## 5️⃣ 前缀树的应用场景

1. **单词搜索 / 拼写检查**

   * 自动补全：输入 `"ca"` → `"cat"`, `"cap"`, `"can"`
   * 单词是否存在
2. **前缀统计**

   * 查询某前缀出现次数（比如搜索引擎建议）
3. **字符串集合的高效匹配**

   * 如敏感词过滤
   * DNA序列匹配
4. **多字符串最长公共前缀**

   * 可以快速找到公共前缀，复杂度 O(L × N)
5. **LeetCode 相关题**

   * LC 208. 实现 Trie
   * LC 720. 词典中最长的单词

---

## 6️⃣ 总结

* Trie 是一种 **以空间换时间** 的字符串集合存储结构。
* 查找、插入、前缀查询复杂度与字符串长度相关，而与集合大小无关。
* 适合 **大量字符串和前缀操作** 场景。
* 可以用 **数组或哈希表** 存储子节点，根据字符集大小选择。
