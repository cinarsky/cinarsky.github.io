<template>
  <div class="cartStatus">
    <mt-popup
      id="orderCart"
      v-model="popupVisible"
      position="bottom">
      <div>
        <div style="height:30px;">
          <h3 v-show="orderSome"
          style="margin:10px 5px; float:left;">已点菜品</h3>
          <el-button type="primary"
          icon="el-icon-dish"
          v-show="!orderSome"
          style="float:left;"
          @click="popupshrink">
            去点餐
          </el-button>
          <el-button type="primary"
            icon="el-icon-delete-solid"
            style="float:right;"
            :disabled="!orderSome"
            @click="clearOrderCart">
          清空菜单
        </el-button>
        </div>
        <ul style="padding:0;">
          <div id="cartEmpty" v-show="!orderSome" style="height:60px;">
            <p style="width:181px; margin:auto;">
            <i class="el-icon-dish-1"></i>
            您还没有点任何菜品哦
            </p>
          </div>
          <li id="cartList"
          v-for="(foodInfo, index) in orderFoods" :key="index"
          style="padding: 10px 45px;">
            <span>{{foodInfo.name}}</span>
            <span id="changeOrder">
              <i class="el-icon-remove-outline"
                @click="dec(foodInfo)">
              </i>
              {{foodInfo.count}}
              <i class="el-icon-circle-plus"
                @click="inc(foodInfo)">
              </i>
            </span>
          </li>
        </ul>
        <div style="height:30px;">
          <h3 style="float:left; margin:10px 5px;">总价：{{totalPrice}}元</h3>
          <el-button type="success" plain
            icon="el-icon-knife-fork"
            @click="order"
            style="float:right;"
            :disabled="!orderSome">
            下单
          </el-button>
        </div>
      </div>
    </mt-popup>

    <el-button type="primary"
      icon="el-icon-dish" plain
      @click="shoppingCart"
      style="float:right; margin-top:-40px;">
      已选菜单
    </el-button>
    <p style="float:left;padding:5px;">
      总价：{{totalPrice}}元
    </p>
    <el-button type="success"
      icon="el-icon-knife-fork"
      @click="order"
      style="position:absolute; right:3px; bottom:5px;">
      下单
    </el-button>
  </div>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'cartStatus',
  props: ['foodList', 'deskName'],
  data() {
    return {
      popupVisible: false,
      foods: [],
    };
  },
  computed: {
    totalPrice() {
      const total = this.foodList.reduce(
        (acc, foodInfo) => foodInfo.count * foodInfo.price + acc, 0,
      );
      return total;
    },
    orderSome() {
      if (this.orderFoods.length > 0) {
        return true;
      }
      return false;
    },
    orderFoods() {
      return this.foodList.filter(it => it.count > 0);
    },
  },
  methods: {
    shoppingCart() {
      this.popupVisible = !this.popupVisible;
    },
    async order() {
      this.foods = this.orderFoods.map((it) => {
        const obj = {};
        obj.id = it.id;
        obj.amount = it.count;
        return obj;
      });
      const { data } = await api.post(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/order`, {
        deskName: this.deskName,
        totalPrice: this.totalPrice,
        customCount: this.$route.query.customCount,
        foods: this.foods,
      });
      if (data.code === 0) {
        this.$router.push({
          path: `/r/${this.$route.params.rid}/d/${this.$route.params.did}/order-success`,
        });
      }
      await api.delete(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/custom`);
      const roomInfo = {
        rid: this.$route.params.rid,
        did: this.$route.params.did,
      };
      this.$socket.emit('order', roomInfo);
    },
    async inc(data) {
      const foodInfo = data;
      foodInfo.count = data.count + 1;
      const cartFood = {
        fid: foodInfo.id,
        count: foodInfo.count,
      };
      await api.put(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/custom`, cartFood);
      // console.log(data.code);
    },
    async dec(data) {
      if (data.count > 0) {
        const foodInfo = data;
        foodInfo.count = data.count - 1;
        const cartFood = {
          fid: foodInfo.id,
          count: foodInfo.count,
        };
        await api.put(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/custom`, cartFood);
      } else {
        this.$indicator.open({
          text: '不能再减少了哟',
          spinnerType: 'double-bounce',
        });
        setTimeout(() => this.$indicator.close(), 500);
      }
    },
    popupshrink() {
      this.popupVisible = false;
    },
    clearOrderCart() {
      this.foodList.forEach((it) => {
        const foodInfo = it;
        foodInfo.count = 0;
      });
    },
  },
  sockets: {
    // eslint-disable-next-line func-names
    'submit order': function (order) {
      this.$router.push({
        path: `/r/${this.$route.params.rid}/d/${this.$route.params.did}/order-success`,
        query: {
          orderInfo: order,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .cartStatus{
    position: fixed;
    height: 50px;
    bottom: 5px;
    margin: -5px;
    left: 5px;
    right: 5px;
    background-color: #26A2FF;
  }
  #orderCart{
    width:100%;
  }
  #cartList{
    list-style-type: none;
    box-shadow: 0 1px 0 1px gray;
  }
  #changeOrder{
    float: right;
  }
</style>
