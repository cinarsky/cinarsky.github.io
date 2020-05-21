<template>
  <el-container class="Register"
  style="position:absolute; top:0;left:0;right:0;bottom:0; margin:auto;">
    <el-header >
      <h2 style="width:195px; margin:auto;">登录餐厅管理系统</h2>
    </el-header>
    <el-main>
      <el-form label-width="80px" style="width:400px;">
        <el-form-item label="用户名"><el-input type="text" v-model="name"></el-input></el-form-item>
        <el-form-item label="邮箱"><el-input type="text" v-model="email"></el-input></el-form-item>
        <el-form-item label="密码"><el-input type="text" v-model="password"></el-input></el-form-item>
        <el-form-item label="餐厅名"><el-input type="text" v-model="title"></el-input></el-form-item>
        <el-form-item><el-button @click='register' type="primary">马上注册</el-button></el-form-item>
      </el-form>
    </el-main>
    <el-footer style="width:200px; margin:auto;">
      &copy;简单的点餐管理系统
    </el-footer>
  </el-container>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      password: '',
      email: '',
      title: '',
    };
  },
  methods: {
    async register() {
      if (this.name === '' || this.password === '' || this.email === '' || this.title === '') {
        this.$message('该页面表单内容均为必填项，请务必填写');
        return;
      }
      const { data } = await api.post('http://47.96.148.104/api/register', {
        name: this.name,
        password: this.password,
        email: this.email,
        title: this.title,
      });
      if (data.code === 0) {
        this.$message('注册成功');
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      }
      if (data.code === -1) {
        this.$message('用户名已经被占用');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .Register{
    width:400px;
    margin:0 auto;
  }
</style>
