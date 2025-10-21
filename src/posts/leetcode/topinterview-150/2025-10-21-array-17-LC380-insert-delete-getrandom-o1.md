---
title: LC380. O(1) 时间插入、删除和获取随机元素 insert-delete-getrandom-o1
date: 2025-10-17
categories: [TopInterview150]
tags: [leetcode, topInterview150, array, sort]
published: true
---

# LC380. O(1) 时间插入、删除和获取随机元素

实现RandomizedSet 类：

RandomizedSet() 初始化 RandomizedSet 对象

bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。

bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。

int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。

你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。

示例：

输入

```
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
```

输出

```
[null, true, false, true, 2, true, false, 2]
```

解释

```
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
```

提示：

-2^31 <= val <= 2^31 - 1

最多调用 insert、remove 和 getRandom 函数 2 * 10^5 次

在调用 getRandom 方法时，数据结构中 至少存在一个 元素。


# v1-单独Hash

## 思路

说到 O(1)，最容易想到的应该是哈希。

## 实现

```java
class RandomizedSet {

    private Set<Integer> set = new HashSet<>();
    Random random = new Random();
    public RandomizedSet() {
        
    }
    
    public boolean insert(int val) {
        return set.add(val);
    }
    
    public boolean remove(int val) {
        return set.remove(val);
    }
    
    public int getRandom() {
        //随机返回一个值？
        int size = set.size();
        int randomVal = random.nextInt(size);
        Iterator<Integer> iter = set.iterator();
        int count = 0;
        while(iter.hasNext()) {
            int num = iter.next();
            count++;
            if(count > randomVal) {
                return num;
            }
        }

        return -1; 
    }
}
```

## 效果

132ms 击败 8.59%

## 反思

虽然 AC 了，但是 getRandom 明显不合格。

太慢了


# v2-数组+哈希

## 思路

想要实现 random O(1)，那么最好的方式其实是数组。

## 实现

```java
import java.util.*;

class RandomizedSet {
    private List<Integer> list;
    private Map<Integer, Integer> map; // val -> index
    private Random random;

    public RandomizedSet() {
        list = new ArrayList<>();
        map = new HashMap<>();
        random = new Random();
    }

    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, list.size());
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;

        int index = map.get(val);
        int lastVal = list.get(list.size() - 1);

        // 把最后一个值换到要删除的位置
        list.set(index, lastVal);
        map.put(lastVal, index);

        // 删除最后一个元素
        list.remove(list.size() - 1);
        map.remove(val);
        return true;
    }

    public int getRandom() {
        int idx = random.nextInt(list.size());
        return list.get(idx);
    }
}
```


## 效果

26ms 击败 89.39%

## 反思

当然，我们可以用 array 直接替代掉 list，避免扩容等损耗。

不过这个空间要求相对比较大，不见得有性能优势。

我们可以尝试一下

# v3-static array + 哈希

## 思路

我们开辟一个全局的数组，因为次数比较多，所以默认大小为 20W

## 实现

```java
import java.util.*;

class RandomizedSet {
    private static final int MAX_SIZE = 200_000;
    private static final int[] arr = new int[MAX_SIZE];
    private static int arrayIndex = 0; // 当前有效长度

    private Map<Integer, Integer> map; // val -> index
    private Random random;

    public RandomizedSet() {
        map = new HashMap<>();
        random = new Random();
        // 重置索引，防止多个实例共享旧数据
        arrayIndex = 0; 
    }

    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        arr[arrayIndex] = val;
        map.put(val, arrayIndex);
        arrayIndex++;
        return true;
    }

    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;

        int index = map.get(val);
        int lastVal = arr[arrayIndex - 1];

        // 用最后一个值覆盖要删除的位置
        arr[index] = lastVal;
        map.put(lastVal, index);

        // 删除最后一个元素
        arrayIndex--;
        map.remove(val);
        return true;
    }

    public int getRandom() {
        int idx = random.nextInt(arrayIndex);
        return arr[idx];
    }
}
```

## 效果

35ms 击败 26.85%

# 拓展

这个解法有什么用？实际上在 redis 底层和这个是类似的。

## redis 中是如何实现 randomKey 的？

```mermaid
flowchart TD

A[调用 RANDOMKEY 命令] --> B[获取当前数据库 db->dict]
B --> C[调用 dictGetRandomKey(dict)]
C --> D[随机选择一个哈希槽 h = random() & sizemask]
D --> E{槽 h 是否为空?}
E -- 是 --> D  // 重新随机选择
E -- 否 --> F[获取槽内第一个链表节点]
F --> G{链表是否有冲突?}
G -- 否 --> H[直接返回该节点 key]
G -- 是 --> I[计算链表长度 listlen]
I --> J[随机选择 listele = rand() % listlen]
J --> K[遍历链表至第 listele 个节点]
K --> H
H --> L[返回 key 给客户端]
```

dict 是 Redis 的底层哈希表结构；

每个槽（bucket）里可能存一个或多个 dictEntry（链表节点）；

Redis 使用 sizemask 让随机数落在哈希表索引范围内；

平均复杂度依然是 O(1)。

# 开源地址

为了便于大家学习，所有实现均已开源。欢迎 fork + star~

> 笔记 [https://github.com/houbb/leetcode-notes](https://github.com/houbb/leetcode-notes)

> 源码 [https://github.com/houbb/leetcode](https://github.com/houbb/leetcode)


# 参考资料

https://leetcode.cn/problems/jump-game-ix/solutions/3762167/jie-lun-ti-pythonjavacgo-by-endlesscheng-x2qu/
