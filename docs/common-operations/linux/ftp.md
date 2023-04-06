# FTP

::: tip
下文ftp>代表ftp命令行模式
:::

## 帮助

```bash
# 执行以下命令会出现帮助条目
ftp> help
Commands may be abbreviated.  Commands are:

!               close           fget            lpage           modtime         pdir            rcvbuf          sendport        type
$               cr              form            lpwd            more            pls             recv            set             umask
account         debug           ftp             ls              mput            pmlsd           reget           site            unset
append          delete          gate            macdef          mreget          preserve        remopts         size            usage
ascii           dir             get             mdelete         msend           progress        rename          sndbuf          user
bell            disconnect      glob            mdir            newer           prompt          reset           status          verbose
binary          edit            hash            mget            nlist           proxy           restart         struct          xferbuf
bye             epsv            help            mkdir           nmap            put             rhelp           sunique         ?
case            epsv4           idle            mls             ntrans          pwd             rmdir           system
cd              epsv6           image           mlsd            open            quit            rstatus         tenex
cdup            exit            lcd             mlst            page            quote           runique         throttle
chmod           features        less            mode            passive         rate            send            trace

# 可以通过help [item]选中条目
ftp> help mput
mput            send multiple files   
```

## 连接

### 建立连接

- `ftp [ hostname | ip ]`  
或
- `ftp> open [hostname | ip ]`

### 关闭连接

`bye`、`quit`、`exit`

## 上传

`put local-file [remote-file]`

`mput local-files`（速记：multi-put）

## 下载

`get remote-file [local-file]`

`mget remote-files`

::: tip
使用multiple commands时每次上传下载动作需要用户确认
可以使用`ftp> prompt off`来关闭确认
使用`ftp> prompt on`来打开确认
:::

## 常用文件操作

切换ftp服务器目录
`cd`（速记：change dir）

切换本地目录
`lcd`（速记：local change dir）

`ls`

`mkdir`

`pwd`

重命名文件
`rename`

删除目录
`rmdir`

删除文件
`delete`

## 其他

显示下载进度
`ftp> hash on`

关闭下载进度
`ftp> hash off`


