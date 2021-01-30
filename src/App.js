/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-29 10:32:27
 */
// import logo from './logo.svg';
import {useState,useRef} from 'react';
import './App.css';
import axios from 'axios'
import uuid from 'uuid';

function App() {
  const [count, setCount] = useState(0);
  const aa = useRef();
  console.log(aa);
  function handClick(){
    setCount(count+1)
  }
  function handClick1(){
    axios.get('/api/demo').then(alert(20)).catch(()=>{
      alert(uuid())
    })
  }
  return (
    <div className="App">
      <label htmlFor='hello'>标签 </label>
      <input  value={count} id='hello'/>
      <button onClick={handClick}>增加</button>
      <button onClick={handClick1}>打印</button>
    </div>
  );
}

export default App;
