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
// org.apache.commons.lang.StringUtils;

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

## 使用封装好的读写方法优于原生读写

### 小文件读写

`java.nio.file.Files`提供了一些简单易用的读取方法。

```java
Stream<String> lines(Path path) throws IOException
Stream<String> lines(Path path, Charset cs) throws IOException

List<String> readAllLines(Path path) throws IOException
List<String> readAllLines(Path path, Charset cs) throws IOException

String readString(Path path) throws IOException
String readString(Path path, Charset cs) throws IOException

byte[] readAllBytes(Path path) throws IOException
```

---

`java.nio.file.Files`也提供了一些简单易用的写入方法。

```java
Path write(Path path, byte[] bytes, OpenOption... options)
    throws IOException

Path write(Path path,
           Iterable<? extends CharSequence> lines,
           OpenOption... options)
    throws IOException

Path write(Path path, Iterable<? extends CharSequence> lines,
           Charset cs, OpenOption... options)
    throws IOException    

Path writeString(Path path, CharSequence csq, OpenOption... options)
    throws IOException

Path writeString(Path path, CharSequence csq, Charset cs, OpenOption... options)
    throws IOException
```

这些方法在读/写小文件时非常好用。使用者无需考虑关闭流等繁琐的细节。
但并不适合读/写大文件。因为这些方法都尝试一次性将文件内容读/写到内存中。  
特别地，由于`byte[]`的长度限制，诸如`readAllBytes()`，`write(..byte[]..)`一类的方法最多只能读/写2147483647B，即2GB。

::: info 
以上文本读/写方法在不声明`Charset`时，默认为`sun.nio.cs.UTF_8.INSTANCE`
:::

类似的工具类还有apache的`FileUtils`，`IOUtils`。

### 大文件读取

#### 二进制

Java 11提供了`byte[] InputStream.readNBytes(int len)`  
若使用Java 8可以考虑copy`readNBytes()`的实现。

#### 文本

考虑使用`org.apache.commons.io.IOUtils.lineIterator()`

## 考虑复用对象 <Badge text="Common" type="tip" />

考虑以下代码

```java
public isAmt(String s) {
    return s.matches("^(0|[1-9][0-9]*)\\.[0-9]{2}$");
}
```

该方法用来判断一个字符串是否是保留到两位小数的正数（或是"0.00"）。
乍一看似乎没什么问题，让我们看看内部发生了什么事情。

```java
// java.lang.String.matches()
public boolean matches(String regex) {
    return Pattern.matches(regex, this);
}

// java.util.regex.Pattern.matches()
public static boolean matches(String regex, CharSequence input) {
    Pattern p = Pattern.compile(regex);
    Matcher m = p.matcher(input);
    return m.matches();
}
```

可以看到内部会创建一个`Pattern`对象和`Matcher`对象。
如果`isAmt()`被调用**一百万次**，就会创建**一百万个**`Pattern`对象！
而这些`Pattern`对象之间根本没什么不同！

改进：

```java
// Pattern是线程安全的，所以你可以很放心地这么做
private static final Pattern AMT = 
    Pattern.compile("^(0|[1-9][0-9]*)\\.[0-9]{2}$");

public isAmt(String s) {
    return AMT.matcher(s).matches();
}
```