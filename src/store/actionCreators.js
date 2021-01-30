/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 17:20:47
 */
import { CHANGE_IPUT, ADD_ITEM, DELETE_ITEM } from './actiion-types';
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
