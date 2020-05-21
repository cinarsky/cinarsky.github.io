var initialTodos = {
    show:true,
    todos:[{
    content: '吃饭',
    state: 0,
}, {
    content: '睡觉',
    state: 1,
}, {
    content: '打豆豆',
    state: 0,
}]};


export default function todoReducer(state = initialTodos, action) {
    switch (action.type) {
        case ('ADD_ITEM'): {
            var newTodos = state.todos.map(it => it)
            newTodos.push({ content: action.newItem, state: 0 })
            // console.log(newTodos)
            return {...state,
            todos:newTodos
            }
        }
        case ('DEL_ITEM'): {
            return {...state,
                todos:state.todos.filter((item, index) => index !== action.idx)
                }
        }
        case ('CHANGE_STATE'): {
            var newtodos= state.todos.map((item, index) => {
                if (action.idx === index) {
                    // 必须返回新的item对象才会触发view更新
                    return {content:item.content,state:1-item.state}
                }
                else { return item }
            })
            return {...state,
                todos:newtodos
                }

        }
        case 'SHOW_ALL': {
            return {
                ...state,
                show:true,
            }
        }
        case 'SHOW_TODO': {
            return {
                ...state,
                show:0,
            }
        }
        case 'SHOW_DONE': {
            return {
                ...state,
                show:1,
            }
        }
        default: {
            return state;
        }
    }
}