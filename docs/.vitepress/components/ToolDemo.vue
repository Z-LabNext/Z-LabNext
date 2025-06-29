<script setup>
import { onMounted, reactive, ref } from "vue";
import { Option } from "@zlabnext/ztool";

/* 状态映射 */
const taskStatusMap = new Option({
  dataSource: [
    { label: "待提交", value: "1" },
    { label: "进行中", value: "2" },
    { label: "已完成", value: "3" },
  ],
});

/* 表格数据 */
const dataSource = [
  { taskName: "待办任务a", taskStatus: "1" },
  { taskName: "待办任务b", taskStatus: "2" },
  { taskName: "待办任务c", taskStatus: "3" },
];
const tableData = ref([]);

/* 查询表单逻辑 */
const formRef = ref();
const formData = reactive({});
const onQuery = () => {
  if (!formData.taskStatus) {
    tableData.value = dataSource;
    return;
  }
  tableData.value = dataSource.filter(
    (item) => item.taskStatus === formData.taskStatus
  );
};
const onReset = () => {
  formRef.value?.resetFields();
  onQuery();
};

onMounted(() => {
  onQuery();
});
</script>

<template>
  <el-card shadow="never">
    <el-form :model="formData" inline ref="formRef">
      <el-row :gutter="14">
        <el-col :span="12">
          <el-form-item label="任务状态" prop="taskStatus" style="width: 100%">
            <el-select
              v-model="formData.taskStatus"
              placeholder="请选择任务状态"
              clearable
            >
              <el-option
                v-for="item in taskStatusMap.options"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-alert :closable="false"
      >当前选中对象:
      {{
        taskStatusMap.getItemByValue(formData.taskStatus) || "暂无"
      }}</el-alert
    >
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" :width="60"></el-table-column>
      <el-table-column label="任务名称" property="taskName"></el-table-column>
      <el-table-column label="任务状态" property="taskStatus">
        <template #default="scope">
          <el-tag>{{
            taskStatusMap.getLabelTextByValue(scope.row.taskStatus, true)
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
