---
title: LC735. 小行星碰撞 asteroid-collision
date: 2025-08-31 
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC735. 小行星碰撞 asteroid-collision

给定一个整数数组 asteroids，表示在同一行的小行星。

数组中小行星的索引表示它们在空间中的相对位置。

对于数组中的每一个元素，其绝对值表示小行星的大小，正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。每一颗小行星以相同的速度移动。

找出碰撞后剩下的所有小行星。

碰撞规则：两个小行星相互碰撞，较小的小行星会爆炸。如果两颗小行星大小相同，则两颗小行星都会爆炸。两颗移动方向相同的小行星，永远不会发生碰撞。

示例 1：

输入：asteroids = [5,10,-5]
输出：[5,10]
解释：10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。

示例 2：

输入：asteroids = [8,-8]
输出：[]
解释：8 和 -8 碰撞后，两者都发生爆炸。

示例 3：

输入：asteroids = [10,2,-5]
输出：[10]
解释：2 和 -5 发生碰撞后剩下 -5 。10 和 -5 发生碰撞后剩下 10 。
 

提示：

2 <= asteroids.length <= 10^4
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0


# v1-栈

## 思路

这一题需要理解题意。

1) 两个星星什么时候碰撞？

因为移动速度相同，所以同方向的不会碰撞。

如果两个方向相反，比如 `<-` 和 `->` 也不会碰撞。

只有一个场景会碰撞：`->` 和 `<-`

也就是当前值小于0，前一个值大于0

2) 多次碰撞的考虑

碰撞一次之后，如果留下来了一个星星。还需要考虑继续碰撞的可能性。

## 实现

```java
public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>();

        for(int a : asteroids) {
            if(stack.isEmpty() || a > 0) {
                stack.push(a);
            } else {
                boolean alive = true;
                while(!stack.isEmpty() && stack.peek() > 0) {
                    int pre = stack.peek();
                    int absPre = Math.abs(pre);
                    int absCur = Math.abs(a);

                    if(absPre == absCur) {
                        stack.pop(); // 同时爆炸
                        alive = false;
                        break;
                    } else if(absPre > absCur) {
                        // 当前爆炸
                        alive = false;
                        break;
                    } else {
                        // 前一个爆炸，继续比较
                        stack.pop();
                    }
                }
                if(alive) {
                    stack.push(a);
                }
            }
        }
        
        int size = stack.size();

        // 构建结果数组
        int[] res = new int[size];
        int ix = size-1;

        while(!stack.isEmpty()) {
            res[ix--] = stack.pop();
        }
        return res;
    }
```

## 效果

11ms 击败 23.65%

## 反思

按理说是可以更快地。

# v2-数组模拟

## 思路

类似的，用数组模拟。

## 实现

```java
public int[] asteroidCollision(int[] asteroids) {
    int n = asteroids.length;
    int[] stack = new int[n];  // 用数组模拟栈
    int top = -1;              // 栈顶指针，-1 表示空

    for (int a : asteroids) {
        if (top == -1 || a > 0) {
            stack[++top] = a;
        } else {
            boolean alive = true;
            while (top >= 0 && stack[top] > 0) {
                int pre = stack[top];
                int absPre = Math.abs(pre);
                int absCur = Math.abs(a);

                if (absPre == absCur) {
                    top--;          // 同时爆炸
                    alive = false;
                    break;
                } else if (absPre > absCur) {
                    // 当前爆炸
                    alive = false;
                    break;
                } else {
                    // 前一个爆炸，继续比较
                    top--;
                }
            }
            if (alive) {
                stack[++top] = a;
            }
        }
    }

    // 构建结果数组
    int[] res = new int[top + 1];
    for (int i = 0; i <= top; i++) {
        res[i] = stack[i];
    }
    return res;
}
```

## 效果

1ms 100%

## 反思

这种解法，还是数组模拟最快。


# 参考资料