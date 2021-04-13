/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-13 11:06:24
 */
import * as constants from './constants';

 export const getInputFocusOn = (value) => ({
   type:constants.SEARCH_FOCUS,
   value
 })
 export const getInputFocusOff = (value) => ({
   type:constants.SEARCH_BLUR,
   value
 })
