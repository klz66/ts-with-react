/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 23:38:53
 */

import 'antd/dist/antd.css'
import { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreators';

function TodoList(props) {
  console.log(props,2020);
  // const [state, setState] = useState(store.getState())
  return (
    <div style={{marginTop:'20px'}}>
      <input value={props.state.inputValue} onChange={(e)=>{props.changeInputValue(e)}}/>
      <button>{props.state.inputValue}</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
  state:state,
})
const mapDispatchToProps = (dispatch) => ({
  changeInputValue(e){
    console.log(e.target.value);
    const action = getInputChangeAction(e.target.value);
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
