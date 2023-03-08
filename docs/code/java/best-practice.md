# 最佳实践

- <Badge text="Common" type="tip" />
    代表该最佳实践虽用特例来说明，但其中蕴含的道理是通用的。

## 使用现有的实现优于自行开发

在实现某一功能前，首先考虑该功能是否已经有**成熟、可靠、标准**的实现。
如果该实现可以满足需求，则优先考虑使用现有实现，而非自行开发。

使用现有实现有着以下好处：

- 代码统一（重复造轮子会导致代码冗余）
- 开发简便（无需自行开发）
- 可靠性高（业界成熟的实现已经经过时间的考验）

## 使用`valueOf()`优于使用`new()` <Badge text="Common" type="tip" />

通常某些类会为客户提供一些`static`的方法用于返回该类的实例。  
一个常见的例子是各种基本类型的封装类。  
如`Integer`:

```java {2-3}
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

可以看到，`valueOf()`通过使用cache来复用对象，从而避免了创建过多对象。

使用`new()`意味着创建一个对象的实例。
**每使用一次`new()`就会有一个实例被创建。**
而静态对象创建方法则不然，类的设计者可以在方法内部进行特殊的优化。从而实现对象复用等目的。
因此，应该首先考虑使用`valueOf()`

::: tip 扩展
该词条可以扩展为：使用静态构造方法优于直接使用构造方法
:::

## 使用`StringUtils.substring()`优于使用`s.substring()` <Badge text="Common" type="tip" />

::: code-tabs#java

@tab StringUtils.substring()

```java
package org.apache.commons.lang3;

/**
* StringUtils.substring(null, *, *)    = null
* StringUtils.substring("", * ,  *)    = "";
* StringUtils.substring("abc", 0, 2)   = "ab"
* StringUtils.substring("abc", 2, 0)   = ""
* StringUtils.substring("abc", 2, 4)   = "c"
* StringUtils.substring("abc", 4, 6)   = ""
* StringUtils.substring("abc", 2, 2)   = ""
* StringUtils.substring("abc", -2, -1) = "b"
* StringUtils.substring("abc", -4, 2)  = "ab"
*/
public static String substring(final String str, int start, int end) {
    if (str == null) {
        return null;
    }

    // handle negatives
    if (end < 0) {
        end = str.length() + end; // remember end is negative
    }
    if (start < 0) {
        start = str.length() + start; // remember start is negative
    }

    // check length next
    if (end > str.length()) {
        end = str.length();
    }

    // if start is greater than end, return ""
    if (start > end) {
        return EMPTY;
    }

    if (start < 0) {
        start = 0;
    }
    if (end < 0) {
        end = 0;
    }

    return str.substring(start, end);
}
```

@tab String.substring()

```java
public String substring(int beginIndex, int endIndex) {
    int length = length();
    checkBoundsBeginEnd(beginIndex, endIndex, length);
    if (beginIndex == 0 && endIndex == length) {
        return this;
    }
    int subLen = endIndex - beginIndex;
    return isLatin1() ? StringLatin1.newString(value, beginIndex, subLen)
                        : StringUTF16.newString(value, beginIndex, subLen);
}
```

:::

可以看到，`StringUtils.substring()`对原生的`substring()`作了进一步的封装。

主要体现在以下几点：

1. 空指针检查(15-17)
2. 边界处理(28-30, 33-35, 37-42)
3. 负下标功能(20-25)

因此，使用`StringUtils.substring()`，你可以获得以下好处：

1. 绝对不会抛出异常
2. 绝对不会返回nul（除非str本身为null）
3. 处理末尾时的便捷性

## 使用try-with-resource优于finally close

::: code-tabs#java

@tab try-with-resource

```java
// 使用try-with-resource，代码简洁明了
File file = new File("some path");
try (InputStream in = FileUtils.openInputStream(file)) {
    // 对in做一些操作
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

@tab finally close

```java
// 使用finally close，代码又臭又长
File file = new File("some path");
InputStream in = null;
try {
    in = FileUtils.openInputStream(file);
    // 对in做一些操作
} catch (IOException e) {
    throw new RuntimeException(e);
} finally {
    if (in != null) {
        try {
            in.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

:::

实现了`AutoCloseable`接口的对象都可以声明在`try()`中，
try catch代码块执行完毕后声明在`try()`中的变量会自动关闭。

使用try-with-resource也可以很好地避免忘记关闭流之类的情况。

## 使用'_'来使长数字更加可读

```java
// 1000亿，但可读性很差
long a = 100000000000L;
// 1000亿，但可读性很好
long a = 1000_0000_0000L;
```

::: tip
你应该总是使用‘L’来表示long字面值，而非'l'。
:::

## 使用