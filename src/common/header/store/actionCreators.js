/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-03 00:01:42
 */
import axios from 'axios'
import { fromJS } from 'immutable'
import * as constants from './constants';

const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist'
 export const getInputFocusOn = (value) => ({
   type:constants.SEARCH_FOCUS,
   value
 })
 export const getInputFocusOff = (value) => ({
   type:constants.SEARCH_BLUR,
   value
 })
 export const getMouseIn = () => ({
   type:constants.MOUSE_ENTER,
 })
 export const getMouseOut = () => ({
   type:constants.MOUSE_LEAVE,
 })
 export const getPage = (index) => ({
   type:constants.CHANGE_LIST,
   index
 })
 const getList = (value) => ({
   type:constants.GET_LIST,
   value:fromJS(value),
   totalPage: Math.ceil(value.length/3)
  //  state里的数据是immutable了的
 })
 export const getListApi = () => {
   return (dispatch) => {
     axios.get(`${url}/api/getList`).then((res)=>{
      //  console.log(res);
       dispatch(getList(res.data))
     }).catch(()=>{
       alert('error')
     })
   }
 }
