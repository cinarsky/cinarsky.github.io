<template>
  <div class="Item1">
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
     <el-table-column
      prop="id"
      label="id"
      width="">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="departs"
      label="部门">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="描述">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: "Item1",
  props: {},
   data() {
      return {
        tableData: []
      }
    },
  methods: {
    
  },
    created() {
    this.axios.get('/login').then((data)=>{
      window.console.log(data.data,this.tableData)
      this.tableData=[data.data]
    })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
