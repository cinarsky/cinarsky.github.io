<template>
  <el-container class="AddDesk">
    <el-header><h3>添加新桌面</h3></el-header>
    <el-main>
      <el-form label-width="80px" style="width:400px;">
        <el-form-item label="桌名"><el-input v-model="deskName"></el-input></el-form-item>
        <el-form-item label="纳客量"><el-input  v-model="capacity"></el-input></el-form-item>
        <el-button @click="addDesk" type="primary" style="margin:20px;">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>

</style>

<script>
import api from '../assets/api';

export default {
  name: 'addDesk',
  data() {
    return {
      deskName: '',
      capacity: 1,
    };
  },
  methods: {
    async addDesk() {
      const addDeskInfo = {
        name: this.deskName,
        capacity: this.capacity,
      };
      await api.post(`/restaurant/${this.$route.params.rid}/desks`, addDeskInfo);
      this.$message('添加桌面成功');
      this.deskName = '';
    },
    cancel() {
      this.deskName = '';
    },
  },
};
</script>
