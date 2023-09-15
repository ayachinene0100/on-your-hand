import{_ as r,C as t,Y as h,Z as n,a0 as e,a1 as a,$ as d,a3 as o}from"./framework-a624696e.js";const p={},s=e("h1",{id:"idea-vim",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#idea-vim","aria-hidden":"true"},"#"),a(" idea-vim")],-1),c=e("p",null,"vim是一款高度可定制化的文本处理工具，但通常没有可视化图形界面。 Idea在现代IDE中又非常好用。 使用idea-vim可以既享受Idea的丰富功能，又能享受vim的强大文本处理功能",-1),l=e("p",null,"本教程中我将重点介绍vim可以弥补idea短板的一些功能，对于高阶用法不进行介绍",-1),u=e("h2",{id:"资料来源",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#资料来源","aria-hidden":"true"},"#"),a(" 资料来源")],-1),m={id:"vim中文手册",tabindex:"-1"},b=e("a",{class:"header-anchor",href:"#vim中文手册","aria-hidden":"true"},"#",-1),f={href:"https://yianwillis.github.io/vimcdoc/doc/help.html",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"基本上大部分内容都可以在这里找到",-1),g={id:"vim-cheat-sheet",tabindex:"-1"},x=e("a",{class:"header-anchor",href:"#vim-cheat-sheet","aria-hidden":"true"},"#",-1),_={href:"https://vim.rtorr.com/lang/zh_cn",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,"vim中文备忘录",-1),y={id:"idea-vim-1",tabindex:"-1"},k=e("a",{class:"header-anchor",href:"#idea-vim-1","aria-hidden":"true"},"#",-1),q={href:"https://github.com/JetBrains/ideavim",target:"_blank",rel:"noopener noreferrer"},j=o(`<p>idea-vim github官网</p><h2 id="插入模式" tabindex="-1"><a class="header-anchor" href="#插入模式" aria-hidden="true">#</a> 插入模式</h2><p>用来打字的模式</p><ul><li><p>使用i在光标前插入</p></li><li><p>使用a在光标后插入</p></li><li><p>使用A在行末插入</p></li><li><p>使用o新加一行插入</p></li><li><p>使用O向上新加一行插入</p></li></ul><h2 id="普通模式" tabindex="-1"><a class="header-anchor" href="#普通模式" aria-hidden="true">#</a> 普通模式</h2><p>普通模式主要用来进行移动、跳转、删除等等操作，默认刚进入vim就在普通模式，总是可以使用&lt;ESC&gt;进入普通模式 由于插入模式（用来输入）和普通模式的转换过于频繁，而esc键又太远，建议做如下设置</p><p>inoremap jk &lt;Esc&gt;</p><p>表示在插入模式下连按jk进入普通模式</p><h3 id="移动" tabindex="-1"><a class="header-anchor" href="#移动" aria-hidden="true">#</a> 移动</h3><ul><li>h：光标左移</li><li>j：光标下移</li><li>k：光标上移</li><li>l：光标右移</li></ul><p>我的记法：h j k l四个键，h位于最左边，代表向左，l位于最右边，代表向右，j是一个向下的钩子，代表向下</p><p>可以在这些移动键前加入数字来代表移动距离 如：3h，向左三个字符、3j向下3行</p><p>推荐在ideavimrc中设置： set number relativenumber 或者缩写版本 set nu rnu</p><p>来使得行号变成相对行号 效果： 如果当前光标在100行，101行的行号显示为1，99行的光标也显示为1 使用这个机制可以方便地利用{number}h|j|k|l进行跳转</p><p>也可以使用绝对跳转，但我个人不觉得比上述方法方便</p><p>使用51G或者51gg跳转到51行（绝对51行） 使用gg跳转到首行 使用G跳转到最后一行</p><p>使用^跳转到行首，$跳转到行末，但我觉得按起来不太方便 我使用了如下配置 noremap H ^ noremap L $ 将插入模式、普通模式以及可视模式下的对应键分别改为H和L。</p><p>注意：H原来对应的功能是移动到当前屏幕的第一行，L代表移动到当前屏幕的最后一行。这样会将其覆盖 但是我觉得挺鸡肋的，就覆盖了（可以使用相对行号加j、k实现同样功能）</p><h4 id="单词移动" tabindex="-1"><a class="header-anchor" href="#单词移动" aria-hidden="true">#</a> 单词移动：</h4><h5 id="w" tabindex="-1"><a class="header-anchor" href="#w" aria-hidden="true">#</a> w</h5><p>w for word</p><p>移动到下一个单词的开头</p><h5 id="w-1" tabindex="-1"><a class="header-anchor" href="#w-1" aria-hidden="true">#</a> W</h5><p>同w，只是对单词的判定有所不同，比w的判定范围大，比如adwd()|11, w判定为adwd、()|、11三个部分，W直接判定为一个部分</p><h5 id="b" tabindex="-1"><a class="header-anchor" href="#b" aria-hidden="true">#</a> b</h5><p>b for before、back</p><p>移动到当前单词的开头，若已在开头，则移动到上一个单词的开头</p><h5 id="b-1" tabindex="-1"><a class="header-anchor" href="#b-1" aria-hidden="true">#</a> B</h5><p>同w和W的区别</p><h5 id="e" tabindex="-1"><a class="header-anchor" href="#e" aria-hidden="true">#</a> e</h5><p>e for end</p><p>移动到当前单词的末尾，若已在末尾，移动到下一个单词的末尾</p><h5 id="e-1" tabindex="-1"><a class="header-anchor" href="#e-1" aria-hidden="true">#</a> E</h5><p>同w和W的区别</p><h5 id="ge" tabindex="-1"><a class="header-anchor" href="#ge" aria-hidden="true">#</a> ge</h5><p>移动到上一个单词的末尾</p><h5 id="ge-1" tabindex="-1"><a class="header-anchor" href="#ge-1" aria-hidden="true">#</a> gE</h5><p>同w和W的区别</p><h4 id="行内移动" tabindex="-1"><a class="header-anchor" href="#行内移动" aria-hidden="true">#</a> 行内移动</h4><p>f、F、t、T</p><h5 id="f" tabindex="-1"><a class="header-anchor" href="#f" aria-hidden="true">#</a> f</h5><p>f for find</p><p>在行内找一个单字母 比如光标在以下行的开头</p><blockquote><p>Hello, world!</p></blockquote><p>使用fw将使光标位于<b>w</b>orld的第一个字母w上 使用fl将使光标位于He<b>l</b>lo的第一个l上 如果此时想查找下一个l，可以使用; 如果此时想查找上一个l，可以使用, 以上全部都是单行内查找</p><h4 id="f-1" tabindex="-1"><a class="header-anchor" href="#f-1" aria-hidden="true">#</a> F</h4><p>f的反向版本</p><h4 id="t" tabindex="-1"><a class="header-anchor" href="#t" aria-hidden="true">#</a> t</h4><p>t for til</p><p>跳转到前一个字符处</p><p>还是上面的例子</p><p>tl跳转到e tw跳转到w前的空白</p><h4 id="t-1" tabindex="-1"><a class="header-anchor" href="#t-1" aria-hidden="true">#</a> T</h4><p>t的反向版本</p><h3 id="操作" tabindex="-1"><a class="header-anchor" href="#操作" aria-hidden="true">#</a> 操作</h3><p>以下操作均可以加上移动操作来表示执行范围</p><h4 id="d-执行删除" tabindex="-1"><a class="header-anchor" href="#d-执行删除" aria-hidden="true">#</a> d 执行删除</h4><p>d for delete</p><p>dd删除一行 D从当前位置删除到行末尾 x dl的快捷方式，删除光标下的字符</p><p>d3w删除三个单词 dfo删除到第一个o，包含o dto删除到第一个o，不包含o dFo删除到前一个o，包含o dTo删除到前一个o，不包含o</p><p>d3j向下删除三行</p><p>ggVGd 或 ggvGD 删除所有</p><p>关于ggVGd 其中gg代表到行首、V代表开启可视模式（我喜欢叫选择模式）可视模式用来选择文本，相当于用鼠标长按左键拉动，V是行选择模式，会选择一整行， G代表移动到行尾部，d代表删除</p><p>关于ggvGD gg和G同理 v代表开启可视模式，但是字符选择，D代表删除整行</p><p>如果启用了textobj-entire插件（通过在ideavimrc中加入set textobj-entire），可以使用vaed v打开可视模式，ae选择所有，d删除</p><h4 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> c</h4><p>c for change</p><p>和d一样，只不过删除完之后会进入插入模式</p><p>cc更改一行 cw更改一个单词...</p><h4 id="y" tabindex="-1"><a class="header-anchor" href="#y" aria-hidden="true">#</a> y</h4><p>和d一样，只不过是拷贝，该拷贝不和ctrl c ctrl v共享剪贴板</p><p>yy拷贝一行 y3w拷贝三个单词...</p><p>使用p来进行粘贴，p for put(or for me, paste)</p><h4 id="j" tabindex="-1"><a class="header-anchor" href="#j" aria-hidden="true">#</a> J</h4><p>J for join 把下一行挪到上一行末尾</p><h3 id="高阶移动" tabindex="-1"><a class="header-anchor" href="#高阶移动" aria-hidden="true">#</a> 高阶移动</h3><p>可以使用m[a-zA-Z0-9]来打标签 然后使用\`[a-zA-Z0-9]来跳转到对应标签行 用&#39;[a-zA-Z0-9]跳转到对应标签的字符</p><p>在需要修改两个地方时很方便</p><p>可以使用<code>跳转到上一个位置，再次使用</code>会跳回去</p><p>可以使用ctrl i移动到光标的下一个位置，ctrl o移动到光标的上一个位置 等同于idea的 ctrl alt &lt;-和ctrl alt -&gt;</p><p>可以使用%来跳转到匹配的括号，包括[{(并在对应括号间跳转，但只能选择到行内的括号</p><h4 id="easymotion" tabindex="-1"><a class="header-anchor" href="#easymotion" aria-hidden="true">#</a> easymotion</h4><p>easymotion很方便的搜索当前屏幕内的内容 使用方式：安装插件IdeaVim-EasyMotion 在ideavimrc中加入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let mapleader=&quot; &quot; # 修改leader键为自己喜欢的键，我这里是空格
set easymotion    # 开启插件
map \\&lt;Leader\\&gt; \\&lt;Plug\\&gt;(easymotion-prefix)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来便可以使用&lt;Leader&gt;f &lt;Leader&gt;s等等诸多功能了</p><p>具体可用命令在下方可以找到 https://github.com/easymotion/vim-easymotion/blob/master/doc/easymotion.txt#L86</p><p>有了easymotion，移动变得非常简单</p><h2 id="可视模式" tabindex="-1"><a class="header-anchor" href="#可视模式" aria-hidden="true">#</a> 可视模式</h2><p>按v进入可视模式，V进入行选择可视模式</p><p>在可视模式中按移动命令，文本会被选中</p><p>可视命令可以通过iw，aw选择单词，可以通过vi(选择括号内的内容，va(选择包含括号的内容，按)也是可以的</p><p>可以选择文本后通过使用S&quot;包上双引号，S&#39;单引号，S[ S]包上[]，等等，（[会在内容和括号之间留一个空格，]则不会）</p><h2 id="搜索" tabindex="-1"><a class="header-anchor" href="#搜索" aria-hidden="true">#</a> 搜索</h2><p>使用/向下搜索 使用?向上搜索 使用n找下一个结果 使用N找上一个结果 在查找时使用?来反转搜索方向 支持正则表达式</p><p>注意，vim支持重复上一次的改变操作，通过.来实现 你可以利用搜索模式实现多个关键字加引号这种操作 比如对所有hello加引号</p><p>在开启surround的状态下可以这样 /hello # 查找hello ysiw&quot; # 加引号 n # 找下一个hello . # 加引号 n # 找下一个hello ...</p><h2 id="自定义快捷键" tabindex="-1"><a class="header-anchor" href="#自定义快捷键" aria-hidden="true">#</a> 自定义快捷键</h2><p>通过在ideavimrc中使用map类命令定义 如映射到idea操作打断点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;map&gt; b &lt;Action&gt;(ToggleLineBreakPoint)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中\\b是快捷键，&lt;Action&gt;()是固定写法 括号里写idea的操作，其中对应操作可以通过shift + shift打开search everywhere 选择Action，输入Track Action Ids 选择On，接下来所有的idea操作都会在右下角输出action id</p><h2 id="杂项" tabindex="-1"><a class="header-anchor" href="#杂项" aria-hidden="true">#</a> 杂项</h2><p>gq{motion}：格式化，后面需要加移动操作来指定范围 gqq格式化当前行 gc{motion}: 注释 gcc注释当前行</p><p>如果觉得ysiw&quot;太麻烦可以改快捷键 比如 nmap &quot; ysiw&quot;使得按一次&quot;便可为一个单词括上引号</p><blockquote><p>具体的ideavimrc配置文件我还在配置当中</p></blockquote>`,104);function V(L,E){const i=t("ExternalLinkIcon");return h(),n("div",null,[s,c,l,u,e("h3",m,[b,a(),e("a",f,[a("vim中文手册"),d(i)])]),v,e("h3",g,[x,a(),e("a",_,[a("vim cheat sheet"),d(i)])]),w,e("h3",y,[k,a(),e("a",q,[a("idea-vim"),d(i)])]),j])}const G=r(p,[["render",V],["__file","idea-vim.html.vue"]]);export{G as default};