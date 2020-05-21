<template>
  <div class="home">
    item1
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  methods: {
    selectSinger(singer){
  this.$router.push({
    path:`/singer/${singer.id}`
  })
  }
  },
  data() {
    return {

    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
