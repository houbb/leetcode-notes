import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a,o as l}from"./app-cOZxkP3e.js";const e={};function p(d,s){return l(),i("div",null,s[0]||(s[0]=[a(`<h1 id="_33-搜索旋转排序数组-search-in-rotated-sorted-array" tabindex="-1"><a class="header-anchor" href="#_33-搜索旋转排序数组-search-in-rotated-sorted-array"><span>33. 搜索旋转排序数组 Search in Rotated Sorted Array</span></a></h1><h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目"><span>题目</span></a></h2><p>整数数组 nums 按升序排列，数组中的值 互不相同 。</p><p>在传递给函数之前，nums 在预先未知的某个下标 k（0 &lt;= k &lt; nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。</p><p>例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。</p><p>给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。</p><p>你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。</p><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h3><p>示例 1：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [4,5,6,7,0,1,2], target = 0</span></span>
<span class="line"><span>输出：4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [4,5,6,7,0,1,2], target = 3</span></span>
<span class="line"><span>输出：-1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [1], target = 0</span></span>
<span class="line"><span>输出：-1</span></span>
<span class="line"><span>\`\`\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 &lt;= nums.length &lt;= 5000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-10^4 &lt;= nums[i] &lt;= 10^4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nums 中的每个值都 独一无二</span></span>
<span class="line"><span></span></span>
<span class="line"><span>题目数据保证 nums 在预先未知的某个下标上进行了旋转</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-10^4 &lt;= target &lt;= 10^4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## v1-二分法青春版</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 思路</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>我们首先应该找到这个数组旋转的位置 k，然后把数组分为 2 个部分，这样依然是有序的。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后采用分别二分法查询即可。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`java</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Input: nums = [4,5,6,7,0,1,2], target = 0</span></span>
<span class="line"><span>     * Output: 4</span></span>
<span class="line"><span>     * @param nums</span></span>
<span class="line"><span>     * @param target</span></span>
<span class="line"><span>     * @return</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public int search(int[] nums, int target) {</span></span>
<span class="line"><span>        // 没有旋转，或者全部旋转</span></span>
<span class="line"><span>        int randomK = getRandomK(nums);</span></span>
<span class="line"><span>        if(-1 == randomK) {</span></span>
<span class="line"><span>            return binarySearch(nums, target, 0, nums.length-1);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 将数组拆成2个部分</span></span>
<span class="line"><span>        // 4 5 6 7 0 1 2 =&gt; [4 5 6 7] [0 1 2]</span></span>
<span class="line"><span>        // 3 1 ==&gt; [3] [1]</span></span>
<span class="line"><span>        int leftIndex = binarySearch(nums, target, 0, randomK);</span></span>
<span class="line"><span>        if(leftIndex != -1) {</span></span>
<span class="line"><span>            return leftIndex;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 右边寻找</span></span>
<span class="line"><span>        int rightIndex = binarySearch(nums, target, randomK+1, nums.length-1);</span></span>
<span class="line"><span>        if(rightIndex != -1) {</span></span>
<span class="line"><span>            return rightIndex;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果不存在</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 获取随机数</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * 寻找 k &gt; k+i 的位置</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * [4,5,6,7,0,1,2]</span></span>
<span class="line"><span>     * @param nums 数组</span></span>
<span class="line"><span>     * @return 变化的长度</span></span>
<span class="line"><span>     * @since v33</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private int getRandomK(final int[] nums) {</span></span>
<span class="line"><span>        for(int i = 0; i &lt; nums.length-1; i++) {</span></span>
<span class="line"><span>            if(nums[i] &gt; nums[i+1]) {</span></span>
<span class="line"><span>                return i;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 根据顺序找到即可</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 二分查询</span></span>
<span class="line"><span>     * &lt;p&gt;</span></span>
<span class="line"><span>     * 备注：ASC</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param nums   原始数组</span></span>
<span class="line"><span>     * @param target 目标值</span></span>
<span class="line"><span>     * @return 结果</span></span>
<span class="line"><span>     * @since v33</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private static int binarySearch(int[] nums, int target, int low, int high) {</span></span>
<span class="line"><span>        while (low &lt;= high) {</span></span>
<span class="line"><span>            int mid = (high+low)/2;</span></span>
<span class="line"><span>            int midVal = nums[mid];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 刚好相等</span></span>
<span class="line"><span>            if (target == midVal) {</span></span>
<span class="line"><span>                return mid;</span></span>
<span class="line"><span>            } else if (target &gt; midVal) {</span></span>
<span class="line"><span>                // 当前信息偏小</span></span>
<span class="line"><span>                low = mid+1;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                // 数据偏大</span></span>
<span class="line"><span>                high = mid-1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //NOT FOUND</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="评价" tabindex="-1"><a class="header-anchor" href="#评价"><span>评价</span></a></h3><p>这个算法思路没有问题。</p><p>但是在计算 random-k 的时候，最差的复杂度为 O(N)。所以值得进一步优化。</p><h2 id="v2-二分法" tabindex="-1"><a class="header-anchor" href="#v2-二分法"><span>v2-二分法</span></a></h2><h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h3><p>对于有序数组，可以使用二分查找的方法查找元素。</p><p>但是这道题中，数组本身不是有序的，进行旋转后只保证了数组的局部是有序的，这还能进行二分查找吗？答案是可以的。</p><p>可以发现的是，我们将数组从中间分开成左右两部分的时候，一定有一部分的数组是有序的。</p><p>拿示例来看，我们从 6 这个位置分开以后数组变成了 [4, 5, 6] 和 [7, 0, 1, 2] 两个部分，其中左边 [4, 5, 6] 这个部分的数组是有序的，其他也是如此。</p><p>这启示我们可以在常规二分查找的时候查看当前 mid 为分割位置分割出来的两个部分 [l, mid] 和 [mid + 1, r] 哪个部分是有序的，并根据有序的那个部分确定我们该如何改变二分查找的上下界，因为我们能够根据有序的那部分判断出 target 在不在这个部分：</p><p>如果 [l, mid - 1] 是有序数组，且 target 的大小满足 <code>[nums[l], nums[mid]]</code>，则我们应该将搜索范围缩小至 <code>[l, mid-1]</code>，否则在 [mid + 1, r] 中寻找。</p><p>如果 [mid, r] 是有序数组，且 target 的大小满足 <code>[nums[mid+1], nums[r]]</code>，则我们应该将搜索范围缩小至 [mid + 1, r]，否则在 [l, mid - 1] 中寻找。</p><figure><img src="https://assets.leetcode-cn.com/solution-static/33/33_fig1.png" alt="二分法" tabindex="0" loading="lazy"><figcaption>二分法</figcaption></figure><h3 id="java-实现" tabindex="-1"><a class="header-anchor" href="#java-实现"><span>java 实现</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> search</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">[] nums</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> nums</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> r </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> r) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> r) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (nums[mid] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (nums[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[mid]) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (nums[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&amp;&amp;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[mid]) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                    r </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                    l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (nums[mid] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&amp;&amp;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> target </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">]) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                    l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                    r </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">                }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度"><span>复杂度</span></a></h3><p>时间复杂度： O(logn)，其中 n 为 nums 数组的大小。整个算法时间复杂度即为二分查找的时间复杂度 O(logn)。</p><p>空间复杂度： O(1)。我们只需要常数级别的空间存放变量。</p><h1 id="_81-搜索旋转排序数组-ii-search-in-rotated-sorted-array-ii" tabindex="-1"><a class="header-anchor" href="#_81-搜索旋转排序数组-ii-search-in-rotated-sorted-array-ii"><span>81. 搜索旋转排序数组 II Search in Rotated Sorted Array II</span></a></h1><h2 id="题目-1" tabindex="-1"><a class="header-anchor" href="#题目-1"><span>题目</span></a></h2><p>已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。</p><p>在传递给函数之前，nums 在预先未知的某个下标 k（0 &lt;= k &lt; nums.length）上进行了 旋转 ，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。</p><p>例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。</p><p>给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。</p><p>你必须尽可能减少整个操作步骤。</p><h3 id="例子-1" tabindex="-1"><a class="header-anchor" href="#例子-1"><span>例子</span></a></h3><p>示例 1：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [2,5,6,0,0,1,2], target = 0</span></span>
<span class="line"><span>输出：true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [2,5,6,0,0,1,2], target = 3</span></span>
<span class="line"><span>输出：false</span></span>
<span class="line"><span>\`\`\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>进阶：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 思路</span></span>
<span class="line"><span></span></span>
<span class="line"><span>整体和 T33 类似，但是因为包含重复元素，所以略微复杂些。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于数组中有重复元素的情况，二分查找时可能会有 \`a[l]=a[mid]=a[r]\`，此时无法判断区间 [l,mid] 和区间 [mid+1,r] 哪个是有序的。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例如 nums=[3,1,2,3,3,3,3]，target=2，首次二分时无法判断区间 [0,3] 和区间 [4,6] 哪个是有序的。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于这种情况，我们只能将当前二分区间的左边界加一，右边界减一，然后在新区间上继续二分查找。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## java 实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`java</span></span>
<span class="line"><span>public boolean search(int[] nums, int target) {</span></span>
<span class="line"><span>    int n = nums.length;</span></span>
<span class="line"><span>    if (n == 0) {</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (n == 1) {</span></span>
<span class="line"><span>        return nums[0] == target;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    int l = 0, r = n - 1;</span></span>
<span class="line"><span>    while (l &lt;= r) {</span></span>
<span class="line"><span>        int mid = (l + r) / 2;</span></span>
<span class="line"><span>        if (nums[mid] == target) {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 处理一下</span></span>
<span class="line"><span>        if (nums[l] == nums[mid] &amp;&amp; nums[mid] == nums[r]) {</span></span>
<span class="line"><span>            ++l;</span></span>
<span class="line"><span>            --r;</span></span>
<span class="line"><span>        } else if (nums[l] &lt;= nums[mid]) {</span></span>
<span class="line"><span>            if (nums[l] &lt;= target &amp;&amp; target &lt; nums[mid]) {</span></span>
<span class="line"><span>                r = mid - 1;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                l = mid + 1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[n - 1]) {</span></span>
<span class="line"><span>                l = mid + 1;</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                r = mid - 1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度-1" tabindex="-1"><a class="header-anchor" href="#复杂度-1"><span>复杂度</span></a></h2><p>时间复杂度： O(logn)，其中 n 为 nums 数组的大小。整个算法时间复杂度即为二分查找的时间复杂度 O(logn)。</p><p>空间复杂度： O(1)。我们只需要常数级别的空间存放变量。</p><h1 id="_153-寻找旋转排序数组中的最小值" tabindex="-1"><a class="header-anchor" href="#_153-寻找旋转排序数组中的最小值"><span>153. 寻找旋转排序数组中的最小值</span></a></h1><h2 id="题目-2" tabindex="-1"><a class="header-anchor" href="#题目-2"><span>题目</span></a></h2><p>已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：</p><p>若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]</p><p>若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]</p><p>注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。</p><p>给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。</p><p>你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。</p><h3 id="例子-2" tabindex="-1"><a class="header-anchor" href="#例子-2"><span>例子</span></a></h3><p>示例 1：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [3,4,5,1,2]</span></span>
<span class="line"><span>输出：1</span></span>
<span class="line"><span>解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [4,5,6,7,0,1,2]</span></span>
<span class="line"><span>输出：0</span></span>
<span class="line"><span>解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [11,13,15,17]</span></span>
<span class="line"><span>输出：11</span></span>
<span class="line"><span>解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。</span></span>
<span class="line"><span>\`\`\` </span></span>
<span class="line"><span></span></span>
<span class="line"><span>提示：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>n == nums.length</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 &lt;= n &lt;= 5000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-5000 &lt;= nums[i] &lt;= 5000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nums 中的所有整数 互不相同</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 思路</span></span>
<span class="line"><span></span></span>
<span class="line"><span>还是那句话，有序的数组，查找元素使用二分法！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>但是问题是，已经被旋转了，还能使用吗？</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The minimum element must satisfy one of two conditions:</p><p>[4,5,6,7,0,1,2]</p><ol><li><p>If rotate, A[min] &lt; A[min - 1];</p></li><li><p>If not, A[0].</p></li></ol><p>Therefore, we can use binary search: check the middle element, if it is less than previous one, then it is minimum.</p><p>If not, there are 2 conditions as well: If it is greater than both left and right element, then minimum element should be on its right, otherwise on its left.</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>## java 实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`java</span></span>
<span class="line"><span>public int findMin(int[] nums) {</span></span>
<span class="line"><span>    int start = 0;</span></span>
<span class="line"><span>    int end = nums.length - 1;</span></span>
<span class="line"><span>    while (start &lt; end) {</span></span>
<span class="line"><span>        int mid = (start +end) / 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果是旋转的场景。不旋转的话，一定大于前面</span></span>
<span class="line"><span>        // [4,5,6,7,0,1,2]</span></span>
<span class="line"><span>        if(mid &gt; 0 &amp;&amp;</span></span>
<span class="line"><span>                nums[mid] &lt; nums[mid-1]) {</span></span>
<span class="line"><span>            return nums[mid];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果当前元素比2边都大，那就是右边。</span></span>
<span class="line"><span>        if(nums[mid] &gt;= nums[start]</span></span>
<span class="line"><span>            &amp;&amp; nums[mid] &gt;= nums[end]) {</span></span>
<span class="line"><span>            start = mid+1;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            end = mid-1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return nums[start];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_154-寻找旋转排序数组中的最小值-ii" tabindex="-1"><a class="header-anchor" href="#_154-寻找旋转排序数组中的最小值-ii"><span>154. 寻找旋转排序数组中的最小值 II</span></a></h1><h2 id="题目-3" tabindex="-1"><a class="header-anchor" href="#题目-3"><span>题目</span></a></h2><p>和 153 类似，编程数组中的元素可能重复。</p><h2 id="思路-1" tabindex="-1"><a class="header-anchor" href="#思路-1"><span>思路</span></a></h2><p>首先，我们取 <code>low = 0, high = nums.length-1</code></p><p>0 1 2 3 4</p><p>1）默认情况下，如果 <code>nums[lo] &lt; nums[hi]</code> 那么我们返回 nums[lo] 因为数组从未旋转过，或者旋转过 n 次。</p><p>2）进入while循环后，我们检查</p><p><code>if nums[mid] &gt; nums[hi] =&gt; lo = mid + 1</code> 因为最小元素在数组的右半部分</p><p>2 3 4 0 1</p><p>else <code>if nums[mid] &lt; nums[hi] =&gt; hi = mid</code> 因为最小元素在数组的左半部分</p><p>7 0 1 2 3 4 5 6</p><p><code>else =&gt; hi--</code> 处理重复值</p><p>然后我们返回 <code>nums[hi]</code></p><h2 id="java-实现-1" tabindex="-1"><a class="header-anchor" href="#java-实现-1"><span>java 实现</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> findMin</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">[] nums) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> low </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> high </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> nums</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // default</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(nums[low] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[high]) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[low]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (low </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> high) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> mid </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (low </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> high) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //1. 大于最大,在右边</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(nums[mid] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[high]) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            low </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(nums[mid] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[high]) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            //2. 小于最大，则在左边</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            high </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            // 重复</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">            high</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">--;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> nums[high]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h1><p>可以看到有序的数组，再处理一个元素的时候，我们首先应该使用二分法。</p><p>只不过会有一些限制，但是核心思路不会变化。</p><h1 id="开源地址" tabindex="-1"><a class="header-anchor" href="#开源地址"><span>开源地址</span></a></h1><p>为了便于大家学习，所有实现均已开源。欢迎 fork + star~</p><blockquote><p><a href="https://github.com/houbb/leetcode" target="_blank" rel="noopener noreferrer">https://github.com/houbb/leetcode</a></p></blockquote><h1 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h1><p><a href="https://leetcode.cn/problems/search-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/search-in-rotated-sorted-array/</a></p><p><a href="https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/</a></p>`,93)]))}const h=n(e,[["render",p]]),c=JSON.parse('{"path":"/posts/leetcode/history1/2020-06-06-algorithm-017-leetcode-33-search-in-rotated-sorted-array.html","title":"017-33. 搜索旋转排序数组 Search in Rotated Sorted Array + 81. Search in Rotated Sorted Array II + 153. Find Minimum in Rotated Sorted Array 寻找旋转排序数组中的最小值 + 154.Find Minimum in Rotated Sorted Array II","lang":"zh-CN","frontmatter":{"title":"017-33. 搜索旋转排序数组 Search in Rotated Sorted Array + 81. Search in Rotated Sorted Array II + 153. Find Minimum in Rotated Sorted Array 寻找旋转排序数组中的最小值 + 154.Find Minimum in Rotated Sorted Array II","date":"2020-06-08T00:00:00.000Z","categories":["Algorithm"],"tags":["Algorithm","list","leetcode","sf"],"published":true,"description":"33. 搜索旋转排序数组 Search in Rotated Sorted Array 题目 整数数组 nums 按升序排列，数组中的值 互不相同 。 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nu...","head":[["meta",{"property":"og:url","content":"https://houbb.github.io/leetcode-notes/posts/leetcode/history1/2020-06-06-algorithm-017-leetcode-33-search-in-rotated-sorted-array.html"}],["meta",{"property":"og:site_name","content":"老马啸西风"}],["meta",{"property":"og:title","content":"017-33. 搜索旋转排序数组 Search in Rotated Sorted Array + 81. Search in Rotated Sorted Array II + 153. Find Minimum in Rotated Sorted Array 寻找旋转排序数组中的最小值 + 154.Find Minimum in Rotated Sorted Array II"}],["meta",{"property":"og:description","content":"33. 搜索旋转排序数组 Search in Rotated Sorted Array 题目 整数数组 nums 按升序排列，数组中的值 互不相同 。 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nu..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://assets.leetcode-cn.com/solution-static/33/33_fig1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-08-22T12:19:07.000Z"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"list"}],["meta",{"property":"article:tag","content":"leetcode"}],["meta",{"property":"article:tag","content":"sf"}],["meta",{"property":"article:published_time","content":"2020-06-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-08-22T12:19:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"017-33. 搜索旋转排序数组 Search in Rotated Sorted Array + 81. Search in Rotated Sorted Array II + 153. Find Minimum in Rotated Sorted Array 寻找旋转排序数组中的最小值 + 154.Find Minimum in Rotated Sorted Array II\\",\\"image\\":[\\"https://assets.leetcode-cn.com/solution-static/33/33_fig1.png\\"],\\"datePublished\\":\\"2020-06-08T00:00:00.000Z\\",\\"dateModified\\":\\"2025-08-22T12:19:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"老马啸西风\\",\\"url\\":\\"https://houbb.github.io\\"}]}"]]},"git":{"createdTime":1755499309000,"updatedTime":1755865147000,"contributors":[{"name":"binbin.hou","username":"","email":"binbin.hou@huifu.com","commits":2},{"name":"bbhou","username":"bbhou","email":"1557740299@qq.com","commits":2,"url":"https://github.com/bbhou"}]},"readingTime":{"minutes":9.46,"words":2839},"filePathRelative":"posts/leetcode/history1/2020-06-06-algorithm-017-leetcode-33-search-in-rotated-sorted-array.md","localizedDate":"2020年6月8日","excerpt":"\\n<h2>题目</h2>\\n<p>整数数组 nums 按升序排列，数组中的值 互不相同 。</p>\\n<p>在传递给函数之前，nums 在预先未知的某个下标 k（0 &lt;= k &lt; nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。</p>\\n<p>例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为&nbsp;[4,5,6,7,0,1,2] 。</p>\\n<p>给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回&nbsp;-1&nbsp;。</p>","autoDesc":true}');export{h as comp,c as data};
