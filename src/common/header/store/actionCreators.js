/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-04-19 11:43:44
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
 export const mouseEnter = () => ({
	type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
	type: constants.MOUSE_LEAVE
});
