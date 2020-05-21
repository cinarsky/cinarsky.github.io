<template>
  <div id="app">

  <TodoInput @add='addItem'></TodoInput>
  <TodoList @delItem='delItem'  @changeState='changeState' :todos='todos' :show='show'></TodoList>
  <TodoFooter @showDone='showDone' @showTodo='showTodo' @showAll='showAll' @delAll='delAll'  :todos='todos'></TodoFooter>

  </div>
</template>

<script>
import TodoInput from './components/todoInput.vue'
import TodoList from './components/todoList.vue'
import TodoFooter from './components/todoFooter.vue'



export default {
  data() {
  return {
    todos:[
       {'content':'吃饭','state':0},
       {'content':'睡觉','state':1},
       {'content':'打豆豆','state':0},
       {'content':'学习','state':0},
     ],
     show:true,
  }
},
methods: {
  addItem(newItem){
      this.todos.push(newItem)
      
    },
    delItem(index){
      this.todos=this.todos.filter((it, idx) => idx != index)
      // console.log(index,this.todos.length)
  },
  changeState(index){
    this.todos[index].state=1-this.todos[index].state
    // console.log(this.todos)
  },
  delAll(){
    this.todos=this.todos.filter((it) => it.state!=1)
  },
  showDone(){
    this.show=1
    
  },
  showTodo(){
    this.show=0
    
  },
  showAll(){
    this.show=true
    
  }
},
  components: {
    TodoInput,
    TodoList,
    TodoFooter,
  }
}
</script>

<style>

</style>
