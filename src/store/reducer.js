/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-01-30 17:11:22
 */
import { CHANGE_IPUT, ADD_ITEM, DELETE_ITEM } from './actiion-types';
const defaultState = {
  inputValue: '',
  list: ['test 1','test 1','test 1','test 1']
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState,action) => {
  console.log(state,action);
  console.log(action.type);
  if(action.type === CHANGE_IPUT){
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type === ADD_ITEM){
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = ''
    newState.list.push(action.value)
    return newState
  }
  if(action.type === DELETE_ITEM){
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index,1)
    return newState
  }
  return state;
}
