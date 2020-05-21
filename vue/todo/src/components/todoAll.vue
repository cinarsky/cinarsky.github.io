<template>
 <div>
  <button @click="showAll">all</button>
{{all}}
</div>
</template>

<script>
export default {
  props:['todos'],
  computed: {
  all(){
    return this.todos.length
  }
},
methods: {
  showAll(){
    this.$emit('showAll')
  }
},

}
</script>

