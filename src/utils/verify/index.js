/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 19:07:19
 */
import { useState,useEffect } from 'react'
import 'antd/dist/antd.css'
import { notification,InputNumber } from 'antd';

var _ = require('lodash');

function Verify(props) {
  let [a,setA] = useState(0)
  let [b,setB] = useState(0)
  let [c,setC] = useState(0)
  let [operator,setOperator] = useState(0)
  useEffect(() => {
    let obj = getVerify();
    setA(obj.a)
    setB(obj.b)
    setC(obj.c)
    setOperator(obj.operator)
  }, []);
  var color= ["#D0021B", "#417505", "#9013FE", "#002EFA", "#417505", "#9013FE", "#8b572a", "#002EFA", "#BD10E0", "#ff5a00", "#3FA536", "#B92281"];
  
  function randomColor(){
    let i = _.random(1,10);
    return color[i]
  }
  function random(){
    return _.random(1,20);
  }
  function getOperator(){
    let a = random()
    if(a%2 === 0) {
      return '+'
    }
    else if(a%3 === 0) {
      return '-'
    }
    else {
      return '*'
    }
  }
  function getVerify() {
    let a = random();
    let b = random();
    let c = 0;
    let operator = getOperator();
    if(operator === '+'){
      c = a+b;
    }
    if(operator === '-'){
      c = a-b;
    }
    if(operator === '*'){
      c = a*b;
    }
    return {a,b,operator,c}
  }
  function onChange(value) {
    if(value === c) {
      notification['success']({
        message: '验证成功',
        duration: 1,
      });
      props.sureVerify(true)
    } else {
      props.sureVerify(false)
    }
  }
  return (
    <div>
      <span style={{ color: randomColor()}}>
        {a}
      </span>
      <span style={{ color: randomColor() }}>
        {operator}
      </span>
       <span style={{ color: randomColor() }}>
        {b}
      </span>
       <span style={{ color: randomColor() }}>
        =
      </span>
      <InputNumber  style={{ width: '55px' ,color: randomColor()}} size="small" onChange={onChange}  maxLength={3} />
    </div>
  );
}

export default Verify;
