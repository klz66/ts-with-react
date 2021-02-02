/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-02 23:18:19
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
 const getList = (value) => ({
   type:constants.GET_LIST,
   value:fromJS(value),
   totalPage: Math.ceil(value.length/3)
  //  state里的数据是immutable了的
 })
 export const getListApi = () => {
   return (dispatch) => {
     axios.get(`${url}/api/getList`).then((res)=>{
       console.log(res);
       dispatch(getList(res.data))
     }).catch(()=>{
       alert('error')
     })
   }
 }
