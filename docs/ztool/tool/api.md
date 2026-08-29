# API

> 以下所有函数均可从 `@zlabnext/ztool` 中按需导入：
>
> ```js
> import { Option, replaceEmpty } from "@zlabnext/ztool";
> ```

## 公共下拉选项

维护下拉选项数据，同时提供 label/value 的双向映射查询。

### 语法

`new Option(params)`

#### params

| 字段    | 类型     | 默认 | 必填 | 描述     |
| ------- | -------- | ---- | ---- | -------- |
| options | `Object` | -    | 是   | 配置对象 |

#### params 属性

| 字段       | 类型       | 默认 | 必填 | 描述         |
| ---------- | ---------- | ---- | ---- | ------------ |
| dataSource | `Object[]` | -    | 是   | 数据源       |
| fieldsName | `Object`   | -    | 否   | 选项字段配置 |

#### fieldsName 属性

| 字段  | 类型     | 默认    | 必填 | 描述           |
| ----- | -------- | ------- | ---- | -------------- |
| label | `string` | 'label' | 否   | label 取值字段 |
| value | `string` | 'value' | 否   | value 取值字段 |

### 实例属性

| 名称      | 类型       | 描述                            |
| --------- | ---------- | ------------------------------- |
| options   | `Object[]` | 下拉选项（一般用于下拉筛选项）  |
| dataSource | `Object[]` | 数据源                          |
| labelMap  | `Object`   | label 映射为选项的对象          |
| valueMap  | `Object`   | value 映射为选项的对象          |

### 方法

| 名称                                             | 参数                          | 返回       | 描述                               |
| ------------------------------------------------ | ----------------------------- | ---------- | ---------------------------------- |
| update                                           | [params](#params)             | -          | 传入新配置对象，更新下拉选项       |
| ~~getLabel~~ <Badge type="danger" text="弃用" /> | `GetLabelOptions`             | -          | 获取 label                         |
| getItemByValue                                   | `string\|number`              | `Object \| undefined` | 根据 value 来获取对应的下拉选项    |
| getItemByLabel                                   | `string\|number`              | `Object \| undefined` | 根据 label 来获取对应的下拉选项    |
| getLabelTextByValue                              | [见下方说明](#getlabeltextbyvalue) | `string` | 根据 value 来获取对应的 label 文本 |

#### getLabelTextByValue

按位置传参：`getLabelTextByValue(value, allowReplaceEmpty?, replaceStr?)`

| 参数              | 类型             | 默认  | 描述                         |
| ----------------- | ---------------- | ----- | ---------------------------- |
| value             | `string\|number` | -     | 目标值                       |
| allowReplaceEmpty | `boolean`        | false | 是否将空值替换为指定的字符串 |
| replaceStr        | `string`         | `--`  | 用于替换空值的字符串         |

### 示例代码

```js
import { Option } from "@zlabnext/ztool";

const dataSource = [
  {
    label: "关闭",
    value: 0,
  },
  {
    label: "开启",
    value: 1,
  },
  {
    label: "暂停",
    value: 2,
  },
];

/* 1.初始数据 */
const option = new Option({
  dataSource,
});
// 下拉选项 (一般用于下拉筛选项)
// option.options
// 名称映射对象 (value映射为label)
// option.labelMap

/* 2.更新数据 */
// 添加一个对象
dataSource.push({
  label: "其他",
  value: 3,
});
option.update({ dataSource });
// 清空
option.update({ dataSource: [] });
```

## 字符串处理

### 空值替换

#### 语法

`replaceEmpty(value, replaceStr)`

#### 参数

| 字段       | 类型      | 默认 | 描述       |
| ---------- | --------- | ---- | ---------- |
| value      | `unknown` | -    | 原始值     |
| replaceStr | `string`  | `--` | 空值占位符 |

#### 示例代码

```js
import { replaceEmpty } from "@zlabnext/ztool";

console.log(replaceEmpty(null)); // --
console.log(replaceEmpty(undefined)); // --
console.log(replaceEmpty("")); // --
console.log(replaceEmpty("你好")); // 你好
console.log(replaceEmpty(true)); // true
console.log(replaceEmpty(false)); // false
```

### 格式化地址字符串

#### 语法

`fmtAddressStr(options)`

#### 参数

| 字段                | 类型       | 必填 | 默认 | 描述                             |
| ------------------- | ---------- | ---- | ---- | -------------------------------- |
| options.addressStr  | `string`   | 是   | -    | 原始地址字符串                   |
| options.needSplit   | `boolean`  | 否   | true | 是否需要分隔                     |
| options.splitFlag   | `string`   | 否   | `,`  | 分隔符                           |
| options.needJoin    | `boolean`  | 否   | true | 是否需要拼接                     |
| options.joinFlag    | `string`   | 否   | `,`  | 拼接符                           |
| options.extraStrArr | `string[]` | 否   | `[]` | 额外的字符串数组(例如，详情地址) |

#### 示例代码

```js
import { fmtAddressStr } from "@zlabnext/ztool";

const result = fmtAddressStr({
  addressStr: "山东省,青岛市,崂山区",
  needSplit: true,
  needJoin: true,
  extraStrArr: ["xx街道xx号"],
  joinFlag: "",
});

console.log(result); // 山东省青岛市崂山区xx街道xx号
```

### 数组转字符串

#### 语法

`arrToStr(arr, joinFlag, defaultValue)`

#### 参数

| 字段         | 类型      | 必填 | 默认 | 描述                                 |
| ------------ | --------- | ---- | ---- | ------------------------------------ |
| arr          | `unknown[]` | 是   | -    | 原始数组                             |
| joinFlag     | `string`  | 否   | `,`  | 拼接符                               |
| defaultValue | `string`  | 否   | `''` | 当 arr 不是数组时，返回的默认值      |

#### 示例代码

```js
import { arrToStr } from "@zlabnext/ztool";

const result1 = arrToStr(["1", "2", "3"]);
console.log(result1); // 1,2,3

const result2 = arrToStr(["1", "2", "3"], "");
console.log(result2); // 123
```

### 字符串转数组

#### 语法

`strToArr(str, splitFlag, defaultValue)`

#### 参数

| 字段         | 类型        | 必填 | 默认 | 描述                                          |
| ------------ | ----------- | ---- | ---- | --------------------------------------------- |
| str          | `string`    | 是   | -    | 原始字符串                                    |
| splitFlag    | `string`    | 否   | `,`  | 分隔符                                        |
| defaultValue | `unknown[]` | 否   | `[]` | 当 str 为空字符串或非字符串时，返回的默认值   |

#### 示例代码

```js
import { strToArr } from "@zlabnext/ztool";

const result1 = strToArr("1,2,3");
console.log(result1); // ['1', '2', '3']

const result2 = strToArr("1,2,3", "");
console.log(result2); // ['123']
```

## 数组处理

### 数组转 JSON 字符串

#### 语法

`arrayTojson(arr)`

#### 参数

| 字段 | 类型        | 必填 | 描述     |
| ---- | ----------- | ---- | -------- |
| arr  | `unknown[]` | 是   | 原始数组 |

#### 示例代码

```js
import { arrayTojson } from "@zlabnext/ztool";

console.log(arrayTojson([{ id: 1 }])); // '[{"id":1}]'
console.log(arrayTojson("abc")); // 'abc' (非数组时原样返回，并打印警告)
```

### JSON 字符串转数组

#### 语法

`jsonToArray(jsonStr)`

#### 参数

| 字段    | 类型     | 必填 | 描述              |
| ------- | -------- | ---- | ----------------- |
| jsonStr | `string` | 是   | 数组形式的 JSON 字符串 |

> [!NOTE]
> 仅当字符串以 `[` 开头、`]` 结尾时才会解析，否则返回 `[]` 并打印警告。

#### 示例代码

```js
import { jsonToArray } from "@zlabnext/ztool";

console.log(jsonToArray('[{"id":1}]')); // [{ id: 1 }]
console.log(jsonToArray('{"id":1}')); // [] (非法的数组字符串)
```

## 文件处理

### 下载文件 v2

根据文件 url 或文件流(ArrayBuffer) 下载文件。

#### 语法

`downloadFileV2(params)`

#### params 属性

| 字段             | 类型                   | 默认  | 必填 | 描述                                                     |
| ---------------- | ---------------------- | ----- | ---- | -------------------------------------------------------- |
| type             | `string`               | `url` | 是   | 数据类型 (`'url'`、`'arrayBuffer'`)                      |
| dataSource       | `string / ArrayBuffer` | -     | 是   | 文件 url 或 arrayBuffer                                  |
| filename         | `string`               | -     | 否   | 文件名称 (未开启 autoPickFilename 时必填)                |
| autoPickFilename | `boolean`              | false | 否   | 自动从 url 或 content-disposition 中提取文件名           |
| disposition      | `string`               | -     | 否   | 响应头 content-disposition (type 为 arrayBuffer 时使用)  |

#### 示例代码

```js
import { downloadFileV2 } from "@zlabnext/ztool";

/* 根据文件流进行下载，文件流一般从接口返回(例如excel导出) */
// const str = '大道泛兮，其可左右。';
// const encoder = new TextEncoder();
// const encodedData = encoder.encode(str);
// const buffer = new ArrayBuffer(encodedData.byteLength);
// const uint8Array = new Uint8Array(buffer);
// uint8Array.set(encodedData);
// downloadFileV2({
//   type: 'arrayBuffer',
//   filename: 'example.txt',
//   dataSource: buffer,
// })

/* 根据url进行下载 */
const url = "./demo.png"; // 或者提供一个附件资源地址
const filename = "test.png";
downloadFileV2({
  type: "url",
  filename,
  dataSource: url,
});

/* 自动从url中提取文件名 (demo.png) */
downloadFileV2({ type: "url", dataSource: url, autoPickFilename: true });

/* 根据响应头自动提取文件名 */
downloadFileV2({
  type: "arrayBuffer",
  dataSource: buffer,
  autoPickFilename: true,
  disposition: 'attachment; filename="example.txt"',
});
```

> [!NOTE]
>
> - 当采用 "url" 方式时，如果是非同源地址，会导致无法下载文件 ( 例如，只打开一个新标签页展示 )
> - 建议用接口获取文件流，然后采用 "arrayBuffer" 方式下载
> - 如果是附件服务的资源地址，则正常下载 ( 前提，附件服务器已配置允许下载 )
> - 如果 web 应用地址是 http 协议，则下载时浏览器会提示是否阻止下载 ( 浏览器的安全策略 )，将资源配置为 https 协议即可。

### 下载文件流 (ArrayBuffer)

#### 语法

`downloadArrayBuffer(stream, filename)`

#### 参数

| 字段     | 类型          | 必填 | 描述               |
| -------- | ------------- | ---- | ------------------ |
| stream   | `ArrayBuffer` | 是   | 文件流             |
| filename | `string`      | 是   | 下载的文件名称     |

#### 示例代码

```js
import { downloadArrayBuffer } from "@zlabnext/ztool";

downloadArrayBuffer(buffer, "example.txt");
```

### 下载文件 (url)

#### 语法

`downloadUrl(url, filename)`

#### 参数

| 字段     | 类型     | 必填 | 描述           |
| -------- | -------- | ---- | -------------- |
| url      | `string` | 是   | 文件链接       |
| filename | `string` | 是   | 下载的文件名称 |

#### 示例代码

```js
import { downloadUrl } from "@zlabnext/ztool";

downloadUrl("./demo.png", "test.png");
```

### ~~下载文件~~ <Badge type="danger" text="弃用" />

> [!NOTE]
>
> 请使用 [下载文件 v2](#下载文件v2)

### ~~旧版下载文件~~ <Badge type="danger" text="弃用" />

旧版下载方案已废弃，请使用 [下载文件 v2](#下载文件v2)，或使用 [FileSaver.js](https://github.com/eligrey/FileSaver.js)

### 图片转 webp 格式

#### 语法

`convert2Webp(file, quality)`

#### 参数

| 字段    | 类型           | 默认  | 描述           |
| ------- | -------------- | ----- | -------------- |
| file    | `File \| Blob` | -     | 文件对象       |
| quality | `number`       | `0.8` | 压缩率 `(0~1)` |

#### 示例代码

```js
import { convert2Webp, downloadArrayBuffer } from "@zlabnext/ztool";

// file是文件对象，convert2Webp 返回 Promise
const webpBlob = await convert2Webp(file, 0.6);
// 下载转换后的Webp图片
downloadArrayBuffer(webpBlob, "example.webp");
```

### 根据 url 获取文件名及后缀

#### 语法

`getFilenameFromUrl(url)`

#### 参数

| 字段 | 类型     | 默认 | 描述     |
| ---- | -------- | ---- | -------- |
| url  | `string` | -    | 文件链接 |

#### 示例代码

```js
import { getFilenameFromUrl } from "@zlabnext/ztool";

const url = "https://www.baidu.com/abc.jpg";

getFilenameFromUrl(url); // abc.jpg
```

### 根据 content-disposition 获取文件名及后缀

#### 语法

`getFilenameFromDisposition(contentDisposition, decode, decodeCallback)`

#### 参数

| 字段               | 类型       | 默认                 | 描述         |
| ------------------ | ---------- | -------------------- | ------------ |
| contentDisposition | `string`   | -                    | 响应头内容   |
| decode             | `boolean`  | `true`               | 是否解码     |
| decodeCallback     | `function` | `decodeURIComponent` | 解码回调函数 |

#### 示例代码

```js
import { getFilenameFromDisposition } from "@zlabnext/ztool";

// 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename="example.txt"'));
// 'example.txt'
console.log(getFilenameFromDisposition("attachment; filename=example.txt"));
// '中文.txt'
console.log(
  getFilenameFromDisposition(
    "attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt"
  )
);
// undefined
console.log(getFilenameFromDisposition("attachment"));
// undefined
console.log(getFilenameFromDisposition(null));
```

## 颜色处理

### 生成随机色值

#### 语法

`getRandomColor(options)`

#### options 属性

| 字段       | 类型      | 默认  | 描述           |
| ---------- | --------- | ----- | -------------- |
| type       | `string`  | -     | 色值类型 (`'rgb'`、`'hex'`) |
| lightColor | `boolean` | false | 是否包含浅色   |

#### 示例代码

```js
import { getRandomColor } from "@zlabnext/ztool";

console.log(getRandomColor({ type: "rgb" })); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomColor({ type: "hex" })); // 获取一个随机的hex色值，例：#000000
```

### ~~随机 rgb 色值~~ <Badge type="danger" text="弃用" />

请使用 [生成随机色值](#生成随机色值)

#### 示例代码

```js
import { getRandomRgb } from "@zlabnext/ztool";

console.log(getRandomRgb()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
```

### ~~随机 hex 色值~~ <Badge type="danger" text="弃用" />

请使用 [生成随机色值](#生成随机色值)

#### 示例代码

```js
import { getRandomHex } from "@zlabnext/ztool";

console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

## 日期区间处理

### 拆分日期区间

一般用来提交给后端。

#### 语法

`splitDateRange(options)`

#### 参数

| 字段                  | 类型             | 必填 | 默认      | 描述               |
| --------------------- | ---------------- | ---- | --------- | ------------------ |
| options.dateRange     | `string[]`       | 是   | -         | 日期区间           |
| options.outStartField | `string`         | 否   | startDate | 输出的开始日期字段 |
| options.outEndField   | `string`         | 否   | endDate   | 输出的结束日期字段 |
| options.defaultValue  | `string \| null` | 否   | null      | 默认值             |

> [!NOTE]
> 当 dateRange 不是长度为 2 的数组时，返回 `{ [outStartField]: defaultValue, [outEndField]: defaultValue }`

#### 示例代码

```js
import { splitDateRange } from "@zlabnext/ztool";

const result = splitDateRange({
  dateRange: ["2024-11-13", "2024-11-14"],
});

console.log(result); // { startDate: '2024-11-13', endDate: '2024-11-14' }
```

### 组合日期区间

一般用来给前端回显。

#### 语法

`combineDateRange(options)`

#### 参数

| 字段         | 类型                             | 必填 | 默认      | 描述               |
| ------------ | -------------------------------- | ---- | --------- | ------------------ |
| obj          | `Record<string, string \| null>` | 是   | -         | 对象参数           |
| inStartField | `string`                         | 否   | startDate | 输入的开始日期字段 |
| inEndField   | `string`                         | 否   | endDate   | 输入的结束日期字段 |

> [!NOTE]
> 当开始日期或结束日期为空 ( `null`、`undefined` ) 时，返回 `[]`

#### 示例代码

```js
import { combineDateRange } from "@zlabnext/ztool";

const result = combineDateRange({
  obj: { startDate: "2024-11-13", endDate: "2024-11-14" },
});

console.log(result); // ['2024-11-13', '2024-11-14']
```

## 接口错误捕获器

统一处理接口的成功/失败分支。

### 语法

`errorTrap(params)`

#### params 属性

| 字段            | 类型                         | 必填 | 默认               | 描述             |
| --------------- | ---------------------------- | ---- | ------------------ | ---------------- |
| code            | `string\|number`             | 是   | -                  | 接口返回标识     |
| message         | `string`                     | 是   | -                  | 接口返回信息     |
| successCode     | `string\|number`             | 否   | 全局配置           | 接口成功标识     |
| successCallback | `(code, message) => unknown` | 否   | 全局配置           | 接口返回成功回调 |
| errorCode       | `string\|number`             | 否   | 全局配置           | 接口失败标识     |
| errorCallback   | `(code, message) => unknown` | 否   | 全局配置           | 接口返回失败回调 |

> [!NOTE]
>
> - 返回值：有错误返回 `true`，无错误返回 `false`
> - 当 code 既不等于 errorCode 也不等于 successCode 时，会抛出异常

### 设置全局配置

`setErrorTrapGlobalConfig(globalConfig)` 的参数可包含 `successCode`、`successCallback`、`errorCode`、`errorCallback` 中的任意组合（同 `errorTrap` 的同名参数）。

### 示例代码

```js
import { setErrorTrapGlobalConfig, errorTrap } from "@zlabnext/ztool";

// 设置全局参数
setErrorTrapGlobalConfig({
  // 0代表成功
  successCode: 0,
  // 成功后的回调函数
  successCallback: (code, message) => {
    // 这里可以调用提示框
    console.log(`successCallback ${code} ${message}`);
  },
  // 1代表失败
  errorCode: 1,
  errorCallback: (code, message) => {
    // 这里可以调用提示框
    console.log(`errorCallback ${code} ${message}`);
  },
});

/**
 * 创建用户
 */
const createUser = async () => {
  // ...省略逻辑
  const res = await request(params);
  const { code, msg } = res.data;
  // 执行错误捕获
  const hasErr = errorTrap({ code, message: msg });
  if (hasErr) {
    console.error("创建用户失败");
    return;
  }
  console.log("创建用户成功");
};
```

## 分页处理

### 计算页码 ( 删除数据后 )

#### 语法

`calcPageAfterDelete(page, pageSize, total)`

#### 参数

| 字段     | 类型     | 必填 | 默认 | 描述     |
| -------- | -------- | ---- | ---- | -------- |
| page     | `number` | 是   | -    | 当前页码 |
| pageSize | `number` | 是   | -    | 每页条数 |
| total    | `number` | 是   | -    | 总条数   |

> [!NOTE]
>
> - 当 total <= 0 时，返回第一页 ( 1 )
> - 当当前页码超过总页数时，返回最后一页

#### 示例代码

```js
import { calcPageAfterDelete } from "@zlabnext/ztool";

const pageProps = {
  page: 2,
  pageSize: 15,
  total: 15,
};

// 模拟删除一条数据
pageProps.total -= 1;

// 重新计算页码
pageProps.page = calcPageAfterDelete(
  pageProps.page,
  pageProps.pageSize,
  pageProps.total
);

// 这里会输出: 1
console.log(pageProps.page);
```

## 内置常量

以下常量可直接导入，用于与内置默认值保持一致：

| 名称               | 值                              | 描述                         |
| ------------------ | ------------------------------- | ---------------------------- |
| DefaultReplaceStr  | `'--'`                          | `replaceEmpty` 默认的空值占位符 |
| DefaultSplitStr    | `','`                           | 字符串处理默认的分隔/拼接符  |
| DefaultFieldsName  | `{ label: 'label', value: 'value' }` | `Option` 默认的字段名配置 |

```js
import { DefaultReplaceStr } from "@zlabnext/ztool";
```
