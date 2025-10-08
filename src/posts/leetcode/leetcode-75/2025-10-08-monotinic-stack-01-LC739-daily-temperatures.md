---
title: LC739. 每日温度 daily-temperatures 
date: 2025-10-07
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC739. 每日温度 daily-temperatures 

给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。

如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:

输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]


示例 2:

输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]

示例 3:

输入: temperatures = [30,60,90]
输出: [1,1,0]
 

提示：

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100



# v1-暴力

## 思路

先不用思考任何技巧，直接用最暴力的方式来解决。

## 实现

```java
class Solution {
 
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];

        for (int i = 0; i < n; i++) {
            int cur = temperatures[i];
            // 找到下一个更高温度
            int next = 0;
            for(int j = i+1; j < n; j++) {
                if(temperatures[j] > cur) {
                    // 计算相对天数
                    next = j-i;
                    break;
                }
            }
            answer[i] = next;
        }

        return answer;
    }


}
```

## 效果

超出时间限制
47 / 48 个通过的测试用例

## 复杂度

O(N^2)

## 反思

虽说超时合情合理，但是如果没接触过单调栈，要如何思考这个问题呢？

# v2-排序+二分

## 思路

那么排序+二分可行吗？

不过排序需要维护以前的 index 下标，可以用一个额外的数组保存，也可以只用一个 indexList 存储下标，排序的时候通过 temperatures[i] 排序。

温度降序，相同的话，就按照索引升序。

好处：可以直接看当前右边找到高于当前节点的信息。正好就是高于当前温度的第一个天数。

如果查找右边高于当前的温度：可以用 treeSet 来存储处理，更简单一些。内置二分查找。

## 实现

```java
import java.util.*;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];

        
        Integer[] indexList = new Integer[n];
        for (int i = 0; i < n; i++) indexList[i] = i;
        // 按温度降序排序（温度高的先处理）
        Arrays.sort(indexList, (a, b) -> {
            if (temperatures[a] != temperatures[b]) {
                return temperatures[b] - temperatures[a];
            }
            return a - b; // 相同温度按索引升序
        });


        TreeSet<Integer> processed = new TreeSet<>();
        for (int idx : indexList) {
            // 找到右边第一个已出现的更高温索引
            Integer higher = processed.higher(idx);
            if (higher != null) {
                ans[idx] = higher - idx;
            }
            processed.add(idx);
        }

        return ans;
    }
}
```

## 效果

345ms 击败 5.39%

## 复杂度

TC 是 O(n*log(n))

## 反思

虽然很慢，但是毕竟 AC 了。

但是一般比赛不太推荐这种解法，有点复杂。

## 手写二分

### 思路

当然，如果你不想用 TreeSet，自己写二分也是一样的效果。

### 实现

```java
import java.util.*;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];

        // 构造索引数组（0~n-1）
        Integer[] indexList = new Integer[n];
        for (int i = 0; i < n; i++) indexList[i] = i;

        // 按温度降序排序（温度高的先处理）
        Arrays.sort(indexList, (a, b) -> {
            if (temperatures[a] != temperatures[b]) {
                return temperatures[b] - temperatures[a];
            }
            return a - b; // 同温度按索引升序
        });

        // 维护“已处理的更高温索引”列表（升序排列）
        List<Integer> processed = new ArrayList<>(n);

        for (int idx : indexList) {
            // 用二分法找第一个 > idx 的位置（右边第一个更高温天）
            int pos = upperBound(processed, idx);
            if (pos < processed.size()) {
                ans[idx] = processed.get(pos) - idx;
            }
            // 将当前下标插入，保持 processed 有序
            processed.add(pos, idx);
        }

        return ans;
    }

    // upperBound：找到 list 中第一个 > target 的位置
    private int upperBound(List<Integer> list, int target) {
        int left = 0, right = list.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (list.get(mid) <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

### 效果

可以发现我们自己手写的效果反而更差

1031ms 击败 5.39%

为什么这么慢呢？

ArrayList 插入可能要 O(n) 移动也是一个大的问题，毕竟 TreeSet 底层是红黑树，插入为 O(logn) 级别。

# v3-单调栈

## 思路

这个是这种类型题目，最推荐的解法。

前提是接触过，能想到这个解法。

其实 v2 已经有一点影子了。

从右往左遍历，好处是保留下来的第一个就是满足条件的右边的第一个元素。

## 实现

```java
import java.util.*;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];

        Stack<Integer> stack = new Stack<>();
        for (int i = n-1; i >= 0; i--) {
            int cur = temperatures[i];
            // 维持单调递增的关系，其他的全部移除
            while(!stack.isEmpty() && cur >= temperatures[stack.peek()]) {
                stack.pop();
            }

            // 第一个满足的右边元素
            if(!stack.isEmpty()) {
                ans[i] = stack.peek() - i;
            }

            // 存储当前位置
            stack.push(i);
        }

        return ans;
    }
    
}
```

## 效果

85ms 击败 32.19%

## 复杂度

TC: O(n)

SC: O(n)

## 反思

那么问题就来了，已经是单调栈了，为什么性能还不是 top1 梯队？

一般就是数据结构的问题了。

# v4-数组模拟

## 思路

我们用 array 模拟实现 stack，实现性能的提升。

模拟创建一个数组，大小为 n。然后 top 指针模拟。

## 实现

```java
import java.util.*;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];

        int[] stack = new int[n];
        int top = 0;

        for (int i = n-1; i >= 0; i--) {
            int cur = temperatures[i];
            // 维持单调递增的关系，其他的全部移除
            while(top > 0 && cur >= temperatures[stack[top-1]]) {
                top--;
            }

            // 第一个满足的右边元素
            if(top > 0) {
                ans[i] = stack[top-1] - i;
            }

            // 存储当前位置
            stack[top++] = i;
        }

        return ans;
    }
    
}
```

## 效果

9ms 击败 97.17%

## 复杂度

TC：O(n)

SC: O(n)

## 反思

还能进一步优化吗？

# v5-空间压缩

## 思路

其实可以进一步把答案直接压缩到 res 数组中，省略掉一个 stack 数组

## 实现

```java
import java.util.*;

public class Solution {
    public int[] dailyTemperatures(int[] T) {
        int n = T.length;
        int[] ans = new int[n];

        for (int i = n - 2; i >= 0; i--) {
            int j = i + 1;
            // 跳过比当前温度小的天
            while (j < n && T[i] >= T[j]) {
                if (ans[j] > 0) {
                    j += ans[j]; // 利用答案数组跳跃
                } else {
                    j = n; // 右边没有更高温了
                }
            }
            if (j < n) ans[i] = j - i;
        }

        return ans;
    }
}
```

## 效果

8ms 击败 99.93%

## 反思

小小的空间优化，不过不太利于思考。

还是推荐 v4 版本，已经兼顾了空间+时间。

# 参考资料