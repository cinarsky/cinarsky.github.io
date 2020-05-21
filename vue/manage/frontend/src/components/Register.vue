<template>
  <div class="hello">
   <el-form ref='loginForm' :model="loginForm" :rules="rules"  label-width="80px" >
  <el-form-item label="用户名" prop="name">
    <el-input v-model="loginForm.name"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="pass">
    <el-input v-model="loginForm.pass"></el-input>
  </el-form-item>
    <el-form-item label="年龄" prop="age">
    <el-input v-model="loginForm.age"></el-input>
  </el-form-item>
    <el-form-item label="部门" prop="departs">
    <el-input v-model="loginForm.departs"></el-input>
  </el-form-item>
    <el-form-item label="性别" prop="sex">
    <el-input v-model="loginForm.sex"></el-input>
  </el-form-item>
    <el-form-item label="简述" prop="desc">
    <el-input v-model="loginForm.desc"></el-input>
  </el-form-item>
    <el-button @click="reg">注册</el-button>
    <el-button @click.native="resetLoginForm">重置</el-button>
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
    reg(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          // window.console.log(this)
          this.axios.post('/create',this.loginForm).then((data)=>{
            window.console.log(data)
            if(data.data.code==200){
              this.$message.success(data.data.msg);
              this.$router.push('/login')
            }
            else{
               this.$message.error(data.data.msg);
            }
          })
        }
      })
    }
  },
  data() {
    return {
      loginForm: {
        name: "aaa",
        pass: "123",
        departs:'业务部',
        age:'25',
        sex:'男',
        desc:'天盛员工',
      },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           pass: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
           departs: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
           age: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
           sex: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
        }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
