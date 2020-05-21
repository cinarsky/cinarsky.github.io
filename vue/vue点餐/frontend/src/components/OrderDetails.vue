<template>
  <el-container id="orderDetails">
    <el-header>
      <el-page-header @back="goBack" title="返回" content="订单详情页面"
      style="backgroundColor:lightblue;">
      </el-page-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>订单详情</h3>
          <h4>{{orderInfo.id}}号订单：</h4>
          <h4>{{orderInfo.deskName}}</h4>
        </div>
        <div>
          <h3>点餐单：</h3>
          <div v-for="(foodInfo, index) in orderFoods" :key="index">
            {{foodInfo.id}}号菜品：{{foodInfo.amount}}个
          </div>
          <h3>总价格： {{orderInfo.totalPrice}}</h3>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import api from '../assets/api';

export default {
  name: 'OrderDetails',
  async mounted() {
    const orderInfo = (await api.get(`r/${this.$route.params.rid}/o/${this.$route.params.oid}`)).data;
    this.orderInfo = orderInfo;
    // console.log(this.orderInfo);
  },
  data() {
    return {
      orderInfo: {},
    };
  },
  computed: {
    orderFoods() {
      return this.orderInfo.details;
    },
  },
  methods: {
    goBack() {
      this.$router.push('/manage/1/orders');
    },
  },
};
</script>
