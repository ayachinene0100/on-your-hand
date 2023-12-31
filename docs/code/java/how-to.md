# 场景驱动

- <Badge text="陷阱" type="danger" />
    代表该场景中隐藏着不易察觉的bug，即使有经验的开发人员也有可能犯类似的错误

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

校验文件完整性
将源文件分段传输后合并，检查合并后的文件是否完整。

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

## 如何转换数据库中查回来的数据？

### 场景

数据库中user表的head_icon列存储的是头像所在路径，希望每次查询出该列时，
自动读取文件并转换为base64字符串。

### 解决方案

#### [`TypeHandler`](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)

##### 定义对应的`TypeHandler`

```java
// 表明数据库端的映射类型是varchar
@MappedJdbcTypes(JdbcType.VARCHAR)
// 表明Java端的映射类型是String
public class Base64TypeHandler extends BaseTypeHandler<String> {

    @Override
    public void setNonNullParameter(
            PreparedStatement ps, int i, String parameter, JdbcType jdbcType)
            throws SQLException {
        // 更新数据库时不进行转换
        ps.setString(i, parameter);
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName)
            throws SQLException {
        // 查询时转base64
        return Base64Utils.getBase64(rs.getString(columnName));
    }

    @Override
    public String getNullableResult(ResultSet rs, int columnIndex)
            throws SQLException {
        // 查询时转base64
        return Base64Utils.getBase64(rs.getString(columnIndex));

    }

    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex)
            throws SQLException {
        // 查询时转base64
        return Base64Utils.getBase64(cs.getString(columnIndex));
    }
}
```

##### 使用`TypeHandler`

由于只希望该类型处理器作用在head_icon列，而不是所有的类型是varchar的列，
所以这里不使用全局注册`TypeHandler`。

- Raw use

```xml
<resultMap id="userMap" type="User">
  <id property="id" column="user_id" />
  <result property="headIcon" column="head_icon" 
    typeHandler="[Base64TypeHandler的全限定名]" />
</resultMap>
```

- 注解（MyBatis-Plus）

*以下示例省略了其他注解。*

```java
public class User {

    String id;

    @TableField(typeHandler = Base64TypeHandler.class)
    String headIcon;

    // Getters and Setters...
}
```

::: tip
笔者在使用自定义的`TypeHandler`时，`@Autowired`注解并不能生效。
应该是因为MyBatis在使用我的自定义`TypeHandler`时，并不是从IOC容器中拿取的缘故。
:::

::: tip

可以进一步使用组合注解进行优化

```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@TableField(typeHandler = Base64TypeHandler.class)
public @interface Base64 {
}

// ...
// 等价于@TableField(typeHandler = Base64TypeHandler.class)
@Base64
String headIcon;
// ...
```

:::

## 当`@Autowired`失效时应如何注入依赖？

### 场景

众所周知，`@Autowired`是依赖于IOC容器的。
`@Autowired`生效需要满足以下条件

1. `@Autowired`所在类（即要被依赖注入的类）在IOC容器中
2. `@Autowired`所注解的依赖（即要注入的依赖）在IOC容器中

:warning:注意：即使依赖被成功注入，也只是**被IOC管理的那个`bean`实例**的依赖被成功注入了。
因此，被依赖注入的类的其他实例是拿不到依赖对象的。

举个例子：

```java
@Component
public class User {

    String id;

    String headIcon;

    @Autowired
    ImgService imgService;

    // Getters and Setters...
}

User user = userRepository.findUserById("001");
user.getImgService() // null
```

只要`User`类在包扫描路径下，那么IOC容器里就确实会有一个`User`类型的`bean`，
而且这个`bean`的`imgService`不为空。
但该示例中，`user`是由`findUserById()`返回的新实例，
并没有经过`Spring IOC`，因此`user`的`ImgService`为`null`。

### 解决方案

```java
@Component
public class User {

    // 在该场景下，`imgService`声明为静态较为合适。
    private static ImgService imgService;
    
    String id;

    String headIcon;
    
    public static void setImgService(ImgService imgService) {
        User.imgService = imgService;
    }

    // Getters and Setters...
}

@Service
public class ImgService implements InitializingBean {
    
    // Bean初始化完毕后注入依赖
    @Override
    public void afterPropertiesSet() throws Exception {
        User.setImgService(this);    
    }
}
```


## 如何使IDEA Gradle项目默认使用本地Gradle?

### 场景

当远程git仓库没有.idea文件夹时，拉取下来的代码默认使用gradle wrapper。
但项目总是想要使用本地gradle，想要更改该配置，但idea没有提供图形接口。

### 解决方案

Help > Edit Custom Properties...

在打开的idea.properties文件中输入：

```properties
idea.gradle.distributionType=LOCAL
```

之后重启IDEA即可。

---

IDEA内置Gradle插件源码在以下部分处理新Gradle项目的项目级别配置。
其中行高亮部分用来设置`Use Gradle from:`配置项的

```kotlin {10-15}
package org.jetbrains.plugins.gradle.service.project.open

// ...

@ApiStatus.Internal
fun GradleProjectSettings.setupGradleProjectSettings(project: Project, 
    projectDirectory: Path) {
  externalProjectPath = projectDirectory.systemIndependentPath
  isUseQualifiedModuleNames = true
  distributionType =
    GradleEnvironment
      .Headless
      .GRADLE_DISTRIBUTION_TYPE
        ?.let(DistributionType::valueOf)
        ?: DistributionType.DEFAULT_WRAPPED
  gradleHome = GradleEnvironment.Headless.GRADLE_HOME ?: suggestGradleHome(project)
}

// ...
```

```java {13-14}
package org.jetbrains.plugins.gradle.util;

import org.jetbrains.annotations.NonNls;

/**
 * @author Denis Zhdanov
 */
public final class GradleEnvironment {

  @NonNls public static final boolean DEBUG_GRADLE_HOME_PROCESSING = Boolean.getBoolean("gradle.debug.home.processing");

  public static final class Headless {
    @NonNls public static final String GRADLE_DISTRIBUTION_TYPE = 
        System.getProperty("idea.gradle.distributionType");
    @NonNls public static final String GRADLE_HOME = 
        System.getProperty("idea.gradle.home");
    @NonNls public static final String GRADLE_VM_OPTIONS = 
        System.getProperty("idea.gradle.vmOptions");
    @NonNls public static final String GRADLE_OFFLINE = 
        System.getProperty("idea.gradle.offline");
    @NonNls public static final String GRADLE_SERVICE_DIRECTORY = 
        System.getProperty("idea.gradle.serviceDirectory");

    private Headless() {
    }
  }

  private GradleEnvironment() {
  }
}
```

## 如何在数组结构改变时删除元素 <Badge text="陷阱" type="danger" />

### 场景

Apache POI的`XWPFDocument`提供了删除元素的方法`removeBodyElement(int pos)`。
可以简单地把`XWPFDocument`理解成一个表示docx文档结构的类，其下包含一些元素（element），
如：段落、表格等等。
`removeBodyElement(int pos)`可以删除文档下对应位置的元素。

如果你有两个元素a和b分别位于位置3，和位置5，根据直觉，很容易就会写出以下代码

```java
// doc是XWPFDocument类型的对象
doc.removeBodyElement(3);   // 删除元素a
doc.removeBodyElement(5);   // 删除元素b
```

::: danger
但是其中隐藏着bug，由于元素a位于元素b之前，删除元素a之后会导致元素b位置前移，从而元素b现在位于位置4。
现在再进行删除实际上删除的是元素b的下一个元素。
:::

### 解决方案

#### 逆序删除

即然删除一个元素会改变其之后元素的下标，而其之前元素的下标保持不变，
那我们可以通过逆序删除来完成

```java
doc.removeBodyElement(5);
doc.removeBodyElement(3);

// 更一般地
public static void removeElements(XWPFDocument doc, List<Integer> pos) {
    if (CollectionUtils.isEmpty(pos)) {
        return;
    }
    
    // 为了保证删除的正确性，pos必须元素不重复且由小到大排序
    pos = pos.stream().distinct().sorted().collect(Collectors.toList());
    
    for (int i = pos.size() - 1; i >= 0; i--) {
        doc.removeBodyElement(pos.get(i));
    }
}
```

#### 动态计算新下标

```java
doc.removeBodyElement(3);       // 删除元素a
doc.removeBodyElement(4);       // 删除元素b

// 更一般地
public static void removeElements(XWPFDocument doc, List<Integer> pos) {
    if (CollectionUtils.isEmpty(pos)) {
        return;
    }
    
    // 为了保证删除的正确性，pos必须元素不重复且由小到大排序
    pos = pos.stream().distinct().sorted().collect(Collectors.toList());
    
    for (int i = 0; i < pos.size(); i++) {
        // 每删除一个元素，其之后的所有元素的下标都要前移一个位置
        doc.removeBodyElement(pos.get(i) - i);
    }
}
```

::: tip
与之很相像的另一个主题请参考：[不要在遍历时改变Collection的结构](./best-practice#不要在遍历时改变collection的结构)
:::

## Spring如何声明异步接口

### 场景

有一个接口比较耗时，如大量数据导出。希望该接口可以快速返回，而后端导出继续。

### 解决方案

#### 1. 使用`@Async`注解

```java
@Service
public class ExportService {

    @Async
    // 被注解的方法的返回值必须是void或者Future
    public void export() {
    }

    @Async
    public Future<Integer> export1() {
    }

    // 更具体的，选择Future的子类
    @Async
    public ListenableFuture<Integer> export2() {
    }
    @Async
    public CompletableFuture<Integer> export3() {
    }

    // 非法返回类型
    @Async
    public Integer export4() {
    }
}

// 还需要开启Async功能
// 配合@Configuration使用
@EnableAsync
@Configuration
public class AppConfig {}
```

在@EnableAsync注解的注释中有以下说明：

> The mode attribute controls how advice is applied: If the mode is AdviceMode.PROXY (the default), then the other attributes control the behavior of the proxying. **Please note that proxy mode allows for interception of calls through the proxy only; local calls within the same class cannot get intercepted that way**.

AdviceMode可选值为PROXY和ASPECTJ
其中PROXY通过动态代理实现，ASPECTJ通过在编译器修改字节码文件实现。
由于同一类中的调用不会经过动态代理，故PROXY模式下，同一个类中的异步方法调用不会生效。