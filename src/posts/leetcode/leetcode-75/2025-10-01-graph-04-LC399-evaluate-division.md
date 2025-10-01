---
title: LC399. 除法求值 evaluate-division
date: 2025-09-30
categories: [Leetcode-75]
tags: [leetcode, Leetcode-75, graph, dfs, bfs]
published: true
---

# LC399. 除法求值 evaluate-division

给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。

另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。

返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。

注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

注意：未在等式列表中出现的变量是未定义的，因此无法确定它们的答案。

示例 1：

输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
解释：
条件：a / b = 2.0, b / c = 3.0
问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
注意：x 是未定义的 => -1.0
示例 2：

输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
输出：[3.75000,0.40000,5.00000,0.20000]
示例 3：

输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
输出：[0.50000,2.00000,-1.00000,-1.00000]
 

提示：

1 <= equations.length <= 20
equations[i].length == 2
1 <= Ai.length, Bi.length <= 5
values.length == equations.length
0.0 < values[i] <= 20.0
1 <= queries.length <= 20
queries[i].length == 2
1 <= Cj.length, Dj.length <= 5
Ai, Bi, Cj, Dj 由小写英文字母与数字组成


# v1-DFS

## 思路

这一题实际上是一个图问题。

```
a->b w=2
b->c w=3
a->c w=6
```

也就是我们要构建 2 个点的有向图，对应的权重记录一下。

然后找到两个点之间的 pathList，乘积就是结果。

先不考虑性能，解出来再说。

注意点：

1）b->a 无向图要构建，因为反过来其实就是 1/w

2) 要处理一下相同的值，如果 key 存在，返回 1.0，不存在返回 -1.0。感觉这个题目设计的不好，不存在相等，应该返回 1.0 才对。

## 实现

```java
class Solution {

    private class Edge {
        public String to;
        public double w;
        public Edge(String to, double w) {
            this.to = to;
            this.w = w;
        }
    }

    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, List<Edge>> graph = new HashMap<>();        
        for(int i = 0; i < equations.size(); i++) {
            List<String> equation = equations.get(i);
            double w = values[i];
            
            String from = equation.get(0);
            String to = equation.get(1);
            
            // 正
            Edge edge = new Edge(to, w);
            List<Edge> edges = graph.getOrDefault(from, new ArrayList<>());
            edges.add(edge);
            graph.put(from, edges);

            // 反
            Edge rEdge = new Edge(from, 1.0 / w);
            List<Edge> rEdges = graph.getOrDefault(to, new ArrayList<>());
            rEdges.add(rEdge);
            graph.put(to, rEdges);
        }

        // dfs 找到边
        double[] res = new double[queries.size()];
        int count = 0;
        for(List<String> query : queries) {
            List<Double> path = findPath(graph, query);
            if(path.size() <= 0) {
                res[count++] = -1.0;
            } else {
                double temp = 1.0;
                for(Double d : path) {
                    temp *= d;
                }
                res[count++] = temp;
            }
        }

        return res;
    }

    private List<Double> findPath(Map<String, List<Edge>> graph, List<String> query) {
        List<Double> path = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        
        if(query.get(0).equals(query.get(1)) && graph.containsKey(query.get(0))) {
            return Arrays.asList(1.0);
        }   

        if(dfs(graph, path, visited, query.get(0), query.get(1))) {
            return path;
        } else { 
            

            // 空
            return new ArrayList<>();
        }
    }

    private boolean dfs(Map<String, List<Edge>> graph, List<Double> path, Set<String> visited, String from, String target) {
        if(visited.contains(from)) {
            return false;
        }
        // 找到
        if(from.equals(target)) {
            return true;
        }

        visited.add(from);

        for(Edge edge : graph.getOrDefault(from, new ArrayList<>())) {
            // 未访问过的    
            if(!visited.contains(edge.to)) {
                path.add(edge.w);

                if (dfs(graph, path, visited, edge.to, target)) {
                    return true;
                }

                path.remove(path.size() - 1); // 回溯
            }
        }

        return false;
    }

}
```

# v2-简化

## 思路

我们不需要把 path 都返回，只需要一个结果就行。

这样不但节省了空间，而且也不需要回溯。

因为数据不会被影响。

## 实现

```java
class Solution {

    private class Edge {
        public String to;
        public double w;
        public Edge(String to, double w) {
            this.to = to;
            this.w = w;
        }
    }

    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, List<Edge>> graph = new HashMap<>();        
        for(int i = 0; i < equations.size(); i++) {
            List<String> equation = equations.get(i);
            double w = values[i];
            
            String from = equation.get(0);
            String to = equation.get(1);
            
            // 正
            Edge edge = new Edge(to, w);
            List<Edge> edges = graph.getOrDefault(from, new ArrayList<>());
            edges.add(edge);
            graph.put(from, edges);

            // 反
            Edge rEdge = new Edge(from, 1.0 / w);
            List<Edge> rEdges = graph.getOrDefault(to, new ArrayList<>());
            rEdges.add(rEdge);
            graph.put(to, rEdges);
        }

        // dfs 找到边
        double[] res = new double[queries.size()];
        int count = 0;
        for(List<String> query : queries) {
            res[count++] = findPath(graph, query);
        }

        return res;
    }

    private double findPath(Map<String, List<Edge>> graph, List<String> query) {
        Set<String> visited = new HashSet<>();
        return dfs(graph, visited, query.get(0), query.get(1), 1);
    }

    private double dfs(Map<String, List<Edge>> graph, Set<String> visited, String from, String target, double acc) {
        if (!graph.containsKey(from) || !graph.containsKey(target)) return -1.0;
        if (from.equals(target)) return acc;

        visited.add(from);

        for (Edge edge : graph.get(from)) {
            if (!visited.contains(edge.to)) {
                double res = dfs(graph, visited, edge.to, target, acc * edge.w);
                if (res != -1.0) return res;
            }
        }

        return -1.0;
    }

}
```

## 效果

1ms 击败 96.88%

## 反思

这一题作为中等题，但是图的题目很多真的很消耗时间。

代码太多了。虽然套路比较固定。

# 参考资料