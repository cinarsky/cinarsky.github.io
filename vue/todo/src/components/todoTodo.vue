<template>
 <div>
  <button @click='showTodo'>todo</button>
{{todo}}
</div>
</template>

<script>
export default {
  props:['todos'],
  computed: {
  todo(){
    return this.todos.filter(it=>it.state==0).length
  },

},
methods: {
  showTodo(){
    this.$emit('showTodo')
  }
},

}
</script>

