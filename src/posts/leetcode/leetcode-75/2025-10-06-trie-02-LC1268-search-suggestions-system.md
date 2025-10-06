---
title: LC1268. 搜索推荐系统 search-suggestions-system
date: 2025-10-06
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, trie]
published: true
---

# LC1268. 搜索推荐系统 search-suggestions-system

给你一个产品数组 products 和一个字符串 searchWord ，products  数组中每个产品都是一个字符串。

请你设计一个推荐系统，在依次输入单词 searchWord 的每一个字母后，推荐 products 数组中前缀与 searchWord 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，请按字典序返回最小的三个。

请你以二维列表的形式，返回在输入 searchWord 每个字母后相应的推荐产品的列表。

 

示例 1：

输入：products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
输出：[
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
解释：按字典序排序后的产品列表是 ["mobile","moneypot","monitor","mouse","mousepad"]
输入 m 和 mo，由于所有产品的前缀都相同，所以系统返回字典序最小的三个产品 ["mobile","moneypot","monitor"]
输入 mou， mous 和 mouse 后系统都返回 ["mouse","mousepad"]
示例 2：

输入：products = ["havana"], searchWord = "havana"
输出：[["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
示例 3：

输入：products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
输出：[["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
示例 4：

输入：products = ["havana"], searchWord = "tatiana"
输出：[[],[],[],[],[],[],[]]
 

提示：

1 <= products.length <= 1000
1 <= Σ products[i].length <= 2 * 10^4
products[i] 中所有的字符都是小写英文字母。
1 <= searchWord.length <= 1000
searchWord 中所有字符都是小写英文字母。
 

# v1-倒排索引

## 思路

我们直接排序+用 map 倒排处理。

map 逐个存储 prefixMap，只保留 top3

这种实现简单粗暴。

## 实现

```java
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        // 按字典序排序
        Arrays.sort(products); 
        
        // 构建倒排索引
        Map<String, List<String>> prefixMap = new HashMap<>();
        for (String product : products) {
            int len = Math.min(product.length(), searchWord.length());
            StringBuilder prefix = new StringBuilder();
            for (int i = 0; i < len; i++) {
                prefix.append(product.charAt(i));
                String key = prefix.toString();
                
                List<String> list = prefixMap.computeIfAbsent(key, k -> new ArrayList<>());
                if (list.size() < 3) {
                    list.add(product);
                }
            }
        }
        
        // 查询
        List<List<String>> res = new ArrayList<>();
        StringBuilder prefix = new StringBuilder();
        for (char c : searchWord.toCharArray()) {
            prefix.append(c);
            List<String> list = prefixMap.getOrDefault(prefix.toString(), new ArrayList<>());
            res.add(list);
        }
        
        return res;
    }
}
```

## 效果

46ms 击败 22.76%

## 反思

这里最大的问题在于 String 对象被大量创建，也被多次存储，性能比较差。

## 优化1-key 改进

### 思路

我们避免 string key 的创建，比如用 long 之类的替代，保障唯一即可。

但是实际上有一些限制，比如不能超过 12 个字符，这个用例看起来也没有超过。

类似于 buffer 的增量，long 也可以增量计算。

### 实现

```java
class Solution {
    private static final int MAX_PREFIX_LENGTH = 12;
    
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        Map<Long, List<String>> prefixMap = new HashMap<>();
        
        // 构建索引 - 避免创建过多临时对象
        for (String product : products) {
            int len = Math.min(product.length(), searchWord.length());
            long key = 0L;
            
            for (int i = 0; i < len; i++) {
                char c = product.charAt(i);
                key = computeLongKey(key, c); // 增量计算key
                
                List<String> list = prefixMap.computeIfAbsent(key, k -> new ArrayList<>());
                if (list.size() < 3) {
                    list.add(product);
                }
            }
        }
        
        // 查询 - 同样增量计算
        List<List<String>> res = new ArrayList<>();
        long searchKey = 0L;
        
        for (int i = 0; i < searchWord.length(); i++) {
            searchKey = computeLongKey(searchKey, searchWord.charAt(i));
            List<String> list = prefixMap.getOrDefault(searchKey, new ArrayList<>());
            res.add(list);
        }
        
        return res;
    }
    
    /**
     * 增量计算 long key - 更高效的版本
     * @param currentKey 当前已计算的key
     * @param nextChar 下一个要添加的字符
     * @return 新的long key
     */
    private long computeLongKey(long currentKey, char nextChar) {
        return (currentKey << 5) | (nextChar - 'a' + 1);
    }

}
```

### 效果

29ms 击败 34.02%



# v2-前缀树

## 思路

这种前缀的题目，最适合的数据结构还是前缀树。

我们根据 products 构建树，然后直接查询匹配即可。

前缀树可以全部构建，dfs 去查找结果，这样其实比较慢，我们可以节点中额外存储 list top3 结果。

## 实现

```java
class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        List<String> suggestions = new ArrayList<>(3);
    }
    
    TrieNode root = new TrieNode();
    
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        
        // 构建Trie
        for (String product : products) {
            TrieNode node = root;
            for (int i = 0; i < searchWord.length() && i < product.length(); i++) {
                int idx = product.charAt(i) - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new TrieNode();
                }
                node = node.children[idx];
                
                // 只保留前3个建议
                if (node.suggestions.size() < 3) {
                    node.suggestions.add(product);
                }
            }
        }
        
        // 查询
        List<List<String>> result = new ArrayList<>();
        TrieNode node = root;
        
        for (char c : searchWord.toCharArray()) {
            if (node == null) {
                // 如果已经到死路，后面都返回空列表
                result.add(new ArrayList<>());
                continue;
            }
            
            int idx = c - 'a';
            if (node.children[idx] != null) {
                node = node.children[idx];
                result.add(node.suggestions);
            } else {
                node = null; // 标记死路
                result.add(new ArrayList<>());
            }
        }
        
        return result;
    }
}
```

## 效果

19ms 击败 64.19%

## 优化1-数组替代 list 

### 思路

一点小的优化，比如用 

A-string[] 替代 list[]

B-使用共享列表 emptyList，避免多次创建

C-预先 ArrayList 大小，避免扩容。

当然，都是一些小的技巧

### 实现

```java
class Solution {
    static class TrieNode {
        final TrieNode[] children = new TrieNode[26];
        final String[] suggestions = new String[3];
        byte count = 0;
    }
    
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        TrieNode root = new TrieNode();
        int searchLen = searchWord.length();
        
        // 构建阶段 - 极致优化
        for (String product : products) {
            TrieNode node = root;
            int len = Math.min(product.length(), searchLen);
            
            for (int i = 0; i < len; i++) {
                int idx = product.charAt(i) - 'a';
                TrieNode child = node.children[idx];
                
                if (child == null) {
                    child = new TrieNode();
                    node.children[idx] = child;
                }
                
                if (child.count < 3) {
                    child.suggestions[child.count++] = product;
                }
                node = child;
            }
        }
        
        // 查询阶段 - 预计算大小
        ArrayList<List<String>> res = new ArrayList<>(searchLen);
        TrieNode node = root;
        
        for (int i = 0; i < searchLen; i++) {
            if (node == null) {
                res.add(java.util.Collections.EMPTY_LIST);
                continue;
            }
            
            int idx = searchWord.charAt(i) - 'a';
            TrieNode child = node.children[idx];
            
            if (child != null) {
                // 使用Arrays.asList避免创建新对象
                res.add(Arrays.asList(
                    Arrays.copyOf(child.suggestions, child.count)
                ));
                node = child;
            } else {
                res.add(java.util.Collections.EMPTY_LIST);
                node = null;
            }
        }
        
        return res;
    }
}
```

### 效果

14ms 击败 81.84%

### 反思

还能更快吗？

前缀树感觉基本达到瓶颈了。

# v3-二分

## 思路

还记得大明河畔的二分法吗？

排序+二分

## 实现

```java
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        List<List<String>> result = new ArrayList<>();
        
        for (int i = 1; i <= searchWord.length(); i++) {
            String prefix = searchWord.substring(0, i);
            
            // 使用Arrays.binarySearch找到插入位置
            int idx = Arrays.binarySearch(products, prefix);
            if (idx < 0) idx = -idx - 1; // 如果没找到，转换为插入位置
            
            List<String> suggestions = new ArrayList<>();

            // 从idx开始取最多3个匹配的单词
            for (int j = idx; j < Math.min(idx + 3, products.length); j++) {
                if (products[j].startsWith(prefix)) {
                    suggestions.add(products[j]);
                } else {
                    break; // 由于已排序，一旦不匹配后面都不会匹配
                }
            }
            result.add(suggestions);
        }
        
        return result;
    }
}
```

## 效果

12ms 击败 91.05%

## 反思

二分法很简洁，效果也不错。

但是 `products[j].startsWith(prefix)` 这里明显不够优化，还是有很大的提升空间

# v4-双指针

## 思路

我们通过双指针的思路来解决这个题

维护一个不断缩小的有效范围 [low, high]，确保这个范围内的所有字符串都匹配当前搜索前缀。

从而避免前缀树的创建，也避免了上面二分的 startWith 问题

## 实现

```java
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        Arrays.sort(products);
        List<List<String>> result = new ArrayList<>();
        
        int low = 0, high = products.length - 1;
        
        for (int i = 0; i < searchWord.length(); i++) {
            char c = searchWord.charAt(i);
            
            // 渐进式缩小范围：找到第一个第i个字符 >= c 的位置
            while (low <= high && 
                   (products[low].length() <= i || products[low].charAt(i) < c)) {
                low++;
            }
            
            // 渐进式缩小范围：找到最后一个第i个字符 <= c 的位置
            while (low <= high && 
                   (products[high].length() <= i || products[high].charAt(i) > c)) {
                high--;
            }
            
            List<String> suggestions = new ArrayList<>();
            if (low <= high) {
                // 取最多3个，由于范围已经缩小，这些肯定都匹配前缀
                for (int j = low; j <= Math.min(low + 2, high); j++) {
                    suggestions.add(products[j]);
                }
            }
            result.add(suggestions);
        }
        
        return result;
    }
}  
```

## 效果

8ms 击败 97.44%

## 反思

效果拔群 还能更快吗？


# v5-快排+提前结束

## 思路

排序优化

提前终止优化

## 实现

```java
class Solution {
    public List<List<String>> suggestedProducts(String[] products, String searchWord) {
        // 1. 使用快速排序替代Arrays.sort (针对字符串特化)
        quickSort(products, 0, products.length - 1);
        //Arrays.sort(products);
        
        int searchLen = searchWord.length();
        List<List<String>> result = new ArrayList<>(searchLen);
        int low = 0, high = products.length - 1;
        
        char[] chars = searchWord.toCharArray();
        for (int i = 0; i < searchLen; i++) {
            char c = chars[i];
            
            // 2. 优化边界检查：内联字符比较
            int newLow = findLowerBound(products, low, high, c, i);
            int newHigh = findUpperBound(products, newLow, high, c, i);
            
            // 3. 提前终止：如果没有匹配项
            if (newLow > newHigh) {
                // 填充剩余结果为空列表
                for (int j = i; j < searchLen; j++) {
                    result.add(java.util.Collections.EMPTY_LIST);
                }
                return result;
            }
            
            low = newLow;
            high = newHigh;
            
            // 4. 直接创建固定大小列表，避免动态扩容
            int size = Math.min(3, high - low + 1);
            List<String> suggestions = new ArrayList<>(size);
            for (int j = 0; j < size; j++) {
                suggestions.add(products[low + j]);
            }
            result.add(suggestions);
        }
        
        return result;
    }
    
    // 专用方法：找到第一个匹配的下界
    private int findLowerBound(String[] products, int low, int high, char target, int pos) {
        while (low <= high) {
            String str = products[low];
            if (str.length() > pos && str.charAt(pos) >= target) {
                break;
            }
            low++;
        }
        return low;
    }
    
    // 专用方法：找到最后一个匹配的上界
    private int findUpperBound(String[] products, int low, int high, char target, int pos) {
        while (low <= high) {
            String str = products[high];
            if (str.length() > pos && str.charAt(pos) <= target) {
                break;
            }
            high--;
        }
        return high;
    }
    
    // 优化的快速排序，针对字符串比较优化
    private void quickSort(String[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private int partition(String[] arr, int low, int high) {
        String pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j].compareTo(pivot) <= 0) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private void swap(String[] arr, int i, int j) {
        String temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

## 效果

4ms 100%

## 反思

为什么系统的排序未必最优？

主要还是用例的数据问题，这就导致系统排序需要额外的判断。

### 系统排序

其实系统排序堪称优秀：

小数组（<47）时使用插入排序

中等数组使用快速排序

大数据量时使用归并排序保证稳定性

自动检测近乎有序的数据，优化pivot选择


# 参考资料