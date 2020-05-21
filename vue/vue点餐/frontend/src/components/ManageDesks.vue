<template>
  <el-container class="ManageDesk" style="margin-bottom:50px;">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>所有菜品</h3>
        </div>
        <div v-for="(deskInfo, index) in deskLists" :key="index"
        :style="cardStyle">
          <el-form style="position:absolute; left:10px; bottom:5px;">
            <el-form-item> <h3>桌号 : {{deskInfo.name}}</h3></el-form-item>
            <el-form-item> <h3>纳客量 : {{deskInfo.capacity}}</h3></el-form-item>
            <el-button @click="deleteDesk(deskInfo)" style='margin: 0 10px;'>删除此桌面</el-button>
            <div v-show="deskInfo.id == modifingId ? true : false"
            style="position:absolute; left:500px; bottom:5px; width:200px;">
          <el-form>
            <el-form-item label="修改桌子属性">
              <el-input v-model="deskInfo.name" placeholder="请输入要更改的桌名"></el-input>
            </el-form-item>
            <el-form-item label="请修改桌子容纳量">
              <i class="el-icon-remove-outline" @click="dec(deskInfo)"></i>
                <span>{{deskInfo.capacity}}</span>
              <i class="el-icon-circle-plus" @click="inc(deskInfo)"></i>
            </el-form-item>
            <el-button @click="changeDesk(deskInfo)" type="primary">确认修改</el-button>
          </el-form>
          </div>
          <el-button @click="modify(deskInfo)" type='primary' style='margin:0 10px;'
          v-show="!(deskInfo.id == modifingId ? true : false)">
            修改桌面信息
          </el-button>
        </el-form>
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
  name: 'ManageDesk',
  async mounted() {
    this.$socket.emit('select room', this.$route.params.rid);
    const deskLists = (await api.get(`/restaurant/${this.$route.params.rid}/desks`)).data;
    this.deskLists = deskLists;
  },
  data() {
    return {
      deskLists: [],
      modifingId: -1,
      cardStyle: {
        border: '2px solid',
        padding: '5px',
        position: 'relative',
        marginBottom: '50px',
        height: '210px',
      },
    };
  },
  methods: {
    async changeDesk(deskInfo) {
      await api.put(`/restaurant/${this.$route.params.rid}/desk/${deskInfo.id}`, deskInfo);
      this.modifingId = -1;
    },
    dec(deskInfo) {
      // eslint-disable-next-line no-param-reassign
      deskInfo.capacity -= 1;
    },
    inc(deskInfo) {
      // eslint-disable-next-line no-param-reassign
      deskInfo.capacity += 1;
    },
    async deleteDesk(deskInfo) {
      const { data } = await api.delete(`/restaurant/${this.$route.params.rid}/desk/${deskInfo.id}`);
      if (data.code === 0) {
        this.deskLists = this.deskLists.filter(it => it.id !== deskInfo.id);
      }
    },
    addDeskCart() {
      this.addDeskStatus = true;
    },
    modify(deskInfo) {
      this.modifingId = deskInfo.id;
    },
  },
  sockets: {
    // eslint-disable-next-line func-names
    'change desk': function (deskLists) {
      this.deskLists = deskLists;
    },
    // eslint-disable-next-line func-names
    'add desk': function (latestDesk) {
      this.deskLists.push(latestDesk);
    },
  },
};
</script>
