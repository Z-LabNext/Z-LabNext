# 快速上手

轻松应对复杂表格数据的合并、拆分、统计与导出需求。表格合并计算包支持跨行/跨列合并、自定义合并逻辑、自动生成序号等功能，适用于报表系统、数据分析平台等场景，帮助你快速构建企业级数据视图。

<script setup>
  import RowMerge from '@/.vitepress/components/RowMerge'
  import ColMerge from '@/.vitepress/components/ColMerge'
</script>

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

```js
import { CellMerger, Mode } from "@zlabnext/ztool";
```

完整配置项请查阅 [API](./api)。

## 合并 "行"

**效果展示**

::: raw

<RowMerge />

:::

**代码示例**

<<< @/.vitepress/components/RowMerge.vue

## 合并 "列"

**效果展示**

::: raw

<ColMerge />

:::

**示例代码**

<<< @/.vitepress/components/ColMerge.vue
