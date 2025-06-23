# 表格合并计算

轻松应对复杂表格数据的合并、拆分、统计与导出需求。表格合并计算包支持多维表头、跨列/行合并、动态数据绑定等高级功能，适用于报表系统、数据分析平台等场景，帮助你快速构建企业级数据视图。

<script setup>
  import RowMerge from '@/.vitepress/components/RowMerge'
  import ColMerge from '@/.vitepress/components/ColMerge'
</script>

## 安装依赖

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
