<template>
  <el-container class="change-password"
  style="position:absolute; top:0;left:0;right:0;bottom:0; margin:auto;">
    <el-header>
      <h2 style="width:195px; margin:auto;">登录餐厅管理系统</h2>
    </el-header>
    <el-main>
      <el-form label-width="160px" style="width:760px;margin:auto;">
        <el-form-item label="请在此重置密码">
          <el-input v-model="changePassword"></el-input>
          <el-button @click="change" type="primary"
          style="margin:20px 200px;width:100px;">
            修改密码
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer style="width:200px; margin:50px auto;">
      &copy;简单的点餐管理系统
    </el-footer>
  </el-container>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'changePassword',
  data() {
    return {
      changePassword: '',
      feedback: '',
    };
  },
  methods: {
    async change() {
      const { data } = await api.post(`change-password/${this.$route.params.token}`, {
        password: this.changePassword,
      });
      if (data.code === 0) {
        this.feedback = '密码修改成功，3S后返回';
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } else {
        this.feedback = '链接已经失效，请重新发送邮件';
        setTimeout(() => {
          this.$router.push('/forget');
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
