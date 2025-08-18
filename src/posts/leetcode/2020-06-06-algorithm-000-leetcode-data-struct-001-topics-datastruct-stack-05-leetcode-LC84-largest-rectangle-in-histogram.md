---

title: 算法篇专题之栈 stack 03-LC84. 柱状图中最大的矩形 largest-rectangle-in-histogram
date:  2020-06-08
categories: [Algorithm]
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





# LC84. 柱状图中最大的矩形 largest-rectangle-in-histogram

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。

每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

示例 1:

![1](https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg)

输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10

示例 2：

![2](https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg)

输入： heights = [2,4]
输出： 4
 

提示：

1 <= heights.length <=10^5
0 <= heights[i] <= 10^4


# 回顾

看到这一题，梦回[接雨水](https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-000-leetcode-data-struct-001-array-topics-traverse-02-traverse-two-pointer-leetcode-T42.html)

噩梦开始的地方……

# v1-暴力

## 思路

最朴素的暴力解法。

我们从遍历每一个柱子，heights[i]

1）当前位置作为面积的左边界

2）向右遍历到 j，遇到更低的高度就更新

计算面积：area = minHeight * (j-i+1) 

更新最大面积：maxArea = max(area, maxArea)

## 实现

```java
public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    int maxArea = 0;

    for (int i = 0; i < n; i++) {
        int minHeight = heights[i];
        for(int j = i; j < n; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            int area = minHeight * (j - i + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}
```

## 效果

超出时间限制
91 / 99 个通过的测试用例

## 复杂度

TC O(n^2)

SC O(1)

## 反思

如何提升当前性能？和栈有什么关系？

# v2-单调栈

## 思路

单调栈，梦回 LC739

1. 使用一个 **单调递增栈** 保存柱子下标。
2. 遍历数组 `heights`：

   * 当栈为空或者当前柱子 `heights[i]` >= 栈顶柱子高度时，直接入栈。
   * 当前柱子高度 **小于** 栈顶柱子高度时，说明栈顶柱子以它为高的矩形到此为止：

     * 弹出栈顶元素，计算以该高度为高的矩形面积：

       ```java
       height = heights[stack.pop()];
       width = stack.isEmpty() ? i : i - stack.peek() - 1;
       area = height * width;
       ```
3. 遍历结束后，栈中可能还有柱子，再依次计算面积。

### 核心宽度

场景回顾

当我们弹出栈顶柱子 `height = heights[stack.pop()]` 时，**它的高度已经确定最大矩形**，因为：

* 当前柱子 `heights[i]` **比它矮** → 右边界就是 `i - 1`
* 栈顶下一个柱子（如果存在） **比它矮** → 左边界就是 `stack.peek() + 1`

### 宽度计算公式

```java
int width = stack.isEmpty() ? i : i - stack.peek() - 1;
```

* **如果栈空**：

  * 左边界到数组开头（index 0）
  * 宽度 = 当前右边界 `i`

* **如果栈不空**：

  * 左边界是 `stack.peek() + 1`
  * 右边界是 `i - 1`
  * 宽度 = `i - (stack.peek() + 1)` = `i - stack.peek() - 1`

### 举个例子

假设：

```
heights = [2, 1, 5, 6, 2, 3]
```

* 当 `i = 4`（heights\[4]=2）时，栈内 = \[2,3]（对应 heights=5,6）
* 弹出栈顶 3（height=6）：

  * 栈剩下 \[2]
  * 宽度 = 4 - 2 - 1 = 1 → 面积 = 6\*1 = 6
* 弹出栈顶 2（height=5）：

  * 栈为空
  * 宽度 = 4 → 面积 = 5\*2 = 10（最大矩形）


## 复杂度

TC `O(n)`

SC `O(n)`

## 实现

```java
public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    int maxArea = 0;
    Stack<Integer> stack = new Stack<>();

    for (int i = 0; i < n; i++) {
        // 当前柱子小于栈顶柱子，高度下降，需要计算栈顶矩形面积
        while (!stack.isEmpty() && heights[i] < heights[stack.peek()]) {
            int height = heights[stack.pop()];  // 栈顶柱子高度
            int width = stack.isEmpty() ? i : i - stack.peek() - 1; // 宽度
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    // 处理栈中剩余柱子
    while (!stack.isEmpty()) {
        int height = heights[stack.pop()];
        int width = stack.isEmpty() ? n : n - stack.peek() - 1;
        maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
}
```

## 效果

174ms 击败 22.67%

## 反思

如何更快？


## 逻辑优化

### 思路

给 heights 前后各加一个 0，可以避免 最后单独处理栈：

### 实现

```java
public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] h = new int[n + 2];
        for (int i = 0; i < n; i++) h[i + 1] = heights[i];
        Stack<Integer> stack = new Stack<>();
        stack.push(0); // 左哨兵
        int maxArea = 0;
        
        for (int i = 1; i < h.length; i++) {
            while (h[i] < h[stack.peek()]) {
                int height = h[stack.pop()];
                int width = i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }

        return maxArea;
    }
```

# v3-最快的解法？


## 核心思想

* 最大矩形的高度 **一定是柱子高度之一**。
* 对于每个柱子 `heights[i]`：

  * 找到 **左边第一个比它矮的柱子**，下标记为 `left`，矩形左边界 = `left + 1`。
  * 找到 **右边第一个比它矮的柱子**，下标记为 `right`，矩形右边界 = `right - 1`。
* 以当前柱子高度为高，宽度 = `right - left - 1`。
* 枚举所有柱子，取面积最大值。

## 流程 

### leftMin 数组构建

```java
leftMin[0] = -1;
for (int i = 1; i < leftMin.length; i++) {
    int t = i - 1;
    while (t >= 0 && heights[t] >= heights[i]) {
        t = leftMin[t]; // 跳跃
    }
    leftMin[i] = t;
}
```

* **目标**：找到左边第一个比 `heights[i]` 小的柱子。
* `t = leftMin[t]` 这个技巧是 **跳跃式回溯**：

  * 如果 `heights[t] >= heights[i]`，说明这个柱子也挡住了矩形，可以直接跳到 `leftMin[t]`。
  * 避免了一根根向左遍历，提高效率。

---

### rightMin 数组构建

```java
rightMin[heights.length-1] = heights.length;
for(int i = rightMin.length-2; i >= 0; i--){
    int t = i + 1;
    while(t < heights.length && heights[t] >= heights[i]){
        t = rightMin[t]; // 跳跃
    }
    rightMin[i] = t;
}
```

* **目标**：找到右边第一个比 `heights[i]` 小的柱子。
* 逻辑和 leftMin 类似，只是方向相反，从右向左。
* 跳跃式优化减少不必要的遍历。


### 计算面积

```java
for(int i = 0; i < heights.length; i++){
    ans = Math.max(ans, heights[i] * (rightMin[i] - leftMin[i] - 1));
}
```

* 宽度 = `rightMin[i] - leftMin[i] - 1`
* 高度 = `heights[i]`
* 更新最大面积。

## 实现

```java
    public int largestRectangleArea(int[] heights) {
        //我们想求的最大矩形，他的高度肯定是height数组中的某一个
        //所以枚举每一个柱子
        //想要最后的矩形是当前柱子的高度，可以找到当前柱子左边第一个更低的柱子的下标left，left+1才是宽度的起始
        //右边第一个更低的柱子也一样，找到right，right-1才是宽度的终点
        //只有这样才能实现是以【当前柱子高度】去求的最大矩形
        //最后枚举所有矩形，求出面积最大的那个

        int[] leftMin=new int[heights.length];
        int[] rightMin=new int[heights.length];
        leftMin[0]=-1;
        //这里必须是size的长度，便于以【下标0和最后一位的柱子】来计算最大面积
        rightMin[heights.length-1]=heights.length;
        int ans=0;

        for(int i=1;i<leftMin.length;i++){
            int t=i-1;
            while(t>=0 && heights[t]>=heights[i]){
                t=leftMin[t];
            }
            leftMin[i]=t;
        }

        for(int i=rightMin.length-2;i>=0;i--){
            int t=i+1;
            while(t<heights.length && heights[t]>=heights[i]){
                t=rightMin[t];
            }
            rightMin[i]=t;
        }

        for(int i=0;i<heights.length;i++){
            ans=Math.max(ans,heights[i]*(rightMin[i]-leftMin[i]-1));
        }


        return ans;
    }
```

## 效果


8ms 击败 98.36%

## 反思

还是推荐单调栈的解法，相对有一些套路可言。

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