import{_ as i,W as r,X as t,Z as e,$ as n,Y as a,a1 as l,C as c}from"./framework-e9da4443.js";const d={},o=e("h1",{id:"通用",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#通用","aria-hidden":"true"},"#"),n(" 通用")],-1),p=e("h2",{id:"sql语法相关",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sql语法相关","aria-hidden":"true"},"#"),n(" SQL语法相关")],-1),u={href:"https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"函数相关",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#函数相关","aria-hidden":"true"},"#"),n(" 函数相关")],-1),v={href:"https://dev.mysql.com/doc/refman/8.0/en/functions.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html",target:"_blank",rel:"noopener noreferrer"},h=e("h2",{id:"变量相关",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#变量相关","aria-hidden":"true"},"#"),n(" 变量相关")],-1),k={href:"https://dev.mysql.com/doc/refman/8.0/en/server-option-variable-reference.html",target:"_blank",rel:"noopener noreferrer"},_=l(`<h2 id="按日期分组" tabindex="-1"><a class="header-anchor" href="#按日期分组" aria-hidden="true">#</a> 按日期分组</h2><p>以下时间类型为datetime</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- substr以1作为起始下标

-- 按年
select substr(create_time, 1, 4) as create_year, count(*)
from user
group by create_year;

-- 按月
select substr(create_time, 1, 7) as create_year, count(*)
from user
group by create_year;

-- 按日
select substr(create_time, 1, 10) as create_year, count(*)
from user
group by create_year;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将数据导出到csv" tabindex="-1"><a class="header-anchor" href="#将数据导出到csv" aria-hidden="true">#</a> 将数据导出到csv</h2>`,4),f={href:"https://dev.mysql.com/doc/refman/8.0/en/select-into.html",target:"_blank",rel:"noopener noreferrer"},q=l(`<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- csv表头
(select &#39;id&#39;, &#39;name&#39;)
union
-- 要导出的数据
(select
     id,
     -- 默认情况下导出的数据中null用 \\N 表示，可以使用ifnull函数将其转换为&#39;&#39;
     ifnull(name, &#39;&#39;)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下文件会被保存在mysql变量<code>datadir</code>下的[schema名]路径下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> show variables like <span class="token string">&#39;datadir&#39;</span><span class="token punctuation">;</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function y(g,x){const s=c("ExternalLinkIcon");return r(),t("div",null,[o,p,e("blockquote",null,[e("p",null,[n("参考链接："),e("a",u,[n("MySQL 8.0 Reference Manual Chapter 13 SQL Statements"),a(s)])])]),m,e("blockquote",null,[e("p",null,[n("参考链接: "),e("a",v,[n("MySQL 8.0 Reference Manual Chapter 12 Functions and Operators"),a(s)])])]),e("blockquote",null,[e("p",null,[n("内置函数参照表: "),e("a",b,[n("MySQL 8.0 Reference Manual Chapter 12.1 Built-In Function and Operator Reference"),a(s)])])]),h,e("blockquote",null,[e("p",null,[n("参考链接: "),e("a",k,[n("MySQL 8.0 Reference Manual Chapter 5.1.4 Server Option, System Variable, and Status Variable Reference"),a(s)])])]),_,e("p",null,[n("具体可以参考官方文档："),e("a",f,[n("MySQL 8.0 Reference Manual 13.2.13.1 SELECT ... INTO Statement"),a(s)])]),q])}const w=i(d,[["render",y],["__file","commons.html.vue"]]);export{w as default};
