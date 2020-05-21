<template>
  <el-container class='ManageFood'>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>所有桌面</h3>
        </div>
        <div v-for="(food, index) in foodList" :key="index">
          <h3>{{food.name}}</h3>
          <div :style="cardStyle">
            <div style="overflow:hidden;">
              <img :src="'http://47.96.148.104/upload/' + food.img"  :alt="food.name" :style="imgStyle">
              <div style="margin-left: 500px;">
                <p>描述：{{food.desc}}</p>
                <p>价格：{{food.price}}元</p>
                <p>分类：{{food.category ? food.category : '[暂未分类]'}}</p>
              </div>
            </div>
            <div v-show='btnIdx == index ? true : false'>
              <el-form>
                <el-form-item label="菜名">
                  <el-input v-model='food.name'></el-input>
                </el-form-item>
                <el-form-item label="价格">
                  <el-input v-model='food.price'></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model='food.desc'></el-input>
                </el-form-item>
                <el-form-item label="分类">
                  <el-input v-model='food.category'></el-input>
                </el-form-item>
                <el-form-item label="图片">
                  <input type="file" :file='food.img' @change="imgChange(food,$event)">
                </el-form-item>
                <el-button @click.prevent="save(food)">保存</el-button>
              </el-form>
            </div>
            <div style="position:absolute; right:5px; bottom:5px;">
              <el-button @click="modify(index)">修改</el-button>
              <el-button v-if="food.status == 'on'" @click="takeDown(food)">下架</el-button>
              <el-button v-if="food.status == 'off'" @click="upShelf(food)">上架</el-button>
              <el-button @click="deleteFood(food, index)" type="primary">删除</el-button>
            </div>
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
  name: 'ManageFood',
  async mounted() {
    const { data } = await api.get(`/restaurant/${this.$route.params.rid}/food`);
    this.foodList = data;
  },
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
        position: 'relative',
        marginBottom: '50px',
      },
      btnIdx: -1,
    };
  },
  methods: {
    modify(idx) {
      this.btnIdx = idx;
    },
    imgChange(foodInfo, e) {
      // console.log(foodInfo);
      const img = e.target.files[0];
      // eslint-disable-next-line no-param-reassign
      foodInfo.img = img;
    },
    async save(foodInfo) {
      const fd = new FormData();
      const keys = Object.keys(foodInfo);
      const values = Object.values(foodInfo);
      for (let i = 0; i <= keys.length; i += 1) {
        if (Object.prototype.hasOwnProperty.call(values, i)) {
          fd.append(keys[i], values[i]);
        }
      }
      await api.put(`/restaurant/${this.$route.params.rid}/food/${foodInfo.id}`, fd);
      this.btnIdx = -1;
    },
    async takeDown(foodInfo) {
      // eslint-disable-next-line no-param-reassign
      foodInfo.status = 'off';
      await api.put(`/restaurant/${this.$route.params.rid}/food/${foodInfo.id}`, foodInfo);
    },
    async upShelf(foodInfo) {
      // eslint-disable-next-line no-param-reassign
      foodInfo.status = 'on';
      await api.put(`/restaurant/${this.$route.params.rid}/food/${foodInfo.id}`, foodInfo);
    },
    async deleteFood(foodInfo, idx) {
      // 前端页面删除
      this.foodList.splice(idx, 1);
      // 数据库删除
      await api.delete(`/restaurant/${this.$route.params.rid}/food/${foodInfo.id}`);
    },
  },
};
</script>
