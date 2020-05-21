<template>
    <el-container class="AddFood">
      <el-header><h3>添加新菜品</h3></el-header>
      <el-main>
        <el-form label-width="80px" style="width:400px;">
          <el-form-item label="菜名"><el-input v-model="foodInfo.name"></el-input></el-form-item>
          <el-form-item label="描述"><el-input  v-model="foodInfo.desc"></el-input></el-form-item>
          <el-form-item label="价格"><el-input  v-model="foodInfo.price"></el-input></el-form-item>
          <el-form-item label="分类"><el-input  v-model="foodInfo.category"></el-input></el-form-item>
          <el-form-item label="状态"><el-input  v-model="foodInfo.status"></el-input></el-form-item>
          <el-form-item label="图片">
            <input type="file" name="img" :ref="foodInfo.img" @change="imgChange($event)">
            <!-- <el-upload
              class="addFoodImg"
              drag
              action=""
              :ref="foodInfo.img" @change="imgChange($event)">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
          </el-form-item><br>
          <el-button @click="add" type="primary" style="margin:20px;">确认添加菜品</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form>
      </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
  .AddFood{
    width:1260px;
    margin:auto;
  }
</style>

<script>
import api from '../assets/api';

export default {
  name: 'AddFood',
  data() {
    return {
      foodInfo: {
        name: '',
        desc: '',
        price: '',
        category: '',
        status: 'on',
        img: null,
      },
      feedback: '',
      uploadPath: `http://47.96.148.104/api/manage/${this.$route.params.rid}/add-food`,
    };
  },
  methods: {
    async add() {
      // 使用formdata传文件
      const fd = new FormData();
      // ESlint不允许用for..in
      // for (const key in this.foodInfo) {
      //   if (Object.prototype.hasOwnProperty.call(this.foodInfo, key)) {
      //     const val = this.foodInfo.key;
      //     fd.append(key, val);
      //   }
      // }
      // 下面这是ESlint推荐for..in方法
      const keys = Object.keys(this.foodInfo);
      const values = Object.values(this.foodInfo);

      for (let i = 0; i <= keys.length; i += 1) {
        if (Object.prototype.hasOwnProperty.call(values, i)) {
          fd.append(keys[i], values[i]);
        }
      }
      const { data } = await api.post(`/restaurant/${this.$route.params.rid}/food`, fd);
      if (data) {
        this.$message('添加菜品成功');
        return;
      }
      this.$message('添加失败，请检查填写信息');
    },
    imgChange(e) {
      // eslint-disable-next-line prefer-destructuring
      this.foodInfo.img = e.target.files[0];
    },
    cancel() {
      this.foodInfo = {
        name: '',
        desc: '',
        price: '',
        category: '',
        status: 'on',
        img: null,
      };
    },
  },
};
</script>
