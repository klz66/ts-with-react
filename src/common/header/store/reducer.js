/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-31 17:00:29
 */

import { CHANGE_FOCUS_ON, CHANGE_FOCUS_OFF } from '../../../store/actiion-types'
const defaultState = {
  focused: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  console.log(state,action);
  if(action.type === CHANGE_FOCUS_ON){
    const newState = JSON.parse(JSON.stringify(state))
    newState.focused = action.value
    return newState
  }
  if(action.type === CHANGE_FOCUS_OFF){
    console.log(action);
    const newState = JSON.parse(JSON.stringify(state))
    newState.focused = action.value
    return newState
  }
  return state;
}
