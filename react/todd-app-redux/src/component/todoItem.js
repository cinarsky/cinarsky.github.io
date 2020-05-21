import React from 'react'
import { connect } from 'react-redux'

function TodoItem(props) {
    // console.log(props)
        return (
            <div className='todoitem'>
                <input type='checkbox' checked={props.todo.state} onClick={() => props.changeState(props.idx)}/>
                <input value={props.todo.content} />
                <button onClick={() => props.delItem(props.idx)}> - </button>
            </div>
        )
}
function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        delItem: (idx) => dispatch({ type: 'DEL_ITEM', idx }),
        changeState: (idx) => dispatch({ type: 'CHANGE_STATE', idx })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)