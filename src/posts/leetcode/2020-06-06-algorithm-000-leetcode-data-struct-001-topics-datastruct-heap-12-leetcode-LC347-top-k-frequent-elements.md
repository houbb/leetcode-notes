---

title: 算法篇专题之堆 heap 12-LC347. 前 K 个高频元素 top-k-frequent-elements
date:  2020-06-08
categories: [Algorithm]
tags: [algorithm, data-struct, topics, leetcode, heap, sf]
published: true
---


# 数组

大家好，我是老马。

今天我们一起来学习一下数组中的前 K 个高频元素

# LC347. 前 K 个高频元素 top-k-frequent-elements

给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。

你可以按 任意顺序 返回答案。

示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]
 

提示：

1 <= nums.length <= 105
k 的取值范围是 [1, 数组中不相同的元素的个数]
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 

进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。

# v1-HashMap + 暴力排序

## 思路

HashMap 统计频率

然后把所有的信息（数值+次数）放在 list 中，排序。

## 实现

```java
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        // 放入数组中 逆序
        List<Map.Entry<Integer,Integer>> list = new ArrayList<>(countMap.entrySet()); 
        Collections.sort(list, (a,b)->(b.getValue() - a.getValue()));

        // topk
        int[] res = new int[k];
        for(int i = 0; i < k; i++) {
            res[i] = list.get(i).getKey();
        }    
        return res;
    }
```

## 效果

13ms 15.58%

## 复杂度

时间复杂度：O(n log n)（排序）

空间复杂度：O(n)

## 反思

这个解法简单粗暴，符合直觉。

很好。

# v2-HashMap + 优先级队列

## 思路

借助 HashMap 统计，然后借助优先级队列处理

## 实现

```java
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        // 小顶堆，堆里存 [数字, 频率]
        // 小的放在上面 然后丢掉，留下的就是大的
        PriorityQueue<int[]> heap = new PriorityQueue<>((a,b)->(a[1]-b[1]));
        for(Map.Entry<Integer, Integer> entry : countMap.entrySet()) {
            Integer key = entry.getKey();
            Integer count = entry.getValue();
            heap.offer(new int[]{key, count});
        }
        // 丢弃
        while(heap.size() > k) {
            heap.poll();
        }

        int[] res = new int[k];
        int ix = 0;
        while(!heap.isEmpty()) {
            res[ix++] = heap.poll()[0];
        }
        return res;
    }
```

## 效果

13ms 击败 64.18%

## 复杂度

时间复杂度：O(n log k)

空间复杂度：O(n)

# v3-桶排序

## 思路

这里最核心的除了统计，就是排序了。

如果我们可以针对排序从 O(n*logn)->O(n) 也是一种提升。

1）我们直接在 v1 的基础上修改，用桶排序来替代。

2）逆序设置即可

## 实现

```java
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        // 桶数组，下标代表频率
        List<Integer>[] bucket = new List[nums.length + 1];
        for (int key : countMap.keySet()) {
            int freq = countMap.get(key);
            if (bucket[freq] == null) {
                bucket[freq] = new ArrayList<>();
            }
            bucket[freq].add(key);
        }
        
        // topk
        int[] res = new int[k];
        int count = 0;
        for(int i = bucket.length-1; i >= 0; i--) {
            List<Integer> freqNums = bucket[i];
            if(freqNums != null) {
                for(Integer num : freqNums) {
                    res[count++] = num;
                    if(count >= k) {
                        return res;
                    }
                }
            }
        }    
        return res;
    }
```


## 效果

10ms 击败 93.76%

## 复杂度

统计次数：O(n)

填桶：O(m)

遍历桶：O(n + k)

总体：O(n)，比排序的 O(m log m) 更优。


# 开源项目

为方便大家学习，所有相关文档和代码均已开源。

[leetcode-visual 资源可视化](https://houbb.github.io/leetcode-notes/leetcode/visible/index.html)

[leetcode 算法实现源码](https://github.com/houbb/leetcode)

[leetcode 刷题学习笔记](https://github.com/houbb/leetcode-notes)

[老马技术博客](https://houbb.github.io/)

# 小结

希望本文对你有帮助，如果有其他想法的话，也可以评论区和大家分享哦。

各位极客的点赞收藏转发，是老马持续写作的最大动力！

下一节我们将讲解力扣经典，感兴趣的小伙伴可以关注一波，精彩内容，不容错过。