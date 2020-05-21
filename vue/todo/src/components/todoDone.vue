<template>
 <div>
  <button @click='showDone'>done</button>
{{done}}
</div>
</template>

<script>
export default {
  props:['todos'],
  computed: {
  done(){
    return this.todos.filter(it=>it.state==1).length
  },
},
methods: {
  showDone(){
    this.$emit('showDone')
  }
},

}
</script>
