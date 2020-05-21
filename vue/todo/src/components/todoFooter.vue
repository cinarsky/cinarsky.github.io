<template>
 <div>
    <TodoAll :todos='todos' @showAll='showAll' ></TodoAll>
    <TodoTodo :todos='todos'  @showTodo='showTodo'></TodoTodo>
    <TodoDone @showDone='showDone'   :todos='todos'></TodoDone>
    <button @click='delAll'>删除全部已完成</button>
</div>
</template>

<script>
import TodoAll from './todoAll'
import TodoTodo from './todoTodo'
import TodoDone from './todoDone.vue'
export default {

  props:['todos'],
  methods: {
  delAll(){
    this.$emit('delAll')
  },
  showDone(){
    this.$emit('showDone')
  },
  showTodo(){
    this.$emit('showTodo')
  },
  showAll(){
    this.$emit('showAll')
  }
},
components: {
    TodoAll ,
TodoTodo,
TodoDone,
  }

}
</script>
