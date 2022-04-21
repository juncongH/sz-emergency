<template>
  <div>
    <div style="height: 5vh;color: white; font-size: 24px;padding:5px 0 0 5px;">医疗资源</div>
    <div style="height: 39vh">
      <el-table
        height="95%"
        style="width: 100%"
        :data="info"
        :header-cell-style="{
          color: '#0A7187',
          borderColor: '#0A7187',
          backgroundColor: '#0A1D31',
        }"
        :cell-style="{
          width: '100%',
          fontSize: '10px',
          color: '#0A7187',
          borderColor: '#0A7187',
          backgroundColor: '#0A1D31',
        }"
        size="mini"
      >
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="rank" label="级别" width="50"> </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      region: "深圳市",
      info: [],
      currentPage: 1,
      pageSize: 4,
    };
  },
  mounted() {
    this.initData();
    this.getData();
  },
  methods: {
    initData() {
      axios.get("/data/hospital.json").then((res) => {
        this.info = res.data;
      });
    },
    getData() {
      this.$bus.on("region", (data) => {
        this.info = [];
        axios.get("/data/hospital.json").then((res) => {
          for (var i in res.data) {
            if (res.data[i].region == data) {
              this.info.push(res.data[i]);
            }
          }
        });
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style>
.el-table--border,
.el-table--group {
  border-color: #0a7187 !important;
}


body .el-table::before {
  z-index: inherit;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #0a1d31;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #0a7187;
  border-radius: 4px;
  height: 50px;
}
 .el-table__body-wrapper{
     background-color: #0a1d31;
 }
 .el-table__header-wrapper{
     background-color: #0a1d31;
 }


</style>