import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import TodoInput from './component/todoInput';
import TodoList from './component/todoList';
import TodoFooter from './component/todoFooter';
// import  './app.scss';
// redux 三大原则
// 1、单一数据源
// 2、State 是只读的
// 3、使用纯函数来修改state
function App() {
    return (
      <div className='app'>
        <div>TODOS</div>
      <Provider store={store}>
        <TodoInput />
        <TodoList />
        <TodoFooter />
       </Provider>
       </div>
    );
  
}
export default App;
