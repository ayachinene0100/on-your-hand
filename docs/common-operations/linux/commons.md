# 通用

## 命令行

### 复制粘贴

- 复制：`Ctrl + Insert`
- 粘贴：`Shift + Insert`

### 删除

`Ctrl + u`

删除整行，将光标移动到行首

`Ctrl + k`

删除光标所在位置及其以后的所有字符

### 光标移动

`Ctrl + a`

光标移动到行首

`Ctrl + e`

光标移动到行尾

`Alt + 左箭头`

向前移动一个单词

`Alt + 右箭头`

向后移动一个单词

### 历史命令

`history`

显示命令执行记录

`Ctrl + r`

开启搜索模式，搜索历史命令

在该模式下按`Ctrl + r`可以继续向前搜索

按回车可以直接执行命令

按`Ctrl + e`可以选中命令并使光标到行尾但并不执行

按`Ctrl + g`可以退出搜索模式

使用![命令id]可以执行历史命令

## 文件结构

使用`ls`只能查看当前目录下的文件。
想要递归查看可以考虑使用`tree`。

## 清空文件内容

有的时候我们没有删除文件的权限，或者文件包含复杂的权限设置、符号连接等等。
如果只想清空文件内容，同时保留以上属性，可以通过以下方式

`> [filepath]`

::: tip
以上用到了linux重定向。表示把空内容输入到filepath位置的文件中
:::

## 根据域名ip

```shell
➜  ~ ping www.baidu.com
PING www.a.shifen.com (157.148.69.80): 56 data bytes
64 bytes from 157.148.69.80: icmp_seq=0 ttl=51 time=34.793 ms
64 bytes from 157.148.69.80: icmp_seq=1 ttl=51 time=38.886 ms
64 bytes from 157.148.69.80: icmp_seq=2 ttl=51 time=40.921 ms
64 bytes from 157.148.69.80: icmp_seq=3 ttl=51 time=38.285 ms
64 bytes from 157.148.69.80: icmp_seq=4 ttl=51 time=101.599 ms
```

## 查看磁盘空间

```shell
root@VM-12-15-ubuntu:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           198M  980K  197M   1% /run
/dev/vda2        40G  8.4G   30G  23% /
tmpfs           988M   24K  988M   1% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           198M  4.0K  198M   1% /run/user/0
```

> -h中h代表human-readable，即以人类可阅读的形式输出

## 杀死端口上的进程

```shell
netstat -ano | findstr 8080
taskkill /f /pid [pid]
```