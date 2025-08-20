import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-BL9iO8wE.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="_24-两两交换链表中的节点" tabindex="-1"><a class="header-anchor" href="#_24-两两交换链表中的节点"><span>24. 两两交换链表中的节点</span></a></h1><p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。</p><p>你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>示例 1：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：head = [1,2,3,4]</span></span>
<span class="line"><span>输出：[2,1,4,3]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：head = []</span></span>
<span class="line"><span>输出：[]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：head = [1]</span></span>
<span class="line"><span>输出：[1]</span></span>
<span class="line"><span>\`\`\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>链表中节点的数目在范围 [0, 100] 内</span></span>
<span class="line"><span></span></span>
<span class="line"><span>0 &lt;= Node.val &lt;= 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## java 实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`java</span></span>
<span class="line"><span>public ListNode swapPairs(ListNode head) {</span></span>
<span class="line"><span>    ListNode dummy = new ListNode(0, head);</span></span>
<span class="line"><span>    // 当前移动指针</span></span>
<span class="line"><span>    ListNode current = dummy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //a-&gt;b-&gt;c</span></span>
<span class="line"><span>    //b-&gt;a-&gt;c</span></span>
<span class="line"><span>    while (current.next != null &amp;&amp; current.next.next != null) {</span></span>
<span class="line"><span>        ListNode first = current.next;</span></span>
<span class="line"><span>        ListNode second = current.next.next;</span></span>
<span class="line"><span>        // a-&gt;c</span></span>
<span class="line"><span>        first.next = second.next;</span></span>
<span class="line"><span>        // b-&gt;a</span></span>
<span class="line"><span>        second.next = first;</span></span>
<span class="line"><span>        // []-&gt;b</span></span>
<span class="line"><span>        current.next = second;</span></span>
<span class="line"><span>        // 调整位置</span></span>
<span class="line"><span>        current = current.next.next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取结果</span></span>
<span class="line"><span>    return dummy.next;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="效果" tabindex="-1"><a class="header-anchor" href="#效果"><span>效果</span></a></h2><p>效果如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Runtime: 0 ms, faster than 100.00% of Java online submissions for Swap Nodes in Pairs.</span></span>
<span class="line"><span>Memory Usage: 37 MB, less than 71.71% of Java online submissions for Swap Nodes in Pairs.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>实现了 2 个的翻转，我们来看一下 k 个的翻转。</p><h1 id="_25-k-个一组翻转链表" tabindex="-1"><a class="header-anchor" href="#_25-k-个一组翻转链表"><span>25. K 个一组翻转链表</span></a></h1><p>给你链表的头节点 head，每 k 个节点一组进行翻转，请你返回修改后的链表。</p><p>k 是一个正整数，它的值小于或等于链表的长度。</p><p>如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。</p><p>你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。</p><h2 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1"><span>示例</span></a></h2><p>示例 1：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：head = [1,2,3,4,5], k = 2</span></span>
<span class="line"><span>输出：[2,1,4,3,5]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：head = [1,2,3,4,5], k = 3</span></span>
<span class="line"><span>输出：[3,2,1,4,5]</span></span>
<span class="line"><span>\`\`\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>链表中的节点数目为 n</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 &lt;= k &lt;= n &lt;= 5000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>0 &lt;= Node.val &lt;= 1000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># V1-基本实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 思路</span></span>
<span class="line"><span></span></span>
<span class="line"><span>我们首先要判断节点是否够 k 个，不够直接返回。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果够的话，就把剩下的 k 个节点进行反转。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>可见 T24 只是本题的一个特例而已。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## java 实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`java</span></span>
<span class="line"><span>public static ListNode reverseKGroup(ListNode head, int k) {</span></span>
<span class="line"><span>    ListNode dummy = new ListNode(-1, head), prev = dummy;</span></span>
<span class="line"><span>    while (true) {</span></span>
<span class="line"><span>        // 检查剩余节点是否有k个，不足则返回</span></span>
<span class="line"><span>        ListNode last = prev;</span></span>
<span class="line"><span>        for (int i = 0; i &lt; k; i++) {</span></span>
<span class="line"><span>            last = last.next;</span></span>
<span class="line"><span>            if (last == null) {</span></span>
<span class="line"><span>                return dummy.next;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 翻转k个节点</span></span>
<span class="line"><span>        ListNode curr = prev.next, next;</span></span>
<span class="line"><span>        for (int i = 0; i &lt; k - 1; i++) {</span></span>
<span class="line"><span>            next = curr.next;</span></span>
<span class="line"><span>            curr.next = next.next;</span></span>
<span class="line"><span>            next.next = prev.next;</span></span>
<span class="line"><span>            prev.next = next;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        prev = curr;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会有方便，这里引入 dummy 节点。</p><h2 id="性能" tabindex="-1"><a class="header-anchor" href="#性能"><span>性能</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Runtime: 0 ms, faster than 100.00% of Java online submissions for Reverse Nodes in k-Group.</span></span>
<span class="line"><span>Memory Usage: 39.9 MB, less than 28.23% of Java online submissions for Reverse Nodes in k-Group.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="开源地址" tabindex="-1"><a class="header-anchor" href="#开源地址"><span>开源地址</span></a></h1><p>为了便于大家学习，所有实现均已开源。欢迎 fork + star~</p><blockquote><p><a href="https://github.com/houbb/leetcode" target="_blank" rel="noopener noreferrer">https://github.com/houbb/leetcode</a></p></blockquote><h1 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h1><p><a href="https://leetcode.cn/problems/reverse-nodes-in-k-group/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/reverse-nodes-in-k-group/</a></p>`,32)]))}const c=n(l,[["render",p]]),v=JSON.parse('{"path":"/posts/leetcode/2020-06-06-algorithm-013-leetcode-25-reverse-nodes-in-k-group.html","title":"013-25.K 个一组翻转链表 Reverse Nodes in k-Group + 24. 两两交换链表中的节点 swap nodes in pairs","lang":"zh-CN","frontmatter":{"title":"013-25.K 个一组翻转链表 Reverse Nodes in k-Group + 24. 两两交换链表中的节点 swap nodes in pairs","date":"2020-06-08T00:00:00.000Z","categories":["Algorithm"],"tags":["Algorithm","list","leetcode","sf"],"published":true,"description":"24. 两两交换链表中的节点 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。 示例 示例 1： 示例 2： 示例 3： 效果 效果如下： 实现了 2 个的翻转，我们来看一下 k 个的翻转。 25. K 个一组翻转链表 给你链表的头节点 head，每 k 个节点一组进...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/leetcode-notes/posts/leetcode/2020-06-06-algorithm-013-leetcode-25-reverse-nodes-in-k-group.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"013-25.K 个一组翻转链表 Reverse Nodes in k-Group + 24. 两两交换链表中的节点 swap nodes in pairs"}],["meta",{"property":"og:description","content":"24. 两两交换链表中的节点 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。 示例 示例 1： 示例 2： 示例 3： 效果 效果如下： 实现了 2 个的翻转，我们来看一下 k 个的翻转。 25. K 个一组翻转链表 给你链表的头节点 head，每 k 个节点一组进..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-08-18T15:03:18.000Z"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"list"}],["meta",{"property":"article:tag","content":"leetcode"}],["meta",{"property":"article:tag","content":"sf"}],["meta",{"property":"article:published_time","content":"2020-06-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-08-18T15:03:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"013-25.K 个一组翻转链表 Reverse Nodes in k-Group + 24. 两两交换链表中的节点 swap nodes in pairs\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-08T00:00:00.000Z\\",\\"dateModified\\":\\"2025-08-18T15:03:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1755499309000,"updatedTime":1755529398000,"contributors":[{"name":"binbin.hou","username":"","email":"binbin.hou@huifu.com","commits":2},{"name":"bbhou","username":"bbhou","email":"1557740299@qq.com","commits":1,"url":"https://github.com/bbhou"}]},"readingTime":{"minutes":2.43,"words":728},"filePathRelative":"posts/leetcode/2020-06-06-algorithm-013-leetcode-25-reverse-nodes-in-k-group.md","localizedDate":"2020年6月8日","excerpt":"\\n<p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。</p>\\n<p>你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p>\\n<h2>示例</h2>\\n<p>示例 1：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>输入：head = [1,2,3,4]</span></span>\\n<span class=\\"line\\"><span>输出：[2,1,4,3]</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,v as data};
