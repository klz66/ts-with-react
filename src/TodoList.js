/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 17:21:10
 */
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { Button ,Input ,List} from 'antd';
import store from "./store";
import { useState } from 'react';
// import { CHANGE_IPUT,ADD_ITEM,DELETE_ITEM } from './store/actiion-types';
import { getInputChangeAction ,getAddItemAction, getDeleteItemAction} from './store/actionCreators';


function TodoList() {
  const [state, setState] = useState(store.getState())
  const [inputValue, setInputValue] = useState('')
  const handChange = (e)=> {
    setInputValue(e.target.value)
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }
  const handClick = ()=> {
    const action = getAddItemAction(inputValue)
    store.dispatch(action)
  }
  function handDelete(index) {
    console.log(index);
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
  const handChangeStore = ()=> {
    setState(store.getState())
    setInputValue(store.getState().inputValue)
  }
  store.subscribe(handChangeStore)
  return (
    <div style={{marginTop:'20px'}}>
      <div>
       <Input 
        onChange={handChange}
        value={state.inputValue}
        style={{width:"300px" , marginLeft:'10px',marginRight:'10px'}} placeholder="Basic usage" />
       <Button onClick={handClick} type="primary">提交</Button>
      </div>
      <List
        style={{width:"300px"}}
        dataSource={state.list}
        renderItem={(item,index) => (
          <List.Item onClick={()=>handDelete(index)}>
            {item}
          </List.Item>
        )}
      />

    </div>
  );
}

export default TodoList;
