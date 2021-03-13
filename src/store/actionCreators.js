/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-13 13:09:05
 */
import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from './actiion-types';
import axios from 'axios'
import url from '../utils/utils'
// const url = 'https://www.fastmock.site/mock/16dd8b350d503885a889413322a127b9/todolist/api'

 export const getInputFocusOn = (value) => ({
   type:CHANGE_FOCUS_ON,
   value
 })
 export const getInputFocusOff = (value) => ({
   type:CHANGE_FOCUS_OFF,
   value
 })
