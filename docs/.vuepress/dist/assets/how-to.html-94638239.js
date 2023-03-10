import{_ as p,W as e,X as c,Z as n,$ as s,Y as o,a0 as l,a1 as a,C as i}from"./framework-e9da4443.js";const u={},r=a(`<h1 id="场景驱动" tabindex="-1"><a class="header-anchor" href="#场景驱动" aria-hidden="true">#</a> 场景驱动</h1><h2 id="如何精确计算金额" tabindex="-1"><a class="header-anchor" href="#如何精确计算金额" aria-hidden="true">#</a> 如何精确计算金额？</h2><h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3><p>发票金额信息包含以下三种：</p><ul><li>金额</li><li>税额</li><li>价税合计</li></ul><p>其中每种金额都精确到小数点后两位。如：36.78。<br> 现已知金额和税额，想要计算价税合计。</p><h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h3><h4 id="_1-使用bigdecimal" tabindex="-1"><a class="header-anchor" href="#_1-使用bigdecimal" aria-hidden="true">#</a> 1. 使用<code>BigDecimal</code></h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">BigDecimal</span> amt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;41.51&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> tax <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">&quot;2.49&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BigDecimal</span> total <span class="token operator">=</span> amt<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>tax<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>total<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 44.00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-转为整数运算" tabindex="-1"><a class="header-anchor" href="#_2-转为整数运算" aria-hidden="true">#</a> 2. 转为整数运算</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>

<span class="token keyword">int</span> amtInCent <span class="token operator">=</span> <span class="token function">convertToCent</span><span class="token punctuation">(</span><span class="token string">&quot;41.51&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> taxInCent <span class="token operator">=</span> <span class="token function">convertToCent</span><span class="token punctuation">(</span><span class="token string">&quot;2.49&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> totalInCent <span class="token operator">=</span> amtInCent <span class="token operator">+</span> taxInCent<span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">getAmtStr</span><span class="token punctuation">(</span>totalInCent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 44.00</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">convertToCent</span><span class="token punctuation">(</span><span class="token class-name">String</span> amt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span>
        amt <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> 
        amt<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;^(0|[1-9][0-9]*)\\\\.[0-9]{2}$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;金额格式错误&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> s <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>amt<span class="token punctuation">,</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> s<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getAmtStr</span><span class="token punctuation">(</span><span class="token keyword">int</span> amtInCent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span>amtInCent <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;金额应大于等于0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>amtInCent<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 小数点左边部分</span>
    <span class="token class-name">String</span> left <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        left <span class="token operator">=</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 小数点右边部分</span>
    <span class="token class-name">String</span> right <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    right <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">leftPad</span><span class="token punctuation">(</span>right<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> left <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>int</code>的最大值为：2147483647，最大可表示金额为：2147,4836.47元<br> 当金额数较大时考虑使用<code>long</code></p></div>`,12),k={class:"hint-container warning"},d=n("p",{class:"hint-container-title"},"注意",-1),m=n("code",null,"String.matches()",-1),v=n("code",null,"Pattern",-1),h=n("code",null,"Matcher",-1),b=n("code",null,"Pattern",-1),g=n("br",null,null,-1),f=a(`<h3 id="比较" tabindex="-1"><a class="header-anchor" href="#比较" aria-hidden="true">#</a> 比较</h3><p><code>BigDecimal</code>使用起来较为简单直接，但是效率不如整数运算。<br> 整数运算仅在输入和输出时进行一次类型转换（<code>string</code>&lt;-&gt;<code>int</code>），其余均为整型运算，效率较高。<br> 如果注重性能且涉及到多次运算，推荐使用整数运算。</p><h2 id="如何比较两个文件内容是否一致" tabindex="-1"><a class="header-anchor" href="#如何比较两个文件内容是否一致" aria-hidden="true">#</a> 如何比较两个文件内容是否一致？</h2><h3 id="场景-1" tabindex="-1"><a class="header-anchor" href="#场景-1" aria-hidden="true">#</a> 场景</h3><ul><li>校验文件完整性</li><li>重复文件查找</li></ul><h3 id="解决方案-1" tabindex="-1"><a class="header-anchor" href="#解决方案-1" aria-hidden="true">#</a> 解决方案</h3><h4 id="利用校验和" tabindex="-1"><a class="header-anchor" href="#利用校验和" aria-hidden="true">#</a> 利用校验和</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileUtils</span></span><span class="token punctuation">;</span>

<span class="token class-name">File</span> a <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">getFile</span><span class="token punctuation">(</span><span class="token string">&quot;pathA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">File</span> b <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">getFile</span><span class="token punctuation">(</span><span class="token string">&quot;pathB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> checkA <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">checksumCRC32</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> checkB <span class="token operator">=</span> <span class="token class-name">FileUtils</span><span class="token punctuation">.</span><span class="token function">checksumCRC32</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>checkA <span class="token operator">==</span> checkB<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>FileUtils</code>也提供了<code>checksum(final File file, final Checksum checksum)</code>方法，可以自行选择校验算法</p></div>`,9);function _(w,x){const t=i("RouterLink");return e(),c("div",null,[r,n("div",k,[d,n("p",null,[s("示例代码出于简洁，使用了"),m,s("方法。 该方法内部会创建一个"),v,s("和一个"),h,s("对象。 为了避免重复创建对象造成的开销，在实际开发中，如果一个正则表达式会被多次使用， 你应该考虑复用该表达式对应的"),b,s("。"),g,s(" 详细可以参考"),o(t,{to:"/code/java/best-practice.html#%E8%80%83%E8%99%91%E5%A4%8D%E7%94%A8%E5%AF%B9%E8%B1%A1"},{default:l(()=>[s("考虑复用对象")]),_:1})])]),f])}const y=p(u,[["render",_],["__file","how-to.html.vue"]]);export{y as default};