<template>
<div>
    <!-- v-if='ifshow(item)'  -->
    <TodoItem  
   @delItem='delItem' 
   @changeState='changeState'
   v-for='(item,index) of todos' 
  
   :item='item' 
   :key='item'
   :index='index'></TodoItem> 
</div>
</template>

<script>

import TodoItem from './todoItem.vue'
export default {
  props:['todos','show'],
  methods: {
  delItem(index){
    this.$emit('delItem',index)
  },
  changeState(index){
    this.$emit('changeState',index)
  },
  ifshow(item){
   if(this.show===true){
     return true
   }
   else {
     return item.state==this.show
   }
  }
},
components: {
    TodoItem,
  }
}
</script>

