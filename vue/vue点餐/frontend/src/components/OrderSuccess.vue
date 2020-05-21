<template>
<div class="order-success">
  <mt-header fixed title="无人点餐系统">
    <router-link :to="foodCart" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
  <h2 style="margin-top:50px;">下单成功</h2>
  <div style="border:2px solid; margin:5px; border-radius:0.5em; padding:20px;">
    <h3>本订单信息：</h3>
      <p>桌号：{{latestOrder.deskName}}</p>
      <p>人数：{{latestOrder.customCount}}人</p>
      <p>总价格：{{latestOrder.totalPrice}}元</p>
  </div>
  <el-button type="primary" @click="toFoodCart" style="margin:10px;">继续点餐</el-button>
  <el-collapse v-model="activeNames" @change="getHistoryOrders">
    <el-collapse-item title="正在进行的订单" name="1">
      <div>
        <ul style="list-style:none; padding:0;">
          <li v-for="(historyOrder, index) in historyOrders" :key="index"
          style="border:2px solid; margin:15px; border-radius:0.5em; padding:5px;">
            <h3>订单{{index + 1}}</h3>
            <p>人数：{{historyOrder.customCount}}人</p>
            <p>订单状态: {{historyOrder.status}}</p>
            <p>订单价格：{{historyOrder.totalPrice}}元</p>
            <p>下单时间：
              {{new Date(+new Date(historyOrder.timestamp)+ 8 * 3600 * 1000)
              .toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}
            </p>
          </li>
        </ul>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'OrderSuccess',
  async mounted() {
    this.$socket.emit('select room', this.$route.params.rid);
    const latestOrder = (await api.get(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/order-success`)).data;
    this.latestOrder = latestOrder;
    const foodCart = `/r/${this.$route.params.rid}/d/${this.$route.params.did}?customCount=${latestOrder.customCount}`;
    this.foodCart = foodCart;
  },
  data() {
    return {
      foodCart: '',
      historyOrders: [],
      activeNames: ['0'],
      latestOrder: {},
    };
  },
  methods: {
    async getHistoryOrders() {
      const historyOrders = (await api.get(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/order`)).data;
      this.historyOrders = historyOrders;
    },
    toFoodCart() {
      this.$router.push(this.foodCart);
    },
  },
  sockets: {
    connect() {
      console.log('连接成功order-succes');
    },
    // eslint-disable-next-line func-names
    'change order': function (changedList) {
      // console.log(this);
      this.historyOrders = changedList;
    },
    // eslint-disable-next-line func-names
    'new order': function (data) {
      const newOrderList = this.historyOrders;
      newOrderList.unshift(data);
    },
  },
};
</script>
