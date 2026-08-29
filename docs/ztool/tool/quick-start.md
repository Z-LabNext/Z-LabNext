# 快速上手

ztool 是一个轻量、高效的前端工具库，提供了一系列经过实战验证的业务工具函数 —— 从数据格式化、类型判断到接口错误捕获，覆盖前端开发高频场景。开箱即用，无需额外配置。

## 安装

::: code-group

```bash [npm]
npm install @zlabnext/ztool
```

```bash [yarn]
yarn add @zlabnext/ztool
```

```bash [pnpm]
pnpm add @zlabnext/ztool
```

:::

> [!NOTE]
> ztool 依赖 [lodash-es](https://www.npmjs.com/package/lodash-es)（peerDependency），请确保项目中已安装：
>
> ```bash
> npm install lodash-es
> ```

## 引入方式

支持按需导入，配合 ESM 构建工具可实现 tree-shaking：

```js
import { Option, replaceEmpty } from "@zlabnext/ztool";
```

## 功能概览

| 分类         | 包含的函数                                                         |
| ------------ | ------------------------------------------------------------------ |
| 公共下拉选项 | `Option`                                                           |
| 字符串处理   | `replaceEmpty`、`fmtAddressStr`、`arrToStr`、`strToArr`            |
| 数组处理     | `arrayTojson`、`jsonToArray`                                       |
| 文件处理     | `downloadFileV2`、`convert2Webp`、`getFilenameFromUrl` 等          |
| 颜色处理     | `getRandomColor`                                                   |
| 日期区间     | `splitDateRange`、`combineDateRange`                               |
| 接口错误捕获 | `errorTrap`、`setErrorTrapGlobalConfig`                            |
| 分页处理     | `calcPageAfterDelete`                                              |

完整说明请查阅 [API](./api)。

## 代码示例

使用 [公共下拉选项](./api#公共下拉选项) 来维护任务状态：

::: raw

<ToolDemo />

:::

<<< @/.vitepress/components/ToolDemo.vue
