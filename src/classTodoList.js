/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 16:13:36
 */
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { Button ,Input ,List} from 'antd';
import store from "./store";
import React,{ Component } from 'react';

class TodoList extends Component {
  // const [state, setState] = useState(store.getState())
  // const [inputValue, setInputValue] = useState('')
  constructor(props){
    super(props);
    this.state = store.getState();
    this.handDelete = this.handDelete.bind(this);
    // store.subscribe(this.handChangeStore)
  }
 
  render() {
    return (
      <div style={{marginTop:'20px'}}>
      <div>
       <Input 
        onChange={this.handChange}
        style={{width:"300px" , marginLeft:'10px',marginRight:'10px'}} placeholder="Basic usage" />
       <Button onClick={this.handClick} type="primary">提交</Button>
      </div>
      <List
        dataSource={this.state.list}
        renderItem={(item,index) => (
          <List.Item onClick={() => this.handDelete(index)}>
            {2}
          </List.Item>
        )}
      />
    </div>
    );
  }
  handChange(e) {
    const action = {
      type: 'change_iput',
      value: e.target.value
    }
    store.dispatch(action)
  }
  handClick(){
    // const action = {
    //   type: 'add_item',
    //   value: inputValue
    // }
    // store.dispatch(action)
    console.log(2020);
  }
  handDelete(index) {
    console.log(index);
    // const action = {
    //   type: 'delete_item',
    //   value: index
    // }
    // store.dispatch(action)
  }
  handChangeStore () {
    // setState(store.getState())
    // setInputValue(store.getState().inputValue)
    console.log(2020);
  }
}

export default TodoList;
