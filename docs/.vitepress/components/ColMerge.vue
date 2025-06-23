<script setup>
import { getMergedData, Mode, getFieldSpan } from "@zlabnext/ztool";

const columns = [
  { prop: "name", label: "姓名" },
  { prop: "jobNumber", label: "工号" },
  { prop: "residential", label: "居住地址" },
  { prop: "register", label: "户籍地址" },
  { prop: "date", label: "注册日期" },
];
const dataSource = [
  {
    id: 1,
    name: "张三丰",
    jobNumber: "A001",
    residential: "湖北",
    register: "湖北",
    date: "2025-02-21",
  },
  {
    id: 2,
    name: "张无忌",
    jobNumber: "A002",
    residential: "湖北",
    register: "北京",
    date: "2025-02-21",
  },
  {
    id: 3,
    name: "赵敏",
    jobNumber: "A003",
    residential: "北京",
    register: "北京",
    date: "2025-02-21",
  },
  {
    id: 4,
    name: "赵敏",
    jobNumber: "A004",
    residential: "上海",
    register: "北京",
    date: "2025-02-21",
  },
  {
    id: 5,
    name: "周芷若",
    jobNumber: "A005",
    residential: "四川",
    register: "江苏",
    date: "2025-02-21",
  },
  {
    id: 6,
    name: "张三",
    jobNumber: "A006",
    residential: "上海",
    register: "北京",
    date: "2025-02-21",
  },
];
const options = {
  mode: Mode.Col, // 合并列模式
  dataSource,
  columns,
  mergeFields: columns.map((item) => item.prop), // 必须传入全部列的prop
};
// 这里是计算完毕后的数据，赋值给表格即可
const mergedData = getMergedData(options);
// 处理合并的函数
const spanMethod = ({ row, column, columnIndex }) => {
  if (columnIndex === 0) {
    return { rowspan: 1, colspan: 1 };
  }
  return getFieldSpan(row, column.property);
};
</script>

<template>
  <el-table :data="mergedData" :span-method="spanMethod" border>
    <el-table-column label="姓名" property="name"></el-table-column>
    <el-table-column label="工号" property="jobNumber"></el-table-column>
    <el-table-column label="居住地址" property="residential"></el-table-column>
    <el-table-column label="户籍地址" property="register"></el-table-column>
    <el-table-column label="注册日期" property="date"></el-table-column>
  </el-table>
</template>
