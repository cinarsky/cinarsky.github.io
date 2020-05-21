<template>
  <div class="home">
    <el-container class="home">
      <el-header>
        天盛EIP系统
        <div class="button">
          <el-button @click="logout">退出</el-button>
        </div>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <!-- 侧边栏导航 -->
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>

          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            router
          >
          <el-menu-item index="/home/mine">
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>


            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">流程中心</span>
              </template>

              <el-menu-item-group title="分组2">
                <el-menu-item index="1-1">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-2">
                <span slot="title">选项4</span>
                <el-menu-item index="1-2-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>


           <el-menu-item index="/home/done">
              <i class="el-icon-menu"></i>
              <span slot="title">已处理流程</span>
            </el-menu-item>
             <el-menu-item index="/home/todo">
              <i class="el-icon-menu"></i>
              <span slot="title">未处理流程</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  methods: {
    logout() {
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
        window.console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        window.console.log(key, keyPath);
      },
  },
  data() {
    return {
      isCollapse: false
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.home {
  height: 100%;
  box-sizing: border-box;
  .el-header {
    background: rgb(143, 143, 143);
     &::after {
        content: "";
        height: 100%;
        vertical-align: middle;
        display: inline-block;
      }
    .button {
      float: right;
      height: 100%;
      &::after {
        content: "";
        height: 100%;
        vertical-align: middle;
        display: inline-block;
      }
      .el-button {
        vertical-align: middle;
      }
    }
  }
  .el-aside {
    background: rgb(185, 185, 185);
  }
  .el-main {
    background: rgb(231, 231, 231);
  }
}
</style>
