import{_ as e,W as l,X as i,Z as s,$ as n,Y as t,a1 as c,C as r}from"./framework-e9da4443.js";const o={},d=s("h1",{id:"通用",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#通用","aria-hidden":"true"},"#"),n(" 通用")],-1),p=s("h2",{id:"将数据导出到csv",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#将数据导出到csv","aria-hidden":"true"},"#"),n(" 将数据导出到csv")],-1),u={href:"https://dev.mysql.com/doc/refman/8.0/en/select-into.html",target:"_blank",rel:"noopener noreferrer"},m=c(`<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- csv表头
(select &#39;id&#39;, &#39;name&#39;)
union
-- 要导出的数据
(select
     id,
     name
from user
)
-- 输出文件路径
into outfile &#39;user.csv&#39;
-- 每列的值以双引号包围
fields enclosed by &#39;&quot;&#39;
-- 列与列之间逗号分割
terminated by &#39;,&#39;
-- \\n作为换行符
lines terminated by &#39;\\n&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下文件会被保存在mysql变量<code>datadir</code>下的[schema名]路径下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> show variables like <span class="token string">&#39;datadir&#39;</span><span class="token punctuation">;</span>
+---------------+------------------------+
<span class="token operator">|</span> Variable_name <span class="token operator">|</span> Value                  <span class="token operator">|</span>
+---------------+------------------------+
<span class="token operator">|</span> datadir       <span class="token operator">|</span> /usr/local/mysql/data/ <span class="token operator">|</span>
+---------------+------------------------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若user在shcema为db的数据库下，user.csv的全路径为：<code>/usr/local/mysql/data/db/user.csv</code></p><p>文件内容：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>&quot;id&quot;,&quot;name&quot;
&quot;1&quot;,&quot;Bob&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下导出的文件权限为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sh-3.2<span class="token comment"># ls -l user.csv </span>
-rw-r-----  <span class="token number">1</span> _mysql  _mysql  <span class="token number">25</span> Jun <span class="token number">30</span> <span class="token number">15</span>:45 user.csv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>故默认情况下只能mysql用户有读写权限，mysql用户组下的用户有读权限，其他非root用户无法读写。</p><p>更改权限，使得mysql组下的用户可以读写，其他用户可读</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sh-3.2<span class="token comment"># chmod 664 user.csv </span>
sh-3.2<span class="token comment"># ls -l user.csv </span>
-rw-rw-r--  <span class="token number">1</span> _mysql  _mysql  <span class="token number">25</span> Jun <span class="token number">30</span> <span class="token number">15</span>:45 user.csv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有时发现即使没有分页，也只能导出一部分数据而非全表。 可以检查变量<code>sql_select_limit</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> show variables like <span class="token string">&#39;%sql_select_limit%&#39;</span><span class="token punctuation">;</span>
+------------------+----------+
<span class="token operator">|</span> Variable_name    <span class="token operator">|</span> Value    <span class="token operator">|</span>
+------------------+----------+
<span class="token operator">|</span> sql_select_limit <span class="token operator">|</span> <span class="token number">200</span>      <span class="token operator">|</span>
+------------------+----------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>

mysql<span class="token operator">&gt;</span> <span class="token builtin class-name">set</span> sql_select_limit <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span>
Query OK, <span class="token number">0</span> rows affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

mysql<span class="token operator">&gt;</span> show variables like <span class="token string">&#39;%sql_select_limit%&#39;</span><span class="token punctuation">;</span>
+------------------+---------+
<span class="token operator">|</span> Variable_name    <span class="token operator">|</span> Value   <span class="token operator">|</span>
+------------------+---------+
<span class="token operator">|</span> sql_select_limit <span class="token operator">|</span> <span class="token number">1000000</span> <span class="token operator">|</span>
+------------------+---------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function v(b,k){const a=r("ExternalLinkIcon");return l(),i("div",null,[d,p,s("p",null,[n("具体可以参考官方文档："),s("a",u,[n("MySQL 8.0 Reference Manual 13.2.13.1 SELECT ... INTO Statement"),t(a)])]),m])}const _=e(o,[["render",v],["__file","commons.html.vue"]]);export{_ as default};
