<template>
  <el-container class='Forget'
    style="position:absolute; top:0;left:0;right:0;bottom:0; margin:auto;">
    <el-header >
      <h2 style="width:195px; margin:auto;">登录餐厅管理系统</h2>
    </el-header>
    <el-main>
      <el-form label-width="150px" style="width:800px; margin:50px auto;vertical-align:baseline;">
        <el-form-item label="请输入验证邮箱：" >
          <el-input v-model="email" style="width:455px;"></el-input>
          <el-button @click="forget" style="margin:20px;" type="primary">发送验证邮件</el-button>
        </el-form-item>
      </el-form>
      <p v-show="fakeEmail" style="width:510px; margin:auto;">假装这是您已经看到邮件了，这是修改密码的网址：
        <a @click="changestatus" :href="changePath">修改密码请点击我</a>
      </p>
    </el-main>
    <el-footer style="width:200px; margin:50px auto;">
      &copy;简单的点餐管理系统
    </el-footer>
  </el-container>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'Forget',
  data() {
    return {
      email: '',
      feedback: '',
      fakeEmail: false,
      changePath: '',
    };
  },
  methods: {
    async forget() {
      const { data } = await api.post('/forget', {
        email: this.email,
      });
      // console.log(data);
      if (data.code === -1) {
        this.feedback = '没有此用户邮箱，请确认后重新填写';
      } else {
        this.feedback = '邮件将保持20分钟时效，请尽快查看';
        this.fakeEmail = true;
        this.changePath = data.path;
      }
      this.$message(this.feedback);
    },
    changestatus() {
      this.fakeEmail = false;
    },
  },
};
</script>
