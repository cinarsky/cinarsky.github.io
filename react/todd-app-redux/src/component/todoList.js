import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './todoItem';

function TodoList(props){
        return (
            <div className='todolist'>
              {props.todos.map((todo, idx) => {
                 if(props.show===true){
                   return <TodoItem key={todo.content} todo={todo} idx={idx} />
                 }
                 if(props.show===todo.state){
                  return <TodoItem key={todo.content} todo={todo} idx={idx} />
                }
              })}
            </div>
          )
}
export default connect(state => {
    return {
      show:state.show,
      todos: state.todos
    }
  }, dispatch => {
    return {}
  })(TodoList)
  