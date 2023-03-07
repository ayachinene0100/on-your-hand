---
title: 空指针处理
icon: null
---

## 总是检查外部参数是否为空

::: tip 外部参数
指不明调用者传来的参数。
一般来讲，Web应用对外系统暴露的接口、Java代码中声明为`public`的函数（暴露给其他开发人员的函数）
所接收到的参数都是外部参数
:::

::: warning 
对于外部参数，由于方法、接口调用者不明确，行为不固定，所以一定要进行空指针检查
:::

```java{2,12}
// userId可能为空！
String userId = context.getData(Fields.USER_ID);

// 提供给其他开发人员使用
public static String subString(String s, int begin, int end) {
  // ...
}

// 其他人员有可能这样使用
// 如果前端没有传入USER_ID字段而subString没有考虑到空指针的情况
// 将会抛出NullPointerException
subString(context.getData(Fields.USER_ID), 0, 3);
```

## 对于来源确定的参数的处理可以较为宽松

<br>

:::quote 来源确定的参数
指方法、接口的调用者是可以确定的，
:::



## 发现参数为空时的处理方式

#### 空为非正常情况，导致程序无法继续执行：

```java
// 做法1: 抛出异常
if (userId == null) {
  throw new IllegalArgumentException("参数错误");
}
// 也可以使用Assert
Assert.notNull(userId, "参数错误");

// 做法2：给予参数一个默认值
if (userId == null) {
  userId = SessionHolder().get().getUserId();
}
```