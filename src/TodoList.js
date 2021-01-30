/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 21:11:29
 */
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { Button ,Input ,List} from 'antd';
import store from "./store";
import { useState,useEffect } from 'react';
import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreators';

function TodoList() {
  const [state, setState] = useState(store.getState())
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    // 使用redux-thunk后，action也可以是个函数了
    const action = getTodoList()
    store.dispatch(action)
  }, []);
  const handChange = (e)=> {
    setInputValue(e.target.value)
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }
  const handClick = ()=> {
    const action = getAddItemAction(inputValue)
    store.dispatch(action)
    // axios.get(`${url}/list`).then((res)=>{
    //   console.log(res);
    // })
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
