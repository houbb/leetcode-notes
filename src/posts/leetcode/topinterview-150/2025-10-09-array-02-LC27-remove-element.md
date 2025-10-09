---
title: LC27. 移除元素 remove-element
date: 2025-10-09 
categories: [TopInterview150]
tags: [leetcode, dp, topInterview150, array]
published: true
---

# LC27. 移除元素 remove-element

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。

假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：

更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。

返回 k。

用户评测：

评测机将使用以下代码测试您的解决方案：

```java
int[] nums = [...]; // 输入数组
int val = ...; // 要移除的值
int[] expectedNums = [...]; // 长度正确的预期答案。
                            // 它以不等于 val 的值排序。

int k = removeElement(nums, val); // 调用你的实现

assert k == expectedNums.length;
sort(nums, 0, k); // 排序 nums 的前 k 个元素
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

如果所有的断言都通过，你的解决方案将会 通过。

 

示例 1：

输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2,_,_]
解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。

示例 2：

输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3,_,_,_]
解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,0,1,3,4。
注意这五个元素可以任意顺序返回。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
 

提示：

0 <= nums.length <= 100
0 <= nums[i] <= 50
0 <= val <= 100

# v1-基本

## 思路

首先要搞清楚要做什么：

1）移除所有和 val 相同的元素

2）返回和 val 不同的个数

其中返回元素的顺序不重要

也就是我们可以用 swap 来交换位置实现。

不要 swap 的时候要注意，要一直找到第一个不等于 val 的 swap。

## 实现

```java
class Solution {
    
    public int removeElement(int[] nums, int val) {

        int left = 0;
        int right = nums.length-1;

        while(left <= right) {
            int num = nums[left];
            if(num == val) {
                // swap 找到不等于 val 的元素
                while(nums[right] == val && left < right) {
                    right--;
                }

                // 提前结束
                if(left >= right) {
                    return left;
                }

                swap(nums, left, right);
                right--;
            } else {
                left++;
            }
        }

        return left;
    }

    private void swap(int[] nums, int ix1, int ix2) {
        int temp = nums[ix1];
        nums[ix1] = nums[ix2];
        nums[ix2] = temp;
    }

}
```

## 效果

0ms 击败 100.00%

## 复杂度

时间复杂度：O(n)

空间复杂度：O(1)

## 反思

这种一般都是利用 swap 来实现。

# v2-双指针赋值

## 思路

这个系统 LC26 我是后面做的，发现也可以用来解决这一题。

思路类似。

left 指向“删除后数组的最后一个有效位置”

right 用来扫描整个数组

如果发现不等于 val，就把它放到 left+1 的位置上


## 实现

```java
class Solution {
    
    public int removeElement(int[] nums, int val) {
        int left = 0;

        for(int right = 0; right < nums.length; right++) {
            if(nums[right] != val) {
                nums[left++] = nums[right];
            }
        }        

        return left;
    }

}
```

## 效果

0ms 100%

## 反思

还是比较喜欢这个版本。

可以保障有序性，同时比 v2 其实简洁不少，不容易写错。

同时 LC26 和 LC27 的解法可以基本类似。



# 参考资料

https://leetcode.cn/problems/merge-sorted-array/submissions/668896756/?envType=study-plan-v2&envId=top-interview-150

