<template>
 <div>
<input :class="'a'" @keyup.enter='add' >
</div>
</template>

<script>
export default {

  methods: {
  add(e){
    var newItem=e.target.value.trim()
    if(newItem!=''){
      // 传事件给父级todoinput
      this.$emit('add', {content:newItem,state:0})
    }
    e.target.value=''
  }
}
}
</script>

<style scoped>
.a{
  width: 600px;
}
</style>

