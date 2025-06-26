# API

## 公共下拉选项

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

### 方法

| 名称                                             | 参数                                                           | 返回     | 描述                               |
| ------------------------------------------------ | -------------------------------------------------------------- | -------- | ---------------------------------- |
| update                                           | [params](#params)                                              | -        | 新配置对象                         |
| ~~getLabel~~ <Badge type="danger" text="弃用" /> | `GetLabelOptions`                                              | -        | 获取 label                         |
| getItemByValue                                   | `string\|number`                                               | `Object` | 根据 value 来获取对应的下拉选项    |
| getItemByLabel                                   | `string\|number`                                               | `Object` | 根据 label 来获取对应的下拉选项    |
| getLabelTextByValue                              | [`GetLabelTextByValueParams`](#getlabeltextbyvalueparams-属性) | `string` | 根据 value 来获取对应的 label 文本 |

#### GetLabelTextByValueParams 属性

| 字段              | 类型             | 默认  | 必填 | 描述                         |
| ----------------- | ---------------- | ----- | ---- | ---------------------------- |
| value             | `string\|number` | -     | 是   | -                            |
| allowReplaceEmpty | `boolean`        | false | 否   | 是否将空值替换为指定的字符串 |
| replaceStr        | `string`         | `--`  | 否   | 用于替换空值的字符串         |

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

## 空值替换

### 语法

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

## ~~下载文件~~ <Badge type="danger" text="弃用" />

> [!NOTE]
>
> 请使用 [下载文件 v2](#下载文件v2)

## 下载文件 v2

### 语法

`downloadFileV2(params)`

#### params

| 字段   | 类型     | 默认 | 必填 | 描述     |
| ------ | -------- | ---- | ---- | -------- |
| params | `Object` | -    | 是   | 配置参数 |

#### params 属性

| 字段       | 类型                   | 默认 | 必填 | 描述                                  |
| ---------- | ---------------------- | ---- | ---- | ------------------------------------- |
| type       | `string`               | -    | 是   | 数据类型 (` 'url'`、`'arrayBuffer' `) |
| dataSource | `string / ArrayBuffer` | -    | 是   | 文件 url 或 arrayBuffer               |
| filename   | `string`               | -    | 否   | 文件名称                              |

### 示例代码

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
```

> [!NOTE]
>
> - 当采用 “url” 方式时，如果是非同源地址，会导致无法下载文件 ( 例如，只打开一个新标签页展示 )
> - 建议用接口获取文件流，然后采用 “arrayBuffer” 方式下载
> - 如果是附件服务的资源地址，则正常下载 ( 前提，附件服务器已配置允许下载 )
> - 如果 web 应用地址是 http 协议，则下载时浏览器会提示是否阻止下载 ( 浏览器的安全策略 )，将资源配置为 https 协议即可。

## 随机 rgb 色值

### 示例代码

```js
import { getRandomRgb } from "@zlabnext/ztool";

console.log(getRandomRgb()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
```

## 随机 hex 色值

### 示例代码

```js
import { getRandomHex } from "@zlabnext/ztool";

console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

## 随机 rgb/hex 色值

### 示例代码

```js
import { getRandomColor } from "@zlabnext/ztool";

console.log(getRandomColor({ type: "rgb" })); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomColor({ type: "hex" })); // 获取一个随机的hex色值，例：#000000
```

## 图片转 webp 格式

### 语法

`convert2Webp(file, quality)`

#### 参数

| 字段    | 类型           | 默认 | 描述           |
| ------- | -------------- | ---- | -------------- |
| file    | `File \| Blob` | -    | 文件对象       |
| quality | `number`       | -    | 压缩率 `(0~1)` |

#### 示例代码

```js
import { convert2Webp, downloadArrayBuffer } from "@zlabnext/ztool";

// file是文件对象
const webpBlob = convert2Webp(file, 0.6);
// 下载转换后的Webp图片
downloadArrayBuffer(webpBlob, "example.webp");
```

## 根据 url 获取文件名及后缀

### 语法

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

## 根据 content-disposition 获取文件名及后缀

### 语法

`getFilenameFromDisposition(contentDispotition, decode, decodeCallback)`

#### 参数

| 字段               | 类型       | 默认                 | 描述         |
| ------------------ | ---------- | -------------------- | ------------ |
| contentDispotition | `string`   | -                    | 响应头内容   |
| decode             | `boolean`  | `true`               | 是否解码     |
| decodeCallback     | `function` | `decodeURIComponent` | 解码回调函数 |

### 示例代码

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
// null
console.log(getFilenameFromDisposition("attachment"));
// null
console.log(getFilenameFromDisposition(null));
```

## ~~浏览器兼容性提示~~ <Badge type="danger" text="废弃" />

> [!NOTE]
>
> 推荐使用 [bowser](https://github.com/bowser-js/bowser?tab=readme-ov-file)

## 拆分日期区间

一般用来提交给后端

### 语法

`splitDateRange(options)`

#### 参数

| 字段                  | 类型             | 必填 | 默认      | 描述               |
| --------------------- | ---------------- | ---- | --------- | ------------------ |
| options.dateRange     | `string[]`       | 是   | -         | 日期区间           |
| options.outStartField | `string`         | 否   | startDate | 输出的开始日期字段 |
| options.outEndField   | `string`         | 否   | endDate   | 输出的结束日期字段 |
| options.defaultValue  | `string \| null` | 否   | null      | 默认值             |

### 示例代码

```js
import { splitDateRange } from "@zlabnext/ztool";

const result = splitDateRange({
  dateRange: ["2024-11-13", "2024-11-14"],
});

console.log(result); // { startDate: '2024-11-13', endDate: '2024-11-14' }
```

## 组合日期区间

一般用来给前端回显。

### 语法

`combineDateRange(options)`

#### 参数

| 字段         | 类型                             | 必填 | 默认      | 描述               |
| ------------ | -------------------------------- | ---- | --------- | ------------------ |
| obj          | `Record<string, string \| null>` | 是   | -         | 对象参数           |
| inStartField | `string`                         | 否   | startDate | 输入的开始日期字段 |
| inEndField   | `string`                         | 否   | endDate   | 输入的结束日期字段 |

### 示例代码

```js
import { combineDateRange } from "@zlabnext/ztool";

const result = combineDateRange({
  obj: { startDate: "2024-11-13", endDate: "2024-11-14" },
});

console.log(result); // ['2024-11-13', '2024-11-14']
```

## 格式化地址字符串

### 语法

`fmtAddressStr(options)`

#### 参数

| 字段                | 类型       | 必填 | 默认 | 描述                             |
| ------------------- | ---------- | ---- | ---- | -------------------------------- |
| options.addressStr  | `string`   | 是   | -    | 原始地址字符串                   |
| options.needSplit   | `boolean`  | 否   | true | 是否需要分隔                     |
| options.splitFlag   | `boolean`  | 否   | true | 分隔符                           |
| options.needJoin    | `boolean`  | 否   | true | 是否需要拼接                     |
| options.joinFlag    | `string`   | 否   | ,    | 拼接符                           |
| options.extraStrArr | `string[]` | 否   |      | 额外的字符串数组(例如，详情地址) |

### 示例代码

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

## 数组转字符串

### 语法

`arrToStr(str, joinFlag)`

#### 参数

| 字段     | 类型     | 必填 | 默认 | 描述       |
| -------- | -------- | ---- | ---- | ---------- |
| str      | `string` | 是   | -    | 原始字符串 |
| joinFlag | `string` | 否   | ,    | 拼接符     |

### 示例代码

```js
import { arrToStr } from "@zlabnext/ztool";

const result1 = arrToStr(["1", "2", "3"]);
console.log(result1); // 1,2,3

const result2 = arrToStr(["1", "2", "3"], "");
console.log(result2); // 123
```

## 字符串转数组

### 语法

`strToArr(str, splitFlag)`

#### 参数

| 字段      | 类型     | 必填 | 默认 | 描述       |
| --------- | -------- | ---- | ---- | ---------- |
| str       | `string` | 是   | -    | 原始字符串 |
| splitFlag | `string` | 否   | ,    | 拼接符     |

### 示例代码

```js
import { strToArr } from "@zlabnext/ztool";

const result1 = strToArr("1,2,3");
console.log(result1); // ['1', '2', '3']

const result2 = strToArr("1,2,3", "");
console.log(result2); // ['123']
```

## 接口错误捕获器

### 语法

`errorTrap(params)`

#### params 属性

| 字段            | 类型                         | 必填 | 默认 | 描述             |
| --------------- | ---------------------------- | ---- | ---- | ---------------- |
| code            | `string\|number`             | 是   | -    | 接口返回标识     |
| message         | `string`                     | 是   | -    | 接口返回信息     |
| successCode     | `string\|number`             | 否   | -    | 接口成功标识     |
| successCallback | `(code, message) => unknown` | 否   | -    | 接口返回成功回调 |
| errorCode       | `string\|number`             | 否   | -    | 接口失败标识     |
| errorCallback   | `(code, message) => unknown` | 否   | -    | 接口返回失败回调 |

### 实例代码

```js
import { setErrorTrapGlobalConfig, errorTrap } from "@zlabnext/ztool";

// 设置全局参数
setErrorTrapGlobalConfig({
  // 0代表成功
  successCode: 0,
  // 成功后的回调函数
  successCallback: (code: number, message: string) => {
    // 这里可以调用提示框
    console.log(`successCallback ${code} ${message}`);
  },
  // 1代表失败
  errorCode: 1,
  errorCallback: (code: number, message: string) => {
    // 这里可以调用提示框
    console.log(`errorCallback ${code} ${message}`);
  },
});

/**
 * 创建用户
 */
const createUser = () => {
  // ...省略逻辑
  const res = request(params);
  const { code, msg } = res.data;
  // 执行错误捕获
  const hasErr = errorTrap({ code, message });
  if (hasErr) {
    console.error("创建用户失败");
    return;
  }
  console.log("创建用户成功");
};
```
