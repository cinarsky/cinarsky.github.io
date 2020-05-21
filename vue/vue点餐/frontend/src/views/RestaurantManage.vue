<template>
  <el-container class="RestaurantManage">
    <el-main>
      <el-menu class="manageMenu" :default-active="activeIndex" :router="router"
      mode="horizontal" @select="handleSelect">
      <el-menu-item :index="mainPath">餐厅管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item :index="addFoodPath">添加菜品</el-menu-item>
        <el-menu-item :index="addDeskPath">添加桌面</el-menu-item>
      </el-submenu>
      <el-menu-item :index="ordersPath">
        订单管理
      </el-menu-item>
      <el-menu-item :index="foodPath">
        菜品管理
      </el-menu-item>
      <el-menu-item :index="deskPath">
        桌面管理
      </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </el-main>
    <el-footer id="footer">
      <div id="footer-cart">
        &copy;简单的点餐管理系统
      </div>
    </el-footer>
  </el-container>
</template>

<style lang="scss" rel="text/scss">
  .RestaurantManage{
    width: 1260px;
    margin: auto ;
    padding:0;
  }
  .el-menu--horizontal{
    background-color: lightCyan;
  }
  .el-menu--horizontal>.el-menu-item,
  .el-menu--horizontal>.el-submenu .el-submenu__title,
  .el-menu--horizontal .el-menu .el-menu-item{
    font-size: 20px;
    width:252px;
    padding: 0 85px;
    background-color: lightCyan;
  }
  .el-menu--horizontal .el-menu .el-menu-item,.el-menu--horizontal .el-menu{
    background-color: #fff;
  }
  #footer{
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    width: 1260px;
    background-color: lightCyan;
  }
  main.el-main{
    padding:0;
    margin:0;
  }
  #footer-cart{
    width:200px;
    margin: auto;
  }
</style>

<script>
export default {
  name: 'manage',
  mounted() {
    this.$router.push(this.mainPath);
  },
  data() {
    return {
      router: true,
      userInfo: '',
      mainPath: `/manage/${this.$route.params.rid}/mainpage`,
      ordersPath: `/manage/${this.$route.params.rid}/orders`,
      foodPath: `/manage/${this.$route.params.rid}/food`,
      deskPath: `/manage/${this.$route.params.rid}/desks`,
      addFoodPath: `/manage/${this.$route.params.rid}/add-food`,
      addDeskPath: `/manage/${this.$route.params.rid}/add-desk`,
      activeIndex: `/manage/${this.$route.params.rid}/mainpage`,
    };
  },
  methods: {
    logOut() {
      this.$router.push('/login');
    },
    handleSelect(key) {
      console.log(key);
    },
  },
};
</script>
