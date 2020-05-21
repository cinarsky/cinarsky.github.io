<template>
  <el-container class="Login"
  style="position:absolute; top:0;left:0;right:0;bottom:0; margin:auto;">
    <el-header >
    <h2 style="width:195px; margin:auto;">登录餐厅管理系统</h2>
    </el-header>
    <el-main>
      <el-form label-width="80px" style="width:400px;">
        <el-form-item label="用户名">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input type="text" v-model="captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <img :src="imgPath"
          alt="captcha"
          @click="refresh($event.target)">不区分大小写
        </el-form-item>
        <div style="margin:40px;">
        <el-button @click="login" type="primary" :plain="true">登录</el-button>
        <el-button @click="toRegister" >注册</el-button>
        <el-button @click="toForget" >忘记密码</el-button>
        </div>
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
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      feedback: '',
      captcha: '',
      title: '',
    };
  },
  computed: {
    num() {
      return Math.random().toString().slice(2, 8);
    },
    imgPath() {
      return `http://47.96.148.104/api/captcha?captchaid=${this.num}`;
    },
  },
  methods: {
    async login() {
      const { data } = await api.post('/login', {
        name: this.name,
        password: this.password,
        captcha: this.captcha,
      });
      if (data.code === 0) {
        this.$router.push(`/manage/${data.user.id}`);
        return;
      }
      if (data.code === -1) {
        this.feedback = '验证码错误';
      }
      if (data.code === -2) {
        this.feedback = '用户名或密码错误';
      }
      this.$message(this.feedback);
    },
    toForget() {
      this.$router.push('/forget');
    },
    toRegister() {
      this.$router.push('/register');
    },
    refresh(target) {
      const el = target;
      const num = Math.random().toString().slice(2, 8);
      const newUrl = `http://47.96.148.104/api/captcha?captchaid=${num}`;
      el.src = newUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
  .Login{
    width:400px;
    margin:0 auto;
  }
</style>
