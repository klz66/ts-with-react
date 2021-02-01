/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-02-02 00:12:48
 */
import axios from 'axios'
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
 export const getList = (value) => ({
   type:constants.GET_LIST,
   value
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
