<template>
  <el-container class="OrderManage">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>所有订单</h3>
        </div>
        <div v-for="(orderInfo, index) in orderList" :key="index" style="listStyle: none;">
          <div :style="orderStyle">
            <el-form>
              <el-form-item> <h3>总价 :{{orderInfo.totalPrice}}</h3> </el-form-item>
              <el-form-item> <h3>人数 :{{orderInfo.customCount}}</h3> </el-form-item>
              <el-form-item> <h3>状态 :{{orderInfo.status}}</h3> </el-form-item>
            </el-form>
            <el-button @click="print(orderInfo)">打印</el-button>
            <el-button @click="confirm(orderInfo)">确认</el-button>
            <el-button @click="complete(orderInfo)">完成</el-button>
            <el-button @click="deleteOrder(orderInfo)">删除</el-button>
            <el-button type="primary" @click="orderDetails(orderInfo)">订单详情</el-button>
          </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import api from '../assets/api';

export default {
  name: 'OrderManage',
  async mounted() {
    this.$socket.emit('select room', this.$route.params.rid);
    const { data } = await api.get(`/restaurant/${this.$route.params.rid}/order`);
    // console.log(data);
    this.orderList = data;
  },
  data() {
    return {
      orderList: [],
      orderStyle: {
        border: '2px solid',
        margin: '20px',
        padding: '20px',
      },
    };
  },
  methods: {
    print(orderInfo) {
      console.log('print', orderInfo.status);
    },
    confirm(orderInfo) {
      const newOrderInfo = orderInfo;
      newOrderInfo.status = 'confirmed';
      api.put(`restaurant/${orderInfo.rid}/order/${orderInfo.id}`, newOrderInfo);
    },
    complete(orderInfo) {
      const newOrderInfo = orderInfo;
      newOrderInfo.status = 'completed';
      api.put(`restaurant/${orderInfo.rid}/order/${orderInfo.id}`, newOrderInfo);
    },
    deleteOrder(orderInfo) {
      const deleteOrder = orderInfo;
      api.delete(`restaurant/${orderInfo.rid}/order/${orderInfo.id}`, deleteOrder);
    },
    async orderDetails(orderInfo) {
      await api.post(`r/${this.$route.params.rid}/o/${orderInfo.id}`, orderInfo);
      this.$router.push(`order/${orderInfo.id}`);
    },
  },
  sockets: {
    connect() {
      console.log('连接成功');
    },
    // eslint-disable-next-line func-names
    'new order': function (data) {
      const newOrderList = this.orderList;
      console.log('添加订单事件');
      newOrderList.unshift(data);
    },
    // eslint-disable-next-line func-names
    'change order': function (changedOrderList) {
      console.log('修改订单事件');
      this.orderList = changedOrderList;
    },
  },
};
</script>
