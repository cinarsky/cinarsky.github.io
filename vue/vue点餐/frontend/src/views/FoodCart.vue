<template>
<div class="foodCart" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%;">
  <mt-header fixed title="无人点餐系统">
  </mt-header>
  <mt-cell :title="restaurantName" :value="deskName" style="margin-top: 40px;">
  </mt-cell>
  <ul style="margin:55px; padding:0;">
    <li v-for="(foodInfo, index) in foodList" :key="index" :name="foodInfo.name" :style="liStyle">
      <h3>{{foodInfo.name}}</h3>
      <div :style="cardStyle">
        <img :alt="foodInfo.name" v-lazy="'http://47.96.148.104/upload/' + foodInfo.img"><br>
        <p>价格：{{foodInfo.price}}元</p>
        <p>{{foodInfo.desc}}</p>
          <i class="el-icon-remove-outline" @click="dec(foodInfo)" @funcDec="dec"></i>
          <span>{{foodInfo.count}}</span>
          <i class="el-icon-circle-plus" @click="inc(foodInfo)" @funcInc="inc"></i>
      </div>
    </li>
  </ul>
    <cartStatus
     :foodList="foodList"
     :deskName="deskName"/>
</div>
</template>

<script>
import api from '../assets/api';
import cartStatus from '../components/cartStatus.vue';

export default {
  async mounted() {
    const roomInfo = {
      rid: this.$route.params.rid,
      did: this.$route.params.did,
      customCount: this.$route.query.customCount,
    };
    this.$socket.emit('customer room', roomInfo);
    const foodList = (await api.get(`/restaurant/${this.$route.params.rid}/food`)).data;
    console.log(foodList);
    const deskInfo = (await api.get(`/deskinfo?rid=${this.$route.params.rid}&did=${this.$route.params.did}`)).data;
    this.name = deskInfo.name;
    this.title = deskInfo.title;
    if (deskInfo && foodList) {
      this.loading = false;
    }
    const initData = (await api.get(`/restaurant/${this.$route.params.rid}/desk/${this.$route.params.did}/temporder`)).data;
    console.log(initData);
    if (typeof (initData) === 'object') {
      foodList.map((item) => {
        const initFid = initData.map(it => it.fid);
        const foodInfo = item;
        const index = initFid.indexOf(foodInfo.id);
        if (index >= 0) {
          foodInfo.count = initData[index].count;
        } else {
          foodInfo.count = 0;
        }
        return foodInfo;
      });
    } else {
      foodList.map((item) => {
        const foodInfo = item;
        foodInfo.count = 0;
        return foodInfo;
      });
    }
    console.log(foodList);
    this.foodList = foodList;
  },
  name: 'FoodCart',
  data() {
    return {
      foodList: [],
      imgStyle: {
        float: 'left',
        width: '100px',
        height: '100px',
        border: '1px solid',
      },
      cardStyle: {
        border: '2px solid',
        padding: '5px',
        overflow: 'hidden',
      },
      liStyle: {
        listStyleType: 'none',
      },
      name: '',
      title: '',
      loading: true,
      orderFoods: [],
    };
  },
  methods: {
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
    clearOrderFoods() {
      this.orderFoods = [];
    },
  },
  computed: {
    restaurantName() {
      return `欢迎光临，${this.title}`;
    },
    deskName() {
      return `${this.name}桌`;
    },
  },
  components: {
    cartStatus,
  },
  sockets: {
    // eslint-disable-next-line func-names
    'change order': function (cartFood) {
      this.foodList.forEach((data) => {
        if (data.id === cartFood.fid) {
          console.log('change');
          const foodInfo = data;
          foodInfo.count = cartFood.count;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  img[lazy=loading]{
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: gray;
  }
  ul li img{
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid;
  }
</style>
