/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 00:02:11
 */

import 'antd/dist/antd.css'
import { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreators';

function TodoList(props) {
  const { inputValue, list, changeInputValue,handClick,handDelete} = props
  console.log(props,2020);
  // const [state, setState] = useState(store.getState())
  return (
    <div style={{marginTop:'20px'}}>
      <input value={inputValue} onChange={(e)=>{changeInputValue(e)}}/>
      <button onClick={()=>handClick(inputValue)}>提交</button>
      {
        list.map((item,index) => {
          return <div onClick={()=>handDelete(index)}>{ item }</div>
        })
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
  list:state.list,
})
const mapDispatchToProps = (dispatch) => ({
  changeInputValue(e){
    console.log(e.target.value);
    const action = getInputChangeAction(e.target.value);
    dispatch(action)
  },
  handClick(inputValue){
    const action = getAddItemAction(inputValue);
    dispatch(action)
  },
  handDelete(index){
    const action = getDeleteItemAction(index);
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
