export var addItem=function(newItem) {
   return {
        type:'ADD_ITEM',
        newItem,
      }
}
export var delItem=function(index) {
    return {
        type:'DEL_ITEM',
        index,
      }
}
export var changeState=function(index) {
    return {
        type:'CHANGE_STATE',
        index,
      }
}
export var showAll=function(show) {
    return {
        type:'SHOW_ALL'   ,
        show,
      }
}

export var showTodo=function(show) {
    return {
        type:'SHOW_TODO'   ,
        show,
      }
}

export var showDone=function(show) {
    return {
        type:'SHOW_DONE'   ,
        show,
      }
}


// ////////////////////////////////

// var addItemAction= {
//   type:'ADD_ITEM',
//   newItem:{content}
// }

// var delItemAction= {
//   type:'DEL_ITEM'    ,

// }

// var changeStateAction= {
//   type:'CHANGE_STATE'  ,

// }

// var showAllAction= {
//   type:'SHOW_ALL'   ,

// }

// var showTodoAction= {
//   type:'SHOW_TODO'   ,

// }

// var showDoneAction= {
//   type:'SHOW_DONE'  ,

// }

