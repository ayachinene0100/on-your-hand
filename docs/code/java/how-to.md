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

#### 使用`BigDecimal`

```java
BigDecimal amt = new BigDecimal("41.51");
BigDecimal tax = new BigDecimal("2.49");
BigDecimal total = amt.add(tax);
System.out.println(total);  // 44.00
```

#### 转为整数运算

```java {8}
import org.apache.commons.lang3.StringUtils;

int amtInCent = convertToCent("41.51");
int taxInCent = convertToCent("2.49");
int totalInCent = amtInCent + taxInCent;    // 4400

private static int convertToCent(String amt) {
    // 省略对amt的格式检查
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