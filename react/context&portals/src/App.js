//App.js
import React from 'react';
import Son from './son';//引入子组件
// 创建一个 theme Context,
export const {Provider,Consumer} = React.createContext("默认名称");
export default class App extends React.Component {
    render() {
        var  name ="小人头"
        return (
            //Provider共享容器 接收一个name属性
            // 正确的使用createContext传入的默认值的用法是不提供Provider
            <Provider value={name}>
                <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
                    <p>父组件定义的值:{name}</p>
                    <Son />
                </div>
            </Provider>
        );
    }
}