---

title: 算法篇专题之栈 stack 03-LC155. 最小栈 min-stack
date:  2020-06-08
categories: [TopLiked100]
tags: [algorithm, data-struct, topics, leetcode, stack, top100, sf]
published: true
---



# 数组

大家好，我是老马。

今天我们一起来学习一下最小栈 

# 栈专题

[LC20. 有效的括号 valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-datastruct-stack-02-leetcode-T20.html)

[LC32. 最长有效括号 longest-valid-parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-topics-algorithms-dp-21-leetcode-LC32-longest-valid-parentheses.html)

[22.括号生成 generate-parentheses + 20. 有效的括号 valid parentheses + 32. 最长有效括号 Longest Valid Parentheses](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-012-leetcode-22-generate-parentheses.html)


# LC155 最小栈 min-stack

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

```
MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。
```

示例 1:

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
``` 

提示：

-2^31 <= val <= 2^31 - 1
pop、top 和 getMin 操作总是在 非空栈 上调用
push, pop, top, and getMin最多被调用 3 * 10^4 次



# v1-双栈

## 思路

本身这一题就是要实现 stack，但是 getMin 这个很明显是无法满足的。

那如果我们用2个栈来实现呢？

1个栈保持基本的 stack 特性，另一个 minStack 存储对应的最小值。

## 核心流程

一个正常栈 stack 保存所有元素；

一个辅助栈 minStack 保存到当前位置的最小值；

每次 push 的时候，同时往 minStack 压入「当前最小值」。

这样：

pop() → 两个栈都弹出；

top() → 取正常栈的栈顶；

getMin() → 取最小栈的栈顶。

## 实现

```java
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();    

    public MinStack() {
        
    }
    
    public void push(int val) {
        stack.push(val);

        // 如果 minStack 为空，或者 val 更小，就压入 val，否则重复压入当前 min
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }
    
    public void pop() {
        // 同时弹出
        stack.pop();
        minStack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
```

## 效果

7ms 击败 6.64%

## 复杂度

SC 空间复杂度 O(2n)

## 反思

非常巧妙的解法。

我们可以进一步压缩空间吗？


# v2-单栈+差值

## 思路

有时候只记录差值，然后通过和 base 值的对比来复原，是减少空间常用的技巧。

## 核心流程

维护一个变量 min 表示当前栈的最小值。

栈里不直接存值，而是存 当前元素与最小值的差值 (val - min)。

这样做的好处是：

- 可以在 push 时用差值判断并更新 min；

- getMin 直接返回 min；

- top 通过差值和 min 还原出来。

## 实现

```java
    private Stack<Long> stack = new Stack<>();
    private long min = 0;    

    public MinStack() {
        
    }
    
    public void push(int val) {
        if(stack.isEmpty()) {
            min = val;
            // 差值为0
            stack.push(0L);
        } else {
            long differ = val - min;
            stack.push(differ);
            if(differ < 0) {
                min = val;
            }
        }
    }
    
    public void pop() {
        long differ = stack.pop();
        // 被弹出的值是新的最小值，所以需要恢复之前的 min
        if(differ < 0) {
            min -= differ; 
        }
    }
    
    public int top() {
        long diff = stack.peek();
        if (diff >= 0) {
            return (int)(min + diff);
        } else {
            return (int)min; // diff<0 说明栈顶就是当前 min
        }
    }
    
    public int getMin() {
        return (int)min;
    }
```

## 效果

4ms 击败 97.61

## 复杂度

SC 空间复杂度 O(n)

## 反思

空间压缩比较巧妙，但是没有 v1 那么直观，容易写错。

可以作为一种面试之类的加分思路。

# v3-双栈的变种

## 思路

思路：每次 push 的时候，把 (val, 当前最小值) 作为一个整体压入栈。

这样一个栈就够用了，但每个元素占用两个空间。

查询 getMin() 的时候，直接取栈顶的第二个值。

## 实现

```java
private Stack<int[]> stack = new Stack<>();

    public MinStack() {
        
    }
    
    public void push(int val) {
        if(stack.isEmpty()) {
            stack.push(new int[]{val, val});
        } else {
            int min = Math.min(stack.peek()[1], val);
            stack.push(new int[]{val, min});
        }
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek()[0];
    }
    
    public int getMin() {
        return stack.peek()[1];
    }
```

## 效果

4ms 击败 97.61%

## 反思

个人很喜欢这种写法，很直观，不容易出错。

而且 SC 和 TC 都很好。

# v4-链表模拟

## 思路

可以自定义一个节点结构：Node(val, min, next)。

每次 push 时，把新节点的 min 设置为 Math.min(val, head.min)，然后更新头指针。

getMin() 就是 head.min。

PS: 这种个人理解和 v3 异曲同工之妙。

## 实现

```java
    private Node head;

    private static class Node {
        int val;
        int min;
        Node next;
        Node(int val, int min, Node next) {
            this.val = val;
            this.min = min;
            this.next = next;
        }
    }

    public void push(int val) {
        if (head == null) {
            head = new Node(val, val, null);
        } else {
            head = new Node(val, Math.min(val, head.min), head);
        }
    }

    public void pop() {
        head = head.next;
    }

    public int top() {
        return head.val;
    }

    public int getMin() {
        return head.min;
    }
```

## 效果

3ms 100%

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