# 通用

## SQL语法相关

> 参考链接：[MySQL 8.0 Reference Manual Chapter 13 SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html)

## 函数相关

> 参考链接: [MySQL 8.0 Reference Manual Chapter 12 Functions and Operators](https://dev.mysql.com/doc/refman/8.0/en/functions.html)

> 内置函数参照表: [MySQL 8.0 Reference Manual Chapter 12.1 Built-In Function and Operator Reference](https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html)

## 按日期分组

以下时间类型为datetime

```mysql
-- substr以1作为起始下标

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
```

## 将数据导出到csv

具体可以参考官方文档：[MySQL 8.0 Reference Manual 13.2.13.1 SELECT ... INTO Statement](https://dev.mysql.com/doc/refman/8.0/en/select-into.html)

```mysql
-- csv表头
(select 'id', 'name')
union
-- 要导出的数据
(select
     id,
     -- 默认情况下导出的数据中null用 \N 表示，可以使用ifnull函数将其转换为''
     ifnull(name, '')
from user
)
-- 输出文件路径
into outfile 'user.csv'
-- 每列的值以双引号包围
fields enclosed by '"'
-- 列与列之间逗号分割
terminated by ','
-- \n作为换行符
lines terminated by '\n';
```

默认情况下文件会被保存在mysql变量`datadir`下的[schema名]路径下

```shell
mysql> show variables like 'datadir';
+---------------+------------------------+
| Variable_name | Value                  |
+---------------+------------------------+
| datadir       | /usr/local/mysql/data/ |
+---------------+------------------------+
1 row in set (0.00 sec)
```

若user在shcema为db的数据库下，user.csv的全路径为：`/usr/local/mysql/data/db/user.csv`

文件内容：
```txt
"id","name"
"1","Bob"
```

默认情况下导出的文件权限为：
```shell
sh-3.2# ls -l user.csv 
-rw-r-----  1 _mysql  _mysql  25 Jun 30 15:45 user.csv
```
故默认情况下只能mysql用户有读写权限，mysql用户组下的用户有读权限，其他非root用户无法读写。

更改权限，使得mysql组下的用户可以读写，其他用户可读
```shell
sh-3.2# chmod 664 user.csv 
sh-3.2# ls -l user.csv 
-rw-rw-r--  1 _mysql  _mysql  25 Jun 30 15:45 user.csv
```

有时发现即使没有分页，也只能导出一部分数据而非全表。
可以检查变量`sql_select_limit`：
```shell
mysql> show variables like '%sql_select_limit%';
+------------------+----------+
| Variable_name    | Value    |
+------------------+----------+
| sql_select_limit | 200      |
+------------------+----------+
1 row in set (0.01 sec)

mysql> set sql_select_limit = 1000000;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like '%sql_select_limit%';
+------------------+---------+
| Variable_name    | Value   |
+------------------+---------+
| sql_select_limit | 1000000 |
+------------------+---------+
1 row in set (0.01 sec)

```