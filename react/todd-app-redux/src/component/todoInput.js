import React,{Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../store';
function TodoInput(props) {
        console.log(props)
        return (
            <div className='todoinput'>
                <input onKeyUp={props.addItemAsync} />
            </div>
        )
}

function mapState(state) {
    return {
        state
    }
}

//////////////////////////// 第二个形参不生效
function mapDispatch(dispatch,store) {
    return {
        addItem:(e)=> {
            if (e.keyCode === 13) {
                if (e.target.value.trim() === '') {
                    return
                }
                console.log('e',e.target)
                console.log(1,this.store)
                dispatch({type:'ADD_ITEM', newItem: e.target.value.trim()})
                e.target.value = ''
           }
        },
        addItemAsync:(e)=>{
            //thunk插件的作用体现在这里
            console.log('e',e.target)
            console.log(1,store,dispatch)
            dispatch(
                (dispatch) => {
                    axios.get("http://cinarsky.club:5000/api/menu/restaurant/5").then((res) => {
                        console.log(res)
                        const data =res.data[0].name;
                        dispatch({type:'ADD_ITEM', newItem: data})
                   })
                }
            )
            //不用中间件似乎也可以？
            axios.get("http://cinarsky.club:5000/api/menu/restaurant/5").then((res) => {
                console.log(res)
                const data =res.data[0].name;
                dispatch({type:'ADD_ITEM', newItem: data})
           })


        }
        
    }
}

export default connect(mapState, mapDispatch)(TodoInput)


// 类写法
// class TodoInput extends Component {
//     constructor(props) {
//       super(props);
//       this.state = store.getState();
    //   this.handleInputChange = this.handleInputChange.bind(this);
    //   this.handleStoreChange = this.handleStoreChange.bind(this);
    //   this.handleButtonClick = this.handleButtonClick.bind(this);
      /**
       * 页面上的内容并没有随着store的更新而更新，所以如下操作:
       * store发生改变，则subscribe()绑定的函数会自动执行
       */
    //   store.subscribe(this.handleStoreChange);
    // }
   
    // componentDidMount() {
    //     this.axios("http://localhost:3000/mock/list.json").then((res)=>{
    //           const data = res.data;
    //           const action = initListAction(data);
    //           store.dispatch(action);
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }
   
    // input值改变触发action
    // handleInputChange(e) {
    //   //定义action两种方式，下面是最原始的一种：（1）
    //   // const action = {
    //   //   type: CHANGE_INPUT_VALUE,
    //   //   value: e.target.value
    //   // };
    //   //下面是改进的方式：（2）
    //   const action = getInputChangeValue(e.target.value);
    //   store.dispatch(action);
   
    //   console.log(e.target.value);
    // }
    // 重新渲染页面数据
    // handleStoreChange() {
    //   this.setState(store.getState());
    // }
    // 提交输入内容
  //   addItemAsync(e) {
  //     store.dispatch({type:'ADD_ITEM', newItem: e.target.value.trim()});
  //     console.log(store.getState())
  //   }

   
  //   render() {
  //     return (
  //       <div className='todoinput'>
  //          <input onKeyUp={this.addItemAsync} />
  //       </div>
  //     );
  //   }
  // }
   
  // export default TodoInput;
  