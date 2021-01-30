/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 21:22:34
 */
import { CHANGE_IPUT, ADD_ITEM, DELETE_ITEM, INIT_LIST } from './actiion-types';
import axios from 'axios'
const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist/api'

 export const getInputChangeAction = (value) => ({
   type:CHANGE_IPUT,
   value
 })
 export const getAddItemAction = (value) => ({
   type:ADD_ITEM,
   value,
 })
 export const getDeleteItemAction = (index) => ({
   type:DELETE_ITEM,
   index
 })
 export const getInitAction = (value) => ({
   type:INIT_LIST,
   value
 })
 export const getTodoList = () => {
   return (dispatch) => {
    axios.get(`${url}/list`).then((res)=>{
      console.log(res.data);
      const action = getInitAction(res.data)
      dispatch(action)
    })
   }
 }
