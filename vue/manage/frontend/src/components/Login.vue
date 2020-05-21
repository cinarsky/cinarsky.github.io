<template>
  <div class="hello">
   <el-form ref='loginForm' :model="loginForm" :rules="rules"  label-width="80px" >
  <el-form-item label="用户名" prop="name">
    <el-input v-model="loginForm.name"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="pass">
    <el-input v-model="loginForm.pass"></el-input>
  </el-form-item>
    <el-button @click="login">登录</el-button>
    <el-button @click.native="resetLoginForm">重置</el-button>
     <el-button @click.native="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {},
  methods: {
    resetLoginForm(){
      this.$refs.loginForm.resetFields()
      //  this.$message.error('错了哦，这是一条错误消息');
    },
    login(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          window.console.log(this)
          this.axios.post('/login',this.loginForm).then((data)=>{
            window.console.log(data)
            if(data.data.code==200){
              this.$message.success(data.data.msg);
              this.$router.push('/home')
            }else{
              this.$message.error(data.data.msg);
            }
          })
        }
      })
    },
    register(){
        this.$router.push('/register')
    }
  },
  data() {
    return {
      loginForm: {
        name: "abc",
        pass: "123"
      },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
