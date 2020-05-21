import React from 'react';
import { connect } from 'react-redux';


function TodoFooter(props){
        return (
            <div className='todofooter'>
            <div>{props.all}<button onClick={props.showAll}>showAll</button></div>
            <div>{props.showtodo()}<button onClick={props.showTodo}>showTodo</button></div>
            <div>{props.showdone()}<button onClick={props.showDone}>showDone</button></div>
            </div>
          )
}
export default connect(state => {
    return {
      todos: state.todos,
      all:state.todos.length,
      showtodo:()=>{
        return state.todos.filter(it=>it.state===0).length
      },
      showdone:()=>{
        return state.todos.filter(it=>it.state===1).length
      }
    }
  }, dispatch => {
    return {
      showAll:()=>{dispatch({ type: 'SHOW_ALL',  })},
      showTodo:()=>{dispatch({ type: 'SHOW_TODO',  })},
      showDone:()=>{dispatch({ type: 'SHOW_DONE',  })},
      
    }
  })(TodoFooter)
  