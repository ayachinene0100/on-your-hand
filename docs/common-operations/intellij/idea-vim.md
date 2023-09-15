# idea-vim

vim是一款高度可定制化的文本处理工具，但通常没有可视化图形界面。
Idea在现代IDE中又非常好用。
使用idea-vim可以既享受Idea的丰富功能，又能享受vim的强大文本处理功能

本教程中我将重点介绍vim可以弥补idea短板的一些功能，对于高阶用法不进行介绍

## 资料来源

### [vim中文手册](https://yianwillis.github.io/vimcdoc/doc/help.html)

基本上大部分内容都可以在这里找到

### [vim cheat sheet](https://vim.rtorr.com/lang/zh_cn)

vim中文备忘录

### [idea-vim](https://github.com/JetBrains/ideavim)

idea-vim github官网

## 插入模式

用来打字的模式

- 使用i在光标前插入

- 使用a在光标后插入
- 使用A在行末插入
- 使用o新加一行插入
- 使用O向上新加一行插入

## 普通模式

普通模式主要用来进行移动、跳转、删除等等操作，默认刚进入vim就在普通模式，总是可以使用\<ESC\>进入普通模式
由于插入模式（用来输入）和普通模式的转换过于频繁，而esc键又太远，建议做如下设置

inoremap jk \<Esc\>

表示在插入模式下连按jk进入普通模式

### 移动

- h：光标左移
- j：光标下移
- k：光标上移
- l：光标右移

我的记法：h j k l四个键，h位于最左边，代表向左，l位于最右边，代表向右，j是一个向下的钩子，代表向下

可以在这些移动键前加入数字来代表移动距离
如：3h，向左三个字符、3j向下3行

推荐在ideavimrc中设置：
set number relativenumber
或者缩写版本
set nu rnu

来使得行号变成相对行号
效果：
如果当前光标在100行，101行的行号显示为1，99行的光标也显示为1
使用这个机制可以方便地利用{number}h|j|k|l进行跳转

也可以使用绝对跳转，但我个人不觉得比上述方法方便

使用51G或者51gg跳转到51行（绝对51行）
使用gg跳转到首行
使用G跳转到最后一行

使用^跳转到行首，$跳转到行末，但我觉得按起来不太方便
我使用了如下配置
noremap H ^
noremap L $
将插入模式、普通模式以及可视模式下的对应键分别改为H和L。

注意：H原来对应的功能是移动到当前屏幕的第一行，L代表移动到当前屏幕的最后一行。这样会将其覆盖
但是我觉得挺鸡肋的，就覆盖了（可以使用相对行号加j、k实现同样功能）

#### 单词移动：

##### w
w for word

移动到下一个单词的开头

##### W
同w，只是对单词的判定有所不同，比w的判定范围大，比如adwd()|11, w判定为adwd、()|、11三个部分，W直接判定为一个部分

##### b
b for before、back

移动到当前单词的开头，若已在开头，则移动到上一个单词的开头

##### B
同w和W的区别

##### e
e for end

移动到当前单词的末尾，若已在末尾，移动到下一个单词的末尾

##### E
同w和W的区别

##### ge
移动到上一个单词的末尾

##### gE
同w和W的区别

#### 行内移动

f、F、t、T

##### f
f for find

在行内找一个单字母
比如光标在以下行的开头

> Hello, world!

使用fw将使光标位于<b>w</b>orld的第一个字母w上
使用fl将使光标位于He<b>l</b>lo的第一个l上
如果此时想查找下一个l，可以使用;
如果此时想查找上一个l，可以使用,
以上全部都是单行内查找

#### F
f的反向版本

#### t
t for til

跳转到前一个字符处

还是上面的例子

tl跳转到e
tw跳转到w前的空白

#### T
t的反向版本

### 操作

以下操作均可以加上移动操作来表示执行范围

#### d 执行删除
d for delete

dd删除一行
D从当前位置删除到行末尾
x dl的快捷方式，删除光标下的字符

d3w删除三个单词
dfo删除到第一个o，包含o
dto删除到第一个o，不包含o
dFo删除到前一个o，包含o
dTo删除到前一个o，不包含o

d3j向下删除三行

ggVGd
或
ggvGD
删除所有

关于ggVGd
其中gg代表到行首、V代表开启可视模式（我喜欢叫选择模式）可视模式用来选择文本，相当于用鼠标长按左键拉动，V是行选择模式，会选择一整行，
G代表移动到行尾部，d代表删除

关于ggvGD
gg和G同理
v代表开启可视模式，但是字符选择，D代表删除整行


如果启用了textobj-entire插件（通过在ideavimrc中加入set textobj-entire），可以使用vaed
v打开可视模式，ae选择所有，d删除


#### c
c for change

和d一样，只不过删除完之后会进入插入模式

cc更改一行
cw更改一个单词...

#### y
和d一样，只不过是拷贝，该拷贝不和ctrl c ctrl v共享剪贴板

yy拷贝一行
y3w拷贝三个单词...

使用p来进行粘贴，p for put(or for me, paste)

#### J
J for join
把下一行挪到上一行末尾

### 高阶移动

可以使用m[a-zA-Z0-9]来打标签
然后使用`[a-zA-Z0-9]来跳转到对应标签行
用'[a-zA-Z0-9]跳转到对应标签的字符

在需要修改两个地方时很方便

可以使用``跳转到上一个位置，再次使用``会跳回去

可以使用ctrl i移动到光标的下一个位置，ctrl o移动到光标的上一个位置
等同于idea的 ctrl alt <-和ctrl alt ->

可以使用%来跳转到匹配的括号，包括[{(并在对应括号间跳转，但只能选择到行内的括号

#### easymotion
easymotion很方便的搜索当前屏幕内的内容
使用方式：安装插件IdeaVim-EasyMotion
在ideavimrc中加入
```
let mapleader=" " # 修改leader键为自己喜欢的键，我这里是空格
set easymotion    # 开启插件
map \<Leader\> \<Plug\>(easymotion-prefix)
```

接下来便可以使用\<Leader\>f
\<Leader\>s等等诸多功能了

具体可用命令在下方可以找到
https://github.com/easymotion/vim-easymotion/blob/master/doc/easymotion.txt#L86

有了easymotion，移动变得非常简单


## 可视模式

按v进入可视模式，V进入行选择可视模式

在可视模式中按移动命令，文本会被选中

可视命令可以通过iw，aw选择单词，可以通过vi(选择括号内的内容，va(选择包含括号的内容，按)也是可以的

可以选择文本后通过使用S"包上双引号，S'单引号，S[ S]包上[]，等等，（[会在内容和括号之间留一个空格，]则不会）

## 搜索
使用/向下搜索
使用?向上搜索
使用n找下一个结果
使用N找上一个结果
在查找时使用?来反转搜索方向
支持正则表达式

注意，vim支持重复上一次的改变操作，通过.来实现
你可以利用搜索模式实现多个关键字加引号这种操作
比如对所有hello加引号

在开启surround的状态下可以这样
/hello # 查找hello
ysiw" # 加引号
n   # 找下一个hello
.   # 加引号
n   # 找下一个hello
...


## 自定义快捷键

通过在ideavimrc中使用map类命令定义
如映射到idea操作打断点
```
<map> b <Action>(ToggleLineBreakPoint)
```
其中\b是快捷键，\<Action\>()是固定写法
括号里写idea的操作，其中对应操作可以通过shift + shift打开search everywhere 选择Action，输入Track Action Ids
选择On，接下来所有的idea操作都会在右下角输出action id

## 杂项
gq{motion}：格式化，后面需要加移动操作来指定范围
gqq格式化当前行
gc{motion}: 注释
gcc注释当前行

如果觉得ysiw"太麻烦可以改快捷键
比如
nmap " ysiw"使得按一次"便可为一个单词括上引号

> 具体的ideavimrc配置文件我还在配置当中
