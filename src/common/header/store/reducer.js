/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 22:24:46
 */

// import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
import * as constants from './constants';
const defaultState = {
  focused: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  console.log(state,action);
  if(action.type === constants.SEARCH_FOCUS){
    const newState = JSON.parse(JSON.stringify(state))
    newState.focused = action.value
    return newState
  }
  if(action.type === constants.SEARCH_BLUR){
    console.log(action);
    const newState = JSON.parse(JSON.stringify(state))
    newState.focused = action.value
    return newState
  }
  return state;
}
