# 场景驱动

## 如何精确计算金额？

### 场景

发票金额信息包含以下三种：

- 金额
- 税额
- 价税合计

其中每种金额都精确到小数点后两位。如：36.78。  
现已知金额和税额，想要计算价税合计。

### 解决方案

#### 1. 使用`BigDecimal`

```java
BigDecimal amt = new BigDecimal("41.51");
BigDecimal tax = new BigDecimal("2.49");
BigDecimal total = amt.add(tax);
System.out.println(total);  // 44.00
```

#### 2. 转为整数运算

```java
import org.apache.commons.lang3.StringUtils;

int amtInCent = convertToCent("41.51");
int taxInCent = convertToCent("2.49");
int totalInCent = amtInCent + taxInCent;
System.out.println(getAmtStr(totalInCent)); // 44.00

private static int convertToCent(String amt) {
    Assert.isTrue(
        amt != null && 
        amt.matches("^(0|[1-9][0-9]*)\\.[0-9]{2}$"), "金额格式错误");
    String[] s = StringUtils.split(amt, '.');
    return Integer.parseInt(s[0] + s[1]);
}

private static String getAmtStr(int amtInCent) {
    Assert.isTrue(amtInCent >= 0, "金额应大于等于0");

    String s = String.valueOf(amtInCent);

    // 小数点左边部分
    String left = StringUtils.substring(s, 0, -2);
    if (StringUtils.isBlank(left)) {
        left = "0";
    }
    // 小数点右边部分
    String right = StringUtils.substring(s, -2);
    right = StringUtils.leftPad(right, 2, '0');

    return left + "." + right;
}
```

::: tip
`int`的最大值为：2147483647，最大可表示金额为：2147,4836.47元  
当金额数较大时考虑使用`long`
:::

::: warning
示例代码出于简洁，使用了`String.matches()`方法。
该方法内部会创建一个`Pattern`和一个`Matcher`对象。
为了避免重复创建对象造成的开销，在实际开发中，如果一个正则表达式会被多次使用，
你应该考虑复用该表达式对应的`Pattern`。  
详细可以参考[考虑复用对象](./best-practice.md#考虑复用对象)
:::
### 比较

`BigDecimal`使用起来较为简单直接，但是效率不如整数运算。  
整数运算仅在输入和输出时进行一次类型转换（`string`<->`int`），其余均为整型运算，效率较高。  
如果注重性能且涉及到多次运算，推荐使用整数运算。

## 如何比较两个文件内容是否一致？

### 场景

- 校验文件完整性
- 重复文件查找

### 解决方案

#### 利用校验和

```java
import org.apache.commons.io.FileUtils;

File a = FileUtils.getFile("pathA");
File b = FileUtils.getFile("pathB");
long checkA = FileUtils.checksumCRC32(a);
long checkB = FileUtils.checksumCRC32(b);
System.out.println(checkA == checkB);
```

::: tip
`FileUtils`也提供了`checksum(final File file, final Checksum checksum)`方法，可以自行选择校验算法
:::