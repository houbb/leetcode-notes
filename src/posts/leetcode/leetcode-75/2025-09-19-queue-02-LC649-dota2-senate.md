---
title: LC649. Dota2 参议院 dota2-senate
date: 2025-09-19
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, stack]
published: true
---

# LC649. Dota2 参议院 dota2-senate

Dota2 的世界里有两个阵营：Radiant（天辉）和 Dire（夜魇）

Dota2 参议院由来自两派的参议员组成。现在参议院希望对一个 Dota2 游戏里的改变作出决定。他们以一个基于轮为过程的投票进行。在每一轮中，每一位参议员都可以行使两项权利中的 一 项：

禁止一名参议员的权利：参议员可以让另一位参议员在这一轮和随后的几轮中丧失 所有的权利 。
宣布胜利：如果参议员发现有权利投票的参议员都是 同一个阵营的 ，他可以宣布胜利并决定在游戏中的有关变化。
给你一个字符串 senate 代表每个参议员的阵营。字母 'R' 和 'D'分别代表了 Radiant（天辉）和 Dire（夜魇）。然后，如果有 n 个参议员，给定字符串的大小将是 n。

以轮为基础的过程从给定顺序的第一个参议员开始到最后一个参议员结束。这一过程将持续到投票结束。所有失去权利的参议员将在过程中被跳过。

假设每一位参议员都足够聪明，会为自己的政党做出最好的策略，你需要预测哪一方最终会宣布胜利并在 Dota2 游戏中决定改变。

输出应该是 "Radiant" 或 "Dire" 。

示例 1：

输入：senate = "RD"
输出："Radiant"
解释：
第 1 轮时，第一个参议员来自 Radiant 阵营，他可以使用第一项权利让第二个参议员失去所有权利。
这一轮中，第二个参议员将会被跳过，因为他的权利被禁止了。
第 2 轮时，第一个参议员可以宣布胜利，因为他是唯一一个有投票权的人。


示例 2：

输入：senate = "RDD"
输出："Dire"
解释：
第 1 轮时，第一个来自 Radiant 阵营的参议员可以使用第一项权利禁止第二个参议员的权利。
这一轮中，第二个来自 Dire 阵营的参议员会将被跳过，因为他的权利被禁止了。
这一轮中，第三个来自 Dire 阵营的参议员可以使用他的第一项权利禁止第一个参议员的权利。
因此在第二轮只剩下第三个参议员拥有投票的权利,于是他可以宣布胜利
 

提示：

n == senate.length
1 <= n <= 104
senate[i] 为 'R' 或 'D'


# v1-错误解法

## 思路

虽说这是错误的解法，但是题目本身实际上误导性非常大。

第一次解，大概率都是这个答案。

思路就是比较二者的下标，有出手机会就 ban 掉对方，同时自己也出列。

最后看二者谁有剩余就是谁胜利。

## 实现

```java
class Solution {
    public String predictPartyVictory(String senate) {
        // 暴力
        Queue<Integer> dq = new LinkedList<>();
        Queue<Integer> rq = new LinkedList<>();
        for(int i = 0; i < senate.length(); i++) {
            char c = senate.charAt(i);
            if(c == 'D') {
                dq.offer(i);
            } else {
                rq.offer(i);
            }

            aliveList.add(i);
        }

        // 行权
        // 其实是对比开头的元素的大小
        String res = "Dire";
        while(!dq.isEmpty()
            && !rq.isEmpty()) {
            // 取第一个元素比较大小
            Integer dIx = dq.peek();
            Integer rIx = rq.peek();        

            // 二者不会相同
            if(dIx < rIx) {
                // 直接禁用R
                dq.poll();
                rq.poll();
                res = "Dire";    
            } else {
                dq.poll();
                rq.poll();
                res = "Radiant";
            }
        }

        // 判断结果
        if(!dq.isEmpty()) {
            res = "Dire";    
        }
        if(!rq.isEmpty()) {
            res = "Radiant";    
        }

        return res;
    }
}
```


## 错误场景

实际执行会在 70/83 这个 CASE 错误。

```
输入 senate = "DDRRR"
输出 "Radiant"
预期结果 "Dire"
```

## 反思

也就是这里有个问题，题目第一次读也容易理解错误。

实际上出手 ban 的选手，会自动进入下一轮。

# v2-修正版本(队列)

## 思路

进入下一轮的方式，我们可以把 ix 直接加上数组的大小。

避免越界，下标改为 long

## 解法

```java
    public String predictPartyVictory(String senate) {
        int n = senate.length();

        int[] dq = new int[n];
        int[] rq = new int[n];

        int dHead = 0;
        int dTail = 0;
        int rHead = 0;
        int rTail = 0;

        // 初始化入队列    
        for(int i = 0; i < n; i++) {
            char c = senate.charAt(i);
            if(c == 'D') {
                dq[dTail++] = i;
            } else {
                rq[rTail++] = i;
            }
        }

        // 模拟对抗：队首比较，胜者把 index + n 放到队尾（进入下一轮）
        while (dHead < dTail && rHead < rTail) {
            int dIdx = dq[dHead++ % n];
            int rIdx = rq[rHead++ % n];

            if (dIdx < rIdx) {
                // D 先动，R 被禁，D 进入下一轮
                dq[dTail++ % n] = dIdx + n;
            } else {
                // R 先动
                rq[rTail++ % n] = rIdx + n;
            }
        }

        // 判断结果
        return (dHead < dTail) ? "Dire" : "Radiant";
    }

```

## 效果

12ms 击败 30.77%

## 反思

如何进一步提升性能？



# v3-数组模拟队列

## 思路

数组模拟这些基本的数据结构，可以进步一提升性能。

1）避免拆箱、装箱

2）减少 queue 本身额外的性能开销

实际验证下来，多轮用 int 也是够用，针对这个场景，可以用 int。

这里下标有限，用 `%n` 的方式处理。

## 实现

```java
    public String predictPartyVictory(String senate) {
        int n = senate.length();

        int[] dq = new int[n];
        int[] rq = new int[n];

        int dHead = 0;
        int dTail = 0;
        int rHead = 0;
        int rTail = 0;

        // 初始化入队列    
        for(int i = 0; i < n; i++) {
            char c = senate.charAt(i);
            if(c == 'D') {
                dq[dTail++] = i;
            } else {
                rq[rTail++] = i;
            }
        }

        // 模拟对抗：队首比较，胜者把 index + n 放到队尾（进入下一轮）
        while (dHead < dTail && rHead < rTail) {
            int dIdx = dq[dHead++ % n];
            int rIdx = rq[rHead++ % n];

            if (dIdx < rIdx) {
                // D 先动，R 被禁，D 进入下一轮
                dq[dTail++ % n] = dIdx + n;
            } else {
                // R 先动
                rq[rTail++ % n] = rIdx + n;
            }
        }

        // 判断结果
        return (dHead < dTail) ? "Dire" : "Radiant";
    }
```

## 效果

3ms 击败 97.28%

## 反思

还能更好吗



# 参考资料