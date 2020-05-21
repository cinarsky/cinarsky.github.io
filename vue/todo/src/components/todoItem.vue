<template>
<div>
    <input class="a" type="checkbox" :checked='item.state' @click='changeState'>
    <input type="text" :value='item.content'>
    <button @click='delItem'> - </button>
    {{a}}
</div>
</template>

<script>
export default {
 props:['item','index'],
 data() {
   return {
     a:'checkbox'
   }
 },
 methods: {
  delItem(){
    this.$emit('delItem',this.index)
    // console.log(this.index)
  },
  changeState(){
    this.$emit('changeState',this.index)
  }
},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
