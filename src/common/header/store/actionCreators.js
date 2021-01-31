/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 22:25:39
 */
// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
import * as constants from './constants';
// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from './actiion-types';
 export const getInputFocusOn = (value) => ({
   type:constants.SEARCH_FOCUS,
   value
 })
 export const getInputFocusOff = (value) => ({
   type:constants.SEARCH_BLUR,
   value
 })
