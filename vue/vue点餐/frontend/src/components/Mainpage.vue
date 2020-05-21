<template>
  <el-container class="MainPage">
    <el-header>
      <h3>欢迎进入，{{userInfo.title}}</h3>
    </el-header>
    <el-main style="margin:20px 50px;">
      <h3>功能模块介绍：</h3>
       <el-tabs :tab-position="tabPosition" style="height: 200px;font-size:20px;">
        <el-tab-pane label="我的工作台">
          <p>该部分用于添加菜品、桌面，</p>
          <p>添加完成后可在菜品/桌面管理里面查看详情和管理。</p>
        </el-tab-pane>
        <el-tab-pane label="订单管理">
          <p>该部分用于管理订单，</p>
          <p>修改订单状态，可在单一订单中查看订单详情。</p>
        </el-tab-pane>
        <el-tab-pane label="菜品管理">
          <p>该部分用于管理菜品，</p>
          <p>上架/下架菜品，</p>
          <p>修改菜品图片，</p>
          <p>修改菜品名称/类别/分类或者删除菜品</p>
        </el-tab-pane>
        <el-tab-pane label="桌面管理">
          <p>该部分用于管理桌面，</p>
          <p>修改桌面信息，</p>
          <p>修改名称/纳客量</p>
        </el-tab-pane>
        <el-tab-pane label="我要登出">
          <p>退出到登录页面</p>
          <el-button @click="logout" style="margin-top:90px;margin-left:25px;">登出</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import api from '../assets/api';

export default {
  name: 'MainPage',
  async mounted() {
    const userInfo = (await api.get('/userinfo')).data;
    this.userInfo = userInfo;
  },
  data() {
    return {
      userInfo: {},
      tabPosition: 'left',
    };
  },
  methods: {
    async logout() {
      const { data } = await api.get('/logout');
      if (data.code === 0) {
        this.$router.push('/login');
      } else {
        this.$message('登出失败');
      }
    },
  },
};
</script>
