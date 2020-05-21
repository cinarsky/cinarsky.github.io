<template>
  <div class="LandingPage">
      <mt-header fixed title="无人点餐系统">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    <mt-cell :title="restaurantName" :value="deskName" style="margin-top: 40px;">
    </mt-cell>
    <h2>请选择人数</h2>
   <ul>
      <li v-for="index in 6" :key="index" :class="{active:selNum==index}" @click="changeIdx(index)">
        <el-button plain type="primary">{{index}}</el-button>
      </li>
   </ul>
   <div class="page-actionsheet-wrapper">
      <button class="mint-button mint-button--primary mint-button--large" @click="actionSheet">
       开始点餐
      </button>
   </div>
   <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
   </mt-actionsheet>
  </div>
</template>

<script>
import api from '../assets/api';

export default {
  name: 'LandingPage',
  async mounted() {
    const { data } = await api.get(`deskinfo?rid=${this.$route.params.rid}&did=${this.$route.params.did}`);
    this.title = data.title;
    this.name = data.name;
    const customInfo = (await api.get(`/landing/r/${this.$route.params.rid}/d/${this.$route.params.did}/custom`)).data;
    console.log(customInfo);
    if (customInfo.code === 1) {
      this.$router.push(`/r/${this.$route.params.rid}/d/${this.$route.params.did}?customCount=${customInfo.msg}`);
    }
  },
  data() {
    return {
      selNum: 0,
      title: '',
      name: '',
      actions: [{
        name: '确定',
        method: this.startOrder,
      }],
      cancelText: '取消',
      sheetVisible: false,
    };
  },
  methods: {
    actionSheet() {
      if (this.selNum === 0) {
        this.$messagebox.alert('请先选择就餐人数哦', '温馨提示');
      } else {
        this.sheetVisible = true;
      }
    },
    changeIdx(num) {
      this.selNum = num;
    },
    startOrder() {
      const { rid } = this.$route.params;
      const { did } = this.$route.params;
      this.$router.push(`/r/${rid}/d/${did}?customCount=${this.selNum}`);
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
};
</script>

<style lang="css">
.LandingPage ul{
  padding:0;
  margin:0;
  list-style: none;
  overflow: hidden;
}

.LandingPage>ul>li{
  margin:5px;
  float:left;
  padding: 0;
}
</style>
