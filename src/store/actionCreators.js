/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 16:33:09
 */
import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from './actiion-types';
import axios from 'axios'
const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist/api'

 export const getInputFocusOn = (value) => ({
   type:CHANGE_FOCUS_ON,
   value
 })
 export const getInputFocusOff = (value) => ({
   type:CHANGE_FOCUS_OFF,
   value
 })
//  export const getTodoList = () => {
//    return (dispatch) => {
//     axios.get(`${url}/list`).then((res)=>{
//       console.log(res.data);
//       const action = getInitAction(res.data)
//       dispatch(action)
//     })
//    }
//  }
